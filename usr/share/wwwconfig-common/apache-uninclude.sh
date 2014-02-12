#!/bin/sh
# File:		apache-uninclude.sh
# Changes:
#	20010219 Ola Lundqvist <opal@debian.org>
#	20011022 Luca De Vitis <luca@debian.org>
#		Introduced the error variable.
#	        o /[[:space:]][[:space:]]*/[[:space:]]\+/
#	        Changed from "cat $conffile | grep" to "grep ... < $conffile"
#	20020116 Ola Lundqvist <opal@debian.org>
#		Documented the error variable.
# Needs:	$conffile - The config file to pruge from.
#		$includefile - The file that should not not be included.
# Description:	Purges all include statements for that file in the apache config file.
# Sets:		$status = {error, nothing, purge}
#		$error = error message (if $status = error)

status=error

if [ -z "$conffile" ] ; then
    error="No config file specified for apache-uninclude.sh"
elif [ -z "$includefile" ] ; then
    error="No include file specified for apache-uninclude.sh"
elif [ ! -f $conffile ] ; then
    error="File $conffile not found!"
else
    status=nothing
    GREP="Include[[:space:]]\+$includefile\b"
    if grep -e "$GREP" $conffile > /dev/null 2>&1; then
	log="${log}Include of $includefile found in $conffile file, purging."
	status=purge
	grep -v -e "$GREP" < $conffile > $conffile.purg
	mv $conffile.purg $conffile
    fi
fi
