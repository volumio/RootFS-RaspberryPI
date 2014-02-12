# ----------------------------------------------------------------------
# Curses::UI::Menubar
# Curses::UI::MenuListbox
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
# MenuListbox package
# ----------------------------------------------------------------------

package Curses::UI::MenuListbox;

use strict;
use Curses;
use Curses::UI::Common;
use Curses::UI::Container;
use Curses::UI::Window;
use Curses::UI::Listbox;
use Curses::UI::Widget;

use vars qw(
    $VERSION 
    @ISA
);

$VERSION = '1.10';

@ISA = qw(
    Curses::UI::Listbox 
    Curses::UI::Common 
    Curses::UI::Window
);

sub new()
{
    my $class = shift;

    my %userargs = @_;
    keys_to_lowercase(\%userargs);

    my %args = (
	-menu          => {},     # The menu contents
        -is_topmenu    => 0,      # First pulldown or not?
        -menubar       => undef,  # Ref to menubar object
        -prevobject    => undef,  # Ref to "parent" object (the real parent 
				  # is the rootwindow, but we need to know 
				  # which menulistbox or menubar is parent).
	-bg            => -1,
        -fg            => -1,
	-bbg           => -1,
        -bfg           => -1,

        %userargs,

        -vscrollbar    => 1,      # Always use a vscrollbar
        -border        => 1,      # Always show a border
        -wraparound    => 1,      # Use listbox wraparound
        -returnaction  => undef,  # Is set by other MenuListboxes
    );


    # First determine the longest label.
    my $longest = 0;
    foreach my $item (@{$args{-menu}})
    {
        my $l = $item->{-label};
        $args{-parent}->root->fatalerror(
		"Missing argument: -label for the MenuListbox"
        ) unless defined $l;
        $longest = length($l) if length($l) > $longest;
    }

    # Increase $longest for some whitespace on the
    # right side of the labels.
    $longest++;

    # Now create the values and labels for the listbox.
    my @values = ();
    my %labels = ();
    my $has_submenu = 0;
    foreach my $item (@{$args{-menu}})
    {
        my $l = $item->{-label};
        if (defined($item->{-submenu})) 
	{
	    $l = sprintf("%-${longest}s  >>", $l);
	    $has_submenu++;
	}
	push @values, $l;
    }

    # If there are submenu's, make the $longest variable higher.
    $longest += 4 if $has_submenu;
    $args{-values} = \@values;

    # Determine the needed width and hight for the listbox.
    my $w = width_by_windowscrwidth($longest, %args);
    my $h = height_by_windowscrheight(@values, %args);
    $args{-width} = $w;
    $args{-height} = $h;

    # Check if the menu does fit on the right. If not, try to
    # shift it to the left as far as needed. 
    if ($args{-x} + $w > $ENV{COLS}) {
        $args{-x} = $ENV{COLS} - $w;
        $args{-x} = 0 if $args{-x} < 0;
    }
    
    my $this = $class->SUPER::new(%args);
    
    $this->root->fatalerror(
	"Missing or illegal argument: -menubar" 
    ) unless defined $args{-menubar} and
             $args{-menubar}->isa('Curses::UI::Menubar');
    
    # Clear 'loose-focus' binding, so loosing focus through
    # the <TAB> key does not work.
    $this->clear_binding('loose-focus');

    # Create binding routines.
    $this->set_routine('cursor-left',  \&cursor_left);
    $this->set_routine('cursor-right', \&cursor_right);
    $this->set_routine('option-select',\&option_select);
    $this->set_routine('escape',       \&escape_key);

    # Create bindings.
    $this->set_binding('escape',       CUI_ESCAPE);
    $this->set_binding('cursor-left',  KEY_LEFT(), 'h'); 
    $this->set_binding('cursor-right', KEY_RIGHT(), 'l'); 
    
    if ($Curses::UI::ncurses_mouse) {
	$this->set_mouse_binding(\&mouse_button1, BUTTON1_CLICKED());
    }
    

    return $this;
}

