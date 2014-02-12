#!/bin/sh
# File:		autopatch_all.sh
# Changes:
#      	20010219 Ola Lundqvist <opal@debian.org>
#	20011022 Luca De Vitis <luca@debian.org>
#		Introduced the error variable.
#	        Changed from "find ... -exec" to "find ... | while read etc."
#	20020116 Ola Lundqvist <opal@debian.org>
#		Documented the error variable.
#		Fixed the patch while string.
#	20020412 Ola Lundqvist <opal@debian.org>
#		Indentation fixes.
# Needs:	$patchdir - Where the patches are located.
# Description:	Finds patches in a directory and applies them to the filesystem.
# Sets:		$status = {error, nothing, patch}
#		$error = error message (if $status = error)

status=error
error=""

if [ -z "$patchdir" ] ; then
    error="No patch directory specified."
else
    status=nothing
    if [ -d $patchdir ] ; then
	WWD=$PWD
	cd /
	find $patchdir -name "*.patch" | {
	    while read file; do
		/usr/share/wwwconfig-common/autopatch.sh $file
	    done
	}
	cd $WWD
    fi
fi
