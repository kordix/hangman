<?php
require_once('./db.php');
#$pdo = new PDO('mysql:host=localhost;dbname=szubienica', $login, $pass);

$data = json_decode(file_get_contents("php://input"), true);
$task = $data['haslo'];

$stmt = $dbh->query("DELETE FROM szubienica WHERE question='".$task."'");




 ?>
