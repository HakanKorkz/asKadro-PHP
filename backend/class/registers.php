<?php

namespace AsTeam;

use Valitron\Validator as V;

class registers extends registerDB
{

    protected function employeeControl($data): array
    { // panele içeriden talep olursa çalışır
        $V = new V($data);
        $V->rule('required', ['firstName', 'lastName', 'email', 'phone', 'date', 'password'])->message('{field} Zorunlu Alan!!!')->labels(['firstName' => 'Adı', 'lastName' => 'Soyadı', 'phone' => 'Telefon Numarası', 'date' => 'Doğum Tarihi']);
        $V->rule('emailDNS', 'email')->message('{field} Geçersizdir..')->label('E-posta Adresi');
        $V->rule('numeric', 'phone')->message('{field} Sayısal Alan')->label('Telefon numarası');
        $V->rule('date', 'date')->message('{field} format hatası')->label('Doğum Tarihi');
        $V->rule('lengthMax', 'phone', 12)->message('{field} En Fazla 12 Haneli Olmalı')->label('Telefon Numarası');
        $V->rule('lengthMin', 'phone', 2)->message('{field} En Az 2 Haneli Olmalı')->label('Telefon Numarası');
        if ($V->validate()) {
            $result = ['bool' => 'false'];
        } else {
            $result = ['bool' => 'true', 'errors' => $V->errors()];
        }
        return $result;
    }

    public function employeeRegister($data): bool
    { // panele dışardan talep olursa çalışır

        $bool = $this->employeeControl($data);

        $await = true;

        if ($bool['bool'] === 'true') {

            $await = false;

            $conclusion = $this->employeeControl($data);

            $result['result'] = $conclusion['errors'];

            echo json_encode($result);

        }

        if ($await) {

            $firstName = $data['firstName'];

            $lastName = $data['lastName'];

            $email = $data['email'];

            $password = md5($data['password']);

            $phone = $data['phone'];

            $date = $data['date'];

            $result['result'] = $this->employeeRegisterDB($firstName, $lastName, $email, $password, $phone, $date);

            echo json_encode($result);

        }

        return false;

    }



}