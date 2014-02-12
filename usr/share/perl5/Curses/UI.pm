package Curses::UI;
use base qw(Curses::UI::Common Curses::UI::Container);

# If we do not know a terminal type, then imply VT100.
BEGIN { $ENV{TERM} = 'vt100' unless defined $ENV{TERM} }

use strict;
use warnings;

use Curses;
use Curses::UI::Language;
use Curses::UI::Color;
use FileHandle;
use Term::ReadKey;

=head1 NAME

Curses::UI - A curses based OO user interface framework

=head1 VERSION

Version 0.9609

=cut

use vars qw( $VERSION );
$VERSION = 0.9609;

=head1 SYNOPSIS

    use Curses::UI;

    # create a new C::UI object
    my $cui = Curses::UI->new( -clear_on_exit => 1,
                               -debug => $debug, );

    # this is where we gloss over setting up all the widgets and data
    # structures :)

    # start the event loop
    $cui->mainloop;


=head1 DESCRIPTION

Curses::UI is an object-oriented user interface framework for Perl.

It contains basic widgets (like buttons and text areas), more
"advanced" widgets (like UI tabs and a fully-functional basic text
editor), and some higher-level classes like pre-fab error dialogues.

See L<Curses::UI::Tutorial> and the C<examples> directory of the
source distribution for more introductory material.

=cut

$Curses::UI::debug            = 0;
$Curses::UI::screen_too_small = 0;
$Curses::UI::initialized      = 0;
$Curses::UI::color_support    = 0;
$Curses::UI::color_object     = 0;
$Curses::UI::ncurses_mouse    = 0;
$Curses::UI::gpm_mouse        = 0;

# Detect if we should use the new moushandler
if ($ENV{"TERM"} ne "xterm") {
    eval { require Curses::UI::Mousehandler::GPM;
	   import Curses::UI::Mousehandler::GPM; };
    if (!$@) {
	$Curses::UI::gpm_mouse = gpm_enable();
	print STDERR "DEBUG: gpm_mouse: " . $Curses::UI::gpm_mouse . "\n"
	    if $Curses::UI::debug;
    }
} else {
    # Detect ncurses functionality. Magic for Solaris 8
    eval { $Curses::UI::ncurses_mouse = (Curses->can('NCURSES_MOUSE_VERSION')
					 &&
					 (NCURSES_MOUSE_VERSION() >= 1 ) ) };
    print STDERR "DEBUG: Detected mouse support $Curses::UI::ncurses_mouse\n"
      if $Curses::UI::debug;
}



=head1 CONSTRUCTOR

Create a new Curses::UI object:

    my $cui = Curses::UI->new( OPTIONS );

where C<OPTIONS> is one or more of the following.

=head2 -clear_on_exit

If true, Curses::UI will call C<clear> on exit. Defaults to false.

=head2 -color_support

If true, Curses::UI tries to enable color for the
application. Defaults to false.

=head2 -compat

If true, Curses::UI will run in compatibility mode, meaning that only
very simple characters will be used for creating the widgets. Defaults
to false.

=head2 -keydelay

If set to a positive integer, Curses::UI will track elapsed seconds
since the user's last keystroke, preventing timer events from
occurring for the specified number of seconds afterwards. By default
this option is set to '0' (disabled).

=head2 -mouse_support

Curses::UI attempts to auto-discover if mouse support should be
enabled or not. This option allows a hard override. Expects a boolean
value.

=head2 -userdata

Takes a scalar (frequently a hashref) as its argument, and stows that
scalar inside the Curses::UI object where it can be retrieved with the
L<#userdata> method. Handy inside callbacks and the like.

=head2 -default_colors

Directs the underlying Curses library to allow use of default color
pairs on terminals. Is preset to true and you almost certainly don't
want to twiddle it. See C<man use_default_colors> if you think you do.

=cut

