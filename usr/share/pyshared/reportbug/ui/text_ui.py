# Text user interface for reportbug
#   Written by Chris Lawrence <lawrencc@debian.org>
#   (C) 2001-08 Chris Lawrence
#   Copyright (C) 2008-2012 Sandro Tosi <morph@debian.org>
#
# This program is freely distributable per the following license:
#
##  Permission to use, copy, modify, and distribute this software and its
##  documentation for any purpose and without fee is hereby granted,
##  provided that the above copyright notice appears in all copies and that
##  both that copyright notice and this permission notice appear in
##  supporting documentation.
##
##  I DISCLAIM ALL WARRANTIES WITH REGARD TO THIS SOFTWARE, INCLUDING ALL
##  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS, IN NO EVENT SHALL I
##  BE LIABLE FOR ANY SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES OR ANY
##  DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
##  WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION,
##  ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS
##  SOFTWARE.

import sys
import os
import commands
import re
import math
import string
import errno
import glob
import getpass
import textwrap
import locale
try:
    import readline
except ImportError:
    readline = None

from reportbug import debbugs, hiermatch
from reportbug.exceptions import (
    NoReport, NoPackage, NoBugs, NoNetwork,
    InvalidRegex,
    )
from reportbug.urlutils import launch_browser
import reportbug.utils

ISATTY = sys.stdin.isatty()
charset = 'us-ascii'

try:
    r, c = commands.getoutput('stty size').split()
    rows, columns = int(r) or 24, int(c) or 79
except:
    rows, columns = 24, 79

def ewrite(message, *args):
    if not ISATTY:
        return

    if args:
        message = message % args

    if isinstance(message, unicode):
        message = message.encode(charset, 'replace')

    sys.stderr.write(message)
    sys.stderr.flush()

log_message = ewrite
display_failure = ewrite

def system(cmdline):
    try:
        x = os.getcwd()
    except OSError:
        os.chdir('/')
    return os.system(cmdline)

def indent_wrap_text(text, starttext='', indent=0, linelen=None):
    """Wrapper for textwrap.fill to the existing API."""
    if not linelen:
        linelen = columns-1

    if indent:
        si = ' '*indent
    else:
        si = ''

    text = ' '.join(text.split())
    if not text:
        return starttext+'\n'

    output = textwrap.fill(text, width=linelen, initial_indent=starttext,
                           subsequent_indent=si)
    if output.endswith('\n'):
        return output
    return output + '\n'

# Readline support, if available
if readline is not None:
    readline.parse_and_bind("tab: complete")
    try:
        # minimize the word delimeter list if possible
        readline.set_completer_delims(' ')
    except:
        pass

def _launch_mbox_reader(mbox_reader_cmd, bts, bugs, number, mirrors, archived,
                        mbox, http_proxy, timeout):
    try:
        number = int(number)
        if number not in bugs and 1 <= number <= len(bugs):
            number = bugs[number-1]
        reportbug.utils.launch_mbox_reader(mbox_reader_cmd,
            debbugs.get_report_url(
                bts, number, mirrors, archived, mbox), http_proxy,
            timeout)
    except ValueError:
        ewrite('Invalid report number: %s\n',
               number)

class our_completer(object):
    def __init__(self, completions=None):
        self.completions = None
        if completions:
            self.completions = tuple(map(str, completions))

    def complete(self, text, i):
        if not self.completions: return None

        matching = [x for x in self.completions if x.startswith(text)]
        if i < len(matching):
            return matching[i]
        else:
            return None

def our_raw_input(prompt = None, completions=None, completer=None):
    istty = sys.stdout.isatty()
    if not istty:
        sys.stderr.write(prompt)
    sys.stderr.flush()
    if readline:
        if completions and not completer:
            completer = our_completer(completions).complete
        if completer:
            readline.set_completer(completer)

    try:
        if istty:
            ret = raw_input(prompt)
        else:
            ret = raw_input()
    except EOFError:
        ewrite('\nUser interrupt (^D).\n')
        raise SystemExit

    if readline:
        readline.set_completer(None)
    return ret.strip()

