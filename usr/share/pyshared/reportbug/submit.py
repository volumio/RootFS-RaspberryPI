# reportbug_submit module - email and GnuPG functions
#   Written by Chris Lawrence <lawrencc@debian.org>
#   Copyright (C) 1999-2006 Chris Lawrence
#   Copyright (C) 2008-2012 Sandro Tosi <morph@debian.org>
#
# This program is freely distributable per the following license:
#
##  Permission to use, copy, modify, and distribute this software and its
##  documentation for any purpose and without fee is hereby granted,
##  provided that the above copyright notice appears in all copies and that
##  both that copyright notice and this permission notice appear in
##  supporting documentation.
##
##  I DISCLAIM ALL WARRANTIES WITH REGARD TO THIS SOFTWARE, INCLUDING ALL
##  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS, IN NO EVENT SHALL I
##  BE LIABLE FOR ANY SPECIAL, INDIRECT OR CONSEQUENTIAL DAMAGES OR ANY
##  DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS,
##  WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION,
##  ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS
##  SOFTWARE.

import sys
import os
import re
import commands
from subprocess import Popen, STDOUT, PIPE
import rfc822
import smtplib
import socket
import email
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
from email.MIMEAudio import MIMEAudio
from email.MIMEImage import MIMEImage
from email.MIMEBase import MIMEBase
from email.MIMEMessage import MIMEMessage
from email.Header import Header
import mimetypes

from __init__ import VERSION, VERSION_NUMBER
from tempfiles import TempFile, open_write_safe, tempfile_prefix
from exceptions import (
    NoMessage,
    )
import ui.text_ui as ui
from utils import get_email_addr

quietly = False

ascii_range = ''.join([chr(ai) for ai in range(32,127)])
notascii = re.compile(r'[^'+re.escape(ascii_range)+']')
notascii2 = re.compile(r'[^'+re.escape(ascii_range)+r'\s]')

# Wrapper for MIMEText
class BetterMIMEText(MIMEText):
    def __init__(self, _text, _subtype='plain', _charset=None):
        MIMEText.__init__(self, _text, _subtype, 'us-ascii')
        # Only set the charset paraemeter to non-ASCII if the body
        # includes unprintable characters
        if notascii2.search(_text):
            self.set_param('charset', _charset)

def encode_if_needed(text, charset, encoding='q'):
    needed = False

    if notascii.search(text):
        # Fall back on something vaguely sensible if there are high chars
        # and the encoding is us-ascii
        if charset == 'us-ascii':
            charset = 'iso-8859-15'
        return Header(text, charset)
    else:
        return Header(text, 'us-ascii')

def rfc2047_encode_address(addr, charset, mua=None):
    newlist = []
    addresses = rfc822.AddressList(addr).addresslist
    for (realname, address) in addresses:
        if realname:
            newlist.append( email.Utils.formataddr(
                (str(rfc2047_encode_header(realname, charset, mua)), address)))
        else:
            newlist.append( address )
    return ', '.join(newlist)

def rfc2047_encode_header(header, charset, mua=None):
    if mua: return header
    #print repr(header), repr(charset)

    return encode_if_needed(header, charset)

# Cheat for now.
# ewrite() may put stuff on the status bar or in message boxes depending on UI
def ewrite(*args):
    return quietly or ui.log_message(*args)

def sign_message(body, fromaddr, package='x', pgp_addr=None, sign='gpg', draftpath=None):
    '''Sign message with pgp key.'''
    ''' Return: a signed body.
        On failure, return None.
        kw need to have the following keys
    '''
    if not pgp_addr:
        pgp_addr = get_email_addr(fromaddr)[1]

    # Make the unsigned file first
    (unsigned, file1) = TempFile(prefix=tempfile_prefix(package, 'unsigned'), dir=draftpath)
    unsigned.write(body)
    unsigned.close()

    # Now make the signed file
    (signed, file2) = TempFile(prefix=tempfile_prefix(package, 'signed'), dir=draftpath)
    signed.close()

    if sign == 'gpg':
        os.unlink(file2)
        if 'GPG_AGENT_INFO' not in os.environ:
            signcmd = "gpg --local-user '%s' --clearsign " % pgp_addr
        else:
            signcmd = "gpg --local-user '%s' --use-agent --clearsign " % pgp_addr
        signcmd += '--output '+commands.mkarg(file2)+ ' ' + commands.mkarg(file1)
    else:
        signcmd = "pgp -u '%s' -fast" % pgp_addr
        signcmd += '<'+commands.mkarg(file1)+' >'+commands.mkarg(file2)

    try:
        os.system(signcmd)
        x = file(file2, 'r')
        signedbody = x.read()
        x.close()

        if os.path.exists(file1):
            os.unlink(file1)
        if os.path.exists(file2):
            os.unlink(file2)

        if not signedbody:
            raise NoMessage
        body = signedbody
    except (NoMessage, IOError, OSError):
        fh, tmpfile2 = TempFile(prefix=tempfile_prefix(package), dir=draftpath)
        fh.write(body)
        fh.close()
        ewrite('gpg/pgp failed; input file in %s\n', tmpfile2)
        body = None
    return body

