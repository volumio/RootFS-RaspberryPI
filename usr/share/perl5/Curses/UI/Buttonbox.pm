# ----------------------------------------------------------------------
# Curses::UI::Buttonbox
#
# (c) 2001-2002 by Maurice Makaay. All rights reserved.
# This file is part of Curses::UI. Curses::UI is free software.
# You can redistribute it and/or modify it under the same terms
# as perl itself.
#
# Currently maintained by Marcus Thiesen
# e-mail: marcus@cpan.thiesenweb.de
# ----------------------------------------------------------------------

package Curses::UI::Buttonbox;

use strict;
use Curses;
use Curses::UI::Widget;
use Curses::UI::Common;

use vars qw(
    $VERSION 
    @ISA 
);

$VERSION = '1.10';

@ISA = qw(
    Curses::UI::Widget
    Curses::UI::Common
);

# Definition of the most common buttons.
my %buttondef = (
    'ok'    => {
                -label    => '< OK >',
                -value    => 1,
                -onpress  => undef,
                -shortcut => 'o',
            },
    'cancel'=> {
                -label    => '< Cancel >',
                -value    => 0,
                -onpress  => undef,
                -shortcut => 'c',
            }, 
    'yes'   => {
                -label    => '< yes >',
                -value    => 1,
                -onpress  => undef,
                -shortcut => 'y',
            },
    'no'    => {
                -label    => '< No >',
                -value    => 0,
                -onpress  => undef,
                -shortcut => 'n',
            }, 
    
);

# The default button to use if no buttons were defined.
my $default_btn = [ 'ok' ];

my %routines = (
    'press-button' => \&press_button,
    'loose-focus'  => \&loose_focus,
    'next'         => \&next_button,
    'previous'     => \&previous_button,
    'shortcut'     => \&shortcut,  
    'focus-shift'  => \&focus_shift,
    'mouse-button1'=> \&mouse_button1,
);

my %bindings = (
    CUI_TAB()      => 'focus-shift',
    KEY_BTAB()     => 'focus-shift',
    KEY_ENTER()    => 'press-button',
    CUI_SPACE()    => 'press-button',
    KEY_UP()       => 'previous',
    "k"            => 'previous',
    KEY_DOWN()     => 'next',
    "j"            => 'next',
    KEY_LEFT()     => 'previous',
    'h'            => 'previous',
    KEY_RIGHT()    => 'next', 
    'l'            => 'next',
    ''             => 'shortcut',
);

sub new ()
{
    my $class = shift;

    my %userargs = @_;
    keys_to_lowercase(\%userargs);
    
    my %args = (
        -parent          => undef,        # the parent window
        -buttons         => $default_btn, # buttons (arrayref)
        -buttonalignment => undef,        # left / middle / right
        -selected        => 0,            # which selected
        -width           => undef,        # the width of the buttons widget
        -x               => 0,            # the horizontal pos rel. to parent
        -y               => 0,            # the vertical pos rel. to parent
	-bg              => -1,
        -fg              => -1,

        %userargs,

        -routines        => {%routines},
        -bindings        => {%bindings},

        -focus           => 0,            # init value
        -nocursor        => 1,            # this widget does not use a cursor
    );

    # The windowscr height should be 1.
    my $height = $args{-vertical} ? scalar @{$args{-buttons}} : 1;
    $args{-height} = height_by_windowscrheight($height ,%args);
 
    # Create the widget.
    my $this = $class->SUPER::new( %args );
    
    # Process button definitions.
    $this->process_buttondefs;

    $this->layout();

    if ($Curses::UI::ncurses_mouse) {
        $this->set_mouse_binding('mouse-button1', BUTTON1_CLICKED());
    }

    return $this;
}


sub process_buttondefs()
{
    my $this    = shift;

    my $buttons = $this->{-buttons};

    # Process button types.
    my @buttons = ();
    foreach my $button (@$buttons)
    {
        if (ref $button eq 'HASH') {
            # noop, this is a completed button definition
        } elsif (not ref $button) {
            my $realbutton = $buttondef{$button};
            unless (defined $realbutton) {
                $this->root->fatalerror(
                    "process_buttondefs(): Invalid button type.\n"
		  . "No definition found for '$button'"
                );
            }

            # Check for language support.
	    my $lang_spec = $this->root->lang->get("button_$button");
	    if ($lang_spec) {
		my ($shortcut, $label) = split /\:/, $lang_spec, 2;
		$realbutton->{-label} = "< $label >";
		$realbutton->{-shortcut} = $shortcut;
	    }

            $button = $realbutton;

        } else {
            $this->root->fatalerror(
                "Invalid button definition.\n"
	      . "It should be a HASH reference,\n"
	      . "but is a " . (ref $button) . " reference."
	    );
        }

        keys_to_lowercase($button);
        push @buttons, $button;
    }

    $this->{-buttons} =  \@buttons;
    return $this;
}

