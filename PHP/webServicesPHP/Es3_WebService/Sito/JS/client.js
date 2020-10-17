var modelloDati={};
let datiComuni;
let regioni_province={}
function init(){
    caricaArray();
    $("#btnLogin").click(login);
    $("#btnVerifica").click(verificaLog);

}
function login() { 
    
    modelloDati.action="login";
    modelloDati.utente= $("#nome").val();
    modelloDati.pwd=$("#pwd").val();
    modelloDati.code="";
    $.ajax({
        url: 'server.php',
        type: 'POST',
        cache: false,
        data: JSON.stringify(modelloDati),
        success: function (json) {
            var ris=JSON.parse(json);
            if(ris["code"]=="1")///questa parte di codice sarebbe inutile perchè ritorno 401 se il login è sbagliato, ma lho lasciato comuqnue per farlo lavorare anche se ritorno 200 anche se il login è andaaìto male
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
 function verificaLog() { 
    modelloDati.action="verifica";
    $.ajax({
        url: 'server.php',
        type: 'POST',
        cache: false,
        data: JSON.stringify(modelloDati),
        success: function (xhr, status) {
            if(xhr=="ok")
                alert("ok");
            else
                alert("no");

        },
        error: function(e)
        {
            alert(e.error);
        }
        
    });
 }
function caricaArray(){
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
                        regioni_province[element.regione.nome]={}
                        regioni_province[element.regione.nome][element.provincia.nome]=[]
                        caricaSelect("#selRegioni", element.regione.nome)
                    }
                    
                    trovato = false

                    $.each(regioni_province[element.regione.nome], function (index, value) { 
                        if(index==element.provincia.nome)
                           trovato=true
                    });

                    if(trovato==false)
                    {
                        regioni_province[element.regione.nome][element.provincia.nome]=[]
                    }
                    regioni_province[element.regione.nome][element.provincia.nome].push(element.nome)
                    //let xcc=regioni_province[element.regione.nome][element.provincia.nome]
                    //xcc="";
                    //regioni_province[element.regione.nome][element.provincia.nome].push(element.nome)
                        
                })
                
            } catch (error) {
                alert("Errore nella lettura del JSON "+ error);
            }
            caricaProvince();
        }
        $("#selRegioni").change(caricaProvince);
        $("#selProvince").change(caricaComuni);//$(".nav1").click({navFlag: '"'+n1+'"', ID: '"'+recId+'"'}, getNavInfo);
    },
    error: errore
    
    });
    
}

function caricaProvince(){
    let regione=$( "#selRegioni option:selected" ).val()
    let x=regioni_province[regione]
    $("#selProvince").empty();
    $.each(x, function (index, value) { 
        caricaSelect("#selProvince", index)
    });
    caricaComuni();
}

function caricaComuni(){
    let regione=$( "#selRegioni option:selected" ).val()
    let provincia=$( "#selProvince option:selected" ).val()
    $("#selComuni").empty();
    let x= regioni_province[regione][provincia]
    $.each(x, function (index, value) { 
        caricaSelect("#selComuni", value)
    });
}

function caricaSelect(id, dato)
{
    $(id).append('<option value="'+dato+'"> '+dato+'  </option>');
}


function errore(e){
    alert("errore: "+e);
}