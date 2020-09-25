<?php
include("check.php");
$idCittaFinale=0;
$idClasseFinale=0;


try {
    session_start();

    $pdo=new PDO('mysql:host=localhost;dbname=scuola;charset=utf8','root','');

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    ///inserimento citta

    $sql="SELECT * FROM citta WHERE nomeCitta = :citta";

    $sth= $pdo->prepare($sql);

    $citta=$_POST["idCitta"];

    $sth->bindParam(':citta', $citta, PDO::PARAM_STR);

    $sth->execute();

    $data=$sth->fetch();
    
    $count= $sth->rowCount();

    if($count>0)
    {
        $idCittaFinale=$data["idCitta"];
        
    }
    else
    {
        $sql="INSERT INTO citta ( nomeCitta) VALUES (:citta)";

        $sth= $pdo->prepare($sql);

        $citta=$_POST["idCitta"];
    

        $sth->bindParam(':citta', $citta, PDO::PARAM_STR);

        $sth->execute();

        ///////

        $sql="SELECT idCitta FROM citta WHERE nomeCitta = :citta";

        $sth= $pdo->prepare($sql);

        $citta=$_POST["idCitta"];
    

        $sth->bindParam(':citta', $citta, PDO::PARAM_STR);

        $sth->execute();

        $idCittaFinale=$sth->fetch()["idCitta"];

    }
    

    //////

    $sql="SELECT * FROM classi WHERE classe = :classe";

    $sth= $pdo->prepare($sql);

    $classe=$_POST["idClasse"];

    $sth->bindParam(':classe', $classe, PDO::PARAM_STR);

    $sth->execute();

    $data=$sth->fetch();
    
    $count= $sth->rowCount();

    if($count>0)
    {
        $idClasseFinale=$data["idClasse"];
        
    }
    else
    {
        $sql="INSERT INTO classi ( classe) VALUES (:classe)";

        $sth= $pdo->prepare($sql);

        $classe=$_POST["idClasse"];
    

        $sth->bindParam(':classe', $classe, PDO::PARAM_STR);

        $sth->execute();

        ///////

        $sql="SELECT idClasse FROM classi WHERE classe = :classe";

        $sth= $pdo->prepare($sql);

        $classe=$_POST["idClasse"];
    

        $sth->bindParam(':classe', $classe, PDO::PARAM_STR);

        $sth->execute();

        $idClasseFinale=$sth->fetch()["idClasse"];

    }

    ///Insermineto alunno

    $sql="INSERT INTO alunni ( Cognome, Nome, idCitta, idClasse, pwd) 
                values (:cognome, :nome, :idCitta, :idClasse, md5(:pwd))";

    $sth= $pdo->prepare($sql);

    $cognome=$_POST["Cognome"];
    $nome=$_POST["Nome"];
    $idCitta=$idCittaFinale;
    $idClasse=$idClasseFinale;
    $pwd=$_POST["pwd"];

    $sth->bindParam(':cognome', $cognome, PDO::PARAM_STR);
    $sth->bindParam(':nome', $nome, PDO::PARAM_STR);
    $sth->bindParam(':idCitta', $idCitta, PDO::PARAM_INT);
    $sth->bindParam(':idClasse', $idClasse, PDO::PARAM_INT);
    $sth->bindParam(':pwd', $pwd, PDO::PARAM_STR);

    $sth->execute();
    //////

    

    echo "ok";
}
catch (PDOException $e)
{
    echo $idCittaFinale;
    echo "Errore nell'inserimento del studnete";
    $_SESSION['message']="Errore inserimento studnete. Riprovare";
}



