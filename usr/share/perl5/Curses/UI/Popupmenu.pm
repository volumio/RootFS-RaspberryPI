# ----------------------------------------------------------------------
# Curses::UI::Popupmenu
# Curses::UI::PopupmenuListbox
#
# (c) 2001-2002 by Maurice Makaay. All rights reserved.
# This file is part of Curses::UI. Curses::UI is free software.
# You can redistribute it and/or modify it under the same terms
# as perl itself.
#
# Currently maintained by Marcus Thiesen
# e-mail: marcus@cpan.thiesenweb.de
# ----------------------------------------------------------------------

# TODO: fix dox

# ----------------------------------------------------------------------
# Windowable listbox
# ----------------------------------------------------------------------

package Curses::UI::PopupmenuListbox;

use Curses;
use Curses::UI::Listbox;
use Curses::UI::Window;
use Curses::UI::Common;

use vars qw(
    $VERSION
    @ISA
);

$VERSION = '1.0011';

@ISA = qw(
    Curses::UI::Listbox
    Curses::UI::Window
);

sub new()
{
    my $class = shift;
    my $this = $class->SUPER::new(@_);

    # Do own option_select() method.
    $this->set_routine('option-select', \&option_select);

    return $this;
}

sub option_select()
{
    my $this = shift;
    $this->SUPER::option_select();
    $this->loose_focus;
    return $this;
}

# Let Curses::UI->usemodule() believe that this module
# was already loaded (usemodule() would else try to
# require the non-existing file).
#
$INC{'Curses/UI/PopupmenuListbox.pm'} = $INC{'Curses/UI/Popupmenu.pm'};


# ----------------------------------------------------------------------
# The Popupmenu
# ----------------------------------------------------------------------

package Curses::UI::Popupmenu;

use strict;
use Curses;
use Curses::UI::Common;
use Curses::UI::Widget;
use Curses::UI::Listbox; # for maxlabelwidth()

use vars qw(
    $VERSION 
    @ISA
);

$VERSION = '1.10';

@ISA = qw(
    Curses::UI::Widget 
);

my %routines = (
    'loose-focus'    => \&loose_focus,
    'open-popup'     => \&open_popup,
    'select-next'    => \&select_next,
    'select-prev'    => \&select_prev,
    'mouse-button1'  => \&mouse_button1,
);

my %bindings = (
    CUI_TAB()        => 'loose-focus',
    KEY_BTAB()       => 'loose-focus',
    KEY_ENTER()      => 'open-popup',
    KEY_RIGHT()      => 'open-popup',
    "l"              => 'open-popup',
    CUI_SPACE()      => 'open-popup',
    KEY_DOWN()       => 'select-next',
    "j"              => 'select-next',
    KEY_UP()         => 'select-prev',
    "k"              => 'select-prev',
);

sub new ()
{
    my $class = shift;

    my %userargs = @_;
    keys_to_lowercase(\%userargs);

    my %args = (
        -parent       => undef,    # the parent window
        -width        => undef,    # the width of the checkbox
        -x            => 0,        # the horizontal position rel. to parent
        -y            => 0,        # the vertical position rel. to parent
        -values       => [],       # values
        -labels       => {},       # labels for the values
        -selected     => undef,    # the current selected value
        -wraparound   => undef,    # wraparound? 
        -sbborder     => 1,        # square bracket border
        -onchange     => undef,    # event handler
	-fg           => -1,
	-bg           => -1,

        %userargs,

        -bindings     => {%bindings},
        -routines     => {%routines},
    
        -focus        => 0,        # value init
        -nocursor     => 1,        # this widget does not use a cursor
    );

    # The windowscr height should be 1.
    $args{-height} = height_by_windowscrheight(1,%args);
    
    # No width given? Then make the width large
    # enough to contain the longest label.
    $args{-width} = width_by_windowscrwidth(
        maxlabelwidth(%args) + 1, 
        -border => 1
    ) unless defined $args{-width};

    my $this = $class->SUPER::new( %args );

    $this->layout;

    if ($Curses::UI::ncurses_mouse) {
	$this->set_mouse_binding('mouse-button1', BUTTON1_CLICKED());
    }


    return $this;
}

sub onChange(;$)  { shift()->set_event('-onchange',  shift()) }

