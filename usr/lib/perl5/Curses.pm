##  CursesFun.c -- the functions
##
##  Copyright (c) 1994-2000  William Setzer
##
##  You may distribute under the terms of either the Artistic License
##  or the GNU General Public License, as specified in the README file.

###
##  For the brave object-using person
#
package Curses::Window;

@ISA = qw(Curses);

package Curses::Screen;

@ISA = qw(Curses);
sub new     { newterm(@_) }
sub DESTROY { }

package Curses::Panel;

@ISA = qw(Curses);
sub new     { new_panel(@_) }
sub DESTROY { }

package Curses::Menu;

@ISA = qw(Curses);
sub new     { new_menu(@_) }
sub DESTROY { }

package Curses::Item;

@ISA = qw(Curses);
sub new     { new_item(@_) }
sub DESTROY { }

package Curses::Form;

@ISA = qw(Curses);
sub new     { new_form(@_) }
sub DESTROY { }

package Curses::Field;

@ISA = qw(Curses);
sub new     { new_field(@_) }
sub DESTROY { }


package Curses;

$VERSION = '1.28'; # Makefile.PL picks this up

use Carp;
require Exporter;
require DynaLoader;
@ISA = qw(Exporter DynaLoader);

bootstrap Curses;

sub new      {
    my $pkg = shift;
    my ($nl, $nc, $by, $bx) = (@_,0,0,0,0);

    unless ($_initscr++) { initscr() }
    return newwin($nl, $nc, $by, $bx);
}

sub DESTROY  { }

sub AUTOLOAD {
    my $N = $AUTOLOAD;
       $N =~ s/^.*:://;

    croak "Curses constant '$N' is not defined by your vendor";
}

sub printw   { addstr(sprintf shift, @_) }

tie $LINES,       Curses::Vars, 1;
tie $COLS,        Curses::Vars, 2;
tie $stdscr,      Curses::Vars, 3;
tie $curscr,      Curses::Vars, 4;
tie $COLORS,      Curses::Vars, 5;
tie $COLOR_PAIRS, Curses::Vars, 6;

