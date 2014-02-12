TARGETS = mountkernfs.sh fake-hwclock hostname.sh udev keyboard-setup mountdevsubfs.sh hwclock.sh checkroot.sh mtab.sh kmod checkroot-bootclean.sh checkfs.sh mountall.sh mountall-bootclean.sh urandom udev-mtab procps networking rpcbind nfs-common mountnfs.sh mountnfs-bootclean.sh kbd console-setup alsa-utils bootmisc.sh
INTERACTIVE = udev keyboard-setup checkroot.sh checkfs.sh kbd console-setup
udev: mountkernfs.sh
keyboard-setup: mountkernfs.sh udev
mountdevsubfs.sh: mountkernfs.sh udev
hwclock.sh: mountdevsubfs.sh
checkroot.sh: hwclock.sh fake-hwclock keyboard-setup mountdevsubfs.sh hostname.sh
mtab.sh: checkroot.sh
kmod: checkroot.sh
checkroot-bootclean.sh: checkroot.sh
checkfs.sh: checkroot.sh mtab.sh
mountall.sh: checkfs.sh checkroot-bootclean.sh
mountall-bootclean.sh: mountall.sh
urandom: mountall.sh mountall-bootclean.sh hwclock.sh
udev-mtab: udev mountall.sh mountall-bootclean.sh
procps: mountkernfs.sh mountall.sh mountall-bootclean.sh udev
networking: mountkernfs.sh mountall.sh mountall-bootclean.sh urandom
rpcbind: networking mountall.sh mountall-bootclean.sh
nfs-common: rpcbind hwclock.sh
mountnfs.sh: mountall.sh mountall-bootclean.sh networking rpcbind nfs-common
mountnfs-bootclean.sh: mountall.sh mountall-bootclean.sh mountnfs.sh
kbd: mountall.sh mountall-bootclean.sh mountnfs.sh mountnfs-bootclean.sh
console-setup: mountall.sh mountall-bootclean.sh mountnfs.sh mountnfs-bootclean.sh kbd
alsa-utils: mountall.sh mountall-bootclean.sh mountnfs.sh mountnfs-bootclean.sh
bootmisc.sh: mountnfs-bootclean.sh mountall-bootclean.sh mountall.sh mountnfs.sh udev checkroot-bootclean.sh
