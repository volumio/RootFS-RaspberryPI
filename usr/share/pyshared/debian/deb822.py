# vim: fileencoding=utf-8
#
# A python interface for various rfc822-like formatted files used by Debian
# (.changes, .dsc, Packages, Sources, etc)
#
# Copyright (C) 2005-2006  dann frazier <dannf@dannf.org>
# Copyright (C) 2006-2010  John Wright <john@johnwright.org>
# Copyright (C) 2006       Adeodato Simó <dato@net.com.org.es>
# Copyright (C) 2008       Stefano Zacchiroli <zack@upsilon.cc>
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation, either version 2
# of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.

from deprecation import function_deprecated_by

try:
    import apt_pkg
    # This module uses apt_pkg only for its TagFile interface.
    apt_pkg.TagFile
    _have_apt_pkg = True
except (ImportError, AttributeError):
    _have_apt_pkg = False

import chardet
import os
import re
import string
import subprocess
import sys
import warnings

import StringIO
import UserDict


GPGV_DEFAULT_KEYRINGS = frozenset(['/usr/share/keyrings/debian-keyring.gpg'])
GPGV_EXECUTABLE = '/usr/bin/gpgv'


class TagSectionWrapper(object, UserDict.DictMixin):
    """Wrap a TagSection object, using its find_raw method to get field values

    This allows us to pick which whitespace to strip off the beginning and end
    of the data, so we don't lose leading newlines.
    """

    def __init__(self, section):
        self.__section = section

    def keys(self):
        return [key for key in self.__section.keys()
                if not key.startswith('#')]

    def __getitem__(self, key):
        s = self.__section.find_raw(key)

        if s is None:
            raise KeyError(key)

        # Get just the stuff after the first ':'
        # Could use s.partition if we only supported python >= 2.5
        data = s[s.find(':')+1:]

        # Get rid of spaces and tabs after the ':', but not newlines, and strip
        # off any newline at the end of the data.
        return data.lstrip(' \t').rstrip('\n')


class OrderedSet(object):
    """A set-like object that preserves order when iterating over it

    We use this to keep track of keys in Deb822Dict, because it's much faster
    to look up if a key is in a set than in a list.
    """

    def __init__(self, iterable=[]):
        self.__set = set()
        self.__order = []
        for item in iterable:
            self.add(item)

    def add(self, item):
        if item not in self:
            # set.add will raise TypeError if something's unhashable, so we
            # don't have to handle that ourselves
            self.__set.add(item)
            self.__order.append(item)

    def remove(self, item):
        # set.remove will raise KeyError, so we don't need to handle that
        # ourselves
        self.__set.remove(item)
        self.__order.remove(item)

    def __iter__(self):
        # Return an iterator of items in the order they were added
        return iter(self.__order)

    def __contains__(self, item):
        # This is what makes OrderedSet faster than using a list to keep track
        # of keys.  Lookup in a set is O(1) instead of O(n) for a list.
        return item in self.__set

    ### list-like methods
    append = add

    def extend(self, iterable):
        for item in iterable:
            self.add(item)
    ###


