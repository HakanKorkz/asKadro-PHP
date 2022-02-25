<?php

namespace AsTeam;

use PDO;
use Verot\Upload\Upload;

class employeeDB extends connect
{
    /**
     * @param $tc
     * @param $phone
     * @return array
     */

    private function employeeAddControl($tc, $phone): array
    {
        // Kullanıcı var mı kontrol

        $query = $this->db()->prepare("select phone,tc from employees where phone=:phone or tc=:tc");

        $query->bindParam(':phone', $phone, PDO::PARAM_STR);

        $query->bindParam(':tc', $tc, PDO::PARAM_STR);

        $query->execute();

        $queryControl = $query->rowCount();

        $conclusion = '';

        if ($queryControl > 0) {

            $Check = $query->fetch(PDO::FETCH_ASSOC);

            if ($Check['tc'] === $tc && $Check['phone'] === $phone) {

                $conclusion = 'Bu TC Kimlik numarası ve Telefon numarası ile bir kayıt bulunmaktadır';

            } elseif ($Check['tc'] === $tc) {

                $conclusion = 'Bu TC Kimlik numarası ile bir kayıt bulunmaktadır';

            } elseif ($Check['phone'] === $tc) {

                $conclusion = 'Bu Telefon numarası ile bir kayıt bulunmaktadır';

            }

            $bool = true;

        } else {

            $bool = false;

        }

        return ['bool' => $bool, 'errors' => $conclusion];

    }


    /**
     * @param $firstName
     * @param $lastName
     * @param $email
     * @param $password
     * @param $phone
     * @param $date
     * @param $address
     * @param $tc
     * @param $iban
     * @param $workType
     * @param $hesCode
     * @param $dataFiles
     * @return bool|mixed|string
     */

    protected function employeeAddDB($firstName, $lastName, $email, $password, $phone, $date, $address, $tc, $iban, $workType, $hesCode, $dataFiles)
    {
        $bool = $this->employeeAddControl($tc, $phone);

        $code = 0;

        if ($bool['bool']) {

            $result = $bool['errors'];

            $filePath = '';

        } else {

            $code = $this->code();

            $filePath = '';

            $waitCriminalRecord = true;

            $waitSocialSecurity = true;

            if ($dataFiles['criminalRecordFile']['name']) { // sabıka kaydı yüklenir ilk

                $criminalRecordFile = uploads::filesUploads($dataFiles['criminalRecordFile'], 'criminalRecord', 'employees', 0, $code, 'insert');

                if ($criminalRecordFile['bool']) { // sabıka kaydı sorunsuz yüklenmişse

                    $fileWait = true;

                    $result = '';

                    $filePath = $criminalRecordFile['file'];

                } else { // sabıka kaydın da sorun oluşmuşsa

                    $waitCriminalRecord = false;

                    $fileWait = false;

                    $result = $criminalRecordFile['error'];

                }

            } else { // sabıka kaydı yüklenmezse

                $fileWait = true;

                $result = '';

            }

            if ($fileWait) {

                sleep(1);

                if ($dataFiles['socialSecurityFile']['name']) {

                    $socialSecurityFile = uploads::filesUploads($dataFiles['socialSecurityFile'], 'socialSecurity', 'employees', 0, $code, 'insert');

                    if ($socialSecurityFile['bool']) {

                        $result = '';

                        $filePath = $socialSecurityFile['file'];

                    } else {

                        $waitSocialSecurity = false;

                        $result = $socialSecurityFile['error'];

                    }

                } else {

                    $result = '';

                }

            }

            if ($waitCriminalRecord && $waitSocialSecurity) {

                $Insert = $this->db()->prepare("insert into employees set employeeCode=:code, firstname=:firstname, lastname=:lastname, email=:email, employeePassword=:password, phone=:phone, dateOfBirth=:dateOfBirth, workType=:workType, address=:address, tc=:tc, iban=:iban,hesCode=:hesCode");

                $Insert->bindParam(':code', $code, PDO::PARAM_STR);

                $Insert->bindParam(':firstname', $firstName, PDO::PARAM_STR);

                $Insert->bindParam(':lastname', $lastName, PDO::PARAM_STR);

                $Insert->bindParam(':email', $email, PDO::PARAM_STR);

                $Insert->bindParam(':password', $password, PDO::PARAM_STR);

                $Insert->bindParam(':phone', $phone, PDO::PARAM_STR);

                $Insert->bindParam(':dateOfBirth', $date, PDO::PARAM_STR);

                $Insert->bindParam(':workType', $workType, PDO::PARAM_STR);

                $Insert->bindParam(':address', $address, PDO::PARAM_STR);

                $Insert->bindParam(':tc', $tc, PDO::PARAM_STR);

                $Insert->bindParam(':iban', $iban, PDO::PARAM_STR);

                $Insert->bindParam(':hesCode', $hesCode, PDO::PARAM_STR);

                $employeeInsert = $Insert->execute();

                if ($employeeInsert) {


                    $result = true;

                } else {

                    $result = false;

                }

            }

        }

       // logs::employeeLog('Ekleme', 'employees/add/', $code, $firstName, $lastName, $email, $password, $phone, $date, $iban, $workType, $filePath, $result);

        return $result;

    }

