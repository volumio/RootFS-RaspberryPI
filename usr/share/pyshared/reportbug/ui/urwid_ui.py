# urwid user interface for reportbug
#   Written by Chris Lawrence <lawrencc@debian.org>
#   (C) 2006-08 Chris Lawrence
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
#
# Portions of this file are licensed under the Lesser GNU Public License
# (LGPL) Version 2.1 or later.  On Debian systems, this license is available
# in /usr/share/common-licenses/LGPL

import sys
import re
import getpass
from reportbug.exceptions import (
    UINotImportable,
    NoPackage, NoBugs, NoNetwork, NoReport,
    )
from reportbug.urlutils import launch_browser
from text_ui import (
    ewrite,
    spawn_editor,
    system
    )
from reportbug import VERSION

try:
    import urwid.raw_display
    import urwid
except ImportError:
    raise UINotImportable, 'Please install the python-urwid package to use this interface.'

ISATTY = sys.stdin.isatty()

log_message = ewrite

# Start a urwid session
def initialize_urwid_ui():
    ui = urwid.raw_display.Screen()
    ui.register_palette(palette)
    # Improve responsiveness of UI
    ui.set_input_timeouts(max_wait=0.1)
    return ui

# Empty function to satisfy ui.run_wrapper()
def nullfunc():
    pass

# Widgets ripped mercilessly from urwid examples (dialog.py)
class buttonpush(Exception):
    pass

def button_press(button):
    raise buttonpush, button.exitcode

class SelectableText(urwid.Edit):
    def valid_char(self, ch):
        return False

class dialog(object):
    def __init__(self, message, body=None, width=None, height=None,
                 title='', long_message=''):
        self.body = body

        self.scrollmode=False
        if not body:
            if long_message:
                box = SelectableText(edit_text=long_message)
                box.set_edit_pos(0)
                self.body = body = urwid.ListBox([box])
                self.scrollmode=True
            else:
                self.body = body = urwid.Filler(urwid.Divider(), 'top')

        if not width:
            width = ('relative', 80)

        if not height:
            height = ('relative', 80)

        self.frame = urwid.Frame(body, focus_part='footer')
        if message:
            self.frame.header = urwid.Pile([urwid.Text(message),
                                            urwid.Divider()])

        w = self.frame
        # pad area around listbox
        w = urwid.Padding(w, ('fixed left',2), ('fixed right',2))
        w = urwid.Filler(w, ('fixed top',1), ('fixed bottom',1))
        w = urwid.AttrWrap(w, 'body')

        if title:
            w = urwid.Frame(w)
            w.header = urwid.Text( ('title', title) )

        # "shadow" effect
        w = urwid.Columns( [w, ('fixed', 1, urwid.AttrWrap( urwid.Filler(urwid.Text(('border',' ')), "top") ,'shadow'))])
        w = urwid.Frame( w, footer = urwid.AttrWrap(urwid.Text(('border',' ')),'shadow'))
        # outermost border area
        w = urwid.Padding(w, 'center', width )
        w = urwid.Filler(w, 'middle', height )
        w = urwid.AttrWrap( w, 'border' )
        self.view = w

    def add_buttons(self, buttons, default=0, vertical=False):
        l = []
        for name, exitcode in buttons:
            if exitcode == '---':
                # Separator is just a text label
                b = urwid.Text(name)
                b = urwid.AttrWrap( b, 'scrolllabel' )
            else:
                b = urwid.Button( name, self.button_press )
                b.exitcode = exitcode
                b = urwid.AttrWrap( b, 'selectable','focus' )
            l.append( b )

        if vertical:
            box = urwid.ListBox(l)
            box.set_focus(default or 0)
            self.buttons = urwid.Frame(urwid.AttrWrap(box, 'selectable'))
            self.frame.footer = urwid.BoxAdapter(self.buttons, min(len(l), 10))
        else:
            self.buttons = urwid.GridFlow(l, 12, 3, 1, 'center')
            self.buttons.set_focus(default or 0)
            self.frame.footer = urwid.Pile( [ urwid.Divider(), self.buttons ],
                                            focus_item = 1 )

    def button_press(self, button):
        raise buttonpush, button.exitcode

    def run(self):
        #self.ui.set_mouse_tracking()
        size = self.ui.get_cols_rows()
        try:
            while True:
                canvas = self.view.render( size, focus=True )
                self.ui.draw_screen( size, canvas )
                keys = None
                while not keys:
                    keys = self.ui.get_input()
                for k in keys:
                    if urwid.util.is_mouse_event(k):
                        event, button, col, row = k
                        self.view.mouse_event( size,
                                               event, button, col, row,
                                               focus=True)
                    if k == 'window resize':
                        size = self.ui.get_cols_rows()
                    k = self.view.keypress( size, k )
                    if k:
                        self.unhandled_key( size, k)
        except buttonpush, e:
            return self.on_exit( e.args[0] )

    def on_exit(self, exitcode):
        return exitcode

    def unhandled_key(self, size, k):
        if k in ('tab', 'shift tab'):
            focus = self.frame.focus_part
            if focus == 'footer':
                self.frame.set_focus('body')
            else:
                self.frame.set_focus('footer')

        if k in ('up','page up', 'down', 'page down'):
            if self.scrollmode:
                self.frame.set_focus('body')
                self.body.keypress(size, k)
            elif k in ('up', 'page up'):
                self.frame.set_focus('body')
            else:
                self.frame.set_focus('footer')

        if k == 'enter':
            # pass enter to the "ok" button
            self.frame.set_focus('footer')
            self.view.keypress( size, k )

    def main(self, ui=None):
        if ui:
            self.ui = ui
        else:
            self.ui = initialize_urwid_ui()
        return self.ui.run_wrapper(self.run)

