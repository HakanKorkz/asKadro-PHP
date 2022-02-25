<?php

namespace AsTeam;

use PDO;

class registerDB extends connect
{

    private function employeeRegisterControl($email, $phone): array
    {
        // Kullanıcı var mı kontrol

        $query = $this->db()->prepare("select email,phone from employees where email=:email or phone=:phone");

        $query->bindParam(':email', $email, PDO::PARAM_STR);

        $query->bindParam(':phone', $phone, PDO::PARAM_STR);

        $query->execute();

        $queryControl = $query->rowCount();

        $conclusion = '';

        if ($queryControl > 0) {

            $Check = $query->fetch(PDO::FETCH_ASSOC);

            if ($Check['phone'] === $phone && $Check['email'] === $email) {

                $conclusion = 'Bu E-posta ile ve Telefon numarası ile bir kayıt bulunmaktadır';

            } elseif ($Check['email'] === $email) {

                $conclusion = 'Bu Telefon ile bir kayıt bulunmaktadır';

            } elseif ($Check['phone'] === $phone) {

                $conclusion = 'Bu Telefon numarası ile bir kayıt bulunmaktadır';

            }

            $bool = true;

        } else {

            $bool = false;

        }

        return ['bool' => $bool, 'errors' => $conclusion];

    }

    protected function employeeRegisterDB($firstName, $lastName, $email, $password, $phone, $date)
    {
        $bool = $this->employeeRegisterControl($email, $phone);

        $await = true;

        if ($bool['bool']) {

            $result = $bool['errors'];

            $await = false;

        } else {

            $result = false;
        }

        if ($await) {

            $code = $this->code();

            $Insert = $this->db()->prepare("insert into employees set employeeCode=:code, firstname=:firstname, lastname=:lastname, email=:email, employeePassword=:password, phone=:phone, dateOfBirth=:dateOfBirth");

            $Insert->bindParam(':code', $code, PDO::PARAM_STR);

            $Insert->bindParam(':firstname', $firstName, PDO::PARAM_STR);

            $Insert->bindParam(':lastname', $lastName, PDO::PARAM_STR);

            $Insert->bindParam(':email', $email, PDO::PARAM_STR);

            $Insert->bindParam(':password', $password, PDO::PARAM_STR);

            $Insert->bindParam(':phone', $phone, PDO::PARAM_STR);

            $Insert->bindParam(':dateOfBirth', $date, PDO::PARAM_STR);

            $employeeInsert = $Insert->execute();

            if ($employeeInsert) {

                $result = true;

            }

        }

        return $result;

    }



}