#!/bin/sh
# File:		apache-uninclude_all.sh
# Changes:
#      	20010219 Ola Lundqvist <opal@debian.org>
#	20011022 Luca De Vitis <luca@debian.org>
#		Introduced the error variable.
#	20020116 Ola Lundqvist <opal@debian.org>
#		Documented the error variable.
#	20020412 Ola Lundqvist <opal@debian.org>
#		If the server is not installed, then do nothing.
# Needs:	$server - what apache server that should be configured.
#			That can be any matching /etc/$server/*.conf
#		$includefile - what file that should not not be included.
#		/usr/share/wwwconfig-common/apache-uninclude.sh
# Description:	Purges all include statements for that file in all apache config files.
# Sets:		$status = {error, nothing, purge}
#		$error = error message (if $status = error)

status=error
error=""

if [ -z "$includefile" ] ; then
    error="No include file specified for apache-uninclude_all.sh"
elif [ ! -d /etc/$server ] ; then
    status=nothing
    error="No server $server installed, unable to deconfigure it."
else
    status=nothing
    if grep -e "Include[[:space:]]\+$includefile\b" /etc/$server/*.conf > /dev/null 2>&1; then
	log="${log}Include of $includefile found in apache config files, purging."
	for conffile in /etc/$server/*.conf; do
	    . /usr/share/wwwconfig-common/apache-uninclude.sh
	done
	status=purge
    fi
fi
