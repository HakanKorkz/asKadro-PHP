<?php

namespace AsTeam;

class work extends workDB
{


    public function workAdd($data): bool
    {

        $companyCode = $this->open($data['companyCode']);

        $employeeCode = $this->open($data['code']);

        $workCode = time();

        $price = $data['price'];

        $addPrice = $data['addPrice'];

        $date = $data['date'];

        $time = $data['time'];

        $nextWork = $data['nextWork'];

        $result = ['result' => $this->workAddDB($workCode, $companyCode, $employeeCode, $price, $addPrice, $date, $time, $nextWork)];

        echo json_encode($result);

        return false;

    }

    /**
     * @param $data
     * @return bool
     */
    public function works($data): bool
    {

        $employeeCode=$this->open($data);

        $result['result'] = $this->worksDB($employeeCode);

        echo json_encode($result);

        return true;

    }

}