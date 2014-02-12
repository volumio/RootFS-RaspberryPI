#!/bin/sh
# File:		apache-index.sh
# Changes:
#      	20010219 Ola Lundqvist <opal@debian.org>
#	20011022 Luca De Vitis <luca@debian.org>
#		Introduced the error variable.
#	20020116 Ola Lundqvist <opal@debian.org>
#		Documented the error variable.
# Needs:	$index - the index file to add.
#		$conffile - the config file to modify.
# Description:	Adds an index to a apache config.
#		Ie: adds to DirectoryIndex
# Sets:		$status = {error, nothing, found, added}
#		$error = error message (if $status = error)

status=error
error=""

if [ -z "$index" ] ; then
    error="No index specified in apache-index.sh."
elif [ -z "$conffile" ] ; then
    error="No config file specified in apache-index.sh."
elif [ ! -f $conffile ] ; then
    error="Config file $conffile not found from apache-index.sh."
else
    status=nothing
    if grep "DirectoryIndex" $conffile >/dev/null 2>&1; then
	if grep -e "DirectoryIndex.*\b$index\b" $conffile >/dev/null 2>&1; then
	    log="${log}$index settings in $conffile found!"
	    status=found
	else 
	    sed -e "s#\(DirectoryIndex.*\bindex.html\b\)#\1 $index#" < $conffile > $conffile.new
	    if grep -e "DirectoryIndex.*[[:space:]]\+$index\b" $conffile.new > /dev/null 2>&1; then
		log="${log}$index index settings in $conffile added!"
		mv $conffile.new $conffile
		status=added
	    else
		error="Error when adding $index index settings in $conffile!"
		rm $conffile.new
	    fi
	fi
    fi
fi