class Deb822Dict(object, UserDict.DictMixin):
    # Subclassing UserDict.DictMixin because we're overriding so much dict
    # functionality that subclassing dict requires overriding many more than
    # the four methods that DictMixin requires.
    """A dictionary-like object suitable for storing RFC822-like data.

    Deb822Dict behaves like a normal dict, except:
        - key lookup is case-insensitive
        - key order is preserved
        - if initialized with a _parsed parameter, it will pull values from
          that dictionary-like object as needed (rather than making a copy).
          The _parsed dict is expected to be able to handle case-insensitive
          keys.

    If _parsed is not None, an optional _fields parameter specifies which keys
    in the _parsed dictionary are exposed.
    """

    # See the end of the file for the definition of _strI

    def __init__(self, _dict=None, _parsed=None, _fields=None,
                 encoding="utf-8"):
        self.__dict = {}
        self.__keys = OrderedSet()
        self.__parsed = None
        self.encoding = encoding

        if _dict is not None:
            # _dict may be a dict or a list of two-sized tuples
            if hasattr(_dict, 'items'):
                items = _dict.items()
            else:
                items = list(_dict)

            try:
                for k, v in items:
                    self[k] = v
            except ValueError:
                this = len(self.__keys)
                len_ = len(items[this])
                raise ValueError('dictionary update sequence element #%d has '
                    'length %d; 2 is required' % (this, len_))
        
        if _parsed is not None:
            self.__parsed = _parsed
            if _fields is None:
                self.__keys.extend([ _strI(k) for k in self.__parsed.keys() ])
            else:
                self.__keys.extend([ _strI(f) for f in _fields if self.__parsed.has_key(f) ])
        
    ### BEGIN DictMixin methods

    def __setitem__(self, key, value):
        key = _strI(key)
        self.__keys.add(key)
        self.__dict[key] = value
        
    def __getitem__(self, key):
        key = _strI(key)
        try:
            value = self.__dict[key]
        except KeyError:
            if self.__parsed is not None and key in self.__keys:
                value = self.__parsed[key]
            else:
                raise

        if isinstance(value, str):
            # Always return unicode objects instead of strings
            try:
                value = value.decode(self.encoding)
            except UnicodeDecodeError, e:
                # Evidently, the value wasn't encoded with the encoding the
                # user specified.  Try detecting it.
                warnings.warn('decoding from %s failed; attempting to detect '
                              'the true encoding' % self.encoding,
                              UnicodeWarning)
                result = chardet.detect(value)
                try:
                    value = value.decode(result['encoding'])
                except UnicodeDecodeError:
                    raise e
                else:
                    # Assume the rest of the paragraph is in this encoding as
                    # well (there's no sense in repeating this exercise for
                    # every field).
                    self.encoding = result['encoding']

        return value

    def __delitem__(self, key):
        key = _strI(key)
        self.__keys.remove(key)
        try:
            del self.__dict[key]
        except KeyError:
            # If we got this far, the key was in self.__keys, so it must have
            # only been in the self.__parsed dict.
            pass

    def has_key(self, key):
        key = _strI(key)
        return key in self.__keys
    
    def keys(self):
        return [str(key) for key in self.__keys]
    
    ### END DictMixin methods

    def __repr__(self):
        return '{%s}' % ', '.join(['%r: %r' % (k, v) for k, v in self.items()])

    def __eq__(self, other):
        mykeys = self.keys(); mykeys.sort()
        otherkeys = other.keys(); otherkeys.sort()
        if not mykeys == otherkeys:
            return False

        for key in mykeys:
            if self[key] != other[key]:
                return False

        # If we got here, everything matched
        return True

    def copy(self):
        # Use self.__class__ so this works as expected for subclasses
        copy = self.__class__(self)
        return copy

    # TODO implement __str__() and make dump() use that?


