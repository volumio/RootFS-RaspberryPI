#!/bin/sh
# File:		apache-php.sh
# Changes:
#	20010219 Ola Lundqvist <opal@debian.org>
#	20011022 Luca De Vitis <luca@debian.org>
#		Introduced the error variable.
#	        o /[[:space:]][[:space:]]*/[[:space:]]\+/
#	        o /  */[[:space:]]\+/
#	        o / */[[:space:]]*/
#	20020116 Ola Lundqvist <opal@debian.org>
#		Documented the error variable.
#       20040525 Jeremy Laine <jeremy.laine@m4x.org>
#		Switched to modules-config.
#	20040806 Pierre Habouzit <pierre.habouzit@m4x.org>
#		Changed from modules-config to apache-modconf. Just a name
#		change, no functionality changed.
#      20040820 Jeremy Laine <jeremy.laine@m4x.org>
#              Replace remaining calls to modules-config by apache-modconf.
# Needs:	$phpver - the php version to use.
#		$phpini - the php config file to use.
#		$server - the apache server to use,
#			anything that matches /etc/$server/*.conf
# Description:	Verifies that the php module is loaded in the apache config file.
# Sets:		$status = {error, nothing, include, uncomment}
#		$error = error message (if $status = error)

status=error
error=""

if [ -z "$phpver" ] ; then
    error="No php version to check for."
elif [ -z "$phpini" ] ; then
    error="No php ini file to check for."
elif [ ! -f $phpini ] ; then
    error="Php config file $phpini not found."
elif [ -z $(which apache-modconf) ] ; then
    error="Could not find apache-modconf."
else
    phpverm="mod_"$phpver
    phpstatus=`apache-modconf $server query $phpverm || true`
    if [ -z "$phpstatus" ] ; then
        apache-modconf $server enable $phpverm
        # Uncomment successful.
        status=uncomment
    else
        status=nothing
    fi
fi
