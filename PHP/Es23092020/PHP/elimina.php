<?php
include("check.php");
    ?>
<html>
<head>
    <title>Prova Login php</title>


    <link rel="stylesheet" href="../CSS/jquery-ui.css">
    <link rel="stylesheet" href="../CSS/bootstrap.css">
    <script src="../JS/jquery-3.4.1.js"></script>
    <script src="../JS/jquery-ui.js"></script>
    <script src="../JS/bootstrap.js"></script>
    <script src="../JS/JS.js"></script>
    <div class="container pb-5 mt-3 mb-4">
        <div class="jumbotron">
            <?php
            try {
                $pdo=new PDO('mysql:host=localhost;dbname=scuola;charset=utf8','root','');

                $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);

                $sql="DELETE FROM alunni WHERE idAlunno=:codice";

                $sth= $pdo->prepare($sql);

                $codice=$_POST["idAlunno"];

                $sth->bindParam(':codice', $codice, PDO::PARAM_STR);

                $sth->execute();

                echo "<h1 class=\"display-4\">Eliminazione avvenuta con successo!</h1>
                          <p class=\"lead\">L'eliminazione dell'alunno con codice ".$_POST["idAlunno"]." è avvenuta correttamente</p>";



            }
            catch (PDOException $e)
            {
                echo "<h1 class=\"display-4\">Eliminazione non avvenuta!</h1>
                          <p class=\"lead\">Contattare l'assistenza per la risoluzione errori</p><hr>";
                echo "<p class=\"lead\">Errore: ".$e->getMessage()."</p>";
            }
            echo "<hr class=\"my-4\">
                          <a class=\"btn btn-primary btn-lg\" href=\"studenti.php\" role=\"button\">Torna alla pagina principale!</a>";

            ?>

        </div>
    </div>

</head>
<body>
</body>
</html>
