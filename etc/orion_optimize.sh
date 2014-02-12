#!/bin/bash
######################################
# Orion RaspyFi Optimize script v0.6 #
######################################

if [ "$2" == "startup" ]; then
## kill useless system processes
#killall -9 avahi-daemon
#killall -9 dbus-daemon
killall -9 exim4
killall -9 ntpd
killall -9 rpc.idmapd
killall -9 rpc.statd
killall -9 rpcbind
killall -9 thd
killall -9 udevd
#killall -9 automount
killall -9 cron
killall -9 atd
#killall -9 dhclient
killall -9 startpar
echo "flush startup settings"
fi


##################
# sound profiles #
##################

# default
if [ "$1" == "default" ]; then
echo -n ondemand > /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor
ifconfig eth0 mtu 1500
echo cfq > /sys/block/mmcblk0/queue/scheduler
echo 60 > /proc/sys/vm/swappiness
echo 6000000 > /proc/sys/kernel/sched_latency_ns
echo 1000000 > /proc/sys/kernel/sched_rt_period_us
echo 950000 > /proc/sys/kernel/sched_rt_runtime_us
echo "flush DEFAULT sound profile"
fi


## kernel latency settings (1.0 Beta - raspyfi.10betatest.img )
## best settings with previous beta image (raspyfi.10betatest.img) but
## too "cold" sound and less OS stability with current image ( betaacx.img )

# beta1
if [ "$1" == "beta1" ]; then
echo -n performance > /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor
ifconfig eth0 mtu 1024
echo noop > /sys/block/mmcblk0/queue/scheduler
echo 0 > /proc/sys/vm/swappiness
echo 100000 > /proc/sys/kernel/sched_latency_ns
echo 10000 > /proc/sys/kernel/sched_rt_period_us
echo 9500 > /proc/sys/kernel/sched_rt_runtime_us
#echo 3 > /proc/sys/vm/drop_caches
echo "flush BETA1 sound profile"
fi

## kernel latency settings (1.0 BetaACX - betaacx.img ) MOD1
## "warm" sound but little less "focus" 

# mod1
if [ "$1" == "mod1" ]; then
echo -n performance > /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor
ifconfig eth0 mtu 1024
echo noop > /sys/block/mmcblk0/queue/scheduler
echo 0 > /proc/sys/vm/swappiness
echo 1000000 > /proc/sys/kernel/sched_latency_ns
echo 166666 > /proc/sys/kernel/sched_rt_period_us
echo 158333 > /proc/sys/kernel/sched_rt_runtime_us
echo "flush MOD1 sound profile 'warm'"
fi

## kernel latency settings (1.0 BetaACX - betaacx.img ) MOD2 
## very good sound "balance" and "transparency". My choice for current betaacx.img

# mod2
if [ "$1" == "mod2" ]; then
echo -n performance > /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor
ifconfig eth0 mtu 1024
echo noop > /sys/block/mmcblk0/queue/scheduler
echo 0 > /proc/sys/vm/swappiness
echo 500000 > /proc/sys/kernel/sched_latency_ns
echo 124999 > /proc/sys/kernel/sched_rt_period_us
echo 118749 > /proc/sys/kernel/sched_rt_runtime_us
echo "flush MOD2 sound profile 'balance and transparency'"
fi

echo "Usage: $0 {default|beta1|mod1|mod2} {startup}"
exit 1
