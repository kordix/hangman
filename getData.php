<?php
require_once('cred.php');
$pdo = new PDO('mysql:host=localhost;dbname=apps', $login, $pass);
$stmt = $pdo->query('SELECT * FROM szubienica');
$output='';
$data=[];
$content = json_decode(file_get_contents("php://input"));


foreach($stmt as $row){
    // $output = json_encode($row['QUESTION']);
    // print_r($row);
    array_push($data,$row['QUESTION']);
}

echo json_encode($data);


?>