sub layout()
{
    my $this = shift;

    $this->SUPER::layout() or return;

    # Compute the space that is needed for the buttons.
    my $xneed = $this->compute_buttonwidth;
    my $yneed = $this->compute_buttonheight;
    
    if ( ($xneed > $this->canvaswidth) || ($yneed > $this->canvasheight) ) 
    {
        $Curses::UI::screen_too_small++;
        return $this;
    }

    # Compute the x location of the buttons.
    my $xpos = 0;
    if (defined $this->{-buttonalignment})
    {
        if ($this->{-buttonalignment} eq 'right') {
            $xpos = $this->canvaswidth - $xneed;
        } elsif ($this->{-buttonalignment} eq 'middle') {
            $xpos = int (($this->canvaswidth-$xneed)/2);
        }
    }
    $this->{-xpos} = $xpos;

    $this->{-max_selected} = @{$this->{-buttons}} - 1;

    # Make shortcuts all upper-case.    
    foreach my $button (@{$this->{-buttons}}) {
        if (defined $button->{-shortcut}) {
            $button->{-shortcut} = uc $button->{-shortcut};
        }
    }

    return $this;
}

sub get_selected_button()
{
    my $this = shift;
    my $selected = $this->{-selected}; 
    my $button = $this->{-buttons}->[$selected];
    return $button;
}

sub get()
{
    my $this = shift;
    my $button = $this->get_selected_button;
    if (defined $button->{-value}) {
        return $button->{-value};
    } else {
        return $this->{-selected};
    }
}

sub next_button()
{
    my $this = shift;
    $this->{-selected}++;
    $this->schedule_draw(1);
    return $this;
}

sub previous_button()
{
    my $this = shift;
    $this->{-selected}--;
    $this->schedule_draw(1);
    return $this;
}

# Focus the next button. If the last button was 
# selected, let the buttonbox loose focus.
sub focus_shift()
{
    my $this = shift;
    my $key  = shift;

    if ( $key eq KEY_BTAB() )
    {
	$this->previous_button();
	if ($this->{-selected} < 0)
	{
#	    $this->schedule_draw(0);
	    $this->{-selected} = $this->{-max_selected};
	    $this->do_routine('loose-focus', $key);
	}
    } else {
	$this->next_button();
	if ($this->{-selected} > $this->{-max_selected})
	{
#	    $this->schedule_draw(0);
	    $this->{-selected} = 0;
	    $this->do_routine('loose-focus', $key);
	}
    }

    return $this;
}

sub press_button()
{
    my $this = shift;
    my $button = $this->get_selected_button;
    my $command = $button->{-onpress};
    $this->schedule_draw(1);
    if (defined $command and ref $command eq 'CODE') {
        $command->($this);
    }    
    return $this;
}

