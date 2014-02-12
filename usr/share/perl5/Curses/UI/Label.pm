# ----------------------------------------------------------------------
# Curses::UI::Label
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

package Curses::UI::Label;

use strict;
use Curses;
use Curses::UI::Widget;
use Curses::UI::Common;

use vars qw(
    $VERSION 
    @ISA
);

$VERSION = '1.11';

@ISA = qw(
    Curses::UI::Widget
);

sub new ()
{
    my $class = shift;

    my %userargs = @_;
    keys_to_lowercase(\%userargs);

    my %args = (
        -parent          => undef,    # the parent window
        -width           => undef,    # the width of the label
        -height          => undef,    # the height of the label
        -x               => 0,        # the hor. pos. rel. to the parent
        -y               => 0,        # the vert. pos. rel. to the parent
        -text            => undef,    # the text to show
        -textalignment   => undef,    # left / middle / right
        -bold            => 0,        # Special attributes
        -reverse         => 0,
        -underline       => 0,
        -dim             => 0,
        -blink           => 0,
        -paddingspaces   => 0,        # Pad text with spaces?
	-bg              => -1,
	-fg              => -1,

        %userargs,

        -nocursor        => 1,        # This widget uses no cursor
        -focusable       => 0,        # This widget can't be focused
    );

    # Get the text dimension if -width or -height is undefined.
    my @text_dimension = (undef,1);
    unless (defined $args{-width} and defined $args{-height}) {
        @text_dimension = text_dimension($args{-text})
            if defined $args{-text};
    }

    # If the -height is not set, determine the height
    # using the initial contents of the -text.
    if (not defined $args{-height}) 
    {
        my $l = $text_dimension[1];
        $l = 1 if $l <= 0;
        $args{-height} = height_by_windowscrheight($l, %args);
    }

    # No width given? Then make the width the same size
    # as the text. No initial text? Then let
    # Curses::UI::Widget figure it out.
    $args{-width} = width_by_windowscrwidth($text_dimension[0], %args)
        unless defined $args{-width} or not defined $args{-text};

    # If no text was defined (how silly...) we define an empty string.
    $args{-text} = '' unless defined $args{-text};

    # Create the widget.
    my $this = $class->SUPER::new( %args );

    $this->layout();

    return $this;
}

sub layout()
{
    my $this = shift;
    $this->SUPER::layout or return;
    return $this;
}


sub bold ($;$)      { shift()->set_attribute('-bold', shift())      }
sub reverse ($;$)   { shift()->set_attribute('-reverse', shift())   }
sub underline ($;$) { shift()->set_attribute('-underline', shift()) }
sub dim ($;$)       { shift()->set_attribute('-dim', shift())       }
sub blink ($;$)     { shift()->set_attribute('-blink', shift())     }

sub set_attribute($$;)
{
    my $this = shift;
    my $attribute = shift;
    my $value = shift || 0;

    $this->{$attribute} = $value;
    $this->intellidraw;

    return $this;
}



sub text($;$)
{
    my $this = shift;
    my $text = shift;

    if (defined $text) 
    {
        $this->{-text} = $text;
        $this->intellidraw;
        return $this;
    } else {
        return $this->{-text};
    }
}

sub get() { shift()->text }

sub textalignment($;)
{
    my $this = shift;
    my $value = shift;
    $this->{-textalignment} = $value;
    $this->intellidraw;
    return $this;
}

sub compute_xpos()
{
    my $this = shift;
    my $line = shift;

    # Compute the x location of the text.
    my $xpos = 0;
    if (defined $this->{-textalignment})
    {
        if ($this->{-textalignment} eq 'right') {
	    $xpos = $this->canvaswidth - length($line);
        } elsif ($this->{-textalignment} eq 'middle') {
	    $xpos = int (($this->canvaswidth-length($line))/2);
        }
    }
    $xpos = 0 if $xpos < 0;
    return $xpos;
}

