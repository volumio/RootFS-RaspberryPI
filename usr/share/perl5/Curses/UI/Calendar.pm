# ----------------------------------------------------------------------
# Curses::UI::Calendar
#
# (c) 2001-2002 by Maurice Makaay. All rights reserved.
# This file is part of Curses::UI. Curses::UI is free software.
# You can redistribute it and/or modify it under the same terms
# as perl itself.
#
# Currently maintained by Marcus Thiesen
# e-mail: marcus@cpan.thiesenweb.de
# ----------------------------------------------------------------------

#TODO: fix dox

package Curses::UI::Calendar;

use strict;
use Curses;
use Curses::UI::Common;
use Curses::UI::Widget;

use vars qw(
    $VERSION 
    @ISA
);

$VERSION = '1.10';

@ISA = qw(
    Curses::UI::Widget 
    Curses::UI::Common
);

my @days   = ();
my @months = ();

my %routines = (
    'loose-focus'          => \&loose_focus,
    'date-select'          => \&date_select,
    'date-selected'        => \&date_selected,
    'date-nextday'         => \&date_nextday,
    'date-prevday'         => \&date_prevday,
    'date-nextweek'        => \&date_nextweek,
    'date-prevweek'        => \&date_prevweek,
    'date-nextmonth'       => \&date_nextmonth,
    'date-prevmonth'       => \&date_prevmonth,
    'date-nextyear'        => \&date_nextyear,
    'date-prevyear'        => \&date_prevyear,
    'date-today'           => \&date_today,
    'mouse-button'         => \&mouse_button,
);

my %bindings = (
    CUI_TAB()              => 'loose-focus',
    KEY_BTAB()             => 'loose-focus',
    KEY_LEFT()             => 'date-prevday',
    "h"                    => 'date-prevday',
    KEY_RIGHT()            => 'date-nextday',
    "l"                    => 'date-nextday',
    KEY_DOWN()             => 'date-nextweek',
    "j"                    => 'date-nextweek',
    KEY_UP()               => 'date-prevweek',
    "k"                    => 'date-prevweek',
    KEY_NPAGE()            => 'date-nextmonth',
    "J",                   => 'date-nextmonth',
    KEY_PPAGE()            => 'date-prevmonth',
    "K",                   => 'date-prevmonth',
    "L",                   => 'date-nextyear',
    "H",                   => 'date-prevyear',
    "n",                   => 'date-nextyear',
    "p",                   => 'date-prevyear',
    KEY_HOME()             => 'date-selected',
    "\cA"                  => 'date-selected',
    "c"                    => 'date-selected',
    "t"                    => 'date-today',
    KEY_ENTER()            => 'date-select',
    CUI_SPACE()            => 'date-select',
);

# ----------------------------------------------------------------------
# Constructor
# ----------------------------------------------------------------------

sub new ()
{
    my $class = shift;

    my %userargs = @_;
    keys_to_lowercase(\%userargs);

    my %args = ( 
        -date       => undef,   # The date to start width
        -width      => 0,       # Widget will fix width itself
        -height     => 0,       # Widget will fix height itself
        -onchange   => undef,   # Event handler    
	-fg         => -1,
        -bg         => -1,
	-drawline   => 1,       # Draw a line under the widget?

        %userargs,

        -routines   => {%routines},
        -bindings   => {%bindings},

        -ipadleft   => 1,
        -ipadright  => 1,
        -ipadbottom => 0,
        -ipadtop    => 0,
        -focus      => 0,
        -nocursor   => 1,
    );

    # The widget width should be at least 20.
    my $min_width = width_by_windowscrwidth(20, %args);
    $args{-width} = $min_width if $args{-width} != -1 
                   and $args{-width} < $min_width;
    
    # The widget height should be at least 11.
    my $min_height = height_by_windowscrheight(11, %args);
    $args{-height} = $min_height if $args{-height} != -1
                      and $args{-height} < $min_height;

    my $this = $class->SUPER::new( %args );    

    # Split up and fix the date.
    $this->setdate($this->{-date}, 1);

    # Set cursor to current date.
    $this->{-cyear}  = $this->{-year};
    $this->{-cmonth} = $this->{-month};
    $this->{-cday}   = $this->{-day};

    # Load day- and monthnames.
    @days = $this->root->lang->getarray('days_short');
    @months = (undef, $this->root->lang->getarray('months'));

    if ($Curses::UI::ncurses_mouse) {
	$this->set_mouse_binding(
	    'mouse-button', BUTTON1_CLICKED(), BUTTON3_CLICKED());
    }

    return $this;
}

