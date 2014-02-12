#!/bin/sh
# File:		mysql-dropuser.sh
# Changes:	
#	20010224 Luca De Vitis <luca@debian.org>
#	20020116 Ola Lundqvist <opal@debian.org>
#		Documented the error variable.
#	20020125 Ola Lundqvist <opal@debian.org>
#		Removed the dbadmpass check part.
#	20031219 Thomas Viehmann <tv@beamnet.de>
#		Patch to use eval in order to not break.
#	20040705 Jeremy Laine <jeremy.laine@m4x.org>
#		Better check for mysql client command.
# Needs:	$dbuser    - the user name to create (or replace).
#		$dballow   - what hosts to allow (defaults to %).
#		$dbname    - the database that user should have access to.
#		$dbpass    - the password to use.
#		$dbserver  - the server to connect to.
#		$dbadmin   - the administrator name.
#		$dbadmpass - the administrator password.
#		which
#		mysql
#		/usr/share/wwwconfig-coomon/mysql.get
# Description:	Creates or replaces a database user.
# Sets:		$status = {error, nothing, drop }
#		$error = error message (if status = error).

dballow=${dballow:-%}

status=error
error=""

. /usr/share/wwwconfig-common/mysql.get
if [ -z "$dbuser" ] ; then
    error="No database user specified. Can not drop it if it does not exist."
elif [ -z "$dbserver" ] ; then
    error="No database server specified."
elif [ -z "$dbadmin" ] ; then
    error="No database administrator specified."
elif [ -z $(which mysql) ] ; then
    echo "No mysql client to execute, install the mysql client package and
    run 'dpkg-reconfigure -plow packagename'."
elif ! eval $mysqlcmd -f mysql -e "\"show tables;\"" >/dev/null 2>&1 ; then
    error="Error when trying to connect to the mysql database.
    This error can occur if you have no database to connect to, or
    if the password was incorrect.
	use: dpkg-reconfigure -plow packagename to reconfigure."
else
    log="${log}Droping database user $dbuser."
    if eval $mysqlcmd -f mysql -e "\"select User from user;\"" | grep $dbuser >/dev/null 2>&1 ; then
	if eval $mysqlcmd -f mysql -e "\"
	CONNECT mysql;
	
	DELETE FROM user
	WHERE user='$dbuser';
	
	DELETE FROM db
	WHERE user='$dbuser';
	
	flush privileges;
	
	\"" > /dev/null 2>&1 ; then
	    if eval $mysqlcmd -f mysql -e "\"select user.user,db.user from user,db;\"" | grep $dbuser >/dev/null 2>&1 ; then
		error="Database user $dbuser NOT successfully droped. You have to do it manually."
	    else
		status=drop
	    fi
	else
	    error="Unable to run the drop user script."
	fi
    else
	status=nothing
	log="${log}User $dbuser does not exists."
    fi
fi
