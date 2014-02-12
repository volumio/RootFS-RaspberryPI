#!/bin/sh
# File:		mysql-if-exec.sh
# Changes:
#      	20010322 Ola Lundqvist <opal@debian.org>
#	20011022 Luca De Vitis <luca@debian.org>
#		Introduced the error variable.
#	20020116 Ola Lundqvist <opal@debian.org>
#		Documented the error variable.
#	20020125 Ola Lundqvist <opal@debian.org>
#		Removed the dbadmpass check part.
#	20020125 Ola Lundqvist <opal@debian.org>
#		Added new status code.
#	20031219 Thomas Viehmann <tv@beamnet.de>
#		Patch to use eval in order to not break.
#	20040205 Jeroen van Wolffelaar <jeroen@wolffelaar.nl>
#		Check merely for valid account, rather than for access to the
#		mysql-database, so also regular mysqlusers can be used
#	20040705 Jeremy Laine <jeremy.laine@m4x.org>
#		Better check for mysql client command.
# Needs:	$dbname    - the database that user should have access to
#				(optional)
#		$dbserver  - the server to connect to.
#		$dbadmin   - the databaseuser name.
#		$dbadmpass - the databaseuser password.
#		$statement - the statement to test if it can get data.
#		which
#		mysql
#		/usr/share/wwwconfig-coomon/mysql.get
# Description:	First checks a statement. If that statement is ok it executes the
#		script.
# Sets:		$status = {error, nothing, exec, execerror}
#		$error = error message (if $status = error)

status=error
error=""

. /usr/share/wwwconfig-common/mysql.get

if [ -z "$dbserver" ] ; then
    error="No database server specified."
elif [ -z "$dbadmin" ] ; then
    error="No database administrator specified."
elif [ -z "$statement" ] ; then
    error="No statement to test for."
elif [ -z "$sqlfile" ] ; then
    error="No sqlfile to execute."
elif [ ! -e "$sqlfile" ] ; then
    error="Sqlfile $sqlfile not found."
elif [ -z $(which mysql) ] ; then
    error="No mysql client to execute, install the mysql client package and
    run 'dpkg-reconfigure -plow packagename'."
elif ! eval $mysqlcmd </dev/null >/dev/null 2>&1 ; then
    error="Error when trying to connect to the mysql database.
    This error can occur if you have no database to connect to, or
    if the password was incorrect.
	use: dpkg-reconfigure -plow packagename to reconfigure."
elif eval $mysqlcmd -f $dbname -e "\"$statement\"" >/dev/null 2>&1 ; then
    log="${log}Executing command to mysql."
    if eval $mysqlcmd -f $dbname < $sqlfile > /dev/null 2>&1 ; then
	status=exec
    else
	status=execerror
	error="Unable to run the sql script ($sqlfile)."
    fi
else
    status=nothing
fi
