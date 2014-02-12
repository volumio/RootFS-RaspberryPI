#!/bin/sh
# File:		php-extensions.sh
# Changes:
#	20010219 Ola Lundqvist <opal@debian.org>
#	20010222 Ola Lundqvist <opal@debian.org>
# Needs:	/usr/share/wwwconfig-common/php.get
#		$extensions - what php extensions to check for!
#		$checkextensions - what php extensions to check for if the
#			corresponding php?-$ext package is installed.	
# Description:	Verifies the php config that the application will use.
#		Ie the higher of php4 and php3.

. /usr/share/wwwconfig-common/php.get

for A in $checkextensions ; do
    if [ -f /var/lib/dpkg/info/php?-$A.list ] ; then
	extensions="$extensions $A"
    fi
done

# Check for php3/4 files
if [ -f $phpini ]; then
    # Make sure all the extensions are being loaded
    for ext in $extensions; do
	if grep -e "^[[:space:]]*extension.*\b$ext\.so" $phpini >/dev/null 2>&1; then
	    log="${log}$ext extension for $phpver found."
	else
	    log="${log}$ext extension for $phpver added!"
	    echo "extension=$ext.so" >>$phpini
	fi
    done
fi
