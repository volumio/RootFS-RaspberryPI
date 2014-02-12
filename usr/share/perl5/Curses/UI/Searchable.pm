# ----------------------------------------------------------------------
# Curses::UI::Searchable
# Curses::UI::SearchEntry
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

# ----------------------------------------------------------------------
# SearchEntry package
# ----------------------------------------------------------------------

package Curses::UI::SearchEntry;

use Curses;
use Curses::UI::Widget; # For height_by_windowscrheight()
use Curses::UI::Common;
use Curses::UI::Container;

use vars qw(
    $VERSION 
    @ISA
);

$VERSION = "1.10";

@ISA = qw(
    Curses::UI::ContainerWidget
);

sub new()
{
    my $class = shift;

    my %userargs = @_;
    keys_to_lowercase(\%userargs);

    my %args = (
        -prompt     => '/',    # The initial search prompt

        %userargs,

        -x          => 0, 
        -y          => -1,
        -width      => undef,
        -border     => 0,
        -sbborder   => 0,
        -showlines  => 0,    
        -focus      => 0,
    );
    
    # The windowscr height should be 1.
    $args{-height} = height_by_windowscrheight(1,%args);

    my $this = $class->SUPER::new(%args);

    my $entry = $this->add(
        'entry', 'TextEntry',
        -x           => 1,
        -y           => 0, 
        -height      => 1, 
        -border      => 0,
        -sbborder    => 0,
        -showlines   => 0,
        -width       => undef,
        -intellidraw => 0,
    );
    
    $this->add(
        'prompt', 'Label',
        -x           => 0, 
        -y           => 0, 
        -height      => 1, 
        -width       => 2,
        -border      => 0,
        -text        => $this->{-prompt},
        -intellidraw => 0,
    );

    $entry->set_routine('loose-focus', \&entry_loose_focus);

    $this->layout;

    return $this;
}

sub entry_loose_focus()
{
    my $this = shift;
    $this->parent->loose_focus;
}

sub event_keypress($;)
{
    my $this = shift;
    my $key  = shift;

    my $entry = $this->getobj('entry');
    if ($entry->{-focus}) {
	$this->getobj('entry')->event_keypress($key);
    } else {
	$this->{-key} = $key;
    }

    return $this;
}

sub get()
{
    my $this = shift;
    $this->getobj('entry')->get;
}

sub pos(;$)
{
    my $this = shift;
    my $pos = shift;
    $this->getobj('entry')->pos($pos);
}

sub text(;$)
{
    my $this = shift;
    my $text = shift;
    $this->getobj('entry')->text($text);
}

sub prompt(;$) 
{ 
    my $this = shift;
    my $prompt = shift;
    if (defined $prompt) 
    {
        $prompt = substr($prompt, 0, 1);
        $this->{-prompt} = $prompt;
        $this->getobj('prompt')->text($prompt);
        $this->intellidraw;
        return $this;
    } else {
        return $this->{-prompt};
    }
}

# Let Curses::UI->usemodule() believe that this module
# was already loaded (usemodule() would else try to
# require the non-existing file).
#
$INC{'Curses/UI/SearchEntry.pm'} = $INC{'Curses/UI/Searchable.pm'};


# ----------------------------------------------------------------------
# Searchable package
# ----------------------------------------------------------------------

package Curses::UI::Searchable;

use strict;
use Curses;
use Curses::UI::Common;
require Exporter;

use vars qw(
    $VERSION 
    @ISA 
    @EXPORT
);

$VERSION = '1.10';

@ISA = qw(
    Exporter
);

@EXPORT = qw(
    search_forward
    search_backward
    search
    search_next
);

sub search_forward()
{
    my $this = shift;
    $this->search("/", +1);
}

sub search_backward()
{
    my $this = shift;
    $this->search("?", -1);
}

sub search()
{
    my $this   = shift;
    my $prompt = shift || ':';
    my $direction   = shift || +1; 

    $this->change_canvasheight(-1);
    $this->draw;

    my $querybox = new Curses::UI::SearchEntry(
        -parent   => $this,
        -prompt   => $prompt,
    );

    my $old_cursor_mode = $this->root->cursor_mode;
    $this->root->cursor_mode(1);
    $querybox->getobj('entry')->{-focus} = 1;
    $querybox->draw;
    $querybox->modalfocus();
    $querybox->getobj('entry')->{-focus} = 0;

    my $query = $querybox->get;
    $querybox->prompt(':');
    $querybox->draw;
    
    my $key;
    if ($query ne '')
    {
        my ($newidx, $wrapped) = 
        $this->search_next($query, $direction);

        KEY: for (;;)
        {
            unless (defined $newidx) {
                $querybox->text('Not found');
            } else {
                $querybox->text($wrapped ? 'Wrapped' : '');
            }
	    $querybox->pos(0);
            $querybox->draw;

            $querybox->{-key} = '-1';
            while ($querybox->{-key} eq '-1') {
	       $this->root->do_one_event($querybox);      
            }

            if ($querybox->{-key} eq 'n') { 
                ($newidx, $wrapped) = 
                    $this->search_next($query, $direction);
            } elsif ($querybox->{-key} eq 'N') {
                ($newidx, $wrapped) = 
                    $this->search_next($query, -$direction);
            } else {
                last KEY;
            }
        }
    }

    # Restore the screen.
    $this->root->cursor_mode($old_cursor_mode);
    $this->change_canvasheight(+1);
    $this->draw;

    $this->root->feedkey($querybox->{-key});
    return $this;
}

sub search_next($$;)
{
    my $this = shift;
    my $query = shift;
    my $direction = shift;
    $direction = ($direction > 0 ? +1 : -1);
    $this->search_get($query, $direction);
}

