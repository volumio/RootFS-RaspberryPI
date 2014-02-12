# ----------------------------------------------------------------------
# Curses::UI::Container
#
# (c) 2001-2002 by Maurice Makaay. All rights reserved.
# This file is part of Curses::UI. Curses::UI is free software.
# You can redistribute it and/or modify it under the same terms
# as perl itself.
#
# Currently maintained by Marcus Thiesen
# e-mail: marcus@cpan.thiesenweb.de
# ----------------------------------------------------------------------

# TODO: update dox

package Curses::UI::Container;

use Curses;
use Curses::UI::Widget;
use Curses::UI::Common;

use vars qw(
    @ISA 
    $VERSION
);

$VERSION = "1.11";

@ISA = qw(
    Curses::UI::Widget 
    Curses::UI::Common
);

# ----------------------------------------------------------------------
# Public interface
# ----------------------------------------------------------------------

# Create a new Container object.
sub new()
{
    my $class = shift;

    my %userargs = @_;
    keys_to_lowercase(\%userargs);

    my %args = (
        -releasefocus => 0,     # Allows the focus to be released to parent on end

        %userargs,

        -id2object    => undef, # Id to object mapping
        -object2id    => undef, # Object to id mapping
        -focusorder   => [],    # The order in which objects get focused
        -draworder    => [],    # The order in which objects get drawn
        -focus        => 0,     # Value init
    );

    my $this = $class->SUPER::new(%args);
}

DESTROY()
{
    my $this = shift;
    $this->SUPER::delete_subwindows();
}

# Add an object to the container
sub add($@)
{
    my $this = shift;
    my $id = shift;
    my $class = shift;
    my %args = @_;
    
    $this->root->fatalerror(
	"The object id \"$id\" is already in use!"
    ) if defined $id and  
         defined $this->{-id2object}->{$id};

    # If $id is not defined, create an auto-id.
    if (not defined $id) 
    {
        my $i = 0;
        my $id_pre = "__container_auto_id_";
        do { $id = $id_pre . $i++ } 
	    until (not defined $this->{-id2object}->{$id});
    }

    # Make it possible to specify WidgetType instead of
    # Curses::UI::WidgetType.
    $class = "Curses::UI::$class" 
        if $class !~ /\:\:/ or 
	   $class =~ /^Dialog\:\:[^\:]+$/;

    # Create a new object of the wanted class.
    $this->root->usemodule($class);
    my $object = $class->new(
        %args,
        -parent => $this
    );

    # Store the object.
    $this->{-id2object}->{$id} = $object;
    $this->{-object2id}->{$object} = $id; 

    # begin by AGX: inherith parent background color!
    if (defined( $object->{-bg} )) {
    	if ($object->{-bg} eq "-1" ) {
    		if (defined( $this->{-bg} )) {
    			$object->{-bg} = $this->{-bg};
		}
	}
    }
    # end by AGX
    # begin by AGX: inherith parent foreground color!
    if (defined( $object->{-fg} )) {
    	if ($object->{-fg} eq "-1" ) {
    		if (defined( $this->{-fg} )) {
    			$object->{-fg} = $this->{-fg};
		}
	}
    }
    # end by AGX

    # Automatically create a focus- and draworder (last added = 
    # last focus/draw). This can be overriden by the 
    # set_focusorder() and set_draworder() functions.
    push @{$this->{-focusorder}}, $id;
    unshift @{$this->{-draworder}}, $id;

    # Return the created object.
    return $object;
}

# Delete the contained object with id=$id from the Container.
sub delete(;$)
{
    my $this = shift;
    my $id = shift;

    return $this unless defined $this->{-id2object}->{$id};

    # Delete curses subwindows.
    $this->{-id2object}->{$id}->delete_subwindows(); 
   
    # Destroy object.
    undef $this->{-object2id}->{$this->{-id2object}->{$id}};
    delete $this->{-object2id}->{$this->{-id2object}->{$id}};
    undef $this->{-id2object}->{$id};
    delete $this->{-id2object}->{$id};

    foreach my $param (qw(-focusorder -draworder))
    {
        my ($current_focused_id, $new_focused_id, $new_focused_obj);
        $current_focused_id = $this->{-draworder}->[-1];
        my $idx = $this->base_id2idx($param, $id);
        splice(@{$this->{$param}}, $idx, 1)
            if defined $idx;

        #did the deleted id had the focus?
        if ($current_focused_id eq $id)
        {
            $new_focused_id = $this->{-draworder}->[-1];
            $new_focused_obj = $this->{-id2object}->{$new_focused_id}
                if $new_focused_id;
            $new_focused_obj->event_onfocus
                if $new_focused_obj;
        }
    }

    return $this;
}

