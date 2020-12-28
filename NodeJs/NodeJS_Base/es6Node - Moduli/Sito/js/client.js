
function contatta(){
    $.ajax({
        type: "POST",
        url: "http://localhost:1337/servizio1",
        data: {param : "prova", param1 : "ciao"},
        success: function (risposta, status) {
            alert(risposta);
        },
        error: function(error)
        {
            alert("ERR");
        }
    });
}
