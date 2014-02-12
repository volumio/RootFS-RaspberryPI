# ----------------------------------------------------------------------
# Curses::UI::Progressbar
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

package Curses::UI::Progressbar;

use strict;
use Curses;
use Curses::UI::Common;
use Curses::UI::Widget;

use vars qw(
    $VERSION  
    @ISA
);

@ISA = qw(
    Curses::UI::Widget 
    Curses::UI::Common
);

$VERSION = '1.10';

sub new ()
{
    my $class = shift;

        my %userargs = @_;
        keys_to_lowercase(\%userargs);

    my %args = ( 
        -min          => 0,    # minimal value    
        -max          => 100,  # maximum value    
        -pos          => 0,    # the current position
        -nopercentage => 0,    # show the percentage or not?
        -nocenterline => 0,    # show the center line or not?
        -showvalue    => 0,    # show value instead of percentage
        -border       => 1,
	-fg           => -1,
        -bg           => -1,

        %userargs,    
    
        -focusable    => 0,
        -nocursor     => 1,
    );

    # Check that the lowest value comes first.
    if ($args{-min} > $args{-max}) 
    {
        my $tmp = $args{-min};
        $args{-min} = $args{-max};    
        $args{-max} = $tmp;
    }

    my $height = height_by_windowscrheight(1, %args);
    $args{-height} = $height;

    my $this = $class->SUPER::new( %args );    
    return $this;
}

sub get()
{
    my $this = shift;
    return $this->{-pos};
}

sub pos(;$)
{
    my $this = shift;
    my $pos = shift || 0;
    $this->{-pos} = $pos;    
    $this->intellidraw;
    return $this;
}

sub draw(;$)
{
    my $this = shift;
    my $no_doupdate = shift || 0;
    
    # Draw the widget
    $this->SUPER::draw(1) or return $this;

    # Check bounds for the position.
    $this->{-pos} = $this->{-max} if $this->{-pos} > $this->{-max};
    $this->{-pos} = $this->{-min} if $this->{-pos} < $this->{-min};

    if ($Curses::UI::color_support) {
	my $co = $Curses::UI::color_object;
	my $pair = $co->get_color_pair(
			     $this->{-fg},
			     $this->{-bg});

	$this->{-canvasscr}->attron(COLOR_PAIR($pair));

    }

    # Compute percentage
    my $perc = ($this->{-pos}-$this->{-min})
                /($this->{-max}-$this->{-min})*100;

    # Compute the number of blocks to draw. Only draw
    # no blocks or all blocks if resp. the min. or the
    # max. value is set.
    my $blocks = int($perc * $this->canvaswidth / 100);
    if ($blocks == 0 and 
	$this->{-pos} != $this->{-min}) { $blocks++ }
    if ($blocks == $this->canvaswidth and 
	$this->{-pos} != $this->{-max}) { $blocks-- }

    # Draw center line
    $this->{-canvasscr}->addstr(0, 0, "-"x$this->canvaswidth)
        unless $this->{-nocenterline};

    # Draw blocks.
    $this->{-canvasscr}->attron(A_REVERSE);
    $this->{-canvasscr}->addstr(0, 0, " "x$blocks);
    $this->{-canvasscr}->attroff(A_REVERSE);

    # Draw percentage
    if (not $this->{-nopercentage} or $this->{-showvalue})
    {
        my $str;
        if ($this->{-showvalue}) {
            $str = " $this->{-pos} ";
        } else {
            $str = " " . int($perc) . "% ";
        }

        my $len = length($str);
        my $xpos = int(($this->canvaswidth - $len)/2);
        my $revlen = $blocks - $xpos;
        $revlen = 0 if $revlen < 0;
        $revlen = $len if $revlen > $len; 
        my $rev = substr($str, 0, $revlen);
        my $norev = substr($str, $revlen, $len-$revlen);
        $this->{-canvasscr}->attron(A_REVERSE);
        $this->{-canvasscr}->addstr(0, $xpos, $rev);
        $this->{-canvasscr}->attroff(A_REVERSE);
        $this->{-canvasscr}->addstr(0, $xpos+$revlen, $norev);
    }

    $this->{-canvasscr}->move(0,$this->canvaswidth-1);
    
    $this->{-canvasscr}->noutrefresh();
    doupdate() unless $no_doupdate;

    return $this;
}


1;


=pod

=head1 NAME

Curses::UI::Progressbar - Create and manipulate progressbar widgets

=head1 CLASS HIERARCHY

 Curses::UI::Widget
    |
    +----Curses::UI::Progressbar


=head1 SYNOPSIS

    use Curses::UI;
    my $cui = new Curses::UI;
    my $win = $cui->add('window_id', 'Window');

    my $progressbar = $win->add(
        'myprogressbar', 'Progressbar',
        -max       => 250,
        -pos       => 42,
    );

    $progressbar->draw;


=head1 DESCRIPTION

Curses::UI::Progressbar is a widget that can be used to 
provide some sort of progress information to the user
of your program. The progressbar looks like this:

 +------------------------------------------+
 |||||||||---------- 14% ------------------ |
 +------------------------------------------+

See exampes/demo-Curses::UI::Progressbar in the distribution
for a short demo.



=head1 STANDARD OPTIONS

B<-parent>, B<-x>, B<-y>, B<-width>, B<-height>, 
B<-pad>, B<-padleft>, B<-padright>, B<-padtop>, B<-padbottom>,
B<-ipad>, B<-ipadleft>, B<-ipadright>, B<-ipadtop>, B<-ipadbottom>,
B<-title>, B<-titlefullwidth>, B<-titlereverse>

For an explanation of these standard options, see 
L<Curses::UI::Widget|Curses::UI::Widget>.




=head1 WIDGET-SPECIFIC OPTIONS

=over 4

=item * B<-min> < VALUE >

This opion sets the minimum value for the progress bar. 
Default is 0.

=item * B<-max> < VALUE >

This opion sets the maximum value for the progress bar.

=item * B<-pos> < VALUE >

This option sets the startposition for the progress
bar.

=item * B<-nopercentage> < BOOLEAN >

This option controls if a percentage indicator should
be drawn in the widget. The default for the BOOLEAN 
value is false, so a percentage incdicator will be drawn.

=item * B<-showvalue> < BOOLEAN >

If this option is set to a true value, the current
position value will be drawn in the widget.

=item * B<-nocenterline> < BOOLEAN >

This option controls if a horizontal line should
be drawn in the widget. The default for the BOOLEAN 
value is false, so a horizontal line will be drawn.

=back




=head1 METHODS

=over 4

=item * B<new> ( OPTIONS )

=item * B<layout> ( )

=item * B<draw> ( BOOLEAN )

=item * B<intellidraw> ( )

=item * B<focus> ( )

These are standard methods. See L<Curses::UI::Widget|Curses::UI::Widget> 
for an explanation of these.

=item * B<get> ( )

This method will return the current B<-pos> value of the widget.

=item * B<pos> ( VALUE )

This method will set the B<-pos> value of the widget to SCALAR.

=back




=head1 DEFAULT BINDINGS

Since a Progressbar is a non-interacting widget, it does not have
any bindings.





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

