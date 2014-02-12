# ----------------------------------------------------------------------
# Curses::UI::Notebook
#
# Written by George A. Theall, theall@tifaware.com
#
# Copyright (c) 2004, George A. Theall. All rights reserved.
#
# This module is free software; you can redistribute it and/or modify
# it under the same terms as Perl itself.
#
# $Id: Notebook.pm,v 1.2 2004/10/22 21:07:27 mthies2s Exp $
# ----------------------------------------------------------------------

package Curses::UI::Notebook;

use 5;
use strict;
use warnings;
use Curses;
use Curses::UI::Common;
use Curses::UI::Widget;

use vars qw(
    $VERSION
    @ISA
);
$VERSION = '1.0001';
@ISA = qw(
    Curses::UI::Container
);

my %routines = (
    'goto_first_page'   => sub { my $this = shift; $this->activate_page($this->first_page); },
    'goto_last_page'    => sub { my $this = shift; $this->activate_page($this->last_page); },
    'goto_next_page'    => sub { my $this = shift; $this->activate_page($this->next_page); },
    'goto_prev_page'    => sub { my $this = shift; $this->activate_page($this->prev_page); },
);
my %bindings = (
    KEY_HOME()          => 'goto_first_page',
    "\cA"               => 'goto_first_page',
    KEY_END()           => 'goto_last_page',
    "\cE"               => 'goto_last_page',
    KEY_NPAGE()         => 'goto_next_page',
    "\cN"               => 'goto_next_page',
    KEY_PPAGE()         => 'goto_prev_page',
    "\cP"               => 'goto_prev_page',
);


sub debug_msg(;$) {
    return unless ($Curses::UI::debug);

    my $caller = (caller(1))[3];
    my $msg = shift || '';
    my $indent = ($msg =~ /^(\s+)/ ? $1 : '');
    $msg =~ s/\n/\nDEBUG: $indent/mg;

    warn 'DEBUG: ' . 
        ($msg ?
            "$msg in $caller" : 
            "$caller() called by " . ((caller(2))[3] || 'main')
        ) .
        "().\n";
}


sub new($;) {
    debug_msg;
    my $class = shift;

    my %userargs = @_;
    keys_to_lowercase(\%userargs);
    # nb: support only arguments listed in @valid_args;
    my @valid_args = (
        'x', 'y', 'width', 'height',
        'pad', 'padleft', 'padright', 'padtop', 'padbottom',
        'ipad', 'ipadleft', 'ipadright', 'ipadtop', 'ipadbottom',
        'wraparound',
        'border', 'sbborder',
        'bg', 'fg',
        'intellidraw',
        'onchange', 'onblur',
        'routines', 'bindings',
        'parent',
    );
    foreach my $arg (keys %userargs) {
        unless (grep($arg eq "-$_", @valid_args)) {
            debug_msg "  deleting invalid arg '$arg'";
            delete $userargs{$arg};
        }
    }
    my %args = (
        -x              => 0,           # horizontal start position
        -y              => 0,           # vertical start position
        -width          => undef,       # width
        -height         => undef,       # height (nb: including tabs)

        -ipadleft       => 1,           # left padding
        -ipadright      => 1,           # right padding

        -wraparound     => 1,           # enable wraparound when changing pages?

        -border         => 1,           # border around tabs / active window

	-bg             => -1,          # default background color
        -fg             => -1,          # default foreground color

        -intellidraw    => 1,

        -routines       => {%routines},
        -bindings       => {%bindings},

        %userargs,
    );
    foreach (sort keys %args) {
        debug_msg "    \$args{$_} = " . (defined $args{$_} ? $args{$_} : 'n/a');
    }

    # nb: some type of border is currently needed for tab labels.
    return unless ($args{-border} or $args{-sbborder});

    # Create the widget.
    debug_msg '  creating Notebook object';
    my $this = $class->SUPER::new(%args);
    if ($Curses::UI::ncurses_mouse) {
        $this->set_mouse_binding(\&mouse_button1, BUTTON1_CLICKED());
    }
    @{$this->{-pages}} = ();            # names of pages stored as an array.

    return $this;
}


