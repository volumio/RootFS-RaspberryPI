# ----------------------------------------------------------------------
# Curses::UI::Radiobuttonbox
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

package Curses::UI::Radiobuttonbox;

use strict;
use Curses;
use Curses::UI::Common;
use Curses::UI::Listbox;
use Curses::UI::Widget;

use vars qw(
    $VERSION 
    @ISA
);

$VERSION = '1.10';

@ISA = qw(
    Curses::UI::Listbox
);
    
sub new ()
{
    my $class = shift;

    my %userargs = @_;
    keys_to_lowercase(\%userargs);

    my %args = ( 
        %userargs,
        -radio     => 1, # Force radiobuttons
        -multi     => 0, # Force no multiselect
    );

    # Compute the needed with if -width is undefined.
    # The extra 4 positions are for the radiobutton drawing. 
    $args{-width} = 4 + width_by_windowscrwidth(maxlabelwidth(%args), %args)
        unless defined $args{-width};

    # Create the entry.
    my $this = $class->SUPER::new( %args);

    return $this;
}

1;


=pod

=head1 NAME

Curses::UI::Radiobuttonbox - Create and manipulate radiobuttonbox widgets

=head1 CLASS HIERARCHY

 Curses::UI::Widget
 Curses::UI::Searchable
    |
    +----Curses::UI::Listbox
            |
            +----Curses::UI::Radiobuttonbox



=head1 SYNOPSIS

    use Curses::UI;
    my $cui = new Curses::UI;
    my $win = $cui->add('window_id', 'Window');

    my $radiobuttonbox = $win->add(
        'myradiobuttonbox', 'Radiobuttonbox',
        -values    => [1, 2, 3],
        -labels    => { 1 => 'One', 
                        2 => 'Two', 
                        3 => 'Three' },
    );

    $radiobuttonbox->focus();
    my $selected = $radiobuttonbox->get();


=head1 DESCRIPTION

Curses::UI::Radiobuttonbox is a widget that can be used 
to create a radiobutton listbox. Only one value can be
selected at a time. This kind of listbox looks somewhat 
like this:

 +----------+
 |< > One   |
 |<o> Two   |
 |< > Three |
 +----------+

A Radiobuttonbox is derived from Curses::UI::Listbox. The
only special thing about this class is that the 
B<-radio> option is forced to a true value. So for the
usage of Curses::UI::Radiobuttonbox see
L<Curses::UI::Listbox|Curses::UI::Listbox>).




=head1 SEE ALSO

L<Curses::UI|Curses::UI>, 
L<Curses::UI::Listbox|Curses::UI::Listbox>, 




=head1 AUTHOR

Copyright (c) 2001-2002 Maurice Makaay. All rights reserved.

Maintained by Marcus Thiesen (marcus@cpan.thiesenweb.de)


This package is free software and is provided "as is" without express
or implied warranty. It may be used, redistributed and/or modified
under the same terms as perl itself.

