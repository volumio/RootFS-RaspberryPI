#!/bin/sh
# File:		pgsql-createdb.sh
# Changes:
#	20010224 Ola Lundqvist <opal@debian.org>
#	20011022 Luca De Vitis <luca@debian.org>
#		Introduced the error variable.
#	20020116 Ola Lundqvist <opal@debian.org>
#		Documented the error variable.
#	20020126 Ola Lundqvist <opal@debian.org>
#		Removed need for $dbadmin.
#	20041217 Ola Lundqvist <opal@debian.org>
#		Fix but in CREATE DATABASE statement, using suggestion from
#		Laurent Simonneau.
# Needs:	$dbname    - the database that user should have access to.
#		$dbserver  - the server to connect to.
#		$dbadmin   - the administrator name.
#		$dbadmpass - the administrator password
#		$dbuser    - the database's owner if set
#		which
#		pgsql
#		/usr/share/wwwconfig-common/pgsql.get
# Description:	Creates a database.
# Sets:		$status = {error, nothing, create}
#		$error = error message (if $status = error)

status=error
error=""

. /usr/share/wwwconfig-common/pgsql.get

use_dbuser=false

if [ -z "$dbname" ] ; then
    error="No database name specified. Have to know the name to create it."
elif [ -z "$dbserver" ] ; then
    error="No database server specified."
elif [ ! -x $(which psql) ] ; then
    error="No pgsql client to execute."
#elif [ ! -x /usr/bin/pg_wrapper ] ; then
#    error="Postgres wrappers do not exist, install postgresql-client package."
elif ! eval $pgsqlcmd -d $systemdb -c "\"\"" >/dev/null 2>&1 ; then
    error="Error when trying to connect to the pgsql database.
    This error can occur if you have no database to connect to, or
    if the password was incorrect.
    use: dpkg-reconfigure -plow packagename to reconfigure."
else
    if eval $pgsqlcmd -d $dbname -c "\"\"" > /dev/null 2>&1 ; then
	log="${log}Database $dbname already exists."
	status=nothing
    else
	my_dbuser="postgres"
	if [ ! -z "$dbuser" ]; then 
	    my_dbuser="$dbuser"
	fi
	log="${log}Creating database $dbname."
	if eval $pgsqlcmd -d $systemdb -c "\"CREATE DATABASE $dbname WITH OWNER \\\"$my_dbuser\\\";\"" > /dev/null 2>&1 ; then
	    if ! eval $pgsqlcmd -d $dbname -c "\"\"" > /dev/null 2>&1 ; then
		error="Database $dbname NOT successfully created. You have to do it manually."
	    else
		status=create
	    fi
	else
	    error="Unable to run the create database script."
	fi
    fi
fi
