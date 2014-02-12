# ----------------------------------------------------------------------
# Curses::UI::Dialog::Error
#
# (c) 2001-2002 by Maurice Makaay. All rights reserved.
# This file is part of Curses::UI. Curses::UI is free software.
# You can redistribute it and/or modify it under the same terms
# as perl itself.
#
# Currently maintained by Marcus Thiesen
# e-mail: marcus@cpan.thiesenweb.de
# ----------------------------------------------------------------------

package Curses::UI::Dialog::Error;

use strict;
use Curses;
use Curses::UI::Common;
use Curses::UI::Dialog::Basic;

use vars qw(
    $VERSION
    @ISA
);

@ISA = qw(
    Curses::UI::Dialog::Basic
    Curses::UI::Common
);

$VERSION = '1.10';

sub new ()
{
    my $class = shift;

    my %userargs = @_;
    keys_to_lowercase(\%userargs);

    my %args = ( 
	-message      => '',        # The message to show
	-fg           => -1,
        -bg           => -1,

	%userargs,

	-ipadleft     => 10,        # Space for sign
	-centered     => 1,
    );

    my $this = $class->SUPER::new(%args);

    unless (defined $this->{-title}) {
	my $l = $this->root->lang;
	$this->title($l->get('error_title'));
    }

    bless $this, $class;
}

sub draw(;$)
{
    my $this = shift;
    my $no_doupdate = shift || 0;
    
    # Draw widget
    $this->SUPER::draw(1) or return $this;

    # Draw sign
    $this->{-borderscr}->addstr(2, 1, "    _"); 
    $this->{-borderscr}->addstr(3, 1, "   / \\"); 
    $this->{-borderscr}->addstr(4, 1, "  / ! \\"); 
    $this->{-borderscr}->addstr(5, 1, " /_____\\"); 
    $this->{-borderscr}->noutrefresh();

    $this->{-canvasscr}->noutrefresh();
    doupdate() unless $no_doupdate;

    return $this;
}

1;


=pod

=head1 NAME

Curses::UI::Dialog::Error - Create and manipulate error dialogs

=head1 CLASS HIERARCHY

 Curses::UI::Widget
    |
    +----Curses::UI::Container
            |
            +----Curses::UI::Window
                    |
                    +----Curses::UI::Dialog::Basic
                            |
                            +----Curses::UI::Dialog::Error


=head1 SYNOPSIS

    use Curses::UI;
    my $cui = new Curses::UI;
    my $win = $cui->add('window_id', 'Window');

    # The hard way.
    # -------------
    my $dialog = $win->add(
        'mydialog', 'Dialog::Error',
    -message   => 'The world has gone!'
    );
    $dialog->focus;
    $win->delete('mydialog');

    # The easy way (see Curses::UI documentation).
    # --------------------------------------------
    $cui->error(-message => 'The world has gone!');

    # or even:
    $cui->error('The world has gone!');



=head1 DESCRIPTION

Curses::UI::Dialog::Error is a basic error dialog. It is
almost the same as L<Curses::UI::Dialog::Basic|Curses::UI::Dialog::Basic>,
except for the fact that a warning sign is drawn to the left of
the message using ASCII "art":

       _
      / \
     / ! \
    /_____\


Since this class is very closely related to the basic dialog,
see L<Curses::UI::Dialog::Basic|Curses::UI::Dialog::Basic> for
a description of the options and methods that you can use.



=head1 SEE ALSO

L<Curses::UI|Curses::UI>, 
L<Curses::UI::Dialog::Basic|Curses::UI::Dialog::Basic>



=head1 AUTHOR

Copyright (c) 2001-2002 Maurice Makaay. All rights reserved.

Maintained by Marcus Thiesen (marcus@cpan.thiesenweb.de)


This package is free software and is provided "as is" without express
or implied warranty. It may be used, redistributed and/or modified
under the same terms as perl itself.

