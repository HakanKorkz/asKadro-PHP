<?php
// 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/language/phpmailer.lang-tr.php';
require '../Connect/baglan.php';


$AyarSor=$db->prepare("SELECT * from site_ayarlar");

$AyarSor->execute();

$Cek=$AyarSor->fetch(PDO::FETCH_ASSOC);

 $Port=$Cek['SMTP_Port'];

 $Host=$Cek['SMTP_Host'];

 $Mail=$Cek['SMTP_Mail'];

 $Pass=$Cek['SMTP_Pass'];


$mail = new PHPMailer();
$mail->isSMTP();
$mail->SMTPKeepAlive = true;
$mail->SMTPAuth = true;
$mail->CharSet = 'utf-8';
$mail->SMTPSecure = 'ssl'; //ssl

$mail->Port = $Port; //25 , 465 , 587
$mail->Host = $Host; // examle@example.com

$mail->Username = $Mail;
$mail->Password = $Pass;

// $mail->setFrom($Mail);


// $mail->addAddress("hakan.hizmet.54.gs@gmail.com");

// $body ="Tester";# file_get_contents('./aktivasyon.html');
// // $url="https://www.youtube.com/watch?v=mPkBqawinFU";
// // $gelen = ["kadi","url"];
// // $giden = ["HakanKorkz",$url];

// // $body = str_replace($gelen,$giden,$body);

// $mail->isHTML(true);
// $mail->Subject = "Animasyon Okulu test";
// $mail->Body = $body;

// if ($mail->send())
//     echo "Mail gonderimi basarili.";
// else
//     echo "Malesef olmadi.";


?>