<?php
if ($_SERVER['REQUEST_METHOD'] != 'POST') {
    return;
}

require_once('./db.php');

$dane = json_decode(file_get_contents('php://input'));

print_r($dane);

$kwerenda='';
$kolumnystring = '';
$wartosci = [];


$allowed = ['question','cat_id'];


$pytajniki = '';

foreach ($allowed as $key) {
    if (property_exists($dane, $key) && $key != "id") {
        $kolumnystring .= '`'.$key.'`';
        $kolumnystring .= ',';
        $pytajniki .= '?';
        $pytajniki .= ',';
        array_push($wartosci, htmlentities($dane->$key, ENT_QUOTES, 'UTF-8'));
    }
}

    $kolumnystring = substr($kolumnystring, 0, -1);
    $pytajniki = substr($pytajniki, 0, -1);


    $query = "INSERT INTO szubienica ($kolumnystring ) values ($pytajniki) ";
    $sth = $dbh->prepare($query);
    $sth->execute($wartosci);


//require 'mail.php';
// mailuj('' , $dane->token);

?>



