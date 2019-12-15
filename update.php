<?php


$pdo = new PDO('mysql:host=localhost;dbname=apps', 'root', '');

// echo $_POST['haslo'];
// echo $_POST['haslo'];

$data = json_decode(file_get_contents("php://input"), true);
$task = $data['haslo'];
$stmt = $pdo->query("UPDATE szubienica SET haslo='".$task."'");




 ?>