sub layout($) {
    debug_msg;
    my $this = shift;

    # Don't wast time if we know the screen is too small.
    return if ($Curses::UI::screen_too_small);

    # Origin defaults to (0,0) relative to parent.
    #
    # nb: if origin is negative, treat it as an end-point and
    #     as relative to parent's end-point.
    $this->{-y} = 0 unless (defined $this->{-y});
    $this->{-x} = 0 unless (defined $this->{-x});

    # Expand -pad/-ipad args.
    $this->process_padding;

    # Make sure there's enough space for the widget.
    #
    # - get parent's data.
    $this->{-parentdata} = $this->{-parent}->windowparameters;
    my $ph = $this->{-parentdata}->{-h};
    my $pw = $this->{-parentdata}->{-w};
    # - calculate space available to the widget.
    my $avail_h = $ph - ($this->{-y} < 0 ? abs($this->{-y}+1) : $this->{-y});
    my $avail_w = $pw - ($this->{-x} < 0 ? abs($this->{-x}+1) : $this->{-x});
    debug_msg "  available height / width = $avail_h / $avail_w";
    # - size of widget defaults to available space.
    my $h = (defined $this->{-height} ? $this->{-height} : $avail_h);
    my $w = (defined $this->{-width}  ? $this->{-width}  : $avail_w);
    debug_msg "  size of widget = $h / $w";
    # - calculate required size given borders, padding, etc.
    my $req_h = ($this->{-border} ? 3 : 0) +
              ($this->{-sbborder} ? 3 : 0) +
              $this->{-padtop} +
              $this->{-padbottom};
    my $req_w = ($this->{-border} ? 2 : 0) +
              ($this->{-sbborder} ? 2 : 0) +
              $this->{-padleft} +
              $this->{-padright};
    debug_msg "  required size of widget = $req_h / $req_w";
    # - make sure widget fits given what's required and available.
    if (
        $h < $req_h or $h > $avail_h or
        $w < $req_w or $w > $avail_w
    ) {
        debug_msg "  screen is too small!";
        $Curses::UI::screen_too_small++;
        return $this;
    }

    # Update some widget parameters.
    #
    # - height and width.
    $this->{-h}  = $h;
    $this->{-w}  = $w;
    # - starting point.
    # nb: keep in mind if origin is negative, (x,y) is an end-point
    #     relative to parent's end-point.
    $this->{-realy} = $this->{-y} + ($this->{-y} >= 0 ? 0 : $ph - $h + 1);
    $this->{-realx} = $this->{-x} + ($this->{-x} >= 0 ? 0 : $pw - $w + 1);

    # Create widget border, if desired.
    if (
        $this->{-border} or
        $this->{-sbborder}
    ) {
        $this->{-bh} = $h - $this->{-padtop}  - $this->{-padbottom};
        $this->{-bw} = $w - $this->{-padleft} - $this->{-padright};
        $this->{-by} = $this->{-realy} + $this->{-padtop};
        $this->{-bx} = $this->{-realx} + $this->{-padleft};
        my @args = (
            $this->{-bh},
            $this->{-bw},
            $this->{-by},
            $this->{-bx},
        );
        debug_msg "  creating borderscr with args " . join(",", @args);
        unless (
            $this->{-borderscr} = $this->{-parent}->{-canvasscr}->derwin(@args)
        ) {
            debug_msg "  screen is too small for border widget!";
            $Curses::UI::screen_too_small++;
            return $this;
        }
    }

    # Create widget window itself.
    $this->{-sh}  = $this->{-bh} -
                  $this->{-ipadtop} -
                  $this->{-ipadbottom} -
                  ($this->{-border} ? 4 : 0) -
                  ($this->{-sbborder} ? 4 : 0);
    $this->{-sw}  = $this->{-bw} -
                  $this->{-ipadleft} -
                  $this->{-ipadright} -
                  ($this->{-border} ? 2 : 0) -
                  ($this->{-sbborder} ? 2 : 0);
    $this->{-sy}  = $this->{-by} +
                  $this->{-ipadtop} +
                  ($this->{-border} ? 3 : 0) +
                  ($this->{-sbborder} ? 3 : 0);
    $this->{-sx}  = $this->{-bx} +
                  $this->{-ipadleft} +
                  ($this->{-border} ? 1 : 0) +
                  ($this->{-sbborder} ? 1 : 0);
    my @args = (
        $this->{-sh},
        $this->{-sw},
        $this->{-sy},
        $this->{-sx},
    );
    debug_msg "  creating canvasscr with args " . join(",", @args);
    $this->{-canvasscr} = $this->{-parent}->{-canvasscr}->derwin(@args);
    unless (defined $this->{-canvasscr})
    {
        debug_msg "  screen is too small for window widget!";
        $Curses::UI::screen_too_small++;
        return $this;
    }

    unless (defined $this->{-borderscr}) {
        $this->{-bh} = $this->{-sh};
        $this->{-bw} = $this->{-sw};
        $this->{-by} = $this->{-sy};
        $this->{-bx} = $this->{-sx};
    }
    return $this;
}