sub draw(;$)
{
    my $this = shift;
    my $no_doupdate = shift || 0;

    # Draw the widget.
    $this->SUPER::draw(1) or return $this;
    
    # Check if active element isn't out of bounds.
    $this->{-selected} = 0 unless defined $this->{-selected};
    $this->{-selected} = 0 if $this->{-selected} < 0; 
    $this->{-selected} = $this->{-max_selected} 
        if $this->{-selected} > $this->{-max_selected};

    # Draw the buttons.
    my $id = 0;
    my $x  = 0;
    my $y  = 0;
    my $cursor_x = 0;

    foreach my $button (@{$this->{-buttons}})
    {
	    # Let there be color
	if ($Curses::UI::color_support) {
	    my $co = $Curses::UI::color_object;
	    my $pair = $co->get_color_pair(
					   $this->{-fg},
					   $this->{-bg});

	    $this->{-canvasscr}->attron(COLOR_PAIR($pair));

	}

        # Make the focused button reverse.
        if ($this->{-focus} and defined $this->{-selected} 
             and $id == $this->{-selected}) {
            $this->{-canvasscr}->attron(A_REVERSE);
        }
 
        # Draw the button.
        $this->{-canvasscr}->addstr(
            $y, $this->{-xpos} + $x, 
            $button->{-label}
        );    

        # Draw shortcut if available.
        my $sc = $button->{-shortcut};
        if (defined $sc)
        {
            my $pos = index(uc $button->{-label}, $sc);
            if ($pos >= 0)
            {
                my $letter = substr($button->{-label}, $pos, 1); 
                $this->{-canvasscr}->attron(A_UNDERLINE);
                $this->{-canvasscr}->addch(
                    $y, $this->{-xpos} + $x + $pos,
                    $letter
                );
                $this->{-canvasscr}->attroff(A_UNDERLINE);
            }
        }

        # Change the $y value if the buttons are to be drawn vertically and leave $x alone
        if ( (defined $this->{-vertical}) && ($this->{-vertical}) ) {
          $y++;
        } else {
          $x += 1 + length($button->{-label});
        }

        $this->{-canvasscr}->attroff(A_REVERSE) if $this->{-focus};
        
        $id++;
    }
    $this->{-canvasscr}->move(0,0);
    $this->{-canvasscr}->noutrefresh;
    doupdate() unless $no_doupdate;

    return $this;
}

sub mouse_button1($$$$;)
{
    my $this  = shift;
    my $event = shift;
    my $x     = shift;
    my $y     = shift;

    my $idx = 0;
    my $bx  = $this->{-xpos};

    # Clicked left of the buttons?
    return $this if $x < $bx;

    # Find the button on which was clicked.
    foreach my $button (@{$this->{-buttons}}) {
        $bx += length($button->{-label});
	if ($bx > $x) { last }
	if ($bx == $x) { $idx = undef; last }
	$bx += 1;
	$idx++;
    }
    undef $idx if defined $idx and 
		  $idx > (@{$this->{-buttons}} - 1);

    if (defined $idx) {
	$this->{-selected} = $idx;
	$this->focus();
	$this->do_routine('press-button', $event);
    }
}

sub compute_buttonheight($;) 
{
    my $this   = shift;
    my $height = 1;

    if ( (defined $this->{-vertical}) && ($this->{-vertical}) ) {
        $height = scalar @{$this->{-buttons}};
    } 
    return $height;
}

sub compute_buttonwidth($;)
{
    my $this    = shift;

    $this->process_buttondefs;

    my $width=0;

    if ( (defined $this->{-vertical}) && ($this->{-vertical}) ) {
        foreach my $button (@{$this->{-buttons}}) {
            if ($width < length($button->{-label})) {
                $width = length($button->{-label});
            }
        }
    } else {
        # Spaces
        $width = @{$this->{-buttons}} - 1;
        
        # Buttons
        foreach my $button (@{$this->{-buttons}}) {
            $width += length($button->{-label});
        }
    }
    return $width;
}

sub shortcut()
{
    my $this = shift;
    my $key = uc shift;
    
    # Walk through shortcuts to see if the pressed key
    # is in the list of -shortcuts.
    my $idx = 0;
    my $found_idx;
    SHORTCUT: foreach my $button (@{$this->{-buttons}})
    {
        my $sc = $button->{-shortcut};
        if (defined $sc and $sc eq $key)
        {
            $found_idx = $idx;
            last SHORTCUT;
        }
        $idx++;
    }

    # Shortcut found?
    if (defined $found_idx) 
    {
        $this->{-selected} = $found_idx;
        return $this->process_bindings(KEY_ENTER());
    }

    return $this;
}

1;


=pod

=head1 NAME

Curses::UI::Buttonbox - Create and manipulate button widgets

=head1 CLASS HIERARCHY

 Curses::UI::Widget
    |
    +----Curses::UI::Buttonbox  


=head1 SYNOPSIS

    use Curses::UI;
    my $cui = new Curses::UI;
    my $win = $cui->add('window_id', 'Window');

    my $buttons = $win->add(
        'mybuttons', 'Buttonbox',
        -buttons   => [
            { 
              -label => '< Button 1 >',
              -value => 1,
              -shortcut => 1 
            },{ 
              -label => '< Button 2 >',
              -value => 2,
              -shortcut => 2 
            }
        ]
    );

    $buttons->focus();
    my $value = $buttons->get();