sub delete_subwindows()
{
    my $this = shift;
    while (my ($id, $object) = each %{$this->{-id2object}}) {
        $object->delete_subwindows();
    }
    $this->SUPER::delete_subwindows();
    return $this;
}


# Draw the container and it's contained objects.
sub draw(;$)
{
    my $this = shift;
    my $no_doupdate = shift || 0;
    
    # Draw the Widget.
    $this->SUPER::draw(1) or return $this;
    
    # Draw all contained object.
    foreach my $id (@{$this->{-draworder}}) {
        $this->{-id2object}->{$id}->draw(1);
      }

    # Update the screen unless suppressed.
    doupdate() unless $no_doupdate;

    return $this;
}

sub layout()
{
    my $this = shift;
    $this->SUPER::layout() or return;
    $this->layout_contained_objects();
    return $this;    
}

sub layout_contained_objects()
{
    my $this = shift;

    # Layout all contained objects.
    foreach my $id (@{$this->{-draworder}})
    {
        my $obj = $this->{-id2object}->{$id};
        $obj->{-parent} = $this;
        $obj->layout();
	$obj->draw();
    }

    return $this;
}

# Look if there are objects of a certain kind in the container.
sub hasa($;)
{
    my $this = shift;
    my $class = shift;

    my $count = 0;
    while (my ($id,$obj) = each %{$this->{-id2object}}) {
        $count++ if ref $obj eq $class;
    }
    return $count;
}

sub window_is_ontop($;)
{
    my $this = shift;
    my $win = shift;

    # If we have a stack of no windows, return immediately.
    return undef if @{$this->{-draworder}} == 0;

    my $topwin = $this->{-draworder}->[-1];
    if (ref $win) { $topwin = $this->getobj($topwin) }

    return $topwin eq $win;
}

sub event_keypress($;)
{
    my $this = shift;
    my $key = shift;

    # Try to run the event on this widget. Return
    # unless the binding returns 'DELEGATE' which
    # means that this widget should try to delegate
    # the event to its contained object which has
    # the focus.
    # 
    my $return = $this->process_bindings($key);
    return $return 
        unless defined $return and 
                   $return eq 'DELEGATE';

    # Get the current focused object and send the 
    # keypress to it.
    $obj = $this->getfocusobj;
    if (defined $obj) {
	return $obj->event_keypress($key);
    } else {    
	return 'DELEGATE';
    }
}

sub focus_prev()
{
    my $this = shift;

    # Return without doing anything if we do not
    # have a focuslist.
    return $this unless @{$this->{-focusorder}};
                
    # Find the current focused object id.
    my $id = $this->{-draworder}->[-1];

    # Find the current focusorder index.
    my $idx = $this->focusorder_id2idx($id);

    my $circle_flag = 0;

    # Go to the previous object or wraparound.
    until ($circle_flag) {
	$idx--;
	if ($idx < 0) {
	    $idx = @{$this->{-focusorder}} - 1;
	    $circle_flag = 1;
	}
	my $new_obj = $this->getobj($this->{-focusorder}[$idx]);
	last if (defined $new_obj && $new_obj->focusable);
    }

    # Focus the previous object.    
    $this->focus($this->{-focusorder}->[$idx], undef, -1);
    if ( $circle_flag && $this->{-releasefocus} ) {
        $this->{-parent}->focus_prev;
    }
}

sub focus_next()
{
    my $this = shift;

    # Return without doing anything if we do not
    # have a focuslist.
    return $this unless @{$this->{-focusorder}};
                
    # Find the current focused object id.
    my $id = $this->{-draworder}->[-1];

    # Find the current focusorder index.
    my $idx = $this->focusorder_id2idx($id);

    # Go to the next object or wraparound.
    my $circle_flag = 0;
    until ($circle_flag) {
	$idx++;
	if ($idx >= scalar (@{$this->{-focusorder}}) ) {
	    $idx = 0;
	    $circle_flag = 1;
	}
	my $new_obj = $this->getobj($this->{-focusorder}[$idx]);
	last if (defined $new_obj && $new_obj->focusable);
    }
    
    # Focus the next object.    
    $this->focus($this->{-focusorder}->[$idx], undef, +1);
    #check if we have to release the focus
    if ( $circle_flag && $this->{-releasefocus} ) {
        $this->{-parent}->focus_next;
    }
}