def select_options(msg, ok, help, allow_numbers=None, nowrap=False):
    err_message = ''
    for option in ok:
        if option in string.ascii_uppercase:
            default=option
            break

    if not help: help = {}

    if '?' not in ok: ok = ok+'?'

    if nowrap:
        longmsg = msg+' ['+'|'.join(ok)+']?'+' '
    else:
        longmsg = indent_wrap_text(msg+' ['+'|'.join(ok)+']?').strip()+' '
    ch = our_raw_input(longmsg, allow_numbers)
    # Allow entry of a bug number here
    if allow_numbers:
        while ch and ch[0] == '#': ch = ch[1:]
        if type(allow_numbers) == type(1):
            try:
                return str(int(ch))
            except ValueError:
                pass
        else:
            try:
                number = int(ch)
                if number in allow_numbers:
                    return str(number)
                else:
                    nums = list(allow_numbers)
                    nums.sort()
                    err_message = 'Only the following entries are allowed: '+\
                                  ', '.join(map(str, nums))
            except (ValueError, TypeError):
                pass

    if not ch: ch = default
    ch = ch[0]
    if ch=='?':
        help['?'] = 'Display this help.'
        for ch in ok:
            if ch in string.ascii_uppercase:
                desc = '(default) '
            else:
                desc = ''
            desc += help.get(ch, help.get(ch.lower(),
                                          'No help for this option.'))
            ewrite(indent_wrap_text(desc+'\n', '%s - '% ch, 4))
        return select_options(msg, ok, help, allow_numbers, nowrap)
    elif (ch.lower() in ok) or (ch.upper() in ok):
        return ch.lower()
    elif err_message:
        ewrite(indent_wrap_text(err_message))
    else:
        ewrite('Invalid selection.\n')

    return select_options(msg, ok, help, allow_numbers, nowrap)

def yes_no(msg, yeshelp, nohelp, default=True, nowrap=False):
    "Return True for yes, False for no."
    if default:
        ok = 'Ynq'
    else:
        ok = 'yNq'

    res = select_options(msg, ok, {'y': yeshelp, 'n': nohelp, 'q' : 'Quit.'},
                         nowrap=nowrap)
    if res == 'q':
        raise SystemExit
    return (res == 'y')

def long_message(text, *args):
    if args:
        ewrite(indent_wrap_text(text % args))
    else:
        ewrite(indent_wrap_text(text))

final_message = long_message

def get_string(prompt, options=None, title=None, empty_ok=False, force_prompt=False,
               default='', completer=None):
    if prompt and (len(prompt) < 2*columns/3) and not force_prompt:
        if default:
            prompt = '%s [%s]: ' % (prompt, default)
            response = our_raw_input(prompt, options, completer) or default
        else:
            response = our_raw_input(prompt, options, completer)
    else:
        if prompt:
            ewrite(indent_wrap_text(prompt))
        if default:
            response = our_raw_input('[%s]> ' % default, options, completer) or default
        else:
            response = our_raw_input('> ', options, completer)

    # Translate the response into a Unicode string
    if response is not None and not isinstance(response, unicode):
        response = unicode(response, charset, 'replace')

    return response

def get_multiline(prompt):
    ewrite('\n')
    ewrite(indent_wrap_text(prompt + "  Press ENTER on a blank line to continue.\n"))
    l = []
    while 1:
        entry = get_string('', force_prompt=True).strip()
        if not entry:
            break
        l.append(entry)
    ewrite('\n')
    return l

def get_password(prompt=None):
    return getpass.getpass(prompt)

def FilenameCompleter(text, i):
    text = os.path.expanduser(text)
    text = os.path.expandvars(text)
    paths = glob.glob(text+'*')
    if not paths: return None

    if i < len(paths):
        entry = paths[i]
        if os.path.isdir(entry):
            return entry+'/'
        return entry
    else:
        return None

