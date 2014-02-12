#!/bin/bash
numproc=`pgrep -c php5-fpm`
while true 
do
 	if (($numproc > 9)); then 
	service php5-fpm restart
	fi
	sleep 5
	numproc=`pgrep -c php5-fpm` 
done

