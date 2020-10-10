<?php
if(isset($_POST["action"])) // se la action esiste fa:
{
    $action=$_POST["action"];
}
else{
    $action="";
}
switch($action){
 case "login":  // prima funzione del webservice
  $risposta=new stdClass(); // costruttore principale per costruire un oggetto generico vuoto
  $risposta->code= 1; // stato della richiesta
  $risposta->desc= "Login effetuato"; // descrizione della riposta 
  $risposta->nome="Pippo";
   echo json_encode($risposta);
  break;

  default:
     include "Sito/HTML/index.html";
}


?>