sub new {
    my ($class,%userargs) = @_;

    fatalerror("Curses::UI->new can only be called once!")
      if $Curses::UI::initialized;

    &Curses::UI::Common::keys_to_lowercase(\%userargs);

    my %args = (
        -compat        => 0,     # Use compatibility mode?
        -clear_on_exit => 0,     # Clear screen if program exits?
        -cursor_mode   => 0,     # What is the current cursor_mode?
	-debug         => undef, # Turn on debugging mode?
	-keydelay      => 0,     # Track seconds since last keystroke?
	-language      => undef, # Which language to use?
	-mouse_support => 1,     # Do we want mouse support
	-overlapping   => 1,     # Whether overlapping widgets are supported
	-color_support => 0,
	-default_colors=> 1,
        #user data
        -userdata       => undef,    #user internal data
	%userargs,
	-read_timeout   => -1,    # full blocking read by default
	-scheduled_code => [],
	-added_code     => {},
        -lastkey        => 0,     # Last keypress time (set in mainloop)
    );

    $Curses::UI::debug = $args{-debug}
        if defined $args{-debug};

    $Curses::UI::ncurses_mouse = $args{-mouse_support}
        if defined $args{-mouse_support};

    if ($Curses::UI::gpm_mouse && $args{-mouse_support}) {
	$Curses::UI::ncurses_mouse = 1;
	$args{-read_timeout} = 0.25;
    } else {
	$Curses::UI::gpm_mouse = 0;
    }

    my $self = bless { %args }, $class;

    my $lang = new Curses::UI::Language($self->{-language});
    $self->lang($lang);
    print STDERR "DEBUG: Loaded language: $lang->{-lang}\n"
	if $Curses::UI::debug;

    # Color support
    $Curses::UI::color_support = $args{-color_support} if
	defined $args{-color_support};

    $self->layout();

    return $self;
}

DESTROY {
    my $self = shift;
    my $scr = $self->{-canvasscr};
    $scr->delwin() if (defined($scr));
    endwin();
    $Curses::UI::initialized = 0;

    if ($self->{-clear_on_exit})
      {	Curses::erase(); Curses::clear() }
}



=head1 EVENT HANDLING METHODS

=head2 mainloop

The Curses::UI event handling loop. Call once setup is finished to
"start" a C::UI program.

=cut

sub mainloop {
    my ($self) = @_;

    # Draw the initial screen.
    $self->focus(undef, 1); # 1 = forced focus
    $self->draw;
    doupdate();

	$self->{mainloop}=1;

    # Inifinite event loop.
    while ($self->{mainloop}) { $self->do_one_event }
}

=head2 mainloopExit

This exits the main loop.

=cut

sub mainloopExit{
	my $self=$_[0];

	$self->{mainloop}=undef;
}

=head2 schedule_event

Pushes its argument (a coderef) onto the scheduled event stack

=cut

sub schedule_event {
    my ($self, $code) = @_;

    $self->fatalerror("schedule_event(): callback is no CODE reference")
      unless defined $code and ref $code eq 'CODE';

    push @{$self->{-scheduled_code}}, $code;
}



=head1 WINDOW/LAYOUT METHODS

=head2 layout

The layout method of Curses::UI tries to find the size of the screen
then calls the C<layout> method of every contained object (i.e. window
or widget). It is not normally necessary to call this method directly.

=cut

sub layout {
    my ($self) = @_;

    $Curses::UI::screen_too_small = 0;

    # find the terminal size.
    my ($cols,$lines) = GetTerminalSize;
    $ENV{COLS}  = $cols;
    $ENV{LINES} = $lines;

    if ($Curses::UI::initialized)
    {
        my $scr = $self->{-canvasscr};
        $scr->delwin() if (defined($scr));
        endwin();
    }
    # Initialize the curses screen.
    initscr();
    noecho();
    raw();

    # Colors
    if ($Curses::UI::color_support) {
	if ( has_colors() ) {
	    $Curses::UI::color_object = new Curses::UI::Color(-default_colors => $self->{-default_colors});
	} else {
	    $Curses::UI::color_support = 0;
	}
    }

    # Mouse events if possible
    my $old = 0;
    my $mmreturn;
    if ( $Curses::UI::ncurses_mouse )
    {
	print STDERR "DEBUG: ncurses mouse events are enabled\n"
	    if $Curses::UI::debug;
        # In case of gpm, mousemask fails. (MT: Not for me, maybe GPM changed?)
	eval { $mmreturn = mousemask( ALL_MOUSE_EVENTS(), $old ) };
	if ($Curses::UI::debug) {
	    print STDERR "DEBUG: mousemask returned $mmreturn\n";
	    print STDERR "DEBUG: Old is now $old\n";
	    print STDERR "DEBUG: mousemask() failed: $@\n" if $@;
	}
    }

    # Create root window.
    my $root = newwin($lines, $cols, 0, 0);
    die "newwin($lines, $cols, 0, 0) failed\n"
	unless defined $root;

    # Let this object present itself as a standard
    # Curses::UI widget, regarding size, location and
    # drawing area. This will make it possible for
    # child windows / widgets to layout and draw themselves.
    $self->{-width}  = $self->{-w} = $self->{-bw} = $cols;
    $self->{-height} = $self->{-h} = $self->{-bh} = $lines;
    $self->{-x}      = $self->{-y} = 0;
    $self->{-canvasscr} = $root;

    # Walk through all contained objects and let them
    # layout themselves.
    $self->layout_contained_objects;
    $self->draw();

    $Curses::UI::initialized = 1;
    return $self;
}

