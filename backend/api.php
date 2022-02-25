<?php
require_once 'route.php';

use AsTeam\{company, employee, login, registers, managers, search, work};

$data = json_decode(file_get_contents('php://input'), true);

$Search = new search();

$Employee = new employee();

$Login = new login();

$Register=new registers();

$Company = new company();

$Work = new work();

$Manager = new managers();

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

    //  $Control = $Login->loginControl(@$_SESSION['email'], @$_SESSION['password']);

    if ($_POST['action'] === 'employeeAdd') {

        $Employee->employeeAdd($_POST, $_FILES);

    } if ($_POST['action'] === 'employeeNewAdd') {

        $Register->employeeRegister($_POST);

    } elseif ($_POST['action'] === 'employeeUpdate') {

        $Employee->employeeUpdate($_POST, $_FILES);

    } elseif ($_POST['action'] === 'employeeDeleted') {

        $Employee->employeeDelete($_POST);

    } elseif ($_POST['action'] === 'employeeList') {

        $Employee->employeeList();

    } elseif ($_POST['action'] === 'employeeFiles') {

        $Employee->employeeFiles($_POST['employeeCode']);

    } elseif ($_POST['action'] === 'employeeSearch') {

        $Search->employeesSearch($_POST);

    } elseif ($_POST['action'] === 'companyAdd') {

        $Company->companyAdd($_POST);

    } elseif ($_POST['action'] === 'companyUpdated') {

        $Company->companyUpdate($_POST);

    } elseif ($_POST['action'] === 'companyDeleted') {

        $Company->companyDelete($_POST['companyCode']);

    } elseif ($_POST['action'] === 'companyList') {

        $Company->companyList();

    } elseif ($_POST['action'] === 'workAdd') {

        $Work->workAdd($_POST);

    } elseif ($_POST['action'] === 'worksList') {

        $Work->works($_POST['employeeCode']);

    } elseif ($_POST['action'] === 'managerAdd') {

        $Manager->managersAdd($_POST);

    } elseif ($_POST['action'] === 'managerUpdate') {

        $Manager->managersUpdate($_POST);

    } elseif ($_POST['action'] === 'managerDeleted') {

        $Manager->managerDeleted($_POST['managerCode']);

    } elseif ($_POST['action'] === 'managersList') {

        $Manager->managersList();

    } elseif ($_POST['action'] === 'login') {

        $Login->login($_POST);

    }

}

//if (!empty($data)) {
//
//    $Search->homeSearch($data);
//
//}