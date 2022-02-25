<?php

namespace AsTeam;

use Valitron\Validator as V;

class login extends loginDB
{
    /**
     * @param $data
     * @return array|false[]
     */
    private function loginValidControl($data): array
    {

        $V = new V($data);

        $V->rule('required', ['email', 'password'])->message('{field} Zorunlu alan!!')->labels(['email' => 'Email', 'password' => 'Şifre']);

        if ($V->validate()) {
            $result = ['bool' => false];
        } else {
            $result = ['bool' => true, 'errors' => $V->errors()];
        }

        return $result;
    }

    /**
     * @param $data
     * @return bool
     */
    public function login($data): bool
    {
        $conclusion = $this->loginValidControl($data);

        if ($conclusion['bool']) {

            $result['result'] = $conclusion['errors'];

        } else {

            $email = htmlspecialchars($data['email']);

            $password = htmlspecialchars(md5($data['password']));

            $result['result'] = $this->loginDB($email, $password);


        }
        echo json_encode($result['result']);

        return true;

    }

    public function loginControl($email, $password): array
    {
        $data = ['email' => $email, 'password' => $password];

        $conclusion = $this->loginValidControl($data);

        if ($conclusion['bool']) {

            return ['loginPage' => true];

        } else {

            return $this->loginControlDB($email, $password);


        }


    }

}