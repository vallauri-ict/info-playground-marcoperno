<?php

    function elimina($pdo, $codArticolo)
    {
        $sql="DELETE  FROM articolo WHERE codArticolo = :codArticolo";

        $sth= $pdo->prepare($sql);

        $sth->bindParam(':codArticolo', $codArticolo, PDO::PARAM_INT);

        $sth->execute();
    }

    function controlloCategoria($pdo, $descr)
    {
        $sql="SELECT codCategoria FROM settore WHERE descrizione = :descr";

        $sth= $pdo->prepare($sql);

        $sth->bindParam(':descr', $descr, PDO::PARAM_STR);

        $sth->execute();

        $data=$sth->fetch();
        
        $count= $sth->rowCount();
        if($count==0)
        {
            $sql="INSERT INTO settore (  descrizione) VALUES (  :descr)";

            $sth= $pdo->prepare($sql);

            $sth->bindParam(':descr', $descr, PDO::PARAM_STR);

            $sth->execute();

            $sql="SELECT codCategoria FROM settore WHERE descrizione = :descr";

            $sth= $pdo->prepare($sql);

            $sth->bindParam(':descr', $descr, PDO::PARAM_STR);

            $sth->execute();

            $data=$sth->fetch();
        }
        
        return $data["codCategoria"];
    }

    function inserisciArticolo($pdo, $modelloDati)
    {
        $sql="INSERT INTO articolo ( nome, quantita, codCategoria) VALUES ( :nome,  :quantita, :codCategoria)";

        $sth= $pdo->prepare($sql);

        $nome=$modelloDati["nome"];
        $codCategoria=$modelloDati["codCategoria"];
        $quantita=$modelloDati["quantita"];

        $sth->bindParam(':nome', $nome, PDO::PARAM_STR);
        $sth->bindParam(':quantita', $quantita, PDO::PARAM_INT);
        $sth->bindParam(':codCategoria', $codCategoria, PDO::PARAM_INT);

        $sth->execute();
    }



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

            $sql="SELECT art.codArticolo, art.nome, art.quantita, sett.descrizione FROM articolo as art, settore as sett WHERE art.codCategoria = sett.codCategoria ORDER BY art.nome ASC";

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
                $vet[$cont]->codArticolo = $rows['codArticolo'];
                $cont++;
            }
            $modelloDati['code']=1;
            $modelloDati['magazzino']=$vet;
            echo json_encode($modelloDati);
        break;

        //////////////////////

        case "postInserisci":
            $pdo=new PDO('mysql:host=localhost;dbname=es3magazzino;charset=utf8','root','');

            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $sql="SELECT * FROM articolo WHERE nome = :nome";

            $sth= $pdo->prepare($sql);

            $utente=$modelloDati["nome"];

            $sth->bindParam(':nome', $utente, PDO::PARAM_STR);

            $sth->execute();

            $data=$sth->fetch();
            
            $count= $sth->rowCount();

            if($count==0)
            {
                $modelloDati["codCategoria"] = controlloCategoria($pdo, $modelloDati["descrizione"]);
                inserisciArticolo($pdo, $modelloDati);
                
                $modelloDati["code"]=1;
            }
            else
            {
                $modelloDati["code"]=0;
            }
            
            echo json_encode($modelloDati);
        break;
        
        ///////
        case "postCompra":
            $pdo=new PDO('mysql:host=localhost;dbname=es3magazzino;charset=utf8','root','');

            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $sql="SELECT quantita FROM articolo WHERE codArticolo = :codArticolo";

            $sth= $pdo->prepare($sql);

            $codArticolo=$modelloDati["codArticolo"];

            $sth->bindParam(':codArticolo', $codArticolo, PDO::PARAM_INT);

            $sth->execute();

            $data=$sth->fetch();

            if($data["quantita"]!="1")
            {
                ///rimuovi 1
                $sql="UPDATE articolo SET quantita = quantita -1 WHERE articolo.codArticolo = :codArticolo";

                $sth= $pdo->prepare($sql);
    
                $codArticolo=$modelloDati["codArticolo"];
    
                $sth->bindParam(':codArticolo', $codArticolo, PDO::PARAM_INT);
    
                $sth->execute();

                $modelloDati["code"]=1;
            }
            else
            {
                elimina($pdo, $modelloDati["codArticolo"]);
                $modelloDati["code"]=0;
            }

            echo json_encode($modelloDati);
            
        break;


        case "postElimina":
            $pdo=new PDO('mysql:host=localhost;dbname=es3magazzino;charset=utf8','root','');

            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            elimina($pdo, $modelloDati["codArticolo"]);

            $modelloDati["code"]=1;

            echo json_encode($modelloDati);
        break;

        case "postLogin":
            $pdo=new PDO('mysql:host=localhost;dbname=es2login;charset=utf8','root','');

            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            $sql="SELECT * FROM utenti WHERE Pwd = md5(:pwd)";

            $sth= $pdo->prepare($sql);

            $pwd=$modelloDati["pwd"];

            $sth->bindParam(':pwd', $pwd, PDO::PARAM_STR);

            $sth->execute();

            $count= $sth->rowCount();

            if($count>0)
            {
                $modelloDati["code"]=1;
            }
            else
            {
                $modelloDati["code"]=0;
            }

            echo json_encode($modelloDati);
        break;
        
        //Caso in cui non entra in nessun case 
        //  -> richiedo un servizio che non esiste in questo server
        //  -> richiesta della pagina principale del sito
        default:
            include "Sito/principale.html";
    }    
?>