<?php

namespace AsTeam;

use PDO;

class managersDB extends connect
{

    private function control($email): array
    {

        $query = $this->db()->prepare("select * from managers where managerEmail=:email");

        $query->bindParam(':email', $email, PDO::PARAM_STR);

        $query->execute();

        $control = $query->rowCount();

        if ($control > 0) {

            $result = ['bool' => true, 'reply' => 'Bu email ile kayıtlı bir yetkili bulunmaktadır..'];

        } else {

            $result = ['bool' => false];

        }

        return $result;

    }

    /**
     * @param $email
     * @param $password
     * @return bool|mixed
     */
    protected function managerAddDB($email, $password)
    {
        $control = $this->control($email);

        if ($control['bool']) {

            $await = false;

            $result = $control['reply'];

        } else {

            $await = true;

            $result = false;

        }

        if ($await) {

            $code = $this->code();

            $updateDate = '000-00-00 00:00:00';

            $Insert = $this->db()->prepare("insert into managers set managerCode=:managerCode, managerEmail=:managerEmail, managerPassword=:managerPassword,managerDateOfUpdate=:managerDateOfUpdate");

            $Insert->bindParam(':managerCode', $code, PDO::PARAM_INT);

            $Insert->bindParam(':managerEmail', $email, PDO::PARAM_STR);

            $Insert->bindParam(':managerPassword', $password, PDO::PARAM_STR);

            $Insert->bindParam(':managerDateOfUpdate', $updateDate, PDO::PARAM_STR);

            $managerAdd = $Insert->execute();

            if ($managerAdd) {

                $result = true;

            } else {

                $result = false;

            }

        }

        return $result;

    }

    /**
     * @param $email
     * @param $password
     * @param $code
     * @return bool
     */
    protected function managerUpdateDB($email, $password,$code): bool
    {

        $updateDate = date('Y-m-d H:i:s');

        $Update = $this->db()->prepare("update managers set managerEmail=:managerEmail, managerPassword=:managerPassword,managerDateOfUpdate=:managerDateOfUpdate where managerCode=:managerCode");

        $Update->bindParam(':managerEmail', $email, PDO::PARAM_STR);

        $Update->bindParam(':managerPassword', $password, PDO::PARAM_STR);

        $Update->bindParam(':managerDateOfUpdate', $updateDate, PDO::PARAM_STR);

        $Update->bindParam(':managerCode', $code, PDO::PARAM_INT);

        $managerUpdate = $Update->execute();

        if ($managerUpdate) {

            $result = true;

        } else {

            $result = false;

        }

        return $result;

    }

    /**
     * @return array
     */

    protected function managersListDB(): array
    {
        $query = $this->db()->prepare("select * from managers");

        $query->execute();

        $managers = [];

        while ($check = $query->fetch(PDO::FETCH_ASSOC)) {

            $manager = ['managerCode' => $this->lock($check['managerCode']), 'managerEmail' => $check['managerEmail'], 'managerPassword' => $check['managerPassword'], 'managerCreationDate' => $check['managerCreationDate'], 'managerDateOfUpdate' => $check['managerDateOfUpdate']];

            array_push($managers, $manager);

        }


        return $managers;
    }



    protected function managerDeletedDB($code): bool
    {

        $deleted = $this->db()->prepare("delete from managers where managerCode=:managerCode");

        $deleted->bindParam(':managerCode', $code, PDO::PARAM_INT);

        $managerDeleted=$deleted->execute();

        if ($managerDeleted) {

            $result=true;

        }     else {

            $result=false;
        }

        return $result;

    }

}