# ----------------------------------------------------------------------
# Curses::UI::Dialog::Question
#
# (c) 2001-2002 by Luke Closs. All rights reserved.
# This file is part of Curses::UI. Curses::UI is free software.
# You can redistribute it and/or modify it under the same terms
# as perl itself.
# 
# This was mostly copied from Curses::UI::Dialog::Basic
#
# Currently maintained by Marcus Thiesen
# e-mail: marcus@cpan.thiesenweb.de
# ----------------------------------------------------------------------

package Curses::UI::Dialog::Question;

use strict;
use Curses qw(KEY_ENTER);
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

$VERSION = '1.00';

sub new ()
{
    my $class = shift;

    my %userargs = @_;
    keys_to_lowercase(\%userargs);

    my %args = (
        -border       => 1,
        -question     => '',        # The question to show
        -answer       => '',        # a default answer
        -ipad         => 1, 
	-fg           => -1,
        -bg           => -1,

        %userargs,

        -titleinverse => 1,
        -centered     => 1,
    );

    # Create a new object, but remember the current
    # screen_too_small setting. The width needed for the
    # buttons can only be computed in the second run
    # of focus() and we do not want the first run to
    # set screen_too_small to a true value because
    # of this.
    #
    my $remember = $Curses::UI::screen_too_small;
    my $this = $class->SUPER::new(%args);

    my $q = $this->add('question', 'TextViewer',
        -x => 1, -y => 0,
        -wrapping    => 1,
        -padbottom   => 0,
        -height      => 3,
        -text        => $this->{-question},
        -bg          => $this->{-bg},
        -fg          => $this->{-fg},
        -bbg         => $this->{-bg},
        -bfg         => $this->{-fg},
	-focusable   => 0,
    );    

    my $a = $this->add('answer', 'TextEntry',
               -x => 1, -y    => 3,
               -border => 1,
               -bg   => $this->{-bg},
               -fg   => $this->{-fg},
               -bbg  => $this->{-bg},
               -bfg  => $this->{-fg},
               -text => $this->{-answer});
    # Push the cursor to the end of the line.
    $a->{-pos} = 999;

    # Create a hash with arguments that may be passed to
    # the Buttonbox class.
    my %buttonargs = (
        -buttonalignment => 'right',
    );
    foreach my $arg (qw(-buttons -selected -buttonalignment)) {
        $buttonargs{$arg} = $this->{$arg} if exists $this->{$arg};
    }
    my $b = $this->add(
       'buttons', 'Buttonbox',
       -y => -1,
       -bg          => $this->{-bg},
       -fg          => $this->{-fg},
       -buttons     => [ 'ok', 'cancel' ],

       %buttonargs
    );

    # Let the window in which the buttons are loose focus
    # if a button is pressed, or if enter is hit in the answer box.
    my $pressed = sub {
        my $this = shift;
        my $parent = $this->parent;
        $parent->{-cancelled} = !$this->get;
        $parent->loose_focus();
    };
    $b->set_routine( 'press-button', $pressed );
    $a->set_binding( $pressed, KEY_ENTER());

    # Restore screen_too_small (see above) and
    # start the second layout pass.
    $Curses::UI::screen_too_small = $remember;
    $this->layout;

    # Set the initial focus to the answer box.
    $a->focus;

    return bless $this, $class;
}

