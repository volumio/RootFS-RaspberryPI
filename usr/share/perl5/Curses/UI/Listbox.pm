# ----------------------------------------------------------------------
# Curses::UI::Listbox
#
# (c) 2001-2002 by Maurice Makaay. All rights reserved.
# (c) 2003-2005 by Marcus Thiesen.
# This file is part of Curses::UI. Curses::UI is free software.
# You can redistribute it and/or modify it under the same terms
# as perl itself.
#
# Currently maintained by Marcus Thiesen
# e-mail: marcus@cpan.thiesenweb.de
# ----------------------------------------------------------------------

package Curses::UI::Listbox;

use strict;
use Curses;
use Curses::UI::Common;
use Curses::UI::Widget;
use Curses::UI::TextEntry;
use Curses::UI::TextViewer;
use Curses::UI::Searchable;
require Exporter;

use vars qw(
    $VERSION
    @ISA
    @EXPORT
);

$VERSION = '1.3';

@ISA = qw(
    Curses::UI::Widget Curses::UI::Common 
    Curses::UI::Searchable Exporter
);

@EXPORT = qw(
    maxlabelwidth
);

my %routines = (
    'loose-focus'        => \&loose_focus,
    'option-select'      => \&option_select,
    'option-check'       => \&option_check,
    'option-uncheck'     => \&option_uncheck,
    'option-next'        => \&option_next,
    'option-prev'        => \&option_prev,
    'option-nextpage'    => \&option_nextpage,
    'option-prevpage'    => \&option_prevpage,
    'option-first'       => \&option_first,
    'option-last'        => \&option_last,
    'search-forward'     => \&search_forward,
    'search-backward'    => \&search_backward,
    'mouse-button1'      => \&mouse_button1,
);

my %bindings = (
    KEY_LEFT()           => 'loose-focus',
    "h"                  => 'loose-focus',
    CUI_TAB()            => 'loose-focus',
    KEY_BTAB()           => 'loose-focus',
    KEY_ENTER()          => 'option-select',
    KEY_RIGHT()          => 'option-select',
    "l"                  => 'option-select',
    CUI_SPACE()          => 'option-select',
    "1"                  => 'option-check',
    "y"                  => 'option-check',
    "0"                  => 'option-uncheck',
    "n"                  => 'option-uncheck',
    KEY_DOWN()           => 'option-next',
    "j"                  => 'option-next',
    KEY_NPAGE()          => 'option-nextpage',
    KEY_UP()             => 'option-prev',
    "k"                  => 'option-prev',
    KEY_PPAGE()          => 'option-prevpage',
    KEY_HOME()           => 'option-first',
    "\cA"                => 'option-first',
    KEY_END()            => 'option-last',
    "\cE"                => 'option-last',
    "/"                  => 'search-forward',
    "?"                  => 'search-backward',
);

sub new ()
{
    my $class = shift;

    my %userargs = @_;
    keys_to_lowercase(\%userargs);

    my %args = ( 
        -values     => [],    # values to show
        -labels     => {},    # optional labels for the values 
        -active     => 0,     # the activated value
        -width      => undef, # the width of the listbox
        -height     => undef, # the height of the listbox
        -x          => 0,     # the hor. pos. rel. to parent
        -y          => 0,     # the vert. pos. rel. to parent
        -multi      => 0,     # multiselection possible?
        -radio      => 0,     # show radio buttons? Only for ! -multi
        -selected   => undef, # the selected item
        -wraparound => 0,     # wraparound on first/last item
        -onchange   => undef, # onChange event handler
	-onselchange=> undef, # onSelectionChange event handler

	-bg         => -1,
        -fg         => -1,
        
        %userargs,

        -routines   => {%routines},
        -bindings   => {%bindings},

        -yscrpos    => 0,     # Value init
        -focus      => 0,     # Value init
        -nocursor   => 1,     # This widget does not use a cursor
    );

    if ($args{-multi})
    {
        $args{-radio} = 0;
        $args{-selected} = {} 
	    unless ref $args{-selected} eq 'HASH';
        $args{-ypos} = 0;
    } else {
        $args{-ypos} = defined $args{-selected} ? $args{-selected} : 0;
    }

    my $this = $class->SUPER::new( %args );    
    $this->layout_content();

    if ($Curses::UI::ncurses_mouse) {
        $this->set_mouse_binding('mouse-button1', BUTTON1_CLICKED());
        $this->set_mouse_binding('mouse-button1', BUTTON1_DOUBLE_CLICKED());
    }

    return $this;
}