class Deb822(Deb822Dict):

    def __init__(self, sequence=None, fields=None, _parsed=None,
                 encoding="utf-8"):
        """Create a new Deb822 instance.

        :param sequence: a string, or any any object that returns a line of
            input each time, normally a file().  Alternately, sequence can
            be a dict that contains the initial key-value pairs.

        :param fields: if given, it is interpreted as a list of fields that
            should be parsed (the rest will be discarded).

        :param _parsed: internal parameter.

        :param encoding: When parsing strings, interpret them in this encoding.
            (All values are given back as unicode objects, so an encoding is
            necessary in order to properly interpret the strings.)
        """

        if hasattr(sequence, 'items'):
            _dict = sequence
            sequence = None
        else:
            _dict = None
        Deb822Dict.__init__(self, _dict=_dict, _parsed=_parsed, _fields=fields,
                            encoding=encoding)

        if sequence is not None:
            try:
                self._internal_parser(sequence, fields)
            except EOFError:
                pass

        self.gpg_info = None

    def iter_paragraphs(cls, sequence, fields=None, use_apt_pkg=True,
                        shared_storage=False, encoding="utf-8"):
        """Generator that yields a Deb822 object for each paragraph in sequence.

        :param sequence: same as in __init__.

        :param fields: likewise.

        :param use_apt_pkg: if sequence is a file(), apt_pkg will be used 
            if available to parse the file, since it's much much faster.  Set
            this parameter to False to disable using apt_pkg.
        :param shared_storage: not used, here for historical reasons.  Deb822
            objects never use shared storage anymore.
        :param encoding: Interpret the paragraphs in this encoding.
            (All values are given back as unicode objects, so an encoding is
            necessary in order to properly interpret the strings.)
        """

        if _have_apt_pkg and use_apt_pkg and isinstance(sequence, file):
            parser = apt_pkg.TagFile(sequence)
            for section in parser:
                paragraph = cls(fields=fields,
                                _parsed=TagSectionWrapper(section),
                                encoding=encoding)
                if paragraph:
                    yield paragraph

        else:
            iterable = iter(sequence)
            x = cls(iterable, fields, encoding=encoding)
            while len(x) != 0:
                yield x
                x = cls(iterable, fields, encoding=encoding)

    iter_paragraphs = classmethod(iter_paragraphs)

    ###

    @staticmethod
    def _skip_useless_lines(sequence):
        """Yields only lines that do not begin with '#'.

        Also skips any blank lines at the beginning of the input.
        """
        at_beginning = True
        for line in sequence:
            if line.startswith('#'):
                continue
            if at_beginning:
                if not line.rstrip('\r\n'):
                    continue
                at_beginning = False
            yield line

    def _internal_parser(self, sequence, fields=None):
        # The key is non-whitespace, non-colon characters before any colon.
        key_part = r"^(?P<key>[^: \t\n\r\f\v]+)\s*:\s*"
        single = re.compile(key_part + r"(?P<data>\S.*?)\s*$")
        multi = re.compile(key_part + r"$")
        multidata = re.compile(r"^\s(?P<data>.+?)\s*$")

        wanted_field = lambda f: fields is None or f in fields

        if isinstance(sequence, basestring):
            sequence = sequence.splitlines()

        curkey = None
        content = ""

        for line in self.gpg_stripped_paragraph(
                self._skip_useless_lines(sequence)):
            m = single.match(line)
            if m:
                if curkey:
                    self[curkey] = content

                if not wanted_field(m.group('key')):
                    curkey = None
                    continue

                curkey = m.group('key')
                content = m.group('data')
                continue

            m = multi.match(line)
            if m:
                if curkey:
                    self[curkey] = content

                if not wanted_field(m.group('key')):
                    curkey = None
                    continue

                curkey = m.group('key')
                content = ""
                continue

            m = multidata.match(line)
            if m:
                content += '\n' + line # XXX not m.group('data')?
                continue

        if curkey:
            self[curkey] = content

    def __str__(self):
        return self.dump()

    def __unicode__(self):
        return self.dump()

    # __repr__ is handled by Deb822Dict

    def get_as_string(self, key):
        """Return the self[key] as a string (or unicode)

        The default implementation just returns unicode(self[key]); however,
        this can be overridden in subclasses (e.g. _multivalued) that can take
        special values.
        """
        return unicode(self[key])

    def dump(self, fd=None, encoding=None):
        """Dump the the contents in the original format

        If fd is None, return a unicode object.

        If fd is not None, attempt to encode the output to the encoding the
        object was initialized with, or the value of the encoding argument if
        it is not None.  This will raise UnicodeEncodeError if the encoding
        can't support all the characters in the Deb822Dict values.
        """

        if fd is None:
            fd = StringIO.StringIO()
            return_string = True
        else:
            return_string = False

        if encoding is None:
            # Use the encoding we've been using to decode strings with if none
            # was explicitly specified
            encoding = self.encoding

        for key in self.iterkeys():
            value = self.get_as_string(key)
            if not value or value[0] == '\n':
                # Avoid trailing whitespace after "Field:" if it's on its own
                # line or the value is empty.  We don't have to worry about the
                # case where value == '\n', since we ensure that is not the
                # case in __setitem__.
                entry = '%s:%s\n' % (key, value)
            else:
                entry = '%s: %s\n' % (key, value)
            if not return_string:
                fd.write(entry.encode(encoding))
            else:
                fd.write(entry)
        if return_string:
            return fd.getvalue()

    ###

    def is_single_line(self, s):
        if s.count("\n"):
            return False
        else:
            return True

    isSingleLine = function_deprecated_by(is_single_line)

    def is_multi_line(self, s):
        return not self.is_single_line(s)

    isMultiLine = function_deprecated_by(is_multi_line)

    def _merge_fields(self, s1, s2):
        if not s2:
            return s1
        if not s1:
            return s2

        if self.is_single_line(s1) and self.is_single_line(s2):
            ## some fields are delimited by a single space, others
            ## a comma followed by a space.  this heuristic assumes
            ## that there are multiple items in one of the string fields
            ## so that we can pick up on the delimiter being used
            delim = ' '
            if (s1 + s2).count(', '):
                delim = ', '

            L = (s1 + delim + s2).split(delim)
            L.sort()

            prev = merged = L[0]

            for item in L[1:]:
                ## skip duplicate entries
                if item == prev:
                    continue
                merged = merged + delim + item
                prev = item
            return merged

        if self.is_multi_line(s1) and self.is_multi_line(s2):
            for item in s2.splitlines(True):
                if item not in s1.splitlines(True):
                    s1 = s1 + "\n" + item
            return s1

        raise ValueError

    _mergeFields = function_deprecated_by(_merge_fields)

    def merge_fields(self, key, d1, d2=None):
        ## this method can work in two ways - abstract that away
        if d2 == None:
            x1 = self
            x2 = d1
        else:
            x1 = d1
            x2 = d2

        ## we only have to do work if both objects contain our key
        ## otherwise, we just take the one that does, or raise an
        ## exception if neither does
        if key in x1 and key in x2:
            merged = self._mergeFields(x1[key], x2[key])
        elif key in x1:
            merged = x1[key]
        elif key in x2:
            merged = x2[key]
        else:
            raise KeyError

        ## back to the two different ways - if this method was called
        ## upon an object, update that object in place.
        ## return nothing in this case, to make the author notice a
        ## problem if she assumes the object itself will not be modified
        if d2 == None:
            self[key] = merged
            return None

        return merged

    mergeFields = function_deprecated_by(merge_fields)

    def split_gpg_and_payload(sequence):
        """Return a (gpg_pre, payload, gpg_post) tuple

        Each element of the returned tuple is a list of lines (with trailing
        whitespace stripped).
        """

        gpg_pre_lines = []
        lines = []
        gpg_post_lines = []
        state = 'SAFE'
        gpgre = re.compile(r'^-----(?P<action>BEGIN|END) PGP (?P<what>[^-]+)-----$')
        blank_line = re.compile('^$')
        first_line = True

        for line in sequence:
            line = line.strip('\r\n')

            # skip initial blank lines, if any
            if first_line:
                if blank_line.match(line):
                    continue
                else:
                    first_line = False

            m = gpgre.match(line)

            if not m:
                if state == 'SAFE':
                    if not blank_line.match(line):
                        lines.append(line)
                    else:
                        if not gpg_pre_lines:
                            # There's no gpg signature, so we should stop at
                            # this blank line
                            break
                elif state == 'SIGNED MESSAGE':
                    if blank_line.match(line):
                        state = 'SAFE'
                    else:
                        gpg_pre_lines.append(line)
                elif state == 'SIGNATURE':
                    gpg_post_lines.append(line)
            else:
                if m.group('action') == 'BEGIN':
                    state = m.group('what')
                elif m.group('action') == 'END':
                    gpg_post_lines.append(line)
                    break
                if not blank_line.match(line):
                    if not lines:
                        gpg_pre_lines.append(line)
                    else:
                        gpg_post_lines.append(line)

        if len(lines):
            return (gpg_pre_lines, lines, gpg_post_lines)
        else:
            raise EOFError('only blank lines found in input')

    split_gpg_and_payload = staticmethod(split_gpg_and_payload)

    def gpg_stripped_paragraph(cls, sequence):
        return cls.split_gpg_and_payload(sequence)[1]

    gpg_stripped_paragraph = classmethod(gpg_stripped_paragraph)

    def get_gpg_info(self, keyrings=None):
        """Return a GpgInfo object with GPG signature information

        This method will raise ValueError if the signature is not available
        (e.g. the original text cannot be found).

        :param keyrings: list of keyrings to use (see GpgInfo.from_sequence)
        """

        # raw_text is saved (as a string) only for Changes and Dsc (see
        # _gpg_multivalued.__init__) which is small compared to Packages or
        # Sources which contain no signature
        if not hasattr(self, 'raw_text'):
            raise ValueError, "original text cannot be found"

        if self.gpg_info is None:
            self.gpg_info = GpgInfo.from_sequence(self.raw_text,
                                                  keyrings=keyrings)

        return self.gpg_info

    def validate_input(self, key, value):
        """Raise ValueError if value is not a valid value for key

        Subclasses that do interesting things for different keys may wish to
        override this method.
        """

        # The value cannot end in a newline (if it did, dumping the object
        # would result in multiple stanzas)
        if value.endswith('\n'):
            raise ValueError("value must not end in '\\n'")

        # Make sure there are no blank lines (actually, the first one is
        # allowed to be blank, but no others), and each subsequent line starts
        # with whitespace
        for line in value.splitlines()[1:]:
            if not line:
                raise ValueError("value must not have blank lines")
            if not line[0].isspace():
                raise ValueError("each line must start with whitespace")

    def __setitem__(self, key, value):
        self.validate_input(key, value)
        Deb822Dict.__setitem__(self, key, value)


