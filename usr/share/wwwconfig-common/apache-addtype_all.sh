#!/bin/sh
# File:		apache-addtype_all.sh
# Changes:
#      	20010305 Ola Lundqvist <opal@debian.org>
#	20011022 Luca De Vitis <luca@debian.org>
#		Introduced the error variable.
#	20020116 Ola Lundqvist <opal@debian.org>
#		Documented the error variable.
#	20020412 Ola Lundqvist <opal@debian.org>
#		Added check for installed server.
# Needs:	/usr/share/wwwconfig-common/php.get
#		$typestr   - A string of the type (like: application/x-httpd-php)
#		$server    - the apache server type.
#		$extension - The extension to add (like: .php3)
# Description:	Adds a AddType if it is not already there.
# Sets:		$status = {error, nothing, added, lineadded, uncommented}
#		$error = error message (if $status = error).

. /usr/share/wwwconfig-common/php.get

status=error
if [ -z "$typestr" ] ; then
    error="No type to add."
elif [ -z "$server" ] ; then
    error="No apache server defined."
elif [ -z "$extension" ] ; then
    error="No extension to add with $typestr."
elif [ ! -d /etc/$server ] ; then
    error="No server $server installed, unable to configure it."
elif [ -f $phpini ] ; then
    A=${extension#.}
    if grep -e "^[[:space:]]*AddType[[:space:]]\+$typestr[[:space:]]\+.*\.$A\b" /etc/$server/*.conf > /dev/null 2>&1 ; then
		status=nothing
    elif grep -e "^[[:space:]]*AddType[[:space:]]\+$typestr[[:space:]]\+" /etc/$server/*.conf > /dev/null 2>&1 ; then
	for conffile in /etc/$server/*.conf ; do
	    if grep -e "^[[:space:]]*AddType[[:space:]]\+$typestr[[:space:]]\+" $conffile > /dev/null 2>&1 ; then
		log="${log}Adding extension $extension to AddType $typestr line in $conffile."
		sed -e "s#^\([[:space:]]*AddType[[:space:]]\+$typestr\b.*\)#\1 $extension#;" < $conffile > $conffile.new
		status=added
		mv $conffile.new $conffile
	    fi
	done
    elif grep -e "^[[:space:]]*#[[:space:]]*AddType[[:space:]]\+$typestr[[:space:]]\+.*\.$A\b" /etc/$server/*.conf > /dev/null 2>&1 ; then
	for conffile in /etc/$server/*.conf ; do
	    if grep -e "^[[:space:]]*#[[:space:]]*AddType[[:space:]]\+$typestr[[:space:]]\+.*\.$A\b" $conffile > /dev/null 2>&1 ; then
		log="${log}Uncommenting AddType $typestr line in $conffile."
		sed -e "s#^\([[:space:]]*\)\\#\([[:space:]]*AddType[[:space:]]\+$typestr\b.*\.$A\b.*\)#\1\2#;" < $conffile > $conffile.new
		status=uncommented
		mv $conffile.new $conffile
	    fi
	done
    else
	log="${log}Type file not found for extension $extension, adding a line to httpd.conf.]n"
	echo "AddType $typestr $extension" >> /etc/$server/httpd.conf
	status="lineadded"
    fi
fi