sub layout()
{
    my $this = shift;

    $this->SUPER::layout() or return;

    # Compute the location and length of the listbox.
    my $ll = height_by_windowscrheight(@{$this->{-values}}, -border=>1);
    my $lx = $this->{-x} + $this->{-parent}->{-sx};
    my $ly = $this->{-y} + $this->{-parent}->{-sy} + 1;

    # Don't let the listbox grow out of the screen.
    if ($this->{-y}+$ll > $ENV{LINES}) {
        $ll = $ENV{LINES} - $this->{-y};
    }

    # It's a bit small :-( Can we place it up-side-down?
    my $lim = int($ENV{LINES}/2);
    if ($ll < $lim and ($this->{-sy}+$this->{-y}) > $lim) {
        $ll = height_by_windowscrheight(
            @{$this->{-values}}, 
            -border=>1
        );
        my $y = $this->{-y};
        $y -= $ll - 1;
        if ($y<0)
        {
            $y = 1;
            $ll = $this->{-y};
        }    
        $ly = $y + $this->{-parent}->{-sy} - 1;
    }
        
    # Store the listbox layout setup for later use.
    $this->{-listbox}->{-x}      = $lx;
    $this->{-listbox}->{-y}      = $ly;
    $this->{-listbox}->{-width}  = $this->width;
    $this->{-listbox}->{-height} = $ll;

    return $this;
}

sub draw(;$)
{
    my $this = shift;
    my $no_doupdate = shift || 0;

    # Draw the widget.
    $this->SUPER::draw(1) or return $this;
        
    # Get the selected label.
    my $sellabel;
    if (defined $this->{-selected})
    {
	$sellabel = $this->{-values}->[$this->{-selected}];
	$sellabel = $this->{-labels}->{$sellabel} 
	    if defined $this->{-labels}->{$sellabel};
    }

    # Let there be color
    if ($Curses::UI::color_support) {
	my $co = $Curses::UI::color_object;
	my $pair = $co->get_color_pair(
			     $this->{-fg},
			     $this->{-bg});

	$this->{-canvasscr}->attron(COLOR_PAIR($pair));

    }

    $this->{-canvasscr}->attron(A_REVERSE) if $this->{-focus};
    my $width = $this->canvaswidth;
    if (defined $sellabel)
    {
	if (length($sellabel) > $width) {
		$sellabel = substr($sellabel, 0, $width);
		$sellabel =~ s/.$/\$/;
	}
    }
    else # No selection yet.
    {
        $this->{-canvasscr}->attron(A_DIM);
        $sellabel = "-"x$width;
    }

    $this->{-canvasscr}->addstr(0,0, " "x$width);
    $this->{-canvasscr}->addstr(0,0, $sellabel);
    $this->{-canvasscr}->move(0,$this->canvaswidth-1);
    $this->{-canvasscr}->attroff(A_DIM);
    $this->{-canvasscr}->attroff(A_REVERSE);

    $this->{-canvasscr}->noutrefresh;
    doupdate() unless $no_doupdate;;

    return $this;
}

sub open_popup()
{
    my $this = shift;
    my $pre_value = $this->get;

    my %listbox_options = %{$this->{-listbox}};
    foreach my $option (qw(
	-values -labels 
	-selected -wraparound
    )) {    
        $listbox_options{$option} = $this->{$option}
            if defined $this->{$option};
    }

    my $id = '__popupmenu_listbox_$this';
    my $listbox = $this->root->add(
	$id, 'PopupmenuListbox',
        -border         => 1,
        -vscrollbar     => 1,
        %listbox_options
    );

    $listbox->modalfocus;

    my $post_value = $listbox->get;
    $this->{-selected} = $listbox->{-selected};

    if ((not defined $pre_value and 
             defined $post_value) or 
        (defined $pre_value and
            $pre_value ne $post_value)) {
        $this->run_event('-onchange');
    }

    $this->root->delete($id);
    $this->root->draw;

    return $this;
}

sub get()
{
    my $this = shift;

    my $value;
    if (defined $this->{-selected}) {
	$value = $this->{-values}->[$this->{-selected}];
    }

    return $value;
}

sub select_next()
{
    my $this = shift;
    
    my $pre_value = $this->get;

    if (defined $this->{-selected}) {
	$this->{-selected}++;
	if ( $this->{-selected} > (@{$this->{-values}}-1) ) {
	    $this->{-selected} = @{$this->{-values}} - 1;
	}
    } else {
    	$this->{-selected} = 0;
    }

    my $post_value = $this->get;

    if ((not defined $pre_value and defined $post_value) or 
        (defined $pre_value and $pre_value ne $post_value)) {
        $this->run_event('-onchange');
    }

    $this->schedule_draw(1);

    return $this;
}

sub select_prev()
{
    my $this = shift;

    my $pre_value = $this->get;

    if (defined $this->{-selected}) {
        $this->{-selected}--;
	$this->{-selected} = 0 if $this->{-selected} <= 0;
    } else {
        $this->{-selected} = @{$this->{-values}} - 1;
    }
    
    my $post_value = $this->get;

    if ((not defined $pre_value and defined $post_value) or 
        (defined $pre_value and $pre_value ne $post_value)) {
        $this->run_event('-onchange');
    }

    $this->schedule_draw(1);

    return $this;
}

sub mouse_button1($$$;)
{
    my $this  = shift;
    my $event = shift;
    my $x     = shift;
    my $y     = shift;

    unless ($this->{-focus}) {
        $this->focus;
    }
    $this->open_popup;
}


