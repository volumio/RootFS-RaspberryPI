#!/bin/sh
# File:         apache-include-postrm.sh
# Changes:
#       20020228 Mark Eichin <eichin@thok.org> Initial version, based
#               on extensive cut&paste from other apache*.sh scripts.
#
# Needs:        $servers - which server to be cleaned up (anything 
#               recognized by apache-*include*.sh
#               $includefile - what file that should be cleaned up.
# Description:  Uses debian postrm arguments to choose to uninclude or 
#               cominclude the file in $includefile.
# Sets:         $restart gets any servers that need restarting 
#               added to it, for later use by restart.sh.  Also
#               sets or passes through $error.

if [ -z "$servers" ] ; then
#    error="No server list specified for apache-include-postrm.sh."
# actually, no servers just means no work for us, not an error.
    :
elif [ -z "$includefile" ] ; then
    error="No include file specified in apache-include-postrm.sh."
else
    status=nothing
    log="${log}Running postrm $1 scripts for $servers servers."
    for server in $servers; do
        case "$1" in
            purge)
                log="${log}using uninclude to purge $server."
                . /usr/share/wwwconfig-common/apache-uninclude_all.sh
                if [ "$status" = "purge" ] ; then
                    restart="$restart $server"
                    status=nothing # we already "consumed" the status
                fi
                ;;
            remove)
                log="${log}using cominclude to remove $server."
                . /usr/share/wwwconfig-common/apache-cominclude_all.sh
                if [ "$status" = "comment" ] ; then
                    restart="$restart $server"
                    status=nothing # we already "consumed" the status
                fi
                ;;
        esac
    done
fi
