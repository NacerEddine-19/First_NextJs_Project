<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
$db = new PDO('mysql:host=localhost;dbname=shop_db2', 'root', '');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $dataObject = json_decode($data);
    if (isset($dataObject) and isset($dataObject->email) and isset($dataObject->pwd)) {
        $email = $dataObject->email;
        $pwd = $dataObject->pwd;
        $sql = "SELECT * FROM `users` WHERE email = '" . $email . "' AND password = '" . md5($pwd) . "'";
        try {
            $stmt = $db->query($sql);
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        } catch (PDOException $e) {
            error_log("Error executing query: " . $e->getMessage());
            echo $e->getMessage();
        }
        if (isset($data)) {
            $json = json_encode($data, JSON_UNESCAPED_UNICODE);
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data) and isset($data['id'])) {
        $id = $data['id'];
        $sql = "DELETE FROM `users` WHERE id=" . $id;
        try {
            $stmt = $db->query($sql);
            $affected_rows = $stmt->rowCount();
            if ($affected_rows > 0) {
                $response = array("success" => true);
            } else {
                $response = array("success" => false);
            }
        } catch (PDOException $e) {
            error_log("Error executing query: " . $e->getMessage());
            echo $e->getMessage();
        }
        if (isset($response)) {
            $json = json_encode($response, JSON_UNESCAPED_UNICODE);
        }
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM users";
    try {
        $stmt = $db->query($sql);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($data, JSON_INVALID_UTF8_IGNORE);
    } catch (PDOException $e) {
        error_log("Error executing query: " . $e->getMessage());
        echo $e->getMessage();
    }
}
header('Content-Type: application/json');

if ($json === false) {
    echo 'Error encoding JSON: ' . json_last_error_msg();
} else {
    echo $json;
}
