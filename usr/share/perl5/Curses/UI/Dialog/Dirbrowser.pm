# ----------------------------------------------------------------------
# Curses::UI::Dialog::Dirbrowser
# (C) 2003 by Roberto De Leo based on work
# (c) 2001-2002 by Maurice Makaay. All rights reserved.
# This file is part of Curses::UI. Curses::UI is free software.
# You can redistribute it and/or modify it under the same terms
# as perl itself.
#
# Currently maintained by Marcus Thiesen
# e-mail: marcus@cpan.thiesenweb.de
# ----------------------------------------------------------------------

package Curses::UI::Dialog::Dirbrowser;

use strict;
use Curses;
use Curses::UI::Window;
use Curses::UI::Common;
use Cwd;

use vars qw(
    $VERSION 
    @ISA
);

@ISA = qw(
    Curses::UI::Window
    Curses::UI::Common
);

$VERSION = '1.0';

sub new ()
{
    my $class = shift;

    my %userargs = @_;
    keys_to_lowercase(\%userargs);

    my %args = ( 
        -title          => undef,
        -path           => undef,
	-bg             => -1,
        -fg             => -1,

        %userargs,

        -border         => 1,
        -centered       => 1,
        -titleinverse   => 0,
        -ipad           => 1,
        -selected_cache => {},
    );

    # Does -path not contain a path? Then use the 
    # current working directory.
    if (not defined $args{-path} or $args{-path} =~ /^\s*$/) {
        $args{-path} = cwd;
    }

    my $this = $class->SUPER::new(%args);
    $this->layout();

    my $l = $this->root->lang;

    # Start at home? Goto the homedirectory of the current user
    # if the -path is not defined.
    $this->goto_homedirectory unless defined $this->{-path};

    my $buttons = $this->add(
        'buttons', 'Buttonbox',
        -y               => -1,
        -x               => 0,
        -width           => undef,
        -buttonalignment => 'middle',
        -buttons         => [ 'ok', 'cancel' ],
        -bg              => $this->{-bg},
        -fg              => $this->{-fg},
    );

    # Let the window in which the buttons are loose focus
    # if a button is pressed.
    $buttons->set_routine( 'press-button', \&press_button_callback );

    my $one_up = $l->get('file_dirup');
    my $dirbrowser = $this->add(
        'dirbrowser', 'Listbox',
        -y               => 0,
        -border          => 1,
        -width           => $this->canvaswidth - 2,
        -padbottom       => 6,
        -values          => [],
        -vscrollbar      => 1,
        -labels          => { '..' => ".. ($one_up)" },
        -bg              => $this->{-bg},
        -fg              => $this->{-fg},
        -bbg              => $this->{-bg},
        -bfg              => $this->{-fg},

    );

    $dirbrowser->set_routine('option-select',\&dirselect);
    $dirbrowser->set_routine('goto-homedirectory',\&select_homedirectory);
    $dirbrowser->set_binding('goto-homedirectory', '~');

        # Get language specific data.
    my $l_path = $l->get('file_path');
    my $l_mask = $l->get('file_mask');
    my $l_file = $l->get('file_file');
    my $l_len  = $l->get('file_labelsize');

    my $labeloffset = 1;
    my $textoffset = $l_len + 2;

    $this->add(
        'pathlabel', 'Label',
        -x              => $labeloffset, 
        -y              => $this->canvasheight - 5, 
        -text           => $l_path,
        -bg              => $this->{-bg},
        -fg              => $this->{-fg},
    );
    $this->add(
        'pathvalue', 'Label',
        -x              => $textoffset,
        -y              => $this->canvasheight - 5, 
        -width          => $this->canvaswidth - 6,
        -text           => $this->{-path},
        -bg              => $this->{-bg},
        -fg              => $this->{-fg},
    );

    $this->set_binding(sub{
        my $this = shift;
        $this->getobj('buttons')->{-selected} = 1;
        $this->loose_focus;
    }, CUI_ESCAPE);

    $this->layout();
    $this->get_dir;

    return bless $this, $class;
}

sub layout()
{
    my $this = shift;

    my $w = 50;
    my $h = 18;
    $this->{-width} = $w,
    $this->{-height} = $h,

    $this->SUPER::layout() or return;

    return $this;
}

sub get_dir()
{
    my $this = shift;

    # Get pathvalue, filevalue, dirbrowser and filebrowser objects.
    my $pv = $this->getobj('pathvalue');
    my $db = $this->getobj('dirbrowser');

    my $path = $pv->text;

    # Resolve path.
    $path =~ s|/+|/|g;
    my @path = split /\//, $path;
    my @resolved = ();
    foreach my $dir (@path)
    {
        if ($dir eq '.') { next }
        elsif ($dir eq '..') { pop @resolved if @resolved }
        else { push @resolved, $dir }
    }
    $path = join "/", @resolved;
    
    # Catch totally bogus paths.
    if (not -d $path) { $path = "/" }
    
    $pv->text($path);
    
    my @dirs = ();
    unless (opendir D, $path)
    {
        my $l = $this->root->lang();
        my $error = $l->get('file_err_opendir_pre')
                  . $path
                  . $l->get('file_err_opendir_post')
                  . ":\n$!";
        $this->root->error($error);
        return;
    }
    foreach my $f (sort readdir D)
    {
        next if $f =~ /^\.$|^\.\.$/;
        next if $f =~ /^\./ and not $this->{-show_hidden};
        push @dirs,  $f if -d "$path/$f";
    }
    closedir D;

    unshift @dirs, ".." if $path ne '/';

    $db->values(\@dirs);
    $db->{-ypos} = $this->{-selected_cache}->{$path};
    $db->{-ypos} = 0 unless defined $db->{-ypos};
    $db->{-selected} = undef;
    $db->layout_content->draw(1);

    return $this;
}

