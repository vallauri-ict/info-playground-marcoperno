$(document).ready(function () {
    let dati = ['{ "nome": "pluto", "eta": 15 }', '{ "nome": "pippo", "eta": 19 }', '{ "nome": "topolino", "eta": 22 }'];
    $("#btnGet").on("click", function () {
        inviaRichiesta("/risorsa", "GET", { "nome": "pluto", "eta": 15 }, success, error);
    });
    $("#btnPost").on("click", function () {
        inviaRichiesta("/risorsa", "POST", dati, success, error);
    });
    $("#btnPut").on("click", function () {
        inviaRichiesta("/risorsa", "PUT", dati, success, error);
    });
    $("#btnDelete").on("click", function () {
        inviaRichiesta("/risorsa", "DELETE", dati, success, error);
    });
    $("#btnNonValida").on("click", function () {
        inviaRichiesta("/nonvalida", "POST", dati, success, error); //va bene qualsiasi metodo (GET, POST, PUT, DELETE)
    });
});

function inviaRichiesta(url, method, parameters, success, error) {
    let contentType;
    if (method.toUpperCase() == "GET") {
        contentType = "application/x-www-form-urlencoded; charset=UTF-8"
    }
    else {
        contentType = "application/json; charset=utf-8";
        parameters = JSON.stringify(parameters);
    }
    $.ajax({
        url: url,
        contentType : contentType,
        type: method,
        data: parameters,
        dataType: "json",
        timeout: 3600,
        success: success,
        error: error
    });
}

function success(data) {
    alert(data);
}

function error(jqXHR, text_status, str_error) {
    if (jqXHR.status == 0)
        alert("Server Timeout, nessuna risposta dal server");
    else
        if (jqXHR.status == 401)
            window.location.href = "login.html"
        else
            alert("ERRORE RICEZIONE DATI\n" + jqXHR.status + "\n" + jqXHR.responseText + "\n\njqXHR : " + jqXHR + "\ntext_status : " + text_status + "\nstr_error : " + str_error);
}