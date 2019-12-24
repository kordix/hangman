<?php
require_once('cred.php');
$dbh = new PDO('mysql:host=localhost;dbname=apps', $login, $pass);

$dbh->query("INSERT INTO szubienica(QUESTION,CAT_ID) VALUES ('".$_GET['haslo']."',1)");







 ?>
