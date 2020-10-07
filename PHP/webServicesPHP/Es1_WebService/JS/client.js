let datiComuni;
let regioni_province={}
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
                datiComuni=JSON.parse(response)
                
                $(datiComuni).each(function (index, element) {
                    caricaSelect("#selComuni", element.nome)

                    let trovato=false;
                    $.each(regioni_province, function (index, value) { 
                         if(index==element.regione.nome)
                            trovato=true
                    });

                    if(trovato==false)
                    {
                        regioni_province[element.regione.nome]=[element.provincia.nome]
                        caricaSelect("#selRegioni", element.regione.nome)
                    }
                    
                    trovato = false

                    $.each(regioni_province[element.regione.nome], function (index, value) { 
                        if(value==element.provincia.nome)
                           trovato=true
                    });

                    if(trovato==false)
                    {
                        regioni_province[element.regione.nome].push(element.provincia.nome)
                    }
                        
                })
                
            } catch (error) {
                alert("Errore nella lettura del JSON "+ error);
            }
            caricaProvince();
        }
        $("#selRegioni").change(caricaProvince);
    },
    error: errore
    
    });
    
}

function caricaProvince(){
    let regione=$( "#selRegioni option:selected" ).val()
    let x=regioni_province[regione]
    $("#selProvince").empty();
    $.each(regioni_province[regione], function (index, value) { 
        caricaSelect("#selProvince", value)
    });
}

function caricaSelect(id, dato)
{
    $(id).append('<option value="'+dato+'"> '+dato+'  </option>');
}


function errore(e){
    alert("errore: "+e);
}