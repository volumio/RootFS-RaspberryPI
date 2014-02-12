# ----------------------------------------------------------------------
# Curses::UI::PasswordEntry
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

package Curses::UI::PasswordEntry;

use strict;
use Curses;
use Curses::UI::TextEntry;
use Curses::UI::Common;

use vars qw($VERSION @ISA);

@ISA = qw(
    Curses::UI::TextEntry
);

$VERSION = '1.10';
	
sub new ()
{
	my $class = shift;

        my %userargs = @_;
        keys_to_lowercase(\%userargs);

	my %args = ( 
		-undolevels	 => 20,	# number of undolevels. 0 = infinite
		-homeonblur      => 1,	# cursor to homepos on blur?
		-fg              => -1,
		-bg              => -1,
	
		%userargs,

		-password	 => '*',# force password token
		-showhardreturns => 0,	
	);

	# Create the entry.
	my $this = $class->SUPER::new( %args);

	return $this;
}

1;


=pod

=head1 NAME

Curses::UI::PasswordEntry - Create and manipulate passwordentry widgets

=head1 CLASS HIERARCHY

 Curses::UI::Widget
 Curses::UI::Searchable 
    |
    +----Curses::UI::TextEditor
            |
            +----Curses::UI::TextEntry
                    |
                    +----Curses::UI::PasswordEntry


=head1 SYNOPSIS

    use Curses::UI;
    my $cui = new Curses::UI;
    my $win = $cui->add('window_id', 'Window');

    my $passwordentry = $win->add( 
        'mypasswordentry', 'PasswordEntry'
    );

    $passwordentry->focus();
    my $password = $passwordentry->get();


=head1 DESCRIPTION

Curses::UI::PasswordEntry is a widget that can be used 
to create a passwordentry widget. This class is
derived from Curses::UI::TextEntry. The
only special thing about this class is that the 
B<-password> option is forced to '*'.
So for the usage of Curses::UI::PasswordEntry see
L<Curses::UI::TextEntry|Curses::UI::TextEntry>.




=head1 SEE ALSO

L<Curses::UI|Curses::UI>, 
L<Curses::UI::TextEntry|Curses::UI::TextEntry>, 




=head1 AUTHOR

Copyright (c) 2001-2002 Maurice Makaay. All rights reserved.

Maintained by Marcus Thiesen (marcus@cpan.thiesenweb.de)


This package is free software and is provided "as is" without express
or implied warranty. It may be used, redistributed and/or modified
under the same terms as perl itself.

