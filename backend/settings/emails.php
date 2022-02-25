<?php

namespace AsTeam;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

class emails extends PHPMailer
{
    public function sendSingle()
    {

        $mail = new PHPMailer(true);

        try {
            //Server settings
            $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'mail.hakankorkmaz.site';                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = 'admin@hakankorkmaz.site';                     //SMTP username
            $mail->Password   = '7JSQPGnibxFNZUz';                               //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
            $mail->Port       = 465; //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
            $mail->CharSet='utf-8';

            //Recipients
            $mail->setFrom('admin@hakankorkmaz.site', 'Hakankorkmaz.site');
            $mail->addAddress('hakan.hizmet.54.gs@gmail.com', 'Hakan Korkmaz');     //Add a recipient

            //Attachments


            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = 'Here is the subject';
            $mail->Body    = 'This is the HTML message body <b>in bold!</b>';

            $mail->send();
            echo 'E-posta Gönderildi';
        } catch (Exception $e) {
            echo "Eposta Gönderilemedi: {$mail->ErrorInfo}";
        }

    }
}