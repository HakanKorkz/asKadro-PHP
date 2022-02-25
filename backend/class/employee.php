<?php

namespace AsTeam;

use Valitron\Validator as V;

class employee extends employeeDB
{

    /**
     * @param $data
     * @return array|string[]
     */
    protected function employeeControl($data): array
    { // panele içeriden talep olursa çalışır
        $V = new V($data);
        $V->rule('required', ['firstname', 'lastname', 'email', 'phone', 'date', 'address', 'iban', 'workType'])->message('{field} Zorunlu Alan!!!')->labels(['firstname' => 'Adı', 'lastname' => 'Soyadı', 'phone' => 'Telefon Numarası', 'address' => 'Adres', 'date' => 'Doğum Tarihi', 'tc' => 'Tc Kimlik No', 'ibaan' => 'İban', 'workType' => 'Çalışma şekli']);
        $V->rule('optional', 'password')->message('{field} Zorunlu Alan!!!')->label('Şifre');
        $V->rule('emailDNS', 'email')->message('{field} Geçersizdir..')->label('E-posta Adresi');
        $V->rule('optional', 'tc')->message('{field} Zorunlu Alan Değildir')->label('Tc Kimlik No');
        $V->rule('numeric', ['phone', 'tc'])->message('{field} Sayısal Alan')->labels(['phone' => 'Telefon numarası', 'tc' => 'TC Kimlik No']);
        $V->rule('alphaNum', 'iban')->message('{field}')->label('İban Sayısal ve İlk iki Harfi ülke kodu olmalı');
        $V->rule('date', 'date')->message('{field} format hatası')->label('Doğum Tarihi');
        $V->rule('lengthMax', 'phone', 12)->message('{field} En Fazla 12 Haneli Olmalı')->label('Telefon Numarası');
        $V->rule('lengthMin', 'phone', 2)->message('{field} En Az 2 Haneli Olmalı')->label('Telefon Numarası');
        $V->rule('lengthMax', 'iban', 32)->message('{field} En Fazla 32 Haneli Olmalı')->label('İban');
        $V->rule('lengthMin', 'iban', 10)->message('{field} En Az 10 Haneli Olmalı')->label('İban');
        if ($V->validate()) {
            $result = ['bool' => 'false'];
        } else {
            $result = ['bool' => 'true', 'errors' => $V->errors()];
        }
        return $result;
    }

    /**
     * @param $data
     * @param $dataFiles
     * @return bool
     */
    public function employeeAdd($data, $dataFiles): bool
    { // panele içeriden talep olursa çalışır

        $bool = $this->employeeControl($data);

        if ($bool['bool'] === 'true') {

            $conclusion = $this->employeeControl($data);

            $result['result'] = $conclusion['errors'];

            echo json_encode($result);

            return false;
        }

        list($firstName, $lastName, $email, $password, $phone, $date, $address, $tc, $iban, $workType, $hesCode) = $this->extracted($data);

        $files = $dataFiles;

        $result['result'] = $this->employeeAddDB($firstName, $lastName, $email, $password, $phone, $date, $address, $tc, $iban, $workType, $hesCode, $files);

        echo json_encode($result);

        return false;

    }

    public function employeeUpdate($data): bool
    {
        $bool = $this->employeeControl($data);

        if ($bool['bool'] === 'true') {

            $conclusion = $this->employeeControl($data);

            $result['result'] = $conclusion['errors'];

            echo json_encode($result);

            return false;
        }

        list($firstName, $lastName, $email, $password, $phone, $date, $address, $tc, $iban, $workType, $hesCode) = $this->extracted($data);

        $employeeCode = $this->open($data['employeeCode']);

//        if (empty($data['criminalRecordCode'])) {
//
//            $criminalRecordCode = 0;
//
//        } else {
//
//            $criminalRecordCode = $this->open($data['criminalRecordCode']);
//
//        }
//
//        if (empty($data['socialSecurityCode'])) {
//
//            $socialSecurityCode = 0;
//
//        } else {
//
//            $socialSecurityCode = $this->open($data['socialSecurityCode']);
//
//        }


        if (empty($password)) {

            $response = json_decode($this->employeeQuery($data['employeeCode']));

            $password = $response->result->password;

        }

        $response['response'] = $this->employeeUpdateDB($firstName, $lastName, $email, $password, $phone, $date, $address, $tc, $iban, $workType, $hesCode, $employeeCode);

        echo json_encode($response);

        return false;
    }

    /**
     * @param $data
     * @return bool
     */
    public function employeeDelete($data): bool
    {// personeli pasife çekiyoruz

        $employeeCode = $this->open($data['employeeCode']);

        $result['result'] = $this->employeeDeleteDB($employeeCode);

        echo json_encode($result);

        return true;


    }

    /**
     * @return bool
     */
    public function employeeList(): bool
    {

        $result['result'] = $this->employeeListQuery();

        echo json_encode($result);

        return true;
    }


    protected function employeeQuery($data)
    {
        $code = $this->open($data);

        $result['result'] = $this->employeeQueryDB($code);

        return json_encode($result);
    }


    public function employeeFiles($data): bool
    {
        $code = $this->open($data);

        $result['result'] = $this->employeeFilesDB($code);

        echo json_encode($result);

        return true;
    }

    /**
     * @param $data
     * @return array
     */
    private function extracted($data): array
    {
        $firstName = mb_strtolower($data['firstname'], 'UTF-8');

        $lastName = mb_strtolower($data['lastname'], 'UTF-8');

        $email = $data['email'];

        if (!empty($data['password'])) {

            $password = md5($data['password']);

        } else {

            $password = $data['password'];

        }

        $phone = $data['phone'];

        $date = $data['date'];

        $address = $data['address'];

        $tc = $data['tc'];

        $iban = $data['iban'];

        $workType = $data['workType'];

        $hesCode = $data['hesCode'];

        return array($firstName, $lastName, $email, $password, $phone, $date, $address, $tc, $iban, $workType, $hesCode);

    }

}