sub focus(;$$$)
{
    my $this      = shift;
    my $focus_to  = shift;
    my $forced    = shift || 0;
    my $direction = shift || 1;

    # The direction in which to look for other objects
    # if this object is not focusable.
    $direction = ($direction < 0 ? -1 : 1);

    # Find the id for a object if the argument
    # is an object.
    my $new_id = ref $focus_to 
	       ? $this->{-object2id}->{$focus_to} 
	       : $focus_to;

    if ($forced and not defined $new_id) {
        $new_id = $this->{-draworder}->[-1]; 
    }

    # Do we need to change the focus inside the container?
    if (defined $new_id)
    {
        # Find the currently focused object.
        my $cur_id  = $this->{-draworder}->[-1];
        my $cur_obj = $this->{-id2object}->{$cur_id}; 
        
        # Find the new focused object.
        my $new_obj = $this->{-id2object}->{$new_id};
        $this->root->fatalerror(
	    "focus(): $this has no element with id='$new_id'" 
        ) unless defined $new_obj;

        # Can the new object be focused? If not, then
        # try to find the first next object that can
        # be focused.
        unless ($new_obj->focusable)
        {
            my $idx = $start_idx = $this->focusorder_id2idx($cur_id);

            undef $new_obj;
            undef $new_id;

            OBJECT: for(;;)
            {
                $idx += $direction;
                $idx = 0 if $idx > @{$this->{-focusorder}}-1;
                $idx = @{$this->{-focusorder}}-1 if $idx < 0;
                last if $idx == $start_idx;

                my $test_id  = $this->{-focusorder}->[$idx];
                my $test_obj = $this->{-id2object}->{$test_id};
                
                if ($test_obj->focusable)
                {
                    $new_id  = $test_id;
                    $new_obj = $test_obj;
                    last OBJECT 
                }

            } 
        }

        # Change the draworder if a focusable objects was found.
        if ($forced or defined $new_obj and $new_obj ne $cur_obj)
        {
            my $idx = $this->draworder_id2idx($new_id);
            my $move = splice(@{$this->{-draworder}}, $idx, 1);
            push @{$this->{-draworder}}, $move;

            unless ($new_obj->{-has_modal_focus}) {
		$cur_obj->event_onblur;
            }
	    $new_obj->event_onfocus;
        }
    }
   
    $this->SUPER::focus();
}

sub event_onfocus()
{
    my $this = shift;

    # Do an onfocus event for this object.
    $this->SUPER::event_onfocus;

    # If there is a focused object within this
    # container and this container is not a 
    # container widget, then send an onfocus event to it.
    unless ($this->isa('Curses::UI::ContainerWidget')) {
        my $focused_object = $this->getfocusobj;
        if (defined $focused_object) {
            $focused_object->event_onfocus;
        }
    }

    return $this;
}

sub event_onblur()
{
    my $this = shift;

    #If the Container loose it focus
    #the current focused child must be unfocused

    #get the id
    my $id = $this->{-draworder}->[-1];
    return unless $id;

    #get the object
    my $obj = $this->{-id2object}->{$id};
    return unless $obj;

    #draw the widget without the focus
    $obj->{-focus} = 0;
    $obj->draw;

    $this->SUPER::event_onblur();

    return $this;
}


sub set_focusorder(@)
{
    my $this = shift;
    my @order = @_;
    $this->{-focusorder} = \@order;
    return $this;
}

sub set_draworder(@)
{
    my $this = shift;
    my @order = @_;
    $this->{-draworder} = \@order;
    return $this;
}

sub getobj($;)
{
    my $this = shift;
    my $id = shift;
    return $this->{-id2object}->{$id};
}

sub getfocusobj()
{
    my $this = shift;
    my $id = $this->{-draworder}->[-1];
    return (defined $id ? $this->getobj($id) : undef); 
}

# ----------------------------------------------------------------------
# Private functions
# ----------------------------------------------------------------------

sub draworder_id2idx($;)   {shift()->base_id2idx('-draworder' , shift())}
sub focusorder_id2idx($;)  {shift()->base_id2idx('-focusorder', shift())}

sub base_id2idx($;)
{
    my $this = shift;
    my $param = shift;
    my $id = shift;
    
    my $idx;
    my $i = 0;
    foreach my $win_id (@{$this->{$param}}) 
    {
        if ($win_id eq $id) { 
            $idx = $i; 
            last;
        }
        $i++;
    }
    return $idx;
}

=pod

=head1 NAME

Curses::UI::Container - Create and manipulate container widgets

=head1 CLASS HIERARCHY

 Curses::UI::Widget
    |
    +----Curses::UI::Container


=head1 SYNOPSIS

    use Curses::UI;
    my $cui = new Curses::UI;
    my $win = $cui->add('window_id', 'Window');

    my $container = $win->add(
        'mycontainer', 'Container'
    );

    $container->add(
        'contained', 'SomeWidget',
        .....
    );

    $container->focus();


=head1 DESCRIPTION

A container provides an easy way of managing multiple widgets
in a single "form". A lot of Curses::UI functionality is
built around containers. The main class L<Curses::UI|Curses::UI> 
itself is a container. A L<Curses::UI::Window|Curses::UI::Window>
is a container. Some of the widgets are implemented as 
containers.



=head1 STANDARD OPTIONS

