#!/bin/sh
# File:		pgsql-dropuser.sh
# Changes:	
#	20010224 Luca De Vitis <luca@debian.org>
#	20020116 Ola Lundqvist <opal@debian.org>
#		Documented the error variable.
#	20041002 Raphaël Enrici <blacknoz@club-internet.fr>
#		Quoted $dbuser so that the username can contain '-'.
#	20040322 Ola Lundqvist <opal@debian.org>
#	        Added use_dbuser=false after pgsql.get as suggested by
#		Uwe Steinmann <uwe@steinmann.cx>.
# Needs:	$dbuser    - the user name to drop
#		$dbname    - the database that user should have access to.
#		$dbpass    - the password to use.
#		$dbserver  - the server to connect to.
#		$dbadmin   - the administrator name.
#		$dbadmpass - the administrator password (not supported).
#		which
#		pgsql
#		/usr/share/wwwconfig-common/pgsql.get
# Description:	Drops a user.
# Sets:		$status = {error, nothing, drop}
#		$error = error message (if status = error).

status=error
error=""

. /usr/share/wwwconfig-common/pgsql.get
use_dbuser=false

#. pgsql.get
if [ -z "$dbuser" ] ; then
    error="No database user specified. Can not drop it if it does not exist."
elif [ -z "$dbserver" ] ; then
    error="No database server specified."
elif [ -z "$dbadmin" ] ; then
    error="No database administrator specified."
elif [ ! -x $(which psql) ] ; then
    error="No pgsql client to execute."
elif ! eval $pgsqlcmd -q -d $systemdb -c "\"SELECT usename FROM pg_shadow;\"" >/dev/null 2>&1 ; then
    error="Error when trying to connect to the pgsql database.
    This error can occur if you have no database to connect to, or
    if the password was incorrect.
	use: dpkg-reconfigure -plow packagename to reconfigure."
else
    TMPU=$(eval $pgsqlcmd -d $systemdb -q -t -A -c "\"SELECT usename FROM pg_shadow WHERE usename='$dbuser';\"")
    if [ "$TMPU" = "$dbuser" ] ; then
	if eval $pgsqlcmd -q -d $systemdb -c "\"DROP USER "'\"'"$dbuser"'\"'";\"" ; then
	    TMPU=$(eval $pgsqlcmd -d $systemdb -q -t -A -c "\"SELECT usename FROM pg_shadow WHERE usename='$dbuser';\"")
	    if [ -z "$TMPU" ] ; then
		log="${log}User $dbuser dropped."
		status=drop
	    else
		error="User $dbuser NOT successfully dropped. You have to do it manually."
	    fi
	else
	    error="Unable to run the drop user script."
	fi
    else
	log="${log}User $dbuser does not exists in pg_shadow."
	status=nothing
    fi
fi
