                         aptitude - příručka uživatele

Verze 0.4.11.9

  Daniel Burrows

   <dburrows@debian.org>

  Miroslav Kuře

   Český překlad <kurem@debian.cz>

   Copyright © 2004-2008 Daniel Burrows

   Tento manuál je svobodný software; můžete jej šířit a/nebo upravovat podle
   podmínek GNU General Public License verze 2 nebo (dle vašeho uvážení)
   novější tak, jak ji zveřejňuje Free Software Foundation.

   Tento manuál je distribuovaný v naději, že bude užitečný, ale BEZ
   JAKÉKOLIV ZÁRUKY. Pro více podrobností se podívejte do licence GNU General
   Public License.

   Kopii GNU General Public License byste měli obdržet s tímto manuálem.
   Pokud tomu tak není, napište na Free Software Foundation, Inc., 59 Temple
   Place, Suite 330, Boston, MA 02111-1307 USA

   --------------------------------------------------------------------------

   Obsah

   Úvod

                Co je vlastně aptitude?

                Co je správce balíků?

                Co je systém apt?

                Jak získat aptitude?

                             Připravené balíky, aneb „řešení pro 99%
                             uživatelů“

                             Sestavení aptitude ze zdrojových kódů

                             Sledování vývoje aptitude

   1. Začínáme

                Používáme aptitude

                             Základy aptitude

                             Pohyb v seznamu balíků

                             Hledání balíků podle jmen

                             Správa balíků

                             Aktualizace seznamu a instalace balíků

                Používání aptitude z příkazové řádky

   2. aptitude - referenční příručka

                Uživatelské rozhraní aptitude

                             Používání menu

                             Příkazy menu

                             Práce s několika pohledy

                             Přepnutí na uživatele root

                Správa balíků

                             Správa seznamu balíků

                             Získání informací o balíku

                             Změna stavu balíků

                             Řešení problémů se závislostmi

                             Stažení, instalace a odstranění balíků

                             Pochopení a správa důvěryhodnosti balíků

                             Správa automaticky instalovaných balíků

                Vyhledávací vzory

                             Hledání řetězců

                             Zkrácená forma vyhledávacích termů

                             Hledání a verze balíků

                             Explicitní cíle

                             Přehled vyhledávacích vzorů

                Přizpůsobení aptitude

                             Přizpůsobení seznamu balíků

                             Přizpůsobení klávesových zkratek

                             Přizpůsobení barvy textu a úprava stylů

                             Přizpůsobení rozložení obrazovky

                             Konfigurační soubor

                             Témata

                Hraní minového pole

   3. Často kladené otázky

   4. Poděkování

   I. Přehled příkazů

                aptitude — vysokoúrovňové rozhraní k balíčkovacímu systému

                aptitude-create-state-bundle — zabalí aktuální stav aptitude

                aptitude-run-state-bundle — rozbalí archiv se stavem balíků a
                spustí na něm aptitude

   Seznam obrázků

   2.1. Příkazy dostupné z menu Akce

   2.2. Příkazy dostupné z menu Zpět

   2.3. Příkazy dostupné z menu Balík

   2.4. Příkazy dostupné z menu Řešitel

   2.5. Příkazy dostupné z menu Hledat

   2.6. Příkazy dostupné v menu Volby

   2.7. Příkazy dostupné z menu Pohledy

   2.8. Příkazy dostupné v menu Nápověda

   2.9. Hodnoty příznaku „aktuální stav“

   2.10. Hodnoty příznaku „akce“

   2.11. Syntaxe termu ?for

   2.12. Upravitelné styly v aptitude

   Seznam tabulek

   2.1. Rychlý průvodce vyhledávacími termy

   Seznam příkladů

   2.1. Použití termu ?=.

   2.2. Použití termu ?bind

   2.3. Použití termu ?for

Úvod

   Obsah

   Co je vlastně aptitude?

   Co je správce balíků?

   Co je systém apt?

   Jak získat aptitude?

                Připravené balíky, aneb „řešení pro 99% uživatelů“

                Sestavení aptitude ze zdrojových kódů

                Sledování vývoje aptitude

     „Master, does Emacs possess the Buddha nature?“ the novice asked.       

     „I don't see why not“, replied the master. „It's got bloody well
     everything else.“ Several years later, the novice suddenly achieved
     enlightenment.
                                                                 --John Fouhy

   Vítejte v uživatelské příručce programu aptitude! Tato úvodní část
   vysvětluje, k čemu se aptitude používá, a proč byste si měli vybrat právě
   ji. Samotné používání programu je pak popsáno dále v kapitole 1 –
   „Začínáme“.

Co je vlastně aptitude?

   aptitude mocný správce balíků pro systém Debian GNU/Linux založený na
   legendární skupině programů apt. aptitude kombinuje funkcionalitu
   dselectu, apt-getu a navíc přidává mnoho dalších unikátních vlastností.

Co je správce balíků?

   Správce balíků si udržuje přehled o softwaru instalovaném na vašem
   počítači, umožňuje instalovat nový software, aktualizovat jej na novější
   verze, nebo nepotřebný software zase odstranit. Jak už název napovídá,
   správce balíků pracuje s balíky. Balík je množina souborů, které spolu
   nějak souvisí a mohou být (od)instalovány jako celek.

   Balíkem je často samostatný program. Například oblíbený klient pro instant
   messaging gaim je obsažen v debianím balíku stejného jména. Na druhou
   stranu je běžné, že se programy skládají z několika navzájem provázaných
   balíků. Například program pro úpravu obrázků gimp se skládá z balíků gimp
   a gimp-data; mimo to jsou k dispozici další volitelné balíky, které
   obsahují dokumentaci, různé filtry apod. Je možný i obrácený případ, že
   jeden balík obsahuje více malých programů (například balík fileutils
   obsahuje několik běžných unixových příkazů jako ls, cp, atd.

   Některé balíky pro svou funkčnost mohou vyžadovat jiné balíky. V Debianu
   mohou na sobě balíky záviset, doporučovat se, navrhovat se, porušovat se,
   nebo spolu být v konfliktu.

     o Pokud balík A závisí na balíku B, pak je B vyžadován pro správnou
       funkčnost balíku A. Například balík gimp závisí na balíku gimp-data,
       aby bylo zajištěno, že grafický editor GIMP bude moci přistupovat k
       datovým souborům.

     o Doporučuje-li balík A jiný balík B, pak B poskytuje důležitou
       funkčnost pro A a tato funkčnost bude uživatelem téměř vždy
       vyžadována. Například balík mozilla-browser doporučuje balík
       mozilla-psm, jež přidává do webového prohlížeče Mozilla podporu pro
       zabezpečené přenosy souborů. Přestože balík mozilla-psm není vyžadován
       pro správnou funkci prohlížeče, většina uživatelů bude chtít, aby
       jejich citlivá data (jako čísla kreditních karet) putovala přes
       zabezpečený kanál.

     o Pokud balík A navrhuje balík B, pak B nějakým způsobem rozšiřuje
       funkcionalitu A, ale toto rozšíření není ve většině případů potřeba.
       Například balík kmail navrhuje balík gnupg, který obsahuje
       kryptografický software, jež může být s KMailem použit.

     o Je-li balík A v konfliktu s balíkem B, pak tyto dva balíky nemohou být
       nainstalovány současně. Například fb-music-hi je v konfliktu s
       fb-music-low, protože oba dva poskytují různé sady zvuků a hudby pro
       hru Frozen Bubble.

   Hlavním úkolem správce balíků je poskytnout uživateli rozhraní pro správu
   balíků instalovaných na jeho počítači. Takové rozhraní nabízí třeba
   aptitude, která staví na systému správy balíků apt.

Co je systém apt?

   Základní program pro správu balíků v Debianu (dpkg) je poměrně jednoduchý.
   Umí sice instalovat a odstraňovat balíky, ale to je tak vše. Chcete-li
   občas ručně stáhnout a nainstalovat jeden nebo dva balíky, klidně si s
   dpkg vystačíte. Máte-li ale spravovat větší množství balíků, objeví se
   najednou spousta drobných podivností. Například pokud balík závisí na
   několika dalších, musíte si je ručně stáhnout a poté ve správném pořadí
   nainstalovat. Když se později rozhodnete dotyčný balík odstranit, musíte
   pamatovat i na jeho závislosti, protože dokud je ručně neodstraníte, tak
   budou ležet v systému a zabírat místo na disku.

   Protože je ruční správa balíků únavná a nudná záležitost, přichází většina
   systémů pro správu balíků s programy, které převezmou většinu (někdy i
   všechnu) práci na sebe. Systém apt poskytuje společné zázemí pro takovéto
   programy, mezi něž se kromě aptitude řadí třeba synaptic a apt-watch.

   apt pracuje tak, že si udržuje seznam dostupných balíků. Tento seznam se
   používá pro nalezení balíků, které mohou být aktualizovány na novější
   verzi, stejně jako pro instalaci balíků zcela nových. apt také umí
   automaticky řešit závislosti mezi balíky. Pokud se rozhodnete instalovat
   nový balík, apt si sám zjistí vyžadované balíky a pokud ještě v systému
   nejsou, automaticky je doinstaluje.

   Při práci se správcem balíků založeném na aptu (např. aptitude) budete
   obvykle provádět tři základní úkony. Nejprve aktualizujete seznam
   dostupných balíků, obvykle stažením nových seznamů ze serverů Debianu.
   Poté si ze seznamu vyberete balíky, které chcete instalovat, aktualizovat
   nebo smazat. Na závěr tyto změny zaznamenáte, čímž se provede vlastní
   instalace, odstranění, atd.

   Seznam „zdrojů“ - míst, kde se nachází debianí balíky - je zapsán v
   souboru /etc/apt/sources.list. Obsah a formát tohoto souboru je mimo
   rozsah naší příručky, ale je popsán v manuálové stránce sources.list(5).

Jak získat aptitude?

   Čtete-li tuto příručku a ještě nemáte aptitude nainstalovanou, pomůže vám
   následující sekce zjistit, jak tuto politováníhodnou situaci napravit.
   Většina lidí může přeskočit rovnou na část Binární balíky.

  Připravené balíky, aneb „řešení pro 99% uživatelů“

   Připravené, nebo „binární“ balíky je nejjednodušší a nejběžnější cesta k
   instalaci aptitude. O instalaci ze zdrojů byste se měli pokusit pouze
   pokud nejsou binární balíky dostupné, nebo pokud máte neobvyklé požadavky,
   které binární balíky nesplňují.

   Používáte-li systém Debian, spusťte pod uživatelem root následující
   příkaz: apt-get install aptitude. V ostatních případě se po předpřipravené
   aptitude poohlédněte u svého dodavatele.

  Sestavení aptitude ze zdrojových kódů

   Chcete-li si sestavit aptitude ze zdrojových kódů, budete potřebovat
   následující programy:

     o Překladač jazyka C++, např. g++.

     o Vývojářské soubory pro apt obvykle dostupné v balíku s podobným názvem
       jako libapt-pkg-dev.

     o Knihovnu libsigc++-2.0 dostupnou v balíku libsigc++-2.0-dev nebo z
       http://libsigc.sourceforge.net.

     o Knihovnu cwidget dostupnou v balíku libcwidget-dev nebo z
       http://cwidget.alioth.debian.org.

     o Nástroj gettext, který by měl být součástí vaší distribuce GNU/Linuxu.

     o Nástroj make, například GNU make.

     o A v neposlední řadě nejčerstvější zdrojové kódy aptitude dostupné z
       http://packages.debian.org/unstable/admin/aptitude. (Dole na stránce
       stáhněte soubor končící na .orig.tar.gz.)

   Po instalaci vyžadovaných částí otevřete terminál a rozbalte zdrojové
   texty příkazem tar zxf aptitude-0.4.11.9.tar.gz. Poté aptitude zkompilujte
   příkazem cd aptitude-0.4.11.9 && ./configure && make. Proběhne-li
   sestavení úspěšně, přepněte se na uživatele root (třeba příkazem su) a
   nainstalujte program příkazem make install. Nyní můžete aptitude spustit
   příkazem aptitude.

  Sledování vývoje aptitude

    Získání zdrojových textů vývojové větve aptitude

   Jestliže si chcete vyzkoušet nejčerstvější novinky, nebo byste rádi
   přispěli k vývoji aptitude, můžete si stáhnout aktuální zdrojové texty
   pomocí programu Mercurial dostupného z http://www.selenic.com/mercurial/.
   Po instalaci Mercurialu si můžete stáhnout nejnovější verzi zdrojových
   textů příkazem hg clone http://hg.debian.org/hg/aptitude/head aptitude.

   [Varování] Varování
              aptitude se v Mercurialu aktivně vyvíjí a tudíž není
              garantováno, že se tyto zdrojové texty povede sestavit (o
              bezproblémovém běhu ani nemluvě)! Vděčně vítáme jakékoliv
              hlášení o chybách, ale pamatujte, že vývojovou verzi používáte
              na vlastní nebezpečí^[1]

    Poštovní konference

   Primární poštovní konferencí pro vývoj aptitude je
   <aptitude-devel@lists.alioth.debian.org>. Archivy se nachází na
   http://lists.alioth.debian.org/pipermail/aptitude-devel/, přihlásit se
   můžete na webové stránce
   http://lists.alioth.debian.org/mailman/listinfo/aptitude-devel.

    Posílání záplat

   Záplaty pro aptitude by se měly posílat nejlépe do poštovní konference
   <aptitude-devel@lists.alioth.debian.org>. Preferujete-li zaslání soukromým
   mailem, můžete použít adresy <aptitude@packages.debian.org> nebo
   <dburrows@debian.org>. Přijetí a začlenění záplaty do aptitude značně
   pomůže, pokud uvedete důvod záplaty a vysvětlení, co touto záplatou
   měníte.

    Sledování změn ve zdrojových textech aptitude

   Zdrojové texty aptitude se neustále mění podle toho, jak přicházejí nové
   vlastnosti, chyby a jejich opravy. Svou kopii zdrojových textů můžete
   kdykoliv aktualizovat příkazem hg pull && hg update spuštěným v adresáři
   aptitude.

   Chcete-li automaticky dostávat oznámení o změnách ve zdrojových textech
   aptitude, přihlaste se k odběru RSS kanálu na
   http://hg.debian.org/hg/aptitude/head?cl=tip;style=rss.

    Sestavení vývojové větve aptitude

   Pro sestavení aptitude ze systému Mercurial musíte mít nainstalovány
   programy autoconf a automake. Nejprve se příkazem sh ./autogen.sh &&
   ./configure vygenerují soubory potřebné pro sestavení aptitude a poté se
   program sestaví a nainstaluje obvyklým make a make install.

   --------------

   ^[1] Samozřejmě většina softwaru se používá na vlastní nebezpečí, ale toto
   riziko je při použití vývojové větve mnohem větší.

Kapitola 1. Začínáme

   Obsah

   Používáme aptitude

                Základy aptitude

                Pohyb v seznamu balíků

                Hledání balíků podle jmen

                Správa balíků

                Aktualizace seznamu a instalace balíků

   Používání aptitude z příkazové řádky

          A journey of a thousand miles must begin with a single step.  
                                                                    --Lao Tsu

   aptitude je rozsáhlý program se spoustou vlastností, což může být pro
   začátečníky odstrašující. Tato část se nesnaží popsat všechny možnosti
   aptitude (to popisuje kapitola 2 – „aptitude - referenční příručka“), ale
   důkladně se zaměřuje na základy a nejpoužívanější rysy programu.

