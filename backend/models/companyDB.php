<?php

namespace AsTeam;

use PDO;

class companyDB extends connect
{
    /**
     * @param $companyName
     * @param $email
     * @param $password
     * @param $phone
     * @param $humanResourcesName
     * @param $humanResourcesPhone
     * @param $givePrice
     * @param $location
     * @param $taxNumber
     * @param $Invoice
     * @param $service
     * @return bool
     */
    protected function companyAddDB($companyName, $email, $password, $phone, $humanResourcesName, $humanResourcesPhone, $givePrice, $location, $taxNumber, $Invoice, $service): bool
    {
        $code = $this->code();

        $Insert = $this->db()->prepare("insert into companies set companyCode=:Code, companyName=:companyName, companyEmail=:Email, companyPassword=:password, companyPhone=:Phone, companyHumanResourcesPhone=:humanResourcesPhone,companyHumanResourcesName=:humanResourcesName, companyLocation=:location, companyGivePrice=:givePrice, companyTaxNumber=:taxNumber, companyInvoice=:Invoice, companyService=:service");

        $Insert->bindParam(':Code', $code, PDO::PARAM_INT);

        $Insert->bindParam(':companyName', $companyName, PDO::PARAM_STR);

        $Insert->bindParam(':Email', $email, PDO::PARAM_STR);

        $Insert->bindParam(':password', $password, PDO::PARAM_STR);

        $Insert->bindParam(':Phone', $phone, PDO::PARAM_STR);

        $Insert->bindParam(':humanResourcesPhone', $humanResourcesPhone, PDO::PARAM_STR);

        $Insert->bindParam(':humanResourcesName', $humanResourcesName, PDO::PARAM_STR);

        $Insert->bindParam(':location', $location, PDO::PARAM_STR);

        $Insert->bindParam(':givePrice', $givePrice, PDO::PARAM_STR);

        $Insert->bindParam(':taxNumber', $taxNumber, PDO::PARAM_STR);

        $Insert->bindParam(':Invoice', $Invoice, PDO::PARAM_STR);

        $Insert->bindParam(':service', $service, PDO::PARAM_STR);

        $companyInsert = $Insert->execute();

        if ($companyInsert) {


            $result = true;

        } else {

            $result = false;

        }

        return $result;


        //  logs::companyLog('Güncelleme', '/companies/add/', $companyName, $email, $password, $phone,  $humanResourcesPhone, $humanResourcesName, $givePrice, $location, $taxNumber, $Invoice, $service, $code, $result);


    }

    /**
     * @param $companyName
     * @param $email
     * @param $pass
     * @param $phone
     * @param $humanResourcesName
     * @param $humanResourcesPhone
     * @param $givePrice
     * @param $location
     * @param $taxNumber
     * @param $Invoice
     * @param $service
     * @param $companyCode
     * @return bool
     */

    protected function companyUpdateDB($companyName, $email, $pass, $phone, $humanResourcesName, $humanResourcesPhone, $givePrice, $location, $taxNumber, $Invoice, $service, $companyCode): bool
    {
        if (!empty($pass)) {

            $password = md5($pass);

        } else {

            $query = $this->db()->prepare('select companyPassword from companies where companyCode=:Code');

            $query->bindParam(':Code', $companyCode, PDO::PARAM_INT);

            $query->execute();

            $check = $query->fetch(PDO::FETCH_ASSOC);

            $password = $check['companyPassword'];

        }

        $Update = $this->db()->prepare("update companies set companyName=:companyName, companyEmail=:Email, companyPassword=:password, companyPhone=:Phone, companyHumanResourcesPhone=:humanResourcesPhone,companyHumanResourcesName=:humanResourcesName, companyLocation=:location, companyGivePrice=:givePrice, companyTaxNumber=:taxNumber, companyInvoice=:Invoice, companyService=:service where companyCode=:Code");

        $Update->bindParam(':companyName', $companyName, PDO::PARAM_STR);

        $Update->bindParam(':Email', $email, PDO::PARAM_STR);

        $Update->bindParam(':password', $password, PDO::PARAM_STR);

        $Update->bindParam(':Phone', $phone, PDO::PARAM_STR);

        $Update->bindParam(':humanResourcesPhone', $humanResourcesPhone, PDO::PARAM_STR);

        $Update->bindParam(':humanResourcesName', $humanResourcesName, PDO::PARAM_STR);

        $Update->bindParam(':location', $location, PDO::PARAM_STR);

        $Update->bindParam(':givePrice', $givePrice, PDO::PARAM_STR);

        $Update->bindParam(':taxNumber', $taxNumber, PDO::PARAM_STR);

        $Update->bindParam(':Invoice', $Invoice, PDO::PARAM_STR);

        $Update->bindParam(':service', $service, PDO::PARAM_STR);

        $Update->bindParam(':Code', $companyCode, PDO::PARAM_INT);

        $companyUpdate = $Update->execute();

        if ($companyUpdate) {


            $result = true;

        } else {

            $result = false;

        }

        //   logs::companyLog('Güncelleme', '/companies/update/', $companyName, $email, $password, $phone,  $humanResourcesPhone, $humanResourcesName, $givePrice, $location, $taxNumber, $Invoice, $service, $companyCode, $result);

        return $result;

    }

    /**
     * @param $data
     * @return bool
     */

    protected function companyDeleteDB($data): bool
    {

        $deleted = $this->db()->prepare("update companies set companyStatus=:companyStatus where companyCode=:companyCode");

        $deleted->bindValue(':companyStatus','passive',PDO::PARAM_STR);

        $deleted->bindParam(':companyCode', $data, PDO::PARAM_INT);

        $delete = $deleted->execute();

        if ($delete) {
            $result = true;
        } else {
            $result = false;
        }

        // logs::companyLog('Silme', '/companies/delete/', '', '', '', '', '', '', '', '', '', '','', $data, $result);

        return $result;

    }


    protected function companyListQuery(): array
    {

        $query = $this->db()->prepare("select * from companies where companyStatus=:companyStatus");

        $query->bindValue(':companyStatus','active',PDO::PARAM_STR);

        $query->execute();

        $control = $query->rowCount();

        if ($control > 0) {

            $array = [];

            while ($check = $query->fetch(PDO::FETCH_ASSOC)) {

                $companies = ['companyCode' => $this->lock($check['companyCode']), 'companyName' => $check['companyName'], 'companyEmail' => $check['companyEmail'], 'companyPhone' => $check['companyPhone'], 'companyHumanResourcesPhone' => $check['companyHumanResourcesPhone'], 'companyHumanResourcesName' => $check['companyHumanResourcesName'], 'companyLocation' => $check['companyLocation'], 'companyGivePrice' => $check['companyGivePrice'], 'companyTaxNumber' => $check['companyTaxNumber'], 'companyInvoice' => $check['companyInvoice'], 'companyService' => $check['companyService']];

                array_push($array, $companies);
            }
        } else {
            $array['error'] = 'Şirket kaydı oluşturulmamıştır daha';
        }

        return $array;

    }
}