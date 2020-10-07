let datiComuni;
function init(){
    caricaComuni();
}
function caricaComuni(){
    $.ajax({url: "https://raw.githubusercontent.com/matteocontrini/comuni-json/master/comuni.json", 
    type:"GET",
    success: function(response)
    {
        if(typeof response === "string")
        {
            try {
                alert( datiComuni=JSON.parse(response))
                /*$(datiComuni).each(function (index, element) {
                    $("#selComuni").append('<option value="${element.nome}"> ${element.nome}  </option>');
                  })*/
                  $("#selComuni").append('<option value="'+datiComuni[0].nome+'">'+datiComuni[0].nome +'  </option>');
                  $("#selComuni").append('<option value="'+datiComuni[1].nome+'">'+datiComuni[1].nome +'  </option>');
                  $("#selComuni").append('<option value="'+datiComuni[2].nome+'">'+datiComuni[2].nome +'  </option>');
            } catch (error) {
                alert("Errore nella lettura del JSON "+ error);
            }
        }
    },
    error: errore
    
    });
    
}

function errore(e){
    alert("errore: "+e);
}