sub change_canvasheight($;)
{
    my $this = shift;
    my $change = shift;

    if ($change < 0)
    {
	# Change the canvasheight, so we can fit in the searchline.
	$this->{-sh}--;
	$this->{-yscrpos}++
	    if ($this->{-ypos}-$this->{-yscrpos} == $this->canvasheight);
    }
    elsif ($change > 0)
    {
	# Restore the canvasheight.
	$this->{-sh}++;
	my $inscreen = ($this->canvasheight 
                     - ($this->number_of_lines 
                     - $this->{-yscrpos}));
	while ($this->{-yscrpos} > 0 and 
	       $inscreen < $this->canvasheight)
        {
	    $this->{-yscrpos}--;
	    $inscreen = ($this->canvasheight 
                      - ($this->number_of_lines 
                      - $this->{-yscrpos}));
	}
    }

    $this->{-search_highlight} = undef;
    $this->layout_content();
}

sub search_get($$;)
{
    my $this      = shift;
    my $query     = shift;
    my $direction = shift || +1;

    my $startpos = $this->{-ypos};
    my $offset = 0;
    my $wrapped = 0;
    for (;;)
    {
	# Find the line position to match.
	$offset += $direction;
	my $newpos = $this->{-ypos} + $offset;

        my $last_idx = $this->number_of_lines - 1;

	# Beyond limits?
	if ($newpos < 0) 
	{
	    $newpos = $last_idx;
	    $offset = $newpos - $this->{-ypos};
	    $wrapped = 1;
        }
        
	if ($newpos > $last_idx) 
        {
	    $newpos = 0;
            $offset = $newpos - $this->{-ypos};
            $wrapped = 1;
	}

        # Nothing found?
        return (undef,undef) if $newpos == $startpos;

        if ($this->getline_at_ypos($newpos) =~ /\Q$query/i)
        {
	    $this->{-ypos} = $newpos;
            $this->{-search_highlight} = $newpos;
	    $startpos = $newpos;
	    $this->layout_content;
	    $this->draw(1);
	    return $newpos, $wrapped;
	    $wrapped = 0;
	}
    }
}



1;


=pod

=head1 NAME

Curses::UI::Searchable - Add 'less'-like search abilities to a widget

=head1 CLASS HIERARCHY

 Curses::UI::Searchable - base class


=head1 SYNOPSIS

    package MyWidget;

    use Curses::UI::Searchable;
    use vars qw(@ISA);
    @ISA = qw(Curses::UI::Searchable);

    ....

    sub new () {
        # Create class instance $this.
        ....

        $this->set_routine('search-forward', \&search_forward);
        $this->set_binding('search-forward', '/');
        $this->set_routine('search-backward', \&search_backward);
        $this->set_binding('search-backward', '?');
    }

    sub layout_content() {
        my $this = shift;

        # Layout your widget's content.
        ....

        return $this;
    }

    sub number_of_lines() {
        my $this = shift;

        # Return the number of lines in
        # the widget's content.
        return ....
    }

    sub getline_at_ypos($;) {
        my $this = shift;
        my $ypos = shift; 

        # Return the content on the line 
        # where ypos = $ypos
        return ....
    }


=head1 DESCRIPTION

Using Curses::UI::Searchable, you can add 'less'-like
search capabilities to your widget. 

To make your widget searchable using this class,
your widget should meet the following requirements:

=over 4

=item * B<make it a descendant of Curses::UI::Searchable>

All methods for searching are in Curses::UI::Searchable.
By making your class a descendant of this class, these
methods are automatically inherited.

=item * B<-ypos data member>

The current vertical position in the widget should be
identified by $this->{-ypos}. This y-position is the
index of the line of content. Here's an example for 
a Listbox widget.

 -ypos
   |
   v
       +------+
   0   |One   |
   1   |Two   |
   2   |Three |
       +------+

=item * B<method: number_of_lines ( )>

Your widget class should have a method B<number_of_lines>,
which returns the total number of lines in the widget's 
content. So in the example above, this method would
return the value 3.

=item * B<method: getline_at_ypos ( YPOS )>

Your widget class should have a method B<getline_at_ypos>,
which returns the line of content at -ypos YPOS.
So in the example above, this method would return
the value "Two" for YPOS = 1.

=item * B<method: layout_content ( )>

The search routines will set the -ypos of your widget if a
match is found for the given search string. Your B<layout_content>
routine should make sure that the line of content at -ypos
will be made visible if the B<draw> method is called.

=item * B<method: draw ( )> 

If the search routines find a match, $this->{-search_highlight}
will be set to the -ypos for the line on which the match
was found. If no match was found $this->{-search_highlight}
will be undefined. If you want a matching line to be highlighted, 
in your widget, you can use this data member to do so
(an example of a widget that uses this option is the 
L<Curses::UI::TextViewer|Curses::UI::TextViewer> widget).

=item * B<bindings for searchroutines>

There are two search routines. These are B<search_forward> and
B<search_backward>. These have to be called in order to 
display the search prompt. The best way to do this is by
creating bindings for them. Here's an example which will
make '/' a forward search and '?' a backward search:

    $this->set_routine('search-forward'  , \&search_forward);
    $this->set_binding('search-forward'  , '/');
    $this->set_routine('search-backward' , \&search_backward);
    $this->set_binding('search-backward' , '?');

=back



=head1 SEE ALSO

L<Curses::UI|Curses::UI>, 




=head1 AUTHOR

Copyright (c) 2001-2002 Maurice Makaay. All rights reserved.

Maintained by Marcus Thiesen (marcus@cpan.thiesenweb.de)


This package is free software and is provided "as is" without express
or implied warranty. It may be used, redistributed and/or modified
under the same terms as perl itself.

