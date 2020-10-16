<?php

session_start();
$json=file_get_contents('php://input');
$modelloDati=json_decode($json, true);
if(isset($modelloDati["action"])) // se la action esiste fa:
    {
        $action=$modelloDati["action"];
    }
    else{
        $action="";
    }
    switch($action){
    case "login":  // prima funzione del webservice

        $pdo=new PDO('mysql:host=localhost;dbname=es2login;charset=utf8','root','');

        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql="SELECT * FROM utenti WHERE Utente = :utente AND Pwd = :pwd";

        $sth= $pdo->prepare($sql);

        $utente=$modelloDati["utente"];
        $pwd=$modelloDati["pwd"];

        $sth->bindParam(':utente', $utente, PDO::PARAM_STR);
        $sth->bindParam(':pwd', $pwd, PDO::PARAM_STR);

        $sth->execute();

        $data=$sth->fetch();
        
        $count= $sth->rowCount();

        if($count>0)
        {
            $modelloDati["code"]="1";
            $modelloDati["pwd"]="";
            $_SESSION["utente"]= $modelloDati["utente"];
        }
        else
        {
            $modelloDati["code"]="-1";
            $modelloDati["pwd"]="";
            http_response_code(401);
        }
        echo json_encode( $modelloDati);        
        break;

    case "verifica":  // prima funzione del webservice
        if($_SESSION["utente"] == $modelloDati["utente"])
            echo "ok";
        else
            echo "no";
        break;

    default:
        include "Sito/HTML/index.html";
}

?>