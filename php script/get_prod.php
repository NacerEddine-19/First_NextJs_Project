<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
$db = new PDO('mysql:host=localhost;dbname=shop_db2', 'root', '');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $sql = "SELECT * FROM products WHERE id=" . $_GET['id'];
    } elseif (isset($_GET["category"])) {
        $cat = $_GET["category"];
        if ($cat == "All") {
            $sql = "SELECT * FROM products";
        } else {
            $sql = "SELECT * FROM products WHERE `categorie`='$cat'";
        }
    } else {
        $sql = "SELECT * FROM products";
    }
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
if (isset($json)) {
    if ($json === false) {
        echo 'Error encoding JSON: ' . json_last_error_msg();
    } else {
        echo $json;
    }
}
