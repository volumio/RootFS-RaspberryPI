[Contents]
Índice de Contenidos:

  DESCRIPCIÓNDESCRIPTION
  OPTIONSOPTIONS
  IntroducciónOverview
  Soporte de RatónMouse Support

  TeclasKeys
    Otras TeclasMiscellaneous Keys
    Paneles de DirectorioDirectory Panels
    Quick searchQuick search
    Línea de Órdenes del SistemaShell Command Line
    Teclas Generales de MovimientoGeneral Movement Keys
    Teclas de la Línea de EntradaInput Line Keys

  Barra de MenúMenu Bar
    Menús Izquierdo y Derecho (Arriba y Abajo)Left and Right Menus
      Listado...Listing Mode...
      Modo de Ordenación...Sort Order...
      Filtro...Filter...
      ReleerReread
    Menú de ArchivoFile Menu
      Cambiar de directorioQuick cd
    Menú de UtilidadesCommand Menu
      Árbol de DirectoriosDirectory Tree
      Buscar ArchivoFind File
      Búsquedas ExternasExternal panelize
      FavoritosHotlist
      Editar el Archivo de ExtensionesExtension File Edit
      Trabajos en Segundo PlanoBackground jobs
      Edición del Archivo de MenúMenu File Edit
    Menú de OpcionesOptions Menu
      ConfiguraciónConfiguration
      PresentaciónLayout
      ConfirmaciónConfirmation
      Juego de caracteresDisplay bits
      Aprender teclasLearn keys
      Sistema de Archivos Virtual (VFS)Virtual FS
      Guardar ConfiguraciónSave Setup

  Ejecutando Órdenes del Sistema OperativoExecuting operating system commands
    Comando cd InternoThe cd internal command
    Sustitución de MacroMacro Substitution
    Soporte de SubshellThe subshell support
  Cambiar PermisosChmod
  Cambiar DueñoChown
  Cambiar Dueño y PermisosAdvanced Chown
  Operaciones con ArchivosFile Operations
  Copiar/Renombrar con MáscaraMask Copy/Rename
  Seleccionar/Deseleccionar ArchivosSelect/Unselect Files
  Visor de Archivos InternoInternal File Viewer
  Editor de Archivos InternoInternal File Editor
  TerminaciónCompletion
  Sistemas de Archivos Virtuales (VFS)Virtual File System
    Sistema de archivos Tar (tarfs)Tar File System
    Sistema de archivos FTP (FTPfs)FTP File System
    Sistema de archivos a través de SHell (FISH)FIle transfer over SHell filesystem
    Sistema de archivos SMBSMB File System
    Sistema de archivos de RecuperaciónUndelete File System
    Sistema de archivos EXTerno (extfs)EXTernal File System
  ColoresColors
  SkinsSkins
    Descripción de secciones y parámetrosSkins sections
    Definiciones de pares de coloresSkins colors
    Trazado de líneasSkins lines
    CompatibilidadSkins oldcolors
  Resaltado de nombresFilenames Highlight
  Ajustes EspecialesSpecial Settings
  Ajustes del TerminalTerminal databases

  ARCHIVOS AUXILIARESFILES
  DISPONIBILIDADAVAILABILITY
  VÉASE TAMBIÉNSEE ALSO
  AUTORESAUTHORS
  ERRORESBUGS
  TRADUCCIÓNTRANSLATION
  Licencia GNULicencia GNU
  Licencia GNU (Español)Licencia GNU (Español)
  Cuadros de diálogoQueryBox
  Uso de la ayudaHow to use help
[DESCRIPTION]
DESCRIPCIÓN

"Midnight Commander" (Comandante de Medianoche) es un navegador de directorios/gestor de archivos para sistemas operativos tipo Unix.[OPTIONS]

OPCIONES


-a, --stickchars
        Deshabilita el uso de caracteres gráficos para el dibujo de líneas.

-b, --nocolor
        Fuerza el uso de la pantalla de Blanco y Negro.

-c, --color
        Fuerza el uso del modo color. Véase la sección ColoresColors para más información.

-C arg, --colors=arg
        Usado para especificar un juego de colores diferentes desde la línea de órdenes. El formato de arg está documentado en la sección ColoresColors.

-S arg  Permite elegir un skin o apariencia para mc. La configuración de las características de visualización (colores, líneas, etc.) se explica detalladamente en la sección SkinsSkins.

-d, --nomouse
        Deshabilita el soporte de ratón.

-e [arch], --edit[=arch]
        Iniciar el editor interno. Si se indica un archivo, editarlo. Véase la página de manual de mcedit (1).

-f, --datadir
        Muestra las rutas de búsqueda compiladas para archivos de Midnight Commander.

-k, --resetsoft
        Resetea softkeys a su valor por defecto según la base de datos de termcap/terminfo. Sólo útil en terminales HP cuando la función keys no funciona.

-l reg, --ftplog=reg
        Guarda el diálogo FTPfs con el servidor en el archivo.

-P arch, --printwd=arch
        Al salir del programa, Midnight Commander registrará el último directorio de trabajo en el archivo indicado. Esta opción no debe ser usada directamente, sino desde un guión de shell adecuado, para dejar como directorio activo el directorio que estaba en uso dentro de Midnight Commander. Consúltese en los archivos /usr/share/mc/bin/mc.sh (usuarios de bash y zsh) y /usr/share/mc/bin/mc.csh (usuarios de tcsh) la manera de definir mc como un alias para el correspondiente guión de shell.

-s, --slow
        Activa el modo para terminales lentos. En este modo el programa no dibuja bordes con líneas de caracteres y desactiva el modo detallado.

-t, --termcap
        Usado sólo si el código fue compilado con Slang y terminfo: hace que Midnight Commander use el valor de la variable de entorno TERMCAP para obtener la información del terminal, en vez de la base de datos de terminales del sistema.

-u, --nosubshell
        Deshabilita el uso de shell concurrente (sólo tiene sentido si este Midnight Commander fue construido con soporte de shell concurrente).

-U, --subshell
        Habilita el uso de shell concurrente (sólo tiene sentido si este Midnight Commander fue construido con soporte de subshell opcional).

-v arch, --view=arch
        Iniciar el visor interno para ver el archivo indicado. Véase la página de manual de mcview (1).

-V, --version
        Muestra la versión del programa.

-x, --xterm
        Fuerza el modo xterm. Usado cuando se ejecuta en terminales con características de xterm (dos modos de pantalla, y pueden enviar secuencias de escape de ratón).

-X, --no-x11
        Do not use X11 to get the state of modifiers Alt, Ctrl, Shift

-g, --oldmouse
        Force a "normal tracking" mouse mode. Used when running on xterm-capable terminals (tmux/screen).

Si se especifica, el primer directorio se mostrará en el panel activo y el segundo directorio en el otro panel.[Overview]
Introducción

La pantalla de Midnight Commander está divida en cuatro partes. La mayor parte de la pantalla está ocupada por los dos paneles de directorio. Por defecto, la segunda línea más inferior de la pantalla es la línea de órdenes del sistema, y la línea inferior muestra las etiquetas de las teclas de función. La línea superior es la barra de menúMenu Bar. La línea de la barra de menú podría no ser visible, pero aparece si pulsamos en la primea línea de la pantalla con el ratón o pulsamos la tecla F9.

Midnight Commander pone a la vista dos directorios al mismo tiempo. Uno de los paneles es el panel actual (hay una barra de selección en el panel actual). La mayoría de las operaciones tienen lugar en el panel actual. Algunas operaciones con archivos como Renombrar y Copiar utilizan por defecto el directorio del panel no seleccionado como destino, pero siempre solicitan una confirmación previa y podemos cambiarlo. Para más información, ver las secciones sobre los Paneles de DirectorioDirectory Panels, los Menús Izquierdo y DerechoLeft and Right Menus y el Menú de ArchivoFile Menu.

Podemos ejecutar comandos del sistema desde el Midnight Commander simplemente escribiéndolos. Todo lo que escribamos aparecerá en la línea de órdenes del sistema y cuando pulsemos Intro, Midnight Commander ejecutará estos comandos; ver las secciones Línea de Órdenes del SistemaShell Command Line y Teclas de la Línea de EntradaInput Line Keys para aprender más sobre la línea de órdenes.[Mouse Support]
Soporte de Ratón

Se puede utilizar Midnight Commander con un ratón o mouse. Se activa cuando estamos ejecutándolo en un entorno gráfico con un terminal tipo xterm(1) (funciona incluso si realizamos una conexión de telnet, ssh o rlogin a otra máquina desde el xterm) o si estamos ejecutándolo en una consola Linux y tenemos el servidor gpm cargado.

Cuando pulsamos el botón izquierdo del ratón sobre un archivo en los paneles de directorios, ese archivo es seleccionado; si lo hacemos con el botón derecho, el archivo es marcado (o desmarcado, dependiendo del estado previo).

Una doble pulsación sobre un archivo intentará ejecutar el comando si se trata de un programa ejecutable; y si la extensión del archivo tiene un programa asociado a esa extensiónExtension File Edit, se ejecuta el programa especificado.

Además, es posible ejecutar los comandos asignados a las teclas de función pulsando con el ratón sobre las etiquetas de la línea inferior de la pantalla.

Si se pulsa un botón del ratón sobre la línea del borde superior del panel de directorio, se sube una página hacia atrás. Asimismo, una pulsación sobre la línea inferior baja una página hacia adelante. Éste procedimiento vale también para el Visor de AyudaContents y el Árbol de DirectoriosDirectory Tree.

El valor por defecto de auto repetición para los botones del ratón es 400 milisegundos. Este valor se puede modificar editando el archivo ~/.config/mc/iniSave Setup y cambiando el parámetro mouse_repeat_rate.

Si estamos ejecutando Midnight Commander con soporte para ratón, podemos recuperar el comportamiento habitual del ratón (cortar y pegar texto) manteniendo pulsada la tecla Mayúsculas.

[Keys]
Teclas

Algunos comandos en Midnight Commander implican el uso de las teclas Control (etiquetada habitualmente CTRL o CTL) y Meta (identificada como ALT o incluso Compose). En este manual usaremos las siguientes abreviaturas:

Ctrl-<car>
        significa mantener pulsada la tecla Control mientras se pulsa el carácter <car>. Así, Ctrl-f sería: manteniendo pulsada la tecla Control teclear f.

Alt-<car>
        significa mantener pulsada la tecla Alt o Meta mientras pulsamos el carácter <car>. Si no hay tecla Alt ni Meta, pulsar Esc, soltar, y entonces pulsar el carácter <car>.

Mayús-<car>
        significa mantener pulsada la tecla de Mayúsculas (o Shift) y teclear <car>.

Todas las líneas de entrada en Midnight Commander usan una aproximación a las asociaciones de teclas del editor GNU Emacs.

Hay bastantes secciones que hablan acerca de las teclas. Las siguientes son las más importantes.

La sección Menú de ArchivoFile Menu documenta los atajos de teclado para los comandos que aparecen en el Menú de Archivo. Esta sección incluye las teclas de función. La mayor parte de esos comandos realizan alguna acción, normalmente sobre el archivo seleccionado o sobre los archivos marcados.

La sección Paneles de DirectorioDirectory Panels documenta las teclas que seleccionan un archivo o marcan archivos como objetivo de una acción posterior (la acción normalmente es una del menú de archivo).

La sección Línea de Órdenes del SistemaShell Command Line lista las teclas que son usadas para introducir o editar líneas de comandos. La mayor parte de ellas copian nombres de archivos y demás desde los paneles de directorio a la línea de órdenes (para evitar un tecleado excesivo) o acceden al historial de la línea de órdenes.

Teclas de línea de EntradaInput Line Keys Son usadas para editar líneas de entrada. Esto implica la línea de órdenes y las líneas de entrada en las ventanas de preguntas.[Miscellaneous Keys]
Otras Teclas

Tienen cabida aquí algunas teclas que no encajan completamente en ninguna de las anteriores categorías:

Intro. Si hay algún texto en la línea de órdenes (la de la parte inferior de los paneles), entonces ese comando es ejecutado. Si no hay texto en la línea de comandos entonces si la barra de selección está situada sobre un directorio Midnight Commander realiza un chdir(2) al directorio seleccionado y recarga la información en el panel; si la selección es un archivo ejecutable entonces es ejecutado. Por último, si la extensión del archivo seleccionado coincide con una de las extensiones en el archivo de extensionesExtension File Edit entonces se ejecuta la aplicación correspondiente.

Ctrl-l  redibuja toda la pantalla de Midnight Commander.

Ctrl-x c
        Cambiar PermisosChmod de un archivo o un conjunto de archivos marcados.

Ctrl-x o
        Cambiar DueñoChown del archivo actual o de los archivos marcados.

Ctrl-x l
        crea enlaces.

Ctrl-x s
        crea enlaces simbólicos.

Ctrl-x Ctrl-s
        edita enlaces simbólicos.

Ctrl-x i
        cambia el panel opuesto al modo de información.

Ctrl-x q
        cambia el panel opuesto al modo de vista rápida.

Ctrl-x !
        ejecuta Búsquedas ExternasExternal panelize.

Ctrl-x h
        añade el sitio actual a la lista de FavoritosHotlist.

Alt-!   ejecuta una orden del sistema y muestra su salida en el Visor de Archivos InternoInternal File Viewer.

Alt-?   Buscar ArchivoFind File.

Alt-c   permite Cambiar de DirectorioQuick cd.

Ctrl-o  en la consola de Linux o FreeBSD o bajo un xterm, se muestra la salida de la orden anterior. En la consola de Linux, Midnight Commander usa un programa externo (cons.saver) para controlar la copia y restauración de la pantalla.

Cuando se haya creado Midnight Commander con soporte de subshell incluido, podemos pulsar Ctrl-o en cualquier momento y volver a la pantalla principal; para volver a nuestra aplicación bastará con volver a pulsar Ctrl-o. Si tenemos una aplicación suspendida en esta situación, no podremos ejecutar otros programas desde Midnight Commander hasta que terminemos la aplicación suspendida.[Directory Panels]
Paneles de Directorio

Esta sección enumera las teclas que operan en los paneles de directorio. Si queremos saber cómo cambiar la apariencia de los paneles, deberemos echar un vistazo a la sección Menús Izquierdo y DerechoLeft and Right Menus.

Tab, Ctrl-i
        cambia el panel actual. El panel activo deja de serlo y el no activo pasa a ser el nuevo panel activo. La barra de selección se mueve del antiguo panel al nuevo, desaparece de aquel y aparece en éste.

Insertar, C-t
        para marcar archivos (y/o directorios) como seleccionados podemos usar la tecla insertar (secuencia kich1 de terminfo). Para deseleccionar, basta repetir la operación sobre los archivos y/o directorios antes marcados.

M-e     permite mostrar nombres en el panel con otra codificación de caracteres. Los nombres se convierten a la codificación del sistema para mostrarlos. Para desactivar esta recodificación basta seleccionar la entrada (..) para el directorio superior. Para cancelar las conversiones en cualquier directorio seleccionar «Sin traducción» en el diálogo de selección de código.

Alt-g, Alt-r, Alt-j
        usadas para seleccionar el archivo superior en un panel, el archivo central y el inferior del panel, respectivamente.

Alt-t   rota el listado de pantalla actual para mostrar el siguiente modo de listado. Con esto es posible intercambiar rápidamente de un listado completo al regular o breve, así como al modo de listado definido por el usuario.

Ctrl-\ (control-Contrabarra)
        muestra la lista de sitios FavoritosHotlist y permite cambiar al directorio seleccionado.


        * N. del T.: En el teclado castellano, existe un pequeño inconveniente, dado que la contrabarra, no se consigue con una sola pulsación, por lo que este método no funciona directamente.

+ (más)
        usado para seleccionar (marcar) un grupo de archivos. Midnight Commander ofrecerá distintas opciones. Indicando Sólo archivos los directorios no se seleccionan. Con los Caracteres Comodín habilitados, se pueden introducir expresiones regulares del tipo empleado en los patrones de nombres de la shell (poniendo * para cero o más caracteres y ? para uno o más caracteres). Si los Caracteres Comodín están deshabilitados, entonces la selección de archivos se realiza con expresiones regulares normales. Véase la página de manual de ed (1). Finalmente, si no se activa Distinguir May/min la selección se hará sin distinguir caracteres en mayúsculas o minúsculas.

- (menos) o \ (contrabarra)
        usaremos la tecla - o "\" para deseleccionar un grupo de archivos. Ésta es la operación contraria a la realizada por la tecla Más (+).


        * N. del T.: La tecla que realiza originalmente la función descrita es el Menos (-) ya que ésta es la utilizada en la aplicación originaria, Comandante Norton.

Arriba, Ctrl-p
        desplaza la barra de selección a la entrada anterior en el panel.

Abajo, Ctrl-n
        desplaza la barra de selección a la entrada siguiente en el panel.

Inicio, Alt-<
        desplaza la barra de selección a la primera entrada en el panel.

Fin, Alt->
        desplaza la barra de selección a la última entrada en el panel.

AvPág (Página adelante), Ctrl-v
        desplaza la barra de selección a la página siguiente.

RePág (Página atrás), Alt-v
        desplaza la barra de selección a la página anterior.

Alt-o   si el otro panel es un panel con lista de archivos y estamos situados en un directorio en el panel activo actual, entonces otro panel se posiciona dentro del directorio del panel activo (como la tecla de Emacs Ctrl-o) en otro caso el otro panel es posicionado el directorio padre del directorio seleccionado en el panel activo.

Alt-i   cambiar el directorio en el panel opuesto de manera que coincida con el panel actual. Si es necesario se cambiará también el panel opuesto a modo listado, pero si el panel actual no está en modo listado no se cambiará de modo el otro.

Ctrl-RePág, Ctrl-AvPág
        solamente bajo la consola Linux: realiza un chdir ".." o al directorio actualmente seleccionado respectivamente.

Alt-y   cambia al anterior directorio visitado, equivale a pulsar < con el ratón.

Alt-u   cambia al siguiente directorio visitado, equivale a pulsar > con el ratón.

Alt-Mayús-h, Alt-H
        muestra el historial de directorios visitados, equivale a pulsar la v con el ratón.[Quick search]
Quick search