sub draw($;$) {
    debug_msg;
    my $this = shift;
    my $no_doupdate = shift || 0;
    debug_msg "  \$no_doupdate = $no_doupdate";

    # Return immediately if this object is hidden or if
    # the screen is currently too small.
    return if $this->hidden;
    return if $Curses::UI::screen_too_small;

    # Identify various pages of interest.
    my $first_page = $this->first_page;
    my $next_page = $this->next_page;
    my $last_page = $this->last_page;
    my $active_page = $this->active_page;

    # Identify page window.
    my $page_win = $this->{-borderscr};

    # Hide cursor.
    eval { curs_set(0) }; # not available on every system.

    # Enable colors if desired.
    if ($Curses::UI::color_support) {
        debug_msg "  enabling color support";
        my $co = $Curses::UI::color_object;
        my $pair = $co->get_color_pair(
            $this->{-fg},
            $this->{-bg}
        );
        $page_win->attron(COLOR_PAIR($pair));
    }

    my $ch_hbar = $this->{-border} ? ACS_HLINE : '-';
    my $ch_vbar = $this->{-border} ? ACS_VLINE : '|';
    my $ch_tl   = $this->{-border} ? ACS_ULCORNER : '+';
    my $ch_tr   = $this->{-border} ? ACS_URCORNER : '+';
    my $ch_bl   = $this->{-border} ? ACS_LLCORNER : '+';
    my $ch_br   = $this->{-border} ? ACS_LRCORNER : '+';
    my $ch_ttee = $this->{-border} ? ACS_TTEE : '+';
    my $ch_btee = $this->{-border} ? ACS_BTEE : '+';
    my $ch_ltee = $this->{-border} ? ACS_LTEE : '+';
    my $ch_rtee = $this->{-border} ? ACS_RTEE : '+';

    # Draw tabs along with a border if desired.
    my($x, $y) = (0, 0);
    $y = 1 if ($this->{-border} or $this->{-sbborder});
    foreach my $page (@{$this->{-pages}}) {
        debug_msg "  drawing tab for page '$page'";

        if ($this->{-border} or $this->{-sbborder}) {
            debug_msg "    adding left border at x=$x";
            $page_win->addch(0, $x, ($page eq $first_page ? $ch_tl : $ch_ttee));
            $page_win->addch(1, $x, $ch_vbar);
            $page_win->addch(2, $x,
                ($page eq $first_page ?
                    ($page eq $active_page ?
                        $ch_vbar :
                        $ch_ltee
                    ) :
                    ($page eq $active_page ?
                        $ch_br :
                        ($page eq $next_page ?
                            $ch_bl :
                            $ch_btee
                        )
                    )
                )
            );
            ++$x;
        }

        debug_msg "    adding $this->{-ipadleft} space" . ($this->{-ipadright} == 1 ? "" : "s") . " of padding at x=$x";
        if ($this->{-border} or $this->{-sbborder}) {
            for (my $i = 0; $i < $this->{-ipadleft}; $i++) {
                $page_win->addch(0, $x, $ch_hbar);
                #
                $page_win->addch(2, $x, ($page eq $active_page ? ' ' : $ch_hbar));
                ++$x;
            }
        }
        else {
            $x += $this->{-ipadleft};
        }

        debug_msg "    writing page name at x=$x";
        $page_win->attron(A_REVERSE) if ($page eq $active_page);
        $page_win->addstr($y, $x, $page);
        $page_win->attroff(A_REVERSE) if ($page eq $active_page);
        if ($this->{-border} or $this->{-sbborder}) {
            for (my $i = 0; $i < length($page); $i++) {
                $page_win->addch(0, $x, $ch_hbar);
                #
                $page_win->addch(2, $x, ($page eq $active_page ? ' ' : $ch_hbar));
                ++$x;
            }
        }
        else {
            $x += length($page);
        }

        debug_msg "    adding $this->{-ipadright} space" . ($this->{-ipadright} == 1 ? "" : "s") . " of padding at x=$x";
        if ($this->{-border} or $this->{-sbborder}) {
            for (my $i = 0; $i < $this->{-ipadright}; $i++) {
                $page_win->addch(0, $x, $ch_hbar);
                #
                $page_win->addch(2, $x, ($page eq $active_page ? ' ' : $ch_hbar));
                ++$x;
            }
        }
        else {
            $x += $this->{-ipadright};
        }

        if (($this->{-border} or $this->{-sbborder}) and $page eq $last_page) {
            debug_msg "    adding right border at x=$x";
            $page_win->addch(0, $x, $ch_tr);
            $page_win->addch(1, $x, $ch_vbar);
            $page_win->addch(2, $x, ($page eq $active_page ? $ch_bl : $ch_btee));
            ++$x;
        }
    }
    if ($this->{-border} or $this->{-sbborder}) {
        do {
            $page_win->addch(2, $x, $ch_hbar);
        } while (++$x < $this->{-bw}-1);
        $page_win->addch(2, $x, $ch_tr);

        for ($y = 3; $y < $this->{-bh}-1; $y++) {
            $page_win->addch($y, $this->{-x}, $ch_vbar);
            $page_win->addch($y, $x, $ch_vbar);
        }

        $page_win->addch($y, $this->{-x}, $ch_bl);
        for ($x = $this->{-x}+1; $x < $this->{-bw}-1; $x++) {
            $page_win->addch($y, $x, $ch_hbar);
        }
        $page_win->addch($y, $x, $ch_br);
    }
    $page_win->noutrefresh;

    # Draw active window.
    $this->getobj($active_page)->draw($no_doupdate);

    doupdate unless ($no_doupdate);
    return $this;
}


