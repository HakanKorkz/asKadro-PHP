<?php

namespace AsTeam;

use PDO;

class loginDB extends connect
{


    /**
     * @param $email
     * @param $password
     * @return array[]|string[]
     */
    protected function loginDB($email, $password): array
    {
        $mail = $email;

        $pass = $password;

        $employeeResult = $this->managersLogin($mail, $pass);

        if (boolval($employeeResult['bool'])) {

            $manger = true;

            $code = $employeeResult['code'];


        } else {

            $manger = false;

        }

        $employeeResult = $this->employeeLogin($mail, $pass);

        if (boolval($employeeResult['bool'])) {

            $code = $employeeResult['code'];

            $employee = true;

        } else {

            $employee = false;

        }

        $companyResult = $this->companyLogin($mail, $pass);

        if (boolval($companyResult['bool'])) {

            $code = $companyResult['code'];

            $company = true;

        } else {

            $company = false;

        }


        if (!boolval($manger) and !boolval($employee) and !boolval($company)) {

            $result = ['warning' => 'Girdiğiniz blgiler ile eşleşen bir kayıt bulunamadı...'];

            $status = 'yetkisiz';

            $conclusion = 'Giriş başarısız';

        } else {

            if (boolval($manger)) {

                $status = 'Yetkili';

                $const = 'manager';

                $bool = true;

            } elseif (boolval($employee)) {

                $status = 'Personel';

                $const = 'employee';

                $bool = true;

            } elseif (boolval($company)) {

                $status = 'Şirket';

                $const = 'company';

                $bool = true;

            } else {

                session_destroy();

                $status = '';

                $const = 'warning';

                $bool = 'Girdiğiniz blgiler ile eşleşen bir kayıt bulunamadı..';

                $code = 0;

            }

//            if (boolval($manger) ||  boolval($employee) || boolval($company)) {
//
//                $_SESSION['email'] = $mail;
//
//                $_SESSION['password'] = $password;
//
//            }


            $result = ['login' => ['code' => $code, $const => $bool]];

            $conclusion = 'Giriş Başarılı';
        }

      //  logs::loginLog($email, $password, $status, $conclusion);

        return $result;

    }

    /*   protected function loginControlDB($email, $password): array
       {
           $mail = $email;

           $pass = $password;

           $manger = '';

           $employeeResult = $this->employeeLogin($mail, $pass);

           $employeeBool = $employeeResult['bool'];

           if ($employeeBool == true) {

               $code = $employeeResult['code'];

               $mangerBool = $this->managersLogin($code);

               if ($mangerBool == true) {

                   $employee = false;

               } else {

                   $employee = true;

                   $manger = false;

               }

           } else {

               $employee = false;

               $manger = false;

           }

           $companyResult = $this->companyLogin($mail, $pass);

           $companyBool = $companyResult['bool'];

           if ($companyBool === true) {

               $code = $companyResult['code'];

               $mangerBool = $this->managersLogin($code);

               if ($mangerBool == true) {

                   $company = false;

                   $manger = true;

               } else {

                   $company = true;

               }

           } else {
               $company = false;

               $manger = false;

           }

           if ($manger == false && $employee == false && $company == false) {

               $result = ['loginPage' => true ,'t'=>2];


           } else {


               $result = ['loginPage' => false, 't'=>1];

           }

           //logs::loginLog($email, $password, $status, $conclusion);

           return $result;

       }*/

    /**
     * @param $email
     * @param $password
     * @return array
     */
    private function employeeLogin($email, $password): array
    {

        $query = $this->db()->prepare("select * from employees where email=:email and employeePassword=:password");

        $query->bindParam(':email', $email, PDO::PARAM_STR);

        $query->bindParam(':password', $password, PDO::PARAM_STR);

        $query->execute();

        $control = $query->rowCount();

        if ($control > 0) {

            $Check = $query->fetch(PDO::FETCH_ASSOC);

            $employeeCode = $Check['employeeCode'];

            $result = ['bool' => true, 'code' => $employeeCode];

        } else {

            $result = ['bool' => false];

        }

        return $result;

    }

    /**
     * @param $email
     * @param $password
     * @return array|string[]
     */
    private function companyLogin($email, $password): array
    {

        $query = $this->db()->prepare("select * from companies where companyEmail=:email and companyPassword=:password");

        $query->bindParam(':email', $email, PDO::PARAM_STR);

        $query->bindParam(':password', $password, PDO::PARAM_STR);

        $query->execute();

        $control = $query->rowCount();

        if ($control > 0) {

            $Check = $query->fetch(PDO::FETCH_ASSOC);

            $companyCode = $Check['companyCode'];

            $result = ['bool' => true, 'code' => $companyCode];

        } else {

            $result = ['bool' => false];

        }

        return $result;

    }

    private function managersLogin($mail, $pass): array
    {

        $query = $this->db()->prepare("select * from managers where managerEmail=:managerEmail and managerPassword=:managerPassword");

        $query->bindParam(':managerEmail', $mail, PDO::PARAM_STR);

        $query->bindParam(':managerPassword', $pass, PDO::PARAM_STR);

        $query->execute();

        $control = $query->rowCount();

        if ($control > 0) {

            $Check = $query->fetch(PDO::FETCH_ASSOC);

            $managerCode = $Check['managerCode'];

            $result = ['bool' => true, 'code' => $managerCode];

        } else {

            $result = ['bool' => false];

        }

        return $result;

    }

}