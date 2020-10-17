<?php
    //Prende tutti i dati (oggetti forniti in data nella chiamata $ajax) della richiesta
    $json = file_get_contents('php://input');
    //Traduce l'oggetto json in oggetto php
    $modelloDati = json_decode($json,true);

    //isset -> verificare se esiste una cella 
    //identificata da "servizio" nel vettore associativo $modelloDati (o "utente" in $_SESSION, vedi dopo)
    if(isset($modelloDati["servizio"])){
        $servizio = $modelloDati["servizio"];
    }else{
        $servizio = "";
    }
    
    switch($servizio){
        case "getMagazzino":
            $pdo=new PDO('mysql:host=localhost;dbname=es3magazzino;charset=utf8','root','');

            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $sql="SELECT art.nome, art.quantita, sett.descrizione FROM articolo as art, settore as sett WHERE art.codCategoria = sett.codCategoria ORDER BY art.nome ASC";

            $sth= $pdo->prepare($sql);

            $sth->execute();
            $vet = Array();
            $cont = 0;
            foreach($sth->fetchAll() as $rows)
            {
                $vet[$cont] = new stdClass();
                $vet[$cont]->nome = $rows['nome'];
                $vet[$cont]->quantita = $rows['quantita'];
                $vet[$cont]->descrizione = $rows['descrizione'];
                $cont++;
            }
            $modelloDati['code']=1;
            $modelloDati['magazzino']=$vet;
            echo json_encode($modelloDati);

            

            
        break;
        
        
        //Caso in cui non entra in nessun case 
        //  -> richiedo un servizio che non esiste in questo server
        //  -> richiesta della pagina principale del sito
        default:
            include "Sito/principale.html";
    }    
?>