                         Manual de usuario de aptitude

Versión 0.6.8.2

  Daniel Burrows

   <dburrows@debian.org>

   Copyright © 2004-2008 Daniel Burrows

   This manual is free software; you can redistribute it and/or modify it
   under the terms of the GNU General Public License as published by the Free
   Software Foundation; either version 2 of the License, or (at your option)
   any later version.

   This manual is distributed in the hope that it will be useful, but WITHOUT
   ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
   FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for
   more details.

   You should have received a copy of the GNU General Public License along
   with this manual; if not, write to the Free Software Foundation, Inc., 59
   Temple Place, Suite 330, Boston, MA 02111-1307 USA

   --------------------------------------------------------------------------

   Tabla de contenidos

   Introducción

                ¿Qué es aptitude?

                ¿Qué es un gestor de paquetes?

                ¿Qué es el sistema apt?

                ¿Cómo puedo conseguir aptitude?

                             Paquetes pre-compilados de aptitude, o “lo que
                             el 99% de los usuarios debería hacer”.

                             Construir aptitude desde el código fuente.

                             Cómo seguir y participar en el desarrollo de
                             aptitude.

   1. Empezar

                Usar aptitude

                             Introducción al uso de aptitude.

                             Explorar la lista de paquetes de aptitude.

                             Encontrar paquetes por nombre.

                             Gestionar paquetes.

                             Actualizar la lista de paquetes e instalar
                             paquetes.

                Usar aptitude en la línea de órdenes

   2. Guía de referencia de aptitude

                La interfaz de usuario de aptitude en la terminal

                             Usar los menús.

                             Órdenes del menú.

                             Trabajar con varias vistas.

                             Convertirse en root.

                Gestionar paquetes.

                             Gestionar la lista de paquetes.

                             Acceso a la información de los paquetes.

                             Modificar los estados de los paquete.

                             Descargar, instalar y eliminar paquetes.

                             Llaves GPG: Entender y gestionar la confianza de
                             los paquetes.

                             Gestionar paquetes automáticamente instalados.

                Resolver las dependencias de los paquetes

                             Resolución de dependencias de aptitude.

                             Resolución inmediata de dependencias.

                             Resolver dependencias de manera interactiva.

                             Costes en el solucionador interactivo de
                             dependencias.

                             Configurar el solucionador interactivo de
                             dependencias.

                Patrones de búsqueda

                             Buscar cadenas de caracteres.

                             Abreviaturas de términos de búsqueda.

                             Búsquedas y versiones.

                             Objetivos explícitos de búsqueda.

                             Referencia de los términos de búsqueda.

                Personalizar aptitude

                             Personalizar la lista de paquetes.

                             Personalizar teclas rápidas.

                             Personalizar los colores del texto y estilos.

                             Personalizar el diseño de la interfaz.

                             Referencia del fichero de configuración.

                             Temas.

                Jugar al Buscaminas

   3. Preguntas más frecuentes de aptitude

   4. Créditos

   I. Referencia de la línea de órdenes

                aptitude — interfaz de alto nivel para la gestión de paquetes

                aptitude-create-state-bundle — empaqueta el estado actual de
                aptitude

                aptitude-run-state-bundle — desempaqueta un fichero de estado
                de aptitude e invoca aptitude sobre éste

   Lista de figuras

   2.1. Órdenes disponibles en el menú Acciones.

   2.2. Órdenes disponibles en el menú Deshacer.

   2.3. Órdenes disponibles en el menú Paquete.

   2.4. Órdenes disponibles en el menú Solucionador.

   2.5. Órdenes disponibles en el menú Buscar.

   2.6. Órdenes disponibles en el menú Opciones.

   2.7. Órdenes disponibles en el menú Vistas.

   2.8. Órdenes disponibles en el menú Ayuda.

   2.9. Valores de la marca de “estado actual”

   2.10. Valores de la marca de “acción”

   2.11. Sintaxis de componentes de coste compuestos

   2.12. Niveles de coste de seguridad

   2.13. Sintaxis del término ?for

   2.14. Estilos personalizables en aptitude

   Lista de tablas

   2.1. Componentes de coste básicos

   2.2. Niveles de coste de seguridad predeterminados

   2.3. Guía rápida de términos de búsqueda

   Lista de ejemplos

   2.1. Ejemplo de costes del solucionador

   2.2. Uso del término ?=.

   2.3. Uso del término ?bind.

   2.4. Uso del término ?exact-name.

   2.5. Uso del término ?for.

   2.6. Uso del término ?term-prefix.

   2.7. Uso de pattern (patrón) para agrupar paquetes en base a su
   desarrollador.

   2.8. Uso de pattern con algunos paquetes del nivel superior.

   2.9. Uso de la directriz de agrupación pattern con sub-directrices.

   10. Uso de --show-summary.

Introducción

   Tabla de contenidos

   ¿Qué es aptitude?

   ¿Qué es un gestor de paquetes?

   ¿Qué es el sistema apt?

   ¿Cómo puedo conseguir aptitude?

                Paquetes pre-compilados de aptitude, o “lo que el 99% de los
                usuarios debería hacer”.

                Construir aptitude desde el código fuente.

                Cómo seguir y participar en el desarrollo de aptitude.

     “Maestro, ¿posee Emacs la naturaleza del Buda?” preguntó el novicio.    

     “No veo porqué no,” respondió el maestro. “Va sobrado en todo lo
     demás.” Varios años después, de súbito, el novicio alcanzó la
     iluminación.
                                                                -- John Fouhy

   ¡Hola y bienvenido al Manual de usuario de aptitude! Esta sección
   introductoria explica qué es aptitude y como conseguirlo; en lo referente
   a información de su uso, consulte Capítulo 1, Empezar.

¿Qué es aptitude?

   aptitude es un gestor de paquetes con varias funciones diseñado para
   sistemas Debian GNU/Linux, y basado en la infraestructura del conocido
   gestor de paquetes apt. aptitude ofrece la funcionalidad de dselect y
   apt-get así como otras funciones adicionales que no se encuentran en
   ninguno de los programas anteriormente mencionados.

¿Qué es un gestor de paquetes?

   Un gestor de paquetes mantiene un registro del software que está instalado
   en su ordenador, y le permite instalar software nuevo, actualizarlo a
   versiones más recientes, o eliminar software de una manera sencilla. Como
   su propio nombre sugiere, los gestores de paquetes gestionan paquetes:
   conjuntos de ficheros que se agrupan y que puede instalar y eliminar como
   conjunto.

   A menudo, un paquete es un solo programa. Por ejemplo, el cliente de
   mensajería instantánea gaim se encuentra dentro en un paquete Debian del
   mismo nombre. Por otro lado, es común que un programa consista de varios
   paquetes relacionados entre ellos. Por ejemplo, el editor de imágenes gimp
   no solo consiste del paquete gimp, sino también del paquete gimp-data;
   además, hay otros paquetes opcionales también disponibles (los cuales
   contienen datos esotéricos, documentación y así en adelante). También es
   posible que varios programas pequeños y relacionados entre si se
   encuentren en el mismo paquete: por ejemplo, el paquete fileutils contiene
   varias órdenes de Unix, tales como ls, cp, etc.

   Algunos paquetes requieren de otros para funcionar. En Debian, algunos
   paquetes pueden depender de otro, recomendar, sugerir, romper, o entrar en
   conflicto con otros paquetes.

     o Si un paquete A depende de otro paquete B, entonces B es necesario
       para que A funcione correctamente. Por ejemplo, el paquete gimp
       depende del paquete gimp-data para permitir que el editor gráfico GIMP
       pueda acceder a sus ficheros críticos de datos.

     o Si un paquete A recomienda otro paquete B, entonces B ofrece una
       importante funcionalidad adicional para A que sería deseable en la
       mayoría de las circunstancias. Por ejemplo, el paquete mozilla-browser
       recomienda el paquete mozilla-psm, que añade la capacidad para la
       transferencia segura de datos al navegador web de Mozilla. Aunque
       mozilla-psm no es estrictamente necesario para que Mozilla funcione,
       la mayoría de usuarios desearán que Mozilla permita la transmisión de
       datos de manera confidencial (tales como los números de una tarjeta de
       crédito).

     o Si un paquete A sugiere otro paquete B, entonces el paquete B ofrece a
       A una funcionalidad que puede que mejore A, pero que no es necesaria
       en la mayoría de los casos. Por ejemplo, el paquete kmail sugiere el
       paquete gnupg, el cual contiene software de cifrado que KMail puede
       emplear.

     o Si un paquete A entra en conflicto con otro paquete B, los dos
       paquetes no se pueden instalar a la vez. Por ejemplo, fb-music-hi
       entra en conflicto con fb-music-low porque ofrecen conjuntos
       alternativos de sonidos para el juego Frozen Bubble.

   La labor de un gestor de paquetes es la de presentar una interfaz que
   asista al usuario en la tarea de administrar el conjunto de paquetes que
   están instalados en su sistema. aptitude proporciona una interfaz que se
   basa en el sistema de administración de paquetes apt.

¿Qué es el sistema apt?

   Poder instalar y eliminar paquetes está muy bien, pero el software básico
   que realiza esta función (conocido como dpkg) hace exactamente esto y nada
   más. Esto es suficiente si se descarga uno o dos paquetes a mano, pero
   enseguida se convierte en una ardua tarea cuando intenta gestionar un
   número mayor de paquetes. Mas aún, si su flamante paquete nuevo requiere
   software que no ha instalado previamente, tendrá que descargarse los
   paquetes requeridos a mano. Y si después decide eliminar el ya obsoleto
   software, esos paquetes adicionales se quedarían en el sistema consumiendo
   espacio a menos que los elimine manualmente.

   Obviamente, toda esta labor manual es una tarea tediosa, y por ello la
   mayoría de sistemas de gestión de paquetes incorporan software que se
   ocupa de parte o de toda esta labor por Ud. apt proporciona una base común
   sobre la que construir estos programas: además de aptitude, programas
   tales como synaptic y apt-watch hacen uso de apt.

   apt funciona mediante el registro de una lista de los paquetes que se
   pueden descargar desde Debian a su ordenador. Esta lista es útil a la hora
   de encontrar los paquetes a actualizar y para instalar paquetes nuevos.
   apt también puede resolver problemas de dependencias automáticamente: por
   ejemplo, cuando escoja instalar un paquete, encontrará cualquier paquete
   adicional requerido e instalará esos también.

   Cuando use un gestor de paquetes basado en apt, tales como aptitude, por
   lo general realizará tres tareas básicas: actualizar la lista de paquetes
   que están disponibles mediante la descarga de listas nuevas desde los
   servidores de Debian, seleccionar qué paquetes se deberían instalar,
   actualizar o eliminar, y finalmente confirmar sus selecciones llevando a
   cabo las instalaciones, eliminaciones, etc.

   Los sistemas de gestión de paquetes basados en apt leen la lista de
   “fuentes” («sources», repositorios de paquetes para Debian) del fichero
   /etc/apt/sources.list. El formato y contenido de este fichero están más
   allá del alcance de este documento, pero se describen en la página de
   manual sources.list(5).

¿Cómo puedo conseguir aptitude?

   En el caso de que esté leyendo este manual sin tener aptitude instalado en
   su sistema, esta sección le ayudará a corregir esta desafortunada
   situación. La mayoría de usuarios deberían leer directamente la sección de
   paquetes pre-compilados.

  Paquetes pre-compilados de aptitude, o “lo que el 99% de los usuarios debería
  hacer”.

   Los paquetes pre-compilados, o paquetes “binarios”, ofrecen la manera más
   sencilla y común de instalar aptitude. Solo se debe intentar una
   instalación desde las fuentes si los paquetes binarios no están
   disponibles por alguna razón, o si tiene necesidades especiales que no
   cubren los paquetes binarios.

   Si está usando un sistema Debian, ejecute la siguiente orden como root
   (administrador): apt-get install aptitude. Si no está usando un sistema
   Debian, puede que su proveedor de software haya creado un paquete
   pre-compilado de aptitude; puede contactarles para preguntas posteriores
   si no está seguro.

  Construir aptitude desde el código fuente.

   También puede construir aptitude desde las fuentes; por otro lado, este no
   es un ejercicio útil a menos que tenga apt ya instalado en su sistema. Si
   lo está, puede instalar aptitude desde las fuentes mediante los siguientes
   pasos:

    1. Instalar los siguientes programas:

          o Un compilador C++, por ejemplo g++.

          o Los ficheros de desarrollo de apt, que generalmente se encuentran
            en un paquete con un nombre parecido a libapt-pkg-dev.

          o La biblioteca libsigc++-2.0, disponible en el paquete
            libsigc++-2.0-dev o desde http://libsigc.sourceforge.net.

          o La biblioteca cwidget, disponible en el paquete libcwidget-dev o
            en http://cwidget.alioth.debian.org.

          o El programa gettext, que debería estar incluido en su
            distribución de Linux.

          o Una herramienta make, tal como GNU make.

    2. Por último pero no por ello menos importante, descargue la versión más
       reciente del código fuente, disponible en
       http://packages.debian.org/unstable/admin/aptitude (desplácese hasta
       la base de la página y descargue el fichero “.orig.tar.gz”).

   Una vez que disponga de todos los componentes necesarios, abra una
   terminal y ejecute la orden tar zxf aptitude-0.6.8.2.tar.gz para
   desempaquetar el código fuente. Una vez que haya desempaquetado el código
   fuente, introduzca cd aptitude-0.6.8.2 && ./configure && make para
   compilar aptitude. Si tiene éxito, asegúrese de que es el usuario root
   (usando su, por ejemplo), y después teclee make install para instalar
   aptitude en su equipo. Una vez que haya instalado aptitude con éxito,
   ejecutar aptitude en una terminal debería iniciar el programa.

  Cómo seguir y participar en el desarrollo de aptitude.

    Obtener las fuentes del árbol de desarrollo de aptitude

   Si quiere probar el código fuente más reciente de aptitude, puede
   descargar el código fuente no publicado de aptitude utilizando Git.
   Instale Git (disponible en http://git-scm.com/) y ejecute la orden git
   clone git://git.debian.org/git/aptitude/aptitude.git para obtener el
   código fuente más reciente.

   [Aviso] Aviso
           El repositorio Git de aptitude es un árbol de desarrollo activo;
           varía a medida que se corrigen fallos y nuevas características son
           añadidas, y no hay ninguna garantía de que pueda compilarlo, ¡no
           digamos ejecutarlo correctamente! Los informes de error son
           bienvenidos, pero sea consciente de que utiliza código en
           desarrollo bajo su responsabilidad.^[1]

    Lista de correo

   La lista de correo principal para aptitude es
   <aptitude-devel@lists.alioth.debian.org>. Los ficheros de esta lista se
   encuentra en http://lists.alioth.debian.org/pipermail/aptitude-devel/.
   Para suscribirse, visite la página web
   http://lists.alioth.debian.org/mailman/listinfo/aptitude-devel.

    Enviar parches

   Preferentemente, los parches se han de enviar a la lista de correo de
   aptitude <aptitude-devel@lists.alioth.debian.org>. Pero si prefiere
   mandarlos a través de un correo privado, debe hacerlo a
   <aptitude@packages.debian.org> o a <dburrows@debian.org>. Apreciaríamos de
   manera especial una breve descripción de la motivación que hay detrás de
   su parche, y una explicación de su funcionamiento.

    Seguir los cambios en el árbol de fuentes de aptitude

   El árbol de fuentes de aptitude se actualiza regularmente con nuevas
   características, arreglos de fallos, y fallos nuevos. Una vez que el
   código fuente esté disponible en su ordenador (consulte la sección
   anterior), puede utilizar cd para acceder a la carpeta y ejecutar git pull
   para actualizarlo con cualquier cambio que se haya podido introducir en el
   repositorio central.

   Para recibir notificaciones automáticas cuando se realicen cambios en el
   código base de aptitude, suscríbase a la fuente web Atom disponible en
   http://anonscm.debian.org/gitweb/?p=aptitude/aptitude.git;a=atom o a la
   fuente web RSS disponible en
   http://anonscm.debian.org/gitweb/?p=aptitude/aptitude.git;a=rss.

    Compilar aptitude desde el árbol de desarrollo

   Para compilar aptitude desde el repositorio Git, debe tener instalados los
   programas autoconf y automake. Introduzca sh ./autogen.sh && ./configure
   para generar los ficheros necesarios para compilar aptitude, a
   continuación ejecute make y make install.

   --------------

   ^[1] Por supuesto, todo el software libre se emplea bajo la
   responsabilidad del usuario, pero el riesgo relacionado con usar un árbol
   de desarrollo activo es mucho mayor.

Capítulo 1. Empezar

   Tabla de contenidos

   Usar aptitude

                Introducción al uso de aptitude.

                Explorar la lista de paquetes de aptitude.

                Encontrar paquetes por nombre.

                Gestionar paquetes.

                Actualizar la lista de paquetes e instalar paquetes.

   Usar aptitude en la línea de órdenes

           Una travesía de mil millas debe empezar con un solo paso.    
                                                                   -- Lao Tsu

   aptitude es un programa relativamente grande con muchas características, y
   que puede presentar ciertas dificultades al usuario a la hora de
   familiarizarse con él. Este capítulo no describe de manera exhaustiva las
   características de aptitude (consulte Capítulo 2, Guía de referencia de
   aptitude para ello), pero ofrece una presentación de las funciones más
   básicas y empleadas.

Usar aptitude

   Esta sección describe como usar la interfaz gráfica de aptitude. Para
   información relacionada con el uso de la interfaz en línea de órdenes de
   aptitude, consulte “Usar aptitude en la línea de órdenes”.

  Introducción al uso de aptitude.

   Para iniciar aptitude abra su terminal de texto favorita y, en la línea de
   órdenes, teclee:

 foobar$ aptitude

   Una vez que el almacén se cargue (esto puede llevar algún tiempo en
   máquinas más lentas), debería aparecer la pantalla central de aptitude:

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
 aptitude 0.2.14.1
 --- Paquetes instalados
 --- Paquetes no instalados
 --- Paquetes obsoletos y creados localmente
 --- Paquetes virtuales
 --- Tareas






 Estos paquetes están instalados en su ordenador.









   Como puede ver, la pantalla principal de aptitude está dividida en varias
   áreas. La línea azul en la parte superior de la terminal es la barra de
   menú, y las líneas inferiores muestran mensajes informativos que describen
   algunas órdenes importantes. El espacio negro a continuación es la lista
   de todos los paquetes disponibles, en la cual aparecen algunos grupos de
   paquetes. El grupo seleccionado (“Paquetes instalados”) está resaltado, y
   su descripción se muestra en el espacio inferior en negro.

   Como sugiere la línea superior de la pantalla, puede acceder al menú de
   aptitude pulsando Control+t; también puede pulsar sobre el titulo del menú
   si su sistema lo permite. Pulse Control+t para abrir el menú Acciones:

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 +-------------------------+  u: Actualizar  g: Descarga/Instala/Elimina Paqs
 |Instalar/eliminar paquetes g     |
 |Actualizar la lista de paquetes u|
 |Olvidar paquetes nuevos         f|
 |Limpiar el almacén de paquetes   |
 |Limpiar ficheros obsoletos       |
 |Marcar actualizable             U|
 |Jugar al buscaminas              |
 |Convertirse en administrador     |
 +---------------------------------+
 |Salir                           Q|
 +---------------------------------+










 Realizar todas las instalaciones y eliminaciones pendientes

   Use las teclas de dirección e Intro para seleccionar los elementos del
   menú (o si su sistema lo permite, pulse sobre ellos con el ratón); para
   cerrar el menú sin seleccionar nada, pulse Control+t otra vez. Una
   descripción del elemento del menú resaltado aparecerá en la base de la
   pantalla. Si un elemento del menú se puede activar mediante un atajo de
   teclado, el atajo aparecerá en el menú: por ejemplo, puede ejecutar la
   orden “Actualizar la lista de paquetes” pulsando u.

   En cualquier momento, puede pulsar ? para mostrar una tabla de referencia
   en línea con los atajos de teclado disponibles.

  Explorar la lista de paquetes de aptitude.

   La lista de paquetes es la interfaz primaria de aptitude. Al iniciar
   aptitude la lista se organiza en grupos, como puede ver en la siguiente
   imagen:

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
 aptitude 0.2.14.1
 --- Paquetes instalados
 --- Paquetes no instalados
 --- Paquetes obsoletos y creados localmente
 --- Paquetes virtuales
 --- Tareas






 Estos paquetes están instalados en su ordenador.









   [Nota] Nota
          aptitude ocultará automáticamente los grupos de paquetes que estén
          vacíos, así que puede que vea más o menos grupos de los que
          aparecen en esta imagen.

   En la captura de pantalla anterior, el primer grupo (“Paquetes
   instalados”) está resaltado, indicando que está seleccionado en ese
   momento. Puede navegar a través de la lista con las flechas de dirección;
   observe que la descripción en el campo inferior a la lista de paquetes
   varía a medida que navega. Para “expandir” un grupo, pulse Intro cuando el
   grupo esté resaltado:

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menu ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
 aptitude 0.2.14.1
 --\ Paquetes instalados
   --- admin - Utilidades de administración (instalación de programas, gestión de usuarios, etc)
   --- devel - Utilidades y programas para desarollo de programas
   --- doc - Documentación y programas especializados para ver documentación
   --- editors - Editores y procesadores de texto
   --- electronics - Programas para trabajar con circuitos y electrónica
   --- games - Juegos, jugetes y programas divertidos
   --- gnome - El sistema de escritorio GNOME
   --- graphics - Utilidades para crear ver y editar ficheros de gráficos

 Estos paquetes están instalados en su ordenador.









   Como puede ver, el grupo “Paquetes instalados” se ha expandido para
   mostrar su contenido: contiene un número de sub-grupos, definidos de
   manera abierta dependiendo del tipo de software que contienen. Si
   expandimos la sección “admin” resaltándolo y pulsando Intro, podemos ver:

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menu ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
 aptitude 0.2.14.1
 --\ Paquetes instalados
   --- admin - Utilidades de administración (instalación de programas, gestión de usuarios, etc)
     ---principal
   --- devel - Utilidades y programas para desarollo de programas
   --- doc - Documentación y programas especializados para ver documentación
   --- editors - Editores y procesadores de texto
   --- electronics - Programas para trabajar con circuitos y electrónica
   --- games - Juegos, jugetes y programas divertidos
   --- gnome - El sistema de escritorio GNOME

 Los paquetes en la sección 'admin' permiten realizar tareas de administración
 como instalar programas, gestionar los usuarios, configurar y monotorizar tu sistema,
 examinar el tráfico de red, y así sucesivamente.







   El grupo “admin” contiene un solo sub-grupo, el archivo “principal”
   («main») de Debian. ¡Si expande este grupo verá algunos paquetes!

   [Sugerencia] Sugerencia
                Para ahorrar tiempo, puede usar la tecla [ para expandir
                todos los sub-grupos de un grupo a la vez. Selecciona
                “Paquetes instalados” y pulsar [ revelaría inmediatamente los
                paquetes de la imagen inferior.

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menu ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
 aptitude 0.2.14.1
 --\ Paquetes instalados
   --\ admin - Utilidades de administración (instalación de programas, gestión de usuarios, etc)
     --\ principal
 i     acpid                                                1.0.3-19   1.0.3-19
 i     alien                                                8.44       8.44
 i     anacron                                              2.3-9      2.3-9
 i     apt-show-versions                                    0.07       0.07
 i A   apt-utils                                            0.5.25     0.5.25
 i     apt-watch                                            0.3.2-2    0.3.2-2
 i     aptitude                                             0.2.14.1-2 0.2.14.1-2









   Además de las flechas de dirección, puede mover la selección a través de
   la lista de paquetes mostrando una página de información cada vez usando
   las teclas Repág y Avpág.

   [Sugerencia] Sugerencia
                Cuando hay más información en la zona inferior de la pantalla
                de la que cabe en el espacio disponible, puede emplear las
                teclas a y z para desplazarse a través de la información.

  Encontrar paquetes por nombre.

   Para encontrar rápidamente un paquete cuyo nombre conoce, pulse / para
   abrir una ventana de diálogo de búsqueda:

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menu ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
 aptitude 0.2.14.1
 i     frozen-bubble                                        1.0.0-5    1.0.0-5
 i A   frozen-bubble-data                                   1.0.0-5    1.0.0-5
 i     geekcode                                             1.7.3-1    1.7.3-1
 i     gfpoken                                              0.25-3     0.25-3
 i     ggz-gnome-client                                     0.0.7-2    0.0.7-2
 i     ggz-gtk-client                                       0.0.7-1    0.0.7-1
 i     ggz-gtk-game-data                                    0.0.7-2    0.0.7-2
 i +--------------------------------------------------------------------------+
 i |Buscar:                                                                   |
 i |froz                                                                      |
 Po|                             [ Aceptar]                       [ Cancelar ]|
 Fr+--------------------------------------------------------------------------+
 attempt to shoot bubbles into groups of the same color to cause them to pop. It
 features 100 single-player levels, a two-player mode, music and striking
 graphics.

 This game is widely rumored to be responsible for delaying the Woody release.

 URL: http://www.frozen-bubble.org/


   Como puede ver en la imagen anterior, una búsqueda de froz encuentra el
   paquete frozen-bubble. Es posible encontrar paquetes con criterios
   complejos usando el poderoso lenguaje de búsqueda de aptitude, descrito en
   “Patrones de búsqueda”.

   [Sugerencia] Sugerencia
                Puede buscar hacia atrás en la lista de paquetes si pulsa \,
                y puede repetir la ultima búsqueda si pulsa n tras cerrar la
                ventana de búsqueda.

   A veces es práctico ocultar todos los paquetes excepto aquellos que se
   corresponden con un criterio en particular. Para ello, pulse l:

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
 aptitude 0.2.14.1
 --- Paquetes instalados
 --- Paquetes no instalados
 --- Paquetes obsoletos y creados localmente
 --- Paquetes virtuales
 --- Tareas


   +--------------------------------------------------------------------------+
   |Introduzca el nuevo límite de árbol de paquetes                           |
   |apti                                                                      |
   |                             [ Aceptar ]                      [ Cancelar ]|
 Es+--------------------------------------------------------------------------+









   Este dialogo funciona exactamente igual que el dialogo de búsqueda, sólo
   que en vez de realzar el siguiente paquete que coincide con lo que ha
   introducido en el cuadro de dialogo, oculta todos los paquetes que no lo
   hacen. Por ejemplo, si teclea apti y pulsa Intro, ocultará todos los
   paquetes excepto aquellos cuyo nombre contiene “apti”:

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
 aptitude 0.2.14.1
 --\ Paquetes instalados
   --\ admin - Utilidades de administración (instalación de programas, gestión de usuarios, etc)
     --\ principal................................................
 i     aptitude                                             0.2.14.1-2 0.2.14.1-2
 i A   synaptic                                             0.51-1     0.51-1
   --\ x11 - El sistema de ventanas X y programas relacionados
     --\ principal......................
 i     xfree86-driver-synaptics                             0.13.3-1   0.13.3-1
 --- Paquetes no instalados
 --- Paquetes virtuales

 Estos paquetes están instalados en su ordenador









  Gestionar paquetes.

   Ahora que sabe navegar a través de la lista de paquetes, es hora de que
   empiece a usar aptitude para instalar y eliminar paquetes. En esta
   sección, aprenderá como marcar los paquetes para su instalación,
   eliminación o actualización.

   [Sugerencia] Sugerencia
                Sólo puede cambiar la configuración del sistema como el
                usuario root. Si quiere experimentar con aptitude, puede
                iniciarlo de manera segura como cualquier otro usuario aparte
                de como root sin dañar el sistema de ninguna manera. aptitude
                le avisará cuando esté intentando hacer algo que sólo el
                usuario root puede hacer, y si desea continuar tendrá que
                introducir la contraseña de root.

   Todos los cambios a un paquete se realizan primero, resaltándolo en la
   lista de paquetes, y después pulsando la tecla correspondiente a la acción
   que se debería realizar. Las teclas de acción básicas ^[2] son +, para
   instalar o actualizar un paquete, - para eliminarlo y = para evitar que un
   paquete se actualice automáticamente (esto se conoce como retener el
   paquete). Estas acciones no se ejecutan inmediatamente; aptitude
   simplemente actualiza la lista de paquetes para mostrar los cambios
   solicitados.

   Por ejemplo, en la siguiente imagen se ha seleccionado el paquete
   kaffeine-mozilla y la tecla +, pulsada. El paquete está ahora resaltado en
   verde, y ha aparecido la letra “i” a la izquierda de su nombre para
   indicar que se va a instalar; además, se muestra una estimación del
   espacio que el paquete ocupará en el disco duro.

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
 aptitude 0.2.14.1                  Se usará 2925kB del TamDes: 1375kB
   --\ kde - El sistema de escritorio KDE
     --\ principal
 p     bibletime-i18n                                        <none>     1.4.1-1
 p     education-desktop-kde                                 <none>     0.771
 p     junior-kde                                            <none>     1.4
 piA   kaffeine                                      +2843kB <none>     0.4.3-1
 pi    kaffeine-mozilla                              +81.9kB <none>     0.4.3-1
 p     karamba                                               <none>     0.17-5
 p     kde-devel                                             <none>     4:3.1.2
 p     kde-devel-extras                                      <none>     4:3.1.2
 El sistema de escritorio K(utilidades para desarrollo de programas)
 A metapackage containing dependencies for the core development suite of KDE
 including kdesdk, qt3-designer, and all core KDE -dev packages.








   [Sugerencia] Sugerencia
                En cualquier momento puede usar Deshacer → Deshacer
                (Control+u) para “deshacer” cualquier cambio realizado a uno
                o más paquetes. Esto es bastante útil en caso de que una
                acción tenga consecuencias inesperadas y desee “revertir” los
                paquetes a su estado anterior.

   Aparte de las acciones que afectan a los paquetes de manera individual,
   hay disponible otra acción importante: pulsar U actualiza cualquier
   paquete que tenga una nueva versión. Debería utilizar esta orden de manera
   regular para mantener su sistema siempre actualizado.

    Gestionar paquetes rotos

   A veces, cambiar el estado de un paquete puede causar que ciertos
   requisitos entre dependencias queden incumplidas; los paquetes con
   dependencias no resueltas se denominan rotos. aptitude le avisará cuando
   esto ocurra y describirá lo ocurrido. Por ejemplo, esto es lo que pasa si
   intento eliminar sound-juicer:

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
 aptitude 0.3.3       #Roto: 1   Se liberará 48.6MB de espacio del TamDesc
 i A   nautilus                                             2.10.1-4   2.10.1-4
 i     nautilus-cd-burner                                   2.10.2-1.1 2.10.2-1.1
 i A   nautilus-data                                        2.10.1-4   2.10.1-4
 i     netspeed                                             0.12.1-1   0.12.1-1
 i A   oaf                                                  0.6.10-3   0.6.10-3
 i     pybliographer                                        1.2.6.2-1  1.2.6.2-1
 i     rhythmbox                                            0.8.8-13   0.8.8-13
 i     shermans-aquarium                                    3.0.1-1    3.0.1-1
 idA   sound-juicer                                 -1733kB 2.10.1-3   2.10.1-3
 GNOME 2 CD Ripper
 sound-juicer se eliminará.


 Los siguientes dependen de sound-juicer y se romperán debido a su eliminación:


   * gnome-desktop-environment depende de sound-juicer

 [1(1)/...] Sugiere 1 instalación
 e: Examinar  !: Aplicar  .: Siguiente  ,: Anterior

   Como puede ver, aptitude muestra tres indicadores de que algo ha ido mal:
   primero, el número de paquetes rotos se muestra en el área azul superior;
   segundo, la mitad inferior de la pantalla cambia para mostrar los paquetes
   rotos relacionados con el paquete seleccionado en ese momento; tercero, en
   la base de la pantalla aparece una barra con una sugerencia de cómo
   solucionar el problema. Para encontrar con rapidez paquetes rotos en la
   lista de paquetes puede pulsar b o realizar una búsqueda de ?broken.

   [Nota] Nota
          El texto [1(1)/...] indica el progreso del solucionador de
          dependencias de aptitude. El primer número es la solución que está
          seleccionada en ese momento, y el segundo es el numero de
          soluciones que aptitude ha generado. La presencia del texto “...”
          indica que pueden existir algunas soluciones adicionales más allá
          de las generadas; si aptitude estuviese seguro de haber generado la
          única solución posible, este indicador mostraría [1/1].

   Para ver más información de cómo aptitude piensa que puede solucionar este
   problema, pulse e. Aparecería una pantalla similar a la siguiente:

   Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
                 Paquetes                          Resolver las dependencias
   --\ Mantener los paquetes siguientes en la versión actual:
     gstreamer0.8-cdparanoia                           [0.8.10-1 (unstable, now)]
     sound-juicer                                                [2.10.1-2 (now)]
















 [1(1)/...] Sugiere 2 mantenidos
 e: Examinar  !: Aplicar  .: Siguiente  ,: Anterior

   A partir de aquí puede ver más soluciones si pulsa «.», o volver a las
   soluciones previamente examinadas si pulsa «,». Para aplicar la solución
   seleccionada en ese momento y volver a la lista de paquetes, pulse !. Por
   ejemplo, si pulsase «.» en la pantalla anterior, se le presentaría la
   siguiente solución:

   Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
                 Paquetes                          Resolver dependencias
   --\ Mantener los paquetes siguientes en la versión actual::
     sound-juicer                                      [2.10.1-3 (unstable, now)]
   --\ Desactualizar los paquetes siguientes:
     gstreamer0.8-cdparanoia          [0.8.11-1 unstable, now -> 0.8.8-3 testing]















 [2(2)/...] Sugiere 1 mantenido,1 desactualización
 e: Examine  !: Apply  .: Next  ,: Previous

   Además de las órdenes básicas disponibles cuando examina las soluciones,
   puede pulsar r para “rechazar” las acciones que desapruebe. Por ejemplo,
   la primera solución cancelaría la eliminación de sound-juicer
   ¡precisamente la acción que intentaba ejecutar! Si pulsa r sobre el
   espacio correspondiente a esta acción, le diría a aptitude que no debería
   cancelar la eliminación de sound-juicer de esta manera.

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
                 Paquetes                          Resolver dependencias
   --\ Mantener los paquetes siguientes en la versión actual:
     gstreamer0.8-cdparanoia                           [0.8.11-1 (unstable, now)]
 R   sound-juicer                                      [2.10.1-3 (unstable, now)]






 GNOME 2 CD Ripper
 gnome-desktop-environment depende de sound-juicer
 --\ Las acciones siguientes resolverán estas dependencias:
   -> Eliminar gnome-desktop-environment [1:2.10.2.3 (unstable, testing, now)]
 R -> Cancelar la eliminación de sound-juicer
   -> Desactualizar sound-juicer [2.10.1-3 (unstable, now) -> 0.6.1-2 (testing)]




 [1(1)/...] Sugiere 2 mantenidos
 e: Examine  !: Apply  .: Next  ,: Previous

   Como puede ver, el elemento de la lista correspondiente a la acción de
   mantener la misma versión de sound-juicer se ha vuelto roja y marcada con
   una “R”, indicando que se ha rechazado. Las soluciones que pudiese generar
   en el futuro (esto es, cualquier solución que no haya examinado aún) no
   incluirían esta acción, aunque seguirían disponibles las soluciones
   previamente generadas y que contienen esta solución.

   [Nota] Nota
          En la captura de pantalla anterior, se puede ver una descripción de
          sound-juicer, el cual se muestra en el centro de la pantalla; bajo
          esta descripción puede ver la dependencia que causó que
          sound-juicer se haya mantenido en su versión actual, además de
          todas las maneras que aptitude conoce para resolver esta
          dependencia.

   Por ejemplo, si este rechazo (a una solución) se impone inmediatamente
   después de intentar eliminar sound-juicer, pulsar . nos llevaría a la
   siguiente solución, omitiendo la solución que cancela la instalación de
   sound-juicer y que desactualiza gstreamer0.8-cdparanoia.

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
                 Paquetes                          Resolver las dependencias
   --\ Eliminar los paquetes siguientes:
     gnome-desktop-environment              [1:2.10.2.3 (unstable, testing, now)]

















 [2(2)/...] Sugiere 1 eliminación
 e: Examinar  !: Aplicar  .: Siguiente  ,: Anterior

   Los rechazos solo se aplican a las soluciones generadas en el momento:
   esto es, las soluciones generadas al pulsar «.» mientras visiona la última
   solución generada. Las soluciones generadas anteriormente pueden aún
   contener rechazos a ciertas acciones. Puede cancelar un rechazo en
   cualquier momento si selecciona una vez más la acción rechazada y pulsa r;
   esto permitiría que se generen otra vez las soluciones que contienen la
   acción rechazada, incluyendo cualquier solución que haya “omitido” con
   anterioridad.

   La contrario a rechazar una acción es aprobarla. Para aprobar una acción
   simplemente seleccione la acción y presione a; esto forzaría al
   solucionador de problemas a escoger esta acción cuando sea posible^[3].
   Las acciones aprobadas se volverán verdes y se marcarán con “A”, como
   puede ver en la siguiente imagen:

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
                 Paquetes                          Resolver las dependencias
   --\ Eliminar los paquetes siguientes:
     gnome-desktop-environment              [1:2.10.2.3 (unstable, testing, now)]

















 [2(2)/...] Sugiere 1 eliminación
 e: Examinar  !: Aplicar  .: Siguiente  ,: Anterior

   [Importante] Importante
                Si no resuelve ninguna dependencia rota, aptitude llevará a
                cabo su sugerencia actual automáticamente cuando confirme al
                pulsar g las selecciones que haya hecho. Por otro lado, es
                difícil resolver automáticamente los problemas de
                dependencias, y puede que no le guste el resultado final. Por
                ello, es siempre mejor observar lo que aptitude ha planeado
                hacer antes de llevar a cabo los cambios.

  Actualizar la lista de paquetes e instalar paquetes.

   En este momento, ya sabe lo suficiente acerca de aptitude como para llevar
   a cabo modificaciones en el sistema.

   Debería actualizar periódicamente su lista de paquetes disponibles desde
   los servidores de Debian para estar al tanto de paquetes nuevos y de
   versiones nuevas de paquetes. Para ello, pulse u. Puede interrumpir la
   descarga en cualquier momento pulsando q.

   Una vez que tenga una lista actualizada de los paquetes, puede elegir qué
   paquetes se actualizarán, instalarán o eliminarán, como se ha descrito en
   sección anterior. Al instalar el paquete kaffeine-mozilla (del ejemplo
   anterior), se nos presenta la siguiente pantalla:

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
 aptitude 0.2.14.1                  Se usará 2925kB de espacio TamDesc: 1375kB
 --\ Paquetes automáticamente instalados para satisfacer las dependencias
 piA kaffeine                                        +2843kB <none>     0.4.3-1
 --\ Paquetes a instalar
 pi  kaffeine-mozilla                                +81.9kB <none>     0.4.3-1







 Estos paquetes se instalarán porque algún paquete seleccionado para
 instalar los necesita.

 Si selecciona un paquete, en este espacio aparecerá una explicación de su estado actual.





   Como puede ver, aptitude decidió de manera automática instalar kaffeine en
   mi sistema porque kaffeine-mozilla lo necesita. En este momento, puedo
   escoger entre continuar con la instalación, pulsando g, o cancelarla,
   pulsando q.

Usar aptitude en la línea de órdenes

   Además de la interfaz “gráfica” descrita en la sección anterior, también
   puede usar aptitude desde la línea de órdenes de la misma manera que
   usaría apt-get. Esta sección cubre las órdenes en línea de órdenes más
   comunes; para más información, consulte la guia de referencia en la línea
   de órdenes de aptitude.

   En general, invocar una orden de aptitude en la línea de órdenes presenta
   este aspecto:

   aptitude acción [argumentos...]

   La acción indica a aptitude qué acción realizar; los argumentos restantes
   se emplean de una manera específica dependiendo de la opción deseada. En
   líneas generales, consisten de nombres de paquetes y de diferentes
   opciones en la línea de órdenes^[4].

   Las acciones más importantes son:

   aptitude update

           Esta orden actualiza la lista de paquetes, al igual que si el
           usuario ejecuta la interfaz gráfica y pulsa u.

   aptitude safe-upgrade

           Esta orden actualiza tantos paquetes como sea posible sin eliminar
           paquetes ya existentes en el sistema.

           Algunas veces es necesario eliminar un paquete para poder
           actualizar otro; esta orden no es capaz de actualizar paquetes en
           tales situaciones. Use la orden full-upgrade para actualizar
           también esos paquetes.

   aptitude full-upgrade

           Al igual que safe-upgrade, esta orden llevaría a cabo una
           actualización de paquetes, pero es más agresiva a la hora de
           resolver los problemas de dependencias: instalará y eliminará
           paquetes hasta que todas las dependencias estén resueltas. Debido
           a la naturaleza de esta orden es probable que realice acciones no
           deseadas, y por lo tanto debería ser cuidadoso a la hora de
           emplearlo.

           [Nota] Nota
                  Por razones históricas, esta orden se llamaba originalmente
                  dist-upgrade, y aptitude aún reconoce este nombre.

   aptitude [ install | remove | purge ] paq1 [paq2...]

           Estas órdenes instalan, eliminan o purgan ^[5] los paquetes
           definidos. “Instalar” un paquete que ya lo está pero susceptible
           de ser actualizado hará que éste se actualice.

   aptitude search patrón1 [patrón2...]

           Esta orden busca paquetes cuyo nombre contenga cualquiera de los
           patrónes, mostrando el resultado en la terminal. Además de ser una
           cadena de texto, cada patrón puede ser un patrón de búsqueda como
           se describe en “Patrones de búsqueda”. ^[6]Por ejemplo, “aptitude
           search gnome kde” mostraría todos los paquetes cuyo nombre
           contenga “gnome” o “kde”.

   aptitude show paq1 [paq2...]

           Mostrar información sobre cada paq (paquete) en la terminal.

   Todas las órdenes que instalan, actualizan o eliminan paquetes aceptan el
   parámetro -s, que simboliza “simular”. Cuando se introduce -s en la línea
   de órdenes el programa realiza todas las acciones que haría normalmente,
   pero en la práctica no descarga, instala o elimina ningún fichero.

   A veces, aptitude nos presentará un dialogo como este:

 Se instalarán automáticamente los siguientes paquetes NUEVOS:
   space-orbit-common
 Se instalarán los siguiente paquetes NUEVOS:
   space-orbit space-orbit-common
 0 paquetes actualizados, 2 nuevos instalados, 0 para eliminar y 0 sin actualizar.
 Necesito descargar 3200kB de ficheros. Después de desempaquetar se usarán 8413kB
 ¿Quiere continuar? [Y/n/?]

   Además de las obvias opciones “Yes” y “No”, dispone de un número de
   órdenes que puede usar para cambiar la información mostrada, o para
   definir futuras acciones. Por ejemplo, pulsar s muestra u oculta
   información acerca del espacio que cada paquete usará:

 ¿Quiere continuar? [Y/n/?] s

 Se mostrarán los tamaños de los cambios.

 Se instalarán automáticamente los siguientes paquetes NUEVOS:
   space-orbit-common <+8020kB>
 Se instalarán los siguiente paquetes NUEVOS:
   space-orbit <+393kB> space-orbit-common <+8020kB>
 0 paquetes actualizados, 2 nuevos instalados, 0 para eliminar y 0 sin actualizar.
 Necesito descargar 3200kB de ficheros. Después de desempaquetar se usarán 8413kB
 ¿Quiere continuar? [Y/n/?]

   De manera similar, pulsar d mostrará información acerca de paquetes
   automáticamente instalados o eliminados:

 Se instalarán automáticamente los siguientes paquetes NUEVOS:
   space-orbit-common (D: space-orbit)
 Se instalarán los siguiente paquetes NUEVOS:
   space-orbit space-orbit-common
 0 paquetes actualizados, 2 nuevos instalados, 0 para eliminar y 0 sin actualizar.
 Necesito descargar 3200kB de ficheros. Después de desempaquetar se usarán 8413kB.

   Esto muestra que space-orbit-common se instalará porque space-orbit
   depende de él. Puede ver la lista entera de posibles entradas pulsando ?
   en el diálogo.

   aptitude le preguntará qué hacer si su petición rompe dependencias de una
   manera que no se pueda resolver de una forma sencilla:

 Los siguientes paquetes están ROTOS:
   libsdl1.2debian
 Se ELIMINARÁN los siguientes paquetes:
   libsdl1.2debian-alsa
 .
 .
 .
 Las acciones siguientes resolverán estas dependencias:

 Instalar los paquetes siguientes:
 libsdl1.2debian-all [1.2.12-1 (unstable)]

 La puntuación es 41

 ¿Acepta esta solución? [Y/n/q/?]

   Pulsar y (o simplemente Intro) aceptará la solución propuesta. Si pulsa n
   verá la “siguiente mejor” solución:

 ¿Acepta esta solución? [Y/n/q/?] n
 Las acciones siguientes resolverán estas dependencias:

 Instalar los paquetes siguientes:
 libsdl1.2debian-esd [1.2.12-1 (unstable)]

 Score is 19

 ¿Acepta esta solución? [Y/n/q/?]

   Al igual que en la línea de órdenes, puede realizar un número de acciones
   adicionales incluyendo alterar manualmente el estado de los paquetes
   desde, el dialogo de resolución de conflictos. Pulse ? para ver una lista
   completa.

   Si pulsa q, cancelaría el solucionador automático y le permitiría resolver
   las dependencias manualmente:

 ¿Acepta esta solución? [Y/n/q/?] q
 aptitude no pudo encontrar una solución a estas dependencias. Puede solucionar estas dependencias manualmente o pulsar «n» para salir
 No se satisfacen las dependencias de los siguientes paquetes:
   libsdl1.2debian: Depende de: libsdl1.2debian-alsa (= 1.2.12-1) pero no es instalable o
                             libsdl1.2debian-all (= 1.2.12-1) pero no es instalable o
                             libsdl1.2debian-esd (= 1.2.12-1) pero no es instalable o
                             libsdl1.2debian-arts (= 1.2.12-1) pero no es instalable o
                             libsdl1.2debian-oss (= 1.2.12-1) pero no es instalable o
                             libsdl1.2debian-nas (= 1.2.12-1) pero no es instalable o
                             libsdl1.2debian-pulseaudio (= 1.2.12-1) pero no es instalable
 ¿Desea resolver las dependencias manualmente? [N/+/-/_/:/?]

   Puede usar cualquiera de las órdenes de gestión de paquetes para resolver
   las dependencias rotas (pulse ? para una lista completa de las órdenes
   disponibles). Pulse n o Intro para salir de aptitude:

 ¿Desea resolver las dependencias manualmente? [N/+/-/_/:/?] n
 Cancela.

   Para una completa documentación acerca de las características de aptitude
   en la línea de órdenes, consulte Referencia de la línea de órdenes.

   --------------

   ^[2] También puede cambiar el estado de los paquetes usando el menú
   Paquete; consulte “El menú Paquete” para más detalles.

   ^[3] Aprobar una acción es ligeramente distinto a requerir que todas las
   soluciones contengan esa acción; lo que esto significa es que si se da una
   elección entre una acción aprobada y una no aprobada, el solucionador
   siempre escogerá la acción aprobada. Si se pueden aplicar varias acciones
   aprobadas, todas ellas serán candidatas a ser presentadas en la solución.

   ^[4] Una “opción” es una letra precedida de un guión: por ejemplo, “-a”,
   “-v”, etc.

   ^[5] Purgar un paquete elimina el paquete, así como también sus ficheros
   de configuración.

   ^[6] De hecho, lo mismo sirve para las órdenes que toman paquetes como
   argumentos, tales como install o show.

Capítulo 2. Guía de referencia de aptitude

   Tabla de contenidos

   La interfaz de usuario de aptitude en la terminal

                Usar los menús.

                Órdenes del menú.

                Trabajar con varias vistas.

                Convertirse en root.

   Gestionar paquetes.

                Gestionar la lista de paquetes.

                Acceso a la información de los paquetes.

                Modificar los estados de los paquete.

                Descargar, instalar y eliminar paquetes.

                Llaves GPG: Entender y gestionar la confianza de los
                paquetes.

                Gestionar paquetes automáticamente instalados.

   Resolver las dependencias de los paquetes

                Resolución de dependencias de aptitude.

                Resolución inmediata de dependencias.

                Resolver dependencias de manera interactiva.

                Costes en el solucionador interactivo de dependencias.

                Configurar el solucionador interactivo de dependencias.

   Patrones de búsqueda

                Buscar cadenas de caracteres.

                Abreviaturas de términos de búsqueda.

                Búsquedas y versiones.

                Objetivos explícitos de búsqueda.

                Referencia de los términos de búsqueda.

   Personalizar aptitude

                Personalizar la lista de paquetes.

                Personalizar teclas rápidas.

                Personalizar los colores del texto y estilos.

                Personalizar el diseño de la interfaz.

                Referencia del fichero de configuración.

                Temas.

   Jugar al Buscaminas

     El Conejo Blanco se puso las gafas. 'Por favor, ¿por donde podría yo    
     empezar, Su Majestad? preguntó.

     'Empieza por el principio' dijo el Rey con gravedad, 'y continua hasta
     que llegues al final: entonces, para.'
                         -- Lewis Carrol, Alicia en el país de las Maravillas

   aptitude es un programa extenso con varias características, y algunas
   veces es difícil recordar como hacer alguna operación, o incluso si es
   posible. De hecho, muchas de las peticiones que llegan al autor acerca de
   la implementación de más características describen características ya
   presentes, pero difíciles de encontrar.^[7]

   En un intento de combatir esta oscuridad, esta guía de referencia describe
   todas las capacidades y parámetros de configuración de aptitude, consulte
   Capítulo 1, Empezar.

   [Nota] Nota
          Puede configurar el comportamiento y la apariencia de aptitude de
          varias maneras. Este manual describe el funcionamiento del programa
          con las opciones predeterminadas; las descripciones de las
          múltiples opciones que afectan al comportamiento se detallan en
          “Personalizar aptitude”.

La interfaz de usuario de aptitude en la terminal

   Esta sección describe las partes que componen la interfaz de usuario de
   aptitude en la terminal no relacionadas con gestionar paquetes.

  Usar los menús.

   La barra de menú en la parte superior de la pantalla contiene las órdenes
   mas importantes de aptitude. Para activar la barra de menú, pulse
   Control+t; ahora puede navegar a través de él seleccionando cualquier
   elemento del menú usando Intro.

   Algunos elementos del menú son accesibles a través de “teclas de acceso
   directo”: números o letras que se pueden emplear para seleccionar la
   entrada mientras el menú está activo. Estos atajos se muestran en un color
   mas claro que el del resto del menú.

   Además, algunos elementos del menú poseen “atajos”: combinaciones de
   teclas que ejecutan la misma acción que la entrada de menú mientras no
   está activo. Dispone de una lista de estos atajos en el lado derecho del
   menú.

   De aquí en adelante, las órdenes de menú se escribirán así:Menú → Entrada
   (tecla). Esto indica que debería escoger la Entrada del Menú menú, y esa
   tecla/s es el atajo para esa orden.

  Órdenes del menú.

    El menú Acciones.

   Figura 2.1. Órdenes disponibles en el menú Acciones.

   +------------------------------------------------------------------------+
   |            Orden            |               Descripción                |
   |-----------------------------+------------------------------------------|
   |                             | Si no hay una previsualización           |
   | Acciones →                  | disponible, muestra una; de no ser así,  |
   | Instalar/eliminar paquetes  | ejecuta un proceso de instalación como   |
   | (g)                         | se describe en “Descargar, instalar y    |
   |                             | eliminar paquetes.”.                     |
   |-----------------------------+------------------------------------------|
   | Acciones → Actualizar la    | Actualiza la lista de paquetes.          |
   | lista de paquetes (u)       |                                          |
   |-----------------------------+------------------------------------------|
   | Acciones → Marcar           | Marca todos los paquetes actualizables,  |
   | actualizable (U)            | excepto aquellos que estén prohibidos o  |
   |                             | bloqueados para su actualización.        |
   |-----------------------------+------------------------------------------|
   | Acciones → Olvidar paquetes | Descarta toda la información referente a |
   | nuevos (f)                  | qué paquetes son “nuevos” (vacía el      |
   |                             | árbol “Paquetes nuevos”).                |
   |-----------------------------+------------------------------------------|
   |                             | Cancela toda instalación, eliminación,   |
   | Acciones → Cancelar         | actualización y retención pendiente. Es  |
   | acciones pendientes         | el equivalente a ejecutar la orden Keep  |
   |                             | sobre cada paquete en la base de datos   |
   |                             | de paquetes.                             |
   |-----------------------------+------------------------------------------|
   | Actions → Limpiar el        | Elimina todos los paquetes comprimidos   |
   | almacén de paquetes         | que aptitude ha descargado ^[a].         |
   |-----------------------------+------------------------------------------|
   |                             | Elimina cualquier paquete comprimido que |
   |                             | aptitude descargó ^[a] y que ya no están |
   | Acciones → Limpiar ficheros | disponibles. Se asume que estos paquetes |
   | obsoletos                   | ya están obsoletos, y se pueden eliminar |
   |                             | del disco duro sin precisar de una       |
   |                             | descarga que por otro lado sería inútil. |
   |-----------------------------+------------------------------------------|
   | Acciones → Jugar al         | Jugar al Buscaminas, como se describe en |
   | buscaminas                  | “Jugar al Buscaminas”.                   |
   |-----------------------------+------------------------------------------|
   | Acciones → Convertirse en   | Continua trabajando como el usuario      |
   | administrador               | root, consulte “Convertirse en root.”.   |
   |-----------------------------+------------------------------------------|
   | Acciones → Salir (Q)        | Cierra aptitude guardando cualquier      |
   |                             | cambio hecho al estado de los paquetes.  |
   |------------------------------------------------------------------------|
   | ^[a] O cualquier otra herramienta de apt.                              |
   +------------------------------------------------------------------------+

    El menú Deshacer

   Figura 2.2. Órdenes disponibles en el menú Deshacer.

   +------------------------------------------------------------------------+
   |        Orden        |                   Descripción                    |
   |---------------------+--------------------------------------------------|
   |                     | Cancela el efecto del ultimo cambio realizado al |
   | Deshacer → Deshacer | estado de un paquete hasta el punto en que       |
   | (Control+u)         | aptitude se inició, la lista de paquetes se ha   |
   |                     | actualizado o en el que un proceso de            |
   |                     | instalación se llevó a cabo.                     |
   +------------------------------------------------------------------------+

    El menú Paquete

   Figura 2.3. Órdenes disponibles en el menú Paquete.

   +------------------------------------------------------------------------+
   |          Orden          |                 Descripción                  |
   |-------------------------+----------------------------------------------|
   | Paquete → Instalar (+)  | Marca el paquete seleccionado para su        |
   |                         | instalación.                                 |
   |-------------------------+----------------------------------------------|
   | Paquete → Eliminar (-)  | Marca el paquete seleccionado para su        |
   |                         | eliminación.                                 |
   |-------------------------+----------------------------------------------|
   | Paquete → Purgar (_)    | Marca el paquete seleccionado para que sea   |
   |                         | purgado.                                     |
   |-------------------------+----------------------------------------------|
   |                         | Cancela toda instalación, actualización o    |
   | Paquete → Mantener (:)  | eliminación pendiente de ejecución sobre el  |
   |                         | paquete seleccionado, y elimina cualquier    |
   |                         | retención impuesta al paquete.               |
   |-------------------------+----------------------------------------------|
   | Paquete → Retener (=)   | Retener el paquete seleccionado.             |
   |-------------------------+----------------------------------------------|
   |                         | Marca al paquete instalado como              |
   | Paquete → Marcar        | “automáticamente instalado”. Para más        |
   | automático (M)          | información, consulte “Gestionar paquetes    |
   |                         | automáticamente instalados.”.                |
   |-------------------------+----------------------------------------------|
   |                         | Marca el paquete seleccionado como           |
   |                         | “manualmente instalado”. Para más            |
   | Paquete → Marcar manual | información referente a paquetes manual y    |
   | (m)                     | automáticamente instalados, consulte         |
   |                         | “Gestionar paquetes automáticamente          |
   |                         | instalados.”.                                |
   |-------------------------+----------------------------------------------|
   |                         | Si se selecciona un paquete susceptible de   |
   | Paquete → Prohibir      | ser actualizado, prohíbe que se actualice a  |
   | versiones (F)           | la versión disponible en el servidor. Si     |
   |                         | selecciona la versión de un paquete, prohíbe |
   |                         | que el paquete se actualice a esa versión.   |
   |-------------------------+----------------------------------------------|
   |                         | Muestra una pantalla que contiene            |
   | Paquete → Información   | información acerca del paquete seleccionado, |
   | (enter)                 | tales como de qué paquetes depende, así como |
   |                         | qué paquetes dependen de él, y las           |
   |                         | diferentes versiones disponibles.            |
   |-------------------------+----------------------------------------------|
   |                         | Cuando explora la lista de paquetes, varía   |
   |                         | la información que puede ver en el área de   |
   |                         | información (la mitad inferior de la         |
   | Paquete → Recorrer      | pantalla). El área de información puede      |
   | información de paquetes | mostrar una larga descripción del paquete    |
   | (i)                     | seleccionado (predeterminado), un resumen de |
   |                         | las dependencias relacionadas con ese        |
   |                         | paquete o un análisis de qué otros paquetes  |
   |                         | requieren o sugieren el paquete              |
   |                         | seleccionado.                                |
   |-------------------------+----------------------------------------------|
   |                         | Muestra el registro de cambios de Debian del |
   | Paquete → Registro de   | paquete seleccionado. Para ver el registro   |
   | cambios (C)             | de cambios de una versión en particular,     |
   |                         | seleccione la versión y ejecute esta orden.  |
   +------------------------------------------------------------------------+

    El menú Solucionador

   Figura 2.4. Órdenes disponibles en el menú Solucionador.

   +------------------------------------------------------------------------+
   |      Orden       |                     Descripción                     |
   |------------------+-----------------------------------------------------|
   | Solucionador →   | Muestra una detallada descripción de la acción      |
   | Examinar         | sugerida por el solucionador (consulte “Resolver    |
   | solución (e)     | dependencias de manera interactiva.”).              |
   |------------------+-----------------------------------------------------|
   | Solucionador →   |                                                     |
   | Aplicar Solución | Realiza las acciones sugeridas por el solucionador. |
   | (!)              |                                                     |
   |------------------+-----------------------------------------------------|
   | Solucionador →   | Selecciona la siguiente sugerencia del              |
   | Solución         | solucionador.                                       |
   | siguiente (.)    |                                                     |
   |------------------+-----------------------------------------------------|
   | Solucionador →   |                                                     |
   | Solución         | Selecciona la anterior sugerencia del solucionador. |
   | anterior (,)     |                                                     |
   |------------------+-----------------------------------------------------|
   | Solucionador →   |                                                     |
   | Primera solución | Selecciona la primera sugerencia del solucionador.  |
   | (<)              |                                                     |
   |------------------+-----------------------------------------------------|
   | Solucionador →   | Selecciona la última solución generada por el       |
   | Última solución  | solucionador (consulte “Resolver dependencias de    |
   | (>)              | manera interactiva.”).                              |
   |------------------+-----------------------------------------------------|
   |                  | Cuando examina una solución, conmuta si rechaza o   |
   | Solucionador →   | no la acción seleccionada, pasando después a la     |
   | Conmutar         | siguiente acción (consulte “Resolver dependencias   |
   | Rechazados (r)   | de manera interactiva.”). Si la acción ya se        |
   |                  | aprobó, queda cancelada.                            |
   |------------------+-----------------------------------------------------|
   |                  | Cuando examina una solución, conmuta si la acción   |
   | Solucionador →   | seleccionada se aprueba o no, y pasa a la siguiente |
   | Conmutar         | acción (consulte “Resolver dependencias de manera   |
   | Aceptada (a)     | interactiva.”). Si la acción ya se rechazó, esta    |
   |                  | queda cancelada.                                    |
   |------------------+-----------------------------------------------------|
   | Solucionador →   | Cuando examina una solución, muestra información    |
   | Ver objetivo     | detallada acerca del paquete afectado por la acción |
   | (enter)          | seleccionada (consulte “Resolver dependencias de    |
   |                  | manera interactiva.”).                              |
   |------------------+-----------------------------------------------------|
   |                  | Rechaza (al igual que con Solucionador → Conmutar   |
   |                  | Rechazados (r)) todas las acciones que rompen una   |
   | Solucionador →   | retención o que instalan una versión prohibida. De  |
   | Rechazar romper  | manera predeterminada, estas acciones se rechazan a |
   | bloqueos         | menos que defina                                    |
   |                  | Aptitude::ProblemResolver::Allow-Break-Holds como   |
   |                  | true.                                               |
   +------------------------------------------------------------------------+

    El menú Buscar

   Figura 2.5. Órdenes disponibles en el menú Buscar.

   +------------------------------------------------------------------------+
   |         Orden          |                  Descripción                  |
   |------------------------+-----------------------------------------------|
   |                        | Busca el siguiente paquete en la lista de     |
   | Buscar → Buscar (/)    | paquetes que coincida con el patrón de        |
   |                        | búsqueda (consulte “Patrones de búsqueda”).   |
   |------------------------+-----------------------------------------------|
   | Buscar → Buscar hacia  | Busca el paquete anterior en la lista de      |
   | atrás (\)              | paquetes que coincida con el patrón de        |
   |                        | búsqueda (consulte “Patrones de búsqueda”).   |
   |------------------------+-----------------------------------------------|
   | Buscar → Buscar otra   | Repite la última búsqueda.                    |
   | vez (n)                |                                               |
   |------------------------+-----------------------------------------------|
   |                        | Repite la última búsqueda, pero en dirección  |
   | Buscar → Buscar de     | opuesta. Si la última orden de búsqueda       |
   | nuevo hacia atrás (N)  | empleada fue «Buscar hacia atrás», esta orden |
   |                        | ejecutaría una búsqueda hacia delante, y      |
   |                        | viceversa.                                    |
   |------------------------+-----------------------------------------------|
   |                        | Filtra la lista de paquetes eliminando        |
   | Buscar → Limitar vista | cualquier paquete que no coincida con el      |
   | (l)                    | patrón de búsqueda (consulte “Patrones de     |
   |                        | búsqueda”).                                   |
   |------------------------+-----------------------------------------------|
   | Buscar → No limitar    | Elimina el filtro de la lista actual de       |
   | vista                  | paquetes (todos los paquetes serán visibles). |
   |------------------------+-----------------------------------------------|
   | Buscar → Buscar Roto   | Busca el siguiente paquete roto. Esto         |
   | (b)                    | equivale a buscar ?broken.                    |
   +------------------------------------------------------------------------+

    El menú Opciones

   Figura 2.6. Órdenes disponibles en el menú Opciones.

   +------------------------------------------------------------------------+
   |        Orden        |                   Descripción                    |
   |---------------------+--------------------------------------------------|
   |                     | Abre una vista de nivel superior en la cual      |
   |                     | puede modificar los parámetros de aptitude. Las  |
   |                     | opciones de configuración se organizan en árbol, |
   | Opciones →          | similar al árbol de paquetes; para activar o     |
   | Preferencias        | desactivar una opción, selecciónela y pulse      |
   |                     | Espacio o Intro. Las opciones de configuración   |
   |                     | se guardan en ~/.aptitude/config en el mismo     |
   |                     | momento de su selección.                         |
   |---------------------+--------------------------------------------------|
   | Opciones → Deshacer | Devuelve todas las opciones a sus valores        |
   | opciones            | predeterminados.                                 |
   +------------------------------------------------------------------------+

    El menú Vistas

   [Nota] Nota
          Para una introducción al funcionamiento de las vistas, consulte
          “Trabajar con varias vistas.”.

   Figura 2.7. Órdenes disponibles en el menú Vistas.

   +------------------------------------------------------------------------+
   |            Orden            |               Descripción                |
   |-----------------------------+------------------------------------------|
   | Vistas → Siguiente (F6)     | Pasa a la siguiente vista activa.        |
   |-----------------------------+------------------------------------------|
   | Vistas → Prev (F7)          | Pasa a la anterior vista activa.         |
   |-----------------------------+------------------------------------------|
   | Vistas → Cierra (q)         | Cierra la vista actual.                  |
   |-----------------------------+------------------------------------------|
   | Vistas → Nueva vista de     | Crea una nueva vista de la lista de      |
   | paquetes                    | paquetes.                                |
   |-----------------------------+------------------------------------------|
   | Vistas → Auditar            | Crea una vista que muestra paquetes no   |
   | Recomendaciones             | instalados, recomendados por algún       |
   |                             | paquete instalado en su sistema.         |
   |-----------------------------+------------------------------------------|
   | Vistas → Nueva vista de     | Crea una nueva vista de paquetes en la   |
   | paquetes plana              | cual los paquetes no están               |
   |                             | categorizados.                           |
   |-----------------------------+------------------------------------------|
   | Vistas → Nuevo navegador    | Crea una nueva vista de paquetes en la   |
   | debtags                     | cual los paquetes están categorizados    |
   |                             | según sus entradas de debtags.           |
   |-----------------------------+------------------------------------------|
   | Vistas → Nuevo navegador de | Muestra la lista de paquetes, agrupados  |
   | categorías                  | por categoría.                           |
   |-----------------------------+------------------------------------------|
   |                             | Pueden aparecer un número de elementos   |
   | Elementos adicionales       | adicionales del menú correspondientes a  |
   |                             | la vista activa actual. Para cambiar a   |
   |                             | otra vista, selecciónela desde el menú.  |
   +------------------------------------------------------------------------+

    El menú Ayuda

   Figura 2.8. Órdenes disponibles en el menú Ayuda.

   +------------------------------------------------------------------------+
   |        Orden        |                   Descripción                    |
   |---------------------+--------------------------------------------------|
   | Ayuda → Acerca de   | Muestra la información de copyright.             |
   |---------------------+--------------------------------------------------|
   | Ayuda → Ayuda (?)   | Muestra la página de ayuda en línea.             |
   |---------------------+--------------------------------------------------|
   | Ayuda → Manual de   | Muestra el Manual de usuario (este documento).   |
   | usuario             |                                                  |
   |---------------------+--------------------------------------------------|
   | Ayuda → PUF         | Muestra el PUF de aptitude .                     |
   |---------------------+--------------------------------------------------|
   | Ayuda → Registro de | Muestra un historial de los cambios más          |
   | cambios             | significativos hechos a aptitude.                |
   |---------------------+--------------------------------------------------|
   | Ayuda → Licencia    | Muestra los términos bajo los cuales puede       |
   |                     | copiar, modificar y distribuir aptitude.         |
   +------------------------------------------------------------------------+

  Trabajar con varias vistas.

   aptitude permite trabajar con varias “vistas” a la vez. Una “vista” (a
   veces llamada “pantalla”) es simplemente algo que puede aparecer en el
   área de la pantalla por debajo de la barra de menú. La vista más común es
   la lista de paquetes, aunque vistas de descargas también son habituales.

   Cuando hay varias vistas abiertas a la vez, aparecerá una barra en la
   parte superior de la pantalla listando todas las vistas. Por ejemplo, si
   examino apt pulsando Intro, y después examino libc6, el resultado sería
   una pantalla parecida a esta:

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
          Paquetes                  apt info                  libc6 info
 aptitude 0.3.1
 i A  --\ libc6                                             2.3.2.ds1- 2.3.2.ds1-
   Descripción: Biblioteca de C de GNU: Bibliotecas compatidas
     Contiene las bibliotecas estándar que utiliza casi cualquier programa en
     el sistema. Esta biblioteca incluye las bibliotecas compartidas de la biblioteca
     estándar de C y de la biblioteca de matemáticas, así como muchas otras bibliotecas.
   Prioridad: requiere
   Sección: base
   Desarrollador: GNU Libc Maintainers <debian-glibc@lists.debian.org>
   Tamaño comprimido: 4901k
   Tamaño sin comprimir: 15.9M
   Paquete fuente: glibc
   --\ Depende
     --- libdb1-compat
   --\ Sugiere
     --- locales
     --- glibc-doc
   --\ Conflicts
 Biblioteca de C de GNU: Bibliotecas compatidas

   Puede cerrar la vista actual usando Vistas → Cierra (q). Para cambiar a la
   vista anterior o a la siguiente, use Vistas → Siguiente (F6) y Vistas →
   Prev (F7), o pulse sobre el nombre de la vista en la parte superior de la
   pantalla; también puede ver una lista de todas las vistas activas en el
   menú Vistas.

   Como se ha visto con anterioridad, algunas órdenes (como por ejemplo,
   visionar información acerca de un paquete) crearán nuevas vistas
   automáticamente; también puede crear una nueva vista usando Vistas → Nueva
   vista de paquetes o Vistas → Nuevo navegador de categorías.

  Convertirse en root.

   Algunas acciones, tales como actualizar la lista de paquetes, tan solo se
   pueden llevar a cabo como superusuario (root). Si no es root e intenta
   actualizar la lista de paquetes, se le preguntará si quiere convertirse en
   root:

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
 aptitude 0.2.14.1
 --- Paquetes instalados
 --- Paquetes no instalados
 --- Paquetes obsoletos y creados localmente
 --- Paquetes virtuales
 --- Tareas

   +-------------------------------------------------------------------------+
   |La actualización de la lista de paquetes disponibles requiere privilegios |
   |de administración, que actualmente no tiene. ¿Desearía cambiar a la |
   |cuenta de administrador?                                                     |
   | [ Convertirse en administrador] [ No convertirse en administrador ]          |
 Th+-------------------------------------------------------------------------+









   Si selecciona “Convertirse en administrador”, aptitude le solicitará la
   contraseña de administrador; una vez que la haya introducido aptitude
   realizará la acción que requiere privilegios de root. Aun será root
   después de que la acción finalice.

   Puede identificarse como root en cualquier momento usando la orden
   Acciones → Convertirse en administrador. Cualquier cambio realizado al
   estado de los paquetes será preservado (pero no se guardarán hasta que
   quite aptitude).

   De manera predeterminada, aptitude utilizará la orden su para obtener
   privilegios de usuario root. Si desea usar otra orden, (como por ejemplo
   sudo), defina la opción de configuración Aptitude::Get-Root-Command.

Gestionar paquetes.

   Esta sección describe como manipular la lista de paquetes, como instalar
   paquetes nuevos en el sistema y como eliminar paquetes viejos.

  Gestionar la lista de paquetes.

   Es recomendable actualizar periódicamente la lista de paquetes para
   mantenerla al día. Puede hacer esto usando la orden Acciones → Actualizar
   la lista de paquetes (u).

  Acceso a la información de los paquetes.

   La información relativa a los paquetes se presenta en diferentes áreas en
   aptitude: la lista de paquetes ofrece una lista preliminar del estado de
   cada paquete; también hay vistas adicionales que proporcionan información
   detallada acerca de un paquete.

    La lista de paquetes

   La lista de paquetes muestra una sinopsis “superficial” del estado de un
   paquete. Por ejemplo, el paquete webmin podría mostrar una sinopsis
   cercana a ésta:

 piAU  webmin                                        +5837kB <none>     1.160-2

   Los cuatro caracteres en el lado izquierdo de la sinopsis muestran que el
   paquete no está instalado (“p”), que va a ser instalado (“i”), que ha sido
   automáticamente seleccionado para su instalación (“A”), y también que no
   va firmado (“U”). Puede ver en el lado derecho de la sinopsis la versión
   actualmente instalada y la última versión disponible, así como una
   indicación de cuanto espacio se va a usar al actualizar el paquete.

   [Sugerencia] Sugerencia
                Puede configurar cómo se muestran las sinopsis de los
                paquetes; consulte “Personalizar la presentación de los
                paquetes” para más detalles.

   Las cuatro marcas (caracteres) en el lado izquierdo de la pantalla ofrecen
   información básica acerca del estado de un paquete. El primer carácter es
   el estado actual. El segundo carácter simboliza la acción que se ejecutará
   sobre el paquete. El tercer carácter indica si el paquete ha sido
   automáticamente instalado (consulte “Gestionar paquetes automáticamente
   instalados.”), y el cuarto carácter indica si el paquete está firmado
   (consulte “Llaves GPG: Entender y gestionar la confianza de los
   paquetes.”).

   Los cuatro posibles valores de la marca de “estado actual” se tratan en
   Figura 2.9, “Valores de la marca de “estado actual””, y los posibles
   valores de “acción” se tratan en Figura 2.10, “Valores de la marca de
   “acción””.

   Figura 2.9. Valores de la marca de “estado actual”

   i - el paquete está instalado y todas sus dependencias satisfechas.
   c - el paquete se eliminó, pero sus ficheros de configuración siguen
       presentes.
   p - el paquete y todos sus ficheros de configuración se eliminaron, o el
       paquete nunca se instaló.
   v - el paquete es virtual.
   B - el paquete tiene dependencias rotas.
   u - el paquete se ha desempaquetado, pero no configurado.
   C - medio-configurado: la configuración del paquete se interrumpió.
   H - medio-instalado: la instalación del paquete se interrumpió.

   Figura 2.10. Valores de la marca de “acción”

   i - el paquete se va a instala.
   u - el paquete se va a actualizar.
   d - el paquete se va a eliminar: se desinstalará, pero sus ficheros de
       configuración permanecerán en el sistema.
   p - el paquete se va a purgar; se eliminarán él y sus ficheros de
       configuración.
   h - el paquete se va a retener: permanecerá en su versión actual, aunque
       haya una nueva versión disponible, hasta que se cancele la retención .
   F - Se prohibió la actualización del paquete.
   r - el paquete se va a reinstalar.
       el paquete está “roto”: algunas de sus dependencias no serán
   B - satisfechas. aptitude no le permitirá instalar, eliminar o actualizar
       nada mientras tenga paquetes rotos.

   Además, aptitude usará colores para indicar el estado de los paquetes si
   su terminal lo permite. Las distinciones relativas al estado se muestran
   usando el color de fondo:

   Negro

           El paquete no se puede actualizar (o no se va a instalar), y no
           tiene problemas de dependencias. Si se instala el paquete, su
           nombre aparecerá resaltado.

   Verde

           El paquete se va instalar.

   Azul

           El paquete está instalado, y se va a actualizar.

   Magenta

           El paquete está instalado, pero se va a eliminar.

   Blanco

           El paquete está instalado, y “retenido” en su versión actual: las
           actualizaciones automáticas ignorarán este paquete.

   Rojo

           Este paquete esta roto: algunas de sus dependencias no serán
           satisfechas.

   Por último, la mitad inferior de la pantalla muestra la descripción
   completa. aptitude intentará detectar si el paquete está envuelto en un
   problema de dependencias; de ser así se mostraría aquí información
   referente al problema de dependencias. Para pasar de la información de
   dependencias a la descripción del paquete, pulse i.

    Información detallada del paquete

   Si pulsa Intro mientras resalta un paquete verá la siguiente pantalla
   informativa:

   Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
 aptitude 0.2.14.1
 i A --\ apt                                                0.5.25     0.5.25
   Descripción: Interfaz avanzada para dpkg
     Esta es la interfaz de nueva generación de Debian para el gestor de paquetes.
     Proporciona la herramienta apt-get y ún metodo dselect que ofrece una manera más
     simple y segura de instalar y actualizar paquetes

     APT permite hacer ordenación de la instalación, acceder a múltiples fuentes
     y también otras funcionalidades únicas. Para más información consulte
     la Guía del Usuario en el paquete apt-doc
   Esencial: sí
   Prioridad: importante
   Sección: base
   Desarrollador: APT Development Team <deity@lists.debian.org>
   Tamaño comprimido: 970k
   Tamaño sin comprimir: 2961k
   Paquete fuente: apt
   --\ Depende
     --- libc6 (>= 2.3.2.ds1-4)
     --- libgcc1 (>= 1:3.3.3-1)
     --- libstdc++5 (>= 1:3.3.3-1)
   --\ Sugiere
     --- aptitude | synaptic | gnome-apt | wajig
     --- dpkg-dev
     --\ apt-doc (INSATISFECHO)
 p     0.6.25
 p     0.5.25
   --\ Reemplaza
     --- libapt-pkg-doc (< 0.3.7)
     --- libapt-pkg-dev (< 0.3.7)
   --- Nombres del paquete proporcionado por apt
   --- Paquetes que dependen de apt
   --\ Versiones
 p A 0.6.25
 i A 0.5.25


   Puede moverse por esta pantalla de una manera similar a la lista de
   paquetes: por ejemplo, en la captura de pantalla superior, expandí la
   dependencia de apt-doc mostrando las versiones disponibles de apt-doc que
   pueden satisfacer la dependencia. Estas versiones se pueden manipular de
   la misma manera que un paquete: por ejemplo, para instalar la versión
   0.5.25 de apt-doc, debería resaltarlo y pulsar +.

   [Sugerencia] Sugerencia
                Para satisfacer rápidamente una dependencia, seleccione la
                dependencia y presione +; aptitude intentará satisfacerlas
                automáticamente por usted.

   Además de las dependencias de un paquete, también puede ver los nombres de
   paquetes que «Provee», los paquetes sobre los que «Depende», y las
   versiones disponibles del paquete (incluyendo cualquier paquete que lo
   «Provea»).

   Como es normal, puede cerrar esta pantalla y volver a la vista principal
   pulsando q. Para su conveniencia, dispone de otras pantallas informativas
   (que sólo muestran la información más usada, ocultando el resto): pulse v
   para ver las versiones de un paquete, d para ver las dependencias de un
   paquete, y r para ver las dependencias inversas de un paquete (paquetes
   que dependen de él).

  Modificar los estados de los paquete.

   Dispone de las siguientes órdenes para modificar el estado de los
   paquetes. Las órdenes se ejecutarán la siguiente vez que realice un
   proceso de instalación; hasta entonces, puede revertir estas órdenes con
   Deshacer → Deshacer (Control+u).

   Para aplicar una orden a un paquete, simplemente seleccione el paquete en
   la lista de paquetes y ejecute la orden. Estas órdenes se pueden aplicar
   también a grupos de paquetes, seleccionando la cabecera del grupo (por
   ejemplo, “Paquetes actualizables”), y ejecutando la orden.

   +------------------------------------------------------------------------+
   |           Orden           |                Descripción                 |
   |---------------------------+--------------------------------------------|
   |                           | Marcar el paquete para su instalación.     |
   |                           |                                            |
   | Instalar: Paquete →       | Si el paquete no está instalado, se        |
   | Instalar (+)              | instalará. Si ya lo está, se actualizará,  |
   |                           | de ser posible, y cualquier retención en   |
   |                           | efecto se cancelará.                       |
   |---------------------------+--------------------------------------------|
   |                           | Marcar el paquete seleccionado para su     |
   | Eliminar: Paquete →       | eliminación.                               |
   | Eliminar (-)              |                                            |
   |                           | Si el paquete está instalado, se           |
   |                           | eliminará.                                 |
   |---------------------------+--------------------------------------------|
   |                           | Marcar el paquete para ser purgado         |
   |                           |                                            |
   |                           | Si el paquete esta instalado, se           |
   | Purgar: Paquete → Purgar  | eliminará. Mas aún, aunque se elimine,     |
   | (_)                       | cualquier fichero resultante (tales como   |
   |                           | los ficheros de configuración)             |
   |                           | relacionados con el paquete también se     |
   |                           | eliminarán del sistema.                    |
   |---------------------------+--------------------------------------------|
   |                           | Marcar el paquete para que se mantenga en  |
   |                           | su versión actual.                         |
   |                           |                                            |
   | Mantener: Paquete →       | Cualquier acción que se fuese a llevar a   |
   | Mantener (:)              | cabo sobre el paquete -- instalación,      |
   |                           | eliminación o actualización -- se cancela, |
   |                           | y cualquier retención impuesta al paquete  |
   |                           | se elimina.                                |
   |---------------------------+--------------------------------------------|
   |                           | Imponer una retención al paquete.          |
   |                           |                                            |
   |                           | Al igual que con «Mantener», se cancela    |
   | Retener: Paquete →        | cualquier acción programada para el        |
   | Retener (=)               | paquete. Además, el paquete no se          |
   |                           | actualizará automáticamente ^[a] hasta que |
   |                           | elimine esta acción. Puede cancelar        |
   |                           | «Mantener» ejecutando la siguiente orden.  |
   |---------------------------+--------------------------------------------|
   |                           | El paquete no se actualizará               |
   |                           | automáticamente ^[a] a la versión a la que |
   |                           | lo iba a ser. Si se iba a actualizar, la   |
   |                           | actualización se cancela.                  |
   |                           |                                            |
   |                           | Si ejecuta esta orden sobre una versión en |
   |                           | particular de un paquete, el paquete no se |
   | Paquete → Prohibir        | actualizará a la versión escogida. Observe |
   | versiones (F)             | que sólo puede prohibir una versión al     |
   |                           | mismo tiempo.                              |
   |                           |                                            |
   |                           | Esta funcionalidad se ha implementado en   |
   |                           | gran medida para la conveniencia de la     |
   |                           | distribución “unstable (sid)”, para que    |
   |                           | así se puedan evitar versiones de          |
   |                           | programas ya conocidas como malas.         |
   |---------------------------+--------------------------------------------|
   |                           | Reinstalar el paquete.                     |
   |                           |                                            |
   |                           | Tenga en cuenta que la reinstalación no se |
   |                           | guardará cuando salga de aptitude o        |
   | Reinstalar: pulse L       | ejecute un proceso de instalación, por     |
   |                           | razones técnicas (básicamente, las capas   |
   |                           | de software subyacentes, dpkg y apt no     |
   |                           | proporcionan ninguna manera de ver si una  |
   |                           | reinstalación ha tenido éxito o no).       |
   |---------------------------+--------------------------------------------|
   |                           | Define si un paquete se toma como          |
   |                           | automáticamente instalado; los paquetes    |
   | Paquete → Marcar          | automáticamente instalados se eliminarán   |
   | automático (M), Paquete → | cuando ningún otro paquete dependa de      |
   | Marcar manual (m)         | ellos. Para más información, consulte      |
   |                           | “Gestionar paquetes automáticamente        |
   |                           | instalados.”.                              |
   |------------------------------------------------------------------------|
   | ^[a] Ésto es, que no se verá afectado por Acciones → Marcar            |
   | actualizable (U) o por las órdenes en línea de órdenes full-upgrade o  |
   | safe-upgrade                                                           |
   +------------------------------------------------------------------------+

   Además de estas órdenes que afectan al paquete seleccionado, hay dos
   órdenes que afectan a un gran número de paquetes en una sola acción
   independientemente de lo que haya seleccionado. Acciones → Olvidar
   paquetes nuevos (f) elimina el estado “nuevo” de todos los paquetes de la
   lista de paquetes, y Acciones → Marcar actualizable (U) marca todos los
   paquetes actualizables para su actualización, excepto aquellos que están
   retenidos o prohibidos de actualización.

   [Nota] Nota
          Todos los cambios efectuados al estado de los paquetes se guardan
          cuando cierre aptitude, actualice la lista de paquetes o realice un
          proceso de instalación. Si no desea guardar los cambios, siempre
          puede interrumpir aptitude pulsando Ctrl-C.

  Descargar, instalar y eliminar paquetes.

   Cambiar el estado de los paquetes como se describe en la sección anterior
   no afecta de manera directa a lo que está instalado en el sistema. Por
   ello, puede ajustar el estado de los paquetes sin afectar al sistema hasta
   que esté satisfecho con lo que ve; una vez que lo esté, puede “confirmar”
   los cambios de verdad, instalando y eliminando paquetes.^[8]

   Para confirmar los cambios, use la orden Acciones → Instalar/eliminar
   paquetes (g). Seleccionar esta orden muestra una previsualización que
   describe los cambios que se llevarán a cabo. Esta imagen es una simple
   lista de paquetes por lo que puede manipular los paquetes (por ejemplo,
   cancelando eliminaciones no deseadas) de la misma manera en que lo puede
   hacer en el lista principal.

   Una vez que haya finalizado, use Vistas → Cierra (q) para cancelar la
   instalación, o use Acciones → Instalar/eliminar paquetes (g) para proceder
   con las selecciones. aptitude descargará en ese momento cualquier paquete
   necesario para después continuar con la instalación.

   Los paquetes descargados por aptitude se guardan en el directorio almacén
   (por omisión /var/cache/apt/archives). Normalmente, los paquetes son
   guardados ad infinitum. Para eliminar todos los ficheros de este
   directorio, use Actions → Limpiar el almacén de paquetes; para eliminar
   sólo aquellos paquetes que ya no se pueden descargar (p. ej., paquetes
   obsoletos), use Acciones → Limpiar ficheros obsoletos.

  Llaves GPG: Entender y gestionar la confianza de los paquetes.

   La habilidad de apt de acceder a múltiples fuentes de paquetes conduce a
   una potencial vulnerabilidad de seguridad. Supongamos que intenta añadir
   un archivo de paquetes de José Hacker Aleatorio a su fichero sources.list
   para poder instalar el paquete gargleblast de Pepe. Por otro lado, es
   posible que (fuera de su conocimiento) el archivo de Pepe contenga
   versiones de paquetes como libc6 y ssh...¡versiones que roban su
   información privada o que abren puertas traseras en el sistema! Si estos
   paquetes tuviesen unos números de versión más elevados que los que se
   encuentran el archivo de Debian, apt los instalaría sin dudar en la
   siguiente actualización, permitiendo a Pepe realizar su sucia labor sin
   ser detectado. Pepe podría incluso entrar en los servidores réplica de
   Debian y reemplazar el software legítimo con su versión medicada.

   Afortunadamente, las versiones más recientes de apt y de aptitude, tales
   como la versión documentada en este manual, tienen defensas incorporadas
   para repeler este tipo de ataques. apt utiliza unos fuertes mecanismos de
   seguridad basados en el conocido software de cifrado GPG para verificar
   que los paquetes distribuidos por los servidores réplica de Debian son los
   mismos que los que subieron desarrolladores de Debian. De esta manera,
   aptitude le avisará si intenta instalar un paquete desde una fuente que no
   pertenece a Debian, o si intenta actualizar un paquete de Debian a una
   versión que viene de una fuente que no es de Debian.

   [Aviso] Aviso
           Los mecanismos de seguridad de apt proporcionan una garantía casi
           perfecta de que los contenidos de su servidor réplica son
           idénticos o los del servidor central de Debian. Aun así, no son
           perfectos. Teóricamente, hay varias maneras en las que un paquete
           modificado se pueda introducir en el archivo central de Debian.

           Asegurando que solo pueda instalar desde una fuente firmada le
           dará un alto grado de protección frente a los paquetes maliciosos,
           pero no puede eliminar todos los riesgos inherentes a instalar
           software.

    Entender la confianza

   apt permite al administrador de un archivo dotar de una firma al índice
   del archivo. Esta firma, que (por razones prácticas) no se puede
   falsificar, indica que los ficheros de paquete listados en el índice son
   los mismos que el administrador puso en el archivo en primer lugar: p.
   ej., que los contenidos de un paquete no se han manipulado desde su
   creación.^[9] La firma se puede validar cerciorándose de que se
   corresponde con la llave pública del administrador. La llave pública del
   archivo de Debian se distribuye con apt, generalmente a través de su CD de
   Debian.

   Cuando aptitude descarga el índice de un archivo, comprobará si el índice
   está apropiadamente firmado. Si no está firmado aptitude no confiara en
   los paquetes provenientes de ese archivo (más adelante se explicará lo que
   esto significa). Si tiene una firma pero es incorrecta o no se puede
   verificar, verá un aviso y aptitude se negará a confiar en paquetes
   procedentes de ese archivo.

   Más adelante, cuando lleve a cabo un proceso de instalación, aptitude
   revisara si los paquetes son de una fuente firmada. Entonces verá un
   mensaje de aviso si se va a instalar un paquete sin firmar, o si un
   paquete se actualizará de una versión firmada a otra que no lo es, dándole
   la oportunidad de interrumpir la instalación.

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
 aptitude 0.3.0         Se usará 831kB de espacio del disco   TamDesc:: 30.4MB
 --\ Paquetes a actualizar
 iu U wesnoth                                       -98.3kB 0.8.7-1    0.8.8-1.0w
 iuAU wesnoth-data                                  +930kB  0.8.7-1    0.8.8-1.0w
 +------------------------------------------------------------------------------+
 |AVISO: ¡se instalarán versiones sin firmar de los siguientes paquetes!     #|
 |                                                                             #|
 |Los paquetes sin firmar pueden comprometer la seguridad del sistema. #|
 |Sólo debe continuar la instalación si está seguro de que es lo que quiere.  #|
 |                                                                             #|
 |                                                                             #|
 |  * wesnoth [version 0.8.8-1.0wesnoth.org]                                   #|
 |  * wesnoth-data [version 0.8.8-1.0wesnoth.org]                              #|
 |  * wesnoth-music [version 0.8.8-1.0wesnoth.org]                             #|
 |         [ Continúa de todas formas ]                [ Aborta la instalación ]          |
 +------------------------------------------------------------------------------+
                                                                                #
                                                                                #
                                                                                #
                                                                                #
                                                                                #
                                                                                #

    Confiar en llaves adicionales

   Puede encontrar útil que apt confié en archivos externos aparte de los
   ficheros de Debian. Para cada paquete en el que quiera confiar, tendrá que
   adquirir la llave pública que se utiliza para firmar el índice del archivo
   de paquetes. Éste es por lo general un fichero de texto cuyo nombre
   finaliza en .asc; puede ser suministrado por el administrador del sitio
   web o descargado desde un servidor de llaves públicas. Para más
   información acerca de llaves públicas y de como conseguirlas, consulte la
   página web de GPG.

   La lista de llaves en las que apt confía se guarda en el fichero del
   anillo de llaves /etc/apt/trusted.gpg. Una vez que tenga la llave GPG,
   puede añadirla a este archivo ejecutando esta orden, gpg
   --no-default-keyring --keyring /etc/apt/trusted.gpg --import
   nueva_llave.asc. aptitude confiará entonces en cualquier archivo firmado
   con la llave contenida en nueva_llave.asc.

   [Aviso] Aviso
           Una vez que se añade un archivo de una llave al anillo de llaves
           de APT, !se le otorgara la misma confianza que a los propios
           servidores réplica de Debian¡ Haga esto sólo si está muy seguro de
           que la llave que está añadiendo es la correcta y si la persona que
           posee la llave es competente y de toda confianza.

  Gestionar paquetes automáticamente instalados.

   Para instalar un paquete es a veces necesario instalar muchos otros (para
   satisfacer sus dependencias). Por ejemplo, si desea instalar el paquete
   clanbomber, debe también instalar el paquete libclanlib2. Si elimina
   clanbomber, probablemente no necesite más libclanlib2; aptitude intentará
   detectar esto y eliminar el paquete libclanlib2.

   Funciona de la siguiente manera: cuando instala un paquete, aptitude
   instalará automáticamente cualquier otro paquete sobre el cual éste
   dependa. Estos paquetes se marcan como “automáticamente instalados”;
   aptitude los registrará y eliminará cuando ya no sean dependencia de
   cualquier paquete manualmente instalado ^[10] . Aparecerán en la
   previsualización como “paquetes que se eliminarán porque ya no se usan.”

   Al igual que con cualquier proceso automático, hay posibilidades de que
   las cosas se compliquen. Por ejemplo, aunque de inicio un paquete se
   instaló automáticamente, puede resultar útil por si mismo. Puede cancelar
   la marca de “automático” en cualquier momento pulsando m; si ya se eliminó
   el paquete, puede usar Paquete → Instalar (+) para cancelar la eliminación
   y borrar la marca de “automático”.

Resolver las dependencias de los paquetes

  Resolución de dependencias de aptitude.

   Hay dos algoritmos principales en la resolución de dependencias de
   aptitude

   El primero es un algoritmo que se emplea también en programas tales como
   apt-get y synaptic; Me referiré a el como “resolución inmediata”. Se
   invoca cuando marca un paquete para su instalación de forma interactiva, e
   inmediatamente después de que uno o más paquetes son marcados en la línea
   de órdenes. La resolución inmediata es rápida y solucionará la mayoría de
   problemas de dependencias, aunque a veces no pueda encontrar ninguna.

   El segundo algoritmo, que llamaré “resolución interactiva”, se invoca
   cuando hay paquetes con dependencias rotas incluso después de la
   resolución inmediata^[11]. Puede resolver más dependencias, le permite
   previsualizar la solución antes de aplicarla, y le permitiría también
   introducir respuestas al solucionador, para así guiarle a una solución más
   adecuada.

  Resolución inmediata de dependencias.

   En el momento que elija instalar o actualizar un paquete, aptitude hará un
   intento inmediato de resolver cualquier dependencia no satisfecha. Por
   cada dependencia insatisfecha (sea un “Depende”, “Recomienda”, o con un
   “Conflicto”), realizará los siguientes pasos:

    1. Si la dependencia es una recomendación, aptitude intentará ver si es
       una recomendación “nueva” o una “recomendación” ya “satisfecha”.
       aptitude considera una recomendación como “nueva” si el paquete
       manifestando la recomendación no está instalado, o si la versión
       instalada no recomienda un paquete del mismo nombre. Por otro lado,
       una recomendación está “satisfecha” si el paquete ya instalado
       recomienda un paquete del mismo nombre, estando ya satisfecho.

       Por ejemplo: imagine que la versión 1.0 de prog recomienda la versión
       4.0 de libcool1, pero la versión 2.0 de prog recomienda la versión 5.0
       de libcool1, y también recomienda apache. Si escogiese actualizar prog
       de la versión 1.0 a la versión 2.0, la recomendación de apache se
       considerará “nueva” porque la versión 1.0 de prog no recomendaba
       apache. Por otro lado, la recomendación de libcool1 no es “nueva”,
       porque la versión1.0 de prog recomienda libcool1, aunque recomiende
       una versión diferente. De todas formas, si libcool1 está instalado,
       entonces la recomendación se tratará como “ya satisfecha”.

       Si la opción de configuración Apt::Install-Recommends es true,
       aptitude siempre intentará satisfacer las recomendaciones nuevas y ya
       satisfechas; todas las demás se ignorarán en la siguiente resolución.
       Si la opción es false, la resolución inmediata de dependencias
       ignorará todas las recomendaciones.

    2. Si la dependencia se da en varios paquetes en combinación con «OR»,
       examine cada una de las alternativas en el orden dado. Por ejemplo, si
       un paquete depende de “exim | mail-transport-agent”, aptitude
       procesará primero exim, y después mail-transport-agent.

    3. Intente resolver cada alternativa dada. Si la dependencia es un
       conflicto, elimine la alternativa actual si ya está instalada (y por
       cada conflicto no de versiones, elimine también cualquier paquete que
       provoca el núcleo del conflicto). También puede instalar la versión
       candidata de la alternativa actual si satisface la dependencia. Si no,
       o si no hay otra versión candidata (p. ej., porque la alternativa
       actual es un paquete virtual), y si la dependencia no tiene versión,
       intente instalar el paquete de más alta prioridad^[12] cuya versión
       candidata provea el objetivo de la alternativa actual.

       Por ejemplo, imagine que estamos intentando resolver “Depende: exim |
       mail-transport-agent”. En primer lugar, aptitude intentará instalar el
       paquete exim. Si exim no está disponible, aptitude intentará entonces
       instalar el paquete con la prioridad más alta cuya versión candidata
       provee exim. Si no encuentra tal paquete, aptitude instalará el
       paquete con la prioridad más alta cuya versión candidata provee el
       paquete virtual mail-transport-agent. Por otro lado, imagine que la
       dependencia es “Depende: exim (>= 2.0.0) | mail-transport-agent”, pero
       cuya única versión de exim disponible es 1.0. En este caso, aptitude
       no instalará exim (porque la versión no corresponde a la dependencia),
       ni intentará instalar paquetes que provean exim (porque los paquetes
       virtuales no pueden satisfacer una dependencia con una restricción en
       cuanto a la versión). Por ello, aptitude le instalaría el paquete con
       la prioridad más alta cuya versión candidata provea
       mail-transport-agent.

    4. Si el paquete se instaló siguiendo el paso anterior, resuelve sus
       dependencias empleando este algoritmo, y finaliza entonces.

   Mientras que esta técnica resuelve a menudo las dependencias más notorias,
   también puede fallar bajo ciertas circunstancias.

     o La manera de resolver un conflicto es desinstalando el paquete que es
       el núcleo del conflicto, dejando otros paquetes que dependen de él con
       dependencias no resueltas; el solucionador inmediato no realiza
       ninguna acción para arreglarlo.

     o Puede que nunca se satisfaga una dependencia por razones de
       restricciones de versiones y debido a la limitación de que se
       consideran solo las versiones candidatas. Por ejemplo, imagine que las
       versiones 1.0 y 2.0 de fileutils están disponibles, que la versión
       candidata es 1.0 y que el paquete octopus declara una dependencia
       “Depende: fileutils (>= 2.0)”. El solucionador inmediato es incapaz de
       resolver esta dependencia pues nunca considerará la versión 2.0 del
       mismo paquete puesto que no es la versión candidata.

   El solucionador de dependencias interactivo puede solucionar estos
   problemas y más. Cuando quedan atrás dependencias rotas, o cuando se
   desactiva el solucionador de dependencias inmediato, el solucionador
   interactivo buscará automáticamente una solución. La siguiente sección
   muestra cómo usar el solucionador interactivo de dependencias.

  Resolver dependencias de manera interactiva.

   aptitude le asistirá a la hora de resolver si surge un problema de
   dependencias que el solucionador inmediato no puede resolver. Una barra
   roja aparecerá en la base de la pantalla en el momento en que aparezca un
   problema mostrando un resumen de la sugerencia de aptitude acerca del modo
   de solucionar el problema. Por ejemplo, en la siguiente imagen aptitude
   indica que puede solucionar el problema manteniendo dos paquetes en sus
   versiones presentes.

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
 aptitude 0.3.3       #Roto: 1   Se liberará 48.6MB de espacio del TamDesc
 i A   nautilus                                             2.10.1-4   2.10.1-4
 i     nautilus-cd-burner                                   2.10.2-1.1 2.10.2-1.1
 i A   nautilus-data                                        2.10.1-4   2.10.1-4
 i     netspeed                                             0.12.1-1   0.12.1-1
 i A   oaf                                                  0.6.10-3   0.6.10-3
 i     pybliographer                                        1.2.6.2-1  1.2.6.2-1
 i     rhythmbox                                            0.8.8-13   0.8.8-13
 i     shermans-aquarium                                    3.0.1-1    3.0.1-1
 idA   sound-juicer                                 -1733kB 2.10.1-3   2.10.1-3
 GNOME 2 CD Ripper
 sound-juicer se eliminará.


 Los siguientes dependen de sound-juicer y se romperán debido a su eliminación:


   * gnome-desktop-environment depende de sound-juicer

 [1(1)/...] Sugiere 1 instalación
 e: Examinar  !: Aplicar  .: Siguiente  ,: Anterior

   Como se indica en la base de la pantalla, puede ver soluciones adicionales
   si pulsa . y ,, aplicar la solución en pantalla pulsando !, y examinar la
   solución más detenidamente pulsando e. Ud. vería una pantalla similar a la
   siguiente si examinase este mismo problema.

   Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
                 Paquetes                          Resolver las dependencias
   --\ Mantener los paquetes siguientes en la versión actual:
     gstreamer0.8-cdparanoia                           [0.8.10-1 (unstable, now)]
     sound-juicer                                                [2.10.1-2 (now)]
















 [1(1)/...] Sugiere 2 mantenidos
 e: Examinar  !: Aplicar  .: Siguiente  ,: Anterior

   Puede acceder a la información del paquete afectado pulsando Intro
   mientras el paquete está seleccionado. Para una explicación más detallada
   acerca de una decisión en particular de aptitude, puede resaltar el
   elemento en lista. Cuando lo haga, la mitad inferior de la pantalla
   mostrará la dependencia solucionada por la elección de aptitude, así como
   cada manera en que se pudo resolver la dependencia.

   Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
                 Paquetes                        Resolver dependencias
   --\ Mantener los paquetes siguientes en la versión actual:
     gstreamer0.8-cdparanoia                           [0.8.11-1 (unstable, now)]
     sound-juicer                                      [2.10.1-3 (unstable, now)]






 cdparanoia plugin for GStreamer
 sound-juicer depende de   gstreamer0.8-cdparanoia
 --\ Las acciones siguientes resolverán estas dependencias:
   -> Descatualizar sound-juicer [2.10.1-3 (unstable, now) -> 0.6.1-2 (testing)]
   -> Eliminar sound-juicer [2.10.1-3 (unstable, now)]
   -> Cancelar la eliminación de gstreamer0.8-cdparanoia
   -> Descatualizar gstreamer0.8-cdparanoia [0.8.11-1 (unstable, now) -> 0.8.8-3 (tes



 [1(1)/...] Sugiere 2 mantenidos
 e: Examinar  !: Aplicar  .: Siguiente  ,: Anterior

   Puede guiar al solucionador de dependencias a una solución que usted crea
   conveniente aprobando o rechazando las diferentes acciones de una
   solución. Si aprueba una acción, el solucionador la tomará siempre que sea
   posible, ignorando otras alternativas (cuando hay más de una acción
   aprobada entre las alternativas, cualquiera se puede seleccionar). Por
   otro lado, si rechaza una acción el solucionador nunca la elegirá en el
   caso de que se presente.

   Para rechazar una acción, seleccione la misma y pulse r; el rechazo se
   puede cancelar pulsando r otra vez. De manera parecida, seleccione una
   acción y pulse a para aprobarla; pulse a otra vez para devolverla a su
   estado original. Puede deshacer esta acción empleando Deshacer → Deshacer
   (Control+u) a la vez que la pantalla del solucionador está activa. Si
   cancela un rechazo o una desinstalación, cualquier solución que se ignoró
   estará disponible la siguiente vez que genere una solución nueva.

   [Nota] Nota
          Por omisión el solucionador rechaza acciones que puedan cambiar el
          estado de paquetes retenidos, o que instalan versiones prohibidas
          de ciertos paquetes. Puede invalidar estos rechazos, y por ello
          anular el estado configurado, de la misma forma que puede invalidar
          cualquier otro rechazo. Si configura la opción
          Aptitude::ProblemResolver::Allow-Break-Holds como true desactivaría
          estas acciones, lo cual quiere decir que el solucionador siempre
          romperá retenciones (aunque con una penalización, consulte
          Aptitude::ProblemResolver::BreakHoldScore).

   Las acciones rechazadas se muestran de color rojo y marcadas con una “R”,
   mientras que las acciones aprobadas son verdes y se marcan con una “A”.
   Puede ver esto en la siguiente imagen, donde la acción “mantener
   gstreamer0.8-cdparanoia en su versión presente” se ha rechazado, y que la
   acción “mantener sound-juicer en su versión presente” se aprobó.

   Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
                 Paquetes                         Resolver dependencias
   --\ Mantener los paquetes siguientes en la versión actual:
 R   gstreamer0.8-cdparanoia                           [0.8.11-1 (unstable, now)]
 A   sound-juicer                                      [2.10.1-3 (unstable, now)]
















 [1(1)/...] Sugiere 2 mantenidos
 e: Examinar  !: Aplicar  .: Siguiente  ,: Anterior

   Las aprobaciones o rechazos solo afectan a las soluciones generadas
   recientemente. Puede ver cuando se ha generado una solución nueva
   examinando el indicador en la esquina inferior izquierda de la pantalla:
   si hay un número entre paréntesis, muestra el número de soluciones
   generadas. Siendo esto así, cuando el numero que se encuentra frente al
   paréntesis y el que está dentro son idénticos (como aparece arriba),
   pulsar «.» genera una nueva solución. Si no hay ningún número entre
   paréntesis, (por ejemplo, si el indicador muestra [1/5]), entonces no
   quedan más soluciones por generar. En cualquier momento, puede seleccionar
   la última solución generada pulsando >, o < para ver la primera solución
   generada.

   [Importante] Importante
                El estado del solucionador de problemas cambia cuando
                modifica el estado de cualquier paquete. Si marca un paquete
                para instalar, actualizar o eliminar, etc... el solucionador
                desecha todos los rechazos y aprobaciones, así como las
                soluciones que haya generado hasta el momento.

   Además de las acciones que puede seleccionar de la lista en la parte
   superior de la pantalla, también puede seleccionarlas usando la lista en
   la parte inferior de la pantalla. Para acceder a ella use el ratón o pulse
   Tab. Por último, para ver las decisiones que el solucionador tomó por
   orden, pulse o. Esto dará un lista de las dependencias que se resolvieron
   y la acción tomada para ello, como puede ver en la siguiente captura de
   pantalla.

   Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
                 Paquetes                         Resolver dependencias
   --\ gnome-desktop-environment depende de sound-juicer
     -> Cancelar la eliminación de sound-juicer
   --\ sound-juicer depende de gstreamer0.8-cdparanoia
     -> Cancelar la eliminación de gstreamer0.8-cdparanoia





 GNOME 2 CD Ripper
 gnome-desktop-environment depende de sound-juicer
 --\ Las acciones siguientes resolverán estas dependencias:
   -> Eliminar gnome-desktop-environment [1:2.10.2.3 (unstable, testing, now)]
   -> Cancelar la eliminación de sound-juicer
   -> Desactualizar sound-juicer [2.10.1-3 (unstable, now) -> 0.6.1-2 (testing)]




 [1(1)/...] Sugiere 2 mantenidos
 e: Examinar  !: Aplicar  .: Siguiente  ,: Anterior

   Puede abandonar esta vista pulsando o otra vez.

  Costes en el solucionador interactivo de dependencias.

    Costes y componentes del coste

   El coste de una solución producida por el solucionador interactivo de
   dependencias es un valor que aptitude utiliza para determinar cuán “mala”
   es una solución. Las “mejores” soluciones siempre aparecen antes de las
   “peores” soluciones. El coste de las soluciones se definen con la opción
   de configuración Aptitude::ProblemResolver::SolutionCost.

   Algunos costes típicos se muestran en Ejemplo 2.1, “Ejemplo de costes del
   solucionador”.

   Ejemplo 2.1. Ejemplo de costes del solucionador

   El coste predeterminado, que orden las soluciones por su coste de
   seguridad, y después por su prioridad de anclaje de apt:

 safety, priority

   Elimina el menor número de paquetes posible, después cancela el menor
   número de acciones:

 eliminaciones, acciones-canceladas

   Ordena soluciones por el número de paquetes que eliminan además del doble
   del número de las acciones que cancela.

 removals + 2 * canceled-actions

   Como se puede ver en los ejemplos anteriores, el coste no es
   necesariamente un único número. De hecho, un coste consiste de uno más
   componentes del coste, siendo cada uno un número asociado a una solución.
   Al ordenar las soluciones, el solucionador examina los componentes del
   coste en orden, procediendo a los siguientes componentes una vez que los
   anteriores son iguales. Por ejemplo, en el coste “removals,
   canceled-actions”, los soluciones que eliminan menos paquetes siempre
   aparecen antes que las soluciones que eliminan más, sin importar el número
   de acciones canceladas que conllevan. Por otra parte, las soluciones con
   el mismo número de eliminaciones se ordenan de manera que las acciones con
   menos acciones canceladas aparecen primero.

   Los componentes del coste son de dos tipos: componentes de coste básicos y
   componentes de coste compuestos.

   Los componentes básicos simplemente nombran una propiedad de la solución,
   como “upgrades” o “removals”. Puede ver una lista de los componentes
   básicos integrados que aptitude ofrece en Tabla 2.1, “Componentes de coste
   básicos”. También puede crear sus propios componentes de coste usando las
   indicaciones add-to-cost-component y raise-cost-component; para más
   detalles consulte “Configurar indicaciones del solucionador”.

   Cada componente es o bien un contador o un nivel. Los contadores enumeran
   cuantas acciones de una solución se corresponden con una condición (como
   eliminar paquetes o instalar paquetes nuevos), mientras que los niveles
   asocian un número con cada acción para computar el número más alto
   asociado con cualquier acción en la solución.

   Tabla 2.1. Componentes de coste básicos

+-----------------------------------------------------------------------------------+
|       Nombre       |  Tipo  |                     Descripción                     |
|--------------------+--------+-----------------------------------------------------|
|                    |        |Cuenta el número de retenciones que la solución      |
|broken-holds        |Contador|rompe, si es que se permite que el solucionador los  |
|                    |        |rompa (Aptitude::ProblemResolver::Allow-Break-Holds).|
|--------------------+--------+-----------------------------------------------------|
|                    |        |Cuenta el número de acciones pendientes que la       |
|canceled-actions    |Contador|solución cancela (esto es, mantiene los paquetes en  |
|                    |        |su versión presente).                                |
|--------------------+--------+-----------------------------------------------------|
|installs            |Contador|Cuenta el número de paquetes que la solución instala.|
|--------------------+--------+-----------------------------------------------------|
|non-default-versions|Contador|Cuenta el número de versiones que la instalación     |
|                    |        |instala o actualiza desde fuentes no predeterminadas.|
|--------------------+--------+-----------------------------------------------------|
|                    |        |Un valor que aumenta a medida que disminuye la       |
|                    |        |prioridad de anclaje de apt. Específicamente, se     |
|priority            |Nivel   |computa haciendo negativa la prioridad de anclaje    |
|                    |        |(por ejemplo, si la prioridad de anclaje es 500, este|
|                    |        |componente computará como -500).                     |
|--------------------+--------+-----------------------------------------------------|
|removals            |Contador|Cuenta el número de paquetes que la solución elimina.|
|--------------------+--------+-----------------------------------------------------|
|removals-of-manual  |Contador|Cuenta el número de paquetes manualmente instalados  |
|                    |        |que la solución elimina.                             |
|--------------------+--------+-----------------------------------------------------|
|                    |        |Una amplia heurística que aumenta a medida que las   |
|safety              |Nivel   |acciones son menos “seguras”; para más detalles      |
|                    |        |consulte “Costes de seguridad”.                      |
|--------------------+--------+-----------------------------------------------------|
|upgrades            |Contador|Cuenta el número de paquetes que la solución         |
|                    |        |actualiza.                                           |
+-----------------------------------------------------------------------------------+

   Los componentes compuestos se generan combinando los valores de
   componentes básicos. Por ejemplo, removals + canceled-actions
   (eliminaciones + acciones canceladas) suma los componentes removal y
   canceled-actions, resultando en un componente que enumera el número de
   eliminaciones y de acciones canceladas. Los componentes compuestos
   combinan contadores mediante la suma, y escoge el nivel tomando el valor
   máximo como se ve en Figura 2.11, “Sintaxis de componentes de coste
   compuestos”.

   [Nota] Nota
          Es un error sumar dos niveles, tomar el máximo de dos contadores, o
          combinar niveles y contadores de cualquier manera. Por ejemplo, los
          costes removals + safety y max(upgrades, installs) se tomarán como
          errores, y el solucionador los ignorará.^[13]

   Figura 2.11. Sintaxis de componentes de coste compuestos

   Suma dos o más costes básicos:

                 [escala1]*coste1+[escala2]*coste2 + ...


   Toma el valor máximo de dos o más costes básicos:

                 max([escala1]*coste1,[escala2]*coste2, ...)


   Tenga en cuenta que cada componente básico individual se puede multiplicar
   por un factor de escala antes de su combinación con otros componentes. Se
   puede usar para controlar las negociaciones que el solucionador realiza
   entre costes. Por ejemplo, un coste de 2*removals + 3*upgrades dice que
   tres eliminaciones son igualmente “malas” que dos actualizaciones. Las
   soluciones que contienen cuatro eliminaciones y una actualización se
   considerarán equivalentes a soluciones que contienen una eliminación y
   tres actualizaciones, ya que ambos tiene un coste de once.

    Costes de seguridad

   Figura 2.12. Niveles de coste de seguridad

   Niveles de coste de seguridad

   El componente de coste safety (seguridad) es una estimación heurística de
   lo “segura” o “insegura” que es una solución. Los costes de seguridad se
   pueden imaginar como una forma de dividir soluciones en varios “niveles”,
   donde los niveles “menos seguros” reciben número más altos. Figura 2.12,
   “Niveles de coste de seguridad” muestra cómo esto funciona con la
   configuración predeterminada de aptitude.

   [Sugerencia] Sugerencia
                Los niveles de coste de seguridad son sólo una forma de
                controlar el orden en que aparecen las soluciones de
                dependencia. Consulte “Costes en el solucionador interactivo
                de dependencias.” para una descripción completa de cómo
                modificar el orden en que aptitude ordena las soluciones.

   Por omisión aptitude inicia el solucionador con un conjunto “apreciable”
   de niveles de coste de seguridad. Éstos son:

   Tabla 2.2. Niveles de coste de seguridad predeterminados

+------------------------------------------------------------------------------+
|Nivel |                     |                                                 |
| del  |     Descripción     |             Opción de configuración             |
|coste |                     |                                                 |
|------+---------------------+-------------------------------------------------|
|      |Las soluciones que   |                                                 |
|      |sólo incluyen        |                                                 |
|      |acciones “seguras”   |                                                 |
|      |(instalar la versión |                                                 |
|10,000|predeterminada de un |Aptitude::ProblemResolver::Safe-Level,           |
|      |paquete, o mantener  |Aptitude::ProblemResolver::Remove-Level          |
|      |un paquete en su     |                                                 |
|      |versión actual) y la |                                                 |
|      |eliminación de       |                                                 |
|      |paquetes.            |                                                 |
|------+---------------------+-------------------------------------------------|
|      |La solución que      |                                                 |
|20,000|cancela todas las    |Aptitude::ProblemResolver::Keep-All-Level        |
|      |acciones del usuario.|                                                 |
|------+---------------------+-------------------------------------------------|
|      |Soluciones que rompen|                                                 |
|      |retenciones definidas|                                                 |
|40,000|por el usuario o que |Aptitude::ProblemResolver::Break-Hold-Level      |
|      |instalan versiones   |                                                 |
|      |prohibidas.          |                                                 |
|------+---------------------+-------------------------------------------------|
|      |Soluciones que       |                                                 |
|      |instalan paquetes con|                                                 |
|      |versiones no         |                                                 |
|50,000|predeterminadas      |Aptitude::ProblemResolver::Non-Default-Level     |
|      |(tales como          |                                                 |
|      |“experimental”, por  |                                                 |
|      |ejemplo).            |                                                 |
|------+---------------------+-------------------------------------------------|
|      |Soluciones que       |                                                 |
|60,000|desinstalan paquetes |Aptitude::ProblemResolver::Remove-Essential-Level|
|      |Esenciales.          |                                                 |
+------------------------------------------------------------------------------+

   Si una solución entra dentro de diferentes niveles de coste de seguridad,
   aparecerá en el nivel más alto (el último). Por ejemplo, una solución que
   actualiza un paquete a su versión predeterminada y que elimina un segundo
   paquete correspondería al nivel 40,000. Puede ajustar los niveles de
   versiones de manera individual usando las indicaciones del solucionador;
   para más detalles, consulte “Configurar indicaciones del solucionador”.
   Los niveles predeterminados se ilustran en Figura 2.12, “Niveles de coste
   de seguridad”.

  Configurar el solucionador interactivo de dependencias.

    Configurar indicaciones del solucionador

   Puede proporcionar indicaciones al solucionador interactivo de
   dependencias para mejorar la calidad de las soluciones de dependencias que
   recibe. Estas indicaciones pueden alterar las prioridades del
   solucionador, inclinándolo más fuertemente hacia otra versión o paquete, o
   se pueden usar para “pre-cargar” el solucionador con rechazos y
   aprobaciones, al igual que si hubiese entrado en el solucionador y
   rechazado o aprobado varias versiones manualmente.

   Las indicaciones se guardan en el fichero de configuración de apt,
   /etc/apt/apt.conf, dentro del grupo de
   configuración.“Aptitude::ProblemResolver::Hints” (consulte “Referencia del
   fichero de configuración.” para más detalles acerca del fichero de
   configuración).

   Cada indicación del solucionador consiste de una acción, un objetivo, y
   una versión, opcional. Una indicación se escribe de la siguiente
   manera:"acción objetivo [versión]". Para aplicar una indicación del
   solucionador, aptitude ubica uno o más paquetes usando el valor del
   objetivo, elije una o más versiones de esos paquetes usando el valor de la
   versión y, por último, ejecuta la acción.

   El campo correspondiente a la acción de una indicación del solucionador
   puede ser uno de los siguientes:

    1. “approve”: Aprueba la versión, al igual que si ejecuta la orden
       Solucionador → Conmutar Aceptada (a).

    2. “reject”: Rechaza la versión, al igual que si ejecuta la orden
       Solucionador → Conmutar Rechazados (r).

    3. “discard”: Descarta cada solución que contenga la versión. Se
       diferencia con “reject” en que no es visible, de forma que el usuario
       no lo puede modificar interactivamente.

    4. “increase-safety-cost-to número”: Aumenta el coste de seguridad de
       cualquier solución que contenga la versión a número; si el nivel de
       seguridad ya es superior al número, esta indicación no tendrá efecto.
       El coste de seguridad se puede usar (se utiliza de forma predeter)
       para controlar el orden de aparición de las soluciones; para más
       detalles consulte “Costes y componentes del coste” y “Costes de
       seguridad”.

       Se pueden escoger algunos niveles de coste especiales por nombre:

         a. conflict, discard: En lugar de cambiar el coste de seguridad,
            descarta soluciones que contienen la versión como si se hubiese
            aplicado la indicación “discard”.

         b. maximum: El coste máximo de seguridad.

         c. minimum: El coste de seguridad más bajo. Todas las búsquedas
            comienzan con este coste, así que “aumentar” una versión a este
            coste no tiene ningún efecto. Por otro lado, también puede
            emplear este valor para ajustar los niveles de coste
            predeterminados: por ejemplo, definir
            Aptitude::ProblemResolver::Remove-Level como “minimum” hace que
            los paquetes desinstalados no tengan ningún efecto en el coste de
            seguridad de una solución.

       [Nota] Nota
              La indicación increase-safety-cost-to se aplica en adición a
              cualquier coste de seguridad predeterminado que se corresponda
              con la acción seleccionada. Por ejemplo, una indicación que
              aumenta el coste de seguridad de “instalar hal desde
              experimental” a 15.000 no tiene efecto alguno, porque la acción
              ya tiene un coste de seguridad de 15.000 (suponiendo que esta
              versión de hal no es la versión candidata predeterminada).

    5. “número”: añadir el número a la puntuación de la versión, inclinando
       al solucionador a favor del mismo o (con un número negativo) en
       contra. Por ejemplo, la indicación 200 emacs añade 200 a la puntuación
       de emacs, mientras que la indicación -10 emacs sustrae 10 a su
       puntuación.

   Si el campo de objetivo de una indicación del solucionador contiene un
   signo de interrogación (“?”) o tilde (“~”), se toma como un patrón de
   búsqueda y se consideran todas las versiones de paquetes que encajen . De
   otra manera, se toma como el nombre de un paquete a seleccionar. Así que
   el objetivo “g++” sólo seleccionaría el paquete g++, pero el objetivo
   “?section(non-free)” seleccionaría cualquier paquete dentro de la sección
   non-free. Para más información acerca de patrones de búsqueda, consulte
   “Patrones de búsqueda”.

   Si el campo de versión no está presente, todas las versiones del paquete
   se verán afectadas por la indicación. De no ser así, puede tener
   cualquiera de las siguientes formas:

    1. “/archivo”: la indicación afecta sólo a las versiones disponibles del
       archivo dado.

    2. “<versión”: la indicación afecta sólo a las versiones cuyo número de
       versión es menor que versión.

    3. “<=versión”: la indicación solo afecta a las versiones cuyo número de
       versión es menor o igual a versión.

    4. “=versión”: la indicación afecta solo a las versiones cuyo número de
       versión es versión.

    5. “<>versión”: la indicación afecta sólo a las versiones cuyo número de
       versión no es versión.

    6. “>=versión”: la indicación afecta sólo a las versiones cuyo número de
       versión es mayor o igual a versión.

    7. “>versión”: la indicación afecta sólo a las versiones cuyo número de
       versión es mayor que versión.

    8. “:UNINST”: en lugar de afectar a cualquier otra versión del objetivo,
       la indicación afecta a la decisión de desinstalar el objetivo. Por
       ejemplo, “reject aptitude :UNINST” impide al solucionador intentar
       desinstalar aptitude.

    9. “versión”: la indicación afecta solo a las versiones cuyo número de
       versión es versión.

Patrones de búsqueda

   La palabra que introduce cuando busca un paquete o crea una vista limitada
   de la lista en aptitude se conoce como “patrón de búsqueda”. Mientras que
   el uso más básico de los patrones de búsqueda es el de emparejar por
   nombre de paquete, aptitude le permite realizar búsquedas mucho más
   complejas. Además de la interfaz gráfica, algunas operaciones en la línea
   de órdenes pueden emplear patrones de búsqueda; consulte Referencia de la
   línea de órdenes para más detalles.

   Un patrón de búsqueda consiste de una o más condiciones (también conocidas
   como “términos”); los paquetes se corresponden con el patrón si se
   corresponden con todos sus términos. Por lo general, los términos empiezan
   con un signo de interrogación (“?”), seguido del nombre del término, el
   cual describe la búsqueda que el término realiza: por ejemplo, el término
   ?name se corresponde con los nombres de los paquetes, mientras que el
   término ?version busca entre las versiones de los paquetes. Por último,
   cualquier parámetro adicional al término de búsqueda se escribe entre
   paréntesis, (consulte la documentación de términos individuales para ver
   los detalles de lo que significa cada parámetro de los diferentes
   términos).

   [Nota] Nota
          Un texto que no venga precedido de “?” forma también un patrón de
          búsqueda: aptitude trata cada palabra (o cadena entrecomillada)
          como un argumento para el patrón ?name, el cual busca un paquete
          cuyo nombre coincide con el texto cuando éste se interpreta como
          una expresión regular.

   [Aviso] Aviso
           El comportamiento de aptitude cuando se introduce un patrón de
           búsqueda sin “?” (o “~”) está así dispuesto para facilitar el uso
           interactivo, y cambiará en el futuro; aquellos scripts que
           invoquen aptitude deberán nombrar la estrategia de búsqueda de
           manera explicita. Ésto es, que los scripts deberían buscar
           “?name(coq)” en lugar de “coq”).

  Buscar cadenas de caracteres.

   Muchos términos de búsqueda toman una cadena de caracteres como parámetro,
   comparándolo con un campo de información de uno más paquetes. Se pueden
   introducir cadenas entrecomilladas (“"”), con lo cual “?name(scorch)” y
   “?name("scorch")” realizarían la misma búsqueda. Si introduce una cadena
   de búsqueda empleando comillas dobles puede también incluir comillas
   dobles literales poniendo un barra invertida (“\”) justo delante: por
   ejemplo, “?description("\"easy\"")” coincidiría con todo paquete cuya
   descripción contenga la cadena en cuestión.

   En caso de introducir una cadena “simple”, una que no va entrecomillada,
   aptitude considerará que la cadena ha “finalizado” cuando encuentra el
   paréntesis de cierre o la coma antes del segundo argumento del término de
   búsqueda.^[14] Para que estos caracteres pierdan su significado especial,
   ponga una tilde (“~”) delante de ellos. Por ejemplo, “?description(etc))”
   contiene un error de sintaxis, porque el primer “)” cierra el término
   ?description, y el segundo “)” no se corresponde con ningún “(”. En
   contraste, “?description(etc~))” sí muestra cualquier paquete cuyo texto
   contiene “etc)”. Hay también consideraciones adicionales si está empleando
   la abreviatura de un término; consulte “Abreviaturas de términos de
   búsqueda.” para más detalles.

   La mayoría de búsquedas de texto (nombres de paquete, descripciones,
   etc...) se realizan usandoexpresiones regulares no sensibles a las
   mayúsculas. Una expresión regular coincide con un campo si cualquier
   porción del campo de texto coincide con la expresión; por ejemplo,
   “ogg[0-9]” coincide con “libogg5”, “ogg123”, y “theogg4u”. Algunos
   caracteres tienen un significado especial dentro de una expresión regular
   ^[15] , así que si desea encontrarlos en las búsquedas tendrá que
   introducir un escape de barra inversa: por ejemplo, para encontrar “g++”
   debería usar el patrón “g\+\+”.

   Los caracteres “!” y “|” tienen un significado especial dentro de un
   patrón de búsqueda. Para poder incluir estos caracteres en una cadena no
   entrecomillada, puede precederlos de una tilde (“~”). Por ejemplo, para
   encontrar paquetes cuya descripción contiene “grand” u “oblique”, use el
   patrón “?description(grand~|oblique)”. De todas formas, en estos casos
   posiblemente encuentre más sencillo usar una cadena entrecomillada:
   “?description("grand|oblique")”.

  Abreviaturas de términos de búsqueda.

   Algunos términos de búsqueda se pueden escribir usando formas “cortas”,
   las cuales consisten de una tilde (“~”) seguida de un único carácter que
   identifica el término y por último, los argumentos (en caso de haberlos)
   para el término. Por ejemplo, la forma abreviada de ?name(aptitude) es ~n
   aptitude.

   Si escribe un término empleando su forma abreviada, los caracteres de
   tilde y “espacios en blanco”, esto es, caracteres de espacio, tabulados y
   similares, se dividirá el término y se iniciará un nuevo término. Por
   ejemplo, “~mDaniel Burrows” buscaría cualquier paquete cuyo campo de
   desarrollador contenga “Daniel” y cuyo nombre contenga “Burrows”, mientras
   que “~i~napt” busca paquetes instalados cuyo nombre contiene apt. Para
   incluir espacios en blanco en la expresión de búsqueda, puede poner una
   tilde delante del mismo (como en Daniel~ Burrows) o introducir unas
   comillas (como en "Debian Project", o incluso Debian" "Project). Dentro de
   una cadena entrecomillada, puede emplear la barra invertida (“\”) para
   cancelar el significado especial de unas comillas: por ejemplo,
   ~d"\"email" mostraría todo paquete cuya descripción contiene unas comillas
   inmediatamente seguidas de email. ^[16]

   [Nota] Nota
          Los signos de interrogación (“?”) no pueden cerrar la forma
          abreviada de un término, aunque vayan seguidos por el nombre de un
          término de búsqueda. Por ejemplo, “~napt?priority(required)” busca
          cualquier paquete cuyo nombre se corresponde con la expresión
          regular “apt?priority(required)”. Añada uno o más espacios entre
          los términos si desea combinar un término corto de consulta con un
          término de búsqueda definido con el nombre, como por ejemplo
          “~napt ?priority(required)”, o introduzca signos de interrogación
          en torno al texto (de haberlo) siguiendo la forma abreviada del
          término, como puede ver en “~n"apt"?priority(required)”.

   Tabla 2.3, “Guía rápida de términos de búsqueda” presenta en una lista la
   forma abreviada de cada término de búsqueda.

  Búsquedas y versiones.

   De manera predeterminada, un patrón se corresponde con un paquete si
   cualquier versión del paquete coincide con el patrón. De todas formas,
   algunos patrones restringen sus sub-patrones para emparejarse solo con
   algunas versiones de un paquete. Por ejemplo, el término de búsqueda
   ?depends(patrón) selecciona cualquier paquete que dependa de un paquete
   que coincide con patrón. De todas formas, patrón solo coincide con las
   versiones de un paquete que satisfacen la dependencia. Esto significa que
   si foo depende de bar (>= 3.0), estando disponibles 2.0, 3.0, y 4.0, en el
   patrón de búsqueda ?depends(?version(2\.0)) sólo las versiones 3.0 y 4.0
   se compararían con ?version(2\.0), conduciendo a que no se encontraría foo
   en esta búsqueda.

   Importa qué versiones se revisan porque, al igual que en el ejemplo
   anterior, algunos patrones coincidirían con una versión pero no con la
   otra. Por ejemplo, el patrón ?installed solo muestra la versión del
   paquete que está instalado. De manera similar, el patrón
   ?maintainer(desarrollador) solo encontraría versiones que contengan el
   desarrollador dado. Normalmente, todas las versiones de un paquete tienen
   el mismo desarrollador, pero éste no es siempre el caso; de hecho,
   cualquier patrón de búsqueda que examina los campos de un paquete (aparte
   de su nombre, por supuesto) actúa de esta manera, pues todos los campos de
   un paquete pueden variar de una versión a otra.

   Para revisar un patrón con todas las versiones de un paquete, aunque el
   patrón generalmente se compara sólo con algunas versiones, use el término
   ?widen. Por ejemplo, ?depends(?widen(?version(2\.0))) muestra cualquier
   paquete A que depende de un paquete B, donde B coincide con la versión
   2.0, independientemente de si la versión satisface la dependencia de A.
   Por otro lado, el término ?narrow restringe las versiones con las cuales
   se compara el sub-patrón: ?narrow(?installed, ?depends(?version(ubuntu)))
   encontraría cualquier paquete cuya versión instalada tiene una dependencia
   que se puede satisfacer con un paquete cuya cadena de versión contenga
   “ubuntu”.

   [Nota] Nota
          Hay una sutil pero importante distinción entre emparejar un patrón
          con un paquete, y emparejarlo con todas las versiones de ese
          paquete. Cuando un patrón se compara con un paquete cada uno de sus
          términos se compara con el paquete, y por lo tanto cada término
          coincidiría si cualquier versión del paquete coincide. En
          contraste, cuando un patrón se compara con cada versión de un
          paquete, coincidiría con éxito al emparejarse cuando todos sus
          términos coinciden con la misma versión del paquete.

          Por ejemplo: suponga que la versión 3.0-1 del paquete aardvark está
          instalado, pero está disponible la versión 4.0-1. La expresión de
          búsqueda ?version(4\.0-1)?installed muestra aardvark, porque
          ?version(4\.0-1) coincide con la versión 4.0-1 de aardvark,
          mientras que ?installed coincide con la versión 3.0-1. Por otra
          parte, esta expresión no se emparejaría con todas las versiones de
          aardvark, porque no hay ninguna versión instalada y porque también
          tiene el numero de versión 4.0-1.

  Objetivos explícitos de búsqueda.

   Algunas búsquedas particularmente complejas se pueden expresar en aptitude
   usando objetivos explícitos. En una expresión normal de búsqueda no hay
   ninguna manera de referirse al paquete o a la versión que se revisa en el
   momento. Por ejemplo, suponga que desea realizar una búsqueda de todo
   paquete P que depende de un segundo paquete Q de manera que Q recomienda
   P. Obviamente, necesita comenzar con el término ?depends(...). Pero el
   término introducido en ... necesita seleccionar paquetes idénticos a aquel
   emparejado con ?depends. Cuando he descrito esta meta traté con este tema
   dando los nombres de los paquetes, denominándolos P y Q; términos con
   objetivos explícitos harían exactamente lo mismo. ^[17]

   Un objetivo explicito se introduce con el término ?for.

   Figura 2.13. Sintaxis del término ?for

 ?for variable: patrón

   Funciona de la misma manera que patrón, pero puede emplear la variable
   dentro de patrón para referirse al paquete o versión con el cual se
   empareja patrón. Puede usar variable de dos maneras:

    1. El término ?= coincidiría de manera exacta con el paquete o la versión
       indicada por la variable dada. De manera específica, si el termino
       ?for correspondiente se limita a una sola versión, ?= coincidiría o
       bien con la versión (si ?= se ha limitado) o con el paquete completo;
       de otra forma, coincide con cualquier versión del paquete.

       Véase Ejemplo 2.2, “ Uso del término ?=. ” para ver un ejemplo de uso
       de ?=.

    2. El término ?bind(variable, patrón) coincide con cualquier paquete o
       versión si el valor de variable coincide con patrón.

       Hay una forma abreviada para términos de tipo ?. La expresión
       ?bind(variable, ?término[(argumentos)]) se puede sustituir por
       ?variable:término(argumentos).

       Véase Ejemplo 2.3, “Uso del término ?bind.” para un ejemplo de uso de
       ?bind.

  Referencia de los términos de búsqueda.

   Tabla 2.3, “Guía rápida de términos de búsqueda” proporciona un escueto
   resumen de todos los términos de búsqueda en aptitude. Puede consultar la
   descripción completa de cada término a continuación.

   Tabla 2.3. Guía rápida de términos de búsqueda

+--------------------------------------------------------------------------------------------------+
|          Forma larga          |              Forma abreviada              |     Descripción      |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona el paquete |
|                               |                                           |ligado a variable;    |
|?=variable                     |                                           |consulte “Objetivos   |
|                               |                                           |explícitos de         |
|                               |                                           |búsqueda.”.           |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona el paquete |
|?not(patrón)                   |!patrón                                    |que no coincide con   |
|                               |                                           |patrón.               |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|                               |                                           |que se han marcado    |
|?action(acción)                |~aacción                                   |para la acción dada   |
|                               |                                           |(p. ej., “install” o  |
|                               |                                           |“upgrade”).           |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|?all-versions(patrón)          |                                           |cuyas versiones       |
|                               |                                           |coinciden con patrón. |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona todo       |
|?and(patrón1, patrón2)         |patrón1 patrón2                            |paquete que coincide  |
|                               |                                           |con patrón1 y patrón2.|
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|?any-version(patrón)           |                                           |con al menos una      |
|                               |                                           |versión que encaje con|
|                               |                                           |patrón.               |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|                               |                                           |para la arquitectura  |
|?architecture(arquitectura)    |~rarquitectura                             |dada (por ejemplo,    |
|                               |                                           |“amd64” o “all”).     |
|                               |                                           |Valores especiales:   |
|                               |                                           |native y foreign.     |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|?archive(archivo)              |~Aarchivo                                  |del archivo dado      |
|                               |                                           |(tales como           |
|                               |                                           |“unstable”).          |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|?automatic                     |~M                                         |automáticamente       |
|                               |                                           |instalados.           |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona cualquier  |
|                               |                                           |variable que coincide |
|?bind(variable, patrón)        |?variable:nombre_del_término[(argumentos)] |con patrón; consulte  |
|                               |                                           |“Objetivos explícitos |
|                               |                                           |de búsqueda.”.        |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|?broken                        |~b                                         |con una dependencia   |
|                               |                                           |rota.                 |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona cualquier  |
|?broken-tipodep                |~Btipodep (tipo de dependencia)            |paquete con una       |
|                               |                                           |dependencia rota del  |
|                               |                                           |tipodep dado.         |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona cualquier  |
|                               |                                           |paquete con una       |
|?broken-tipodep(patrón)        |~DB[tipodep:]patrón                        |dependencia rota del  |
|                               |                                           |tipodep dado que      |
|                               |                                           |encaje con patrón.    |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|                               |                                           |sobre los que un      |
|?broken-reverse-tipodep(patrón)|~RB[tipodep:]patrón                        |paquete que coincide  |
|                               |                                           |con él patrón declara |
|                               |                                           |una dependencia rota  |
|                               |                                           |del tipo tipodep.     |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|                               |                                           |que entran en         |
|?conflicts(patrón)             |~Cpatrón                                   |conflicto con un      |
|                               |                                           |paquete que coincide  |
|                               |                                           |con patrón.           |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|?config-files                  |~c                                         |desinstalados pero no |
|                               |                                           |purgados.             |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|                               |                                           |que declaran una      |
|?tipodep(patrón)               |~D[tipodep:]patrón                         |dependencia de tipo   |
|                               |                                           |tipodep sobre un      |
|                               |                                           |paquete que coincide  |
|                               |                                           |con patrón.           |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|?description(descripción)      |~ddescripción                              |cuya descripción      |
|                               |                                           |coincide con          |
|                               |                                           |descripción.          |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|                               |                                           |esenciales, aquellos  |
|?essential                     |~E                                         |con Essential: yes en |
|                               |                                           |sus ficheros de       |
|                               |                                           |control.              |
|-------------------------------+-------------------------------------------+----------------------|
|?exact-name(nombre)            |                                           |Selecciona paquetes   |
|                               |                                           |llamados nombre.      |
|-------------------------------+-------------------------------------------+----------------------|
|?false                         |~F                                         |No seleccionar        |
|                               |                                           |paquetes.             |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|                               |                                           |que coinciden el      |
|                               |                                           |patrón con la variable|
|?for variable: patrón          |                                           |ligada al paquete con |
|                               |                                           |que se empareja;      |
|                               |                                           |consulte “Objetivos   |
|                               |                                           |explícitos de         |
|                               |                                           |búsqueda.”.           |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|?garbage                       |~g                                         |que ningún paquete    |
|                               |                                           |instalado manualmente |
|                               |                                           |requiere.             |
|-------------------------------+-------------------------------------------+----------------------|
|?installed                     |~i                                         |Selecciona paquetes   |
|                               |                                           |instalados.           |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|?maintainer(desarrollador)     |~mdesarrollador                            |cuyo responsable es el|
|                               |                                           |desarrollador.        |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|                               |                                           |con la funcionalidad  |
|?multiarch(multiarquitectura)  |                                           |multiarquitectura     |
|                               |                                           |definida (esto es,    |
|                               |                                           |“foreign”, “same”,    |
|                               |                                           |“allowed”, o “none”). |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|?narrow(filtro, patrón)        |~S filtro patrón                           |que coinciden con     |
|                               |                                           |ambos filtro y patrón |
|                               |                                           |en una sola versión.  |
|-------------------------------+-------------------------------------------+----------------------|
|?name(nombre)                  |~nnombre, nombre                           |Selecciona paquetes   |
|                               |                                           |con el nombre dado.   |
|-------------------------------+-------------------------------------------+----------------------|
|?new                           |~N                                         |Selecciona paquetes   |
|                               |                                           |nuevos.               |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Buscar paquetes       |
|?obsolete                      |~o                                         |instalados que no se  |
|                               |                                           |pueden descargar.     |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|?or(patrón1, patrón2)          |patrón1 | patrón2                          |que coinciden con     |
|                               |                                           |patrón1, patrón2, o   |
|                               |                                           |ambos.                |
|-------------------------------+-------------------------------------------+----------------------|
|?origin(origen)                |~Oorigen                                   |Selecciona paquetes   |
|                               |                                           |con el origen dado.   |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|?provides(patrón)              |~Ppatrón                                   |que proveen un paquete|
|                               |                                           |que coincide con el   |
|                               |                                           |patrón.               |
|-------------------------------+-------------------------------------------+----------------------|
|?priority(prioridad)           |~pprioridad                                |Selecciona paquetes   |
|                               |                                           |con la prioridad dada.|
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|                               |                                           |que son objetivo de   |
|?reverse-tipodep(patrón)       |~R[tipodep:]patrón                         |una dependencia de    |
|                               |                                           |tipo tipodep declarado|
|                               |                                           |por un paquete que    |
|                               |                                           |coincide con patrón.  |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|                               |                                           |que son el objetivo de|
|                               |                                           |una dependencia rota  |
|?reverse-broken-tipodep(patrón)|~RB[tipodep:]patrón                        |de tipo tipodep       |
|                               |                                           |declarado por un      |
|                               |                                           |paquete que coincide  |
|                               |                                           |con patrón.           |
|-------------------------------+-------------------------------------------+----------------------|
|?section(sección)              |~ssección                                  |Selecciona paquetes en|
|                               |                                           |la sección dada.      |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|                               |                                           |cuyo nombre de paquete|
|?source-package(nombre)        |                                           |fuente coincide con la|
|                               |                                           |expresión regular     |
|                               |                                           |nombre.               |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|                               |                                           |cuya versión de       |
|?source-version(versión)       |                                           |paquete fuente        |
|                               |                                           |coincide con la       |
|                               |                                           |expresión regular     |
|                               |                                           |versión.              |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|?tag(etiqueta)                 |~Getiqueta                                 |con la etiqueta       |
|                               |                                           |debtags dada.         |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Búsqueda completa de  |
|?term(palabra_clave)           |                                           |texto para paquetes   |
|                               |                                           |que contienen la      |
|                               |                                           |palabra_clave dada.   |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Búsqueda completa de  |
|                               |                                           |texto de paquetes que |
|?term-prefix(palabra_clave)    |                                           |contienen una palabra |
|                               |                                           |clave que comienza con|
|                               |                                           |la palabra_clave.     |
|-------------------------------+-------------------------------------------+----------------------|
|?true                          |~T                                         |Selecciona todos los  |
|                               |                                           |paquetes.             |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|?task(tarea)                   |~ttarea                                    |dentro de la tarea    |
|                               |                                           |definida.             |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|?upgradable                    |~U                                         |instalados            |
|                               |                                           |susceptibles de       |
|                               |                                           |actualización.        |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|                               |                                           |marcados con una      |
|                               |                                           |etiqueta de usuario   |
|?user-tag                      |                                           |que encaje con la     |
|                               |                                           |expresión regular     |
|                               |                                           |user-tag (etiqueta de |
|                               |                                           |usuario).             |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona paquetes   |
|                               |                                           |cuya versión coincide |
|?version(versión)              |~Vversión                                  |con versión (valores  |
|                               |                                           |especiales: CURRENT,  |
|                               |                                           |CANDIDATE, y TARGET). |
|-------------------------------+-------------------------------------------+----------------------|
|?virtual                       |~v                                         |Selecciona paquetes   |
|                               |                                           |virtuales.            |
|-------------------------------+-------------------------------------------+----------------------|
|                               |                                           |Selecciona versiones  |
|                               |                                           |para los cuales el    |
|                               |                                           |patrón coincide con   |
|                               |                                           |cualquier versión del |
|?widen(patrón)                 |~Wpatrón                                   |paquete               |
|                               |                                           |correspondiente,      |
|                               |                                           |descartando las       |
|                               |                                           |restricciones locales |
|                               |                                           |de versiones.         |
+--------------------------------------------------------------------------------------------------+

   nombre

           Emparejar paquetes cuyos nombres coinciden con la expresión
           regular nombre. Éste es el modo de búsqueda “predeterminado” y se
           emplea con patrones que no comienzan con ~.

           [Nota] Nota
                  Use el término ?name (descrito abajo) para encontrar
                  paquetes cuyos nombres contengan diferentes sub-cadenas;
                  por ejemplo, “?name(apti)?name(tude)” busca cualquier
                  paquete cuyo nombre contiene ambos “apti” y “tude”.

   ?=variable

           Buscar paquetes que se corresponden con el valor de variable, que
           se debe cerrar con ?for. Por ejemplo, ?for x: ?depends(
           ?recommends( ?=x ) ) busca todo paquete x que dependa de un
           paquete que recomienda x.

           Por ejemplo, la siguiente expresión de búsqueda reúne paquetes que
           entran en conflicto con ellos mismos:

           Ejemplo 2.2. Uso del término ?=.

           ?for x: ?conflicts(?=x)

           Para más información, consulte “Objetivos explícitos de
           búsqueda.”.

   ?not(patrón), !patrón

           Buscar paquetes que no coinciden con el patrón patrón. Por
           ejemplo, “?not(?broken)” selecciona paquetes que no están “rotos”.

           [Nota] Nota
                  Para poder incluir “!” en una cadena de búsqueda, debe
                  tener un “escape” introduciendo una tilde (“~”) delante de
                  el; de no ser así, aptitude lo considerará como parte de un
                  término ?not. Por ejemplo, para seleccionar paquetes cuya
                  descripción contenga “extra!”, use “?description(extra~!)”.

   ?and(patrón1, patrón2), patrón1 patrón2

           Buscar paquetes que coinciden con ambos patrón1 y patrón2.

   ?or(patrón1, patrón2), patrón1 | patrón2

           Buscar paquetes que coinciden con el patrón1 o el patrón2.

           [Nota] Nota
                  Para poder emplear el carácter “|” en una expresión
                  regular, debe tener un “escape” para impedir que aptitude
                  genere un término OR de el: “~|”.

   (patrón)

           Buscar patrón. Por ejemplo, “opengl (perl|python)” busca cualquier
           paquete cuyo nombre contenga opengl, así como también perl o
           python.

   ?action(acción), ~aacción

           Buscar paquetes marcados para la acción introducida. La acción
           puede ser “install” (instalar), “upgrade” (actualizar),
           “downgrade” (desactualizar), “remove” (eliminar), “purge
           (purgar)”, “hold” (retener, revisa si algún paquete se ha
           retenido), o “keep” (mantener, revisa si algún paquete permanecerá
           sin cambios).

           Observe que ésto solo revisa si hay alguna acción por realizar
           sobre un paquete, no si se podría llevar a cabo. Por ello, por
           ejemplo, ?action(upgrade) busca aquellos paquetes que haya
           decidido actualizar, no los paquetes que se podrían actualizar en
           el futuro (para ello, use ?upgradable).

   ?all-versions(patrón)

           Buscar todo paquete cuya versión se corresponde con la expresión
           dada. Cada versión de un paquete se comparará separadamente con el
           patrón, y el paquete coincidirá si todas sus versiones también lo
           hacen. Siempre se buscarán los paquetes sin versiones, tales como
           los paquetes virtuales, con este término de búsqueda.

           Este término no se puede ser usar en un contexto en el cual las
           versiones a comparar ya se han restringido, tales como dentro de
           ?depends o ?narrow. De todas formas, siempre se puede usar dentro
           de ?widen.

   ?any-version(patrón)

           Mostrar un paquete si cualquiera de sus versiones coinciden con el
           patrón dado. Esta es la versión dual de ?all-versions.

           Este término no se puede ser usar en un contexto en el cual las
           versiones a comparar ya se han restringido, tales como dentro de
           ?depends o ?narrow. De todas formas, siempre se puede usar dentro
           de ?widen.

           [Nota] Nota
                  Este término tiene una estrecha relación con ?narrow. De
                  hecho, ?any-version(patrón1 patrón2) es exactamente lo
                  mismo que ?narrow(patrón1, patrón2).

   ?architecture(arquitectura), ~rarquitectura

           Compara versiones de paquetes para la arquitectura dada. Por
           ejemplo, “?architecture(amd64)” coincide con paquetes amd64,
           mientras que “?architecture(all)” coincide con todos los paquetes
           independientes de arquitectura. También acepta los valores
           especiales native y foreign.

   ?archive(archivo), ~Aarchivo

           Buscar las versiones de paquetes disponibles desde un archivo que
           coincide con la expresión regular archivo. Por ejemplo,
           “?archive(testing)” coincide con cualquier paquete disponible en
           el archivo testing.

   ?automatic, ~M

           Buscar paquetes instalados automáticamente.

   ?bind(variable, patrón), ?variable:término[(argumentos)]

           Buscar cualquier paquete o versión si el patrón dado coincide con
           el paquete o versión ligado a la variable, que debe definir en un
           ?for de cierre.

           Ejemplo 2.3. Uso del término ?bind.

           ?for x: ?depends(?depends(?for z: ?bind(x, ?depends(?=z))))

           ?for x: ?depends(?depends(?for z: ?x:depends(?=z)))

           Los dos patrones de búsqueda en el ejemplo anterior coinciden con
           cualquier paquete x de manera que x depende de un paquete y, el
           cual depende a su vez de un paquete z, de manera que x depende
           también de manera directa de z. El primer patrón emplea ?bind
           directamente, mientras que el segundo utiliza una sintaxis
           abreviada equivalente al primero.

           Para más información, consulte “Objetivos explícitos de
           búsqueda.”.

   ?broken, ~b

           Buscar paquetes que están “rotos”: tienen dependencias
           insatisfechas, una pre-dependencia, rompen, o entran en conflicto.

   ?broken-tipodep, ~Btipodep

           Buscar paquetes con una dependencia no satisfecha (“roto”) del
           tipodep dado. El tipodep puede ser “depends” (depende),
           “predepends”(pre-depende), “recommends” (recomienda), “suggests”
           (sugiere), “breaks” (rompe), “conflicts” (entra en conflicto), o
           “replaces” (reemplaza).

   ?broken-tipodep(patrón), ~DB[tipodep:]patrón

           Buscar paquetes con una dependencia no satisfecha del tipo tipodep
           en un paquete que coincide con patrón. El tipodep puede ser
           cualquiera de los tipos de dependencias listados en la
           documentación de ?broken-tipodep.

   ?conflicts(patrón), ~Cpatrón

           Buscar paquetes que entran en conflicto con un paquete que
           coincide con el patrón dado. Por ejemplo,
           “?conflicts(?maintainer(dburrows@debian.org))” busca cualquier
           paquete que entra en conflicto con el paquete del que soy
           responsable.

   ?config-files, ~c

           Buscar paquetes desinstalados, pero cuyos ficheros de
           configuración permanecen en el sistema (p. ej., se eliminaron pero
           no purgaron).

   ?tipodep(patrón), ~D[tipodep:]patrón

           El tipodep puede ser cualquiera de los tipos dependencia que se
           muestran en la documentación de ?broken-tipodep, así como
           provides: por ejemplo, ?depends(libpng3) muestra todo paquete que
           depende de libpng3. Si se emplea la forma abreviada (~D) pero sin
           introducir tipodep,buscará depends de manera predeterminada.

           Si el tipodep es “provides”, muestra paquetes que proveen un
           paquete que coincide con patrón (el equivalente a ?provides). De
           no ser así, busca paquetes que declaran una dependencia de tipo
           tipodep sobre una versión de paquete que coincide con patrón.

   ?description(descripción), ~ddescripción

           Buscar paquetes cuya descripción se corresponde con la expresión
           regular descripción.

   ?essential, ~E

           Buscar paquetes Esenciales.

   ?exact-name(nombre)

           Buscar paquetes nombrados nombre. Funciona de manera similar a
           ?name, pero el nombre debe ser exacto. Por ejemplo, el siguiente
           patrón solo emparejaría el paquete apt; con ?name, también
           mostraría aptitude, uvcapture, etc.

           Ejemplo 2.4. Uso del término ?exact-name.

           ?exact-name(apt)

   ?false, ~F

           Este término no coincide con ningún paquete. ^[18]

   ?for variable: patrón

           Buscar patrón, pero puede emplear la variable dentro del patrón
           para referirse al paquete o versión del paquete.

           Puede emplear variable de dos maneras. Para usar un término del
           tipo ?, escriba ?variable:nombre_término(argumentos); por ejemplo,
           ?x:depends(apt). Además, el término ?=variable selecciona todo
           paquete o versión que se corresponde con el valor de la variable.

           Por ejemplo, el siguiente término busca cualquier paquete x que
           recomienda y depende de un segundo paquete y.

           Ejemplo 2.5. Uso del término ?for.

           ?for x: ?depends( ?for y: ?x:recommends( ?=y ) )

           Para más información, consulte “Objetivos explícitos de
           búsqueda.”.

   ?garbage, ~g

           Buscar paquetes que no están instalados, o que se instalaron
           automáticamente y que no son dependencia de ningún paquete
           instalado.

   ?installed, ~i

           Buscar versiones de paquetes instalados.

           Debido a que de manera predeterminada se revisan todas las
           versiones, ésto generalmente muestra paquetes que están
           instalados.

   ?maintainer(desarrollador), ~mdesarrollador

           Buscar paquetes cuyo campo de desarrollador se corresponde con la
           expresión regular desarrollador. Por ejemplo, “?maintainer(joeyh)”
           mostraría todos los paquetes mantenidos por Joey Hess.

   ?multiarch(multiarquitectura)

           Muestra paquetes con la funcionalidad multiarquitectura definida
           con multiarquitectura. Por ejemplo, “?multiarch(foreign)” muestra
           todos los paquetes que satisfacen las dependencias de paquetes
           para otra arquitectura. “?multiarch(none)” selecciona paquetes sin
           funcionalidad multiarquitectura.

   ?narrow(filtro, patrón), ~S filtro patrón

           Este término “restringe” la búsqueda a las versiones de paquetes
           que se corresponden con filtro. En particular, muestra cualquier
           versión del paquete que coincide con ambos filtro y patrón. El
           valor de la cadena de la correspondencia es el valor de patrón.

   ?name(nombre), ~nnombre

           Buscar paquetes cuyo nombre coincide con la expresión regular
           nombre. Por ejemplo, la mayoría de los paquetes que coinciden con
           “?name(^lib)” son bibliotecas de un tipo u otro.

   ?new, ~N

           Buscar paquetes “nuevos”: ésto es, que se han añadido al archivo
           desde la última vez que limpió la lista de paquetes usando
           Acciones → Olvidar paquetes nuevos (f) o la acción en línea de
           órdenes forget-new.

   ?obsolete, ~o

           Este término busca todo paquete instalado no disponible en ninguna
           de sus versiones desde cualquier archivo. Estos paquetes aparecen
           en la interfaz gráfica como “Paquetes obsoletos o creados
           localmente”.

   ?origin(origen), ~Oorigen

           Buscar versiones de un paquete cuyo origen coincide con la
           expresión regular origen. Por ejemplo, “!?origin(debian)” muestra
           cualquier paquete no oficial en su sistema (paquetes que no
           provienen del archivo de Debian).

   ?provides(patrón), ~Ppatrón

           Buscar versiones de un paquete que proveen otro que coincide con
           patrón. Por ejemplo, “?provides(mail-transport-agent)” muestra
           todos los paquetes que proveen “mail-transport-agent”.

   ?priority(prioridad), ~pprioridad

           Buscar paquetes cuya prioridad es prioridad; La prioridad puede
           ser extra, important, optional, required, o standard. Por ejemplo,
           “?priority(required)” muestra aquellos paquetes con una prioridad
           “required”.

   ?reverse-tipodep(patrón), ~R[tipodep:]patrón

           tipodep puede ser “provides” o uno de los tipos de dependencias
           ilustrados en la documentación de ?broken-tipodep. Si tipodep no
           está presente, depends es el argumento predeterminado.

           Si tipodep es “provides”, muestra los paquetes cuyo nombre es
           provisto por una versión de un paquete que se corresponde con
           patrón. De no ser así, muestra paquetes con una versión de paquete
           que se corresponde con patrón y sobre la cual declara un
           dependencia tipodep.

   ?reverse-broken-tipodep(patrón), ?broken-reverse-tipodep(patrón),
   ~RB[tipodep:]patrón

           tipodep puede ser “provides” o uno de los tipos de dependencias
           ilustrados en la documentación de ?broken-tipodep. Si tipodep no
           está presente, depends es el argumento predeterminado.

           Buscar paquetes con una versión de paquete que coincide con patrón
           sobre la que declara una dependencia insatisfecha de tipodep.

   ?section(sección), ~ssección

           Buscar paquetes cuya sección coincide con la expresión regular
           sección.

   ?source-package(nombre)

           Buscar paquetes cuyo nombre de paquete fuente coincide con la
           expresión regular nombre.

   ?source-version(versión)

           Buscar paquetes cuya versión de paquete fuente coincide con la
           expresión regular versión.

   ?tag(etiqueta), ~Getiqueta

           Buscar paquetes cuyo campo de «Tag» (etiqueta) coincide con la
           expresión regular etiqueta. Por ejemplo, el patrón
           ?tag(game::strategy) mostraría juegos de estrategia.

           Para más información acerca de etiquetas y debtags, consulte
           http://debtags.alioth.debian.org.

   ?task(tarea), ~ttarea

           Buscar paquetes agrupados bajo una tarea cuyo nombre coincide con
           la expresión regular tarea.

   ?term(palabra_clave)

           Este término ejecuta una búsqueda completa de texto de
           palabra_clave en el almacén de paquetes de apt. Cuando se utiliza
           con “aptitude search”, Buscar → Limitar vista (l) en la interfaz
           de curses, o introducido en el espacio de la ventana de búsqueda
           de la interfaz de usuario GTK+, este término permite a aptitude
           acelerar la búsqueda usando un índice Xapian.

   ?term-prefix(palabra_clave)

           Este término ejecuta una búsqueda completa de texto de cualquier
           palabra clave que comienza con la palabra_clave en el almacén de
           paquetes de apt. Cuando se utiliza con “aptitude search”, Buscar →
           Limitar vista (l) en la interfaz de curses, o introducido en el
           espacio de la ventana de búsqueda de la interfaz de usuario GTK+,
           este término permite a aptitude acelerar la búsqueda usando un
           índice Xapian.

           Ésto es similar a ?term, pero empareja las extensiones de
           palabraclave. Por ejemplo, el siguiente patrón de búsqueda muestra
           todo paquete indexado bajo las palabras clave hour, hourglass,
           hourly, y así en adelante.

           Ejemplo 2.6. Uso del término ?term-prefix.

           ?term-prefix(hour)

   ?true, ~T

           Este término empareja todo paquete. Por ejemplo
           “?installed?provides(?true)” muestra los paquetes instalados que
           cualquier otro provee.

   ?upgradable, ~U

           Este término busca cualquier paquete instalado susceptible de
           actualización.

   ?user-tag(etiqueta)

           Este término busca todo paquete marcado con un «user-tag» que se
           corresponde con la expresión regular etiqueta.

   ?version(versión), ~Vversión

           Buscar cualquier versión de paquete cuyo número de versión se
           corresponde con la expresión regular versión, con las excepciones
           mencionadas posteriormente. Por ejemplo, “?version(debian)”
           muestra paquetes cuya versión contiene “debian”.

           Los siguientes valores de versión se tratan de manera específica.
           Para buscar un número de versión que contiene estos valores,
           preceda el valor con una barra inversa; por ejemplo, para
           encontrar versiones de paquetes cuyo número contiene CURRENT,
           busque con \CURRENT.

              o CURRENT busca la versión instalada del paquete, de existir.

              o CANDIDATE busca la versión, de existir, del paquete que se
                instalaría si pulsa + sobre el paquete o ejecuta aptitude
                install sobre el paquete.

              o TARGET busca la versión de un paquete marcado para su
                instalación, de existir.

   ?virtual, ~v

           Buscar cualquier paquete puramente virtual; esto es, que un
           paquete provee su nombre o que se menciona como dependencia, sin
           que exista ningún paquete con tal nombre. Por ejemplo
           “?virtual!?provides(?true)” muestra paquetes que son virtuales y
           que ningún otro paquete provee: declarados como dependencia pero
           que no existen.

   ?widen(patrón), ~Wpatrón

           “Extender” la búsqueda: si se ha usado un término de cierre (tales
           como ?depends) en la búsqueda de versiones, estos límites
           desaparecen. Por ello, ?widen(patrón) muestra la versión de un
           paquete si el patrón se corresponde con cualquier versión de ese
           paquete.

Personalizar aptitude

  Personalizar la lista de paquetes.

   Puede personalizar la lista de paquetes de varias maneras: la presentación
   de los paquetes, como se crea la jerarquía de paquetes, como se agrupan
   los paquetes e incluso configurar la pantalla principal.

    Personalizar la presentación de los paquetes

   Esta sección describe como configurar los contenidos y el formato de la
   lista de paquetes, la línea de estado y la de cabecera, así como la salida
   de aptitude search.

   Puede definir el formato de cada uno de estos espacios con una “cadena
   formato”. Una cadena formato es una cadena de texto que contiene escapes
   tales como % %p, %S, y más. La salida resultante se crea tomando el texto
   para reemplazar los escapes % de acuerdo a su significado (explicados a
   continuación).

   Un escape % puede tener un tamaño definido, en cuyo caso siempre se
   reemplazaría con la misma cantidad de texto (con espacios añadidos para
   rellenar si es necesario), o puede ser “ampliable”, tomando el espacio que
   las columnas de tamaño fijo no requieren. De existir varias columnas
   ampliables, el espacio se distribuye de manera equitativa.

   Todos los escapes % tienen un tamaño y/o capacidad de ampliación. Puede
   cambiar el tamaño de un escape % insertándolo entre % y el carácter que
   identifica el escape; por ejemplo, %20V genera la versión candidata del
   paquete, 20 caracteres de ancho. El ancho “básico” de la columna puede
   variar dependiendo del contenido si inserta un signo de interrogación (?)
   entre % y el carácter que identifica el escape. Cabe que las columnas
   resultantes no se puedan alinear verticalmente.

   Si desea poder ampliar un escape % en particular, a pesar de tener un
   ancho definido, inserte una celdilla (p. ej., “#”) a su derecha. Por
   ejemplo, para mostrar la versión candidata de un paquete sin importar su
   longitud, use la cadena formato %V#. Puede también insertar # después de
   algo que no es un escape %; aptitude “ampliará” el texto que precede a #
   añadiendo espacios tras él.

   En resumen, la sintaxis de un escape % es:

 %[ancho][?]código[#]

   Las variables de configuración Aptitude::UI::Package-Display-Format,
   Aptitude::UI::Package-Status-Format, y Aptitude::UI::Package-Header-Format
   definen la forma predeterminada de la lista de paquetes, la cabecera en lo
   alto de la lista de paquetes, y la línea de estado debajo de la lista de
   paquetes, respectivamente. Para cambiar la manera en que se muestran los
   resultados de una orden aptitude search, use la opción -F.

   Los siguientes escapes % están disponibles en cadenas formato:

   [Nota] Nota
          Algunas de las descripciones a continuación se refieren al
          “paquete”. En la interfaz gráfica de usuario (GUI), esto es el
          paquete que está visionando o el seleccionado; en la busca en línea
          de órdenes, esto es el paquete que está visionando

    Escape       Nombre          Tamaño      Ampliable      Descripción
                             predeterminado
                                                       Ésto no es realmente
                                                       un escape; sólo
   %%       Literal %        1               No        inserta un signo
                                                       porcentual en la
                                                       salida en el momento
                                                       en que aparece.
                                                       En algunas
                                                       circunstancias, una
                                                       cadena formato de
                                                       presentación puede
                                                       tener “parámetros”:
                                                       por ejemplo, en el
                                                       search de línea de
            Reemplazo de                               órdenes, los grupos
   %#número parámetro        Variable        No        encontrados en la
                                                       búsqueda se usan como
                                                       parámetros al
                                                       presentar el
                                                       resultado. El
                                                       parámetro, que se
                                                       indica con número,
                                                       reemplaza al código
                                                       del formato.
                                                       Una marca de un solo
                                                       carácter que resume
                                                       cualquier acción que
                                                       se va a ejecutar sobre
   %a       Marca de acción  1               No        el paquete, como se
                                                       describe en
                                                       Figura 2.10, “Valores
                                                       de la marca de
                                                       “acción””.
                                                       Una descripción algo
                                                       más detallada de la
   %A       Acción           10              No        acción que se va a
                                                       ejecutar sobre el
                                                       paquete.
                                                       Si no hay paquetes
                                                       rotos, no produce
                                                       nada. De otra forma,
   %B       Total rotos      12              No        genera una cadena como
                                                       por ejemplo “Broken:
                                                       10”, que describe el
                                                       número de paquetes
                                                       rotos.
                                                       Una marca de un solo
                                                       carácter que resume el
                                                       estado actual del
   %c       Marca de estado  1               No        paquete, como se
            actual                                     describe en
                                                       Figura 2.9, “Valores
                                                       de la marca de “estado
                                                       actual””.
                                                       Una descripción más
   %C       Estado actual    11              No        detallada del estado
                                                       actual del paquete.
   %d       Descripción      40              Si        La descripción corta
                                                       del paquete.
            El tamaño del                              El tamaño del fichero
   %D       paquete          8               No        de paquete que
                                                       contiene el paquete.
            Nombre del                                 El nombre del
   %H       anfitrión        15              No        ordenador en el que
            («host»)                                   ejecuta aptitude.
                                                       Mostrar la prioridad
                                                       más alta asignada a la
                                                       versión de un paquete;
                                                       para paquetes, muestra
   %i       Prioridad pin    4               No        la prioridad de la
                                                       versión que se va a
                                                       instalar de forma
                                                       predeterminada (de
                                                       existir).
                                                       El espacio aproximado
   %I       Tamaño instalado 8               No        que el paquete ocupará
                                                       en el disco duro.
   %m       Desarrollador    30              Si        El desarrollador del
                                                       paquete.
                                                       Si el paquete esta
            Marca de                                   automáticamente
   %M       automático       1               No        instalado, da como
                                                       salida “A”; si no, no
                                                       devuelve nada.
                                                       Mostrar la versión de
   %n       Versión del      La longitud de  No        aptitude que está
            programa         “0.6.8.2”.                ejecutando,
                                                       actualmente “0.6.8.2”.
                                                       Mostrar el nombre del
   %N       Nombre del       La longitud del No        programa;
            programa         nombre.                   generalmente,
                                                       “aptitude”.
                                                       Si no se va a instalar
                                                       ningún paquete, no
                                                       muestra nada. De otra
                                                       forma, muestra una
                                                       cadena que describe el
   %o       TamDescarga      17              No        tamaño total de todos
                                                       los paquetes que va a
                                                       instalar (una
                                                       estimación de cuanto
                                                       necesita descargar);
                                                       por ejemplo “TamDesc:
                                                       1000B”.
                                                       Mostrar el nombre del
                                                       paquete. Cuando vea un
                                                       paquete en un contexto
            Nombre del                                 de árbol, su nombre
   %p       paquete          30              Si        estará en negrita, de
                                                       ser posible, de
                                                       acuerdo a su
                                                       profundidad en el
                                                       árbol.
   %P       Prioridad        9               No        Mostrar la prioridad
                                                       de un paquete.
            Total de                                   Mostrar el número
   %r       dependencias     2               No        aproximado de paquetes
            inversas                                   instalados que
                                                       dependen del paquete.
                                                       Mostrar una
                                                       descripción abreviada
   %R       Prioridad        3               No        de la prioridad de un
            abreviada                                  paquete: por ejemplo
                                                       “Important” pasa a ser
                                                       “Imp”.
   %s       Sección          10              No        Mostrar la sección del
                                                       paquete
            Estado de                                  Mostrar la letra «U»
   %S       confianza        1               No        si el paquete no está
                                                       firmado.
                                                       El archivo en el que
   %t       Archivo          10              Si        se encuentra el
                                                       paquete.
                                                       Mostrar “*” si el
                                                       paquete está
   %T       Etiqueta         1               No        etiquetado, de no ser
                                                       así, no devuelve
                                                       nada.^[19]
                                                       Si las acciones
                                                       seleccionadas van a
                                                       alterar la cantidad de
                                                       espacio usado en el
            Cambio de uso de                           disco, muestra la
   %u       disco            30              No        descripción del cambio
                                                       en el espacio del
                                                       disco duro; por
                                                       ejemplo “Se usará
                                                       100MB de espacio en
                                                       disco.”
                                                       Mostrar la versión
   %v       Versión actual   14              No        instalada del paquete,
                                                       o <none> si el paquete
                                                       no está instalado.
                                                       Mostrar la versión del
                                                       paquete que puede
            Versión                                    instalar si ejecuta
   %V       candidata        14              No        Paquete → Instalar (+)
                                                       sobre el paquete, o
                                                       <none> si el paquete
                                                       no está disponible.
                                                       Mostrar cuanto espacio
                                                       adicional se va a
   %Z       Cambio de        9               No        usar, o cuanto espacio
            espacio                                    se va a liberar al
                                                       instalar, actualizar o
                                                       eliminar un paquete.

    Personalizar la jerarquía de paquetes

   La jerarquía de paquetes se genera a través de una directriz de
   agrupación: reglas que describen como se debe construir la jerarquía. Una
   directriz de agrupación describe una “segmentación” de reglas; cada regla
   puede descartar paquetes, crear sub-jerarquías en los cuales los paquetes
   residen, o manipular el árbol. Los elementos de configuración
   Aptitude::UI::Default-Grouping y Aptitude::UI::Default-Preview-Grouping
   definen las directrices de agrupación para listas de paquetes recién
   creadas y pantallas de previsualización, respectivamente. Puede configurar
   la directriz de agrupación para la lista de paquetes actual pulsando G.

   Una directriz de agrupación se describe con una lista separada por comas
   de reglas: regla1,regla2,.... Cada regla consiste de su nombre,
   posiblemente seguido de argumentos: por ejemplo, versions o
   section(subdir). El tipo de regla determina si se necesitan argumentos, y
   cuantos.

   Una regla puede ser no-terminal o terminal. Una regla no-terminal procesa
   un paquete generando parte de la jerarquía, para después filtrar el
   paquete con otra regla. Una regla terminal, por otra parte, también genera
   parte del árbol (por lo general, elementos correspondientes al paquete),
   pero no filtra el paquete con otra regla posterior. Si no se define una
   regla terminal, aptitude utiliza la regla predeterminada, que es crear los
   “elementos de paquete” estándar.

 action

           Agrupar paquetes de acuerdo a la acción que se va a realizar sobre
           ellos; se ignorarán paquetes sin cambios y no actualizables. Éste
           es el agrupamiento que se emplea en los árboles de
           previsualización.

 arquitectura

           Agrupa paquetes de acuerdo a su arquitectura.

 deps

           Ésta es una regla terminal.

           Creación de elementos de paquete estándar que puede expandir para
           mostrar las dependencias del paquete.

 filter(patrón)

           Incluir sólo paquetes con al menos una versión que coincide con
           patrón.

           No descartar ningún paquete si “no hay” un patrón. Ésta es una
           característica de compatibilidad inversa y puede quedar obsoleta
           en el futuro.

 firstchar

           Agrupar paquetes en base al primer carácter del nombre.

 hier

           Agrupar paquetes de acuerdo a un fichero de datos adicional que
           describe una “jerarquía” de paquetes.

 pattern(patrón [=> título] [{ directriz }] [, ...])

           Una directriz de agrupación que puede personalizar. Cada versión
           de cada paquete se compara con el patrón dado. La primera
           correspondencia se emplea para asignar un título al paquete;
           entonces, los paquetes se agrupan según su título. Las cadenas con
           forma \N que aparecen en título se reemplazan por el enésimo
           resultado de la búsqueda. Si título no está presente, se toma como
           \1. Observe que los paquetes que no se corresponden con ningún
           patrón no aparecen en el árbol.

           Ejemplo 2.7. Uso de pattern (patrón) para agrupar paquetes en base
           a su desarrollador.

           pattern(?maintainer() => \1)

           El ejemplo anterior agrupa paquetes de acuerdo al campo de
           desarrollador. La directriz pattern(?maintainer()) realiza la
           misma función, al igual que un título ausente pasa a ser \1 de
           manera predeterminada.

           Cabe que una entrada finalice en ||, en lugar de => título. Esto
           indica que los paquetes que se corresponden con patrón se
           insertaran en el árbol al mismo nivel que el agrupación patrón, en
           lugar de insertarlos en sub-árboles.

           Ejemplo 2.8. Uso de pattern con algunos paquetes del nivel
           superior.

           pattern(?action(remove) => Packages Being Removed, ?true ||)

           El ejemplo anterior muestra las paquetes que se van a eliminar en
           un sub-árbol, y muestra todos los demás paquetes en el nivel
           actual, agrupados de acuerdo a las directrices que sigue pattern
           (patrón).

           De manera predeterminada, todos los paquetes que se corresponden
           con cada patrón se agrupan de acuerdo a las reglas que sigue la
           directriz del pattern. Para definir una directriz diferente para
           algunos paquetes, describa la directriz entre llaves ({}) a
           continuación del titulo del grupo, después de ||, o después del
           patrón, en caso de que ninguno este presente. Por ejemplo:

           Ejemplo 2.9. Uso de la directriz de agrupación pattern con
           sub-directrices.

           pattern(?action(remove) => Packages Being Removed {},
           ?action(install) => Packages Being Installed, ?true || {status})

           La directriz del ejemplo anterior tiene los siguientes efectos:

              o Los paquetes que se van a eliminar se muestran en un
                sub-árbol etiquetado “Paquetes que se eliminarán”; la
                directriz de agrupación para este sub-árbol esta vacío, con
                lo cual se muestran los paquetes en una lista plana.

              o Los paquetes que se van a instalar se muestran en un árbol
                etiquetado Paquetes que se instalarán y agrupados de acuerdo
                a las directrices que sigue pattern.

              o Todos los paquetes restantes se ubican en el nivel mas alto
                del árbol, agrupados de acuerdo a su estado.

           Véase “Patrones de búsqueda” para más información acerca del
           formato de patrón.

 prioridad

           Agrupar paquetes de acuerdo a su prioridad.

 section[(modo[,passthrough])]

           Agrupar paquetes de acuerdo a su campo de Sección.

           modo puede ser uno de los siguientes:

                none

                        Agrupar en base a todo el campo de la sección, con lo
                        cual se crean categorías tales como “non-free/games”.
                        Ésta es la manera predeterminada si no se especifica
                        el modo.

                topdir

                        Agrupar en base a la parte del campo de la sección
                        antes del primer signo /; si esta parte de la sección
                        no se reconoce, o si no hay un / se usará la primera
                        entrada en la lista Aptitude::Sections::Top-Sections.

                subdir

                        Agrupar en base a la parte del campo de sección
                        después del primer signo /, de estar en la lista
                        Aptitude::Sections::Top-Sections. En caso contrario,
                        o en ausencia de /, agrupa en base a todo el campo de
                        la sección.

                subdirs

                        Agrupar en base a la parte del campo de la Sección
                        después del primer signo /, si la porción del campo
                        que lo antecede está dentro de la lista
                        Aptitude::Sections::Top-Sections; si no, o en
                        ausencia de /, se usará todo el campo. Si hay varios
                        signos / en la porción del campo que esta en uso, se
                        formará una jerarquía de grupos. Por ejemplo, si
                        “games” no es un miembro de
                        Aptitude::Sections::Top-Sections, entonces un paquete
                        con una sección de “games/arcade” se colocará debajo
                        de la cabecera de nivel superior “games”, en un
                        sub-árbol llamado “arcade”.

           En presencia de passthrough, aquellos paquetes que por una razón u
           otra no tienen una sección real (por ejemplo, paquetes virtuales)
           pasarán directamente al siguiente nivel de agrupación sin ser
           primero colocados en sub-categorías.

 status

           Agrupar paquetes en las siguientes categorías:

              o Actualizaciones de seguridad

              o Actualizables

              o Nuevo

              o Instalados

              o No instalados

              o Obsoletos y creados localmente

              o Virtuales

 source

           Agrupa paquetes de acuerdo a su nombre de paquete fuente.

 tag[(faceta)]

           Agrupar paquetes de acuerdo a la información «Tag» (etiqueta)
           guardado en los ficheros de paquetes Debian. Si introduce faceta
           solo se mostrarán las marcas correspondientes a esta faceta, y se
           ocultarán los paquetes que no poseen esta faceta; de otra forma,
           se muestran todos los paquetes al menos una vez (con paquetes sin
           etiquetar listados separadamente de los paquetes etiquetados).

           Para más información acerca de debtags, consulte
           http://debtags.alioth.debian.org.

 task

           Crear un árbol llamado “Tareas” que contiene las tareas
           disponibles (la información acerca de las tareas es extraída de
           debian-tasks.desc, en el paquete tasksel). La regla que sigue a
           tarea creará sus categorías como hermanos de Tareas.

 versions

           Ésta es una regla terminal.

           Crear elementos estándar de paquete que se pueden expandir para
           mostrar las versiones del paquete.

    Personalizar cómo se ordenan los paquetes

   Por omisión, los paquetes en la lista de paquetes o en la salida de
   aptitude search se ordenan por nombre. De todas formas, a menudo es
   bastante útil ordenarlos de acuerdo a otros criterios (por ejemplo, por
   tamaño de paquete), y aptitude le permite hacer precisamente esto
   modificando la directriz de ordenación.

   Al igual que la directriz de agrupación descrita en la sección anterior,
   la directriz de ordenación es una lista separada por comas. Cada elemento
   de la lista es el nombre de una regla de ordenación; si hay paquetes
   “iguales” de acuerdo a la primera regla, se emplea la segunda regla para
   ordenarlos, y así en adelante. Insertar un signo de tilde (~) delante de
   una regla revierte el significado normal de esa regla. Por ejemplo,
   priority,~name ordena paquetes por prioridad, pero los paquetes con la
   misma prioridad se colocarán en orden inverso de acuerdo a su nombre.

   Para modificar la directriz de ordenación en una lista de paquetes activa,
   pulse S. Para modificar la ordenación predeterminada de todas las listas
   de paquetes, configure la opción de configuración
   Aptitude::UI::Default-Sorting. Para modificar la directriz de ordenación
   de búsqueda en aptitude, use la opción de línea de órdenes --sort.

   Las reglas disponibles son:

   installsize

           Ordenar paquetes según la cantidad estimada de espacio que
           necesitan cuando se instalan.

   name

           Ordenar paquetes por nombre.

   priority

           Ordenar paquetes por prioridad.

   version

           Ordenar paquetes de acuerdo a su número de versión.

  Personalizar teclas rápidas.

   Puede personalizar las teclas empleadas para activar órdenes en aptitude
   en el fichero de configuración. Cada orden tiene una variable de
   configuración asociada en Aptitude::UI::Keybindings; para cambiar la tecla
   ligada a una orden, simplemente configure la variable correspondiente a la
   tecla. Por ejemplo, para hacer que la tecla s realice una búsqueda, cambie
   Aptitude::UI::Keybindings::Search a “s”. Puede precisar que la tecla se
   debe pulsar «Control» introduciendo “C-” delante de la tecla: por ejemplo,
   introducir “C-s” en vez de “s” ligaría la búsqueda a Control+s en vez de a
   s. Por último, puede ligar la misma orden a diferentes teclas de una sola
   vez usando una lista separada por comas: por ejemplo, introducir “s,C-s”
   causaría que ambos s y Control+s ejecutasen una búsqueda.

   Las siguientes órdenes pueden ligarse a teclas configurando la variable
   Aptitude::UI::Keybindings::orden, donde orden es el nombre de la orden que
   se va ligar:

   +------------------------------------------------------------------------+
   |         Orden          | Predeterminado  |         Descripción         |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Si hay paquetes rotos y     |
   |                        |                 | aptitude ha sugerido una    |
   | ApplySolution          | !               | solución al problema,       |
   |                        |                 | aplicar inmediatamente la   |
   |                        |                 | solución.                   |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Desplazarse al inicio de la |
   |                        |                 | pantalla actual: a lo alto  |
   | Begin                  | home,C-a        | de una lista, o a la        |
   |                        |                 | izquierda de una entrada de |
   |                        |                 | texto en un campo.          |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Informar de un fallo en el  |
   | BugReport              | B               | paquete seleccionado        |
   |                        |                 | actualmente, empleando      |
   |                        |                 | reportbug.                  |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Cancelar la interacción     |
   |                        |                 | actual: por ejemplo,        |
   | Cancel                 | C-g,escape,C-[  | descarta una ventana de     |
   |                        |                 | dialogo o desactiva el      |
   |                        |                 | menú.                       |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Mostrar el changelog.Debian |
   |                        |                 | (registro de cambios        |
   | Changelog              | C               | Debian) del paquete         |
   |                        |                 | seleccionado o de la        |
   |                        |                 | versión del paquete.        |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Modificar la directriz de   |
   | ChangePkgTreeGrouping  | G               | agrupación de la lista de   |
   |                        |                 | paquetes activa en ese      |
   |                        |                 | momento.                    |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Modificar el limite de la   |
   | ChangePkgTreeLimit     | l               | lista de paquetes           |
   |                        |                 | actualmente activa.         |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Modificar la directriz de   |
   | ChangePkgTreeSorting   | S               | ordenación de la lista de   |
   |                        |                 | paquetes activa.            |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Marcar el paquete           |
   | ClearAuto              | m               | seleccionado como           |
   |                        |                 | manualmente instalado.      |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Cerrar el árbol             |
   | CollapseAll            | ]               | seleccionado y todas sus    |
   |                        |                 | ramas en una lista          |
   |                        |                 | jerárquica.                 |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Cerrar el árbol             |
   | CollapseTree           | Sin ligar       | seleccionado en una lista   |
   |                        |                 | jerárquica.                 |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | En el editor de jerarquías, |
   |                        |                 | almacena la posición del    |
   | Commit                 | N               | paquete actual en la        |
   |                        |                 | jerarquía y procede al      |
   |                        |                 | siguiente paquete.          |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Esto equivale a pulsar “Ok” |
   |                        |                 | en los cuadros de dialogo;  |
   |                        |                 | si está interactuando con   |
   | Confirm                | enter           | una pregunta de elección    |
   |                        |                 | múltiple de la línea de     |
   |                        |                 | estado, elige la opción     |
   |                        |                 | predeterminada.             |
   |------------------------+-----------------+-----------------------------|
   | Cycle                  | tab             | Cambiar el foco del teclado |
   |                        |                 | al siguiente “componente”.  |
   |------------------------+-----------------+-----------------------------|
   | CycleNext              | f6              | Pasar a la siguiente vista  |
   |                        |                 | activa.                     |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Pasar por organizaciones    |
   | CycleOrder             | o               | predeterminadas de la       |
   |                        |                 | pantalla.                   |
   |------------------------+-----------------+-----------------------------|
   | CyclePrev              | f7              | Pasar a la anterior vista   |
   |                        |                 | activa.                     |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Eliminar todo el texto      |
   | DelBOL                 | C-u             | entre el cursor y el inicio |
   |                        |                 | de la línea.                |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Eliminar el carácter        |
   | DelBack                | backspace,C-h   | precedente al insertar      |
   |                        |                 | texto.                      |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Eliminar todo el texto      |
   | DelEOL                 | C-k             | desde el cursor al final de |
   |                        |                 | la línea.                   |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Eliminar el carácter bajo   |
   | DelForward             | delete,C-d      | el cursor al insertar       |
   |                        |                 | texto.                      |
   |------------------------+-----------------+-----------------------------|
   | Dependencies           | d               | Mostrar las dependencias    |
   |                        |                 | del paquete seleccionado.   |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Cuando examina la lista de  |
   | DescriptionCycle       | i               | paquetes, realiza un ciclo  |
   |                        |                 | de las vistas disponibles   |
   |                        |                 | en el área de información.  |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Cuando examina la lista de  |
   | DescriptionDown        | z               | paquetes, desplaza el área  |
   |                        |                 | de información una línea    |
   |                        |                 | más abajo.                  |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Cuando examina la lista de  |
   | DescriptionUp          | a               | paquetes, desplaza el área  |
   |                        |                 | de información una línea    |
   |                        |                 | hacia arriba.               |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Si no está en la pantalla   |
   |                        |                 | de previsualización,        |
   |                        |                 | muestra una pantalla de     |
   | DoInstallRun           | g               | previsualización^[a]; de    |
   |                        |                 | estar viendo esta pantalla, |
   |                        |                 | ejecuta un proceso de       |
   |                        |                 | instalación.                |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Desplazarse hacia abajo:    |
   |                        |                 | por ejemplo, desplaza el    |
   | Down                   | down,j          | texto hacia abajo o         |
   |                        |                 | selecciona el siguiente     |
   |                        |                 | elemento de la lista.       |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Ejecutar “dpkg-reconfigure” |
   | DpkgReconfigure        | R               | sobre el paquete            |
   |                        |                 | seleccionado.               |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | De haber paquetes rotos,    |
   |                        |                 | registra el estado actual   |
   | DumpResolver           | *               | del solucionador de         |
   |                        |                 | problemas en un fichero     |
   |                        |                 | (para corregir errores).    |
   |------------------------+-----------------+-----------------------------|
   | EditHier               | E               | Abrir el editor de          |
   |                        |                 | jerarquías.                 |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Desplazarse al final de la  |
   |                        |                 | pantalla actual: al final   |
   | End                    | end,C-e         | de la lista, o a la derecha |
   |                        |                 | de un campo de entrada de   |
   |                        |                 | texto.                      |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Si hay paquetes rotos y     |
   |                        |                 | aptitude ha sugerido una    |
   | ExamineSolution        | e               | solución, muestra una       |
   |                        |                 | ventana de dialogo con una  |
   |                        |                 | descripción detallada de la |
   |                        |                 | solución propuesta.         |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Expandir el árbol           |
   | ExpandAll              | [               | seleccionado y todas sus    |
   |                        |                 | ramas en una lista          |
   |                        |                 | jerárquica.                 |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Expandir el árbol           |
   | ExpandTree             | Sin ligar       | seleccionado en una lista   |
   |                        |                 | jerárquica.                 |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Selecciona la primera       |
   | FirstSolution          | <               | solución generada por el    |
   |                        |                 | solucionador de problemas.  |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Prohibir que un paquete se  |
   | ForbidUpgrade          | F               | actualice a la versión      |
   |                        |                 | disponible (o a una versión |
   |                        |                 | en particular).             |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Descartar toda información  |
   |                        |                 | relativa a qué paquetes son |
   | ForgetNewPackages      | f               | “nuevos” (vacía la lista de |
   |                        |                 | paquetes “Paquetes          |
   |                        |                 | nuevos”).                   |
   |------------------------+-----------------+-----------------------------|
   | Help                   | ?               | Mostrar la pantalla de      |
   |                        |                 | ayuda en línea.             |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Desplazarse hacia delante   |
   | HistoryNext            | down,C-n        | en la historia, en un       |
   |                        |                 | editor de línea con         |
   |                        |                 | historia.                   |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Desplazarse hacia atrás en  |
   | HistoryPrev            | up,C-p          | la historia, en un editor   |
   |                        |                 | de línea con historia.      |
   |------------------------+-----------------+-----------------------------|
   | Hold                   | =               | Retener un paquete.         |
   |------------------------+-----------------+-----------------------------|
   | Install                | +               | Marcar un paquete para su   |
   |                        |                 | instalación.                |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Marcar un solo paquete para |
   |                        |                 | su instalación; todos los   |
   | InstallSingle          | I               | otros paquetes se           |
   |                        |                 | mantendrán en su versión    |
   |                        |                 | actual.                     |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Cancelar cualquier petición |
   |                        |                 | de instalación o            |
   | Keep                   | :               | eliminación así como todas  |
   |                        |                 | las retenciones en un       |
   |                        |                 | paquete.                    |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Selecciona la última        |
   | LastSolution           | <               | solución generada por el    |
   |                        |                 | solucionador de problemas.  |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Desplazarse a la izquierda: |
   |                        |                 | por ejemplo, mueve un menú  |
   | Left                   | left,h          | a la izquierda de la barra  |
   |                        |                 | de menú, o desplaza el      |
   |                        |                 | cursor a la izquierda si    |
   |                        |                 | edita texto.                |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | En una lista jerárquica,    |
   |                        |                 | selecciona el siguiente     |
   |                        |                 | hermano del elemento        |
   | LevelDown              | J               | actualmente seleccionado    |
   |                        |                 | (el siguiente elemento del  |
   |                        |                 | mismo nivel con la misma    |
   |                        |                 | rama padre).                |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | En una lista jerárquica,    |
   |                        |                 | selecciona el hermano       |
   | LevelUp                | K               | anterior al elemento        |
   |                        |                 | seleccionado (el elemento   |
   |                        |                 | anterior del mismo nivel    |
   |                        |                 | con la misma rama padre).   |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Intenta actualizar todos    |
   | MarkUpgradable         | U               | los paquetes que no están   |
   |                        |                 | retenidos o prohibidos de   |
   |                        |                 | actualización.              |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | En el Buscaminas, pone o    |
   | MineFlagSquare         | f               | quita una marca en el       |
   |                        |                 | cuadrado.                   |
   |------------------------+-----------------+-----------------------------|
   | MineLoadGame           | L               | Cargar una partida del      |
   |                        |                 | Buscaminas.                 |
   |------------------------+-----------------+-----------------------------|
   | MineSaveGame           | S               | Guardar una partida del     |
   |                        |                 | Buscaminas.                 |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Buscar en torno a la        |
   | MineSweepSquare        | Sin ligar       | casilla actual en el        |
   |                        |                 | Buscaminas.                 |
   |------------------------+-----------------+-----------------------------|
   | MineUncoverSquare      | Sin ligar       | Descubrir la casilla        |
   |                        |                 | presente en el Buscaminas.  |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Descubrir la casilla        |
   |                        |                 | presente en el Buscaminas   |
   | MineUncoverSweepSquare | enter           | en caso de estar oculta; de |
   |                        |                 | no estarlo, busca en torno  |
   |                        |                 | suyo.                       |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Desplazar la pantalla       |
   | NextPage               | pagedown,C-f    | actual a la siguiente       |
   |                        |                 | página.                     |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Conducir al solucionador de |
   | NextSolution           | .               | dependencias a la siguiente |
   |                        |                 | solución.                   |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Esta tecla seleccionará el  |
   | No                     | n^[b]           | botón “no” en los cuadros   |
   |                        |                 | de dialogo si/no.           |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Selecciona la rama padre    |
   | Parent                 | ^               | del elemento seleccionado   |
   |                        |                 | en la lista jerárquica.     |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Desplazar la pantalla       |
   | PrevPage               | pageup,C-b      | actual a la página          |
   |                        |                 | anterior.                   |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Devolver el solucionador de |
   | PrevSolution           | ,               | dependencias a la solución  |
   |                        |                 | anterior.                   |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Marcar el paquete           |
   | Purge                  | _               | seleccionado para ser       |
   |                        |                 | purgado.                    |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Activar el botón            |
   | PushButton             | space,enter     | seleccionado actualmente, o |
   |                        |                 | conmuta una casilla.        |
   |------------------------+-----------------+-----------------------------|
   | Quit                   | q               | Cierra la vista actual.     |
   |------------------------+-----------------+-----------------------------|
   | QuitProgram            | Q               | Salir del programa.         |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Rechazar toda acción del    |
   |                        |                 | solucionador que rompe una  |
   | RejectBreakHolds       |                 | retención; equivale a       |
   |                        |                 | Solucionador → Rechazar     |
   |                        |                 | romper bloqueos.            |
   |------------------------+-----------------+-----------------------------|
   | Refresh                | C-l             | Redibujar la pantalla desde |
   |                        |                 | cero.                       |
   |------------------------+-----------------+-----------------------------|
   | Remove                 | -               | Marcar un paquete para su   |
   |                        |                 | eliminación.                |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Marcar el paquete           |
   | ReInstall              | L               | seleccionado para su        |
   |                        |                 | reinstalación.              |
   |------------------------+-----------------+-----------------------------|
   | RepeatSearchBack       | N               | Repitir la ultima búsqueda, |
   |                        |                 | en dirección inversa.       |
   |------------------------+-----------------+-----------------------------|
   | ReSearch               | n               | Repitir la ultima búsqueda. |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Mostrar paquetes qué        |
   | ReverseDependencies    | r               | dependen del paquete        |
   |                        |                 | actualmente seleccionado.   |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Desplazarse a la derecha:   |
   |                        |                 | por ejemplo, desplazarse a  |
   | Right                  | right,l         | un menú a la derecha, en la |
   |                        |                 | barra de menú, o desplazar  |
   |                        |                 | el cursor a la derecha la   |
   |                        |                 | editar texto.               |
   |------------------------+-----------------+-----------------------------|
   | SaveHier               | S               | Guardar la jerarquía actual |
   |                        |                 | en el editor de jerarquías. |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Activar la función de       |
   | Search                 | /               | “búsqueda” del elemento de  |
   |                        |                 | interfaz actualmente        |
   |                        |                 | activo.                     |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Activar la función de       |
   | SearchBack             | \               | “búsqueda inversa” del      |
   |                        |                 | elemento de interfaz        |
   |                        |                 | actualmente activo.         |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | En un árbol de paquetes,    |
   | SearchBroken           | b               | busca el siguiente paquete  |
   |                        |                 | roto.                       |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Marcar el paquete           |
   | SetAuto                | M               | seleccionado como instalado |
   |                        |                 | automáticamente.            |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | En un lista de paquetes,    |
   | ShowHideDescription    | D               | conmuta si el área de       |
   |                        |                 | información es visible o    |
   |                        |                 | no.                         |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Cuando examina una          |
   |                        |                 | solución, marca la acción   |
   | SolutionActionApprove  | a               | actualmente seleccionada    |
   |                        |                 | como «aprobada» (se         |
   |                        |                 | incluirá en soluciones      |
   |                        |                 | futuras, de ser posible).   |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Cuando examina una          |
   |                        |                 | solución, marca la solución |
   | SolutionActionReject   | r               | actualmente seleccionado    |
   |                        |                 | como «rechazada»            |
   |                        |                 | (descartada en soluciones   |
   |                        |                 | futuras).                   |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Expandir o cerrar el árbol  |
   | ToggleExpanded         | enter           | seleccionado en una lista   |
   |                        |                 | jerárquica.                 |
   |------------------------+-----------------+-----------------------------|
   | ToggleMenuActive       | C-m,f10,C-space | Activar o desactivar el     |
   |                        |                 | menú principal.             |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Cancelar la última acción,  |
   |                        |                 | hasta el punto en que       |
   | Undo                   | C-_,C-u         | inició aptitude, o hasta la |
   |                        |                 | última vez que actualizó la |
   |                        |                 | lista de paquetes o instaló |
   |                        |                 | paquetes.                   |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Desplazarse hacia arriba:   |
   |                        |                 | por ejemplo, desplaza un    |
   | Up                     | up,k            | texto arriba o selecciona   |
   |                        |                 | el elemento anterior en una |
   |                        |                 | lista.                      |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Actualizar la lista de      |
   |                        |                 | paquetes mediante la        |
   | UpdatePackageList      | u               | obtención de listas nuevas  |
   |                        |                 | a través de Internet si es  |
   |                        |                 | necesario.                  |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Mostrar las versiones       |
   | Versions               | v               | disponibles del paquete     |
   |                        |                 | seleccionado.               |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Esta tecla selecciona el    |
   | Yes                    | y ^[b]          | botón “Si” en los cuadros   |
   |                        |                 | de dialogo Si/No.           |
   |------------------------------------------------------------------------|
   | ^[a] a menos que Aptitude::Display-Planned-Action tiene valor de       |
   | «false».                                                               |
   |                                                                        |
   | ^[b] Esta configuración predeterminada puede variar con diferentes     |
   | locales.                                                               |
   +------------------------------------------------------------------------+

   Además de las teclas de letras, números y puntuación, puede ligar las
   siguientes teclas “especiales”:

   +------------------------------------------------------------------------+
   | Nombre de la tecla |                    Descripción                    |
   |--------------------+---------------------------------------------------|
   | a1                 | La tecla A1.                                      |
   |--------------------+---------------------------------------------------|
   | a3                 | La tecla A3.                                      |
   |--------------------+---------------------------------------------------|
   | b2                 | La tecla B2.                                      |
   |--------------------+---------------------------------------------------|
   | backspace          | La tecla de retroceso.                            |
   |--------------------+---------------------------------------------------|
   | backtab            | La tecla tabulado de retroceso.                   |
   |--------------------+---------------------------------------------------|
   | begin              | La tecla Comenzar (no Inicio)                     |
   |--------------------+---------------------------------------------------|
   | break              | La tecla de “pausa”.                              |
   |--------------------+---------------------------------------------------|
   | c1                 | La tecla C1.                                      |
   |--------------------+---------------------------------------------------|
   | c3                 | La tecla C3.                                      |
   |--------------------+---------------------------------------------------|
   | cancel             | La tecla Cancelar.                                |
   |--------------------+---------------------------------------------------|
   | create             | La tecla Crear.                                   |
   |--------------------+---------------------------------------------------|
   |                    | Coma (,) -- observe que debido a que las comas se |
   | comma              | emplean para listar teclas, esta es la única      |
   |                    | manera de ligar una coma a una acción.            |
   |--------------------+---------------------------------------------------|
   | command            | La tecla de Orden.                                |
   |--------------------+---------------------------------------------------|
   | copy               | La tecla Copiar.                                  |
   |--------------------+---------------------------------------------------|
   | delete             | La tecla Suprimir.                                |
   |--------------------+---------------------------------------------------|
   | delete_line        | La tecla “borrar línea”.                          |
   |--------------------+---------------------------------------------------|
   | down               | La tecla de dirección “abajo”.                    |
   |--------------------+---------------------------------------------------|
   | end                | La tecla Fin.                                     |
   |--------------------+---------------------------------------------------|
   | entry              | La tecla Intro.                                   |
   |--------------------+---------------------------------------------------|
   | exit               | La tecla Salir.                                   |
   |--------------------+---------------------------------------------------|
   | f1, f2, ..., f10   | Las teclas desde F1 a F10.                        |
   |--------------------+---------------------------------------------------|
   | find               | La tecla Buscar.                                  |
   |--------------------+---------------------------------------------------|
   | home               | La tecla Inicio.                                  |
   |--------------------+---------------------------------------------------|
   | insert             | La tecla Insertar.                                |
   |--------------------+---------------------------------------------------|
   | insert_exit        | La tecla “insertar salir”.                        |
   |--------------------+---------------------------------------------------|
   | clear              | La tecla “borrar”.                                |
   |--------------------+---------------------------------------------------|
   | clear_eol          | La tecla “borrar hasta final de línea”.           |
   |--------------------+---------------------------------------------------|
   | clear_eos          | La tecla “borrar hasta final de pantalla”.        |
   |--------------------+---------------------------------------------------|
   | insert_line        | La tecla “insertar línea”.                        |
   |--------------------+---------------------------------------------------|
   | left               | La tecla de dirección “izquierda”.                |
   |--------------------+---------------------------------------------------|
   | mark               | La tecla Marcar.                                  |
   |--------------------+---------------------------------------------------|
   | message            | La tecla Mensaje.                                 |
   |--------------------+---------------------------------------------------|
   | move               | La tecla Mover.                                   |
   |--------------------+---------------------------------------------------|
   | next               | La tecla Siguiente.                               |
   |--------------------+---------------------------------------------------|
   | open               | La tecla Abrir.                                   |
   |--------------------+---------------------------------------------------|
   | previous           | La tecla Anterior.                                |
   |--------------------+---------------------------------------------------|
   | print              | La tecla Imprimir.                                |
   |--------------------+---------------------------------------------------|
   | redo               | La tecla Rehacer.                                 |
   |--------------------+---------------------------------------------------|
   | reference          | La tecla Referencia.                              |
   |--------------------+---------------------------------------------------|
   | refresh            | La tecla Refrescar.                               |
   |--------------------+---------------------------------------------------|
   | replace            | La tecla Reemplazar.                              |
   |--------------------+---------------------------------------------------|
   | restart            | La tecla Reiniciar.                               |
   |--------------------+---------------------------------------------------|
   | resume             | La tecla Continuar.                               |
   |--------------------+---------------------------------------------------|
   | return             | La tecla de Retorno.                              |
   |--------------------+---------------------------------------------------|
   | right              | La tecla de dirección “derecha”.                  |
   |--------------------+---------------------------------------------------|
   | save               | La tecla Guardar.                                 |
   |--------------------+---------------------------------------------------|
   | scrollf            | La tecla “desplazarse hacia delante”.             |
   |--------------------+---------------------------------------------------|
   | scrollr            | La tecla “desplazarse hacia atrás”.               |
   |--------------------+---------------------------------------------------|
   | select             | La tecla Seleccionar.                             |
   |--------------------+---------------------------------------------------|
   | suspend            | La tecla Suspender.                               |
   |--------------------+---------------------------------------------------|
   | pagedown           | La tecla “Avpág”.                                 |
   |--------------------+---------------------------------------------------|
   | pageup             | La tecla “Repág”.                                 |
   |--------------------+---------------------------------------------------|
   | space              | La tecla Espacio.                                 |
   |--------------------+---------------------------------------------------|
   | tab                | La tecla Tabulador.                               |
   |--------------------+---------------------------------------------------|
   | undo               | La tecla Deshacer.                                |
   |--------------------+---------------------------------------------------|
   | up                 | La tecla de dirección “arriba”.                   |
   +------------------------------------------------------------------------+

   Además de poder ligar las teclas de manera global, también es posible
   cambiar teclas ligadas para una parte en particular (o dominio) de
   aptitude: por ejemplo, para hacer que el tabulador sea el equivalente a la
   tecla de dirección derecha en la barra de menú, defina
   Aptitude::UI::Keybindings::Menubar::Right como “tab,right”. Los siguientes
   dominios están disponibles:

   +------------------------------------------------------------------------+
   |    Dominio    |                      Descripción                       |
   |---------------+--------------------------------------------------------|
   | EditLine      | Empleado por elementos de edición de línea, tales como |
   |               | el campo de entrada en un dialogo de “búsqueda”.       |
   |---------------+--------------------------------------------------------|
   | Menu          | Empleado por los menús que se abren hacia abajo.       |
   |---------------+--------------------------------------------------------|
   | Menubar       | Empleado por la barra de menú en la parte alta de la   |
   |               | pantalla.                                              |
   |---------------+--------------------------------------------------------|
   | Minesweeper   | Empleado por el modo Buscaminas.                       |
   |---------------+--------------------------------------------------------|
   |               | Empleado por las preguntas de elección múltiple que    |
   | MinibufChoice | aparecen si escoge que ciertas preguntas aparezcan en  |
   |               | la línea de estado.                                    |
   |---------------+--------------------------------------------------------|
   | Pager         | Empleado cuando se muestra un fichero del disco (por   |
   |               | ejemplo, el texto de ayuda).                           |
   |---------------+--------------------------------------------------------|
   |               | Empleado por paquetes, árboles de paquetes, versiones  |
   | PkgNode       | de paquetes y dependencias de paquetes cuando aparecen |
   |               | en listas de paquetes.                                 |
   |---------------+--------------------------------------------------------|
   | PkgTree       | Empleado por listas de paquetes.                       |
   |---------------+--------------------------------------------------------|
   | Table         | Empleado por tablas de componentes (por ejemplo,       |
   |               | cuadros de dialogo).                                   |
   |---------------+--------------------------------------------------------|
   | TextLayout    | Empleado por presentaciones de texto formateados,      |
   |               | tales como las descripciones de paquetes.              |
   |---------------+--------------------------------------------------------|
   |               | Empleado por todas las presentaciones de árbol         |
   | Tree          | (incluyendo listas de paquetes, se puede anular        |
   |               | mediante PkgTree).                                     |
   +------------------------------------------------------------------------+

  Personalizar los colores del texto y estilos.

   Puede personalizar extensivamente los colores y estilos visuales empleados
   por aptitude para mostrar el texto. Cada elemento visual tiene un “estilo”
   asociado, que describe los colores y atributos visuales que se emplean
   para mostrar tal elemento. Los estilos tienen la forma de una lista de
   configuraciones para el color y los atributos. Esta lista no es
   necesariamente exhaustiva; si no se define algún color o atributo sus
   valores se toman del contexto visual circundante. De hecho, la mayoría de
   los elementos visuales tiene un estilo “vacío” de manera predeterminada.

   Puede modificar los contenidos de un estilo, creando un grupo de
   configuración del mismo nombre en el fichero de configuración de apt o de
   aptitude. Por ejemplo, el estilo de “MenuBorder” se utiliza para dibujar
   el borde en torno a los menús desplegables. Por omisión este borde se
   dibuja resaltado y en blanco sobre azul. Insertar el siguiente texto en el
   fichero de configuración lo dibuja en blanco sobre azul:

 Aptitude::UI::Styles {
   MenuBorder {fg white; bg cyan; set bold;};
 };

   Como puede ver, un grupo de configuración de estilo consiste de una serie
   de instrucciones. Las clases generales de instrucciones son:

   fg color

           Mostrar el texto en primer plano con el color dado. Véase más
           abajo para una lista de los colores conocidos por aptitude.

   bg color

           Mostrar el texto de fondo con el color dado. Véase más abajo para
           una lista de colores conocidos por aptitude.

   set atributo

           Activar el atributo de texto dado. Véase más abajo para una lista
           de atributos de texto conocidos por aptitude.

   clear atributo

           Desactivar el atributo de texto dado. Véase más abajo para una
           lista de los atributos de texto conocidos por aptitude.

   flip atributo

           Conmutar el atributo de texto: si está activo en el elemento
           circundante, se desactivará, y viceversa. Véase más abajo para una
           lista de los atributos de texto conocidos por aptitude.

   Los colores que aptitude reconoce son el negro, azul, cían, verde,
   magenta, rojo, blanco y amarillo ^[20]. Además, puede definir default en
   lugar de un color de fondo para usar el fondo predeterminado de la
   terminal (esto puede ser el color predeterminado, un fichero de imagen, o
   incluso “transparente”). Los estilos que aptitude reconoce son:

   blink

           Activar texto parpadeante.

   bold

           Dar más brillo al color en primer plano del texto (o el fondo, si
           ha activado el vídeo inverso).

   dim

           Esto puede causar que el texto sea más oscuro en algunos
           terminales. No se ha observado este efecto en terminales comunes
           de Linux.

   reverse

           Intercambiar los colores en primer plano y de fondo. Muchos
           elementos visuales emplean este atributo para realizar tareas
           comunes de resaltado.

   standout

           Esto activa “el mejor modo de resaltado de la terminal”. Es
           similar en xterms, pero no idéntico al vídeo inverso; el
           comportamiento de esto en otros terminales puede variar.

   underline

           Activar el subrayado de texto.

   Puede seleccionar varios atributos a la vez si los separa con comas; por
   ejemplo set bold,standout;.

   [Nota] Nota
          Como se indica arriba, la interpretación del estilo y de los
          atributos de texto depende en gran medida de la terminal. Puede que
          necesite experimentar un poco para encontrar exactamente qué
          configuraciones son posibles en su terminal.

   Puede personalizar los siguientes estilos en aptitude:

   Figura 2.14. Estilos personalizables en aptitude

+-------------------------------------------------------------------------------+
|          Estilo          | Predeterminado |            Descripción            |
|--------------------------+----------------+-----------------------------------|
|Bullet                    |fg yellow; set  |El estilo de los puntos en las     |
|                          |bold;           |listas por puntos.                 |
|--------------------------+----------------+-----------------------------------|
|                          |                |El estilo de las nuevas versiones  |
|                          |                |de un paquete en la vista de       |
|                          |                |registro de cambios. Observe que   |
|ChangelogNewerVersion     |set bold;       |aptitude solo resalta las nuevas   |
|                          |                |versiones de paquetes si el paquete|
|                          |                |«libparse-debianchangelog-perl»    |
|                          |                |está instalado.                    |
|--------------------------+----------------+-----------------------------------|
|Default                   |fg white; bg    |El estilo básico de la pantalla.   |
|                          |black;          |                                   |
|--------------------------+----------------+-----------------------------------|
|DepBroken                 |fg black; bg    |El estilo para las dependencias no |
|                          |red;            |satisfechas.                       |
|--------------------------+----------------+-----------------------------------|
|                          |fg black; bg    |El estilo para las entradas de menú|
|DisabledMenuEntry         |blue; set dim;  |que están desactivadas y que no se |
|                          |                |pueden emplear.                    |
|--------------------------+----------------+-----------------------------------|
|                          |                |El estilo empleado para indicar que|
|DownloadHit               |fg black; bg    |un archivo ha sido “hit”: p.ej., no|
|                          |green;          |ha cambiado desde la última vez que|
|                          |                |se descargó.                       |
|--------------------------+----------------+-----------------------------------|
|DownloadProgress          |fg blue; bg     |El estilo del indicador de progreso|
|                          |yellow;         |de una descarga.                   |
|--------------------------+----------------+-----------------------------------|
|                          |fg white; bg    |El estilo de editores de línea (por|
|EditLine                  |black; clear    |ejemplo, la entrada en el cuadro de|
|                          |reverse;        |dialogo “Buscar”).                 |
|--------------------------+----------------+-----------------------------------|
|Error                     |fg white; bg    |El estilo de los mensajes de error.|
|                          |red; set bold;  |                                   |
|--------------------------+----------------+-----------------------------------|
|Header                    |fg white; bg    |El estilo de las cabeceras de      |
|                          |blue; set bold; |pantalla.                          |
|--------------------------+----------------+-----------------------------------|
|                          |fg white; bg    |El estilo del nombre de menú       |
|HighlightedMenuBar        |blue; set       |seleccionado en la barra de menú.  |
|                          |bold,reverse;   |                                   |
|--------------------------+----------------+-----------------------------------|
|                          |fg white; bg    |El estilo de la elección           |
|HighlightedMenuEntry      |blue; set       |seleccionada actualmente en un menú|
|                          |bold,reverse;   |.                                  |
|--------------------------+----------------+-----------------------------------|
|                          |                |El estilo del cuadro de dialogo    |
|MediaChange               |fg yellow; bg   |empleado para informar al usuario  |
|                          |red; set bold;  |de que debe insertar un disco      |
|                          |                |compacto nuevo.                    |
|--------------------------+----------------+-----------------------------------|
|MenuBar                   |fg white; bg    |El estilo de la barra de menú.     |
|                          |blue; set bold; |                                   |
|--------------------------+----------------+-----------------------------------|
|MenuBorder                |fg white; bg    |El estilo de los bordes que rodean |
|                          |blue; set bold; |a un menú desplegable.             |
|--------------------------+----------------+-----------------------------------|
|MenuEntry                 |fg white; bg    |El estilo de cada entrada en un    |
|                          |blue;           |menú desplegable.                  |
|--------------------------+----------------+-----------------------------------|
|MineBomb                  |fg red; set     |El estilo de las bombas en el      |
|                          |bold;           |Buscaminas.                        |
|--------------------------+----------------+-----------------------------------|
|MineBorder                |set bold;       |El estilo del borde que se dibuja  |
|                          |                |en torno al tablero del Buscaminas.|
|--------------------------+----------------+-----------------------------------|
|MineFlag                  |fg red; set     |El estilo de las marcas en el      |
|                          |bold;           |Buscaminas.                        |
|--------------------------+----------------+-----------------------------------|
|                          |                |El estilo del número N en el       |
|MineNumberN               |Varios          |Buscaminas; N puede variar de 0 a  |
|                          |                |8.                                 |
|--------------------------+----------------+-----------------------------------|
|                          |fg white; bg    |El color empleado para mostrar     |
|MultiplexTab              |blue;           |“pestañas” además de la            |
|                          |                |seleccionada.                      |
|--------------------------+----------------+-----------------------------------|
|MultiplexTabHighlighted   |fg blue; bg     |El color empleado para mostrar la  |
|                          |white;          |“pestaña” seleccionada.            |
|--------------------------+----------------+-----------------------------------|
|                          |fg red; flip    |El estilo de los paquetes en la    |
|PkgBroken                 |reverse;        |lista de paquetes que tienen       |
|                          |                |dependencias no satisfechas.       |
|--------------------------+----------------+-----------------------------------|
|                          |                |El estilo de los paquetes          |
|PkgBrokenHighlighted      |fg red;         |resaltados en la lista de paquetes |
|                          |                |que tienen dependencias no         |
|                          |                |satisfechas.                       |
|--------------------------+----------------+-----------------------------------|
|                          |                |El estilo de los paquetes que no   |
|PkgNotInstalled           |                |están instalados y que no se van a |
|                          |                |instalar.                          |
|--------------------------+----------------+-----------------------------------|
|                          |                |El estilo de los paquetes          |
|PkgNotInstalledHighlighted|                |resaltados que no están instalados |
|                          |                |y que no se van a instalar.        |
|--------------------------+----------------+-----------------------------------|
|                          |                |El estilo de los paquetes          |
|PkgIsInstalled            |set bold;       |instalados en la actualidad pero   |
|                          |                |para los cuales no hay ninguna     |
|                          |                |acción programada.                 |
|--------------------------+----------------+-----------------------------------|
|                          |                |El estilo de los paquetes          |
|PkgIsInstalledHighlighted |set bold; flip  |resaltados instalados en la        |
|                          |reverse;        |actualidad pero para los cuales no |
|                          |                |hay ninguna acción programada.     |
|--------------------------+----------------+-----------------------------------|
|                          |                |El estilo de los paquetes en la    |
|PkgToDowngrade            |set bold;       |lista de paquetes que se van a     |
|                          |                |desactualizar.                     |
|--------------------------+----------------+-----------------------------------|
|                          |set bold; flip  |El estilo de los paquetes          |
|PkgToDowngradeHighlighted |reverse         |resaltados en la lista de paquetes |
|                          |                |que se van a desactualizar.        |
|--------------------------+----------------+-----------------------------------|
|PkgToHold                 |fg white; flip  |El estilo de los paquetes retenidos|
|                          |reverse;        |en la lista de paquetes.           |
|--------------------------+----------------+-----------------------------------|
|                          |                |El estilo de los paquetes          |
|PkgToHoldHighlighted      |fg white;       |retenidos, y resaltados, en la     |
|                          |                |lista de paquetes.                 |
|--------------------------+----------------+-----------------------------------|
|                          |                |El estilo de los paquetes en la    |
|PkgToInstall              |fg green; flip  |lista de paquetes que se van a     |
|                          |reverse;        |instalar (no actualizar) o         |
|                          |                |reinstalar.                        |
|--------------------------+----------------+-----------------------------------|
|                          |                |El estilo de los paquetes          |
|PkgToInstallHighlighted   |fg green;       |resaltados en la lista de paquetes |
|                          |                |que se van a instalar (no          |
|                          |                |actualizar) o reinstalar.          |
|--------------------------+----------------+-----------------------------------|
|                          |fg magenta; flip|El estilo de los paquetes en la    |
|PkgToRemove               |reverse;        |lista de paquetes que se van a     |
|                          |                |eliminar o purgar.                 |
|--------------------------+----------------+-----------------------------------|
|                          |                |El estilo de los paquetes          |
|PkgToRemoveHighlighted    |fg magenta;     |resaltados en la lista de paquetes |
|                          |                |que se van a eliminar o purgar.    |
|--------------------------+----------------+-----------------------------------|
|                          |fg cyan; flip   |El estilo de los paquetes en la    |
|PkgToUpgrade              |reverse;        |lista de paquetes que se van a     |
|                          |                |actualizar.                        |
|--------------------------+----------------+-----------------------------------|
|                          |                |El estilo de los paquetes          |
|PkgToUpgradeHighlighted   |fg cyan;        |resaltados en la lista de paquetes |
|                          |                |que se van a actualizar.           |
|--------------------------+----------------+-----------------------------------|
|                          |fg blue; bg     |El estilo de las barras de progreso|
|Progress                  |yellow;         |tales como el que aparece cuando se|
|                          |                |carga el almacén de paquetes.      |
|--------------------------+----------------+-----------------------------------|
|SolutionActionApproved    |bg green;       |El estilo de las acciones aprobadas|
|                          |                |en una solución.                   |
|--------------------------+----------------+-----------------------------------|
|SolutionActionRejected    |bg red;         |El estilo de los acciones          |
|                          |                |rechazadas en una solución.        |
|--------------------------+----------------+-----------------------------------|
|Status                    |fg white; bg    |El estilo de las líneas de estado  |
|                          |blue; set bold; |en la base de la pantalla.         |
|--------------------------+----------------+-----------------------------------|
|TreeBackground            |                |El color básico de todas las listas|
|                          |                |y árboles.                         |
|--------------------------+----------------+-----------------------------------|
|                          |fg red; bg      |El color empleado para mostrar los |
|TrustWarning              |black; set bold;|avisos referentes a la confianza de|
|                          |                |los paquetes.                      |
+-------------------------------------------------------------------------------+

  Personalizar el diseño de la interfaz.

   Es posible configurar el diseño de la lista de paquetes de aptitude
   modificando el fichero de configuración.

    Elementos de pantalla

   El diseño de pantalla se guarda en el grupo de configuración
   Aptitude::UI::Default-Package-View, y consiste de una lista de los
   elementos de pantalla:

 Nombre Tipo {
   Row fila;
   Column columna;
   Width ancho;
   Height altura;

   opciones adicionales...
 };

   Esto crea un elemento de pantalla denominado Nombre; el tipo de elemento
   creado se determina por el Tipo. Las opciones Row, Column, Width y Height
   deben estar presentes; determinan la posición del elemento de pantalla
   (consulte más abajo para una explicación detallada acerca de la
   disposición de los elementos de pantalla)

   Para ver ejemplos de cómo cambiar el diseño de pantalla, consulte las
   definiciones de tema en el fichero /usr/share/aptitude/aptitude-defaults.

   Los siguientes tipos de elementos de pantalla están disponibles:

   Description

           Este elemento de pantalla contiene el “área de información”
           (generalmente una descripción del paquete seleccionado).

           La opción PopUpDownKey proporciona el nombre de una orden de
           teclado que oculta o muestra el elemento de pantalla. Por ejemplo,
           si configura esto como ShowHideDescription, el elemento de
           pantalla actual tendría las mismas características que el área de
           información predeterminado. La opción PopUpDownLinked proporciona
           el nombre de otro elemento de pantalla; el elemento se mostrará u
           ocultará dependiendo de si el otro elemento lo está también.

   MainWidget

           Este es un espacio para el elemento de pantalla “principal”: esto
           es, generalmente, la lista de paquetes. Un diseño de interfaz debe
           contener exactamente un elemento MainWidget: ni más, ni menos.

   Static

           Un espacio de la pantalla que muestra algún texto, que
           posiblemente contiene códigos de formato como se describe en
           “Personalizar la presentación de los paquetes”. El texto a mostrar
           se puede configurar en la opción Columns, o se puede guardar en
           otra variable de configuración definida en la opción ColumnsCfg.
           El color del texto se determina por el color nombrado en la opción
           Color.

           Los elementos Static (estáticos) se pueden mostrar u ocultar de la
           misma manera que elementos de Description, empleando las opciones
           PopUpDownKey y PopUpDownLinked.

    Ubicación de los elementos de pantalla

   Los elementos de pantalla aparecen en un “tablero”. La esquina superior
   izquierda de un elemento está en la célula dada por las opciones Row y
   Column (comenzando generalmente por la fila 0, columna 0; esto no es
   obligatorio). El ancho de un elemento en células aparece en la opción
   Width, y su altura, en la opción Height.

   Una vez que los elementos de pantalla están dispuestos y se les ha dado
   una cantidad inicial de espacio en la pantalla, puede que aún quede
   espacio sobrante. Si hay espacio vertical sobrante, a cada fila que
   contiene un elemento de pantalla cuya opción RowExpand es true se le dará
   una parte de ese espacio sobrante; de manera similar, si hay espacio
   horizontal sobrante, cada columna que contiene un elemento de pantalla
   cuya opción ColExpand es true se le dará una parte de ese espacio
   sobrante.

   En la situación de que no haya suficiente espacio, cada fila y columna
   cuyos componentes tienen todas sus opciones RowShrink o ColShrink
   definidos como true, son encogidos. Si esto no es suficiente, todas las
   filas y columnas se encojen para encajar en el espacio disponible.

   Si no se expande un elemento de pantalla, pero sí su fila o columna, su
   alineamiento se determina por las opciones RowAlign (alineamiento de la
   fila) y ColAlign (alineamiento de la columna). Configurarlos con Left
   (izq.), Right (der.), Top (inicio), Bottom (final) o Center (centro),
   indica a aptitude donde ubicar el elemento dentro de la fila o columna.

   Por ejemplo, el siguiente grupo de configuración crea un elemento estático
   llamado “Header”, con un ancho de tres células y que se expande
   horizontalmente, pero no en vertical. Posee el mismo color que otras
   líneas de cabecera y emplea el formato de presentación estándar para las
   líneas de cabecera:

 Header Static {
   Row 0;
   Column 0;
   Width 3;
   Height 1;

   ColExpand true;
   ColAlign Center;

   RowAlign Center;

   Color ScreenHeaderColor;
   ColumnsCfg HEADER;
 };

    Referencia de las opciones de diseño de la interfaz

   Las siguientes opciones están disponibles para los elementos de pantalla:

   ColAlign alineamiento;

           El alineamiento debe ser Left, Right, o Center. Si la fila que
           contiene el elemento de pantalla actual es más ancho que el mismo
           elemento y ColExpand es false, el elemento se posicionará en la
           fila de acuerdo al valor de alineamiento.

           Si está opción no está presente, activa Left de manera
           predeterminada.

   ColExpand true|false;

           Si esta opción se configura como true la columna que contiene este
           elemento de pantalla recibe una parte de cualquier espacio
           horizontal sobrante disponible.

           Si esta opción no esta presente, false es la opción
           predeterminada.

   Color nombre_de_color;

           Esta opción afecta a los elementos Static. nombre_de_color es el
           nombre de un color (por ejemplo, ScreenStatusColor) que se debe
           usar como el color “predeterminado” para este elemento de
           pantalla.

           Si esta opción no esta presente, la opción predeterminada es
           DefaultWidgetBackground.

   ColShrink true|false;

           Si cada elemento de una columna tiene esta opción como true y no
           hay suficiente espacio horizontal, la columna encogerá en la
           medida de lo necesario. Observe que la columna puede variar de
           tamaño aunque ColShrink sea false; simplemente indica que aptitude
           debería intentar encoger una columna en particular antes de
           encoger las demás.

           Si esta opción no esta presente, false es la opción
           predeterminada.

   Column columna;

           Definir la columna más a la izquierda que contiene este elemento
           de interfaz.

   Columns formato;

           Esta opción afecta a los elementos de pantalla Static que no
           tienen definida la opción en ColumnsCfg. Configura los contenidos
           mostrados del elemento de estado; es una cadena formato como se
           describe en “Personalizar la presentación de los paquetes”.

   ColumnsCfg HEADER|STATUS|nombre;

           Esta opción afecta a los elementos de pantalla Static. Cambia el
           formato de pantalla del elemento seleccionado a una valor de otra
           variable de configuración: si es HEADER o STATUS, las opciones
           Aptitude::UI::Package-Header-Format y
           Aptitude::UI::Package-Status-Format se emplean, respectivamente;
           de no ser así, se emplea la opción nombre.

           Si esta opción no está presente, se utiliza el valor de la opción
           Columns para gestionar los contenidos del elemento estático.

   Height altura;

           Definir la altura del elemento de interfaz actual.

   PopUpDownKey orden;

           Esta opción afecta a los elementos de pantalla Description y
           Static.

           orden es el nombre de una orden de teclado (por ejemplo,
           ShowHideDescription). Si pulsa esta tecla, el elemento de pantalla
           se ocultará en caso de estar visible, y visible si está oculto.

   PopUpDownLinked elemento;

           Esta opción afecta a los elementos de pantalla Description y
           Static.

           elemento es el nombre de un elemento de pantalla. Cuando elemento
           es visible, el elemento actual también es visible; cuando elemento
           está oculto, el elemento actual también está oculto.

   Row fila;

           Definir la fila más alta que contiene este elemento.

   RowAlign alineamiento;

           alineamiento debe ser Top, Bottom, o Center. Si la fila que
           contiene el elemento de pantalla actual es más alto que el
           elemento mismo y si RowExpand vale false, el elemento aparecerá en
           la fila de acuerdo al valor de alineamiento.

           Si esta opción no está presente, Top es la opción predeterminada.

   RowExpand true|false;

           Si esta opción tiene valor de true, la fila que contiene el
           elemento de pantalla dispondrá de un espacio adicional si hay
           espacio vertical libre.

           Si esta opción no esta presente, false es la opción
           predeterminada.

   RowShrink true|false;

           Si da valor de true a esta opción para cada elemento de la fila y
           no hay suficiente espacio vertical, la fila encogerá en la medida
           de lo necesario. Observe que una fila puede encoger aunque
           RowShrink sea false; sólo indica a aptitude que ha de intentar
           encoger un fila en particular antes de encoger otras.

           Si esta opción no esta presente, false es la opción
           predeterminada.

   Visible true|false;

           Si da valor de false este elemento de pantalla estará oculto de
           inicio. Supuestamente, esto sólo es útil en conjunción con
           PopUpDownKey y/o PopUpDownLinked.

           Si no configura esta opción, true es la forma predeterminada.

   Width ancho;

           Definir el ancho del elemento de interfaz actual.

  Referencia del fichero de configuración.

    Formato del fichero de configuración

   En su forma básica, el fichero de configuración de aptitude es una lista
   de opciones seguidas de sus valores. Cada línea debe tener la forma
   “Opción Valor;”: por ejemplo, la siguiente línea en el fichero de
   configuración configura la opción Aptitude::Theme como “Dselect”.

 Aptitude::Theme "Dselect";

   Una opción puede “contener” otras opciones si se escriben entre corchetes
   entre la opción y el semi-colon que le sigue,como por ejemplo:

 Aptitude::UI {
   Package-Status-Format "";
   Package-Display-Format "";
 };

   Una opción que contiene otras opciones se denomina grupo. De hecho, los
   doble-colon que aparecen en los nombres de opciones son la forma corta de
   indicar contenido: la opción Aptitude::UI::Default-Grouping se encuentra
   dentro del grupo Aptitude::UI, el cual a su vez se encuentra dentro del
   grupo Aptitude. Por ello, si lo desea, podría activar esta opción como ""
   de la siguiente manera:

 Aptitude {
   UI {
     Default-Grouping "";
   };
 };

   Para más información referente al formato del fichero de configuración,
   consulte la página de manual apt.conf(5).

    Ubicaciones de los ficheros de configuración

   La configuración de aptitude se lee desde las siguientes fuentes, en
   orden:

    1. Opciones del fichero de configuración definidas en la línea de
       órdenes.

    2. El fichero de configuración de usuario, ~/.aptitude/config. Este
       fichero se sobreescribe cuando el usuario modifica la configuración en
       el menú Opciones.

    3. El fichero de configuración del sistema, /etc/apt/apt.conf.

    4. Los fragmentos de fichero de configuración del sistema,
       /etc/apt/apt.conf.d/*.

    5. El fichero definido por la variable de entorno APT_CONFIG (si existe).

    6. Valores predeterminados guardados en
       /usr/share/aptitude/aptitude-defaults.

    7. Valores predeterminados integrados en aptitude

   Cuando se activa una opción, estas fuentes se examinan por orden, y se
   emplea el primero que provee el valor para la opción usada. Por ejemplo,
   si configura una opción en /etc/apt/apt.conf, esto sobreescribe los
   valores predeterminados de aptitude para esa opción, pero no sobreescribe
   las configuraciones de usuario en ~/.aptitude/config.

    Opciones de configuración disponibles

   aptitude emplea las siguientes opciones de configuración. Observe que
   éstas no son todas las opciones de configuración disponibles; aquellas
   empleadas por el sistema subyacente apt no se encuentran en esta lista.
   Véase las páginas de manual apt(8) y apt.conf(5) para información
   referente a las opciones de apt.

   Opción: Apt::AutoRemove::RecommendsImportant
   Predeterminado: true
   Descripción: Si esta opción tiene valor de true, aptitude no considerará
   en desuso ningún paquete (y por ello no se eliminarán automáticamente)
   siempre y cuando algún paquete instalado los recomiende, aunque
   Apt::Install-Recommends valga false. Para más información, consulte
   “Gestionar paquetes automáticamente instalados.”.
   Opción: Apt::AutoRemove::SuggestsImportant
   Predeterminado: true
   Descripción: Si esta opción tiene valor de true, aptitude considerará que
   ningún paquete está en desuso (y por ello no los eliminará
   automáticamente) siempre y cuando algún paquete los sugiera. Para más
   información, consulte “Gestionar paquetes automáticamente instalados.”.
   Opción: Apt::Get::List-Cleanup
   Predeterminado: true
   Descripción: Un sinónimo de Apt::List-Cleanup. Si define cualquiera de
   estas opciones como false, aptitude no borrará los ficheros antiguos de
   listas de paquetes después de descargar un nuevo conjunto de listas de
   paquetes.
   Opción: Apt::List-Cleanup
   Predeterminado: true
   Descripción: Un sinónimo de Apt::Get::List-Cleanup. Si define cualquiera
   de estas opciones como false, aptitude no borrará los ficheros antiguos de
   listas de paquetes después de descargar un nuevo conjunto de listas de
   paquetes.
   Opción: Apt::Install-Recommends
   Predeterminado: true
   Descripción: Si esta opción vale true y Aptitude::Auto-Install vale true
   también, cuando marque un paquete para su instalación aptitude marcará
   también todos los paquetes recomendados. Más aún, si esta opción es true,
   aptitude considerará que ninguna paquete está en desuso mientras otro lo
   recomiende. Para más información, consulte “Gestionar paquetes
   automáticamente instalados.” y “Resolución inmediata de dependencias.”.
   Opción: Aptitude::Allow-Null-Upgrade
   Predeterminado: false
   Descripción: Por lo general, si intenta iniciar un proceso de instalación
   sin que haya marcado ningún paquete para una acción aptitude mostrará un
   aviso y volverá a la lista de paquetes. Si esta opción vale true, aptitude
   mostrará la pantalla de previsualización si hay paquetes actualizables, en
   lugar de mostrar un recordatorio relativo a la orden Acciones → Marcar
   actualizable (U).
   Opción: Aptitude::Always-Use-Safe-Resolver
   Predeterminado: false
   Descripción: Si esta opción es true, las acciones en línea de órdenes de
   aptitude siempre emplearán un solucionador de dependencias “seguro”, al
   igual que si hubiese introducido el argumento --safe-resolver en la línea
   de órdenes.
   Opción: Aptitude::Autoclean-After-Update
   Predeterminado: false
   Descripción: Si esta opción tiene valor de true, aptitude borrará los
   paquetes obsoletos (consulte Acciones → Limpiar ficheros obsoletos) cada
   vez que actualice la lista de paquetes.
   Opción: Aptitude::Auto-Fix-Broken
   Predeterminado: true
   Descripción: Si esta opción vale false, aptitude le pedirá permiso antes
   de intentar arreglar cualquier paquete roto.
   Opción: Aptitude::Auto-Install
   Predeterminado: true
   Descripción: Si esta opción es true, aptitude intentará automáticamente
   cumplir con las dependencias de un paquete cuando lo marque para su
   instalación o actualización.
   Opción: Aptitude::Auto-Install-Remove-Ok
   Predeterminado: false
   Descripción: Si esta opción vale true, aptitude eliminará automáticamente
   aquellos paquetes que entran en conflicto al marcar un paquete para su
   instalación o actualización, Generalmente se marcan estos conflictos, y
   tendrá que gestionarlos manualmente.
   Opción: Aptitude::Auto-Upgrade
   Predeterminado: false
   Descripción: Si esta opción es true, aptitude marcará automáticamente
   todos los paquetes actualizables cuando inicie el programa, al igual que
   si ejecuta la orden Acciones → Marcar actualizable (U).
   Opción: Aptitude::CmdLine::Always-Prompt
   Predeterminado: false
   Descripción: En la interfaz en línea de órdenes, si esto se activa,
   aptitude siempre le preguntará antes de empezar a instalar o eliminar
   paquetes, incluso si la pregunta se obviaría en situaciones normales. Esto
   equivale a la opción en línea de órdenes -P.
   Opción: Aptitude::CmdLine::Assume-Yes
   Predeterminado: false
   Descripción: En modo de línea de órdenes, si esta opción vale true,
   aptitude actuará como si el usuario hubiese respondido “si” a cada
   pregunta, haciendo que la mayoría de ellos se obvien. Esto equivale a la
   orden en línea de órdenes -y.
   Opción: Aptitude::CmdLine::Disable-Columns
   Predeterminado: false
   Descripción: Si se activa esta opción, los resultados de una búsqueda en
   la línea de órdenes (ejecutados con aptitude search) no se formatearán en
   columnas de tamaño fijo o cortados al ancho de la pantalla. Esto equivale
   a la opción en la línea de órdenes --disable-columns.
   Opción: Aptitude::CmdLine::Download-Only
   Predeterminado: false
   Descripción: En el modo de línea de órdenes, si esta opción vale true,
   aptitude descargará los paquetes pero no los instalará. Esto equivale a la
   opción de línea de órdenes -d.
   Opción: Aptitude::CmdLine::Fix-Broken
   Predeterminado: false
   Descripción: En el modo de línea de órdenes, si esta opción vale true,
   aptitude será más agresivo en sus intentos de arreglar las dependencias de
   un paquete roto. Esto equivale a la opción en la línea de órdenes -f.
   Opción: Aptitude::CmdLine::Versions-Group-By
   Predeterminado: Se puede definir con auto, none, package, o source-package
   para si se muestra la salida de aptitude versions, y la forma en que se
   agrupa. Equivale a la opción de línea de órdenes --group-by (consulte la
   documentación para una mejor descripción del significado de los valores).
   Opción: Aptitude::CmdLine::Ignore-Trust-Violations
   Predeterminado: false
   Descripción: En el modo de línea de órdenes, hace que aptitude ignore la
   instalación de paquetes no de confianza. Esto es sinónimo de
   Apt::Get::AllowUnauthenticated.
   Opción: Aptitude::CmdLine::Package-Display-Format
   Predeterminado: %c%a%M %p# - %d#
   Descripción: Esta es una cadena formato, como se describe en “Personalizar
   la presentación de los paquetes”, que se emplea para mostrar los
   resultados de una búsqueda en la línea de órdenes. Esto equivale a la
   opción de línea en órdenes -F.
   Opción: Aptitude::CmdLine::Package-Display-Width
   Predeterminado:
   Descripción: Esta opción proporciona el ancho de los caracteres que
   aparecen en una búsqueda en línea de órdenes. De estar vacía
   (predeterminado; p.ej., ""), los resultados de búsqueda se formatearán en
   relación al tamaño de la terminal, o para una exposición de 80 columnas si
   no se puede determinar el tamaño de la terminal.
   Opción: Aptitude::CmdLine::Progress::Percent-On-Right
   Predeterminado: false
   Descripción: Esta opción controla si los indicadores de progreso de línea
   de órdenes muestran el porcentaje en la parte izquierda de la pantalla, al
   igual que apt-get, o en la parte derecha (predeterminado). Esta opción no
   afecta a los indicadores de progreso de descarga.
   Opción: Aptitude::CmdLine::Progress::Retain-Completed
   Predeterminado: false
   Descripción: Si este valor se define como false, los indicadores de
   progreso de línea de órdenes se eliminarán y sobreescribirán una vez que
   la tarea que representan haya finalizado. Si es true, permanecerán en la
   terminal. Esta opción no afecta a los indicadores de progreso de descarga.
   Opción: Aptitude::CmdLine::Request-Strictness
   Predeterminado: 10000
   Descripción: Si encuentra problemas de dependencias en el modo de línea de
   órdenes, aptitude añadirá este valor a la puntuación del solucionador de
   problemas para cada acción que usted requiera de manera explícita.
   Opción: Aptitude::CmdLine::Resolver-Debug
   Predeterminado: false
   Descripción: En el modo de línea de órdenes, si esta opción es true,
   aptitude mostrará información extremadamente detallada cuando intente
   resolver dependencias rotas. Como su propio nombre sugiere, esta opción
   está pensada para ayudar en el proceso de eliminar los fallos del
   solucionador.
   Opción: Aptitude::CmdLine::Resolver-Dump
   Predeterminado:
   Descripción: En el modo de línea de órdenes, en caso de ser necesario
   solucionar dependencias rotas y si esta opción se configura con el nombre
   de un fichero con permisos de escritura, el estado del solucionador se
   guardará en este fichero antes de realizar cualquier calculo.
   Opción: Aptitude::CmdLine::Resolver-Show-Steps
   Predeterminado: false
   Descripción: Si esta opción vale true, se mostrará una solución de
   dependencias como una secuencia de las resoluciones de las dependencias
   individuales; por ejemplo “wesnoth depende de wesnoth-data (= 1.2.4-1) ->
   instalar wesnoth-data 1.2.4-1 (unstable)”. Para conmutar el modo de vista,
   pulse o cuando se le pregunte “¿Acepta esta solución?”.
   Opción: Aptitude::CmdLine::Show-Deps
   Predeterminado: false
   Descripción: En el modo de línea de órdenes, si esta opción vale true,
   aptitude mostrará un resumen de las dependencias (de haberlas)
   relacionadas con el estado de un paquete. Esto equivale a -D en la línea
   de órdenes.
   Opción: Aptitude::CmdLine::Show-Size-Changes
   Predeterminado: false
   Descripción: En modo de línea de órdenes, si esta opción vale true,
   aptitude mostrará una estimación del espacio que usará cada paquete. Esto
   equivale a la opción de línea de órdenes -Z.
   Opción: Aptitude::CmdLine::Why-Display-Mode
   Predeterminado: no-summary
   Descripción: Esta opción define el valor predeterminado del argumento en
   línea de órdenes --show-summary. Véase la documentación de --show-summary
   para una lista de los valores permitidos con esta opción, así como su
   significado.
   Opción: Aptitude::CmdLine::Show-Versions
   Predeterminado: false
   Descripción: En modo de línea de órdenes, si esta opción vale true,
   aptitude mostrará la versión del paquete que se va a instalar o eliminar.
   Esto equivale a la opción en línea de órdenes -V.
   Opción: Aptitude::CmdLine::Show-Why
   Predeterminado: false
   Descripción: En modo de línea de órdenes, si esta opción vale true,
   aptitude mostrará cada paquete instalado automáticamente que paquetes
   instalados manualmente requieren, o los paquetes manualmente instalados
   que generan un conflicto con cada paquete eliminado de manera automática.
   Esto equivale a la opción en línea de órdenes -W, y muestra la misma
   información accesible a través de aptitude why, o pulsando i en la lista
   de paquetes.
   Opción: Aptitude::CmdLine::Version-Display-Format
   Predeterminado: %c%a%M %p# %t %i
   Descripción: Esta es una cadena formato, como se describe en “Personalizar
   la presentación de los paquetes”, que se emplea para mostrar la salida de
   aptitude versions. Esto equivale a la opción de línea en órdenes -F.
   Opción: Aptitude::CmdLine::Versions-Show-Package-Names
   Predeterminado: Se puede definir con always, auto, o never para controlar
   cuándo se muestran nombres de paquete en la salida de aptitude versions.
   Equivale a la opción en línea de órdenes --show-package-names (consulte su
   documentación para una descripción más amplia del significado de los
   valores).
   Opción: Aptitude::Safe-Resolver::Show-Resolver-Actions
   Predeterminado: false
   Descripción: Si se activa esta opción, cuando se active el solucionador de
   dependencias “safe” mediante --safe-resolver o porque se utiliza la opción
   de línea de órdenes safe-upgrade, mostrará un resumen de las acciones que
   el solucionador tomará antes de previsualizar la instalación. Equivale a
   la opción de línea de órdenes --show-resolver-actions.
   Opción: Aptitude::Screenshot::IncrementalLoadLimit
   Predeterminado: 16384
   Descripción: El tamaño mínimo en bytes en el que aptitude empezará a
   mostrar las capturas de pantalla de forma incremental. Las capturas de
   pantalla menores que este tamaño no se mostrarán hasta que se haya
   completado su descarga.
   Opción: Aptitude::Screenshot::Cache-Max
   Predeterminado: 4194304
   Descripción: El tamaño máximo en bytes de datos de capturas de pantalla
   que aptitude guardará para aquellas capturas que no se están mostrando
   actualmente. El valor predeterminado es de cuatro megabytes.
   Opción: Aptitude::CmdLine::Simulate
   Predeterminado: false
   Descripción: Recomendamos no usar esta opción; use Aptitude::Simulate. En
   la línea de órdenes, hace que aptitude muestre las acciones que tomaría (a
   diferencia de tomarlas en el momento); en la interfaz gráfica, aptitude se
   iniciaría en modo de sólo lectura independientemente de si Ud. es root o
   no. Equivale a la opción -s.
   Opción: Aptitude::CmdLine::Verbose
   Predeterminado: 0
   Descripción: Controlar cuanta información recibe en modo de línea de
   órdenes de aptitude. Cada aparición de la opción -v añade 1 a este valor.
   Opción: Aptitude::CmdLine::Visual-Preview
   Predeterminado: false
   Descripción: Si esta opción vale true, aptitude entrará en modo gráfico
   para poder previsualizar el proceso de instalación, y descargar paquetes.
   Opción: Aptitude::Delete-Unused
   Predeterminado: true
   Descripción: Si se activa esta opción, se eliminarán los paquetes
   instalados automáticamente que ya no se requieran. Para más información,
   consulte “Gestionar paquetes automáticamente instalados.”.
   Opción: Aptitude::Delete-Unused-Pattern
   Predeterminado:
   Descripción: Alias obsoleto para Aptitude::Keep-Unused-Pattern. Si
   configura Aptitude::Keep-Unused-Pattern con una cadena vacía el valor de
   esta opción de configuración lo sobreescribirá. De otra manera, se ignora
   Aptitude::Delete-Unused-Pattern.
   Opción: Aptitude::Display-Planned-Action
   Predeterminado: true
   Descripción: Si esta opción vale true, aptitude mostrará una
   previsualización antes de ejecutar las acciones que desea llevar a cabo.
   Opción: Aptitude::Forget-New-On-Install
   Predeterminado: false
   Descripción: Si esta opción vale true, aptitude vaciará la lista de
   paquetes nuevos en el momento que instale, actualice o elimine paquetes,
   al igual que si ejecuta Acciones → Olvidar paquetes nuevos (f).
   Opción: Aptitude::Forget-New-On-Update
   Predeterminado: false
   Descripción: Si esta opción vale true, aptitude vaciará la lista de
   paquetes nuevos en el momento que actualice la lista de paquetes, al igual
   que si ejecuta Acciones → Olvidar paquetes nuevos (f).
   Opción: Aptitude::Get-Root-Command
   Predeterminado: su:/bin/su
   Descripción: Esta opción define la orden externa que aptitudeutiliza para
   pasar a usuario root (consulte “Convertirse en root.”). Su forma es
   protocolo:orden. El protocolo debe ser su o sudo; define la manera en que
   aptitude invoca el programa cuando desea obtener privilegios de usuario
   root. Si el protocolo es su, se emplea la orden -c argumentos para
   convertirse en el usuario root; de no ser así, aptitude utiliza orden
   argumentos. La primera palabra de la orden es el nombre del programa que
   invocar; las palabras restantes se toman como argumentos de ese mismo
   programa.
   Opción: Aptitude::Ignore-Old-Tmp
   Predeterminado: false
   Descripción: Versiones anteriores de aptitude creaban una carpeta
   ~/.aptitude/.tmp, ya obsoleto. Si la carpeta existe y
   Aptitude::Ignore-Old-Tmp vale true, aptitude le preguntará si desea
   eliminar esta carpeta. La opción será true automáticamente tras su
   respuesta. Por otro lado, si la carpeta no existe, esta opción hará que
   aptitude tome esto como false para así notificarle en caso de que
   reaparezca.
   Opción: Aptitude::Ignore-Recommends-Important
   Predeterminado: false
   Descripción: En versiones anteriores de aptitude, la opción
   Aptitude::Recommends-Important activaba la instalación automática de
   paquetes recomendados, de la misma manera que hoy en día realiza
   Apt::Install-Recommends. Si esta opción se define como false, y
   Aptitude::Recommends-Important también se define como false, aptitude
   configurará Apt::Install-Recommends como false, y
   Aptitude::Ignore-Recommends-Important como true al inicio.
   Opción: Aptitude::Keep-Recommends
   Predeterminado: false
   Descripción: This is an obsolete option; use
   Apt::AutoRemove::RecommendsImportant instead. Setting this option to true
   has the same effect as setting Apt::AutoRemove::RecommendsImportant to
   true.
   Opción: Aptitude::Keep-Suggests
   Predeterminado: false
   Descripción: This is an obsolete option; use
   Apt::AutoRemove::SuggestsImportant instead. Setting this option to true
   has the same effect as setting Apt::AutoRemove::SuggestsImportant to true.
   Opción: Aptitude::Keep-Unused-Pattern
   Predeterminado:
   Descripción: Si Aptitude::Delete-Unused vale true, solo se eliminarán
   aquellos paquetes que no se correspondan con el patrón (consulte “Patrones
   de búsqueda”). Si define esta opción como una cadena vacía (opción
   predeterminada), se eliminan todos aquellos paquetes no usados.
   Opción: Aptitude::LockFile
   Predeterminado: /var/lock/aptitude
   Descripción: Un fichero que estará «fcntl-locked» para asegurar que sólo
   un proceso de aptitude pueda modificar el almacén en cada momento. Nunca
   tendrá la necesidad de modificar esto en circunstancias normales; aunque
   puede ser útil para depurar fallos. Nota: si aptitude informa que no puede
   conseguir el permiso único sobre el fichero, esto no significa que
   necesite destruir el fichero. Los «fcntl locks» (cerrojos) se gestionan
   por el kernel y son destruidos cuando el programa que los emplea finaliza;
   un fallo en el momento de adquirir el permiso significa que otro programa
   lo está usando.
   Opción: Aptitude::Log
   Predeterminado: /var/log/aptitude
   Descripción: Si define esto como una cadena vacía, aptitude registrará las
   instalaciones de paquetes, eliminaciones y actualizaciones que lleve a
   cabo. Si el valor de Aptitude::Log empieza con un carácter de segmentación
   (p.ej., “|”), el resto de su valor se emplea como el nombre de una orden
   al cual se redirigirá el registro: por ejemplo, |mail -s 'Aptitude install
   run' root permite mandar el registro al root por correo electrónico. Puede
   definir esta opción como una lista de objetivos de ficheros de registro
   para registrar varios ficheros u órdenes,.
   Opción: Aptitude::Logging::File
   Predeterminado:
   Descripción: Si define esto como una cadena que no está vacía, aptitude
   escribirá en él los mensajes que vaya registrando; si lo define con “-”,
   se mostrarán los mensajes a través de la salida estándar. Esto se
   diferencia de la configuración Aptitude::Log: ese fichero se utiliza para
   registrar las instalaciones y eliminaciones, mientras que éste se utiliza
   para registrar eventos de programas, errores y mensajes de depuración de
   fallos (si está activado). Esta opción equivale al argumento de línea de
   órdenes --log-file. Véase también Aptitude::Logging::Levels.
   Opción: Aptitude::Logging::Levels
   Predeterminado: (empty)
   Descripción: Esta opción es un grupo en el que sus miembros controlan qué
   mensajes del registro se escriben. Cada entrada es, o bien “nivel”, para
   definir el nivel de registro global (el nivel de registro del registrador
   del administrador) con el “nivel” insertado, o bien “categoría:nivel”,
   donde categoría es la categoría de los mensajes que modificar (tales como
   aptitude.resolver.hints.match), y nivel es el nivel más bajo de registro
   de mensajes en esa categoría que se deberían ver. Los niveles de registro
   válidos son “fatal”, “error”, “warn” (aviso), “info” (información),
   “debug” (depuración de fallos), y “trace” (rastro). Puede emplear la
   opción en línea de órdenes --log-level para definir o invalidar cualquier
   nivel de registro.
   Opción: Aptitude::Parse-Description-Bullets
   Predeterminado: true
   Descripción: Si se activa esta opción, aptitude intentará detectar
   automáticamente listas por puntos en las descripciones de paquete. En
   líneas generales, esto mejorará como se muestran las descripciones, pero
   no tiene una compatibilidad inversa total; algunas descripciones recibirán
   un formato menos atractivo cuando ésta opción sea true a cuando sea false.
   Opción: Aptitude::Pkg-Display-Limit
   Predeterminado:
   Descripción: El filtro predeterminado que se aplica a la lista de
   paquetes; consulte “Patrones de búsqueda” para ver los detalles acerca de
   su formato.
   Opción: Aptitude::ProblemResolver::Allow-Break-Holds
   Predeterminado: false
   Descripción: Si da a esta opción valor de true, el solucionador de
   problemas considerará romper la retención de cualquier paquete o instalar
   versiones prohibidas si con ello puede resolver una dependencia. Si lo
   define como false, se rechazarán estas acciones de forma predeterminada,
   aunque siempre puede activarlas manualmente (consulte “Resolver
   dependencias de manera interactiva.”).
   Opción: Aptitude::ProblemResolver::BreakHoldScore
   Predeterminado: -300
   Descripción: Cuánto premiar o penalizar soluciones que modifican el estado
   de un paquete retenido o que instalan versiones prohibidas. Observe que a
   menos que Aptitude::ProblemResolver::Allow-Break-Holds tenga valor de
   true, el solucionador nunca romperá una retención o instalará una versión
   prohibida a menos que tenga el permiso explicito del usuario.
   Opción: Aptitude::ProblemResolver::Break-Hold-Level
   Predeterminado: 50000
   Descripción: El coste de seguridad asignado a acciones que rompen una
   retención creada por el usuario (p. ej, actualizar un paquete retenido, o
   instalar una versión prohibida). Para una descripción del funcionamiento
   de los costes de seguridad consulte “Costes de seguridad”.
   Opción: Aptitude::ProblemResolver::BrokenScore
   Predeterminado: -100
   Descripción: Cuánto premiar o penalizar soluciones potenciales en base al
   número de dependencias que rompen. Este número se añadirá a la puntuación
   de cada solución por cada dependencia rota que genere; por lo general,
   éste tiene un valor negativo.
   Opción: Aptitude::ProblemResolver::DefaultResolutionScore
   Predeterminado: 400
   Descripción: Cuánto premiar o penalizar una solución potencial en base a
   cuantas resoluciones “predeterminadas” instalan por dependencias
   actualmente insatisfechas. La resolución predeterminada es la que tomaría
   “apt-get install” o el “solucionador de dependencias inmediato”. La
   puntuación sólo se aplica a las dependencias y recomendaciones cuyos
   objetivos no están instalados actualmente en el sistema.
   Opción: Aptitude::ProblemResolver::Discard-Null-Solution
   Predeterminado: true
   Descripción: Si esta opción tiene valor de true, aptitude nunca sugerirá
   cancelar todas las acciones propuestas para poder resolver un problema de
   dependencias.
   Opción: Aptitude::ProblemResolver::EssentialRemoveScore
   Predeterminado: -100000
   Descripción: Cuánto premiar o penalizar soluciones que eliminan un paquete
   Esencial.
   Opción: Aptitude::ProblemResolver::Remove-Essential-Level
   Predeterminado: 60000
   Descripción: El coste de seguridad asignado a acciones que eliminan un
   paquete marcado como «Essential» (esencial). Para una descripción del
   funcionamiento de los costes de seguridad consulte “Costes de seguridad”.
   Opción: Aptitude::ProblemResolver::ExtraScore
   Predeterminado: -1
   Descripción: Este número se añadirá a la puntuación de cualquier paquete
   con prioridad “extra”.
   Opción: Aptitude::ProblemResolver::FullReplacementScore
   Predeterminado: 500
   Descripción: Este número se añade al puntuación de una solución que
   elimina un paquete e instala otro que lo reemplaza por completo (p. ej.,
   tiene un conflicto, lo reemplaza, y lo provee).
   Opción: Aptitude::ProblemResolver::FutureHorizon
   Predeterminado: 50
   Descripción: Cuántos “pasos” debe tomar el solucionador antes de encontrar
   la primera solución. Aunque aptitude intenta generar las mejores
   soluciones antes que las peores es a veces incapaz de ello; esta
   configuración permite al solucionador buscar brevemente una solución mejor
   antes de mostrar los resultados, a diferencia de detenerse inmediatamente
   tras encontrar la primera solución.
   Opción: Aptitude::ProblemResolver::Hints
   Predeterminado: (empty)
   Descripción: Esta opción es un grupo en el cual sus miembros se utilizan
   para configurar el solucionador de problemas. Cada elemento del grupo es
   una cadena que describe la acción que se debería aplicar a uno o más
   paquetes. La sintaxis para cada indicación y el efecto que tiene se pueden
   ver en “Configurar indicaciones del solucionador”.
   Opción: Aptitude::ProblemResolver::ImportantScore
   Predeterminado: 5
   Descripción: Este número se añade a la puntuación de cualquier versión de
   un paquete con una prioridad “importante”.
   Opción: Aptitude::ProblemResolver::Infinity
   Predeterminado: 1000000
   Descripción: La puntuación “máxima” para soluciones en potencia. Si un
   conjunto de acciones tiene una puntuación peor que -Infinity, se
   descartará inmediatamente.
   Opción: Aptitude::ProblemResolver::InstallScore
   Predeterminado: -20
   Descripción: Cuánta importancia otorga el solucionador de paquetes a la
   instalación de un paquete si éste no se va a instalar a petición del
   usuario.
   Opción: Aptitude::ProblemResolver::Keep-All-Level
   Predeterminado: 20000
   Descripción: El coste de seguridad asignado a la única solución que
   cancela todas las acciones seleccionadas por el usuario.Para una
   descripción del funcionamiento de los costes de seguridad consulte “Costes
   de seguridad”.
   Opción: Aptitude::ProblemResolver::KeepScore
   Predeterminado: 0
   Descripción: Cuánta importancia otorga el solucionador de problemas a
   mantener un paquete en su estado actual, si éste no se va mantener en su
   estado actual a petición del usuario.
   Opción: Aptitude::ProblemResolver::NonDefaultScore
   Predeterminado: -40
   Descripción: Cuánta importancia otorga el solucionador de problemas a
   instalar una versión no predeterminada de un paquete (una que no es la
   versión presente y tampoco la “versión candidata”).
   Opción: Aptitude::ProblemResolver::Non-Default-Level
   Predeterminado: 50000
   Descripción: El coste de seguridad asignado a acciones que instalan
   versiones no predeterminadas de un paquete. Por ejemplo, su la versión 5
   de un paquete se encuentra instalada, están disponibles las versiones 6,7
   y 8, y la versión predeterminada es la 7, las versiones 6 y 8 recibirían
   un coste de seguridad al menos tan alto como esto. Para una descripción
   del funcionamiento de los costes de seguridad consulte “Costes de
   seguridad”.
   Opción: Aptitude::ProblemResolver::OptionalScore
   Predeterminado: 1
   Descripción: Este número se añade a la puntuación de toda versión de un
   paquete con prioridad “opcional”.
   Opción: Aptitude::ProblemResolver::PreserveAutoScore
   Predeterminado: 0
   Descripción: Cuánta importancia otorga el solucionador de problemas a
   conservar las instalaciones automáticas o eliminaciones.
   Opción: Aptitude::ProblemResolver::PreserveManualScore
   Predeterminado: 60
   Descripción: Cuanta importancia otorga el solucionador a conservar
   selecciones explícitas del usuario.
   Opción: Aptitude::ProblemResolver::RemoveScore
   Predeterminado: -300
   Descripción: Cuánta importancia otorga el solucionador de problemas a
   eliminar un paquete (si no está ya marcado para su eliminación).
   Opción: Aptitude::ProblemResolver::Remove-Level
   Predeterminado: 10000
   Descripción: El coste de seguridad que se asigna a acciones que eliminan
   un paquete. Para una descripción del funcionamiento de los costes de
   seguridad consulte “Costes de seguridad”.
   Opción: Aptitude::ProblemResolver::RequiredScore
   Predeterminado: 4
   Descripción: Este número se añade a la puntuación de toda versión de un
   paquete con prioridad de “requiere”.
   Opción: Aptitude::ProblemResolver::ResolutionScore
   Predeterminado: 50
   Descripción: Además de todos los otros factores de puntuación, las
   soluciones propuestas que resuelven todas las dependencias insatisfechas
   reciben esta cantidad de puntos adicionales.
   Opción: Aptitude::ProblemResolver::Safe-Level
   Predeterminado: 10000
   Descripción: El coste de seguridad que se asigna a acciones que instalan
   la versión predeterminada de un paquete, actualizan un paquete a su
   versión predeterminada, o cancelan instalar o actualizar un paquete. Las
   soluciones que reciben este coste también se pueden generar mediante
   aptitude safe-upgrade. Para una descripción del funcionamiento de los
   costes de seguridad consulte “Costes de seguridad”.
   Opción: Aptitude::ProblemResolver::SolutionCost
   Predeterminado: safety,priority
   Descripción: Describe como determinar el coste de una solución. Consulte
   “Costes en el solucionador interactivo de dependencias.” para una
   descripción de los costes de una solución, lo que hacen y la sintaxis para
   definirlas. Si el coste no se puede analizar, se muestra un error y en su
   lugar se utiliza el coste predeterminado.
   Opción: Aptitude::ProblemResolver::StandardScore
   Predeterminado: 3
   Descripción: Este número se añade a la puntuación de toda versión de un
   paquete con prioridad “estándar”.
   Opción: Aptitude::ProblemResolver::StepLimit
   Predeterminado: 5000
   Descripción: El número máximo de “pasos” que debería tomar el solucionador
   de problemas a cada intento de encontrar una solución a un problema de
   dependencias. Si reduce este número, aptitude se dará antes “por vencido”;
   si lo aumenta, permitirá que la búsqueda de una solución pueda tomar más
   tiempo y memoria antes de interrumpirse. Si define el valor de StepLimit
   como 0, desactivaría totalmente el solucionador de problemas. El valor
   predeterminado es suficientemente alto para gestionar cómodamente las
   situaciones más comunes, a la vez que impide que aptitude “explote” en
   caso de encontrarse con un problema más complicado. (Nota: ésto sólo
   afecta a las búsquedas en línea de órdenes; en la interfaz gráfica el
   solucionador continuará hasta encontrar una solución)
   Opción: Aptitude::ProblemResolver::StepScore
   Predeterminado: 70
   Descripción: Cuánto premiar o castigar soluciones potenciales en base a su
   longitud. Este número de puntos se añade por cada acción realizada por la
   solución. Cuanto más alto sea este valor, más tenderá el solucionador a
   conservarlo en lugar de considerar otras alternativas; esto causará que la
   solución se genere más rápidamente, pero ésta puede ser de menor calidad
   que en situaciones normales.
   Opción: Aptitude::ProblemResolver::Trace-Directory
   Predeterminado:
   Descripción: Si define este valor, cada vez que el solucionador de
   problemas genere una solución guardará una versión simplificada del estado
   del paquete, que se puede emplear para reproducir la misma solución. Si
   define también Aptitude::ProblemResolver::Trace-File, se escribirá la
   misma información en el fichero de seguimiento («trace-file»). Los
   directorios de seguimiento son más transparentes que los ficheros de
   seguimiento, y más adecuados para, por ejemplo, incluir arboles de fuentes
   como casos de prueba.
   Opción: Aptitude::ProblemResolver::Trace-File
   Predeterminado:
   Descripción: Si define este valor, cada vez que el solucionador de
   problemas genere una solución guardará una versión simplificada del estado
   del paquete, que se puede emplear para reproducir la misma solución. Si
   define también Aptitude::ProblemResolver::Trace-Directory, se escribirá la
   misma información en el directorio de seguimiento («trace-directory»). Un
   fichero de seguimiento es simplemente un directorio de seguimiento
   comprimido en un fichero; ocupa menos espacio que el directorio de
   seguimiento y es más apropiado para su transmisión a través de una red.
   Opción: Aptitude::ProblemResolver::UndoFullReplacementScore
   Predeterminado: -500
   Descripción: Esta puntuación se asigna a la acción de instalar un paquete
   y eliminar otro que lo reemplaza totalmente (p. ej., conflicto de
   dependencias, reemplaza y provee).
   Opción: Aptitude::ProblemResolver::UnfixedSoftScore
   Predeterminado: -200
   Descripción: Cuánto premiar o penalizar el no resolver una relación de
   «Recomienda». Generalmente, este número es menor que «RemoveScore», o
   aptitude tenderá a eliminar paquetes antes que dejar sus recomendaciones
   sin resolver. Para más detalles, consulte “Resolver dependencias de manera
   interactiva.”.
   Opción: Aptitude::ProblemResolver::UpgradeScore
   Predeterminado: 0
   Descripción: Cuánta importancia otorga el solucionador de problemas a
   actualizar (o desactualizar) un paquete a su versión candidata, en caso de
   que el paquete no estuviese marcado para actualizar.
   Opción: Aptitude::Purge-Unused
   Predeterminado: false
   Descripción: Si define esta opción con valor de true y si
   Aptitude::Delete-Unused es también true, se purgarán del sistema los
   paquetes no usados, eliminando sus datos de configuración así como quizás
   otros datos importantes. Para más información relativa a qué paquetes se
   consideran “no usados”, consulte “Gestionar paquetes automáticamente
   instalados.”. ¡ÉSTA OPCIÓN PUEDE CAUSAR PÉRDIDA DE DATOS! ¡NO LA HABILITE
   A MENOS QUE SEPA LO QUE ESTÁ HACIENDO!
   Opción: Aptitude::Recommends-Important
   Predeterminado: true
   Descripción: Esta es una opción de configuración obsoleta y que
   Apt::Install-Recommends ha reemplazado. Al inicio, aptitude copiará
   Aptitude::Recommends-Important (si existe) a Apt::Install-Recommends y
   después vaciará Aptitude::Recommends-Important en su fichero de
   configuración de usuario.
   Opción: Aptitude::Safe-Resolver::No-New-Installs
   Predeterminado: false
   Descripción: Si define esta opción con valor de true, cuando active el
   solucionador de dependencias “seguro” mediante --safe-resolver o
   utilizando la opción de línea de órdenes safe-upgrade, no se permitirá al
   solucionador instalar paquetes que no lo están ya actualmente.
   Opción: Aptitude::Safe-Resolver::No-New-Upgrades
   Predeterminado: false
   Descripción: Si se activa esta opción, cuando active el solucionador de
   dependencias “seguro” mediante --safe-resolver o utilizando la opción de
   línea de órdenes safe-upgrade, no se permitirá al solucionador instalar
   paquetes que no lo están ya actualmente.
   Opción: Aptitude::Sections::Descriptions
   Predeterminado: Véase $prefix/share/aptitude/section-descriptions
   Descripción: Esta opción es un grupo cuyos miembros definen las
   descripciones mostradas para cada sección cuando emplea la directriz de
   agrupación “section” para la jerarquía de paquetes. Las descripciones se
   asignan a árboles de sección en base al último componente del nombre: por
   ejemplo, un miembro del grupo llamado “games” se utilizará para describir
   las secciones “games”, “non-free/games”, y “non-free/desktop/games”. En el
   texto comprendido en las descripciones de sección, se reemplaza la cadena
   “\n” por un corte de líneas, y la cadena “''”, por una comilla doble.
   Opción: Aptitude::Sections::Top-Sections
   Predeterminado: "main"; "contrib"; "non-free"; "non-US";
   Descripción: Un grupo de configuración cuyos elementos son los nombres de
   las secciones en el nivel superior del archivo. Las directrices de
   agrupación “topdir”, “subdir”, y “subdirs” utilizan esta lista para
   interpretar los campos de «Sección»: si el primer elemento de ruta de la
   sección de un paquete no está contenido en esta lista, o si su sección
   sólo tiene un elemento, se agrupará el paquete utilizando el primer
   miembro de esta lista como primer elemento de ruta. Por ejemplo, si el
   primer miembro de Top-Sections es “main”, un paquete cuya sección es
   “games/arcade” se tratará como si su campo de sección fuese
   “main/games/arcade”.
   Opción: Aptitude::Simulate
   Predeterminado: false
   Descripción: En modo de línea de órdenes, hace que aptitude solo muestre
   las acciones que se van a llevar a cabo (en lugar de llevarlas a cabo
   directamente); en la interfaz gráfica, hace que aptitude se inicie en modo
   de solo lectura independientemente de si usted es root (administrador), o
   no. Ésto equivale a la opción en línea de órdenes -s.
   Opción: Aptitude::Spin-Interval
   Predeterminado: 500
   Descripción: El número de segundos que dejar entre actualizar la “rueda”
   que aparece cuando el solucionador de problemas está en ejecución.
   Opción: Aptitude::Suggests-Important
   Predeterminado: false
   Descripción: This is an obsolete option; use
   Apt::AutoRemove::SuggestsImportant instead. Setting this option to true
   has the same effect as setting Apt::AutoRemove::SuggestsImportant to true.
   Opción: Aptitude::Suppress-Read-Only-Warning
   Predeterminado: false
   Descripción: Si define esto como false, aptitude mostrará un aviso la
   primera vez que intente modificar el estado de los paquetes cuando
   aptitude está en modo de sólo lectura.
   Opción: Aptitude::Theme
   Predeterminado:
   Descripción: El tema que aptitude debe utilizar; para más información,
   consulte “Temas.”.
   Opción: Aptitude::Track-Dselect-State
   Predeterminado: true
   Descripción: Si define esta opción como true, aptitude intentará detectar
   si se ha modificado el estado de un paquete con dselect o con la orden
   dpkg: por ejemplo, si elimina un paquete utilizando dpkg, aptitude no
   intentará reinstalarlo. Observe que este comportamiento puede ser
   errático.
   Opción: Aptitude::UI::Advance-On-Action
   Predeterminado: false
   Descripción: Si define esta opción como true, aptitude resaltará el
   siguiente elemento del grupo tras modificar el estado de un paquete.
   Opción: Aptitude::UI::Auto-Show-Reasons
   Predeterminado: true
   Descripción: Si define esta opción como true, al seleccionar un paquete
   roto o que parece causar que otros paquetes estén rotos el área de
   información mostrará algunas de las razones de porqué la ruptura tiene
   lugar.
   Opción: Aptitude::UI::Default-Grouping
   Predeterminado:
   filter(missing),status,section(subdirs,passthrough),section(topdir)
   Descripción: Definir la directriz de agrupación predeterminada utilizada
   en las listas de paquetes. Para información adicional acerca de las
   directrices de agrupación, consulte “Personalizar la jerarquía de
   paquetes”.
   Opción: Aptitude::UI::Default-Package-View
   Predeterminado:
   Descripción: Esta opción es un grupo cuyos miembros definen la
   presentación predeterminada de la interfaz de aptitude. Para más
   información, consulte “Personalizar el diseño de la interfaz.”.
   Opción: Aptitude::UI::Default-Preview-Grouping
   Predeterminado: action
   Descripción: Definir la directriz de agrupación predeterminada para las
   pantallas de previsualización. Para información adicional acerca de las
   directrices de agrupación, consulte “Personalizar la jerarquía de
   paquetes”.
   Opción: Aptitude::UI::Default-Sorting
   Predeterminado: name
   Descripción: La directriz de ordenación predeterminada para la vista de
   paquetes. Para más información, consulte “Personalizar cómo se ordenan los
   paquetes”.
   Opción: Aptitude::UI::Description-Visible-By-Default
   Predeterminado: true
   Descripción: Cuando se muestra una lista de paquetes, el área de
   información (que generalmente contiene la descripción completa del paquete
   seleccionado) será visible si la opción tiene valor de true, y estará
   oculta si el valor es false.
   Opción: Aptitude::UI::Exit-On-Last-Close
   Predeterminado: true
   Descripción: Si define esta opción como true, cerrar todas las vistas
   activas cierra aptitude; de no ser así aptitude no se cerrará hasta que
   invoque la orden Acciones → Salir (Q). Para más información, consulte
   “Trabajar con varias vistas.”.
   Opción: Aptitude::UI::Fill-Text
   Predeterminado: false
   Descripción: Si define esta opción como true, aptitude le dará un formato
   a las descripciones de manera que cada línea ocupe exactamente el ancho de
   la pantalla.
   Opción: Aptitude::UI::Flat-View-As-First-View
   Predeterminado: false
   Descripción: Si define esta opción como true, aptitude mostrará una vista
   plana al inicio, en lugar de la vista predeterminada.
   Opción: Aptitude::UI::HelpBar
   Predeterminado: true
   Descripción: Si define esta opción como true, verá una línea con los
   atajos de teclado más importantes en la parte superior de la pantalla.
   Opción: Aptitude::UI::Incremental-Search
   Predeterminado: true
   Descripción: Si define esta opción como true, aptitude realizará búsquedas
   “incrementales”: a medida que introduce el patrón de búsqueda, buscará el
   siguiente paquete que se corresponda con lo que ha introducido hasta el
   momento.
   Opción: Aptitude::UI::InfoAreaTabs
   Predeterminado: false
   Descripción: Si define esta opción como true, aptitude mostrará pestañas
   justo encima del área de información (el panel en el fondo de la
   pantalla), describiendo los diferentes modos en los que puede configurar
   esta área.
   Opción: Aptitude::UI::Keybindings
   Predeterminado:
   Descripción: Éste es un grupo cuyos miembros definen las conexiones entre
   atajos de teclado y órdenes dentro de aptitude. Para más información,
   consulte “Personalizar teclas rápidas.”.
   Opción: Aptitude::UI::Menubar-Autohide
   Predeterminado: false
   Descripción: Si define esta opción como true, la barra de menú estará
   oculta mientras no esté en uso.
   Opción: Aptitude::UI::Minibuf-Download-Bar
   Predeterminado: false
   Descripción: Si define esta opción como true, aptitude empleará un
   mecanismo menos visible para mostrar el progreso de las descargas: verá
   una barra en la base de la pantalla mostrando el estado actual de la
   descarga. Puede abortar una descarga activa presionando q.
   Opción: Aptitude::UI::Minibuf-Prompts
   Predeterminado: false
   Descripción: Si define esta opción como true, algunas preguntas (tales
   como preguntas yes/no o preguntas de elección múltiple) se mostrarán en la
   base de la pantalla, y no en ventanas de dialogo.
   Opción: Aptitude::UI::New-Package-Commands
   Predeterminado: true
   Descripción: Si define esta opción como false, las órdenes tales como
   Paquete → Instalar (+) tendrán el mismo comportamiento, ya obsoleto, que
   tenían en versiones anteriores de aptitude.
   Opción: Aptitude::UI::Package-Display-Format
   Predeterminado: %c%a%M %p %Z %v %V
   Descripción: Esta opción controla la cadena formato utilizada para mostrar
   los paquetes en la lista de paquetes. Para más información, consulte
   “Personalizar la presentación de los paquetes”.
   Opción: Aptitude::UI::Package-Header-Format
   Predeterminado: %N %n #%B %u %o
   Descripción: Esta opción controla la cadena formato utilizada para mostrar
   la cabecera de las listas de paquetes (p. ej., la línea que aparece entre
   la lista de paquetes y la barra de menú). Para más información acerca de
   las cadenas formato, consulte “Personalizar la presentación de los
   paquetes”.
   Opción: Aptitude::UI::Package-Status-Format
   Predeterminado: %d
   Descripción: Esta opción controla la cadena formato utilizada para mostrar
   la línea de estado de las listas de paquetes (p. ej., la línea que aparece
   entre la lista de paquetes y el área de información). Para más información
   relativa a las cadenas formato, consulte “Personalizar la presentación de
   los paquetes”.
   Opción: Aptitude::UI::Pause-After-Download
   Predeterminado: OnlyIfError
   Descripción: Si define esta opción como true, aptitude le preguntará si
   quiere continuar con la instalación una vez finalizada la descarga. Si el
   valor es OnlyIfError, el mensaje solo aparecerá en caso de que la descarga
   haya fallado. De otra manera, si la opción tiene valor de false aptitude
   procederá inmediatamente a la siguiente pantalla una vez finalizada la
   descarga.
   Opción: Aptitude::UI::Preview-Limit
   Predeterminado:
   Descripción: El filtro predeterminado que se aplica a la pantalla de
   previsualización. Para más detalles acerca de su formato, consulte
   “Patrones de búsqueda”.
   Opción: Aptitude::UI::Prompt-On-Exit
   Predeterminado: true
   Descripción: Si define esta opción con valor de true, aptitude le pedirá
   una confirmación cuando desee salir del programa.
   Opción: Aptitude::UI::Styles
   Predeterminado:
   Descripción: Éste es un grupo de configuración cuyos miembros definen el
   estilo de texto que aptitude emplea para mostrar información. Para más
   información, consulte “Personalizar los colores del texto y estilos.”.
   Opción: Aptitude::UI::ViewTabs
   Predeterminado: true
   Descripción: Si define esta opción con valor de false, aptitude no
   mostrará “pestañas” describiendo las vistas activas presentes en el margen
   superior de la pantalla.
   Opción: Aptitude::Warn-Not-Root
   Predeterminado: true
   Descripción: Si define esta opción con valor de true, aptitude detectará
   cuando precise privilegios de root (administrador), y le preguntará si
   desea cambiar a la cuenta de root si aún no lo es. Para más información,
   consulte “Convertirse en root.”.
   Opción: DebTags::Vocabulary
   Predeterminado: /usr/share/debtags/vocabulary
   Descripción: La ubicación del fichero de vocabulario de debtags, utilizado
   para cargar los meta-datos de marcas de paquetes.
   Opción: Dir::Aptitude::state
   Predeterminado: /var/lib/aptitude
   Descripción: El directorio en el que se guarda la información persistente
   de estado de aptitude.
   Opción: Quiet
   Predeterminado: 0
   Descripción: Controlar el grado de verbosidad en el modo de línea de
   órdenes. Definirlo con un valor más alto desactiva los indicadores de
   progreso.

  Temas.

   En aptitude un tema es simplemente un conjunto de configuraciones que
   “están agrupados”. Los temas funcionan invalidando los valores
   predeterminados de las opciones: si una opción no está definida en el
   fichero de configuración del sistema, o en su propio fichero personal de
   configuración, aptitude utilizará la configuración del tema presente de
   haber uno disponible, antes de utilizar el valor estándar predeterminado.

   Un tema es simplemente un grupo nombrado bajo Aptitude::Themes; cada
   opción de configuración contenida en el grupo invalidará la
   correspondiente opción en la configuración global. Por ejemplo, si
   selecciona el tema Dselect, la opción
   Aptitude::Themes::Dselect::Aptitude::UI::Package-Display-Format invalidará
   el valor predeterminado de la opción Aptitude::UI::Package-Display-Format.

   Para seleccionar un tema, defina la opción de configuración
   Aptitude::Theme con el nombre del tema; por ejemplo,

 Aptitude::Theme Vertical-Split;

   aptitude incorpora los siguientes temas en
   /usr/share/aptitude/aptitude-defaults:

   Dselect

           Este tema hace que aptitude se parezca más en estética y
           funcionamiento al gestor de paquetes «legacy» (legado) dselect.

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
 --\ Paquetes instalados
   --\ admin
     --\ principal - The Debian base system
 c   base  base-file 3.0.16      3.0.16      Debian base system miscellaneous fil
 c   base  base-pass 3.5.7       3.5.7       Debian base system master password a
 c   base  bash      2.05b-15    2.05b-15    The GNU Bourne Again SHell
 c   base  bsdutils  1:2.12-7    1:2.12-7    Basic utilities from 4.4BSD-Lite
 c   base  coreutils 5.0.91-2    5.0.91-2    The GNU core utilities
 c   base  debianuti 2.8.3       2.8.3       Miscellaneous utilities specific to
 c   base  diff      2.8.1-6     2.8.1-6     File comparison utilities
 base-files                      installed ; none                       required
 This package contains the basic filesystem hierarchy of a Debian system, and
 several important miscellaneous files, such as /etc/debian_version,
 /etc/host.conf, /etc/issue, /etc/motd, /etc/profile, /etc/nsswitch.conf, and
 others, and the text of several common licenses in use on Debian systems.







   Vertical-Split

           Este tema reorganiza la pantalla: la descripción del paquete
           seleccionado aparecería a la derecha de la lista de paquetes, en
           lugar de debajo de la misma. Este tema es útil en terminales muy
           anchas, y quizás también a la hora de editar la jerarquía de
           paquetes integrada.

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
 aptitude 0.2.14.1
 --\ Paquetes instalados               Modern computers support the Advanced  #
   --\ admin - Utilidades de adminstración
     --\ principal - The main Debian archive  (ACPI) to allow intelligent power
 i   acpid         1.0.3-19   1.0.3-19   management on your system and to query
 i   alien         8.44       8.44       battery and configuration status.
 i   anacron       2.3-9      2.3-9
 i   apt-show-vers 0.07       0.07       ACPID is a completely flexible, totally
 i A apt-utils     0.5.25     0.5.25     extensible daemon for delivering ACPI
 i   apt-watch     0.3.2-2    0.3.2-2    events. It listens on a file
 i   aptitude      0.2.14.1-2 0.2.14.1-2 (/proc/acpi/event) and when an event
 i   at            3.1.8-11   3.1.8-11   occurs, executes programs to handle the
 i   auto-apt      0.3.20     0.3.20     event. The programs it executes are
 i   cron          3.0pl1-83  3.0pl1-83  configured through a set of
 i   debconf       1.4.29     1.4.29     configuration files, which can be
 i   debconf-i18n  1.4.29     1.4.29     dropped into place by packages or by
 i A debootstrap   0.2.39     0.2.39     the admin.
 i A deborphan     1.7.3      1.7.3
 i   debtags       0.16       0.16       In order to use this package you need a
 i A defoma        0.11.8     0.11.8     recent Kernel (=>2.4.7). This can be
 i   discover      2.0.4-5    2.0.4-5    one including the patches on
 Utilities for using ACPI power management

Jugar al Buscaminas

   En el caso de que esté cansado de instalar y eliminar paquetes, aptitude
   incluye una versión del clásico juego “Buscaminas”. Seleccione Acciones →
   Jugar al buscaminas para iniciarlo; verá entonces el tablero inicial del
   Buscaminas:

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú  ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
 Buscaminas                                              10/10 minas  13 segundos





                                    +--------+
                                    |        |
                                    |        |
                                    |        |
                                    |        |
                                    |        |
                                    |        |
                                    |        |
                                    |        |
                                    +--------+






   Comprendidos en el rectángulo que aparece en la pantalla hay diez minas
   ocultas. Su meta es determinar a través de la intuición, lógica y suerte,
   donde están esas minas sin detonar ninguna de ellas. Para hacer ésto, ha
   de descubrir todos los cuadrados que no contienen minas; al hacerlo,
   aprenderá información valiosa relativa a qué cuadrados contienen minas.
   Cuidado: descubrir un cuadrado que contiene una mina la detonará,
   finalizando la partida inmediatamente.

   Para descubrir un cuadrado (y así descubrir si hay una mina ahí
   escondida), seleccione el cuadrado con las flechas de dirección y pulse
   Intro:

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú  ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
 Buscaminas                                             10/10 minas  387 segundos





                                    +--------+
                                    | 2......|
                                    | 2111...|
                                    |    1...|
                                    | 1111...|
                                    |11...111|
                                    |...113  |
                                    |1122    |
                                    |        |
                                    +--------+






   Como puede ver en la imagen, algunas partes ocultas (vacías) del tablero
   han quedado descubiertas. Los cuadrados que contengan un . son aquellos
   que no están contiguos a una mina; los números que aparecen en los
   cuadrados restantes indican la distancia a la que están de las minas.

   Si cree saber donde está una mina, puede “marcar” el cuadrado. Para hacer
   esto, seleccione el cuadrado sospechoso y pulse f. Por ejemplo, en la
   imagen inferior, decidí que el cuadrado en el lado izquierdo del tablero
   parecía sospechoso...

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú  ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
 Buscaminas                                              9/10 minas  961 segundos





                                    +--------+
                                    | 2......|
                                    | 2111...|
                                    |    1...|
                                    |F1111...|
                                    |11...111|
                                    |...113  |
                                    |1122    |
                                    |        |
                                    +--------+






   Como puede ver, hay una F en el cuadrado seleccionado. Ya no puede
   descubrir este cuadrado, incluso por accidente, hasta que elimine la marca
   (pulsando f otra vez). Una vez que haya marcado todas las minas contiguas
   a un cuadrado (por ejemplo, aquellos cuadrados etiquetados con 1 contiguas
   a la marca) puede hacer un “barrido” en torno al cuadrado. Este es solo un
   conveniente atajo para descubrir todos los cuadrados cerca de él
   (exceptuando aquellos marcados,por supuesto). Por ejemplo, haciendo un
   barrido en torno al 1 de la imagen superior:

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú  ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
 Buscaminas                                              9/10 minas  2290 segundos





                                    +--------+
                                    | 2......|
                                    | 2111...|
                                    |221 1...|
                                    |F1111...|
                                    |11...111|
                                    |...113  |
                                    |1122    |
                                    |        |
                                    +--------+






   Afortunadamente (¿o ha sido suerte?), mi suposición acerca de la ubicación
   de la mina era correcta. De haber errado, habría perdido inmediatamente:

  Acciones  Deshacer  Paquete  Buscar  Opciones  Vistas  Ayuda
 f10: Menú  ?: Ayuda q: Salir u: Actualizar g: Descarga/Instala/Elimina Paqs
 Buscaminas                              Buscaminas    Perdió en 2388 segundos





                                    +--------+
                                    |^2......|
                                    |^2111...|
                                    |221^1...|
                                    |^1111...|
                                    |11...111|
                                    |...113^ |
                                    |1122* ^ |
                                    | ^ ^   ^|
                                    +--------+






   Cuando pierda se revelará la ubicación de todas las minas: aquellas que no
   han explotado están marcadas con un símbolo de intercalación (^), y se
   indica la que ha “pisado” con un asterisco (*).

   --------------

   ^[7] Me complace decir que el número de peticiones de esta índole cayeron
   dramáticamente a continuación de la primera publicación de esta guía.
   Sería una agradable coincidencia de haber una conexión entre ambos
   eventos.

   ^[8] A esto se le denomina a veces como un “proceso de instalación”,
   aunque lo que en realidad esté haciendo sea eliminar o actualizar
   paquetes, además de instalarlos.

   ^[9] Como se ha mencionado antes, esto no índica que los paquetes del
   archivo sean seguros, o incluso no maliciosos; simplemente muestra que son
   genuinos.

   ^[10] Más exactamente: se desinstalarán cuando nada conduzca a ellos a
   través de «Depende», «Predepende» o «Recomienda» desde un paquete
   instalado manualmente. Si Apt::AutoRemove::SuggestsImportant es «true»,
   una relación de «Sugiere» es también suficiente para mantener un paquete
   instalado.

   ^[11] O cuando la resolución inmediata se desactiva.

   ^[12] El paquete con la más alta prioridad en dpkg, no el paquete con la
   más alta prioridad apt pin.

   ^[13] Este límite se impuso porque las estructuras de coste más complejas
   podían dificultar la optimización del solucionador. Puede que las
   versiones futuras del programa eliminen algunas de las restricciones si
   resultan innecesarias.

   ^[14] aptitude trata la coma de manera única si hay un segundo argumento,
   con lo cual “?name(apt,itude)” busca la cadena “apt,itude” en el campo de
   Name de los paquetes.

   Aunque este comportamiento está bien definido, puede dar lugar a
   sorpresas. Recomiendo usar las comillas dobles para todo patrón que
   contenga caracteres que puedan tener algún significado particular.

   ^[15] Los caracteres con un significado especial incluyen: “+”, “-”, “.”,
   “(”, “)”, “|”, “[”, “]”, “^”, “$” y “?”. Observe que algunos de estos son
   también meta-caracteres de aptitude, así que si quiere introducir, por
   ejemplo, un “|” literal, debe usar una barra invertida:
   “?description(\~|)” muestra paquetes cuya descripción contiene un carácter
   de barra vertical (“|”).

   ^[16] También están disponibles las secuencias de escape \\, \n, y \t

   ^[17] El lector astuto habrá notado que, esencialmente, ésta es una manera
   de nombrar de manera explicita la variable en los λ - términos
   correspondientes al término. Generalmente, un término tiene la forma “λ x,
   el nombre es igual a (x, patrón)”; dando lugar a que un objetivo explicito
   x sea visible en el lenguaje de búsqueda.

   ^[18] Esto se ha implementado principalmente por simetría con ?true.

   ^[19] Etiquetar no es posible por el momento; este escape existe para un
   uso futuro.

   ^[20] En algunas terminales, un fondo “amarillo” aparecerá marrón.

Capítulo 3. Preguntas más frecuentes de aptitude

     “¿Cual .... es su nombre?”                                              

     “Yo soy Arturo, rey de los Bretones.”

     “¿Cual ... es su cruzada?”

     “¡Busco el Santo Grial!”

     “¿Cual ... es la velocidad de vuelo de una golondrina sin cargamento?”

     “¿A que se refiere? A una golondrina africana, o europea?”

     “¿Hmmm? Yo ... no lo sé---AAAAAAAAGGGHH!”
                                             -- Monty Python y el Santo Grial

   3.1. ¿Cómo puedo encontrar sólo un paquete en base al nombre?

   3.2. ¿Cómo puedo encontrar paquetes rotos?

   3.3. Quiero seleccionar texto. ¿Porqué aptitude no me permite desactivar
   el ratón?

   3.1. ¿Cómo puedo encontrar sólo un paquete en base al nombre?
        Como se menciona en “Patrones de búsqueda”, cuando realiza una
        búsqueda de un paquete en base al nombre, el texto que introduce es
        en realidad una expresión regular. Por ello, el patrón de búsqueda
        “^nombre$” sólo coincidiría con un paquete llamado nombre.

        Por ejemplo, puede buscar apt (pero no aptitude o synaptic)
        introduciendo ^apt$; puede buscar g++ (pero no g++-2.95 o g++-3.0)
        introduciendo ^g\+\+$.
   3.2. ¿Cómo puedo encontrar paquetes rotos?
        Utilice la orden Buscar → Buscar Roto (b).
   3.3. Quiero seleccionar texto. ¿Porqué aptitude no me permite desactivar
        el ratón?
        Normalmente, no puede seleccionar texto empleando el ratón en una
        terminal xterm mientras haya un programa ejecutándose en esa terminal
        (tal como aptitude). Puede, no obstante, invalidar este
        comportamiento y llevar a cabo una selección presionando
        continuadamente Shift mientras pulsa sobre la terminal.

Capítulo 4. Créditos

           Nadie recuerda al cantante. La canción permanece.           
                                            -- Terry Pratchett, The Last Hero

   Esta sección es un homenaje a algunas de las personas que han contribuido
   a aptitude a lo largo de su vida.

   [Nota] Nota
          Esta sección está más bien incompleta, y es probable que se
          actualice y que crezca a medida que pase el tiempo (en particular,
          muchos de ellos son créditos de las traducciones debido al alto
          número de fuentes de traducciones^[21]). Si piensa que debería
          aparecer en esta lista, escríbame a la dirección
          <dburrows@debian.org> con una explicación de porqué piensa que debe
          estar.

   Traducciones e internacionalización

   Traducción al portugués de Brasil

           Andre Luis Lopes, Gustavo Silva

   Traducción al chino

           Carlos Z.F. Liu

   Traducción al checo

           Miroslav Kure

   Traducción al danés

           Morten Brix Pedersen, Morten Bo Johansen

   Traducción al neerlandés

           Luk Claes

   Traducción al finlandés

           Jaakko Kangasharju

   Traducción al francés

           Martin Quinson, Jean-Luc Coulon

   Traducción al alemán

           Sebastian Schaffert, Erich Schubert, Sebastian Kapfer, Jens Seidel

   Traducción al italiano

           Danilo Piazzalunga

   Traducción al japonés

           Yasuo Eto, Noritada Kobayashi

   Traducción al lituano

           Darius ?itkevicius

   Traducción al polaco

           Michal Politowski

   Traducción al portugués

           Nuno Sénica, Miguel Figueiredo

   Traducción al noruego

           Håvard Korsvoll

   Traducción al español

           Jordi Malloch, Rubén Porras, Javier Fernández-Sanguino, Omar
           Campagne Polaino

   Traducción al sueco

           Daniel Nylander

   Parche inical de i18n

           Masato Taruishi

   Mantenimiento y gestión de la i18n

           Christian Perrier

   Documentación

   Manual de usuario

           Daniel Burrows

   Programación

   Diseño del programa e implementación

           Daniel Burrows

   Compatibilidad con el campo de «Breaks» (rompe) de dpkg

           Ian Jackson, Michael Vogt

   --------------

   ^[21] Debería ser posible reunir una lista relativamente completa de
   aquellos contribuidores de i18n en base al registro de cambios, sus
   referencias en el sistema de seguimiento de fallos de Debian, y el
   histórico de revisiones de aptitude, pero llevar esto a cabo requiere una
   alta inversión en tiempo que no está disponible en este momento.

                       Referencia de la línea de órdenes

   --------------------------------------------------------------------------

   Tabla de contenidos

   aptitude — interfaz de alto nivel para la gestión de paquetes

   aptitude-create-state-bundle — empaqueta el estado actual de aptitude

   aptitude-run-state-bundle — desempaqueta un fichero de estado de aptitude
   e invoca aptitude sobre éste

Nombre

   aptitude — interfaz de alto nivel para la gestión de paquetes

Sinopsis

   aptitude [opciones...] { autoclean | clean | forget-new | keep-all |
   update }

   aptitude [opciones...] { full-upgrade | safe-upgrade } [paquetes...]

   aptitude [opciones...] { build-dep | build-depends | changelog | download
   | forbid-version | hold | install | markauto | purge | reinstall | remove
   | show | unhold | unmarkauto | versions } paquetes...

   aptitude extract-cache-subset directorio_de_salida paquetes...

   aptitude [opciones...] search patrones...

   aptitude [opciones...] { add-user-tag | remove-user-tag } etiqueta
   paquetes...

   aptitude [opciones...] { why | why-not } [patrones...] paquete

   aptitude [-S nombre_de_fichero] [ --autoclean-on-startup |
   --clean-on-startup | -i | -u ]

   aptitude help

Descripción

   aptitude es una interfaz de texto para el sistema de paquetes de Debian
   GNU/Linux.

   Permite al usuario ver la lista de paquetes y realizar tareas de gestión
   tales como instalar, actualizar o eliminar paquetes. Puede llevar a cabo
   las acciones con una interfaz gráfica o en la línea de órdenes.

Acciones en la línea de órdenes

   El primer argumento que no va precedido de un guión (“-”) se toma como una
   acción que el programa ha de llevar a cabo. Si no se especifica ninguna
   opción en la línea de órdenes, aptitude iniciará el modo gráfico.

   Dispone de las siguientes acciones:

   install

           Instala uno o más paquetes. Los paquetes deben aparecer después de
           la orden “install”; si un nombre de paquete contiene una tilde
           (“~”) o un signo de interrogación (“?”), se toma como un patrón de
           búsqueda y se instalará cada paquete que se corresponda con el
           patrón (consulte la sección “Patrones de búsqueda” en el manual de
           referencia de aptitude)

           Para seleccionar una versión en particular de un paquete, añada
           “=versión”: por ejemplo, “aptitude install apt=0.3.1”. De forma
           similar, para seleccionar un paquete de un archivo en particular,
           añada “/archivo” al nombre del paquete: por ejemplo, “aptitude
           install apt/experimental”. No puede definir la arquitectura y la
           versión de un paquete de forma simultánea.

           No tiene que instalar todos los paquetes enumerados en la línea de
           órdenes; puede decirle a aptitude que haga una acción diferente
           con cada paquete si añade un “especificador de invalidación” al
           nombre del paquete. Por ejemplo, aptitude remove wesnoth+
           instalaría wesnoth, no lo eliminaría. Están disponibles los
           siguientes “especificadores de invalidación”:

                paquete+

                        Instala paquete.

                paquete+M

                        Instala el paquete, y lo marca inmediatamente como
                        instalado automáticamente (observe que si nada
                        depende del paquete, éste se eliminaría
                        inmediatamente).

                paquete-

                        Elimina paquete.

                paquete_

                        Purga el paquete: lo elimina junto con todos sus
                        ficheros de configuración y de datos asociados.

                paquete=

                        Retiene el paquete: impide instalar, actualizar o
                        eliminar, así como cualquier futura actualización
                        automática.

                paquete:

                        Mantiene el paquete en su versión actual: cancela
                        instalar, eliminar o actualizar. Al contrario que
                        “retener” (consulte arriba) esto no impide
                        actualizaciones automáticas en el futuro.

                paquete&M

                        Marca el paquete como automáticamente instalado.

                paquete&m

                        Marca el paquete como manualmente instalado.

           Como caso especial, “install” sin argumentos procesaría cualquier
           acción guardada o pendiente de ejecución.

           [Nota] Nota
                  Una vez que introduce Y en la petición final de
                  confirmación, la orden “install” modificará la información
                  guardada en aptitude relativa a qué acciones ejecutar. Por
                  ello, si ejecuta la orden, por ejemplo, “aptitude install
                  foo bar” y después interrumpe la instalación durante la
                  descarga e instalación de paquetes, necesitará ejecutar
                  “aptitude remove foo bar” para cancelar esa orden.

   remove, purge, hold, unhold, keep, reinstall

           Estas órdenes realizan lo mismo que “install”, pero en este caso
           la acción nombrada afectaría a todos aquellos paquetes en la línea
           de órdenes que no la invaliden. La diferencia entre hold (retener)
           y keep (mantener), es que el primero causaría que un paquete se
           ignorase en futuras órdenes safe-upgrade o full-upgrade, mientras
           que keep sólo cancela toda acción programada para ese paquete.
           unhold (anular retención) permitiría actualizar un paquete en un
           futuro con las órdenes safe-upgrade o full-upgrade, que de otra
           forma no alterarían su estado.

           Por ejemplo, “aptitude remove '~ndeity'” eliminaría todos los
           paquetes cuyo nombre contiene “deity”.

   markauto, unmarkauto

           Marca paquetes como automática o manualmente instalado,
           respectivamente. Los paquetes se especifican al igual que con la
           orden “install”. Por ejemplo, “aptitude markauto '~slibs'”
           marcaría todos los paquetes de la sección “libs” como
           automáticamente instalados.

           Para más información acerca de paquetes automáticamente
           instalados, consulte la sección “Gestionar paquetes
           automáticamente instalados” del manual de referencia de aptitude.

   build-depends, build-dep

           Satisface las dependencias de construcción («build-dependencies»)
           de un paquete. Cada nombre de paquete puede ser un paquete fuente,
           en cuyo caso se instalarán las dependencias de compilación de ese
           paquete fuente; por otro lado, los paquetes binarios se encuentran
           de la misma manera que con la orden “install”, y así satisfacer
           las dependencias de compilación de los paquetes fuente que
           compilan esos paquetes binarios.

           De estar presente el parámetro de línea de órdenes --arch-only,
           sólo obedecería aquellas dependencias de compilación
           independientes de arquitectura (p. ej., no Build-Depends-Indep o
           Build-Conflicts-Indep).

   forbid-version

           Impide que un paquete se actualice a un versión determinada. Esto
           evita que aptitude lo actualice a esa versión de forma automática,
           pero permitirá una actualización automática a otra versión futura.
           De forma predeterminada, aptitude selecciona la versión a la que
           se actualizaría el paquete en cualquier circunstancia; puede
           invalidar esta selección añadiendo “=versión” al nombre del
           paquete: por ejemplo “aptitude forbid-version vim=1.2.3.broken-4”.

           Esta orden es útil para evitar versiones rotas de paquetes sin
           necesidad de definir y eliminar retenciones manuales. Si al final
           decide que realmente quiere la versión prohibida, la orden
           “aptitude install paquete” invalidaría la prohibición.

   update

           Actualiza la lista de paquetes disponibles desde las fuentes de
           apt (equivale a “apt-get update”)

   safe-upgrade

           Actualiza los paquetes instalados a su versión más reciente. Los
           paquetes instalados se eliminarán a menos que no se utilizen
           (consulte la sección “Gestionar paquetes automáticamente
           instalados” en la guía de referencia de aptitude). Los paquetes no
           instalados se pueden instalar para resolver dependencias a menos
           que se invoque la orden --no-new-installs.

           Si no introduce ningún paquete en la línea de órdenes, aptitude
           intentará actualizar todos los paquetes susceptibles de ello. De
           no ser así, aptitude intentará actualizar sólo aquellos paquetes
           que se deben actualizar. Puede extender paquete con sufijos de la
           misma manera que da argumentos a aptitude install, lo que le
           permite dar a aptitude instrucciones adicionales. Por ejemplo,
           aptitude safe-upgrade bash dash- intentaría actualizar el paquete
           bash y eliminar el paquete dash.

           A veces es necesario eliminar un paquete para poder actualizar
           otro; en tales situaciones esta orden no es capaz de actualizar
           paquetes. Utilice la orden full-upgrade para actualizar tantos
           paquetes como sea posible.

   full-upgrade

           Actualiza paquetes instalados a su versión más reciente,
           instalando o eliminando paquetes si es necesario. Esta orden es
           menos conservadora que safe-upgrade, y por ello más proclive a
           ejecutar acciones no deseadas. Sin embargo, es capaz de actualizar
           paquetes que safe-upgrade es incapaz de actualizar.

           Si no introduce ningún paquete en la línea de órdenes, aptitude
           intenta actualizar todos los paquetes susceptibles de ello. De no
           ser así, aptitude intenta actualizar sólo aquellos paquetes que le
           indica actualizar. Puede extender el o los paquetes con sufijos de
           la misma manera que da argumentos a aptitude install, lo que le
           permite dar a aptitude instrucciones adicionales. Por ejemplo,
           aptitude safe-upgrade bash dash- intentaría actualizar el paquete
           bash y eliminar el paquete dash.

           [Nota] Nota
                  Por razones históricas, la orden se llamaba originalmente
                  dist-upgrade, y aptitude aún reconoce dist-upgrade como
                  sinónimo de full-upgrade.

   keep-all

           Cancela todas las acciones programadas para cualquier paquete; se
           volverá al estado original cualquier paquete cuyo estado virtual
           indique instalar, actualizar o eliminar el paquete.

   forget-new

           Olvida toda información interna relativa a qué paquetes son
           “nuevos” (equivale a pulsar “f” en el modo gráfico).

   search

           Busca paquetes que coincidan con uno de los patrones introducidos
           en la línea de órdenes. Se mostrarían todos los paquetes que
           coincidan con cualquier patrón introducido; por ejemplo “aptitude
           search '~N' edit” listaría todos los paquetes “nuevos” y todos
           aquellos paquetes cuyo nombre contenga “edit”. Para más
           información acerca de patrones de búsqueda, consulte la siguiente
           sección en la guía de referencia de aptitude “Patrones de
           búsqueda”.

           [Nota] Nota
                  En el ejemplo anterior, “aptitude search '~N' edit” tiene
                  dos argumentos después de search, y por ello busca dos
                  patrones: “~N” y “edit”. Como se describe en la referencia
                  de patrones de búsqueda, un único patrón compuesto de dos
                  patrones separados por un espacio (como “~N edit”), sólo
                  encuentra una coincidencia si ambos patrones coinciden. Por
                  ello, “aptitude search '~N edit' ” sólo mostrará paquetes
                  “nuevos” cuyo nombre contenga “edit”.

           A menos que introduzca la opción -F, la salida de aptitude search
           tendrá este aspecto:

 i   apt                             - Advanced front-end for dpkg
 pi  apt-build                       - frontend to apt to build, optimize and in
 cp  apt-file                        - APT package searching utility -- command-
 ihA raptor-utils                    - Raptor RDF Parser utilities

           Cada resultado de la búsqueda aparece en una línea distinta. El
           primer carácter de cada línea indica el estado actual del paquete:
           los estados más comunes son p, no se encontró ninguna señal de que
           tal paquete exista en el sistema, c, el paquete se eliminó pero
           sus ficheros de configuración permanecen en el sistema, i, el
           paquete está instalado, y v, que significa que el paquete es
           virtual. El segundo carácter indica la acción programada (de
           existir, si no, verá un espacio en blanco) para el paquete. Las
           acciones principales son i, el paquete se va a instalar, d, el
           paquete se va a eliminar, y p, que significa que el paquete y sus
           ficheros de configuración se van a eliminar completamente
           (purgar). Si el carácter es A, es que el paquete se instaló
           automáticamente.

           Para una lista completa de las marcas de estado y de acción
           posibles, consulte la sección “Acceder a la información de los
           paquetes” en la guía de referencia de aptitude. Para personalizar
           la salida de search, consulte las opciones de línea de órdenes -F
           y --sort.

   show

           Muestra información detallada relativa a uno o más paquetes,
           listados de acuerdo a la orden «search». Si el nombre de un
           paquete contiene un carácter de tilde (“~”) o un signo de
           interrogación (“?”), se tomará como un patrón de búsqueda y verá
           todos aquellos paquetes coincidentes (consulte la sección
           “Patrones de búsqueda” en el manual de referencia de aptitude).

           Si el nivel de verbosidad es 1 o mayor (p. ej., al menos hay un -v
           en la línea de órdenes), aparecerá información acerca de todas las
           versiones de los paquetes. De no ser así, se muestra la
           información acerca de la “versión candidata” (la versión que
           “aptitude install” descargaría).

           Puede ver información relativa a una versión diferente del paquete
           añadiendo =versión al nombre del paquete; puede ver la versión de
           un archivo o distribución en particular añadiendo /archivo o
           /distribuciónal nombre del paquete. De introducirse uno, solo se
           mostrará la versión que Ud. requirió, independientemente del nivel
           de verbosidad.

           Si el nivel de verbosidad es 1 o mayor, se mostrará la
           arquitectura del paquete, tamaño comprimido, nombre de fichero y
           la suma de control md5. Si el nivel de verbosidad es 2 o mayor, la
           versión o versiones seleccionadas se mostrarán una vez por cada
           archivo en el que se encontraron.

   versions

           Muestra las versiones de los paquetes listados en la línea de
           órdenes.

 $ aptitude versions wesnoth
 p   1:1.4.5-1                                                             100
 p   1:1.6.5-1                                    unstable                 500
 p   1:1.7.14-1                                   experimental             1

           Cada versión aparece en una línea separada. Los tres caracteres a
           la izquierda indican el estado actual, el estado planeado (de
           existir), y si el paquete se ha instalado automáticamente; para
           más información acerca de sus significados, consulte la
           documentación de aptitude search. A la derecha del número de
           versión puede ver las publicaciones en que disponen de esa
           versión, y la prioridad de anclaje de la versión.

           En el caso de que un nombre de paquete contenga un carácter de
           tilde (“~”) o signo de interrogación (“?”), se tomará como un
           patrón de búsqueda y mostrarán todas las versiones coincidentes
           (consulte la sección “Patrones de búsqueda” en el manual de
           referencia de aptitude. Por ejemplo, aptitude versions '~i'
           mostrará todas las versiones actualmente instaladas en el sistema,
           y nada más, ni siquiera otras versiones del mismo paquete.

 $ aptitude versions '~nexim4-daemon-light'
 Package exim4-daemon-light:
 i   4.71-3                                                                100
 p   4.71-4                                       unstable                 500

 Package exim4-daemon-light-dbg:
 p   4.71-4                                       unstable                 500

           Si la entrada es un patrón de búsqueda o si se mostrará más de una
           de las versiones del paquete, aptitude agrupará automáticamente la
           salida según el paquete, como se puede ver más arriba. Puede
           desactivar esto mediante --group-by=none, en cuyo caso aptitude
           mostrará una única lista de todas las versiones que se han
           encontrado, incluyendo automáticamente el nombre del paquete en
           cada línea de la salida.

 $ aptitude versions --group-by=none '~nexim4-daemon-light'
 i   exim4-daemon-light 4.71-3                                             100
 p   exim4-daemon-light 4.71-4                    unstable                 500
 p   exim4-daemon-light-dbg 4.71-4                unstable                 500

           Para desactivar el nombre de paquete, introduzca
           --show-package-names=never:

 $ aptitude versions --show-package-names=never --group-by=none '~nexim4-daemon-light'
 i   4.71-3                                                                100
 p   4.71-4                                       unstable                 500
 p   4.71-4                                       unstable                 500

           Además de las opciones anteriores, puede controlar la información
           que se muestra para cada versión mediante la opción de línea de
           órdenes -F. El orden en el que se muestran las versiones se puede
           controlar mediante la opción de línea de órdenes --sort. Para
           evitar que aptitude dé formato a la salida en forma de columnas,
           utilice --disable-columns.

   add-user-tag, remove-user-tag

           Añade una etiqueta de usuario o quitar una etiqueta de usuario del
           grupo de paquetes seleccionado. Si el nombre de un paquete
           contiene una tilde (“~”) o un signo de interrogación (“?”), se
           tomará como un patrón de búsqueda y la etiqueta se añadirá o
           quitará a todos los paquetes que coinciden con el patrón (consulte
           la sección “Patrones de búsqueda” en el manual de referencia de
           aptitude).

           Las etiquetas de usuario son cadenas arbitrarias asociadas a un
           paquete. Pueden utilizarse en conjunción con el término de
           búsqueda ?user-tag(etiqueta), el cual selecciona todos los
           paquetes con una etiqueta de usuario que coincide con etiqueta.

   why, why-not

           Explica la razón de que un paquete en particular no se debería, o
           deba, instalar en el sistema.

           Esta orden busca paquetes que requieren o entran en conflicto con
           el paquete dado. Muestra una secuencia de dependencias que llevan
           al paquete objetivo, acompañado de una nota que indica el estado
           de instalación de cada paquete en la cadena de dependencias.

 $ aptitude why kdepim
 i   nautilus-data Recomienda nautilus
 i A nautilus      Recomienda desktop-base (>= 0.2)
 i A desktop-base  Sugiere   gnome | kde | xfce4 | wmaker
 p   kde           Depende de   kdepim (>= 4:3.4.3)

           La orden why busca una cadena de dependencias que instala el
           paquete nombrado en la línea de órdenes, tal y como se ve arriba.
           Tenga en cuenta que la dependencia que aptitude ha generado en
           este caso es sólo una sugerencia. Esto se debe a que ningún
           paquete instalado actualmente en el sistema depende o recomienda
           el paquete kdepim; de haber una dependencia más fuerte, aptitude
           la habría mostrado.

           Al contrario, why-not encuentra una cadena de dependencias que
           lleva a un conflicto con el paquete objetivo.

 $ aptitude why-not textopo
 i   ocaml-core          Depende de   ocamlweb
 i A ocamlweb            Depende de   tetex-extra | texlive-latex-extra
 i A texlive-latex-extra tiene conflictos con textopo

           Si hay uno o más patrones, aptitude iniciará la búsqueda a partir
           de estos patrones; esto es, el primer paquete de la cadena que
           devuelva será un paquete que coincide con el patrón en cuestión.
           Estos patrones se consideran como nombres de paquete a menos que
           contengan un signo de tilde (“~”) o un signo de interrogación
           (“?”), en cuyo caso se toman como patrones de búsqueda (consulte
           la sección “Patrones de búsqueda” en el manual de referencia de
           aptitude).

           Si no introduce ningún patrón, aptitude busca cadenas de
           dependencias qué se inician en paquetes manualmente instalados.
           Esto muestra con efectividad los paquetes que han causado o
           causarían que se instalase un paquete en particular.

           [Nota] Nota
                  aptitude why no ejecuta una resolución completa de
                  dependencias, solo muestra relaciones directas entre
                  paquetes. Por ejemplo, si A depende de B, C depende de D, y
                  B y C entran en conflicto, “aptitude why-not D” no
                  devolvería la respuesta “A depende de B, B entra en
                  conflicto con C, y D depende de C”.

           De manera predeterminada, aptitude solo muestra la cadena de
           dependencias “con más paquetes instalados, la más fuerte, precisa
           y corta”. Esto significa que busca una cadena que solo contiene
           paquetes instalados o que se van a instalar; busca las
           dependencias más fuertes posibles bajo ese límite; busca cadenas
           que evitan dependencias «OR» y «Provides»; y busca la cadena de
           dependencias más corta que se ajusta a estos criterios. Estas
           reglas se debilitan de manera progresiva hasta encontrar una
           correspondencia.

           Si el nivel de verbosidad es 1 o más, se mostrarán todas las
           explicaciones que aptitude pueda encontrar, en orden inverso de
           importancia. Si el nivel de verbosidad es 2 o más, se mostrará una
           cantidad realmente excesiva de información de depuración de fallos
           a través de la salida estándar.

           Esta orden devuelve 0 si tiene éxito, 1 si no se pudo generar una
           explicación, y -1 en caso de error.

   clean

           Elimina todos los paquetes .deb del directorio almacén de paquetes
           (generalmente /var/cache/apt/archives).

   autoclean

           Elimina todos los paquetes del almacén que ya no se pueden
           descargar. Esto le permite evitar que un almacén crezca sin
           control a lo largo del tiempo, sin tener que vaciarlo en su
           totalidad.

   changelog

           Descarga y muestra el registro de cambios de Debian para cada
           paquete binario o fuente dado.

           De manera predeterminada, se descarga el registro de cambios de la
           versión que se va a instalar con “aptitude install”. Puede
           seleccionar una versión en particular de un paquete añadiendo
           =versión al nombre del paquete; puede seleccionar una versión de
           un archivo o distribución en particular añadiendo /archivo o
           /distribuciónal nombre del paquete (por ejemplo, /unstable o
           /sid).

   download

           Descarga el fichero .deb del paquete dado al directorio actual. Si
           el nombre de un paquete contiene un signo de tilde (“~”) o un
           signo de interrogación (“?”), se tomará como un patrón de búsqueda
           y se descargarán todos los paquetes correspondientes (consulte la
           sección “Patrones de búsqueda” del manual de referencia de
           aptitude).

           De manera predeterminada, se descarga la versión que se instalaría
           con “aptitude install”. Puede seleccionar una versión en
           particular de un paquete añadiendo =versión al nombre del paquete;
           puede seleccionar una versión de un archivo o distribución en
           particular añadiendo /archivo o /release al nombre del paquete
           (por ejemplo, /unstable o /sid).

   extract-cache-subset

           Copia el directorio de configuración de apt (/etc/apt) y un
           subconjunto de la base de datos de paquetes al directorio
           especificado. Si no menciona ningún paquete se copiará la base de
           datos de paquetes en su totalidad; de otra forma sólo se copiarán
           las entradas correspondientes a los paquetes nombrados. Cada
           nombre de paquete puede ser un patrón de búsqueda, y se
           seleccionarán todos los paquetes que se correspondan con el patrón
           (consulte la sección “Patrones de búsqueda”). Cualquier base de
           datos de paquetes presente en el directorio de salida se
           sobreescribirá.

           Las dependencias en estancias de paquete binarias se reescribirán
           para eliminar referencias a paquetes que no se encuentren en el
           conjunto seleccionado.

   help

           Muestra un breve resumen de las órdenes disponibles y sus
           opciones.

Opciones

   Puede utilizar las siguientes opciones para modificar el comportamiento de
   las acciones descritas anteriormente. Observe que mientras que todas las
   órdenes aceptan todas las opciones, algunas opciones no afectan a ciertas
   órdenes y estas órdenes las ignorarán.

   --add-user-tag etiqueta

           Para full-upgrade, safe-upgrade, forbid-version, hold, install,
           keep-all, markauto, unmarkauto, purge, reinstall, remove, unhold,
           y unmarkauto: añadir la etiqueta de usuario etiqueta a todos los
           paquetes instalados, eliminados o actualizados mediante esta
           orden, al igual que con la orden add-user-tag.

   --add-user-tag-to etiqueta,patrón

           Para full-upgrade, safe-upgrade forbid-version, hold, install,
           keep-all, markauto, unmarkauto, purge, reinstall, remove, unhold,
           and unmarkauto: añadir la etiqueta de usuario etiqueta a todos los
           paquetes que coinciden con patrón al igual que con la orden
           add-user-tag. El patrón es un patrón de búsqueda como se describe
           en la sección “Patrones de búsqueda” en el manual de referencia de
           aptitude.

           Por ejemplo, aptitude safe-upgrade --add-user-tag-to
           "new-installs,?action(install)" añadiría la etiqueta new-installs
           a todos los paquetes instalados mediante la orden safe-upgrade.

   --allow-new-upgrades

           Cuando se utiliza el solucionador seguro (esto es, ha introducido
           --safe-resolver, la opción safe-upgrade, o se define
           Aptitude::Always-Use-Safe-Resolver con valor de true), permite al
           solucionador de dependencias instalar actualizaciónes de paquetes
           independientemente del valor de
           Aptitude::Safe-Resolver::No-New-Upgrades.

   --allow-new-installs

           Permite que la orden safe-upgrade instale paquetes nuevos; cuando
           se utiliza el solucionador seguro (esto es, ha introducido
           --safe-resolver, la opción safe-upgrade, o se define
           Aptitude::Always-Use-Safe-Resolver con valor de true), permite al
           solucionador de dependencias instalar paquetes nuevos. Esta opción
           tiene efecto sin importar el valor de
           Aptitude::Safe-Resolver::No-New-Installs.

   --allow-untrusted

           Instala paquetes de fuentes sin firmar sin pedir confirmación.
           Debería utilizar esto sólo si sabe lo que está haciendo, ya que
           podría comprometer fácilmente la seguridad de su sistema.

   --disable-columns

           Esta opción provoca que no se de ningún formato especial a la
           salida de resultados de aptitude search y aptitude versions. En
           particular: generalmente aptitude añade espacios en blanco o
           trunca los resultados de una búsqueda para encajar éstos en
           “columnas” verticales. Con esta opción, cada línea se formará
           reemplazando cualquier escape de formato en la cadena formato con
           el texto correspondiente; se ignorará el ancho de las columnas.

           Por ejemplo, las primeras líneas de la salida de “aptitude search
           -F '%p %V' --disable-columns libedataserver” pueden ser:

 disksearch 1.2.1-3
 hp-search-mac 0.1.3
 libbsearch-ruby 1.5-5
 libbsearch-ruby1.8 1.5-5
 libclass-dbi-abstractsearch-perl 0.07-2
 libdbix-fulltextsearch-perl 0.73-10

           Como se aprecia en el ejemplo anterior, --disable-columns es a
           menudo útil en combinación con un formato de diseño personalizado
           usando la opción en línea de órdenes -F.

           Esto se corresponde con la opción de configuración
           Aptitude::CmdLine::Disable-Columns.

   -D, --show-deps

           Muestra explicaciones breves de las instalaciones y eliminaciones
           automáticas de las órdenes que instalarán o eliminarán paquetes
           (install, full-upgrade, etc)

           Esto se corresponde con la opción de configuración
           Aptitude::CmdLine::Show-Deps.

   -d, --download-only

           Descarga cuántos paquetes se necesitan al almacén de paquetes,
           pero no instalar o eliminar nada. De manera predeterminada, el
           almacén de paquetes se guarda en /var/cache/apt/archives.

           Esto se corresponde con la opción de configuración
           Aptitude::CmdLine::Download-Only.

   -F formato, --display-format formato

           Define el formato que se utilizar para mostrar la salida de las
           órdenes search y versions. Por ejemplo, introducir “%p %V %v” como
           formato muestra el nombre de un paquete, seguido de la versión
           actualmente instalada, así como la versión disponible (para más
           información, consulte la sección “Personalizar la presentación de
           los paquetes”) en el manual de referencia de aptitude).

           La opción en línea de órdenes --disable-columns es a veces útil
           combinado con -F.

           Para search, esto se corresponde con la opción de configuración
           Aptitude::CmdLine::Package-Display-Format; para versions, se
           corresponde con la opción de configuración
           Aptitude::CmdLine::Version-Display-Format.

   -f

           Intenta arreglar agresivamente las dependencias de paquetes rotos,
           incluso si ello significa ignorar las acciones introducidas en la
           línea de órdenes.

           Esto se corresponde con la opción de configuración
           Aptitude::CmdLine::Fix-Broken.

   --full-resolver

           Cuando se encuentren problemas de dependencias de paquetes,
           utilizar el solucionador predeterminado “full” (completo). A
           diferencia del solucionador “seguro” (el cual se ejecuta mediante
           --safe-resolver), el solucionador completo eliminará con alegría
           cualquier paquete para así cumplir con las dependencias. Puede
           solucionar más situaciones que el algoritmo seguro, pero puede que
           sus soluciones sean indeseables.

           Esta opción se puede utilizar para forzar el uso del solucionador
           completo aunque Aptitude::Always-Use-Safe-Resolver tenga valor de
           «true». La orden safe-upgrade nunca utiliza el solucionador
           completo, y no acepta la opción --full-resolver.

   --group-by modo-de-agrupación

           Controla como la orden versions agrupa su salida. Se aceptan los
           siguientes valores:

              o archive para agrupar paquetes según su archivo (“stable”,
                “unstable”, etc). Si un paquete aparece en más de un
                archivo,se mostrará en cada uno de ellos.

              o auto para agrupar las versiones por su paquete a menos que se
                introduzca exactamente un argumento que no sea un patrón de
                búsqueda.

              o none para mostrar todas las versiones en una única lista sin
                ningún modo de agrupación.

              o paquete para agrupar versiones por su paquete.

              o source-package para agrupar versiones según su paquete de
                fuentes.

              o source-version para agrupar versiones por su paquete fuente y
                versión de las fuentes.

           Esto se corresponde con la opción de configuración
           Aptitude::CmdLine::Versions-Group-By.

   -h, --help

           Muestra un breve mensaje de ayuda. Idéntica a la acción help.

   --log-file=fichero

           Si el fichero es una cadena que no esta vacía, en él se escribirán
           los mensajes del registro. Pero si fichero es “-” los mensajes
           saldrán por la salida convencional. Si introduce esta opción
           varias veces, la última aparición es la que tiene efecto.

           Esto no afecta al registro de las instalaciones ejecutadas por
           aptitude (/var/log/aptitude); los mensajes del registro que se
           escriben con esta configuración incluyen programas internos,
           eventos, errores, y mensajes de depuración de fallos. Consulte las
           opciones en línea de órdenes --log-level para controlar qué se
           registra.

           Esto se corresponde con la opción de configuración
           Aptitude::Logging::File.

   --log-level=nivel, --log-level=categoría:nivel

           --log-level=nivel provoca que aptitude registre mensajes cuyo
           nivel es nivel, o superior. Por ejemplo, si define el nivel de
           registro como error, solo los mensajes al nivel de error y fatal
           se mostrarían; todos los otros se ocultarían. Los niveles de
           registro (en orden descendente) son off, fatal, error, warn, info,
           debug, y trace. El nivel de registro predeterminado es warn.

           --log-level=categoría:nivel hace que los mensajes pertenecientes a
           categoría se registren solo si su nivel es nivel o superior.

           --log-level puede aparecer varias veces en la línea de órdenes; la
           configuración más específica es la que tiene efecto. Si introduce
           --log-level=aptitude.resolver:fatal y
           --log-level=aptitude.resolver.hints.match:trace, los mensajes en
           aptitude.resolver.hints.parse se imprimirán sólo si su nivel es
           fatal, pero aquellos mensajes en aptitude.resolver.hints.match se
           mostrarán. Si configura el nivel de la misma categoría dos o más
           veces, la última configuración es la que tiene efecto.

           No afecta al registro de las instalaciones ejecutadas por aptitude
           (/var/log/aptitude); los mensajes del registro que se escriben con
           esta configuración incluyen programas internos, eventos, errores,
           y mensajes de depuración de fallos. Consulte las opciones en línea
           de órdenes --log-file para cambiar dónde se escriben los mensajes
           de registro.

           Esto se corresponde con el grupo de configuración
           Aptitude::Logging::Levels.

   --log-resolver

           Define algunos niveles estándar del registro relativos al
           solucionador, para producir una salida del registro apropiada para
           su procesamiento con herramientas automáticas. Esto equivale a las
           opciones en línea de órdenes
           --log-level=aptitude.resolver.search:trace
           --log-level=aptitude.resolver.search.tiers:warn.

   --no-new-installs

           Evita que safe-upgrade instale cualquier paquete nuevo; cuando se
           utiliza el solucionador seguro (p. ej., introdujo --safe-resolver,
           o Aptitude::Always-Use-Safe-Resolver tiene valor de «true»),
           impide que el solucionador de dependencias instale paquetes
           nuevos. Esta opción tiene efecto independientemente del valor de
           Aptitude::Safe-Resolver::No-New-Installs.

           Esto imita el comportamiento histórico de apt-get upgrade.

   --no-new-upgrades

           Cuando se utiliza el solucionador seguro (p. ej., ha introducido
           --safe-resolver o se definió Aptitude::Always-Use-Safe-Resolver
           con valor de true), prohibe al solucionador de dependencias
           instalar actualizaciones de paquetes independientemente del valor
           de Aptitude::Safe-Resolver::No-New-Upgrades.

   --no-show-resolver-actions

           No muestra las acciones ejecutadas por el solucionador “seguro”,
           invalidando toda opción de configuración o una orden anterior
           --show-resolver-actions.

   -O orden, --sort orden

           Define el orden en que se muestra la salida de las órdenes search
           y versions. Por ejemplo, si introduce “installsize” como la orden,
           mostraría los paquetes de acuerdo a su tamaño una vez instalados
           (para más información, consulte la sección “Personalizar el orden
           de los paquetes” en el manual de referencia de aptitude).

           El ordenamiento predeterminado es name,version.

   -o llave=valor

           Define directamente una opción del fichero de configuración; por
           ejemplo, use -o Aptitude::Log=/tmp/my-log para registrar las
           acciones de aptitude a /tmp/my-log. Para más información acerca de
           las opciones del fichero de configuración, consulte la sección
           “Referencia del fichero de configuración” en el manual de
           referencia de aptitude.

   -P, --prompt

           Siempre pedir una confirmación antes de descargar, instalar o
           eliminar paquetes, aunque no haya otras acciones programadas más
           que las que Ud. requirió.

           Esto se corresponde con la opción de configuración
           Aptitude::CmdLine::Always-Prompt.

   --purge-unused

           Si define Aptitude::Delete-Unused como “true” (su valor
           predeterminado), además de eliminar cada paquete que ya no
           necesite ningún otro paquete instalado, aptitude los purgará,
           borrando sus ficheros de configuración y puede que otros datos
           importantes. Para más información relativa a qué paquetes se
           consideran “en desuso”, consulte la sección “Gestionar paquetes
           automáticamente instalados”. ¡ESTA OPCIÓN PUEDE OCASIONAR PÉRDIDA
           DE DATOS! ¡NO LA USE A MENOS QUE SEPA LO QUE ESTÁ HACIENDO!

           Esto se corresponde con la opción de configuración
           Aptitude::Purge-Unused.

   -q[=n], --quiet[=n]

           Elimina todos los indicadores de progreso incrementales,
           permitiéndole registrar la salida. Puede introducirlo varias veces
           para disminuir los mensajes del programa, pero al contrario que
           apt-get, aptitude no activa -y cuando introduce q.

           Se puede utilizar la orden opcional =número para configurar
           directamente la cuantía de silencio (por ejemplo, para invalidar
           una configuración en /etc/apt/apt.conf); causa que el programa
           responda como si se hubiese introducido -q número veces.

   -R, --without-recommends

           No toma recomendaciones como dependencias a la hora de instalar
           paquetes (esto invalida las configuraciones en /etc/apt/apt.conf y
           ~/.aptitude/config)

           Esto se corresponde con las dos opciones de configuración
           Apt::Install-Recommends y Apt::AutoRemove::InstallRecommends.

   -r, --with-recommends

           Trata las recomendaciones como dependencias a la hora de instalar
           paquetes nuevos (esto invalida las configuraciones en
           /etc/apt/apt.conf y ~/.aptitude/config).

           Esto se corresponde con la opción de configuración
           Apt::Install-Recommends

   --remove-user-tag etiqueta

           Para full-upgrade, safe-upgrade forbid-version, hold, install,
           keep-all, markauto, unmarkauto, purge, reinstall, remove, unhold,
           y unmarkauto: eliminar la etiqueta de usuario etiqueta de todos
           los paquetes que se van a instalar, eliminar o actualizar con esta
           orden, al igual que con la orden add-user-tag.

   --remove-user-tag-from etiqueta,patrón

           Para full-upgrade, safe-upgrade forbid-version, hold, install,
           keep-all, markauto, unmarkauto, purge, reinstall, remove, unhold,
           y unmarkauto: eliminar la etiqueta de usuario etiqueta de todos
           los paquetes que coinciden con patrón al igual que con la orden
           remove-user-tag. El patrón es un patrón de búsqueda como se
           describe en la sección “Patrones de búsqueda” en el manual de
           referencia de aptitude.

           Por ejemplo, aptitude safe-upgrade --remove-user-tag-from
           "not-upgraded,?action(upgrade)" borraría toda etiqueta
           not-upgraded de cualquier paquete que la orden safe-upgrade pueda
           actualizar.

   -s, --simulate

           En modo de línea de órdenes, imprime las acciones que se tomarían,
           pero no las ejecuta, sino que las simula. Esto no precisa de
           privilegios de administrador (root). En la interfaz gráfica, abre
           el almacén con privilegios de sólo lectura independientemente de
           si es, o no, el administrador.

           Esto se corresponde con la opción de configuración
           Aptitude::Simulate.

   --safe-resolver

           Cuando se encuentre un problema de dependencias, usar un algoritmo
           “safe” (seguro) para resolverlos. Este solucionador intenta
           preservar tantas elecciones suyas como sea posible; nunca
           eliminará un paquete o instalará una versión que no sea la versión
           candidata del paquete. Es el mismo algoritmo usado con
           safe-upgrade; efectivamente, aptitude --safe-resolver full-upgrade
           equivale aaptitude safe-upgrade. Debido a que safe-upgrade siempre
           utiliza el solucionador seguro, no acepta la marca
           --safe-resolver.

           Esta opción equivale a definir la variable de configuración
           Aptitude::Always-Use-Safe-Resolver como true.

   --schedule-only

           Programa las operaciones de las órdenes que modifican el estado de
           los paquetes, sin ejecutarlos realmente. Puede ejecutar acciones
           programadas ejecutando aptitude install sin introducir argumentos.
           Esto equivale a realizar las selecciones correspondientes en la
           interfaz gráfica, y cerrar el programa tras ello.

           Por ejemplo. aptitude --schedule-only install evolution programa
           una instalación ulterior para el paquete evolution.

   --show-package-names when

           Controla cuando la orden versions muestra nombres de paquete. Se
           aceptan las siguientes opciones:

              o always: muestra nombres de paquete cada vez que se ejecuta
                aptitude versions.

              o auto: muestra los nombres de paquete cuando se ejecuta
                aptitude versions si la salida no está agrupada por paquete,
                y si hay un argumento de búsqueda de patrón o si hay más de
                un argumento.

              o never: nunca muestra nombres de paquete en la salida de
                aptitude versions.

           Esta opción se corresponde con la opción de configuración
           Aptitude::CmdLine::Versions-Show-Package-Names.

   --show-resolver-actions

           Muestra las acciones ejecutadas por el solucionador “seguro”, y
           por safe-upgrade.

           Al ejecutar la orden safe-upgrade o cuando se ha introduce la
           opción --safe-resolver, aptitude muestra un resumen de las
           acciones tomadas por el solucionador antes de mstrar la
           previsualización de la instalación. Esto equivale a la opción de
           configuración Aptitude::Safe-Resolver::Show-Resolver-Actions.

   --show-summary[=MODO]

           Modifica el comportamiento de “aptitude why” para que la salida
           sea un resumen de la cadena de dependencias, mas que mostrar la
           forma completa. Si esta opción está presente y el MODO no es
           “no-summary”, las cadenas que contengan dependencias del tipo
           «Sugiere» no se mostrarán: combine --show-summary con -v para ver
           un resumen de todas las razones por las que el paquete objetivo se
           va a instalar.

           El MODO puede ser cualquiera de los siguientes:

             1. no-summary: no muestra el resumen (el comportamiento
                predeterminado si no se ha introducido --show-summary).

             2. first-package: muestra el primer paquete de cada cadena. Este
                es el valor predeterminado de MODO si no está presente.

             3. first-package-and-type: muestra el primer paquete de cada
                cadena, acompañado de la fuerza de la dependencia más débil
                de la cadena.

             4. all-packages: muestra un resumen de cada cadena de
                dependencias que lleva al paquete objetivo.

             5. all-packages-with-dep-versions: muestra un resumen de cada
                cadena de dependencias que conduce al paquete objetivo,
                incluyendo la versión objetivo de cada dependencia.

           Esta opción se corresponde con la opción de configuración
           Aptitude::CmdLine::Show-Summary; de estar presente --show-summary
           en la línea de órdenes, invalidaría
           Aptitude::CmdLine::Show-Summary.

           Ejemplo 10. Uso de --show-summary.

           --show-summary en conjunción con -v muestra las razones de porqué
           un paquete está instalado:

 $ aptitude -v --show-summary why foomatic-db
 Paquetes que dependen de foomatic-db:
   cupsys-driver-gutenprint
   foomatic-db-engine
   foomatic-db-gutenprint
   foomatic-db-hpijs
   foomatic-filters-ppds
   foomatic-gui
   kde
   printconf
   wine

 $ aptitude -v --show-summary=first-package-and-type why foomatic-db
 Paquetes que dependen de foomatic-db:
   [Depende] cupsys-driver-gutenprint
   [Depende] foomatic-db-engine
   [Depende] foomatic-db-gutenprint
   [Depende] foomatic-db-hpijs
   [Depende] foomatic-filters-ppds
   [Depende] foomatic-gui
   [Depende] kde
   [Depende] printconf
   [Depende] wine

 $ aptitude -v --show-summary=all-packages why foomatic-db
 Paquetes que dependen de foomatic-db:
   cupsys-driver-gutenprint D: cups-driver-gutenprint D: cups R: foomatic-filters R: foomatic-db-engine D: foomatic-db
   foomatic-filters-ppds D: foomatic-filters R: foomatic-db-engine D: foomatic-db
   kde D: kdeadmin R: system-config-printer-kde D: system-config-printer R: hal-cups-utils D: cups R: foomatic-filters R: foomatic-db-engine D: foomatic-db
   wine D: libwine-print D: cups-bsd R: cups R: foomatic-filters R: foomatic-db-engine D: foomatic-db
   foomatic-db-engine D: foomatic-db
   foomatic-db-gutenprint D: foomatic-db
   foomatic-db-hpijs D: foomatic-db
   foomatic-gui D: python-foomatic D: foomatic-db-engine D: foomatic-db
   printconf D: foomatic-db

 $ aptitude -v --show-summary=all-packages-with-dep-versions why foomatic-db
 Paquetes que dependen de foomatic-db:
   cupsys-driver-gutenprint D: cups-driver-gutenprint (>= 5.0.2-4) D: cups (>= 1.3.0) R: foomatic-filters (>= 4.0) R: foomatic-db-engine (>= 4.0) D: foomatic-db (>= 20090301)
   foomatic-filters-ppds D: foomatic-filters R: foomatic-db-engine (>= 4.0) D: foomatic-db (>= 20090301)
   kde D: kdeadmin (>= 4:3.5.5) R: system-config-printer-kde (>= 4:4.2.2-1) D: system-config-printer (>= 1.0.0) R: hal-cups-utils D: cups R: foomatic-filters (>= 4.0) R: foomatic-db-engine (>= 4.0) D: foomatic-db (>= 20090301)
   wine D: libwine-print (= 1.1.15-1) D: cups-bsd R: cups R: foomatic-filters (>= 4.0) R: foomatic-db-engine (>= 4.0) D: foomatic-db (>= 20090301)
   foomatic-db-engine D: foomatic-db
   foomatic-db-gutenprint D: foomatic-db
   foomatic-db-hpijs D: foomatic-db
   foomatic-gui D: python-foomatic (>= 0.7.9.2) D: foomatic-db-engine D: foomatic-db (>= 20090301)
   printconf D: foomatic-db


           --show-summary se emplea para mostrar la cadena en una línea:

 $ aptitude --show-summary=all-packages why aptitude-gtk libglib2.0-data
 Paquetes que dependen de libglib2.0-data:
   aptitude-gtk D: libglib2.0-0 R: libglib2.0-data

   -t distribución, --target-release distribución

           Define la rama de la que se deberían instalar los paquetes. Por
           ejemplo, “aptitude -t experimental ...” instalaría paquetes de la
           distribución «experimental» a menos que especifique lo contrario.
           Para las acciones en línea de órdenes “changelog”, “download”, y
           “show”, esto equivale a añadir /rama al final de cada paquete
           nombrado en la línea de órdenes; para otras órdenes, esto afecta a
           la versión candidata de los paquetes de acuerdo a las reglas
           descritas en apt_preferences(5).

           Esto se corresponde con la opción de configuración
           APT::Default-Release.

   -V, --show-versions

           Muestra qué versiones de paquetes se van a instalar.

           Esto se corresponde con la opción de configuración
           Aptitude::CmdLine::Show-Versions.

   -v, --verbose

           Causa que algunas órdenes, (tales como show) muestren información
           adicional. Esto se puede introducir varias veces para así obtener
           más y más información.

           Esto se corresponde con la opción de configuración
           Aptitude::CmdLine::Verbose.

   --version

           Muestra la versión de aptitude y cierta información acerca de como
           se compiló.

   --visual-preview

           Muestra la pantalla de previsualización de la interfaz gráfica al
           eliminar o instalar paquetes desde la línea de órdenes, en lugar
           de la pantalla normal.

   -W, --show-why

           En la pantalla de previsualización que se muestra antes de
           instalar o eliminar paquetes, muestra las dependencias de paquetes
           manualmente instalados sobre cada paquete automáticamente
           instalado. Por ejemplo:

 $ aptitude --show-why install mediawiki
 ...
 Se van a instalar los siguientes paquetes NUEVOS:
   libapache2-mod-php5{a} (for mediawiki)  mediawiki  php5{a} (for mediawiki)
   php5-cli{a} (for mediawiki)  php5-common{a} (for mediawiki)
   php5-mysql{a} (for mediawiki)

           En combinación con -v o un valor que no equivalga a 0 para
           Aptitude::CmdLine::Verbose, mostrar la cadena de dependencias
           completa que conducen a cada paquete que se va a instalar. Por
           ejemplo:

 $ aptitude -v --show-why install libdb4.2-dev
 Se instalarán los siguiente paquetes NUEVOS:
   libdb4.2{a} (libdb4.2-dev D: libdb4.2)  libdb4.2-dev
 Se ELIMINARÁN los siguientes paquetes:
   libdb4.4-dev{a} (libdb4.2-dev C: libdb-dev P<- libdb-dev)

           Esta opción también describiría porqué los paquetes se van a
           eliminar, como puede observar en el texto anterior. En este
           ejemplo, libdb4.2-dev entra en conflicto con libdb-dev, que provee
           libdb-dev.

           Este argumento se corresponde con la opción de configuración
           Aptitude::CmdLine::Show-Why, y muestra la misma información
           computada por aptitude why y aptitude why-not.

   -w ancho, --width ancho

           Define el ancho de pantalla que utilizar para la salida de la
           orden search (el ancho de la terminal se utiliza de manera
           predeterminada).

           Esto se corresponde con la opción de configuración
           Aptitude::CmdLine::Package-Display-Width

   -y, --assume-yes

           Cuando se presente una pregunta si/no, se asumirá que el usuario
           introdujo “si”. En particular, suprime la previsualización final
           cuando instala, actualizar o elimina paquetes. Aún así, verá
           preguntas acerca de acciones “peligrosas” tales como eliminar
           paquetes esenciales. Esta opción invalida -P.

           Esto se corresponde con la opción de configuración
           Aptitude::CmdLine::Assume-Yes.

   -Z

           Muestra cuanto espacio del disco se va usar o liberar por cada
           paquete individual que se va a instalar, actualizar, o eliminar.

           Esto se corresponde con la opción de configuración
           Aptitude::CmdLine::Show-Size-Changes.

   Las siguientes opciones afectan a la interfaz gráfica del programa, pero
   se han diseñado para un uso interno; generalmente, no tendrá que
   utilizarlas.

   --autoclean-on-startup

           Elimina los ficheros descargados y antiguos al inicio (equivale a
           iniciar el programa y seleccionar inmediatamente Acciones →
           Limpiar el almacén de paquetes). No puede usar esta opción y
           “--autoclean-on-startup”, “-i”, o “-u” a la vez.

   --clean-on-startup

           Vacia el almacén de paquetes cuando el programa se inicia
           (equivale a iniciar el programa y seleccionar inmediatamente
           Acciones → Limpiar el almacén de paquetes). No puede usar esta
           opción y “--autoclean-on-startup”, “-i”, o “-u” a la vez.

   -i

           Muestra una previsualización de la descarga cuando se inicia el
           programa (equivale a iniciar el programa y pulsar “g”
           inmediatamente). No puede utilizar esta opción y
           “--autoclean-on-startup”, “--clean-on-startup”, o “-u” a la vez.

   -S nombre_de_fichero

           Carga la información de estado extendida desde nombre_de_fichero
           en lugar del fichero estándar de estado.

   -u

           Actualiza la lista de paquetes en cuanto se inicia el programa. No
           puede usar esta opción y “--autoclean-on-startup”,
           “--clean-on-startup”, o “-i” a la vez.

Entorno

   HOME

           Si existe $HOME/.aptitude, aptitude guarda su fichero de
           configuración en $HOME/.aptitude/config. De otra forma, busca en
           el directorio de inicio del usuario actual mediante getpwuid(2), y
           guarda ahí su fichero de configuración.

   PAGER

           Si define esta variable de entorno aptitude la usará para mostrar
           los registros de cambios cuando invoque “aptitude changelog”. De
           no ser así, su valor predeterminado es more.

   TMP

           Si no define TMPDIR, aptitude guardará sus ficheros temporales en
           TMP si se ha definido esa variable. De no ser así, los guardará en
           /tmp.

   TMPDIR

           aptitude guardará sus ficheros temporales en el directorio
           indicado en esta variable de entorno. Si no define TMPDIR, se
           usará TMP; si tampoco ha definido TMP, aptitude usará /tmp.

Ficheros

   /var/lib/aptitude/pkgstates

           El archivo en el que se guardan los estados de los paquetes y
           algunas marcas de acción.

   /etc/apt/apt.conf, /etc/apt/apt.conf.d/*, ~/.aptitude/config

           Los ficheros de configuración de aptitude. ~/.aptitude/config
           invalida /etc/apt/apt.conf. Véase apt.conf(5) para la
           documentación relativa al formato y contenido de estos ficheros.

Véase también

   apt-get(8), apt(8), /usr/share/doc/aptitude/html/es/index.html disponible
   en el paquete aptitude-doc-es

   --------------------------------------------------------------------------

Nombre

   aptitude-create-state-bundle — empaqueta el estado actual de aptitude

Sinopsis

   aptitude-create-state-bundle [opciones...] fichero_de_salida

Descripción

   La orden aptitude-create-state-bundle genera un fichero comprimido que
   guarda los ficheros necesarios para mimetizar el estado actual del archivo
   de paquetes. Se incluyen en el archivo generado los siguientes ficheros y
   directorios:

     o $HOME/.aptitude

     o /var/lib/aptitude

     o /var/lib/apt

     o /var/cache/apt/*.bin

     o /etc/apt

     o /var/lib/dpkg/status

   La salida de este programa se puede usar como un argumento de
   aptitude-run-state-bundle(1).

Opciones

   --force-bzip2

           Invalida la detección de qué algoritmo de compresión usar. De
           manera predeterminada, aptitude-create-state-bundle utiliza
           bzip2(1), de estar disponible, o gzip(1) de no ser así. Introducir
           esta opción fuerza el uso de bzip2 aunque no parezca estar
           disponible.

   --force-gzip

           Invalida la detección de qué algoritmo de compresión usar. De
           manera predeterminada, aptitude-create-state-bundle utiliza
           bzip2(1), de estar disponible, o gzip(1) de no ser así. Introducir
           esta opción fuerza el uso de gzip aunque bzip2 esté disponible.

   --help

           Muestra un breve resumen del uso, después cierra.

   --print-inputs

           En lugar de crear un archivo, muestra una lista de los archivos y
           directorios que el programa incluiría de generar un archivo de
           estado.

El formato del archivo

   El fichero de estado es simplemente un fichero tar(1) comprimido con
   bzip2(1) o gzip(1). La raíz de cada uno de los árboles de directorios de
   entrada es “.”.

Véase también

   aptitude-run-state-bundle(1), aptitude(8), apt(8)

   --------------------------------------------------------------------------

Nombre

   aptitude-run-state-bundle — desempaqueta un fichero de estado de aptitude
   e invoca aptitude sobre éste

Sinopsis

   aptitude-run-state-bundle [opciones...] fichero_de_entrada [ programa
   [argumentos...]]

Descripción

   aptitude-run-state-bundle desempaqueta el archivo de estado de aptitude
   creado por aptitude-create-state-bundle(1) en un directorio temporal,
   invoca programa sobre él con los argumentos proporcionados, y elimina el
   directorio temporal a continuación. Si no se introduce programa, su valor
   por omisión es aptitude(8).

Opciones

   Las siguientes opciones pueden preceder al fichero de entrada en la línea
   de órdenes. Las opciones a continuación del fichero de entrada se toman
   como argumentos para aptitude.

   --append-args

           Introduce al final de la línea de órdenes las opciones que dan la
           ubicación del archivo de estado al invocar programa, en lugar de
           al principio de éste (comportamiento predeterminado).

   --help

           Muestra un breve resumen del uso.

   --prepend-args

           Introduce al inicio de la línea de órdenes las opciones que dan la
           ubicación del paquete de estado al invocar programa, invalidando
           cualquier otro --append-args (el valor predeterminado es ubicar
           las opciones al inicio).

   --no-clean

           Evita eliminar el directorio de estado desempaquetado después de
           ejecutar aptitude. Debería usar esto si, por ejemplo, está
           depurando un fallo que aparece al modificar el fichero de estado
           de aptitude. El nombre del directorio de estado se mostrará al
           final de la ejecución de aptitude, para así permitirle un acceso
           futuro.

           Esta opción se activa automáticamente por --statedir.

   --really-clean

           Elimina el directorio de estado tras ejecutar aptitude, incluso si
           introduce --no-clean o --statedir.

   --statedir

           En lugar de tratar el fichero de entrada como un archivo de
           estado, lo trata como un archivo de estado desempaquetado. Por
           ejemplo, puede usar esto para acceder al directorio de estado que
           se creó al ejecutar --no-clean con anterioridad.

   --unpack

           Desempaqueta el fichero de entrada en un directorio temporal, pero
           no ejecutar la orden aptitude.

Véase también

   aptitude-create-state-bundle(1), aptitude(8), apt(8)
