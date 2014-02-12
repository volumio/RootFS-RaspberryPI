#!/bin/sh
# File:		exim-trust.sh
# Changes:
#	20010219 Ola Lundqvist <opal@debian.org>
#	20011022 Luca De Vitis <luca@debian.org>
#		Introduced the error variable.
#	        o / */[[:space:]]*/
#	20020116 Ola Lundqvist <opal@debian.org>
#		Documented the error variable.
# Needs:	$trustuser - The user that exim should trust.
# Description:	Makes exim to trust a user.
# Sets:		$status = {error, nothing, trust}
#		$error = error message (if $status = error)

status=error
error=""

EXIMCONF=/etc/exim/exim.conf

if [ -e $EXIMCONF ]; then
    status=nothing
    if grep -e "trusted_users.*\b$trustuser\b" $EXIMCONF >/dev/null 2>&1; then
	log="${log}The user $trustuser is already trusted by Exim."
    elif grep -e "trusted_users.*=" $EXIMCONF >/dev/null 2>&1; then
	status=trust
	log="${log}Modifying $EXIMCONF to add $trustuser as a trusted user."
	sed -e "s#\(trusted_users[[:space:]]*=.*\)#\1:$trustuser#" < $EXIMCONF > $EXIMCONF.tmp
	cp $EXIMCONF $EXIMCONF.bak >/dev/null 2>&1
	if grep -e "trusted_users[[:space:]]*=.*\b$trustuser\b" $EXIMCONF.tmp >/dev/null 2>&1; then
	    mv $EXIMCONF.tmp $EXIMCONF >/dev/null 2>&1;
	else
	    error="The script failed while adding $trustuser to the trusted users in Exim."
	    status=error
	    rm -f $EXIMCONF.tmp
	fi
    else
	error="No trusted user line in exim, you have to add that line manually."
    fi
fi                        
