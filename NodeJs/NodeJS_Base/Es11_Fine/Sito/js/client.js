function verificaLogin()
{
    let username = localStorage.getItem("usernameGlobale");
    $.ajax({
        url:"http://192.168.1.9:1337/verificaLogin",
        data: {Username : username},
        type:"POST",
        success:function(risposta, status){
            if(risposta.code=="1")
            {
                window.location.replace("http:///192.168.1.9:1337/gestione.html");
            }
            
            alert(risposta.desc);
        },
        error: function(errore){
            alert("Errore del server");
        }
    });
}


function login(){
    let username = $("#username").val();
    let password = $("#password").val();
    $.ajax({
        url:"http:///192.168.1.9:1337/login",
        data: {Username : username, password : password},
        type:"POST",
        success:function(risposta, status){
            //var x = JSON.parse(risposta);
            alert(risposta.desc);
            if(risposta.code=="1")
            {
                localStorage.setItem("usernameGlobale", username);
                window.location.replace("gestione.html");
                //$("#login").prop("disabled",true)
                //$("#logout").prop("disabled",false)
            }
            
            
        },
        error: function(errore){
            alert("Errore del server");

        }
    });
}

function logout(){
    let username = localStorage.getItem("usernameGlobale");
    $.ajax({
        url:"http:///192.168.1.9:1337/logout",
        data: {Username : username},
        type:"POST",
        success:function(risposta, status){
            if(risposta.code=="1")
            {
                localStorage.setItem("usernameGlobale", "");
                window.location.replace("http:///192.168.1.9:1337/login.html");
            }
            
            alert(risposta.desc);
        },
        error: function(errore){
            alert("Errore del server");
        }
    });
}

function getNomeCognome() {
    let username =  localStorage.getItem("usernameGlobale");
    $.ajax({
        url:"http:///192.168.1.9:1337/getNomeCognome",
        data: {Username : username},
        type:"get",
        success:function(risposta, status){
            alert(risposta.desc);
            let x = JSON.parse(risposta.desc)
            $("#nome").val(x.Nome);
            $("#cognome").val(x.Cognome);
        },
        error: function(errore){
            alert("Errore del server");
        }
    });
}

function cambiaPassword() {
    let nuovaPassword = $("#nuovaPasswordText").val();
    let username = localStorage.getItem("usernameGlobale");
    $.ajax({
        url:"http:///192.168.1.9:1337/nuovaPassword",
        data: {Username : username, NuovaPassword : nuovaPassword},
        type:"POST",
        success:function(risposta, status){
            if(risposta.code=="1")
            {
                alert("OK: "+risposta.desc);
            }
            else
            {
                alert("NO: "+risposta.desc);
            }
        },
        error: function(errore){
            alert("Errore del server");
        }
    });
}

