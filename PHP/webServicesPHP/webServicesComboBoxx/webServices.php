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
	
	//elaboro richiesta eventuale query su db
	if($modelloDati["richiesta"] == "R") {
		$regioni=array();
		array_push($regioni,'{"idRegione": "1", "Regione": "Piemonte"}');
		array_push($regioni,'{"idRegione": "2", "Regione": "Lombardia"}');
		//$risposta=$regioni;
		$modelloDati["dati"] = $regioni;
	}
	else if($modelloDati["richiesta"] == "P") {
		$province=array();
		if($modelloDati["key"] == "1"){
			array_push($province,'{"idProvincia": "1", "Provincia": "Cuneo"}');
			array_push($province,'{"idProvincia": "2", "Provincia": "Asti"}');
		}
		else{
			array_push($province,'{"idProvincia": "1", "Provincia": "Milano"}');
			array_push($province,'{"idProvincia": "2", "Provincia": "Bergamo"}');
		}
		//$risposta=$province;
		$modelloDati["dati"] = $province;
	}
	else {
		http_response_code(400);
		die("Richiesta non valida");
	}
	//invio risposta
	echo(json_encode($modelloDati));
?>