sub onChange(;$) { shift()->set_event('-onchange', shift()) }

sub onSelectionChange(;$) { shift()->set_event('-onselchange', shift()) };

sub values(;$)
{
    my $this = shift;
    my $values = shift;

    if (defined $values && ! ref $values) {
	$values = [ $values, @_ ];
    }
 
    if (defined $values and ref $values eq 'ARRAY') {
	# Clear and go to first item if we get new data
	$this->clear_selection();    

        $this->{-values} = $values;
	$this->option_first() if defined $values;

        # Make this widget non-focusable if there are
        # no values in it.
        $this->focusable(scalar(@{$values}));
    }

    return $this->{-values}
}

sub insert_at()
{
    
    my $this = shift;
    my $pos = shift;
    my $values = shift;

    # Clear and go to first item if we get new data
    $this->clear_selection();

    if (defined $values ) {
	if (ref $values eq 'ARRAY') {
	    my @newdata = (splice(@{$this->{-values}},0,$pos - 1), @{$values},
			   @{$this->{-values}});

	    $this->{-values} = \@newdata;
	} else {
	    my @newdata = (splice (@{$this->{-values}},0,$pos - 1), $values,
			   @{$this->{-values}});

	    $this->{-values} = \@newdata;
	}
    }

    return $this->{-values};

}

sub labels(;$)
{
    my $this = shift;
    my $labels = shift;

    if (defined $labels and ref $labels eq 'HASH') {
        $this->{-labels} = $labels;
    }
    return $this->{-labels}
}


sub add_labels(;$)
{
    my $this = shift;
    my $labels = shift;

    if (defined $labels and ref $labels eq 'HASH') {
        map $this->{-labels}->{$_} = $labels->{$_}, keys %{$labels};
    }
    return $this->{-labels}
}


sub maxlabelwidth(@)
{
    my %args = @_;
    
    my $maxwidth = 0;
    foreach my $value (@{$args{-values}})
    {
        my $label = $value;
        $label = $args{-labels}->{$value}
            if defined $args{-labels}->{$value};
        $maxwidth = length($label) 
            if length($label) > $maxwidth;
    }
    return $maxwidth;
}

sub layout()
{
    my $this = shift;
    $this->SUPER::layout() or return;
    
    $this->layout_content;

    # Scroll up if we can and the number of visible lines
    # is smaller than the number of available lines in the screen.
    my $inscreen = ($this->canvasheight
		 - ($this->number_of_lines - $this->{-yscrpos}));
    while ($this->{-yscrpos} > 0 and $inscreen < $this->canvasheight)
    {
	    $this->{-yscrpos}--;
	    $inscreen = ($this->canvasheight
		      - ($this->number_of_lines - $this->{-yscrpos}));
    }

    return $this;
}

sub layout_content()
{
    my $this = shift;
    return $this if $Curses::UI::screen_too_small;

    # Check bounds for -ypos index.
    $this->{-max_selected} = @{$this->{-values}} - 1;
    $this->{-ypos} = $this->{-max_selected}
        if $this->{-ypos} > $this->{-max_selected};
    $this->{-ypos} = 0 if $this->{-ypos} < 0;

    # Scroll down if needed.
    my $ycur = $this->{-ypos} - $this->{-yscrpos};
    if ( $ycur > ($this->canvasheight-1)) {
        $this->{-yscrpos} = $this->{-ypos} - $this->canvasheight + 1;
    }
    # Scroll up if needed.
    elsif ( $ycur < 0 ) {
        $this->{-yscrpos} = $this->{-ypos};
    }


    $this->{-vscrolllen} = @{$this->{-values}};
    $this->{-vscrollpos} = $this->{-yscrpos};
    if ( @{$this->{-values}} <= $this->canvasheight) {
        undef $this->{-vscrolllen};
    }

    return $this;
}

sub getlabel($;)
{
    my $this = shift;
    my $idx = shift || 0;

    my $value = $this->{-values}->[$idx];
    my $label = $value;
    $label = $this->{-labels}->{$label} 
        if defined $this->{-labels}->{$label};
    $label =~ s/\t/ /g; # do not show TABs
    
    return $label;
}


sub get_active_value($;)
{
    my $this = shift;
    my $id = $this->{-ypos};
    my $value = $this->{'-values'}->[$id];    
    return $value;
}