class displaybox(dialog):
    def show(self, ui=None):
        if ui:
            self.ui = ui
        else:
            self.ui = initialize_urwid_ui()
        size = self.ui.get_cols_rows()
        canvas = self.view.render( size, focus=True )
        self.ui.start()
        self.ui.draw_screen( size, canvas )
        self.ui.stop()

class textentry(dialog):
    def __init__(self, text, width=None, height=None, multiline=False,
                 title='', edit_text=''):
        self.edit = urwid.Edit(edit_text=edit_text, multiline=multiline)
        body = urwid.ListBox([self.edit])
        body = urwid.AttrWrap(body, 'selectable', 'focustext')
        if not multiline:
            body = urwid.Pile( [('fixed', 1, body), urwid.Divider()] )
            body = urwid.Filler(body)

        dialog.__init__(self, text, body, width, height, title)

        self.frame.set_focus('body')

    def on_exit(self, exitcode):
        return exitcode, self.edit.get_edit_text()

class listdialog(dialog):
    def __init__(self, text, widgets, has_default=False, width=None,
                 height=None, title='', buttonwidth=12):
        l = []
        self.items = []
        for (w, label) in widgets:
            self.items.append(w)
            if label:
                w = urwid.Columns( [('fixed', buttonwidth, w),
                                    urwid.Text(label)], 2 )
            w = urwid.AttrWrap(w, 'selectable','focus')
            l.append(w)

        lb = urwid.ListBox(l)
        lb = urwid.AttrWrap( lb, "selectable" )
        dialog.__init__(self, text, height=height, width=width, body=lb,
                        title=title)

        self.frame.set_focus('body')

    def on_exit(self, exitcode):
        """Print the tag of the item selected."""
        if exitcode:
            return exitcode, None

        for i in self.items:
            if hasattr(i, 'get_state') and i.get_state():
                return exitcode, i.get_label()
        return exitcode, None

class checklistdialog(listdialog):
    def on_exit(self, exitcode):
        """
        Mimick dialog(1)'s --checklist exit.
        Put each checked item in double quotes with a trailing space.
        """
        if exitcode:
            return exitcode, []

        l = []
        for i in self.items:
            if i.get_state():
                l.append(i.get_label())
        return exitcode, l

