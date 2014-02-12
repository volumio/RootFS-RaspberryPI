# ----------------------------------------------------------------------
# Curses::UI::Common
#
# (c) 2001-2002 by Maurice Makaay. All rights reserved.
# (c) 2003-2005 by Marcus Thiesen et al.
# This file is part of Curses::UI. Curses::UI is free software.
# You can redistribute it and/or modify it under the same terms
# as perl itself.
#
# Currently maintained by Marcus Thiesen
# e-mail: marcus@cpan.thiesenweb.de
# ----------------------------------------------------------------------

# TODO: fix dox

package Curses::UI::Common;

use strict;
use Term::ReadKey;
use Curses;
require Exporter;

use vars qw(
    @ISA 
    @EXPORT_OK     
    @EXPORT 
    $VERSION 
); 

$VERSION = '1.10';

@ISA = qw(
    Exporter
);
    
@EXPORT = qw(
    keys_to_lowercase
    text_wrap
    text_draw
    text_length
    text_chop
    scrlength
    split_to_lines
    text_dimension
    CUI_ESCAPE       CUI_SPACE      CUI_TAB
    WORDWRAP         NO_WORDWRAP
);

# ----------------------------------------------------------------------
# Misc. routines
# ----------------------------------------------------------------------

sub parent()
{
    my $this = shift;
    $this->{-parent};
}

sub root()
{
    my $this = shift;
    my $root = $this;
    while (defined $root->{-parent}) {
        $root = $root->{-parent};
    }
    return $root;
}

sub accessor($;$)
{
    my $this  = shift;
    my $key   = shift;
    my $value = shift;

    $this->{$key} = $value if defined $value;
    return $this->{$key};
}

sub keys_to_lowercase($;)
{
    my $hash = shift;

    my $copy = {%$hash};
    while (my ($k,$v) = each %$copy) {
        $hash->{lc $k} = $v;
    }

    return $hash;
}

# ----------------------------------------------------------------------
# Text processing
# ----------------------------------------------------------------------

sub split_to_lines($;)
{
    # Make $this->split_to_lines() possible.
    shift if ref $_[0];
    my $text = shift;

    # Break up the text in lines. IHATEBUGS is
    # because a split with /\n/ on "\n\n\n" would
    # return zero result :-(
    my @lines = split /\n/, $text . "IHATEBUGS";
    $lines[-1] =~ s/IHATEBUGS$//g;
    
    return \@lines;
}

sub scrlength($;)
{
    # Make $this->scrlength() possible.
    shift if ref $_[0];
    my $line = shift;

    return 0 unless defined $line; 

    my $scrlength = 0;
    for (my $i=0; $i < length($line); $i++)    
    {
        my $chr = substr($line, $i, 1);
        $scrlength++;
        if ($chr eq "\t") {
            while ($scrlength%8) {
                $scrlength++;
            }
        }
    }
    return $scrlength;    
}

# Contstants for text_wrap()
sub NO_WORDWRAP() { 1 }
sub WORDWRAP()    { 0 }

sub text_wrap($$;)
{
    # Make $this->text_wrap() possible.
    shift if ref $_[0];
    my ($line, $maxlen, $wordwrap) = @_;
    $wordwrap = WORDWRAP unless defined $wordwrap;
    $maxlen = int $maxlen;
    
    return [""] if $line eq '';

    my @wrapped = ();
    my $len = 0;
    my $wrap = '';

    # Special wrapping is needed if the line contains tab
    # characters. These should be expanded to the TAB-stops.
    if ($line =~ /\t/)
    {
        CHAR: for (my $i = 0; $i <= length($line); $i++)
        {
            my $nextchar = substr($line, $i, 1);

            # Find the length of the string in case the
            # next character is added.
            my $newlen = $len + 1;
            if ($nextchar eq "\t") { while($newlen%8) { $newlen++ } }

            # Would that go beyond the end of the available width?
            if ($newlen > $maxlen)
            {
                if ($wordwrap == WORDWRAP 
                    and $wrap =~ /^(.*)([\s])(\S+)$/)
		{
                    push @wrapped, $1 . $2;
                    $wrap = $3;
                    $len = scrlength($wrap) + 1;
                } else {
                    $len = 1;
                    push @wrapped, $wrap;
                    $wrap = '';
                }
            } else {
                $len = $newlen;
            }
            $wrap .= $nextchar;
        }
        push @wrapped, $wrap if defined $wrap;

    # No tab characters in the line? Then life gets a bit easier. We can 
    # process large chunks at once.
    } else {
        my $idx = 0;

        # Line shorter than allowed? Then return immediately.
        return [$line] if length($line) < $maxlen;
        return ["internal wrap error: wraplength undefined"] 
            unless defined $maxlen;

        CHUNK: while ($idx < length($line))
        {
            my $next = substr($line, $idx, $maxlen);
            if (length($next) < $maxlen)
            {
                push @wrapped, $next;
                last CHUNK;
            }
            elsif ($wordwrap == WORDWRAP)
            {
                my $space_idx = rindex($next, " ");
                if ($space_idx == -1 or $space_idx == 0)
                {
                    push @wrapped, $next;
                    $idx += $maxlen;
                } else {
                    push @wrapped, substr($next, 0, $space_idx + 1);
                    $idx += $space_idx + 1;
                }
            } else {
                push @wrapped, $next;
                $idx += $maxlen;
            }    
        }
    }
        
    return \@wrapped;
}