sub get_active_id($;)
{
    my $this = shift;
    return $this->{-ypos};;
}

sub draw(;$)
{
    my $this = shift;
    my $no_doupdate = shift || 0;

    # Draw the widget
    $this->SUPER::draw(1) or return $this;

    $this->layout_content;

     # Let there be color
    if ($Curses::UI::color_support) {
	my $co = $Curses::UI::color_object;
	my $pair = $co->get_color_pair(
			     $this->{-fg},
			     $this->{-bg});

	$this->{-canvasscr}->attron(COLOR_PAIR($pair));

    }

    # No values? 
    if (not @{$this->{-values}})
    {
        $this->{-canvasscr}->attron(A_DIM);    
        $this->{-canvasscr}->addstr(0,0,'- no values -');
        $this->{-canvasscr}->attroff(A_DIM);    

    # There are values. Show them!
    } else {
        my $start_idx = $this->{-yscrpos};
        my $end_idx = $this->{-yscrpos} + $this->canvasheight - 1;
        $end_idx = $this->{-max_selected} 
            if $end_idx > $this->{-max_selected};

        my $y = 0;
        my $cursor_y = 0;
        my $cursor_x = 0;
        for my $i ($start_idx .. $end_idx)
        {
            # The label to print.
            my $label = $this->getlabel($i);

            # Clear up label.
            $label =~ s/\n|\r//g;

            # Needed space for prefix.
            my $prefix_len = 
                (($this->{-multi} or $this->{-radio}) ? 4 : 0);

            # Chop length if needed.
            $label = $this->text_chop($label, ($this->canvaswidth-$prefix_len));

            # Show current entry in reverse mode and 
            # save cursor position.
            if ($this->{-ypos} == $i and $this->{-focus})
            {
                $this->{-canvasscr}->attron(A_REVERSE);
                $cursor_y = $y;    
                $cursor_x = $this->canvaswidth-1;
            }

            # Show selected element bold. 
            if (   (    not $this->{-multi}
                    and defined $this->{-selected}
                    and $this->{-selected} == $i)
                or (    $this->{-multi} 
                    and defined $this->{-selected}
                    and $this->{-selected}->{$i}) ) {
		    $this->{-canvasscr}->attron(A_BOLD);
            }
            
            # Make full line reverse or blank
            $this->{-canvasscr}->addstr(
                $y, $prefix_len, 
                " "x($this->canvaswidth-$prefix_len)
            );

            # Show label
            $this->text_draw($y, $prefix_len, $label);

            $this->{-canvasscr}->attroff(A_REVERSE);
            $this->{-canvasscr}->attroff(A_BOLD);

            # Place a [X] for selected value in multi mode.
            $this->{-canvasscr}->attron(A_BOLD) if $this->{-focus};
            if ($this->{-multi}) {
                if (defined $this->{-selected} and    
                    $this->{-selected}->{$i}) {
		    $this->{-canvasscr}->addstr($y, 0, '[X]');
                } else {
                    $this->{-canvasscr}->addstr($y, 0, '[ ]');
                }
            }

            # Place a <o> for selected value in radio mode.
            elsif ($this->{-radio}) {
                if (defined $this->{-selected} 
                    and $i == $this->{-selected}) {
                    $this->{-canvasscr}->addstr($y, 0, '<o>');
                } else {
                    $this->{-canvasscr}->addstr($y, 0, '< >');
                }
            }
            $this->{-canvasscr}->attroff(A_BOLD) if $this->{-focus};

            $y++;
        }

        $cursor_x = 1 if $this->{-multi} or $this->{-radio};
        $this->{-canvasscr}->move($cursor_y, $cursor_x);
    }

    $this->{-canvasscr}->noutrefresh();
    doupdate() unless $no_doupdate;

    return $this;
}

sub option_last()
{
    my $this = shift;
    $this->{-ypos} = $this->{-max_selected};
    $this->run_event('-onselchange');
    $this->schedule_draw(1);
    return $this;
}

sub option_nextpage()
{
    my $this = shift;
    if ($this->{-ypos} >= $this->{-max_selected}) { 
        $this->dobeep;
        return $this;
    }
    if ($this->{-ypos} + $this->canvasheight - 1 >= $this->{-max_selected}) { 
    	$this->{-ypos} = $this->{-max_selected};
		} else {
    	$this->{-ypos} += $this->canvasheight - 1;
		}
    $this->run_event('-onselchange');
    $this->schedule_draw(1);
    return $this;
}

