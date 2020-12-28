$(document).ready(function () {
    checkAuthenticated();
});

let campiPrenotazione = ["id", "cliente_persona_email", "data", "negozio_id", "ora", "servita", "volontario_persona_email"]

function checkAuthenticated() {
    $.ajax({
        type: "GET",
        url: "http://localhost:1337/checkAuthenticated",
        data: {},
        success: function (risposta, status, xhr) {
            if(risposta=="segreteria")//ulteriore controllo per verificare che sia effettivamente la segreteria
            {
                caricaPrenotazioneIndex();
                
            }
            
            
        },
        error: function(error, status, xhr)
        {
            window.location.href="http://localhost:1337/home";
        },
    });
}
function caricaPrenotazioneIndex() {
    $("#content").load('../dashboard-segreteria/prenotazioneIndex.html', function(){
        caricaPrenotazioni();
    });
    
}
function caricaPrenotazioni() {
    $.ajax({
        type: "POST",
        url: "http://localhost:1337/prenotazioneIndex",
        data: {},
        success: function (risposta, status, xhr) {
            if(xhr.status == 200)
            {
                $.each(risposta, function (index, val) { 
                    console.log(JSON.stringify(val));
                    let tr = $("<tr></tr>");
                    for(let i=0;i<9; i++)
                    {
                        let td = $("<td></td>");
                        if(i==0)
                        {
                            td.attr('id', index);
                            td.text(val[campiPrenotazione[i]]);
                        }
                        else if(i==2)
                        {
                            let input = $("<input type='date'/>");
                            input.val(val[campiPrenotazione[i]].substring(0,10));
                            input.attr('id', campiPrenotazione[i]+"-"+index);
                            input.on('click',{'id': index}, toogleBtnSalva);
                            td.append(input);
                        }
                        else if(i==4)
                        {
                            let input = $("<input type='time'/>");
                            input.val(val[campiPrenotazione[i]]);
                            input.attr('id', campiPrenotazione[i]+"-"+index);
                            input.on('click',{'id': index}, toogleBtnSalva);
                            td.append(input);
                        }
                        else if(i==5)
                        {
                            let checkbox = $("<input type='checkbox'/>");
                            checkbox.attr('id', 'servita-'+index);
                            checkbox.on('click',  {'id': index}, toogleBtnSalva);
                            if(val[campiPrenotazione[i]] == '1')
                                checkbox.attr('checked', true);
                            td.append(checkbox);
                        }
                        else if(i==7)
                        {
                            let button = $("<button id='btnSalva-"+index+"' onclick='updatePrenotazione("+index+")' disabled=true class='btn btn-success'>Salva</button>");
                            td.append(button);
                        }
                        else if(i==8)
                        {
                            let button = $("<button id='btnElimina-"+index+"' class='btn btn-danger'>Elimina</button>");
                            td.append(button);
                        }
                        else
                        {
                            let input = $("<input type='text'/>");
                            input.val(val[campiPrenotazione[i]]);
                            input.attr('id', campiPrenotazione[i]+"-"+index);
                            input.on('click',{'id': index}, toogleBtnSalva);
                            td.append(input);
                        }
                            
                        tr.append(td);
                    }
                    $("#tbody").append(tr);
                    
                });
            }
                
        },
        error: function(error, status, xhr)
        {
            alert(error.status+" : "+ error.responseText);
            if(error.status=='401')
            {
                window.location.href="http://localhost:1337/home";
            }
        }
    });
}

function toogleBtnSalva(e)
{
    let btn="btnSalva-"+e.data.id;//+checkbox.attr('id').substring(8);
    //let stato=$("#"+btn).attr('disabled');
    $("#"+btn).attr('disabled', false);
    //$("#"+btn).attr('disabled', !stato);
}

function updatePrenotazione(id)
{
    let vet = {};
    $.each(campiPrenotazione, function (index, val) { 
        if(index==0)
            vet['id']=id
        else if(index==5)
        {
            if($("#"+val+"-"+id).val() == "on")
                vet[val] = true;
            else
                vet[val] = false;
        }
        else
        {
            vet[val] = $("#"+val+"-"+id).val();
        }
        
    });
    $.ajax({
        type: "PUT",
        url: "http://localhost:1337/prenotazione/:prenotazione",
        data: vet,
        success: function (risposta, status, xhr) {
            if(xhr.status == 200)
            {
                alert("aggiornato");
                $("#tbody").empty();
                caricaPrenotazioni();
            }
        },
        error: function(error, status, xhr)
        {
            window.location.href="http://localhost:1337/home";
        },
    });
}

function caricaRegistrazioni()
{
    $("#content").load('../dashboard-segreteria/registrazioneCreate.html', function(){
        
    });
}

function logout(){
    $.ajax({
        type: "POST",
        url: "http://localhost:1337/logout",
        data: {},
        success: function (risposta, status, xhr) {
            if(xhr.status == 200)
            {
                alert("logout avvenuto con successo");
                window.location.href="http://localhost:1337/home/";
            }
                
        },
        error: function(error, status, xhr)
        {
            alert(error.status+" : "+ error.responseText);
        }
    });
}