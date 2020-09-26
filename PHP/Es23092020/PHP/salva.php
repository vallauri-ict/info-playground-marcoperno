<?php
include("check.php");
?>
<html>
<head>
    <title>Prova Login php</title>

    <link rel="stylesheet" href="../CSS/CSS.css">
    <link rel="stylesheet" href="../CSS/jquery-ui.css">
    <link rel="stylesheet" href="../CSS/bootstrap.css">
    <script src="../JS/jquery-3.4.1.js"></script>
    <script src="../JS/jquery-ui.js"></script>
    <script src="../JS/bootstrap.js"></script>
    <script src="../JS/JS.js"></script>
    <style>
        .loader {
            border: 16px solid #f3f3f3;
            border-top: 16px solid #3498db;
            border-radius: 50%;
            width: 120px;
            height: 120px;
            animation: spin 2s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container pb-5 mt-3 mb-4">
        <div class="jumbotron">
            <?php
            $idCittaFinale=0;
            $idClasseFinale=0;
            try {

                $pdo=new PDO('mysql:host=localhost;dbname=scuola;charset=utf8','root','');

                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

                ///inserimento citta

                $sql="SELECT * FROM citta WHERE nomeCitta = :citta";

                $sth= $pdo->prepare($sql);

                $citta=$_GET["Citta"];

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

                    $citta=$_GET["Citta"];
                

                    $sth->bindParam(':citta', $citta, PDO::PARAM_STR);

                    $sth->execute();

                    ///////

                    $sql="SELECT idCitta FROM citta WHERE nomeCitta = :citta";

                    $sth= $pdo->prepare($sql);

                    $citta=$_GET["Citta"];
                

                    $sth->bindParam(':citta', $citta, PDO::PARAM_STR);

                    $sth->execute();

                    $idCittaFinale=$sth->fetch()["idCitta"];

                }
                

                //////

                $sql="SELECT * FROM classi WHERE classe = :classe";

                $sth= $pdo->prepare($sql);

                $classe=$_GET["Classe"];

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

                    $classe=$_GET["Classe"];
                

                    $sth->bindParam(':classe', $classe, PDO::PARAM_STR);

                    $sth->execute();

                    ///////

                    $sql="SELECT idClasse FROM classi WHERE classe = :classe";

                    $sth= $pdo->prepare($sql);

                    $classe=$_GET["Classe"];
                

                    $sth->bindParam(':classe', $classe, PDO::PARAM_STR);

                    $sth->execute();

                    $idClasseFinale=$sth->fetch()["idClasse"];

                }

                ///Insermineto alunno

                $sql="UPDATE alunni SET Cognome= :cognome , Nome=:nome, idCitta=:idCitta, idClasse=:idClasse WHERE idAlunno= :idAlunno";

                $sth= $pdo->prepare($sql);
                
                $idAlunno=$_GET["idAlunno"];
                $cognome=$_GET["Cognome"];
                $nome=$_GET["Nome"];
                $idCitta=$idCittaFinale;
                $idClasse=$idClasseFinale;

                $sth->bindParam(':idAlunno', $idAlunno, PDO::PARAM_INT);
                $sth->bindParam(':cognome', $cognome, PDO::PARAM_STR);
                $sth->bindParam(':nome', $nome, PDO::PARAM_STR);
                $sth->bindParam(':idCitta', $idCitta, PDO::PARAM_INT);
                $sth->bindParam(':idClasse', $idClasse, PDO::PARAM_INT);

                $sth->execute();












                echo "<h1 class=\"display-4\">Aggiornamneto avvenuto con successo!</h1>
                          <p class=\"lead\">L'aggiornnameto del CD con codice ".$_GET["idAlunno"]." è avvenuta correttamente</p>";


            }
            catch (PDOException $e)
            {
                echo "<h1 class=\"display-4\">Eliminazione non avvenuta!</h1>
                          <p class=\"lead\">Contattare l'assistenza per la risoluzione errori</p><hr>";

                echo "<p class=\"lead\">Errore: ".$e->getMessage()."</p>";
            }
            echo "<h1 id='timer'>Reindirizzamento in corso... 5 secondi</h1>";

            ?>
            <script>
                setTimeout(reindirizzamento, 5000);
                setInterval(myTimer, 1000);
                var sec=4;
                function reindirizzamento() {
                    window.location.replace("studenti.php");
                }
                function myTimer() {
                    document.getElementById("timer").innerHTML = "Reindirizzamento in corso... "+sec.toString()+" secondi";
                    sec--;
                }
            </script>
            <div class="loader"></div>
        </div>
    </div>
<body>
</body>
</html>