    protected function employeeUpdateDB($firstName, $lastName, $email, $password, $phone, $date, $address, $tc, $iban, $workType, $hesCode, $employeeCode)
    {
//        $fileWait = true;
//
//        $awaitCriminal = false;
//
//        $awaitSocial = false;

        $result = '';

        $await=true;


//        if ($dataFiles['criminalRecordFile']['name']) { // dosya kontrolü yapıyoruz
//
//            if (!empty($criminalRecordCode)) {
//
//                $action = 'update';
//
//            } else {
//
//                $action = 'insert';
//
//                $criminalRecordCode = 0;
//
//            }

//            $criminalRecordFile = uploads::filesUploads($dataFiles['criminalRecordFile'], 'criminalRecord', 'employees', $criminalRecordCode, $employeeCode, $action);
//
//            if ($criminalRecordFile['bool']) {
//
//
//                $filePath = $criminalRecordFile['file'];
//
//                $awaitCriminal = true;
//
//            } else {
//
//                $fileWait = false;
//
//                $result = $criminalRecordFile['error'];
//
//                $filePath = '';
//            }
//
//        } else {
//
//            $awaitCriminal = true;
//
//            $filePath = '';
//
//        }
//        if ($fileWait) {
//
//            if ($dataFiles['socialSecurityFile']['name']) { // dosya kontrolü yapıyoruz
//
//                sleep(1);
//
//                if (!empty($socialSecurityCode)) {
//
//                    $action = 'update';
//
//                } else {
//
//                    $action = 'insert';
//
//                }
//
//                $criminalRecordFile = uploads::filesUploads($dataFiles['socialSecurityFile'], 'socialSecurity', 'employees', $socialSecurityCode, $employeeCode, $action);
//
//                if ($criminalRecordFile['bool']) {
//
//                    $result = '';
//
//                    $filePath = $criminalRecordFile['file'];
//
//                    $awaitSocial = true;
//
//                } else {
//
//                    $filePath = '';
//
//                    $result = $criminalRecordFile['error'];
//
//                }
//
//            } else {
//
//                $awaitSocial = true;
//
//            }
//
//        } else {
//
//            $filePath = '';
//
//            $awaitSocial = true;
//
//        }

            $Update = $this->db()->prepare("update employees set firstname=:firstname, lastname=:lastname, email=:email, employeePassword=:password, phone=:phone, dateOfBirth=:dateOfBirth, workType=:workType, address=:address, tc=:tc, iban=:iban, hescode=:hesCode where employeeCode=:code");

            $Update->bindParam(':firstname', $firstName, PDO::PARAM_STR);

            $Update->bindParam(':lastname', $lastName, PDO::PARAM_STR);

            $Update->bindParam(':email', $email, PDO::PARAM_STR);

            $Update->bindParam(':password', $password, PDO::PARAM_STR);

            $Update->bindParam(':phone', $phone, PDO::PARAM_STR);

            $Update->bindParam(':dateOfBirth', $date, PDO::PARAM_STR);

            $Update->bindParam(':workType', $workType, PDO::PARAM_STR);

            $Update->bindParam(':address', $address, PDO::PARAM_STR);

            $Update->bindParam(':tc', $tc, PDO::PARAM_STR);

            $Update->bindParam(':iban', $iban, PDO::PARAM_STR);

            $Update->bindParam(':hesCode', $hesCode, PDO::PARAM_STR);

            $Update->bindParam(':code', $employeeCode, PDO::PARAM_STR);

            $employeeUpdate = $Update->execute();

            if ($employeeUpdate) {

                $conclusion = true;

            } else {

                $conclusion = false;

            }

        //    logs::employeeLog('Güncelleme', 'employees/update/', $employeeCode, $firstName, $lastName, $email, $password, $phone, $date, $iban, $workType, $filePath, $result);


        return $conclusion;

    }