sub option_prevpage()
{
    my $this = shift;
    if ($this->{-ypos} <= 0) {
        $this->dobeep;
        return $this;
    }
    if ($this->{-ypos} - $this->canvasheight - 1 < 0) {
    	$this->{-ypos} = 0;
		} else {
    	$this->{-ypos} -= $this->canvasheight - 1;
		}
    $this->run_event('-onselchange');
    $this->schedule_draw(1);
    return $this;
}

sub clear_selection()
{
    my $this = shift;
    if ($this->{-multi}) {
	my $selection = $this->{-selected};
	return unless defined $selection;
	foreach my $id (keys %$selection) {
	    $selection->{$id} = 0;
	}
    } else {
	$this->{-selected} = undef;
    }
    $this->schedule_draw(1);
}

sub set_selection() 
{
    my $this = shift;
    my $id;

    foreach $id (@_) {
	next if $id > @{$this->{-values}};
	if ($this->{-multi})
	{
	    my $changed = ($this->{-selected}->{$id} ? 0 : 1);
	    $this->{-selected}->{$id} = 1;
	    $this->run_event('-onchange') if $changed;
	    $this->schedule_draw(1);
	} else {
	    my $changed = (not defined $this->{-selected} or
			   ($this->{-selected} != $id));
	    $this->{-selected} = $id;
	    $this->run_event('-onchange') if $changed;
	    $this->schedule_draw(1);
	}
    }
    return $this;
}

sub option_next()
{
    my $this = shift;
    if ($this->{-ypos} >= $this->{-max_selected}) { 
        if ($this->{-wraparound}) {
            $this->{-ypos} = 0;
        } else {
            $this->dobeep;
        }
    } else {
        $this->{-ypos}++;
    }
    $this->layout_content;
    $this->run_event('-onselchange');
    $this->schedule_draw(1);
    return $this;
}

sub option_prev()
{
    my $this = shift;
    if ($this->{-ypos} <= 0) {
        if ($this->{-wraparound}) {
            $this->{-ypos} = $this->{-max_selected};
        } else {
            $this->dobeep;
        }
    } else {
        $this->{-ypos}--;
    }
    $this->layout_content;
    $this->run_event('-onselchange');
    $this->schedule_draw(1);
    return $this;
}

sub option_select()
{
    my $this = shift;

    if ($this->{-multi})
    {
        $this->{-selected}->{$this->{-ypos}} = 
           !$this->{-selected}->{$this->{-ypos}};
        $this->run_event('-onselchange');
        $this->run_event('-onchange');
        $this->schedule_draw(1);
        return $this;
    } else {
        my $changed = (not defined $this->{-selected} or
                       ($this->{-selected} != $this->{-ypos}));
        $this->{-selected} = $this->{-ypos};
        $this->run_event('-onselchange')if $changed; 
        $this->run_event('-onchange') if $changed;
        $this->schedule_draw(1);
        return ($this->{-radio} ? $this : 'LOOSE_FOCUS');
    }
}

sub option_first()
{
    my $this = shift;
    $this->{-ypos} = 0;
    $this->run_event('-onselchange');
    $this->schedule_draw(1);
    return $this;
}

sub option_check()
{
    my $this = shift;

    if ($this->{-multi})
    {
        my $changed = ($this->{-selected}->{$this->{-ypos}} ? 0 : 1);
        $this->{-selected}->{$this->{-ypos}} = 1;
        $this->{-ypos}++;
        $this->run_event('-onchange') if $changed;
        $this->schedule_draw(1);
        return $this;
    } else {
        my $changed = (not defined $this->{-selected} or
                       ($this->{-selected} != $this->{-ypos}));
        $this->{-selected} = $this->{-ypos};
        $this->run_event('-onchange') if $changed;
        $this->schedule_draw(1);
        return ($this->{-radio} ? $this : undef);
    }
}