sub text_tokenize {
    my ($text) = @_;

    my @tokens = ();
    while ($text ne '') {
        if ($text =~ m/^<\/?[a-zA-Z0-9_]+>/s) {
            push(@tokens, $&);
            $text = $';
        }
        elsif ($text =~ m/^.+?(?=<\/?[a-zA-Z0-9_]+>)/s) {
            push(@tokens, $&);
            $text = $';
        }
        else {
            push(@tokens, $text);
            last;
        }
    }
    return @tokens;
}

sub text_draw($$;)
{
    my $this = shift;
    my ($y, $x, $text) = @_;

    if ($this->{-htmltext}) {
        my @tokens = &text_tokenize($text);
        foreach my $token (@tokens) {
            if ($token =~ m/^<(standout|reverse|bold|underline|blink|dim)>$/s) {
                my $type = $1;
                if    ($type eq 'standout')  { $this->{-canvasscr}->attron(A_STANDOUT);  }
                elsif ($type eq 'reverse')   { $this->{-canvasscr}->attron(A_REVERSE);   }
                elsif ($type eq 'bold')      { $this->{-canvasscr}->attron(A_BOLD);      }
                elsif ($type eq 'underline') { $this->{-canvasscr}->attron(A_UNDERLINE); }
                elsif ($type eq 'blink')     { $this->{-canvasscr}->attron(A_BLINK);     }
                elsif ($type eq 'dim')       { $this->{-canvasscr}->attron(A_DIM);       }
            } elsif ($token =~ m/^<\/(standout|reverse|bold|underline|blink|dim)>$/s) {
                my $type = $1;
                if    ($type eq 'standout')  { $this->{-canvasscr}->attroff(A_STANDOUT);  }
                elsif ($type eq 'reverse')   { $this->{-canvasscr}->attroff(A_REVERSE);   }
                elsif ($type eq 'bold')      { $this->{-canvasscr}->attroff(A_BOLD);      }
                elsif ($type eq 'underline') { $this->{-canvasscr}->attroff(A_UNDERLINE); }
                elsif ($type eq 'blink')     { $this->{-canvasscr}->attroff(A_BLINK);     }
                elsif ($type eq 'dim')       { $this->{-canvasscr}->attroff(A_DIM);       }
		# Tags: (see, man 5 terminfo)
		#   |  <4_ACS_VLINE>  --  Vertical line (4 items).
		#   -- <5_ACS_HLINE>  --  Horizontal line (5 items).
		#   `  <12_ACS_TTEE>  --  Tee pointing down (12 items).
		#   ~  <ACS_BTEE>     --  Tee pointing up (1 item).
		#   +  <ACS_PLUS>     --  Large plus or crossover (1 item).
		# ------------------------------------------------------------------
	    } elsif ($token =~ m/^<(\d*)_?(ACS_HLINE|ACS_VLINE|ACS_TTEE|ACS_BTEE|ACS_PLUS)>$/s) {
		no strict 'refs';
		my $scrlen = ($1 || 1);
		my $type = &{ $2 };
		$this->{-canvasscr}->hline( $y, $x, $type, $scrlen );
		$x += $scrlen;
	    } else {
                $this->{-canvasscr}->addstr($y, $x, $token);
                $x += length($token);
            }
        }
    }
    else {
        $this->{-canvasscr}->addstr($y, $x, $text);
    }
}

sub text_length {
    my $this = shift;
    my ($text) = @_;
    
    my $length = 0;
    if ($this->{-htmltext}) {
        my @tokens = &text_tokenize($text);
        foreach my $token (@tokens) {
            if ($token !~ m/^<\/?(reverse|bold|underline|blink|dim)>$/s) {
                $length += length($token);
            }
        }
    }
    else {
        $length = length($text);
    }
    return $length;
}