# NB: we can't simply inherit intellidraw from Curses::UI::Widget 
#     since notebooks themselves contain window objects.
sub intellidraw(;$) {
    debug_msg;
    my $this = shift;

    if ($this->{-intellidraw} and !$this->hidden) {
        # Check if parent window has modal focus or is on top of focus path.
        my $parent = $this->parentwindow;
        debug_msg "  parent window = " . $parent;

        my @path = $this->root->focus_path;
        debug_msg "  focus_path " . join(" & ", @path);
        # Ignore anything above our object.
        while (grep($_ eq $this, @path)) {
            $_ = pop(@path);
            debug_msg "  skipping $_ to find ourselves";
        }
        # Now find next window.
        while (@path > 1 and !$path[-1]->isa('Curses::UI::Window')) {
            $_ = pop(@path);
            debug_msg "  skipping $_ to find previous window";
        }
        debug_msg "  next window = " . (@path ? $path[-1] : 'n/a');

        $this->draw if (
            $parent->{-has_modal_focus} or 
            (@path and $parent eq $path[-1])
        );
    }
    return $this;
}


sub add_page($$;) {
    debug_msg;
    my $this = shift;
    my $page = shift or return;
    debug_msg "  adding '$page' page";

    # Make sure page is not yet part of the notebook.
    $this->root->fatalerror("The notebook already has a page named '$page'!")
        if (defined $this->{-id2object}->{$page});

    # Make sure the page does not cause the 'tabs' window to overflow.
    my $len = 0;
    foreach my $page (@{$this->{-pages}}, $page) {
        $len += length($page) +
            ($this->{-ipadleft} || 0) + ($this->{-ipadright} || 0) +
            ($this->{-border} || 0) + ($this->{-sbborder} || 0);
    }
    ++$len;                             # nb: needed for final border char.
    debug_msg "  $len spaces are needed for tab labels";
    if ($len > $this->{-bw}) {
        debug_msg "  screen is too small - width is $this->{-bw}";
        $Curses::UI::screen_too_small++;
        return;
    };

    # Create a window for this page using same layout as widget's canvasscr.
    my %userargs = @_;
    keys_to_lowercase(\%userargs);

    # grab callback arguments
    foreach my $cbkey (qw/-on_activate -on_delete/) {
	$this->{callback}{$page}{$cbkey} = delete $userargs{$cbkey}
	  if defined $userargs{$cbkey};
    }

    $this->add(
        $page, 'Window',

        -padtop     => $this->{-padtop},
        -padbottom  => $this->{-padbottom},
        -padleft    => $this->{-padleft},
        -padright   => $this->{-padright},

        -ipadtop    => $this->{-ipadtop},
        -ipadbottom => $this->{-ipadbottom},
        -ipadleft   => $this->{-ipadleft},
        -ipadright  => $this->{-ipadright},

        -fg         => $this->{-fg},    # nb: no color support in
        -bg         => $this->{-bg},    #     Curses::UI::Window yet!

        %userargs,

        -height   => $this->{-sh},
        -width    => $this->{-sw},
        -y        => 0,                 # nb: x,y are relative to canvasscr!
        -x        => 0,
    );

    push(@{$this->{-pages}}, $page);
    if (@{$this->{-pages}} == 1) {
        $this->{-active_page} = $page;
    }
    else {
        # Adding the window object alters the draw- and focusorder so
        # we need to adjust them manually.
        my $active_page = $this->active_page;
        $this->set_draworder($active_page);
        $this->set_focusorder($active_page);
    }

    return $this->getobj($page);
}


