# ----------------------------------------------------------------------
# Curses::UI::Language::czech
# Maintainer: Jiri Vaclavik<jiri.vaclavik@gmail.com>
# ----------------------------------------------------------------------

package Curses::UI::Language::czech;
1;
__DATA__

# ----------------------------------------------------------------------
# For Curses::UI
# ----------------------------------------------------------------------

[screen_too_small]
Vase obrazovka je prilis mala pro tuto aplikaci.
Zmente velikost obrazovky a aplikaci spustte znovu.
Stisknete <CTRL+C> pro konec...

# ----------------------------------------------------------------------
# For Curses::UI::Calendar
# ----------------------------------------------------------------------

[months]
Leden Unor Brezen Duben Kveten Cerven Cervenec
Srpen Zari Rijen Listopad Prosinec

[days_short] Ne Po Ut St Ct Pa So

# ----------------------------------------------------------------------
# For Curses::UI::Buttonbox
# ----------------------------------------------------------------------

[button_ok]      o:OK
[button_cancel]  c:Zrusit
[button_yes]     y:Ano
[button_no]      n:Ne

# ----------------------------------------------------------------------
# For Curses::UI::Dialog::Error
# ----------------------------------------------------------------------

[error_title]    Chybova zprava

# ----------------------------------------------------------------------
# For Curses::UI::Dialog::FileBrowser
# ----------------------------------------------------------------------

# The filebrowser title
[file_title]     Vyber soubor
[file_savetitle] Vyber soubor pro ulozeni
[file_loadtitle] Vyber soubor pro nacteni

# The dirbrowser title
[dir_title]     Vyber adresar

# The labels for the dialog screen.
[file_path]      Cesta  :
[file_file]      Soubor :
[file_mask]      Maska  :

# The size of the longest label
[file_labelsize] 8

# On directory up
[file_dirup] Rodicovsky adresar

# For asking the user if a file may be overwritten
[file_overwrite_title] Prepsani
[file_overwrite_question_pre]
Opravdu chcete prepsat soubor "
[file_overwrite_question_post]
"?

# Errors
[file_err_opendir_pre] Adresar nelze otevrit! "
[file_err_opendir_post] "
[file_err_nofileselected] Nevybral jste soubor!