sub text_chop {
    my $this = shift;
    my ($text, $max_length) = @_;

    if ($this->{-htmltext}) {
        my @open = ();
        my @tokens = &text_tokenize($text);
        my $length = 0;
        $text = '';
        foreach my $token (@tokens) {
            if ($token =~ m/^<(\/?)(reverse|bold|underline|blink|dim)>/s) {
                my ($type, $name) = ($1, $2);
                if (defined($type) and $type eq '/') {
                    pop(@open);
                }
                else {
                    push(@open, $name);
                }
                $text .= $token;
            }
            else {
                $text .= $token;
                $length += length($token);
                if ($length > $max_length) {
                    $text = substr($text, 0, $max_length);
                    $text =~ s/.$/\$/;
                    while (defined($token = pop(@open))) {
                        $text .= "</$token>";
                    }
                    last;
                }
            }
        }
    }
    else {
        if (length($text) > $max_length) {    
            $text = substr($text, 0, $max_length);
        }
    }
    return $text;
}

sub text_dimension ($;)
{
    # Make $this->text_wrap() possible.
    shift if ref $_[0];
    my $text = shift;
    
    my $lines = split_to_lines($text);
    
    my $height = scalar @$lines;
    
    my $width = 0;
    foreach (@$lines)
    {
        my $l = length($_);
        $width = $l if $l > $width;
    }

    return ($width, $height);
}

# ----------------------------------------------------------------------
# Keyboard input
# ----------------------------------------------------------------------

# Constants:

# Keys that are not defined in curses.h, but which might come in handy.
sub CUI_ESCAPE()       { "\x1b" }
sub CUI_TAB()          { "\t"   }
sub CUI_SPACE()        { " "    }

# Make ascii representation of a key.
sub key_to_ascii($;)
{
    my $this = shift;
    my $key  = shift;

    if ($key eq CUI_ESCAPE()) {
	$key = '<Esc>';
    }
    # Control characters. Change them into something printable
    # via Curses' unctrl function.
    elsif ($key lt ' ' and $key ne "\n" and $key ne "\t") {
        $key = '<' . uc(unctrl($key)) . '>';
    }

    # Extended keys get translated into their names via Curses'
    # keyname function.
    elsif ($key =~ /^\d{2,}$/) {
        $key = '<' . uc(keyname($key)) . '>';
    }

    return $key;
}

# For the select() syscall in char_read().
my $rin = '';
my $fno = fileno(STDIN);
$fno = 0 unless $fno >= 0;
vec($rin, $fno ,  1) = 1;

sub char_read(;$)
{
    my $this = shift;
    my $blocktime = shift;

    # Initialize the toplevel window for 
    # reading a key.
    my $s = $this->root->{-canvasscr};
    noecho();
    raw();
    $s->keypad(1);

    # Read input on STDIN.
    my $key = '-1';
    $blocktime = undef if $blocktime < 0; # Wait infinite
    my $crin = $rin;
    $! = 0;
    my $found = select($crin, undef, undef, $blocktime);

    if ($found < 0 ) {
	print STDERR "DEBUG: get_key() -> select() -> $!\n"
	    if $Curses::UI::debug; 
    } elsif ($found) {
	$key = $s->getch();
    }

    return $key;
}

