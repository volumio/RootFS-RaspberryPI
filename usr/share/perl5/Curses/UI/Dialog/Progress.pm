# ----------------------------------------------------------------------
# Curses::UI::Dialog::Progress
#
# (c) 2001-2002 by Maurice Makaay. All rights reserved.
# This file is part of Curses::UI. Curses::UI is free software.
# You can redistribute it and/or modify it under the same terms
# as perl itself.
#
# Currently maintained by Marcus Thiesen
# e-mail: marcus@cpan.thiesenweb.de
# ----------------------------------------------------------------------

package Curses::UI::Dialog::Progress;

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
        -nomessage       => 0,     # Do we want a message or not?
        -message         => '',    # The message to show
        -min             => undef, # Arguments for the progressbar
        -max             => undef, 
        -pos             => undef, 
        -nocenterline    => undef, 
        -nopercentage    => undef, 
        -ipad            => 1,     # Default widget settings
        -border          => 1,     
        -width           => 60,    
        -height          => undef, 

        -fg              => -1,
        -bg              => -1,

        %userargs,

        -centered        => 1,
    );

    my $this = $class->SUPER::new(%args);

    unless ($args{-nomessage})
    {
        $this->add(
            'label', 'Label',
            -width       => -1,
            -text        => $this->{-message},
            -intellidraw => 0,
	      
        );
    }

    # Create the progress bar arguments.
    my %pb_args = ();
    foreach my $var (qw(-min -max -pos -nopercentage -nocenterline))
    {
        if (defined $this->{$var}) {
            $pb_args{$var} = $this->{$var};
        }
    }

    $this->add(
        'progressbar', 'Progressbar',
        -y           => -1,
        -width       => -1,
 	-fg          => $this->{-fg},
  	-bg          => $this->{-bg},

        %pb_args,
        -intellidraw => 0,
    );

    $this->layout();

    bless $this, $class;
}

# There is no need to focus a progress dialog
sub focus() {} ; 

sub layout()
{
    my $this = shift;

    if (not defined $this->{-height} 
        and defined $this->getobj('progressbar'))
    {
        # Space between progressbar and message.
        my $need = ($this->{-nomessage} ? 0 : 1);

        # The height for the message.
        if (defined $this->getobj('label')) {
            $need += $this->getobj('label')->height;
        }
        
        # The height for the progressbar.
        if (defined $this->getobj('progressbar')) {
            my $pbheight = $this->getobj('progressbar')->height;
            $need += $pbheight;
        }


        my $height = $this->height_by_windowscrheight($need, %$this);
        $this->{-height} = $height;
    }

    $this->SUPER::layout or return;

    return $this;
}

sub pos($;)
{
    my $this = shift;
    my $pos = shift;
    $this->getobj('progressbar')->pos($pos);
    return $this;
}

sub message()
{
    my $this = shift;
    return $this if $this->{-nomessage};
    my $msg = shift;
    $this->getobj('label')->text($msg);
    return $this;
}

1;


=pod

=head1 NAME

Curses::UI::Dialog::Progress - Create and manipulate progress dialogs 

=head1 CLASS HIERARCHY

 Curses::UI::Widget
    |
    +----Curses::UI::Container
            |
            +----Curses::UI::Window
                    |
                    +----Curses::UI::Dialog::Progress


=head1 SYNOPSIS

    use Curses::UI;
    my $cui = new Curses::UI;
    my $win = $cui->add('window_id', 'Window');

    # The hard way.
    # -------------
    my $dialog = $win->add(
        'mydialog', 'Dialog::Progress',
    -max       => 100,
        -message   => 'Some message',
    );

    $dialog->pos(10);
    $dialog->message('Some other message');
    $dialog->draw();

    $win->delete('mydialog');

    # The easy way (see Curses::UI documentation).
    # --------------------------------------------
    $cui->progress(
    -max       => 100,
        -message   => 'Some message',
    );
    $cui->setprogress(10, 'Some other message');
    $cui->noprogress;





=head1 DESCRIPTION

Curses::UI::Dialog::Progress is not really a dialog, since
the user has no way of interacting with it. It is merely
a way of presenting progress information to the user of 
your program.


See exampes/demo-Curses::UI::Dialog::Progress in the 
distribution for a short demo.



=head1 OPTIONS

=over 4

=item * B<-title> < TEXT >

Set the title of the dialog window to TEXT.

=item * B<-message> < TEXT >

This option sets the initial message to show to TEXT.
This message is displayed using a L<Curses::UI::Label|Curses::UI::Label>,
so it can not contain any newline (\n) characters.

=item * B<-nomessage> < BOOLEAN >

If BOOLEAN has a true value, the dialog window will not contain
a message label. By default B<-nomessage> has a false value. 

=item * B<-min> < VALUE >

=item * B<-max> < VALUE >

=item * B<-pos> < VALUE >

=item * B<-nopercentage> < BOOLEAN >

=item * B<-nocenterline> < BOOLEAN >

These options control the progressbar of the dialog. For an explanation
of these options, see L<Curses::UI::Progressbar|Curses::UI::Progressbar>.

=back




=head1 METHODS

=over 4

=item * B<new> ( OPTIONS )

=item * B<layout> ( )

=item * B<draw> ( BOOLEAN )

These are standard methods. See L<Curses::UI::Container|Curses::UI::Container> 
for an explanation of these.

=item * B<pos> ( VALUE )

This method will update the position of the progressbar
to SCALAR. You will have to call the B<draw> method to see the changes.

=item * B<message> ( TEXT )

This method will update the message of the progress dialog 
to TEXT. You will have to call the B<draw> method to see the changes.

=back




=head1 SEE ALSO

L<Curses::UI|Curses::UI>, 
L<Curses::UI::Container|Curses::UI::Container>, 
L<Curses::UI::Progressbar|Curses::UI::Progressbar>




=head1 AUTHOR

Copyright (c) 2001-2002 Maurice Makaay. All rights reserved.

Maintained by Marcus Thiesen (marcus@cpan.thiesenweb.de)


This package is free software and is provided "as is" without express
or implied warranty. It may be used, redistributed and/or modified
under the same terms as perl itself.