sub escape_key()
{
    my $this = shift;
    $this->{-prevobject}->{-returnaction} = 'COLLAPSE';
    $this->loose_focus;
}

sub active_item()
{
    my $this = shift;
    $this->{-menu}->[$this->{-ypos}];
}

sub cursor_left()
{
    my $this = shift;
    $this->{-prevobject}->{-returnaction} = 'CURSOR_LEFT';
    $this->loose_focus;
}

sub cursor_right()
{
    my $this = shift;

    # Get the current menu-item.
    my $item = $this->active_item;

    # This item has a submenu. Open it.
    if (defined $item->{-submenu}) 
    {
                
        # Compute the (x,y)-position of the new menu.
        my $x = $this->{-x} + $this->borderwidth;
        my $y = $this->{-y} + $this->{-ypos};

        # Create the submenu. 
        my $id = "__submenu_$this";
	
        my $submenu = $this->root->add(
            $id, 'MenuListbox',
            -prevobject => $this,
            -menubar    => $this->{-menubar},
            -x          => $x,
            -y          => $y,
            -menu       => $this->{-menu}->[$this->{-ypos}]->{-submenu},
            -bg         => $this->{-bg},
            -fg         => $this->{-fg},
            -bbg        => $this->{-bbg},
            -bfg        => $this->{-bfg},
        );

        # Show the submenu and wait for it to return.
        $this->{-returnaction} = undef;
        $submenu->modalfocus;
        $this->root->delete($id);
        $this->root->draw;

        # Data set by the previous modal focused menulistbox.
        my $return = $this->{-returnaction};
	my $event = $this->{-mouse_event};

        if (defined $return)
        {
	    # COLLAPSE:<object>. Collapse further, unless
	    # $this = <object>.
	    if ($return =~ /^COLLAPSE\:?(.*)$/)
	    {
		if ($this ne $1) 
		{
		    $this->{-prevobject}->{-returnaction} = $return;
		    $this->{-prevobject}->{-mouse_event} = $event;
		    return $this->loose_focus;
		} else {
		    $this->focus;
		    return $this->event_mouse($event);
		}
	    }
	    elsif ($return eq 'COLLAPSE') 
	    {
                return $this->escape_key;
	    }
        }

    # This item has no submenu. Return CURSOR_RIGHT
    # if this is a topmenu.
    } elsif ($this->{-is_topmenu}) {
        $this->{-prevobject}->{-returnaction} = 'CURSOR_RIGHT';
        $this->loose_focus;
    }

    return $this;
}

sub option_select()
{
    my $this = shift;
    
    # Get the current menu-item.
    my $item = $this->active_item;

    # Submenu selected? Then expand it.
    if (defined $item->{-submenu}) { 
        return $this->cursor_right;
    } 

    # Let the menubar handle the option that was chosen.
    my $value = $item->{-value};
    $this->{-menubar}->menuoption_selected($value);

    # Let the complete menulistbox-hierarchy collapse.
    $this->{-prevobject}->{-returnaction} = 'COLLAPSE';
    $this->loose_focus;
    
    return $this;
}

sub mouse_button1()
{
    my $this = shift;
    my $event = shift;
    my $x = shift;
    my $y = shift;

    # First check if the click is inside the widget (since
    # this widget has modal focus, all events go to it).
    my $ev_x = $event->{-x};
    my $ev_y = $event->{-y};
    my $tree = $this->root->object_at_xy($this->root, $ev_x, $ev_y);

    # Another object is clicked... Collapse the menu.
    # If a menu-object was clicked, stay on that object
    # and rerun the event.
    if ($this ne $tree->[-1]) 
    {
        $this->{-prevobject}->{-returnaction} = 'COLLAPSE:' . $tree->[-1];
        $this->{-prevobject}->{-mouse_event} = $event;
        $this->loose_focus;
        return $this;
    }

    # Select listbox entry. 
    $this->{-ypos} = $this->{-active} = $this->{-yscrpos} + $y;
    $this->layout_content();
    $this->schedule_draw(1);
    $this->option_select();
}

