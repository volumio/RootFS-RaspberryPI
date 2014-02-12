# ----------------------------------------------------------------------
# Curses::UI::Dialog::Status
#
# (c) 2001-2002 by Maurice Makaay. All rights reserved.
# This file is part of Curses::UI. Curses::UI is free software.
# You can redistribute it and/or modify it under the same terms
# as perl itself.
#
# Currently maintained by Marcus Thiesen
# e-mail: marcus@cpan.thiesenweb.de
# ----------------------------------------------------------------------

package Curses::UI::Dialog::Status;

use strict;
use Curses;
use Curses::UI::Common;
use Curses::UI::Window;

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
        -message     => undef,   # The message to show
        -ipad        => 1,
        -border      => 1,
        -width       => undef,
        -height      => undef,
        -fg          => -1,
        -bg          => -1,

        %userargs,

        -centered    => 1,
    );

    my $this = $class->SUPER::new(%args);
    $args{-message} = 'no message' unless defined $args{-message};

    my $l = $this->add(
        'label', 'Label',
        -text  => $this->{-message},
        -fg    => $this->{-fg},
        -bg    => $this->{-bg},
    );

    $this->layout();

    bless $this, $class;
}

# There is no need to focus a status dialog
sub focus() {} ;

sub layout()
{
    my $this = shift;

    my $label = $this->getobj('label');

    # The label might not be added at this point.
    if (defined $label)
    {
        # Compute the width the dialog window needs.
        if (not defined $this->{-width})
        {
            $this->{-width} = $this->width_by_windowscrwidth(
                $label->{-width} + 1, # +1 for visible cursor 
                %$this
            );
        }

        # Compute the height the dialog window needs.
        if (not defined $this->{-height})
        {
            $this->{-height} = $this->height_by_windowscrheight(
                $label->{-height}, 
                %$this
            );
        }

    }

    $this->SUPER::layout or return;

    return $this;
}
    
sub message($;)
{
    my $this = shift;
    my $message = shift;
    $message = 'no message' unless defined $message;
    $this->getobj('label')->text($message);
    return $this;
}

1;


=pod

=head1 NAME

Curses::UI::Dialog::Status - Create and manipulate status dialogs 

=head1 CLASS HIERARCHY

 Curses::UI::Widget
    |
    +----Curses::UI::Container
            |
            +----Curses::UI::Window
                    |
                    +----Curses::UI::Dialog::Status


=head1 SYNOPSIS

    use Curses::UI;
    my $cui = new Curses::UI;
    my $win = $cui->add('window_id', 'Window');

    # The hard way.
    # -------------
    my $dialog = $win->add(
        'mydialog', 'Dialog::Status',
    -message   => 'Hello, world!',
    );

    $dialog->draw();

    $win->delete('mydialog');

    # The easy way (see Curses::UI documentation).
    # --------------------------------------------
    $cui->status( -message => 'Some message' );

    # or even:
    $cui->status( 'Some message' );

    $cui->nostatus;




=head1 DESCRIPTION

Curses::UI::Dialog::Status is not really a dialog, since
the user has no way of interacting with it. It is merely
a way of presenting status information to the user of 
your program.


See exampes/demo-Curses::UI::Dialog::Status in the 
distribution for a short demo.



=head1 OPTIONS

=over 4

=item * B<-title> < TEXT >

Set the title of the dialog window to TEXT.

=item * B<-message> < TEXT >

This option sets the initial message to show to TEXT.

=back




=head1 METHODS

=over 4

=item * B<new> ( OPTIONS )

=item * B<layout> ( )

=item * B<draw> ( BOOLEAN )

These are standard methods. See L<Curses::UI::Container|Curses::UI::Container> 
for an explanation of these.

=item * B<message> ( TEXT )

This method will update the message of the status dialog 
to TEXT. For this update to show, you will have to call the
B<draw> method of the progress dialog.

=back




=head1 SEE ALSO

L<Curses::UI|Curses::UI>, 
L<Curses::UI::Container|Curses::UI::Container>




=head1 AUTHOR

Copyright (c) 2001-2002 Maurice Makaay. All rights reserved.

Maintained by Marcus Thiesen (marcus@cpan.thiesenweb.de)


This package is free software and is provided "as is" without express
or implied warranty. It may be used, redistributed and/or modified
under the same terms as perl itself.