def get_filename(prompt, title=None, force_prompt=False, default=''):
    return get_string(prompt, title=title, force_prompt=force_prompt,
                      default=default, completer=FilenameCompleter)

def select_multiple(par, options, prompt, title=None, order=None, extras=None):
    return menu(par, options, prompt, title=title, order=order, extras=extras,
                multiple=True, empty_ok=False)

def menu(par, options, prompt, default=None, title=None, any_ok=False,
         order=None, extras=None, multiple=False, empty_ok=False):
    selected = {}

    if not extras:
        extras = []
    else:
        extras = list(extras)

    if title:
        ewrite(title+'\n\n')

    ewrite(indent_wrap_text(par, linelen=columns)+'\n')

    if isinstance(options, dict):
        options = options.copy()
        # Convert to a list
        if order:
            olist = []
            for key in order:
                if options.has_key(key):
                    olist.append( (key, options[key]) )
                    del options[key]

            # Append anything out of order
            options = options.items()
            options.sort()
            for option in options:
                olist.append( option )
            options = olist
        else:
            options = options.items()
            options.sort()

    if multiple:
        options.append( ('none', '') )
        default = 'none'
        extras += ['done']

    allowed = map(lambda x: x[0], options)
    allowed = allowed + extras

    maxlen_name = min(max(map(len, allowed)), columns/3)
    digits = int(math.ceil(math.log10(len(options)+1)))

    i = 1
    for name, desc in options:
        text = indent_wrap_text(desc, indent=(maxlen_name+digits+3),
                                starttext=('%*d %-*.*s  ' % (
            digits, i, maxlen_name, maxlen_name, name)))
        ewrite(text)
        if len(options) < 5:
            ewrite('\n')
        i = i+1
    if len(options) >= 5:
        ewrite('\n')

    if multiple:
        prompt += '(one at a time) '

    while 1:
        if default:
            aprompt = prompt + '[%s] ' % default
        else:
            aprompt = prompt

        response = our_raw_input(aprompt, allowed)
        if not response: response = default

        try:
            num = int(response)
            if 1 <= num <= len(options):
                response = options[num-1][0]
        except (ValueError, TypeError):
            pass

        if response in allowed or (response == default and response):
            if multiple:
                if response == 'done':
                    return selected.keys()
                elif response == 'none':
                    return []
                elif selected.get(response):
                    del selected[response]
                else:
                    selected[response]=1
                ewrite('- selected: %s\n' % ', '.join(selected.keys()))
                if len(selected):
                    default = 'done'
                else:
                    default = 'none'
                continue
            else:
                return response

        if any_ok and response:
            return response
        elif empty_ok and not response:
            return

        ewrite('Invalid entry.\n')
    return

