#
# bugreport module - object containing bug stuff for reporting
#   Written by Chris Lawrence <lawrencc@debian.org>
#   Copyright (C) 1999-2008 Chris Lawrence
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

import os

import utils
import debbugs
import commands

from exceptions import *

# to print errors
import ui.text_ui as ui

class bugreport(object):
    "Encapsulates a bug report into a convenient object we can pass around."

    # Default character set for str(x)
    charset = 'utf-8'
    
    def __init__(self, package, subject='', body='', system='debian',
                 incfiles='', sysinfo=True,
                 followup=False, type='debbugs', mode=utils.MODE_STANDARD,
                 debsumsoutput=None, issource=False, **props):
        self.type = type
        for (k, v) in props.iteritems():
            setattr(self, k, v)
        self.package = package
        self.subject = subject
        # try to convert followup to int (if it's not already), TypeError if
        # the conversion is impossible
        if followup and not isinstance(followup, int):
            try:
                self.followup = followup.bug_num
            except:
                ui.long_message('Invalid value for followup, it must be a debianbts.Bugreport instance or an integer')
                raise TypeError
        else:
            self.followup = followup
        self.body = body
        self.mode = mode
        self.system = system
        self.incfiles = incfiles
        self.sysinfo = sysinfo
        self.debsumsoutput = debsumsoutput
        self.issource = issource

    def tset(self, value):
        if value not in ('debbugs', 'launchpad'):
            ui.long_message('invalid report type %s, defaulting to debbugs' %
                            value)
            self.__type = 'debbugs'
        else:
            self.__type = value

    def tget(self):
        return self.__type
    type = property(tget, tset)

    def __unicode__(self):
        un = os.uname()
        debinfo = u''
        shellpath = utils.realpath('/bin/sh')

        locinfo = []
        langsetting = os.environ.get('LANG', 'C')
        allsetting = os.environ.get('LC_ALL', '')
        for setting in ('LANG', 'LC_CTYPE'):
            if setting == 'LANG':
                env = langsetting
            else:
                env = '%s (charmap=%s)' % (os.environ.get(setting, langsetting), commands.getoutput("locale charmap"))

                if allsetting and env:
                    env = "%s (ignored: LC_ALL set to %s)" % (env, allsetting)
                else:
                    env = allsetting or env
            locinfo.append('%s=%s' % (setting, env))

        locinfo = ', '.join(locinfo)

        ph = getattr(self, 'pseudoheaders', None)
        if ph:
            headers = u'\n'.join(ph)+u'\n'
        else:
            headers = u''

        version = getattr(self, 'version', None)
        if version:
            headers += u'Version: %s\n' % version

        body = getattr(self, 'body', u'')
        body = body.decode('utf8')

        # add NEWBIELINE only if it's less than advanced and the package is not
        # one of the specials (f.e. those with a dedicated function) also
        # thinking about those systems that don't have 'specials' dict
        if self.mode < utils.MODE_ADVANCED and self.package not in \
                debbugs.SYSTEMS[self.system].get('specials', {}).keys():
            body = utils.NEWBIELINE+u'\n\n'+body
        elif not body:
            body = u'\n'

        if self.issource:
            reportto = 'Source'
        else:
            reportto = 'Package'

        if not self.followup:
            for (attr, name) in dict(severity='Severity',
                                     justification='Justification',
                                     tags='Tags',
                                     filename='File').iteritems():
                a = getattr(self, attr, None)
                if a:
                    headers += u'%s: %s\n' % (name, a)
            
            report = u"%s: %s\n%s\n" % (reportto, self.package, headers)
        else:
            report = "Followup-For: Bug #%d\n%s: %s\n%s\n" % (
                self.followup, reportto, self.package, headers)

        infofunc = debbugs.SYSTEMS[self.system].get('infofunc', debbugs.generic_infofunc)
        if infofunc:
            debinfo += infofunc()

        if un[0] == 'GNU':
            # Use uname -v on Hurd
            uname_string = un[3]
        else:
            kern = un[0]
            if kern.startswith('GNU/'):
                kern = kern[4:]

            uname_string = '%s %s' % (kern, un[2])
            if kern == 'Linux':
                kinfo = []

                if 'SMP' in un[3]:
                    cores = utils.get_cpu_cores()
                    if cores > 1:
                        kinfo += ['SMP w/%d CPU cores' % cores]
                    elif cores == 1:
                        kinfo += ['SMP w/1 CPU core']
                if 'PREEMPT' in un[3]:
                    kinfo += ['PREEMPT']

                if kinfo:
                    uname_string = '%s (%s)' % (uname_string, '; '.join(kinfo))

        if uname_string:
            debinfo += u'Kernel: %s\n' % uname_string

        if locinfo:
            debinfo += u'Locale: %s\n' % locinfo
        if shellpath != '/bin/sh':
            debinfo += u'Shell: /bin/sh linked to %s\n' % shellpath

        # Don't include system info for certain packages
        if self.sysinfo:
            report = u"%s%s%s\n-- System Information:\n%s" % (report, body, self.incfiles, debinfo)
        else:
            report = u"%s%s%s" % (report, body, self.incfiles)

        if hasattr(self, 'depinfo'):
            report += self.depinfo
        if hasattr(self, 'confinfo'):
            report += self.confinfo

        # add debsums output to the bug report
        if self.debsumsoutput:
            report += u"\n-- debsums errors found:\n%s\n" % self.debsumsoutput

        return report

    def __str__(self):
        return unicode(self).encode(charset, 'replace')
        
    def __repr__(self):
        params = ['%s=%s' % (k, self.k) for k in dir(self)]
        return 'bugreport(%s)' % ', '.join(params)
