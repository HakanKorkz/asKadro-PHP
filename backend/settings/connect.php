<?php

namespace AsTeam;

use PDO;
use PDOException;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;


class connect extends functions
{

    protected function db(): PDO
    {

        $host = 'localhost';

        $dbname = 'askadro';

        $user = 'root';

        $pass = '';

        $db = '';
        try {

            $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass);

            // echo "Test Başarıl";

        } catch (PDOException $e) {

            echo $e->getMessage();

        }

        return $db;

    }


    /**
     * @return int
     */
    protected function code(): int
    {

        return $this->generateCodes();

    }

    /**
     * @param $data
     * @return string
     */
    protected function lock($data): string
    {
        $key = $this->key();

        $payload = array(
            "iss" => "http://localhost/developer/Projeler/AsKadro",
            "aud" => "http://localhost/developer/Projeler/AsKadro/backend",
            "iat" => $data,
            "nbf" => 1357000000
        );

        return JWT::encode($payload, $key, 'HS256');

    }


    protected function open($data)
    {
        $key = $this->key();

        $openCode = JWT::decode($data, new Key($key, 'HS256'));

        return $openCode->iat;

    }


}