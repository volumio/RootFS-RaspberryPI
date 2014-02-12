# ----------------------------------------------------------------------
# Curses::UI::Color
#
# (c) 2003 by Marcus Thiesen. All rights reserved.
# This file is part of Curses::UI. Curses::UI is free software.
# You can redistribute it and/or modify it under the same terms
# as perl itself.
#
# e-mail: marcus@cpan.thiesenweb.de
# ----------------------------------------------------------------------

package Curses::UI::Color;

use Curses;
use Curses::UI::Common;
use strict;

use vars qw(
    @ISA 
    $VERSION

);

$VERSION = "0.01";

@ISA = qw(
    Curses::UI::Common
);

sub new {
    my $class = shift;

    my %userargs = @_;
    keys_to_lowercase(\%userargs);

    my %args = (
		-default_colors => 1,
	
		%userargs,
	
		);

    if ( $args{-default_colors} ) {
	use_default_colors();
    }
    
    start_color();

    my $this =  bless { %args }, $class;

    $this->{cmap} = {
	 black   => COLOR_BLACK,
	 red     => COLOR_RED,
	 green   => COLOR_GREEN,
	 yellow  => COLOR_YELLOW,
	 blue    => COLOR_BLUE,
	 magenta => COLOR_MAGENTA,
	 cyan    => COLOR_CYAN,
	 white   => COLOR_WHITE,
	 };

    $this->{pmap} = {};
    $this->{pcount} = 0;
    $this->{ccount} = 7;

    return $this;
}

sub get_color_pair {
    my $this = shift;
    my $fg = shift;
    my $bg = shift;

    return unless defined $fg;
    return unless defined $bg;

    my $fgn = $this->{cmap}->{"$fg"};
    my $bgn = $this->{cmap}->{"$bg"};
    
    $fgn = -1 unless defined $fgn;
    $bgn = -1 unless defined $bgn;

    if ($this->{pmap}->{"$fg.$bg"}) {
	return $this->{pmap}->{"$fg.$bg"};
    } else {
	$this->{pcount}++;
	init_pair($this->{pcount}, $fgn, $bgn);
	$this->{pmap}->{"$fg.$bg"} = $this->{pcount};
	return $this->{pcount};
    }
}

sub get_colors {
    my $this = shift;
    return keys %{$this->{cmap}};
}

sub colors {
    return $Curses::UI::color_support;
}

sub define_color {
    my $this = shift;
    my $name = shift;
    my ($r, $g, $b) = @_;

    return unless $r < 1000;
    return unless $g < 1000;
    return unless $b < 1000;
    
    return unless $r > 0;
    return unless $g > 0;
    return unless $b > 0;

    init_color($this->{ccount}, $r, $g, $b);

    $this->{cmap}->{$name} = $this->{ccount};
    $this->{ccount}++;

    return 1;
}

1;

=pod

=head1 NAME

Curses::UI::Color - Color support module

=head1 WARNING

This is a development version. As I do not expect to change
the interface during this time it may happen that the color
behaviour (e.g. to what extend color is drawn in a window)
may change or even the colors themselves. If you want something
stable, use -color_support => 0 , but you won't get those fency
colors then :-)

=head1 DESCRIPTION

This module provides all functions related to color support in
Curses::UI. The color support was implemented without disturbing
old applications, they will look as they used to do. Only if you
enable color support explicitly and it is available on your terminal
the color functions will have an effect.

=head1 SYNOPSIS

my $cui = new Curses::UI(-color_support => 1,
                         -clear_on_exit => 0);

my $mainw = $cui->add('screen', 'Window');

$mainw->add('l','Label', -bg => "white", 
                         -fg => "blue",
                         -text => "Colored Label");



=head1 METHODS

=over 4

=item * B<new> (-default-colors => BOOLEAN)

Creates a new Curses::UI::Color object, the option
default colors define if the use_default_colors function
of Curses is used. See L<Curses> for that.

=item * B<get_colors> ( )

Returns all in this object defined colors as an array

=item * B<colors> ( )

Is true if color support is enabled.

=item * B<define_color> ( NAME, R, G, B )

This function defines a new color in the Color object. The
RGB values can be between 0 and 1000. Existing colors can
be redefined. 

=back

=head1 USAGE

Curses::UI has 7 predefined colors:
         black   
         red     
         green   
         yellow  
         blue             
         magenta 
         cyan    
         white   

Curses::UI with color support also defines some new options:

     -fg  -bg for general foreground and background color.
    -tfg -tbg for widget title fg and bg color
    -bfg -bbg for widget border fg and bg color
    -sfg -sbg for scrollbar fg and bg color

Every widget has has a runtime setter:
    set_color_fg ( COLOR ) 
    set_colof_bg ( COLOR )
    set_color_tfg ( COLOR ) 
    set_colof_tbg ( COLOR )
    set_color_bfg ( COLOR ) 
    set_colof_bbg ( COLOR )
    set_color_sfg ( COLOR ) 
    set_colof_sbg ( COLOR )

Mostly every widget has a -fg and -bg option to set the foreground
and background color using the above color names. Own colors can be
defined using the B<define_color> method. Every widget that 
supports color by now has also two functions B<set_color_fg> and
B<set_color_bg> to set or change the color at runtime.
Widgets with borders and scrollbars can use -bfg and -bbg to set the
foreground and background color of the border or the -sfg and -sbg
option to set the colors of the scrollbar.
Widgets with titles can set the -tfg and -tbg option to define
the title foreground and background color.

Check also the examples/color_editor for seeing what is possible
at the moment. 

=head1 SEE ALSO

L<Curses::UI> 

=head1 AUTHOR

Copyright (c) 2003 Marcus Thiesen. All rights reserved.

Maintained by Marcus Thiesen (marcus@cpan.thiesenweb.de)

This package is free software and is provided "as is" without express
or implied warranty. It may be used, redistributed and/or modified
under the same terms as perl itself.

