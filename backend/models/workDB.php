<?php

namespace AsTeam;

use PDO;

class workDB extends connect
{

    /**
     * @param $workCode
     * @param $companyCode
     * @param $employeeCode
     * @param $price
     * @param $addPrice
     * @param $date
     * @param $time
     * @param $nextWork
     * @return bool
     */
    protected function workAddDB($workCode, $companyCode, $employeeCode, $price, $addPrice, $date, $time, $nextWork): bool
    { // işe yollama sistemi

        $createDate = date('Y-m-d H:i:s');

        $updateDate = '0000-00-00 00:00:00';

        $Insert = $this->db()->prepare("insert into  works set workCode=:workCode, companyCode=:companyCode, employeeCode=:employeeCode, price=:price, addPrice=:addPrice, nextWork=:nextWork, workDate=:workDate, workTime=:workTime,createDate=:createDate,updateDate=:updateDate");

        $Insert->bindParam(':workCode', $workCode, PDO::PARAM_INT);

        $Insert->bindParam(':companyCode', $companyCode, PDO::PARAM_INT);

        $Insert->bindParam(':employeeCode', $employeeCode, PDO::PARAM_INT);

        $Insert->bindParam(':price', $price, PDO::PARAM_STR);

        $Insert->bindParam(':addPrice', $addPrice, PDO::PARAM_STR);

        $Insert->bindParam(':nextWork', $nextWork, PDO::PARAM_INT);

        $Insert->bindParam(':workDate', $date, PDO::PARAM_STR);

        $Insert->bindParam(':workTime', $time, PDO::PARAM_STR);

        $Insert->bindParam(':createDate', $createDate, PDO::PARAM_STR);

        $Insert->bindParam(':updateDate', $updateDate, PDO::PARAM_STR);

        $Add = $Insert->execute();

        $await = false;

        if ($Add) {

            $addResult = true;

            $next = $nextWork - 1;

            for ($i = 0; $i <= $next; $i++) {

                $code = $this->code();

                $dateNext = date('Y-m-d', strtotime($date . '+' . $i . ' day'));

                $Insert = $this->db()->prepare("insert into  worksprices set workCode=:workCode, workPriceCode=:workPriceCode, employeeCode=:employeeCode, price=:price, addPrice=:addPrice, workPriceDate=:workPriceDate, createDate=:createDate,updateDate=:updateDate");

                $Insert->bindParam(':workCode', $workCode, PDO::PARAM_INT);

                $Insert->bindParam(':workPriceCode', $code, PDO::PARAM_INT);

                $Insert->bindParam(':employeeCode', $employeeCode, PDO::PARAM_INT);

                $Insert->bindParam(':price', $price, PDO::PARAM_STR);

                $Insert->bindParam(':addPrice', $addPrice, PDO::PARAM_STR);

                $Insert->bindParam(':workPriceDate', $dateNext, PDO::PARAM_STR);

                $Insert->bindParam(':createDate', $createDate, PDO::PARAM_STR);

                $Insert->bindParam(':updateDate', $updateDate, PDO::PARAM_STR);

                $I = $Insert->execute();

                if ($I) {

                    $await = true;

                }

            }

        } else {

            $addResult = false;
        }

        if ($await && $addResult) {

            $result = true;

        } else {

            $result = false;
        }

        return $result;

    }

    protected function worksDB($code)
    { // gidilen işler listesi seçilen personel

        $query = $this->db()->prepare("select companies.*,works.* from works inner join companies on companies.companyCode=works.companyCode where works.employeeCode=:employeeCode order by works.createDate DESC");

        $query->bindParam(':employeeCode', $code, PDO::PARAM_INT);

        $query->execute();

        $control = $query->rowCount();

        if ($control > 0) {

            $worksPersonal = [];


            while ($check = $query->fetch(PDO::FETCH_ASSOC)) {


                $works = ['workCode' => $this->lock($check['workCode']), 'companyCode' => $this->lock($check['companyCode']), 'employeeCode' => $this->lock($check['employeeCode']), 'companyName' => $check['companyName'], 'price' => $check['price'], 'addPrice' => $check['addPrice'], 'nextWork' => $check['nextWork'], 'workDate' => $check['workDate'], 'workTime' => $check['workTime'], 'createDate' => $check['createDate'], 'updateDate' => $check['updateDate']];

                $worksPersonal['worksPersonal'][] = $works;

            }


            $query = $this->db()->prepare("select * from worksprices where employeeCode=:employeeCode");

            $query->bindParam(':employeeCode', $code, PDO::PARAM_INT);

            $query->execute();

            $worksPersonalPrices = [];


            while ($check = $query->fetch(PDO::FETCH_ASSOC)) {


                $worksPrices = ['workCode' => $this->lock($check['workCode']), 'workPriceCode' => $this->lock($check['workPriceCode']), 'employeeCode' => $this->lock($check['employeeCode']), 'price' => $check['price'], 'addPrice' => $check['addPrice'], 'workPriceDate' => $check['workPriceDate'],'workPriceStatus' => $check['workPriceStatus'], 'createDate' => $check['createDate'], 'updateDate' => $check['updateDate']];

                $worksPersonalPrices['worksPersonalPrices'][] = $worksPrices;

            }

            $array = $worksPersonal + $worksPersonalPrices;


        } else {

            $array = 'Aktif iş kaydı bulunmamaktadır...';

        }

        return $array;


    }
}