# ----------------------------------------------------------------------
# Methods
# ----------------------------------------------------------------------

sub onChange(;$) { shift()->set_event('-onchange', shift()) }
sub day($;)      { shift()->accessor('-day',       shift()) }
sub month($;)    { shift()->accessor('-month',     shift()) }
sub year($;)     { shift()->accessor('-year',      shift()) }


sub layout()
{
    my $this = shift;
    $this->SUPER::layout() or return;    
    return $this;
}

sub setdate($;$)
{
    my $this = shift;
    my $date = shift;
    my $nodraw = shift || 0;

    if (not defined $date)
    {
        $this->{-year}  = undef;
        $this->{-month} = undef;
        $this->{-day}   = undef;
    }
    elsif ($date =~ /^(\d\d\d\d+)(\d\d)(\d\d)$/)
    {
        $this->{-year}  = $1;
        $this->{-month} = $2;
        $this->{-day}   = $3;
    }
    elsif ($date =~ /^(\d{1,2})\D(\d{1,2})\D(\d\d\d\d+)$/)
    {
        $this->{-year}  = $3;
        $this->{-month} = $2;
        $this->{-day}   = $1;
    }
    elsif ($date =~ /^(\d\d\d\d+)\D(\d{1,2})\D(\d{1,2})$/)
    {
        $this->{-year}  = $1;
        $this->{-month} = $2;
        $this->{-day}   = $3;
    }

    $this->make_sane_date;
    $this->intellidraw unless $nodraw;

    return $this;
}

sub make_sane_date()
{
    my $this = shift;
    my $cursor = shift;
    my $c = $cursor ? 'c' : '';
    
    # Determine 'today'.
    my @now = localtime(); $now[4]++; $now[5]+=1900;

    # Use today's values if undefined.
    $this->{"-${c}day"}   = $now[3] 
        unless defined $this->{"-${c}day"};
    $this->{"-${c}month"} = $now[4] 
        unless defined $this->{"-${c}month"};
    $this->{"-${c}year"}  = $now[5] 
        unless defined $this->{"-${c}year"};


    if ($this->{"-${c}year"} < 0)    { $this->{"-${c}year"}  = 0    }
    if ($this->{"-${c}year"} > 9999) { $this->{"-${c}year"}  = 9999 }
    if ($this->{"-${c}month"} < 1)   { $this->{"-${c}month"} = 1    }
    if ($this->{"-${c}month"} > 12)  { $this->{"-${c}month"} = 12   }

    my $days = days_in_month($this->{"-${c}year"}, $this->{"-${c}month"});
    if ($this->{"-${c}day"} < 1)     { $this->{"-${c}day"} = 1     }
    if ($this->{"-${c}day"} > $days) { $this->{"-${c}day"} = $days }
    
    # undef value?
    if ($this->{"-${c}year"} == 1752 and $this->{"-${c}month"} == 9) {
        if ($this->{"-${c}day"} > 2 and $this->{"-${c}day"} < 14) {
            $this->{"-${c}day"} = ($this->{"-${c}day"} > 8 ? 14 : 2);
        }
    }

    return $this;
}