@EXPORT = qw(
    printw

    LINES $LINES COLS $COLS stdscr $stdscr curscr $curscr COLORS $COLORS
    COLOR_PAIRS $COLOR_PAIRS

    addch echochar addchstr addchnstr addstr addnstr attroff attron attrset
    standend standout attr_get attr_off attr_on attr_set chgat COLOR_PAIR
    PAIR_NUMBER beep flash bkgd bkgdset getbkgd border box hline vline
    erase clear clrtobot clrtoeol start_color init_pair init_color
    has_colors can_change_color color_content pair_content delch deleteln
    insdelln insertln getch ungetch has_key KEY_F getstr getnstr getyx
    getparyx getbegyx getmaxyx inch inchstr inchnstr initscr endwin
    isendwin newterm set_term delscreen cbreak nocbreak echo noecho
    halfdelay intrflush keypad meta nodelay notimeout raw noraw qiflush
    noqiflush timeout typeahead insch insstr insnstr instr innstr
    def_prog_mode def_shell_mode reset_prog_mode reset_shell_mode resetty
    savetty getsyx setsyx curs_set napms move clearok idlok idcok immedok
    leaveok setscrreg scrollok nl nonl overlay overwrite copywin newpad
    subpad prefresh pnoutrefresh pechochar refresh noutrefresh doupdate
    redrawwin redrawln scr_dump scr_restore scr_init scr_set scroll scrl
    slk_init slk_set slk_refresh slk_noutrefresh slk_label slk_clear
    slk_restore slk_touch slk_attron slk_attrset slk_attr slk_attroff
    slk_color baudrate erasechar has_ic has_il killchar longname termattrs
    termname touchwin touchline untouchwin touchln is_linetouched
    is_wintouched unctrl keyname filter use_env putwin getwin delay_output
    flushinp newwin delwin mvwin subwin derwin mvderwin dupwin syncup
    syncok cursyncup syncdown getmouse ungetmouse mousemask enclose
    mouse_trafo mouseinterval BUTTON_RELEASE BUTTON_PRESS BUTTON_CLICK
    BUTTON_DOUBLE_CLICK BUTTON_TRIPLE_CLICK BUTTON_RESERVED_EVENT
    use_default_colors assume_default_colors define_key keybound keyok
    resizeterm resize getmaxy getmaxx flusok getcap touchoverlap new_panel
    bottom_panel top_panel show_panel update_panels hide_panel panel_window
    replace_panel move_panel panel_hidden panel_above panel_below
    set_panel_userptr panel_userptr del_panel set_menu_fore menu_fore
    set_menu_back menu_back set_menu_grey menu_grey set_menu_pad menu_pad
    pos_menu_cursor menu_driver set_menu_format menu_format set_menu_items
    menu_items item_count set_menu_mark menu_mark new_menu free_menu
    menu_opts set_menu_opts menu_opts_on menu_opts_off set_menu_pattern
    menu_pattern post_menu unpost_menu set_menu_userptr menu_userptr
    set_menu_win menu_win set_menu_sub menu_sub scale_menu set_current_item
    current_item set_top_row top_row item_index item_name item_description
    new_item free_item set_item_opts item_opts_on item_opts_off item_opts
    item_userptr set_item_userptr set_item_value item_value item_visible
    menu_request_name menu_request_by_name set_menu_spacing menu_spacing
    pos_form_cursor data_ahead data_behind form_driver set_form_fields
    form_fields field_count move_field new_form free_form set_new_page
    new_page set_form_opts form_opts_on form_opts_off form_opts
    set_current_field current_field set_form_page form_page field_index
    post_form unpost_form set_form_userptr form_userptr set_form_win
    form_win set_form_sub form_sub scale_form set_field_fore field_fore
    set_field_back field_back set_field_pad field_pad set_field_buffer
    field_buffer set_field_status field_status set_max_field field_info
    dynamic_field_info set_field_just field_just new_field dup_field
    link_field free_field set_field_opts field_opts_on field_opts_off
    field_opts set_field_userptr field_userptr field_arg form_request_name
    form_request_by_name

    ERR OK ACS_BLOCK ACS_BOARD ACS_BTEE ACS_BULLET ACS_CKBOARD ACS_DARROW
    ACS_DEGREE ACS_DIAMOND ACS_HLINE ACS_LANTERN ACS_LARROW ACS_LLCORNER
    ACS_LRCORNER ACS_LTEE ACS_PLMINUS ACS_PLUS ACS_RARROW ACS_RTEE ACS_S1
    ACS_S9 ACS_TTEE ACS_UARROW ACS_ULCORNER ACS_URCORNER ACS_VLINE
    A_ALTCHARSET A_ATTRIBUTES A_BLINK A_BOLD A_CHARTEXT A_COLOR A_DIM
    A_INVIS A_NORMAL A_PROTECT A_REVERSE A_STANDOUT A_UNDERLINE COLOR_BLACK
    COLOR_BLUE COLOR_CYAN COLOR_GREEN COLOR_MAGENTA COLOR_RED COLOR_WHITE
    COLOR_YELLOW KEY_A1 KEY_A3 KEY_B2 KEY_BACKSPACE KEY_BEG KEY_BREAK
    KEY_BTAB KEY_C1 KEY_C3 KEY_CANCEL KEY_CATAB KEY_CLEAR KEY_CLOSE
    KEY_COMMAND KEY_COPY KEY_CREATE KEY_CTAB KEY_DC KEY_DL KEY_DOWN KEY_EIC
    KEY_END KEY_ENTER KEY_EOL KEY_EOS KEY_EVENT KEY_EXIT
    KEY_F0 KEY_FIND KEY_HELP
    KEY_HOME KEY_IC KEY_IL KEY_LEFT KEY_LL KEY_MARK KEY_MAX KEY_MESSAGE
    KEY_MOUSE KEY_MIN KEY_MOVE KEY_NEXT KEY_NPAGE
    KEY_OPEN KEY_OPTIONS KEY_PPAGE
    KEY_PREVIOUS KEY_PRINT KEY_REDO KEY_REFERENCE KEY_REFRESH KEY_REPLACE
    KEY_RESET  KEY_RESIZE KEY_RESTART KEY_RESUME KEY_RIGHT KEY_SAVE KEY_SBEG
    KEY_SCANCEL KEY_SCOMMAND KEY_SCOPY KEY_SCREATE KEY_SDC KEY_SDL
    KEY_SELECT KEY_SEND KEY_SEOL KEY_SEXIT KEY_SF KEY_SFIND KEY_SHELP
    KEY_SHOME KEY_SIC KEY_SLEFT KEY_SMESSAGE KEY_SMOVE KEY_SNEXT
    KEY_SOPTIONS KEY_SPREVIOUS KEY_SPRINT KEY_SR KEY_SREDO KEY_SREPLACE
    KEY_SRESET KEY_SRIGHT KEY_SRSUME KEY_SSAVE KEY_SSUSPEND KEY_STAB
    KEY_SUNDO KEY_SUSPEND KEY_UNDO KEY_UP
    BUTTON1_RELEASED BUTTON1_PRESSED BUTTON1_CLICKED BUTTON1_DOUBLE_CLICKED
    BUTTON1_TRIPLE_CLICKED BUTTON1_RESERVED_EVENT BUTTON2_RELEASED
    BUTTON2_PRESSED BUTTON2_CLICKED BUTTON2_DOUBLE_CLICKED
    BUTTON2_TRIPLE_CLICKED BUTTON2_RESERVED_EVENT BUTTON3_RELEASED
    BUTTON3_PRESSED BUTTON3_CLICKED BUTTON3_DOUBLE_CLICKED
    BUTTON3_TRIPLE_CLICKED BUTTON3_RESERVED_EVENT BUTTON4_RELEASED
    BUTTON4_PRESSED BUTTON4_CLICKED BUTTON4_DOUBLE_CLICKED
    BUTTON4_TRIPLE_CLICKED BUTTON4_RESERVED_EVENT BUTTON_CTRL BUTTON_SHIFT
    BUTTON_ALT ALL_MOUSE_EVENTS REPORT_MOUSE_POSITION NCURSES_MOUSE_VERSION
    E_OK E_SYSTEM_ERROR E_BAD_ARGUMENT E_POSTED E_CONNECTED E_BAD_STATE
    E_NO_ROOM E_NOT_POSTED E_UNKNOWN_COMMAND E_NO_MATCH E_NOT_SELECTABLE
    E_NOT_CONNECTED E_REQUEST_DENIED E_INVALID_FIELD E_CURRENT
    REQ_LEFT_ITEM REQ_RIGHT_ITEM REQ_UP_ITEM REQ_DOWN_ITEM REQ_SCR_ULINE
    REQ_SCR_DLINE REQ_SCR_DPAGE REQ_SCR_UPAGE REQ_FIRST_ITEM REQ_LAST_ITEM
    REQ_NEXT_ITEM REQ_PREV_ITEM REQ_TOGGLE_ITEM REQ_CLEAR_PATTERN
    REQ_BACK_PATTERN REQ_NEXT_MATCH REQ_PREV_MATCH MIN_MENU_COMMAND
    MAX_MENU_COMMAND O_ONEVALUE O_SHOWDESC O_ROWMAJOR O_IGNORECASE
    O_SHOWMATCH O_NONCYCLIC O_SELECTABLE REQ_NEXT_PAGE REQ_PREV_PAGE
    REQ_FIRST_PAGE REQ_LAST_PAGE REQ_NEXT_FIELD REQ_PREV_FIELD
    REQ_FIRST_FIELD REQ_LAST_FIELD REQ_SNEXT_FIELD REQ_SPREV_FIELD
    REQ_SFIRST_FIELD REQ_SLAST_FIELD REQ_LEFT_FIELD REQ_RIGHT_FIELD
    REQ_UP_FIELD REQ_DOWN_FIELD REQ_NEXT_CHAR REQ_PREV_CHAR REQ_NEXT_LINE
    REQ_PREV_LINE REQ_NEXT_WORD REQ_PREV_WORD REQ_BEG_FIELD REQ_END_FIELD
    REQ_BEG_LINE REQ_END_LINE REQ_LEFT_CHAR REQ_RIGHT_CHAR REQ_UP_CHAR
    REQ_DOWN_CHAR REQ_NEW_LINE REQ_INS_CHAR REQ_INS_LINE REQ_DEL_CHAR
    REQ_DEL_PREV REQ_DEL_LINE REQ_DEL_WORD REQ_CLR_EOL REQ_CLR_EOF
    REQ_CLR_FIELD REQ_OVL_MODE REQ_INS_MODE REQ_SCR_FLINE REQ_SCR_BLINE
    REQ_SCR_FPAGE REQ_SCR_BPAGE REQ_SCR_FHPAGE REQ_SCR_BHPAGE REQ_SCR_FCHAR
    REQ_SCR_BCHAR REQ_SCR_HFLINE REQ_SCR_HBLINE REQ_SCR_HFHALF
    REQ_SCR_HBHALF REQ_VALIDATION REQ_NEXT_CHOICE REQ_PREV_CHOICE
    MIN_FORM_COMMAND MAX_FORM_COMMAND NO_JUSTIFICATION JUSTIFY_LEFT
    JUSTIFY_CENTER JUSTIFY_RIGHT O_VISIBLE O_ACTIVE O_PUBLIC O_EDIT O_WRAP
    O_BLANK O_AUTOSKIP O_NULLOK O_PASSOK O_STATIC O_NL_OVERLOAD
    O_BS_OVERLOAD
);

