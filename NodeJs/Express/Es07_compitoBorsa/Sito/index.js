
function login() {  
    $.ajax({
        type: "POST",
        url: "/login",
        data: {email:$("#txtEmail").val(), password:$("#txtPassword").val()},
        success: function (risposta, status, xhr) {
            if (xhr.status == 200) {
                alert("login avvenuto con successo");
                //window.location.href = "./borsa.html";
                window.location = "/borsaView"
            }

        },
        error: function (error, status, xhr) {
            alert(error.status + " : " + error.responseText);
        }
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
                window.location.href = "./borsa.html";
            }

        },
        error: function (error, status, xhr) {
            alert(error.status + " : " + error.responseText);
            if(error.status ==  '401')
                window.location.href = "./login";
        }
    });
}

function caricaTitoli() {
    $.ajax({
        type: "GET",
        url: "/getTitoli",
        data: {titolo:$("#txtTitolo").val()},
        success: function (json, status, xhr) {
            if (xhr.status == 200) {
                let table = $("#tableId");
                table.empty();
                let vet = JSON.parse(json)
                vet.forEach(function (item, index) {
                    let td =  $("<td></td>")
                    td.text(item);
                });
                for(let i = 0;i<vet.length; i++) {
                    let tr = $("<tr></tr>")
                    let th =  $("<th scope='col'></th>")
                    th.text(vet[i]._id);
                    let td =  $("<td></td>")
                    td.text(vet[i].titolo);
                    let td1 =  $("<td></td>")
                    td1.text(vet[i].ultimoContratto);
                    tr.append(th);
                    tr.append(td);
                    tr.append(td1);
                    aggiungiCercaAcquista(tr, vet[i]);
                    table.append(tr)
                }
            }

        },
        error: function (error, status, xhr) {
            alert(error.status + " : " + error.responseText);
            
        }
    });
}

function aggiungiCercaAcquista(tr, obj) {
    let td =  $("<td></td>")
    let img = $("<img style='width:25px' src='lente.jpg' >")
    td.click(function () {  
        $.ajax({
            type: "GET",
            url: "/infoTitolo",
            data: {_id: obj._id},
            success: function (risposta, status, xhr) {
                if (xhr.status == 200) {
                    
                    alert(risposta);
                }
    
            },
            error: function (error, status, xhr) {
                alert(error.status + " : " + error.responseText);
                if(error.status ==  '401')
                    window.location.href = "./login";
            }
        });
    })
    td.append(img)
    tr.append(td);
    let td1 =  $("<td></td>")
    let textbox = $("<input id='txtVolumi-"+obj._id+"' type='number'>")
    let btn = $("<button>Acquista</button>")
    btn.attr("id", "btn-"+obj._id);
    btn.click(function () { 
        $.ajax({
            type: "POST",
            url: "/compra",
            data: {_id: obj._id, volumi : $("#txtVolumi-"+obj._id).val()},
            success: function (risposta, status, xhr) {
                if (xhr.status == 200) {
                    
                    alert(risposta);
                    caricaTitoli();
                }
    
            },
            error: function (error, status, xhr) {
                if(error.status ==  '401') {
                    alert("Effettuare il login");
                    window.location = "./login";
                }
                else
                    alert(error.status + " : " + error.responseText);
            }
        });
    })
    td1.append(textbox);
    td1.append(btn);
    tr.append(td1)
}