# TODO delete_curses_windows
sub layout()
{
    my $this = shift;
    return $this if $Curses::UI::screen_too_small;

    # The maximum available space on the screen.
    my $avail_width = $ENV{COLS};
    my $avail_height = $ENV{LINES};

    # Compute the maximum available space for the message.

    $this->process_padding;

    my $avail_textwidth  = $avail_width;
    $avail_textwidth  -= 2; # border for the textviewer
    $avail_textwidth  -= 2 if $this->{-border};
    $avail_textwidth  -= $this->{-ipadleft} - $this->{-ipadright};

    my $avail_textheight = $avail_height;
    $avail_textheight -= 2; # border for the textviewer
    $avail_textheight -= 3; # for answer box
    $avail_textheight -= 2; # empty line and line of buttons
    $avail_textheight -= 2 if $this->{-border};
    $avail_textheight -= $this->{-ipadtop} - $this->{-ipadbottom};

    # Break up the message in separate lines if neccessary.
    my @lines = ();
    foreach (split (/\n/,  $this->{-question})) {
        push @lines, @{text_wrap($_, $avail_textwidth)};
    }

    # Compute the longest line in the message.
    my $longest_line = 0;
    foreach (@lines) {
        $longest_line = length($_)
            if (length($_) > $longest_line);
    }

    # Compute the width of the buttons (if the buttons
    # object is available. This is not the case just after
    # new() calls SUPER::new()).
    my $buttons = $this->getobj('buttons');
    my $button_width = 0;
    if (defined $buttons) {
        $button_width = $buttons->compute_buttonwidth;
    }

    # Decide what is the longest line.
    $longest_line = $button_width if $longest_line < $button_width;

    # Check if there is enough space to show the widget.
    if ($avail_textheight < 1 or $avail_textwidth < $longest_line) {
        $Curses::UI::screen_too_small = 1;
        return $this;
    }

    # Compute the size of the widget.

    my $w = $longest_line;
    $w += 2; # border of textviewer
    $w += 2; # extra width for preventing wrapping of text
    $w += 2 if $this->{-border};
    $w += $this->{-ipadleft} + $this->{-ipadright};

    my $h = @lines;
    $h += 2; # empty line + line of buttons
    $h += 3; # for textentry widget
    $h += 2; # border of textviewer
    $h += 2 if $this->{-border};
    $h += $this->{-ipadtop} + $this->{-ipadbottom};

    $this->{-width} = $w;
    $this->{-height} = $h;

    $this->SUPER::layout;

    return $this;
}

sub get()
{
    my $this = shift;
    return undef if $this->{-cancelled};
    $this->getobj('answer')->get;
}

1;



=head1 NAME

Curses::UI::Dialog::Question - Pose a simple question to the user


=head1 CLASS HIERARCHY

 Curses::UI::Widget
    |
    +----Curses::UI::Container
            |
            +----Curses::UI::Window
                    |
                    +----Curses::UI::Dialog::Question


=head1 SYNOPSIS

    use Curses::UI;
    my $cui = new Curses::UI;
    my $win = $cui->add('window_id', 'Window');

    # The hard way.
    # -------------
    my $dialog = $win->add(
        'mydialog', 'Dialog::Question',
        -question   => 'How super awesome are you?'
    );
    $dialog->modalfocus;
    $win->delete('mydialog');

    # The easy way (see Curses::UI documentation).
    # --------------------------------------------
    my $value = $cui->question(-question => 'How super awesome are you?');

    # or even
    my $awesomeness = $cui->question('How super awesome are you?');




=head1 DESCRIPTION

Curses::UI::Dialog::Question is a basic question dialog. This type of
dialog has a message on it, a TextEntry answer box, and one or more 
buttons. It can be used to have a user enter some answer in response
to a question.

See exampes/demo-widgets in the distribution for a short demo.



=head1 OPTIONS

=over 4

=item * B<-title> < TEXT >

Set the title of the dialog window to TEXT.

=item * B<-question> < TEXT >

This option sets the question to show to TEXT. The text may
contain newline (\n) characters.

=item * B<-buttons> < ARRAYREF >

=item * B<-selected> < INDEX >

=item * B<-buttonalignment> < VALUE >

These options sets the buttons that have to be used. For an
explanation of these options, see the
L<Curses::UI::Buttonbox|Curses::UI::Buttonbox> documentation.

=back




=head1 METHODS

=over 4

=item * B<new> ( HASH )

=item * B<layout> ( )

=item * B<draw> ( BOOLEAN )

=item * B<focus> ( )

These are standard methods. See L<Curses::UI::Container|Curses::UI::Container>
for an explanation of these.

=item * B<get> ( )

This method will call B<get> on the TextEntry object of the dialog
and return its returnvalue. See L<Curses::UI::TextEntry> for more 
information on this.  If the cancel button was pressed, the return 
value will be undef.

=back




=head1 SEE ALSO

L<Curses::UI|Curses::UI>,
L<Curses::UI::Container|Curses::UI::Container>,
L<Curses::UI::Buttonbox|Curses::UI::Buttonbox>




=head1 AUTHOR

Copyright (c) 2004 Luke Closs <lukec@activestate.com>. All rights reserved.

Maintained by Marcus Thiesen (marcus@cpan.thiesenweb.de)


This package is free software and is provided "as is" without express
or implied warranty. It may be used, redistributed and/or modified
under the same terms as perl itself.