def mime_attach(body, attachments, charset, body_charset=None):
    mimetypes.init()

    message = MIMEMultipart('mixed')
    bodypart = BetterMIMEText(body, _charset=(body_charset or charset))
    bodypart.add_header('Content-Disposition', 'inline')
    message.preamble = 'This is a multi-part MIME message sent by reportbug.\n\n'
    message.epilogue = ''
    message.attach(bodypart)
    failed = False
    for attachment in attachments:
        try:
            fp = file(attachment)
            fp.close()
        except EnvironmentError, x:
            ewrite("Warning: opening '%s' failed: %s.\n", attachment,
                   x.strerror)
            failed = True
            continue
        ctype = None
        cset = charset
        info = Popen(['file','--mime', '--brief', attachment],
            stdout=PIPE, stderr=STDOUT).communicate()[0]
        if info:
            match = re.match(r'([^;, ]*)(,[^;]+)?(?:; )?(.*)', info)
            if match:
                ctype, junk, extras = match.groups()
                match = re.search(r'charset=([^,]+|"[^,"]+")', extras)
                if match:
                    cset = match.group(1)
                # If we didn't get a real MIME type, fall back
                if '/' not in ctype:
                    ctype = None
        # If file doesn't work, try to guess based on the extension
        if not ctype:
            ctype, encoding = mimetypes.guess_type(
                attachment, strict=False)
        if not ctype:
            ctype = 'application/octet-stream'

        maintype, subtype = ctype.split('/', 1)
        if maintype == 'text':
            fp = file(attachment, 'rU')
            part = BetterMIMEText(fp.read(), _subtype=subtype,
                                  _charset=cset)
            fp.close()
        elif maintype == 'message':
            fp = file(attachment, 'rb')
            part = MIMEMessage(email.message_from_file(fp),
                               _subtype=subtype)
            fp.close()
        elif maintype == 'image':
            fp = file(attachment, 'rb')
            part = MIMEImage(fp.read(), _subtype=subtype)
            fp.close()
        elif maintype == 'audio':
            fp = file(attachment, 'rb')
            part = MIMEAudio(fp.read(), _subtype=subtype)
            fp.close()
        else:
            fp = file(attachment, 'rb')
            part = MIMEBase(maintype, subtype)
            part.set_payload(fp.read())
            fp.close()
            email.Encoders.encode_base64(part)
        part.add_header('Content-Disposition', 'attachment',
                        filename=os.path.basename(attachment))
        message.attach(part)
    return (message, failed)