=head1 DESCRIPTION

Curses::UI::Buttonbox is a widget that can be used to create an
array of buttons (or, of course, only one button). 




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

=item * B<-buttons> < ARRAYREF >

This option takes a reference to a list of buttons.
The list may contain both predefined button types and  
complete button definitions of your own.

* B<Your own button definition>

  A button definition is a reference to a hash. This
  hash can have the following key-value pairs:

  obligatory:
  -----------

  -label      This determines what text should be drawn
              on the button.

  optional:
  ---------

  -value      This determines the returnvalue for the
              get() method. If the value is not defined,
              the get() method will return the index
              of the button.

  -shortcut   The button will act as if it was pressed
              if the key defined by -shortcut is pressed 

  -onpress    If the value for -onpress is a CODE reference,
              this code will be executes if the button
              is pressed, before the buttons widget loses
              focus and returns.

* B<Predefined button type>

  This module has a predefined list of frequently used button
  types. Using these in B<-buttons> makes things a lot
  easier. The predefined button types are:

  ok          -label    => '< OK >'
              -shortcut => 'o'
              -value    => 1
              -onpress  => undef

  cancel      -label    => '< Cancel >'
              -shortcut => 'c'
              -value    => 0
              -onpress  => undef

  yes         -label    => '< Yes >'
              -shortcut => 'y'
              -value    => 1
              -onpress  => undef

  no          -label    => '< No >'
              -shortcut => 'n'
              -value    => 0
              -onpress  => undef

Example:

  ....
  -buttons => [
      { -label => '< My own button >',
        -value => 'mine!',
        -shortcut => 'm' },

      'ok',

      'cancel',

      { -label => '< My second button >',
        -value => 'another one',
        -shortcut => 's',
        -onpress => sub { die "Do not press this button!\n" } }
  ]
  ....


=item * B<-selected> < INDEX >

By default the first button (index = 0) is active. If you
want another button to be active at creation time, 
add this option. The INDEX is the index of the button you
want to make active.

=item * B<-buttonalignment> < VALUE >

You can specify how the buttons should be aligned in the 
widget. Available values for VALUE are 'left', 'middle' 
and 'right'.

=item * B<-vertical> < BOOLEAN >

When set to a true value, it will cause the buttons to be
rendered with vertical instead of horizontal alignment.


=back




=head1 METHODS

=over 4

=item * B<new> ( OPTIONS )

=item * B<layout> ( )

=item * B<draw> ( BOOLEAN )

=item * B<focus> ( )

=item * B<onFocus> ( CODEREF )

=item * B<onBlur> ( CODEREF )

=item * B<draw_if_visible> ( )

These are standard methods. See L<Curses::UI::Widget|Curses::UI::Widget> 
for an explanation of these.

=item * B<get> ( )

This method will return the index of the currently active
button. If a value is given for that index (using the
B<-value> option, see B<-buttons> above), that value will be 
returned.

=back




=head1 DEFAULT BINDINGS

=over 4

=item * <B<enter>>, <B<space>> 

TODO: Fix dox
Call the 'loose-focus' routine. By default this routine will have the
container in which the widget is loose its focus. If you do
not like this behaviour, then you can have it loose focus itself
by calling:

    $buttonswidget->set_routine('loose-focus', 'RETURN');

For an explanation of B<set_routine>, see 
L<Curses::UI::Widget|Curses::UI::Widget>.


=item * <B<cursor left>>, <B<h>>

Call the 'previous' routine. This will make the previous
button the active button. If the active button already is
the first button, nothing will be done.

=item * <B<cursor right>>, <B<l>

Call the 'next' routine. This will make the next button the
active button. If the next button already is the last button,
nothing will be done.

=item * <B<any other key>>

This will call the 'shortcut' routine. This routine will 
handle the shortcuts that are set by the B<-shortcuts> option.

=back 





=head1 SEE ALSO

L<Curses::UI|Curses::UI>, 
L<Curses::UI::Widget|Curses::UI::Widget>, 
L<Curses::UI::Common|Curses::UI::Common>




=head1 AUTHOR

Copyright (c) 2001-2002 Maurice Makaay. All rights reserved.

Maintained by Marcus Thiesen (marcus@cpan.thiesenweb.de)


This package is free software and is provided "as is" without express
or implied warranty. It may be used, redistributed and/or modified
under the same terms as perl itself.

