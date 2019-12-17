<?php
require_once('cred.php');
$pdo = new PDO('mysql:host=localhost;dbname=apps', $login, $pass);
$stmt = $pdo->query('SELECT haslo FROM szubienica');
$output='';
foreach($stmt as $row){
    $output = json_encode($row['haslo']);

}

echo $output;


?>