# Let Curses::UI->usemodule() believe that this module
# was already loaded (usemodule() would else try to
# require the non-existing file).
#
$INC{'Curses/UI/MenuListbox.pm'} = $INC{'Curses/UI/Menubar.pm'};


# ----------------------------------------------------------------------
# Menubar package
# ----------------------------------------------------------------------

package Curses::UI::Menubar;

use strict;
use Curses;
use Curses::UI::Common;
use Curses::UI::Container;
use Curses::UI::Window;

use vars qw(
    $VERSION
    @ISA
);

$VERSION = '1.10';

@ISA = qw(
    Curses::UI::Window 
    Curses::UI::Common
);

my %routines = (
    'escape'        => \&escape,
    'pulldown'      => \&pulldown,
    'menu-left'     => \&menu_left,
    'menu-right'    => \&menu_right,
    'mouse-button1' => \&mouse_button1,
);

my %bindings = (
    KEY_DOWN()      => 'pulldown',
    'j'             => 'pulldown',
    KEY_ENTER()     => 'pulldown',
    KEY_LEFT()      => 'menu-left',
    'h'             => 'menu-left',
    KEY_RIGHT()     => 'menu-right',
    'l'             => 'menu-right',
    CUI_ESCAPE()    => 'escape',
);

sub new ()
{
    my $class = shift;

    my %userargs = @_;
    keys_to_lowercase(\%userargs);

    my %args = (
        -parent         => undef,    # the parent window
        -menu           => [],       # the menu definition
        -menuhandler    => undef,    # a custom menu handler (optional)

	-bg             => -1,
        -fg             => -1,

        %userargs,

        -routines       => {%routines},
        -bindings       => {%bindings},

        -width          => undef,    # Always use the full width
        -height         => 1,        # Always use height = 1
        -focus          => 0,
        -nocursor       => 1,        # This widget does not use a cursor
        -x              => 0,
        -y              => 0,
        -border         => 0,
        -selected       => 0,
        -returnaction   => undef,    # is set by MenuListboxes.
        -menuoption     => undef,    # the value for the chosen option
                                     # (is also set by MenuListboxes).
        -is_expanded    => 0,        # let show focused on expand
		
    );

    my $this = $class->SUPER::new( %args );
    $this->layout;

    if ($Curses::UI::ncurses_mouse) {
	$this->set_mouse_binding('mouse-button1', BUTTON1_CLICKED());
    }

    return $this;
}

sub escape()
{
    my $this = shift;
    $this->loose_focus;
}

sub layout()
{
    my $this = shift;
    $this->SUPER::layout or return;
    return $this;
} 

sub draw()
{
    my $this = shift;
    my $no_doupdate = shift || 0;

    $this->SUPER::draw(1) or return $this;

    # Create full reverse menubar.
    $this->{-canvasscr}->attron(A_REVERSE);

    # Let there be color
    if ($Curses::UI::color_support) {
	my $co = $Curses::UI::color_object;
	my $pair = $co->get_color_pair(
			     $this->{-bg},
			     $this->{-fg});

	$this->{-canvasscr}->attron(COLOR_PAIR($pair));
    }
 
    $this->{-canvasscr}->addstr(0, 0, " "x$this->canvaswidth);

    # Create menu-items.
    my $x = 1;
    my $idx = 0;
    foreach my $item (@{$this->{-menu}})
    {
        # By default the bar is drawn in reverse.
        $this->{-canvasscr}->attron(A_REVERSE);
	# Let there be color
	if ($Curses::UI::color_support) {
	    my $co = $Curses::UI::color_object;
	    my $pair = $co->get_color_pair(
					   $this->{-bg},
					   $this->{-fg});

	    $this->{-canvasscr}->attron(COLOR_PAIR($pair));
	}


        # If the bar has focus, the selected item is
        # show without reverse.
        if ($this->{-focus} and $idx == $this->{-selected}) {
            $this->{-canvasscr}->attroff(A_REVERSE);
        }

        my $label = $item->{-label};
        $this->{-canvasscr}->addstr(0, $x, " " . $item->{-label} . " ");
        $x += length($label) + 2;

        $idx++;
    }
    $this->{-canvasscr}->attroff(A_REVERSE);
    $this->{-canvasscr}->move(0,0);

    $this->{-canvasscr}->noutrefresh();
    doupdate() unless $no_doupdate;
    return $this;
}

