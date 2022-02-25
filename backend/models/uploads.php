<?php

namespace AsTeam;

use mysql_xdevapi\Result;
use PDO;
use Verot\Upload\Upload;

class uploads extends connect
{

    public static function filesUploads($dataFiles, $fileFunction, $path, $fileCode, $code, $action): array
    {// dosya upload işlemi


        if ($fileCode > 0) {

            $oldPath = self::fileQuery($fileCode);

        } else {

            $oldPath = '';

        }

        $file = $dataFiles['name'];

        $type = (new connect())->fileType($file);

        $handle = new Upload($dataFiles);

        $path = dirname(__DIR__) . '/uploads/' . $path . '/';

        $result = [];

        $await = false;

        if ($type === 'pdf') {

            if ($handle->uploaded) {

                if ($fileCode > 0) {

                    if (!empty($oldPath)) {

                        if (file_exists(dirname(__DIR__) . '/' . $oldPath)) {

                            unlink(dirname(__DIR__) . '/' . $oldPath);

                        }
                    }
                }

                $fileName = $handle->file_dst_name_body;

                //$handle->file_new_name_body = 'image_resized';

                $handle->allowed = array('application/pdf');

                $handle->process($path . 'pdf/');

                if ($handle->processed) {

                    $await = true;

                    $result = ['bool' => true];

                    $path = 'uploads/employees/pdf/' . $handle->file_dst_name_body . ".$type";

                    $handle->clean();

                } else {

                    $result = ['bool' => false, 'error' => $handle->error];

                }

            } else {

                $fileName = '';

            }

        } else {

            if ($handle->uploaded) {

                if ($fileCode > 0) {

                    if (!empty($oldPath)) {

                        if (file_exists(dirname(__DIR__) . '/' . $oldPath)) {

                            unlink(dirname(__DIR__) . '/' . $oldPath);

                        }
                    }
                }

                $fileName = $handle->file_new_name_body = "$code";

                // save uploaded image with no changes

                $handle->allowed = array('image/*');

                $handle->process($path . 'img');

                if ($handle->processed) {

                    $await = true;

                    $result = ['bool' => true];

                    $path = 'uploads/employees/img/' . $handle->file_dst_name_body . ".$type";

                    $handle->clean();

                } else {

                    $result = ['bool' => false, 'error' => $handle->error];

                }

            } else {

                $fileName = '';

            }

        }

        if ($await) {

            $filePath = $path;

            $commonCode = $code;

            if ($action === 'insert') {

                $fileCode = time() + 10;

                self::fileInsert($filePath, $fileName, $commonCode, $fileCode, $fileFunction);

            } elseif ($action === 'update') {

                self::fileUpdate($filePath, $fileName, $commonCode, $fileCode, $fileFunction);

            }

            $result['file'] = $filePath;

        }

        return $result;

    }

    /**
     * @param $filePath
     * @param $fileName
     * @param $commonCode
     * @param $fileCode
     * @param $fileFunction
     * @return void
     */

    private static function fileInsert($filePath, $fileName, $commonCode, $fileCode, $fileFunction): void
    {

        $Insert = (new connect())->db()->prepare("insert into files set fileCode=:fileCode,commonCode=:commonCode,filePath=:filePath,fileName=:fileName,fileFunction=:fileFunction");

        $Insert->bindParam(':fileCode', $fileCode, PDO::PARAM_INT);

        $Insert->bindParam(':commonCode', $commonCode, PDO::PARAM_INT);

        $Insert->bindParam(':filePath', $filePath, PDO::PARAM_STR);

        $Insert->bindParam(':fileName', $fileName, PDO::PARAM_STR);

        $Insert->bindParam(':fileFunction', $fileFunction, PDO::PARAM_STR);

        $Insert->execute();


    }


    /**
     * @param $filePath
     * @param $fileName
     * @param $commonCode
     * @param $fileCode
     * @param $fileFunction
     * @return void
     */

    private static function fileUpdate($filePath, $fileName, $commonCode, $fileCode, $fileFunction):void
    {

        $Update = (new connect())->db()->prepare("update files set filePath=:filePath,fileName=:fileName,fileFunction=:fileFunction where fileCode=:fileCode and commonCode=:commonCode");

        $Update->bindParam(':fileCode', $fileCode, PDO::PARAM_INT);

        $Update->bindParam(':commonCode', $commonCode, PDO::PARAM_INT);

        $Update->bindParam(':filePath', $filePath, PDO::PARAM_STR);

        $Update->bindParam(':fileName', $fileName, PDO::PARAM_STR);

        $Update->bindParam(':fileFunction', $fileFunction, PDO::PARAM_STR);

        $Update->execute();


    }

    /**
     * @param $code
     * @return mixed|string
     */

    private static function fileQuery($code)
    {

        $query = (new connect())->db()->prepare("select * from files where fileCode=:fileCode and fileStatus=:fileStatus");

        $query->bindParam(':fileCode', $code, PDO::PARAM_INT);

        $query->bindValue(':fileStatus', 'active', PDO::PARAM_STR);

        $query->execute();

        $control = $query->rowCount();

        if ($control > 0) {

            $check = $query->fetch(PDO::FETCH_ASSOC);

            $response = $check['filePath'];

        } else {

            $response = '';

        }

        return $response;

    }

}