let datiComuni;

function init(){
    caricaComuni();
}
function caricaComuni(){
    $.ajax({url: "https://raw.githubusercontent.com/matteocontrini/comuni-json/master/comuni.jsonf", 
    type:"GET",
    success: function(response)
    {
        if(typeof response === "string")
        {
            try {
                alert( datiComuni=JSON.parse(response))
            } catch (error) {
                alert("Erroe nell alettura del JSON "+ error);
            }
        }
    },
    error: errore

    
    });
    
}

function errore(e){
    alert("errore: "+e);
}