# This calls the default event_onfocus() routine of
# the Widget class and it resets the -menuoption
# data member if the menu is not expanded (this will 
# contain the chosen menuoption at the time the 
# menubar loses focus).
#
sub event_onfocus()
{
    my $this = shift;
    unless ($this->{-is_expanded})
    {
	$this->{-menuoption} = undef;
	$this->{-selected}   = 0;
    }
    $this->SUPER::event_onfocus;
}

sub loose_focus()
{
    my $this = shift;

    # Draw the menubar like it does not have the focus anymore.
    $this->{-focus} = 0;
    $this->draw;

    # Execute callback routine if a menuitem was selected.
    my $value = $this->{-menuoption};
    if (defined $value)
    {
	# Run the make-your-own-handler handler if defined.
	if (defined $this->{-menuhandler}) {
	    $this->{-menuhandler}->($this, $value);
	}

	# Default handler: If $value has CODE in it, run this code.
	elsif (defined $value and ref $value eq 'CODE') {
	    $value->($this);
	}
    }


    # Focus shifted to another object? Then leave it that way.
    if ($this->root->focus_path(-1) ne $this) {
	return $this;
    }
    # Else go back to the previous focused window.
    else
    {
	$this->{-focus} = 0;
	my $prev = $this->root->{-draworder}->[-2];
	if (defined $prev) {
	    $this->root->focus($prev);
	}
    }

}

# This calls the default event_onblur() routine of the
# Widget class, but if -is_expanded is set, the widget
# will still render as a focused widget (this is to
# let the selected menuoption show focused, even if
# the focus is set to a menulistbox).
#
sub event_onblur()
{
    my $this = shift;
    $this->SUPER::event_onblur;

    if ($this->{-is_expanded}) {
        $this->{-focus} = 1;
    }

    return $this;
}

sub menuoption_selected()
{
    my $this = shift;
    my $value = shift;

    $this->{-menuoption} = $value;
}


