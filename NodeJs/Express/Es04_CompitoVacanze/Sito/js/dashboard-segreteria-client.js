$(document).ready(function () {
    checkAuthenticated();
});

let campiPrenotazione = ["id", "cliente_persona_email", "data", "negozio_id", "ora", "servita", "volontario_persona_email"]

function checkAuthenticated() {
    $.ajax({
        type: "GET",
        url: "/checkAuthenticated",
        data: {},
        success: function (risposta, status, xhr) {
            if(risposta=="segreteria")//ulteriore controllo per verificare che sia effettivamente la segreteria
            {
                caricaPrenotazioneIndex();
                
            }
            
            
        },
        error: function(error, status, xhr)
        {
            window.location.href="/home";
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
        url: "/prenotazioneIndex",
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
                            td.attr('id', val[campiPrenotazione[0]]);
                            td.text(val[campiPrenotazione[0]]);
                        }
                        else if(i==2)
                        {
                            let input = $("<input type='date'/>");
                            let x = val[campiPrenotazione[i]].substring(0,10);
                            input.val(val[campiPrenotazione[i]].substring(0,10));
                            input.attr('id', campiPrenotazione[i]+"-"+val[campiPrenotazione[0]]);
                            input.on('click',{'id': val[campiPrenotazione[0]]}, toogleBtnSalva);
                            td.append(input);
                        }
                        else if(i==4)
                        {
                            let input = $("<input type='time'/>");
                            input.val(val[campiPrenotazione[i]]);
                            input.attr('id', campiPrenotazione[i]+"-"+val[campiPrenotazione[0]]);
                            input.on('click',{'id': val[campiPrenotazione[0]]}, toogleBtnSalva);
                            td.append(input);
                        }
                        else if(i==5)
                        {
                            let checkbox = $("<input type='checkbox'/>");
                            checkbox.attr('id', 'servita-'+val[campiPrenotazione[0]]);
                            checkbox.on('click',  {'id': val[campiPrenotazione[0]]}, toogleBtnSalva);
                            if(val[campiPrenotazione[i]] == '1')
                                checkbox.attr('checked', true);
                            td.append(checkbox);
                        }
                        else if(i==7)
                        {
                            let button = $("<button id='btnSalva-"+val[campiPrenotazione[0]]+"' onclick='updatePrenotazione("+val[campiPrenotazione[0]]+")' disabled=true class='btn btn-success'>Salva</button>");
                            td.append(button);
                        }
                        else if(i==8)
                        {
                            let button = $("<button id='btnElimina-"+val[campiPrenotazione[0]]+"' onclick='deletePrenotazione("+val[campiPrenotazione[0]]+")' class='btn btn-danger'>Elimina</button>");
                            td.append(button);
                        }
                        else
                        {
                            let input = $("<input type='text'/>");
                            input.val(val[campiPrenotazione[i]]);
                            input.attr('id', campiPrenotazione[i]+"-"+val[campiPrenotazione[0]]);
                            input.on('click',{'id': val[campiPrenotazione[0]]}, toogleBtnSalva);
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
                window.location.href="/home";
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
            vet['id']= ''+id
        else if(index==5)
        {
            let x = document.getElementById(val+"-"+id).checked;
            if(x == true)
                vet[val] = "1";
            else
                vet[val] = "0";
        }
        else
        {
            vet[val] = ''+$("#"+val+"-"+id).val();
        }
        
    });
    $.ajax({
        type: "PUT",
        url: "/prenotazioneUpdate",
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
            alert(error.status+" : "+ error.responseText);
        },
    });
}

function deletePrenotazione(id) {
    $.ajax({
        type: "DELETE",
        url: "/prenotazioneDelete",
        data: {'id': id },
        success: function (risposta, status, xhr) {
            if(xhr.status == 200)
            {
                alert("eliminato");
                $("#tbody").empty();
                caricaPrenotazioni();
            }
        },
        error: function(error, status, xhr)
        {
            alert(error.status+" : "+ error.responseText);
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
        url: "/logout",
        data: {},
        success: function (risposta, status, xhr) {
            if(xhr.status == 200)
            {
                alert("logout avvenuto con successo");
                window.location.href="/home/";
            }
                
        },
        error: function(error, status, xhr)
        {
            alert(error.status+" : "+ error.responseText);
        }
    });
}