sub get_key(;$)
{
    my $this            = shift;
    my $blocktime       = shift || 0;

    my $key = $this->char_read($blocktime);

    # ------------------------------------ #
    #  Hacks for broken termcaps / curses  #
    # ------------------------------------ #

    $key = KEY_BACKSPACE if (
	ord($key) == 127 or 
	$key eq "\cH"
    );

    $key = KEY_DC if (
	$key eq "\c?" or 
	$key eq "\cD"
    );

    $key = KEY_ENTER if (
        $key eq "\n" or 
	$key eq "\cM"
    );

    # Catch ESCape sequences.  
    my $ESC = CUI_ESCAPE();
    if ($key eq $ESC) 
    { 
        $key .= $this->char_read(0);

        # Only ESC pressed?
        $key = $ESC if $key eq "${ESC}-1" 
                or $key eq "${ESC}${ESC}";
        return $key if $key eq $ESC;
        
        # Not only a single ESC? 
        # Then get extra keypresses.
        $key .= $this->char_read(0);
        while ($key =~ /\[\d+$/) {
            $key .= $this->char_read(0);
        }

        # Function keys on my Sun Solaris box. 
	# I have no idea of the portability of 
	# this stuff, but it works for me...
        if ($key =~ /\[(\d+)\~/)
        {
            my $digit = $1;
            if ($digit >= 11 and $digit <= 15) {
                $key = KEY_F($digit-10);
            } elsif ($digit >= 17 and $digit <= 21) {
                $key = KEY_F($digit-11);
            }
        }
        
        $key = KEY_HOME if (
            $key eq $ESC . "OH"  or 
	    $key eq $ESC . "[7~" or 
	    $key eq $ESC . "[1~"
        );

	$key = KEY_BTAB if (
	    $key eq $ESC . "OI"  or   # My xterm under solaris
	    $key eq $ESC . "[Z"       # My xterm under Redhat Linux
	);
    
        $key = KEY_DL if (
            $key eq $ESC . "[2K"
        );

        $key = KEY_END if (
	    $key eq $ESC . "OF"  or 
	    $key eq $ESC . "[4~"
        );

        $key = KEY_PPAGE if (
	    $key eq $ESC . "[5~"
        );

        $key = KEY_NPAGE if (
	    $key eq $ESC . "[6~"
        );
    }

    # ----------#
    # Debugging #
    # ----------#

    if ($Curses::UI::debug and $key ne "-1")
    {
        my $k = '';
        my @k = split //, $key;
        foreach (@k) { $k .= $this->key_to_ascii($_) }
        print STDERR "DEBUG: get_key() -> [$k]\n"
    }

    return $key;    
}

1;


=pod

=head1 NAME

Curses::UI::Common - Common methods for Curses::UI

=head1 CLASS HIERARCHY

 Curses::UI::Common - base class


=head1 SYNOPSIS

    package MyPackage;

    use Curses::UI::Common;
    use vars qw(@ISA);
    @ISA = qw(Curses::UI::Common);

=head1 DESCRIPTION

Curses::UI::Common is a collection of methods that is
shared between Curses::UI classes.




=head1 METHODS

=head2 Various methods

=over 4

=item * B<parent> ( )

Returns the data member $this->{B<-parent>}.

=item * B<root> ( )

Returns the topmost B<-parent> (the Curses::UI instance).

=item * B<delallwin> ( )

This method will walk through all the data members of the
class intance. Each data member that is a Curses::Window
descendant will be removed.

=item * B<accessor> ( NAME, [VALUE] )

If VALUE is set, the value for the data member $this->{NAME} 
will be changed. The method will return the current value for
data member $this->{NAME}.

=item * B<keys_to_lowercase> ( HASHREF )

All keys in the hash referred to by HASHREF will be 
converted to lower case.

=back


=head2 Text processing

=over 4

=item B<split_to_lines> ( TEXT )

This method will split TEXT into a list of separate lines.
It returns a reference to this list.

=item B<scrlength> ( LINE )

Returns the screenlength of the string LINE. The difference
with the perl function length() is that this method will
expand TAB characters. It is exported by this class and it may
be called as a stand-alone routine.

=item B<text_dimension> ( TEXT )

This method will return an array containing the width 
(the length of the longest line) and the height (the
number of lines) of the TEXT.

=item B<text_wrap> ( LINE, LENGTH, WORDWRAP ) 

=item B<WORDWRAP> ( )

=item B<NO_WORDWRAP> ( )

This method will wrap a line of text (LINE) to a 
given length (LENGTH). If the WORDWRAP argument is
true, wordwrap will be enabled (this is the default
for WORDWRAP). It will return a reference to a list
of wrapped lines. It is exported by this class and it may
be called as a stand-alone routine.

The B<WORDWRAP> and B<NO_WORDWRAP> routines will
return the correct value vor the WORDWRAP argument.
These routines are exported by this class.

Example:

    $this->text_wrap($line, 50, NO_WORDWRAP);

=back



=head2 Reading key input

=over 4

=item B<CUI_ESCAPE> ( )

=item B<CUI_TAB> ( )

=item B<CUI_SPACE> ( )

These are a couple of routines that are not defined by the
L<Curses|Curses> module, but which might be useful anyway. 
These routines are exported by this class.

=item B<get_key> ( BLOCKTIME, CURSOR )

This method will try to read a key from the keyboard.
It will return the key pressed or -1 if no key was 
pressed. It is exported by this class and it may
be called as a stand-alone routine.

The BLOCKTIME argument can be used to set
the curses halfdelay (the time to wait before the
routine decides that no key was pressed). BLOCKTIME is
given in tenths of seconds. The default is 0 (non-blocking
key read).

Example:

    my $key = $this->get_key(5)

=back



=head1 SEE ALSO

L<Curses::UI|Curses::UI>




=head1 AUTHOR

Copyright (c) 2001-2002 Maurice Makaay. All rights reserved.

Maintained by Marcus Thiesen (marcus@cpan.thiesenweb.de)


This package is free software and is provided "as is" without express
or implied warranty. It may be used, redistributed and/or modified
under the same terms as perl itself.