Ctrl-s, Alt-s
        inicia la búsqueda de un archivo en la lista de directorios (panel activo). A partir de ese momento las teclas pulsadas se van añadiendo a la cadena en búsqueda y no a la línea de órdenes. Si la opción de Mostrar Mini-estado está habilitada, la cadena a buscar se podrá ver en la línea de mini-estado. Conforme tecleemos, dentro del panel activo la barra de selección se desplazará al siguiente archivo o directorio cuyo nombre coincida con las letras introducidas. Se pueden usar las teclas borrar o suprimir para corregir errores de escritura. Si pulsamos Ctrl-s de nuevo, se busca la siguiente coincidencia.[Shell Command Line]
Línea de Órdenes del Sistema

Esta sección enumera las teclas útiles para evitar la excesiva escritura cuando se introducen órdenes del sistema.

Alt-Intro
        copia el nombre de archivo seleccionado a la línea de órdenes.

Ctrl-Intro
        igual que Alt-Intro. Puede no funcionar en ciertos sistemas o con algunos terminales.

Ctrl-Mayús-Intro
        copia la ruta completa del archivo actual en la línea de órdenes. Puede no funcionar en ciertos sistemas o con algunos terminales.

Alt-Tab realiza una terminación automáticaCompletion del nombre de archivo, comando, variable, nombre de usuario y host.

Ctrl-x t, Ctrl-x Ctrl-t
        copia los archivos marcados (o si no los hay, el archivo seleccionado) del panel activo (Ctrl-x t) o del otro panel (Ctrl-x Ctrl-t) a la línea de órdenes.

Ctrl-x p, Ctrl-x Ctrl-p
        la primera secuencia de teclas copia el nombre de la ruta de acceso actual a la línea de órdenes, y la segunda copia la ruta del otro panel a la línea de órdenes.

Ctrl-q  el comando cita (quote) puede ser utilizado para insertar caracteres que de otro modo serían interpretados por Midnight Commander (como el símbolo '+')

Alt-p, Alt-n
        usaremos esas teclas para navegar a través del histórico de comandos. Alt-p devuelve la última entrada, Alt-n devuelve la siguiente.

Alt-h   visualiza el historial para la línea de entrada actual.[General Movement Keys]
Teclas Generales de Movimiento

El visor de ayuda, el visor de archivo y el árbol de directorios usan un código de control de movimiento común. Por consiguiente, reconocen las mismas teclas. Además, cada uno reconoce algunas otras teclas propias.

Otras partes de Midnight Commander utilizan algunas de las mismas teclas de movimiento, por lo que esta sección podría ser aplicada a ellas también.

Arriba, Ctrl-p
        mueve una línea hacia arriba.

Abajo, Ctrl-n
        mueve una línea hacia abajo.

RePág (Página atrás), Alt-v
        mueve una página completa hacia atrás.

AvPág (Página adelante), Ctrl-v
        mueve una página hacia delante.

Inicio  mueve al principio.

Fin     mueve al final.

El visor de ayuda y el de archivo reconocen las siguientes teclas aparte de las mencionadas anteriormente:

b, Ctrl-b, Ctrl-h, Borrar, Suprimir
        mueve una página completa hacia atrás.

Barra espaciadora
        mueve una página hacia delante.

u, d    mueve la mitad de la página hacia atrás o adelante.

g, G    mueve al principio o al final.[Input Line Keys]
Teclas de la Línea de Entrada

Las líneas de entrada (usadas en la línea de órdenesShell Command Line y para los cuadros de diálogo en el programa) reconocen esas teclas:

Ctrl-a  coloca el cursor al comienzo de la línea.

Ctrl-e  coloca el cursor al final de la línea.

Ctrl-b, Izquierda
        desplaza el cursor una posición a la izquierda.

Ctrl-f, Derecha
        desplaza el cursor una posición a la derecha.

Alt-f   avanza una palabra.

Alt-b   retrocede una palabra.

Ctrl-h, Borrar
        borra el carácter anterior.

Ctrl-d, Suprimir
        elimina el carácter de la posición del cursor.

Ctrl-@  sitúa una marca para cortar.

Ctrl-w  copia el texto entre el cursor y la marca a la caché de eliminación y elimina el texto de la línea de entrada.

Alt-w   copia el texto entre el cursor y la marca a la caché de eliminación.

Ctrl-y  restaura el contenido de la caché de eliminación.

Ctrl-k  elimina el texto desde el cursor hasta el final de la línea.

Alt-p, Alt-n
        usaremos esas teclas para desplazarnos a través del historial de comandos. Alt-p nos lleva a la última entrada, Alt-n nos sitúa en la siguiente.

Alt-Ctrl-h, Alt-Borrar
        borra la palabra anterior.

Alt-Tab realiza una terminaciónCompletion del nombre de archivo, comando, variable, nombre de usuario o host.

[Menu Bar]
Barra de Menú

La barra de menú aparece cuando pulsamos F9 o pulsamos el botón del ratón sobre la primera fila de la pantalla. La barra de menú tiene cinco submenús: "Izquierdo", "Archivo", "Utilidades", "Opciones" y "Derecho".

Los Menús Izquierdo y DerechoLeft and Right Menus nos permiten modificar la apariencia de los paneles de directorio izquierdo y derecho.

El Menú de ArchivoFile Menu lista las acciones que podemos realizar sobre el archivo actualmente seleccionado o sobre los archivos marcados.

El Menú de UtilidadesCommand Menu lista las acciones más generales y que no guardan relación con la selección actual de archivos.[Left and Right Menus]
Menús Izquierdo y Derecho (Arriba y Abajo)

La presentación de los paneles de directorio puede ser cambiada desde los menús Izquierdo y Derecho (denominados Arriba y Abajo si hemos elegido la disposición horizontal de paneles en las opciones de presentaciónLayout).[Listing Mode...]
Listado...

La vista en modo "Listado" se usa para mostrar la lista de archivos. Hay cuatro modos disponibles: Completo, Breve, Largo, y Definido por el usuario.

En modo completo se muestra el nombre del archivo, su tamaño y la fecha y hora de modificación.

Breve muestra sólo los nombres de archivo, en dos columnas. Esto permite ver el doble de entradas que en los otros modos.

El modo largo es similar a la salida de la orden ls -l. Este modo requiere todo el ancho de la pantalla.

Si se elige el modo definido por el usuario, hay que especificar el formato de presentación. Un formato personalizado tiene que comenzar con la indicación de tamaño de panel, que puede ser "half" (medio) o "full" (completo) para tener respectivamente dos paneles de media pantalla o un único panel a pantalla completa. Tras el tamaño se puede colocar el número "2" para dividir el panel en dos columnas.

A continuación van los campos deseados con especificación opcional del tamaño. Los campos que se pueden emplear son:

name    nombre del archivo.

size    tamaño del archivo.

bsize   forma alternativa para size. Muestra el tamaño de los archivos y SUB-DIR o DIR-ANT para directorios.

type    carácter de tipo de archivo. Este carácter se asemeja a lo mostrado por la orden ls -F: * para archivos ejecutables, / para directorios, @ para enlaces, = para sockets, - para los dispositivos en modo carácter, + para dispositivos en modo bloque, | para tuberías, ~ para enlaces simbólicos a directorios y ! para enlaces rotos (enlaces que no apuntan a nada).

mark    un asterisco si el archivo está marcado, o un espacio si no lo está.

mtime   fecha y hora de la última modificación del contenido del archivo.

atime   fecha y hora del último acceso al archivo.

ctime   fecha y hora del último cambio del archivo.

perm    cadena representando los permisos del archivo.

mode    valor en octal representando los permisos del archivo.

nlink   número de enlaces al archivo.

ngid    Identificador de Grupo, GID (numérico).

nuid    Identificador de Usuario, UID (numérico).

owner   propietario del archivo.

group   grupo del archivo.

inode   número de inodo del archivo.

Además, podemos ajustar la apariencia del panel con:

space   un espacio.

|       añadir una línea vertical.

Para fijar el tamaño de un campo basta añadir : seguido por el número de caracteres que se desee. Si tras el número colocamos el símbolo + el tamaño indicado será el tamaño mínimo, y si hay espacio de sobra se extenderá más el campo.

Como ejemplo, el listado Completo corresponde al formato:

half type name | size | mtime

Y el listado Largo corresponde a:

full perm space nlink space owner space group space size space mtime space name

Éste es un bonito formato de pantalla definido por el usuario:

half name | size:7 | type mode:3

Los paneles admiten además los siguientes modos:

"Información"
        La vista de información muestra detalles relativos al archivo seleccionado y, si es posible, sobre el sistema de archivos usado.

"Árbol"
        La vista en árbol es bastante parecida a la utilidad árbol de directoriosDirectory Tree. Para más información véase la sección correspondiente.

"Vista Rápida"
        En este modo, en el panel aparece visorInternal File Viewer reducido que muestra el contenido del archivo seleccionado. Si se activa el panel (con el tabulador o con el ratón), se dispone de los funciones usuales del visor.[Sort Order...]
Modo de Ordenación...

Los ocho modos de ordenación son por nombre, por extensión, por hora de modificación, por hora de acceso, por la hora de modificación de la información del inodo, por tamaño, por inodo y desordenado. En el cuadro de diálogo del modo de ordenación podemos elegir el modo de ordenación así como especificar si deseamos que éste se realice en orden inverso chequeando la casilla Invertir.

Por defecto, los directorios se colocan ordenados antes que los archivos. Esto se puede cambiar en Configuración dentro del Menú de OpcionesOptions Menu activando la opción Mezclar archivos y directorios.[Filter...]
Filtro...

La utilidad filtro nos permite seleccionar con un patrón (por ejemplo *.tar.gz) los archivos a listar. Indiferentes al patrón de filtro, siempre se muestran todos los directorios y enlaces a directorios.[Reread]
Releer

El comando releer recarga la lista de archivos en el directorio. Esto es útil si otros procesos han creado, borrado o modificado archivos. Si hemos panelizado los nombres de los archivos en un panel, esto recargará los contenidos del directorio y eliminará la información panelizada. Véase la sección Búsquedas externasExternal panelize para más información.[File Menu]
Menú de Archivo

Midnight Commander utiliza las teclas de función F1 - F10 como atajos de teclado para los comandos que aparecen en el menú de Archivo. Las secuencias de escape para las Fkeys son características de terminfo desde kf1 hasta kf10. En terminales sin soporte de teclas de función, podemos conseguir la misma funcionalidad pulsando la tecla Esc seguido de un número entre 1 y 9 ó 0 (correspondiendo a las teclas F1 a F9 y F10 respectivamente).

El menú de Archivo recoge las siguientes opciones (con los atajos de teclado entre paréntesis):

Ayuda (F1)

Invoca el visor hipertexto de ayuda interno. Dentro del visor de ayudaContents, podemos usar la tecla Tab para seleccionar el siguiente enlace y la tecla Intro para seguir ese enlace. Las teclas Espacio y Borrar son usadas para mover adelante y atrás en una página de ayuda. Pulsando F1 de nuevo para obtener la lista completa de teclas válidas.

Menú de Usuario (F2)

Invoca el Menú de usuarioMenu File Edit El menú de usuario otorga una manera fácil de tener usuarios con un menú y añadir asimismo características extra a Midnight Commander.

Ver (F3, Mayús-F3)

Visualiza el archivo seleccionado. Por defecto invoca el Visor de Archivos InternoInternal File Viewer pero si la opción "Usar visor interno" está desactivada, invoca un visor de archivos externo especificado por la variable de entorno VIEWER. Si VIEWER no está definida se aplica la variable PAGER y si ésta tampoco, se invoca al comando "view". Con Mayús-F3, se abre directamente el visor interno, pero sin realizar ningún tipo de formateo o preprocesamiento del archivo.

Ejecutar y Ver (Alt-!)

El comando con los argumentos indicados se ejecuta, y la salida se muestra usando el visor de archivos interno. Como argumento se ofrece, por defecto, el nombre seleccionado en el panel.

Editar (F4)

Invoca el editor vi, u otro especificado en la variable de entorno EDITOR, o el Editor de Archivos InternoInternal File Editor si la opción use_internal_edit está activada.

Copiar (F5)

Sobreimpresiona una ventana de entrada con destino por defecto al directorio del panel no seleccionado y copia el archivo actualmente seleccionado (o los archivos marcados, si hay al menos uno marcado) al directorio especificado por el usuario en la ventana. Space for destination file may be preallocated relative to preallocate_space configure option. Durante este proceso, podemos pulsar Ctrl-c o Esc para anular la operación. Para más detalles sobre la máscara de origen (que será normalmente * o ^\(.*\)$ dependiendo de la selección de Uso de los patrones del shell) y los posibles comodines en destino véase Máscara copiar/renombrarMask Copy/Rename.

En algunos sistemas, es posible hacer la copia en segundo plano pulsando en el botón de segundo plano con el ratón (o pulsando Alt-b en el cuadro de diálogo). Los Trabajos en Segundo PlanoBackground jobs son utilizados para controlar los procesos en segundo plano.

Crear Enlace (Ctrl-x l)

Crea un enlace al archivo actual.

Crear Enlace Simbólico (Ctrl-x s)

Crea un enlace simbólico al archivo actual. Un enlace es como una copia del archivo, salvo que el original y el destino representan un único archivo físico, los mismos datos reales. En consecuencia, si editamos cualquiera de los archivos, los cambios que realicemos aparecerán en todos los archivos. Reciben también el nombre de alias o accesos directos.

Un enlace aparece como un archivo real. Después de crearlo, no hay modo de decir cuál es el original y cuál el enlace. Si borramos uno de ellos el otro aún seguirá intacto. Es muy difícil advertir que los archivos representan la misma imagen. Usaremos estos enlaces cuando no necesitemos saberlo.

Un enlace simbólico es, en cambio, sólo una referencia al nombre del archivo original. Si se borra el archivo original, el enlace simbólico queda sin utilidad. Es bastante fácil advertir que los archivos representan la misma imagen. Midnight Commander muestra un símbolo "@" delante del nombre del archivo si es un enlace simbólico a alguna parte (excepto a un directorio, caso en que muestra una tilde (~)). El archivo original al cual apunta el enlace se muestra en la línea de estado si la opción "Mini estado" está habilitada. Usaremos enlaces simbólicos cuando queramos evitar la confusión que pueden causar los enlaces físicos.

Renombrar/Mover (F6)

Presenta un diálogo de entrada proponiendo como directorio de destino el directorio del panel no activo, y mueve allí, o bien los archivos marcados o en su defecto el archivo seleccionado. El usuario puede introducir en el diálogo un destino diferente. Durante el proceso, se puede pulsar Ctrl-c o Esc para abortar la operación. Para más detalles, véase más arriba la operación Copiar, dado que la mayoría de los aspectos son similares.

En algunos sistemas, es posible hacer la copia en segundo plano pulsando con el ratón en el susodicho botón de segundo plano (o pulsando Alt-o en el cuadro de diálogo). Con Procesos en 2º planoBackground jobs se puede controlar estas tareas.

Crear Directorio (F7)

Presenta un diálogo de entrada y crea el directorio especificado.

Borrar (F8)

Borra, o bien los archivos marcados o en su defecto el archivo seleccionado en el panel activo. Durante el proceso, se puede pulsar Ctrl-c o Esc para abortar la operación.

Cambiar Directorio (Alt-c) Usaremos el comando Cambiar de directorioQuick cd si tenemos llena la línea de órdenes y queremos hacer un cd a algún lugar.

Seleccionar Grupo (+)

Se utiliza para seleccionar (marcar) un grupo de archivos. Midnight Commander ofrecerá distintas opciones. Indicando Sólo archivos los directorios no se seleccionan. Con los Caracteres Comodín habilitados, se pueden introducir expresiones regulares del tipo empleado en los patrones de nombres de la shell (poniendo * para cero o más caracteres y ? para uno o más caracteres). Si los Caracteres Comodín están deshabilitados, entonces la selección de archivos se realiza con expresiones regulares normales. Véase la página de manual de ed (1). Finalmente, si no se activa Distinguir May/min la selección se hará sin distinguir caracteres en mayúsculas o minúsculas.

De-seleccionar Grupo (\)

Utilizado para deseleccionar un grupo de archivos. Es la operación antagonista al comando Selecciona grupo.

Salir (F10, Mayús-F10)

Finaliza Midnight Commander. Mayús-F10 es usado cuando queremos salir y estamos utilizando la envoltura del shell. Mayús-F10 no nos llevará al último directorio visitado con Midnight Commander, en vez de eso nos llevará al directorio donde fue invocado Midnight Commander.[Quick cd]
Cambiar de directorio

Este comando es útil si tenemos completa la línea de órdenes y queremos hacer un cdThe cd internal command a algún lugar sin tener que cortar y pegar sobre la línea. Este comando sobreimpresiona una pequeña ventana, donde introducimos todo aquello que es válido como argumento del comando cd en la línea de órdenes y después pulsamos intro. Este comando caracteriza todas las cualidades incluidas en el comando cd internoThe cd internal command.[Command Menu]
Menú de Utilidades

Árbol de directoriosDirectory Tree muestra una figura con estructura de árbol con los directorios.

Buscar archivoFind File permite buscar un archivo específico. El comando "Intercambiar paneles" intercambia los contenidos de los dos paneles de directorios.

El comando "Activa/desactiva paneles" muestra la salida del último comando del shell. Esto funciona sólo en xterm y en una consola Linux y FreeBSD.

El comando Compara directorios (Ctrl-x d) compara los paneles de directorio uno con el otro. Podemos usar el comando Copiar (F5) para hacer ambos paneles idénticos. Hay tres métodos de comparación. El método rápido compara sólo el tamaño de archivo y la fecha. El método completo realiza una comparación completa octeto a octeto. El método completo no está disponible si la máquina no soporta la llamada de sistema mmap(2). El método de comparación de sólo tamaño sólo compara los tamaños de archivo y no chequea los contenidos o las fechas, sólo chequea los tamaños de los archivos.

El comando Histórico de comandos muestra una lista de los comandos escritos. El comando seleccionado es copiado a la línea de órdenes. El histórico de comandos puede ser accedido también tecleando Alt-p ó Alt-n.

Favoritos (Ctrl-\)Hotlist permite acceder con facilidad a directorios y sitios utilizados con frecuencia.

Búsquedas ExternasExternal panelize nos permite ejecutar un programa externo, y llevar la salida de ese programa al panel actual.