if ($OldCurses)
{
    @_OLD = qw(
        wprintw mvprintw wmvprintw

        waddch mvaddch mvwaddch wechochar waddchstr mvaddchstr
        mvwaddchstr waddchnstr mvaddchnstr mvwaddchnstr waddstr
        mvaddstr mvwaddstr waddnstr mvaddnstr mvwaddnstr wattroff
        wattron wattrset wstandend wstandout wattr_get wattr_off wattr_on
        wattr_set wchgat mvchgat mvwchgat wbkgd wbkgdset wborder whline
        mvhline mvwhline wvline mvvline mvwvline werase wclear
        wclrtobot wclrtoeol wdelch mvdelch mvwdelch wdeleteln winsdelln
        winsertln wgetch mvgetch mvwgetch wgetstr mvgetstr mvwgetstr
        wgetnstr mvgetnstr mvwgetnstr winch mvinch mvwinch winchstr
        mvinchstr mvwinchstr winchnstr mvinchnstr mvwinchnstr wtimeout
        winsch mvinsch mvwinsch winsstr mvinsstr mvwinsstr winsnstr
        mvinsnstr mvwinsnstr winstr mvinstr mvwinstr winnstr mvinnstr
        mvwinnstr wmove wsetscrreg wrefresh wnoutrefresh wredrawln wscrl
        wtouchln wsyncup wcursyncup wsyncdown wenclose wmouse_trafo wresize
    );

    push (@EXPORT, @_OLD);
    for (@_OLD)
    {
	/^(?:mv)?(?:w)?(.*)/;
	eval "sub $_ { $1(\@_); }";
    }

    eval <<EOS;
    sub wprintw   { addstr(shift,               sprintf shift, @_) }
    sub mvprintw  { addstr(shift, shift,        sprintf shift, @_) }
    sub mvwprintw { addstr(shift, shift, shift, sprintf shift, @_) }
EOS
}