# Things that are very UI dependent go here
def show_report(number, system, mirrors,
                http_proxy, timeout, screen=None, queryonly=False, title='',
                archived='no', mbox_reader_cmd=None):
    sysinfo = debbugs.SYSTEMS[system]
    ewrite('Retrieving report #%d from %s bug tracking system...\n',
           number, sysinfo['name'])

    try:
        info = debbugs.get_report(number, timeout, system, mirrors=mirrors,
                                    followups=1,
                                    http_proxy=http_proxy, archived=archived)
    except:
        info = None

    if not info:
        ewrite('No report available: #%s\n', number)
        raise NoBugs

    buginfo, messages = info

    # XXX: could this be ever possible?
    if not (buginfo.package or not buginfo.source):
        ewrite('Cannot retrieve bug\'s package, exiting...\n')
        sys.exit(-1)

    current_message = 0
    skip_pager = False

    while 1:
        if current_message:
            text = 'Followup %d - %s\n\n%s' % (current_message, buginfo.subject,
                                                 messages[current_message])
        else:
            text = 'Original report - %s\n\n%s' % (buginfo.subject, messages[0])

        if not skip_pager:
            fd = os.popen('sensible-pager', 'w')
            try:
                fd.write(text)
                fd.close()
            except IOError, x:
                if x.errno == errno.EPIPE:
                    pass
                else:
                    raise
        skip_pager = False

        options = 'xOrbeq'

        if (current_message+1) < len(messages):
            options = 'N'+options.lower()
        if (current_message):
            options = 'p'+options

        x = select_options("What do you want to do now?", options,
                           {'x' : 'Provide extra information.',
                            'o' : 'Show other bug reports (return to '
                            'bug listing).',
                            'n' : 'Show next message (followup).',
                            'p' : 'Show previous message (followup).',
                            'r' : 'Redisplay this message.',
                            'e' : 'Launch e-mail client to read full log.',
                            'b' : 'Launch web browser to read '
                            'full log.',
                            'q' : "I'm bored; quit please."},
                           allow_numbers = range(1, len(messages)+1))
        if x == 'x':
            return buginfo
        elif x == 'q':
            raise NoReport
        elif x == 'b':
            launch_browser(debbugs.get_report_url(
                system, number, mirrors, archived))
            skip_pager = True
        elif x == 'e':
            reportbug.utils.launch_mbox_reader(mbox_reader_cmd,
                debbugs.get_report_url(
                    system, number, mirrors, archived, True), http_proxy,
                    timeout)
            skip_pager = True
        elif x == 'o':
            break
        elif x == 'n':
            current_message += 1
        elif x == 'p':
            current_message -= 1
    return

def handle_bts_query(package, bts, timeout, mirrors=None, http_proxy="",
                     queryonly=False, title="", screen=None, archived='no',
                     source=False, version=None, mbox=False, buglist=None,
                     mbox_reader_cmd=None, latest_first=False):
    root = debbugs.SYSTEMS[bts].get('btsroot')
    if not root:
        ewrite('%s bug tracking system has no web URL; bypassing query\n',
               debbugs.SYSTEMS[bts]['name'])
        return

    srcstr = ""
    if source:
        srcstr = " (source)"

    if isinstance(package, basestring):
        long_message('Querying %s BTS for reports on %s%s...\n',
                     debbugs.SYSTEMS[bts]['name'], package, srcstr)
    else:
        long_message('Querying %s BTS for reports on %s%s...\n',
                     debbugs.SYSTEMS[bts]['name'],
                     ' '.join([str(x) for x in package]), srcstr)

    bugs = []
    try:
        (count, title, hierarchy)=debbugs.get_reports(
            package, timeout, bts, mirrors=mirrors, version=version,
            source=source, http_proxy=http_proxy, archived=archived)

        # If there's no report, then skip all the rest
        if not count:
            if hierarchy == None:
                raise NoPackage
            else:
                raise NoBugs

        hierarchy_new = []

        if mbox:
            mboxbuglist = []
            for entry in hierarchy:
                for bug in entry[1]:
                    mboxbuglist.append(bug.bug_num)
            return mboxbuglist

        if buglist:
            for entry in hierarchy:
                # second item is a list of bugs report
                for bug in entry[1]:
                    msg = "#%d  %s" %(bug.bug_num, bug.subject)
                    msg = msg.encode(charset, 'replace')
                    print msg
            sys.exit(0)

        for entry in hierarchy:
            # first item is the title of the section
            entry_new = entry[0]
            bugs_new = {}
            bugs_numbers = []
            # XXX: we can probably simplify this code, with some lists
            # generations and map()
            # second item is a list of bugs report
            for bug in entry[1]:
                # show if the bugs is already resolved
                done = ''
                if bug.pending == 'done':
                    done = '  [RESOLVED]'
                # we take the info we need (bug number and subject)
                # we use a dict so it's easy to sort the keys and then values
                bugs_new[bug.bug_num] = "%s%s" % (bug.subject, done)
                # and at the same time create a list of bugs numbers
                bugs_numbers.append(bug.bug_num)
            # then we sort both the lists
            hierarchy_new.append((entry_new, ["#%d  %s" % (k, bugs_new[k]) for k in sorted(bugs_new.keys(), reverse=latest_first)]))
            bugs.extend(sorted(bugs_numbers, reverse=latest_first))

        # replace old hierarchy with hierarchy_new
        hierarchy = hierarchy_new

        if not count:
            if hierarchy == None:
                raise NoPackage
            else:
                raise NoBugs
        elif count == 1:
            ewrite('%d bug report found:\n\n', count)
        else:
            ewrite('%d bug reports found:\n\n', count)

        return browse_bugs(hierarchy, count, bugs, bts, queryonly,
                           mirrors, http_proxy, timeout, screen, title, package,
                           mbox_reader_cmd)

    except (IOError, NoNetwork):
        ewrite('Unable to connect to %s BTS; ', debbugs.SYSTEMS[bts]['name'])
        res = select_options('continue', 'yN',
                             {'y': 'Keep going.',
                              'n': 'Abort.'})
        if res == 'n':
            raise NoNetwork
    except NoPackage:
        long_message('No record of this package found.')
        raise NoPackage