sub layout_new()
{
    my $self = shift;

    $Curses::UI::screen_too_small = 0;

    # find the terminal size.
    my ($cols,$lines) = GetTerminalSize;
    $ENV{COLS}  = $cols;
    $ENV{LINES} = $lines;

    # Let this object present itself as a standard 
    # Curses::UI widget, regarding size, location and
    # drawing area. This will make it possible for
    # child windows / widgets to layout and draw themselves.
    #
    $self->{-width}  = $self->{-w} = $self->{-bw} = $cols;
    $self->{-height} = $self->{-h} = $self->{-bh} = $lines;
    $self->{-x}      = $self->{-y} = 0;
#    $self->{-canvasscr} = $root;

    # Walk through all contained objects and let them
    # layout themselves.
    $self->layout_contained_objects;

    $Curses::UI::initialized = 1;
    $self->draw();
    return $self;
}


# ----------------------------------------------------------------------
# Event handling
# ----------------------------------------------------------------------


# TODO: document
sub do_one_event(;$)
{
    my $self = shift;
    my $object = shift;
    $object = $self unless defined $object;

    eval {curs_set($self->{-cursor_mode})};

    # gpm mouse?
    if ($Curses::UI::gpm_mouse) {
	$self->handle_gpm_mouse_event($object);
	doupdate();
    }

    # Read a key or use the feeded key.
    my $key = $self->{-feedkey};
    unless (defined $key) {
        $key = $self->get_key($self->{-read_timeout});
    }
    $self->{-feedkey} = undef;

    # If there was a keypress, set -lastkey
    $self->{-lastkey} = time() unless ($key eq '-1');

    # ncurses sends KEY_RESIZE() key on resize. Ignore this key.
    # TODO: Try to redraw and layout everything anew
    # KEY_RESIZE doesn't seem to work right;
    if (Curses->can("KEY_RESIZE")) {
      eval { $key = '-1' if $key eq KEY_RESIZE(); };
    }
    my ($cols,$lines) = GetTerminalSize;
    if ( ($ENV{COLS} != $cols) || ( $ENV{LINES} != $lines )) {
	$self->layout();
	$self->draw;
    }

    # ncurses sends KEY_MOUSE()
    if ($Curses::UI::ncurses_mouse) {
	if ($key eq KEY_MOUSE()) {
	    print STDERR "DEBUG: Got a KEY_MOUSE(), handeling it\n"
		if $Curses::UI::debug;
	    $self->handle_mouse_event($object);
	    doupdate();
	    return $self;
	}
    }

    # If the screen is too small, then <CTRL+C> will exit.
    # Else the next event loop will be started.
    if ($Curses::UI::screen_too_small) {
	exit(1) if $key eq "\cC";
	return $self;
    }

    # Delegate the keypress. This is not done to $self,
    # but to $object, so all events will go to the
    # object that called do_one_event(). This is used to
    # enable modal focusing.
    $object->event_keypress($key) unless $key eq '-1';

    # Execute timer code
    $self->do_timer;

    # Execute one scheduled event;
    if (@{$self->{-scheduled_code}}) {
	my $code = shift @{$self->{-scheduled_code}};
	$code->($self);
    }

    # Execute added code
    foreach my $key (keys %{$self->{-added_code}}) {
	my $code = $self->{-added_code}->{$key};
	$self->fatalerror("Method $key is not a coderef")
	  if (ref $code ne 'CODE');
	$code->($self);
    }


    # Update the screen.
    doupdate();

    return $self;
}

# TODO: document

# TODO: document
sub add_callback()
{
    my $self = shift;
    my $id   = shift;
    my $code = shift;

    $self->fatalerror(
        "add_callback(): is is not set"
    ) unless defined $id;

    $self->fatalerror(
        "add_callback(): callback is no CODE reference"
    ) unless defined $code and ref $code eq 'CODE';

    $self->{-added_code}->{$id} = $code;
}

# TODO: document
sub delete_callback()
{
    my $self = shift;
    my $id   = shift;

    $self->fatalerror(
      "delete_callback(): id is not set"
    ) unless defined $id;

    delete $self->{-added_code}->{$id} if
	defined $self->{-added_code}->{$id};
}

sub draw()
{
    my $self = shift;
    my $no_doupdate = shift || 0;

    if ($Curses::UI::screen_too_small)
    {
        my $s = $self->{-canvasscr};
        $s->clear;
        $s->addstr(0, 0, $self->lang->get('screen_too_small'));
        $s->move(4,0);
        $s->noutrefresh();
	doupdate();
    } else {
	$self->SUPER::draw(1);
	doupdate() unless $no_doupdate;
    }
}

# TODO: document
sub feedkey()
{
    my $self = shift;
    my $key = shift;
    $self->{-feedkey} = $key;
    return $self;
}

