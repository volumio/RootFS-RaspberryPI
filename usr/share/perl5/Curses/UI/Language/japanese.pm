# ----------------------------------------------------------------------
# Curses::UI::Language::japanese
# Maintainer: Takatoshi Kitano <kitano.tk (at) gmail.com>
# ----------------------------------------------------------------------

package Curses::UI::Language::japanese; 
1;
__DATA__

# ----------------------------------------------------------------------
# For Curses::UI
# ----------------------------------------------------------------------

[screen_too_small]
あなたの画面はこのアプリケーションには小さすぎます。
画面をリサイズして、アプリケーションを再起動してください。
終了するためには<CTRL+C>を押してください。

# ----------------------------------------------------------------------
# For Curses::UI::Calendar
# ----------------------------------------------------------------------

[months]
1月 2月 3月 4月 5月 6月 7月
8月 9月 10月 11月 12月

[days_short] 日 月 火 水 木 金 土

# ----------------------------------------------------------------------
# For Curses::UI::Buttonbox
# ----------------------------------------------------------------------

[button_ok]      o:OK
[button_cancel]  c:キャンセル
[button_yes]     y:はい
[button_no]      n:いいえ

# ----------------------------------------------------------------------
# For Curses::UI::Dialog::Error
# ----------------------------------------------------------------------

[error_title]    エラーメッセージ

# ----------------------------------------------------------------------
# For Curses::UI::Dialog::FileBrowser
# ----------------------------------------------------------------------

# The filebrowser title
[file_title]     ファイルを選択する
[file_savetitle] 保存先のファイルを選択する
[file_loadtitle] ロードするファイルを選択する

# The dirbrowser title
[dir_title]     ディレクトリを選択する

# The labels for the dialog screen.
[file_path]      パス :
[file_file]      ファイル :
[file_mask]      マスク :

# The size of the longest label
[file_labelsize] 6

# On directory up
[file_dirup] 親ディレクトリ

# For asking the user if a file may be overwritten
[file_overwrite_title] 確認
[file_overwrite_question_pre] 
本当にこのファイルを上書きしたいですか "
[file_overwrite_question_post] 
"?

# Errors
[file_err_opendir_pre] ディレクトリを開くことができません "
[file_err_opendir_post] "
[file_err_nofileselected] ファイルを選択していません!


