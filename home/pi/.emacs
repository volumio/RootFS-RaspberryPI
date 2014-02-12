; Assigh z-key to music-file-copy
(add-hook 'dired-mode-hook
  (lambda ()
     (define-key dired-mode-map "z" 'dired-cp-music)))
; Copy music file
(defun dired-cp-music ()
  (interactive)
  (let ((file (dired-get-filename)))
    (message "file copy start")
    (setq buf (get-buffer-create "copy_music_file"))
    (with-current-buffer buf
    (erase-buffer))
    (call-process "rm" nil buf nil "-r" "/dev/shm/music_mem")
    (call-process "cp" nil buf nil file "-r" "/dev/shm/music_mem")
    (call-process "ls" nil buf nil "-l" "/dev/shm/music_mem")
    (call-process "/root/mpc_start.sh" nil buf nil)
    (display-buffer buf)))
