<?php
// configurazione personale
// valore produzione su raspberry
define('ROOTPATH', $_SERVER['HOME'] . '/' ); // default = '/'
// valore ambiente ACX
//define('ROOTPATH', $_SERVER['DOCUMENT_ROOT'] . '/' ); // default = '/'

define('DAEMONIP', '127.0.0.1'); // default = 'localhost'
define('ERRORLEVEL', 'E_ERROR'); // default = 'E_ALL ^ E_NOTICE'

// configurazione generale
define ('COMMENTCHAR','#');
define ('DELSTRING','');
define ('CONFPATH', ROOTPATH.'inc/mpd.conf');
define ('DEFCONFPATH', ROOTPATH.'inc/mpd.conf.default');
define ('NETCONFPATH', ROOTPATH.'inc/network/interfaces');
define ('NETCONFPATHMANUAL', ROOTPATH.'inc/network/interfaces.manual');
define ('NETCONFPATHAUTO', ROOTPATH.'inc/network/interfaces.dhcp');
define ('NETCONFPATHBOOT', ROOTPATH.'inc/network/interfaces.loadatboot');