def browse_bugs(hierarchy, count, bugs, bts, queryonly, mirrors,
                http_proxy, timeout, screen, title, package, mbox_reader_cmd):
    try:
        output_encoding = locale.getpreferredencoding()
    except locale.Error, msg:
        print msg
        sys.exit(1)
    endcount = catcount = 0
    scount = startcount = 1
    category = hierarchy[0]
    lastpage = []
    digits = len(str(len(bugs)))
    linefmt = '  %'+str(digits)+'d) %s\n'
    while category:
        scount = scount + 1
        catname, reports = category[0:2]
        while catname.endswith(':'): catname = catname[:-1]
        total = len(reports)

        while len(reports):
            these = reports[:rows-2]
            reports = reports[rows-2:]
            remain = len(reports)

            tplural = rplural = 's'
            if total == 1: tplural=''
            if remain != 1: rplural=''

            if remain:
                lastpage.append(' %s: %d remain%s\n' %
                                (catname, remain, rplural))
            else:
                lastpage.append(catname+'\n')

            oldscount, oldecount = scount, endcount
            for report in these:
                scount = scount + 1
                endcount = endcount + 1
                lastpage.append(linefmt % (endcount,report[:columns-digits-5]))

            if category == hierarchy[-1] or \
               (scount >= (rows - len(hierarchy[catcount+1][1]) - 1)):
                skipmsg = ' (s to skip rest)'
                if endcount == count:
                    skipmsg = ''

                options = 'yNbmrqsfe'
                if queryonly: options = 'Nbmrqfe'

                rstr = "(%d-%d/%d) " % (startcount, endcount, count)
                pstr = rstr + "Is the bug you found listed above"
                if queryonly:
                    pstr = rstr + "What would you like to do next"
                allowed = bugs+range(1, count+1)
                helptext = {
                    'y' : 'Problem already reported; optionally '
                    'add extra information.',
                    'n' : 'Problem not listed above; possibly '
                    'check more.',
                    'b' : 'Open the complete bugs list in a web browser.',
                    'm' : 'Get more information about a bug (you '
                    'can also enter a number\n'
                    '     without selecting "m" first).',
                    'r' : 'Redisplay the last bugs shown.',
                    'q' : "I'm bored; quit please.",
                    's' : 'Skip remaining problems; file a new '
                    'report immediately.',
                    'e' : 'Open the report using an e-mail client.',
                    'f' : 'Filter bug list using a pattern.'}
                if skipmsg:
                    helptext['n'] = helptext['n'][:-1]+' (skip to Next page).'

                while 1:
                    for line in lastpage:
                        sys.stderr.write(line.encode(output_encoding, "replace"))
                    x = select_options(pstr, options, helptext,
                                       allow_numbers=allowed)
                    if x == 'n':
                        lastpage = []
                        break
                    elif x == 'b':
                        launch_browser('http://bugs.debian.org/%s' % package)
                        continue
                    elif x == 'r':
                        continue
                    elif x == 'q':
                        raise NoReport
                    elif x == 's':
                        return
                    elif x == 'y':
                        if queryonly:
                            return

                        if len(bugs) == 1:
                            number = '1'
                        else:
                            number = our_raw_input(
                                'Enter the number of the bug report '
                                'you want to give more info on,\n'
                                'or press ENTER to exit: #', allowed)
                        while number and number[0] == '#':
                            number=number[1:]
                        if number:
                            try:
                                number = int(number)
                                if number not in bugs and 1 <= number <= len(bugs):
                                    number = bugs[number-1]
                                return debbugs.get_report(number, timeout)[0]
                            except ValueError:
                                ewrite('Invalid report number: %s\n',
                                       number)
                        else:
                            raise NoReport
		    elif x == 'f':
			# Do filter. Recursive done.
			retval = search_bugs(hierarchy,bts, queryonly, mirrors,
                                             http_proxy, timeout, screen, title,
                                             package, mbox_reader_cmd)
			if isinstance(retval, basestring) and \
                                retval in ["FilterEnd", "Top"]:
			    continue
			else:
			    return retval
                    elif x == 'e':
                        number = our_raw_input('Please enter the number of the '
                            'bug you would like to view: #',
                            allowed)
                        _launch_mbox_reader(mbox_reader_cmd, bts, bugs, number,
                                            mirrors, 'no', True, http_proxy,
                                            timeout)
                    else:
                        if x == 'm' or x == 'i':
                            if len(bugs) == 1:
                                number = '1'
                            else:
                                number = our_raw_input(
                                    'Please enter the number of the bug '
                                    'you would like more info on: #',
                                    allowed)
                        else:
                            number = x

                        while number and number[0] == '#':
                            number=number[1:]

                        if number:
                            try:
                                number = int(number)
                                if number not in bugs and 1 <= number <= len(bugs):
                                    number = bugs[number-1]
                                res = show_report(number, bts, mirrors,
                                                  http_proxy, timeout,
                                                  queryonly=queryonly,
                                                  screen=screen,
                                                  title=title,
                                                  mbox_reader_cmd=mbox_reader_cmd)
                                if res:
                                    return res
                            except ValueError:
                                ewrite('Invalid report number: %s\n',
                                       number)

                startcount = endcount+1
                scount = 0

            # these now empty

        if category == hierarchy[-1]: break

        catcount = catcount+1
        category = hierarchy[catcount]
        if scount:
            lastpage.append('\n')
            scount = scount + 1