sub draw(;$)
{
    my $this = shift;
    my $no_doupdate = shift || 0;
    
    # Draw the widget
    $this->SUPER::draw(1) or return $this;
    
    $this->make_sane_date;
    $this->make_sane_date(1);
 
    # Let there be color
    if ($Curses::UI::color_support) {
	my $co = $Curses::UI::color_object;
	my $pair = $co->get_color_pair(
			     $this->{-fg},
			     $this->{-bg});

	$this->{-canvasscr}->attron(COLOR_PAIR($pair));

    }

    # Bold font on if the widget has focus and the selected
    # date is the active date.
    $this->{-canvasscr}->attron(A_BOLD) 
        if $this->{-focus} and
           $this->{-cyear} == $this->{-year} and
           $this->{-cmonth} == $this->{-month} and
           $this->{-cday} == $this->{-day};

    # Draw day, month and year. If the widget has focus,
    # show the cursor position. Else show the selected position.
    my $c = $this->{-focus} ? 'c' : '';    
    $this->{-canvasscr}->addstr(0,0," "x$this->canvaswidth);
    $this->{-canvasscr}->addstr(0,0, $months[$this->{"-${c}month"}] 
                    . " " . $this->{"-${c}day"});
    $this->{-canvasscr}->addstr(0,$this->canvaswidth-4,$this->{"-${c}year"});

    # Draw daynames
    $this->{-canvasscr}->attron(A_BOLD) if $this->{-focus};
    $this->{-canvasscr}->addstr(2,0,join " ", @days);

    # Reset bold font attribute.
    $this->{-canvasscr}->attroff(A_BOLD) if $this->{-focus};

    # Draw a line under the date.
    if ($this->{-drawline}) {
	$this->{-canvasscr}->move(1,0);
	$this->{-canvasscr}->hline(ACS_HLINE,$this->canvaswidth);
    }

    # Create the list of days in the current month.
    my @month = build_month($this->{"-${c}year"}, $this->{"-${c}month"});

    # Draw the days.
    my $month = $this->{"-${c}month"};
    my $year  = $this->{"-${c}year"};
    my $y = 4; 
    my $weekday = 0;
    foreach my $day (@month)
    {
        unless (defined $day) {
            $weekday++;
            next;
        }

        # Make current date bold.
        $this->{-canvasscr}->attron(A_BOLD)
            if $this->{-day}    == $day   and 
	       $this->{-month}  == $month and
	       $this->{-year}   == $year;
    
        # Make selected date inverse if widget has focus.
        $this->{-canvasscr}->attron(A_REVERSE)
	    if $this->{-focus}            and
               $this->{-cday}   == $day   and 
	       $this->{-cmonth} == $month and
	       $this->{-cyear}  == $year;

        # Draw the day.
        $this->{-canvasscr}->addstr($y, $weekday*3, sprintf("%2d",$day));

        # Reset attributes.
        $this->{-canvasscr}->attroff(A_REVERSE);
        $this->{-canvasscr}->attroff(A_BOLD);

        $weekday++;
        if ($weekday == 7) {
            $weekday = 0;
            $y++;
        }
    }

    # Move the cursor to the bottomright corner of the widget
    # (in case the terminal does not support widget hiding).
    $this->{-canvasscr}->move($this->canvasheight-1, $this->canvaswidth-1);

    $this->{-canvasscr}->noutrefresh();
    doupdate() unless $no_doupdate;

    return $this;
}

sub date_selected()
{
    my $this = shift;
    $this->{-cyear} = $this->{-year};
    $this->{-cmonth} = $this->{-month};
    $this->{-cday} = $this->{-day};
    $this->schedule_draw(1);
    return $this;
}

sub date_today()
{
    my $this = shift;
    $this->{-cmonth} = undef;
    $this->{-cday}   = undef;
    $this->{-cyear}  = undef;
    $this->schedule_draw(1);
    return $this;
}

sub date_prevyear()
{
    my $this = shift;
    $this->{-cyear}--;
    $this->{-cyear} = 0 if $this->{-cyear} < 0;
    $this->schedule_draw(1);
    return $this;
}

sub date_nextyear()
{
    my $this = shift;
    $this->{-cyear}++;
    $this->{-cyear} = 9999 if $this->{-cyear} > 9999;
    $this->schedule_draw(1);
    return $this;
}

sub date_prevmonth()
{
    my $this = shift;
    $this->{-cmonth}--;
    if ($this->{-cmonth} < 1 and $this->{-cyear} > 0) {
        $this->{-cmonth} = 12;
        $this->{-cyear}--;
    }
    $this->schedule_draw(1);
    return $this;
}

