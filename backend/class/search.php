<?php

namespace AsTeam;

use Valitron\Validator as V;

class  search extends searchDB
{

    private function SearchControl($data): array
    {
        $s = mb_strtolower($data['search']);

        $search['search'] = $s;


        $V = new V($search);
        $V->rule('alphaNum', 'search')->message('{field} Kısmına Alfabetik ve sayısal değerler giriniz')->label('Arama');
        if ($V->validate()) {
            $result = ['bool' => false];
        } else {
            $result = ['bool' => true, 'error' => $V->errors()];
        }

        return $result;

    }

    /**
     * @param $data
     * @return bool
     */
    public function employeesSearch($data): bool
    {
        $Search = $this->SearchControl($data);
        $wait = true;
        $result['result'] = '';
        if (boolval($Search['bool'])) {

            $wait = false;

            $conclusion['error'] = $Search['error']['search'][0];

            $result['result'] = $conclusion;

        }

        if ($wait) {

            $search = mb_strtolower($data['search']);

            $conclusion = $this->employeesSearchDB($search);

            $result['result'] = $conclusion;

        }

        echo json_encode($result);
        return true;

    }

//    public function homeSearch($data): bool
//    {
//        $control = $this->SearchControl($data);
//
//        if ($control['bool'] === 'true') {
//
//            $result['search'] = ['errors' => $control[0]['search'][0]];
//
//
//        } else {
//            if (!empty($this->employeesSearch($data)) && !empty($this->CompanySearch($data))) {
//                $result['search'] = ['Employees' => [$this->employeesSearch($data)][0], 'Companies' => [$this->CompanySearch($data)][0]];
//            } elseif (!empty($this->employeesSearch($data))) {
//                $result['search'] = ['Employees' => [$this->employeesSearch($data)][0]];
//
//            } elseif (!empty($this->CompanySearch($data))) {
//                $result['search'] = ['Companies' => [$this->CompanySearch($data)][0]];
//
//            } else {
//                $result['search'] = ['warning' => 'Arama sonucu bulunamadı..'];
//            }
//        }
//
//        echo json_encode($result);
//
//        return true;
//
//
//    }
//
//    private function SearchOutgoingControl($data): array
//    {
//       $seo=str_replace('-',' ',$this->seo($data['search']));
//
//       $da['search']=$seo;
//
//        $V = new V($da);
//        $V->rule('alphaNum', 'search')->message('{field} Kısmına Alfabetik ve sayısal değerler giriniz')->label('Arama');
//        if ($V->validate()) {
//            $result = ['search' => 'false'];
//        } else {
//            $result = ['search' => 'true', $V->errors()];
//        }
//
//        return $result;
//
//    }
//
//    public function searchOutgoing($data): bool
//    { // giden personel araması
//
//       $control = $this->SearchOutgoingControl($data);
//
//
//
//        if ($control['search'] === 'true') {
//
//
//            $result['result'] = ['errors' => $control[0]['search'][0]];
//
//        } else {
//
//
//            $result['result'] = $this->employeeSearchOutgoingQuery($data['search']);
//
//        }
//
//        echo json_encode($result);
//
//        return true;
//
//    }


}
