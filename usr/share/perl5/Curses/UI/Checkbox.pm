package Curses::UI::Checkbox;

use strict;
use Curses;
use Curses::UI::Label;
use Curses::UI::Widget;
use Curses::UI::Common;

use vars qw( $VERSION @ISA );

@ISA = qw( Curses::UI::ContainerWidget );

=head1 NAME

Curses::UI::Checkbox - Create and manipulate checkbox widgets


=head1 VERSION

Version 1.11

=cut

$VERSION = '1.11';

=head1 CLASS HIERARCHY

 Curses::UI::Widget
    |
    +----Curses::UI::Container
            |
            +----Curses::UI::Checkbox


=head1 SYNOPSIS

    use Curses::UI;
    my $cui = new Curses::UI;
    my $win = $cui->add('window_id', 'Window');

    my $checkbox = $win->add(
        'mycheckbox', 'Checkbox',
        -label     => 'Say hello to the world',
        -checked   => 1,
    );

    $checkbox->focus();
    my $checked = $checkbox->get();


=head1 DESCRIPTION

Curses::UI::Checkbox provides a checkbox widget.

A checkbox is a control for a boolean value (an on/off toggle). It
consists of a box which will either be empty (indicating B<off> or
B<false>) or contain an C<X> (indicating B<on> or B<true>). Following
this is a text label which described the value being controlled.

    [X] This checkbox is on/true/checked/selected
    [ ] This checkbox is off/false/unchecked/deselected

See exampes/demo-Curses::UI::Checkbox in the distribution for a short
demo.

=cut

my %routines = ( 'loose-focus'   => \&loose_focus,
		 'uncheck'       => \&uncheck,
		 'check'         => \&check,
		 'toggle'        => \&toggle,
		 'mouse-button1' => \&mouse_button1,
	       );

my %bindings = ( KEY_ENTER() => 'loose-focus',
		 CUI_TAB()   => 'loose-focus',
		 KEY_BTAB()  => 'loose-focus',
		 CUI_SPACE() => 'toggle',
		 '0'         => 'uncheck',
		 'n'         => 'uncheck',
		 '1'         => 'check',
		 'y'         => 'check',
	       );

=head1 STANDARD OPTIONS

    -x  -y   -width    -height
    -pad     -padleft  -padright  -padtop  -padbottom
    -ipad    -ipadleft -ipadright -ipadtop -ipadbottom
    -title   -titlefullwidth      -titlereverse
    -onfocus -onblur
    -parent

See L<Curses::UI::Widget|Curses::UI::Widget> for an explanation of
these.


=head1 WIDGET-SPECIFIC OPTIONS

=head2 -label

Sets the initial label for the checkbox widget to the passed string or
value.

=head2 -checked

Takes a boolean argument. Determines if the widget's initial state is
checked or unchecked.  The default is false (unchecked).

=head2 -onchange

Expects a coderef and sets it as a callback for the widget. When the
checkbox's state is changed, the given code will be executed.

=cut

sub new () {
    my $class = shift;

    my %userargs = @_;
    keys_to_lowercase(\%userargs);

    my %args = ( -parent    => undef,    # the parent window
		 -width     => undef,    # the width of the checkbox
		 -x         => 0,        # the horizontal pos. rel. to parent
		 -y         => 0,        # the vertical pos. rel. to parent
		 -checked   => 0,        # checked or not?
		 -label     => '',       # the label text
		 -onchange  => undef,    # event handler
		 -bg        => -1,
		 -fg        => -1,
		 %userargs,
		 -bindings  => {%bindings},
		 -routines  => {%routines},

		 -focus     => 0,        # value init
		 -nocursor  => 0,        # this widget uses a cursor
	       );

    # The windowscr height should be 1.
    $args{-height} = height_by_windowscrheight(1, %args);

    # No width given? Then make the width the same size as the label +
    # checkbox.
    $args{-width} = width_by_windowscrwidth(4 + length($args{-label}),%args)
        unless defined $args{-width};

    my $this = $class->SUPER::new( %args );

    # Create the label on the widget.
    $this->add( 'label', 'Label',
		-text        => $this->{-label},
		-x           => 4,
		-y           => 0,
		-intellidraw => 0,
		-bg          => $this->{-bg},
		-fg          => $this->{-fg},
	      ) if $this->{-label};

    $this->layout;

    $this->set_mouse_binding('mouse-button1', BUTTON1_CLICKED())
      if ($Curses::UI::ncurses_mouse);

    return $this;
}


