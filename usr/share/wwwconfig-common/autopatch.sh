#!/bin/sh
# File:		autopatch.sh
# Changes:
#     	20010219 Ola Lundqvist <opal@debian.org>
#	20020116 Ola Lundqvist <opal@debian.org>
#		Introduced and deocumented the error variable.
# Arguments:	$1 - Where the patch is located.
# Description:	Finds patches in a directory and applies them to the filesystem.
# Sets:		status={error, nothing, patch}
#		error = error message (if $status = error).

status=error
error=""

if [ -z "$1" ] ; then
    error="No patch file [arg 1] specified."
elif [ ! -f $1 ] ; then
    error="Can not find patch file $1."
else
    status=patch
    error="Autopatching, using $1."
    patch -p0 -i $1
fi
