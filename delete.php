<?php
require_once('cred.php');
$pdo = new PDO('mysql:host=localhost;dbname=apps', $login, $pass);

$data = json_decode(file_get_contents("php://input"), true);
$task = $data['haslo'];

$stmt = $pdo->query("DELETE FROM szubienica WHERE question='".$task."'");




 ?>