B<-parent>, B<-x>, B<-y>, B<-width>, B<-height>, 
B<-pad>, B<-padleft>, B<-padright>, B<-padtop>, B<-padbottom>,
B<-ipad>, B<-ipadleft>, B<-ipadright>, B<-ipadtop>, B<-ipadbottom>,
B<-title>, B<-titlefullwidth>, B<-titlereverse>, B<-onfocus>,
B<-onblur>

For an explanation of these standard options, see 
L<Curses::UI::Widget|Curses::UI::Widget>.




=head1 WIDGET-SPECIFIC OPTIONS

=over 4

=item * B<-releasefocus>

If this option is set, the widgets inside this Container will be
part of the focus ordering of the parent widget.
This means that when this Container gets the focus, its first widget
will be focused.  When the focus leaves the last widget inside the 
Container it will give the focus back to the parent instead
of cycling back to the first widget in this Container.
This option is useful to create a sub-class packed with common used 
widgets, making the reuse easier.

=back



=head1 METHODS

=over 4

=item * B<new> ( )

Create a new instance of the Curses::UI::Container class.

=item * B<add> ( ID, CLASS, OPTIONS )

This is the main method for this class. Using this method
it is easy to add widgets to the container. 

The ID is an identifier that you want to use for the
added widget. This may be any string you want. If you
do not need an ID, you may also us an undefined
value. The container will automatically create
an ID for you.

The CLASS is the class which you want to add to the
container. If CLASS does not contain '::' or CLASS
matches 'Dialog::...' then 'Curses::UI' will be prepended
to it. This way you do not have to specifiy the full
class name for widgets that are in the Curses::UI 
hierarchy. It is not necessary to call "use CLASS"
yourself. The B<add> method will call the B<usemodule>
method from Curses::UI to automatically load the module.

The hash OPTIONS contains the options that you want to pass
on to the new instance of CLASS.

Example:

    $container->add(
        'myid',                   # ID 
        'Label',                  # CLASS
        -text => 'Hello, world!', # OPTIONS
        -x    => 10,
        -y    => 5,
    );

=item * B<delete> ( ID )

This method deletes the contained widget with the given ID
from the container.

=item * B<hasa> ( CLASS )

This method returns true if the container contains one or
more widgets of the class CLASS.

=item * B<layout> ( )

Layout the Container and all its contained widgets.

=item * B<draw> ( BOOLEAN )

Draw the Container and all its contained widgets.
 If BOOLEAN is true, the screen will not update after 
drawing. By default this argument is false, so the 
screen will update after drawing the container.

=item * B<intellidraw> ( )

See L<Curses::UI::Widget|Curses::UI::Widget> for an
explanation of this method.

=item * B<focus> ( )

If the container contains no widgets, this routine will
return immediately. Else the container will get focus.

If the container gets focus, one of the contained widgets
will get the focus. The returnvalue of this widget determines
what has to be done next. Here are the possible cases:

* The returnvalue is B<LEAVE_CONTAINER>

  As soon as a widget returns this value, the container
  will loose its focus and return the returnvalue and the
  last pressed key to the caller. 

* The returnvalue is B<STAY_AT_FOCUSPOSITION>

  The container will not loose focus and the focus will stay
  at the same widget of the container.

* Any other returnvalue

  The focus will go to the next widget in the container.

=item * B<getobj> ( ID )

This method returns the object reference of the contained
widget with the given ID.

=item * B<getfocusobj> ( )

This method returns the object reference of the contained
widget which currently has the focus.

=item * B<set_focusorder> ( IDLIST )

Normally the order in which widgets get focused in a 
container is determined by the order in which they
are added to the container. Use B<set_focusorder> if you
want a different focus order. IDLIST contains a list
of id's.

=item * B<set_draworder> ( IDLIST )

Normally the order in which widgets are drawn in a 
container is determined by the order in which they
are added to the container. Use B<set_draworder> if you
want a different draw order. IDLIST contains a list
of id's.

=item * B<loadmodule> ( CLASS )

This will load the module for the CLASS. If loading
fails, the program will die. 

=item * B<onFocus> ( CODEREF )

This method can be used to set the B<-onfocus> event handler
(see above) after initialization of the widget.

=item * B<onBlur> ( CODEREF )

This method can be used to set the B<-onblur> event handler
(see above) after initialization of the widget.


=back




=head1 DEFAULT BINDINGS

Since interacting is not handled by the container itself, but 
by the contained widgets, this class does not have any key
bindings.




=head1 SEE ALSO

L<Curses::UI|Curses::UI>, 



=head1 AUTHOR

Copyright (c) 2001-2002 Maurice Makaay. All rights reserved.

Maintained by Marcus Thiesen (marcus@cpan.thiesenweb.de)


This package is free software and is provided "as is" without express
or implied warranty. It may be used, redistributed and/or modified
under the same terms as perl itself.