    /**
     * @param $employeeCode
     * @return string
     */
    protected function employeeDeleteDB($employeeCode): string
    { // Pasife çekme işlemi

//        $query = $this->db()->prepare("select * from files where fileCode=:fileCode and commonCode=:employeeCode");
//
//        $query->bindParam(':fileCode', $fileCode, PDO::PARAM_INT);
//
//        $query->bindParam(':employeeCode', $employeeCode, PDO::PARAM_INT);
//
//        $query->execute();
//
//        $control=$query->rowCount();
//
//        if ($control > 0) {
//
//            $check = $query->fetch(PDO::FETCH_ASSOC);
//
//            if (!empty($check['filePath'])) {
//
//                $path = dirname(__DIR__) . '/' . $check['filePath'];
//
//                if (file_exists($path)) {
//
//                    unlink($path);
//
//                }
//
//            }
//
//        }

        $fileUpdate = $this->db()->prepare("update files set fileStatus=:fileStatus where commonCode=:commonCode");

        $fileUpdate->bindValue(':fileStatus', 'passive', PDO::PARAM_STR);

        $fileUpdate->bindParam(':commonCode', $employeeCode, PDO::PARAM_INT);

        $fileUpdate->execute();

        $employeeUpdate = $this->db()->prepare("update employees set employeeStatus=:employeeStatus where employeeCode=:employeeCode");

        $employeeUpdate->bindValue(':employeeStatus', 'passive', PDO::PARAM_STR);

        $employeeUpdate->bindParam(':employeeCode', $employeeCode, PDO::PARAM_INT);

        $update = $employeeUpdate->execute();

        if ($update) {

            $result = 'Personel silindi';

        } else {

            $result = 'Personel silinemedi';

        }

     //   logs::employeeLog('Silme', 'employees/delete/', $employeeCode, '', '', '', '', '', '', '', '', '', $result);

        return $result;

    }

    /**
     * @return array
     */

    protected function employeeListQuery(): array
    {

        $query = $this->db()->prepare("select * from employees where employeeStatus='active'");

        $query->execute();

        $employee = [];

        while ($check = $query->fetch(PDO::FETCH_ASSOC)) {

            $employees = ['code' => $this->lock($check['employeeCode']), 'firstName' => $check['firstname'], 'lastName' => $check['lastname'], 'phone' => $check['phone'], 'Email' => $check['email'], 'Date' => $check['dateOfBirth'], 'workType' => $check['workType'], 'address' => $check['address'], 'tc' => $check['tc'], 'iban' => $check['iban']];

            array_push($employee, $employees);

        }

        return $employee;

    }

    /**
     * @param $code
     * @return array
     */
    protected function employeeQueryDB($code): array
    {

        $query = $this->db()->prepare("select * from employees where employeeCode=:employeeCode and employeeStatus=:employeeStatus");

        $query->bindParam('employeeCode', $code, PDO::PARAM_INT);

        $query->bindValue('employeeStatus', 'active', PDO::PARAM_STR);

        $query->execute();

        $check = $query->fetch(PDO::FETCH_ASSOC);

        return ['code' => $this->lock($check['employeeCode']), 'firstName' => $check['firstname'], 'lastName' => $check['lastname'], 'phone' => $check['phone'], 'Email' => $check['email'], 'password' => $check['employeePassword'], 'Date' => $check['dateOfBirth'], 'workType' => $check['workType'], 'address' => $check['address'], 'tc' => $check['tc'], 'iban' => $check['iban']];


    }

    /**
     * @param $data
     * @return array
     */
    protected function employeeFilesDB($data): array
    {
        $code = $data;

        $file = [];

        $fileQuery = $this->db()->prepare("select * from files where commonCode=:commonCode and fileStatus=:fileStatus");

        $fileQuery->bindParam(':commonCode', $code, PDO::PARAM_INT);

        $fileQuery->bindValue(':fileStatus', 'active', PDO::PARAM_STR);

        $fileQuery->execute();

        while ($fileCheck = $fileQuery->fetch(PDO::FETCH_ASSOC)) {

            $files = ['commonCode' => $this->lock($fileCheck['commonCode']), 'fileCode' => $this->lock($fileCheck['fileCode']), 'fileName' => $fileCheck['fileName'], 'fileFunction' => $fileCheck['fileFunction'], 'filePath' => 'backend/' . $fileCheck['filePath'], 'employeeCreateDate' =>  $fileCheck['employeeCreateDate']];

            array_push($file, $files);

        }


        return $file;

    }

}