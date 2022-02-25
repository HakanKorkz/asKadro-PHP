<?php

require_once 'route.php';

//$data = json_decode(file_get_contents('php://input'), true);

//echo '<hr>';
//echo "<pre>";
//echo 'JSON: ';
//print_r($data);
//echo "</pre>";
//echo "<hr>";
//echo "<pre>";
//echo 'POST: ';
//print_r($_POST);
//echo "</pre>";
//echo "<hr>";
//echo "<hr>";
//echo "<pre>";
//echo 'GET: ';
//print_r($_GET);
//echo "</pre>";
//echo "<hr>";
//echo "<pre>";
//echo 'FILES: ';
//print_r($_FILES);
//echo "</pre>";
//echo "<hr>";
//exit();

if (isset($_POST['action'])) {

    $data = $_POST['arGe'];

    $_SESSION['Data'] = $data;

    setcookie('Data2', $data, time() + 60, '/', 'localhost', true, true);

    setcookie('Data3', $data, time() + 60, '/frontend/', 'localhost', true, true);

} else {

    echo 'SESSİON <pre>';
    print_r($_SESSION);
    echo '<pre>';

    echo 'Çerez <pre>';
    print_r($_COOKIE);
    echo '</pre>';

}