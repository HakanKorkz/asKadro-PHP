<?php

namespace AsTeam;

class logs extends functions
{
    /**
     * @param $email
     * @param $password
     * @param $status
     * @param $conclusion
     * @return void
     */
    public static function loginLog($email, $password, $status, $conclusion)
    {
        $function = (new functions);

        $date = date('d-m-Y H:i:s');

        $ip = $function->realIp();

        $formText = '--------------------------------------------------' . "\n\n";

        $formText .= 'IP: ' . $ip . "\n\n";

        $formText .= 'İşlem: Giriş' . "\n\n";

        $formText .= 'email: ' . $email . "\n\n";

        $formText .= 'password: ' . $password . "\n\n";

        $formText .= 'Statüsü: ' . $status . "\n\n";

        $formText .= 'İşlem Tarihi: ' . $date . "\n\n";

        $formText .= 'İşlem Sonucu: ' . $conclusion . "\n\n";

        $formText .= '--------------------------------------------------' . "\n\n";

        $dateArray = explode(' ', $date);

        $date = $dateArray[0];

        $function->logText($formText, $date, 'login/');
    }

    /**
     * @param $operationType
     * @param $path
     * @param $employeeCode
     * @param $firstName
     * @param $lastName
     * @param $email
     * @param $password
     * @param $phone
     * @param $dateOfBirth
     * @param $iban
     * @param $workType
     * @param $filePath
     * @param $result
     * @return void
     */
    public static function employeeLog($operationType, $path, $employeeCode, $firstName, $lastName, $email, $password, $phone, $dateOfBirth, $iban, $workType,$filePath, $result)
    { // Personeller log kaydı

        $formText = '--------------------------------------------------' . "\n\n";

        $formText .= 'İşlem: ' . $operationType . "\n\n";

        $formText .= 'Yönetici Kodu: ' . $employeeCode . "\n\n";

        $formText .= 'Personel Kodu: ' . $employeeCode . "\n\n";

        if ($operationType != 'Silme') {

            $formText .= 'Adı: ' . $firstName . "\n\n";

            $formText .= 'Soyadı: ' . $lastName . "\n\n";

            $formText .= 'email: ' . $email . "\n\n";

            $formText .= 'password: ' . $password . "\n\n";

            $formText .= 'Telefon: ' . $phone . "\n\n";

            $formText .= 'Doğum Tarihi: ' . $dateOfBirth . "\n\n";

            $formText .= 'İBAN: ' . $iban . "\n\n";

            $formText .= 'Çalışma Şekli: ' . $workType . "\n\n";

            $formText .= 'Yüklenen Dosya: ' . $filePath . "\n\n";

        }

        self::logExtracted($formText, $result, $path);
    }

    public static function companyLog($operationType, $path, $companyName, $email, $password, $phone, $humanResourcesName,$humanResourcesPhone, $givePrice, $location, $taxNumber, $Invoice, $service, $companyCode,  $result)
    { // Personeller log kaydı

        $formText = '--------------------------------------------------' . "\n\n";

        $formText .= 'İşlem: ' . $operationType . "\n\n";

        $formText .= 'Yönetici kod: ' . $companyCode . "\n\n";

        $formText .= 'Şirket Kodu: ' . $companyCode . "\n\n";

        if ($operationType != 'Silme') {

            $formText .= 'Şirket Adı: ' . $companyName . "\n\n";

            $formText .= 'Şirket Maili: ' . $email . "\n\n";

            $formText .= 'Şirket Password: ' . $password . "\n\n";

            $formText .= 'Şirket Telefon: ' . $phone . "\n\n";

            $formText .= 'Şirket İnsan kaynakları isim: ' . $humanResourcesName . "\n\n";

            $formText .= 'Şirket İnsan kaynakları Telefon: ' . $humanResourcesPhone . "\n\n";

            $formText .= 'Şirket Verdiği Maaş: ' . $givePrice . "\n\n";

            $formText .= 'Şirket Adresi: ' . $location . "\n\n";

            $formText .= 'Şirket Vergino: ' . $taxNumber . "\n\n";

            $formText .= 'Şirket Fatura: ' . $Invoice . "\n\n";

            $formText .= 'Şirket Sevisi: ' . $service . "\n\n";

        }

        self::logExtracted($formText, $result, $path);
    }

    /**
     * @param string $formText
     * @param $result
     * @param $path
     * @return void
     */
    protected static function logExtracted(string $formText, $result, $path): void
    {
        $function = (new functions);

        $date = date('d-m-Y H:i:s');

        $ip = $function->realIp();

        $formText .= 'IP: ' . $ip . "\n\n";

        $formText .= 'İşlem Tarihi: ' . $date . "\n\n";

        $formText .= 'İşlem Sonucu: ' . $result . "\n\n";

        $formText .= '--------------------------------------------------' . "\n\n";

        $dateArray = explode(' ', $date);

        $date = $dateArray[0];

        $function->logText($formText, $date, $path);
    }

}