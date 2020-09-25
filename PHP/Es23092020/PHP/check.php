<?php
    session_start();
    if(!isset($_SESSION["authorized"]))
    {
       echo "<h3>Area riservata</h3>";
       die();
    }
    else
    {

    }
    ?>