sub pulldown() 
{
    my $this = shift;

    # Find the x position of the selected menu.
    my $x = 1;
    my $y = 1;
    
    # am I in a window
    if ($this->{-parent}->{-x}) {
	$x += $this->{-parent}->{-x};
    }

    # does it have a border
    if ($this->{-parent}->{-border}) {
	$x += 1;
    }

    # find real x value
    for my $idx (1 .. $this->{-selected})
    {
        $x += length($this->{-menu}->[$idx-1]->{-label});
        $x += 2;
    }

    # same for y
    if ($this->{-parent}->{-y}) {
	$y += $this->{-parent}->{-y};
    }

    # does it have a border
    if ($this->{-parent}->{-border}) {
	$y += 1;
    }

    # Add the submenu.
    my $id = "__submenu_$this";
    my $submenu = $this->root->add(
        $id, 'MenuListbox',
        -x          => $x,
        -y          => $y,
        -is_topmenu => 1,
        -menu       => $this->{-menu}->[$this->{-selected}]->{-submenu},
        -menubar    => $this,
        -prevobject => $this,
        -fg         => $this->{-fg},
	-bg         => $this->{-bg},			   
        -bfg        => $this->{-fg},
        -bbg        => $this->{-bg},
    );

    # Focus the new window and wait until it returns.
    $this->{-returnaction} = undef;
    $this->{-is_expanded}  = 1;
    $submenu->modalfocus;

    # Remove the submenu.
    $this->root->delete($id);
    $this->root->draw;

    $this->{-is_expanded}  = 0;

    # Parameters that are set by the previous modal focused menulistbox.
    my $return = $this->{-returnaction};
    my $event = $this->{-mouse_event};

    if (defined $return) {
	# COLLAPSE:<object>. Collapse further, unless
	# $this = <object>.
        if ($return =~ /^COLLAPSE\:?(.*)$/)
        {
	    if ($this ne $1) 
	    {
                $this->{-prevobject}->{-returnaction} = $return;
                $this->{-prevobject}->{-mouse_event} = $event;
                return $this->loose_focus;
	    } else {
	        $this->focus;
		return $this->event_mouse($event);
	    }
        }
        elsif ($return eq 'COLLAPSE') 
	{
	    return $this->loose_focus;
	}
        elsif ($return eq 'CURSOR_LEFT') 
        { 
            $this->menu_left;
            $this->focus;
            $this->draw;
            $this->root->feedkey(KEY_DOWN());
        } 
        elsif ($return eq 'CURSOR_RIGHT') 
        { 
            $this->menu_right;
            $this->focus;
            $this->draw;
            $this->root->feedkey(KEY_DOWN());
        }
    }

    return $return;
}

sub menu_left()
{
    my $this = shift;
    $this->{-selected}--;
    $this->{-selected} = @{$this->{-menu}}-1 
        if $this->{-selected} < 0;
    $this->schedule_draw(1);    
    return $this;
}

sub menu_right()
{
    my $this = shift;
    $this->{-selected}++;
    $this->{-selected} = 0
        if $this->{-selected} > (@{$this->{-menu}}-1);
    $this->schedule_draw(1);    
    return $this;
}

sub mouse_button1
{
    my $this   = shift;
    my $MEVENT = shift;
    my $x      = shift;
    my $y      = shift;

    my $mx = 1;
    my $idx = 0;
    foreach my $item (@{$this->{-menu}}) {
        $mx += length($item->{-label}) + 2;
	if ($mx > $x) { last }
        $idx++;
    }
    if ($idx > (@{$this->{-menu}}-1)) {$idx--}

    $this->focus();
    $this->{-selected} = $idx;
    $this->pulldown();
    $this->schedule_draw(1);

    return $this;
}

1;


=pod

=head1 NAME

Curses::UI::Menubar - Create and manipulate menubar widgets

=head1 CLASS HIERARCHY

 Curses::UI::Widget
    |
    +----Curses::UI::Container
            |
            +----Curses::UI::Window
                    |
                    +----Curses::UI::Menubar


=head1 SYNOPSIS

    use Curses::UI;
    my $cui = new Curses::UI;

    # define the menu datastructure.
    my $menu_data = [....]; 

    my $menu = $cui->add( 
        'menu', 'Menubar',
        -menu => $menu_data
    );

    $menu->focus();


=head1 DESCRIPTION

This class can be used to add a menubar to Curses::UI. This
menubar can contain a complete submenu hierarchy. It looks
(remotely :-) like this:

 -------------------------------------
 menu1 | menu2 | menu3 | ....
 -------------------------------------
       +-------------+ 
       |menuitem 1   |
       |menuitem 2   |+--------------+
       |menuitem 3 >>||submenuitem 1 |
       |menuitem 4   ||submenuitem 2 |
       +-------------+|submenuitem 3 | 
                      |submenuitem 4 | 
                      |submenuitem 5 |
                      +--------------+


See exampes/demo-Curses::UI::Menubar in the distribution
for a short demo.



=head1 STANDARD OPTIONS

This class does not use any of the standard options that
are provided by L<Curses::UI::Widget>.