1;

__END__

=head1 NAME

Curses - terminal screen handling and optimization

=head1 SYNOPSIS

    use Curses;

    initscr;
    ...
    endwin;


   Curses::supports_function($function);
   Curses::supports_constant($constant);

=head1 DESCRIPTION

C<Curses> is the interface between Perl and your system's curses(3)
library.  For descriptions on the usage of a given function, variable,
or constant, consult your system's documentation, as such information
invariably varies (:-) between different curses(3) libraries and
operating systems.  This document describes the interface itself, and
assumes that you already know how your system's curses(3) library
works.

=head2 Unified Functions

Many curses(3) functions have variants starting with the prefixes
I<w->, I<mv->, and/or I<wmv->.  These variants differ only in the
explicit addition of a window, or by the addition of two coordinates
that are used to move the cursor first.  For example, C<addch()> has
three other variants: C<waddch()>, C<mvaddch()>, and C<mvwaddch()>.
The variants aren't very interesting; in fact, we could roll all of
the variants into original function by allowing a variable number
of arguments and analyzing the argument list for which variant the
user wanted to call.

Unfortunately, curses(3) predates varargs(3), so in C we were stuck
with all the variants.  However, C<Curses> is a Perl interface, so we
are free to "unify" these variants into one function.  The section
L<"Available Functions"> below lists all curses(3) functions C<Curses>
makes available as Perl equivalents, along with a column listing if it
is I<unified>.  If so, it takes a varying number of arguments as
follows:

=over 4

C<function( [win], [y, x], args );>

I<win> is an optional window argument, defaulting to C<stdscr> if not
specified.

I<y, x> is an optional coordinate pair used to move the cursor,
defaulting to no move if not specified.

I<args> are the required arguments of the function.  These are the
arguments you would specify if you were just calling the base function
and not any of the variants.

=back

This makes the variants obsolete, since their functionality has been
merged into a single function, so C<Curses> does not define them by
default.  You can still get them if you want, by setting the
variable C<$Curses::OldCurses> to a non-zero value before using the
C<Curses> package.  See L<"Perl 4.X C<cursperl> Compatibility">
for an example of this.

=head2 Objects

Objects work.  Example:

    $win = new Curses;
    $win->addstr(10, 10, 'foo');
    $win->refresh;
    ...

Any function that has been marked as I<unified> (see
L<"Available Functions"> below and L<"Unified Functions"> above)
can be called as a method for a Curses object.

Do not use C<initscr()> if using objects, as the first call to get
a C<new Curses> will do it for you.

=head2 Security Concerns

It has always been the case with the curses functions, but please note
that the following functions:

    getstr()   (and optional wgetstr(), mvgetstr(), and mvwgetstr())
    inchstr()  (and optional winchstr(), mvinchstr(), and mvwinchstr())
    instr()    (and optional winstr(), mvinstr(), and mvwinstr())

are subject to buffer overflow attack.  This is because you pass in
the buffer to be filled in, which has to be of finite length, but
there is no way to stop a bad guy from typing.

In order to avoid this problem, use the alternate functions:

   getnstr()
   inchnstr()
   innstr()

which take an extra "size of buffer" argument.

=head1 COMPATIBILITY

=head2 Perl 4.X C<cursperl> Compatibility

C<Curses> has been written to take advantage of the new features of
Perl.  I felt it better to provide an improved curses programming
environment rather than to be 100% compatible.  However, many old
C<curseperl> applications will probably still work by starting the
script with:

    BEGIN { $Curses::OldCurses = 1; }
    use Curses;

Any old application that still does not work should print an
understandable error message explaining the problem.

Some functions and variables are not available through C<Curses>, even with
the C<BEGIN> line.  They are listed under
L<"curses(3) items not available through Curses">.

The variables C<$stdscr> and C<$curscr> are also available as
functions C<stdscr> and C<curscr>.  This is because of a Perl bug.
See the L<BUGS> section for details.

=head2 Incompatibilities with previous versions of C<Curses>

In previous versions of this software, some Perl functions took a
different set of parameters than their C counterparts.  This is no
longer true.  You should now use C<getstr($str)> and C<getyx($y, $x)>
instead of C<$str = getstr()> and C<($y, $x) = getyx()>.

=head2 Incompatibilities with other Perl programs

    menu.pl, v3.0 and v3.1
	There were various interaction problems between these two
	releases and Curses.  Please upgrade to the latest version
	(v3.3 as of 3/16/96).

=head1 DIAGNOSTICS

=over 4

