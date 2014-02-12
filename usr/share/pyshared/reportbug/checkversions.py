#
# checkversions.py - Find if the installed version of a package is the latest
#
#   Written by Chris Lawrence <lawrencc@debian.org>
#   (C) 2002-08 Chris Lawrence
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
import re
import urllib2
import sgmllib
import gc
import time

import utils
from urlutils import open_url
from reportbug.exceptions import (
    NoNetwork,
    )

# needed to parse new.822
from debian.deb822 import Deb822

RMADISON_URL = 'http://qa.debian.org/madison.php?package=%s&text=on'
INCOMING_URL = 'http://incoming.debian.org/'
NEWQUEUE_URL = 'http://ftp-master.debian.org/new.822'

# The format is an unordered list

class BaseParser(sgmllib.SGMLParser):
    def __init__(self):
        sgmllib.SGMLParser.__init__(self)
        self.savedata = None

    # --- Formatter interface, taking care of 'savedata' mode;
    # shouldn't need to be overridden

    def handle_data(self, data):
        if self.savedata is not None:
            self.savedata = self.savedata + data

    # --- Hooks to save data; shouldn't need to be overridden
    def save_bgn(self):
        self.savedata = ''

    def save_end(self, mode=0):
        data = self.savedata
        self.savedata = None
        if not mode and data is not None: data = ' '.join(data.split())
        return data

class IncomingParser(sgmllib.SGMLParser):
    def __init__(self, package, arch='i386'):
        sgmllib.SGMLParser.__init__(self)
        self.found = []
        self.savedata = None
        arch = r'(?:all|'+re.escape(arch)+')'
        self.package = re.compile(re.escape(package)+r'_([^_]+)_'+arch+'.deb')

    def start_a(self, attrs):
        for attrib, value in attrs:
            if attrib.lower() != 'href':
                continue

            mob = self.package.match(value)
            if mob:
                self.found.append(mob.group(1))

def compare_versions(current, upstream):
    """Return 1 if upstream is newer than current, -1 if current is
    newer than upstream, and 0 if the same."""
    if not current or not upstream: return 0
    rc = os.system('dpkg --compare-versions %s lt %s' % (current, upstream))
    rc2 = os.system('dpkg --compare-versions %s gt %s' % (current, upstream))
    if not rc:
        return 1
    elif not rc2:
        return -1
    return 0

def later_version(a, b):
    if compare_versions(a, b) > 0:
        return b
    return a

def get_versions_available(package, timeout, dists=None, http_proxy=None, arch='i386'):
    if not dists:
        dists = ('oldstable', 'stable', 'testing', 'unstable', 'experimental')

    try:
        page = open_url(RMADISON_URL % package)
    except NoNetwork:
        return {}
    except urllib2.HTTPError, x:
        print >> sys.stderr, "Warning:", x
        return {}
    if not page:
        return {}

    # read the content of the page, remove spaces, empty lines
    content = page.read().replace(' ', '').strip()
    page.close()

    arch = utils.get_arch()
    versions = {}
    for line in content.split('\n'):
        l = line.split('|')
        # skip lines not having the right number of fields
        if len(l) != 4:
            continue
        # map suites name (returned by madison) to dist name
        dist = utils.SUITES2DISTS.get(l[2], '')
        if dist in dists:
            # select only those lines that refers to source pkg
            # or to binary packages available on the current arch
            if 'source' in l[3].split(',') or arch in l[3].split(',') or \
                    l[3] == 'all':
                versions[dist] = l[1]

    return versions

def get_newqueue_available(package, timeout, dists=None, http_proxy=None, arch='i386'):
    if dists is None:
        dists = ('unstable (new queue)', )
    try:
        page = open_url(NEWQUEUE_URL, http_proxy, timeout)
    except NoNetwork:
        return {}
    except urllib2.HTTPError, x:
        print >> sys.stderr, "Warning:", x
        return {}
    if not page:
        return {}

    versions = {}

    # iter over the entries, one paragraph at a time
    for para in Deb822.iter_paragraphs(page):
        if para['Source'] == package:
            k = para['Distribution'] + ' (' + para['Queue']  + ')'
            versions[k] = para['Version']

    return versions

def get_incoming_version(package, timeout, http_proxy=None, arch='i386'):
    try:
        page = open_url(INCOMING_URL, http_proxy, timeout)
    except NoNetwork:
        return None
    except urllib2.HTTPError, x:
        print >> sys.stderr, "Warning:", x
        return None
    if not page:
        return None

    parser = IncomingParser(package, arch)
    for line in page:
        parser.feed(line)
    parser.close()
    try:
        page.fp._sock.recv = None
    except:
        pass
    page.close()

    if parser.found:
        found = parser.found
        del parser
        return reduce(later_version, found, '0')

    del page
    del parser
    return None

def check_available(package, version, timeout, dists=None,
                    check_incoming=True, check_newqueue=True,
                    http_proxy=None, arch='i386'):
    avail = {}

    if check_incoming:
        iv = get_incoming_version(package, timeout, http_proxy, arch)
        if iv:
            avail['incoming'] = iv
    stuff = get_versions_available(package, timeout, dists, http_proxy, arch)
    avail.update(stuff)
    if check_newqueue:
        srcpackage = utils.get_source_name(package)
	if srcpackage is None:
	    srcpackage = package
        stuff = get_newqueue_available(srcpackage, timeout, dists, http_proxy, arch)
        avail.update(stuff)
        #print gc.garbage, stuff

    new = {}
    newer = 0
    for dist in avail:
        if dist == 'incoming':
            if ':' in version:
                ver = version.split(':', 1)[1]
            else:
                ver = version
            comparison = compare_versions(ver, avail[dist])
        else:
            comparison = compare_versions(version, avail[dist])
        if comparison > 0:
            new[dist] = avail[dist]
        elif comparison < 0:
            newer += 1
    too_new = (newer and newer == len(avail))
    return new, too_new
