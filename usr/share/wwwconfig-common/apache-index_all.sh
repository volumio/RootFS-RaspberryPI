#!/bin/sh
# File:		apache-index_all.sh
# Changes:
#	20010219 Ola Lundqvist <opal@debian.org>
#	20010222 Ola Lundqvist <opal@debian.org>
#	20011022 Luca De Vitis <luca@debian.org>
#		Introduced the error variable.
#	20020116 Ola Lundqvist <opal@debian.org>
#		Documented the error variable, also fixed a bug in one of
#		the error messages.
#	20020412 Ola Lundqvist <opal@debian.org>
#		Added check for if the server is installed or not.
# Needs:	$index - the index file to add.
#		$server - the server to use.
#			Anything that matches /etc/$server/*.conf
# Description:	Adds an index to the servers apache config.
#		Ie: adds to DirectoryIndex
# Sets:		$status = {error, nothing, found, added}
#		$error = error message (if $status = error)

lstatus=error
if [ -z "$index" ] ; then
    error="No index specified in apache-index_all.sh."
elif [ -z "$server" ] ; then
    error="No server specified in apache-index_all.sh."
elif [ ! -d /etc/$server ] ; then
    error="No server $server installed, unable to configure it."
else
    lstatus=nothing
    for conffile in /etc/$server/srm.conf /etc/$server/httpd.conf ; do
	. /usr/share/wwwconfig-common/apache-index.sh
	if [ "$lstatus" != "added" -a "$lstatus" != "error" ] ; then
	    lstatus=$status
	fi
	if [ "$status" = "added" ] ; then
	    lstatus=added
	fi
    done
fi
status=$lstatus