# XXX check what happens if input contains more that one signature
class GpgInfo(dict):
    """A wrapper around gnupg parsable output obtained via --status-fd

    This class is really a dictionary containing parsed output from gnupg plus
    some methods to make sense of the data.
    Keys are keywords and values are arguments suitably splitted.
    See /usr/share/doc/gnupg/DETAILS.gz"""

    # keys with format "key keyid uid"
    uidkeys = ('GOODSIG', 'EXPSIG', 'EXPKEYSIG', 'REVKEYSIG', 'BADSIG')

    def valid(self):
        """Is the signature valid?"""
        return self.has_key('GOODSIG') or self.has_key('VALIDSIG')
    
# XXX implement as a property?
# XXX handle utf-8 %-encoding
    def uid(self):
        """Return the primary ID of the signee key, None is not available"""
        pass

    @classmethod
    def from_output(cls, out, err=None):
        """Create a new GpgInfo object from gpg(v) --status-fd output (out) and
        optionally collect stderr as well (err).
        
        Both out and err can be lines in newline-terminated sequence or regular strings."""

        n = cls()

        if isinstance(out, basestring):
            out = out.split('\n')
        if isinstance(err, basestring):
            err = err.split('\n')

        n.out = out
        n.err = err
        
        header = '[GNUPG:] '
        for l in out:
            if not l.startswith(header):
                continue

            l = l[len(header):]
            l = l.strip('\n')

            # str.partition() would be better, 2.5 only though
            s = l.find(' ')
            key = l[:s]
            if key in cls.uidkeys:
                # value is "keyid UID", don't split UID
                value = l[s+1:].split(' ', 1)
            else:
                value = l[s+1:].split(' ')

            n[key] = value
        return n 

    @classmethod
    def from_sequence(cls, sequence, keyrings=None, executable=None):
        """Create a new GpgInfo object from the given sequence.

        :param sequence: sequence of lines or a string

        :param keyrings: list of keyrings to use (default:
            ['/usr/share/keyrings/debian-keyring.gpg'])

        :param executable: list of args for subprocess.Popen, the first element
            being the gpgv executable (default: ['/usr/bin/gpgv'])
        """

        keyrings = keyrings or GPGV_DEFAULT_KEYRINGS
        executable = executable or [GPGV_EXECUTABLE]

        # XXX check for gpg as well and use --verify accordingly?
        args = list(executable)
        #args.extend(["--status-fd", "1", "--no-default-keyring"])
        args.extend(["--status-fd", "1"])
        for k in keyrings:
            args.extend(["--keyring", k])
        
        if "--keyring" not in args:
            raise IOError, "cannot access any of the given keyrings"

        p = subprocess.Popen(args, stdin=subprocess.PIPE,
                             stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        # XXX what to do with exit code?

        if isinstance(sequence, basestring):
            (out, err) = p.communicate(sequence)
        else:
            (out, err) = p.communicate(cls._get_full_string(sequence))

        return cls.from_output(out, err)

    @staticmethod
    def _get_full_string(sequence):
        """Return a string from a sequence of lines.

        This method detects if the sequence's lines are newline-terminated, and
        constructs the string appropriately.
        """
        # Peek at the first line to see if it's newline-terminated.
        sequence_iter = iter(sequence)
        try:
            first_line = sequence_iter.next()
        except StopIteration:
            return ""
        join_str = '\n'
        if first_line.endswith('\n'):
            join_str = ''
        return first_line + join_str + join_str.join(sequence_iter)

    @classmethod
    def from_file(cls, target, *args, **kwargs):
        """Create a new GpgInfo object from the given file.

        See GpgInfo.from_sequence.
        """
        return cls.from_sequence(file(target), *args, **kwargs)


class PkgRelation(object):
    """Inter-package relationships

    Structured representation of the relationships of a package to another,
    i.e. of what can appear in a Deb882 field like Depends, Recommends,
    Suggests, ... (see Debian Policy 7.1).
    """

    # XXX *NOT* a real dependency parser, and that is not even a goal here, we
    # just parse as much as we need to split the various parts composing a
    # dependency, checking their correctness wrt policy is out of scope
    __dep_RE = re.compile( \
            r'^\s*(?P<name>[a-zA-Z0-9.+\-]{2,})(\s*\(\s*(?P<relop>[>=<]+)\s*(?P<version>[0-9a-zA-Z:\-+~.]+)\s*\))?(\s*\[(?P<archs>[\s!\w\-]+)\])?\s*$')
    __comma_sep_RE = re.compile(r'\s*,\s*')
    __pipe_sep_RE = re.compile(r'\s*\|\s*')
    __blank_sep_RE = re.compile(r'\s*')

    @classmethod
    def parse_relations(cls, raw):
        """Parse a package relationship string (i.e. the value of a field like
        Depends, Recommends, Build-Depends ...)
        """
        def parse_archs(raw):
            # assumption: no space beween '!' and architecture name
            archs = []
            for arch in cls.__blank_sep_RE.split(raw.strip()):
                if len(arch) and arch[0] == '!':
                    archs.append((False, arch[1:]))
                else:
                    archs.append((True, arch))
            return archs

        def parse_rel(raw):
            match = cls.__dep_RE.match(raw)
            if match:
                parts = match.groupdict()
                d = { 'name': parts['name'] }
                if not (parts['relop'] is None or parts['version'] is None):
                    d['version'] = (parts['relop'], parts['version'])
                else:
                    d['version'] = None
                if parts['archs'] is None:
                    d['arch'] = None
                else:
                    d['arch'] = parse_archs(parts['archs'])
                return d
            else:
                print >> sys.stderr, \
                        'deb822.py: WARNING: cannot parse package' \
                        ' relationship "%s", returning it raw' % raw
                return { 'name': raw, 'version': None, 'arch': None }

        tl_deps = cls.__comma_sep_RE.split(raw.strip()) # top-level deps
        cnf = map(cls.__pipe_sep_RE.split, tl_deps)
        return map(lambda or_deps: map(parse_rel, or_deps), cnf)

    @staticmethod
    def str(rels):
        """Format to string structured inter-package relationships
        
        Perform the inverse operation of parse_relations, returning a string
        suitable to be written in a package stanza.
        """
        def pp_arch(arch_spec):
            (excl, arch) = arch_spec
            if excl:
                return arch
            else:
                return '!' + arch

        def pp_atomic_dep(dep):
            s = dep['name']
            if dep.has_key('version') and dep['version'] is not None:
                s += ' (%s %s)' % dep['version']
            if dep.has_key('arch') and dep['arch'] is not None:
                s += ' [%s]' % string.join(map(pp_arch, dep['arch']))
            return s

        pp_or_dep = lambda deps: string.join(map(pp_atomic_dep, deps), ' | ')
        return string.join(map(pp_or_dep, rels), ', ')


class _lowercase_dict(dict):
    """Dictionary wrapper which lowercase keys upon lookup."""

    def __getitem__(self, key):
        return dict.__getitem__(self, key.lower())


class _PkgRelationMixin(object):
    """Package relationship mixin

    Inheriting from this mixin you can extend a Deb882 object with attributes
    letting you access inter-package relationship in a structured way, rather
    than as strings. For example, while you can usually use pkg['depends'] to
    obtain the Depends string of package pkg, mixing in with this class you
    gain pkg.depends to access Depends as a Pkgrel instance

    To use, subclass _PkgRelationMixin from a class with a _relationship_fields
    attribute. It should be a list of field names for which structured access
    is desired; for each of them a method wild be added to the inherited class.
    The method name will be the lowercase version of field name; '-' will be
    mangled as '_'. The method would return relationships in the same format of
    the PkgRelation' relations property.

    See Packages and Sources as examples.
    """

    def __init__(self, *args, **kwargs):
        self.__relations = _lowercase_dict({})
        self.__parsed_relations = False
        for name in self._relationship_fields:
            # To avoid reimplementing Deb822 key lookup logic we use a really
            # simple dict subclass which just lowercase keys upon lookup. Since
            # dictionary building happens only here, we ensure that all keys
            # are in fact lowercase.
            # With this trick we enable users to use the same key (i.e. field
            # name) of Deb822 objects on the dictionary returned by the
            # relations property.
            keyname = name.lower()
            if self.has_key(name):
                self.__relations[keyname] = None   # lazy value
                    # all lazy values will be expanded before setting
                    # __parsed_relations to True
            else:
                self.__relations[keyname] = []

    @property
    def relations(self):
        """Return a dictionary of inter-package relationships among the current
        and other packages.

        Dictionary keys depend on the package kind. Binary packages have keys
        like 'depends', 'recommends', ... while source packages have keys like
        'build-depends', 'build-depends-indep' and so on. See the Debian policy
        for the comprehensive field list.

        Dictionary values are package relationships returned as lists of lists
        of dictionaries (see below for some examples).

        The encoding of package relationships is as follows:
        - the top-level lists corresponds to the comma-separated list of
          Deb822, their components form a conjuction, i.e. they have to be
          AND-ed together
        - the inner lists corresponds to the pipe-separated list of Deb822,
          their components form a disjunction, i.e. they have to be OR-ed
          together
        - member of the inner lists are dictionaries with the following keys:
          - name:       package (or virtual package) name
          - version:    A pair <operator, version> if the relationship is
                        versioned, None otherwise. operator is one of "<<",
                        "<=", "=", ">=", ">>"; version is the given version as
                        a string.
          - arch:       A list of pairs <polarity, architecture> if the
                        relationship is architecture specific, None otherwise.
                        Polarity is a boolean (false if the architecture is
                        negated with "!", true otherwise), architecture the
                        Debian archtiecture name as a string.

        Examples:

          "emacs | emacsen, make, debianutils (>= 1.7)"     becomes
          [ [ {'name': 'emacs'}, {'name': 'emacsen'} ],
            [ {'name': 'make'} ],
            [ {'name': 'debianutils', 'version': ('>=', '1.7')} ] ]

          "tcl8.4-dev, procps [!hurd-i386]"                 becomes
          [ [ {'name': 'tcl8.4-dev'} ],
            [ {'name': 'procps', 'arch': (false, 'hurd-i386')} ] ]
        """
        if not self.__parsed_relations:
            lazy_rels = filter(lambda n: self.__relations[n] is None,
                    self.__relations.keys())
            for n in lazy_rels:
                self.__relations[n] = PkgRelation.parse_relations(self[n])
            self.__parsed_relations = True
        return self.__relations


class _multivalued(Deb822):
    """A class with (R/W) support for multivalued fields.

    To use, create a subclass with a _multivalued_fields attribute.  It should
    be a dictionary with *lower-case* keys, with lists of human-readable
    identifiers of the fields as the values.  Please see Dsc, Changes, and
    PdiffIndex as examples.
    """

    def __init__(self, *args, **kwargs):
        Deb822.__init__(self, *args, **kwargs)

        for field, fields in self._multivalued_fields.items():
            try:
                contents = self[field]
            except KeyError:
                continue

            if self.is_multi_line(contents):
                self[field] = []
                updater_method = self[field].append
            else:
                self[field] = Deb822Dict()
                updater_method = self[field].update

            for line in filter(None, contents.splitlines()):
                updater_method(Deb822Dict(zip(fields, line.split())))

    def validate_input(self, key, value):
        if key.lower() in self._multivalued_fields:
            # It's difficult to write a validator for multivalued fields, and
            # basically futile, since we allow mutable lists.  In any case,
            # with sanity checking in get_as_string, we shouldn't ever output
            # unparseable data.
            pass
        else:
            Deb822.validate_input(self, key, value)

    def get_as_string(self, key):
        keyl = key.lower()
        if keyl in self._multivalued_fields:
            fd = StringIO.StringIO()
            if hasattr(self[key], 'keys'): # single-line
                array = [ self[key] ]
            else: # multi-line
                fd.write("\n")
                array = self[key]

            order = self._multivalued_fields[keyl]
            try:
                field_lengths = self._fixed_field_lengths
            except AttributeError:
                field_lengths = {}
            for item in array:
                for x in order:
                    raw_value = unicode(item[x])
                    try:
                        length = field_lengths[keyl][x]
                    except KeyError:
                        value = raw_value
                    else:
                        value = (length - len(raw_value)) * " " + raw_value
                    if "\n" in value:
                        raise ValueError("'\\n' not allowed in component of "
                                         "multivalued field %s" % key)
                    fd.write(" %s" % value)
                fd.write("\n")
            return fd.getvalue().rstrip("\n")
        else:
            return Deb822.get_as_string(self, key)


class _gpg_multivalued(_multivalued):
    """A _multivalued class that can support gpg signed objects

    This class's feature is that it stores the raw text before parsing so that
    gpg can verify the signature.  Use it just like you would use the
    _multivalued class.

    This class only stores raw text if it is given a raw string, or if it
    detects a gpg signature when given a file or sequence of lines (see
    Deb822.split_gpg_and_payload for details).
    """

    def __init__(self, *args, **kwargs):
        try:
            sequence = args[0]
        except IndexError:
            sequence = kwargs.get("sequence", None)

        if sequence is not None:
            if isinstance(sequence, basestring):
                self.raw_text = sequence
            elif hasattr(sequence, "items"):
                # sequence is actually a dict(-like) object, so we don't have
                # the raw text.
                pass
            else:
                try:
                    gpg_pre_lines, lines, gpg_post_lines = \
                            self.split_gpg_and_payload(sequence)
                except EOFError:
                    # Empty input
                    gpg_pre_lines = lines = gpg_post_lines = []
                if gpg_pre_lines and gpg_post_lines:
                    raw_text = StringIO.StringIO()
                    raw_text.write("\n".join(gpg_pre_lines))
                    raw_text.write("\n\n")
                    raw_text.write("\n".join(lines))
                    raw_text.write("\n\n")
                    raw_text.write("\n".join(gpg_post_lines))
                    self.raw_text = raw_text.getvalue()
                try:
                    args = list(args)
                    args[0] = lines
                except IndexError:
                    kwargs["sequence"] = lines

        _multivalued.__init__(self, *args, **kwargs)


class Dsc(_gpg_multivalued):
    _multivalued_fields = {
        "files": [ "md5sum", "size", "name" ],
        "checksums-sha1": ["sha1", "size", "name"],
        "checksums-sha256": ["sha256", "size", "name"],
    }


class Changes(_gpg_multivalued):
    _multivalued_fields = {
        "files": [ "md5sum", "size", "section", "priority", "name" ],
        "checksums-sha1": ["sha1", "size", "name"],
        "checksums-sha256": ["sha256", "size", "name"],
    }

    def get_pool_path(self):
        """Return the path in the pool where the files would be installed"""
    
        # This is based on the section listed for the first file.  While
        # it is possible, I think, for a package to provide files in multiple
        # sections, I haven't seen it in practice.  In any case, this should
        # probably detect such a situation and complain, or return a list...
        
        s = self['files'][0]['section']

        try:
            section, subsection = s.split('/')
        except ValueError:
            # main is implicit
            section = 'main'

        if self['source'].startswith('lib'):
            subdir = self['source'][:4]
        else:
            subdir = self['source'][0]

        return 'pool/%s/%s/%s' % (section, subdir, self['source'])


class PdiffIndex(_multivalued):
    _multivalued_fields = {
        "sha1-current": [ "SHA1", "size" ],
        "sha1-history": [ "SHA1", "size", "date" ],
        "sha1-patches": [ "SHA1", "size", "date" ],
    }

    @property
    def _fixed_field_lengths(self):
        fixed_field_lengths = {}
        for key in self._multivalued_fields:
            if hasattr(self[key], 'keys'):
                # Not multi-line -- don't need to compute the field length for
                # this one
                continue
            length = self._get_size_field_length(key)
            fixed_field_lengths[key] = {"size": length}
        return fixed_field_lengths

    def _get_size_field_length(self, key):
        lengths = [len(str(item['size'])) for item in self[key]]
        return max(lengths)


class Release(_multivalued):
    """Represents a Release file

    Set the size_field_behavior attribute to "dak" to make the size field
    length only as long as the longest actual value.  The default,
    "apt-ftparchive" makes the field 16 characters long regardless.
    """
    # FIXME: Add support for detecting the behavior of the input, if
    # constructed from actual 822 text.

    _multivalued_fields = {
        "md5sum": [ "md5sum", "size", "name" ],
        "sha1": [ "sha1", "size", "name" ],
        "sha256": [ "sha256", "size", "name" ],
    }

    __size_field_behavior = "apt-ftparchive"
    def set_size_field_behavior(self, value):
        if value not in ["apt-ftparchive", "dak"]:
            raise ValueError("size_field_behavior must be either "
                             "'apt-ftparchive' or 'dak'")
        else:
            self.__size_field_behavior = value
    size_field_behavior = property(lambda self: self.__size_field_behavior,
                                   set_size_field_behavior)

    @property
    def _fixed_field_lengths(self):
        fixed_field_lengths = {}
        for key in self._multivalued_fields:
            length = self._get_size_field_length(key)
            fixed_field_lengths[key] = {"size": length}
        return fixed_field_lengths

    def _get_size_field_length(self, key):
        if self.size_field_behavior == "apt-ftparchive":
            return 16
        elif self.size_field_behavior == "dak":
            lengths = [len(str(item['size'])) for item in self[key]]
            return max(lengths)


class Sources(Dsc, _PkgRelationMixin):
    """Represent an APT source package list"""

    _relationship_fields = [ 'build-depends', 'build-depends-indep',
            'build-conflicts', 'build-conflicts-indep', 'binary' ]

    def __init__(self, *args, **kwargs):
        Dsc.__init__(self, *args, **kwargs)
        _PkgRelationMixin.__init__(self, *args, **kwargs)


class Packages(Deb822, _PkgRelationMixin):
    """Represent an APT binary package list"""

    _relationship_fields = [ 'depends', 'pre-depends', 'recommends',
            'suggests', 'breaks', 'conflicts', 'provides', 'replaces',
            'enhances' ]

    def __init__(self, *args, **kwargs):
        Deb822.__init__(self, *args, **kwargs)
        _PkgRelationMixin.__init__(self, *args, **kwargs)


class _CaseInsensitiveString(str):
    """Case insensitive string.
    """

    def __new__(cls, str_):
        s = str.__new__(cls, str_)
        s.str_lower = str_.lower()
        s.str_lower_hash = hash(s.str_lower)
        return s

    def __hash__(self):
        return self.str_lower_hash

    def __eq__(self, other):
        return self.str_lower == other.lower()

    def lower(self):
        return self.str_lower


_strI = _CaseInsensitiveString
