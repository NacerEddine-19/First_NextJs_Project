<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
$db = new PDO('mysql:host=localhost;dbname=shop_db2', 'root', '');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $sql = "SELECT * FROM cart WHERE `user_id`=" . $_GET['id'];
    }
    try {
        $stmt = $db->query($sql);
        $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $json = json_encode($data, JSON_INVALID_UTF8_IGNORE);
    } catch (PDOException $e) {
        error_log("Error executing query: " . $e->getMessage());
        echo $e->getMessage();
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $dataObject = json_decode(file_get_contents('php://input'));
    if (isset($dataObject) && isset($dataObject->id) && isset($dataObject->numProd)) {
        // var_dump($dataObject);
        $id = $dataObject->id;
        $numProd = $dataObject->numProd;
        try {
            $stmt = $db->query("UPDATE `cart` SET `quantity`=" . $numProd . " WHERE `id`=" . $id);
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $response = array('success' => true);
            $json = json_encode($response);
        } catch (PDOException $e) {
            error_log("Error executing query: " . $e->getMessage());
            echo $e->getMessage();
        }
    } elseif (isset($dataObject) && isset($dataObject->idProd)) {
        $idProd = $dataObject->idProd;
        $idUser = $dataObject->idUser;
        $prodName = $dataObject->prodName;
        $prodImage = $dataObject->prodImage;
        $prodPrice = $dataObject->prodPrice;
        $qty = $dataObject->qty;
        try {
            $sql = "SELECT * FROM cart WHERE `user_id`=:idUser and `name`=:prodName";
            $stmt = $db->prepare($sql);
            $stmt->execute(array(':idUser' => $idUser, ':prodName' => $prodName));
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if (count($data) > 0) {
                $existingQty = $data[0]['quantity'];
                $newQty = $existingQty + $qty;
                $sql = "UPDATE cart SET `quantity`=:newQty WHERE `user_id`=:idUser and `name`=:prodName";
                $stmt = $db->prepare($sql);
                $stmt->execute(array(':newQty' => $newQty, ':idUser' => $idUser, ':prodName' => $prodName));
            } else {
                $stmt = $db->prepare("INSERT INTO cart (`user_id`,`name`, `image`, `price`, `quantity`) VALUES (:idUser, :prodName, :prodImage, :prodPrice, :qty)");
                $stmt->execute(array(':idUser' => $idUser, ':prodName' => $prodName, ':prodImage' => $prodImage, ':prodPrice' => $prodPrice, ':qty' => $qty));
            }
        } catch (PDOException $e) {
            error_log("Error executing query: " . $e->getMessage());
            echo $e->getMessage();
        }
        $response = array('success' => true);
        $json = json_encode($response);
    } else {
        $response = array('success' => false);
        $json = json_encode($response);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {

    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['id'])) {
        $id = $data['id'];
        $stmt = $db->prepare("DELETE FROM cart WHERE id=:id");
        $stmt->bindParam(':id', $id);
        $result = $stmt->execute();
    } elseif (isset($data['userId'])) {
        $userId = $data['userId'];
        $stmt = $db->prepare("DELETE FROM `cart` WHERE `user_id`=:userId");
        $stmt->bindParam(':userId', $userId);
        $result = $stmt->execute();
    }
    if ($result) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}



header('Content-Type: application/json');
if (isset($json)) {
    if ($json === false) {
        echo 'Error encoding JSON: ' . json_last_error_msg();
    } else {
        echo $json;
    }
}