# TODO: document
sub flushkeys()
{
    my $self = shift;

    my $key = '';
    my @k = ();
    until ( $key eq "-1" ) {
        $key = $self->get_key(0);
    }
}

# Returns 0 if less than -keydelay seconds have elapsed since the last
# user action. Returns the number of elapsed seconds otherwise.
sub keydelay()
{
    my $self = shift;

    my $time = time();
    my $elapsed = $time - $self->{-lastkey};

    return 0 if ($elapsed < $self->{-keydelay});
    return $elapsed;
}

# ----------------------------------------------------------------------
# Timed event handling
# ----------------------------------------------------------------------

sub set_read_timeout()
{
    my $self = shift;

    my $new_timeout = -1;
    TIMER: while (my ($id, $config) = each %{$self->{-timers}})
    {
        # Skip timer if it is disabled.
        next TIMER unless $config->{-enabled};

	$new_timeout = $config->{-time} 
	    unless $new_timeout != -1 and
	           $new_timeout < $config->{-time};
    }
    $new_timeout = 1 if $new_timeout < 0 and $new_timeout != -1;

    $self->{-read_timeout} = $new_timeout;
    return $self;
}

sub set_timer($$;)
{
    my $self     = shift;
    my $id       = shift;
    my $callback = shift;
    my $time     = shift || 1;

    $self->fatalerror(
        "add_timer(): callback is no CODE reference"
    ) unless defined $callback and ref $callback eq 'CODE';

    $self->fatalerror(
	"add_timer(): id is not set"
    ) unless defined $id;

    my $config = {
        -time     => $time,
        -callback => $callback,
        -enabled  => 1,
        -lastrun  => time(),
    };
    $self->{-timers}->{$id} = $config;

    $self->set_read_timeout;

    return $self;
}

sub disable_timer($;)
{
    my ($self,$id) = @_;
    if (defined $self->{-timers}->{$id}) {
        $self->{-timers}->{$id}->{-enabled} = 0;
    }
    $self->set_read_timeout;
    return $self;
}

sub enable_timer($;)
{
    my ($self,$id) = @_;
    if (defined $self->{-timers}->{$id}) {
        $self->{-timers}->{$id}->{-enabled} = 1;
    }
    $self->set_read_timeout;
    return $self;
}

sub delete_timer($;)
{
    my ($self,$id) = @_;
    if (defined $self->{-timers}->{$id}) {
        delete $self->{-timers}->{$id};
    }
    $self->set_read_timeout;
    return $self;
}

sub do_timer()
{
    my $self = shift;

    my $now = time();
    my $timers_done = 0;

    # Short-circuit timers if the keydelay hasn't elapsed
    if ($self->{-keydelay}) {
        return $self unless $self->keydelay;
    }

    TIMER: while (my ($id, $config) = each %{$self->{-timers}}) 
    {
        # Skip timer if it is disabled.
        next TIMER unless $config->{-enabled};

        # No -lastrun set? Then do it now.
        unless (defined $config->{-lastrun})
        {
            $config->{-lastrun} = $now; 
            next TIMER;
        }

        if ($config->{-lastrun} <= ($now - $config->{-time})) 
        {
            $config->{-callback}->($self);
            $config->{-lastrun} = $now;
            $timers_done++;
        }
    }

    # Bring the cursor back to the focused object by
    # redrawing it. Due to drawing other objects, it might
    # have moved to another widget or screen location.
    #
    $self->focus_path(-1)->draw if $timers_done;

    return $self;
}

# ----------------------------------------------------------------------
# Mouse events
# ----------------------------------------------------------------------

sub handle_mouse_event()
{
    my $self = shift;
    my $object = shift;
    $object = $self unless defined $object;

    my $MEVENT = 0;
    getmouse($MEVENT);

    # $MEVENT is a struct. From curses.h (note: this might change!):
    #
    # typedef struct
    # {
    #    short id;           /* ID to distinguish multiple devices */
    #	 int x, y, z;        /* event coordinates (character-cell) */
    #	 mmask_t bstate;     /* button state bits */
    # } MEVENT;
    #
    # ---------------
    # s signed short
    # x null byte
    # x null byte
    # ---------------
    # i integer
    # ---------------
    # i integer
    # ---------------
    # i integer
    # ---------------
    # l long
    # ---------------

    my ($id, $x, $y, $z, $bstate) = unpack("sx2i3l", $MEVENT);
    my %MEVENT = (
	-id     => $id,
	-x      => $x,
	-y      => $y,
        -bstate => $bstate,
    );

    # Get the objects at the mouse event position.
    my $tree = $self->object_at_xy($object, $MEVENT{-x}, $MEVENT{-y});

    # Walk through the object tree, top object first.
    foreach my $object (reverse @$tree)
    {
	# Send the mouse-event to the object. 
	# Leave the loop if the object handled the event.
	print STDERR "Asking $object to handle $MEVENT{-bstate} ...\n" if
	    $Curses::UI::debug;
	my $return = $object->event_mouse(\%MEVENT);
	last if defined $return and $return ne 'DELEGATE';
    }
}

