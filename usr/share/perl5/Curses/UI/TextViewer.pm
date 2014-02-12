# ----------------------------------------------------------------------
# Curses::UI::TextViewer
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

package Curses::UI::TextViewer;

use strict;
use Curses;
use Curses::UI::Common;
use Curses::UI::TextEditor;

use vars qw(
    $VERSION 
    @ISA
);

$VERSION = '1.10';

@ISA = qw(
    Curses::UI::TextEditor
);

sub new ()
{
    my $class = shift;

    my %userargs = @_;
    keys_to_lowercase(\%userargs);

    my %args = ( 
        %userargs,
        -readonly     => 1,
    );
    return $class->SUPER::new( %args);
}

1;


=pod

=head1 NAME

Curses::UI::TextViewer - Create and manipulate textviewer widgets

=head1 CLASS HIERARCHY

 Curses::UI::Widget
 Curses::UI::Searchable
    |
    +----Curses::UI::TextEditor
            |
            +----Curses::UI::TextViewer


=head1 SYNOPSIS

    use Curses::UI;
    my $cui = new Curses::UI;
    my $win = $cui->add('window_id', 'Window');

    my $textviewer = $win->add( 
        'mytextviewer', 'TextViewer',
    -text => "Hello, world!\n"
               . "Goodbye, world!"
    );

    $textviewer->focus();


=head1 DESCRIPTION

Curses::UI::TextViewer is a widget that can be used 
to create a textviewer widget. This class is
derived from Curses::UI::TextEditor. The
only special thing about this class is that the 
B<-readonly> option is forced to a true value. 
So for the usage of Curses::UI::TextViewer see
L<Curses::UI::TextEditor|Curses::UI::TextEditor>.




=head1 SEE ALSO

L<Curses::UI|Curses::UI>, 
L<Curses::UI::TextEditor|Curses::UI::TextEditor>, 




=head1 AUTHOR

Copyright (c) 2001-2002 Maurice Makaay. All rights reserved.

Maintained by Marcus Thiesen (marcus@cpan.thiesenweb.de)


This package is free software and is provided "as is" without express
or implied warranty. It may be used, redistributed and/or modified
under the same terms as perl itself.