sub delete_page($$) {
    debug_msg;
    my $this = shift;
    my $page = shift or return;

    # Make sure page is part of the notebook.
    $this->root->fatalerror("The notebook widget does not have a page named '$page'!")
        unless (defined $this->{-id2object}->{$page});

    debug_msg "  deleting '$page' page";

    if (defined $this->{callback}{$page}{-on_delete}) {
	debug_msg "  calling delete callback for $page";
	$this->{callback}{$page}{-on_delete}->($this,$page);
    }

    my $active_page = $this->active_page;
    @{$this->{-pages}} = grep($page ne $_, @{$this->{-pages}});
    $this->activate_page($this->first_page) if ($page eq $active_page);
    $this->SUPER::DESTROY($page);

    return;
}


sub active_page($) {
    debug_msg;
    my $this = shift;
    return unless (@{$this->{-pages}});

    my $page = defined $this->{-active_page} ?
        $this->{-active_page} :
        ($this->{-active_page} = '');
    debug_msg "  active page = '$page'";
    return $page;
}


sub first_page($) {
    debug_msg;
    my $this = shift;
    return unless (@{$this->{-pages}});

    my $page = ${$this->{-pages}}[0];
    debug_msg "  first page = '$page'";
    return $page;
}


sub last_page($) {
    debug_msg;
    my $this = shift;
    return unless (@{$this->{-pages}});

    my $page = ${$this->{-pages}}[$#{$this->{-pages}}];
    debug_msg "  last page = '$page'";
    return $page;
}


sub prev_page($) {
    debug_msg;
    my $this = shift;
    return unless (@{$this->{-pages}});

    my $active_page = $this->active_page;
    my $i = scalar(@{$this->{-pages}});
    while (--$i >= 0) {
        last if ($active_page eq ${$this->{-pages}}[$i]);
    }
    return if ($i < 0);
    $i = $i > 0 ?
        $i-1 :
        $this->{-wraparound} ?
            $#{$this->{-pages}} :
            0;
    my $page = ${$this->{-pages}}[$i];
    debug_msg "  prev page = '$page'";
    return $page;
}


sub next_page($) {
    debug_msg;
    my $this = shift;
    return unless (@{$this->{-pages}});

    my $active_page = $this->active_page;
    my $i = scalar(@{$this->{-pages}});
    while (--$i >= 0) {
        last if ($active_page eq ${$this->{-pages}}[$i]);
    }
    return if ($i < 0);
    $i = $i < $#{$this->{-pages}} ?
        $i+1 :
        $this->{-wraparound} ?
            0 :
            $#{$this->{-pages}};
    my $page = ${$this->{-pages}}[$i];
    debug_msg "  next page = '$page'";
    return $page;
}


sub activate_page($$) {
    debug_msg;
    my $this = shift;
    my $page = shift or return;

    # Make sure page is part of the notebook.
    $this->root->fatalerror("The notebook widget does not have a page named '$page'!")
        unless (defined $this->{-id2object}->{$page});

    my $active_page = $this->active_page;
    debug_msg "  old active page = '$active_page'";

    if (defined $this->{callback}{$page}{-on_activate}) {
	debug_msg "  calling activate callback for $page";
	$this->{callback}{$page}{-on_activate}->($this,$page);
    }

    if ($active_page ne $page) {
        $active_page = $this->{-active_page} = $page;
        debug_msg "  new active page = '$active_page'";
        $this->set_draworder($active_page);
        $this->set_focusorder($active_page);

        # Redraw the notebook widget only if in curses mode.
        $this->intellidraw unless isendwin;
    }
    return $active_page;
}


sub mouse_button1($$$$) {
    debug_msg;
    my $this = shift;
    my $event = shift;
    my $x = shift;
    my $y = shift;

    my $ev_x = $event->{-x};
    my $ev_y = $event->{-y};
    debug_msg "  mouse click at ($ev_x,$ev_y)";

    # Focus window if it isn't already in focus.
    $this->focus if (not $this->{-focus} and $this->focusable);

    # If click was in the 'tabs' window.
    if ($ev_y <= ($this->{-border} + $this->{-sbborder} ? 3 : 1)) {
        # Figure out which page was clicked.
        my $len = 0;
        foreach my $page (@{$this->{-pages}}) {
            $len += length($page) +
                ($this->{-ipadleft} || 0) + ($this->{-ipadright} || 0) +
                ($this->{-border} || 0) + ($this->{-sbborder} || 0);
            if ($ev_x < $len) {
                debug_msg "  user clicked on tab for '$page'";
                return $this->activate_page($page);
            }
        }
        debug_msg "  user didn't click on a tab label; ignored";
    }
    else {
        my $active_page = $this->active_page;
        debug_msg "  user clicked on window of active page";
        $this->getobj($active_page)->mouse_button1($event, $x, $y);
    }
}

1;


=pod

=head1 NAME

Curses::UI::Notebook - Create and manipulate notebook widgets.


=head1 CLASS HIERARCHY

 Curses::UI::Widget
    |
    +----Curses::UI::Container
            |
            +----Curses::UI::Notebook


=head1 SYNOPSIS

    use Curses::UI;
    my $cui = new Curses::UI;
    my $win = $cui->add(undef, 'Window');

    my $notebook = $win->add(undef, 'Notebook');
    my $page1 = $notebook->add_page('page 1');
    $page1->add(
        undef, 'Label',
        -x    => 15,
        -y    => 6,
        -text => "Page #1.",
    );
    my $page2 = $notebook->add_page('page 2');
    $page2->add(
        undef, 'Label',
        -x    => 15,
        -y    => 6,
        -text => "Page #2.",
    );
    my $page3 = $notebook->add_page('page 3', -on_activate => \&sub );
    $page3->add(
        undef, 'Label',
        -x    => 15,
        -y    => 6,
        -text => "Page #3.",
    );
    $notebook->focus;
    $cui->mainloop;


=head1 DESCRIPTION

This package implements a I<notebook widget> similar to that found in
Motif.  A I<notebook> holds several windows, or I<pages>, only one of
which is visible at any given time; tabs at the top of the widget list
the pages that are available.  In this way, a great deal of information
can be fit into a relatively small screen area.  [Windows users might
recognize this as a I<tabbed dialog>.]


=head1 STANDARD OPTIONS

B<-x>, B<-y>, B<-width>, B<-height>,
B<-pad>, B<-padleft>, B<-padright>, B<-padtop>, B<-padbottom>,
B<-ipad>, B<-ipadleft>, B<-ipadright>, B<-ipadtop>, B<-ipadbottom>,
B<-border>, B<-sbborder>,
B<-bg>, B<-fg>,
B<-intellidraw>,
B<-onchange>, B<-onblur>.

See L<Curses::UI::Widget|Curses::UI||Widget> for a discussion of each of
these options. 

Note that B<-border> is enabled and both B<-ipadleft> and B<-ipadright>
are set to C<1> by default when creating notebook objects. 


=head1 WIDGET-SPECIFIC OPTIONS

=over 4

=item * B<-bindings> < HASHREF >

The keys in this hash reference are keystrokes and the values are
routines to which they should be bound.  In the event a key is empty,
the corresponding routine will become the default routine that
B<process_bindings> applies to unmatched keystrokes it receives.

By default, the following mappings are used:

    KEY                 ROUTINE
    ------------------  ----------
    KEY_HOME, Ctrl-A    first_page
    KEY_END, Ctrl-E     last_page
    KEY_NPAGE, Ctrl-N   next_page
    KEY_PPAGE, Ctrl-P   prev_page

=item * B<-routines> < HASHREF >

The keys in this hash reference are routines and the values are either
scalar values or code references.  B<process_bindings> maps keystrokes
to routines and then to either a scalar value, which it returns, or a
code reference, which it executes.

By default, the following mappings are used:

    ROUTINE         ACTION
    ----------      -------------------------
    first_page      make first page active
    last_page       make last page active
    next_page       make next page active
    prev_page       make previous page active

=item * B<-wraparound> < BOOLEAN >

If BOOLEAN has a true value, wraparound is enabled.  This means that
advancing to the next page will cycle from the last back to the first
page and similarly, advancing to the previous page will cycle from the
first back to the last page.

By default, it is true.

=back


=head1 METHODS

=over 4

=item * B<new> ( OPTIONS )

Constructs a new notebook object using options in the hash OPTIONS.

=item * B<layout> ( )

Lays out the notebook object, makes sure it fits on the available
screen, and creates the curses windows for the border / tab labels as
well as the effective drawing area.

=item * B<draw> ( BOOLEAN )

Draws the notebook object along with the active page's window. If BOOLEAN
is true, the screen is not updated after drawing.

By default, BOOLEAN is true so the screen is updated.

=item * B<intellidraw> ( )

=item * B<focus> ( )

=item * B<onFocus> ( CODEREF )

=item * B<onBlur> ( CODEREF )

See L<Curses::UI::Widget|Curses::UI::Widget> for explanations of these
methods.

=item * B<add_page> ( PAGE [ , -on_activate => sub_ref ] [, -on_delete => ] )

Adds the specified page to the notebook object and creates an associated
window object.  Returns the window object or undef on failure.

Note: the add fails if the page would otherwise cause the tab window to
overflow or is already part of the notebook object.

The C<-on_activate> parameter specifies an optional call-back that
will be invoked when the page is activated. This call-back will be
called with the notebook widget and page name as parameter.

Likewise for C<-on_delete> call-back. This one is invoked when the
page is deleted.

=item * B<delete_page> ( PAGE )

Deletes the specified page from the notebook object and destroys its
associated window object.  If the page was active, the first page is
made active.

=item * B<active_page> ( )

Returns the currently active page in the notebook object.

=item * B<first_page> ( )

Returns the first page in the notebook object.

=item * B<last_page> ( )

Returns the last page in the notebook object.

=item * B<prev_page> ( )

Returns the previous page in the notebook object.

=item * B<next_page> ( )

Returns the next page in the notebook object.

=item * B<activate_page> ( PAGE )

Makes the specified page in the notebook object active and returns it,
redrawing the notebook object in the process.

=item * B<mouse_button1> ( )

Processes mouse button #1 clicks.  If the user left-clicks on one of the
tabs, B<activate_page> is called with the corresponding page to make it
active; otherwise, the click is passed along to the active window.

=back


=head1 SEE ALSO

L<Curses::UI|Curses::UI>,
L<Curses::UI::Container|Curses::UI::Container>,
L<Curses::UI::Widget|Curses::UI::Widget>


=head1 AUTHOR

George A. Theall, E<lt>theall@tifaware.comE<gt>


=head1 COPYRIGHT AND LICENSE

Copyright (c) 2004, George A. Theall. All rights reserved.

This script is free software; you can redistribute it and/or modify
it under the same terms as Perl itself.
