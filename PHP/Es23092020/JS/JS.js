$(window).ready(function () {
    var x=$("label");
    x.addClass("labelColor");
    $("#click").click(function () {
        event.preventDefault();

        var $form = $("#loginForm");

        var serializedData = $form.serialize();

        if($("#idAlunnoForm").val()!="" && $("#pwdForm").val()!="") {

        
            $.ajax({
                url: '../PHP/login.php',
                type: 'POST',
                cache: false,
                data: serializedData,
                complete: function (xhr, status) {
                    if (status === 'error' || xhr.responseText!="ok") { //quando inserivo una codice che era già nel DB ritornava success, di conseguenza ritorno se l'azione è andata a buon fine
                        alert("login errato");
                        document.location.href="../HTML/login.html";
                    }
                    else {
                        alert("Login corretto!");
                        document.location.href="../PHP/studenti.php";
                    }
                }
            });
            
        }
        else
        {
            alert("Compilare tutti i campi");
        }
    })
    $("#inserisci").click(apriInserisci);
    $("#foo").submit(function (event) {
        event.preventDefault();

        var $form = $(this);

        var serializedData = $form.serialize();

        if($("#cognomeForm").val()!="" && $("#nomeForm").val()!="" &&$("#classeForm").val()!="" &&$("#cittaForm").val()!="") {

        
            $.ajax({
                url: '../PHP/inserisci.php',
                type: 'POST',
                cache: false,
                data: serializedData,
                complete: function (xhr, status) {
                    if (status === 'error' || xhr.responseText!="ok") { //quando inserivo una codice che era già nel DB ritornava success, di conseguenza ritorno se l'azione è andata a buon fine
                        alert(xhr.responseText);
                        document.location.href="../PHP/studenti.php";
                    }
                    else {
                        alert("Alunno inserito!");
                        document.location.href="../PHP/studenti.php";
                    }
                }
            });
            
        }
        else
        {
            alert("Compilare tutti i campi");
        }
    });

})
function abilitaBottoni(id_disco) {
    $("#"+id_disco+"_salva").prop("disabled", false);
    $("#"+id_disco+"_elimina").prop("disabled", false);
}
function apriInserisci() {
    document.location.href="../HTML/inserisci.html";
}
function aggiungiDisco(event) {



}