=head1 STANDARD METHODS

    layout draw    intellidraw
    focus  onFocus onBlur

See L<Curses::UI::Widget|Curses::UI::Widget> for an explanation of
these.

=cut

sub event_onblur() {
    my $this = shift;
    $this->SUPER::event_onblur;

    $this->{-focus} = 0;
    $this->draw();

    return $this;
}

sub layout() {
    my $this = shift;

    my $label = $this->getobj('label');
    if (defined $label) {
        my $lh = $label->{-height};
        $lh = 1 if $lh <= 0;
        $this->{-height} = $lh;
    }

    $this->SUPER::layout or return;
    return $this;
}

sub draw(;$) {
    my $this = shift;
    my $no_doupdate = shift || 0;

    # Draw the widget.
    $this->SUPER::draw(1) or return $this;

    # Draw the checkbox.
     if ($Curses::UI::color_support) {
	my $co = $Curses::UI::color_object;
	my $pair = $co->get_color_pair(
			     $this->{-fg},
			     $this->{-bg});
	$this->{-canvasscr}->attron(COLOR_PAIR($pair));
    }

    $this->{-canvasscr}->attron(A_BOLD) if $this->{-focus};    
    $this->{-canvasscr}->addstr(0, 0, '[ ]');
    $this->{-canvasscr}->addstr(0, 1, 'X') if $this->{-checked};
    $this->{-canvasscr}->attroff(A_BOLD) if $this->{-focus};    

    $this->{-canvasscr}->move(0,1);
    $this->{-canvasscr}->noutrefresh();
    doupdate() unless $no_doupdate;

    return $this;
}


=head1 WIDGET-SPECIFIC METHODS

=head2 get

Returns the current state of the checkbox (0 == unchecked, 1 ==
checked).

=cut

sub get() {
    my $this = shift;
    return $this->{-checked};
}

=head2 check

Sets the checkbox to "checked".

=cut

sub check() {
    my $this = shift;
    my $changed = ($this->{-checked} ? 0 : 1);
    $this->{-checked} = 1;
    if ($changed) {
        $this->run_event('-onchange');
        $this->schedule_draw(1);
    }
    return $this;
}

=head2 uncheck

Sets the checkbox to "unchecked".

=cut

sub uncheck() {
    my $this = shift;
    my $changed = ($this->{-checked} ? 1 : 0);
    $this->{-checked} = 0;
    if ($changed) {
        $this->run_event('-onchange');
        $this->schedule_draw(1);
    }
    return $this;
}

=head2 toggle

Flip-flops the checkbox to its "other" state. If the checkbox is
unchecked then it will become checked, and vice versa.

=cut

sub toggle() {
    my $this = shift;
    $this->{-checked} = ($this->{-checked} ? 0 : 1);
    $this->run_event('-onchange');
    $this->schedule_draw(1);
}

=head2 onChange

This method can be used to set the C<-onchange> event handler (see
above) after initialization of the checkbox. It expects a coderef as
its argument.

=cut

sub onChange(;$)  { shift()->set_event('-onchange',  shift()) }

sub mouse_button1($$$$;) {
    my $this  = shift;
    my $event = shift;
    my $x     = shift;
    my $y     = shift;

    $this->focus();
    $this->toggle();

    return $this;
}

=head1 DEFAULT BINDINGS

=over

=item C<[TAB]>, C<[ENTER}>

Call the 'loose-focus' routine, causing the widget to lose focus.

=item C<[SPACE]>

Call the L</toggle> method.

=item C<0>, C<n>

Call the L</uncheck> method.

=item C<1>, C<y>

Call the L</check> method.

=back


=head1 SEE ALSO

L<Curses::UI|Curses::UI>,
L<Curses::UI::Widget|Curses::UI::Widget>,
L<Curses::UI::Common|Curses::UI::Common>

=head1 AUTHOR

Shawn Boyette C<< <mdxi@cpan.org> >>

=head1 COPYRIGHT & LICENSE

Copyright 2001-2002 Maurice Makaay; 2003-2006 Marcus Thiesen; 2007
Shawn Boyette. All Rights Reserved.

This program is free software; you can redistribute it and/or modify
it under the same terms as Perl itself.

This package is free software and is provided "as is" without express
or implied warranty. It may be used, redistributed and/or modified
under the same terms as perl itself.

=cut

1; # end of Curses::UI::Checkbox
