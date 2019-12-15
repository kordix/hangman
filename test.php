<?php
$pdo = new PDO('mysql:host=localhost;dbname=apps', 'root', '');
$stmt = $pdo->query('SELECT haslo FROM szubienica');
$output='';
foreach($stmt as $row){
    $output = json_encode($row['haslo']);

}

echo $output;


?>
