# ----------------------------------------------------------------------
# Curses::UI::Dialog::Calendar
#
# (c) 2001-2002 by Maurice Makaay. All rights reserved.
# This file is part of Curses::UI. Curses::UI is free software.
# You can redistribute it and/or modify it under the same terms
# as perl itself.
#
# Currently maintained by Marcus Thiesen
# e-mail: marcus@cpan.thiesenweb.de
# ----------------------------------------------------------------------

package Curses::UI::Dialog::Calendar;

use strict;
use Curses;
use Curses::UI::Window;
use Curses::UI::Common;
use Curses::UI::Widget;

use vars qw(
    $VERSION 
    @ISA
);

@ISA = qw(
    Curses::UI::Window 
    Curses::UI::Common
);

$VERSION = '1.10';

sub new ()
{
    my $class = shift;

        my %userargs = @_;
        keys_to_lowercase(\%userargs);

    my %args = ( 
        -title          => undef,
        -date           => undef, 
        -fg             => -1,
        -bg             => -1,

        %userargs,

        -selected_date  => undef,
        -border         => 1,
        -centered       => 1,
        -titleinverse   => 0,
        -ipad           => 1,
    );

    my $this = $class->SUPER::new(%args);
    
    my $l = $this->root->lang;

    my $buttons = $this->add(
        'buttons', 'Buttonbox',
        -y               => -1,
        -x               => 0,
        -width           => undef, 
        -buttonalignment => 'right',
        -buttons         => [ 'ok', 'cancel' ],
        -bg              => $this->{-bg},
        -fg              => $this->{-fg},
    );

    # Let the window in which the buttons are loose focus
    # if a button is pressed.
    $buttons->set_routine( 'press-button', \&press_button_callback );

    my $calendar = $this->add(
        'calendar', 'Calendar',
        -border          => 0,
        -padbottom       => 1,
        -date            => $this->{-date},
        -bg              => $this->{-bg},
        -fg              => $this->{-fg},
    )->focus;    

    # Selecting a date may bring the focus to the OK button.
    $calendar->set_routine('date-select', sub{
        my $cal = shift;
	$cal->date_select;
	$cal->parent->getobj('buttons')->{-selected} = 0;
	$cal->loose_focus;
    });

    # Doubleclick on calendar may close the dialog.
    if ( $Curses::UI::ncurses_mouse ) {
	$calendar->set_mouse_binding(sub {
	    my $buttons = shift();
	    my @extra = @_;
	    my $this = $buttons->parent;
	    $buttons->do_routine('mouse-button', @extra);
	    $this->{-selected_date} = $this->getobj('calendar')->get;
	    $this->loose_focus;
	}, BUTTON1_DOUBLE_CLICKED());
    }

    # Escape should close the dialog, without setting a date.
    $this->set_binding(sub {
        my $this = shift;
	$this->{-selected_date} = undef;
	$this->loose_focus;
    }, CUI_ESCAPE());

    $this->layout();

    return bless $this, $class;
}

sub layout()
{
    my $this = shift;

        my $cal = $this->getobj('calendar');
        if ($cal) {
        $this->{-width} = width_by_windowscrwidth(
                    $this->getobj('calendar')->{-width}, %$this);
        $this->{-height} = height_by_windowscrheight(
                    $this->getobj('calendar')->{-height}, %$this);
    }

    $this->SUPER::layout() or return;

    return $this;
}

sub get()
{
    my $this = shift;
    return $this->{-selected_date};
}

sub press_button_callback()
{
    my $buttons = shift;
    my $this = $buttons->parent;

    my $ok_pressed = $buttons->get;
    if ($ok_pressed)
    {
        $this->{-selected_date} = $this->getobj('calendar')->get;
    } else {
        $this->{-selected_date} = undef;
    }

    $this->loose_focus;
}

1;


=pod

=head1 NAME

Curses::UI::Dialog::Calendar - Create and manipulate calendar dialogs

=head1 CLASS HIERARCHY

 Curses::UI::Widget
    |
    +----Curses::UI::Container
            |
            +----Curses::UI::Window
                    |
                    +----Curses::UI::Dialog::Calendar



=head1 SYNOPSIS

    use Curses::UI;
    my $cui = new Curses::UI;
    my $win = $cui->add('window_id', 'Window');

    # The hard way.
    # -------------
    my $dialog = $win->add(
        'mydialog', 'Dialog::Calendar'
    );
    $dialog->modalfocus;
    $win->delete('mydialog');
    my $date = $dialog->get();

    # The easy way (see Curses::UI documentation).
    # --------------------------------------------
    $date = $cui->calendardialog();




=head1 DESCRIPTION

Curses::UI::Dialog::Calendar is a calendar dialog. 
This type of dialog can be used to select a date.

See exampes/demo-widgets in the distribution for a short demo.



=head1 OPTIONS

=over 4

=item * B<-title> < TEXT >

Set the title of the dialog window to TEXT.

=item * B<-date> < DATE >

Set the date to start with to DATE. If -date is 
not defined, today will be used as the startdate.

=back




=head1 METHODS

=over 4

=item * B<new> ( OPTIONS )

=item * B<layout> ( )

=item * B<draw> ( BOOLEAN )

=item * B<focus> ( )

=item * B<modalfocus> ( )

These are standard methods. See L<Curses::UI::Container|Curses::UI::Container> 
for an explanation of these.

=item * B<get> ( )

This method will return the date that was selected or
undef if no date was selected.

=back



=head1 SPECIAL BINDINGS

=over 4

=item * B<escape>

This will invoke the cancel button, so the calendar dialog
returns without selecting any date.

=back



=head1 SEE ALSO

L<Curses::UI|Curses::UI>, 
L<Curses::UI::Container|Curses::UI::Container>, 
L<Curses::UI::Buttonbox|Curses::UI::Buttonbox>




=head1 AUTHOR

Copyright (c) 2001-2002 Maurice Makaay. All rights reserved.

Maintained by Marcus Thiesen (marcus@cpan.thiesenweb.de)


This package is free software and is provided "as is" without express
or implied warranty. It may be used, redistributed and/or modified
under the same terms as perl itself.