sub handle_gpm_mouse_event()
{
    my $self = shift;
    my $object = shift;
    $object = $self unless defined $object;

    return unless $Curses::UI::gpm_mouse;

    my $MEVENT = gpm_get_mouse_event();
    # $MEVENT from C:UI:MH:GPM is identical.

    return unless $MEVENT;

    my ($id, $x, $y, $z, $bstate) = unpack("sx2i3l", $MEVENT);
    my %MEVENT = (
	-id     => $id,
	-x      => $x,
	-y      => $y,
	-bstate => $bstate,
    );

    # Get the objects at the mouse event position.
    my $tree = $self->object_at_xy($object, $MEVENT{-x}, $MEVENT{-y});

    # Walk through the object tree, top object first.
    foreach my $object (reverse @$tree)
    {
	# Send the mouse-event to the object. 
	# Leave the loop if the object handled the event.

	my $return = $object->event_mouse(\%MEVENT);
	last if defined $return and $return ne 'DELEGATE';
    }
}


sub object_at_xy($$;$)
{
    my $self = shift;
    my $object = shift;
    my $x = shift;
    my $y = shift;
    my $tree = shift;
    $tree = [] unless defined $tree;

    push @$tree, $object;

    my $idx = -1;
    while (defined $object->{-draworder}->[$idx])
    {
        my $testobj = $object->getobj($object->{-draworder}->[$idx]);
        $idx--;

        # Find the window parameters for the $testobj.
        my $scr = defined $testobj->{-borderscr} ? '-borderscr' : '-canvasscr';
        my $winp = $testobj->windowparameters($scr);

        # Does the click fall inside this object?
        if ( $x >= $winp->{-x} and
             $x <  ($winp->{-x}+$winp->{-w}) and
             $y >= $winp->{-y} and
             $y <  ($winp->{-y}+$winp->{-h}) ) {

            if ( $testobj->isa('Curses::UI::Container') and
                 not $testobj->isa('Curses::UI::ContainerWidget')) {
                $self->object_at_xy($testobj, $x, $y, $tree)
            } else {
                push @$tree, $testobj;
            }
            return $tree;
        }
    }

    return $tree;
}


# ----------------------------------------------------------------------
# Other subroutines
# ----------------------------------------------------------------------

# TODO: document
sub fatalerror($$;$)
{
    my $self  = shift;
    my $error = shift;
    my $exit  = shift;

    $exit = 1 unless defined $exit;
    chomp $error;
    $error .= "\n";

    my $s = $self->{-canvasscr};
    $s->clear;
    $s->addstr(0,0,"Fatal program error:\n"
    	     . "-"x($ENV{COLS}-1) . "\n"
    	     . $error 
    	     . "-"x($ENV{COLS}-1) . "\n"
    	     . "Press any key to exit...");
    $s->noutrefresh();
    doupdate();

    $self->flushkeys();
    for (;;)
    {
	my $key = $self->get_key();
	last if $key ne "-1";
    }

    exit($exit);
}

sub usemodule($;)
{
    my $self = shift;
    my $class = shift;

    # Create class filename.
    my $file = $class;
    $file =~ s|::|/|g;
    $file .= '.pm';

    # Automatically load the required class.
    if (not defined $INC{$file})
    {
        eval
	{
            require $file;
            $class->import;
        };

        # Fatal error if the class could not be loaded.
	$self->fatalerror("Could not load $class from $file:\n$@")
	    if $@;
    }

    return $self;
}

sub focus_path()
{
    my $self = shift;
    my $index = shift;

    my $p_obj = $self;
    my @path = ($p_obj);
    for(;;)
    {
        my $p_el = $p_obj->{-draworder}->[-1];
        last unless defined $p_el;
        $p_obj = $p_obj->{-id2object}->{$p_el};
        push @path, $p_obj;
        last if $p_obj->isa('Curses::UI::ContainerWidget');
    }

    return (defined $index ? $path[$index] : @path);
}

# add() is overridden, because we only want to be able
# to add Curses::UI:Window objects to the Curses::UI
# rootlevel.
#
sub add()
{
    my $self = shift;
    my $id = shift;
    my $class = shift;
    my %args = @_;

    # Make it possible to specify WidgetType instead of
    # Curses::UI::WidgetType.
    $class = "Curses::UI::$class"
        if $class !~ /\:\:/ or
           $class =~ /^Dialog\:\:[^\:]+$/;

    $self->usemodule($class);

    $self->fatalerror(
	    "You may only add Curses::UI::Window objects to "
          . "Curses::UI and no $class objects"
    ) unless $class->isa('Curses::UI::Window');

    $self->SUPER::add($id, $class, %args);
}

