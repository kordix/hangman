<?php
require_once('cred.php');
$dbh = new PDO('mysql:host=localhost;dbname=apps', $login, $pass);
$question = $_GET['haslo'];

function insert($questionarg){
 global $dbh, $msg;
 // construct SQL insert statement
     $sql_insert  = "INSERT INTO szubienica(QUESTION,CAT_ID) VALUES ('".$questionarg."',1)";
     echo $sql_insert;
 if($dbh->exec($sql_insert) === false){
 $msg = 'Error inserting the department.';
 return false;
 }else{
 $msg = "The new department $questionarg is created";
 return true;
 }
}

insert($question);

echo "asdfdsasfd";

// echo $question;

?>