sub draw(;$)
{
    my $this = shift;
    my $no_doupdate = shift || 0;

    # Draw the widget.
    $this->SUPER::draw(1) or return $this;

    # Clear all attributes.
    $this->{-canvasscr}->attroff(A_REVERSE);
    $this->{-canvasscr}->attroff(A_BOLD);
    $this->{-canvasscr}->attroff(A_UNDERLINE);
    $this->{-canvasscr}->attroff(A_BLINK);
    $this->{-canvasscr}->attroff(A_DIM);

    # Set wanted attributes.
    $this->{-canvasscr}->attron(A_REVERSE)   if $this->{-reverse};
    $this->{-canvasscr}->attron(A_BOLD)      if $this->{-bold};
    $this->{-canvasscr}->attron(A_UNDERLINE) if $this->{-underline};
    $this->{-canvasscr}->attron(A_BLINK)     if $this->{-blink};
    $this->{-canvasscr}->attron(A_DIM)       if $this->{-dim};

    # Let there be color
    if ($Curses::UI::color_support) {
	my $co = $Curses::UI::color_object;
	my $pair = $co->get_color_pair(
			     $this->{-fg},
			     $this->{-bg});

	$this->{-canvasscr}->attron(COLOR_PAIR($pair));

    }

    # Draw the text. Clip it if it is too long.
    my $ypos = 0;
    my $split = split_to_lines($this->{-text});
    foreach my $line (@$split)
    {
        if (length($line) > $this->canvaswidth) {
            # Break text
            $line = substr($line, 0, $this->canvaswidth);
            $line =~ s/.$/\$/;
        } elsif ($this->{-paddingspaces}) {
            $this->{-canvasscr}->addstr($ypos, 0, " "x$this->canvaswidth);
        }

        my $xpos = $this->compute_xpos($line);
        $this->{-canvasscr}->addstr($ypos, $xpos, $line);

        $ypos++;
    }

    $this->{-canvasscr}->noutrefresh;
    doupdate() unless $no_doupdate;

    return $this;
}




1;


=pod

=head1 NAME

Curses::UI::Label - Create and manipulate label widgets

=head1 CLASS HIERARCHY

 Curses::UI::Widget
    |
    +----Curses::UI::Label



=head1 SYNOPSIS

    use Curses::UI;
    my $cui = new Curses::UI;
    my $win = $cui->add('window_id', 'Window');

    my $label = $win->add(
        'mylabel', 'Label',
        -text      => 'Hello, world!',
        -bold      => 1,
    );

    $label->draw;



=head1 DESCRIPTION

Curses::UI::Label is a widget that shows a textstring.
This textstring can be drawn using these special
features: bold, dimmed, reverse, underlined, and blinking.

See exampes/demo-Curses::UI::Label in the distribution
for a short demo.



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

=item * B<-height> < VALUE >

If you do not define B<-height>, the label will compute 
its needed height using the initial B<-text>. 

=item * B<-text> < TEXT >

This will set the text on the label to TEXT.

=item * B<-textalignment> < VALUE >

This option controls how the text should be aligned inside
the label. VALUE can be 'left', 'middle' and 'right'. The 
default value for this option is 'left'. 

=item * B<-paddingspaces> < BOOLEAN >

This option controls if padding spaces should be added
to the text if the text does not fill the complete width
of the widget. The default value for BOOLEAN is false.
An example use of this option is:

    $win->add(
        'label', 'Label', 
        -width         => -1, 
        -paddingspaces => 1,
        -text          => 'A bit of text', 
    );

This will create a label that fills the complete width of 
your screen and which will be completely in reverse font
(also the part that has no text on it). See the demo
in the distribution (examples/demo-Curses::UI::Label)
for a clear example of this)

=item * B<-bold> < BOOLEAN >

If BOOLEAN is true, text on the label will be drawn in 
a bold font.

=item * B<-dim> < BOOLEAN >

If BOOLEAN is true, text on the label will be drawn in 
a dim font.

=item * B<-reverse> < BOOLEAN >

If BOOLEAN is true, text on the label will be drawn in
a reverse font.

=item * B<-underline> < BOOLEAN >

If BOOLEAN is true, text on the label will be drawn in
an underlined font.

=item * B<-blink> < BOOLEAN >

If BOOLEAN is option is true, text on the label will be 
drawn in a blinking font.

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

=item * B<bold> ( BOOLEAN )

=item * B<dim> ( BOOLEAN )

=item * B<reverse> ( BOOLEAN )

=item * B<underline> ( BOOLEAN )

=item * B<blink> ( BOOLEAN )

These methods can be used to control the font in which the text on
the label is drawn, after creating the widget. The font option
will be turned on for a true value of BOOLEAN.

=item * B<textalignment> ( VALUE )

Set the textalignment. VALUE can be 'left',
'middle' or 'right'. 

=item * B<text> ( [TEXT] )

Without the TEXT argument, this method will return the current 
text of the widget. With a TEXT argument, the text on the widget
will be set to TEXT. 

=item * B<get> ( )

This will call the B<text> method without any argument and thus
it will return the current text of the label.

=back




=head1 DEFAULT BINDINGS

Since a Label is a non-interacting widget, it does not have
any bindings.




=head1 SEE ALSO

L<Curses::UI|Curses::UI>, 
L<Curses::UI::Widget|Curses::UI::Widget>, 




=head1 AUTHOR

Copyright (c) 2001-2002 Maurice Makaay. All rights reserved.

Maintained by Marcus Thiesen (marcus@cpan.thiesenweb.de)


This package is free software and is provided "as is" without express
or implied warranty. It may be used, redistributed and/or modified
under the same terms as perl itself.