# Sets/Get the user data
sub userdata
{
    my $self = shift;
    if (defined $_[0])
    {
        $self->{-userdata} = $_[0];
    }
    return $self->{-userdata};
}

# ----------------------------------------------------------------------
# Focusable dialog windows
# ----------------------------------------------------------------------

sub tempdialog()
{
    my $self = shift;
    my $class = shift;
    my %args = @_;

    my $id = "__window_$class";

    my $dialog = $self->add($id, $class, %args);
    $dialog->modalfocus;
    my $return = $dialog->get;
    $self->delete($id);
    $self->root->focus(undef, 1);
    return $return;
}

# The argument list will be returned unchanged, unless it
# contains only one item. In that case ($ifone, $_[0]) will
# be returned. This enables constructions like:
#
#    $cui->dialog("Some dialog message");
#
# instead of:
#
#    $cui->dialog(-message => "Some dialog message");
#
sub process_args()
{
    my $self = shift;
    my $ifone = shift;
    if (@_ == 1) { @_ = ($ifone => $_[0]) }
    return @_;
}

sub error()
{
    my $self = shift;
    my %args = $self->process_args('-message', @_);
    $self->tempdialog('Dialog::Error', %args);
}

sub dialog()
{
    my $self = shift;
    my %args = $self->process_args('-message', @_);
    $self->tempdialog('Dialog::Basic', %args);
}

sub question()
{
    my $self = shift;
    my %args = $self->process_args('-question', @_);
    $self->tempdialog('Dialog::Question', %args);
}

sub calendardialog()
{
    my $self = shift;
    my %args = $self->process_args('-title', @_);
    $self->tempdialog('Dialog::Calendar', %args);
}

sub filebrowser()
{
    my $self = shift;
    my %args = $self->process_args('-title', @_);

    # Create title
    unless (defined $args{-title}) {
	my $l = $self->root->lang;
	$args{-title} = $l->get('file_title');
    }

    # Select a file to load from.
    $self->tempdialog('Dialog::Filebrowser', %args);
}

sub dirbrowser()
{
    my $self = shift;
    my %args = $self->process_args('-title', @_);

    # Create title
    unless (defined $args{-title}) {
	my $l = $self->root->lang;
	$args{-title} = $l->get('dir_title');
    }

    # Select a file to load from.
    $self->tempdialog('Dialog::Dirbrowser', %args);
}

sub savefilebrowser()
{
    my $self = shift;
    my %args = $self->process_args('-title', @_);

    my $l = $self->root->lang;

    # Create title.
    $args{-title} = $l->get('file_savetitle')
	unless defined $args{-title};

    # Select a file to save to.
    my $file = $self->filebrowser(-editfilename => 1, %args);
    return unless defined $file;

    # Check if the file exists. Ask for overwrite
    # permission if it does.
    if (-e $file)
    {
	# Get language specific data.
	my $pre = $l->get('file_overwrite_question_pre');
	my $post = $l->get('file_overwrite_question_post');
	my $title = $l->get('file_overwrite_title');

        my $overwrite = $self->dialog(
            -title     => $title,
            -buttons   => [ 'yes', 'no' ],
            -message   => $pre . $file . $post,
        );
        return unless $overwrite;
    }

    return $file;
}

sub loadfilebrowser()
{
    my $self = shift;
    my %args = $self->process_args('-title', @_);

    # Create title
    unless (defined $args{-title}) {
	my $l = $self->root->lang;
	$args{-title} = $l->get('file_loadtitle');
    }

    $self->filebrowser(-editfilename  => 0, %args);
}

# ----------------------------------------------------------------------
# Non-focusable dialogs
# ----------------------------------------------------------------------

my $status_id = "__status_dialog";
sub status($;)
{
    my $self = shift;
    my %args = $self->process_args('-message', @_);

    $self->delete($status_id);
    $self->add($status_id, 'Dialog::Status', %args)->draw;

    return $self;
}

sub nostatus()
{
    my $self = shift;
    $self->delete($status_id);
    $self->flushkeys();
    $self->draw;
    return $self;
}

sub progress()
{
    my $self = shift;
    my %args = @_;

    $self->add(
        "__progress_$self",
        'Dialog::Progress',
        %args
    );
    $self->draw;

    return $self;
}

