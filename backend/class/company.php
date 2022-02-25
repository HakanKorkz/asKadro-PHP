<?php

namespace AsTeam;

use Valitron\Validator as V;

//use Verot\Upload\Upload;

class company extends companyDB
{


    protected function companyControl($data): array
    {
        $V = new V($data);
        $V->rule('required', ['companyName', 'email', 'phone', 'humanResourcesPhone', 'humanResourcesName', 'givePrice', 'location', 'mesai'])->message('{field} Zorunlu Alan!!!')->labels(['companyName' => 'Şirket Adı', 'email' => 'Şirket Email\'i', 'phone' => 'Şirket Telefon Numarası','humanResourcesPhone' => 'İnsan kaynakları Telefon Numarası', 'humanResourcesName' => 'İnsan kaynakları adı', 'givePrice' => 'Verdiği Ücret', 'location' => 'Şirket Adresi', 'mesai' => 'Mesai Bedeli']);
        $V->rule('optional', 'password')->message('{field} Zorunlu Değildir!!!')->label('Şifre');
        $V->rule('numeric', ['phone', 'humanResourcesPhone'])->message('{field} Sayısal Alan')->labels(['phone' => 'Şirket Telefon numarası', 'humanResourcesPhone' => 'İnsan kaynakları numarası']);
        $V->rule('alphaNum', 'invoice')->message('{field} alanı sayısal ve alfabetik bir alandır..')->label('Fatura ');
        $V->rule('emailDNS', 'email')->message('{field} Yanlış biçimde örneğin example@examle.com olmalı')->label('Şirket Email\'i');
        $V->rule('lengthMax', 'phone', 16)->message('{field} En Fazla 16 Haneli Olmalı')->label('Şirket Telefon Numarası');
        $V->rule('lengthMin', 'phone', 6)->message('{field} En Az 6 Haneli Olmalı')->label('Şirket Telefon Numarası');
        $V->rule('lengthMax', 'humanResourcesName', 16)->message('{field} En Fazla 16 Haneli Olmalı')->label('İnsan kaynakları Telefon Numarası');
        $V->rule('lengthMin', 'humanResourcesName', 6)->message('{field} En Az 6 Haneli Olmalı')->label('İnsan kaynakları Numarası');
        $V->rule('regex', 'givePrice', '/^[0-9]{1,9}?([.][0-9]{1,9})?([,][0-9]{1,2})?$/')->message('{field}  Ondalık sayısal Sayısal Alan örneğin ( 9 ve 9.99 ve 9,99 veya 99.99,99 ) Olamlıdır')->label('Verdiği Ücret');
        $V->rule('regex', 'mesai', '/^[0-9]{1,9}?([.][0-9]{1,9})?([,][0-9]{1,2})?$/')->message('{field}  Ondalık sayısal Sayısal Alan örneğin ( 9 ve 9.99 ve 9,99 veya 99.99,99 ) Olamlıdır')->label('Mesai Bedeli');

        if ($V->validate()) {
            $result = ['bool' => 'false'];
        } else {
            $result = ['bool' => 'true', 'errors' => $V->errors()];
        }

        return $result;
    }

//    private function employeeUploads($dataFiles): string
//    {
//
//        $file = $dataFiles['name'];
//
//        $type = $this->fileType($file);
//
//        $handle = new Upload($_FILES['image_field']);
//        $path = '';
//        if ($type === 'pdf') {
//            if ($handle->uploaded) {
//                //$handle->file_new_name_body = 'image_resized';
//                $handle->allowed = array('application/pdf');
//                $handle->process('/uploads/companies/pdf');
//                if ($handle->processed) {
//                    echo 'image resized';
//                    $handle->clean();
//                    $path = 'http://localhost:3000/';
//                } else {
//                    echo 'error : ' . $handle->error;
//                }
//            }
//
//        } else {
//            if ($handle->uploaded) {
//                $handle->file_new_name_body = 'image_resized';
//                $handle->allowed = array('image/*');
//                $handle->process(realpath('../') . 'uploads/companies/img');
//                if ($handle->processed) {
//                    echo 'image resized';
//                    $handle->clean();
//                    $path = 'http://localhost:3000/';
//                } else {
//                    echo 'error : ' . $handle->error;
//                }
//            }
//
//        }
//
//        return $path;
//
//    }


    public function companyAdd($data): bool
    {
//        $bool = $this->companyControl($data);
//
//        if ($bool['bool'] === 'true') {
//
//            $conclusion = $this->companyControl($data);
//
//            $result['result'] = $conclusion['errors'];
//
//            echo json_encode($result);
//
//            exit();
//        }

        $companyName = htmlspecialchars($data['companyName']);

        $email = htmlspecialchars($data['email']);

        $password = htmlspecialchars(md5($data['password']));

        $phone = htmlspecialchars($data['phone']);

        $humanResourcesName = htmlspecialchars($data['humanResourcesName']);

        $humanResourcesPhone = htmlspecialchars($data['humanResourcesPhone']);

        $givePrice = htmlspecialchars($data['givePrice']);

        $location = htmlspecialchars($data['location']);

        $service = htmlspecialchars($data['servis']);

        $taxNumber = $data['taxNumber'];

        $Invoice = $data['invoice'];

        $response['response'] = $this->companyAddDB($companyName, $email, $password, $phone, $humanResourcesName, $humanResourcesPhone, $givePrice, $location, $taxNumber, $Invoice, $service);

        echo json_encode($response);

        return false;


    }

    public function companyUpdate($data): void
    {
        $bool = $this->companyControl($data);

        $await = true;

        $result['result'] = '';

        if ($bool['bool'] === 'true') {

            $conclusion = $this->companyControl($data);

            $result['result'] = $conclusion['errors'];

            $await = false;


        }

        if ($await) {

            $companyName = htmlspecialchars($data['companyName']);

            $email = htmlspecialchars($data['email']);

            $pass = htmlspecialchars($data['password']);

            $phone = htmlspecialchars($data['phone']);

            $humanResourcesName = htmlspecialchars($data['humanResourcesName']);

            $humanResourcesPhone = htmlspecialchars($data['humanResourcesPhone']);

            $givePrice = htmlspecialchars($data['givePrice']);

            $location = htmlspecialchars($data['location']);

            $service = htmlspecialchars($data['servis']);

            $taxNumber = $data['taxNumber'];

            $Invoice = $data['invoice'];

            $Code = $this->open($data['companyCode']);

//        $file = $this->employeeUploads($dataFiles);

            $result['result'] = $this->companyUpdateDB($companyName, $email, $pass, $phone, $humanResourcesName, $humanResourcesPhone, $givePrice, $location, $taxNumber, $Invoice, $service, $Code);

        }
        echo json_encode($result);


    }

    public function companyDelete($data): bool
    {

        $code = $this->open($data);

        $result['result'] = $this->companyDeleteDB($code);

        echo json_encode($result);

        return true;


    }

    public function companyList()
    {

        $result['result'] = $this->companyListQuery();

        echo json_encode($result);
    }


}