def display_message(message, *args, **kwargs):
    if args:
        message = message % tuple(args)

    if 'title' in kwargs:
        title = kwargs['title']
    else:
        title = ''

    if 'ui' in kwargs:
        ui = kwargs['ui']
    else:
        ui = None

    # Rewrap the message
    chunks = re.split('\n\n+', message)
    chunks = [re.sub(r'\s+', ' ', x).strip() for x in chunks]
    message = '\n\n'.join(chunks).strip()

    box = displaybox('', long_message=message, title=title or VERSION)
    box.show(ui)

def long_message(message, *args, **kwargs):
    if args:
        message = message % tuple(args)

    if 'title' in kwargs:
        title = kwargs['title']
    else:
        title = ''

    if 'ui' in kwargs:
        ui = kwargs['ui']
    else:
        ui = None

    # Rewrap the message
    chunks = re.split('\n\n+', message)
    chunks = [re.sub(r'\s+', ' ', x).strip() for x in chunks]
    message = '\n\n'.join(chunks).strip()

    box = dialog('', long_message=message, title=title or VERSION)
    box.add_buttons([ ("OK", 0) ])
    box.main(ui)

final_message = long_message
display_report = long_message
display_failure = long_message

def select_options(msg, ok, help=None, allow_numbers=False, nowrap=False,
                   ui=None, title=None):
    box = dialog('', long_message=msg, height=('relative', 80),
                 title=title or VERSION)
    if not help:
        help = {}

    buttons = []
    default = None
    for i, option in enumerate(ok):
        if option.isupper():
            default = i
            option = option.lower()
        buttons.append( (help.get(option, option), option) )

    box.add_buttons(buttons, default, vertical=True)
    result = box.main(ui)
    return result

def yes_no(msg, yeshelp, nohelp, default=True, nowrap=False, ui=None):
    box = dialog('', long_message=msg+"?", title=VERSION)
    box.add_buttons([ ('Yes', True), ('No', False) ], default=1-int(default))
    result = box.main(ui)
    return result

def get_string(prompt, options=None, title=None, empty_ok=False, force_prompt=False,
               default='', ui=None):
    if title:
        title = '%s: %s' % (VERSION, title)
    else:
        title = VERSION

    box = textentry(prompt, title=title, edit_text=default)
    box.add_buttons([ ("OK", 0) ])
    code, text = box.main(ui)
    return text or default

def get_multiline(prompt, options=None, title=None, force_prompt=False,
                  ui=None):
    if title:
        title = '%s: %s' % (VERSION, title)
    else:
        title = VERSION

    box = textentry(prompt, multiline=True)
    box.add_buttons([ ("OK", 0) ])
    code, text = box.main(ui)
    l = text.split('\n')
    return l

def get_password(prompt=None):
    return getpass.getpass(prompt)

def menu(par, options, prompt, default=None, title=None, any_ok=False,
         order=None, extras=None, multiple=False, empty_ok=False, ui=None,
         oklabel='Ok', cancellabel='Cancel', quitlabel=None):
    if not extras:
        extras = []
    else:
        extras = list(extras)

    if not default:
        default = ''

    if title:
        title = '%s: %s' % (VERSION, title)
    else:
        title = VERSION

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

    opts = []
    for option, desc in options:
        if desc:
            opts.append((option, re.sub(r'\s+', ' ', desc)))
        else:
            opts.append((option, desc))
    options = opts

    if multiple:
        widgets = [(urwid.CheckBox(option, state=(option == default)),
                    desc or '') for (option, desc) in options]
        box = checklistdialog(par, widgets, height=('relative', 80),
                              title=title)
        if quitlabel:
            box.add_buttons( [(oklabel, 0), (cancellabel, -1),
                              (quitlabel, -2)] )
        else:
            box.add_buttons( [(oklabel, 0), (cancellabel, -1)] )
        result, chosen = box.main(ui)
        if result < 0:
            return []
        return chosen

    # Single menu option only
    def label_button(option, desc):
        return option

    widgets = []
    rlist = []
    for option, desc in options:
        if option == '---':
            # Separator is just a text label
            b = urwid.Text(desc)
            b = urwid.AttrWrap( b, 'scrolllabel' )
            desc = ''
        else:
            b = urwid.RadioButton( rlist, label_button(option, desc), state=(option == default) )
            b.exitcode = option
            b = urwid.AttrWrap( b, 'selectable','focus' )
        widgets.append((b, desc))