1;


=pod

=head1 NAME

Curses::UI::Popupmenu - Create and manipulate popupbox widgets

=head1 CLASS HIERARCHY

 Curses::UI::Widget
    |
    +----Curses::UI::Popupmenu


=head1 SYNOPSIS

    use Curses::UI;
    my $cui = new Curses::UI;
    my $win = $cui->add('window_id', 'Window');

    my $popupbox = $win->add(
        'mypopupbox', 'Popupmenu',
        -values    => [1, 2, 3],
        -labels    => { 1 => 'One', 
                        2 => 'Two', 
                        3 => 'Three' },
    );

    $popupbox->focus();
    my $value = $popupbox->get();


=head1 DESCRIPTION

Curses::UI::Popupmenu is a widget that can be used to create 
something very similar to a basic L<Curses::UI::Listbox|Curses::UI::Listbox>.
The difference is that the widget will show only the
currently selected value (or "-------" if no value is yet
selected). The list of possible values will be shown as a 
separate popup window if requested. 

Normally the widget will look something like this:

 [Current value ]

If the popup window is opened, it looks something like this:


 [Current value ]
 +--------------+
 |Other value   |
 |Current value | 
 |Third value   |
 +--------------+




=head1 STANDARD OPTIONS

B<-parent>, B<-x>, B<-y>, B<-width>, B<-height>, 
B<-pad>, B<-padleft>, B<-padright>, B<-padtop>, B<-padbottom>,
B<-ipad>, B<-ipadleft>, B<-ipadright>, B<-ipadtop>, B<-ipadbottom>,
B<-title>, B<-titlefullwidth>, B<-titlereverse>, B<-onfocus>,
B<-onblur>

For an explanation of these standard options, see 
L<Curses::UI::Widget|Curses::UI::Widget>.




=head1 WIDGET-SPECIFIC OPTIONS

=over 4

=item * B<-values> < LIST >

=item * B<-labels> < HASHREF >

=item * B<-selected> < INDEX >

=item * B<-wraparound> < BOOLEAN >

These options are exactly the same as the options for
the Listbox widget. So for an explanation of these,
take a look at L<Curses::UI::Listbox|Curses::UI::Listbox>.

=item * B<-onchange> < CODEREF >

This sets the onChange event handler for the popupmenu widget.
If a new item is selected, the code in CODEREF will be executed.
It will get the widget reference as its argument.


=back




=head1 METHODS

=over 4

=item * B<new> ( OPTIONS )

=item * B<layout> ( )

=item * B<draw> ( BOOLEAN )

=item * B<intellidraw> ( )

=item * B<focus> ( )

=item * B<onFocus> ( CODEREF )

=item * B<onBlur> ( CODEREF )

These are standard methods. See L<Curses::UI::Widget|Curses::UI::Widget> 
for an explanation of these.

=item * B<get> ( )

This method will return the currently selected value.

=item * B<onChange> ( CODEREF )

This method can be used to set the B<-onchange> event handler
(see above) after initialization of the popupmenu. 

=back




=head1 DEFAULT BINDINGS

There are bindings for the widget itself and bindings
for the popup listbox that can be opened by this widget.

=head2 The widget itself

=over 4

=item * <B<tab>>

Call the 'loose-focus' routine. This will have the widget 
loose its focus.

=item * <B<enter>>, <B<cursor-right>, <B<l>>, <B<space>>

Call the 'open-popup' routine. This will show the 
popup listbox and bring the focus to this listbox. See
B<The popup listbox> below for a description of the bindings 
for this listbox.

=item * <B<cursor-down>>, <B<j>>

Call the 'select-next' routine. This will select the 
item in the list that is after the currently selected
item (unless the last item is already selected). If 
no item is selected, the first item in the list will
get selected. 

=item * <B<cursor-up>>, <B<k>>

Call the 'select-prev' routine. This will select the 
item in the list that is before the currently selected
item (unless the first item is already selected). If 
no item is selected, the first item in the list will
get selected. 

=back 

=head2 The popup listbox

The bindings for the popup listbox are the same as the bindings
for the Listbox widget. So take a look at 
L<Curses::UI::Listbox|Curses::UI::Listbox> for a description
of these. The difference is that the 'loose-focus' and 'option-select'
routine will have the popup listbox to close. If the routine
'option-select' is called, the active item will get selected.


=head1 SEE ALSO

L<Curses::UI>, 
L<Curses::UI::Listbox>
L<Curses::UI::Widget>, 
L<Curses::UI::Common>




=head1 AUTHOR

Copyright (c) 2001-2002 Maurice Makaay. All rights reserved.

Maintained by Marcus Thiesen (marcus@cpan.thiesenweb.de)


This package is free software and is provided "as is" without express
or implied warranty. It may be used, redistributed and/or modified
under the same terms as perl itself.

