<?php

namespace AsTeam;

use PDO;

class searchDB extends connect
{

    protected function employeesSearchDB($data): array
    {

        $status = 'active';

        $query = $this->db()->prepare("SELECT * FROM employees WHERE firstname LIKE :firstName or lastname LIKE :lastname and employeeStatus=:status");

        $query->bindValue(':firstName', '%' . $data . '%', PDO::PARAM_STR);

        $query->bindValue(':lastname', '%' . $data . '%', PDO::PARAM_STR);

        $query->bindParam(':status', $status, PDO::PARAM_STR);

        $query->execute();

        $control = $query->rowCount();

        if ($control > 0) {

            $array = [];

            while ($check = $query->fetch(PDO::FETCH_ASSOC)) {

                if ($check['employeeStatus'] != 'passive') {

                    $employees = ['code' => $this->lock($check['employeeCode']), 'firstName' => $check['firstname'], 'lastName' => $check['lastname'], 'phone' => $check['phone'], 'Email' => $check['email'], 'Date' => $check['dateOfBirth'], 'workType' => $check['workType'], 'address' => $check['address'], 'tc' => $check['tc'], 'iban' => $check['iban'], 'hesCode' => $check['hesCode']];

                    array_push($array, $employees);

                }

            }

        } else {

            $array['error'] = 'Aradığınız veri bulunamadı veyahutta böyle bir kayıt yoktur';

        }

        return $array;


    }

    /*
    protected function employeeSearchOutgoingQuery($data): array
    {
        $sor = $this->db()->prepare("select * from employees where firstname LIKE :firstname or lastname LIKE :lastname");

        $sor->bindValue(':firstname','%'.$data.'%',PDO::PARAM_STR);

        $sor->bindValue(':lastname','%'.$data.'%',PDO::PARAM_STR);

        $sor->execute();

        $array = [];

        while ($check = $sor->fetch(PDO::FETCH_ASSOC)) {

            $employees = ['code' => $this->lock($check['employeeCode']), 'firstName' => $check['firstname'], 'lastName' => $check['lastname'], 'phone' => $check['phone'], 'Email' => $check['email'], 'Doğum Tarihi' => $check['dateOfBirth'], 'Çalışma Şekli' => $check['workType'], 'address' => $check['address'], 'tc' => $check['tc'], 'iban' => $check['iban'], 'Kayıt Tarihi' => $check['createDate']];

            $array[] = $employees;
        }

        return $array;

    }


    protected function CompanySearch($data): array
    {

        $sor = $this->db()->prepare("SELECT * FROM companies WHERE companyName LIKE :companyName");

        $sor->bindValue(':companyName', '%' . $data . '%', PDO::PARAM_STR);

        $sor->execute();

        $array = [];
        while ($check = $sor->fetch(PDO::FETCH_ASSOC)) {

            $companies = ['companyCode' => $check['companyCode'], 'companyName' => $check['companyName']];

            $array[] = $companies;

        }

        return $array;


    }
    */

}