#!/bin/sh
# File:		mysql-createuser.sh
# Changes:
#	20010224 Ola Lundqvist <opal@debian.org>
#	20011022 Luca De Vitis <luca@debian.org>
#		Introduced the error variable.
#	20020116 Ola Lundqvist <opal@debian.org>
#		Documented the error variable.
#	20020125 Ola Lundqvist <opal@debian.org>
#		Removed the dbadmpass check part.
#	20031027 Benoit Joly <benoit@debian.org>
#		Patch small bug.
#	20040204 Jeroen van Wolffelaar <jeroen@wolffelaar.nl>
#		Use proper GRANT for compatibility with added MySQL 4
#		features, now all privileges are granted (excluding GRANT)
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
# Sets:		$status = {error, nothing, include, uncomment}
#		$error = error message (if $status = error)

dballow=${dballow:-%}

status=error
error=""

. /usr/share/wwwconfig-common/mysql.get

if [ -z "$dbuser" ] ; then
    error="No database user specified. Can not create it if it does not exist."
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
    log="${log}Creating or resetting database user ($dbuser)."
    script="
	GRANT ALL PRIVILEGES ON \`$dbname\`.* TO \`$dbuser\`@'$dballow'
		IDENTIFIED BY '$dbpass';
	
	GRANT ALL PRIVILEGES ON \`$dbname\`.* TO \`$dbuser\`@localhost
		IDENTIFIED BY '$dbpass';
	
	flush privileges;
"
    

    if eval $mysqlcmd -f mysql -e '"$script"'  ; then
	
	if ! eval $mysqlcmd -f mysql -e '"select User from user;"' | grep $dbuser >/dev/null 2>&1 ; then
	    error="Database user $dbuser NOT successfully added. You have to do it manually."
	else
	    status=create
	fi
    else
	error="Unable to run the create user script."
    fi
fi