def proc_hierarchy(hierarchy):
    """Find out bug count and bug # in the hierarchy."""

    lenlist = [len(i[1]) for i in hierarchy]
    if lenlist:
	count = reduce(lambda x, y: x+y, lenlist)
    else:
	return 0, 0

    # Copy & paste from handle_bts_query()
    bugs = []
    exp = re.compile(r'\#(\d+)[ :]')
    for entry in hierarchy or []:
	for bug in entry[1]:
	    match = exp.match(bug)
	    if match:
		bugs.append(int(match.group(1)))
    return count, bugs

def search_bugs(hierarchyfull, bts, queryonly, mirrors,
                http_proxy, timeout, screen, title, package, mbox_reader_cmd):
    """Search for the bug list using a pattern."""
    """Return string "FilterEnd" when we are done with search."""

    try:
        output_encoding = locale.getpreferredencoding()
    except locale.Error, msg:
        print msg
        sys.exit(1)

    pattern = our_raw_input(
	'Enter the search pattern (a Perl-compatible regular expression)\n'
	'or press ENTER to exit: ')
    if not pattern:
	return "FilterEnd"

    " Create new hierarchy match the pattern."
    try:
        hierarchy = hiermatch.matched_hierarchy(hierarchyfull, pattern)
    except InvalidRegex:
	our_raw_input('Invalid regular expression, press ENTER to continue.')
	return "FilterEnd"

    count, bugs = proc_hierarchy(hierarchy)
    exp = re.compile(r'\#(\d+):')

    if not count:
	our_raw_input('No match found, press ENTER to continue.')
	return "FilterEnd"

    endcount = catcount = 0
    scount = startcount = 1
    category = hierarchy[0]
    lastpage = []
    digits = len(str(len(bugs)))
    linefmt = '  %'+str(digits)+'d) %s\n'
    # XXX: it's kinda non-sense to replicate all this code here!!! it's the same
    # as of browse_report!
    while category:
        scount = scount + 1
        catname, reports = category[0:2]
        while catname.endswith(':'): catname = catname[:-1]
        total = len(reports)

        while len(reports):
            these = reports[:rows-2]
            reports = reports[rows-2:]
            remain = len(reports)

            tplural = rplural = 's'
            if total == 1: tplural=''
            if remain != 1: rplural=''

            if remain:
                lastpage.append(' %s: %d report%s (%d remain%s)\n' %
                                (catname, total, tplural, remain, rplural))
            else:
                lastpage.append(' %s: %d report%s\n' %
                                (catname, total, tplural))

            oldscount, oldecount = scount, endcount
            for report in these:
                scount = scount + 1
                endcount = endcount + 1
                lastpage.append(linefmt % (endcount,report[:columns-digits-5]))

            if category == hierarchy[-1] or \
               (scount >= (rows - len(hierarchy[catcount+1][1]) - 1)):
                skipmsg = ' (s to skip rest)'
                if endcount == count:
                    skipmsg = ''

                options = 'yNbmrqsfute'
                if queryonly: options = 'Nmbrqfute'

                rstr = "(%d-%d/%d) " % (startcount, endcount, count)
                pstr = rstr + "Is the bug you found listed above"
                if queryonly:
                    pstr = rstr + "What would you like to do next"
                allowed = bugs+range(1, count+1)
                helptext = {
                    'y' : 'Problem already reported; optionally '
                    'add extra information.',
                    'n' : 'Problem not listed above; possibly '
                    'check more.',
                    'b' : 'Open the complete bugs list in a web browser.',
                    'm' : 'Get more information about a bug (you '
                    'can also enter a number\n'
                    '     without selecting "m" first).',
                    'r' : 'Redisplay the last bugs shown.',
                    'q' : "I'm bored; quit please.",
                    's' : 'Skip remaining problems; file a new '
                    'report immediately.',
		    'f' : 'Filter (search) bug list using a pattern.',
		    'u' : 'Up one level of filter.',
                    'e' : 'Open the report using an e-mail client.',
		    't' : 'Top of the bug list (remove all filters).'}
                if skipmsg:
                    helptext['n'] = helptext['n'][:-1]+' (skip to Next page).'

                while 1:
                    for line in lastpage:
                        sys.stderr.write(line.encode(output_encoding, "replace"))
                    x = select_options(pstr, options, helptext,
                                       allow_numbers=allowed)
                    if x == 'n':
                        lastpage = []
                        break
                    elif x == 'b':
                        launch_browser('http://bugs.debian.org/%s' % package)
                    elif x == 'r':
                        continue
                    elif x == 'q':
                        raise NoReport
                    elif x == 's':
                        return
                    elif x == 'y':
                        if queryonly:
                            return

                        if len(bugs) == 1:
                            number = '1'
                        else:
                            number = our_raw_input(
                                'Enter the number of the bug report '
                                'you want to give more info on,\n'
                                'or press ENTER to exit: #', allowed)
                        while number and number[0] == '#':
                            number=number[1:]
                        if number:
                            try:
                                number = int(number)
                                if number not in bugs and 1 <= number <= len(bugs):
                                    number = bugs[number-1]
                                return debbugs.get_report(number, timeout)[0]
                            except ValueError:
                                ewrite('Invalid report number: %s\n',
                                       number)
                        else:
                            raise NoReport
		    elif x == 'f':
			# Do filter. Recursive done.
			retval = search_bugs(hierarchy, bts, queryonly, mirrors,
			    http_proxy, timeout, screen, title, package,
                            mbox_reader_cmd)
			if retval == "FilterEnd":
			    continue
			else:
			    return retval
		    elif x == 'u':
			# Up a level
			return "FilterEnd"
		    elif x == 't':
			# go back to the Top level.
			return "Top"
                    elif x == 'e':
                        number = our_raw_input('Please enter the number of the '
                            'bug you would like to view: #',
                            allowed)
                        _launch_mbox_reader(mbox_reader_cmd, bts, bugs, number,
                                            mirrors, 'no', True, http_proxy,
                                            timeout)
                    else:
                        if x == 'm' or x == 'i':
                            number = our_raw_input(
                                'Please enter the number of the bug '
                                'you would like more info on: #',
                                allowed)
                        else:
                            number = x

                        while number and number[0] == '#':
                            number=number[1:]

                        if number:
                            try:
                                number = int(number)
                                if number not in bugs and 1 <= number <= len(bugs):
                                    number = bugs[number-1]
                                res = show_report(number, bts, mirrors,
                                                  http_proxy, timeout,
                                                  queryonly=queryonly,
                                                  screen=screen,
                                                  title=title)
                                if res:
                                    return res
                            except ValueError:
                                ewrite('Invalid report number: %s\n',
                                       number)

                startcount = endcount+1
                scount = 0

            # these now empty

        if category == hierarchy[-1]: break

        catcount = catcount+1
        category = hierarchy[catcount]
        if scount:
            lastpage.append('\n')
            scount = scount + 1
    return "FilterEnd"