sub date_nextmonth()
{
    my $this = shift;
    $this->{-cmonth}++;
    if ($this->{-cmonth} > 12 and $this->{-cyear} < 9999) {
        $this->{-cmonth} = 1;
        $this->{-cyear}++;
    }
    $this->schedule_draw(1);
    return $this;
}

sub date_delta_days($;)
{
    my $this = shift;
    my $delta = shift;

    if ($delta < 0) 
    {
        my $startday = $this->{-cday};
        $this->{-cday} += $delta;
        if ($this->{-cday} < 1) 
        {
            if ( ($this->{-cmonth} >= 1 and $this->{-cyear} >= 1) or
                 ($this->{-cmonth} >= 2 and $this->{-cyear} >= 0) ) 
            {
            $this->date_prevmonth();
            my $days = days_in_month($this->{-cyear}, $this->{-cmonth}); 
               $this->{-cday} = $startday + $delta + $days;
            }
        }
    } else {
        my $days = days_in_month($this->{-cyear}, $this->{-cmonth});
        my $newday = $this->{-cday} + $delta - $days; 
        $this->{-cday} += $delta;
        if ($this->{-cday} > $days and 
            $this->{-cyear} < 9999)
        {
            $this->date_nextmonth();
            $this->{-cday} = $newday;
        }
    }
    
    if ($this->{-cyear} == 1752 and $this->{-cmonth} == 9) {
        if ($this->{-cday} > 2 and $this->{-cday} < 14) {
            $this->{-cday} = ($delta > 0 ? 14 : 2);
        }
    }
    $this->schedule_draw(1);
}

sub date_prevweek()
{
    my $this = shift;
    $this->date_delta_days(-7);
    $this->schedule_draw(1);
    return $this;
}

sub date_nextweek()
{
    my $this = shift;
    $this->date_delta_days(+7);
    $this->schedule_draw(1);
    return $this;
}

sub date_prevday()
{
    my $this = shift;
    $this->date_delta_days(-1);
    $this->schedule_draw(1);
    return $this;
}

sub date_nextday()
{
    my $this = shift;
    $this->date_delta_days(+1);
    $this->schedule_draw(1);
    return $this;
}

sub date_select()
{
    my $this = shift;    
    $this->{-day}   = $this->{-cday};
    $this->{-month} = $this->{-cmonth};
    $this->{-year}  = $this->{-cyear};
    $this->schedule_draw(1);
    $this->run_event('-onchange');
    return $this;
}

sub mouse_button($$$$;)
{
    my $this  = shift;
    my $event = shift;
    my $x     = shift;
    my $y     = shift;

    # Click in the day area?
    if ($y > 3 and $y < 10) 
    {
	my @month = build_month($this->{-cyear}, $this->{-cmonth});
	my $weekday = 0;
	my $ty      = 4;
	foreach my $day (@month)
	{
	    unless (defined $day) { $weekday++; next }

	    my ($dx, $dy) = ($weekday*3, $ty);

	    if ($x >= $dx and $x < $dx+2 and $y == $dy) {
		$this->{-cday} = $day;
		$this->date_select(1);
		$this->focus();
		last;
	    }

	    $weekday++;
	    if ($weekday == 7) {
		$weekday = 0;
		$ty++;
	    }
	}
    }

    # Click on the year?
    elsif ($y == 0 and 
	   $x > ($this->canvaswidth-5) and
	   $x < $this->canvaswidth) 
    {
        # Select year
	if ( $event->{-bstate} == BUTTON3_CLICKED() ) {
	    $this->date_nextyear;
	} else {
	    $this->date_prevyear;
	}
	$this->focus();
    }
    
    # Click on the month?
    elsif ( $y == 0 and 
	    $x >= 0 and
	    $x < length($months[$this->{-cmonth}]) )
    {
	if ( $event->{-bstate} == BUTTON3_CLICKED() ) {
	    $this->date_nextmonth;
	} else {
	    $this->date_prevmonth;
	}
	$this->focus();
    }


    
    return $this;
}

