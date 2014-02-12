#!/bin/sh
# File:		pgsql-allowip.sh
# Changes:
#	20010225 Ola Lundqvist <opal@debian.org>
#	20011022 Luca De Vitis <luca@debian.org>
#      		Changed the sed script on line 18.
#		Need only one regular expression.
# Needs:
#		/etc/postgresql/postmaster.init or
#		/etc/postgresql/postmaster.conf
# Description:	Allows ip connections to database.
# Sets:		$status = {error, nothing, restart, start}
#		$error = error message (if $status = error)

status=error

if [ -f /etc/postgresql/postmaster.conf ] ; then
    # Allowed by default so not change should be needed, but it will be
    # done anyway, to make sure that it works.
    status=nothing
    if grep -e 'tcpip_socket' /etc/postgresql/postmaster.conf > /dev/null 2>&1 ; then
	if ! grep -e '^[[:space:]]*tcpip_socket[[:space:]]*=[[:space:]]*1' \
	    /etc/postgresql/postmaster.conf > /dev/null 2>&1 ; then
	    sed -e 's/#[[:space:]]*tcpip_socket[[:space:]]*=.*/tcpip_socket=1/;' \
		/etc/postgresql/postmaster.conf \
		> /etc/postgresql/postmaster.conf.tmp
	    if grep 'tcpip_socket=1' \
		/etc/postgresql/postmaster.conf.tmp \
		> /dev/null 2>&1; then
		cp /etc/postgresql/postmaster.conf \
		    /etc/postgresql/postmaster.conf.back > /dev/null 2>&1
		mv /etc/postgresql/postmaster.conf.tmp \
		    /etc/postgresql/postmaster.conf > /dev/null 2>&1;
		log="${log}Now restarting postgres to make this take effect."
		status=restart
		/etc/init.d/postgresql restart || true
		log="${log}Waiting for the database to really start."
		sleep 5
	    else
		error="Local database configuration was not successful, trying anyway."
		status=error
		rm -f /etc/postgresql/postmaster.conf.tmp
	    fi
	fi
    fi
    if ! ps xa | grep "postgresql/bin/postmaster" > /dev/null 2>&1 ; then
	/etc/init.d/postgresql start || true
	echo "Waiting for the database to really start."
	status=start
	sleep 5
    fi
elif [ -f /etc/postgresql/postmaster.init ] ; then
    if grep -e 'PGALLOWTCPIP' /etc/postgresql/postmaster.init \
	> /dev/null 2>&1 ; then
	if ! grep -e '^[[:space:]]*PGALLOWTCPIP=yes' \
	    /etc/postgresql/postmaster.init > /dev/null 2>&1 ; then
	    /bin/sed -e \
		's#\# PGALLOWTCPIP=no#PGALLOWTCPIP=yes#;
	s#\# PGALLOWTCPIP=yes#PGALLOWTCPIP=yes#' \
	    /etc/postgresql/postmaster.init \
		> /etc/postgresql/postmaster.init.tmp
	    if grep 'PGALLOWTCPIP=yes' \
		/etc/postgresql/postmaster.init.tmp \
		>/dev/null 2>&1; then
		cp /etc/postgresql/postmaster.init \
		    /etc/postgresql/postmaster.init.back > /dev/null 2>&1
		mv /etc/postgresql/postmaster.init.tmp \
		    /etc/postgresql/postmaster.init >/dev/null 2>&1;
		echo "Now restarting postgres to make this take effect."
		status=restart
		/etc/init.d/postgresql restart || true
		echo "Waiting for the database to really start."
		sleep 5
	    else
		echo "Local database configuration was not successful, trying anyway."
		status=error
		rm -f /etc/postgresql/postmaster.init.tmp
	    fi
	fi
    fi
    if ! ps xa | grep "postgresql/bin/postmaster" > /dev/null 2>&1 ; then
	/etc/init.d/postgresql start || true
	echo "Waiting for the database to really start."
	status=start
	sleep 5
    fi
fi
