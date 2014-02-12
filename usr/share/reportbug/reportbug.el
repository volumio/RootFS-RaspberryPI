;; Vague implementation of needed code to invoke GNUS from reportbug
;; by Tollef Fog Heen
(require 'gnus)

;; Match each component of Gnus' version number.
(string-match "^\\([0-9]+\\)\\.\\([0-9]+\\)\\(?:\\.\\([0-9]+\\)\\)?$"
	      gnus-version-number)
;; Only load gnus-load if using a separately packaged Gnus (that is,
;; not the Gnus bundled with Emacs).
(if (or
     ;; Check for a separately packaged release of Gnus
     ;; (second component of version number even):
     (= (% (string-to-number (match-string 2 gnus-version-number)) 2) 0)
     ;; Check for a separately packaged pre-release of Gnus
     ;; (first component of version number 0):
     (= (string-to-number (match-string 1 gnus-version-number)) 0))
    (require 'gnus-load))

(defun tfheen-set-header (header value)
  "Insert a string at the beginning of a header."
  (message-narrow-to-head)
  (goto-char (point-min))
  (search-forward (format "%s: " header) (point-max) t)
  (insert value)
  (widen))

(defun tfheen-reportbug-insert-template (reportbug-template)
  (interactive)
  (require 'gnus)
  (find-file reportbug-template)
  (let ((subject (message-fetch-field "Subject"))
        (toaddr (or (message-fetch-field "To") "submit@bugs.debian.org")))
    (gnus-narrow-to-body)
    (let ((body (or (buffer-string) "")))
      (gnus-summary-mail-other-window)
      (tfheen-set-header "Subject" subject)
      (tfheen-set-header "To" toaddr)
      (gnus-narrow-to-body)
      (insert body)
      (goto-char (point-min))
      (search-forward "\n\n" nil t)
      (widen)))
  (kill-buffer (find-buffer-visiting reportbug-template)))
