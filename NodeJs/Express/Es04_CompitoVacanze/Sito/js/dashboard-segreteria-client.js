const campiPrenotazione = ["id", "cliente_persona_email", "data", "negozio_nome", "ora", "servita", "volontario_persona_email"]

function attivaValidator() {
    $.validator.addMethod("time", function (value, element) {
        return this.optional(element) || /^(([0-1]?[0-9])|([2][0-3])):([0-5]?[0-9])(:([0-5]?[0-9]))?$/i.test(value);
    }, "Please enter a valid time.");
    $('#formPersona').validate({
        rules: {
            email: {
                required: true,
                email: true,
                minlength: 1
            },
            nome: {
                required: true,
                minlength: 5
            },
            cognome: {
                required: true,
                minlength: 5
            },
            indirizzo: {
                required: true,
                minlength: 5
            },
            tipopersona_tipo: {
                required: true,
                minlength: 2
            }
        },
        messages: {
            email: "Inserisci una mail valida",
            nome: "Inserire un nome più lungo",
            cognome: "Inserire un cognnome più lungo",
            indirizzo: "Inserire un indirizzo più lungo",
            tipopersona_tipo: "Inserisci un tipo valido",

        },
        errorPlacement: function (error, element) {
            var attr_name = element.attr('name');
            error.insertAfter(element);
        }

    });
    //////////////////
    $('#formPrenotazione').validate({
        rules: {
            cliente_persona_email: {
                required: true,
                email: true,
                minlength: 1
            },
            negozio_nome: {
                required: true,
                minlength: 2
            },
            data: {
                required: true,
                date: true
            },
            ora: {
                required: true,
                time: "required time",
            },
            volontario_persona_email: {
                required: true,
                email: true,
                minlength: 1
            },
        },
        messages: {
            cliente_persona_email: "Inserisci una mail valida",
            negozio_nome: "Inserire un nome di negozio valido",
            data: "Inserire una data valida",
            ora: "Inserire un'ora valida",
            volontario_persona_email: "Inserisci una mail valida",

        },
        errorPlacement: function (error, element) {
            var attr_name = element.attr('name');
            error.insertAfter(element);
        }

    });
    //////////////////////////
    $('#formNegozio').validate({
        rules: {
            negozio_nome_new: {
                required: true,
                minlength: 2
            },
            negozio_indirizzo_new: {
                required: true,
                minlength: 2
            },
        },
        messages: {
            negozio_nome_new: "Inserisci un nome negozio valido",
            negozio_indirizzo_new: "Inserire un indirzzo valido",
        },
        errorPlacement: function (error, element) {
            var attr_name = element.attr('name');
            error.insertAfter(element);
        }

    });
}

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
            if (risposta.tipo == "segreteria")//ulteriore controllo per verificare che sia effettivamente la segreteria
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
//#region GESTIONE PRENOTAZIONI VIEW

function caricaPrenotazioneIndex() {
    $("#content").load('../dashboard-segreteria/sezioneCreate.html', function () {
        caricaPrenotazioni();
    });

}