Editar el archivo de extensionesExtension File Edit nos permite especificar los programas a ejecutar para intentar ejecutar, ver, editar y realizar un montón de cosas sobre archivos con ciertas extensiones (terminaciones de archivo). Por ejemplo, asociar la extensión de los archivos de audio de SUN (.au) con el programa reproductor adecuado. Editar archivo de menúMenu File Edit se puede utilizar para editar el menú de usuario (el que aparece al pulsar F2).[Directory Tree]
Árbol de Directorios

El comando Árbol de directorios muestra una figura con la estructura de los directorios. Podemos seleccionar un directorio de la figura y Midnight Commander cambiará a ese directorio.

Hay dos modos de invocar el árbol. El comando de árbol de directorios está disponible desde el menú Utilidades. El otro modo es seleccionar la vista en árbol desde el menú Izquierdo o Derecho.

Para evitar largos retardos Midnight Commander crea la figura de árbol escaneando solamente un pequeño subconjunto de todos los directorios. Si el directorio que queremos ver no está, nos moveremos hasta su directorio padre y pulsaremos Ctrl-r (o F2).

Podemos utilizar las siguientes teclas:

Teclas de Movimiento GeneralGeneral Movement Keys válidas.

Intro. En el árbol de directorios, sale del árbol de directorios y cambia al directorio en el panel actual. En la vista de árbol, cambia a este directorio en el otro panel y permanece en el modo de vista Árbol en el panel actual.

Ctrl-r, F2 (Releer). Relee este directorio. Usaremos este comando cuando el árbol de directorios esté anticuado: hay directorios perdidos o muestra algunos directorios que no existen ya.

F3 (Olvidar). Borra ese directorio de la figura del árbol. Usaremos esto para eliminar desorden de la figura. Si queremos que el directorio vuelva a la figura del árbol pulsaremos F2 en su directorio padre.

F4 (Estático/Dinámico, Dinam/Estát). Intercambia entre el modo de navegación dinámico (predefinido) y el modo estático.

En el modo de navegación estático podemos usar las teclas del cursor Arriba y Abajo para seleccionar un directorio. Todos los directorios conocidos serán mostrados.

En el modo de navegación dinámico podemos usar las teclas del cursor Arriba y Abajo para seleccionar el directorio hermano, la tecla Izquierda para situarnos en el directorio padre, y la tecla Derecha para situarnos en el directorio hijo. Sólo los directorios padre, hijo y hermano son mostrados, el resto son dejados fuera. La figura de árbol cambia dinámicamente conforme nos desplazamos sobre ella.

F5 (Copiar). Copia el directorio.

F6 (Renombrar/Mover, RenMov). Mueve el directorio.

F7 (Mkdir). Crea un nuevo directorio por debajo del directorio actual. El directorio creado será así el hijo del directorio del cual depende jerárquicamente (Padre).

F8 (Eliminar). Elimina este directorio del sistema de archivos.

Ctrl-s, Alt-s. Busca el siguiente directorio coincidente con la cadena de búsqueda. Si no hay tal directorio esas teclas moverán una línea abajo.

Ctrl-h, Borrar. Borra el último carácter de la cadena de búsqueda.

Cualquier otro carácter. Añade el carácter a la cadena de búsqueda y se desplaza al siguiente directorio que comienza con esos caracteres. En la vista de árbol debemos primero activar el modo de búsqueda pulsando Ctrl-s. La cadena de búsqueda es mostrada en la línea de mini-estado.

Las siguientes acciones están disponibles sólo en el árbol de directorios. No son funcionales en la vista de árbol.

F1 (Ayuda). Invoca el visor de ayuda y muestra ésta sección.

Esc, F10. Sale del árbol de directorios. No cambia el directorio.

El ratón es soportado. Un doble click se comporta como pulsar Intro. Véase también la sección sobre soporte de ratónMouse Support.[Find File]
Buscar Archivo

La opción Buscar Archivo primero pregunta por el directorio inicial para la búsqueda y el nombre de archivo a buscar. Pulsando el botón árbol podemos seleccionar el directorio inicial desde el Árbol de directoriosDirectory Tree.

