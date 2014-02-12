#!/usr/bin/python
# -*- python -*-
# reportbug - Report a bug in the Debian distribution.
#   Written by Chris Lawrence <lawrencc@debian.org>
#   Copyright (C) 1999-2008 Chris Lawrence
#   Copyright (C) 2008-2012 Sandro Tosi <morph@debian.org>
#
# This program is freely distributable per the following license:
#
LICENSE="""\
Permission to use, copy, modify, and distribute this software and its
documentation for any purpose and without fee is hereby granted,
provided that the above copyright notice appears in all copies and that
both that copyright notice and this permission notice appear in
supporting documentation.

I DISCLAIM ALL WARRANTIES WITH REGARD TO THIS SOFTWARE, INCLUDING ALL
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS, IN NO EVENT SHALL I
BE LIABLE FOR ANY SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES OR ANY
DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION,
ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS
SOFTWARE."""

__all__ = ['bugreport', 'utils', 'urlutils', 'checkbuildd', 'checkversions',
           'debbugs', 'exceptions', 'submit', 'tempfile']

VERSION_NUMBER = "6.4.4"

VERSION = "reportbug "+VERSION_NUMBER
COPYRIGHT = VERSION + '\nCopyright (C) 1999-2008 Chris Lawrence <lawrencc@debian.org>' + \
                      '\nCopyright (C) 2008-2012 Sandro Tosi <morph@debian.org>'