function caricaPrenotazioni() {
    $.ajax({
        type: "POST",
        url: "/prenotazioneIndex",
        data: {},
        success: function (risposta, status, xhr) {
            if (xhr.status == 200) {
                $.each(risposta, function (index, val) {
                    console.log(JSON.stringify(val));
                    let tr = $("<tr></tr>");
                    for (let i = 0; i < campiPrenotazione.length+2; i++) {
                        let td = $("<td></td>");
                        if (campiPrenotazione[i] == 'id') {
                            td.attr('id', val[campiPrenotazione[0]]);
                            td.text(val[campiPrenotazione[0]]);
                        }
                        else if (campiPrenotazione[i] == 'data') {
                            let input = $("<input type='date'/>");
                            let x = val[campiPrenotazione[i]].substring(0, 10);
                            input.val(val[campiPrenotazione[i]].substring(0, 10));
                            input.attr('id', campiPrenotazione[i] + "-" + val[campiPrenotazione[0]]);
                            input.on('click', { 'id': val[campiPrenotazione[0]] }, toogleBtnSalva);
                            td.append(input);
                        }
                        else if (campiPrenotazione[i] == 'ora') {
                            let input = $("<input type='time'/>");
                            input.val(val[campiPrenotazione[i]]);
                            input.attr('id', campiPrenotazione[i] + "-" + val[campiPrenotazione[0]]);
                            input.on('click', { 'id': val[campiPrenotazione[0]] }, toogleBtnSalva);
                            td.append(input);
                        }
                        else if (campiPrenotazione[i] == 'servita') {
                            let checkbox = $("<input type='checkbox'/>");
                            checkbox.attr('id', 'servita-' + val[campiPrenotazione[0]]);
                            checkbox.on('click', { 'id': val[campiPrenotazione[0]] }, toogleBtnSalva);
                            if (val[campiPrenotazione[i]] == '1')
                                checkbox.attr('checked', true);
                            td.append(checkbox);
                        }
                        else if (campiPrenotazione.length == i) {
                            let button = $("<button id='btnSalva-" + val[campiPrenotazione[0]] + "' onclick='updatePrenotazione(" + val[campiPrenotazione[0]] + ")' disabled=true class='btn btn-success'>Salva</button>");
                            td.append(button);
                        }
                        else if (campiPrenotazione.length+1 == i) {
                            let button = $("<button id='btnElimina-" + val[campiPrenotazione[0]] + "' onclick='deletePrenotazione(" + val[campiPrenotazione[0]] + ")' class='btn btn-danger'>Elimina</button>");
                            td.append(button);
                        }
                        else {
                            let input = $("<input type='text'/>");
                            input.val(val[campiPrenotazione[i]]);
                            input.attr('id', campiPrenotazione[i] + "-" + val[campiPrenotazione[0]]);
                            input.on('click', { 'id': val[campiPrenotazione[0]] }, toogleBtnSalva);
                            td.append(input);
                        }

                        tr.append(td);
                    }
                    $("#tbody").append(tr);

                });
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
    $.each(campiPrenotazione, function (index, val) {
        if (val == 'id')
            vet['id'] = '' + id
        else if (val == 'servita') {
            let x = document.getElementById(val + "-" + id).checked;
            if (x == true)
                vet[val] = "1";
            else
                vet[val] = "0";
        }
        else {
            vet[val] = '' + $("#" + val + "-" + id).val();
        }

    });
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

function deletePrenotazione(id) {
    $.ajax({
        type: "DELETE",
        url: "/prenotazioneDelete",
        data: { 'id': id },
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

//#endregion
//#region GESTIONE REGISTRAZIONI VIEW
function caricaRegistrazioni() {
    $("#content").load('../dashboard-segreteria/registrazioneCreate.html', function () {
        attivaValidator();
    });
}


function storePrenotazione() {

    if ($('#formPrenotazione').valid()) {
        let vet = {};
        $("#formPrenotazione :input").each(function(){
            var input = $(this); 
            vet[input[0].id] = input[0].value;
        });

        $.ajax({
            type: "POST",
            url: "/prenotazioneStore",
            data: vet,
            success: function (risposta, status, xhr) {
                if (xhr.status == 200) {
                    alert(risposta);
                }
            },
            error: function (error, status, xhr) {
                alert(error.status + " : " + error.responseText);
                if(error.status ==  '401')
                window.location.href = "/home";
            },
        });

    } else {
        alert("form non valido");
    }
}

function storeNegozio() {
    if ($('#formNegozio').valid()) {
        let vet = {};
        $("#formNegozio :input").each(function(){
            var input = $(this); 
            let attribute = input[0].id;
            vet[attribute.slice(8,attribute.length-4)] = input[0].value;
        });
        console.log(JSON.stringify(vet));

        $.ajax({
            type: "POST",
            url: "/negozioStore",
            data: vet,
            success: function (risposta, status, xhr) {
                if (xhr.status == 200) {
                    alert(risposta);
                }
            },
            error: function (error, status, xhr) {
                alert(error.status + " : " + error.responseText);
                if(error.status ==  '401')
                    window.location.href = "/home";
            },
        });

    } else {
        alert("form non valido");
    }
}

function storePersona() {
    if ($('#formPersona').valid()) {
        let vet = {};
        $("#formPersona :input").each(function(){
            var input = $(this); // This is the jquery object of the input, do what you will  id e value
                vet[input[0].id] = input[0].value;
        });

        console.log(JSON.stringify(vet));

        $.ajax({
            type: "POST",
            url: "/personaStore",
            data: vet,
            success: function (risposta, status, xhr) {
                if (xhr.status == 200) {
                    alert(risposta);
                }
            },
            error: function (error, status, xhr) {
                alert(error.status + " : " + error.responseText);
                if(error.status ==  '401')
                    window.location.href = "/home";
            },
        });

    } else {
        alert("form is invalid");
    }

}

//#endregion

//#region GESTIONE sezioneUpdate VIEW
function caricaUpdate() {
    $("#content").load('../dashboard-segreteria/sezioneUpdate.html', function () {
        attivaValidator();
    });
}

function updateNegozio() { 
    if ($('#formNegozio').valid()) {
        let vet = {};
        $("#formNegozio :input").each(function(){
            var input = $(this); 
            let attribute = input[0].id;
            vet[attribute.slice(8,attribute.length-4)] = input[0].value;
        });

        console.log(JSON.stringify(vet));

        $.ajax({
            type: "POST",
            url: "/negozioUpdate",
            data: vet,
            success: function (risposta, status, xhr) {
                if (xhr.status == 200) {
                    alert(risposta);
                }
            },
            error: function (error, status, xhr) {
                alert(error.status + " : " + error.responseText);
                if(error.status ==  '401')
                    window.location.href = "/home";
            },
        });
    }
}

function updatePersona() { 
    if ($('#formPersona').valid()) {
        let vet = {};
        $("#formPersona :input").each(function(){
            var input = $(this); // This is the jquery object of the input, do what you will  id e value
                vet[input[0].id] = input[0].value;
        });

        console.log(JSON.stringify(vet));

        $.ajax({
            type: "POST",
            url: "/personaUpdate",
            data: vet,
            success: function (risposta, status, xhr) {
                if (xhr.status == 200) {
                    alert(risposta);
                }
            },
            error: function (error, status, xhr) {
                alert(error.status + " : " + error.responseText);
                if(error.status ==  '401')
                    window.location.href = "/home";
            },
        });
    }
}

//#endregion

//#region GESTIONE sezioneElimina VIEW

function caricaElimina() {
    $("#content").load('../dashboard-segreteria/sezioneElimina.html', function () {
        attivaValidator();
    });
}

function deleteNegozio() { 
    if ($('#formNegozio').valid()) {
        let vet = {};
        $("#formNegozio :input").each(function(){
            var input = $(this); 
            let attribute = input[0].id;
            vet[attribute.slice(8,attribute.length-4)] = input[0].value;
        });

        console.log(JSON.stringify(vet));

        $.ajax({
            type: "DELETE",
            url: "/negozioDelete",
            data: vet,
            success: function (risposta, status, xhr) {
                if (xhr.status == 200) {
                    alert(risposta);
                }
            },
            error: function (error, status, xhr) {
                alert(error.status + " : " + error.responseText);
                if(error.status ==  '401')
                    window.location.href = "/home";
            },
        });
    }
}

function deletePersona() { 
    if ($('#formPersona').valid()) {
        let vet = {};
        $("#formPersona :input").each(function(){
            var input = $(this); // This is the jquery object of the input, do what you will  id e value
                vet[input[0].id] = input[0].value;
        });

        console.log(JSON.stringify(vet));

        $.ajax({
            type: "DELETE",
            url: "/personaDelete",
            data: vet,
            success: function (risposta, status, xhr) {
                if (xhr.status == 200) {
                    alert(risposta);
                }
            },
            error: function (error, status, xhr) {
                alert(error.status + " : " + error.responseText);
                if(error.status ==  '401')
                    window.location.href = "/home";
            },
        });
    }
}

//#endregion