sub get()
{
    my $this = shift;
    $this->make_sane_date();
    return sprintf("%04d-%02d-%02d", 
               $this->{-year}, $this->{-month}, $this->{-day});
}

# ----------------------------------------------------------------------
# Date calculation 
# ----------------------------------------------------------------------

my @days_in_month = (undef,31,28,31,30,31,30,31,31,30,31,30,31);

sub is_julian ($$;)
{
    my ($year, $month) = @_;
    return $year < 1752 or ($year == 1752 and $month <= 9);
}

sub day_of_week($$$;)
{
    my $year  = shift;
    my $month = shift;
    my $day   = shift;

    my $a = int( (14 - $month)/12 );
    my $y = $year - $a;
    my $m = $month + (12 * $a) - 2;
    my $day_of_week;
    if (is_julian($year, $month)) 
    {
        $day_of_week = (
                5 
                + $day 
                + $y + int($y/4) 
                + int(31*$m/12)    
                   ) % 7;
    } else {
        $day_of_week = (
                $day 
                + $y + int($y/4) 
                - int($y/100) 
                + int($y/400) 
                + int(31*$m/12)
                   ) % 7;
    }

    return $day_of_week;
}

sub days_in_month($$;) 
{
    my $year  = shift;
    my $month = shift;

    if($month == 2 and is_leap_year($year)) {
        return 29;
    } else {
        return $days_in_month[$month];
    }
}

sub is_leap_year($;)
{
    my $year = shift;

    if (is_julian($year,1)) {
        return 1 if $year % 4 == 0;
    } else {
        return 1 if ($year % 4 == 0 and $year % 100 != 0) 
                          or $year % 400 == 0;
    }
    return 0;
}

sub build_month ($$;)
{
    my $year  = shift;
    my $month = shift;

    my $first_weekday = day_of_week($year, $month, 1);
    my $number_of_days = days_in_month($year, $month);
    
    if ($year == 1752 and $month == 9) {
        $number_of_days = 19;
    }

    my @month = ();
    for (1..$first_weekday) {
        push @month, undef;
    }

    my $realday = 1;
    for( my $day = 1; $day <= $number_of_days; $day++ )
    {
        push @month, $realday;
        if ($year == 1752 and $month == 9 and $realday == 2) {
            $realday = 13;
        }
        $realday++;
    }

    return @month;
}

1;


=pod

=head1 NAME

Curses::UI::Calendar - Create and manipulate calendar widgets

=head1 CLASS HIERARCHY

 Curses::UI::Widget
    |
    +----Curses::UI::Calendar


=head1 SYNOPSIS

    use Curses::UI;
    my $cui = new Curses::UI;
    my $win = $cui->add('window_id', 'Window');

    my $calendar = $win->add(
        'mycalendar', 'Calendar',
    -date    => '2002-1-14'
    );

    $calendar->focus();
    my $date = $calendar->get();


=head1 DESCRIPTION

Curses::UI::Calendar is a widget that can be used to create 
a calendar in which the user can select a date. The calendar
widget looks like this:

  +----------------------+
  | mmm dd          yyyy | 
  +----------------------+
  | su mo tu we th fr sa |
  |                      |
  |       01 02 03 04 05 |
  | 06 07 08 09 10 11 12 |
  | 13 14 15 16 17 18 19 |
  | 20 21 22 23 24 25 26 |
  | 27 28 29 30 31       |
  +----------------------+

See exampes/demo-Curses::UI::Calendar in the distribution
for a short demo.



=head1 STANDARD OPTIONS

B<-parent>, B<-x>, B<-y>, B<-width>, B<-height>, 
B<-pad>, B<-padleft>, B<-padright>, B<-padtop>, B<-padbottom>,
B<-ipad>, B<-ipadleft>, B<-ipadright>, B<-ipadtop>, B<-ipadbottom>,
B<-title>, B<-titlefullwidth>, B<-titlereverse>, B<-onfocus>,
B<-onblur>

For an explanation of these standard options, see 
L<Curses::UI::Widget|Curses::UI::Widget>.

B<Remark>: B<-width> and B<-height> can be set, but this widget 
really want to have its content space at a minimum size. If your
B<-width> or B<-height> is not large enough, the widget will
automatically fix its value.




