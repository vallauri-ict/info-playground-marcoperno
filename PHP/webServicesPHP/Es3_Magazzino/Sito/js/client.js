
function init(){
    caricaTabella2();
    $("#btnInserisci").click(inserisci);
    //$("#btnLogin").click(login);
}

function caricaTabella()
{
    $("#tabBody").empty();
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
                //alert("Cericamento avvenuto con successo");
                $.each(ris["magazzino"], function (indexInArray, valueOfElement) {
                    let tr=$("<tr></tr>");
                    for(let i=0;i<5;i++)
                    {
                        if(i==0)
                            aggiungiTd(tr, ris["magazzino"][indexInArray].nome);
                        else if(i==1)
                            aggiungiTd(tr, ris["magazzino"][indexInArray].quantita)
                        else if(i==2)
                            aggiungiTd(tr, ris["magazzino"][indexInArray].descrizione);
                        else if(i==3)
                        {
                            let button=$("<button >compra</button>");
                            button.click({"i":ris["magazzino"][indexInArray].codArticolo},compra);
                            let td = $("<td ></td>").append(button);
                            tr.append(td);
                        }
                        else
                        {
                            let button=$("<button >Elimina</button>");
                            button.click({"i":ris["magazzino"][indexInArray].codArticolo},elimina);
                            let td = $("<td ></td>").append(button);
                            tr.append(td);
                        }
                            
                            
                    }
                    $("#tabBody").append(tr);
                    
                });
            }
            else
            {
                alert("Cericamento non avvenuto con successo");
            }
        },
        error: function(e)
        {
            alert("err");
        }
    });
}

function inserisci()
{
    let modelloDati={};
    modelloDati.servizio="postInserisci";
    modelloDati.nome=$("#txtNome").val();
    modelloDati.quantita=$("#txtQuantita").val();
    modelloDati.descrizione=$("#txtDescr").val();
    $.ajax({
        url: "server.php",
        type: 'POST',
        data: JSON.stringify(modelloDati),
        success: function (json) {
            var ris=JSON.parse(json);
            if(ris["code"]=="1")
            {
                alert("Cericamento avvenuto con successo");
                caricaTabella2();
            }
            else if(ris["code"]=="0")
            {
                alert("Cericamento non avvenuto con successo");
            }
        },
        error: function(e)
        {
            alert("err");
        }
    });
}

function aggiungiTd(tr, str)
{
    let td=$("<td></td>");
    td.text(str);
    tr.append(td);
}


function errore(e){
    stampa("Errore: " + e);
}

function stampa(msg){
    alert(msg);
}
function compra(event) {  
    let modelloDati={};
    modelloDati.servizio="postCompra";
    modelloDati.codArticolo=event.data.i;
    $.ajax({
        url: "server.php",
        type: 'POST',
        data: JSON.stringify(modelloDati),
        success: function (json) {
            var ris=JSON.parse(json);
            if(ris["code"]=="1")
            {
                alert("Cericamento avvenuto con successo");
            }
            else if(ris["code"]=="0")
            {
                alert("eliminato");
            }
            
            caricaTabella2();
        },
        error: function(e)
        {
            alert("err");
        }
    });
}
function elimina(event) {  
    let modelloDati={};
    modelloDati.servizio="postElimina";
    modelloDati.codArticolo=event.data.i;
    $.ajax({
        url: "server.php",
        type: 'POST',
        data: JSON.stringify(modelloDati),
        success: function (json) {
            var ris=JSON.parse(json);
            
            alert("Eliminazione avvenuto con successo");
            caricaTabella2();
            
        },
        error: function(e)
        {
            alert("err ");
        }
    });
}

function login(event) {
    let modelloDati={};
    modelloDati.servizio="postLogin";
    modelloDati.nome = "Marco";
    modelloDati.pwd = "pwd";

    $.ajax({
        url: "server.php",
        type: 'POST',
        data: JSON.stringify(modelloDati),
        success: function (json) {
            var ris=JSON.parse(json);
            if(ris['code']=="1")
            {
                alert("Login avvenuto con successo");
            }
            else
            {
                alert("No Login avvenuto con successo");
            }
            //document.location ="Sito/prova.html";
            caricaTabella2();
            
        },
        error: function(e)
        {
            alert("err ");
        }
    });
}



function caricaTabella2(){
    let modelloDati={};
    modelloDati.servizio="getMagazzino";

    $.ajax({
        url: "server.php",
        type: 'Post',
        data: JSON.stringify(modelloDati),
        success: function (json) {
            var ris=JSON.parse(json);
            $("#tabScroll").empty();
            if(ris['code']=="1")
            {
                $.each(ris['magazzino'], function (indexInArray, valueOfElement) { 
                    let tr=$("<tr></tr>")
                    aggiungiTd(tr, ris['magazzino'][indexInArray]['nome']);
                    aggiungiTd(tr, ris['magazzino'][indexInArray]['quantita']);
                    aggiungiTd(tr, ris['magazzino'][indexInArray]['descrizione']);
                    aggiungiBottone(tr, ris['magazzino'][indexInArray]["codArticolo"], "compra");
                    aggiungiBottone(tr, ris['magazzino'][indexInArray]["codArticolo"], "elimina");
                    $("#tabScroll").append(tr);
                });
            }
            else
            {
                
            }
            //document.location ="Sito/prova.html";
            
        },
        error: function(e)
        {
            alert("err ");
        }
    });
}

function aggiungiBottone(tr, i, text)
{
    let td=$("<td></td>");
    
    let button = $("<button>"+text+"</button>");
    if(text=="compra")
    {
        button.click({"i": i},  compra);

    }
    else
    {
        button.click({"i": i},  elimina);

    }

    td.append(button);
    tr.append(td);
}

