#!/bin/sh
# File:		mysql-dropdb.sh
# Changes:	
#	20010224 Luca De Vitis <luca@debian.org>
#	20020116 Ola Lundqvist <opal@debian.org>
#		Documented the error variable.
#	20020125 Ola Lundqvist <opal@debian.org>
#		Removed the dbadmpass check part.
#	20031219 Thomas Viehmann <tv@beamnet.de>
#		Patch to use eval in order to not break.
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
#		$error = error message (if status = error).

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
    if eval $mysqlcmd -f -e "\"show databases;\"" | grep -e "^$dbname" > /dev/null 2>&1 ; then
	log="${log}Droping database $dbname."
	if eval $mysqlcmd -f -e "\"DROP DATABASE $dbname;\"" ; then
	    if eval $mysqlcmd -f -e "\"show databases;\"" | grep -e "^$dbname" > /dev/null 2>&1 ; then
		error="Database $dbname NOT successfully droped. You have to do it manually."
	    else
		status=drop
	    fi
	else
	    error="Unable to run the drop database script."
	fi
    else
	status=nothing
	log="${log}Database $dbname already exists."
    fi
fi