sub setprogress($;$)
{
    my $self = shift;
    my $pos  = shift;
    my $message = shift;

    # If I do not do this, the progress bar seems frozen
    # if a key is pressed on my Solaris machine. Flushing
    # the input keys solves this. And this is not a bad
    # thing to do during a progress dialog (input is ignored
    # this way).
    $self->flushkeys;

    my $p = $self->getobj("__progress_$self");
    return unless defined $p;
    $p->pos($pos) if defined $pos;
    $p->message($message) if defined $message;
    $p->draw;

    return $self;
}

sub noprogress()
{
    my $self = shift;
    $self->delete("__progress_$self");
    $self->flushkeys;
    $self->draw;
    return $self;
}

sub leave_curses()
{
    my $self = shift;
    def_prog_mode();
    endwin();
}

sub reset_curses()
{
    my $self = shift;
    reset_prog_mode();
    $self->layout(); # In case the terminal has been resized
}

### Color support

sub color() {
    my $self = shift;
    return $Curses::UI::color_object;
}

sub set_color {
    my $self = shift;
    my $co   = shift;

    $Curses::UI::color_object = $co;
}



# ----------------------------------------------------------------------
# Accessor functions
# ----------------------------------------------------------------------

sub compat(;$)        { shift()->accessor('-compat',          shift()) }
sub clear_on_exit(;$) { shift()->accessor('-clear_on_exit',   shift()) }
sub cursor_mode(;$)   { shift()->accessor('-cursor_mode',     shift()) }
sub lang(;$)          { shift()->accessor('-language_object', shift()) }
sub overlapping(;$)   { shift()->accessor('-overlapping',     shift()) }

# TODO: document
sub debug(;$)
{
    my $self  = shift;
    my $value = shift;
    $Curses::UI::debug = $self->accessor('-debug', $value);
}






=head1 CONVENIENCE DIALOG METHODS

=head2 dialog

Use the C<dialog> method to show a dialog window. If you only provide
a single argument, this argument will be used as the message to
show. Example:

    $cui->dialog("Hello, world!");