sub option_uncheck()
{
    my $this = shift;
    if ($this->{-multi})
    {
        my $changed = ($this->{-selected}->{$this->{-ypos}} ? 1 : 0);
        $this->{-selected}->{$this->{-ypos}} = 0;
        $this->run_event('-onchange') if $changed;
        $this->{-ypos}++;
    } else {
        $this->dobeep;
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

    return unless $this->{-focusable};

    $this->layout_content;

    unless ($this->{-focus}) {
	$this->focus;
    }

    my $newypos = $this->{-yscrpos} + $y;
    if (@{$this->{-values}} and
	$newypos >= 0 and $newypos < @{$this->{-values}}) {
	$this->{-ypos} = $newypos;
	$this->do_routine('option-select');
    }

    $this->schedule_draw(1);
}

sub get()
{
    my $this = shift;
    return unless defined $this->{-selected};
    if ($this->{-multi}) {
        my @values = ();
        while (my ($id, $val) = each %{$this->{-selected}}) {
            next unless $val;
            push @values, $this->{-values}->[$id];
        }
        return @values;
    } else {
        return $this->{-values}->[$this->{-selected}];
    }
}

sub id()
{
    my $this = shift;
    return unless defined $this->{-selected};
    if ($this->{-multi}) {
        my @values = ();
        while (my ($id, $val) = each %{$this->{-selected}}) {
            next unless $val;
            push @values, $id;
        }
        return @values;
    } else {
        return $this->{-selected};
    }
}

sub get_selectedlabel()
{
    my $this = shift;
    my $value = $this->get;
    return unless defined $value;
    my $label = $this->{-labels}->{$value};
    return (defined $label ? $label : $value); 
}

sub set_color_fg {
    my $this = shift;
    $this->{-fg} = shift;
    $this->intellidraw;
}

sub set_color_bg {
    my $this = shift;
    $this->{-bg} = shift;
    $this->intellidraw;
}


# ----------------------------------------------------------------------
# Routines for search support
# ----------------------------------------------------------------------

sub number_of_lines()   { @{shift()->{-values}} }
sub getline_at_ypos($;) { shift()->getlabel(shift()) }

1;


=pod

=head1 NAME

Curses::UI::Listbox - Create and manipulate listbox widgets

=head1 CLASS HIERARCHY

 Curses::UI::Widget
 Curses::UI::Searchable
    |
    +----Curses::UI::Listbox


=head1 SYNOPSIS

    use Curses::UI;
    my $cui = new Curses::UI;
    my $win = $cui->add('window_id', 'Window');

    my $listbox = $win->add(
        'mylistbox', 'Listbox',
        -values    => [1, 2, 3],
        -labels    => { 1 => 'One', 
                        2 => 'Two', 
                        3 => 'Three' },
        -radio     => 1,
    );

    $listbox->focus();
    my $selected = $listbox->get();


=head1 DESCRIPTION

Curses::UI::Listbox is a widget that can be used to create 
a couple of different kinds of listboxes. These are:

=over 4

=item * B<default listbox>

A list of values through which can be browsed. One of these
values can be selected. The selected value will be 
highlighted. This kind of listbox looks somewhat like this:

 +------+
 |One   |
 |Two   |
 |Three |
 +------+

=item * B<multi-select listbox>

This is also a list of values, but now more than one 
value can be selected at once. This kind of listbox 
looks somewhat like this:

 +----------+
 |[X] One   |
 |[ ] Two   |
 |[X] Three |
 +----------+

=item * B<radiobutton listbox>

This looks a lot like the default listbox (only one
value can be selected), but now there is clear 
visual feedback on which value is selected. Before
each value "< >" is printed. If a value is selected,
"<o>" is printed instead. This kind of listbox 
looks somewhat like this:

 +----------+
 |< > One   |
 |<o> Two   |
 |< > Three |
 +----------+


=item * B<Listbox Markup>

The listbox supports a primitive markup language to emphasize
entries: 
    <reverse>reverse text</reverse>
    <bold>bold text</bold>
    <underline>underlined text</underline>
    <blink>blinking text</blink>
    <dim>dim text</dim>
By using this markup tokens in the values array, you can make the
listbox draw the text in the according way. To enable the parser,
you have to create the listbox with the -htmltext option.


=back




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

=item * B<-values> < ARRAYREF >

This option sets the values to use. 
Unless a label is set for the value (see B<-labels>), 
this value will be shown in the list.

=item * B<-labels> < HASHREF >

The keys of this hash reference correspond to the values of 
the listbox (see B<-values>). The values of the hash are the 
labels to show in the listbox. It's not obligatory to have 
a label defined for each value. You may even omit -labels 
completely.

=item * B<-selected> < INDEX >

In case the B<-multi> option is not set, INDEX is the index
of the value that should be selected.

In case the B<-multi> option is set, INDEX is a hash reference
in which the keys are the indices of the B<-values> which are 
selected and the values are any true value.

=item * B<-multi> < BOOLEAN >

If BOOLEAN has a true value, the listbox will be a multi-select
listbox (see DESCRIPTION).

=item * B<-radio> < BOOLEAN >

If BOOLEAN has a true value, the listbox will be a radiobutton
listbox (see DESCRIPTION).

=item * B<-wraparound> < BOOLEAN >

If BOOLEAN has a true value, wraparound is enabled. This means
that if the listbox is on its last value and a key is pressed
to go to the next value, the first value will be selected.
Also the last value will be selected if this first value is
selected and "goto previous value" is pressed.

=item * B<-onchange> < CODEREF >

This sets the onChange event handler for the listbox widget.
If a new item is selected, the code in CODEREF will be executed.
It will get the widget reference as its argument.

=item * B<-onselchange> < CODEREF >

This sets the onSelectionChange event handler for the listbox widget.
If a new item is marked as active CODEREF will be executed.
It will get the widget reference as its argument.

=item * B<-htmltext> < BOOLEAN >

Make the Listbox parse primitive markup to change the items
appearance. See above.


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

This method will return the values of the currently selected items 
in the list. If the listbox is not a multi-select listbox only one
value will be returned of course.

=item * B<id> ( )

This method will return the index of the currently selected items
in the list. If the listboy is not a multi-select listbox it will
only return one value.

=item * B<get_active_value> ( )

This method will return the value of the currently active (i.e 
highlighted line).

=item * B<get_active_id> ( )

This method will return the index of the currently active (i.e 
highlighted line).

=item * B<set_selection> ( LIST )

This method marks the items at the positions specified in LIST
as selected. In a multi-select listbox you can set multiple items 
with giving multiple values, in a single-select listbox only the
last item in LIST will be selected

=item * B<clear_selection> ( )

This method clears the selected objects of a multi and radiobutton
listbox.

=item * B<values> ( ARRAYREF )

This method sets the values to use. 

=item * B<insert_at> < POS, ARRAYREF|SCALAR >

This method adds ARRAYREF or SCALAR into the list of values at
pos.

=item * B<labels> [ HASHREF ]

This method sets the labels to use. 

=item * B<add_labels> [ HASHREF ]

This method adds the given labels to the already defined ones.

=item * B<onChange> ( CODEREF )

This method can be used to set the B<-onchange> event handler
(see above) after initialization of the listbox. 

=item * B<onSelectionChange> ( CODEREF )

This method can be used to set the B<-onselchange> event handler
(see above) after initialization of the listbox. 


=back




=head1 DEFAULT BINDINGS

=over 4

=item * <B<cursor-left>>, <B<h>>, <B<tab>>

Call the 'loose-focus' routine. This will have the widget 
loose its focus.

=item * <B<cursor-right>, <B<l>>, <B<enter>>, <B<space>>

Call the 'option-select' routine. This will select the
active item in the listbox.

=item * <B<1>>, <B<y>>

Call the 'option-check' routine. If the listbox is a 
multi-select listbox, the active item will become checked
and the next item will become active.

=item * <B<0>>, <B<n>>

Call the 'option-uncheck' routine. If the listbox is a 
multi-select listbox, the active item will become unchecked
and the next item will become active.

=item * <B<cursor-down>>, <B<j>>

Call the 'option-next' routine. This will make the next
item of the list active.

=item * <B<cursor-up>>, <B<k>>

Call the 'option-prev' routine. This will make the previous
item of the list active.

=item * <B<page-up>>

Call the 'option-prevpage' routine. This will make the item
on the previous page active.

=item * <B<page-down>>

Call the 'option-nextpage' routine. This will make the item
on the next page active.

=item * <B<home>>, <B<CTRL+A>>

Call the 'option-first' routine. This will make the first
item of the list active.

=item * <B<end>>, <B<CTRL+E>>

Call the 'option-last' routine. This will make the last
item of the list active.

=item * <B</>>

Call the 'search-forward' routine. This will make a 'less'-like
search system appear in the listbox. A searchstring can be
entered. After that the user can search for the next occurance
using the 'n' key or the previous occurance using the 'N' key.

=item * <B<?>>

Call the 'search-backward' routine. This will do the same as
the 'search-forward' routine, only it will search in the 
opposite direction.

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