def send_report(body, attachments, mua, fromaddr, sendto, ccaddr, bccaddr,
                headers, package='x', charset="us-ascii", mailing=True,
                sysinfo=None,
                rtype='debbugs', exinfo=None, replyto=None, printonly=False,
                template=False, outfile=None, mta='', kudos=False,
                smtptls=False, smtphost='localhost',
                smtpuser=None, smtppasswd=None, paranoid=False, draftpath=None,
                envelopefrom=None):
    '''Send a report.'''

    failed = using_sendmail = False
    msgname = ''
    # Disable smtphost if mua is set
    if mua and smtphost:
        smtphost = ''

    # No, I'm not going to do a full MX lookup on every address... get a
    # real MTA!
    if kudos and smtphost == 'reportbug.debian.org':
        smtphost = 'packages.debian.org'

    body_charset = charset
    if isinstance(body, unicode):
        # Since the body is Unicode, utf-8 seems like a sensible body encoding
        # to choose pretty much all the time.
        body = body.encode('utf-8', 'replace')
        body_charset = 'utf-8'

    tfprefix = tempfile_prefix(package)
    if attachments and not mua:
        (message, failed) = mime_attach(body, attachments, charset, body_charset)
        if failed:
            ewrite("Error: Message creation failed, not sending\n")
            mua = mta = smtphost = None
    else:
        message = BetterMIMEText(body, _charset=body_charset)

    # Standard headers
    message['From'] = rfc2047_encode_address(fromaddr, 'utf-8', mua)
    message['To'] = rfc2047_encode_address(sendto, charset, mua)

    for (header, value) in headers:
        if header in ['From', 'To', 'Cc', 'Bcc', 'X-Debbugs-CC', 'Reply-To',
                      'Mail-Followup-To']:
            message[header] = rfc2047_encode_address(value, charset, mua)
        else:
            message[header] = rfc2047_encode_header(value, charset, mua)

    if ccaddr:
        message['Cc'] = rfc2047_encode_address(ccaddr, charset, mua)

    if bccaddr:
        message['Bcc'] = rfc2047_encode_address(bccaddr, charset, mua)

    replyto = os.environ.get("REPLYTO", replyto)
    if replyto:
        message['Reply-To'] = rfc2047_encode_address(replyto, charset, mua)

    if mailing:
        message['Message-ID'] = email.Utils.make_msgid('reportbug')
        message['X-Mailer'] = VERSION
        message['Date'] = email.Utils.formatdate(localtime=True)
    elif mua and not (printonly or template):
        message['X-Reportbug-Version'] = VERSION_NUMBER

    addrs = [str(x) for x in (message.get_all('To', []) +
                              message.get_all('Cc', []) +
                              message.get_all('Bcc', []))]
    alist = email.Utils.getaddresses(addrs)

    cclist = [str(x) for x in message.get_all('X-Debbugs-Cc', [])]
    debbugs_cc = email.Utils.getaddresses(cclist)
    if cclist:
        del message['X-Debbugs-Cc']
        addrlist = ', '.join(cclist)
        message['X-Debbugs-Cc'] = rfc2047_encode_address(addrlist, charset, mua)

    # Drop any Bcc headers from the message to be sent
    if not outfile and not mua:
        try:
            del message['Bcc']
        except:
            pass

    message = message.as_string()
    if paranoid and not (template or printonly):
        pager = os.environ.get('PAGER', 'sensible-pager')
        os.popen(pager, 'w').write(message)
        if not ui.yes_no('Does your report seem satisfactory', 'Yes, send it.',
                         'No, don\'t send it.'):
            smtphost = mta = None

    filename = None
    if template or printonly:
        pipe = sys.stdout
    elif mua:
        pipe, filename = TempFile(prefix=tfprefix, dir=draftpath)
    elif outfile or not ((mta and os.path.exists(mta)) or smtphost):
        msgname = outfile or ('/var/tmp/%s.bug' % package)
        if os.path.exists(msgname):
            try:
                os.rename(msgname, msgname+'~')
            except OSError:
                ewrite('Unable to rename existing %s as %s~\n',
                       msgname, msgname)
        try:
            pipe = open_write_safe(msgname, 'w')
        except OSError:
            # we can't write to the selected file, use a temp file instead
            fh, newmsgname = TempFile(prefix=tfprefix, dir=draftpath)
            ewrite('Writing to %s failed; '
                   'using instead %s\n', msgname, newmsgname)
            msgname = newmsgname
            # we just need a place where to write() and a file handler
            # is here just for that
            pipe = fh
    elif mta and not smtphost:
        try:
            x = os.getcwd()
        except OSError:
            os.chdir('/')

        malist = [commands.mkarg(a[1]) for a in alist]
        jalist = ' '.join(malist)

        faddr = rfc822.parseaddr(fromaddr)[1]
        if envelopefrom:
            envfrom = rfc822.parseaddr(envelopefrom)[1]
        else:
            envfrom = faddr
        ewrite("Sending message via %s...\n", mta)
        pipe = os.popen('%s -f %s -oi -oem %s' % (
                mta, commands.mkarg(envfrom), jalist), 'w')
        using_sendmail = True

    if smtphost:
        toaddrs = [x[1] for x in alist]
        smtp_message = re.sub(r'(?m)^[.]', '..', message)

        tryagain = True
        refused = None
        retry = 0
        while tryagain:
            tryagain = False
            ewrite("Connecting to %s via SMTP...\n", smtphost)
            try:
                conn = None
                # if we're using reportbug.debian.org, send mail to
                # submit
                if smtphost.lower() == 'reportbug.debian.org':
                    conn = smtplib.SMTP(smtphost,587)
                else: 
                    conn = smtplib.SMTP(smtphost)
                response = conn.ehlo()
                if not (200 <= response[0] <= 299):
                    conn.helo()
                if smtptls:
                    conn.starttls()
                    response = conn.ehlo()
                    if not (200 <= response[0] <= 299):
                        conn.helo()
                if smtpuser:
                    if not smtppasswd:
                        smtppasswd = ui.get_password(
                            'Enter SMTP password for %s@%s: ' %
                            (smtpuser, smtphost))
                    conn.login(smtpuser, smtppasswd)
                refused = conn.sendmail(fromaddr, toaddrs, smtp_message)
                conn.quit()
            except (socket.error, smtplib.SMTPException), x:
                # If wrong password, try again...
                if isinstance(x, smtplib.SMTPAuthenticationError):
                    ewrite('SMTP error: authentication failed.  Try again.\n')
                    tryagain = True
                    smtppasswd = None
                    retry += 1
                    if retry <= 2:
                        continue
                    else:
                        tryagain = False

                # In case of failure, ask to retry or to save & exit
                if ui.yes_no('SMTP send failure: %s. Do you want to retry (or else save the report and exit)?' % x, 'Yes, please retry.',
                         'No, save and exit.'):
                    tryagain = True
                    continue
                else:
                    failed = True

                    fh, msgname = TempFile(prefix=tfprefix, dir=draftpath)
                    fh.write(message)
                    fh.close()

                    ewrite('Wrote bug report to %s\n', msgname)
        # Handle when some recipients are refused.
        if refused:
            for (addr, err) in refused.iteritems():
                ewrite('Unable to send report to %s: %d %s\n', addr, err[0],
                       err[1])
            fh, msgname = TempFile(prefix=tfprefix, dir=draftpath)
            fh.write(message)
            fh.close()

            ewrite('Wrote bug report to %s\n', msgname)
    else:
        try:
            pipe.write(message)
            pipe.flush()
            if msgname:
                ewrite("Bug report written as %s\n", msgname)
        except IOError:
            failed = True
            pipe.close()

        if failed or (pipe.close() and using_sendmail):
            failed = True
            fh, msgname = TempFile(prefix=tfprefix, dir=draftpath)
            fh.write(message)
            fh.close()
            ui.long_message('Error: send/write operation failed, bug report '
                            'saved to %s\n', msgname)

    if mua:
        ewrite("Spawning %s...\n", mua.name)
        returnvalue = 0
        succeeded = False
        while not succeeded:
            returnvalue = mua.send(filename)
            if returnvalue != 0:
                ewrite("Mutt users should be aware it is mandatory to edit the draft before sending.\n")
                mtitle = 'Report has not been sent yet; what do you want to do now?'
                mopts = 'Eq'
                moptsdesc = {'e' : 'Edit the message.',
                'q' : 'Quit reportbug; will save the draft for future use.'}
                x = ui.select_options(mtitle, mopts, moptsdesc)
                if x == 'q':
                    failed = True
                    fh, msgname = TempFile(prefix=tfprefix, dir=draftpath)
                    fh.write(message)
                    fh.close()
                    ewrite('Draft saved into %s\n', msgname)
                    succeeded = True
            else:
                succeeded = True

    elif not failed and (using_sendmail or smtphost):
        if kudos:
            ewrite('\nMessage sent to: %s\n', sendto)
        else:
            ewrite("\nBug report submitted to: %s\n", sendto)

        addresses = []
        for addr in alist:
            if addr[1] != rfc822.parseaddr(sendto)[1]:
                addresses.append(addr)

        if len(addresses):
            ewrite("Copies sent to:\n")
            for address in addrs:
                ewrite('  %s\n', address)

        if debbugs_cc and rtype == 'debbugs':
            ewrite("Copies will be sent after processing to:\n")
            for address in cclist:
                ewrite('  %s\n', address)

    if not (exinfo or kudos) and rtype == 'debbugs' and sysinfo and not failed:
        ewrite('\n')
        ui.long_message(
            """If you want to provide additional information, please wait to
receive the bug tracking number via email; you may then send any extra
information to %s (e.g. %s), where n is the bug number.  Normally you
will receive an acknowledgement via email including the bug report number
within an hour; if you haven't received a confirmation, then the bug reporting process failed at some point (reportbug or MTA failure, BTS maintenance, etc.).\n""",
            (sysinfo['email'] % 'n'), (sysinfo['email'] % '999999'))

    # If we've stored more than one copy of the message, delete the
    # one without the SMTP headers.
    if filename and os.path.exists(msgname) and os.path.exists(filename):
        try:
            os.unlink(filename)
        except:
            pass

    if filename and os.path.exists(filename) and not mua:
        # Message is misleading if an MUA is used.
        ewrite("A copy of the report is stored as: %s\n" % filename)
    return
