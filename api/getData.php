<?php

require_once('../cred.php');

$pdo = new PDO("mysql:host=localhost;dbname=$dbname;charset=UTF8", $login, $pass);

$query = "SELECT * FROM szubienica order by id desc";
if (isset($_GET['id'])){
    $id = $_GET['id'];
    $query = "SELECT * FROM szubienica where id = $id";
}

$sth = $pdo->prepare($query);
$sth->execute();

$rows = $sth->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($rows);
?>
