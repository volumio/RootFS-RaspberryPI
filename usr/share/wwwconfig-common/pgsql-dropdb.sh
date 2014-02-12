#!/bin/sh
# File:		pgsql-dropdb.sh
# Changes:	
#	20010224 Luca De Vitis <luca@debian.org>
#	20020116 Ola Lundqvist <opal@debian.org>
#		Documented the error variable.
# Needs:	$dbname    - the database that user should have access to.
#		$dbserver  - the server to connect to.
#		$dbadmin   - the administrator name.
#		$dbadmpass - the administrator password (not supported)
#		which
#		pgsql
#		/usr/share/wwwconfig-common/pgsql.get
# Description:	Drops a database.
# Sets:		$status = {error, nothing, drop}
#		$error = error message (if status = error).

status=error
error=""

. /usr/share/wwwconfig-common/pgsql.get

use_dbuser=false

if [ -z "$dbname" ] ; then
    error="No database name specified. Have to know the name to create it."
elif [ -z "$dbserver" ] ; then
    error="No database server specified."
elif [ -z "$dbadmin" ] ; then
    error="No database administrator specified."
elif [ ! -x $(which psql) ] ; then
    error="No pgsql client to execute."
elif ! eval $pgsqlcmd -d $systemdb -c "\"\"" >/dev/null 2>&1 ; then
    error="Error when trying to connect to the pgsql database.
    This error can occur if you have no database to connect to, or
    if the password was incorrect.
	use: dpkg-reconfigure -plow packagename to reconfigure."
else
    if eval $pgsqlcmd -d $dbname -c "\"\"" > /dev/null 2>&1 ; then
	log="${log}Droping database $dbname."
	if eval $pgsqlcmd -d $systemdb -c "\"DROP DATABASE $dbname;\"" > /dev/null 2>&1 ; then
	    if eval $pgsqlcmd -d $dbname -c "\"\"" > /dev/null 2>&1 ; then
		error="Database $dbname NOT successfully droped. You have to do it manually."
	    else
		status=drop
	    fi
	else
	    error="Unable to run the drop database script."
	fi
    else
	log="${log}Database $dbname does not exist."
	status=nothing
    fi
fi
