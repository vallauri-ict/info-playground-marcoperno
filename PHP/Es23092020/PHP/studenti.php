<?php
    //session_start();
    include("check.php");
    /*session_start();
    $_SESSION["authorized"] = 0;
    if(isset($_POST["Elimina"]) || isset($_GET["Salva"]))
    {
        $_SESSION['authorized']=1;
    }*/
        /*{
            echo "<h1>s</h1>";
            $page="salva.php";
        }
        else
        {
            $_SESSION['authorized']=1;
            echo '<h1>'.$_POST["codice"].'</h1>';
            $page="elimina.php";
        }
        echo '<script language=javascript> document.location.href="'.$page.'"</script>';*/

    //else
    //{
?>
    <html>
        <head>
            <title>Prova Login php</title>

            <!--<link rel="stylesheet" href="../CSS/CSS.css">-->
            <link rel="stylesheet" href="../CSS/jquery-ui.css">
            <link rel="stylesheet" href="../CSS/bootstrap.css">
            <script src="../JS/jquery-3.4.1.js"></script>
            <script src="../JS/jquery-ui.js"></script>
            <script src="../JS/bootstrap.js"></script>
            <script src="../JS/JS.js"></script>
            <style>
                body {
                    margin:0;
                    padding:0;
                    font-family: sans-serif;
                    background: linear-gradient(#141e30, #243b55);
                }
                .labelColor{
                    color: #fff;
                }
            </style>

        </head>
        <body>
        <header>
            <div class="collapse bg-dark" id="navbarHeader">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-8 col-md-7 py-4">
                            <h4 class="text-white">Benvenuto!</h4>
                            <p class="text-muted " >In questo sito potrai gestire gli alunni</p>
                        </div>
                        <div class="col-sm-4 offset-md-1 py-4">
                            <h4 class="text-white">Contatti</h4>
                            <ul class="list-unstyled">
                                <li><a href="#" class="text-white">Seguici su Twitter: @Bho+</a></li>
                                <li><a href="#" class="text-white">Metti mi piace su Facebook: @Bho</a></li>
                                <li><a href="#" class="text-white">Scrivimi: bho@gmail.com</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="navbar navbar-dark bg-dark box-shadow">
                <div class="container d-flex justify-content-between">
                    <a href="#" class="navbar-brand d-flex align-items-center">
                        <span  aria-hidden="true">🎵</span>
                        <strong>Alunni</strong>
                    </a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
            </div>
        </header>
        <div class="container pb-5 mt-3 mb-4">
            <?php
            if (isset($_SESSION['message'])){
                echo '<div class="alert alert-info" role="alert">';
                echo $_SESSION['message'];
                $_SESSION['message'] = NULL;
                echo '</div>';
            }
            ?>
            <div id="dischi">
                <?php
                $i=1;
                $pdo=new PDO('mysql:host=localhost;dbname=scuola;charset=utf8','root','');
                $sql = "SELECT * FROM alunni";

                

                foreach ($pdo->query($sql) as $rows)
                {

                    $sql2="SELECT nomeCitta from citta WHERE idCitta = ".$rows["idCitta"]."";
                    $citta=$pdo->query($sql2)->fetch();
                    
                    $sql2="SELECT classe from classi WHERE idClasse = ".$rows["idClasse"]."";
                    $classe=$pdo->query($sql2)->fetch();

                    echo "<form>
                            <div class=\"page-header\">
                                <h3 style='color:white'>".$i."° studente. <small>Ecco i dettagli:</small></h3>
                            </div>
                           <div class=\"form-row align-items-center\">";

                    echo "<div class=\"col-auto\">
                            <label class='labelColor' for=\"idAlunnoForm\">IdAlunno</label>
                            <input style=\"width: 100px\" type=\"text\" name=\"idAlunno\" class=\"form-control\" id=\"idAlunno\" placeholder=\"1\" value='".$rows['idAlunno']."' readonly>
                        </div>";

                    echo "<div class=\"col-auto labelColor\" >
                            <label for=\"cognomeForm\">Cognome</label>
                             <div class=\"input-group\">
                                <div class=\"input-group-prepend\">
                                    <span class=\"input-group-text\" id=\"inputGroupPrepend\">@</span>
                                </div>
                                <input style=\"width: 200px\" type=\"text\" class=\"form-control\" aria-describedby=\"inputGroupPrepend\" name=\"Cognome\" onkeyup='abilitaBottoni(".$i.")' id=\"cognomeForm\" placeholder=\"Rossi\" value='".$rows['Cognome']."' required>
                            </div>
                        </div>";

                    echo "<div class=\"col-auto\" >
                            <label for=\"titoloFormForm\">Nome</label>
                            <input style=\"width: 200px\" type=\"text\" class=\"form-control\" name=\"Nome\" id=\"nomeForm\" onkeyup='abilitaBottoni(".$i.")' placeholder=\"MArco\" value='".$rows['Nome']."'>
                        </div>";

                    echo "<div class=\"col-auto\" >
                            <label for=\"cittaForm\">Citta</label>
                            <input style=\"width: 200px\" type=\"text\"  class=\"form-control\" name=\"Citta\"  id=\"cittaForm\" onkeyup='abilitaBottoni(".$i.")' placeholder=\"napoli\" value='".$citta['nomeCitta']."'>
                        </div>";

                    echo "<div class=\"col-auto\" >
                        <label for=\"classeForm\">Classe</label>
                        <input style=\"width: 200px\" type=\"text\"  class=\"form-control\" name=\"Classe\"  id=\"classeForm\"  onkeyup='abilitaBottoni(".$i.")' placeholder=\"3A\" value='".$classe['classe']."'>
                    </div>";
                    
                    echo "<div class='row'>";

                    echo "<div class=\"col-auto\" >
                            <button style='width: 120px' id='".$i."_salva' type=\"submit\" formmethod='get' formaction='salva.php'  class=\"form-control btn btn-primary btnSalva\" name=\"Salva\" disabled>Salva</button>
                          </div>";

                    echo "<div class=\"col-auto\" >
                            <button style='width: 120px' id='".$i."_elimina' formmethod='post' formaction='elimina.php' type=\"submit\" class=\"form-control btn btn-danger btnElimina\" name='Elimina' disabled>Cancella</button>
                          </div>";

                    echo "</div></form><hr class=\"my-4\">";
                    $i++;

                    echo "</div>";
                }
                ?>

            </div>
            <input type="button" id="inserisci" class="btn btn-primary" value="Inserisci nuovo alunno!">

        </div>

        </body>
    </html>
<!--
//formaction='salva.php' formmethod='get'
<form class="form-inline" method="POST" action="start.php">
    <div class="form-row">
        <div class="form-group col-sm-4">
            <label for="codiceForm">Codice</label>
            <input style="width: 100px" type="text" name="codice" class="form-control" id="codiceForm" placeholder="123ABC">
        </div>

        <div class="form-group col-sm-4" >
            <label for="autoreForm">Autore</label>
            <input style="width: 200px" type="text" class="form-control" name="autore" id="autoreForm" placeholder="Mario Rossi">
        </div>
        <div class="form-group col-sm-4" >
            <label for="titoloForm">Nome</label>
            <input style="width: 200px" type="text" class="form-control" name="Nome" id="titoloForm" placeholder="Over the rainbow">
        </div>
    </div>

    <button type="submit" class="btn btn-primary" name="send">Aggiungi</button>

</form>
-->

