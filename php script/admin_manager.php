<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
$db = new PDO('mysql:host=localhost;dbname=shop_db2', 'root', '');
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "
        SELECT total_price as `total pending` FROM `orders` WHERE payment_status = 'pending';
        SELECT total_price as `total completed` FROM `orders` WHERE payment_status = 'completed';
        SELECT count(*) as `total orders` FROM `orders`;
        SELECT count(*) as `total products` FROM `products`;
        SELECT count(*) as `users` FROM `users` WHERE user_type = 'user';
        SELECT count(*) as `admins` FROM `users` WHERE user_type = 'admin';
        SELECT count(*) as `total users` FROM `users`;
        SELECT count(*) as `total message` FROM `message`;
        ";
    try {

        $stmt = $db->prepare($sql);
        $stmt->execute();
        $results = [];
        do {
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            if ($result) {
                $results[] = $result;
            }
        } while ($stmt->nextRowset());
    } catch (PDOException $e) {
        echo 'Error: ' . $e->getMessage();
    }
    $json_results = json_encode($results);

    header('Content-Type: application/json');
    echo $json_results;
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['title'])) {

        $title = $_POST['title'];
        $price = $_POST['price'];
        $desc = $_POST['description'];
        $cat = $_POST['categorie'];
        $image_name = $_POST['image'];
        $stmt = $db->prepare("INSERT INTO products (name, price, image,description,categorie) VALUES (:title, :price, :image,:desc,:cat)");
        $stmt->bindParam(':title', $title);
        $stmt->bindParam(':price', $price);
        $stmt->bindParam(':image', $image_name);
        $stmt->bindParam(':desc', $desc);
        $stmt->bindParam(':cat', $cat);

        if ($stmt->execute()) {
            $response = array(
                'success' => true,
                'message' => 'Product added successfully!',
                'product' => array(
                    'title' => $title,
                    'price' => $price,
                    'description' => $desc,
                    'categorie' => $cat,
                    'image' => $image_name
                )
            );
        } else {
            $response = array(
                'success' => false,
                'message' => 'Error adding product!'
            );
        }

        header('Content-Type: application/json');
        echo json_encode($response);
    } elseif (isset($_POST['name']) && isset($_POST['email']) && isset($_POST['password'])) {
        $name = $_POST['name'];
        $email = $_POST['email'];
        $password = md5($_POST['password']);
        $stmt = $db->prepare("INSERT INTO `users` (name, email,password) VALUES (:name, :email,:password)");
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':password', $password);
        if ($stmt->execute()) {
            $response = array(
                'success' => true,
                'message' => 'User added succesfully!',
            );
        } else {
            $response = array(
                'success' => false,
                'message' => 'Error adding User!'
            );
        }

        header('Content-Type: application/json');
        echo json_encode($response);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id = $data['id'];
    $stmt = $db->prepare("DELETE FROM products WHERE id=:id");
    $stmt->bindParam(':id', $id);
    $result = $stmt->execute();
    if ($result) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}

$db = null;