# Set $this->{-path} to the homedirectory of the current user.
sub goto_homedirectory()
{
    my $this = shift;

    my @pw = getpwuid($>);
    if (@pw) {
        if (-d $pw[7]) {
	    $this->{-path} = $pw[7];
        } else {
	    $this->{-path} = '/';
	    $this->root->error("Homedirectory $pw[7] not found");
	    return;
        }
    } else {
        $this->{-path} = '/';
        $this->root->error("Can't find a passwd entry for uid $>");
        return;
    }

    return $this;
}

sub select_homedirectory()
{
    my $b = shift; # dir-/filebrowser
    my $this = $b->parent;
    my $pv = $this->getobj('pathvalue');

    $this->goto_homedirectory or return $b;
    $pv->text($this->{-path});
    $this->get_dir;

    return $b;
}

sub dirselect()
{
    my $db = shift; # dirbrowser
    my $this = $db->parent;
    my $pv = $this->getobj('pathvalue');

    # Find the new path.
    my $add = $db->values->[$db->{-ypos}];
    my $savepath = $pv->text;
    $this->{-selected_cache}->{$savepath} = $db->{-ypos};
    $pv->text("/$savepath/$add");

    # Get the selected directory.
    unless ($this->get_dir) {
        $pv->text($savepath);
    }

    return $db;
}

sub maskbox_onchange()
{
    my $maskbox = shift; 
    my $this = $maskbox->parent;
    $this->{-activemask} = $maskbox->get;
    $this->get_dir;
    return $maskbox;
}

sub draw(;$)
{
    my $this = shift;
    my $no_doupdate = shift || 0;

    # Draw Window
    $this->SUPER::draw(1) or return $this;

    $this->{-canvasscr}->noutrefresh();
    doupdate() unless $no_doupdate;

    return $this;
}

sub get()
{
    my $this = shift;
    if ($this->getobj('buttons')->get) {
        my $file = $this->getobj('pathvalue')->get;
        $file =~ s|/+|/|g;
        return $file;
    } else {
        return;
    }
}

sub press_button_callback()
{
    my $buttons = shift;
    my $this = $buttons->parent;
    my $file = $this->get;

    my $ok_pressed = $buttons->get;
    if ($ok_pressed and $file =~ m|/$|) {
        my $l = $this->root->lang;
        $this->root->error($l->get('file_err_nofileselected'));
        return;
    } else {
        $this->loose_focus;
    }
}

1;


=pod

=head1 NAME

Curses::UI::Dialog::Dirbrowser - Create and manipulate filebrowser dialogs

=head1 CLASS HIERARCHY

 Curses::UI::Widget
    |
    +----Curses::UI::Container
            |
            +----Curses::UI::Window
                    |
                    +----Curses::UI::Dialog::Dirbrowser



=head1 SYNOPSIS

    use Curses::UI;
    my $cui = new Curses::UI;
    my $win = $cui->add('window_id', 'Window');

    # The hard way.
    # -------------
    my $dialog = $win->add(
        'mydialog', 'Dialog::Dirbrowser'
    );
    $dialog->focus;
    my $file = $dialog->get();
    $win->delete('mydialog');

    # The easy way (see Curses::UI documentation).
    # --------------------------------------------
    $file = $cui->filebrowser();
    $file = $cui->loadfilebrowser();
    $file = $cui->savefilebrowser();




=head1 DESCRIPTION

Curses::UI::Dialog::Dirbrowser is a dirbrowser dialog. 
This type of dialog can be used to select a directory, anywhere
on the filesystem.

See exampes/demo-Curses::UI::Dialog::Dirbrowser in the 
distribution for a short demo.



=head1 OPTIONS

=over 4

=item * B<-title> < TEXT >

Set the title of the dialog window to TEXT.

=item * B<-path> < PATH >

Set the path to start with to PATH. If this path
does not exist, the filebrowser will start in the
rootdirectory.

=item * B<-show_hidden> < BOOLEAN >

If BOOLEAN has a true value, hidden files (the filename
starts with a dot) will also be shown. By default this
option is set to false.

=back




=head1 METHODS

=over 4

=item * B<new> ( OPTIONS )

=item * B<layout> ( )

=item * B<draw> ( BOOLEAN )

=item * B<focus> ( )

These are standard methods. See L<Curses::UI::Container|Curses::UI::Container> 
for an explanation of these.

=item * B<get> ( )

This method will return the complete path to the file that was
selected using the filebrowser. If no file was selected, this
method will return an undefined value.

=back



=head1 SPECIAL BINDINGS

=over 4

=item * B<escape>

This will invoke the cancel button, so the filebrowser widget
returns without selecting any file.

=item * B<~>

If the directory- or filelistbox of the dialog window has the
focus and the tilde (~) button is pressed, the filebrowser
will chdir to the homedirectory of the current user.

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

