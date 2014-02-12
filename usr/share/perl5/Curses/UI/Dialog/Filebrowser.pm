# ----------------------------------------------------------------------
# Curses::UI::Dialog::Filebrowser
#
# (c) 2001-2002 by Maurice Makaay. All rights reserved.
# This file is part of Curses::UI. Curses::UI is free software.
# You can redistribute it and/or modify it under the same terms
# as perl itself.
#
# Currently maintained by Marcus Thiesen
# e-mail: marcus@cpan.thiesenweb.de
# ----------------------------------------------------------------------

package Curses::UI::Dialog::Filebrowser;

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

$VERSION = '1.10';

sub new ()
{
    my $class = shift;

    my %userargs = @_;
    keys_to_lowercase(\%userargs);

    my %args = ( 
        -title          => undef,
        -path           => undef,    
        -file           => '', 
        -show_hidden    => 0,
        -mask           => undef,
        -mask_selected  => 0,
        -editfilename   => 0,
	-bg             => -1,
        -fg             => -1,

        %userargs,

        -border         => 1,
        -centered       => 1,
        -titleinverse   => 0,
        -ipad           => 1,
        -selected_cache => {},
    );

    # Does -file contain a path? Then do some splitting.
    if (defined $args{-file} and $args{-file} =~ m|/|) 
    {
        my $file = "";
        my $path = "";

        my @path = split /\//, $args{-file};
        $file = pop @path;
        if (@path) {
            $path = join "/", @path;
        }
        $args{-path} = $path;
        $args{-file} = $file;
    }

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
        -buttonalignment => 'right',
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
        -width           => int(($this->canvaswidth - 3)/2),
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
    
    my $filebrowser = $this->add(
        'filebrowser', 'Listbox',
        -y               => 0,
        -x               => $this->getobj('dirbrowser')->width + 1,
        -border          => 1,
        -padbottom       => 6,
        -vscrollbar      => 1,
        -values          => ["info.txt","passwd"],
        -bg              => $this->{-bg},
        -fg              => $this->{-fg},
        -bbg              => $this->{-bg},
        -bfg              => $this->{-fg},
    );    

    $filebrowser->set_routine('option-select', \&fileselect);
    $filebrowser->set_routine('goto-homedirectory',\&select_homedirectory);
    $filebrowser->set_binding('goto-homedirectory', '~');

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

    $this->add(
        'filelabel', 'Label',
        -x              => $labeloffset, 
        -y              => $this->canvasheight - 4, 
        -text           => $l_file,
        -bg              => $this->{-bg},
        -fg              => $this->{-fg},
    );
    
    if ($this->{-editfilename})
    {
        $this->add(
            'filevalue', 'TextEntry',
            -x          => $textoffset,
            -y          => $this->canvasheight - 4, 
            -text       => $this->{-file},
            -width      => 32,
            -showlines  => 1,
            -border     => 0,
            -sbborder   => 0,
            -regexp     => '/^[^\/]*$/',
	    -bg         => $this->{-bg},
            -fg         => $this->{-fg},

        );
    } else {
        $this->add(
		   'filevalue', 'Label',
		   -x          => $textoffset, 
		   -y          => $this->canvasheight - 4, 
		   -text       => $this->{-file},
		   -width      => $this->canvaswidth - 6,
		   -bg         => $this->{-bg},
		   -fg         => $this->{-fg},
		   );
    }

    if (defined $this->{-mask} and ref $this->{-mask} eq 'ARRAY') 
    {
        $this->add(
		   'masklabel', 'Label',
		   -x          => $labeloffset,
		   -y          => $this->canvasheight - 2,
		   -text       => $l_mask,
		   -bg              => $this->{-bg},
		   -fg              => $this->{-fg},

		   );

        my @values = ();
        my %labels = ();
        my $i =0;
        foreach my $mask (@{$this->{-mask}})
        {
            push @values, $mask->[0];
            $labels{$mask->[0]} = $mask->[1];
        }

        my $maskbox = $this->add(
            'maskbox', 'Popupmenu',
            -x          => $textoffset,
            -y          => $this->canvasheight - 2,
            -values     => \@values,
            -labels     => \%labels,
            -selected   => $this->{-mask_selected},
            -onchange   => \&maskbox_onchange,
            -bg         => $this->{-bg},
	    -fg         => $this->{-fg},

        );
        $this->{-activemask} = $maskbox->get;
    }

    $this->set_binding(sub{
        my $this = shift;
        $this->getobj('buttons')->{-selected} = 1;
        $this->loose_focus;
    }, CUI_ESCAPE);

    $this->layout();
    $this->get_dir;

    if ($this->{-editfilename}) {
        $this->getobj('filevalue')->focus;
    } else {
        $this->getobj('filebrowser')->focus;
    }

    return bless $this, $class;
}