##     if any_ok:
##         editbox = urwid.Edit(multiline=False)
##         e = urwid.ListBox([editbox])
##         e = urwid.AttrWrap(e, 'selectable', 'focustext')
##         e = urwid.Pile( [('fixed', 1, e)] )
##         e = urwid.Filler(e)
##         widgets.append((e, None))

    box = listdialog(par, widgets, height=('relative', 80),
                     title=title, buttonwidth=12)
    if quitlabel:
        box.add_buttons( [(oklabel, 0), (cancellabel, -1), (quitlabel, -2)] )
    else:
        box.add_buttons( [(oklabel, 0), (cancellabel, -1)] )
    focus = 0
    if default:
        for i, opt in enumerate(options):
            if opt[0] == default:
                focus = i
                break

    result, chosen = box.main(ui)
    if result < 0:
        return result

    return chosen

# A real file dialog would be nice here
def get_filename(prompt, title=None, force_prompt=False, default=''):
    return get_string(prompt, title=title, force_prompt=force_prompt,
                      default=default)

def select_multiple(par, options, prompt, title=None, order=None, extras=None):
    return menu(par, options, prompt, title=title, order=order, extras=extras,
                multiple=True, empty_ok=False)

# Things that are very UI dependent go here
def show_report(number, system, mirrors,
                http_proxy, timeout, screen=None, queryonly=False, title='',
                archived='no', mbox_reader_cmd=None):
    from reportbug import debbugs

    ui = screen
    if not ui:
        ui = initialize_urwid_ui()

    sysinfo = debbugs.SYSTEMS[system]
    display_message('Retrieving report #%d from %s bug tracking system...',
        number, sysinfo['name'], title=title, ui=ui)

    info = debbugs.get_report(number, timeout, system, mirrors=mirrors,
                                http_proxy=http_proxy, archived=archived)
    if not info:
        long_message('Bug report #%d not found.', number, title=title, ui=ui)
        return

    options = dict(o='Ok', d='More details (launch browser)',
                   m='Submit more information', q='Quit')
    valid = 'Odmq'

    while 1:
        (buginfo, bodies) = info
        body = bodies[0]

        r = select_options(body, valid, title=buginfo.subject, ui=ui, help=options)
        ui = None
        if not r or (r == 'o'):
            break
        elif r == 'q':
            return -1
        elif r == 'm':
            return buginfo

        launch_browser(debbugs.get_report_url(system, number, archived))
    return

