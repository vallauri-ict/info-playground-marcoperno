<?php
	header('Content-Type: application/json; charset=utf-8');   // oppure
	//header('Content-Type: application/xml; charset=utf-8');  // oppure
	//header('Content-Type: text/plain; charset=utf-8');  // utf-8case sensitive
	
	//Error 400 Bad Request  Il server non riesce ad interpretare la richiesta
	//Error 401 Unauthorized (credenziali non valide)
	//Error 403 Forbidden (credenziali ok ma accesso alla risorsa non consentito)
	//Error 404 Page Not Found
    //Error 500 Internal Server ErrorSignifica errore nel codice lato server
	//Error 503 Database ConnectionError
		
	//leggo i dati passati in post da chiamata ajax, OPPURE posso leggere $_GET o $_POST //if (!isset($_POST["pwd"])&& ($_POST["pwd"]!="banana"))
	$json = file_get_contents('php://input');
	$modelloDati = json_decode($json,true);
	
	if($modelloDati["Pwd"] != "banana") {
		http_response_code(401);
		die("Password non valida");
	}
	//elaboro richiesta eventuale query su db
	$risposta="Ciao ".$modelloDati["User"];
	//invio risposta
	echo(json_encode($risposta));
?>