=item * Curses function '%s' called with too %s arguments at ...

You have called a C<Curses> function with a wrong number of
arguments.

=item * argument %d to Curses function '%s' is not a Curses %s at ...
=item * argument is not a Curses %s at ...

The argument you gave to the function wasn't what it wanted.

This probably means that you didn't give the right arguments to a
I<unified> function.  See the DESCRIPTION section on L<Unified
Functions> for more information.

=item * Curses function '%s' is not defined by your vendor at ...

You have a C<Curses> function in your code that your system's curses(3)
library doesn't define.

=item * Curses variable '%s' is not defined by your vendor at ...

You have a C<Curses> variable in your code that your system's curses(3)
library doesn't define.

=item * Curses constant '%s' is not defined by your vendor at ...

You have a C<Curses> constant in your code that your system's curses(3)
library doesn't define.

=item * Curses::Vars::FETCH called with bad index at ...
=item * Curses::Vars::STORE called with bad index at ...

You've been playing with the C<tie> interface to the C<Curses>
variables.  Don't do that.  :-)

=item * Anything else

Check out the F<perldiag> man page to see if the error is in there.

=back

=head1 BUGS

If you use the variables C<$stdscr> and C<$curscr> instead of their
functional counterparts (C<stdscr> and C<curscr>), you might run into
a bug in Perl where the "magic" isn't called early enough.  This is
manifested by the C<Curses> package telling you C<$stdscr> isn't a
window.  One workaround is to put a line like C<$stdscr = $stdscr>
near the front of your program.

Probably many more.

=head1 AUTHOR

William Setzer <William_Setzer@ncsu.edu>

=head1 SYNOPSIS OF PERL CURSES AVAILABILITY