sub layout()
{
    my $this = shift;

    my $w = 60;
    my $h = 18;
    $h += 2 if defined $this->{-mask};
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
    my $fb = $this->getobj('filebrowser');

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
    my @files = ();
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
        if (-f "$path/$f")
        {
            $this->{-activemask} = '.' 
                unless defined $this->{-activemask};
            push @files, $f if $f =~ /$this->{-activemask}/i;
        }
    }
    closedir D;

    unshift @dirs, ".." if $path ne '/';
    
    $db->values(\@dirs);
    $db->{-ypos} = $this->{-selected_cache}->{$path};
    $db->{-ypos} = 0 unless defined $db->{-ypos};
    $db->{-selected} = undef;
    $db->layout_content->draw(1);

    $fb->values(\@files);
    $fb->{-ypos} = $fb->{-yscrpos} = 0;
    $fb->layout_content->draw(1);
    
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
    my $fv = $this->getobj('filevalue');
    my $pv = $this->getobj('pathvalue');

    # Find the new path.
    my $add = $db->values->[$db->{-ypos}];
    my $savepath = $pv->text;
    $this->{-selected_cache}->{$savepath} = $db->{-ypos};
    $pv->text("/$savepath/$add");

    # Clear the filename field if the filename
    # may not be edited.
    $fv->text('') unless $this->{-editfilename};

    # Get the selected directory.
    unless ($this->get_dir) {
        $pv->text($savepath);
    }

    return $db;
}

sub fileselect()
{
    my $filebrowser = shift;
    my $this = $filebrowser->parent;

    my $selected = $filebrowser->{-ypos};
    
    my $file = $filebrowser->values->[$selected];

    if (defined $file) {
	$this->{-file} = $file;
	$this->getobj('filevalue')->text($file);
    } 
# TODO: find out if it is done by mouseclick. If yes, then do 
# not change focus.
# Doubleclick may also select the file.
#    $this->getobj('buttons')->focus;
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
        my $file = $this->getobj('pathvalue')->get
                 . "/" 
                 . $this->getobj('filevalue')->get;
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

Curses::UI::Dialog::Filebrowser - Create and manipulate filebrowser dialogs

=head1 CLASS HIERARCHY

 Curses::UI::Widget
    |
    +----Curses::UI::Container
            |
            +----Curses::UI::Window
                    |
                    +----Curses::UI::Dialog::Filebrowser



=head1 SYNOPSIS

    use Curses::UI;
    my $cui = new Curses::UI;
    my $win = $cui->add('window_id', 'Window');

    # The hard way.
    # -------------
    my $dialog = $win->add(
        'mydialog', 'Dialog::Filebrowser'
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

Curses::UI::Dialog::Filebrowser is a filebrowser dialog. 
This type of dialog can be used to select a file, anywhere
on the filesystem.

See exampes/demo-Curses::UI::Dialog::Filebrowser in the 
distribution for a short demo.



=head1 OPTIONS

=over 4

=item * B<-title> < TEXT >

Set the title of the dialog window to TEXT.

=item * B<-path> < PATH >

Set the path to start with to PATH. If this path
does not exist, the filebrowser will start in the
rootdirectory.

=item * B<-file> < FILE >

Set the filename to start with to FILE.

=item * B<-editfilename> < BOOLEAN >

If BOOLEAN has a true value, the user may edit
the filename. This is for example useful for a 
filebrowser that is used to select a filename to 
save to. By default this option is set to false.

=item * B<-show_hidden> < BOOLEAN >

If BOOLEAN has a true value, hidden files (the filename
starts with a dot) will also be shown. By default this
option is set to false.

=item * B<-mask> < ARRAYREF >

If B<-mask> is defined, a filemask popupbox will be added
to the filebrowser dialog window. This popupbox will filter
the list of files that is displayed, using a regular expression
(case insensitive). The ARRAYREF contains a list of array 
references. Each array reference has two elements: a regexp and 
a description. Here's an example B<-mask>:

    my $mask = [
        [ '.',        'All files (*)'       ],
        [ '\.txt$',   'Text files (*.txt)'  ]
        [ 'howto',    'HOWTO documentation' ],
        [ 'core',     'Core files'          ],
    ];    

=item * B<-mask_selected> < INDEX >

Normally the first mask in the list of masks will be made 
active upon creation of the filebrowser. If you want 
another mask to be active, use the B<-mask_selected>
option. Set this value to the index of the mask you want
to be active. For example: if you would want the "howto"
mask in the above example to be active, you would use 
the value 2 for B<-mask_selected>.

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

