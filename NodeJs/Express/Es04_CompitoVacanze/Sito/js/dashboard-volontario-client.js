const campiPrenotazione = ["id", "cliente_persona_email", "data", "negozio_nome", "ora", "servita", "volontario_persona_email"]

//#region GESTIONE AUTENTICAZIONE

$(document).ready(function () {
    checkAuthenticated();
});

function checkAuthenticated() {
    $.ajax({
        type: "GET",
        url: "/checkAuthenticated",
        data: {},
        success: function (risposta, status, xhr) {
            if (risposta.tipo == "volontario")//ulteriore controllo per verificare che sia effettivamente la segreteria
            {
                caricaPrenotazioneIndex();
            }


        },
        error: function (error, status, xhr) {
            window.location.href = "/home";
        },
    });
}

function logout() {
    $.ajax({
        type: "POST",
        url: "/logout",
        data: {},
        success: function (risposta, status, xhr) {
            if (xhr.status == 200) {
                alert("logout avvenuto con successo");
                window.location.href = "/home/";
            }

        },
        error: function (error, status, xhr) {
            alert(error.status + " : " + error.responseText);
            if(error.status ==  '401')
                window.location.href = "/home";
        }
    });
}

//#endregion

function caricaPrenotazioneIndex() {
    $("#content").load('../dashboard-volontario/prenotazioneIndex.html', function () {
        caricaPrenotazioni();
    });

}
function caricaPrenotazioni() {
    $("#tbody").empty();
    $.ajax({
        type: "POST",
        url: "/prenotazioneShow",
        data: {},
        success: function (risposta, status, xhr) {
            if (xhr.status == 200) {
                $.each(risposta, function (index, val) {
                    console.log(JSON.stringify(val));
                    let tr = $("<tr></tr>");
                    for (let i = 0; i < campiPrenotazione.length+1; i++) {
                        let td = $("<td></td>");
                        if (campiPrenotazione[i] == 'servita') {
                            let checkbox = $("<input type='checkbox'/>");
                            checkbox.attr('id', 'servita-' + val[campiPrenotazione[0]]);
                            checkbox.on('click', { 'id': val[campiPrenotazione[0]] }, toogleBtnSalva);
                            if (val[campiPrenotazione[i]] == '1')
                                checkbox.attr('checked', true);
                            td.append(checkbox);
                        }
                        else if(campiPrenotazione.length == i )
                        {
                            let button = $("<button id='btnSalva-" + val[campiPrenotazione[0]] + "' onclick='updatePrenotazione(" + val[campiPrenotazione[0]] + ")' disabled=true class='btn btn-success'>Salva</button>");
                            td.append(button);
                        }
                        else {
                            td.text(val[campiPrenotazione[i]]);
                        }

                        tr.append(td);
                    }
                    $("#tbody").append(tr);

                });
                timer();
            }

        },
        error: function (error, status, xhr) {
            alert(error.status + " : " + error.responseText);
            if (error.status == '401') {
                window.location.href = "/home";
            }
        }
    });
}

function toogleBtnSalva(e) {
    let btn = "btnSalva-" + e.data.id;//+checkbox.attr('id').substring(8);
    //let stato=$("#"+btn).attr('disabled');
    $("#" + btn).attr('disabled', false);
    //$("#"+btn).attr('disabled', !stato);
}

function updatePrenotazione(id) {
    let vet = {};
    let x = document.getElementById("servita-" + id).checked;
    if (x == true)
        vet["servita"] = "1";
    else
        vet["servita"] = "0";
    vet["id"]=id;
    $.ajax({
        type: "PUT",
        url: "/prenotazioneUpdate",
        data: vet,
        success: function (risposta, status, xhr) {
            if (xhr.status == 200) {
                alert(risposta);
                $("#tbody").empty();
                caricaPrenotazioni();
            }
        },
        error: function (error, status, xhr) {
            alert(error.status + " : " + error.responseText);
            if(error.status ==  '401')
                window.location.href = "/home";
        },
    });
}

function timer() {
    setTimeout(caricaPrenotazioni, 60000);
}