If you want to have some more control over the dialog window, you will
have to provide more arguments (for an explanation of the arguments
that can be used, see L<Curses::UI::Dialog::Basic>.  Example:

    my $yes = $cui->dialog(
        -message => "Hello, world?",
        -buttons =3D> ['yes','no'],
        -values  => [1,0],
        -title   => 'Question',
    );

    if ($yes) {
        # whatever
    }


=head2 error

The C<error> method will create an error dialog. This is basically a
Curses::UI::Dialog::Basic, but it has an ASCII-art exclamation sign
drawn left to the message. For the rest it's just like
C<dialog>. Example:

    $cui->error("It's the end of the\n"
               ."world as we know it!");

=head2 filebrowser

Creates a file browser dialog. For an explanation of the arguments
that can be used, see L<Curses::UI::Dialog::Filebrowser>.  Example:

    my $file = $cui->filebrowser(
        -path => "/tmp",
        -show_hidden => 1,
    );

    # Filebrowser will return undef
    # if no file was selected.
    if (defined $file) {
        unless (open F, ">$file") {
            print F "Hello, world!\n";
            close F;
    } else {
        $cui->error(qq(Error on writing to "$file":\n$!));
    }

=head2 loadfilebrowser, savefilebrowser

These two methods will create file browser dialogs as well.  The
difference is that these will have the dialogs set up correctly for
loading and saving files. Moreover, the save dialog will check if the
selected file exists or not. If it does exist, it will show an
overwrite confirmation to check if the user really wants to overwrite
the selected file.

=head2 status, nostatus

Using these methods it's easy to provide status information for the
user of your program. The status dialog is a dialog with only a label
on it. The status dialog doesn't really get the focus. It's only used
to display some information. If you need more than one status, you can
call C<status> subsequently.  Any existing status dialog will be
cleaned up and a new one will be created.

If you are finished, you can delete the status dialog by calling the
C<nostatus> method. Example:

    $cui->status("Saying hello to the world...");
    # code for saying "Hello, world!"

    $cui->status("Saying goodbye to the world...");
    # code for saying "Goodbye, world!"

    $cui->nostatus;

=head2 progress, setprogress, noprogress

Using these methods it's easy to provide progress information to the
user. The progress dialog is a dialog with an optional label on it and
a progress bar. Similar to the status dialog, this dialog does not get
the focus.

Using the C<progress> method, a new progress dialog can be created.
This method takes the same arguments as the
L<Curses::IU::Dialog::Progress> class.

After that the progress can be set using C<setprogress>. This method
takes one or two arguments. The first argument is the current position
of the progressbar. The second argument is the message to show in the
label. If one of these arguments is undefined, the current value will
be kept.

If you are finished, you can delete the progress dialog by calling the
C<noprogress> method.

    $cui->progress(
        -max => 10,
        -message => "Counting 10 seconds...",
    );

    for my $second (0..10) {
        $cui->setprogress($second)
        sleep 1;
    }

    $cui->noprogress;

=cut



=head1 OTHER METHODS

=over 4

=item B<leave_curses> ( )

Temporarily leaves curses mode and recovers normal terminal mode.

=item B<reset_curses> ( )

Return to curses mode after B<leave_curses()>.

=item B<add> ( ID, CLASS, OPTIONS )

The B<add> method of Curses::UI is almost the same as the B<add>
method of Curses::UI::Container. The difference is that Curses::UI
will only accept classes that are (descendants) of the
Curses::UI::Window class. For the rest of the information see
L<Curses::UI::Container|Curses::UI::Container>.

=item B<add_callback> ( ID, CODE)

This method lets you add a callback into the mainloop permanently.
The code is executed after the input handler has run.

=item B<delete_callback> ( ID )

This method deletes the CODE specified by ID from the mainloop.

=item B<usemodule> ( CLASSNAME )

Loads the with CLASSNAME given module.

=item B<userdata> ( [ SCALAR ] )

This method will return the user internal data stored in the UI
object.  If a SCALAR parameter is specified it will also set the
current user data to it.

=item B<keydelay> ( )

This method is used internally to control timer events when the
B<-keydelay> option is set, but it can be called directly it to find
out if the required amount of time has passed since the user's last
action. B<keydelay>() will return 0 if insufficent time has passed,
and will return the number of elapsed seconds otherwise.

=item B<compat> ( [BOOLEAN] )

The B<-compat> option will be set to the BOOLEAN value, unless BOOLEAN
is omitted. The method returns the current value for B<-compat>.

=item B<clear_on_exit> ( [BOOLEAN] )

The B<-clear_on_exit> option will be set to the BOOLEAN value, unless
BOOLEAN is omitted. The method returns the current value for
B<-clear_on_exit>.

=item B<color> ( )

Returns the currently used Curses::UI::Color object

=item B<set_color> ( OBJECT )

Replaces the currently used Color object with another. This can be
used to fast change all colors in a Curses::UI application.

=back



=head1 SEE ALSO

=over

=item L<Curses>

=item L<Curses::UI::POE> (a POE eventsystem and mainloop for Curses::UI)

=item L<http://curses-ui.googlecode.com/> (SVN repo, info, and links)

=back


=head1 BUGS

Please report any bugs or feature requests to
C<bug-curses-ui@rt.cpan.org>, or through the web interface at
L<http://rt.cpan.org/NoAuth/ReportBug.html?Queue=Curses-UI>.  I will be
notified, and then you'll automatically be notified of progress on
your bug as I make changes.


=head1 AUTHOR

Shawn Boyette C<< <mdxi@cpan.org> >>

See the CREDITS file for additional information.

=head1 COPYRIGHT & LICENSE

Copyright 2001-2002 Maurice Makaay; 2003-2006 Marcus Thiesen; 2007,
2008 Shawn Boyette. All Rights Reserved.

This program is free software; you can redistribute it and/or modify
it under the same terms as Perl itself.

This package is free software and is provided "as is" without express
or implied warranty. It may be used, redistributed and/or modified
under the same terms as perl itself.

=cut


=head1 CLASS LISTING

=head2 Widgets

=over

=item L<Curses::UI::Buttonbox>

=item L<Curses::UI::Calendar>

=item L<Curses::UI::Checkbox>

=item L<Curses::UI::Label>

=item L<Curses::UI::Listbox>

=item L<Curses::UI::Menubar>

=item L<Curses::UI::MenuListbox> (used by Curses::UI::Menubar)

=item L<Curses::UI::Notebook>

=item L<Curses::UI::PasswordEntry>

=item L<Curses::UI::Popupmenu>

=item L<Curses::UI::Progressbar>

=item L<Curses::UI::Radiobuttonbox>

=item L<Curses::UI::SearchEntry> (used by Curses::UI::Searchable)

=item L<Curses::UI::TextEditor>

=item L<Curses::UI::TextEntry>

=item L<Curses::UI::TextViewer>

=item L<Curses::UI::Window>

=back

=head2 Dialogs

=over

=item L<Curses::UI::Dialog::Basic>

=item L<Curses::UI::Dialog::Error>

=item L<Curses::UI::Dialog::Filebrowser>

=item L<Curses::UI::Dialog::Status>

=back

=head2 Base and Support Classes

=over

=item L<Curses::UI::Widget>

=item L<Curses::UI::Container>

=item L<Curses::UI::Color>

=item L<Curses::UI::Common>

=item L<Curses::UI::Searchable>

=back

=cut

1; # end of Curses::UI