=head2 Available Functions

    Available Function   Unified?     Available via $OldCurses[*]
    ------------------   --------     ------------------------
    addch                  Yes        waddch mvaddch mvwaddch
    echochar               Yes        wechochar
    addchstr               Yes        waddchstr mvaddchstr mvwaddchstr
    addchnstr              Yes        waddchnstr mvaddchnstr mvwaddchnstr
    addstr                 Yes        waddstr mvaddstr mvwaddstr
    addnstr                Yes        waddnstr mvaddnstr mvwaddnstr
    attroff                Yes        wattroff
    attron                 Yes        wattron
    attrset                Yes        wattrset
    standend               Yes        wstandend
    standout               Yes        wstandout
    attr_get               Yes        wattr_get
    attr_off               Yes        wattr_off
    attr_on                Yes        wattr_on
    attr_set               Yes        wattr_set
    chgat                  Yes        wchgat mvchgat mvwchgat
    COLOR_PAIR              No
    PAIR_NUMBER             No
    beep                    No
    flash                   No
    bkgd                   Yes        wbkgd
    bkgdset                Yes        wbkgdset
    getbkgd                Yes
    border                 Yes        wborder
    box                    Yes
    hline                  Yes        whline mvhline mvwhline
    vline                  Yes        wvline mvvline mvwvline
    erase                  Yes        werase
    clear                  Yes        wclear
    clrtobot               Yes        wclrtobot
    clrtoeol               Yes        wclrtoeol
    start_color             No
    init_pair               No
    init_color              No
    has_colors              No
    can_change_color        No
    color_content           No
    pair_content            No
    delch                  Yes        wdelch mvdelch mvwdelch
    deleteln               Yes        wdeleteln
    insdelln               Yes        winsdelln
    insertln               Yes        winsertln
    getch                  Yes        wgetch mvgetch mvwgetch
    ungetch                 No
    has_key                 No
    KEY_F                   No
    getstr                 Yes        wgetstr mvgetstr mvwgetstr
    getnstr                Yes        wgetnstr mvgetnstr mvwgetnstr
    getyx                  Yes
    getparyx               Yes
    getbegyx               Yes
    getmaxyx               Yes
    inch                   Yes        winch mvinch mvwinch
    inchstr                Yes        winchstr mvinchstr mvwinchstr
    inchnstr               Yes        winchnstr mvinchnstr mvwinchnstr
    initscr                 No
    endwin                  No
    isendwin                No
    newterm                 No
    set_term                No
    delscreen               No
    cbreak                  No
    nocbreak                No
    echo                    No
    noecho                  No
    halfdelay               No
    intrflush              Yes
    keypad                 Yes
    meta                   Yes
    nodelay                Yes
    notimeout              Yes
    raw                     No
    noraw                   No
    qiflush                 No
    noqiflush               No
    timeout                Yes        wtimeout
    typeahead               No
    insch                  Yes        winsch mvinsch mvwinsch
    insstr                 Yes        winsstr mvinsstr mvwinsstr
    insnstr                Yes        winsnstr mvinsnstr mvwinsnstr
    instr                  Yes        winstr mvinstr mvwinstr
    innstr                 Yes        winnstr mvinnstr mvwinnstr
    def_prog_mode           No
    def_shell_mode          No
    reset_prog_mode         No
    reset_shell_mode        No
    resetty                 No
    savetty                 No
    getsyx                  No
    setsyx                  No
    curs_set                No
    napms                   No
    move                   Yes        wmove
    clearok                Yes
    idlok                  Yes
    idcok                  Yes
    immedok                Yes
    leaveok                Yes
    setscrreg              Yes        wsetscrreg
    scrollok               Yes
    nl                      No
    nonl                    No
    overlay                 No
    overwrite               No
    copywin                 No
    newpad                  No
    subpad                  No
    prefresh                No
    pnoutrefresh            No
    pechochar               No
    refresh                Yes        wrefresh
    noutrefresh            Yes        wnoutrefresh
    doupdate                No
    redrawwin              Yes
    redrawln               Yes        wredrawln
    scr_dump                No
    scr_restore             No
    scr_init                No
    scr_set                 No
    scroll                 Yes
    scrl                   Yes        wscrl
    slk_init                No
    slk_set                 No
    slk_refresh             No
    slk_noutrefresh         No
    slk_label               No
    slk_clear               No
    slk_restore             No
    slk_touch               No
    slk_attron              No
    slk_attrset             No
    slk_attr                No
    slk_attroff             No
    slk_color               No
    baudrate                No
    erasechar               No
    has_ic                  No
    has_il                  No
    killchar                No
    longname                No
    termattrs               No
    termname                No
    touchwin               Yes
    touchline              Yes
    untouchwin             Yes
    touchln                Yes        wtouchln
    is_linetouched         Yes
    is_wintouched          Yes
    unctrl                  No
    keyname                 No
    filter                  No
    use_env                 No
    putwin                  No
    getwin                  No
    delay_output            No
    flushinp                No
    newwin                  No
    delwin                 Yes
    mvwin                  Yes
    subwin                 Yes
    derwin                 Yes
    mvderwin               Yes
    dupwin                 Yes
    syncup                 Yes        wsyncup
    syncok                 Yes
    cursyncup              Yes        wcursyncup
    syncdown               Yes        wsyncdown
    getmouse                No
    ungetmouse              No
    mousemask               No
    enclose                Yes        wenclose
    mouse_trafo            Yes        wmouse_trafo
    mouseinterval           No
    BUTTON_RELEASE          No
    BUTTON_PRESS            No
    BUTTON_CLICK            No
    BUTTON_DOUBLE_CLICK     No
    BUTTON_TRIPLE_CLICK     No
    BUTTON_RESERVED_EVENT   No
    use_default_colors      No
    assume_default_colors   No
    define_key              No
    keybound                No
    keyok                   No
    resizeterm              No
    resize                 Yes        wresize
    getmaxy                Yes
    getmaxx                Yes
    flusok                 Yes
    getcap                  No
    touchoverlap            No
    new_panel               No
    bottom_panel            No
    top_panel               No
    show_panel              No
    update_panels           No
    hide_panel              No
    panel_window            No
    replace_panel           No
    move_panel              No
    panel_hidden            No
    panel_above             No
    panel_below             No
    set_panel_userptr       No
    panel_userptr           No
    del_panel               No
    set_menu_fore           No
    menu_fore               No
    set_menu_back           No
    menu_back               No
    set_menu_grey           No
    menu_grey               No
    set_menu_pad            No
    menu_pad                No
    pos_menu_cursor         No
    menu_driver             No
    set_menu_format         No
    menu_format             No
    set_menu_items          No
    menu_items              No
    item_count              No
    set_menu_mark           No
    menu_mark               No
    new_menu                No
    free_menu               No
    menu_opts               No
    set_menu_opts           No
    menu_opts_on            No
    menu_opts_off           No
    set_menu_pattern        No
    menu_pattern            No
    post_menu               No
    unpost_menu             No
    set_menu_userptr        No
    menu_userptr            No
    set_menu_win            No
    menu_win                No
    set_menu_sub            No
    menu_sub                No
    scale_menu              No
    set_current_item        No
    current_item            No
    set_top_row             No
    top_row                 No
    item_index              No
    item_name               No
    item_description        No
    new_item                No
    free_item               No
    set_item_opts           No
    item_opts_on            No
    item_opts_off           No
    item_opts               No
    item_userptr            No
    set_item_userptr        No
    set_item_value          No
    item_value              No
    item_visible            No
    menu_request_name       No
    menu_request_by_name    No
    set_menu_spacing        No
    menu_spacing            No
    pos_form_cursor         No
    data_ahead              No
    data_behind             No
    form_driver             No
    set_form_fields         No
    form_fields             No
    field_count             No
    move_field              No
    new_form                No
    free_form               No
    set_new_page            No
    new_page                No
    set_form_opts           No
    form_opts_on            No
    form_opts_off           No
    form_opts               No
    set_current_field       No
    current_field           No
    set_form_page           No
    form_page               No
    field_index             No
    post_form               No
    unpost_form             No
    set_form_userptr        No
    form_userptr            No
    set_form_win            No
    form_win                No
    set_form_sub            No
    form_sub                No
    scale_form              No
    set_field_fore          No
    field_fore              No
    set_field_back          No
    field_back              No
    set_field_pad           No
    field_pad               No
    set_field_buffer        No
    field_buffer            No
    set_field_status        No
    field_status            No
    set_max_field           No
    field_info              No
    dynamic_field_info      No
    set_field_just          No
    field_just              No
    new_field               No
    dup_field               No
    link_field              No
    free_field              No
    set_field_opts          No
    field_opts_on           No
    field_opts_off          No
    field_opts              No
    set_field_userptr       No
    field_userptr           No
    field_arg               No
    form_request_name       No
    form_request_by_name    No