def handle_bts_query(package, bts, timeout, mirrors=None, http_proxy="",
                     queryonly=False, screen=None, title="", archived='no',
                     source=False, version=None, mbox=False, buglist=None,
                     mbox_reader_cmd=None, latest_first=False):
    from reportbug import debbugs

    sysinfo = debbugs.SYSTEMS[bts]
    root = sysinfo.get('btsroot')
    if not root:
        ewrite("%s bug tracking system has no web URL; bypassing query.\n",
               sysinfo['name'])
        return

    ui = screen
    if not ui:
        ui = initialize_urwid_ui()

    if isinstance(package, basestring):
        pkgname = package
        if source:
            pkgname += ' (source)'

        display_message('Querying %s bug tracking system for reports on %s',
                        debbugs.SYSTEMS[bts]['name'], pkgname,
                        ui=ui, title=title)
    else:
        display_message('Querying %s bug tracking system for reports %s',
                        debbugs.SYSTEMS[bts]['name'],
                        ' '.join([str(x) for x in package]), ui=ui,title=title)

    result = None
    try:
        (count, sectitle, hierarchy) = debbugs.get_reports(
            package, timeout, bts, mirrors=mirrors, version=version,
            http_proxy=http_proxy, archived=archived, source=source)

        if not count:
            ui.run_wrapper(nullfunc)
            if hierarchy == None:
                raise NoPackage
            else:
                raise NoBugs
        else:
            if count > 1:
                sectitle = '%d bug reports found' % (count,)
            else:
                sectitle = '%d bug report found' % (count,)

            buglist = []
            for (t, bugs) in hierarchy:
                bcount = len(bugs)
                buglist.append( ('---', t) )
                buglist_tmp = {}
                for bug in bugs:
                    # show if the bugs is already resolved
                    done = ''
                    if bug.pending == 'done':
                        done = '  [RESOLVED]'
                    buglist_tmp[bug.bug_num] = bug.subject+done
                # append the sorted list of bugs for this severity
                map(buglist.append, [(str(k), buglist_tmp[k]) for k in sorted(buglist_tmp, reverse=latest_first)])

            p = buglist[1][0]
            #scr.popWindow()
            if queryonly:
                cancellabel = 'Exit'
                quitlabel = None
            else:
                cancellabel = 'New bug'
                quitlabel='Quit'

            while True:
                info = menu('Select a bug to read (and possibly report more information) or report a new bug:', buglist,
                            '', ui=ui, title=sectitle, default=p,
                            oklabel='Read bug',
                            cancellabel=cancellabel,
                            quitlabel=quitlabel)
                ui = None
                if info < 0:
                    if info == -1:
                        result = None
                    # -2 is the Quit response, triggers the exiting way in main
                    elif info == -2:
                        raise NoReport
                    else:
                        # uniform to return Bugreport instance
                        result = debbugs.get_report(info, timeout)[0]
                    break
                else:
                    p = info
                    res = show_report(int(p), bts, mirrors, http_proxy,
                                      timeout, queryonly=queryonly)
                    if res:
                        result = res
                        break

    except (IOError, NoNetwork):
        ui.run_wrapper(nullfunc)
        long_message('Unable to connect to %s BTS.', sysinfo['name'],
                     title=title)
    except NoPackage:
        ui.run_wrapper(nullfunc)
        long_message('No record of this package found.', title=title)
        raise NoPackage

    # we didn't find a report; we access Bugreport thru debbugs,
    # so to avoid and import of debianbts
    if result and not isinstance(result, debbugs.debianbts.Bugreport):
        raise NoReport

    return result

palette = [
    ('body','black','light gray', 'standout'),
    ('border','black','dark blue'),
    ('shadow','white','black'),
    ('selectable','black', 'dark cyan'),
    ('focus','white','dark blue','bold'),
    ('focustext','light gray','dark blue'),
    ('title', 'dark red', 'light gray'),
    ('scrolllabel', 'white', 'dark cyan'),
    ]

def initialize ():
    return True

def can_input():
    return sys.stdin.isatty()

def test():
    import time

    fp = sys.stdout

    long_message('This is a test.  This is only a test.\nPlease do not adjust your set.')
    time.sleep(1)
##     output = get_string('Tell me your name, biatch.')
##     print >> fp, output
##     output = get_multiline('List all of your aliases now.')
##     print >> fp, output
##     result = select_options('This is really lame', 'ynM', {
##         'y' : 'You bet', 'n' : 'Never!', 'm' : 'Maybe'})
##     print >> fp, result
##     yn = yes_no('Do you like green eggs and ham?', 'Yes sireee', 'No way!')
##     print >> fp, yn

    mailers = [(x, '') for x in reportbug.MUA.keys()]
    mailers.sort()
    mailer = menu('Choose a mailer for your report', mailers,
                  'Select mailer: ', default='mutt', empty_ok=True)
    print >> fp, mailer

    import debbugs

    tags = debbugs.get_tags()

    taglist = select_multiple(
        'Do any of the following apply to this report?', tags,
        'Please select tags: ')
    print >> fp, taglist

if __name__ == '__main__':
    test()
