#
# checkbuildd.py - Check buildd.debian.org for successful past builds
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

import sgmllib
import commands

import utils
from urlutils import open_url
from reportbug.exceptions import (
    NoNetwork,
    )

BUILDD_URL = 'https://buildd.debian.org/build.php?arch=%s&pkg=%s'

# Check for successful in a 'td' block

class BuilddParser(sgmllib.SGMLParser):
    def __init__(self):
        sgmllib.SGMLParser.__init__(self)
        self.versions = {}
        self.savedata = None
        self.found_succeeded = False

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

    def start_td(self, attrs):
        self.save_bgn()

    def end_td(self):
        data = self.save_end()
        if data and 'successful' in data.lower():
            self.found_succeeded=True

def check_built(src_package, timeout, arch=None, http_proxy=None):
    """Return True if built in the past, False otherwise (even error)"""
    if not arch:
        arch = utils.get_arch()

    try:
        page = open_url(BUILDD_URL % (arch, src_package), http_proxy, timeout)
    except NoNetwork:
        return False

    if not page:
        return False

    parser = BuilddParser()
    parser.feed(page.read())
    parser.close()
    page.close()

    return parser.found_succeeded
