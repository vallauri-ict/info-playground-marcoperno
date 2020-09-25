<?php
    try{
        session_start();
        $pdo=new PDO('mysql:host=localhost;dbname=scuola;charset=utf8','root','');
    
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
        ///inserimento citta
    
        $sql="SELECT * FROM alunni WHERE idAlunno = :idAlunno AND pwd=md5(:pwd)";
    
        $sth= $pdo->prepare($sql);
    
        $idAlunno=$_POST["idAlunno"];
        $pwd=$_POST["pwd"];
    
        $sth->bindParam(':idAlunno', $idAlunno, PDO::PARAM_INT);
        $sth->bindParam(':pwd', $pwd, PDO::PARAM_STR);
    
        $sth->execute();
    
        $data=$sth->fetch();
        
        $count= $sth->rowCount();
        
        if($count>0)
        {
            $_SESSION["authorized"] = 1;
            echo "ok";
        }
        else{
            echo "no";
        }
    }
    catch(PDOException $e)
    {
        echo "no";
    }
?>