Používáme aptitude

   Tato sekce popisuje celoobrazovkový režim programu aptitude. Informace o
   používání aptitude v řádkovém režimu získáte v části „Používání aptitude z
   příkazové řádky“.

  Základy aptitude

   Pro spuštění aptitude si otevřete svůj oblíbený textový terminál a na
   příkazový řádek napište:

 foobar$ aptitude

   Jen co se nahraje vyrovnávací paměť (což může na pomalejších počítačích
   chvíli trvat), objeví se hlavní obrazovka:

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
 aptitude 0.2.14.1
 --- Aktualizovatelné balíky
 --- Instalované balíky
 --- Nenainstalované balíky
 --- Zastaralé a lokálně vytvořené balíky
 --- Virtuální balíky
 --- Úlohy





 K těmto balíkům existuje novější verze.










   Jak můžete vidět, hlavní obrazovka aptitude je rozdělena do několika
   oblastí. Modrý řádek nahoře na obrazovce se nazývá menu. Pod ním jsou
   informační řádky popisující důležité příkazy. Následující černé místo je
   seznam všech dostupných balíků rozdělený do několika kategorií. Aktuálně
   vybraná kategorie („Instalované balíky“) je označená a její popis se
   zobrazuje ve spodním černém prostoru.

   Jak vám radí horní řádek, pro vstup do menu můžete použít klávesu
   Control+t. Menu lze také vyvolat kliknutím myši do dané oblasti.
   Implicitně se otevře menu Akce.

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 +----------------------------+: Aktualizace  g: Stažení/Instalace
 |Instalovat/odstranit balíky |
 |Aktualizovat seznam balíků u|
 |Zapomenout nové balíky     f|
 |Vyčistit cache s balíky     |
 |Vyčistit staré soubory      |balíky
 |Označit aktualizovatelné   U|
 |Zahrát si minové pole       |
 |Stát se rootem              |
 +----------------------------+
 |Konec                      Q|
 +----------------------------+
 K těmto balíkům existuje novější verze.









 Provede všechny nevyřízené instalace a odstraňování

   V menu se můžete pohybovat pomocí šipek, výběr provedete klávesou Enter
   (podporuje-li to váš systém, můžete použít i kliknutí myši). Pokud nyní
   nechcete z menu nic vybírat, stiskněte znovu Control+t a vrátíte se zpět
   do výběru balíků. Aktuálně vybraná položka menu je popsána dole na
   obrazovce.

   Seznam dostupných klávesových zkratek si můžete zobrazit kdykoliv klávesou
   ?.

  Pohyb v seznamu balíků

   Seznam balíků je hlavní okno aptitude, ve kterém se odehrává většina akce.
   Když se aptitude spustí, je seznam rozdělen do několika skupin, jak je
   vidět na následujícím obrázku:

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
 aptitude 0.2.14.1
 --- Aktualizovatelné balíky
 --- Instalované balíky
 --- Nenainstalované balíky
 --- Zastaralé a lokálně vytvořené balíky
 --- Virtuální balíky
 --- Úlohy





 K těmto balíkům existuje novější verze.










   [Poznámka] Poznámka
              Protože aptitude automaticky skrývá prázdné skupiny, je možné,
              že na svém počítači vidíte trošku jiný výstup, než na obrázku.

   Na předchozím obrázku je vysvícena první skupina („Aktualizovatelné
   balíky“), což znamená, že je momentálně vybraná. Po seznamu se můžete
   pohybovat šipkami nahoru a dolů - všimněte si, jak se při tom mění popis
   pod seznamem balíků. Pro „rozbalení“ vybrané skupiny stiskněte Enter:

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
 aptitude 0.2.14.1
 --- Aktualizovatelné balíky
 --\ Instalované balíky
   --- admin - Nástroje pro správu (instalace softwaru, správa uživatelů, atd.)
   --- base - Základní systém Debianu
   --- devel - Nástroje pro vývoj softwaru
   --- doc - Dokumentace a programy pro její prohlížení
   --- editors - Textové editory a procesory
   --- electronics - Programy pro práci s el. obvody a elektronikou
   --- games - Hry, hračky a zábavné programy
   --- gnome - Desktopové prostředí GNOME

 Tyto balíky máte instalovány ve svém počítači.









   Jak je vidět, skupina „Instalované balíky“ se rozbalila a odhalila svůj
   obsah: nachází se v ní další skupiny volně pojmenované podle typu
   softwaru, který obsahují. Rozbalením sekce „admin“ se objeví:

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
 aptitude 0.2.14.1
 --- Aktualizovatelné balíky
 --\ Instalované balíky
   --\ admin - Nástroje pro správu (instalace softwaru, správa uživatelů, atd.)
     --- hlavní - Hlavní archiv Debianu
   --- base - Základní systém Debianu
   --- devel - Nástroje pro vývoj softwaru
   --- doc - Dokumentace a programy pro její prohlížení
   --- editors - Textové editory a procesory
   --- electronics - Programy pro práci s el. obvody a elektronikou
   --- games - Hry, hračky a zábavné programy

 Balíky v sekci 'admin' umožňují provádět správu systému, jako instalaci
 softwaru, správu uživatelů, nastavení a sledování systému, zkoumání síťového
 provozu, a tak podobně.







   Skupina „admin“ obsahuje jedinou podskupinu „hlavní“ archiv Debianu.
   Rozbalením této skupiny se konečně dostanete k balíkům!

   [Tip] Tip
         Pro ušetření času můžete použít klávesu [ a rozbalit tak najednou
         všechny podskupiny dané skupiny. Výběrem „Instalované balíky“ a
         stiskem [ by se okamžitě zobrazily balíky jako na následujícím
         obrázku.

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
 aptitude 0.2.14.1
 --- Aktualizovatelné balíky
 --\ Instalované balíky
   --\ admin - Nástroje pro správu (instalace softwaru, správa uživatelů, atd.)
     --- hlavní - Hlavní archiv Debianu
 i     acpid                                                1.0.3-19   1.0.3-19
 i     alien                                                8.44       8.44
 i     anacron                                              2.3-9      2.3-9
 i     apt-show-versions                                    0.07       0.07
 i A   apt-utils                                            0.5.25     0.5.25
 i     apt-watch                                            0.3.2-2    0.3.2-2

 Debian se skládá z balíků ze sekce 'main'. Každý balík v této sekci je
 svobodným softwarem.

 Více informací o tom, co Debian považuje za svobodný software, naleznete v
 http://www.debian.org/social_contract#guidelines, nebo česky na http://www.
 debian.cz/info/social_contract.php#guidelines.




   Kromě šipek můžete pro pohyb v seznamu použít i klávesy Page Up a Page
   Down, které se posunují o celou obrazovku, což je velmi výhodné zejména
   při počtu balíků, které jsou v Debianu obsaženy.

   [Tip] Tip
         Pokud je ve spodní části obrazovky více informací, než se vejde na
         obrazovku, můžete si těmito informacemi posunovat nahoru a dolů
         klávesami a a z.

  Hledání balíků podle jmen

   Pro rychlé nalezení balíku, jehož jméno znáte, stiskněte /. Objeví se
   vyhledávací dialog:

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
 aptitude 0.2.14.1
 i     frozen-bubble                                        1.0.0-5    1.0.0-5
 i A   frozen-bubble-data                                   1.0.0-5    1.0.0-5
 i     geekcode                                             1.7.3-1    1.7.3-1
 i     gfpoken                                              0.25-3     0.25-3
 i     ggz-gnome-client                                     0.0.7-2    0.0.7-2
 i     ggz-gtk-client                                       0.0.7-1    0.0.7-1
 i     ggz-gtk-game-data                                    0.0.7-2    0.0.7-2
 i +--------------------------------------------------------------------------+
 i |Hledat:                                                                   |
 i |froz                                                                      |
 Po|                             [ Ok ]                             [ Zrušit ]|
 Fr+--------------------------------------------------------------------------+
 attempt to shoot bubbles into groups of the same color to cause them to pop. It
 features 100 single-player levels, a two-player mode, music and striking
 graphics.

 This game is widely rumored to be responsible for delaying the Woody release.

 URL: http://www.frozen-bubble.org/


   Jak je vidět z předchozí obrazovky, hledání řetězce froz nalezlo balík
   frozen-bubble. Pomocí mocného vyhledávacího systému popsaného v kapitole
   „Vyhledávací vzory“ můžete vyhledávat balíky podle nejrůznějších kritérií.
   Balíky můžete prohledávat i opačným směrem, stačí použít klávesu \.

   [Tip] Tip
         Abyste nemuseli opisovat hledaný řetězec stále dokola, můžete pro
         zopakování posledního hledání použít klávesu n. (Vyhledávací okno
         musí být samozřejmě zavřené, protože jinak by se vyhledával znak n.)

   Občas je užitečné vidět pouze balíky, které splňují nějakou podmínku. K
   tomu slouží klávesa l:

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
 aptitude 0.2.14.1
 --- Aktualizovatelné balíky
 --- Instalované balíky
 --- Nenainstalované balíky
 --- Zastaralé a lokálně vytvořené balíky
 --- Virtuální balíky
 --- Úlohy

   +--------------------------------------------------------------------------+
   |Omezit zobrazení na:                                                      |
   |apti                                                                      |
   |                             [ Ok ]                             [ Zrušit ]|
 K +--------------------------------------------------------------------------+









   Tento dialog pracuje úplně stejně jako dialog pro vyhledávání, až na to,
   že místo zvýraznění dalšího nalezeného balíku skryje ty balíky, které
   danému vzoru neodpovídají. Pokud například do tohoto dialogu napíšete apti
   a zmáčknete Enter, skryjí se všechny balíky kromě těch, jejichž název
   obsahuje „apti“:

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
 aptitude 0.2.14.1
 --\ Instalované balíky
   --\ admin - Nástroje pro správu (instalace softwaru, správa uživatelů, atd.)
     --\ hlavní - Hlavní archiv Debianu
 i     aptitude                                             0.2.14.1-2 0.2.14.1-2
 i A   synaptic                                             0.51-1     0.51-1
   --\ x11 - X Window System a spřízněný software
     --\ hlavní - Hlavní archiv Debianu
 i     xfree86-driver-synaptics                             0.13.3-1   0.13.3-1
 --- Nenainstalované balíky
 --- Virtuální balíky

 Tyto balíky máte instalovány ve svém počítači.









  Správa balíků

   Nyní, když se umíte pohybovat v seznamu balíků, nastal čas naučit se
   instalovat a odstraňovat balíky. V této sekci se naučíte, jak označit
   balíky pro instalaci, smazání a aktualizaci.

   [Tip] Tip
         Při experimentování s aptitude používejte účet běžného uživatele,
         protože se pak nemusíte bát, že byste nějakým způsobem poškodili
         systém (změny v systému může provádět pouze uživatel root). Pokud se
         pokusíte provést nějakou akci, kterou může provést pouze root,
         aptitude vás o tom bude informovat a pokud budete chtít pokračovat,
         budete muset zadat rootovo heslo.

   Všechny operace s balíkem probíhají tak, že jej nejprve vyberete ze
   seznamu (řádek bude vysvícený) a poté stisknete klávesu odpovídající
   zamýšlené akci. Základní akční klávesy^[2] jsou + pro instalaci nebo
   aktualizaci balíku, - pro odstranění balíku a = pro zabránění, aby byl
   balík automaticky aktualizován (též známé jako podržení). Popisované akce
   se neprovedou okamžitě, ale teprve až o to aptitude požádáte. Do té doby
   můžete zamýšlené akce vidět pouze v seznamu balíků.

   Například další obrazovka ukazuje stav poté, co byl označen balík kaffeine
   a někdo na něm stiskl klávesu +. Balík je nyní zvýrazněn zelenou barvou a
   nalevo od názvu balíku se objevilo písmeno „i“, což znamená, že bude
   (někdy v budoucnu) nainstalován. Dále se v řádku objeví velikost, kterou
   balík ukousne z volného místa na disku.

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
 aptitude 0.2.14.1                 Na disku se použije 2925kB   Stáhnu: 1375kB
     --\ main - The main Debian archive
 p     bibletime-i18n                                      <žádná>     1.4.1-1
 p     education-desktop-kde                               <žádná>     0.771
 p     junior-kde                                          <žádná>     1.4
 piA   kaffeine                                  +2843kB   <žádná>     0.4.3-1
 pi    kaffeine-mozilla                          +81.9kB   <žádná>     0.4.3-1
 p     karamba                                             <žádná>     0.17-5
 p     kde-devel                                           <žádná>     4:3.1.2
 p     kde-devel-extras                                    <žádná>     4:3.1.2
 p     kde-i18n-ar                                         <žádná>     4:3.2.3-2
 The K Desktop Environment (development files)
 A metapackage containing dependencies for the core development suite of KDE
 including kdesdk, qt3-designer, and all core KDE -dev packages.








   [Tip] Tip
         Kdykoliv můžete použít Zpět → Zpět (Control+u). Funkce „Zpět“ umí
         vrátit zpět změny na jednom nebo více balících. To se hodí v
         případě, že nějaká akce měla neočekávané následky a nyní ji chcete
         „vrátit zpět“.

   Kromě akcí, které pracují s jednotlivými balíky existuje ještě jedna
   důležitá funkce: klávesa U se pokusí aktualizovat všechny balíky, které se
   aktualizovat dají. Tento příkaz byste měli používat pravidelně, abyste
   zajistili, že budete mít nejnovější aktualizace.

    Správa porušených balíků

   Někdy se stane, že změna stavu balíku způsobí, že se poruší některé vztahy
   mezi balíky. Balíky s nesplněnými závislostmi se nazývají poškozené. Pokud
   taková situace nastane, aptitude vás o ní bude okamžitě informovat.
   Příklad, co se stane, když jsem se pokusil odstranit sound-juicer:

  Akce  Zpět  Balík  Řešitel  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
 aptitude 0.3.3       #Porušené: 1   Na disku se uvolní 48.6MB
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
 sound-juicer bude odstraněn.


 Následující balíky závisí na sound-juicer a budou jeho odstraněním
 porušeny:


   * gnome-desktop-environment závisí na sound-juicer

 [1(1)/...] Návrh ponechat 2
 e: Prozkoumat  !: Použít  .: Další  ,: Předchozí

   Jak se můžete přesvědčit, aptitude zobrazí nejméně tři indicie, že je něco
   špatně. Zaprvé je nahoře v modrém pruhu zobrazen počet balíků s porušenými
   závislostmi. Zadruhé se ve spodní části obrazovky zobrazí místo popisu
   balíků popis porušených závislostí, které nějak souvisí vybraným balíkem.
   A zatřetí se dole na obrazovce objeví pruh s návrhem, jak problém vyřešit.
   Porušené balíky můžete v seznamu najít rychle tak, že budete hledat vzor
   ?broken, nebo ještě jednodušeji použijete klávesu b.

   [Poznámka] Poznámka
              Text [1(1)/...] indikuje postup řešitele závislostí. První
              číslo je momentálně vybrané řešení, druhé pak počet řešení,
              které již aptitude vymyslela. Tři tečky „...“ naznačují, že
              mohou existovat ještě další řešení. Pokud by si aptitude byla
              jistá, že již žádné další řešení neexistuje, text by změnil
              podobu na [1/1].

   Chcete-li se o nabízeném řešení dozvědět více, stiskněte klávesu e. Objeví
   se obrazovka podobná této:

  Akce  Zpět  Balík  Řešitel  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
                 Balíky                           Řešení závislostí
   --\ Ponechat následující balíky v jejich aktuální verzi:
     gstreamer0.8-cdparanoia                           [0.8.11-1 (unstable, now)]
     sound-juicer                                                [2.10.1-2 (now)]
















 [1(1)/...] Návrh ponechat 2
 e: Prozkoumat  !: Použít  .: Další  ,: Předchozí

   Z obrázku je vidět, že jako jedno z možných řešení konfliktu navrhuje
   aptitude ponechat balíky gstreamer0.8-cdparanoia a sound-juicer v původním
   stavu, tj. neprovádět s nimi žádnou akci. Protože nám toto řešení
   nevyhovuje (chceme přece sound-juicer odinstalovat), můžete přejít na
   další řešení klávesou ., případně se vrátit k dřívějšímu řešení pomocí
   klávesy ,. Naleznete-li řešení, které vám vyhovuje, můžete jej použít
   stiskem !, což vás zároveň vrátí do původního seznamu balíků. Například na
   následující obrazovce jsem se rozhodl použít klávesu . a prozkoumat další
   řešení:

  Akce  Zpět  Balík  Řešitel  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
                 Balíky                           Řešení závislostí
   --\ Ponechat následující balíky v jejich aktuální verzi:
     sound-juicer                                      [2.10.1-3 (unstable, now)]
   --\ Degradovat následující balíky:
     gstreamer0.8-cdparanoia          [0.8.11-1 unstable, now -> 0.8.8-3 testing]















 [2(2)/...] Návrh ponechat 1, degradovat 1
 e: Prozkoumat  !: Použít  .: Další  ,: Předchozí

   Kromě základních navigačních příkazů můžete při řešení závislostí použít
   klávesu r, kterou zakážete akce, které se vám nelíbí. Například obě řešení
   navrhují zrušit odstranění balíku sound-juicer, což ale bylo právě to, co
   jsme chtěli původně udělat — balík odstranit! Stiskem klávesy r na řádku s
   danou akcí můžete říci aptitude, aby vám nenabízela řešení, ve kterých by
   došlo k ponechání tohoto balíku.

  Akce  Zpět  Balík  Řešitel  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
                 Balíky                           Řešení závislostí
   --\ Ponechat následující balíky v jejich aktuální verzi:
     gstreamer0.8-cdparanoia                           [0.8.11-1 (unstable, now)]
 R   sound-juicer                                      [2.10.1-3 (unstable, now)]






 GNOME 2 CD Ripper
 gnome-desktop-environment závisí na sound-juicer
 --\ Následující akce vyřeší tuto závislost:
   -> Odstranění gnome-desktop-environment [1:2.10.2.3 (unstable, testing, now)]
 R -> Zrušení odstranění sound-juicer
   -> Degradace sound-juicer [2.10.1-3 (unstable, now) -> 0.6.1-2 (testing)]




 [1/(1)...] Návrh ponechat 2
 e: Prozkoumat  !: Použít  .: Další  ,: Předchozí

   Jak je z obrázku vidět, řádek navrhující ponechat sound-juicer ve
   stávající verzi zčervenal a byl označen písmenem „R“, což znamená, že byl
   zamítnut (z anglického Rejected). Řešení, která poté vytvoříte (tj. ta,
   která jste ještě neviděli), nebudou tuto akci obsahovat. Daná akce se však
   stále může vyskytovat v řešeních, která jste vytvořili před tímto zákazem.

   [Poznámka] Poznámka
              Na předchozím obrázku je uprostřed obrazovky zobrazen krátký
              popis balíku sound-juicer. Pod ním je vidět závislost, která
              způsobila podržení balíku sound-juicer v aktuální verzi
              („gnome-desktop-environment závisí na sound-juicer“). Dále pak
              následuje seznam možností, jak tuto závislost vyřešit.

   Například kdybychom toto zamítnutí použili hned po označení balíku
   sound-juicer pro odinstalování a stisku klávesy e, tak by přechod na další
   řešení nenabídnul řešení, které zrušilo odinstalaci balíku sound-juicer a
   ještě navrhlo degradaci balíku gstreamer0.8-cdparanoia, ale místo něj by
   nabídl následující:

  Akce  Zpět  Balík  Řešitel  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
                 Balíky                           Řešení závislostí
   --\ Odstranit následující balíky:
     gnome-desktop-environment              [1:2.10.2.3 (unstable, testing, now)]

















 [2(2)/...] Návrh odstranit 1
 e: Prozkoumat  !: Použít  .: Další  ,: Předchozí

   Zamítnutí dané akce můžete kdykoliv zrušit tak, že se přesunete na řádek
   se zamítnutou akcí a znovu použijete klávesu r. Nově vytvořená řešení pak
   mohou tuto akci zase obsahovat.

   Opakem zamítnutí je schválení akce. Pro schválení akce ji jednoduše
   vyberte a stiskněte klávesu a. Tím přinutíte řešitele, aby tuto akci
   použil kdykoliv to jen bude možné.^[3]. Schválené akce poznáte podle
   zelené barvy a podle písmena „A“ na začátku řádku, jak je vidět z
   následujícího obrázku:

  Akce  Zpět  Balík  Řešitel  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
                 Balíky                           Řešení závislostí
   --\ Odstranit následující balíky:
 A   gnome-desktop-environment              [1:2.10.2.3 (unstable, testing, now)]

















 [2(2)/...] Návrh odstranit 1
 e: Prozkoumat  !: Použít  .: Další  ,: Předchozí

   [Dulezité] Důležité
              Jestliže se vám vzniklá situace nepodaří vyřešit vlastními
              silami, aptitude se pokusí věci spravit při zaznamenání
              provedených změn klávesou g tak, že použije aktuální návrh.
              Automatické řešení závislostí je poměrně těžké a může se stát,
              že nebudete s výsledky spokojeni. Vždy je lepší vyřešit podobné
              problémy před zaznamenáním změn.

  Aktualizace seznamu a instalace balíků

   V tomto okamžiku již víte o aptitude dost na to, abyste mohli v systému
   provádět změny.

   Svůj seznam dostupných balíků byste měli pravidelně aktualizovat vůči
   seznamům na debianích serverech, abyste měli přehled o nových balících a
   novějších verzích balíků stávajících. Tuto akci provedete jednoduše
   stiskem klávesy u. Během stahování můžete kdykoliv stisknout klávesu q a
   stahování zastavit.

   Když budete mít seznam balíků aktuální, můžete vybrat balíky, jež chcete
   instalovat, odstranit, nebo aktualizovat, jak je popsáno v předchozí
   sekci. Přehled provedených změn získáte klávesou g. Kupříkladu při
   instalaci balíku kaffeine-mozilla z předchozího příkladu se objeví
   následující obrazovka:

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
 aptitude 0.2.14.1                 Na disku se použije 2925kB    Stáhnu: 1375kB
 --\ Balíky automaticky instalované pro splnění závislostí
 piA kaffeine                                     +2843kB  <žádná>     0.4.3-1
 --\ Balíky k instalaci
 pi  kaffeine-mozilla                             +81.9kB  <žádná>     0.4.3-1








 Tyto balíky budou automaticky nainstalovány, protože jsou vyžadovány jinými
 balíky, které jste vybrali pro instalaci.

 Pokud vyberete balík, objeví se zde popis jeho aktuálního stavu.






   Jak je vidět, aptitude se automaticky rozhodla instalovat balík kaffeine,
   protože jej kaffeine-mozilla vyžaduje. Nyní se můžete rozhodnout, zda
   budete v instalaci pokračovat (klávesa g), nebo zda instalaci přerušíte
   (klávesa q).

Používání aptitude z příkazové řádky

   Kromě celoobrazovkového režimu popsaného v minulé sekci nabízí aptitude i
   správu balíků z příkazové řádky podobně, jako program apt-get. Tato sekce
   pokrývá pouze nejčastější příkazy. Pro úplný seznam se podívejte do
   aptitude - přehled příkazů.

   Obecně bude spuštění aptitude v příkazovém režimu vypadat takto:

   aptitude akce [argumenty...]

   akce říká aptitude, co má vlastně udělat. Ostatní argumenty jsou většinou
   volitelné, často se zde zadávají názvy balíků a různé přepínače^[4].

   Nejdůležitější akce jsou:

   aptitude update

           Příkaz aktualizuje seznam balíků, jako kdybyste v celoobrazovkovém
           režimu stiskli klávesu u.

   aptitude safe-upgrade

           Příkaz aktualizuje všechny aktualizovatelné balíky na novější
           verze. Pokud by aktualizací nastal konflikt, a bylo by potřeba pro
           aktualizaci nějakého balíku odstranit jiný nainstalovaný balík,
           pak se aktualizace neprovede. Chcete-li přesto aktualizovat,
           použijte příkaz full-upgrade.

   aptitude full-upgrade

           Tento příkaz se také pokusí aktualizovat všechny aktualizovatelné
           balíky, ale oproti safe-upgrade je při řešení závislostí mnohem
           agresivnější: Bude instalovat a odstraňovat balíky tak dlouho,
           dokud uspokojivě nevyřeší všechny závislosti. Z povahy tohoto
           příkazu vyplývá, že může způsobit nečekané následky a tudíž byste
           jej měli používat s rozvahou.

           [Poznámka] Poznámka
                      Z historických důvodů se tento příkaz dříve jmenoval
                      dist-upgrade a aptitude jej stále rozpoznává.

   aptitude [ install | remove | purge ] balík1 [balík2...]

           Tyto příkazy nainstalují, odstraní, nebo vyčistí^[5] zadané
           balíky. Instalování již nainstalovaného balíku buď neudělá nic,
           nebo, pokud se dá balík aktualizovat, se aktualizuje na novější
           verzi.

   aptitude search vzor1 [vzor2...]

           Příkaz hledá balíky jejichž název obsahuje libovolný ze zadaných
           vzorů a výsledky vypisuje na terminál. Zadaný vzor nemusí být jen
           text, ale celý regulární výraz (viz kapitola „Vyhledávací vzory“).
           ^[6] Například „aptitude search gnome kde“ vypíše všechny balíky,
           jejichž jméno obsahuje řetězec „gnome“ nebo „kde“.

   aptitude show balík1 [balík2...]

           Na terminál zobrazí informace o každém balíku.

   Všechny příkazy, které instalují, aktualizují a odstraňují balíky,
   přijímají parametr -s, což značí „simulovat“. Když na příkazové řádce
   použijete tento parametr, program se chová jako obvykle, ale ve
   skutečnosti žádné soubory nemaže ani neinstaluje.

   aptitude občas zobrazí výzvu podobnou této:

 Následující NOVÉ balíky budou nainstalovány automaticky:
   space-orbit-common
 Následující NOVÉ balíky budou instalovány:
   space-orbit space-orbit-common
 0 balíků aktualizováno, 2 nově instalováno, 0 k odstranění a 0 neaktualizováno.
 Potřebuji stáhnout 3200kB archívů. Po rozbalení bude použito 8413kB.
 Chcete pokračovat? [Y/n/?]

   Kromě zřejmých možností „Ano“ a „Ne“ máte k dispozici řadu příkazů,
   kterými můžete změnit styl zobrazení a/nebo zadat další akce. Například
   příkazem s u každého balíku zobrazíte nebo skryjete informace o místě,
   které balík na disku zabere.

 Chcete pokračovat? [Y/n/?] s

 Změny velikostí budou zobrazeny.

 Následující NOVÉ balíky budou nainstalovány automaticky:
   space-orbit-common <+8020kB>
 Následující NOVÉ balíky budou instalovány:
   space-orbit <+393kB> space-orbit-common <+8020kB>
 0 balíků aktualizováno, 2 nově instalováno, 0 k odstranění a 0 neaktualizováno.
 Potřebuji stáhnout 3200kB archívů. Po rozbalení bude použito 8413kB.
 Chcete pokračovat? [Y/n/?]

   Podobně příkaz d zobrazí informace o automaticky instalovaných nebo
   odstraněných balících:

 Následující NOVÉ balíky budou nainstalovány automaticky:
   space-orbit-common (D: space-orbit)
 Následující NOVÉ balíky budou instalovány:
   space-orbit space-orbit-common
 0 balíků aktualizováno, 2 nově instalováno, 0 k odstranění a 0 neaktualizováno.
 Potřebuji stáhnout 3200kB archívů. Po rozbalení bude použito 8413kB.

   Výpis nám říká, že space-orbit-common bude instalován automaticky, protože
   na něm závisí space-orbit. Seznam všech možných příkazů můžete získat
   klávesou ?.

   Pokud váš požadavek naruší závislosti takovým způsobem, že nemohou být
   vyřešeny triviálním zásahem, aptitude se raději zeptá, co má dělat:

 Následující balíky jsou PORUŠENY:
   libsdl1.2debian
 Následující balíky budou ODSTRANĚNY:
   libsdl1.2debian-alsa
 .
 .
 .
 Následující akce vyřeší tyto závislosti:

 Instalovat následující balíky:
 libsdl1.2debian-all [1.2.12-1 (unstable)]

 Skóre je 41

 Přijmout toto řešení? [Y/n/q/?]

   Klávesou y nebo enter přijmete navrhované řešení, stiskem n se zobrazí
   „druhé nejlepší“ řešení (třetí, čtvrté, …):

 Přijmout toto řešení? [Y/n/q/?] n
 Následující akce vyřeší tyto závislosti:

 Instalovat následující balíky:
 libsdl1.2debian-esd [1.2.12-1 (unstable)]

 Skóre je 19

 Přijmout toto řešení? [Y/n/q/?]

   V režimu řešení závislostí můžete, podobně jako na hlavní příkazové řádce,
   provádět mnoho dodatečných akcí, včetně ruční změny stavu balíků. Seznam
   dostupných akcí naleznete pod klávesou ?.

   Klávesa q ukončí všechny snahy o automatické vyřešení závislostí a nabídne
   vám, zda chcete vyřešit závislosti ručně:

 Přijmout toto řešení? [Y/n/q/?] q
 aptitude se nepodařilo najít řešení těchto závislostí. Můžete je buď
 vyřešit ručně, nebo skončit klávesou „n“.
 Následující balíky mají nesplněné závislosti:
   libsdl1.2debian: Závisí na: libsdl1.2debian-alsa (= 1.2.12-1) ale ten nelze nainstalovat nebo
                               libsdl1.2debian-all (= 1.2.12-1) ale ten nelze nainstalovat nebo
                               libsdl1.2debian-esd (= 1.2.12-1) ale ten nelze nainstalovat nebo
                               libsdl1.2debian-arts (= 1.2.12-1) ale ten nelze nainstalovat nebo
                               libsdl1.2debian-oss (= 1.2.12-1) ale ten nelze nainstalovat nebo
                               libsdl1.2debian-nas (= 1.2.12-1) ale ten nelze nainstalovat nebo
                               libsdl1.2debian-pulseaudio (= 1.2.12-1) ale ten nelze nainstalovat
 Vyřešit tyto závislosti ručně? [N/+/-/_/:/?]

   Pro vyřešení porušených závislostí nyní můžete použít libovolné příkazy
   pro změnu stavu balíků. Seznam dostupných příkazů naleznete pod klávesou
   ?. Klávesou n nebo enter aptitude ukončíte.

 Vyřešit tyto závislosti ručně? [N/+/-/_/:/?] n
 Přerušeno.

   Pro úplný přehled vlastností a parametrů příkazového režimu aptitude se
   podívejte do kapitoly Přehled příkazů.

   --------------

   ^[2] S balíky můžete pracovat také pomocí menu Balík; podrobněji viz „Menu
   Balík“.

   ^[3] Schválení akce není stejné jako vyžadování, aby tuto akci obsahovalo
   každé řešení. To znamená, že když má řešitel na výběr mezi schválenou a
   jinou akcí, vždy použije tu schválenou. Pokud existuje více schválených
   akcí, bude se je snažit použít všechny.

   ^[4] Přepínač mívá podobu pomlčky následované písmenem, např. „-a“, „-v“,
   apod.

   ^[5] Termín vyčistit znamená, že balík bude odstraněn včetně jeho
   konfiguračních souborů

   ^[6] Ve skutečnosti platí to samé i o ostatních příkazech, které vyžadují
   jako parametr název balíku (např. install nebo show).

Kapitola 2. aptitude - referenční příručka

   Obsah

   Uživatelské rozhraní aptitude

                Používání menu

                Příkazy menu

                Práce s několika pohledy

                Přepnutí na uživatele root

   Správa balíků

                Správa seznamu balíků

                Získání informací o balíku

                Změna stavu balíků

                Řešení problémů se závislostmi

                Stažení, instalace a odstranění balíků

                Pochopení a správa důvěryhodnosti balíků

                Správa automaticky instalovaných balíků

   Vyhledávací vzory

                Hledání řetězců

                Zkrácená forma vyhledávacích termů

                Hledání a verze balíků

                Explicitní cíle

                Přehled vyhledávacích vzorů

   Přizpůsobení aptitude

                Přizpůsobení seznamu balíků

                Přizpůsobení klávesových zkratek

                Přizpůsobení barvy textu a úprava stylů

                Přizpůsobení rozložení obrazovky

                Konfigurační soubor

                Témata

   Hraní minového pole

     The White Rabbit put on his spectacles. „Where shall I begin, please    
     your Majesty?“ he asked.

     „Begin at the beginning,“ the King said gravely, „and go on till you
     come to the end: then stop.“
                                         -- Lewis Carrol, Alice in Wonderland

   aptitude je rozsáhlý program se spoustou vlastností a občas je obtížné
   vzpomenout si, jak se některá věc provádí, nebo dokonce že je taková věc
   možná. Vskutku. Autor dostává spoustu námětů na zlepšení aptitude, ale
   velká část z nich už je v programu dávno obsažena, jen je najít.^[7]

   Aby nedocházelo k situacím jako v předchozím odstavci, vznikla tato
   referenční příručka, ve které naleznete popis každé vlastnosti a každého
   konfiguračního parametru aptitude. Hledáte-li jemný úvod do
   nejdůležitějších vlastností aptitude, přečtěte si kapitolu 1 – „Začínáme“.

   [Poznámka] Poznámka
              Vzhled a chování aptitude se dá v mnoha směrech přizpůsobit a
              popis všech možných eventualit je téměř nadlidský úkol. Tato
              příručka popisuje práci programu při implicitním nastavení. O
              přizpůsobení aptitude pojednává kapitola „Přizpůsobení
              aptitude“.

Uživatelské rozhraní aptitude

   Tato sekce popisuje části uživatelského rozhraní aptitude, které nemají
   nic společného se správou balíků.

  Používání menu

   Menu na nejhornějším řádku obrazovky obsahuje nejdůležitější příkazy
   dostupné v aptitude. Pro vstup do menu slouží klávesa Control+t, pohyb po
   menu zajišťují šipky a výběr položky se provádí klávesou Enter.

   Některé položky menu mají také ve svém názvu zvýrazněný znak, tzv. „horkou
   klávesu“. Pokud máte menu otevřené, můžete touto klávesou rychle aktivovat
   danou položku.

   Dále mají některé položky menu za svým názvem klávesu (nebo klávesovou
   kombinaci), která slouží ke spuštění dané položky bez nutnosti vstupovat
   do menu, tj. přímo ze seznamu balíků.

   Ve zbytku příručky budeme příkazy menu označovat následovně: Menu →
   Položka (klávesa), což značí Položku umístěnou v menu Menu, kterou můžete
   vyvolat klávesou klávesa.

  Příkazy menu

    Menu Akce

   Obrázek 2.1. Příkazy dostupné z menu Akce

   +------------------------------------------------------------------------+
   |            Příkaz             |                 Popis                  |
   |-------------------------------+----------------------------------------|
   |                               | Při prvním spuštění zobrazí souhrn     |
   | Akce → Instalovat/odstranit   | před instalací, při druhém zahájí      |
   | balíky (g)                    | samotnou instalaci. Průběh instalace   |
   |                               | je popsán v kapitole „Stažení,         |
   |                               | instalace a odstranění balíků“.        |
   |-------------------------------+----------------------------------------|
   | Akce → Aktualizovat seznam    | Aktualizuje seznam balíků.             |
   | balíků (u)                    |                                        |
   |-------------------------------+----------------------------------------|
   |                               | Označí všechny aktualizovatelné balíky |
   | Akce → Označit                | pro aktualizaci. Z této akce jsou      |
   | aktualizovatelné (U)          | vynechány ty balíky, které jsou        |
   |                               | podržené v aktuální verzi, nebo které  |
   |                               | mají aktualizaci zakázánu.             |
   |-------------------------------+----------------------------------------|
   | Akce → Zapomenout nové balíky | Zapomene, které balíky jsou „nové“     |
   | (f)                           | (vyprázdní strom „Nové balíky“).       |
   |-------------------------------+----------------------------------------|
   |                               | Zruší všechny naplánované instalace,   |
   | Akce → Zrušit naplánované     | odstranění, aktualizace a podržení. Je |
   | akce                          | to vlastně ekvivalent spuštění příkazu |
   |                               | Keep na každý balík v databázi.        |
   |-------------------------------+----------------------------------------|
   | Akce → Vyčistit cache s       | Smaže všechny balíky (soubory .deb),   |
   | balíky                        | které aptitude ^[a] stáhla.            |
   |-------------------------------+----------------------------------------|
   |                               | Smaže všechny balíky (soubory .deb),   |
   |                               | které aptitude ^[a] stáhla a již       |
   |                               | nejsou dostupné. O těch se tiše        |
   |                               | předpokládá, že jsou zastaralé a tedy  |
   | Akce → Vyčistit staré soubory | mohou být klidně smazány. (Nehrozí     |
   |                               | totiž, že byste plýtvali přenosovou    |
   |                               | kapacitou při jejich opětovném         |
   |                               | stahování, protože není odkud je       |
   |                               | stáhnout.)                             |
   |-------------------------------+----------------------------------------|
   |                               | Spustí hru Minové pole. Pravidla jsou  |
   | Akce → Zahrát si minové pole  | popsána v kapitole „Hraní minového     |
   |                               | pole“.                                 |
   |-------------------------------+----------------------------------------|
   |                               | Dále bude pokračovat pod uživatelem    |
   | Akce → Stát se rootem         | root, viz „Přepnutí na uživatele       |
   |                               | root“.                                 |
   |-------------------------------+----------------------------------------|
   | Akce → Konec (Q)              | Uloží změny provedené v seznamu balíků |
   |                               | a ukončí aptitude.                     |
   |------------------------------------------------------------------------|
   | ^[a] Nebo jiný apt nástroj.                                            |
   +------------------------------------------------------------------------+

    Menu Zpět

   Obrázek 2.2. Příkazy dostupné z menu Zpět

   +------------------------------------------------------------------------+
   |         Příkaz          |                    Popis                     |
   |-------------------------+----------------------------------------------|
   |                         | Zruší předchozí změnu stavu balíku(ů).       |
   |                         | Vracet zpět se můžete až do výskytu jedné z  |
   | Zpět → Zpět (Control+u) | následujících událostí: start aptitude,      |
   |                         | aktualizace seznamu balíků nebo instalace    |
   |                         | balíků.                                      |
   +------------------------------------------------------------------------+

    Menu Balík

   Obrázek 2.3. Příkazy dostupné z menu Balík

   +------------------------------------------------------------------------+
   |         Příkaz          |                    Popis                     |
   |-------------------------+----------------------------------------------|
   | Balík → Instalovat (+)  | Označí aktuálně vybraný balík pro instalaci. |
   |-------------------------+----------------------------------------------|
   | Balík → Odstranit (-)   | Označí aktuálně vybraný balík pro            |
   |                         | odstranění.                                  |
   |-------------------------+----------------------------------------------|
   | Balík → Vyčistit (_)    | Označí aktuálně vybraný balík pro vyčištění. |
   |-------------------------+----------------------------------------------|
   |                         | U vybraného balíku zruší naplánované akce    |
   | Balík → Ponechat (:)    | jako instalaci, aktualizaci nebo odstranění. |
   |                         | Zruší se také podržení v aktuální verzi.     |
   |-------------------------+----------------------------------------------|
   | Balík → Přidržet (=)    | Podrží vybraný balík v aktuální verzi.       |
   |-------------------------+----------------------------------------------|
   |                         | Označí vybraný balík jako „instalovaný       |
   | Balík → Spravovat       | automaticky“. Více informací o automaticky   |
   | automaticky (M)         | instalovaných balících naleznete v části     |
   |                         | „Správa automaticky instalovaných balíků“.   |
   |-------------------------+----------------------------------------------|
   |                         | Označí vybraný balík jako „instalovaný       |
   | Balík → Spravovat ručně | ručně“. Více informací o ručně instalovaných |
   | (m)                     | balících naleznete v části „Správa           |
   |                         | automaticky instalovaných balíků“.           |
   |-------------------------+----------------------------------------------|
   |                         | Pokud se dá vybraný balík aktualizovat na    |
   | Balík → Zakázat verzi   | novější verzi, tímto mu aktualizaci          |
   | (F)                     | zakážete. Pokud je vybraná verze balíku,     |
   |                         | zakážete mu aktualizaci na vybranou verzi.   |
   |-------------------------+----------------------------------------------|
   | Balík → Informace       | Zobrazí obrazovku s informacemi o vybraném   |
   | (enter)                 | balíku. (Dostupné verze, balíky na nichž     |
   |                         | závisí, balíky na něm závislé...)            |
   |-------------------------+----------------------------------------------|
   |                         | Při procházení seznamem balíků přepíná v     |
   |                         | informační oblasti (spodní polovina          |
   |                         | obrazovky) mezi různými informacemi o        |
   | Balík → Přepnout        | balíku. V současnosti zde můžete nalézt      |
   | informace o balíku (i)  | podrobný popis vybraného balíku (výchozí),   |
   |                         | informace o stavu balíku a analýzu, které    |
   |                         | balíky vyžadují nebo doporučují zvolený      |
   |                         | balík.                                       |
   |-------------------------+----------------------------------------------|
   |                         | Zobrazí seznam změn vybraného balíku.        |
   | Balík → Seznam změn (C) | Chcete-li vidět seznam změn konkrétní verze, |
   |                         | musíte před spuštěním tohoto příkazu vybrat  |
   |                         | příslušnou verzi.                            |
   +------------------------------------------------------------------------+

    Menu Řešitel

   Obrázek 2.4. Příkazy dostupné z menu Řešitel

   +------------------------------------------------------------------------+
   |    Příkaz     |                         Popis                          |
   |---------------+--------------------------------------------------------|
   | Řešitel →     | Zobrazí podrobný popis aktuálního návrhu na vyřešení   |
   | Prozkoumat    | závislostí (viz „Řešení problémů se závislostmi“).     |
   | řešení (e)    |                                                        |
   |---------------+--------------------------------------------------------|
   | Řešitel →     | Provede akce, které momentálně navrhuje řešitel        |
   | Použít řešení | závislostních problémů.                                |
   | (!)           |                                                        |
   |---------------+--------------------------------------------------------|
   | Řešitel →     |                                                        |
   | Další řešení  | Vybere další návrh řešitele závislostí.                |
   | (.)           |                                                        |
   |---------------+--------------------------------------------------------|
   | Řešitel →     |                                                        |
   | Předchozí     | Vybere předchozí návrh řešitele závislostí.            |
   | řešení (,)    |                                                        |
   |---------------+--------------------------------------------------------|
   | Řešitel →     |                                                        |
   | První řešení  | Vybere první návrh řešitele závislostí.                |
   | (<)           |                                                        |
   |---------------+--------------------------------------------------------|
   | Řešitel →     | Vybere poslední dosud vytvořený návrh řešitele         |
   | Poslední      | závislostí (viz „Řešení problémů se závislostmi“).     |
   | řešení (>)    |                                                        |
   |---------------+--------------------------------------------------------|
   | Řešitel →     | Při zkoumání řešení přepne, zda se má momentálně       |
   | Přepnout      | vybraná akce zamítnout a posune se na další akci (viz  |
   | zamítnutí (r) | „Řešení problémů se závislostmi“). Pokud je akce       |
   |               | momentálně povolená, její povolení bude zrušeno.       |
   |---------------+--------------------------------------------------------|
   | Řešitel →     | Při zkoumání řešení přepne, zda se má momentálně       |
   | Přepnout      | vybraná akce povolit a posune se na další akci (viz    |
   | povolení (a)  | „Řešení problémů se závislostmi“). Pokud je akce       |
   |               | momentálně zamítnutá, její zamítnutí bude zrušeno.     |
   |---------------+--------------------------------------------------------|
   | Řešitel →     | Při zkoumání řešení zobrazí podrobné informace o       |
   | Zobrazit cíl  | balíku, který je ovlivněn momentálně vybranou akcí     |
   | (Enter)       | (viz „Řešení problémů se závislostmi“).                |
   |---------------+--------------------------------------------------------|
   |               | Při zkoumání řešení zamítne všechny akce, které by     |
   |               | zrušily podržení nějakého balíku, případně by          |
   | Řešitel →     | nainstalovaly zakázanou verzi. Ve výchozím nastavení   |
   | Zamítnout     | se řešitel chová tak, jako by byla tato položka menu   |
   | porušující    | vždy aktivní. Pokud ovšem nastavíte konfigurační       |
   | podržení      | volbou Aptitude::ProblemResolver::Allow-Break-Holds na |
   |               | hodnotu true, můžete použít toto menu pro dočasné      |
   |               | zakázání zmíněných akcí.                               |
   +------------------------------------------------------------------------+

    Menu Hledat

   Obrázek 2.5. Příkazy dostupné z menu Hledat

   +------------------------------------------------------------------------+
   |          Příkaz          |                    Popis                    |
   |--------------------------+---------------------------------------------|
   |                          | V seznamu balíků vyhledá balík, který se    |
   | Hledat → Hledat (/)      | shoduje se zadaným vzorem (viz „Vyhledávací |
   |                          | vzory“).                                    |
   |--------------------------+---------------------------------------------|
   | Hledat → Hledat          | V seznamu balíků vyhledá předchozí balík,   |
   | předchozí (\)            | který se shoduje se zadaným vzorem (viz     |
   |                          | „Vyhledávací vzory“).                       |
   |--------------------------+---------------------------------------------|
   | Hledat → Hledat znovu    | Zopakuje poslední hledání (aniž byste znovu |
   | (n)                      | zadávali hledaný vzor).                     |
   |--------------------------+---------------------------------------------|
   |                          | Zopakuje poslední hledání (aniž byste znovu |
   | Hledat → Hledat znovu    | zadávali hledaný vzor), ale v opačném       |
   | obráceně (N)             | směru. Jestliže jste naposledy hledali      |
   |                          | směrem nahoru, tímto začnete hledat směrem  |
   |                          | dolů a naopak.                              |
   |--------------------------+---------------------------------------------|
   |                          | Omezí pohled na seznam balíků tak, že       |
   | Hledat → Omezit          | skryje balíky, jež nevyhovují zadanému      |
   | zobrazení                | vyhledávacímu vzoru (viz „Vyhledávací       |
   |                          | vzory“).                                    |
   |--------------------------+---------------------------------------------|
   | Hledat → Zrušit omezení  | Zruší omezení pohledu na seznam balíků      |
   | (l)                      | (zobrazí se všechny balíky).                |
   |--------------------------+---------------------------------------------|
   | Hledat → Hledat porušené | Vyhledá další porušený balík. To je         |
   | (b)                      | ekvivalentní s hledáním vzoru ?broken.      |
   +------------------------------------------------------------------------+

    Menu Volby

   Obrázek 2.6. Příkazy dostupné v menu Volby

   +------------------------------------------------------------------------+
   |      Příkaz       |                       Popis                        |
   |-------------------+----------------------------------------------------|
   |                   | Otevře nový pohled, ve kterém můžete měnit chování |
   |                   | aptitude. Jednotlivé volby jsou zobrazeny v        |
   |                   | podobném seznamu, v jakém jsou uspořádány balíky.  |
   |                   | Pro povolení/zakázání volby na ni najeďte kurzorem |
   |                   | a přepněte klávesou mezera nebo Enter. Změny se    |
   | Volby → Předvolby | okamžitě ukládají do konfiguračního souboru        |
   |                   | ~/.aptitude/config. Ovlivnit můžete vzhled (jak se |
   |                   | mají zobrazovat zprávy, jak jsou balíky seřazeny,  |
   |                   | …), způsob zacházení se závislostmi (zda se mají   |
   |                   | automaticky instalovat balíky doporučené jinými    |
   |                   | balíky) a některé další vlastnosti.                |
   |-------------------+----------------------------------------------------|
   | Volby → Původní   | Vrátí všechny volby do implicitního nastavení.     |
   | nastavení         | Hodí se v případě, že vaše úpravy dosáhnou         |
   |                   | takových rozměrů, že je již přestanete zvládat.    |
   +------------------------------------------------------------------------+

    Menu Pohledy

   [Poznámka] Poznámka
              Chcete-li se o pohledech dozvědět více, nevynechejte kapitolu
              „Práce s několika pohledy“.

   Obrázek 2.7. Příkazy dostupné z menu Pohledy

   +------------------------------------------------------------------------+
   |          Příkaz          |                    Popis                    |
   |--------------------------+---------------------------------------------|
   | Pohledy → Další (F6)     | Přepne se do dalšího aktivního pohledu.     |
   |--------------------------+---------------------------------------------|
   | Pohledy → Předchozí (F7) | Přepne se do předchozího aktivního pohledu. |
   |--------------------------+---------------------------------------------|
   | Pohledy → Zavřít (q)     | Zavře aktuální pohled.                      |
   |--------------------------+---------------------------------------------|
   | Pohledy → Nový pohled na | Vytvoří nový pohled na seznam balíků.       |
   | balíky                   |                                             |
   |--------------------------+---------------------------------------------|
   |                          | Vytvoří nový pohled, který obsahuje balíky, |
   | Pohledy → Prověřit       | jež nejsou instalovány, ale které jsou      |
   | doporučení               | doporučeny některým z nainstalovaných       |
   |                          | balíků.                                     |
   |--------------------------+---------------------------------------------|
   | Pohledy → Nový plochý    | Vytvoří nový pohled, ve kterém nejsou       |
   | seznam balíků            | balíky nijak roztříděny.                    |
   |--------------------------+---------------------------------------------|
   | Pohledy → Nový prohlížeč | Vytvoří nový pohled, ve kterém jsou balíky  |
   | Debtags                  | seřazeny podle jejich značek (debtags).     |
   |--------------------------+---------------------------------------------|
   | Pohledy → Nový prohlížeč | Zobrazí rozdělení balíků do kategorií.      |
   | kategorií                |                                             |
   |--------------------------+---------------------------------------------|
   |                          | Zobrazí další položky. Tyto odpovídají      |
   | Další položky            | momentálně aktivním pohledům. Pro přepnutí  |
   |                          | do konkrétního pohledu jej můžete vybrat z  |
   |                          | menu.                                       |
   +------------------------------------------------------------------------+

    Menu Nápověda

   Obrázek 2.8. Příkazy dostupné v menu Nápověda

   +------------------------------------------------------------------------+
   |         Příkaz          |                    Popis                     |
   |-------------------------+----------------------------------------------|
   | Nápověda → O programu   | Zobrazí informace o copyrightu.              |
   |-------------------------+----------------------------------------------|
   | Nápověda → Nápověda (?) | Zobrazí nápovědu.                            |
   |-------------------------+----------------------------------------------|
   | Nápověda → Uživatelský  | Zobrazí uživatelskou příručku (tento         |
   | manuál                  | dokument).                                   |
   |-------------------------+----------------------------------------------|
   | Nápověda → FAQ          | Zobrazí často kladené otázky programu        |
   |                         | aptitude.                                    |
   |-------------------------+----------------------------------------------|
   | Nápověda → Seznam změn  | Zobrazí historii hlavních změn v aptitude.   |
   |-------------------------+----------------------------------------------|
   |                         | Zobrazí podmínky, pod kterými můžete         |
   | Nápověda → Licence      | aptitude kopírovat, upravovat a              |
   |                         | distribuovat.                                |
   +------------------------------------------------------------------------+

  Práce s několika pohledy

   aptitude vám umožňuje pracovat najednou s několika „pohledy“. „Pohled“
   (někdy též nazývaný „obrazovka“ je jednoduše něco, co se může zobrazit v
   oblasti pod menu. Nejčastějším pohledem bývá seznam balíků, ale četné jsou
   také např. pohledy na stahování.

   Je-li zároveň otevřeno několik pohledů, objeví se nahoře na obrazovce nový
   pruh zobrazující všechny otevřené pohledy. Například pokud se v seznamu
   balíků rozhodnu prozkoumat balík apt (klávesou Enter) a poté ještě balík
   libc6, bude obrazovka vypadat nějak takto:

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
          Balíky             informace o apt            informace o libc6
 aptitude 0.3.1
 i A  --\ libc6                                             2.3.2.ds1- 2.3.2.ds1-
   Popis: GNU C Library: Shared libraries and Timezone data
     Contains the standard libraries that are used by nearly all programs on the
     system. This package includes shared versions of the standard C library and
     the standard math library, as well as many others. Timezone data is also
     included.
   Priorita: required
   Sekce: base
   Správce: GNU Libc Maintainers <debian-glibc@lists.debian.org>
   Komprimovaná velikost: 4901k
   Velikost po rozbalení: 15.9M
   Zdrojový balík: glibc
   --\ Závisí na
     --- libdb1-compat
   --\ Navrhuje
     --- locales
     --- glibc-doc
   --\ Koliduje s
 GNU C Library: Shared libraries and Timezone data

   Mezi pohledy se můžete přepínat příkazy Pohledy → Další (F6) a Pohledy →
   Předchozí (F7), nebo také kliknutím na název pohledu nahoře na obrazovce.
   Jejich seznam naleznete také v menu Pohledy. Aktuální pohled můžete zavřít
   příkazem Pohledy → Zavřít (q).

   Jak je vidět výše, některé příkazy (například zobrazení informací o
   balíku) vytváří nové pohledy automaticky. Chcete-li explicitně vytvořit
   nový pohled, můžete použít příkaz Pohledy → Nový pohled na balíky nebo
   Pohledy → Nový prohlížeč kategorií.

  Přepnutí na uživatele root

   Některé akce, jako třeba aktualizace seznamu balíků, může provádět pouze
   uživatel root. Máte-li aptitude spuštěnou pod běžným uživatelem a pokusíte
   se provést akci, která vyžaduje rootovská práva, aptitude se vás zeptá,
   zda se chcete přepnout na uživatele root.

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
 aptitude 0.2.14.1
 --- Instalované balíky
 --- Nenainstalované balíky
 --- Zastaralé a lokálně vytvořené balíky
 --- Virtuální balíky
 --- Úlohy

   +-------------------------------------------------------------------------+
   |Aktualizace seznamu balíků vyžaduje administrátorská práva, která        |
   |momentálně nemáte. Chcete se přepnout na účet root?                      |
   |                                                                         |
   |         [ Stát se rootem ]                [ Nestát se rootem ]          |
 Ty+-------------------------------------------------------------------------+









   Pokud zvolíte „Stát se rootem“, aptitude se vás zeptá na příslušné heslo a
   bude-li správné, provede požadovanou akci. Pozor! Uživatelem root
   zůstanete i po dokončení akce!

   Pro přepnutí na účet uživatele root nemusíte čekat, až spustíte
   „choulostivou“ akci, ale kdykoliv můžete použít příkaz Akce → Stát se
   rootem. Veškeré změny, které jste provedli ještě jako běžný uživatel,
   budou zachovány (ovšem uloží se až při ukončení aptitude).

Správa balíků

   Tato sekce vysvětluje práci se seznamem balíků, instalaci nového softwaru
   a odinstalaci starého.

  Správa seznamu balíků

   Abyste si svůj seznam balíků udržovali aktuální, doporučujeme, abyste jej
   pravidelně aktualizovali. K tomu slouží příkaz Akce → Aktualizovat seznam
   balíků (u).

  Získání informací o balíku

   Informace o balících jsou v aptitude umístěny na několika místech. Seznam
   balíků nabízí rychlý přehled o stavu každého balíku, podrobnosti jsou však
   skryty v dalších pohledech.

    Seznam balíků

   Seznam balíků poskytuje „kouknu-a-vidím“ souhrn o stavu balíku. Například
   řádek s programem webmin vypadá na autorově počítači takto:

 piAU  webmin                                        +5837kB <žádná>     1.160-2

   Čtyři znaky na levém okraji obrazovky ukazují, že balík momentálně není
   nainstalován („p“), ale při nejbližší příležitosti nainstalován bude
   („i“), že byl vybrán k instalaci automaticky („A“) a že není důvěryhodný
   („U“). Na pravé straně jsou vidět aktuální a nejnovější dostupné verze
   spolu s informací o tom, kolik místa na disku tato instalace zabere.

   [Tip] Tip
         Pohled na balíky si můžete přizpůsobit dle libosti, podrobnosti
         naleznete v kapitole „Přizpůsobení zobrazení balíků“.

   Tyto čtyři příznaky na levé straně obrazovky poskytují základní informace
   o stavu balíku. První znak zobrazuje aktuální stav, druhý značí akci,
   která se má s balíkem provést, třetí znak říká, zda byl balík instalován
   automaticky (viz „Správa automaticky instalovaných balíků“) a čtvrtý
   upozorňuje, zda je balík důvěryhodný (viz „Pochopení a správa
   důvěryhodnosti balíků“).

   Možné hodnoty příznaků „aktuální stav“ a „akce“ jsou popsány v tabulkách
   2.9 – „Hodnoty příznaku „aktuální stav““ a 2.10 – „Hodnoty příznaku
   „akce““.

   Obrázek 2.9. Hodnoty příznaku „aktuální stav“

   i - Balík je nainstalován a všechny jeho závislosti jsou splněny.
   c - Balík byl odstraněn, ale jeho konfigurační soubory jsou stále v
       systému.
   p - Balík byl odstraněn včetně konfiguračních souborů, anebo nikdy nebyl
       nainstalován.
   v - Balík je pouze virtuální.
   B - Balík má poškozené závislosti.
   u - Balík byl rozbalen, ale ještě nebyl nakonfigurován.
   C - Částečně zkonfigurovaný: konfigurace balíku byla přerušena.
   H - Částečně instalovaný: instalace balíku byla přerušena.

   Obrázek 2.10. Hodnoty příznaku „akce“

   i - Balík bude instalován.
   u - Balík bude aktualizován.
       Balík bude odstraněn, ale jeho konfigurační soubory zůstanou v
   d - systému. (Rozhodnete-li se jej znovu nainstalovat, nebudete ho muset
       zdlouhavě nastavovat, ale využije se stávající nastavení.)
   p - Balík bude vyčištěn (tj. smazán včetně konfiguračních souborů).
   h - Balík bude podržen ve stávající verzi. Dokud podržení nezrušíte, balík
       nebude aktualizován ani když bude k dispozici novější verze.
   F - Aktualizace tohoto balíku byla zakázána.
   r - Balík bude reinstalován.
       Balík je „poškozený“ - některé jeho závislosti nebudou splněny. Dokud
   B - budete mít poškozené balíky, aptitude vám nedovolí nic instalovat,
       aktualizovat a tím méně odstraňovat.

   Pokud váš terminál podporuje barvy, aptitude je využije pro zvýraznění
   stavu balíků. Barvy pozadí:

   Černá

           Balík nemůže být aktualizován, nebude instalován a nemá žádné
           problémy se závislostmi. Je-li balík nainstalován, bude jeho název
           zvýrazněn.

   Zelená

           Balík bude instalován.

   Modrá

           Balík je momentálně nainstalován a bude aktualizován.

   Fuchsiová

           Balík je momentálně nainstalován, ale bude odstraněn.

   Bílá

           Balík je momentálně nainstalován a je „podržen“ ve své aktuální
           verzi: automatické aktualizace jej budou ignorovat.

   Červená

           Balík je poškozen: některé z jeho závislostí nebudou splněny.

   A konečně spodní polovina obrazovky zobrazuje dlouhý popis. Když aptitude
   zjistí, že má balík prsty v nějakém závislostním problému, pokusí se zde
   tento problém popsat. Mezi popisem balíku a jeho závislostmi se můžete
   přepínat klávesou i.

    Podrobné informace o balíku

   Stisk klávesy Enter zobrazí podrobné informace o vybraném balíku:

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
 aptitude 0.2.14.1
 i A --\ apt                                                0.5.25     0.5.25
   Popis: Advanced front-end for dpkg
     This is Debian's next generation front-end for the dpkg package manager. It
     provides the apt-get utility and APT dselect method that provides a simpler,
     safer way to install and upgrade packages.

     APT features complete installation ordering, multiple source capability and
     several other unique features, see the Users Guide in apt-doc.
   Nezbytný: ano
   Priorita: important
   Sekce: base
   Správce: APT Development Team <deity@lists.debian.org>
   Komprimovaná velikost: 970k
   Velikost po rozbalení: 2961k
   Zdrojový balík: apt
   --\ Závisí na
     --- libc6 (>= 2.3.2.ds1-4)
     --- libgcc1 (>= 1:3.3.3-1)
     --- libstdc++5 (>= 1:3.3.3-1)
   --\ Navrhuje
     --- aptitude | synaptic | gnome-apt | wajig
     --- dpkg-dev
     --\ apt-doc (NESPLNĚNO)
 p     0.6.25
 p     0.5.25
   --\ Nahrazuje
     --- libapt-pkg-doc (< 0.3.7)
     --- libapt-pkg-dev (< 0.3.7)
   --- Názvy balíků poskytovaných apt
   --- Balíky, které závisí na apt
   --\ Verze
 p A 0.6.25
 i A 0.5.25


   Tento pohled se dá ovládat stejně, jako seznam balíků. Například na
   předchozím obrázku jsem rozbalil nesplněnou závislost na apt-doc, čímž se
   zobrazily dostupné verze apt-doc, které mohou tuto závislost splnit. S
   verzemi lze pracovat stejně jako s balíky: například pro instalaci balíku
   apt-doc ve verzi 0.5.25 označíte příslušný řádek a stisknete klávesu +.

   [Tip] Tip
         Pro rychlé splnění závislosti ji vyberte a stiskněte +; aptitude se
         pokusí ji splnit.

   Kromě závislostí balíku můžete vidět i názvy virtuálních balíků, které
   poskytuje, balíky, které na něm závisí a úplně dole také dostupné verze
   vybraného balíku.

   Jako obvykle můžete tuto obrazovku opustit klávesou q a vrátit se tak do
   předchozího pohledu. Pro větší pohodlí existuje ještě několik menších
   pohledů, které zobrazují pouze vybranou podmnožinu informací o balíku.
   Klávesa v zobrazí pouze dostupné verze, d závislosti a r „reverzní
   závislosti“ (které balíky závisí na vybraném balíku).

  Změna stavu balíků

   Následující příkazy slouží ke změně stavu balíků. Změny nabudou účinnosti
   při příštím spuštění instalace; do té doby můžete všechny příkazy vrátit
   zpět příkazem Zpět → Zpět (Control+u).

   Pro aplikování příkazu jednoduše vyberte balík ze seznamu balíků a spusťte
   příkaz. Tyto příkazy můžete použít také na celé skupiny balíků tak, že
   vyberete záhlaví skupiny (např. „Aktualizovatelné balíky“) a spustíte
   požadovaný příkaz.

   +------------------------------------------------------------------------+
   |          Příkaz          |                    Popis                    |
   |--------------------------+---------------------------------------------|
   |                          | Označí vybraný balík pro instalaci.         |
   |                          |                                             |
   | Instalovat: Balík →      | Jestliže balík není nainstalován,           |
   | Instalovat (+)           | nainstaluje se. Jestliže již nainstalován   |
   |                          | je, bude aktualizován (pokud je to možné) a |
   |                          | zruší se všechny příznaky, které            |
   |                          | aktualizaci bránily (např. Podržení).       |
   |--------------------------+---------------------------------------------|
   | Odstranit: Balík →       | Označí vybraný balík pro odstranění.        |
   | Odstranit (-)            |                                             |
   |                          | Pokud je balík instalovaný, bude odstraněn. |
   |--------------------------+---------------------------------------------|
   |                          | Označí vybraný balík pro vyčištění.         |
   |                          |                                             |
   | Vyčistit: Balík →        | Pokud je balík nainstalován, bude odstraněn |
   | Vyčistit (_)             | včetně konfiguračních souborů. Pokud již    |
   |                          | byl odstraněn, ale v systému po něm zůstaly |
   |                          | nějaké soubory, budou také odstraněny.      |
   |--------------------------+---------------------------------------------|
   |                          | U vybraného balíku nastaví, že má zůstat v  |
   |                          | aktuální verzi.                             |
   | Ponechat: Balík →        |                                             |
   | Ponechat (:)             | Veškeré předchozí naplánované akce -        |
   |                          | instalace, odstranění nebo aktualizace -    |
   |                          | budou zrušeny. Zruší se i podržení v        |
   |                          | aktuálním stavu.                            |
   |--------------------------+---------------------------------------------|
   |                          | Převede balík do stavu trvalého podržení.   |
   |                          |                                             |
   |                          | Podobně jako u předchozího se u balíku      |
   | Podržet: Balík →         | zruší všechny plánované akce, ale navíc se  |
   | Přidržet (=)             | balík nebude automaticky aktualizovat. ^[a] |
   |                          | Podržení bude platit tak dlouho, dokud jej  |
   |                          | explicitně nezrušíte např. příkazem Akce →  |
   |                          | Instalovat/odstranit balíky (g).            |
   |--------------------------+---------------------------------------------|
   |                          | Balík nebude automaticky aktualizován^[a]   |
   |                          | na novější verzi. Pokud již byla            |
   |                          | aktualizace naplánovaná, bude zrušena.      |
   |                          |                                             |
   |                          | Použijete-li tento příkaz na konkrétní      |
   | Zakázat aktualizaci:     | verzi balíku, balík na ni nebude            |
   | Balík → Zakázat verzi    | aktualizován. Najednou může být zakázaná    |
   | (F)                      | pouze jedna verze.                          |
   |                          |                                             |
   |                          | Tato funkce existuje hlavně pro pohodlí     |
   |                          | uživatelů „nestabilní“ distribuce, aby      |
   |                          | mohli přeskakovat známé nefunkční verze     |
   |                          | balíků.                                     |
   |--------------------------+---------------------------------------------|
   |                          | Znovu nainstaluje vybraný balík.            |
   |                          |                                             |
   |                          | Poznamenejme, že příznak reinstalace se     |
   | Reinstalovat: klávesa L  | nezachová po ukončení aptitude nebo po      |
   |                          | skončení instalace. (Je to kvůli tomu, že   |
   |                          | programy dpkg a apt nenabízí možnost        |
   |                          | zjistit, zda byla reinstalace úspěšná.)     |
   |--------------------------+---------------------------------------------|
   |                          | Nastaví příznak, zda je balík brán jako     |
   |                          | instalovaný automaticky nebo na vyžádání.   |
   | Balík → Spravovat        | Automaticky instalované balíky totiž budou  |
   | automaticky (M), Balík → | - pokud na nich už žádný balík nezávisí -   |
   | Spravovat ručně (m)      | odstraněny. Pro více informací nahlédněte   |
   |                          | do „Správa automaticky instalovaných        |
   |                          | balíků“.                                    |
   |------------------------------------------------------------------------|
   | ^[a] Tj. nebude ovlivněn akcemi Akce → Označit aktualizovatelné (U)    |
   | nebo z příkazové řádky full-upgrade a safe-upgrade.                    |
   +------------------------------------------------------------------------+

   Kromě zmíněných příkazů, které ovlivňují vybraný balík, existují ještě dva
   příkazy, které ovlivní spoustu balíků bez ohledu na to, co je vybráno.
   Akce → Zapomenout nové balíky (f) vymaže stav „nový“ u všech balíků v
   seznamu a Akce → Označit aktualizovatelné (U) označí každý
   aktualizovatelný balík pro aktualizaci (kromě balíků, které jsou podrženy
   nebo by byly aktualizovány na zakázanou verzi).

   [Poznámka] Poznámka
              Všechny změny týkající se stavu balíků se automaticky ukládají
              při ukončení programu, aktualizaci seznamu balíků nebo při
              spuštění instalace. Nechcete-li uložit provedené změny, můžete
              aptitude ukončit klávesovou zkratkou Ctrl-C.

  Řešení problémů se závislostmi

   Pokud se vyskytne problém se závislostmi, aptitude vám může pomoci v jeho
   řešení. Okamžitě po výskytu problému se dole na obrazovce objeví červený
   pruh, ve kterém aptitude stručně shrnuje navrhované změny. Například na
   následujícím obrázku aptitude naznačuje, že by mohla situaci vyřešit
   ponecháním dvou balíků ve stávajících verzích.

  Akce  Zpět  Balík  Řešitel  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
 aptitude 0.3.3       #Porušené: 1   Na disku se uvolní 48.6MB
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
 sound-juicer bude odstraněn.


 Následující balíky závisí na sound-juicer a budou jeho odstraněním
 porušeny:


   * gnome-desktop-environment závisí na sound-juicer

 [1(1)/...] Návrh ponechat 2
 e: Prozkoumat  !: Použít  .: Další  ,: Předchozí

   Jak je napsáno dole na obrazovce, můžete se podívat na další řešení pomocí
   kláves . a ,, použít vybrané řešení klávesou !, nebo podrobněji prozkoumat
   návrh stiskem klávesy e. Zkoumání návrhu zobrazí obrazovku podobnou této:

  Akce  Zpět  Balík  Řešitel  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
                 Balíky                           Řešení závislostí
   --\ Ponechat následující balíky v jejich aktuální verzi:
     gstreamer0.8-cdparanoia                           [0.8.10-1 (unstable, now)]
     sound-juicer                                                [2.10.1-2 (now)]
















 [1(1)/...] Návrh ponechat 2
 e: Prozkoumat  !: Použít  .: Další  ,: Předchozí

   Informace o balíku ovlivněném akcí získáte jednoduše přesunutím kurzoru na
   jméno balíku a stisknutím klávesy Enter. Chcete-li získat podrobnější
   vysvětlení proč se aptitude rozhodla jak se rozhodla, stačí se posunout na
   nějaký prvek seznamu. Tím se ve spodní části obrazovky nejprve zobrazí
   závislost, která byla touto volbou vyřešena, a poté následují všechny
   možnosti, jak se dala tato závislost vyřešit.

  Akce  Zpět  Balík  Řešitel  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
                 Balíky                           Řešení závislostí
   --\ Ponechat následující balíky v jejich aktuální verzi:
     gstreamer0.8-cdparanoia                           [0.8.10-1 (unstable, now)]
     sound-juicer                                                [2.10.1-2 (now)]






 cdparanoia plugin for GStreamer
 sound-juicer závisí na gstreamer0.8-cdparanoia
 --\ Následující akce vyřeší tuto závislost:
   -> Degradace sound-juicer [2.10.1-3 (unstable, now) -> 0.6.1-2 (testing)]
   -> Odstranění sound-juicer [2.10.1-3 (unstable, now)]
   -> Zrušení odstranění gstreamer0.8-cdparanoia
   -> Degradace gstreamer0.8-cdparanoia [0.8.11-1 (unstable, now) -> 0.8.8-3 (tes



 [1(1)/...] Návrh ponechat 2
 e: Prozkoumat  !: Použít  .: Další  ,: Předchozí

   Řešitele závislostí můžete navigovat k požadovanému výsledku pomocí
   schvalování nebo zamítání jednotlivých akcí daného řešení. Schválením
   nějaké akce sdělíte řešiteli, že má tuto akci použít kdekoliv to jen bude
   možné a tím pádem automaticky ignorovat její alternativy. Pokud existuje
   několik schválených možností, budou vybrány všechny. Opačně funguje
   zamítnutí akce, což znamená, že by se jí měl řešitel v navrhovaných
   řešeních vyhýbat.

   Pro zamítnutí akce označte příslušný řádek a stiskněte klávesu r.
   Opakovaným stiskem klávesy r zamítnutí opět zrušíte. Podobně funguje i
   klávesa a, která však slouží pro schvalování akcí. Schválení i zamítnutí
   můžete vrátit zpět také příkazem Zpět → Zpět (Control+u) (pouze na
   obrazovce řešitele). Zrušíte-li zamítnutí nebo schválení, budou dosud
   ignorované akce přístupné v nově vytvořených řešeních.

   [Poznámka] Poznámka
              Řešitel implicitně zamítá akce, které mění stav podržených
              balíků, nebo které instalují zakázané verze balíků. Tyto
              zamítnuté akce můžete schválit úplně stejně jako běžná
              zamítnutí. Nastavením konfigurační proměnné
              Aptitude::ProblemResolver::Allow-Break-Holds na hodnotu true
              toto chování zakážete. To znamená, že řešitel nebude brát na
              podržené balíky žádné ohledy (kromě drobné penalizace, viz
              Aptitude::ProblemResolver::BreakHoldScore).

   Zamítnutou akci poznáte podle toho, že je zbarvená červeně a na začátku
   řádku má písmeno „R“. Schválené akce jsou vybarveny zeleně a označeny
   písmenem „A“. Vše je pěkně vidět na následujícím obrázku, kde byla akce
   „ponechat gstreamer0.8-cdparanoia v aktuální verzi“ zamítnuta a akce
   „ponechat sound-juicer v aktuální verzi“ schválena.

  Akce  Zpět  Balík  Řešitel  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
                 Balíky                           Řešení závislostí
   --\ Ponechat následující balíky v jejich aktuální verzi:
 R   gstreamer0.8-cdparanoia                           [0.8.10-1 (unstable, now)]
 A   sound-juicer                                      [2.10.1-2 (unstable, now)]
















 [1(1)/...] Návrh ponechat 2
 e: Prozkoumat  !: Použít  .: Další  ,: Předchozí

   Zamítnutí a schválení se týkají pouze nově vytvořených řešení. To, kdy
   bude vytvořeno nové řešení, zjistíte v levém dolním rohu obrazovky: Pokud
   se tam nachází číslo v kulatých závorkách, znamená to počet dosud
   vytvořených řešení. Jestliže je číslo před závorkou shodné s číslem v
   závorce (jako na předchozím obrázku), stisk klávesy . („další“) vytvoří
   nové řešení. Pokud se tam žádné číslo v kulatých závorkách nenachází,
   např. [1/5], znamená to, že již byla vytvořena všechna možná řešení. Mezi
   prvním a posledním doposud vytvořeným řešením můžete přeskakovat pomocí
   kláves > a <.

   [Dulezité] Důležité
              Stav řešitele se vynuluje při každé změně stavu libovolného
              balíku. To znamená, že když označíte balík pro instalaci,
              aktualizaci, odstranění, apod., řešitel zapomene všechna
              vytvořená řešení a také všechna schválení a zamítnutí.

   Akce nemusíte vybírat pouze ze seznamu nahoře na obrazovce, ale můžete
   použít i seznam ve spodní části, kam se dostanete stiskem klávesy Tab,
   nebo kliknutím myši. Konečně poslední zajímavou klávesou v řešiteli
   závislostí je klávesa o, která přeskládá zobrazení podle vyřešených
   závislostí, pod kterými následuje akce, jež vedla k vyřešení dané
   závislosti. Více prozradí následující obrázek:

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
                 Balíky                           Řešení závislostí
   --\ gnome-desktop-environment závisí na sound-juicer (>= 2.10.1)
     -> Zrušit odstranění sound-juicer
   --\ sound-juicer závisí na gstreamer0.8-cdparanoia
     -> Zrušit odstranění gstreamer0.8-cdparanoia





 GNOME 2 CD Ripper
 gnome-desktop-environment závisí na sound-juicer
 --\ Následující akce vyřeší tuto závislost:
   -> Odstranění gnome-desktop-environment [1:2.10.2.3 (unstable, testing, now)]
   -> Zrušení odstranění sound-juicer
   -> Degradace sound-juicer [2.10.1-3 (unstable, now) -> 0.6.1-2 (testing)]




 [1/...] Návrh ponechat 2
 e: Prozkoumat  !: Použít  .: Další  ,: Předchozí

   Zpět k předchozímu zobrazení se dostanete opětovným stiskem klávesy o.

  Stažení, instalace a odstranění balíků

   Pokud jste si zkoušeli měnit stav balíků podle minulé kapitoly, možná jste
   si všimli, že se v systému samotném nic nezměnilo - nepřibyly nové
   programy ani staré nezmizely. Skutečné změny se provedou, až k tomu dáte
   pokyn. Z toho také vyplývá, že si můžete hrát se stavem balíků tak dlouho,
   dokud nebudete spokojeni a teprve poté změny „zaznamenat“, čímž dojde k
   samotné instalaci a odstraňování balíků.^[8]

   Pro zaznamenání změn se používá příkaz Akce → Instalovat/odstranit balíky
   (g). Po prvním spuštění se objeví obrazovka se souhrnem změn, které jsou
   naplánovány. Tato obrazovka není nic jiného, než starý známý seznam balíků
   a proto v něm můžete provádět finální úpravy (například anulování
   nechtěných odstranění) stejně jako v hlavním seznamu.

   Kdykoliv nyní můžete použít Pohledy → Zavřít (q) a zrušit tak instalaci,
   nebo znovu spustit Akce → Instalovat/odstranit balíky (g) a pokračovat
   dále. aptitude pak stáhne všechny potřebné balíky a poté vás vyzve k
   pokračování v instalaci. Teprve zvolíte-li „Pokračovat“, zahájí se
   instalace, aktualizace a odstraňování.

   Stažené balíky jsou umístěny v adresáři pro vyrovnávací paměť (obvykle
   /var/cache/apt/archives). Za normálních okolností se zde balíky kupí až do
   nekonečna, ehm, tedy přesněji až do vyčerpání volného prostoru na disku.
   Chcete-li obsah tohoto adresáře jednorázově smazat, použijte Akce →
   Vyčistit cache s balíky. Chcete-li smazat pouze balíky, které se již
   nedají stáhnout (t.j. zastaralé balíky), použijte Akce → Vyčistit staré
   soubory.

  Pochopení a správa důvěryhodnosti balíků

   Schopnost aptu instalovat balíky z nejrůznějších zdrojů může vést k
   potenciální zranitelnosti. Představte si, že do svého seznamu zdrojů
   (sources.list) přidáte archiv balíků jistého Franty Záškodníka, protože si
   chcete nainstalovat jeho balík tajemstvizivota. Frantův archiv balíků však
   může -- aniž byste to tušili -- obsahovat jeho „upravené“ verze balíků
   jako libc6 nebo ssh. Verze, které z vašeho systému odesílají důvěrné
   informace, nebo které otevírají zadní vrátka pro záškodníky! Pokud mají
   tyto balíky vyšší číslo verze, než balíky, které máte instalované v
   systému, apt je při příští aktualizaci radostně nainstaluje, což znamená,
   že Franta Záškodník pak může s vaším systémem provádět své nekalé plány.
   Jiná možnost je, že by se Franta naboural do vašeho zrcadla s archivy
   Debianu a nahradil původní software za své poupravené verze.

   Naštěstí mají novější verze aptu a aptitude zabudovanou ochranu proti
   útokům tohoto typu. apt využívá silné bezpečnostní mechanismy založené na
   populárním šifrovacím softwaru GnuPG, díky kterým může ověřit, že balíky
   distribuované ze zrcadel Debianu jsou shodné s těmi, které na hlavní
   server nahráli vývojáři Debianu. aptitude vás bude varovat pokaždé, když
   se pokusíte o instalaci balíku ze zdroje nepocházejícího z projektu
   Debian. Varování se dočkáte i v případě, že byste chtěli aktualizovat
   stávající balík na verzi, která opět nepochází z Debianu.

   [Varování] Varování
              Bezpečnostní mechanizmus systému apt poskytuje téměř
              stoprocentní záruku na to, že obsah vašeho oblíbeného zrcadla
              je shodný s hlavním archivem Debianu. Není to samozřejmě
              všelék, protože zde stále existují teoretické způsoby, kterými
              by se podvržený balík mohl dostat přímo do hlavního archivu
              Debianu.

              Ověření, že instalujete balíky pouze z důvěryhodného zdroje,
              vám přinese jistý stupeň bezpečí proti zlomyslným balíkům, ale
              nemůže eliminovat všechna rizika spojená s instalací softwaru.

    Chápání důvěry

   apt umožňuje administrátorovi archivu digitálně podepsat seznam balíků v
   archivu. Tento podpis (jež nemůže být v rozumném čase podvržen) zajišťuje
   kontrolu, že soubory balíků uvedené v seznamu jsou stejné s těmi, které
   správce do archivu opravdu umístil. Jinými slovy víte, že se obsah archivu
   od svého vytvoření nezměnil.^[9] Pravost podpisu můžete ověřit vůči
   veřejnému klíči administrátora. Tento klíč je šířen spolu se systémem apt
   a obvykle jej naleznete na svých DVD s Debianem.

   Když si aptitude stáhne seznam balíků na daném archivu, zkontroluje, zda
   je seznam podepsán správným klíčem. Pokud podepsán není, aptitude nebude
   balíkům z tohoto archivu důvěřovat. (Co to znamená prakticky se dozvíte
   dále.) Jestliže sice seznam podepsaný je, ale podpis je buď poškozen, nebo
   se nedá ověřit, bude zobrazeno varování a aptitude opět odmítne těmto
   balíkům důvěřovat.

   Později, až spustíte instalaci nových balíků, se aptitude podívá na
   jednotlivé balíky podrobněji a zjistí, zda pochází z důvěryhodného zdroje
   či nikoliv. Jestliže by se měl nainstalovat nedůvěryhodný balík (nebo
   nedůvěryhodná verze důvěryhodného balíku), tak se zobrazí důrazné
   varování, kde dostanete poslední příležitost si vše rozmyslet a stahování
   přerušit:

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
 aptitude 0.3.0                    Na disku se použije 831kB     Stáhnu: 30.4MB
 --\ Balíky k aktualizaci
 iu U wesnoth                                       -98.3kB 0.8.7-1    0.8.8-1.0w
 iuAU wesnoth-data                                  +930kB  0.8.7-1    0.8.8-1.0w
 +------------------------------------------------------------------------------+
 |VAROVÁNÍ: budou instalovány nedůvěryhodné verze následujících balíků!        #|
 |                                                                             #|
 |Nedůvěryhodné balíky mohou kompromitovat bezpečnost vašeho systému.          #|
 |V instalaci byste měli pokračovat pouze v případě, že jste si naprosto       #|
 |jisti, že to je to, co opravdu chcete udělat.                                #|
 |                                                                             #|
 |  * wesnoth [verze 0.8.8-1.0wesnoth.org]                                     #|
 |  * wesnoth-data [verze 0.8.8-1.0wesnoth.org]                                #|
 |  * wesnoth-music [verze 0.8.8-1.0wesnoth.org                                #|
 |        [ Opravdu pokračovat ]                [ Přerušit instalaci ]          |
 +------------------------------------------------------------------------------+
                                                                                #
                                                                                #
                                                                                #
                                                                                #
                                                                                #
                                                                                #

    Rozšíření důvěry na další klíče

   Někdy se může stát, že byste chtěli, aby apt nedůvěřoval jen hlavnímu
   archivu Debianu, ale i některým dalším archivům. Pro každý takový archiv
   si budete muset obstarat veřejnou část klíče, kterým byl podepsán obsah
   daného archivu. Obvykle se jedná o textový soubor, jehož jméno končí na
   .asc. Buď jej můžete získat od administrátora archivu, nebo stáhnout z
   veřejného serveru s klíči. O tom, co jsou to veřejné klíče, jak je získat
   a následně s nimi pracovat, se dozvíte na stránkách projektu GnuPG.

   Seznam klíčů, kterým bude apt důvěřovat, se nachází na takzvané klíčence v
   souboru /etc/apt/trusted.gpg. Až získáte příslušný GPG klíč, můžete jej
   přidat na klíčenku příkazem gpg --no-default-keyring --keyring
   /etc/apt/trusted.gpg --import novyklic.asc. aptitude pak bude důvěřovat
   libovolnému archivu, který je podepsán klíčem obsaženým v souboru
   novyklic.asc. (Soubor samotný již není potřeba, protože se stal součástí
   klíčenky.)

   [Varování] Varování
              S přidáváním klíčů buďte velmi opatrní, protože po přidání
              nového klíče na klíčenku APTu mu bude balíčkovací systém
              důvěřovat stejně, jako důvěřuje samotným archivům Debianu! Klíč
              byste proto měli přidávat pouze pokud jste si naprosto jisti
              tím, že přidáváte správný klíč a že osoba, které klíč patří, je
              důvěryhodná a kompetentní. (Kde slovo kompetentní myslíme
              hlavně ve vztahu ke správě klíčů.)

  Správa automaticky instalovaných balíků

   Pro instalaci jediného balíku je často nezbytné instalovat několik
   dalších, aby se uspokojily závislosti. Například pro instalaci balíku
   clanbomber musíte také nainstalovat balík libclanlib2. Když balík
   clanbomber znovu odeberete, pravděpodobně nebudete potřebovat ani balík
   libclanlib2. aptitude se snaží tyto situace hlídat a nepotřebné balíky
   typu libclanlib2 odstraňovat.

   Celé to funguje velmi jednoduše. Když instalujete balík, aptitude
   automaticky doinstaluje všechny potřebné balíky pro splnění závislostí.
   Tyto balíky jsou označeny jako „instalované automaticky“. aptitude si je
   zapamatuje a v okamžiku, kdy na nich nezávisí žádný ručně instalovaný
   balík, odstraní je.^[10] V přehledu před instalací se tyto balíky objeví v
   podstromu nazvaném „Balíky, které se již nepoužívají a budou odstraněny“.

   Stejně jako u každého jiného automatického procesu je zde riziko, že se
   vše nepovede tak, jak má. Třeba pokud byl balík nejprve instalovaný
   automaticky, ale poté se ukázalo, že je užitečný sám o sobě. Pro tyto
   případy máte možnost zrušit příznak „automaticky“ instalovaného balíku
   klávesou m. Pokud je balík již před odstraněním, můžete odstranění zrušit
   příkazem Balík → Instalovat (+), což mimo jiné zruší také příznak
   „automaticky“ instalovaného balíku.

Vyhledávací vzory

   Řetězec, který zadáváte při hledání balíku nebo při omezování zobrazení,
   se nazývá „vyhledávací vzor“. Přestože většina hledání používá pouze
   hledání podle jména, aptitude vám nebrání ve vytváření komplexnějších
   dotazů.

   [Poznámka] Poznámka
              Vyhledávací vzory nemusíte používat pouze v celoobrazovkovém
              režimu, ale také u některých řádkových příkazů. Podrobnosti
              naleznete v kapitole Přehled příkazů.

   Vyhledávací vzor se skládá z jedné nebo více podmínek (někdy nazývaných
   „termy“). Balíky se shodují se vzorem, pokud se shodují se všemi jeho
   termy. Termy obvykle začínají otazníkem („?“), za kterým následuje jméno
   termu. Například term ?name vyhledává v názvech balíků, zatímco ?version
   se dívá na jejich verze. Případné parametry termu se uvádí v kulatých
   závorkách za názvem termu (více se dozvíte v dokumentaci k jednotlivým
   termům).

   [Poznámka] Poznámka
              Text bez úvodního „?“ je také považován za vyhledávací vzor:
              aptitude se pokusí hledat tento řetězec v názvech balíků.
              Protože je „?“ v oblasti regulárních výrazů speciálním
              metaznakem, aptitude u těchto řetězců nezačínajících otazníkem
              nerozpozná otazník dále v řetězci jako začátek dalšího termu.
              To znamená, že vyhledávací vzor „apt?name(python)“ nebude
              hledat balíky, jejichž jméno obsahuje řetězec „apt“ současně s
              řetězcem „python“, ale bude hledat balíky, jejichž jména
              odpovídají regulárnímu výrazu „apt?name(python)“.

   [Varování] Varování
              Zadávání vyhledávacích vzorů bez úvodního „?“ (nebo „~“) je
              poskytováno z historických důvodů pro zjednodušení
              interaktivního používání a bude v budoucnu odstraněno. Pokud
              voláte aptitude z různých skriptů a jiných programů, měli byste
              vždy používat doporučenou formu hledání: „?name(emacs)“ nebo
              „~nemacs“, ne jen pouhé „emacs“).

  Hledání řetězců

   Mnoho vyhledávacích termů akceptuje jako parametr řetězec, který pak
   porovnávají s jedním nebo více poli v hlavičce balíku. Řetězce mohou být
   zadány jak s, tak bez dvojitých uvozovek („"“), takže „?name(scorch)“ a
   „?name("scorch")“ jsou zcela ekvivalentní. Potřebujete-li použít uvozovky
   uvnitř řetězce obklopeného uvozovkami, můžete těsně před ně umístit zpětné
   lomítko („\“). Například „?description("\"easy\"")“ se bude shodovat se
   všemi balíky, které ve svém popisu obsahují řetězec „"easy"“.

   Zadáte-li řetězec bez okolních uvozovek, bude aptitude Předpokládat, že
   tento řetězec končí uzavírací závorkou, případně čárkou, která odděluje
   další argument termu^[11]. Chcete-li odstranit speciální význam těchto
   znaků, můžete před ně umístit vlnku („~“). Například term
   „?description(etc))“ by způsobil syntaktickou chybu, protože první
   uzavírací závorka ukončí term ?description a druhá závorka již nemá
   odpovídající párovou závorku. Oproti tomu výraz ?description(etc~)) se
   shoduje se všemi balíky, které obsahují ve svém popisu text „etc)“.
   Použití vlnky však přináší další komplikace v případě, že používáte
   zkrácenou formu termů (viz kapitola „Zkrácená forma vyhledávacích termů“).

   Většina textových hledání (v názvech balíků, popisech, atd.) probíhá
   pomocí regulárních výrazů (velikost písmen se ignoruje). Regulární výraz
   se shoduje s polem, pokud část pole odpovídá regulárnímu výrazu. Například
   „ogg[0-9]“ se shoduje s „libogg5“, „ogg123“ i „theogg4u“. Uvnitř
   regulárních výrazů mají některé znaky speciální význam.^[12] To znamená,
   že pokud chcete tyto znaky vyhledat, musíte před ně psát zpětná lomítka.
   Například pro nalezení „g++“ byste měli použít vzor „g\+\+“.

   Pro aptitude mají speciální význam také znaky „!“ a „|“. Pokud chcete tyto
   znaky použít v řetězci neobklopeném uvozovkami, musíte před ně umístit
   vlnku („~“). Například pro vyhledání balíků, jejichž popis obsahuje
   „grand“ nebo „oblique“, můžete použít vzor „?description(grand~|oblique)“.
   v takovývh případech je však pohodlnější použít řetězec v uvozovkách:
   „?description("grand|oblique")“.

  Zkrácená forma vyhledávacích termů

   Některé vyhledávací termy mohou být zapsány zkrácenou formou, která se
   skládá z vlnky („~“) následované znakem určujícím term a případnými
   argumenty termu. Například zkrácená forma ?name(aptitude) je ~naptitude
   (hledá balíky, které mají ve svém názvu řetězec aptitude).

   Při zápisu termů pomocí jejich zkrácené formy slouží vlnky a tzv. „bílé
   znaky“ (mezery, tabulátory a pod.) k oddělování jednotlivých termů.
   Například „~mDaniel Burrows“ se bude shodovat s libovolným balíkem, jehož
   pole Maintainer (správce) obsahuje řetězec „Daniel“ a zároveň jméno balíku
   obsahuje řetězec „Burrows“. Oproti tomu „~i~napt“ se shoduje se všemi
   nainstalovanými balíky, jejichž jméno obsahuje řetězec apt. Chcete-li do
   hledání zahrnout bílé (nebo jiné speciální) znaky, můžete před ně vložit
   vlnku (např. Daniel~ Burrows), nebo term obklopit uvozovkami (jako třeba
   "Projekt Debian"). Dokonce je možná i varianta (Projekt" "Debian). Uvnitř
   termu v uvozovkách můžete pro zrušení speciálního významu uvozovek použít
   zpětné lomítko („\“). Například ~d"\"email"" se bude shodovat s balíky,
   jejichž popis obsahuje uvozovku bezprostředně následovanou řetězcem
   email^[13].

   [Poznámka] Poznámka
              Otazníky („?“) neukončí krátkou verzi termu, ani když je
              následuje jméno termu. Například „~napt?priority(required)“
              bude hledat všechny balíky, jejichž jméno odpovídá regulárnímu
              výrazu „apt?priority(required)“ (namísto očekávaného seznamu
              balíků, jejichž jméno obsahuje řetězec apt a mají prioritu
              „vyžadovaný“). Chcete-li zkombinovat krátkou formu termu s
              termem zadaným jménem, přidejte mezi termy jednu nebo více
              mezer: „~napt ?priority(required)“. Další možností je přidat
              uvozovky okolo textu za krátkou formou termu:
              „~n"apt"?priority(required)“.

   Tabulka 2.1 – „Rychlý průvodce vyhledávacími termy“ uvádí všechny zkrácené
   formy vyhledávacích termů.

  Hledání a verze balíků

   Implicitně se vyhledávací vzor shoduje s balíkem, pokud vzoru vyhovuje
   libovolná verze balíku. Některé vzory omezují své podvzory pouze na
   některé verze balíku. Například vyhledávací term ?depends(vzor) vybere
   libovolný balík, který závisí na balíku odpovídajícímu vzoru vzor. vzor se
   však bude porovnávat pouze vůči verzím balíku, které splňují danou
   závislost. Například balík foo závisí na balíku bar (>= 3.0), od něhož
   jsou dostupné verze 2.0, 3.0 a 4.0. Pak se ve vyhledávacím vzoru
   ?depends(?version(2\.0)) budou vůči podtermu ?version(2\.0) porovnávat
   pouze verze 3.0 a 4.0 a tím pádem toto hledání nic nenalezne.

   Na porovnávaných verzích záleží, protože jak bylo vidět na předchozím
   příkladu, některé vzory se mohou shodovat s jednou verzí balíku a s druhou
   ne. Například vzor ?installed se bude shodovat pouze s instalovanou verzí
   balíku (pokud taková existuje). Podobně vzor ?maintainer(správce) nalezne
   pouze verze, které mají za svého správce správce. Obvykle mívají všechny
   verze balíku stejného správce, ale přesto takový případ může nastat (např.
   balík spravovaný individuálně přejde pod týmovou správu). Stejně se chová
   každý vyhledávací vzor, který se dívá do kontrolních polí balíku (s
   výjimkou jména balíku), protože všechna pole se mohou mezi jednotlivými
   verzemi balíku měnit.

   [Poznámka] Poznámka
              Existuje drobný, ale významný, rozdíl mezi porovnáváním vzoru
              vůči balíku nebo porovnáváním vzoru vůči všem verzím balíku. V
              prvním případě se každý term vzoru porovnává vůči balíku, tzn.
              vyhledávací vzor jako celek se bude shodovat v případě, že se
              každý jeho podterm bude shodovat s některou z verzí balíku.
              Oproti tomu ve druhém případě se celý vzor porovnává vůči každé
              verzi balíku, což znamená, že aby byl úspěšný, musí se všechny
              termy vzoru shodovat vůči stejné verzi balíku.

              Například předpokládejme, že je nainstalován balík aardvark ve
              verzi 3.0-1 a je dostupná verze 4.0-1. Pak vyhledávací vzor
              ?version(4\.0-1)?installed se shoduje s balíkem aardvark (a
              možná nějakými dalšími balíky), protože term ?version(4\.0-1)
              se shoduje se všemi balíky ve verzi 4.0-1 (tedy i s balíkem
              aardvark) a term ?installed se shoduje se všemi nainstalovanými
              balíky (tedy i s balíkem aardvark ve verzi 3.0-1). Tento výraz
              se neshoduje se všemi verzemi balíku aardvark, protože
              neexistuje verze, která by byla nainstalovaná a zároveň měla
              číslo verze 4.0-1.

  Explicitní cíle

   Některá obzvláště komplikovaná hledání můžete v aptitude vyjádřit pomocí
   explicitních cílů. Při běžných hledáních nemáte možnost se odkazovat na
   verzi, kterou zrovna testujete. Představme si situaci, kdy chcete najít
   všechny balíky P, které závisí na balíku Q takovém, že Q doporučuje P.
   Evidentně začnete s termem ?depends(...). Ovšem term zapsaný místo ...
   potřebuje nějakým způsobem vybrat balíky, které jsou právě porovnávány
   oproti ?depends. V zadání úlohy jsme to vyřešili použitím abstraktních
   jmen balíků P a Q; Termy s explicitními cíli pracují úplně stejně.^[14]

   Explicitní cíl je uveden termem ?for:

   Obrázek 2.11. Syntaxe termu ?for

 ?for proměnná: vzor

   Tato forma se chová stejně jako vzor, ale navíc je možné se uvnitř vzoru
   pomocí proměnné odkazovat na balík nebo verzi balíku, vůči které se zrovna
   vzor porovnává. Proměnnou můžete použít dvěma způsoby:

    1. Term ?= se shoduje s balíkem nebo verzí zadanou pomocí proměnné.
       Konkrétně: pokud je odpovídající term ?for omezen na konkrétní verzi,
       pak se bude také ?= shodovat pouze s touto verzí (nebo celým balíkem).
       V opačném případě se bude ?= shodovat s libovolnou verzí balíku.

       Příklad použití termu ?= naleznete v příkladu 2.1 – „Použití termu
       ?=.“.

    2. Term ?bind(proměnná, vzor) se bude shodovat s balíkem nebo verzí,
       pokud se bude hodnota proměnné shodovat se vzorem.

       Pro termy zapsané pomocí počátečního otazníku existuje zkrácená forma.
       Výraz ?bind(proměnná, ?term[(argumenty)]) lze přepsat jako
       ?proměnná:term(argumenty).

       Příklad použití termu ?bind naleznete v příkladu 2.2 – „Použití termu
       ?bind“.

  Přehled vyhledávacích vzorů

   Tabulka 2.1 – „Rychlý průvodce vyhledávacími termy“ nabízí rychlý přehled
   všech vyhledávacích termů v aptitude. Kompletní popis každého termu
   naleznete níže.

   Tabulka 2.1. Rychlý průvodce vyhledávacími termy

+-------------------------------------------------------------------------------------+
|        Dlouhá forma         |           Krátká forma            |       Popis       |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balík       |
|?=proměnná                   |                                   |svázaný s          |
|                             |                                   |proměnnou; viz     |
|                             |                                   |„Explicitní cíle“. |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere všechny     |
|?not(vzor)                   |!vzor                              |balíky, které se   |
|                             |                                   |neshodují se       |
|                             |                                   |vzorem.            |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky, na  |
|                             |                                   |kterých byla       |
|?action(akce)                |~aakce                             |naplánována daná   |
|                             |                                   |akce (např.        |
|                             |                                   |„install“ nebo     |
|                             |                                   |„upgrade“).        |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky,     |
|?all-versions(vzor)          |                                   |jejichž verze se   |
|                             |                                   |shodují se vzorem. |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky,     |
|?and(vzor1, vzor2)           |vzor1 vzor2                        |které se shodují   |
|                             |                                   |jak se vzor1, tak  |
|                             |                                   |se vzor2.          |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky,     |
|?any-version(vzor)           |                                   |které splňují vzor |
|                             |                                   |alespoň pro jednu z|
|                             |                                   |verzí.             |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky ze   |
|?archive(archiv)             |~Aarchiv                           |zadaného archivu   |
|                             |                                   |(např. „unstable“).|
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky,     |
|?automatic                   |~M                                 |které byly         |
|                             |                                   |nainstalovány      |
|                             |                                   |automaticky.       |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere cokoliv, kde|
|                             |                                   |se proměnná shoduje|
|?bind(proměnná, vzor)        |?proměnná:název_termu[(argumenty)] |se vzorem; více    |
|                             |                                   |naleznete v        |
|                             |                                   |kapitole           |
|                             |                                   |„Explicitní cíle“. |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky,     |
|                             |                                   |které mají         |
|?broken                      |~b                                 |nesplněné          |
|                             |                                   |(„porušené“)       |
|                             |                                   |závislosti.        |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky,     |
|                             |                                   |které mají         |
|?broken-depType              |~Btyp                              |nesplněné          |
|                             |                                   |(„porušené“)       |
|                             |                                   |závislosti daného  |
|                             |                                   |typu.              |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky,     |
|                             |                                   |které mají         |
|                             |                                   |nesplněné          |
|?broken-depType(vzor)        |~DB[typ:]vzor                      |(„porušené“)       |
|                             |                                   |závislosti daného  |
|                             |                                   |typu na balíky     |
|                             |                                   |shodující se se    |
|                             |                                   |vzorem.            |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky, vůči|
|                             |                                   |kterým mají balíky |
|                             |                                   |shodující se se    |
|?broken-reverse-depType(vzor)|~RBtyp:vzor                        |vzorem nesplněné   |
|                             |                                   |(„porušené“)       |
|                             |                                   |závislosti daného  |
|                             |                                   |typu.              |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky,     |
|                             |                                   |které jsou v       |
|?conflicts(vzor)             |~Cvzor                             |konfliktu s balíky |
|                             |                                   |shodujícími se se  |
|                             |                                   |vzorem.            |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky,     |
|                             |                                   |které byly         |
|                             |                                   |odstraněny, ale    |
|                             |                                   |jejichž            |
|?config-files                |~c                                 |konfigurační       |
|                             |                                   |soubory stále      |
|                             |                                   |zůstávají v systému|
|                             |                                   |(tj. jsou          |
|                             |                                   |odstraněny, ale ne |
|                             |                                   |vyčištěny).        |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky,     |
|                             |                                   |které deklarují    |
|?depType(vzor)               |~D[typ:]vzor                       |závislost daného   |
|                             |                                   |typu na balíky     |
|                             |                                   |shodující se se    |
|                             |                                   |vzorem.            |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky,     |
|?description(popis)          |~dpopis                            |jejichž popis se   |
|                             |                                   |shoduje s popisem. |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere nezbytné    |
|                             |                                   |balíky, tj. s těmi,|
|                             |                                   |které mají v       |
|?essential                   |~E                                 |kontrolních        |
|                             |                                   |souborech uvedeno  |
|                             |                                   |pole Essential:    |
|                             |                                   |yes.               |
|-----------------------------+-----------------------------------+-------------------|
|?false                       |~F                                 |Nevybere žádné     |
|                             |                                   |balíky.            |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky,     |
|                             |                                   |které se shodují se|
|                             |                                   |vzorem. Můžete     |
|                             |                                   |použít proměnnou,  |
|?for proměnná: vzor          |                                   |která je navázána  |
|                             |                                   |na balík, který se |
|                             |                                   |právě porovnává.   |
|                             |                                   |Více naleznete v   |
|                             |                                   |kapitole           |
|                             |                                   |„Explicitní cíle“. |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky,     |
|                             |                                   |které nejsou       |
|?garbage                     |~g                                 |vyžadovány žádným  |
|                             |                                   |ručně instalovaným |
|                             |                                   |balíkem.           |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere             |
|?installed                   |~i                                 |nainstalované      |
|                             |                                   |balíky.            |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky      |
|?maintainer(správce)         |~msprávce                          |spravované         |
|                             |                                   |správcem.          |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky, pro |
|                             |                                   |které se nějaká    |
|?narrow(filtr, vzor)         |~S filtr vzor                      |verze shoduje jak s|
|                             |                                   |vzorem, tak s      |
|                             |                                   |filtremem.         |
|-----------------------------+-----------------------------------+-------------------|
|?name(jméno)                 |~njméno, name                      |Vybere balíky se   |
|                             |                                   |zadaným jménem.    |
|-----------------------------+-----------------------------------+-------------------|
|?new                         |~N                                 |Vybere nové balíky.|
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere             |
|?obsolete                    |~o                                 |nainstalované      |
|                             |                                   |balíky, které již  |
|                             |                                   |nelze stáhnout.    |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky,     |
|?or(vzor1, vzor2)            |vzor1 | vzor2                      |které se shodují se|
|                             |                                   |vzor1, vzor2,      |
|                             |                                   |případně s oběma.  |
|-----------------------------+-----------------------------------+-------------------|
|?origin(původ)               |~Opůvod                            |Vybere balíky se   |
|                             |                                   |zadaným původem.   |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky,     |
|?provides(vzor)              |~Pvzor                             |které poskytují    |
|                             |                                   |balík shodující se |
|                             |                                   |se vzorem.         |
|-----------------------------+-----------------------------------+-------------------|
|?priority(priorita)          |~ppriorita                         |Vybere balíky se   |
|                             |                                   |zadanou prioritou. |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky, na  |
|                             |                                   |kterých závisí     |
|?reverse-depType(vzor)       |~R[typ:]vzor                       |(daným typem       |
|                             |                                   |závislosti) balíky |
|                             |                                   |shodujícími se se  |
|                             |                                   |vzorem.            |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky, vůči|
|                             |                                   |kterým mají balíky |
|                             |                                   |shodující se se    |
|?reverse-broken-depType(vzor)|~RBtyp:vzor                        |vzorem nesplněné   |
|                             |                                   |(„porušené“)       |
|                             |                                   |závislosti daného  |
|                             |                                   |typu.              |
|-----------------------------+-----------------------------------+-------------------|
|?section(sekce)              |~ssekce                            |Vybere balíky v    |
|                             |                                   |dané sekci.        |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky,     |
|                             |                                   |jejichž jméno      |
|?source-package(jméno)       |                                   |zdrojového balíku  |
|                             |                                   |se shoduje s       |
|                             |                                   |regulárním výrazem |
|                             |                                   |jméno.             |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky,     |
|                             |                                   |jejichž verze      |
|?source-version(verze)       |                                   |zdrojového balíku  |
|                             |                                   |se shoduje s       |
|                             |                                   |regulárním výrazem |
|                             |                                   |verze.             |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky,     |
|?tag(značka)                 |~Gznačka                           |které mají danou   |
|                             |                                   |debtags značku.    |
|-----------------------------+-----------------------------------+-------------------|
|?true                        |~T                                 |Vybere všechny     |
|                             |                                   |balíky.            |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky,     |
|?task(úloha)                 |~túloha                            |které jsou součástí|
|                             |                                   |dané úlohy.        |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky,     |
|                             |                                   |které jsou         |
|?upgradable                  |~U                                 |nainstalovány a    |
|                             |                                   |mohou být          |
|                             |                                   |aktualizovány.     |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky,     |
|                             |                                   |které jsou označeny|
|                             |                                   |uživatelskou       |
|?user-tag                    |                                   |značkou            |
|                             |                                   |odpovídající       |
|                             |                                   |regulárnímu výrazu |
|                             |                                   |uživ-značka.       |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere balíky,     |
|                             |                                   |jejichž verze      |
|?version(verze)              |~Vverze                            |odpovídá verzi     |
|                             |                                   |(speciální hodnoty:|
|                             |                                   |CURRENT, CANDIDATE |
|                             |                                   |a TARGET).         |
|-----------------------------+-----------------------------------+-------------------|
|?virtual                     |~v                                 |Vybere virtuální   |
|                             |                                   |balíky.            |
|-----------------------------+-----------------------------------+-------------------|
|                             |                                   |Vybere verze, pro  |
|                             |                                   |které se vzor      |
|                             |                                   |shoduje s          |
|?widen(vzor)                 |~Wvzor                             |libovolnou verzí   |
|                             |                                   |příslušného balíku.|
|                             |                                   |Efektivně tak      |
|                             |                                   |ignoruje omezení na|
|                             |                                   |konkrétní verze.   |
+-------------------------------------------------------------------------------------+

   název

           Shoduje se s balíky, jejichž názvy se shodují s regulárním výrazem
           název. Toto je „implicitní“ režim hledání a používá se pro vzory,
           které nezačínají vlnkou ~.

           [Poznámka] Poznámka
                      Pro vyhledání balíků, jejichž názvy obsahují několik
                      různých podřetězců, použijte term ?name (bude popsán
                      níže); například „?name(apti)?name(tude)“ se bude
                      shodovat s libovolným balíkem, který obsahuje jak
                      „apti“, tak „tude“.

   ?=proměnná

           Shoduje se s balíky, které odpovídají hodnotě proměnné, která musí
           být navázána na obklopující term ?for. Například ?for x: ?depends(
           ?recommends( ?=x ) ) se bude shodovat s libovolným balíkem x,
           který závisí na balíku, který doporučuje x.

           Následující výraz se shoduje s balíky, které kolidují samy se
           sebou:

           Příklad 2.1. Použití termu ?=.

           ?for x: ?conflicts(?=x)

           Více naleznete v kapitole „Explicitní cíle“.

   ?not(vzor), !vzor

           Shoduje se s balíky, které se neshodují se vzorem vzor. Například
           „?not(?broken)“ vybere balíky, které nejsou „porušené“.

           [Poznámka] Poznámka
                      Chcete-li zahrnout znak „!“ do regulárního výrazu,
                      musíte ošetřit, aby jej aptitude nepovažovala za negaci
                      termu: „~!“. Například pro výběr balíků, jejichž popis
                      obsahuje „extra!“, můžete použít
                      „?description(extra~!)“.

   ?and(vzor1, vzor2), vzor1 vzor2

           Shoduje se s balíky, které se shodují jak se vzor1, tak se vzor2.

   ?or(vzor1, vzor2), vzor1 | vzor2

           Shoduje se s balíky, které se shodují se vzor1, vzor2, případně s
           oběma.

           [Poznámka] Poznámka
                      Chcete-li zahrnout znak „|“ do regulárního výrazu,
                      musíte ošetřit, aby jej aptitude nepovažovala za
                      logický term NEBO: „~|“.

   (vzor)

           Shoduje se se vzorem. Například „opengl (perl|python)“ se shoduje
           s libovolnými balíky, jejichž jméno obsahuje řetězec opengl a
           současně řetězec perl nebo python.

   ?action(akce), ~aakce

           Shoduje se s balíky, na kterých je naplánována daná akce. Akce
           může nabývat hodnot „install“, „upgrade“, „downgrade“, „remove“,
           „purge“, „hold“ (testuje, zda je balík podržen v aktuální verzi)
           nebo „keep“ (testuje, zda se stav balíku nezmění).

           Poznamenejme, tento test zjišťuje pouze akce, které jsou na balíku
           skutečně naplánovány a nebere ohled na to, zda mohou být
           provedeny. Například ?action(upgrade) se shoduje právě s těmi
           balíky, které jste se rozhodli aktualizovat, ne s balíky, které by
           se daly aktualizovat (pro to použijte ?upgradable).

   ?all-versions(vzor)

           Shoduje se s balíky, jejichž všechny verze se shodují se zadaným
           výrazem. Každá verze balíku se testuje samostatně vůči vzoru a
           balík se bude shodovat pouze v případě, že se bude shodovat každá
           z verzí. Balíky bez verze (například virtuální balíky) budou
           souhlasit vždy.

           Tento term se nedá používat v kontextu, ve kterém byly verze
           balíků zúženy, jako je tomu například u termů ?depends a ?narrow.
           Můžete ho však kdykoliv použít uvnitř ?widen.

   ?any-version(vzor)

           Shoduje se s balíkem, pokud se libovolná z jeho verzí shoduje se
           zadaným výrazem. Jedná se o duální term k termu ?all-versions.

           Tento term se nedá používat v kontextu, ve kterém už byly verze
           balíků zúženy, jako je tomu například u termů ?depends a ?narrow.
           Můžete ho však kdykoliv použít uvnitř ?widen.

           [Poznámka] Poznámka
                      Tento term je úzce spjat s termem ?narrow. Ve
                      skutečnosti je ?any-version(vzor1 vzor2) ekvivalentní s
                      ?narrow(vzor1, vzor2).

   ?archive(archiv), ~Aarchiv

           Shoduje se s verzemi balíků, které jsou dostupné z archivu, jehož
           název se shoduje s regulárním výrazem archiv. Tj.
           „?archive(testing)“ se shoduje s libovolným balíkem v „testovací“
           distribuci.

   ?automatic, ~M

           Shoduje se s balíky, které byly instalovány automaticky.

   ?bind(proměnná, vzor), ?proměnná:term[(argumenty)]

           Shoduje se s balíkem nebo verzí, pokud se daný vzor shoduje s
           balíkem nebo verzí navázanou na proměnnou, která je definována v
           obklopujícím termu ?for.

           Příklad 2.2. Použití termu ?bind

           ?for x: ?depends(?depends(?for z: ?bind(x, ?depends(?=z))))

           ?for x: ?depends(?depends(?for z: ?x:depends(?=z)))

           Oba výrazy v předchozím příkladu se shodují se všemi balíky x
           takovými, že x závisí na balíku y, který závisí na balíku z
           takovém, že x také závisí na z přímo. První vzor používá ?bind
           přímo, zatímco druhý využívá zkrácenou formu.

           Více naleznete v kapitole „Explicitní cíle“.

   ?broken, ~b

           Shoduje se s balíky, které jsou „porušené“, tj. mají nesplněné
           závislosti, předzávislosti, nebo jsou v konfliktu.

   ?broken-typ, ~Btyp

           Shoduje se s balíky, které mají nesplněné („porušené“) závislosti
           daného typu. Typ může nabývat hodnot „depends“, „predepends“,
           „recommends“, „suggests“, „breaks“, „conflicts“ nebo „replaces“.

   ?broken-typ(vzor), ~DB[typ:]vzor

           Shoduje se s balíky, které mají nesplněné („porušené“) závislosti
           daného typu vůči balíkům shodujícím se se vzorem. Typ může nabývat
           stejných hodnot jako v popisu termu ?broken-typ.

   ?conflicts(vzor), ~Cvzor

           Shoduje se s balíky, které jsou v konfliktu s balíky splňujícími
           daný vzor. Například
           „?conflicts(?maintainer(dburrows@debian.org))“ vybere všechny
           balíky, jež jsou v konfliktu s balíky, které spravuje autor
           aptitude.

   ?config-files, ~c

           Shoduje se s balíky, které jsou odstraněny, ale jejichž
           konfigurační soubory stále zůstávají v systému (tj. jsou
           odstraněny, ale ne vyčištěny).

   ?typ(vzor), ~D[typ:]vzor

           typ může být buď „provides“, nebo jedna ze závislostí popsaných v
           dokumentaci k ?broken-typ. Například ?depends(libpng3) se bude
           shodovat se všemi balíky, které závisí na libpng3. Použijete-li
           zkrácenou formu (~D) a nezadáte typ, použije se implicitní
           depends.

           Pokud má typ hodnotu „provides“, shoduje se s balíky, které
           poskytují balík odpovídající vzoru (ekvivalent termu ?provides). V
           ostatních případech se shoduje s balíky, které mají závislost typu
           typ na verzi balíku, jež odpovídá vzoru.

   ?description(popis), ~dpopis

           Shoduje se s balíky, jejichž popis se shoduje s regulárním výrazem
           popis.

   ?essential, ~E

           Shoduje se s Nezbytnými balíky.

   ?false, ~F

           Tento term se neshoduje s žádným balíkem.^[15]

   ?for proměnná: vzor

           Shoduje se se vzorem, ale navíc lze uvnitř vzoru použít proměnnou,
           kterou se můžete odkazovat na právě porovnávaný balík nebo verzi.

           Proměnnou můžete použít dvěma způsoby. V termu začínajícím
           otazníkem se používá syntaxe ?proměnná:název-termu(argumenty).
           Například ?x:depends(apt). Dále pak term ?=proměnná vybere balík
           nebo verzi, která se shoduje s hodnotou zadanou v proměnné.

           Například následující term se bude shodovat se všemi balíky x,
           které závisí na a zároveň doporučují balík y.

           Příklad 2.3. Použití termu ?for

           ?for x: ?depends( ?for y: ?x:recommends( ?=y ) )

           Více naleznete v kapitole „Explicitní cíle“.

   ?garbage, ~g

           Shoduje se s balíky, které nejsou nainstalovány, nebo které byly
           nainstalovány automaticky a nyní na nich nezávisí žádný
           nainstalovaný balík.

   ?installed, ~i

           Shoduje se s verzemi aktuálně nainstalovaných balíků.

           Jelikož se standardně testují všechny verze, znamená to, že se
           shoduje s aktuálně nainstalovanými balíky.

   ?maintainer(správce), ~msprávce

           Shoduje se s balíky, jejich pole Maintainer (Správce) odpovídá
           regulárnímu výrazu správce. Například „?maintainer(joeyh)“ nalezne
           všechny balíky spravované Joey Hessem.

   ?narrow(filtr, vzor), ~S filtr vzor

           Tento term „zúží“ hledání na verze balíků, které splňují daný
           filtr. Konkrétně se shoduje s balíky, jež splňují jak filtr, tak
           vzor. Řetězcová hodnota porovnání je řetězcová hodnota vzoru.

   ?name(název), ~nnázev

           Shoduje se s balíky, jejichž název se shoduje s regulárním výrazem
           název. Například většina balíků odpovídajících výrazu
           „?name(^lib)“ budou nejrůznější knihovny.

   ?new, ~N

           Shoduje se s „novými“ balíky. Tyto byly do archivu přidány od
           posledního spuštění Akce → Zapomenout nové balíky (f) (resp.
           příkazu forget-new).

   ?obsolete, ~o

           Shoduje se s nainstalovanými balíky, ke kterým už v archivu
           neexistuje žádná verze. Tyto balíky se v celoobrazovkovém rozhraní
           objevují ve větvi „Zastaralé a lokálně vytvořené balíky“.

   ?origin(původ), ~Opůvod

           Shoduje se s verzemi balíků, jejichž původ se shoduje s regulárním
           výrazem původ. Například výrazem „!?origin(debian)“ můžete ve svém
           systému nalézt všechny neoficiální balíky (tj. balíky
           nepocházející z archivu Debianu).

   ?provides(vzor), ~Pvzor

           Shoduje se s verzemi balíků, které poskytují balík, jež odpovídá
           vzoru. Například „?provides(mail-transport-agent)“ vyhledá všechny
           balíky, které poskytují balík „mail-transport-agent“.

   ?priority(priorita), ~ppriorita

           Shoduje se s balíky, jejichž priorita odpovídá prioritě. Prioritu
           balíku můžete zadat buď českým nebo anglickým názvem a musí to být
           jedna z následujících hodnot: extra (extra), důležitý (important),
           volitelný (optional), vyžadovaný (required) nebo standardní
           (standard). Například „?priority(vyžadovaný)“
           („?priority(required)“) vyhledá všechny balíky s prioritou
           „vyžadovaný“ („required“).

   ?reverse-typ(vzor), ~R[typ:]vzor

           Typ může být buď „provides“, nebo jeden z typů závislostí
           zmíněných v dokumentaci termu ?broken-type. Pokud nezadáte typ,
           použije se implicitní depends.

           Pokud má typ hodnotu „provides“, shoduje se s balíky, jejichž
           název je poskytován verzí balíku, která odpovídá vzoru. V
           ostatních případech se shoduje s balíky, na kterých závisí balíky
           (typem závislosti typ) odpovídající vzoru.

   ?reverse-broken-typ(vzor), ?broken-reverse-typ(vzor), ~RB[typ:]vzor

           Typ může být buď „provides“, nebo jeden z typů závislostí
           zmíněných v dokumentaci termu ?broken-type. Pokud nezadáte typ,
           použije se implicitní depends.

           Shoduje se s balíky, vůči kterým mají balíky shodující se se
           vzorem nesplněné („porušené“) závislosti daného typu.

   ?section(sekce), ~ssekce

           Shoduje se s balíky, jejichž sekce odpovídá regulárnímu výrazu
           sekce.

   ?source-package(jméno)

           Shoduje se s balíky, jejichž jméno zdrojového balíku se shoduje s
           regulárním výrazem jméno.

   ?source-version(verze)

           Shoduje se s balíky, jejichž verze zdrojového balíku se shoduje s
           regulárním výrazem verze.

   ?tag(značka), ~Gznačka

           Shoduje se s balíky, jejichž pole Tag se shoduje s regulárním
           výrazem značka. Například vzor ?tag(game::strategy) se shoduje s
           balíky se strategickými hrami.

           Více informací o značkách naleznete na domovské stránce projektu
           Debtags.

   ?true, ~T

           Tento term se shoduje s libovolným balíkem. Například
           „?installed?provides(?true)“ se shoduje s instalovanými balíky,
           které jsou poskytovány libovolným balíkem.

   ?task(úloha)~túloha

           Shoduje se s balíky, které jsou součástí úlohy, jejíž jméno
           odpovídá regulárnímu výrazu úloha.

   ?upgradable, ~U

           Term se shoduje s libovolným balíkem, který může být aktualizován.

   ?user-tag(značka)

           Term se shoduje s balíky, které jsou označeny uživatelskou značkou
           odpovídající regulárnímu výrazu značka.

   ?version(verze), ~Vverze

           Shoduje se s libovolnou verzí balíku, která odpovídá regulárnímu
           výrazu verze. Například „?version(debian)“ vyhledá balíky, jejichž
           číslo verze obsahuje řetězec „debian“.

           Jistou výjimkou jsou následující hodnoty verze, na které je třeba
           brát zvláštní ohled a zadávat je s úvodním lomítkem. Například pro
           vyhledání balíků, jejichž verze obsahuje virtuální řetězec
           CURRENT, musíte zadat \CURRENT.

              o CURRENT se shoduje s aktuálně nainstalovanou verzí balíku.

              o CANDIDATE se shoduje s verzí balíku, která by se
                nainstalovala, pokud byste na balíku stiskli +, nebo pokud
                byste na něj spustili příkaz aptitude install.

              o TARGET se shoduje s verzí balíku, která je momentálně
                naplánována pro instalaci.

   ?virtual, ~v

           Shoduje se s čistě virtuálními balíky, tj. s balíky, jejichž jméno
           je poskytováno nějakým balíkem, nebo je toto jméno zmíněno v
           závislostech, ale žádný balík toho jména neexistuje. Například
           „?virtual!?provides(?true)“ se shoduje s virtuálními balíky, které
           nejsou poskytovány žádným balíkem, jinými slovy s balíky, na
           kterých „něco“ závisí, ale které neexistují.

   ?widen(vzor), ~Wvzor

           „Rozšíří“ shodu: pokud jsou omezeny verze balíku, vůči kterým se
           má porovnávat vnější term (jako ?depends), nebere se na tato
           omezení ohled. Tedy ?widen(vzor) se shoduje s verzí balíku, pokud
           se vzor shoduje s libovolnou verzí daného balíku.

Přizpůsobení aptitude

  Přizpůsobení seznamu balíků

   Seznam balíků nabízí bohaté možnosti přizpůsobení - od barevného schématu
   přes hierarchii a třídění balíků až po změnu rozložení prvků na obrazovce.

    Přizpůsobení zobrazení balíků

   Tato sekce popisuje, jak nastavit obsah a formát seznamu balíků, stavové
   řádky a záhlaví.

   Formát každé části je definován „formátovacím řetězcem“. Formátovací
   řetězec je řetězec textu obsahující řídící znaky %, jako třeba %p, %S,
   apod. Výsledný výstup je tvořen tak, že se vezme formátovací řetězec a
   všechny %-sekvence jsou nahrazeny jejich významem (viz níže).

   %-sekvence může mít pevnou nebo proměnlivou šířku. V prvním případě je
   %-sekvence nahrazena vždy stejně dlouhým textem (co přesahuje, je
   oříznuto, pokud je text kratší, doplní se mezerami). U proměnlivé šířky se
   využije celé místo, které není zabrané poli s pevnou šířkou. Pokud
   existuje několik sloupců s proměnlivou šířkou, o volné místo se podělí
   rovným dílem.

   Všechny %-sekvence mají přednastavenou implicitní velikost. Jestliže ji
   chcete změnit, napište požadovanou velikost mezi znak % a znak určující
   sekvenci. Například %20V vytvoří pole kandidátská verze balíku o šířce 20
   znaků. Také můžete místo číselné velikosti zadat otazník, což nastaví
   základní šířku sloupce podle velikosti obsahu. Poznamenejme, že výsledné
   sloupce se nemusí zarovnat vertikálně.

   Chcete-li, aby konkrétní %-sekvence měla proměnlivou šířku, i když
   implicitně používá šířku pevnou, přidejte na konec sekvence znak „#“.
   Například pro zobrazení kandidátské verze balíku bez ohledu na její
   velikost použijte formátovací řetězec %V#. Znak # můžete umístit i mimo
   %-sekvenci - aptitude „roztáhne“ text před znakem # (tj. vloží za něj
   dorovnávací mezery).

   Úplná syntaxe %-sekvence tedy vypadá:

 %[šířka][?]kód[#]

   Standardní formát zobrazení seznamu balíků definují tyto tři konfigurační
   proměnné: Aptitude::UI::Package-Display-Format (samotný seznam balíků),
   Aptitude::UI::Package-Status-Format (stavová řádka pod seznamem) a
   Aptitude::UI::Package-Header-Format (záhlaví seznamu).

   Ve formátovacích řetězcích můžete použít následující %-sekvence:

   [Poznámka] Poznámka
              Některé popisy se odkazují na „balík“. V uživatelském prostředí
              se tím míní zobrazený nebo aktuálně vybraný balík, v příkazovém
              režimu se takto odkazujeme na balík, který bude zobrazen.

   Sekvence      Název      Implicitní  Rozšiřitelná          Popis
                             velikost
   %%       Znak %          1           Ne           Do výstupu vloží znak
                                                     procenta.
                                                     V některých případech
                                                     může mít formátovací
                                                     řetězec parametry;
                                                     například při hledání z
            Nahrazení                                příkazové řádky se jako
   %#číslo  parametru       Proměnlivá  Ne           parametry použijí při
                                                     zobrazování výsledku
                                                     nalezené skupiny. Tato
                                                     formátovací sekvence se
                                                     nahradí za parametr
                                                     určený číslem.
                                                     Jednoznakový příznak
                                                     shrnující akci, která se
   %a       Akční příznak   1           Ne           má s balíkem provést.
                                                     (Význam viz 2.10 –
                                                     „Hodnoty příznaku
                                                     „akce““.)
                                                     O něco upovídanější
   %A       Akce            10          Ne           popis akce, která se má
                                                     s balíkem provést.
                                                     Pokud neexistují balíky
                                                     s porušenými závislosti,
            Počet                                    nevytiskne nic. V
   %B       porušených      13          Ne           opačném případě zobrazí
            balíků                                   jejich počet s krátkým
                                                     popisem (např.
                                                     „Porušených: 10“).
                                                     Jednoznakový příznak
            Příznak                                  shrnující aktuální stav
   %c       aktuálního      1           Ne           balíku. (Význam viz 2.9
            stavu                                    – „Hodnoty příznaku
                                                     „aktuální stav““.)
                                                     O něco upovídanější
   %C       Aktuální stav   11          Ne           popis aktuálního stavu
                                                     balíku.
   %d       Popis           40          Ano          Krátký popis balíku.
   %D       Velikost balíku 8           Ne           Velikost balíku (.deb
                                                     souboru).
                                                     Jméno počítače, na
   %H       Jméno počítače  15          Ne           kterém je aptitude
                                                     spuštěna.
                                                     Zobrazí nejvyšší
                                                     prioritu přiřazenou
   %i       Instalovaná     4           Ne           verzi balíku. U balíků
            velikost                                 zobrazí prioritu té
                                                     verze, jejíž instalace
                                                     je vynucená.
            Instalovaná                              (Předpokládané) místo,
   %I       velikost        8           Ne           které balík obsadí na
                                                     disku po rozbalení.
   %m       Správce         30          Ano          Správce balíku.
            Příznak                                  Pokud byl balík
   %M       automatické     1           Ne           instalován automaticky,
            instalace                                vytiskne „A“, v opačném
                                                     případě nevytiskne nic.
   %n       Verze programu  Délka       Ne           Vytiskne verzi aptitude,
                            „0.4.11.9“.              aktuálně „0.4.11.9“.
   %N       Název programu  Délka názvu Ne           Vytiskne název programu,
                            programu.                obvykle „aptitude“.
                                                     Pokud nebudou
                                                     instalovány žádné
                                                     balíky, nevytiskne nic.
                                                     V opačném případě
            Velikost ke                              vytiskne řetězec
   %o       stažení         17          Ne           popisující celkovou
                                                     velikost všech .deb
                                                     souborů, které je
                                                     potřeba stáhnout.
                                                     Například „Stáhnu:
                                                     1000B“.
                                                     Vytiskne jméno balíku.
                                                     Pokud je balík zobrazen
   %p       Jméno balíku    30          Ano          ve stromové struktuře,
                                                     jméno balíku bude
                                                     zarovnáno podle jeho
                                                     hloubky ve stromu.
   %P       Priorita        9           Ne           Vytiskne prioritu
                                                     balíku.
            Počet                                    Vytiskne přibližný počet
   %r       reverzních      2           Ne           instalovaných balíků,
            závislostí                               které závisí na tomto
                                                     balíku.
                                                     Vytiskne zkrácený popis
            Zkrácená                                 priority balíku.
   %R       priorita        3           Ne           Například místo
                                                     „Důležité“ se zobrazí
                                                     „Důl“.
   %s       Sekce           10          Ne           Vytiskne sekci, do které
                                                     je balík zařazen.
                                                     Pokud balík není
   %S       Příznak důvěry  1           Ne           důvěryhodný, vytiskne
                                                     písmeno „U“.
   %t       Archiv          10          Ano          Vytiskne archiv, ve
                                                     kterém se balík nachází.
                                                     Pokud je balík označený,
   %T       Značka          1           Ne           vytiskne „*“, jinak
                                                     nevytiskne nic.^[16]
                                                     Pokud naplánované akce
                                                     změní množství zabraného
   %u       Změna využití   30          Ne           místa na disku, vytiskne
            disku                                    popis této změny.
                                                     Například „Na disku se
                                                     použije 100M.“
                                                     Vytiskne aktuálně
                                                     instalovanou verzi
   %v       Aktuální verze  10          Ne           balíku. Jestliže balík
                                                     není nainstalovaný,
                                                     vytiskne <žádná>
                                                     Vytiskne verzi balíku,
                                                     která by se
                                                     nainstalovala, kdybyste
   %V       Kandidátská     10          Ne           na balíku použili příkaz
            verze                                    Balík → Instalovat (+).
                                                     Pokud balík není
                                                     dostupný, vytiskne
                                                     <žádná>.
                                                     Vytiskne, kolik dalšího
                                                     místa se zabere nebo
   %Z       Změna velikosti 9           Ne           uvolní instalací,
                                                     aktualizací nebo
                                                     odstraněním balíku.

    Přizpůsobení hierarchie balíků

   Hierarchie balíků je generována shlukovacími pravidly - pravidly
   popisujícími, jak se má hierarchie vytvořit. Shlukovací pravidla popisují
   posloupnost pravidel. Každé pravidlo může zahodit balíky, vytvořit
   podskupiny, nebo jinak manipulovat se stromem. Konfigurační položka
   Aptitude::UI::Default-Grouping resp.
   Aptitude::UI::Default-Preview-Grouping nastavuje shlukovací pravidla pro
   nově vytvořené seznamy balíků, resp. pro předchozí obrazovky. Pro aktuální
   seznam balíků můžete nastavit shlukovací pravidla klávesou G.

   Shlukovací pravidla jsou popsána seznamem pravidel oddělených čárkou:
   pravidlo1, pravidlo2, .... Každé pravidlo se skládá z názvu pravidla a
   případných parametrů. Například versions nebo section(subdir). Počet
   povolených a vyžadovaných parametrů se liší podle typu pravidla.

   Pravidla mohou být neterminání nebo terminální. Neterminální pravidlo
   zpracuje balík, vytvoří část hierarchie a pak předá balík ke zpracování
   dalšímu pravidlu. Terminální pravidlo také zpracuje balík a vytvoří část
   stromu (obvykle položky vztahující se k balíku), ale dál už balík nikam
   nepředává. Pokud nezadáte terminální pravidlo, aptitude použije implicitní
   pravidlo, které vytvoří standardní „položky balíku“.

 action

           Seskupí balíky podle naplánované akce. Balíky, které se nedají
           aktualizovat nebo které se nezmění, budou ignorovány. Toto
           pravidlo se používá pro souhrn před instalací.

 deps

           Toto je terminální pravidlo.

           Vytvoří standardní položku balíku. Tu můžete rozbalit a odhalit
           závislosti balíku.

 filter(vzor)

           Zahrne pouze balíky, jejichž libovolná verze se shoduje se vzorem.

           Pokud vzor chybí, nebudou zahozeny žádné balíky. Tato vlastnost
           existuje pouze kvůli zpětné kompatibilitě a časem může být
           odstraněna.

 firstchar

           Seskupí balíky podle prvního písmena v jejich názvu.

 hier

           Seskupí balíky podle speciálního souboru, ve kterém je popis
           „hierarchie“ balíků.

 pattern(vzor [=> kategorie][, ...])

           Upravitelné shlukovací pravidlo. Každá verze každého balíku se
           porovnává se zadaným vzorem. První shoda se použije pro přiřazení
           kategorie k balíku a balíky jsou následně seskupeny podle těchto
           kategorií. V kategorii se mohou vyskytnout řetězce ve tvaru \N ,
           které budou nahrazeny N-tým výsledkem porovnání. Pokud kategorie
           chybí, předpokládá se výchozí hodnota \1.

           Například pravidlo pattern(?maintainer() => \1) seskupí balíky
           podle jejich pole Maintainer (Správce). Pravidlo
           pattern(?maintainer()) provede to samé, protože se na místo
           chybějící kategorie automaticky doplní \1.

           Místo => kategorie může pravidlo končit znaky ||. To znamená, že
           balíky vyhovující vzoru budou vloženy do stromu na stejné úrovni
           jako vzor, namísto výchozího vložení do podstromu. Například
           pravidlo pattern(?action(remove) => Balíky k odstranění, ?true ||)
           umístí balíky k odstranění do podstromu a všechny ostatní balíky
           na aktuální úroveň. Samozřejmě, že všechna další shlukovací
           pravidla budou pracovat s oběma množinami balíků.

           Více se o formátu vzoru dozvíte v části „Vyhledávací vzory“.

 priority

           Seskupí balíky podle priority.

 section[(mód[,passthrough])]

           Seskupí balíky podle pole Sekce (Section).

           Argument mód může nabývat následujících hodnot:

                none

                        Skupiny se vytvoří podle celého pole Sekce, takže pak
                        budou mít tvar „non-free/games“. Pokud mód vynecháte,
                        použije se tato možnost.

                topdir

                        Skupiny se vytvoří podle části pole Sekce před prvním
                        lomítkem „/“. Jestliže se v poli nevyskytuje znak /,
                        nebo pokud není první část pole rozpoznaná, použije
                        první skupina ze seznamu
                        Aptitude::Sections::Top-Sections.

                subdir

                        Skupiny se vytvoří podle části pole Sekce za prvním
                        lomítkem „/“. Část pole před lomítkem musí být
                        uvedena v seznamu Aptitude::Sections::Top-Sections.
                        Pokud tomu tak není, nebo pokud se v poli nevyskytuje
                        znak /, použije se celé pole.

                subdirs

                        Skupiny se vytvoří podle části pole Sekce za prvním
                        lomítkem „/“. Část pole před lomítkem musí být
                        uvedena v seznamu Aptitude::Sections::Top-Sections.
                        Pokud tomu tak není, nebo pokud se v poli nevyskytuje
                        znak /, použije se celé pole. Jestliže se použité
                        části pole nachází nějaká lomítka, vytvoří se
                        hierarchie skupin. Předpokládejme třeba, že se v
                        seznamu Aptitude::Sections::Top-Sections nevyskytuje
                        řetězec „games“. Potom by se balík, který má v poli
                        Sekce uvedeno „games/arcade“, umístil do skupiny
                        „arcade“, která by byla zařazena do skupiny nejvyšší
                        úrovně nazvané „games“.

           Použijete-li argument passthrough, budou balíky bez pole Sekce
           (např. virtuální balíky) předány přímo do další úrovně
           seskupování, aniž by předtím byly roztříděny do podkategorií.

 status

           Seskupí balíky do následujících kategorií:

              o Instalované

              o Nenainstalované

              o Bezpečnostní aktualizace

              o Aktualizovatelné

              o Zastaralé

              o Virtuální

 tag[(aspekt)]

           Seskupí balíky podle informací o značkách uložených v souborech
           Packages. Pokud je zadán aspekt, pak jsou zobrazeny pouze značky
           odpovídající zadanému aspektu a balíky bez aspektu jsou skryty; v
           opačném případě bude každý balík zobrazen nejméně jednou (balíky
           bez značek budou zobrazeny odděleně od ostatních).

           Více informací o značkách naleznete na domovské stránce projektu
           Debtags.

 task

           Vytvoří strom nazvaný „Úlohy“, který obsahuje dostupné úlohy.
           (Informace o úlohách je získána ze souboru debian-tasks.desc
           balíku tasksel.) Pravidlo následující za task vytvoří své
           kategorie na stejné úrovni jako „Úlohy“.

 versions

           Toto je terminální pravidlo.

           Vytvoří standardní položku balíku. Tu můžete rozbalit a odhalit
           verze balíku.

    Změna řazení balíků

   Implicitně jsou balíky seřazeny podle jména. Často je ovšem užitečné je
   seřadit podle jiného kritéria (například dle velikosti balíku). aptitude
   vám to umožňuje pomocí pravidel pro řazení.

   Podobně jako u pravidel pro seskupování popsaných v předchozí sekci, jsou
   i pravidla pro řazení zadávána v podobě seznamu odděleného čárkami. Jedna
   položka seznamu je název jednoho řadícího pravidla. Pokud jsou balíky
   podle prvního pravidla shodné, porovnávají se podle druhého, atd.
   Uvedete-li před název pravidla vlnku (~), směr řazení se obrátí. Například
   priority,~name seřadí balíky podle priority, balíky se stejnou prioritou
   budou seřazeny podle jména, ovšem v obráceném pořadí.

   Pro změnu pravidel pro řazení aktuálního seznamu balíků stiskněte klávesu
   S.

   Dostupná pravidla jsou:

   installsize

           Seřadí balíky podle odhadovaného místa, které po instalaci zaberou
           na disku.

   name

           Seřadí balíky podle jména.

   priority

           Seřadí balíky podle priority.

   version

           Seřadí balíky podle verze.

  Přizpůsobení klávesových zkratek

   Klávesy pro spouštění příkazů v aptitude si můžete přizpůsobit v
   konfiguračním souboru. Každý příkaz má svou konfigurační proměnnou, pomocí
   které můžete příkaz spojit s požadovanou klávesou. Například pokud chcete,
   aby klávesa s zahájila hledání, nastavte proměnnou
   Aptitude::UI::Keybindings::Search na hodnotu „s“. Jestliže chcete použít
   modifikátor Control, předřaďte klávese řetězec „C-“. Tj. když v předchozím
   příkladu nahradíte „s“ za „C-s“, naváže se hledání na klávesovou zkratku
   Control+s. Příkaz můžete dokonce spojit s více klávesovými zkratkami
   najednou, stačí jednotlivé zkratky oddělit čárkami. Například pokud se má
   hledání spustit klávesou s i Control+s, použijte „s,C-s“.

   Následuje přehled příkazů, které můžete navázat na klávesové zkratky.
   Slouží k tomu proměnná Aptitude::UI::Keybindings::příkaz, kde příkaz je
   jméno příkazu:

   +------------------------------------------------------------------------+
   |         Příkaz         |   Implicitně    |            Popis            |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | V případě, že jsou některé  |
   |                        |                 | balíky porušené a aptitude  |
   | ApplySolution          | !               | pro ně navrhla řešení, tak  |
   |                        |                 | toto řešení okamžitě        |
   |                        |                 | použije.                    |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Přesune se na začátek       |
   | Begin                  | home,C-a        | aktuálního prvku: na        |
   |                        |                 | začátek seznamu nebo na     |
   |                        |                 | začátek textového pole.     |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Nahlásí chybu ve vybraném   |
   | BugReport              | B               | balíku; použije k tomu      |
   |                        |                 | příkaz reportbug.           |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Zruší aktuální akci:        |
   | Cancel                 | C-g,escape,C-[  | například zavře dialog nebo |
   |                        |                 | opustí menu.                |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Zobrazí soubor              |
   | Changelog              | C               | changelog.Debian z          |
   |                        |                 | vybraného balíku.           |
   |------------------------+-----------------+-----------------------------|
   | ChangePkgTreeGrouping  | G               | Nastaví shlukovací pravidla |
   |                        |                 | aktivního seznamu balíků.   |
   |------------------------+-----------------+-----------------------------|
   | ChangePkgTreeLimit     | l               | Nastaví omezení zobrazení   |
   |                        |                 | aktivního seznamu balíků.   |
   |------------------------+-----------------+-----------------------------|
   | ChangePkgTreeSorting   | S               | Nastaví řadící pravidla     |
   |                        |                 | aktivního seznamu balíků.   |
   |------------------------+-----------------+-----------------------------|
   | ClearAuto              | m               | Označí vybraný balík jako   |
   |                        |                 | instalovaný ručně.          |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | V hierarchickém seznamu     |
   | CollapseAll            | ]               | sbalí vybraný strom a       |
   |                        |                 | všechny jeho potomky.       |
   |------------------------+-----------------+-----------------------------|
   | CollapseTree           | nenavázáno      | V hierarchickém seznamu     |
   |                        |                 | sbalí vybraný strom.        |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | V editoru hierarchie uloží  |
   | Commit                 | N               | pozici aktuálního balíku v  |
   |                        |                 | hierarchii a přesune se k   |
   |                        |                 | dalšímu balíku.             |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | V dialogovém okně je        |
   |                        |                 | ekvivalentní se stisknutím  |
   | Confirm                | enter           | tlačítka „Ok“. Při výběru z |
   |                        |                 | několika možností vybere tu |
   |                        |                 | přednastavenou.             |
   |------------------------+-----------------+-----------------------------|
   | Cycle                  | tab             | Přesune se na další „prvek  |
   |                        |                 | uživatelského prostředí“.   |
   |------------------------+-----------------+-----------------------------|
   | CycleNext              | f6              | Přepne se do dalšího        |
   |                        |                 | aktivního pohledu.          |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Cykluje mezi                |
   | CycleOver              | o               | předdefinovanými            |
   |                        |                 | rozloženími obrazovky.      |
   |------------------------+-----------------+-----------------------------|
   | CyclePrev              | f7              | Přepne se do předchozího    |
   |                        |                 | aktivního pohledu.          |
   |------------------------+-----------------+-----------------------------|
   | DelBOL                 | C-u             | Smaže text mezi kurzorem a  |
   |                        |                 | začátkem řádku.             |
   |------------------------+-----------------+-----------------------------|
   | DelBack                | backspace,C-h   | Při zadávání textu smaže    |
   |                        |                 | předchozí znak.             |
   |------------------------+-----------------+-----------------------------|
   | DelEOL                 | C-k             | Smaže text od kurzoru až do |
   |                        |                 | konce řádku.                |
   |------------------------+-----------------+-----------------------------|
   | DelForward             | delete,C-d      | Při zadávání textu smaže    |
   |                        |                 | znak pod kurzorem.          |
   |------------------------+-----------------+-----------------------------|
   | Dependencies           | d               | Zobrazí závislosti          |
   |                        |                 | vybraného balíku.           |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Cykluje mezi dostupnými     |
   | DescriptionCycle       | i               | pohledy v informační        |
   |                        |                 | oblasti seznamu balíků.     |
   |------------------------+-----------------+-----------------------------|
   | DescriptionDown        | z               | Posune text v informační    |
   |                        |                 | oblasti o jeden řádek dolů. |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Posune text v informační    |
   | DescriptionUp          | a               | oblasti o jeden řádek       |
   |                        |                 | nahoru.                     |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Při prvním spuštění zobrazí |
   | DoInstallRun           | g               | přehled před instalací ^[a] |
   |                        |                 | Při druhém spuštění spustí  |
   |                        |                 | samotnou instalaci.         |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Posune „něco“ dolů. Např.   |
   | Down                   | down,j          | posune dolů text nápovědy,  |
   |                        |                 | nebo v seznamu vybere další |
   |                        |                 | položku.                    |
   |------------------------+-----------------+-----------------------------|
   | DpkgReconfigure        | R               | Na vybraném balíku spustí   |
   |                        |                 | „dpkg-reconfigure“.         |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Jestliže jsou nějaké balíky |
   |                        |                 | porušeny, zapíše do souboru |
   | DumpResolver           | *               | aktuální stav řešitele      |
   |                        |                 | konfliktů (pro ladicí       |
   |                        |                 | účely).                     |
   |------------------------+-----------------+-----------------------------|
   | EditHier               | E               | Otevře editor hierarchie.   |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Přesune se na konec         |
   | End                    | end,C-e         | aktuálního prvku: na konec  |
   |                        |                 | seznamu nebo na konec       |
   |                        |                 | textového pole.             |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Jestliže jsou nějaké balíky |
   |                        |                 | porušeny a aptitude pro ně  |
   | ExamineSolution        | e               | navrhla řešení, zobrazí     |
   |                        |                 | okno s podrobným popisem    |
   |                        |                 | navrhovaných změn.          |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | V hierarchickém seznamu     |
   | ExpandAll              | [               | rozbalí vybraný strom a     |
   |                        |                 | všechny jeho potomky.       |
   |------------------------+-----------------+-----------------------------|
   | ExpandTree             | nenavázáno      | V hierarchickém seznamu     |
   |                        |                 | rozbalí vybraný strom.      |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Jestliže jsou nějaké balíky |
   | FirstSolution          | <               | porušeny, přejde na první   |
   |                        |                 | navrhované řešení.          |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Zabrání balíku v            |
   | ForbidUpgrade          | F               | aktualizaci na dostupnou    |
   |                        |                 | verzi (nebo na konkrétní    |
   |                        |                 | verzi).                     |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Zapomene, které balíky jsou |
   | ForgetNewPackages      | f               | „nové“ (vyprázdní strom     |
   |                        |                 | „Nové balíky“).             |
   |------------------------+-----------------+-----------------------------|
   | Help                   | ?               | Zobrazí nápovědu.           |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | V řádkovém editoru s        |
   | HistoryNext            | down,C-n        | historií se přesune na      |
   |                        |                 | další položku v historii.   |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | V řádkovém editoru s        |
   | HistoryPrev            | up,C-p          | historií se přesune na      |
   |                        |                 | předchozí položku v         |
   |                        |                 | historii.                   |
   |------------------------+-----------------+-----------------------------|
   | Hold                   | =               | Podrží vybraný balík v      |
   |                        |                 | aktuální verzi.             |
   |------------------------+-----------------+-----------------------------|
   | Install                | +               | Označí aktuálně vybraný     |
   |                        |                 | balík pro instalaci.        |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Označí vybraný (jediný)     |
   | InstallSingle          | I               | balík pro instalaci.        |
   |                        |                 | Ostatní balíky jsou         |
   |                        |                 | ponechány v aktuální verzi. |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | U vybraného balíku zruší    |
   | Keep                   | :               | naplánované akce jako       |
   |                        |                 | instalaci, aktualizaci,     |
   |                        |                 | odstranění nebo podržení.   |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Jestliže jsou nějaké balíky |
   | LastSolution           | >               | porušeny, přejde na         |
   |                        |                 | poslední doposud navrhnuté  |
   |                        |                 | řešení.                     |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Posune „něco“ vlevo. Např.  |
   |                        |                 | v menu se posune na položku |
   | Left                   | left,h          | vlevo, nebo při editaci     |
   |                        |                 | textu posune kurzor o znak  |
   |                        |                 | doleva.                     |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | V hierarchickém seznamu     |
   |                        |                 | vybere dalšího sourozence   |
   | LevelDown              | J               | vybrané položky (tj. další  |
   |                        |                 | položku se stejným          |
   |                        |                 | rodičem).                   |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | V hierarchickém seznamu     |
   |                        |                 | vybere předchozího          |
   | LevelUp                | K               | sourozence vybrané položky  |
   |                        |                 | (tj. předchozí položku se   |
   |                        |                 | stejným rodičem).           |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Pokusí se aktualizovat      |
   |                        |                 | všechny balíky kromě těch,  |
   | MarkUpgradable         | U               | které jsou podržené v       |
   |                        |                 | aktuální verzi, nebo které  |
   |                        |                 | mají aktualizaci zakázánu.  |
   |------------------------+-----------------+-----------------------------|
   | MineFlagSquare         | f               | V Minovém poli, umístí nebo |
   |                        |                 | sebere vlajku.              |
   |------------------------+-----------------+-----------------------------|
   | MineLoadGame           | L               | Nahraje uloženou            |
   |                        |                 | hruMinového pole.           |
   |------------------------+-----------------+-----------------------------|
   | MineSaveGame           | S               | Uloží hru Minového pole.    |
   |------------------------+-----------------+-----------------------------|
   | MineSweepSquare        | nenavázáno      | Prohledá okolní pole ve hře |
   |                        |                 | Minové pole.                |
   |------------------------+-----------------+-----------------------------|
   | MineUncoverSquare      | nenavázáno      | Odkryje políčko v Minovém   |
   |                        |                 | poli.                       |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Pokud je zakryté, odkryje   |
   | MineUncoverSweepSquare | enter           | políčko v Minovém poli,     |
   |                        |                 | jinak provede průzkum       |
   |                        |                 | okolí.                      |
   |------------------------+-----------------+-----------------------------|
   | NextPage               | pagedown,C-f    | Posune zobrazení o stranu   |
   |                        |                 | vpřed.                      |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Jestliže jsou nějaké balíky |
   | NextSolution           | .               | porušeny, přesune se na     |
   |                        |                 | další navrhované řešení.    |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Tato klávesa vybere v       |
   | No                     | n^[b]           | dialogových oknech tlačítko |
   |                        |                 | „Ne“.                       |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | V hierarchickém seznamu     |
   | Parent                 | ^               | vybere rodiče vybrané       |
   |                        |                 | položky.                    |
   |------------------------+-----------------+-----------------------------|
   | PrevPage               | pageup,C-b      | Posune zobrazení o stranu   |
   |                        |                 | zpět.                       |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Jestliže jsou nějaké balíky |
   | PrevSolution           | ,               | porušeny, přesune se na     |
   |                        |                 | předchozí navrhované        |
   |                        |                 | řešení.                     |
   |------------------------+-----------------+-----------------------------|
   | Purge                  | _               | Označí aktuálně vybraný     |
   |                        |                 | balík pro vyčištění.        |
   |------------------------+-----------------+-----------------------------|
   | PushButton             | space,enter     | Aktivuje vybrané tlačítko,  |
   |                        |                 | nebo přepne přepínací pole. |
   |------------------------+-----------------+-----------------------------|
   | Quit                   | q               | Zavře aktuální pohled.      |
   |------------------------+-----------------+-----------------------------|
   | QuitProgram            | Q               | Ukončí celý program.        |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Zamítne v řešiteli všechny  |
   |                        |                 | akce, které by zrušily      |
   | RejectBreakHolds       |                 | podržení nějakého balíku.   |
   |                        |                 | Ekvivalentní s Řešitel →    |
   |                        |                 | Zamítnout porušující        |
   |                        |                 | podržení.                   |
   |------------------------+-----------------+-----------------------------|
   | Refresh                | C-l             | Překreslí obrazovku.        |
   |------------------------+-----------------+-----------------------------|
   | Remove                 | -               | Označí vybraný balík pro    |
   |                        |                 | odstranění.                 |
   |------------------------+-----------------+-----------------------------|
   | ReInstall              | L               | Označí vybraný balík pro    |
   |                        |                 | reinstalaci.                |
   |------------------------+-----------------+-----------------------------|
   | RepeatSearchBack       | N               | Zopakuje poslední hledání,  |
   |                        |                 | ovšem v opačném směru.      |
   |------------------------+-----------------+-----------------------------|
   | ReSearch               | n               | Zopakuje poslední hledání.  |
   |------------------------+-----------------+-----------------------------|
   | ReverseDependencies    | r               | Zobrazí balíky, které       |
   |                        |                 | závisí na vybraném balíku.  |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Posune „něco“ vpravo. Např. |
   |                        |                 | v menu se posune na položku |
   | Right                  | right,l         | vpravo, nebo při editaci    |
   |                        |                 | textu posune kurzor o znak  |
   |                        |                 | doprava.                    |
   |------------------------+-----------------+-----------------------------|
   | SaveHier               | S               | V editoru hierarchie uloží  |
   |                        |                 | aktuální hierarchii.        |
   |------------------------+-----------------+-----------------------------|
   | Search                 | /               | Spustí funkci „vyhledat“.   |
   |------------------------+-----------------+-----------------------------|
   | SearchBack             | \               | Spustí funkci „vyhledat     |
   |                        |                 | předchozí“.                 |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Ve stromu balíků bude       |
   | SearchBroken           | b               | hledat další porušený       |
   |                        |                 | balík.                      |
   |------------------------+-----------------+-----------------------------|
   | SetAuto                | M               | Označí vybraný balík jako   |
   |                        |                 | instalovaný automaticky.    |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | V seznamu balíků            |
   | ShowHideDescription    | D               | zapne/vypne zobrazení       |
   |                        |                 | informační oblasti.         |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Při prohlížení řešení       |
   |                        |                 | označí aktuálně vybranou    |
   | SolutionActionApprove  | a               | akci jako „schválenou“ (tj. |
   |                        |                 | přednostně budou generována |
   |                        |                 | pouze řešení obsahující     |
   |                        |                 | tuto akci).                 |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Při prohlížení řešení       |
   |                        |                 | označí aktuálně vybranou    |
   | SolutionActionReject   | r               | akci jako „odmítnutou“ (tj. |
   |                        |                 | přednostně budou generována |
   |                        |                 | pouze řešení neobsahující   |
   |                        |                 | tuto akci).                 |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | V hierarchickém seznamu     |
   | ToggleExpanded         | enter           | rozbalí nebo sbalí vybraný  |
   |                        |                 | strom.                      |
   |------------------------+-----------------+-----------------------------|
   | ToggleMenuActive       | C-t,f10,C-space | Vstoupí do (vystoupí z)     |
   |                        |                 | hlavního menu.              |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Zruší poslední akci. Vracet |
   |                        |                 | zpět se můžete až do        |
   |                        |                 | výskytu jedné z             |
   | Undo                   | C-_,C-u         | následujících událostí:     |
   |                        |                 | start aptitude, aktualizace |
   |                        |                 | seznamu balíků nebo         |
   |                        |                 | instalace balíků.           |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Posune „něco“ nahoru. Např. |
   | Up                     | up,k            | posune nahoru text          |
   |                        |                 | nápovědy, nebo v seznamu    |
   |                        |                 | vybere předchozí položku.   |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Aktualizuje seznam balíků.  |
   | UpdatePackageList      | u               | (Většinou si nové seznamy   |
   |                        |                 | stáhne z Internetu.)        |
   |------------------------+-----------------+-----------------------------|
   | Versions               | v               | Zobrazí dostupné verze      |
   |                        |                 | vybraného balíku.           |
   |------------------------+-----------------+-----------------------------|
   |                        |                 | Tato klávesa vybere v       |
   | Yes                    | y ^[b]          | dialogových oknech tlačítko |
   |                        |                 | „Ano“.                      |
   |------------------------------------------------------------------------|
   | ^[a] Pokud ovšem Aptitude::Display-Planned-Action není nastaveno na    |
   | hodnotu „false“.                                                       |
   |                                                                        |
   | ^[b] Může se lišit v různých jazykových mutacích.                      |
   +------------------------------------------------------------------------+

   Kromě písmen, čísel a interpunkčních znaků můžete pro navázání použít i
   následující „speciální“ klávesy:

   +------------------------------------------------------------------------+
   |  Název klávesy   |                        Popis                        |
   |------------------+-----------------------------------------------------|
   | a1               | Klávesa A1.                                         |
   |------------------+-----------------------------------------------------|
   | a3               | Klávesa A3.                                         |
   |------------------+-----------------------------------------------------|
   | b2               | Klávesa B2.                                         |
   |------------------+-----------------------------------------------------|
   | backspace        | Klávesa Backspace.                                  |
   |------------------+-----------------------------------------------------|
   | backtab          | Klávesa Back-tab                                    |
   |------------------+-----------------------------------------------------|
   | begin            | Klávesa Begin (ne Home)                             |
   |------------------+-----------------------------------------------------|
   | break            | Klávesa „break“.                                    |
   |------------------+-----------------------------------------------------|
   | c1               | Klávesa C1.                                         |
   |------------------+-----------------------------------------------------|
   | c3               | Klávesa C3.                                         |
   |------------------+-----------------------------------------------------|
   | cancel           | Klávesa Cancel.                                     |
   |------------------+-----------------------------------------------------|
   | create           | Klávesa Create.                                     |
   |------------------+-----------------------------------------------------|
   |                  | Čárka (,) -- protože se čárka používá pro oddělení  |
   | comma            | seznamu kláves, je toto jediná možnost jak svázat   |
   |                  | příkaz s klávesou čárka.                            |
   |------------------+-----------------------------------------------------|
   | command          | Klávesa Command.                                    |
   |------------------+-----------------------------------------------------|
   | copy             | Klávesa Copy.                                       |
   |------------------+-----------------------------------------------------|
   | delete           | Klávesa Delete.                                     |
   |------------------+-----------------------------------------------------|
   | delete_line      | Klávesa „smaž řádek“.                               |
   |------------------+-----------------------------------------------------|
   | down             | Klávesa „šipka dolů“.                               |
   |------------------+-----------------------------------------------------|
   | end              | Klávesa End.                                        |
   |------------------+-----------------------------------------------------|
   | entry            | Klávesa Enter.                                      |
   |------------------+-----------------------------------------------------|
   | exit             | Klávesa Exit.                                       |
   |------------------+-----------------------------------------------------|
   | f1, f2, ..., f10 | Klávesy F1 až F10.                                  |
   |------------------+-----------------------------------------------------|
   | find             | Klávesa Find.                                       |
   |------------------+-----------------------------------------------------|
   | home             | Klávesa Home.                                       |
   |------------------+-----------------------------------------------------|
   | insert           | Klávesa Insert.                                     |
   |------------------+-----------------------------------------------------|
   | insert_exit      | Klávesa „insert exit“.                              |
   |------------------+-----------------------------------------------------|
   | clear            | Klávesa „vymazat“.                                  |
   |------------------+-----------------------------------------------------|
   | clear_eol        | Klávesa „vymazat do konce řádku“.                   |
   |------------------+-----------------------------------------------------|
   | clear_eos        | Klávesa „vymazat do konce obrazovky“.               |
   |------------------+-----------------------------------------------------|
   | insert_line      | Klávesa „vložit řádek“.                             |
   |------------------+-----------------------------------------------------|
   | left             | Klávesa „levá šipka“.                               |
   |------------------+-----------------------------------------------------|
   | mark             | Klávesa Mark.                                       |
   |------------------+-----------------------------------------------------|
   | message          | Klávesa Message.                                    |
   |------------------+-----------------------------------------------------|
   | move             | Klávesa Move.                                       |
   |------------------+-----------------------------------------------------|
   | next             | Klávesa Next.                                       |
   |------------------+-----------------------------------------------------|
   | open             | Klávesa Open.                                       |
   |------------------+-----------------------------------------------------|
   | previous         | Klávesa Previous.                                   |
   |------------------+-----------------------------------------------------|
   | print            | Klávesa Print.                                      |
   |------------------+-----------------------------------------------------|
   | redo             | Klávesa Redo.                                       |
   |------------------+-----------------------------------------------------|
   | reference        | Klávesa Reference.                                  |
   |------------------+-----------------------------------------------------|
   | refresh          | Klávesa Refresh.                                    |
   |------------------+-----------------------------------------------------|
   | replace          | Klávesa Replace.                                    |
   |------------------+-----------------------------------------------------|
   | restart          | Klávesa Restart.                                    |
   |------------------+-----------------------------------------------------|
   | resume           | Klávesa Resume.                                     |
   |------------------+-----------------------------------------------------|
   | return           | Klávesa Return.                                     |
   |------------------+-----------------------------------------------------|
   | right            | Klávesa „pravá šipka“.                              |
   |------------------+-----------------------------------------------------|
   | save             | Klávesa Save.                                       |
   |------------------+-----------------------------------------------------|
   | scrollf          | Klávesa „rolovat vpřed“.                            |
   |------------------+-----------------------------------------------------|
   | scrollr          | Klávesa „rolovat zpět“.                             |
   |------------------+-----------------------------------------------------|
   | select           | Klávesa Select.                                     |
   |------------------+-----------------------------------------------------|
   | suspend          | Klávesa Suspend.                                    |
   |------------------+-----------------------------------------------------|
   | pagedown         | Klávesa Page Down.                                  |
   |------------------+-----------------------------------------------------|
   | pageup           | Klávesa Page Up.                                    |
   |------------------+-----------------------------------------------------|
   | space            | Klávesa mezera                                      |
   |------------------+-----------------------------------------------------|
   | tab              | Klávesa Tab                                         |
   |------------------+-----------------------------------------------------|
   | undo             | Klávesa Undo.                                       |
   |------------------+-----------------------------------------------------|
   | up               | Klávesa „šipka nahoru“.                             |
   +------------------------------------------------------------------------+

   Mimo globálního vázání kláves můžete změnit klávesové zkratky i pouze pro
   jednu konkrétní část aptitude (tzv. doménu). Například aby se klávesa Tab
   v menu chovala stejně jako šipka vpravo, nastavte
   Aptitude::UI::Keybindings::Menubar::Right na hodnotu „tab,right“. K
   dispozici jsou následující domény:

   +------------------------------------------------------------------------+
   |    Doména     |                         Popis                          |
   |---------------+--------------------------------------------------------|
   | EditLine      | Používá se pro prvky, kde se zadává text, například ve |
   |               | „vyhledávacím“ dialogu.                                |
   |---------------+--------------------------------------------------------|
   | Menu          | Používá se pro rozbalovací menu programu.              |
   |---------------+--------------------------------------------------------|
   | Menubar       | Používá se pro pruh menu nahoře na obrazovce.          |
   |---------------+--------------------------------------------------------|
   | Minesweeper   | Používá se v režimu Minové pole.                       |
   |---------------+--------------------------------------------------------|
   |               | Používá se ve stavové řádce pro výběr z několika       |
   | MinibufChoice | hodnot. (Pouze pokud máte povolené „Používat výzvy ve  |
   |               | stylu 'minibufferu'“.)                                 |
   |---------------+--------------------------------------------------------|
   | Pager         | Používá se při zobrazování souboru na disku (například |
   |               | nápověda).                                             |
   |---------------+--------------------------------------------------------|
   | PkgNode       | Používá se u balíků, stromů balíků, verzí balíků a     |
   |               | závislostech balíků, pokud se objeví v seznamu balíků. |
   |---------------+--------------------------------------------------------|
   | PkgTree       | Používá se v seznamu balíků.                           |
   |---------------+--------------------------------------------------------|
   | Table         | Používá se u zobrazení prvků uživatelského rozhraní v  |
   |               | tabulkách (např. v dialogových oknech).                |
   |---------------+--------------------------------------------------------|
   | TextLayout    | Používá se pro zobrazení formátovaných textů, např.    |
   |               | pro popisy balíků.                                     |
   |---------------+--------------------------------------------------------|
   |               | Používá se u všech stromových zobrazení (včetně        |
   | Tree          | seznamů balíků, které však můžete nastavit pomocí      |
   |               | PkgTree).                                              |
   +------------------------------------------------------------------------+

  Přizpůsobení barvy textu a úprava stylů

   Barvy a grafické styly používané v aptitude pro zobrazení textu můžete
   přizpůsobit dle svého výtvarného cítění. Každý grafický prvek má svůj
   „style“, který popisuje konkrétní barvy a vizuální prvky, které se použijí
   pro zobrazení prvku. Styly mají podobu seznamu barev a atributů. Seznam
   nutně nemusí být vyčerpávající; pokud nejsou některé barvy nebo atributy
   zadány, jejich hodnoty se převezmou z okolního grafického kontextu. Ve
   skutečnosti má většina grafických prvků „prázdný“ styl.

   Styl můžete změnit vytvořením konfigurační skupiny stejného jména v
   konfiguračním souboru aptu nebo aptitude. Například styl „MenuBorder“ se
   používá pro vykreslení rámečku okolo rozbaleného menu. Implicitně se
   rámeček kreslí tučně bílou barvou na modrém pozadí. Přidáte-li do
   konfiguračního souboru následující text, změníte barvu pozadí na azurovou:

 Aptitude::UI::Styles {
   MenuBorder {fg white; bg cyan; set bold;};
 };

   Jak je vidět, nastavení stylu se skládá ze série instrukcí. Mezi
   nejběžnější instrukce patří:

   fg barva

           Nastaví barvu popředí (barvu textu) na zadanou barvu. Seznam barev
           použitelných v aptitude naleznete níže.

   bg barva

           Nastaví barvu pozadí na zadanou barvu. Seznam barev použitelných v
           aptitude naleznete níže.

   set atribut

           Zapne zobrazení zadaného atributu textu. Seznam dostupných
           atributů naleznete níže.

   clear atribut

           Vypne zobrazení zadaného atributu textu. Seznam dostupných
           atributů naleznete níže.

   flip atribut

           Přepne zobrazení zadaného atributu textu: pokud je v obklopujícím
           prvku povolen, tak se vypne a naopak. Seznam dostupných atributů
           naleznete níže.

   aptitude rozpoznává následující barvy: black (černá), blue (modrá), cyan
   (modrozelená), green (zelená), magenta (fuchsiová), red (červená), white
   (bílá) a yellow (žlutá)^[17]. Místo konkrétní barvy pozadí můžete zadat i
   default (výchozí), což použije momentální barvu pozadí nastavenou v
   terminálu (tzn. to může být barva, obrázek nebo i průhlednost). Ze stylů
   můžete použít:

   blink

           Zapne blikající text.

   bold

           Zjasní barvu popředí textu (nebo pozadí, pokud je zapnuto reverzní
           zobrazení).

   dim

           Na některých terminálech text ještě více ztmaví. Na běžných
           linuxových terminálech nebyl pozorován žádný efekt.

   reverse

           Prohodí barvy popředí a pozadí. Mnoho grafických prvků tohoto
           atributu využívá pro zvýraznění vybraného prvku.

   standout

           Zapne „nejlepší zvýrazňovací režim terminálu“. V xtermu má
           podobný, ale ne stejný efekt jako reverzní zobrazení. Chování na
           jiných terminálech se může lišit.

   underline

           Zapne podtržení textu.

   Najednou můžete zadat i více atributů, stačí je oddělit čárkami. Například
   set bold,standout;.

   [Poznámka] Poznámka
              Jak je možná vidět z předchozího, je interpretace stylů a
              textových atributů silně závislá na použitém terminálu. Abyste
              zjistili, co přesně daná volba udělá na vašem terminálu, budete
              asi muset chvíli experimentovat.

   V aptitude může upravit následující styly:

   Obrázek 2.12. Upravitelné styly v aptitude

 +-----------------------------------------------------------------------------+
 |           Styl           |    Výchozí    |              Popis               |
 |--------------------------+---------------+----------------------------------|
 |Bullet                    |fg yellow; set |Styl pro zobrazení odrážek v      |
 |                          |bold;          |seznamech.                        |
 |--------------------------+---------------+----------------------------------|
 |                          |               |Styl pro zobrazení novějších      |
 |                          |               |záznamů v seznamu změn balíku.    |
 |                          |               |Poznamenejme, že aptitude bude    |
 |ChangelogNewerVersion     |set bold;      |zvýrazňovat záznamy pouze v       |
 |                          |               |případě, že máte nainstalován     |
 |                          |               |balík                             |
 |                          |               |libparse-debianchangelog-perl.    |
 |--------------------------+---------------+----------------------------------|
 |Default                   |fg white; bg   |Základní styl obrazovky.          |
 |                          |black;         |                                  |
 |--------------------------+---------------+----------------------------------|
 |DepBroken                 |fg black; bg   |Styl pro zobrazení nesplněných    |
 |                          |red;           |závislostí.                       |
 |--------------------------+---------------+----------------------------------|
 |DisabledMenuEntry         |fg black; bg   |Styl pro položky menu, které jsou |
 |                          |blue; set dim; |zakázány a tedy nejdou použít.    |
 |--------------------------+---------------+----------------------------------|
 |                          |fg black; bg   |Styl pro naznačení, že soubor byl |
 |DownloadHit               |green;         |nalezen, ale je nezměněn, tudíž se|
 |                          |               |nebude stahovat.                  |
 |--------------------------+---------------+----------------------------------|
 |DownloadProgress          |fg blue; bg    |Styl pro zobrazení postupu        |
 |                          |yellow;        |stahování.                        |
 |--------------------------+---------------+----------------------------------|
 |                          |fg white; bg   |Styl vstupní řádky (například     |
 |EditLine                  |black; clear   |výzva pro vyhledávání).           |
 |                          |reverse;       |                                  |
 |--------------------------+---------------+----------------------------------|
 |Error                     |fg white; bg   |Styl pro zobrazení chybových      |
 |                          |red; set bold; |hlášek.                           |
 |--------------------------+---------------+----------------------------------|
 |Header                    |fg white; bg   |Styl pro zobrazení záhlaví.       |
 |                          |blue; set bold;|                                  |
 |--------------------------+---------------+----------------------------------|
 |                          |fg white; bg   |Styl pro zobrazení vybrané položky|
 |HighlightedMenuBar        |blue; set      |v pruhu menu.                     |
 |                          |bold,reverse;  |                                  |
 |--------------------------+---------------+----------------------------------|
 |                          |fg white; bg   |Styl pro zobrazení vybrané položky|
 |HighlightedMenuEntry      |blue; set      |v rozbalovacím menu.              |
 |                          |bold,reverse;  |                                  |
 |--------------------------+---------------+----------------------------------|
 |MediaChange               |fg yellow; bg  |Styl pro zobrazení výzvy na       |
 |                          |red; set bold; |vložení dalšího CD.               |
 |--------------------------+---------------+----------------------------------|
 |MenuBar                   |fg white; bg   |Styl pro zobrazení pruhu menu.    |
 |                          |blue; set bold;|                                  |
 |--------------------------+---------------+----------------------------------|
 |MenuBorder                |fg white; bg   |Styl pro zobrazení orámování okolo|
 |                          |blue; set bold;|menu.                             |
 |--------------------------+---------------+----------------------------------|
 |MenuEntry                 |fg white; bg   |Styl pro zobrazení položek menu.  |
 |                          |blue;          |                                  |
 |--------------------------+---------------+----------------------------------|
 |MineBombColor             |fg red; set    |Styl pro zobrazení bomb v Minovém |
 |                          |bold;          |poli.                             |
 |--------------------------+---------------+----------------------------------|
 |MineBorder                |set bold;      |Styl pro zobrazení rámu okolo     |
 |                          |               |hrací desky v Minovém poli.       |
 |--------------------------+---------------+----------------------------------|
 |MineFlagColor             |fg red; set    |Styl pro zobrazení vlajek v       |
 |                          |bold;          |Minovém poli.                     |
 |--------------------------+---------------+----------------------------------|
 |                          |               |Styl pro zobrazení čísla N v      |
 |MineNumber                |Různé          |Minovém poli. N může nabývat      |
 |                          |               |hodnot od 0 do 8.                 |
 |--------------------------+---------------+----------------------------------|
 |                          |fg white; bg   |Styl pro zobrazení ostatních      |
 |MultiplexTab              |blue;          |„záložek“, než je aktuálně        |
 |                          |               |vybraná.                          |
 |--------------------------+---------------+----------------------------------|
 |MultiplexTabHighlighted   |fg blue; bg    |Styl pro zobrazení aktuálně       |
 |                          |white;         |vybrané „záložky“.                |
 |--------------------------+---------------+----------------------------------|
 |PkgBroken                 |fg red; flip   |Styl pro zobrazení balíků, které  |
 |                          |reverse;       |mají nesplněné závislosti.        |
 |--------------------------+---------------+----------------------------------|
 |PkgBrokenHighlighted      |fg red;        |Styl pro zobrazení vybraného      |
 |                          |               |balíku s nesplněnými závislostmi. |
 |--------------------------+---------------+----------------------------------|
 |                          |               |Styl pro zobrazení balíků, které  |
 |PkgNotInstalled           |               |momentálně nejsou instalovány a   |
 |                          |               |nebudou instalovány.              |
 |--------------------------+---------------+----------------------------------|
 |                          |               |Styl pro zobrazení vybraného      |
 |PkgNotInstalledHighlighted|               |balíku, který momentálně není     |
 |                          |               |instalován a nebude instalován.   |
 |--------------------------+---------------+----------------------------------|
 |                          |               |Styl pro zobrazení balíků, které  |
 |PkgIsInstalled            |set bold;      |jsou momentálně instalovány a pro |
 |                          |               |které není naplánovaná žádná akce.|
 |--------------------------+---------------+----------------------------------|
 |                          |               |Styl pro zobrazení vybraného      |
 |PkgIsInstalledHighlighted |set bold; flip |balíku, který je momentálně       |
 |                          |reverse;       |instalován a pro který není       |
 |                          |               |naplánovaná žádná akce.           |
 |--------------------------+---------------+----------------------------------|
 |PkgToDowngrade            |set bold;      |Styl pro zobrazení balíků, které  |
 |                          |               |budou degradovány.                |
 |--------------------------+---------------+----------------------------------|
 |PkgToDowngradeHighlighted |set bold; flip |Styl pro zobrazení vybraného      |
 |                          |reverse        |balíku, který bude degradován.    |
 |--------------------------+---------------+----------------------------------|
 |PkgToHold                 |fg white; flip |Styl pro zobrazení balíků, které  |
 |                          |reverse;       |jsou podrženy v aktuální verzi.   |
 |--------------------------+---------------+----------------------------------|
 |                          |               |Styl pro zobrazení vybraného      |
 |PkgToHoldHighlighted      |fg white;      |balíku podrženého v aktuální      |
 |                          |               |verzi.                            |
 |--------------------------+---------------+----------------------------------|
 |                          |fg green; flip |Styl pro zobrazení balíků, které  |
 |PkgToInstall              |reverse;       |budou instalovány (ne             |
 |                          |               |aktualizovány) nebo reinstalovány.|
 |--------------------------+---------------+----------------------------------|
 |                          |               |Styl pro zobrazení vybraného      |
 |PkgToInstallHighlighted   |fg green;      |balíku, který bude instalován (ne |
 |                          |               |aktualizován) nebo reinstalován.  |
 |--------------------------+---------------+----------------------------------|
 |PkgToRemove               |fg magenta;    |Styl pro zobrazení balíků, které  |
 |                          |flip reverse;  |budou odstraněny nebo vyčištěny.  |
 |--------------------------+---------------+----------------------------------|
 |                          |               |Styl pro zobrazení vybraného      |
 |PkgToRemoveHighlighted    |fg magenta;    |balíku, který bude odstraněn nebo |
 |                          |               |vyčištěn.                         |
 |--------------------------+---------------+----------------------------------|
 |PkgToUpgrade              |fg cyan; flip  |Styl pro zobrazení balíků, které  |
 |                          |reverse;       |budou aktualizovány.              |
 |--------------------------+---------------+----------------------------------|
 |PkgToUpgradeHighlighted   |fg cyan;       |Styl pro zobrazení vybraného      |
 |                          |               |balíku, který bude aktualizován.  |
 |--------------------------+---------------+----------------------------------|
 |                          |               |Styl pro zobrazení indikátorů     |
 |Progress                  |fg blue; bg    |postupu, např. toho, který se     |
 |                          |yellow;        |zobrazuje při načítání vyrovnávací|
 |                          |               |paměti.                           |
 |--------------------------+---------------+----------------------------------|
 |SolutionActionApproved    |bg green;      |Styl pro zobrazení schválených    |
 |                          |               |akcí v navrhovaném řešení.        |
 |--------------------------+---------------+----------------------------------|
 |SolutionActionRejected    |bg red;        |Styl pro zobrazení zamítnutých    |
 |                          |               |akcí v navrhovaném řešení.        |
 |--------------------------+---------------+----------------------------------|
 |Status                    |fg white; bg   |Styl pro zobrazení stavového řádku|
 |                          |blue; set bold;|dole na obrazovce.                |
 |--------------------------+---------------+----------------------------------|
 |TreeBackground            |               |Základní styl pro všechny seznamy |
 |                          |               |a stromy.                         |
 |--------------------------+---------------+----------------------------------|
 |                          |fg red; bg     |Styl pro zobrazení varování o     |
 |TrustWarning              |black; set     |důvěryhodnosti balíků.            |
 |                          |bold;          |                                  |
 +-----------------------------------------------------------------------------+

  Přizpůsobení rozložení obrazovky

   V aptitude je možné přeskládat prvky na obrazovce pomocí úprav
   konfiguračního souboru.

    Prvky na obrazovce

   Rozložení obrazovky je uloženo v konfigurační skupině
   Aptitude::UI::Default-Package-View a skládá se ze seznamu definic
   grafických prvků:

 Název typ {
   Row řádek;
   Column sloupec;
   Width šířka;
   Height výška;

   dodatečné volby...
 };

   Tímto se vytvoří grafický prvek pojmenovaný Název. Položky Row, Column,
   Width a Height jsou povinné a určují umístění prvku na obrazovce (viz
   podrobné vysvětlení dále v textu).

   Pro konkrétní příklady různých rozložení nahlédněte do definic témat v
   souboru /usr/share/aptitude/aptitude-defaults.

   K dispozici máte následující typy grafických prvků:

   Description

           Tento prvek obsahuje „informační oblast“ (typicky popis vybraného
           balíku).

           Volbou PopUpDownKey můžete zadat název příkazu, kterým se prvek
           zobrazí nebo skryje. Například nastavením na hodnotu
           ShowHideDescription docílíte toho, že se prvek bude chovat jako
           standardní informační oblast. Volba PopUpDownLinked akceptuje
           název jiného elementu, se kterým se „sváže“. To znamená že, se
           element zobrazí nebo skryje podle toho, zda je vázaný element
           zobrazen nebo ne.

   MainWidget

           Toto je oblast, ve které je umístěno „hlavní“ zobrazení - typicky
           seznam balíků. Na obrazovce musí existovat právě jeden prvek
           MainWidget - ne více, ne méně.

   Static

           Oblast obrazovky, která zobrazuje nějaký text (může obsahovat i
           formátovací znaky popsané v „Přizpůsobení zobrazení balíků“). Text
           můžete zadat přímo volbou Columns, nebo ho můžete uložit do jiné
           konfigurační proměnné, jejíž název zadáte volbou ColumnsCfg. Barva
           textu je určena volbou Color.

           Zobrazování a skrývání statických položek se děje stejně jako u
           položek Description volbami PopUpDownKey a PopUpDownLinked.

    Umístění prvků na obrazovce

   Prvky jsou na obrazovce umístěny v „tabulce“. Horní levý roh prvku leží v
   buňce zadané řádkem a sloupcem (obvykle na souřadnicích 0, 0, ale není to
   podmínkou). Šířka a výška prvku jsou zadány volbami šířka a výška.

   Je pravděpodobné, že poté co jsou prvky připraveny, na obrazovce stále
   zůstává nevyužité místo. O zbylý vertikální prostor se podělí prvky, jež
   mají volbu RowExpand nastavenou na hodnotu true. Obdobně se o volné
   horizontální místo podělí prvky s nastavenou proměnnou ColExpand.

   V případě, že na obrazovce není dostatek místa, zmenší se všechny sloupce
   a řádky, jejichž každý prvek má pravdivé hodnoty u proměnných RowShrink
   resp. ColShrink. Pokud to nestačí, budou zmenšeny všechny řádky a sloupce
   tak, aby se celá tabulka vešla do dostupného místa.

   Pokud prvek samotný není roztažen, ale jeho řádek nebo sloupec roztažen
   je, pak můžete určit, kam se má prvek zarovnat v rámci řádku nebo sloupce.
   To je určeno volbami RowAlign a ColAlign, které mohou nabývat hodnot Left
   (vlevo), Right (vpravo), Top (nahoře), Bottom (dole) nebo Center
   (uprostřed).

   Například následující konfigurační skupina vytvoří statický prvek nazvaný
   „Hlavicka“, který je široký tři buňky a bude se rozpínat horizontálně, ale
   ne vertikálně. Má stejnou barvu jako ostatní řádky hlavičky a používá
   standardní formát hlaviček:

 Hlavicka Static {
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

    Možnosti umístění prvků na obrazovce

   Pro prvky uživatelského rozhraní můžete použít následující volby:

   ColAlign zarovnání;

           zarovnání musí být jedno z Left, Right nebo Center. Pokud je řádek
           obsahující aktuální prvek uživatelského rozhraní širší než samotný
           prvek a ColExpand má hodnotu false, bude prvek umístěn do řádku
           právě podle hodnoty zarovnání.

           Pokud volbu vynecháte, použije se výchozí hodnota Left.

   ColExpand true|false;

           Pokud má volba hodnotu true, pak sloupec obsahující tento prvek
           získá část neobsazeného horizontálního místa.

           Pokud volbu vynecháte, použije se výchozí hodnota false.

   Color barva;

           Tato volba se vztahuje na Statické prvky. barva je název barvy
           (např. ScreenStatusColor), která se „implicitně“ použije pro tento
           prvek uživatelského rozhraní.

           Pokud volbu vynecháte, použije se výchozí hodnota
           DefaultWidgetBackground.

   ColShrink true|false;

           Mají-li tuto volbu nastaveny všechny prvky ve sloupci na hodnotu
           true a nastane nedostatek horizontálního místa, sloupec se zmenší
           tak, aby se vešel do dostupného místa. Poznamenejme, že ke
           zmenšení sloupce může dojít, i když má ColShrink hodnotu false. To
           nastane tehdy, kdy už není jiná možnost.

           Pokud volbu vynecháte, použije se výchozí hodnota false.

   Column sloupec;

           Zadá nejlevější sloupec, který obsahuje tento prvek uživatelského
           rozhraní.

   Columns formát;

           Tato volba se vztahuje na Statické prvky, které nepoužívají volbu
           ColumnsCfg. Popis formátovacího řetězce naleznete v „Přizpůsobení
           zobrazení balíků“.

   ColumnsCfg HEADER|STATUS|název;

           Tato volba se vztahuje na Statické prvky. Nastaví formát
           aktuálního prvku na hodnotu jiné konfigurační proměnné. Podle
           hodnoty HEADER nebo STATUS se převezmou nastavení z
           Aptitude::UI::Package-Header-Format nebo
           Aptitude::UI::Package-Status-Format. Jinak se nastavení převezme z
           volby nazvané název.

           Pokud volbu vynecháte, použije se výchozí hodnota z volby Columns.

   Height výška;

           Zadá výšku prvku.

   PopUpDownKey příkaz;

           Tato volba se vztahuje na prvky typu Description a Static.

           příkaz je název klávesového příkazu (např. ShowHideDescription).
           Opakovaným stiskem klávesy se prvek zobrazí/skryje.

   PopUpDownLinked prvek;

           Tato volba se vztahuje na prvky typu Description a Static.

           prvek je název prvku uživatelského rozhraní. Když je prvek
           zobrazen, je zobrazen i aktuální prvek. Analogicky, je-li prvek
           skryt, je skryt i aktuální prvek.

   Row řádek;

           Zadá nejhornější řádek, který obsahuje tento prvek uživatelského
           rozhraní.

   RowAlign zarovnání;

           zarovnání musí být jedno z Top, Bottom nebo Center. Pokud je řádek
           obsahující aktuální prvek uživatelského rozhraní vyšší než samotný
           prvek a RowExpand má hodnotu false, bude prvek umístěn do řádku
           právě podle hodnoty zarovnání.

           Pokud volbu vynecháte, použije se výchozí hodnota Top.

   RowExpand true|false;

           Pokud má volba hodnotu true, pak řádek obsahující tento prvek
           získá část neobsazeného vertikálního místa.

           Pokud volbu vynecháte, použije se výchozí hodnota false.

   RowShrink true|false;

           Mají-li tuto volbu nastaveny všechny prvky v řádku na hodnotu true
           a nastane nedostatek vertikálního místa, řádek se zmenší tak, aby
           se vešel do dostupného místa. Poznamenejme, že ke zmenšení řádku
           může dojít, i když má RowShrink hodnotu false. To nastane tehdy,
           kdy už není jiná možnost.

           Pokud volbu vynecháte, implicitně se použije false.

   Visible true|false;

           Pokud má hodnotu false, bude tento prvek skryt. Pravděpodobně
           užitečné jen ve spojení s PopUpDownKey a/nebo PopUpDownLinked.

           Pokud volbu vynecháte, implicitně se použije true.

   Width šířka;

           Zadá šířku prvku.

  Konfigurační soubor

    Formát konfiguračního souboru

   Ve své nejjednodušší podobě je konfigurační soubor aptitude výčet voleb s
   jejich hodnotami. Každý řádek souboru by měl mít tvar „Volba Hodnota;“.
   Například následující ukázka z konfiguračního souboru nastaví volbu
   Aptitude::Theme na hodnotu „Dselect“.

 Aptitude::Theme "Dselect";

   Volba může „seskupovat“ další volby. Stačí je zapsat do složených závorek
   mezi název volby a ukončovací středník:

 Aptitude::UI {
   Package-Status-Format "";
   Package-Display-Format "";
 };

   Volba, která seskupuje další volby se občas nazývá skupina. Ve skutečnosti
   jsou dvojité dvojtečky v názvech voleb kratším zápisem pro seskupování:
   Volba Aptitude::UI::Default-Grouping je obsažena ve skupině Aptitude::UI,
   která je zase obsažena ve skupině Aptitude. Kdybyste tedy chtěli, mohli
   byste této volbě nastavit hodnotu "" třeba takto:

 Aptitude {
   UI {
     Default-Grouping "";
   };
 };

   Pro více informací o formátu konfiguračního souboru si přečtěte manuálovou
   stránku apt.conf(5).

    Umístění konfiguračních souborů

   Nastavení aptitude je postupně čteno z následujících míst:

    1. Uživatelský konfigurační soubor ~/.aptitude/config. Pokud uživatel
       provádí změny v nastavení aptitude přes menu Volby, nastavení se uloží
       právě do tohoto souboru.

    2. Systémový konfigurační soubor /etc/apt/apt.conf.

    3. Implicitní hodnoty uložené v souboru
       /usr/share/aptitude/aptitude-defaults.

    4. Implicitní hodnoty zabudované v aptitude.

   Když aptitude potřebuje zjistit hodnotu nějaké volby, prohledává zmíněné
   zdroje podle uvedeného pořadí, dokud nenalezne její první výskyt. Tato
   hodnota se použije. Tedy nastavením proměnné v souboru /etc/apt/apt.conf
   přepíšete implicitní hodnoty programu, ale neovlivníte uživatelovo
   nastavení v ~/.aptitude/config.

    Dostupné konfigurační volby

   Následujícími konfiguračními volbami můžete ovlivnit vzhled a chování
   aptitude. Nastavení souvisejících programů naleznete v jejich manuálových
   stránkách (např. volby systému apt jsou popsány v apt(8) a apt.conf(5)).

   Volba: Apt::Install-Recommends
   Implicitní hodnota: true
   Popis: Pokud mají tato volba a volba Aptitude::Auto-Install zároveň
   hodnotu true, pak označením balíku k instalaci se automaticky označí k
   instalaci i balíky, které instalovaný balík doporučuje. Hodnota true dále
   zajistí, že balíky budou nainstalovány po celou dobu, kdy je doporučuje
   některý z instalovaných balíků (nebudou automaticky odstraněny). Pro více
   informací se podívejte na část „Správa automaticky instalovaných balíků“.
   Volba: Aptitude::Allow-Null-Upgrade
   Implicitní hodnota: false
   Popis: Když spustíte instalaci balíků a nejsou naplánovány žádné akce,
   aptitude zobrazí varování a vrátí se do seznamu balíků. Pokud má volba
   hodnotu true, aptitude bude místo zmíněné hlášky pokračovat jako obvykle a
   zobrazí (prázdný) přehled před instalací.
   Volba: Aptitude::Always-Use-Safe-Resolver
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, budou akce v příkazovém režimu aptitude
   vždy používat „bezpečný“ řešitel závislostí, jako kdyby byla na příkazovém
   řádku zadána volba --safe-resolver.
   Volba: Aptitude::Autoclean-After-Update
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, aptitude při každé aktualizaci seznamu
   balíků vymaže zastaralé soubory (viz Akce → Vyčistit staré soubory).
   Volba: Aptitude::Auto-Install
   Implicitní hodnota: true
   Popis: Má-li volba hodnotu true, aptitude se bude snažit automaticky
   vyplnit závislosti balíků.
   Volba: Aptitude::Auto-Fix-Broken
   Implicitní hodnota: true
   Popis: Má-li volba hodnotu false, aptitude se před pokusem o opravu
   poškozených balíků zeptá na svolení.
   Volba: Aptitude::Auto-Upgrade
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, aptitude při startu programu automaticky
   označí všechny aktualizovatelné balíky. (Stejně jako byste ručně spustili
   Akce → Označit aktualizovatelné (U).)
   Volba: Aptitude::CmdLine::Always-Prompt
   Implicitní hodnota: false
   Popis: Pokud je tato volba nastavena, aptitude se bude v příkazovém režimu
   ptát před každou instalací nebo odstraněním, i když by se normálně
   neptala. Toto chování odpovídá parametru -P na příkazovém řádku.
   Volba: Aptitude::CmdLine::Assume-Yes
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, aptitude se bude v příkazovém režimu
   chovat, jako by uživatel na každou otázku odpověděl „ano“. Sníží se tak
   počet dotazů, které musíte odpovědět. To je ekvivalentní s parametrem -y
   na příkazovém řádku.
   Volba: Aptitude::CmdLine::Disable-Columns
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, nebude aptitude při hledání v příkazovém
   režimu (aptitude search) formátovat výstup do sloupců s pevnou šířkou a
   nebude výstup ořezávat na velikost obrazovky. To je ekvivalentní s
   parametrem --disable-columns na příkazovém řádku.
   Volba: Aptitude::CmdLine::Download-Only
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, aptitude v příkazovém režimu stáhne
   soubory s balíky, ale nenainstaluje je. To odpovídá parametru -d na
   příkazovém řádku.
   Volba: Aptitude::CmdLine::Fix-Broken
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, aptitude se bude v příkazovém režimu
   chovat mnohem agresivněji při pokusu o napravení závislostí poškozených
   balíků. To je ekvivalentní k parametru -f na příkazovém řádku.
   Volba: Aptitude::CmdLine::Ignore-Trust-Violations
   Implicitní hodnota: false
   Popis: Způsobí, že aptitude bude v příkazovém režimu ignorovat instalaci
   nedůvěryhodných balíků. Jedná se o synonymum k
   Apt::Get::AllowUnauthenticated.
   Volba: Aptitude::CmdLine::Package-Display-Format
   Implicitní hodnota: %c%a%M %p# - %d#
   Popis: Toto je formátovací řetězec (viz „Přizpůsobení zobrazení balíků“,
   který se používá pro zobrazení výsledků hledání v příkazovém režimu. To je
   ekvivalentní k parametru -F na příkazovém řádku.
   Volba: Aptitude::CmdLine::Package-Display-Width
   Implicitní hodnota:
   Popis: Tato volba určuje, jak široký má být výstup příkazu pro hledání.
   Pokud je hodnota prázdná (tj. ""), výsledky budou formátovány buď na šířku
   terminálu, nebo na 80 znaků (to v případě, že se nepodaří zjistit velikost
   terminálu).
   Volba: Aptitude::CmdLine::Request-Strictness
   Implicitní hodnota: 10000
   Popis: Pokud se v příkazovém režimu vyskytnou problémy se závislostmi,
   aptitude přidá tuto hodnotu k celkovému skóre každé akce, kterou si v
   řešiteli závislostí explicitně vyžádáte.
   Volba: Aptitude::CmdLine::Resolver-Debug
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, aptitude bude v příkazovém režimu při
   pokusu o vyřešení porušených závislostí obzvláště upovídaná. Jak název
   napovídá, tato volba je zamýšlena pro vývojáře, kteří chtějí pomoci s
   laděním řešitele závislostí.
   Volba: Aptitude::CmdLine::Resolver-Dump
   Implicitní hodnota:
   Popis: Pokud je v příkazovém režimu nutné vyřešit porušené závislosti a
   je-li v této volbě nastaveno jméno zapisovatelného souboru, aptitude do
   něj před započetím každého výpočtu zapíše stav řešitele.
   Volba: Aptitude::CmdLine::Resolver-Show-Steps
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, bude řešení závislostí v příkazovém
   režimu zobrazeno jako sekvence řešení jednotlivých závislostí. Například
   „wesnoth závisí na wesnoth-data (=1.2.4-1) -> instaluji wesnoth-data
   1.2.4-1 (unstable)“. Pro interaktivní přepínání mezi oběma zobrazeními
   můžete na výzvě „Přijmout toto řešení?“ použít klávesu o.
   Volba: Aptitude::CmdLine::Safe-Upgrade::No-New-Installs
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, nebude se v příkazovém režimu příkaz
   safe-upgrade pokoušet vyřešit závislosti instalací nových balíků. Jinými
   slovy, pokud by aktualizace balíku A vyžadovala instalaci balíku B, balík
   A by se neaktualizoval. To odpovídá parametru --no-new-installs na
   příkazovém řádku.
   Volba: Aptitude::CmdLine::Show-Deps
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, aptitude v příkazovém režimu zobrazí
   stručný přehled závislostí (pokud existují). To odpovídá parametru -D na
   příkazovém řádku.
   Volba: Aptitude::CmdLine::Show-Size-Changes
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, aptitude v příkazovém režimu zobrazí u
   každého balíku očekávané změny v použitém místě. To odpovídá parametru -Z
   na příkazovém řádku.
   Volba: Aptitude::CmdLine::Show-Versions
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, aptitude v příkazovém režimu zobrazí
   verzi balíku, která se bude instalovat, nebo bude odstraněna. To odpovídá
   parametru -V na příkazovém řádku.
   Volba: Aptitude::CmdLine::Show-Why
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, aptitude v příkazovém režimu zobrazí
   ručně instalované balíky, které vyžadují automaticky instalované balíky,
   případně ručně instalované balíky, které způsobují konflikt s nějakým
   automaticky odstraněným balíkem. To odpovídá parametru -W na příkazovém
   řádku. Používá se stejné zobrazení, jako u příkazu aptitude why.
   Volba: Aptitude::Safe-Resolver::No-New-Installs
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true a je-li aktivován „bezpečný“ řešitel
   závislostí parametrem --safe-resolver, nebude řešiteli umožněno instalovat
   nové balíky. To je podobné volbě
   Aptitude::CmdLine::Safe-Upgrade::No-New-Installs, ovšem vztahuje se pouze
   na jiné příkazy příkazové řádky, než je safe-upgrade.
   Volba: Aptitude::Safe-Resolver::No-New-Upgrades
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true a je-li aktivován „bezpečný“ řešitel
   závislostí parametrem --safe-resolver, nebude řešiteli umožněno řešit
   závislosti aktualizací balíků.
   Volba: Aptitude::CmdLine::Simulate
   Implicitní hodnota: false
   Popis: Tato volba je zastaralá, použijte místo ní Aptitude::Simulate. V
   příkazovém režimu způsobí, že se pouze naznačí akce, které by se normálně
   provedly. V celoobrazovkovém režimu spustí aptitude v režimu pouze pro
   čtení bez ohledu na to, zda máte rootovská oprávnění. To odpovídá
   parametru -s na příkazovém řádku.
   Volba: Aptitude::CmdLine::Verbose
   Implicitní hodnota: 0
   Popis: Tímto řídíte, jak upovídaný je příkazový režim aptitude. Každý
   výskyt argumentu -v na příkazovém řádku přidá k této proměnné hodnotu 1.
   Volba: Aptitude::CmdLine::Visual-Preview
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, aptitude zobrazí přehled před instalací
   ve vizuálním režimu.
   Volba: Aptitude::Debtags-Binary
   Implicitní hodnota: /usr/bin/debtags
   Popis: Absolutní cesta k programu debtags. Pokud je aptitude sestavena s
   podporou libept, bude tento program volat při každé aktualizaci seznamu
   balíků a předá mu parametry nastavené v Aptitude::Debtags-Update-Options.
   Volba: Aptitude::Debtags-Update-Options
   Implicitní hodnota: --local
   Popis: Dodatečné parametry, které se mají přidat k příkazu debtags update
   (příkaz se volá po aktualizaci seznamu balíků). Jednotlivé parametry jsou
   odděleny „bílými znaky“. Pokud potřebujete předat nějakou hodnotu, ve
   které se vyskytuje mezera, jako jeden řetězec, můžete ji obklopit
   apostrofy, nebo uvozovkami. Například pokud tuto volbu nastavíte na
   hodnotu „--vocabulary='/soubor s mezerou'“, uloží se slovník debtags
   opravdu do souboru „/soubor s mezerou“.
   Volba: Aptitude::Delete-Unused
   Implicitní hodnota: true
   Popis: Má-li volba hodnotu true, pak automaticky nainstalované balíky,
   které již nejsou potřeba, budou automaticky odstraněny. Více se o této
   vlastnosti dozvíte v části „Správa automaticky instalovaných balíků“.
   Volba: Aptitude::Delete-Unused-Pattern
   Implicitní hodnota:
   Popis: Zastaralý alias pro Aptitude::Keep-Unused-Pattern. Kvůli zpětné
   kompatibilitě se tato volba použije v případech, kdy není volba
   Aptitude::Keep-Unused-Pattern nastavena, nebo kdy má prázdnou hodnotu.
   Jinak je volba Aptitude::Delete-Unused-Pattern ignorována.
   Volba: Aptitude::Display-Planned-Action
   Implicitní hodnota: true
   Popis: Pokud má tato volba hodnotu true, aptitude před samotným provedením
   akcí zobrazí obrazovku se souhrnem změn.
   Volba: Aptitude::Forget-New-On-Install
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, aptitude při každé instalaci, aktualizaci
   nebo odstranění zapomene, které balíky byly nové (jako kdybyste ručně
   spustili příkaz Akce → Zapomenout nové balíky (f).
   Volba: Aptitude::Forget-New-On-Update
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, aptitude při každé aktualizaci seznamu
   balíků zapomene, které balíky byly nové (jako kdybyste ručně spustili
   příkaz Akce → Zapomenout nové balíky (f).
   Volba: Aptitude::Get-Root-Command
   Implicitní hodnota: su:/usr/bin/su
   Popis: Tato volba určuje externí příkaz, který aptitude použije pro
   získání rootovských oprávnění (viz kapitola „Přepnutí na uživatele root“).
   Syntaxe je protokol:příkaz. Protokol určuje, jakým způsobem aptitude
   vyvolá příkaz. V současnosti jsou možné hodnoty su a sudo. Použijete-li
   jako protokol su, zavolá se příkaz pro získání rootovských oprávnění
   následovně: příkaz -c argumenty. Ve druhém případě bude volání vypadat
   následovně: příkaz argumenty. První slovo v příkazu je jméno programu,
   který se má spustit, zbývající slova jsou brána jako argumenty daného
   programu.
   Volba: Aptitude::Ignore-Recommends-Important
   Implicitní hodnota: false
   Popis: Tato volba pomáhá k migraci ze starší volby
   Aptitude::Recommends-Important na novější Apt::Install-Recommends. V
   předchozích verzích aptitude způsobovalo nastavení
   Aptitude::Recommends-Important to stejné, co nyní dělá volba
   Apt::Install-Recommends, a sice, že se doporučené balíky instalují
   automaticky. Pokud mají tato volba a volba Aptitude::Recommends-Important
   zároveň hodnotu false, nastaví aptitude při příštím startu volbu
   Apt::Install-Recommends na hodnotu false a volbu
   Aptitude::Ignore-Recommends-Important na hodnotu true.
   Volba: Aptitude::Ignore-Old-Tmp
   Implicitní hodnota: false
   Popis: Starší verze aptitude vytvářely adresář ~/.aptitude/.tmp, který již
   není potřeba. Pokud adresář existuje a Aptitude::Ignore-Old-Tmp má hodnotu
   true, aptitude se zeptá, zda má tento adresář odstranit. Po vaší odpovědi
   je tato volba automaticky nastavena na hodnotu true. Na druhou stranu,
   pokud adresář neexistuje, nastaví se hodnota na false, což zajistí, že
   budete varováni okamžitě, když by se tento adresář objevil.
   Volba: Aptitude::Keep-Recommends
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, budou balíky ponechány v systému tak
   dlouho, dokud je bude doporučovat některý z instalovaných balíků. A to i v
   případě, že má volba Apt::Install-Recommends hodnotu false. Více se o
   automatickém odstraňování dozvíte v části „Správa automaticky
   instalovaných balíků“.
   Volba: Aptitude::Keep-Suggests
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, aptitude se nebude snažit automaticky
   odstranit instalované balíky, které jiný instalovaný balík navrhuje. Více
   se o automatickém odstraňování dozvíte v části „Správa automaticky
   instalovaných balíků“.
   Volba: Aptitude::Keep-Unused-Pattern
   Implicitní hodnota:
   Popis: Má-li volba Aptitude::Delete-Unused hodnotu true, budou odstraněny
   pouze balíky neodpovídající tomuto vzoru (viz „Vyhledávací vzory“). Pokud
   zde ponecháte prázdný řetězec, budou odstraněny všechny nevyužité balíky.
   Volba: Aptitude::LockFile
   Implicitní hodnota: /var/lock/aptitude
   Popis: Jméno souboru, který bude uzamčen pomocí fnctl, aby se zajistilo,
   že cache balíků může v daný okamžik upravovat nejvýše jeden proces
   aptitude. Za běžných okolností byste neměli mít potřebu tuto hodnotu
   měnit; je užitečná pro ladění. Poznámka: Pokud si aptitude stěžuje, že
   nemůže získat zámek, není to tím, že je potřeba smazat tento soubor. fnctl
   zámky jsou spravovány jádrem a budou smazány při ukončení programu, který
   je vytvořil. To, že aptitude nemůže získat zámek znamená, že jej používá
   jiná běžící instance!
   Volba: Aptitude::Log
   Implicitní hodnota: /var/log/aptitude
   Popis: Pokud je tato proměnná nastavená na neprázdný řetězec, aptitude
   bude zaznamenávat všechny prováděné akce do tohoto souboru. Pokud hodnota
   proměnné Aptitude::Log začíná znakem roury („|“), bude zbytek hodnoty
   považován za název programu, kterému se má záznam akcí předat. Například
   hodnota |mail -s "Instalace z Aptitude" root způsobí, že záznamy o
   instalaci budou zaslány elektronickou poštou uživateli root. Záznamy
   můžete ukládat i na více míst zároveň, stačí je zadat jako seznam cílů.
   Volba: Aptitude::Parse-Description-Bullets
   Implicitní hodnota: true
   Popis: Je-li tato proměnná povolena, aptitude se pokusí automaticky
   rozpoznat v popisech balíků odrážkové seznamy. To obvykle zlepší zobrazení
   popisů, avšak není úplně zpětně kompatibilní. Některé popisy mohou být
   zobrazeny lépe, pokud má proměnná hodnotu false.
   Volba: Aptitude::Pkg-Display-Limit
   Implicitní hodnota:
   Popis: Implicitní filtr aplikovaný na seznam balíků. Podrobnosti o syntaxi
   naleznete v „Vyhledávací vzory“.
   Volba: Aptitude::ProblemResolver::Allow-Break-Holds
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, řešitel bude při řešení závislostí
   zvažovat i řešení, která instalují zakázané verze nebo která mění stav
   podržených balíků. Při nastavení na hodnotu false budou takováto řešení
   okamžitě zamítnuta, ačkoliv to můžete ručně změnit (viz „Řešení problémů
   se závislostmi“).
   Volba: Aptitude::Preview-Limit
   Implicitní hodnota:
   Popis: Implicitní filtr aplikovaný na souhrn před instalací. Podrobnosti o
   formátu filtru se dozvíte v „Vyhledávací vzory“.
   Volba: Aptitude::ProblemResolver::BreakHoldScore
   Implicitní hodnota: -300
   Popis: Jak moc odměnit nebo potrestat navrhovaná řešení, která změní stav
   podrženého balíku nebo nainstalují zakázanou verzi. Pokud není volba
   Aptitude::ProblemResolver::Allow-Break-Holds nastavena na hodnotu true,
   bude řešitel takováto řešení stejně ignorovat (pokud nedostane přímý
   příkaz od uživatele).
   Volba: Aptitude::ProblemResolver::BrokenScore
   Implicitní hodnota: -100
   Popis: Jak moc odměnit nebo potrestat navrhovaná řešení za počet
   závislostí, které poruší. Za každou porušenou závislost se k celkovému
   skóre přičte tato hodnota. Obvykle by to mělo být záporné číslo.
   Volba: Aptitude::ProblemResolver::Discard-Null-Solution
   Implicitní hodnota: true
   Popis: Má-li volba hodnotu true, aptitude se nikdy nebude snažit vyřešit
   problémy se závislostmi tak, že by navrhla zrušení všech vašich
   navrhovaných akcí. (Což je obvykle první věc, kterou navrhne.)
   Volba: Aptitude::ProblemResolver::EssentialRemoveScore
   Implicitní hodnota: -100000
   Popis: Jak moc odměnit nebo potrestat navrhovaná řešení, která odstraní
   Nezbytný balík.
   Volba: Aptitude::ProblemResolver::ExtraScore
   Implicitní hodnota: -1
   Popis: Každé verzi balíku s prioritou „extra“ se k celkovému skóre přičte
   tato hodnota.
   Volba: Aptitude::ProblemResolver::FullReplacementScore
   Implicitní hodnota: 500
   Popis: Jak moc odměnit nebo potrestat navrhovaná řešení, která odstraní
   balík, ale nainstalují jeho plnou náhradu (tj. nový balík je s původním v
   konfliktu, nahrazuje jej a poskytuje jej).
   Volba: Aptitude::ProblemResolver::ImportantScore
   Implicitní hodnota: 5
   Popis: Každé verzi balíku s prioritou „důležité“ se k celkovému skóre
   přičte tato hodnota.
   Volba: Aptitude::ProblemResolver::Infinity
   Implicitní hodnota: 1000000
   Popis: „Maximální“ dosažitelné skóre potenciálních řešení. Pokud bude mít
   některá množina navrhovaných akcí horší skóre než -Infinity, bude okamžitě
   zavrhnuta.
   Volba: Aptitude::ProblemResolver::InstallScore
   Implicitní hodnota: -20
   Popis: Jakou váhu má řešitel závislostí přikládat instalaci balíku, který
   doposud nebyl vybrán pro instalaci.
   Volba: Aptitude::ProblemResolver::KeepScore
   Implicitní hodnota: 0
   Popis: Jakou váhu má řešitel závislostí přikládat ponechání balíku v
   aktuálním stavu, který doposud neměl být ponechán v aktuálním stavu.
   Volba: Aptitude::ProblemResolver::Max-Successors
   Implicitní hodnota: 0
   Popis: Tato hodnota určuje, jak dlouho může trvat hledání nových řešení.
   Následníci jsou generováni v nespojitých svazcích a v okamžiku, kdy byl
   vygenerován nejméně jeden a nejvýše Max-Successors uzlů, generování končí.
   Zvýšením této hodnoty zajistíte, že několik prvních řešení bude mít vyšší
   skóre, ale na druhou stranu to znamená, že každý „krok“ řešitele bude
   trvat déle.
   Volba: Aptitude::ProblemResolver::NonDefaultScore
   Implicitní hodnota: -40
   Popis: Jakou váhu má řešitel závislostí přikládat instalaci nestandardní
   verze balíku. (Nestandardní verzí se myslí jiná verze než aktuální nebo
   kandidátská.)
   Volba: Aptitude::ProblemResolver::OptionalScore
   Implicitní hodnota: 1
   Popis: Každé verzi balíku s prioritou „volitelné“ se k celkovému skóre
   přičte tato hodnota.
   Volba: Aptitude::ProblemResolver::PreserveAutoScore
   Implicitní hodnota: 0
   Popis: Jakou váhu má řešitel závislostí přikládat zachování automatických
   instalací nebo odstranění.
   Volba: Aptitude::ProblemResolver::PreserveManualScore
   Implicitní hodnota: 60
   Popis: Jakou váhu má řešitel závislostí přikládat zachování akcí
   vyžádaných uživatelem.
   Volba: Aptitude::ProblemResolver::RemoveScore
   Implicitní hodnota: -300
   Popis: Jakou váhu má řešitel závislostí přikládat odstranění balíku, který
   doposud nebyl označen pro odstranění.
   Volba: Aptitude::ProblemResolver::RequiredScore
   Implicitní hodnota: 4
   Popis: Každé verzi balíku s prioritou „vyžadované“ se k celkovému skóre
   přičte tato hodnota.
   Volba: Aptitude::ProblemResolver::ResolutionScore
   Implicitní hodnota: 50
   Popis: Kromě všech ostatních bodovacích kritérií budou touto hodnotou
   odměněna všechna řešení, která vyřeší všechny nesplněné závislosti.
   Volba: Aptitude::ProblemResolver::StandardScore
   Implicitní hodnota: 3
   Popis: Každé verzi balíku s prioritou „standardní“ se k celkovému skóre
   přičte tato hodnota.
   Volba: Aptitude::ProblemResolver::StepLimit
   Implicitní hodnota: 5000
   Popis: Maximální počet kroků, které má řešitel závislostí podniknout při
   každém pokusu o nalezení řešení závislostního problému. Snížením této
   hodnoty způsobíte, že se řešitel „vzdá“ dříve, zvýšením mu dovolíte hledat
   důkladněji, což spotřebuje více procesorového času a operační paměti.
   Hodnotou 0 řešitele závislostí zcela zakážete. Výchozí hodnota je
   dostatečně velká pro to, aby uspokojivě řešila nejběžnější problémy a
   přitom „neshodila“ program, pokud se objeví extrémně obtížný problém.
   (Poznámka: týká se pouze příkazové řádky. V celoobrazovkovém režimu bude
   řešitel hledat tak dlouho, dokud nenalezne řešení.)
   Volba: Aptitude::ProblemResolver::StepScore
   Implicitní hodnota: 70
   Popis: Jak moc odměnit nebo potrestat navrhovaná řešení na základě jejich
   délky. Za každou vykonanou akci se k celkovému skóre přičte tato hodnota.
   Čím je hodnota větší, tím více se řešitel snaží držet první volby a
   nezvažovat alternativy, což vede k rychlejšímu řešení za cenu mírně horší
   kvality.
   Volba: Aptitude::ProblemResolver::Trace-Directory
   Implicitní hodnota:
   Popis: Pokaždé, když řešitel závislostí dojde k řešení, zapíše si do
   souboru stav balíků v ořezané podobě tak, aby z něj bylo možno dané řešení
   reprodukovat. Je-li nastavena také volba
   Aptitude::ProblemResolver::Trace-File, zapíše se stejná informace i do
   sledovacího souboru. Sledovací adresáře jsou transparentnější než
   sledovací soubory a jsou mnohem vhodnější např. pro automatizované testy.
   Volba: Aptitude::ProblemResolver::Trace-File
   Implicitní hodnota:
   Popis: Pokaždé, když řešitel závislostí dojde k řešení, zapíše si do
   zadaného souboru stav balíků v ořezané podobě tak, aby z něj bylo možno
   dané řešení reprodukovat. Je-li nastavena také volba
   Aptitude::ProblemResolver::Trace-Directory, zapíše se stejná informace i
   do sledovacího adresáře. Sledovací soubor je jednoduše komprimovaný archiv
   sledovacího adresáře. Zabírá méně místa a je vhodnější pro přenos po síti.
   Volba: Aptitude::ProblemResolver::UndoFullReplacementScore
   Implicitní hodnota: -500
   Popis: Jak moc odměnit nebo potrestat navrhovaná řešení, která nainstalují
   balík a odstraní jiný balík, který jej plně nahrazoval (tj. původní balík
   je s novým v konfliktu, nahrazuje jej a poskytuje jej).
   Volba: Aptitude::ProblemResolver::UnfixedSoftScore
   Implicitní hodnota: -200
   Popis: Jak moc odměnit nebo potrestat navrhovaná řešení, která ponechají
   nevyřešenu závislost typu Doporučuje. Tato hodnota by obvykle měla být
   nižší než RemoveScore, protože jinak by aptitude balík raději odstranila,
   než aby jej ponechala bez splněného Doporučení. Podrobnosti naleznete v
   „Řešení problémů se závislostmi“.
   Volba: Aptitude::ProblemResolver::UpgradeScore
   Implicitní hodnota: 0
   Popis: Jakou váhu má řešitel závislostí přikládat aktualizaci (nebo
   degradaci) balíku, který doposud nebyl označen pro aktualizaci.
   Volba: Aptitude::ProblemResolver::WaitSteps
   Implicitní hodnota: 50
   Popis: Počet kroků, které může řešitel vykonat na popředí, než se přesune
   do vlákna běžícího na pozadí. Během výpočtů na popředí nebude aptitude
   odpovídat na uživatelské podněty. Snížením této hodnoty se stane program
   interaktivnější, avšak zase se může zbytečně zobrazit indikátor postupu.
   Volba: Aptitude::Purge-Unused
   Implicitní hodnota: false
   Popis: Pokud mají tato volba a volba Aptitude::Delete-Unused zároveň
   hodnotu true, budou nepoužívané balíky ze systému automaticky vyčištěny,
   což odstraní jejich konfigurační soubory a možná také důležitá data. O
   tom, které balíky jsou považovány za „nepoužívané“, se dozvíte v „Správa
   automaticky instalovaných balíků“. TATO VOLBA MŮŽE ZPŮSOBIT ZTRÁTU DAT!
   POKUD PŘESNĚ NEVÍTE, CO DĚLÁTE, NEZAPÍNEJTE JI!
   Volba: Aptitude::Recommends-Important
   Implicitní hodnota: true
   Popis: Toto je zastaralá volba, která byla nahrazena volbou
   Apt::Install-Recommends. aptitude při startu zkopíruje ve vašem
   konfiguračním souboru Aptitude::Recommends-Important (pokud existuje) do
   Apt::Install-Recommends a poté Aptitude::Recommends-Important vyčistí.
   Volba: Aptitude::Sections::Top-Sections
   Implicitní hodnota: "main"; "contrib"; "non-free"; "non-US";
   Popis: Konfigurační skupina, jejíž prvky tvoří jména sekcí nejvyšší
   úrovně. Shlukovací pravidla „topdir“, „subdir“ a „subdirs“ používají tento
   seznam pro interpretaci polí Sekce. Není-li první část pole Sekce obsažena
   v tomto seznamu, nebo pokud Sekce obsahuje pouze jednu část, pak se balíky
   seskupí pod první prvek seznamu.
   Volba: Aptitude::Sections::Descriptions
   Implicitní hodnota: Viz $prefix/share/aptitude/section-descriptions
   Popis: Konfigurační skupina, jejíž prvky tvoří popisy jednotlivých sekcí,
   které se zobrazí při použití shlukovacího pravidla „section“. Popisy se
   přiřazují do stromu sekcí podle poslední části názvu sekce. Například
   prvek skupiny nazvané „games“ se použije pro popis sekcí „games“,
   „non-free/games“ a „non-free/desktop/games“. Při zobrazení popisů sekcí se
   nahradí řetězec „\n“ za nový řádek a řetězec „''“ za znak uvozovek.
   Volba: Aptitude::Simulate
   Implicitní hodnota: false
   Popis: V příkazovém režimu způsobí, že aptitude pouze zobrazí akce, které
   by se provedly, ale ve skutečnosti je neprovede. V celoobrazovkovém režimu
   způsobí nastartování do režimu pouze pro čtení bez ohledu na fakt, zda
   máte rootovská oprávnění. To odpovídá parametru -s na příkazovém řádku.
   Volba: Aptitude::Spin-Interval
   Implicitní hodnota: 500
   Popis: Počet milisekund mezi aktualizacemi „třpytky“, která se zobrazuje
   zatímco řešitel přemýšlí.
   Volba: Aptitude::Suggests-Important
   Implicitní hodnota: false
   Popis: Toto je zastaralá volba. Místo ní použijte volbu
   Aptitude::Keep-Suggests. Nastavením této volby na hodnotu true dosáhnete
   stejného výsledku jako u volby Aptitude::Keep-Suggests.
   Volba: Aptitude::Suppress-Read-Only-Warning
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu false a vy se pokusíte změnit stav balíků
   zatímco se program nachází v režimu pouze pro čtení, tak aptitude zobrazí
   varování.
   Volba: Aptitude::Theme
   Implicitní hodnota:
   Popis: Téma, které má aptitude použít. Více viz „Témata“.
   Volba: Aptitude::Track-Dselect-State
   Implicitní hodnota: true
   Popis: Má-li volba hodnotu true, aptitude se pokusí rozpoznat, pokud se
   stav balíku změní externě programy dselect nebo dpkg. Například pokud
   odstraníte balík programem dpkg, aptitude se jej nebude snažit
   reinstalovat. Poznamenejme, že se na tuto vlastnost nedá stoprocentně
   spolehnout.
   Volba: Aptitude::UI::Advance-On-Action
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, aptitude se po změně stavu balíku
   (například označení pro instalaci) posune na další balík v seznamu.
   Volba: Aptitude::UI::Auto-Show-Reasons
   Implicitní hodnota: true
   Popis: Má-li volba hodnotu true, pak se výběrem porušeného balíku, nebo
   balíku, který působí problémy ostatním balíkům, v informační oblasti
   automaticky zobrazí důvody, proč k tomu dochází.
   Volba: Aptitude::UI::Default-Package-View
   Implicitní hodnota:
   Popis: Členy této skupiny definují rozložení prvků uživatelského rozhraní
   na obrazovce. Více se dozvíte v kapitole „Přizpůsobení rozložení
   obrazovky“.
   Volba: Aptitude::UI::Default-Grouping
   Implicitní hodnota:
   filter(missing),status,section(subdirs,passthrough),section(topdir)
   Popis: Nastaví implicitní shlukovací pravidla pro seznamu balíků.
   Informace o shlukovacích pravidlech naleznete v kapitole „Přizpůsobení
   hierarchie balíků“.
   Volba: Aptitude::UI::Default-Preview-Grouping
   Implicitní hodnota: action
   Popis: Nastaví implicitní shlukovací pravidla pro přehledy. Informace o
   shlukovacích pravidlech naleznete v kapitole „Přizpůsobení hierarchie
   balíků“.
   Volba: Aptitude::UI::Default-Sorting
   Implicitní hodnota: name
   Popis: Nastaví implicitní řadící pravidla pro seznamy balíků. Více
   informací naleznete v „Změna řazení balíků“.
   Volba: Aptitude::UI::Description-Visible-By-Default
   Implicitní hodnota: true
   Popis: Když je seznam balíků zobrazen poprvé, jeho informační oblast bude
   zobrazena nebo skryta podle toho, zda má tato volba hodnotu true nebo
   false.
   Volba: Aptitude::UI::Exit-On-Last-Close
   Implicitní hodnota: true
   Popis: Má-li volba hodnotu true, způsobí zavření posledního pohledu také
   ukončení aptitude. V opačném případě budete muset aptitude ukončovat
   příkazem Akce → Konec (Q). Více informací o pohledech hledejte v kapitole
   „Práce s několika pohledy“.
   Volba: Aptitude::UI::Fill-Text
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, aptitude bude formátovat popisy tak, aby
   byla každá řádka široká přesně podle šířky obrazovky.
   Volba: Aptitude::UI::HelpBar
   Implicitní hodnota: true
   Popis: Má-li volba hodnotu true, bude se nahoře na obrazovce zobrazovat
   nápověda s důležitými klávesovými zkratkami.
   Volba: Aptitude::UI::Incremental-Search
   Implicitní hodnota: true
   Popis: Má-li volba hodnotu true, aptitude bude hledat „přírůstkově“. To
   znamená, že bude hledat další shodu po každém stisknutí klávesy (po
   napsání/smazání dalšího hledaného znaku).
   Volba: Aptitude::UI::InfoAreaTabs
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, aptitude bude nad informační oblastí
   zobrazovat pruh se záložkami popisujícími různé režimy, které může
   informační oblast zobrazit.
   Volba: Aptitude::UI::Keybindings
   Implicitní hodnota:
   Popis: Členy této skupiny vytvářejí spojení mezi příkazy a klávesovými
   zkratkami. Více se dozvíte v kapitole „Přizpůsobení klávesových zkratek“.
   Volba: Aptitude::UI::Menubar-Autohide
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, bude hlavní menu skryté a objeví se pouze
   při aktivování.
   Volba: Aptitude::UI::Minibuf-Download-Bar
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, aptitude použije méně rušivý způsob
   zobrazení postupu stahování. Na spodní části obrazovky se objeví řádek,
   který informuje o aktuálním stavu stahování. Stahování můžete přerušit
   klávesou q.
   Volba: Aptitude::UI::Minibuf-Prompts
   Implicitní hodnota: false
   Popis: Má-li volba hodnotu true, nezobrazí se většina výzev v dialogovém
   okně, ale ve stavovém řádku.
   Volba: Aptitude::UI::New-Package-Commands
   Implicitní hodnota: true
   Popis: Má-li volba hodnotu false, budou se některé příkazy (např. Balík →
   Instalovat (+)) chovat jako v dřevních dobách aptitude.
   Volba: Aptitude::UI::Package-Display-Format
   Implicitní hodnota: %c%a%M %p %Z %v %V
   Popis: Tato volba určuje formát řetězce, kterým se zobrazí položky v
   seznamu balíků. Podrobnosti o formátovacích řetězcích naleznete v
   „Přizpůsobení zobrazení balíků“.
   Volba: Aptitude::UI::Package-Header-Format
   Implicitní hodnota: %N %n #%B %u %o
   Popis: Tato volba určuje formát řetězce, který se zobrazí v záhlaví
   seznamu balíků (tj. v řádku mezi menu a seznamem balíků). Podrobnosti o
   formátovacích řetězcích naleznete v „Přizpůsobení zobrazení balíků“.
   Volba: Aptitude::UI::Package-Status-Format
   Implicitní hodnota: %d
   Popis: Tato volba určuje formát řetězce, který se zobrazí ve stavovém
   řádku seznamu balíků (tj. v řádku mezi seznamem balíků a informační
   oblastí). Podrobnosti o formátovacích řetězcích naleznete v „Přizpůsobení
   zobrazení balíků“.
   Volba: Aptitude::UI::Pause-After-Download
   Implicitní hodnota: OnlyIfError
   Popis: Má-li volba hodnotu true, aptitude se po stažení balíků zeptá, zda
   chcete začít s instalací. Při výchozím nastavení OnlyIfError se dotaz
   zobrazí pouze v případě, že stažení selhalo. Ve zbývajícím případě, tj.
   při hodnotě false, se aptitude na nic neptá a po stažení balíků přejde
   rovnou na následující obrazovku.
   Volba: Aptitude::UI::Prompt-On-Exit
   Implicitní hodnota: true
   Popis: Má-li volba hodnotu true, aptitude se před ukončením zeptá, zda
   chcete program opravdu ukončit.
   Volba: Aptitude::UI::Styles
   Implicitní hodnota:
   Popis: Členy této skupiny definují textové styly (mj. barevné schéma),
   které aptitude používá pro zobrazení informací. Více se dozvíte v kapitole
   „Přizpůsobení barvy textu a úprava stylů“.
   Volba: Aptitude::UI::ViewTabs
   Implicitní hodnota: true
   Popis: Má-li volba hodnotu false, aptitude nezobrazí v horní části
   obrazovky pruh se seznamem aktuálně otevřených oken.
   Volba: Aptitude::Warn-Not-Root
   Implicitní hodnota: true
   Popis: Má-li volba hodnotu true, aptitude bude sledovat, zda pro danou
   akci nepotřebujete práva uživatele root a pokud ano, zeptá se, zda se
   chcete na tento účet přepnout. Pokud již práva roota máte, aptitude se
   samozřejmě na nic ptát nebude. Pro více informací viz část „Přepnutí na
   uživatele root“.
   Volba: DebTags::Vocabulary
   Implicitní hodnota: /usr/share/debtags/vocabulary
   Popis: Umístění slovníku debtags, ve kterém jsou uložena metadata značek.
   Volba: Dir::Aptitude::state
   Implicitní hodnota: /var/lib/aptitude
   Popis: Adresář, do kterého se ukládají perzistentní informace o stavu
   balíků.
   Volba: Quiet
   Implicitní hodnota: 0
   Popis: Tato hodnota určuje míru mlčenlivosti příkazového režimu.
   Nastavením vyšší hodnoty zakážete více výstupu (obzvláště indikátory
   postupu).

  Témata

   Téma v aptitude jednoduše znamená souhrn nastavení, která spolu „sedí“.
   Témata pracují tak, že přepíší implicitní hodnoty nastavení. Pokud volba
   není nastavena v systémovém nebo uživatelském konfiguračním souboru,
   aptitude nejprve zkusí použít nastavení z vybraného tématu a teprve pokud
   neuspěje, použije implicitní hodnotu.

   Téma není nic jiného, než pojmenovaná skupina v Aptitude::Themes. Každá
   konfigurační položka ve skupině přebije odpovídající globální nastavení.
   Například pokud vyberete téma Dselect, přebije položka
   Aptitude::Themes::Dselect::Aptitude::UI::Package-Display-Format globální
   položku Aptitude::UI::Package-Display-Format.

   Pro výběr tématu nastavte konfigurační položku Aptitude::Theme na jméno
   zvoleného tématu, například:

 Aptitude::Theme Vertical-Split;

   S aptitude se standardně dodávají následující témata (uložená v souboru
   /usr/share/aptitude/aptitude-defaults):

   Dselect

           Toto téma se snaží upravit aptitude, aby se co nejvíce chovala a
           vypadala jako klasický správce balíků - dselect:

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
 --\ Instalované balíky
   --\ Priorita required
     --\ base - Základní systém Debianu
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

           Toto téma mění rozložení obrazovky. Informační panel pod seznamem
           balíků se přesunul napravo od tohoto seznamu. To je výhodné při
           použití širokého terminálu nebo při úpravách hierarchie balíků.

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
 aptitude 0.2.14.1
 --\ Instalované balíky                  Modern computers support the Advanced  #
   --\ admin - Nástroje pro správu       Configuration and Power Interface
     --\ main - Hlavní archiv Debianu    (ACPI) to allow intelligent power
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

Hraní minového pole

   Když se budete cítit znaveni instalací a rušením balíků, můžete se zkusit
   odreagovat u klasické hry „Hledání min“. Po spuštění příkazem Akce →
   Zahrát si minové pole se objeví úvodní obrazovka:

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
 Minesweeper                                              10/10 min  13 sekund





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






   V obdélníku je schováno deset min. Cílem hry je zjistit, kde jsou miny
   schovány, aniž byste některou z nich spustili. Toho dosáhnete tak, že
   odkryjete všechna pole, která neobsahují miny. Při odkrývání zjistíte
   důležité indicie, které vám pomohou vypočítat pozice polí s minami.
   Dávejte dobrý pozor, protože odkrytí políčka s minou znamená okamžitý
   konec hry.

   Pole odkryjete tak, že na něj najedete šipkami a poté stisknete klávesu
   Enter:

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
 Minesweeper                                             10/10 min  387 sekund





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






   Jak je z obrázku vidět, některé skryté (prázdné) části hrací desky se
   odkryly. Čísla v polích indikují, kolik min s daným polem sousedí. Pole
   obsahující tečky . nesousedí s žádnou minou.

   Pokud si myslíte, že víte, kde se mina nachází, můžete si takové pole
   označit „vlajkou“, abyste jej omylem neodkryli. Vlajku umístíte klávesou
   f. Například na dalším obrázku jsem se rozhodl, že pole na levé straně
   desky vypadalo nějak podezřele...

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
 Minesweeper                                              9/10 min  961 sekund





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






   Jak je vidět, na vybraném poli se objevil znak F. Do té doby, než vlajku
   odeberete (dalším stiskem klávesy f), není možné toto pole odkrýt. Poté,
   co umístíte vlajky na všechna pole kolem pole (viz „jedničková“ pole kolem
   naší vlajky), můžete odkrýt další pole.

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
 Minesweeper                                              9/10 min  2290 sekund





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






   Naštěstí byl můj odhad miny správný. Kdybych se spletl, okamžitě bych
   prohrál:

  Akce  Zpět  Balík  Hledat  Volby  Pohledy  Nápověda
 f10: Menu  ?: Nápověda  q: Konec  u: Aktualizace  g: Stažení/Instalace
 Minesweeper                                   Hledač min Prohrál za 2388 sekund





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






   Když prohrajete, odhalí se všechny miny: neprozkoumané se zobrazí symbolem
   stříška (^), ta, na které jste „vybouchli“, se zobrazí jako hvězdička (*).

   --------------

   ^[7] Nutno říci, že počet těchto požadavků se rapidně snížil po prvním
   vydání této příručky a bylo by pěkné kdyby spolu tyto dvě události
   souvisely.

   ^[8] Tomuto kroku se někdy říká „instalace“, i když kromě toho může
   probíhat i aktualizace nebo odstraňování balíků.

   ^[9] Jak je zmíněno výše, tímto nezjistíte, zda jsou balíky v archivu
   bezpečné nebo dokonce neškodlivé. Popsaným mechanismem pouze zjistíte, zda
   jsou pravé nebo ne.

   ^[10] Přesněji řečeno, odstraní je, pokud k nim nepovede žádná cesta od
   ručně instalovaného balíku přes pole Depends, PreDepends nebo Recommends.
   Pokud má konfigurační volba Aptitude::Keep-Suggests hodnotu „true“, pak se
   také uvažují pole Suggests.

   ^[11] aptitude považuje čárku za ukončovač řetězce pouze v případě, dle
   definice termu můžete zadat další argument. Protože například term ?name
   akceptuje pouze jeden argument, hledal by vyhledávací vzor
   „?name(apt,itude)“ v názvech balíků skutečně řetězec „apt,itude“.

   Přestože je toto chování jasně definované, může občas překvapit.
   Doporučujeme proto raději používat obklopující uvozovky, obzvláště pokud
   se v hledaném řetězci vyskytují znaky, které by mohly mít speciální
   význam.

   ^[12] Řídící znaky regulárních výrazů zahrnují: „+“, „-“, „.“, „(“, „)“,
   „|“, „[“, „]“, „^“, „$“ a „?“. Některé z těchto znaků jsou zároveň i
   řídícími znaky pro aptitude. Chcete-li například napsat literál „|“,
   musíte jej uvodit dvakrát: „?description(\~|)“ se shoduje s balíky, jejich
   popis obsahuje znak („|“).

   ^[13] Zpětné lomítko se dá použít také pro speciální sekvence \\, \n a \t.

   ^[14] Všímaví studenti postřehli, že toto je v podstatě způsob
   explicitního pojmenování proměnné v lambda výrazu příslušného termu.
   Typický term má formu „λ x . name-equals(x, vzor)“. Použitím explicitního
   cíle se ve vyhledávacím jazyku zviditelní proměnná x.

   ^[15] Term je poskytován hlavně kvůli symetrii s ?true.

   ^[16] Značkování není zatím podporováno. Tato sekvence je rezervovaná pro
   budoucí rozšíření.

   ^[17] Která ovšem na některých terminálech vypadá v roli pozadí jako
   hnědá.

Kapitola 3. Často kladené otázky

           „What ... is your name?“                                     

           „I am Arthur, King of the Britons.“

           „What ... is your quest?“

           „I seek the Holy Grail!“

           „What ... is the airspeed velocity of an unladen swallow?“

           „What do you mean? An African or a European swallow?“

           „Huh? I ... I don't kn---AAAAAUUUGGGHH!“
                                           -- Monty Python and the Holy Grail

   3.1. Jak mohu nalézt právě jeden název balíku?

   3.2. Jak mohu najít poškozené balíky?

   3.3. Proč mě aptitude nenechá označit text myší?

   3.1. Jak mohu nalézt právě jeden název balíku?
        Jak je popsáno v „Vyhledávací vzory“, text zadaný při hledání je
        vlastně regulární výraz. Tudíž vyhledávací vzor „^name$“ se bude
        shodovat pouze s názvem balíku name.

        Například apt (ale ne aptitude nebo synaptic) můžete nalézt vzorem
        ^apt$. g++ (ale už ne g++-2.95 nebo g++-3.0) naleznete vzorem
        ^g\+\+$.
   3.2. Jak mohu najít poškozené balíky?
        Použijte příkaz Hledat → Hledat porušené (b).
   3.3. Proč mě aptitude nenechá označit text myší?
        Běží-li (libovolný konzolový) program používající myš v xtermu nebo
        jeho odvozeninách, je výběr textu pomocí myši obvykle zakázán. Toto
        chování lze přebít tak, že během označování přidržíte klávesu Shift.

Kapitola 4. Poděkování

           No-one remembers the singer. The song remains.              
                                            -- Terry Pratchett, The Last Hero

   Tato kapitola připomíná některé dobré duše, které přispěly k vývoji
   aptitude během její dlouhé cesty.

   [Poznámka] Poznámka
              Tato část asi nikdy nebude úplná, protože je občas velmi těžké
              sledovat, odkud konkrétní změny pochází (některé jazyky mají
              celé překladatelské týmy). ^[18] Myslíte-li si, že byste měli
              být na tomto seznamu, pošlete na adresu <dburrows@debian.org>
              email s vysvětlením, proč si to myslíte.

   Překlady a internacionalizace

   Brazilský překlad

           Andre Luis Lopes, Gustavo Silva

   Čínský překlad

           Carlos Z.F. Liu

   Český překlad

           Miroslav Kuře

   Dánský překlad

           Morten Brix Pedersen, Morten Bo Johansen

   Nizozemský překlad

           Luk Claes

   Finský překlad

           Jaakko Kangasharju

   Francouzský překlad

           Martin Quinson, Jean-Luc Coulon

   Německý překlad

           Sebastian Schaffert, Erich Schubert, Sebastian Kapfer, Jens Seidel

   Italský překlad

           Danilo Piazzalunga

   Japonský překlad

           YasuoEto, Noritada Kobayashi

   Litevský překlad

           Darius itkevicius

   Polský překlad

           Michal Politowski

   Portugalský překlad

           Nuno Snica, Miguel Figueiredo

   Norský překlad

           Havard Korsvoll

   Španělský překlad

           Jordi Mallach, Ruben Porras

   Švédský překlad

           Daniel Nylander

   Původní práce na i18n

           Masato Taruishi

   Správa i18n

           Christian Perrier

   Dokumentace

   Uživatelská příručka

           Daniel Burrows

   Programování

   Návrh a implementace

           Daniel Burrows

   Podpora pro dpkg pole Breaks

           Ian Jackson, Michael Vogt

   --------------

   ^[18] Teoreticky by bylo možné získat další jména procházením záznamů v
   BTS, souboru změn a verzovacím systému, ale to vyžaduje čas, který bohužel
   není k dispozici.

                                Přehled příkazů

   --------------------------------------------------------------------------

   Obsah

   aptitude — vysokoúrovňové rozhraní k balíčkovacímu systému

   aptitude-create-state-bundle — zabalí aktuální stav aptitude

   aptitude-run-state-bundle — rozbalí archiv se stavem balíků a spustí na
   něm aptitude

Jméno

   aptitude — vysokoúrovňové rozhraní k balíčkovacímu systému

Přehled

   aptitude [volby...] { autoclean | clean | forget-new | keep-all | update |
   safe-upgrade }

   aptitude [volby...] { changelog | full-upgrade | download | forbid-version
   | hold | install | keep-all | markauto | purge | reinstall | remove | show
   | unhold | unmarkauto | build-dep | build-depends } balíky...

   aptitude extract-cache-subset výstupní_adresář balíky...

   aptitude [volby...] search vzory...

   aptitude [volby...] { add-user-tag | remove-user-tag } značka balíky...

   aptitude [volby...] { why | why-not } vzory... balík

   aptitude [-S jmsoub] [ -u | -i ]

   aptitude help

Popis

   aptitude je textové rozhraní k balíčkovacímu systému Debianu.

   Umožňuje uživateli prohlížet a třídit seznamy balíků a také tyto balíky
   jednoduše spravovat (instalovat, aktualizovat a odstraňovat). Program může
   pracovat z příkazového řádku, nebo v celoobrazovkovém režimu.

Akce na příkazovém řádku

   První argument, jenž nezačíná pomlčkou („-“), je považován za akci, kterou
   má program provést. Pokud není zadána žádná akce, aptitude se spustí v
   celoobrazovkovém režimu.

   Dostupné jsou následující akce:

   install

           Instaluje jeden nebo více balíků. Seznam balíků k instalaci by měl
           následovat za příkazem „install“; Pokud jméno balíku obsahuje znak
           vlnka „~“ nebo otazník „?“, bude se jméno brát jako vzor pro
           hledání a budou instalovány všechny balíky vyhovující tomuto
           vzoru. (Viz „Vyhledávací vzory“ v referenční příručce aptitude)

           Pro výběr konkrétní verze balíku přidejte ke jménu balíku
           „=verze“, například „aptitude install apt=0.3.1“. Chcete-li vybrat
           balík z určitého archivu, přidejte za název balíku „/archiv“,
           například „aptitude install apt/experimental“.

           Příkazem pro instalaci nemusíte pouze instalovat nové balíky.
           Přidáním „aktivní přípony“ za název balíku můžete říci aptitude,
           aby s ním provedla nějakou jinou akci. Například aptitude remove
           wesnoth+ balík wesnoth neodstraní, ale naopak jej nainstaluje. K
           dispozici jsou následující aktivní přípony:

                balík+

                        Nainstaluje balík.

                balík+M

                        Nainstaluje balík a okamžitě jej označí jako
                        instalovaný automaticky (pozor, pokud na balíku nic
                        nezávisí, tak bude obratem automaticky odstraněn).

                balík-

                        Odstraní balík.

                balík_

                        Vyčistí balík, tj. odstraní jej včetně konfiguračních
                        a datových souborů.

                balík=

                        Podrží balík v aktuálním stavu, tj. zruší na něm
                        všechny naplánované instalace, aktualizace nebo
                        odstranění. Podržení bude trvat, dokud jej nezrušíte.

                balík:

                        Podrží balík v aktuálním stavu, tj. zruší na něm
                        všechny naplánované instalace, aktualizace nebo
                        odstranění. Na rozdíl od předchozího platí pouze pro
                        toto sezení.

                balík&M

                        Označí balík jako instalovaný automaticky.

                balík&m

                        Označí balík jako instalovaný ručně.

           Jako speciální případ můžete použít „install“ bez argumentů - tím
           provedete všechny naplánované, ale dosud nevyřízené akce.

           [Poznámka] Poznámka
                      Po konečném potvrzení klávesou Y příkaz „install“
                      modifikuje vnitřní záznamy aptitude o akce, které se
                      mají provést. Pokud např. zadáte příkaz „aptitude
                      install foo bar“ a pak instalaci přerušíte, musíte poté
                      zadat (třeba) „aptitude remove foo bar“, aby se zrušil
                      původní příkaz.

   remove, purge, hold, unhold, keep, reinstall

           Tyto příkazy pracují stejně jako „install“, ale provedou akci
           podle svých názvů, tj. odstranění, odstranění s konfiguračními
           soubory, přidržení, uvolnění, ponechání a přeinstalování (pokud
           ovšem nejsou přepsány „aktivní příponou“). Rozdíl mezi ponecháním
           (keep) a přidržením (hold) je ten, že přidržený balík bude i při
           příštích aktualizacích pomocí safe-upgrade nebo full-upgrade
           ignorován (tj. ponechán ve stávající verzi), zatímco ponechání
           jednoduše na balíku zruší všechny naplánované akce. Uvolnění
           znamená, že při příštích aktualizacích bude balík svolný k
           aktualizaci.

           (Například „aptitude remove '~ndeity'“ odstraní všechny balíky,
           jejichž název obsahuje řetězec „deity“)

   markauto, unmarkauto

           Označí balíky jako instalované automaticky nebo ručně. Názvy
           balíků se zadávají stejně jako u předchozích akcí. Například
           „aptitude markauto '~slibs'“ označí všechny balíky ze sekce „libs“
           jako instalované automaticky.

           Podrobnější informace o automaticky instalovaných balících
           naleznete v referenční příručce aptitude v kapitole „Správa
           automaticky instalovaných balíků“.

   build-depends, build-dep

           Uspokojí závislosti pro sestavení balíku ze zdrojových kódů. Jména
           balíků mohou být jmény jak binárních, tak zdrojových balíků. Jména
           binárních balíků se používají stejně jako u příkazu „install“.

           Je-li zadán parametr --arch-only, bude se brát ohled pouze na
           závislosti specifické pro danou architekturu (tzn. budou se
           ignorovat Build-Depends-Indep a Build-Conflicts-Indep).

   forbid-version

           Zakáže, aby byl balík aktualizován na konkrétní verzi. Tím
           zabráníte aptitude, aby automaticky aktualizoval balík na
           konkrétní verzi, ale aby povolil všechny následné automatické
           aktualizace. Standardně aptitude vybere verzi, na kterou by se
           balík aktualizoval. Tento výběr můžete přebít přidáním „=verze“ za
           jméno balíku: např. „aptitude forbid\-version vim=1.2.3.broken-4“.

           Tento příkaz je užitečný pro přeskočení nefunkčních verzí balíků,
           aniž byste museli nastavovat příznak pro podržení a následně jej
           zase rušit. Rozhodnete-li se nakonec pro instalaci zakázané verze,
           příkaz „install“ umí tento zákaz zrušit.

   reinstall

           Znovu nainstaluje aktuální verze zadaných balíků.

   update

           Aktualizuje seznam dostupných balíků podle zdrojů pro apt. (Tento
           příkaz je ekvivalentní k „apt-get update“).

   safe-upgrade

           Aktualizuje instalované balíky na jejich nejnovější verze. Žádné
           instalované balíky, pokud ovšem nejsou zbytečné, nebudou
           odstraněny (viz „Správa automaticky instalovaných balíků“ v
           referenční příručce k aptitude). Je možné, že se pro vyřešení
           závislostí nainstalují nějaké nové balíky. Chcete-li tomu
           zabránit, můžete použít parametr --no-new-installs.

           V některých situacích je potřeba pro aktualizaci jednoho balíku
           odstranit balík jiný, což tento příkaz nepovoluje. Chcete-li
           aktualizovat i takové balíky, použijte příkaz full-upgrade.

   full-upgrade

           Aktualizuje instalované balíky na jejich nejnovější verze a podle
           potřeby doinstaluje nebo odstraní některé balíky. Tento příkaz je
           méně konzervativní než safe-upgrade a je pravděpodobné, že vykoná
           i nějaké nechtěné akce. Na druhou stranu umí aktualizovat i
           balíky, které safe-upgrade nezvládá.

           [Poznámka] Poznámka
                      Tento příkaz se z historických důvodů nazýval
                      dist-upgrade a aptitude jej stále pod tímto názvem
                      rozpoznává jako synonymum k full-upgrade.

   keep-all

           Na všech balících zruší všechny naplánované akce, tj. odstraní
           příznaky pro instalaci, odstranění nebo aktualizaci.

   forget-new

           Zapomene, které balíky jsou „nové“ (ekvivalent klávesy „f“ v
           celoobrazovkovém režimu).

   search

           Hledá balíky odpovídající zadaným výrazům. Výrazy by měly být
           zapsány za příkazem „search“. Všechny balíky vyhovující zadaným
           kritériím budou zobrazeny. Například „aptitude search '~N' edit“
           zobrazí všechny „nové“ balíky a všechny balíky, v jejichž názvu se
           vyskytuje řetězec „edit“. Výrazy pro vyhledávání jsou podrobně
           popsány v referenční příručce v části „Vyhledávací vzory“

           Pokud nezadáte parametr -F, bude výstup příkazu aptitude search
           vypadat nějak takto:

 i   apt                             - Pokročilé rozhraní pro dpkg
 pi  apt-build                       - Rozhraní pro apt pro sestavení, optimaliz
 cp  apt-file                        - APT nástroj pro prohledávání balíků -- př
 ihA raptor-utils                    - Nástroje Raptor RDF Parser

           Každý nalezený balík je na samostatném řádku. První písmeno
           každého řádku zobrazuje aktuální stav balíku. Nejběžnější stavy
           jsou p, což znamená, že v systému není po balíku ani vidu ani
           slechu, c značí, že byl balík smazán, ale konfigurační soubory se
           stále nachází v systému, i označuje nainstalované balíky a v
           znamená, že se jedná o virtuální balík. Druhý znak zobrazuje
           očekávanou akci nad balíkem (pokud je naplánována; jinak se
           zobrazí mezera). Mezi nejběžnější akce patří i, což znamená že je
           balík naplánovaný pro instalaci, d říká, že se balík odstraní a p
           znamená, že se balík odstraní i s konfiguračními soubory. Je-li
           třetí znak A, byl balík nainstalován automaticky pro splnění
           závislostí.

           Úplný seznam možných stavů a akcí naleznete v referenční příručce
           aptitude v části „Získání informací o balíku“.

   show

           Zobrazí detailní informace o zadaných balících. Pokud jméno balíku
           obsahuje znak vlnka „~“ nebo otazník „?“, bude se brát jako vzor
           pro hledání a budou instalovány všechny balíky vyhovující tomuto
           vzoru. (Viz „Vyhledávací vzory“ v referenční příručce aptitude.)

           Pokud je míra upovídanosti 1 nebo větší (tj. je na příkazové řádce
           zadáno alespoň jedno -v), zobrazí se informace o všech verzích
           balíku. V opačném případě se zobrazí pouze informace o
           „kandidátské verzi“ (což je verze, kterou by stáhl příkaz
           „aptitude install“.)

           Informace o jiné než kandidátské verzi balíku můžete získat tak,
           že za název balíku přidáte =verze. Chcete-li zobrazit verzi z
           konkrétního archivu, stačí za název balíku přidat /archiv.
           Jestliže použijete některou z těchto dvou syntaxí, zobrazí se
           pouze jediná verze bez ohledu na míru upovídanosti.

           S mírou upovídanosti 1 nebo větší se navíc zobrazí pole
           architektura, komprimovaná velikost, jméno souboru a md5 součet.
           Přesáhne-li upovídanost úroveň 2, zobrazí se vybraná verze
           tolikrát, v kolika archivech je nalezena.

   add-user-tag, remove-user-tag

           Přidá nebo odebere uživatelskou značku ze zadané skupiny balíků.
           Pokud jméno balíku obsahuje znak vlnka „~“ nebo otazník „?“, bude
           se brát jako vzor pro hledání a značka se přidá nebo odebere ze
           všech balíků vyhovujících tomuto vzoru. (Viz „Vyhledávací vzory“ v
           referenční příručce aptitude.)

           Uživatelské značky jsou libovolné řetězce spojené s balíkem.
           Můžete je použít ve vyhledávacím termu ?user-tag(značka), který
           vybere všechny balíky, které obsahují uživatelskou značku
           odpovídající značce.

   why, why-not

           Vysvětlí důvod, proč by měl být daný balík nainstalován, nebo
           zůstat nenainstalovaný.

           Příkaz hledá balíky, které vyžadují, nebo naopak kolidují se
           zadaným balíkem. Je-li příkaz úspěšný, zobrazí posloupnost
           závislostí, které vedou k danému balíku. U každého z balíků je
           vidět i příznak, zda a jak je nainstalovaný:

 $ aptitude why kdepim
 i   nautilus-data Doporučuje nautilus
 i A nautilus      Doporučuje desktop-base (>= 0.2)
 i A desktop-base  Navrhuje   gnome | kde | xfce4 | wmaker
 p   kde           Závisí na  kdepim (>= 4:3.4.3)

           Příkaz why hledá posloupnost závislostí, která by nainstalovala
           balík zadaný na příkazové řádce. Všimněte si, že se v tomto
           případě jedná pouze o slabou závislost ve formě návrhu. Je tomu
           tak proto, že že žádný aktuálně nainstalovaný balík na tomto
           počítači nezávisí na balíku kdepim a ani jej nedoporučuje. Pokud
           by byla nějaká silnější závislost k dispozici, aptitude by použila
           tu nejsilnější.

           Oproti tomu why-not hledá posloupnost závislostí vedoucích ke
           konfliktu s cílovým balíkem:

 $ aptitude why-not textopo
 i   ocaml-core          Závisí na  ocamlweb
 i A ocamlweb            Závisí na  tetex-extra | texlive-latex-extra
 i A texlive-latex-extra Koliduje s textopo

           Je-li zadán i jeden nebo více vzorů, začne aptitude své hledání v
           těchto vzorech. To znamená, že první balík v posloupnosti se bude
           shodovat s některým ze zadaných vzorů. Vzory jsou považovány za
           názvy balíků, kromě případů, kdy obsahují znak vlnka „~“ nebo
           otazník „?“, protože pak se budou brát jako vzory pro hledání (Viz
           „Vyhledávací vzory“ v referenční příručce aptitude.)

           Nejsou-li zadány žádné vzory, začne aptitude hledání závislostí od
           množiny ručně nainstalovaných balíků. Tím se vlastně zobrazí
           balíky, které způsobily (resp. by způsobily) instalaci zadaného
           balíku.

           [Poznámka] Poznámka
                      aptitude why neprovádí plné řešení závislostí, ale
                      zobrazuje pouze přímé vztahy mezi balíky. Například
                      pokud balík A vyžaduje B, C vyžaduje D a B a C jsou v
                      konfliktu, „aptitude why-not D“ neodpoví, že „A závisí
                      na B, B koliduje s C a D závisí C“.

           aptitude vypisuje pouze „nejvíce nainstalovanou, nejsilnější,
           nejtěsnější a nejkratší“ posloupnost závislostí. Jinými slovy
           hledá posloupnost, která obsahuje nainstalované balíky (nebo
           alespoň balíky označené k instalaci), hledá nejsilnější možné
           závislosti (s ohledem na předchozí kritérium), vyhýbá se
           rozvětveným závislostem (balík poskytuje foo NEBO bar) a konečně
           hledá nejkratší možný řetěz splňující předchozí kritéria.
           Nedaří-li se nalézt ideální posloupnost, jsou kritéria postupně
           uvolňována a hledání probíhá znovu.

           S mírou upovídanosti 1 se začnou vypisovat všechna vysvětlení od
           nejvýstižnějších po fantasmagorická. Přesáhne-li upovídanost
           úroveň 2, budou se na standardní výstup vypisovat opravdu
           nadbytečná kvanta ladicích informací.

           Příkaz vrací v případě úspěchu 0, 1 pokud nenašel vysvětlení a -1
           pokud nastala chyba.

   clean

           Smaže stažené .deb soubory z vyrovnávací paměti (obvykle v
           adresáři /var/cache/apt/archives).

   autoclean

           Smaže balíky ve vyrovnávací paměti, které se již nedají stáhnout.
           Tímto můžete umravnit spotřebu diskového prostoru, aniž byste
           museli smazat celou vyrovnávací paměť.

   changelog

           Stáhne a zobrazí seznamy změn provedených vývojáři Debianu u
           zadaných balíků (zdrojových nebo binárních).

           Implicitně se stáhne seznam změn pro verzi, která by se
           nainstalovala příkazem „aptitude install“. Konkrétní verzi balíku
           můžete zadat tak, že ke jménu balíku přidáte =verze. Chcete-li
           použít verzi z konkrétního archivu, můžete ke jménu balíku přidat
           /archiv.

   download

           Do aktuálního adresáře stáhne .deb soubor zadaného balíku. Pokud
           jméno balíku obsahuje znak vlnka „~“ nebo otazník „?“, bude se
           brát jako vzor pro hledání a budou staženy všechny balíky
           vyhovující tomuto vzoru. (Viz „Vyhledávací vzory“ v referenční
           příručce aptitude.)

           Implicitně se stáhne verze, která by se nainstalovala příkazem
           „aptitude install“. Konkrétní verzi balíku můžete zadat tak, že ke
           jménu balíku přidáte =verze. Chcete-li použít verzi z konkrétního
           archivu, můžete ke jménu balíku přidat /archiv.

   extract-cache-subset

           Vytáhne z cache balíků zvolené balíky do zadaného adresáře.
           Nezadáte-li žádné balíky žádné balíky, zkopíruje se celá cache.
           Každé jméno balíku může být vzorem pro hledání. V takovém případě
           budou zkopírovány všechny balíky vyhovující tomuto vzoru. (Viz
           „Vyhledávací vzory“ v referenční příručce aptitude.) Stávající
           seznamy balíků v zadaném adresáři budou přepsány.

           Závislosti u binárních balíků budou přepsány tak, aby se v nich
           nevyskytovaly odkazy na balíky, které nebyly vybrány.

   help

           Zobrazí krátký přehled dostupných příkazů a parametrů.

Volby

   Následujícími volbami můžete měnit chování zmíněných příkazů. Pamatujte,
   že ne každý příkaz rozumí každé volbě (některé kombinace příkazů a voleb
   ani nedávají smysl).

   --add-user-tag značka

           U příkazů full-upgrade, forbid-version, hold, install, keep-all,
           markauto, unmarkauto, purge, reinstall, remove, unhold a
           unmarkauto přidá uživatelskou značku značka všem balíkům, které
           jsou daným příkazem ovlivněny. Je to stejné, jako kdybyste použili
           příkaz add-user-tag.

   --add-user-tag-to značka,vzor

           U příkazů full-upgrade, forbid-version, hold, install, keep-all,
           markauto, unmarkauto, purge, reinstall, remove, unhold a
           unmarkauto přidá uživatelskou značku značka všem balíkům, které se
           shodují se vzorem. Je to stejné, jako kdybyste použili příkaz
           add-user-tag. Vzory jsou popsány v referenční příručce aptitude v
           části „Vyhledávací vzory“.

           Například příkaz aptitude safe-upgrade --add-user-tag-to
           "nové-instalace,?action(install)" přidá značku nové-instalace všem
           balíkům instalovaným příkazem safe-upgrade.

   --allow-new-upgrades

           Při použití „bezpečného“ řešitele závislostí (tzn. byl použit
           parametr --safe-resolver, nebo je nastavena konfigurační volba
           Aptitude::Always-Use-Safe-Resolver na hodnotu true), umožní
           vyřešit závislosti instalací aktualizovaných balíků i v případě,
           že je nastavena volba Aptitude::Safe-Resolver::No-New-Upgrades.

   --allow-new-installs

           Umožní příkazu safe-upgrade instalovat nové balíky. Při použití
           „bezpečného“ řešitele závislostí (tzn. byl použit parametr
           --safe-resolver, nebo je nastavena konfigurační volba
           Aptitude::Always-Use-Safe-Resolver na hodnotu true), umožní
           vyřešit závislosti instalací nových balíků. Tento parametr má
           přednost i před volbou Aptitude::Safe-Resolver::No-New-Installs.

   --allow-untrusted

           Bez ptaní instaluje balíky z nedůvěryhodných zdrojů. Měli byste
           použít jedině v případě, že víte, co děláte. Tímto můžete lehce
           kompromitovat bezpečnost systému.

   --disable-columns

           Způsobí, že výstup příkazu aptitude search nebude nijak
           formátován. Běžně totiž aptitude přidává neviditelné znaky, nebo
           naopak ořezává výsledky tak, aby se výstup co nejlépe vešel na
           šířku terminálu. Po použití této volby se budou šířky jednotlivých
           sloupců ignorovat.

           Například prvních několik řádků výstupu příkazu „aptitude search
           -F '%p %V' --disable-columns libedataserver“ by mohlo vypadat
           takto:

 disksearch 1.2.1-3
 hp-search-mac 0.1.3
 libbsearch-ruby 1.5-5
 libbsearch-ruby1.8 1.5-5
 libclass-dbi-abstractsearch-perl 0.07-2
 libdbix-fulltextsearch-perl 0.73-10

           Použití --disable-columns je často užitečné ve spojení s
           parametrem -F, kterým můžete měnit formátování výstupu jako v
           předchozí ukázce.

           Konfigurační položka Aptitude::CmdLine::Disable-Columns.

   -D, --show-deps

           U příkazů, které instalují nebo odstraňují balíky (install,
           full-upgrade, apod.), krátce zobrazí důvody, proč budou některé
           balíky automaticky nainstalovány či odstraněny.

           Konfigurační položka Aptitude::CmdLine::Show-Deps.

   -d, --download-only

           Podle potřeby stáhne balíky do vyrovnávací paměti, ale nic
           neinstaluje nebo neodstraňuje. Implicitně je vyrovnávací paměť
           umístěna v adresáři /var/cache/apt/archives.

           Konfigurační položka Aptitude::CmdLine::Download-Only.

   -F formát, --display-format formát

           Určí formát, kterým se budou zobrazovat výsledky hledání příkazu
           search. Například „%p %V %vr“ zobrazí název balíku následovaný
           aktuálně instalovanou verzí a dostupnou verzí. (Více informací viz
           referenční příručka aptitude, sekce „Přizpůsobení zobrazení
           balíků“.)

           Často se používá v kombinaci s --disable-columns

           Konfigurační položka Aptitude::CmdLine::Package-Display-Format.

   -f

           Zkusí agresivně opravit závislosti porušených balíků, i za cenu
           ignorování akcí zadaných uživatelem na příkazové řádce.

           Konfigurační položka Aptitude::CmdLine::Fix-Broken.

   --full-resolver

           Při výskytu problémů se závislostmi balíků použije pro jejich
           řešení „plnou“ verzi řešitele. Ten, na rozdíl od „bezpečného“
           algoritmu aktivovaného parametrem --safe-resolver, neváhá jít přes
           mrtvoly a pro splnění závislostí klidně odstraní nějaké
           nainstalované balíky. Umí sice vyřešit více situací než „bezpečný“
           algoritmus, ale tato řešení nemusí vždy splnit očekávání.

           Tímto parametrem můžete vynutit použití plného řešitele i v
           případě, že je Aptitude::Always-Use-Safe-Resolver nastaven na
           hodnotu true. Příkaz safe-upgrade nikdy nepoužívá plného řešitele
           a při zadání parametru --full-resolver odmítne pracovat.

   -h, --help

           Zobrazí krátkou nápovědu. (Shodné s akcí help.)

   --no-new-upgrades

           Při použití „bezpečného“ řešitele závislostí (tzn. byl použit
           parametr --safe-resolver, nebo je nastavena konfigurační volba
           Aptitude::Always-Use-Safe-Resolver na hodnotu true), zakáže
           řešiteli vyřešit závislosti instalací aktualizovaných verzí
           balíků.

   --no-new-installs

           Zabrání příkazu safe-upgrade instalovat nové balíky. Při použití
           „bezpečného“ řešitele závislostí (tzn. byl použit parametr
           --safe-resolver, nebo je nastavena konfigurační volba
           Aptitude::Always-Use-Safe-Resolver na hodnotu true), zakáže
           řešiteli vyřešit závislosti instalací nových balíků.

           Parametr napodobuje historické chování příkazu apt-get upgrade.

           Konfigurační položka
           Aptitude::CmdLine::Safe-Upgrade::No-New-Installs.

   --purge-unused

           Vyčistí balíky, které již nejsou vyžadovány žádným instalovaným
           balíkem. To je ekvivalentní parametru „-o
           Aptitude::Purge-Unused=true“.

   -P, --prompt

           Vždy zobrazí výzvu, i když neexistuje alternativní možnost.

           Konfigurační položka Aptitude::CmdLine::Always-Prompt.

   -R, --without-recommends

           Při instalaci balíků nepovažuje doporučení, za silné závislosti.
           (Má přednost před nastavením v /etc/apt/apt.conf a
           ~/.aptitude/config.) Doporučené balíky nainstalované dříve nebudou
           odstraněny.

           Odpovídá konfiguračním položkám Apt::Install-Recommends a
           Aptitude::Keep-Recommends.

   -r, --with-recommends

           Při instalaci nových balíků považuje doporučení za silné
           závislosti. (Má přednost před nastavením v /etc/apt/apt.conf a
           ~/.aptitude/config.)

           Konfigurační položka Apt::Install-Recommends.

   -s, --simulate

           V příkazovém režimu simuluje akce, které by se provedly, ale
           reálně je neprovede. Nevyžaduje rootovská práva. V
           celoobrazovkovém režimu otevře cache pouze pro čtení bez ohledu na
           to, zda máte rootovská oprávnění.

           Konfigurační položka Aptitude::Simulate.

   --remove-user-tag značka

           U příkazů full-upgrade, forbid-version, hold, install, keep-all,
           markauto, unmarkauto, purge, reinstall, remove, unhold a
           unmarkauto odebere uživatelskou značku značka ze všech balíků,
           které jsou daným příkazem ovlivněny. Je to stejné, jako kdybyste
           použili příkaz add-user-tag.

   --remove-user-tag-from značka,vzor

           U příkazů full-upgrade, forbid-version, hold, install, keep-all,
           markauto, unmarkauto, purge, reinstall, remove, unhold a
           unmarkauto odebere uživatelskou značku značka ze všech balíků,
           které se shodují se vzorem. Je to stejné, jako kdybyste použili
           příkaz remove-user-tag. Vzory jsou popsány v referenční příručce
           aptitude v části „Vyhledávací vzory“.

           Například příkaz aptitude safe-upgrade --remove-user-tag-from
           "neaktualizováno,?action(upgrade)" odebere značku neaktualizováno
           ze všech balíků, které může příkaz safe-upgrade aktualizovat na
           novější verze.

   --safe-resolver

           Při výskytu problémů se závislostmi použije pro jejich řešení
           „bezpečný“ algoritmus. Ten se snaží co nejvíce respektovat vaše
           nastavení. Nikdy neodstraní balík nebo nenainstaluje jinou verzi
           balíku, než kandidátskou. Jedná se o stejný algoritmus, jako
           používá příkaz safe-upgrade, takže aptitude --safe-resolver
           full-upgrade je stejné jako aptitude safe-upgrade. Protože příkaz
           safe-upgrade používá „bezpečný“ algoritmus za všech okolností, je
           u něj parametr --safe-resolver zbytečný.

           Konfigurační položka Aptitude::Always-Use-Safe-Resolver.

   --schedule-only

           U příkazů, které mění stav balíků (instalace, aktualizace,
           odstranění), naplánuje zadané operace pro pozdější provedení, ale
           zatím je neprovede. Naplánované akce se spustí až po zadání
           příkazu aptitude install bez dalších parametrů. Je to podobné,
           jako když v celoobrazovkovém režimu provedete příslušné změny a
           poté program ukončíte, aniž byste akce provedli klávesou „g“.

           Například aptitude --schedule-only install evolution naplánuje
           balík evolution pro pozdější instalaci.

   -t distribuce, --target-release distribuce

           Nastaví distribuci, ze které se budou balíky instalovat. Například
           „aptitude -t unstable ...“ bude při stahování balíků
           upřednostňovat nestabilní distribuci. Pro příkazy „changelog“,
           „download“ a „show“ to je ekvivalentní přidání /distribuce za
           název každého balíku na příkazové řádce. U ostatních příkazů to
           ovlivní výchozí kandidátskou verzi balíků podle pravidel popsaných
           v apt_preferences(5).

           Konfigurační položka APT::Default-Release.

   -O pořadí, --sort pořadí

           Zadá pořadí, ve kterém se bude zobrazovat výstup příkazu search.
           Například „installsize“ seřadí balíky vzestupně podle instalované
           velikosti (viz sekce v „Přizpůsobení zobrazení balíků“ v
           referenční příručce aptitude).

   -o klíč=hodnota

           Přímo nastaví volbu z konfiguračního souboru. Například -o
           Aptitude::Log=/tmp/muj-denicek zaznamená všechny akce aptitude do
           souboru /tmp/muj-denicek. Další informace o konfiguračním souboru
           naleznete v referenční příručce aptitude v části „Konfigurační
           soubor“.

   -q[=n], --quiet[=n]

           Potlačí všechny ukazatele postupu, což umožní ukládat výstup
           programu do souboru pro pozdější kontrolu. Tuto volbu můžete
           několikrát zopakovat, což bude program dále ztišovat. aptitude
           však na rozdíl od apt-get při násobném použití nezapne volbu -y.

           Abyste parametr -q nemuseli zadávat několikrát, můžete použít i
           variantu s volitelným =n, kde místo n zadáte míru tichosti
           odpovídající n písmenům q.

   -V, --show-versions

           Zobrazí verze balíků připravených k instalaci.

           Konfigurační položka Aptitude::CmdLine::Show-Versions.

   -W, --show-why

           V náhledu před instalací, aktualizací nebo odstraněním balíků
           zobrazí, které ručně instalované balíky si vyžádaly instalaci
           automaticky instalovaných balíků. Například:

 $ aptitude --show-why install mediawiki
 ...
 Následující NOVÉ balíky budou instalovány:
   libapache2-mod-php5{a} (pro mediawiki)  mediawiki  php5{a} (pro mediawiki)
   php5-cli{a} (pro mediawiki)  php5-common{a} (pro mediawiki)
   php5-mysql{a} (pro mediawiki)

           V kombinaci s parametrem -v, nebo nenulovou hodnotou volby
           Aptitude::CmdLine::Verbose, zobrazí celou posloupnost závislostí,
           která vedla k instalaci každého balíku. Například:

 $ aptitude -v --show-why install libdb4.2-dev
 Následující NOVÉ balíky budou instalovány:
   libdb4.2{a} (libdb4.2-dev D: libdb4.2)  libdb4.2-dev
 Následující balíky budou ODSTRANĚNY:
   libdb4.4-dev{a} (libdb4.2-dev C: libdb-dev P<- libdb-dev)

           Jak je vidět výše, zobrazí se také zdůvodnění, proč budou balíky
           odstraněny. V příkladu je balík libdb4.2-dev v konfliktu s
           libdb-dev, který je poskytován balíkem libdb-dev.

           Tento parametr zobrazí stejné informace, jako příkazy aptitude why
           a aptitude why-not.

           Konfigurační položka Aptitude::CmdLine::Show-Why.

   -v, --verbose

           Zobrazí další informace (může být použito vícekrát).

           Konfigurační položka Aptitude::CmdLine::Verbose.

   --version

           Zobrazí verzi aptitude a různé informace o kompilačním prostředí.

   --visual-preview

           Při instalaci/odstranění balíků z příkazové řádky zobrazí místo
           obvyklé výzvy celoobrazovkové rozhraní a jeho přehled před
           instalací.

   -w šířka, --width šířka

           Zadá šířku zobrazení, která se má použít pro výstup příkazu search
           (implicitně se použije šířka terminálu).

           Konfigurační položka Aptitude::CmdLine::Package-Display-Width

   -y, --assume-yes

           Na všechny výzvy ano/ne předpokládá odpověď „ano“. Nevztahuje se
           však na potenciálně nebezpečné akce jako odstranění Nezbytných
           balíků. Má přednost před -P.

           Konfigurační položka Aptitude::CmdLine::Assume-Yes.

   -Z

           U každého balíku zobrazí, kolik místa se použije nebo uvolní jeho
           instalací, aktualizací nebo odstraněním.

           Konfigurační položka Aptitude::CmdLine::Show-Size-Changes.

   Následující volby slouží pro interní účely celoobrazovkového režimu
   programu a neměli byste je používat.

   -S jmsoub

           Nahraje rozšířené stavové informace z jmsoub.

   -u

           Při startu programu aktualizuje seznamy balíků. Tuto volbu
           nemůžete použít zároveň s -i.

   -i

           Při startu programu zobrazí obrazovku pro stahování (ekvivalentní
           stisku klávesy „g“ hned po startu). Tuto volbu nemůžete použít
           zároveň s „-u“.

Prostředí

   HOME

           Pokud existuje adresář $HOME/.aptitude, aptitude si zde uloží
           konfigurační soubor jako $HOME/.aptitude/config. V opačném případě
           si vyhledá domovský adresář uživatele pomocí getpwuid(2) a
           konfigurační soubor uloží tam.

   PAGER

           Je-li nastavena tato proměnná prostředí, aptitude ji využije pro
           zobrazení seznamu změn příkazu „aptitude changelog“. V opačném
           případě se použije výchozí more.

   TMP

           Pokud není nastavena proměnná TMPDIR, ale TMP ano, aptitude si zde
           bude ukládat své dočasné soubory. Pokud není nastavena ani jedna z
           těchto proměnných, použije se adresář /tmp.

   TMPDIR

           aptitude bude ukládat své dočasné soubory do adresáře určeného
           touto proměnnou prostředí. Pokud proměnná TMPDIR není nastavena,
           použije se proměnná TMP. Jestliže není nastavena ani ta, použije
           se výchozí adresář /tmp.

Soubory

   /var/lib/aptitude/pkgstates

           V souboru jsou uloženy stavy balíků a některé příznaky.

   /etc/apt/apt.conf, /etc/apt/apt.conf.d/*, ~/.aptitude/config

           Konfigurační soubory aptitude. ~/.aptitude/config má přednost před
           /etc/apt/apt.conf. Formát a popis těchto souborů naleznete v
           manuálové stránce apt.conf(5).

Viz také

   apt-get(8), apt(8) a /usr/share/doc/aptitude/html/jazyk/index.html z
   balíku aptitude-doc-jazyk

   --------------------------------------------------------------------------

Jméno

   aptitude-create-state-bundle — zabalí aktuální stav aptitude

Přehled

   aptitude-create-state-bundle [volby...] výstupní-soubor

Popis

   aptitude-create-state-bundle vytvoří komprimovaný archiv souborů, které
   jsou třeba pro reprodukci aktuálního stavu balíků. Do archivu se ukládají
   následující soubory:

     o $HOME/.aptitude

     o /var/lib/aptitude

     o /var/lib/apt

     o /var/cache/apt/*.bin

     o /etc/apt

     o /var/lib/dpkg/status

   Výstup tohoto programu se dá použít jako argument programu
   aptitude-run-state-bundle(1).

Volby

   --force-bzip2

           Obchází automatické rozpoznávání kompresního algoritmu.
           aptitude-create-state-bundle ve výchozím nastavení používá
           bzip2(1), pokud není dostupný, použije gzip(1) Použitím tohoto
           parametru vynutíte použití bzip2u i v případech, kdy se zdá, že
           není přítomen.

   --force-gzip

           Obchází automatické rozpoznávání kompresního algoritmu.
           aptitude-create-state-bundle ve výchozím nastavení používá
           bzip2(1), pokud není dostupný, použije gzip(1) Použitím tohoto
           parametru vynutíte použití gzipu, i když je přítomen bzip2.

   --help

           Zobrazí krátkou nápovědu a skončí.

   --print-inputs

           Zobrazí seznam souborů a adresářů, které budou uloženy do archivu.

Formát souboru

   Archiv je standardní tar(1) komprimovaný bzip2(1)em nebo gzip(1)em.
   Všechny vstupní adresáře jsou ukotveny v „.“.

Viz také

   aptitude-run-state-bundle(1), aptitude(8) a apt(8)

   --------------------------------------------------------------------------

Jméno

   aptitude-run-state-bundle — rozbalí archiv se stavem balíků a spustí na
   něm aptitude

Přehled

   aptitude-run-state-bundle [volby...] vstupní-soubor [ program |
   [argumenty-programu...]]

Popis

   aptitude-run-state-bundle rozbalí zadaný archiv obsahující stav balíků do
   dočasného adresáře, spustí na něm program se zadanými argumenty-programu a
   poté dočasný adresář smaže. Není-li program zadán, použije se výchozí
   aptitude(8). Archivy se stavem balíků vytváří nástroj
   aptitude-create-state-bundle(1).

Volby

   Následující volby se mohou objevit na příkazové řádce před vstupním
   souborem. Cokoliv zadaného za vstupním souborem je považováno za argumenty
   pro program.

   --append-args

           Při spouštění programu umístí parametry určující umístění archivu
           na konec příkazové řádky. Výchozí chování je je umístit na
           začátek.

   --help

           Zobrazí krátkou nápovědu a skončí.

   --prepend-args

           Při spouštění programu umístí parametry určující umístění archivu
           na začátek příkazové řádky, což je výchozí chování. Přebíjí tak
           předchozí výskyty --append-args.

   --no-clean

           Po spuštění příkazu neodstraní rozbalený stavový adresář, což lze
           využít pro ladění. Jméno stavového adresáře se vypíše po skončení
           příkazu.

           Tato volba se zapne automaticky při použití --statedir.

   --really-clean

           Po spuštění příkazu odstraní rozbalený stavový adresář i v
           případech, kdy byly použity volby --no-clean nebo --statedir.

   --statedir

           Nebude brát vstupní-soubor jako archiv, ale jako již rozbalený
           stavový adresář. Můžete využít pro přístup ke stavovému adresáři,
           který byl vytvořen dřívějším spuštěním s parametrem --no-clean.

   --unpack

           Rozbalí vstupní soubor do dočasného adresáře, ale nespustí
           program.

Viz také

   aptitude-create-state-bundle(1), aptitude(8) a apt(8)