[*] To use any functions in this column, the variable
C<$Curses::OldCurses> must be set to a non-zero value before using the
C<Curses> package.  See L<"Perl 4.X cursperl Compatibility"> for an
example of this.

=head2 Available Variables

    LINES                   COLS                    stdscr
    curscr                  COLORS                  COLOR_PAIRS

=head2 Available Constants

    ERR                     OK                      ACS_BLOCK
    ACS_BOARD               ACS_BTEE                ACS_BULLET
    ACS_CKBOARD             ACS_DARROW              ACS_DEGREE
    ACS_DIAMOND             ACS_HLINE               ACS_LANTERN
    ACS_LARROW              ACS_LLCORNER            ACS_LRCORNER
    ACS_LTEE                ACS_PLMINUS             ACS_PLUS
    ACS_RARROW              ACS_RTEE                ACS_S1
    ACS_S9                  ACS_TTEE                ACS_UARROW
    ACS_ULCORNER            ACS_URCORNER            ACS_VLINE
    A_ALTCHARSET            A_ATTRIBUTES            A_BLINK
    A_BOLD                  A_CHARTEXT              A_COLOR
    A_DIM                   A_INVIS                 A_NORMAL
    A_PROTECT               A_REVERSE               A_STANDOUT
    A_UNDERLINE             COLOR_BLACK             COLOR_BLUE
    COLOR_CYAN              COLOR_GREEN             COLOR_MAGENTA
    COLOR_RED               COLOR_WHITE             COLOR_YELLOW
    KEY_A1                  KEY_A3                  KEY_B2
    KEY_BACKSPACE           KEY_BEG                 KEY_BREAK
    KEY_BTAB                KEY_C1                  KEY_C3
    KEY_CANCEL              KEY_CATAB               KEY_CLEAR
    KEY_CLOSE               KEY_COMMAND             KEY_COPY
    KEY_CREATE              KEY_CTAB                KEY_DC
    KEY_DL                  KEY_DOWN                KEY_EIC
    KEY_END                 KEY_ENTER               KEY_EOL
    KEY_EOS                 KEY_EVENT               KEY_EXIT
    KEY_F0
    KEY_FIND                KEY_HELP                KEY_HOME
    KEY_IC                  KEY_IL                  KEY_LEFT
    KEY_LL                  KEY_MARK                KEY_MAX
    KEY_MESSAGE             KEY_MIN                 KEY_MOVE
    KEY_NEXT                KEY_NPAGE               KEY_OPEN
    KEY_OPTIONS             KEY_PPAGE               KEY_PREVIOUS
    KEY_PRINT               KEY_REDO                KEY_REFERENCE
    KEY_REFRESH             KEY_REPLACE             KEY_RESET
    KEY_RESIZE              KEY_RESTART             KEY_RESUME
    KEY_RIGHT
    KEY_SAVE                KEY_SBEG                KEY_SCANCEL
    KEY_SCOMMAND            KEY_SCOPY               KEY_SCREATE
    KEY_SDC                 KEY_SDL                 KEY_SELECT
    KEY_SEND                KEY_SEOL                KEY_SEXIT
    KEY_SF                  KEY_SFIND               KEY_SHELP
    KEY_SHOME               KEY_SIC                 KEY_SLEFT
    KEY_SMESSAGE            KEY_SMOVE               KEY_SNEXT
    KEY_SOPTIONS            KEY_SPREVIOUS           KEY_SPRINT
    KEY_SR                  KEY_SREDO               KEY_SREPLACE
    KEY_SRESET              KEY_SRIGHT              KEY_SRSUME
    KEY_SSAVE               KEY_SSUSPEND            KEY_STAB
    KEY_SUNDO               KEY_SUSPEND             KEY_UNDO
    KEY_UP                  KEY_MOUSE               BUTTON1_RELEASED
    BUTTON1_PRESSED         BUTTON1_CLICKED         BUTTON1_DOUBLE_CLICKED
    BUTTON1_TRIPLE_CLICKED  BUTTON1_RESERVED_EVENT  BUTTON2_RELEASED
    BUTTON2_PRESSED         BUTTON2_CLICKED         BUTTON2_DOUBLE_CLICKED
    BUTTON2_TRIPLE_CLICKED  BUTTON2_RESERVED_EVENT  BUTTON3_RELEASED
    BUTTON3_PRESSED         BUTTON3_CLICKED         BUTTON3_DOUBLE_CLICKED
    BUTTON3_TRIPLE_CLICKED  BUTTON3_RESERVED_EVENT  BUTTON4_RELEASED
    BUTTON4_PRESSED         BUTTON4_CLICKED         BUTTON4_DOUBLE_CLICKED
    BUTTON4_TRIPLE_CLICKED  BUTTON4_RESERVED_EVENT  BUTTON_CTRL
    BUTTON_SHIFT            BUTTON_ALT              ALL_MOUSE_EVENTS
    REPORT_MOUSE_POSITION   NCURSES_MOUSE_VERSION   E_OK
    E_SYSTEM_ERROR          E_BAD_ARGUMENT          E_POSTED
    E_CONNECTED             E_BAD_STATE             E_NO_ROOM
    E_NOT_POSTED            E_UNKNOWN_COMMAND       E_NO_MATCH
    E_NOT_SELECTABLE        E_NOT_CONNECTED         E_REQUEST_DENIED
    E_INVALID_FIELD         E_CURRENT               REQ_LEFT_ITEM
    REQ_RIGHT_ITEM          REQ_UP_ITEM             REQ_DOWN_ITEM
    REQ_SCR_ULINE           REQ_SCR_DLINE           REQ_SCR_DPAGE
    REQ_SCR_UPAGE           REQ_FIRST_ITEM          REQ_LAST_ITEM
    REQ_NEXT_ITEM           REQ_PREV_ITEM           REQ_TOGGLE_ITEM
    REQ_CLEAR_PATTERN       REQ_BACK_PATTERN        REQ_NEXT_MATCH
    REQ_PREV_MATCH          MIN_MENU_COMMAND        MAX_MENU_COMMAND
    O_ONEVALUE              O_SHOWDESC              O_ROWMAJOR
    O_IGNORECASE            O_SHOWMATCH             O_NONCYCLIC
    O_SELECTABLE            REQ_NEXT_PAGE           REQ_PREV_PAGE
    REQ_FIRST_PAGE          REQ_LAST_PAGE           REQ_NEXT_FIELD
    REQ_PREV_FIELD          REQ_FIRST_FIELD         REQ_LAST_FIELD
    REQ_SNEXT_FIELD         REQ_SPREV_FIELD         REQ_SFIRST_FIELD
    REQ_SLAST_FIELD         REQ_LEFT_FIELD          REQ_RIGHT_FIELD
    REQ_UP_FIELD            REQ_DOWN_FIELD          REQ_NEXT_CHAR
    REQ_PREV_CHAR           REQ_NEXT_LINE           REQ_PREV_LINE
    REQ_NEXT_WORD           REQ_PREV_WORD           REQ_BEG_FIELD
    REQ_END_FIELD           REQ_BEG_LINE            REQ_END_LINE
    REQ_LEFT_CHAR           REQ_RIGHT_CHAR          REQ_UP_CHAR
    REQ_DOWN_CHAR           REQ_NEW_LINE            REQ_INS_CHAR
    REQ_INS_LINE            REQ_DEL_CHAR            REQ_DEL_PREV
    REQ_DEL_LINE            REQ_DEL_WORD            REQ_CLR_EOL
    REQ_CLR_EOF             REQ_CLR_FIELD           REQ_OVL_MODE
    REQ_INS_MODE            REQ_SCR_FLINE           REQ_SCR_BLINE
    REQ_SCR_FPAGE           REQ_SCR_BPAGE           REQ_SCR_FHPAGE
    REQ_SCR_BHPAGE          REQ_SCR_FCHAR           REQ_SCR_BCHAR
    REQ_SCR_HFLINE          REQ_SCR_HBLINE          REQ_SCR_HFHALF
    REQ_SCR_HBHALF          REQ_VALIDATION          REQ_NEXT_CHOICE
    REQ_PREV_CHOICE         MIN_FORM_COMMAND        MAX_FORM_COMMAND
    NO_JUSTIFICATION        JUSTIFY_LEFT            JUSTIFY_CENTER
    JUSTIFY_RIGHT           O_VISIBLE               O_ACTIVE
    O_PUBLIC                O_EDIT                  O_WRAP
    O_BLANK                 O_AUTOSKIP              O_NULLOK
    O_PASSOK                O_STATIC                O_NL_OVERLOAD
    O_BS_OVERLOAD           

=head2 curses(3) functions not available through C<Curses>

    tstp _putchar fullname scanw wscanw mvscanw mvwscanw ripoffline
    setupterm setterm set_curterm del_curterm restartterm tparm tputs
    putp vidputs vidattr mvcur tigetflag tigetnum tigetstr tgetent
    tgetflag tgetnum tgetstr tgoto tputs

=head2 menu(3) functions not available through C<Curses>

    set_item_init item_init set_item_term item_term set_menu_init
    menu_init set_menu_term menu_term

=head2 form(3) functions not available through C<Curses>

    new_fieldtype free_fieldtype set_fieldtype_arg
    set_fieldtype_choice link_fieldtype set_form_init form_init
    set_form_term form_term set_field_init field_init set_field_term
    field_term set_field_type field_type