El campo de contenidos acepta expresiones regulares similares a egrep(1). Eso significa que tenemos caracteres de escape con significado especial para egrep con "\", p.e. si buscamos "strcmp (" tendremos que introducir "strcmp \(" (sin las dobles comillas).

Con la opción "Palabras completas" se puede limitar la búsqueda a archivos donde la parte coincidente forme una palabra completa. Esto coincide con la utilidad de la opción "-w" de grep.

Podemos iniciar la búsqueda pulsando el botón Aceptar. Durante el proceso de búsqueda podemos detenerla desde el botón Terminar.

Podemos navegar por la lista de archivos con las teclas del cursor Arriba y Abajo. El botón Chdir cambiará al directorio del archivo actualmente seleccionado. El botón "Otra vez" preguntará los parámetros para una nueva búsqueda. El botón Terminar finaliza la operación de búsqueda. El botón Panelizar colocará los archivos encontrados en el panel actual y así podremos realizar más operaciones con ellos (ver, copiar, mover, borrar y demás). Después de panelizar podemos pulsar Ctrl-r para regresar al listado normal de archivos.

Es posible tener una lista de directorios que el comando Buscar Archivo debería saltar durante la búsqueda (por ejemplo, podemos querer evitar búsquedas en un CDROM o en un directorio NFS que está montado a través de un enlace lento).

Los directorios a ser omitidos deberían ser enumerados en la variable ignore_dirs en la sección FindFile de nuestro archivo ~/.config/mc/ini.

Los componentes del directorio deberían ser separados por dos puntos, como en el ejemplo que sigue:

[FindFile]
ignore_dirs=/cdrom:/nfs/wuarchive:/afs

Debemos valorar la utilización de Búsquedas externasExternal panelize en ciertas situaciones. La utilidad Buscar archivos es sólo para consultas simples, pero con Búsquedas externas se pueden hacer exploraciones tan complejas como queramos.[External panelize]
Búsquedas Externas

Búsquedas externas nos permite ejecutar un programa externo, y tomar la salida de ese programa como contenido del panel actual.

Por ejemplo, si queremos manipular en uno de los paneles todos los enlaces simbólicos del directorio actual, podemos usar búsquedas externas para ejecutar el siguiente comando:

find . -type l -print

Hasta la finalización del comando, el contenido del directorio del panel no será el listado de directorios del directorio actual, pero sí todos los archivos que son enlaces simbólicos.

Si queremos panelizar todos los archivos que hemos bajado de nuestro servidor ftp, podemos usar el comando awk para extraer el nombre del archivo de los archivos de registro (log) de la transferencia:

awk '$9 ~! /incoming/ { print $9 }' < /var/log/xferlog

Tal vez podríamos necesitar guardar los comandos utilizados frecuentemente bajo un nombre descriptivo, de manera que podamos llamarlos rápidamente. Haremos esto tecleando el comando en la línea de entrada y pulsando el botón "Añadir nuevo". Entonces introduciremos un nombre bajo el cual queremos que el comando sea guardado. La próxima vez, bastará elegir ese comando de la lista y no habrá que escribirlo de nuevo.[Hotlist]
Favoritos

Muestra una lista de sitios y directorios guardados y abre en el panel el lugar seleccionado. Desde el cuadro de diálogo podemos también crear y eliminar entradas. Para añadir se puede igualmente utilizar Añadir Actual (Ctrl-x h), que añade el directorio actual (no el seleccionado) a la lista de favoritos. Se pide al usuario una etiqueta para identificar la entrada.

Esto hace más rápido el posicionamiento en los directorios usados frecuentemente. Deberíamos considerar también el uso de la variable CDPATH tal y como se describe en comando cd internoThe cd internal command.[Extension File Edit]
Editar el Archivo de Extensiones

Abre el archivo ~/.config/mc/mc.ext en nuestro editor. El administrador puede optar por editar, en su lugar, el archivo de extensiones del sistema /usr/share/mc/mc.ext. El formato del archivo (formato nuevo cambiado desde la versión 3.0) es como sigue:

Todas las líneas que empiecen con # o estén vacías serán ignoradas.

Las líneas que comiencen en la primera columna deberán tener el siguiente formato:

PalabraClave/Descripción+NuevaLínea, p.e. cualquier cosa después de palabraClave/ hasta el fin de línea es descripción

las palabras clave son:

shell   (desc es entonces cualquier extensión (sin comodines), p.e. para indicar todos los archivos con extensión desc (*desc). Ejemplo: .tar indica *.tar)

regex   (desc es una expresión regular)

type    (el archivo coincide si `file %f` coincide con la expresión regular indicada en desc (el nombre de archivo: parte de `file %f` es eliminada))

default (coincide con todo archivo sin importar su descripción)

El resto de líneas deben comenzar con un espacio o tabulador y usar el siguiente formato: PalabraClave=comando+NuevaLínea (sin espacios junto al =), donde PalabraClave debe ser: Open (si el usuario pulsa Intro o dos veces el ratón), View (F3) o Edit (F4). comando es cualquier comando en línea del shell, con sustitución de macroMacro Substitution simple.

Las reglas se aplican en estricto orden. Aunque se produzca una coincidencia, si la acción solicitada no está disponible, se ignora y la búsqueda continúa (por ejemplo, si un archivo encaja con dos entradas, pero la acción Ver no está definida en la primera, al pulsar F3, se ejecuta la acción Ver de la segunda). Como último recurso default debe incluir todas las acciones.[Background jobs]
Trabajos en Segundo Plano

Nos permite controlar el estado de cualquier proceso de Midnight Commander en segundo plano (sólo las operaciones de copiar y mover archivos pueden realizarse en segundo plano). Podemos parar, reiniciar y eliminar procesos en segundo plano desde aquí.[Menu File Edit]
Edición del Archivo de Menú

El menú de usuario es un menú de acciones útiles que puede ser personalizado por el usuario. Cuando accedemos al menú de usuario se utiliza, si existe, el archivo .mc.menu del directorio actual, pero sólo si es propiedad del usuario o del superusuario y no es modificable por todos. Si no se encuentra allí el archivo, se intenta de la misma manera con ~/.config/mc/menu, y si no, mc utiliza el menú por defecto para todo el sistema /usr/share/mc/mc.menu.

El formato del menú de archivo es muy simple. Todas las líneas, salvo las que empiezan con espacio o tabulación, son consideradas entradas para el menú (para posibilitar su uso como atajo de teclado, el primer carácter sí deberá ser una letra). Las líneas que comienzan con una tabulación o espacio son los comandos que serán ejecutados cuando la entrada es seleccionada.

Cuando se selecciona una opción todas las líneas de comandos de esa opción se copian en un archivo temporal en el directorio temporal (normalmente /usr/tmp), y se ejecuta ese archivo. Esto permite al usuario utilizar en los menús construcciones normales de la shell. También tiene lugar una sustitución simple de macros antes de ejecutar el código del menú. Para mayor información, ver Sustitución de macroMacro Substitution.

He aquí un ejemplo de archivo mc.menu:

A	Vuelca el contenido del archivo seleccionado
	od -c %f

B	Edita un informe de errores y lo envía al superusuario
	I=`mktemp ${MC_TMPDIR:-/tmp}/mail.XXXXXX` || exit 1
	vi $I
	mail -s "Error Midnight Commander" root < $I
	rm -f $I

M	Lee al correo
	emacs -f rmail

N	Lee las noticias de Usenet
	emacs -f gnus

H	Realiza una llamada al navegador hypertexto info
	info

J	Copia recursivamente el directorio actual al otro panel
	tar cf - . | (cd %D && tar xvpf -)

K	Realiza una versión del directorio actual
	echo -n "Nombre del archivo de distribución: "
	read tar
	ln -s %d `dirname %d`/$tar
	cd ..
	tar cvhf ${tar}.tar $tar

= f *.tar.gz | f *.tgz & t n
X       Extrae los contenidos de un archivo tar comprimido
	tar xzvf %f

Condiciones por Defecto

Cada entrada del menú puede ir precedida por una condición. La condición debe comenzar desde la primera columna con un carácter '='. Si la condición es verdadera, la entrada del menú será la entrada por defecto.

Sintaxis condicional: 	= <sub-cond>
  o:			= <sub-cond> | <sub-cond> ...
  o:			= <sub-cond> & <sub-cond> ...

Sub-condición es una de las siguientes:

  f <patrón>		¿el archivo actual encaja con el patrón?
  F <patrón>		¿otro archivo encaja con el patrón?
  d <patrón>		¿el directorio actual encaja con el patrón?
  D <patrón>		¿otro directorio encaja con el patrón?
  t <tipo>		¿archivo actual es de tipo <tipo>?
  T <tipo>		¿otro archivo es de tipo <tipo>?
  ! <sub-cond>		niega el resultado de la sub-condición

Patrón es un patrón normal del shell o una expresión regular, de acuerdo con la opción de patrones del shell. Podemos cambiar el valor global de la opción de los patrones del shell escribiendo "shell_patterns=x" en la primera línea del archivo de menú (donde "x" es 0 ó 1).

Tipo es uno o más de los siguientes caracteres:

  n	no directorio
  r	archivo regular
  d	directorio
  l	enlace
  c	dispositivo tipo carácter
  b	dispositivo tipo bloque
  f	tubería (fifo)
  s	socket
  x	ejecutable
  t	marcado (tagged)

Por ejemplo 'rlf' significa archivo regular, enlace o cola. El tipo 't' es un poco especial porque actúa sobre el panel en vez de sobre un archivo. La condición '=t t' es verdadera si existen archivos marcados en el panel actual y falsa si no los hay.

Si la condición comienza con '=?' en vez de '=' se mostrará un trazado de depuración mientras el valor de la condición es calculado.

Las condiciones son calculadas de izquierda a derecha. Esto significa que
	= f *.tar.gz | f *.tgz & t n
es calculado como
	( (f *.tar.gz) | (f *.tgz) ) & (t n)

He aquí un ejemplo de uso de condiciones:

= f *.tar.gz | f *.tgz & t n
L	Lista el contenido de un archivo tar comprimido
	gzip -cd %f | tar xvf -

Condiciones aditivas

Si la condición comienza con '+' (o '+?') en lugar de '=' (o '=?') es una condición aditiva. Si la condición es verdadera la entrada de menú será incluida en el menú. Sin embargo, si la condición es falsa, la entrada de menú no será incluida en el menú.

Podemos combinar condiciones por defecto y aditivas comenzando la condición con '+=' o '=+' (o '+=?' o '=+?' si queremos depurar). Si nosotros queremos condiciones diferentes, una para añadir y otra por defecto, una entrada de menú con dos líneas de condición, una comenzando con '+' y otra con '='.

Los comentarios empiezan con '#'. Las líneas adicionales de comentarios deben empezar con '#', espacio o tabulación.[Options Menu]
Menú de Opciones

Midnight Commander tiene opciones que pueden ser activadas o desactivadas a través de una serie de diálogos a los que se accede desde este menú. Una opción está activada cuando tiene delante un asterisco o una "x".

En ConfiguraciónConfiguration se pueden cambiar la mayoría de opciones de Midnight Commander.

En PresentaciónLayout está un grupo de opciones que determinan la apariencia de mc en la pantalla.

En ConfirmaciónConfirmation podemos especificar qué acciones requieren una confirmación del usuario antes de ser realizadas.

En Juego de CaracteresDisplay bits podemos seleccionar qué caracteres es capaz de mostrar nuestro terminal.

En Aprender TeclasLearn keys podemos verificar teclas que no funcionan en algunos terminales y solucionarlo.

En Sistema de Archivos Virtual (VFS)Virtual FS podemos especificar algunas opciones relacionadas con el VFS (Sistema de Archivos Virtual).

Guardar ConfiguraciónSave Setup guarda los valores actuales de los menús Izquierdo, Derecho y Opciones. También se guardan algunos otros valores.[Configuration]
Configuración

Este diálogo presenta una serie de opciones divididas en tres grupos: Opciones de los Paneles, Pausa Después de Ejecutar y Otras Opciones.

Opciones de los paneles

Tamaños en unidades SI. Mostrar tamaños de archivos en bytes con unidades derivadas según el SI, Sistema Internacional de Unidades, o sea, en potencias de 1000. Los prefijos (k, m ...) se muestran en minúsculas. Sin esta opción los tamaños se calculan como valores binarios empleando múltiplos de 1024 (2 elevado a 10) y los prefijos aparecen como es habitual en mayúsculas (K, M ...)

Mostrar Archivos de Respaldo. Mostrar los archivos terminados en tilde '~'. Por defecto, Midnight Commander no los muestra (como la opción -B de ls de GNU).

Mostrar Archivos Ocultos. Mostrar los archivos que comiencen con un punto (como ls -a).

Marcar y Avanzar. Hacer avanzar la barra de selección tras marcar un archivo (con la tecla insertar).

Menús Desplegables. Mostrar el contenido de los menús desplegables inmediatamente al presionar F9. Si está desactivada sólo la barra de títulos de los menús está visible, y será necesario abrir cada menú con las flechas de movimiento o con las teclas de acceso rápido.

Mezclar Archivos y Directorios. Cuando esta opción está habilitada, todos los archivos y directorios se muestran mezclados. Si la opción está desactivada, los directorios (y enlaces a directorios) aparecen al principio de la lista, y el resto de archivos a continuación.

Recarga Rápida de Directorios. Hace que Midnight Commander emplee una pequeña trampa al determinar si los contenidos del directorio han cambiado. El truco consiste en recargar el directorio sólo si el inodo del directorio ha cambiado. Las recargas se producen si se crean o borrar archivos, pero si lo que cambia es sólo el inodo de un archivo del directorio (cambios en el tamaño, permisos, propietario, etc.) la pantalla no se actualiza. En esos casos, si tenemos la opción activada, será preciso forzar la recarga de forma manual (con Ctrl-r).

Pausa Después de Ejecutar.

Después de ejecutar comandos, Midnight Commander puede realizar una pausa, y darnos tiempo a examinar la salida del comando. Hay tres posibles valores para esta variable:

Nunca. Significa que no queremos ver la salida de nuestros comandos. Si estamos utilizando la consola Linux o FreeBSD o un xterm, podremos ver la salida del comando pulsando Ctrl-o.

Sólo en Terminales Tontas. Obtendremos el mensaje de pausa sólo en terminales que no sean capaces de mostrar la salida del último comando ejecutado (en realidad, cualquier terminal que no sea un xterm o una consola de Linux).

Siempre. El programa realizará siempre una pausa después de ejecutar comandos.

Otras Opciones

Operación Detallada. Controla la visualización de detalles durante las operaciones de Copiar, Mover y Borrar (i.e., muestra un cuadro de diálogo para cada operación). Si tenemos un terminal lento, podríamos querer desactivar la operación detallada. Se desactiva automáticamente si la velocidad de nuestro terminal es menor de 9600 bps.

Calcular Totales. Hace que Midnight Commander calcule el total de bytes y el número de archivos antes de iniciar operaciones de Copiar, Mover y Borrar. Esto proporciona una barra de progreso más precisa a costa de cierta velocidad. Esta opción no tiene efecto si la Operación Detallada no está seleccionada.

Patrones del shell. Por defecto, las funciones Selección, Deselección y Filtro emplean expresiones regulares al estilo del shell. Para realizar esto se realizan las siguientes conversiones: '*' se cambia por '.*' (cero o más caracteres); '?' por '.' (exactamente un carácter) y '.' por un punto literal. Si la opción está desactivada, entonces las expresiones regulares son las descritas en ed(1).

Auto-Guardar Configuración. Si esta opción está activada, cuando salimos de Midnight Commander las opciones configurables de Midnight Commander se guardan en el archivo ~/.config/mc/ini.

Auto Menús. Si está activada, el menú de usuario aparece automáticamente al arrancar. Útil en menús construidos para personas sin conocimientos de Unix.

Usar Editor Interno. Emplear el editor de archivos interno. Si está desactivada, se editarán los archivos con el editor especificado por la variable de entorno EDITOR y si no se especifica ninguno, se usará vi. Véase la sección sobre el editor de archivos internoInternal File Editor.

Usar Visor Interno. Emplear el visor de archivos interno. Si la opción está desactivada, el paginador especificado en la variable de entorno PAGER será el utilizado. Si no se especifica ninguno, se usará el comando view. Véase la sección sobre el visor de archivos internoInternal File Viewer.

Completar: Mostrar Todos. Por defecto, al completar nombres en situaciones de ambigüedad, Midnight Commander completa todo lo posible al pulsar Alt-Tab y produce un pitido; al intentarlo por segunda vez se muestra una lista con las posibilidades que han dado lugar a la ambigüedad. Con esta opción, la lista aparece directamente tras pulsar Alt-Tab por primera vez.

Hélice de actividad. Mostrar un guión rotatorio en la esquina superior derecha a modo de indicador de progreso.

Navegación al Estilo Lynx. Cuando la selección es un directorio y la línea de órdenes está vacía permite cambiar a él con las flechas de movimiento. Esta opción está inactiva por defecto.

Cd Sigue los Enlaces. Esta opción, si está seleccionada, hace que Midnight Commander siga la secuencia de directorios lógica al cambiar el directorio actual, tanto en el panel como usando el comando cd. Éste es el comportamiento por defecto de la shell bash. Sin esto, Midnight Commander sigue la estructura real de directorios, y cd .. nos trasladará al padre real del directorio actual aunque hayamos entrado en ese directorio a través de un enlace, y no al directorio donde se encontraba el enlace.

Precauciones de Borrado. Dificulta el borrado accidental de archivos. La opción por defecto en el diálogo de confirmación de borrado se cambia a "No". Por defecto, esta opción está desactivada.[Layout]
Presentación

La ventana de presentación nos da la posibilidad de cambiar la presentación general de la pantalla. Podemos configurar si son visibles la barra de menú, la línea de órdenes, la línea de sugerencias o la barra de teclas de Función. En la consola Linux o FreeBSD podemos especificar cuántas líneas se muestran en la ventana de salida.

El resto del área de pantalla se utiliza para los dos paneles de directorio. Podemos elegir si disponemos los paneles vertical u horizontalmente. La división puede ser simétrica o bien podemos indicar una división asimétrica.

Por defecto, todos los contenidos de los paneles se muestran en el mismo color, pero se puede indicar que permisos y tipos de archivos se resalten empleando coloresColors diferentes. Si se activa el resaltado de permisos, las partes de los campos de permisos del Modo de ListadoListing Mode... aplicables al usuario actual de Midnight Commander serán resaltados usando el color indicado por medio de la palabra clave selected. Si se activa el resaltado de tipos de archivos, los nombres aparecerán coloreados según las reglas almacenadas en el archivo /usr/share/mc/filehighlight.ini. Para más información, véase la sección sobre Resaltado de nombresFilenames Highlight.

Si la opción Mostrar Mini-Estado está activa se muestra, en la parte inferior de cada panel, una línea con información sobre el archivo seleccionado en cada momento.

Si se está ejecutando en X-Windows dentro de un emulador de terminal, Midnight Commander toma control del titulo de la ventana mostrando allí el nombre del directorio actual. El título se actualiza cuando sea preciso. Podemos desactivar la opción de Titular las ventanas Xterm si el emulador de terminal empleado falla y no se muestran o actualizan correctamente estos textos.[Confirmation]
Confirmación

En este menú configuramos las opciones de confirmación de eliminación de archivos, sobreescritura, ejecución pulsando intro y salir del programa.[Display bits]
Juego de caracteres

Esta opción permite configurar el conjunto de caracteres visibles en la pantalla. Éste puede ser 7-bits si nuestro terminal/curses soporta sólo siete bits de salida, alguna de las tablas del estándar ISO-8859 y diversas codificaciones comunes de PC con ocho bits por carácter, o UTF-8 para Unicode.

Para soportar teclados con caracteres locales debemos marcar la opción de Aceptar entrada de 8 bits.[Learn keys]
Aprender teclas

Este diálogo nos permite comprobar si nuestras teclas F1-F20, Inicio, Fin, etc. funcionan adecuadamente en nuestro terminal. A menudo fallan, dado que muchas bases de datos de terminales están mal.

Podemos movernos alrededor con la tecla Tab, con las teclas de movimiento de vi ('h' izquierda, 'j' abajo, 'k' arriba y 'l' derecha) y después de pulsar cualquier tecla del cursor (esto las marcará con OK), entonces podremos usar esa tecla también.

Para probarlas basta con pulsar cada una de ellas. Tan pronto como pulsamos una tecla y ésta funciona adecuadamente, OK debería aparecer junto al nombre de la susodicha tecla. Una vez que una tecla es marcada con OK empieza a funcionar con normalidad, p.e. F1 la primera vez comprobará que F1 funciona perfectamente, pero a partir de ese momento mostrará la ayuda. Esto mismo es aplicable a las teclas del cursor. La tecla Tab debería funcionar siempre.

Si algunas teclas no funcionan adecuadamente, entonces no veremos el OK tras el nombre de la tecla después de haberla pulsado. Podemos entonces intentar solucionarlo. Haremos esto pulsando el botón de esa tecla (con el ratón o usando Tab e Intro). Entonces un mensaje rojo aparecerá y se nos pedirá que pulsemos la tecla en cuestión. Si deseamos abortar el proceso, bastará con pulsar Esc y esperar hasta que el mensaje desaparezca. Si no, pulsaremos la tecla que nos pide y esperaremos hasta que el diálogo desaparezca.

Cuando acabemos con todas las teclas, podríamos Guardar nuestras teclas en nuestro archivo ~/.config/mc/ini dentro de la sección [terminal:TERM] (donde TERM es el nombre de nuestro terminal actual) o descartarlas. Si todas nuestras teclas funcionan correctamente y no debemos corregir ninguna, entonces (lógico) no se grabará.[Virtual FS]
Sistema de Archivos Virtual (VFS)

Este diálogo permite ajustar opciones del Sistema de Archivos Virtual (VFS)Virtual File System.

Midnight Commander guarda en memoria o en disco información de algunos de los sistemas de archivos virtuales con el fin de acelerar el acceso a sus archivos. Ejemplo de esto son los listados descargados desde servidores FTP o los archivos temporales descomprimidos creados para acceder rápidamente a los contenidos de archivos tipo tar comprimidos.

Esas informaciones se conservan para permitirnos navegar, salir y volver a entrar rápidamente en los correspondientes sistemas de archivos virtuales. Al cabo de un cierto tiempo sin usarlos deben ser liberados y recuperar los recursos utilizados. Por defecto ese tiempo es de un minuto, pero se puede configurar por el usuario.

También podemos adelantar la liberación de los VFS desde el diálogo de control de Directorios virtuales (VFS).

El Sistema de Archivos FTP (FTPfs)FTP File System permite navegar por los directorios de servidores FTP remotos. Admite diversas opciones.

Contraseña de FTP anónimo es la contraseña a utilizar en conexiones en modo anónimo, esto es, empleando el nombre de usuario "anonymous". Algunos sitios exigen que ésta sea una dirección de correo electrónico válida, pero tampoco es conveniente dar nuestra dirección real a desconocidos para protegernos de los envíos de correo masivo.

FTPfs conserva en caché los listados de los directorios consultados. La duración de la caché es el valor indicado tras Descartar el caché FTPfs. Un valor pequeño ralentiza el proceso porque cualquier pequeña operación iría siempre acompañada de una conexión con el servidor FTP.

Se puede configurar un sistema proxy para FTP, aunque los cortafuegos modernos son transparentes (al menos para FTP pasivo, ver más abajo) y está opción es generalmente innecesaria.

Si la opción Usar siempre proxy no está activa, aún se puede emplear el proxy en casos concretos. Véanse los ejemplos en la sección Sistema de Archivos FTP (FTPfs)FTP File System.

Si la opción Usar siempre proxy está puesta, el programa asume que cualquier nombre de máquina sin puntos es accesible directamente y también consulta el archivo /usr/share/mc.no_proxy en busca de nombres de máquinas locales (o dominios completos si el nombre empieza con un punto). En todos los demás casos se usará siempre el proxy de FTP indicado arriba.

Se puede usar el archivo ~/.netrc, que contiene información de usuarios y contraseñas para determinados servidores FTP. Para conocer el formato de los archivos .netrc véase la página de manual sobre netrc (5).

Usar FTP pasivo habilita el modo de tranferencia FTP pasivo (la conexión para transferencia de datos es iniciada por la máquina cliente, no por el servidor). Esta opción es la recomendada, y de hecho está activada por defecto. Si se desactiva, la conexión la inicia el servidor, y puede ser impedida por algún cortafuegos.

[Save Setup]
Guardar Configuración

Al arrancar Midnight Commander se carga la información de inicio del archivo ~/.config/mc/ini. Si éste no existe, se cargará la información del archivo de configuración genérico del sistema, /usr/share/mc/mc.ini. Si el archivo de configuración genérico del sistema no existe, MC utiliza la configuración por defecto.

El comando Guardar Configuración crea el archivo ~/.config/mc/ini guardando la configuración actual de los menús Izquierdo, DerechoLeft and Right Menus y OpcionesOptions Menu.

Si se activa la opción Auto-guarda configuración, MC guardará siempre la configuración actual al salir.

Existen también configuraciones que no pueden ser cambiadas desde los menús. Para cambiarlas hay que editar manualmente el archivo de configuración. Para más información, véase la sección sobre Ajustes EspecialesSpecial Settings.

[Executing operating system commands]
Ejecutando Órdenes del Sistema Operativo

Podemos ejecutar comandos tecleando en la línea de órdenes de Midnight Commander, o seleccionando el programa que queremos ejecutar en alguno de los paneles y pulsando Intro.

Si pulsamos Intro sobre un archivo que no es ejecutable, Midnight Commander compara la extensión del archivo seleccionado con las extensiones recogidas en el Archivo de ExtensionesExtension File Edit. Si se produce una coincidencia se ejecutará el código asociado con esa extensión. Tendrá lugar una expansiónMacro Substitution muy simple antes de ejecutar el comando.[The cd internal command]
Comando cd Interno

El comando cd es interpretado directamente por Midnight Commander, en vez de pasarlo al interprete de comandos para su ejecución. Por ello puede que no todas las posibilidades de expansión y sustitución de macro que hace nuestro shell estén disponibles, pero sí algunas de ellas:

Sustitución de tilde. La tilde (~) será sustituida por nuestro directorio de inicio. Si añadimos un nombre de usuario tras la tilde, entonces será sustituido por el directorio de entrada al sistema del usuario especificado.

Por ejemplo, ~coco sería el directorio de un supuesto usuario denominado "coco", mientras que ~/coco es el directorio coco dentro de nuestro propio directorio de inicio.

Directorio anterior. Podemos volver al directorio donde estábamos anteriormente empleando el nombre de directorio especial '-' del siguiente modo: cd -

Directorios en CDPATH. Si el directorio especificado al comando cd no está en el directorio actual, entonces Midnight Commander utiliza el valor de la variable de entorno CDPATH para buscar el directorio en cualquiera de los directorios enumerados.

Por ejemplo, podríamos asignar a nuestra variable CDPATH el valor ~/src:/usr/src, lo que nos permitiría cambiar de directorio a cualquiera de los directorios dentro de ~/src y /usr/src, desde cualquier lugar del sistema de archivos, usando sólo su nombre relativo (por ejemplo cd linux podría llevarnos a /usr/src/linux).[Macro Substitution]
Sustitución de Macro

Cuando se accede al menú de usuarioMenu File Edit, o se ejecuta un comando dependiente de extensiónExtension File Edit, o se ejecuta un comando desde la línea de entrada de comandos, se realiza una simple sustitución de macro.

Las macros son:

"%f"

        Archivo actual.

"%d"

        Nombre del directorio actual.

"%F"

        Archivo actual en el panel inactivo.

"%D"

        Directorio del panel inactivo.

"%t"

        Archivos actualmente marcados.

"%T"

        Archivos marcados en el panel inactivo.

"%u" y "%U"

        Similar a las macros %t y %T, salvo que los archivos quedan desmarcados. Sólo se puede emplear esta macro una vez por cada entrada del archivo de menú o archivo de extensiones, puesto que para la siguiente vez no quedaría ningún archivo marcado.

"%s" y "%S"

        Archivos seleccionados: Los archivos marcados si los hay y si no el archivo actual.

"%cd"

        Ésta es una macro especial usada para cambiar del directorio actual al directorio especificado frente a él. Esto se utiliza principalmente como interfaz con el Sistema de Archivos VirtualVirtual File System.

"%view"

        Esta macro es usada para invocar al visor interno. Puede ser utilizada en solitario, o bien con argumentos. Si pasamos algún argumento a esta macro, deberá ser entre paréntesis.

        Los argumentos son: ascii para forzar al visor a modo ascii; hex para forzar al visor a modo hexadecimal; nroff para indicar al visor que debe interpretar las secuencias de negrita y subrayado de nroff; unformated para indicar al visor que no interprete los comandos nroff referentes a texto resaltado o subrayado.

"%%"

        El carácter %

"%{cualquier texto}"

        Pregunta sobre la sustitución. Un cuadro de entrada es mostrado y el texto dentro de las llaves se usa como mensaje. La macro es sustituida por el texto tecleado por el usuario. El usuario puede pulsar Esc o F10 para cancelar. Esta macro no funciona aún sobre la línea de órdenes.[The subshell support]
Soporte de Subshell

El soporte del subshell es una opción de tiempo de compilación, que funciona con los shells: bash, tcsh y zsh.

Cuando el código del subshell es activado Midnight Commander engendrará una copia de nuestro shell (la definida en la variable SHELL y si no está definida, el que aparece en el archivo /etc/passwd) y lo ejecuta en un pseudoterminal, en lugar de invocar un nuevo shell cada vez que ejecutamos un comando, el comando será pasado al subshell como si lo hubiésemos escrito. Esto además permite cambiar las variables de entorno, usaremos las funciones del shell y los alias definidos que serán válidos hasta salir de Midnight Commander.

Si estamos usando bash podremos especificar comandos de arranque para el subshell en nuestro archivo ~/.local/share/mc/bashrc y mapas de teclado especiales en el archivo ~/.local/share/mc/inputrc. Los usuarios de tcsh podrán especificar los comandos de arranque en el archivo ~/.local/share/mc/tcshrc.

Cuando utilizamos el código del subshell, podemos suspender aplicaciones en cualquier momento con la secuencia Ctrl-o y volver a Midnight Commander, si interrumpimos una aplicación, no podremos ejecutar otros comandos externos hasta que quitemos la aplicación que hemos interrumpido.

Una característica extra añadida de uso del subshell es que el prompt mostrado por Midnight Commander es el mismo que estamos usando en nuestro shell.

La sección OPCIONES tiene más información sobre cómo controlar el código del subshell.[Chmod]
Cambiar Permisos

Cambiar Permisos se usa para cambiar los bits de permisos en un grupo de archivos y directorios. Puede ser invocado con la combinación de teclas Ctrl-x c.

La ventana de Cambiar Permisos tiene dos partes - Permisos y Archivo

En la sección Archivo se muestran el nombre del archivo o directorio y sus permisos en formato numérico octal, así como su propietario y grupo.

En la sección de Permisos hay un grupo de casillas de selección que corresponden a los posibles permisos del archivo. Conforme los cambiamos podemos ver cómo el valor octal va cambiando en la sección Archivo.

Para desplazarse entre las casillas y botones de la ventana podemos usar las teclas del cursor o la tecla de tabulación. Para marcar o desmarcar casillas y para pulsar los botones usaremos la barra espaciadora. Podemos usar los atajos de teclado (las letras destacadas) para accionar directamente los elementos.

Para aceptar y aplicar los permisos, usaremos la tecla Intro.

Si se trata de un grupo de archivos o directorios, podemos cambiar parte de los permisos marcándolos (las marcas son los asteriscos a la izquierda de las casillas) y pulsando el botón [* Poner] o [* Quitar] para indicar la acción deseada. Los permisos no marcados conservan, en este caso, los valores previos.

Podemos también fijar todos los permisos iguales en todos los archivos con el botón [Todos] o sólo los permisos marcados con el botón [* Todos]. En estos casos las casillas indican el estado en que queda cada permiso, igual que para archivos individuales.

[Todos] actúa sobre todos los permisos de todos los archivos

[* Todos] actúa sólo sobre los atributos marcados de los archivos

[* Poner] activa los permisos marcados en los archivos seleccionados

[* Quitar] desactiva los permisos marcados en los archivos seleccionados

[Aplicar] actúa sobre todos los permisos de cada archivo, uno a uno

[Cancelar] cancela Cambiar Permisos[Chown]
Cambiar Dueño

Cambiar Dueño permite cambiar el propietario y/o grupo de un archivo. La tecla rápida para este comando es Ctrl-x o.[Advanced Chown]
Cambiar Dueño y Permisos

Cambiar Dueño y Permisos combina Cambiar DueñoChown y Cambiar PermisosChmod en una única ventana. Se puede así cambiar los permisos, propietario y grupo del archivo de una sola vez.[File Operations]
Operaciones con Archivos

Cuando copiamos, movemos o borramos archivos, Midnight Commander muestra el diálogo de operaciones con archivos. En él aparecen los archivos que se estén procesando y hasta tres barras de progreso. La barra de archivo indica qué parte del archivo actual va siendo copiada, la barra de contador indica cuántos de los archivos marcados han sido completados y la barra de bytes nos dice qué parte del tamaño total de archivos marcados ha sido procesado hasta el momento. Si la operación detallada está desactivada no se muestran las barras de archivo y bytes.

En la parte inferior hay dos botones. Pulsando el botón Saltar se ignorará el resto del archivo actual. Pulsando el botón Abortar se detendrá la operación y se ignora el resto de archivos.

Hay otros tres diálogos que pueden aparecer durante operaciones de archivos.

El diálogo de error informa sobre una condición de error y tiene tres posibilidades. Normalmente seleccionaremos el botón Saltar para evitar el archivo o Abortar para detener la operación. También podemos seleccionar el botón Reintentar si hemos corregido el problema desde otro terminal.

El diálogo Reemplazar aparece cuando intentamos copiar o mover un archivo sobre otro ya existente. El mensaje muestra fechas y tamaños de ambos archivos. Pulsaremos el botón Sí para sobreescribir el archivo, el botón No para saltarlo, el botón Todos para sobreescribir todos los archivos, Ninguno para no sobreescribir en ningún caso y Actualizar para sobreescribir si el archivo origen es posterior al archivo objeto. Podemos abortar toda la operación pulsando el botón Abortar.

El diálogo de eliminación recursiva aparece cuando intentamos borrar un directorio no vacío. Pulsaremos Sí para borrar el directorio recursivamente, No para saltar el directorio, Todo para borrar recursivamente todos los directorios marcados no vacíos y Ninguno para saltarlos todos. Podemos abortar toda la operación pulsando el botón Abortar. Si seleccionamos el botón Sí o Todo se nos pedirá confirmación. Diremos "sí" sólo si estamos realmente seguros de que queremos una eliminación recursiva.

Si hemos marcado archivos y realizamos una operación sobre ellos, sólo los archivos sobre los que la operación fue exitosa son desmarcados. Los archivos saltados y aquellos en los que la operación falló permanecen marcados.[Mask Copy/Rename]
Copiar/Renombrar con Máscara

Las operaciones de copiar/mover permiten transformar los nombres de los archivos de manera sencilla. Para ello, hay que procurar una máscara correcta para el origen y normalmente en la terminación del destino algunos caracteres comodín. Todos los archivos que concuerden con la máscara origen son copiados/renombrados según la máscara destino. Si hay archivos marcados, sólo aquellos que encajen con la máscara de origen serán renombrados.

Hay otras opción que podemos seleccionar:

Seguir Enlaces indica si los enlaces simbólicos o físicos en el directorio origen (y recursivamente en sus subdirectorios) producen nuevos enlaces en el directorio destino o si queremos copiar su contenido.

Copiar Recursivamente indica qué hacer si en el directorio destino existe ya un directorio con el mismo nombre que el archivo/directorio que está siendo copiado. La acción por defecto es copiar su contenido sobre ese directorio. Habilitando esto podemos copiar el directorio de origen dentro de ese directorio. Quizás un ejemplo pueda ayudar:

Queremos copiar el contenido de un directorio denominado coco a /blas donde ya existe un directorio /blas/coco. Por defecto, mc copiaría el contenido en /blas/coco, pero con esta opción se copiaría como /blas/coco/coco.

Preservar Atributos indica que se deben conservar los permisos originales de los archivos, marcas temporales y si somos superusuario también el propietario y grupo originales. Si esta opción no está activa se aplica el valor actual de umask.

"Usando Patrones Shell activado"

Usando Patrones Shell nos permite usar los caracteres comodín '*' y '?' en la máscara de origen. Funcionará igual que en la línea de órdenes. En la máscara destino, sólo están permitidos los comodines '*' y '\<número>'. El primer '*' en la máscara destino corresponde al primer grupo del comodín en la máscara de origen, el segundo '*' al segundo grupo, etcétera. El comodín '\1' corresponde al primer grupo en la máscara de origen, el comodín '\2' al segundo y así sucesivamente hasta '\9'. El comodín '\0' es el nombre completo del archivo fuente.

Dos ejemplos:

Si la máscara de origen es "*.tar.gz", el destino es "/blas/*.tgz" y el archivo a copiar es "coco.tar.gz", la copia se hará como "coco.tgz" en "/blas".

Supongamos que queremos intercambiar el nombre y la extensión de modo que "archivo.c" se convierta en "c.archivo". La máscara origen será "*.*" y la de destino "\2.\1".

"Usando Patrones Shell desactivado"

Cuando la opción de Patrones Shell está desactivada MC no realiza una agrupación automática. Deberemos usar expresiones '\(...\)' en la máscara origen para especificar el significado de los comodines en la máscara destino. Esto es más flexible pero también necesita más escritura. Por lo demás, las máscaras destino son similares al caso de Patrones Shell activos.

Dos ejemplos:

Si la máscara de origen es "^\(.*\)\.tar\.gz$", el destino es "/blas/*.tgz" y el archivo a ser copiado es "coco.tar.gz", la copia será "/blas/coco.tgz".

Si queremos intercambiar el nombre y la extensión para que "archivo.c" sea "c.archivo", la máscara de origen puede ser "^\(.*\)\.\(.*\)$" y la de destino "\2.\1".

"Capitalización"

Podemos hacer cambios entre mayúsculas y minúsculas en los nombres de archivos. Si usamos '\u' o '\l' en la máscara destino, el siguiente carácter será convertido a mayúsculas o minúsculas respectivamente.

Si usamos '\U' o '\L' en la máscara destino, los siguientes caracteres serán convertidos a mayúsculas o minúsculas respectivamente hasta encontrar '\E' o un segundo '\U' o '\L' o el fin del nombre del archivo.

'\u' y '\l' tienen prioridad sobre '\U' y '\L'.

Por ejemplo, si la máscara fuente es '*' (con Patrones Shell activo) o '^\(.*\)$' (Patrones Shell desactivado) y la máscara destino es '\L\u*' los nombres de archivos serán convertidos para que tengan su inicial en mayúscula y el resto del nombre en minúsculas.

También podemos usar '\' como carácter de escape evitando la interpretación de todos estos caracteres especiales. Por ejemplo, '\\' es una contrabarra y '\*' es un asterisco.[Select/Unselect Files]
Seleccionar/Deseleccionar Archivos

El diálogo permite seleccionar o deseleccionar grupos de archivos y directorios. La línea de entradaInput Line Keys permite introducir una expresión regular para los nombres de los archivos a seleccionar/deseleccionar.

Indicando Sólo archivos los directorios no se seleccionan. Con los Caracteres Comodín habilitados, se pueden introducir expresiones regulares del tipo empleado en los patrones de nombres de la shell (poniendo * para cero o más caracteres y ? para uno o más caracteres). Si los Caracteres Comodín están deshabilitados, entonces la selección de archivos se realiza con expresiones regulares normales. Véase la página de manual de ed (1). Finalmente, si no se activa Distinguir May/min la selección se hará sin distinguir caracteres en mayúsculas o minúsculas.[Internal File Viewer]
Visor de Archivos Interno

El visor de archivos interno ofrece dos modos de presentación: ASCII y hexadecimal. Para alternar entre ambos modos, se emplea la tecla F4.

El visor intenta usar el mejor método disponible en el sistema, según el tipo de archivo, para mostrar información. Los archivos comprimidos se descomprimen automáticamente si los programas correspondientes (GNU gzip ó bzip2) están instalados en el sistema. El propio visor es capaz de interpretar ciertas secuencias de caracteres que se emplean para activar los atributos de negrita y subrayado, mejorando la presentación de los archivos.

En modo hexadecimal, la función de búsqueda admite texto entre comillas o valores numéricos. El texto entrecomillado se busca tal cual (retirando las comillas) y cada número se corresponde a un byte. Unos y otros se pueden entremezclar como en:

"Cadena" -1 0xBB 012 "otro texto"

Nótese que 012 es un número octal y -1 se convierte en 0xFF.

Algunos detalles internos del visualizador: En sistemas con acceso a la llamada del sistema mmap(2), el programa mapea el archivo en vez de cargarlo; si el sistema no provee de la llamada al sistema mmap(2) o el archivo realiza una acción que necesita de un filtro, entonces el visor usará sus cachés de crecimiento, cargando sólo las partes del archivo a las que actualmente estamos accediendo (esto incluye a los archivos comprimidos).

He aquí una lista de las acciones asociadas a cada tecla que Midnight Commander gestiona en el visor interno de archivos.

F1 Invoca el visor de ayuda de hipertexto interno.

F2 Cambia el modo de ajuste de líneas en pantalla.


        * N. del T.: Envuelta (Ajustada), se muestra toda la información de la línea en la pantalla, de modo que si ésta ocupa más del ancho de la pantalla aparece como si fuese otra línea aparte o bien desenvuelta (desajustada), truncando el contenido de la línea que sobresale de la pantalla. Este contenido puede ser consultado utilizando las teclas del cursor.

F4 Cambia entre el modo hexadecimal y el Ascii.

F5 Ir a la línea. Nos pedirá el número de línea en el que deseamos posicionarnos y mostrará el archivo a partir de esa línea.

F6, /. Búsqueda de expresión regular desde la posición actual hacia adelante.

?, Búsqueda de expresión regular desde la posición actual hacia atrás.

F7 Búsqueda normal/ búsqueda en modo hexadecimal.

Ctrl-s. Comienza una búsqueda normal si no existe una expresión de búsqueda previa si no busca la próxima coincidencia.

Ctrl-r. Comienza una búsqueda hacia atrás si no había expresión de búsqueda anterior si no busca la próxima coincidencia.

n. Buscar la próxima coincidencia.

F8 Intercambia entre el modo crudo y procesado: esto mostrará el archivo como se encuentra en disco o si se ha especificado un filtro de visualización en el archivo mc.ext, entonces la salida filtrada. El modo actual es siempre el contrario al mostrado en la etiqueta del botón, en tanto que el botón muestra el modo en el que entraremos con la pulsación de esa tecla.

F9 Alterna entre la visualización con y sin formato: en el modo con formato se interpretan algunas secuencias de caracteres para mostrar texto en negrita y subrayado con diferentes colores. Como en el caso anterior, la etiqueta del botón muestra el estado contrario al actual.

F10, Esc. Sale del visor interno.

AvPág, espacio, Ctrl-v. Avanza una página hacia abajo.

RePág, Alt-v, Ctrl-b, Borrar. Retrocede una página hacia arriba.

Cursor Abajo Desplaza el texto una línea hacia arriba, mostrando en la línea inferior de la pantalla una nueva línea que antes quedaba oculta.

Cursor Arriba Desplaza una línea hacia abajo.

Ctrl-l Redibuja el contenido de la pantalla.

! Engendra un nuevo shell en el directorio de trabajo actual.

"[n] m" Coloca la marca n.

"[n] r" Salta hasta la marca n.

Ctrl-f Salta al archivo siguiente.

Ctrl-b Ídem al archivo anterior.

Alt-r Intercambia entre los diferentes modos de regla: desactivado, arriba, abajo.

Es posible adiestrar al visor de archivos sobre cómo mostrar un archivo, mírese la sección Editar Archivo de ExtensionesExtension File Edit.[Internal File Editor]
Editor de Archivos Interno

El editor de archivos interno es un editor a pantalla completa de avanzadas prestaciones. Puede editar archivos de hasta 64 MB y también permite modificar archivos binarios. Se inicia pulsando F4 supuesto que la variable use_internal_edit esté presente en el archivo de inicialización.

Las características soportadas actualmente son: copia, desplazamiento, borrado, corte, y pegado de bloques; deshacer paso a paso; menús desplegables; inserción de archivos; definición de macros; buscar y reemplazar usando expresiones regulares); selección de texto con mayúsculas-cursor (si el terminal lo soporta); alternancia insertar-sobreescribir; plegado de líneas; sangrado automático; tamaño de tabulación configurable; realce de sintaxis para varios tipos de archivos; y la opción de pasar bloques de texto por filtros externos como indent o ispell.

El editor es muy fácil de usar y no requiere aprendizaje alguno. Para conocer las teclas asignadas a cada función, basta consultar los menús correspondientes. Además, las teclas de desplazamiento con la tecla de mayúsculas seleccionan texto. Se puede seleccionar con el ratón, aunque podemos recuperar su funcionamiento habitual en terminales (copiar y pegar) manteniendo pulsada la tecla mayúsculas. Ctrl-Ins copia al archivo mcedit.clip y Mayús-Ins pega desde mcedit.clip. Mayús-Supr corta y copia en mcedit.clip, y Ctrl-Supr elimina el texto resaltado. La tecla Intro produce un salto de línea con sangrado automático opcional.

Para definir una macro, pulsar Ctrl-r y entonces teclearemos las secuencias de teclas que deseamos sean ejecutadas. Pulsaremos Ctrl-r de nuevo al finalizar. Podemos asignar la macro a la tecla que queramos pulsando sobre ella. La macro será ejecutada cuando pulsemos Ctrl-a seguido de la tecla asignada. También será ejecutada si pulsamos Meta (Alt), Ctrl, o Escape y la tecla asignada, siempre y cuando la tecla no sea usada por ninguna otra función. Una vez definida, los comandos de macro irán al archivo ~/.local/share/mc/mcedit/mcedit.macros en nuestro directorio de inicio. Podemos eliminar una macro borrando la línea adecuada en este archivo.

F19 formateará el bloque seleccionado (sea texto, código C o C++ u otro). Esto está controlado por el archivo /usr/share/mc/edit.indent.rc que se copia la primera vez que se usa en ~/.local/share/mc/mcedit/edit.indent.rc en el directorio personal.

El editor también visualiza caracteres no estadounidenses (160+). Al editar archivos binarios, debemos configurar los bits de pantalla a 7 bits en el menú de opciones para mantener el espaciado saneado.[Completion]
Terminación

Permite a Midnight Commander escribir por nosotros.

Intenta completar el texto escrito antes de la posición actual. Midnight Commander intenta la terminación tratando el texto como si fuera una variable (si el texto comienza con $), nombre de usuario (si el texto empieza por ~), nombre de máquina (si el texto comienza con @) o un comando (si estamos en la línea de órdenes en una posición donde podríamos escribir un comando; las terminaciones posibles entonces incluyen las palabras reservadas del shell así como comandos internos del shell) en ese orden. Si nada de lo anterior es aplicable, se intenta la terminación con nombres de archivo.

La terminación de nombres de archivo, usuario y máquina funciona en todas las líneas de entrada; la terminación de comandos es específica de la línea de órdenes. Si la terminación es ambigua (hay varias posibilidades diferentes), Midnight Commander pita, y la acción siguiente depende de la opción Completar: Mostrar Todos en el diálogo de ConfiguraciónConfiguration. Si está activada, se despliega inmediatamente junto a la posición actual una lista con todas las posibilidades donde se puede seleccionar con las flechas de movimiento e Intro la entrada correcta. También podemos seguir escribiendo caracteres con lo que la línea se sigue completando tanto como sea posible y simultáneamente la primera entrada coincidente de la lista se va resaltando. Si volvemos a pulsar Alt-Tab, sólo las coincidencias permanecen en la lista. Tan pronto como no haya ambigüedad, la lista desaparece; también podemos quitarla con las teclas de cancelación Esc, F10 y las teclas de movimiento a izquierda y derecha. Si Completar: Mostrar TodosConfiguration está desactivado, la lista aparece cuando pulsamos Alt-Tab por segunda vez; con la primera Midnight Commander sólo emite un pitido.[Virtual File System]
Sistemas de Archivos Virtuales (VFS)

Midnight Commander dispone de una capa de código de acceso al sistema de archivos; esta capa se denomina Sistema de Archivos Virtual (VFS). El Sistema de Archivos Virtual permite a Midnight Commander manipular archivos no ubicados en el sistema de archivos Unix.

Midnight Commander incluye actualmente varios Sistemas de Archivos Virtuales: el sistema de archivos local, utilizado para acceder al sistema de archivos Unix habitual; tarfs para manipular archivos empaquetados con el comando tar y acaso comprimidos; undelfs para recuperar archivos borrados en sistemas de archivos de tipo ext2 (sistema de archivos habitual en Linux); FTPfs para manipular archivos en sistemas remotos a través de FTP; FISH para manipular archivos a través de conexiones a shell como rsh o ssh y finalmente MCfs (Midnight Commander file system), un sistema de archivos para red. Si el programa se compiló incluyendo SMBfs se pueden manipular archivos en sistemas remotos empleando el protocolo SMB (CIFS).

Se facilita también un sistema de archivos genérico extfs (EXternal virtual File System) para extender con facilidad las posibilidades de VFS empleando guiones y programas externos.

El código VFS interpretará todos los nombres de ruta usados y los dirigirá al sistema de archivos correcto. El formato usado para cada uno de los sistemas de archivos se describe más adelante en su propia sección.[Tar File System]
Sistema de archivos Tar (tarfs)

El sistema de archivos tar y los archivos tar comprimidos pueden consultarse usando el comando chdir. Para mostrar en el panel el contenido de un archivo tar, cambiamos de directorio empleando la siguiente sintaxis:

/archivo.tar/utar://[directorio-dentro-tar]

El archivo mc.ext también ofrece un atajo para los archivos tar, esto quiere decir que normalmente basta con apuntar a un archivo tar y pulsar Intro para entrar en el archivo tar. Véase la sección Edición del Archivo de ExtensionesExtension File Edit para obtener más detalles sobre cómo hacer esto.

Ejemplos:

    mc-3.0.tar.gz/utar://mc-3.0/vfs
    /ftp/GCC/gcc-2.7.0.tar/utar://

En este último se indica la ruta completa hasta el archivo tar.[FTP File System]
Sistema de archivos FTP (FTPfs)

FTPfs permite manipular archivos en máquinas remotas. Para utilizarlo se puede emplear la opción de menú Conexión por FTP o simplemente emplear la orden cd como cuando cambiamos habitualmente de directorio, pero indicando como ruta:

ftp://[!][usuario[:clave]@]maquina[:puerto][dir-remoto]

Los elementos usuario, puerto y directorio-remoto son opcionales. Si especificamos el elemento usuario, entonces Midnight Commander intentará conectarse con la máquina remota como ese usuario, y si no, establecerá una conexión en modo anónimo o con el nombre de usuario indicado en el archivo ~/.netrc. El elemento clave también es opcional, y si está presente, se emplea como contraseña de acceso. Esta forma de colocar la contraseña como parte del nombre del directorio virtual no es muy recomendable porque eventualmente puede aparecer en pantalla y guardarse en el histórico de directorios.

Si es necesario utilizar un proxy de FTP, se añade un símbolo de exclamación ! delante del nombre de la máquina.

Ejemplos:

    ftp://ftp.nuclecu.unam.mx/linux/local
    ftp://tsx-11.mit.edu/pub/linux/packages
    ftp://!detras.barrera.edu/pub
    ftp://guest@pcremoto.com:40/pub
    ftp://miguel:xxx@servidor/pub
    ftp://ftp.um.es/pub

La opciones de FTPfs se encuentran entre las opciones de configuración del Sistema de Archivos Virtual (VFS)Virtual FS.[FIle transfer over SHell filesystem]
Sistema de archivos a través de SHell (FISH)

El FISH es un sistema de archivos por red que permite manipular archivos en una máquina remota como si estuvieran almacenados localmente. Para ello es preciso que el sistema remoto esté ejecutando el servidor FISH o permitir la conexión a una shell de tipo bash.

Para conectar con la máquina remota basta cambiar de directorio a un directorio virtual cuyo nombre sea de la forma:

sh://[usuario@]maquina[:opciones]/[directorio-remoto]

Los elementos usuario, opciones y directorio-remoto son opcionales. Si se especifica el elemento usuario Midnight Commander intentará entrar en la máquina remota como ese usuario, y si no usará nuestro nombre.

Como opciones se puede poner 'C' para usar compresión y 'rsh' para utilizar una conexión rsh en vez de ssh. Si se indica el directorio-remoto, se buscará éste como primer directorio al conectar con la máquina remota.

Ejemplos:

    sh://solorsh.es:r/linux/local
    sh://pepe@quiero.comprension.edu:C/privado
    sh://pepe@sincomprimir.ssh.edu/privado
[SMB File System]
Sistema de archivos SMB

El SMBfs permite manipular archivos en máquinas remotas con el protocolo denominado SMB (o CIFS). Esto incluye Windows Trabajo en Grupo, Windows 9x/ME/XP, Windows NT, Windows 2000 y Samba. Para comenzar a usarlo, se puede emplear la "Conexión por SMB..." (accesible desde la barra de menús) o bien cambiar de directorio a un directorio virtual cuyo nombre sea de la forma:

smb://[usuario@]maquina[/recurso][/directorio-remoto]

Los elementos usuario, recurso y directorio-remoto son opcionales. El usuario, dominio y contraseña se pueden especificar en un cuadro de diálogo.

Ejemplos:

    smb://maquina/Compartido
    smb://otramaquina
    smb://invitado@maquina/publico/leyes
[Undelete File System]
Sistema de archivos de Recuperación

En sistemas Linux, si el programa de configuración nos preguntó si queríamos usar las facilidades de recuperación de archivos de ext2fs, tendremos el sistema de archivos recuperables accesible. La recuperación de archivos borrados está disponible sólo en los sistemas de archivos ext2. El sistema de archivos recuperable es sólo un interface de la librería ext2fs con: restaurar todos los archivos borrados en un ext2fs y proporciona la extracción selectiva de archivos en una partición regular.

Para usar este sistema de archivos, tendremos que hacer un chdir a un nombre de archivo especial formado por el prefijo "/undel://" y el nombre de archivo donde se encuentra el sistema de archivos actual.

Por ejemplo, para recuperar archivos borrados en la segunda partición del primer disco scsi en Linux, usaríamos el siguiente nombre de ruta:

    undel://sda2

Esto le llevaría un tiempo a undelfs para cargar la información antes de empezar a navegar por los archivos allí contenidos.[EXTernal File System]
Sistema de archivos EXTerno (extfs)

extfs permite incorporar a GNU Midnight Commander numerosas utilidades y tipos de archivos de manera sencilla, simplemente escribiendo guiones (scripts).

Los sistemas de archivos Extfs son de dos tipos:

1. Sistemas de archivos autónomos, que no están asociados a ningún archivo existente. Representan algún tipo de información relacionada con el sistema en forma de árbol de directorios. Se accede a ellos ejecutando 'cd nombrefs://' donde nombrefs es el nombre corto que identifica el extfs (ver más adelante). Ejemplos de éstos son audio (lista de pistas de sonido en el CD) o apt (lista de paquetes de tipo Debian en el sistema).

Por ejemplo, para listar las pistas de música del CD, escribir

  cd audio://

2. Sistemas de archivos en un archivo (como rpm, patchfs y más), que muestran los contenidos de un archivo en forma de árbol de directorios. Puede tratarse de archivos reales empaquetados o comprimidos en un archivo (urar, rpm) o archivos virtuales, como puede ser el caso de mensajes en un archivo de correo electrónico (mailfs) o partes de un archivo de modificaciones o parches (patchfs). Para acceder a ellos se añade 'nombrefs://' al nombre del archivo a abrir. Este archivo podría él mismo estar en otro sistema de archivos virtual.

Por ejemplo, para listar los contenidos de un archivo documentos.zip comprimido hay que escribir

  cd documentos.zip/uzip://

En muchos aspectos, se puede tratar un sistema de archivos externo como cualquier otro directorio. Podríamos añadirlo a la lista de favoritos o cambiar a él desde la historia de directorios. Una limitación importante es que, estando dentro de él, no se puede ejecutar órdenes del sistema, como por otra parte ocurre en cualquier sistema de archivos VFS no local.

Midnigth Commander incluye inicialmente guiones para algunos sistemas de archivos externos:

a       acceder a un disquete DOS/Windows 'A:' (cd a://).

apt     monitor del sistema de gestión de paquetes APT de Debian (cd apt://).

audio   acceso y audición de CDs (cd audio:// o cd dispositivo/audio://).

bpp     paquete de la distribución GNU/Linux Bad Penguin (cd archivo.bpp/bpp://).

deb     paquete de la distribución GNU/Linux Debian (cd archivo.deb/deb://).

dpkg    paquetes instalados en Debian GNU/Linux (cd deb://).

hp48    ver o copiar archivos a/desde una calculadora HP48 (cd hp48://).

lslR    navegación en listados lslR empleados en bastantes sitios FTP (cd filename/lslR://).

mailfs  soporte para archivos de correo electrónico tipo mbox (cd archivo_mbox/mailfs://).

patchfs manipulación de archivos de cambios/parches tipo diff (cd archivo/patchfs://).

rpm     paquete RPM (cd archivo/rpm://).

rpms    base de datos de paquetes RPM instalados (cd rpms://).

ulha, urar, uzip, uzoo, uar, uha
        herramientas de compresión (cd archivo/xxxx:// siendo xxxx uno de estos: ulha, urar, uzip, uzoo, uar, uha).

Se pueden asociar extensiones o tipos de archivo a un determinado sistema de archivos externo tal como se describe en la sección sobre cómo Editar el Archivo de ExtensionesExtension File Edit de Midnight Commander. He aquí, a modo de ejemplo, una entrada para paquetes Debian:

  regex/.deb$
          Open=%cd %p/deb://
[Colors]
Colores

Midnight Commander intentará determinar si nuestro terminal soporta el uso de color utilizando la base de datos de terminales y nuestro nombre de terminal. Algunas veces estará confundido, por lo que deberemos forzar el modo en color o deshabilitar el modo de color usando el argumento -c y -b respectivamente.

Si el programa está compilado con el gestor pantallas Slang en lugar de ncurses, también chequeará la variable COLORTERM, si existe, lo que tiene el mismo efecto que la opción -c.

Podemos especificar a los terminales que siempre fuercen el modo en color añadiendo la variable color_terminals a la sección Colors del archivo de inicialización. Esto evitará que Midnight Commander intente la detección de soporte de color. Ejemplo:

[Colors]
color_terminals=linux,xterm
color_terminals=nombre-terminal1,nombre-terminal2...

El programa puede compilarse con ncurses y slang, ncurses no ofrece la posibilidad de forzar el modo en color: ncurses utiliza la información de la base de datos de terminales.

Midnight Commander ofrece una forma de cambiar los colores por defecto. Actualmente los colores se configuran a través de la variable de entorno MC_COLOR_TABLE o en la sección Colors del archivo de inicialización.

En la sección Colors, el mapa de colores por defecto se carga desde la variable base_color. Podemos especificar un mapa de colores alternativo para un terminal utilizando el nombre del terminal como clave en esta sección. Ejemplo:

[Colors]
base_color=
xterm=menu=magenta:marked=,magenta:markselect=,red

El formato de la definición de color es:

  <PalabraClave>=<ColorTexto>,<ColorFondo>:<PalabraClave>= ...

los colores son opcionales, y las palabras claves son: normal, selected, marked, markselect, errors, input, reverse menunormal, menusel, menuhot, menuhotsel, menuinactive, gauge; los colores por defecto son: dnormal, dfocus, dhotnormal, dhotfocus; los colores de Ayuda son: helpnormal, helpitalic, helpbold, helplink, helpslink; color del visor: viewunderline; colores del editor: editnormal, editbold, editmarked.

Los cuadros de diálogo usan los siguientes colores: dnormal usado para el texto normal, dfocus usado para el componente actualmente seleccionado, dhotnormal usado para diferenciar el color de la tecla activa en los componentes normales, mientras que el color dhotfocus se utiliza para el color resaltado en el componente seleccionado.

Los menús utilizan el mismo esquema equivalente con los nombres menunormal, menusel, menuhot, menuhotsel and menuinactive en lugar de los anteriores.

La ayuda utiliza los siguientes colores: helpnormal texto normal, helpitalic utilizado para el texto enfatizado con letra itálica en la página del manual, helpbold usado para el texto enfatizado en negrita en la página del manual, helplink usado para los hiperenlaces no seleccionados y helpslink es utilizado para el hiperenlace seleccionado.

gauge (indicador) determina el color de la parte completada de la barra de progresión (gauge), que muestra qué porcentaje de archivos fueron copiados etc. de modo gráfico.

Los colores posibles son: negro (black), gris (gray), rojo (red), rojo brillante (brightred), verde (green), verde claro (brightgreen), marrón (brown), amarillo (yellow), azul oscuro (blue), azul brillante (brightblue), rosa (magenta), rosa claro (brightmagenta), azul celeste (cyan), celeste claro (brightcyan), gris claro (lightgray) y blanco (white). Hay una palabra clave especial para obtener un fondo transparente. Se trata de 'default'. 'default' sólo se puede utilizar como color de fondo. Ejemplo:

[Colors]
base_color=normal=white,default:marked=magenta,default
[Skins]
Skins

Con los skins (pieles, caretas) se puede cambiar la apariencia global de Midhight Commander. Para ello hay que proporcionar un archivo que contenga descripciones de colores y formas de trazar las líneas de borde de los paneles y diálogos. La redefinición de colores es completamente compatible con la configuración tradicional detallada en la sección sobre ColoresColors.

El archivo se busca, en orden, de varias maneras:

        1) La opción -S <skin> o --skin=<skin> al ejecutar mc.
        2) La variable de entorno MC_SKIN.
        3) El parámetro skin en la sección [Midnight-Commander] del archivo de configuración.
        4) El archivo /etc/mc/skins/default.ini.
        5) El archivo /usr/share/mc/skins/default.ini.

En línea de órdenes, en la variable de entorno o el parámetro de la configuración pueden contener la ruta absoluta al archivo de skin con o sin su extensión .ini. De no indicar la ruta se realiza la búsqueda, en orden, en:

        1) ~/.local/share/mc/skins/.
        2) /etc/mc/skins/.
        3) /usr/share/mc/skins/.

Para más información consultar:

        Descripción de secciones y parámetrosSkins sections
        Definiciones de pares de coloresSkins colors
        Trazado de líneasSkins lines
        CompatibilidadSkins oldcolors
[Skins sections]
Descripción de secciones y parámetros

La sección [skin] contiene metadatos del archivo. El parámetro description proporciona un pequeño texto descriptivo.

La sección [filehighlight] contiene descripciones de pares de colores para el resaltado de nombres de archivo. Los nombres de parámetros de esta sección tienen que coincidir con los nombres de sección del archivo filehighlight.ini. Para más información, véase la sección sobre Resaltado de nombresFilenames Highlight.

La sección [core] permite definir elementos que se utilizan en otras partes.

_default_
        Colores por defecto. Se utilizará en todas las secciones que no contengan definición de colores.

selected
        cursor.

marked  elementos seleccionados.

markselect
        cursor sobre elementos seleccionados.

gauge   color de la parte completada en las barras de progreso.

input   color de los recuadros de texto editable en los dialogos.

reverse color inverso.

La sección [dialog] define elementos de las ventanas de diálogo salvo los diálogos de error.

_default_
        Colores por defecto para esta sección. Se utilizará [core]._default_ si no se especifica

dfocus  Color del elemento activo, con el foco.

dhotnormal
        Color de las teclas de acceso rápido.

dhotfocus
        Color de las teclas de acceso rápido del elemento activo.

La sección [error] define elementos de las ventanas de diálogo de error.

_default_
        Colores por defecto para esta sección. Se utilizará [core]._default_ si no se especifica.

errdhotnormal
        Color de las teclas de acceso rápido.

errdhotfocus
        Color de las teclas de acceso rápido del elemento activo.

La sección [menu] define elementos de menú. Esta sección afecta al menú general (activado con F9) y a los menús de usuario (activados con F2 en la pantalla general y con F11 en el editor).

_default_
        Colores por defecto para esta sección. Se utilizará [core]._default_ si no se especifica

entry   Color de las entradas de menú.

menuhot Color de las teclas de acceso rápido en menú.

menusel Color de la entrada de menú activa, con el foco.

menuhotsel
        Color de las teclas de acceso rápido en la entrada activa de menú.

menuinactive
        Color de menú inactiva.

La sección [help] define los elementos de la ventana de ayuda.

_default_
        Colores por defecto para esta sección. Se utilizará [core]._default_ si no se especifica.

helpitalic
        Par de color para elementos en cursiva.

helpbold
        Par de color para elementos resaltados.

helplink
        Color de los enlaces

helpslink
        Color del enlace activo, con el foco.

La sección [editor] define los colores de los elementos que se encuentran en el editor.

_default_
        Colores por defecto para esta sección. Se utilizará [core]._default_ si no se especifica.

editbold
        Par de color para elementos resaltados.

editmarked
        Color del texto seleccionado.

editwhitespace
        Color de las tabulaciones y espacios al final de línea resaltados.

editlinestate
        Color de la línea de estado.

La sección [viewer] define los colores de los elementos que se encuentran en el visor.

viewunderline
        Par de color para elementos subrayados.[Skins colors]
Definiciones de pares de colores

Cualquier parámetro del archivo de skin puede contener definiciones de pares de color.

Un par de colores está formado por el nombre de los dos colores separados por ';'. El primer color establece el color de frente y el segundo el color de fondo. Se puede omitir alguno de los dos colores, en cuyo caso se utilizará el color del par de color por defecto (par de color general o del par de color por defecto en la sección).

Ejemplo:
[core]
    # verde sobre negro
    _default_=green;black
    # verde (por defecto) sobre azul
    selected=;blue
    # amarillo sobre negro (por defecto)
    marked=yellow;

Los nombres de colores permitidos son los que aparecen en la sección ColoresColors.[Skins lines]
Trazado de líneas

Trazos de líneas de la sección [Lines] del archivo de skins. Por defecto se utilizan líneas sencillas, pero se pueden redefinir empleando cualquier símbolo utf-8 (por ejemplo, líneas dobles).

¡¡¡ATENCIÓN!!! Si se compila Midnight Commander empleando la biblioteca de pantalla Ncurses, entonces el trazado de líneas está limitado. Es posible que sólo se puedan utilizar líneas simples. Para consultas y comentarios contactar con los desarrolladores de Ncurses.

Descripción de parámetros de la sección [Lines]:

lefttop esquina superior izquierda.

righttop
        esquina superior derecha.

centertop
        unión central en el borde superior.

centerbottom
        unión central en el borde inferior.

leftbottom
        esquina inferior izquierda.

rightbottom
        esquina inferior derecha.

leftmiddle
        unión central en el borde izquierdo.

rightmiddle
        unión central en el borde derecho.

centermiddle
        cruz central.

horiz   línea horizontal.

vert    línea vertical.

thinhoriz
        línea horizontal fina.

thinvert
        línea vertical fina.[Skins oldcolors]
Compatibilidad

Compatibilidad de la asignación de colores empleando archivos de skin con la configuración general de ColoresColors.

La compatibilidad es completa. En este caso la redefinición de colores tiene prioridad sobre las definiciones de skin y se completa con esta.[Filenames Highlight]
Resaltado de nombres

La sección [filehighlight] de un archivo de skin contiene como claves los nombres que identificarán cada grupo de resaltado y como valor el par de colores que le corresponda. El formato de estas parejas se explica en la sección SkinsSkins.

Reglas de resaltado de nombres en el archivo /usr/share/mc/filehighlight.ini. Los nombres de sección en este archivo tienen que ser iguales a los nombres empleados en la sección [filehighlight] del archivo de skin en uso. PP. Los nombres de los parámetros en estos grupos podrán ser:

type    tipo de archivo. Si existe se ignoran otras opciones.

regexp  expresión regular. Si existe se ignora la opción 'extensions'.

extensions
        lista de extensiones de archivos. Separadas por punto y coma.

`type' puede tomar los valores:
- FILE (todos los archivos)
  - FILE_EXE
- DIR (todos los directorios)
  - LINK_DIR
- LINK (todos los enlaces excepto los rotos)
  - HARDLINK
  - SYMLINK
- STALE_LINK
- DEVICE (todos los archivos de dispositivo)
  - DEVICE_BLOCK
  - DEVICE_CHAR
- SPECIAL (todos los archivos especiales)
  - SPECIAL_SOCKET
  - SPECIAL_FIFO
  - SPECIAL_DOOR
[Special Settings]
Ajustes Especiales

La mayoría de las opciones de Midnight Commander pueden cambiarse desde los menús. Sin embargo, hay un pequeño número de ajustes para los que es necesario editar el archivo de configuración.

Estas variables se pueden cambiar en nuestro archivo ~/.config/mc/ini:

clear_before_exec

        Por defecto Midnight Commander limpia la pantalla antes de ejecutar un comando. Si preferimos ver la salida del comando en la parte inferior de la pantalla, editaremos nuestro archivo ~/mc.ini y cambiaremos el valor del campo clear_before_exec a 0.

confirm_view_dir

        Al pulsar F3 en un directorio, normalmente Midnight Commander entra en ese directorio. Si este valor está a 1, entonces el programa nos pedirá confirmación antes de cambiar el directorio si tenemos archivos marcados.

ftpfs_retry_seconds

        Este valor es el número de segundos que Midnight Commander esperará antes de intentar volver a conectar con un servidor de ftp que ha denegado el acceso. Si el valor es cero, el programa no reintentará el acceso.

ftpfs_use_passive_connections

        Esta opción está desactivada por defecto. Hace que el código de FTPfs utilice el modo de apertura pasivo para transferir archivos. Esto es usado por aquellos que están detrás de un encaminador con filtrado de paquetes. Esta opción sólo funciona si estamos utilizando un proxy para ftp.

max_dirt_limit

        Especifica cuántas actualizaciones de pantalla pueden saltarse al menos en el visor de archivos interno. Normalmente este valor no es significativo, porque el código automáticamente ajusta el número de actualizaciones a saltar de acuerdo al volumen de pulsaciones de teclas recibidas. Empero, en máquinas muy lentas o en terminales con autorepetición de teclado rápida, un valor grande puede hacer que la pantalla se actualice dando saltos.

        Parece ser que poniendo max_dirt_limit a 10 produce el mejor comportamiento, y éste es el valor por defecto.

mouse_move_pages

        Controla cuándo el desplazamiento de pantalla realizado con el ratón se realiza por páginas o línea a línea en los paneles.

mouse_move_pages_viewer

        Controla cuándo el desplazamiento de pantalla realizado con el ratón se realiza por páginas o línea a línea en el visor de archivos interno.

old_esc_mode

        Por defecto Midnight Commander trata la tecla Esc como prefijo de tecla (old_esc_mode=0), si activamos esta opción (old_esc_mode=1), entonces la tecla Esc actuará como prefijo de tecla durante un segundo, y si no hay pulsaciones, entonces Esc será interpretado como la tecla de cancelación ( Esc Esc ).

only_leading_plus_minus

        Produce un tratamiento especial para '+', '-', '*' en la línea de órdenes (seleccionar, deseleccionar, selección inversa) sólo si la línea de órdenes está vacía. No necesitamos entrecomillar estos caracteres en la línea de órdenes. Pero no podremos cambiar la selección cuando la línea de órdenes no esté vacía.

reverse_files_only
        Permite invertir la selección sólo sobre los archivos, sin afectar a los directorios seleccionados. Esta variable está activa por defecto. Si se desactiva, la inversión se aplica tanto a archivos como a directorios: se seleccionan los no seleccionados y se liberan los anteriormente seleccionados.

panel_scroll_pages

        Si existe (por defecto), el panel se desplazará media pantalla cuando el cursor alcance el final o el principio del panel, en otro caso se desplazará un archivo cada vez.

show_output_starts_shell

        Esta variable sólo funciona si no se utiliza el soporte de subshell. Cuando utilizamos la combinación Ctrl-o para volver a la pantalla de usuario, si está activada, tendremos un nuevo shell. De otro modo, pulsando cualquier tecla nos devolverá a Midnight Commander.

torben_fj_mode

        Si este modificador existe, entonces las teclas Inicio y Fin funcionarán de manera diferente en los paneles, en lugar de mover la selección al primer o último archivo en los paneles, actuarán como sigue:

        La tecla Inicio: Irá a la línea central del panel, si está bajo ella; sino va a la primera línea a menos que ya esté allí, en este caso irá al primer archivo del panel.

        La tecla Fin tiene un comportamiento similar: Irá a la línea central del panel, si está situada en la mitad superior del panel; si no irá a la línea inferior del panel a menos que ya estemos ahí, en cuyo caso moverá la selección al último nombre de archivo del panel.

use_file_to_guess_type

        Si esta variable está activada (por defecto lo está) se recurrirá al comando "file" para reconocer los tipos de archivo referidos en el archivo mc.extExtension File Edit.

xtree_mode

        Si esta variable está activada (por defecto no) cuando naveguemos por el sistema de archivos en un panel en árbol, se irá actualizando automáticamente el otro panel con los contenidos del directorio seleccionado en cada momento.[Terminal databases]
Ajustes del Terminal

Midnight Commander permite hacer ajustes a la base de datos de terminales del sistema sin necesidad de privilegios de superusuario. El programa busca definiciones de teclas en el archivo de inicialización del sistema /usr/share/mc/mc.lib o en el del usuario ~/.config/mc/ini, en la sección "terminal:nuestro-terminal" y si no en "terminal:general". Cada línea comienza con el identificador de la tecla, seguido de un signo de igual y la definición de la tecla. Para representar el carácter de escape se utiliza \e y ^x para el carácter control-x.

Los identificadores de tecla son:

f0 a f20      teclas de función f0 a f20
bs            tecla de borrado
home          tecla de inicio
end           tecla de fin
up            tecla de cursor arriba
down          tecla de cursor abajo
left          tecla de cursor izquierda
right         tecla de cursor derecha
pgdn          tecla de avance de página
pgup          tecla de retroceso de página
insert        tecla de insertar
delete        tecla de suprimir
complete      tecla para completar

Ejemplo: para indicar que la secuencia Escape + [ + O + p corresponde a la tecla de insertar, hay que colocar en el archivo ~/.config/mc/ini:

insert=\e[Op

También se pueden usar secuencias avanzadas. Por ejemplo:
    ctrl-alt-right=\e[[1;6C
    ctrl-alt-left=\e[[1;6D

Esto significa que Ctrl + Alt + Izquierda envía la secuencia de escape \e[[1;6D y que entonces Midnight Commander debe interpretar "\e[[1;6D" como Ctrl-Alt-Izquierda.

El identificador complete representa la secuencia usada para invocar el mecanismo de completar nombres. Esto se hace habitualmente con Alt-Tab, pero podemos configurar otras teclas para esta función, especialmente en teclados que incorporan tantas teclas especiales (bonitas pero inútiles o infrautilizadas).

[FILES]
ARCHIVOS AUXILIARES

Los directorios indicados a continuación pueden variar de una instalación a otra. También se pueden modificar con la variable de entorno MC_DATADIR, que de estar definida se emplearía en vez de /usr/share/mc.

/usr/share/mc.hlp

        Archivo de ayuda.

/usr/share/mc/mc.ext

        Archivo de extensiones por defecto del sistema.

~/.config/mc/mc.ext

        Archivo de usuario de extensiones y configuración de visor y editor. Si está presente prevalece sobre el contenido de los archivos del sistema.

/usr/share/mc/mc.ini

        Archivo de configuración del sistema para Midnight Commander, sólo si el usuario no dispone de su propio ~/.config/mc/ini.

/usr/share/mc/mc.lib

        Opciones globales de Midnight Commander. Se aplican siempre a todos los usuarios, tengan ~/.config/mc/ini o no. Actualmente sólo se emplea para los ajustes de terminalTerminal databases.

~/.config/mc/ini

        Configuración personal del usuario. Si este archivo está presente entonces se cargará la configuración desde aquí en lugar de desde el archivo de configuración del sistema.

/usr/share/mc/mc.hint

        Este archivo contiene los mensajes cortos de ayuda mostrados por el programa.

/usr/share/mc/mc.menu

        Este archivo contiene el menú de aplicaciones por defecto para el sistema.

~/.config/mc/menu

        Menú de aplicaciones personal del usuario. Si está presente será utilizado en lugar del menú por defecto del sistema.

~/.cache/mc/Tree

        La lista de directorios para el árbol de directorios y la vista en árbol.

./.mc.menu

        Menú local definido por el usuario. Si este archivo está presente será usado en lugar del menú de aplicaciones personal o de sistema.

To change default home directory of MC, you can use MC_HOME environment variable. The value of MC_HOME must be an absolute path. If MC_HOME is unset or empty, HOME variable is used. If HOME is unset or empty, MC directories are get from GLib library.[AVAILABILITY]
DISPONIBILIDAD

La última versión de este programa puede encontrarse en ftp://ftp.gnu.org/gnu/mc/.[SEE ALSO]
VÉASE TAMBIÉN

mcedit(1), sh(1), bash(1), tcsh(1), zsh(1), ed(1), view(1), terminfo(1), gpm(1).

La página web de Midnight Commander está en:
	http://www.midnight-commander.org/

La presente documentación recoge información relativa a la versión 4.7.0 (Septiembre de 2009). Esta traducción no está completamente actualizada con la versión original en inglés. Para acceder a información sobre versiones recientes consultar la página de manual en inglés que contiene información más completa y actualizada. Para ver el susodicho manual original ejecutar en la línea de órdenes:
        LANG= LC_ALL= man mc
[AUTHORS]
AUTORES

Los autores y contribuciones se recogen en el archivo AUTHORS de la distribución.[BUGS]
ERRORES

Véase el archivo "TODO" en la distribución para saber qué falta por hacer.

Para informar de problemas con el programa, envíar un mensaje a la dirección: mc-devel@gnome.org.

Se debe proporcionar una descripción detallada del problema, la versión del programa (se obtiene con 'mc -V') y el sistema operativo utilizados. Si el programa revienta, sería también útil disponer del estado de la pila.[TRANSLATION]
TRADUCCIÓN

Francisco Gabriel Aroca, 1998. Reformateado y actualizado por David Martín, 2002-2009.

Midnight Commander traducido a castellano por David Martín <dmartina@excite.com>.

[main]
 lqwqk     k           k     
 x x x .   x     .     x     
 x x x k lqu wqk k lqw tqk n 
 x x x x x x x x x x x x x x 
 v   v v mqv v v v mqu v v mj
     qqqqqqCommanderqj 

Ésta es la pantalla de inicio de la ayuda de GNU Midnight Commander.

Puede pulsar la tecla IntroHow to use help para aprender a navegar por el sistema de ayuda, o acceder directamente a los contenidosContents.

GNU Midnight Commander es obra de sus numerosos autoresAUTHORS.

GNU Midnight Commander NO INCLUYE NINGÚN TIPO DE GARANTÍAWarranty, es software libre, y se alienta su redistribución en los terminos y condiciones que están contenidos en la Licencia Pública General de GNU (GPL)Licencia GNU, de la que existe una traducción no oficial al españolLicencia GNU (Español).

[Licencia GNU]

                 GNU GENERAL PUBLIC LICENSE
                   Version 3, 29 June 2007

Copyright © 2007 Free Software Foundation, Inc.
<http://fsf.org/>

    Everyone is  permitted  to copy  and  distribute  verbatim copies of this  license  document,  but  changing  it  is  not allowed.

                         Preamble

    The GNU General Public License is a free, copyleft license for software and other kinds of works.

    The licenses for most software and other practical works are designed to take away your freedom  to  share  and  change the works. By contrast, the  GNU  General  Public  License  is intended to guarantee your freedom to  share  and  change  all versions of a program to make sure it  remains  free  software for all its users. We, the Free Software Foundation,  use  the GNU General Public  License  for  most  of  our  software;  it applies also to any  other  work  released  this  way  by  its authors. You can apply it to your programs, too.

    When we speak of free software, we are referring  to freedom, not price. Our General Public Licenses  are  designed to make sure that you have the freedom to distribute copies of free software (and charge for them  if  you  wish),  that  you receive source code or can get it if you want it, that you can change the software or use pieces of it in new free  programs, and that you know you can do these things.

    To protect your rights, we need to prevent others from denying you these  rights  or  asking  you  to  surrender  the rights. Therefore, you have certain  responsibilities  if  you distribute copies of  the  software,  or  if  you  modify  it: responsibilities to respect the freedom of others.

    For example, if you distribute copies of such a program, whether gratis or for a fee, you must pass on to the recipients the same freedoms that you received. You must make sure that they, too, receive or can get the source  code. And you must show them these terms so they know their rights.

    Developers that use the GNU GPL protect your rights with two steps: (1) assert copyright on the software, and (2) offer you  this License giving you legal permission to copy, distribute and/or modify it.

    For the developers' and authors' protection, the GPL clearly explains that there is no warranty for this free software.  For both users' and authors' sake, the GPL requires that modified versions be marked as changed, so that their problems will not be attributed erroneously to authors of previous versions.

    Some devices are designed to deny users access to install or run modified versions of the software inside them, although the manufacturer can do so. This is fundamentally incompatible with the aim of protecting users' freedom to change the software. The systematic pattern of such abuseoccurs in the area of products for individuals to use, which is precisely where it is most unacceptable. Therefore, we have designed this version of the GPL to prohibit the practice for those products. If such problems arise substantially in other domains, we stand ready to extend this provision to those domains in future versions of the GPL, as needed to protect the freedom of users.

    Finally, every program is threatened constantly by software patents. States should not allow patents to restrict development and use of software on general-purpose computers, but in those that do, we wish to avoid the special danger that patents applied to a free program could make it effectively proprietary. To prevent this, the GPL assures that patents cannot be used to render the program non-free.

    The precise terms and conditions for copying, distribution and modification follow.

                   TERMS AND CONDITIONS

0. Definitions.
---------------

    “This License” refers to version 3 of the GNU General Public License.

    “Copyright” also means copyright-like laws that apply to other kinds of works, such as semiconductor masks.

    “The Program” refers to any copyrightable work licensed under this License. Each licensee is addressed as “you”. “Licensees” and “recipients” may be individuals or organizations.

    To “modify” a work means to copy from or adapt all or part of the work in a fashion requiring copyright permission, other than the making of an exact copy. The resulting work is called a “modified version” of the earlier work or a work “based on” the earlier work.

    A “covered work” means either the unmodified Program or a work based on the Program.

    To “propagate” a work means to do anything with  it  that, without permission, would make you directly or secondarily liable for infringement under applicable copyright law, except executing it on a computer or modifying a private copy. Propagation includes copying, distribution (with or without modification), making available to the public, and in some countries other activities as well.

    To “convey” a work means any kind of propagation that enables other parties to make or receive copies. Mere interaction with a user through a computer network, with no transfer of a copy, is not conveying.

    An interactive user interface displays “Appropriate Legal Notices” to the extent that it includes a convenient and prominently visible feature that (1) displays an appropriate copyright notice, and (2) tells the user that there is no warranty for the work (except to the extent that warranties are provided), that licensees may convey the work under this License, and how to view a copy of this License. If the interface presents a list of user commands or options, such as a menu, a prominent item in the list meets this criterion.


1. Source Code.
---------------

    The “source code” for a work means the preferred form of the work for making modifications to it. “Object code” means any non-source form of a work.

    A “Standard Interface” means an interface that either is an official standard defined by a recognized standards body, or, in the case of interfaces specified for a particular programming language, one that is widely used among developers working in that language.

    The  “System Libraries” of an executable work include anything, other than the work as a whole, that (a) is included in the normal form of packaging a Major Component, but which is not part of that Major Component, and (b) serves only to enable use of the work with that Major Component, or to implement a Standard Interface for which an implementation is available to the public in source code form. A “Major Component”, in this context, means a major essential component (kernel, window system, and so on) of the specific operating system (if any) on which the executable work runs, or a compiler used to produce the work, or an object code interpreter used to run it.

    The “Corresponding Source” for a work in object code form means all the source code needed to generate, install, and (for an executable work) run the object code and to modify the work, including scripts to control those activities. However, it does not include the work's System Libraries, or general-purpose tools or generally available free programs which are used unmodified in performing those activities but which are not part of the work. For example, Corresponding Source includes interface definition files associated with source files for the work, and the source code for shared libraries and dynamically linked subprograms that the work is specifically designed to require, such as by intimate data communication or control flow between those subprograms and other parts of the work.

    The Corresponding Source need not include anything that users can regenerate automatically from other parts of the Corresponding Source.

    The Corresponding Source for a work in source code form is
that same work.

2. Basic Permissions.
---------------------

    All rights granted under this License are granted for the term of copyright on the Program, and are irrevocable provided the stated conditions are met. This License explicitly affirms your unlimited permission to run the unmodified Program. The output from running a covered work is covered by this License only if the output, given its content, constitutes a covered work. This License acknowledges your rights of fair use or other equivalent, as provided by copyright law.

    You may make, run and propagate covered works that you do not convey, without conditions so long as your license otherwise remains in force. You may convey covered works to others for the sole purpose of having them make modifications exclusively for you, or provide you with facilities for running those works, provided that you comply with the terms of this License in conveying all material for which you do not control copyright. Those thus making or running the covered works for you must do so exclusively on your behalf, under your direction and control, on terms that prohibit them from making any copies of your copyrighted material outside their relationship with you.

    Conveying under any other circumstances is permitted solely under the conditions stated below. Sublicensing is not allowed; section 10 makes it unnecessary.

3. Protecting Users' Legal Rights From Anti-Circumvention Law.
--------------------------------------------------------------

    No covered work shall be deemed part of an effective technological measure under any applicable law fulfilling obligations under article 11 of the WIPO copyright treaty adopted on 20 December 1996, or similar laws prohibiting or restricting circumvention of such measures.

    When you convey a covered work, you waive any legal power to forbid circumvention of technological measures to the extent such circumvention is effected by exercising rights under this License with respect to the covered work, and you disclaim any intention to limit operation or modification of the work as a means of enforcing, against the work's users, your or third parties' legal rights to forbid circumvention of technological measures.

4. Conveying Verbatim Copies.
-----------------------------

    You may convey verbatim copies of the Program's source code as you receive it, in any medium, provided that you conspicuously and appropriately publish on each copy an appropriate copyright notice; keep intact all notices stating that this License and any non-permissive terms added in accord with section 7 apply to the code; keep intact all notices of the absence of any warranty; and give all recipients a copy of this License along with the Program.

    You may charge any price or no price for each copy that you convey,and you may offer support or warranty protection for a fee.

5. Conveying Modified Source Versions.
--------------------------------------

    You may convey a work based on the Program, or the modificationsto produce it from the Program, in the form of source code under the terms of section 4, provided that you also meet all of these conditions:

  a) The work must carry prominent notices stating that you modified it, and giving a relevant date.
  b) The work must carry prominent notices stating that it is released under this License and any conditions added under section 7. This requirement modifies the requirement in section 4 to “keep intact all notices”.
  c) You must license the entire work, as a whole, under this License to anyone who comes into possession of a copy. This License will therefore apply, along with any applicable section 7 additional terms, to the whole of the work, and all its parts, regardless of how they are packaged. This License gives no permission to license the work in any other way, but it does not invalidate such permission if you have separately received it.
  d) If the work has interactive user interfaces, each must display Appropriate Legal Notices; however, if the Program has interactive interfaces that do not display Appropriate Legal Notices, your work need not make them do so.

    A compilation of a covered work with other separate and independent works,
which are not by their nature extensions of the covered work, and which are not
combined with it such as to form a larger program, in or on a volume of a
storage or distribution medium, is called an “aggregate” if the compilation and
its resulting copyright are not used to limit the access or legal rights of the
compilation's users beyond what the individual works permit. Inclusion of a
covered work in an aggregate does not cause this License to applyto the other
parts of the aggregate.

6. Conveying Non-Source Forms.
------------------------------

    You may convey a covered work in object code form under the terms of sections 4 and 5, provided that you also convey the machine-readable Corresponding Source under the terms of this License, in one of these ways:

  a) Convey the object code in, or embodied in, a physical product (including a physical distribution medium), accompanied by the Corresponding Source fixed on a durable physical medium customarily used for software interchange.
  b) Convey the object code in, or embodied in, a physical product (including a physical distribution medium), accompanied by a written offer, valid for at least three years and valid for as long as you offer spare parts or customer support for that product model, to give anyone who possesses the object code either (1) a copy of the Corresponding Source for all the software in the product that is covered by this License, on a durable physical medium customarily used for software interchange, for a price no more than your reasonable cost of physically performing this conveying of source, or (2) access to copy the Corresponding Source from a network server at no charge.
  c) Convey individual copies of the  object code  with a copy of the written offer to provide the Corresponding Source. This alternative is allowed only occasionally and noncommercially, and only if you received the object code with such an offer, in accord with subsection 6b.
  d) Convey the object code by offering access from a designated place (gratis or for a charge), and offer equivalent access to the Corresponding Source in the same way through the same place at no further charge. You need not require recipients to copy the Corresponding Source along with the object code. If the place to copy the object code is a network server, the Corresponding Source may be on a different server (operated by you or a third party) that supports equivalent copying facilities, provided you maintain clear directions next to the object code saying where to find the Corresponding Source. Regardless of what server hosts the Corresponding Source, you remain obligated to ensure that it is available for as long as needed to satisfy these requirements.
  e) Convey the object code using peer-to-peer transmission, provided you inform other peers where the object code and Corresponding Source of the work are being offered to the general public at no charge under subsection 6d.

    A separable portion of the object code, whose source code is excluded from the Corresponding Source as a System Library, need not be included in conveying the object code work.

    A “User Product” is either (1) a “consumer product”, which means any tangible personal property which is normally used for personal, family, or household purposes, or (2) anything designed or sold for incorporation into a dwelling. In determining whether a product is a consumer product, doubtful cases shall be resolved in favor of coverage. For a particular product received by a particular user, “normally used” refers to a typical or common use of that class of product, regardless of the status of the particular user or of the way in which the particular user actually uses, or expects or is expected to use, the product. A product is a consumer product regardless of whether the product has substantial commercial, industrial or non-consumer uses, unless such uses represent the only significant mode of use of the product.

    “Installation Information” for a User Product means any methods, procedures, authorization keys, or other information required to install and execute modified versions of a covered work in that User Product from a modified version of its Corresponding Source. The information must suffice to ensure that the continued functioning of the modified object code is in no case prevented or interfered with solely because modification has been made.

    If you convey an object code work under this section in, or with, or specifically for use in, a User Product, and the conveying occurs as part of a transaction in which the right of possession and use of the User Product is transferred to the recipient in perpetuity or for a fixed term (regardless of how the transaction is characterized), the Corresponding Source conveyed under this section must be accompanied by the Installation Information. But this requirement does not apply if neither you nor any third party retains the ability to install modified object code on the User Product (for example, the work has been installed in ROM).

    The requirement to provide Installation Information does not include a requirement to continue to provide support service, warranty, or updates for a work that has been modified or installed by the recipient, or for the User Product in which it has been modified or installed. Access to a network may be denied when the modification itself materially and adversely affects the operation of the network or violates the rules and protocols for communication across the network.

    Corresponding Source conveyed, and Installation Information provided, in accord with this section must be in a format that is publicly documented (and with an implementation available to the public in source code form), and must require no special password or key for unpacking, reading or copying.

7. Additional Terms.
--------------------

    “Additional permissions” are terms that supplement the terms of this License by making exceptions from one or more of its conditions. Additional permissions that are applicable to the entire Program shall be treated as though they were included in this License, to the extent that they are valid under applicable law. If additional permissions apply only to part of the Program, that part may be used separately under those permissions, but the entire Program remains governed by this License without regard to the additional permissions.

    When you convey a copy of a covered work, you may at your option remove any additional permissions from that copy, or from any part of it. (Additional permissions may be written to require their own removal in certain cases when you modify the work.) You may place additional permissions on material, added by you to a covered work, for which you have or can give appropriate copyright permission.

    Notwithstanding any other provision of this License, for material you add to a covered work, you may (if authorized by the copyright holders of that material) supplement the terms of this License with terms:

  a) Disclaiming warranty or limiting liability differently from the terms of sections 15 and 16 of this License; or
  b) Requiring preservation of specified reasonable legal notices or author attributions in that material or in the Appropriate Legal Notices displayed by works containing it; or
  c) Prohibiting  misrepresentation of the origin of that  material, or requiring that modified versions of such material be marked in reasonable ways as different from the original version; or
  d) Limiting the use for publicity purposes of names of licensors or authors of the material; or
  e) Declining to grant rights under trademark law for use of some trade names, trademarks, or service marks; or
  f) Requiring indemnification of licensors and authors of that material by anyone who conveys the material (or modified versions of it) with contractual assumptions of liability to the recipient, for any liability that these contractual assumptions directly impose on those licensors and authors.

    All other non-permissive additional terms are considered “further restrictions” within the meaning of section 10. If the Program as you received it, or any part of it, contains a notice stating that it is governed by this License along with a term that is a further restriction, you may remove that term. If a license document contains a further restriction but permits relicensing or conveying under this License, you may add to a covered work material governed by the terms of that license document, provided that the further restriction does not survive such relicensing or conveying.

    If you add terms to a covered work in accord with this section, you must place, in the relevant source files, a statement of the additional terms that apply to those files, or a notice indicating where to find the applicable terms.

    Additional terms, permissive or non-permissive, may be stated in the form of a separately written license, or stated as exceptions; the above requirements apply either way.

8. Termination.
---------------

    You may not propagate or modify a covered work except as expressly provided under this License. Any attempt otherwise to propagate or modify it is void, and will automatically terminate your  rights  under  this  License  (including any patent licenses granted under the third paragraph of section 11).

    However, if you cease all violation of this License, then your license from a particular copyright holder is reinstated (a) provisionally, unless and until the copyright holder explicitly and finally terminates your license, and (b) permanently, if the copyright holder fails to notify you of the violation by some reasonable means prior to 60 days after the cessation.

    Moreover, your license from a particular copyright holder is reinstated permanently if the copyright holder notifies you of the violation by some reasonable means, this is the first time you have received notice of violation of this License (for any work) from that copyright holder, and you cure the violation prior to 30 days after your receipt of the notice.

    Termination of your rights under this section does not terminate the licenses of parties who have received copies or rights from you under this License. If your rights have been terminated and not permanently reinstated, you do not qualify to receive new licenses for the same material under section 10.

9. Acceptance Not Required for Having Copies.
---------------------------------------------

    You are not required to accept this License in order to receive or run a copy of the Program. Ancillary propagation of a covered work occurring solely as a consequence of using peer-to-peer transmission to receive a copy likewise does not require acceptance. However, nothing other than this License grants you permission to propagate or modify any covered work. These actions infringe copyright if you do not accept this License. Therefore, by modifying or propagating a covered work, you indicate your acceptance of this License to do so.

10. Automatic Licensing of Downstream Recipients.
-------------------------------------------------

    Each time you convey a covered work, the recipient automatically receives a license from the original licensors, to run, modify and propagate that work, subject to this License. You are not responsible for enforcing compliance by third parties with this License.

    An “entity transaction” is a transaction transferring control of an organization, or substantially all assets  of one, or subdividing an organization, or merging organizations. If propagation of a covered work results from an entity transaction, each party to that transaction who receives a copy of the work also receives whatever licenses to the work the party's  predecessor in interest had or could give under the previous paragraph, plus a right to possession of the Corresponding Source of the work from the predecessor in interest, if the predecessor has it or can get it with reasonable efforts.

    You may not impose any further restrictions on the exercise of the rights granted or affirmed under this License. For example, you may not impose a license fee, royalty, or other charge for exercise of rights granted under this License, and you may not initiate litigation (including a cross-claim or counterclaim in a lawsuit) alleging that any patent claim is infringed by making, using, selling, offering for sale, or importing the Program or any portion of it.

11. Patents.
------------

    A “contributor” is a copyright holder who authorizes use under this License of the Program or a work on which the Program is based. The work thus licensed is called the contributor's “contributor version”.

    A contributor's “essential patent claims” are all patent claims owned or controlled by the contributor, whether already acquired or hereafter acquired, that would be infringed by some manner, permitted by this License, of making, using, or selling its contributor version, but do not include claims that would be infringed only as a consequence of further modification of the contributor version. For purposes of this definition, “control” includes the right to grant patent sublicenses in a manner consistent with the requirements of this License.

    Each contributor grants you a non-exclusive, worldwide, royalty-free patent license under the contributor's essential patent claims, to make, use, sell, offer for sale, import and otherwise run, modify and propagate the contents of its contributor version.

    In the following three paragraphs, a “patent license” is any express agreement or commitment, however denominated, not to enforce a patent (such as an express permission to practice a patent or covenant not to sue for patent infringement). To “grant” such a patent license to a party means to make such an agreement or commitment not to enforce a patent against the party.

    If you convey a covered work, knowingly relying on a patent license, and the Corresponding Source of the work is not available for anyone to  copy, free of charge and under the terms of this License, through a publicly available network server or other readily accessible means, then you must either (1) cause the Corresponding Source to be so available, or (2) arrange to deprive yourself of the benefit of the patent license for this particular work, or (3) arrange, in a manner consistent with the requirements of this License, to extend the patent license to downstream recipients. “Knowingly relying” means you have actual knowledge that, but for the patent license, your conveying the covered work in a country, or your recipient's use of the covered work in a country, would infringe one or more identifiable patents in that country that you have reason to believe are valid.

    If, pursuant to or in connection with a single transaction or arrangement, you convey, or propagate by procuring conveyance of, a covered work, and grant a patent license to some of the parties receiving the covered work authorizing them to use, propagate, modify or convey a specific copy of the covered work, then the patent license you grant is automatically extended to all recipients of the covered work and works based on it.

    A patent license is “discriminatory” if it does not include within the scope of its coverage, prohibits the exercise of, or is conditioned on the non-exercise of one or more of the rights that are specifically granted under this License. You may not convey a covered work if you are a party to an arrangement with a third party that is in the business of distributing software, under which you make payment to the third party based on the extent of your activity of conveying the work, and under which the third party grants, to any of the parties who would receive the covered work from you, a discriminatory patent license (a) in connection with copies of the covered work conveyed by you (or copies made from those copies), or (b) primarily for and in connection with specific products or compilations that contain the covered work, unless you entered into that arrangement, or that patent license was granted, prior to 28 March 2007.

    Nothing in this License shall be construed as excluding or limiting any implied license or other defenses to infringement that may otherwise be available to you under applicable patent law.

12. No Surrender of Others' Freedom.
------------------------------------

    If conditions are imposed on you (whether by court order, agreement or otherwise) that contradict the conditions of this License, they do not excuse you from the conditions of this License. If you cannot convey a covered work so as to satisfy simultaneously your obligations under this License and any other pertinent obligations, then as a consequence you may not convey it at all. For example, if you agree to terms that obligate you to collect a royalty for further conveying from those to whom you convey the Program, the only way you could satisfy both those terms and this License would be to refrain entirely from conveying the Program.

13. Use with the GNU Affero General Public License.
---------------------------------------------------

    Notwithstanding any other provision of this License, you have permission to link or combine any covered work with a work licensed under version 3 of the GNU Affero General Public License into a single combined work, and to convey the resulting work. The terms of this License will continue to apply to the part which is the covered work, but the special requirements of the GNU Affero General Public License, section 13, concerning interaction through a network will apply to the combination as such.

14. Revised Versions of this License.
-------------------------------------

    The Free Software Foundation may publish revised and/or new versions of the GNU General Public License from time to time. Such new versions will be similar in spirit to the present version, but may differ in detail to address new problems or concerns.

    Each version is given a distinguishing version number. If the Program specifies that a certain numbered version of the GNU General Public License “or any later version” applies to it, you have the option of following the terms and conditions either of that numbered version or of any later version published by the Free Software Foundation. If the Program does not specify a version number of the GNU General Public  License, you may choose any version ever published by the Free Software Foundation.

    If the Program specifies that a proxy can decide which future versions of the GNU General Public License can be used, that proxy's public statement of acceptance of a version permanently authorizes you to choose that version for the Program.

    Later license versions may give you additional or different permissions. However, no additional obligations are imposed on any author or copyright holder as a result of your choosing to follow a later version.

[Warranty]
15. Disclaimer of Warranty.
---------------------------

    THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY APPLICABLE LAW. EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT HOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM “AS IS” WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM IS WITH YOU. SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

16. Limitation of Liability.
----------------------------

    IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING WILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS THE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS), EVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

17. Interpretation of Sections 15 and 16.
-----------------------------------------

    If the disclaimer of warranty and limitation of liability provided above cannot be given local legal effect according to their terms, reviewing courts shall apply local law that most closely approximates an absolute waiver of all civil liability in connection with the Program, unless a warranty or assumption of liability accompanies a copy of the Program in return for a fee.

                      END OF TERMS AND CONDITIONS


               How to Apply These Terms to Your New Programs

    If you develop a new program, and you want it to be of the greatest possible use to the public, the best way to achieve this is to make it free software which everyone can redistribute and change under these terms.

    To do so, attach the following notices to the program. It is safest to attach them to the start of each source file to most effectively state the exclusion of warranty; and each file should have at least the “copyright” line and a pointer to where the full notice is found.

  <one line to give the program's name and a brief idea of what it does.>
  Copyright (C) <year>  <name of author>

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.


Also add information on how to contact you by electronic and paper mail.


    If the program does terminal interaction, make it output a short notice like this when it starts in an interactive mode:

  <program>  Copyright (C) <year>  <name of author>
  This program comes with ABSOLUTELY NO WARRANTY; for details type `show w'.
  This is free software, and you are welcome to redistribute it
  under certain conditions; type `show c' for details.


    The hypothetical commands `show w' and `show c' should show the appropriate parts of the General Public License. Of course, your program's commands might be different; for a GUI interface, you would use an “about box”.

    You should also get your employer (if you work as a programmer) or school, if any, to sign a “copyright disclaimer” for the program, if necessary. For more information on this, and how to apply and follow the GNU GPL, see <http://www.gnu.org/licenses/>.

    The GNU General Public License does not permit incorporating your program into proprietary programs. If your program is a subroutine library, you may consider it more useful to permit linking proprietary applications with the library. If this is what you want to do, use the GNU Lesser General Public License instead of this License. But first, please read <http://www.gnu.org/philosophy/why-not-lgpl.html>.

[Licencia GNU (Español)]

See original License.

[QueryBox]
Cuadros de diálogo

En los cuadros de diálogo puede desplazarse con el teclado usando las flechas o las teclas de las letras resaltadas.

También se pueden pulsar los botones con el ratón.

[How to use help]
Uso de la ayuda

Se pueden utilizar las flechas o el ratón para navegar por el sistema de ayuda.

La flecha de abajo cambia al siguiente elemento o baja. La tecla de arriba vuelve al elemento anterior o sube. La tecla derecha sigue el enlace activo. La tecla izquierda vuelve a la última página visitada.

Si el terminal no es compatible con las flechas de cursor se puede avanzar con la barra espaciadora y retroceder con la tecla b (back). El tabulador activa el elemento siguiente y con INTRO se puede entrar al enlace correspondiente. La tecla l (last) permite volver a la última página.

ESC pulsada dos veces permite salir de la ayuda.

El botón izquierdo del ratón avanza o sigue enlaces y el botón derecho retrocede o vuelve a la última página.

La función de todas las teclas en la ayuda:

Las teclas de desplazamiento genéricasGeneral Movement Keys son válidas.

tabulador       Avanzar al elemento posterior.
Alt-tabulador   Retroceder al elemento anterior.
abajo           Avanzar elemento o bajar una línea.
arriba          Retroceder elemento o subir una línea.
derecha, INTRO  Seguir enlace.
izquierda, l    Volver a la última página visitada.
F1              Mostrar la ayuda del sistema de ayuda.
n               Pasar a la página siguiente.
p               Pasar a la página anterior.
c               Pasar a la página de contenidos.
F10, ESC        Salir de la ayuda.

Local variables:
fill-column: 58
end:
