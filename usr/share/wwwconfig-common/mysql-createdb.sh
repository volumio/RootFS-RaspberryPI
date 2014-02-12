#!/bin/sh
# File:		mysql-createdb.sh
# Changes:
#	20010224 Ola Lundqvist <opal@debian.org>
#	20011022 Luca De Vitis <luca@debian.org>
#		Introduced the error variable.
#	20020116 Ola Lundqvist <opal@debian.org>
#		Documented the error variable.
#	20020125 Ola Lundqvist <opal@debian.org>
#		Removed the dbadmpass check part.
#	20030815 Nikolai Prokoschenko <nikolai@prokoschenko.de>
#		Fixed grep statement for database detection.
#       20040205 Jeroen van Wolffelaar <jeroen@wolffelaar.nl>
#		 Jeremy <jeremy.laine@polytechnique.org>
#		Check merely for valid account, rather than for access to the
#		mysql-database, so also regular mysqlusers can be used
#	20040705 Jeremy Laine <jeremy.laine@m4x.org>
#		Better check for mysql client command.
# Needs:	$dbname    - the database that user should have access to.
#		$dbserver  - the server to connect to.
#		$dbadmin   - the administrator name.
#		$dbadmpass - the administrator password.
#		which
#		mysql
#		/usr/share/wwwconfig-common/mysql.get
# Description:	Creates a database.
# Sets:		$status = {error, nothing, create}
#		$error = error message (if $status = error)

status=error
error=""

. /usr/share/wwwconfig-common/mysql.get

if [ -z "$dbname" ] ; then
    error="No database name specified. Have to know the name to create it."
elif [ -z "$dbserver" ] ; then
    error="No database server specified."
elif [ -z "$dbadmin" ] ; then
    error="No database administrator specified."
elif [ -z $(which mysql) ] ; then
    error="No mysql client to execute, install the mysql client package and
    run 'dpkg-reconfigure -plow packagename'."
elif ! eval $mysqlcmd </dev/null >/dev/null 2>&1 ; then
    error="Error when trying to connect to the mysql database.
    This error can occur if you have no database to connect to, or
    if the password was incorrect.
	use: dpkg-reconfigure -plow packagename to reconfigure."
else
    if eval $mysqlcmd -f -B -e "\"show databases;\"" | grep -e "^$dbname$" > /dev/null 2>&1 ; then
	log="${log}Database $dbname already exists."
	status=nothing
    else
	log="${log}Creating database $dbname."
	if eval $mysqlcmd -f -e "\"CREATE DATABASE $dbname;\"" ; then
	    if ! eval $mysqlcmd -f -B -e "\"show databases;\"" | grep -e "^$dbname$" > /dev/null 2>&1 ; then
		error="Database $dbname NOT successfully created. You have to do it manually."
	    else
		status=create
	    fi
	else
	    error="Unable to run the create database script."
	fi
    fi
fi
