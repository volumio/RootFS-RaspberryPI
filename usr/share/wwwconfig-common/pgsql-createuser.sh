#!/bin/sh
# File:		pgsql-createuser.sh
# Changes:
#	20010224 Ola Lundqvist <opal@debian.org>
#	20011022 Luca De Vitis <luca@debian.org>
#		Introduced the error variable.
#	        Changed the if statement on line 39 with a single psql command
#	        using -A -q -t and changing th query
#	20020116 Ola Lundqvist <opal@debian.org>
#		Documented the error variable.
#	20020126 Ola Lundqvist <opal@debian.org>
#		Fixing postgres issues. Indenting correct.
#		Fixed insert command, removed '' which should not be there.
#		Removed need for $dbadmin.
#	20041002 Raphaël Enrici <blacknoz@club-internet.fr>
#		Quoted $dbuser so that the username can contain '-'.
# Needs:	$dbuser    - the user name to create (or replace).
#		$dbname    - the database that user should have access to.
#		$dbpass    - the password to use.
#		$dbserver  - the server to connect to.
#		$dbadmin   - the administrator name.
#		$dbadmpass - the administrator password (not supported).
#		which
#		psql
#		/usr/share/wwwconfig-coomon/pgsql.get
# Description:	Creates or replaces a database user.
# Sets:		$status = {error, nothing, create, changepass}
#		$error = error message (if $status = error)

status=error
error=""

. /usr/share/wwwconfig-common/pgsql.get

use_dbuser=false

#. pgsql.get
if [ -z "$dbuser" ] ; then
    error="No database user specified. Can not create it if it does not exist."
elif [ -z "$dbserver" ] ; then
    error="No database server specified."
elif [ ! -x $(which psql) ] ; then
    error="No pgsql client to execute."
elif ! eval $pgsqlcmd -d $systemdb -c "\"SELECT usename FROM pg_shadow;\"" >/dev/null 2>&1 ; then
##
    error="Error when trying to connect to the pgsql database.
This error can occur if you have no database to connect to, or
if the password was incorrect.
use: dpkg-reconfigure -plow packagename to reconfigure."
##
else
    tmpuser=$(eval $pgsqlcmd -d $systemdb -q -t -A -c "\"SELECT usename FROM pg_shadow WHERE usename='$dbuser';\"")
    if [ "$tmpuser" = "$dbuser" ] ; then
	. /usr/share/wwwconfig-common/pgsql-userpass.get
	# . pgsql-userpass.get
	status=nothing
	if [ "$userpass" != "$dbpass" ] ; then
	    if eval $pgsqlcmd -d $systemdb -c "\"ALTER USER "'\"'"$dbuser"'\"'" WITH PASSWORD '$dbpass'\"" > /dev/null 2>&1 ; then
		log="${log}Password changed for pgsql user $dbuser."
		status=changepass
	    else
		status=error
		error="Can not change password for database user $dbuser."
	    fi
	fi
    else
	. /usr/share/wwwconfig-common/pgsql-nextsysid.get
	# . pgsql-nextsysid.get
	if [ "$status" = "error" ] ; then
	    error="Unable to create user $dbuser. Something is wrong with the database."
	elif eval $pgsqlcmd -d $systemdb -c "\"CREATE USER "'\"'"$dbuser"'\"'" WITH SYSID $nextsysid PASSWORD '$dbpass'\"" ; > /dev/null 2>&1; then
	    tmpuser=$(eval $pgsqlcmd -d $systemdb -q -t -A -c "\"SELECT usename FROM pg_shadow WHERE usename='$dbuser'\"")
	    if [ "$tmpuser" = "$dbuser" ] ; then
		log="${log}Pgsql user $dbuser created."
		status=create
	    else
		error="User $dbuser not created."
		status=error
	    fi
	else
	    error="Can not create user $dbuser, problem with connection."
	    status=error
	fi
    fi
fi