=head1 WIDGET-SPECIFIC OPTIONS

=over 4

=item * B<-date> < DATE >

This option sets the date to start with. 
If you do not specify a date, today's 
date will be used automatically. The format that 
you can use for this date is one of:

* B<YYYY-M-D> (e.g. 2002-1-10 or 2002-01-10)

* B<YYYY/M/D> (e.g. 2002/1/10 or 2002/01/10))

* B<YYYYMMDD> (e.g. 20020110)

* B<D-M-YYYY> (e.g. 10-1-2002 or 10/01/2002)

* B<D/M/YYYY> (e.g. 10/1/2002 or 10/01/2002)

=item * B<-onchange> < CODEREF >

This sets the onChange event handler for the calendar widget.
If a new date is selected, the code in CODEREF will be executed.
It will get the widget reference as its argument.

=item * B<-drawline> < CODEREF >

This option specifies whether or not a line should be drawn under
the calendar.

=back




=head1 METHODS

=over 4

=item * B<new> ( OPTIONS )

=item * B<layout> ( )

=item * B<draw> ( BOOLEAN )

=item * B<focus> ( )

=item * B<onFocus> ( CODEREF )

=item * B<onBlur> ( CODEREF )

=item * B<intellidraw> ( )

These are standard methods. See L<Curses::UI::Widget|Curses::UI::Widget> 
for an explanation of these.

=item * B<get> ( )

This method will return the currently selected date in the
format 'YYYY-MM-DD'.

=item * B<setdate> ( DATE, [BOOLEAN] )

Set the selected date of the widget to DATE. See B<-date> above for
the possible formats. The widget will redraw itself, unless BOOLEAN
has a true value.

=item * B<onChange> ( CODEREF )

This method can be used to set the B<-onchange> event handler
(see above) after initialization of the calendar. 

=back




=head1 DEFAULT BINDINGS

=over 4

=item * <B<tab>>

Call the 'loose-focus' routine. This will have the menubar
loose its focus and return the value 'LOOSE_FOCUS' to
the calling routine.

=item * <B<enter>>, <B<space>>

Call the 'date-select' routine. This will select the date on
which the cursor is.

=item * <B<cursor-left>>, <B<h>>

Call the 'date-prevday' routine. This will have the date 
cursor go back one day.

=item * <B<cursor-right>, <B<l>>

Call the 'date-nextday' routine. This will have the 
date cursor go forward one day.

=item * <B<cursor-down>>, <B<j>>

Call the 'date-nextweek' routine. This will have the 
date cursor go forward one week.

=item * <B<cursor-up>>, <B<k>>

Call the 'date-prevweek' routine. This will have the 
date cursor go back one week.

=item * <B<page-up>>, <B<SHIFT+K>>

Call the 'date-prevmonth' routine. This will have the 
date cursor go back one month.

=item * <B<page-down>>, <B<SHIFT+J>>

Call the 'date-nextmonth' routine. This will have the 
date cursor go forward one month.

=item * <B<p>>, <B<SHIFT+H>>

Call the 'date-prevyear' routine. This will have the 
date cursor go back one year.

=item * <B<n>>, <B<SHIFT+L>>

Call the 'date-nextyear' routine. This will have the 
date cursor go forward one year.

=item * <B<home>>, <B<CTRL+A>>, <B<c>>

Call the 'date-selected' routine. This will have the 
date cursor go to the current selected date.

=item * <B<t>>

Call the 'date-today' routine. This will have the date cursor
go to today's date.

=back 





=head1 SEE ALSO

L<Curses::UI|Curses::UI>, 
L<Curses::UI::Widget|Curses::UI::Widget>, 
L<Curses::UI::Common|Curses::UI::Common>




=head1 AUTHOR

Copyright (c) 2001-2002 Maurice Makaay. All rights reserved.

Maintained by Marcus Thiesen (marcus@cpan.thiesenweb.de)


This package is free software and is provided "as is" without express
or implied warranty. It may be used, redistributed and/or modified
under the same terms as perl itself.

