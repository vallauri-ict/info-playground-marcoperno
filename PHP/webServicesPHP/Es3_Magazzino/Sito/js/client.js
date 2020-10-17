
function init(){
    alert("D");
    let modelloDati={};
    modelloDati.servizio="getMagazzino";
    $.ajax({
        url: "server.php",
        type: 'POST',
        data: JSON.stringify(modelloDati),
        success: function (json) {
            var ris=JSON.parse(json);
            if(ris["code"]=="1")
            {
                alert("log ok");
            }
            else
            {
                alert("log no");
            }
        },
        error: function(e)
        {
            alert("log no");
        }
    });
}


function errore(e){
    stampa("Errore: " + e);
}

function stampa(msg){
    alert(msg);
}