=head1 WIDGET-SPECIFIC OPTIONS

There is only one option: B<-menu>. The value for this
option is an ARRAYREF. This ARRAYREF behaves exactly
like the one that is described in
L<Curses::UI::MenuListbox|Curses::UI::MenuListbox>.
The difference is that for the top-level menu, you 
will only use -submenu's. Example data structure:

    my $menu1 = [
        { -label => 'option 1', -value => '1-1' },
        { -label => 'option 2', -value => '1-2' },
        { -label => 'option 3', -value => '1-3' },
    ];

    my $menu2 = [
        { -label => 'option 1', -value => \&sel1 },
        { -label => 'option 2', -value => \&sel2 },
        { -label => 'option 3', -value => \&sel3 },
    ];

    my $submenu = [
        { -label => 'suboption 1', -value => '3-3-1' },
        { -label => 'suboption 2', -callback=> \&do_it },
    ];

    my $menu3 = [
        { -label => 'option 1', -value => \&sel2 },
        { -label => 'option 2', -value => \&sel3 },
        { -label => 'submenu 1', -submenu => $submenu },
    ];

    my $menu = [
        { -label => 'menu 1', -submenu => $menu1 },
        { -label => 'menu 2', -submenu => $menu2 }
        { -label => 'menu 3', -submenu => $menu3 }
    ]; 




=head1 METHODS

=over 4

=item * B<new> ( OPTIONS )

=item * B<layout> ( )

=item * B<draw> ( BOOLEAN )

=item * B<focus> ( )

These are standard methods. See L<Curses::UI::Widget|Curses::UI::Widget>
for an explanation of these.

=back




=head1 DEFAULT BINDINGS

=over 4

=item * <B<escape>>

Call the 'escape' routine. This will have the menubar
loose its focus and return the value 'ESCAPE' to the
calling routine.

=item * <B<tab>>

Call the 'return' routine. This will have the menubar
loose its focus and return the value 'LOOSE_FOCUS' to
the calling routine.

=item * <B<cursor-down>>, <B<j>>, <B<enter>>

Call the 'pulldown' routine. This will open the 
menulistbox for the current menu and give that
menulistbox the focus. What happens after the
menulistbox loses its focus, depends upon the
returnvalue of it:

* the value 'CURSOR_LEFT' 

  Call the 'cursor-left' routine and after that
  call the 'pulldown' routine. So this will open
  the menulistbox for the previous menu.

* the value 'CURSOR_RIGHT'

  Call the 'cursor-right' routine and after that
  call the 'pulldown' routine. So this will open
  the menulistbox for the next menu.

* the value 'LOOSE_FOCUS'

  The menubar will keep the focus, but no
  menulistbox will be open. 

* the value 'ESCAPE'

  The menubar will loose its focus and return the
  value 'ESCAPE' to the calling routine.

* A CODE reference

  The code will be excuted, the menubar will loose its
  focus and the returnvalue of the CODE will be 
  returned to the calling routine.

* Any other value

  The menubar will loose its focus and the value will
  be returned to the calling routine.

=item * <B<cursor-left>>, <B<h>>

Call the 'cursor-left' routine. This will select
the previous menu. If the first menu is already
selected, the last menu will be selected.

=item * <B<cursor-right>>, <B<l>>

Call the 'cursor-right' routine. This will select
the next menu. If the last menu is already selected,
the first menu will be selected.

=back 





=head1 SEE ALSO

L<Curses::UI>, 
L<Curses::UI::MenuListbox>, 
L<Curses::UI::Listbox>




=head1 AUTHOR

Copyright (c) 2001-2002 Maurice Makaay. All rights reserved.

Maintained by Marcus Thiesen (marcus@cpan.thiesenweb.de)


This package is free software and is provided "as is" without express
or implied warranty. It may be used, redistributed and/or modified
under the same terms as perl itself.