def display_report(text, use_pager=True, presubj=False):
    if not use_pager:
        ewrite(text)
        return
    elif presubj:
        text += "\n(You may need to press 'q' to exit your pager and continue using\nreportbug at this point.)"

    pager = os.environ.get('PAGER', 'sensible-pager')
    try:
        os.popen(pager, 'w').write(text)
    except IOError:
        pass

def spawn_editor(message, filename, editor, charset='utf-8'):
    if not editor:
        ewrite('No editor found!\n')
        return (message, 0)

    edname = os.path.basename(editor.split()[0])

    # Move the cursor for lazy buggers like me; add your editor here...
    ourline = 0
    for (lineno, line) in enumerate(file(filename)):
        if line == '\n' and not ourline:
            ourline = lineno + 2
        # Morph @ 2008-08-31
        #elif line.strip() == utils.NEWBIELINE:
        #    ourline = lineno + 2

    opts = ''
    if 'vim' in edname:
        # Force *vim to edit the file in the foreground, instead of forking
        opts = '-f '

    if ourline:
        if edname in ('vi', 'nvi', 'vim', 'elvis', 'gvim', 'kvim'):
            opts = '-c :%d' % ourline
        elif (edname in ('elvis-tiny', 'gnuclient', 'ee', 'pico', 'nano', 'zile') or
              'emacs' in edname):
            opts = '+%d' % ourline
        elif edname in ('jed', 'xjed'):
            opts = '-g %d' % ourline
        elif edname == 'kate':
            opts = '--line %d' % ourline

    if '&' in editor or edname == 'kate':
        ewrite("Spawning %s in background; please press Enter when done "
               "editing.\n", edname)
    else:
        ewrite("Spawning %s...\n", edname)

    result = os.system("%s %s '%s'" % (editor, opts, filename))

    if result:
        ewrite('Warning: possible error exit from %s: %d\n', edname, result)

    if not os.path.exists(filename):
        ewrite('Bug report file %s removed!', filename)
        sys.exit(1)

    if '&' in editor: return (None, 1)

    newmessage = file(filename).read().decode(charset, 'replace')

    if newmessage == message:
        ewrite('No changes were made in the editor.\n')

    return (newmessage, newmessage != message)

def initialize ():
    return True

def can_input():
    return sys.stdin.isatty()
