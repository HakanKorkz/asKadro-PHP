<?php

namespace AsTeam;

use Valitron\Validator as V;

class managers extends managersDB
{

    protected function managersValidControl($data): array
    {
        $V = new V($data);

        $V->rule('required', ['email', 'password'])->message('{field} Zorunlu Alan!!!')->labels(['email' => 'E-posta', 'password' => 'Şifre']);

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
    public function managersAdd($data): bool
    {

        $control = $this->managersValidControl($data);

        $await = false;

        if ($control['bool']) {

            $result['result'] = $control['errors'];

        } else {

            $await = true;

            $result['result'] = '';

        }

        if ($await) {

            $email = $data['email'];

            $password = md5($data['password']);

            $result['result'] = $this->managerAddDB($email, $password);

        }

        echo json_encode($result);

        return false;

    }

    public function managersUpdate($data): bool
    {

        $control = $this->managersValidControl($data);

        $await = false;

        if ($control['bool']) {

            $result['result'] = $control['errors'];

        } else {

            $await = true;

            $result['result'] = '';

        }

        if ($await) {

            $email = $data['email'];

            $password = md5($data['password']);

            $code = $this->open($data['managerCode']);

            $result['result'] = $this->managerUpdateDB($email, $password, $code);

        }

        echo json_encode($result);

        return false;

    }

    public function managersList(): bool
    {
        $result['result'] = $this->managersListDB();

        echo json_encode($result);

        return true;
    }

    public function managerDeleted($data): bool
    {

        $code = $this->open($data);

        $result['result'] = $this->managerDeletedDB($code);

        echo json_encode($result);

        return false;

    }
}