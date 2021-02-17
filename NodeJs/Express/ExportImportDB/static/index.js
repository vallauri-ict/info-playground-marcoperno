$(document).ready(function () {
    $("#btnEsportaDB").on("click", function () {
        let database = $("#txtDBsorgente").val();
        inviaRichiesta("/esportaDB", "POST", { db: database }, success, error);
    });
    $("#btnImportaDB").on("click", function () {
        let databaseS = $("#txtDBsorgente").val();
        let databaseD = $("#txtDBdestinazione").val();
        inviaRichiesta("/importaDB", "POST", { dbs: databaseS, dbd: databaseD }, success, error);
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
    //alert(data);
    alert(JSON.stringify(data));
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