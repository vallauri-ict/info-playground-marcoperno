
function login(){
    let username = $("#username").val();
    let password = $("#password").val();
    $.ajax({
        url:"http://localhost:1337/login",
        data: {Username : username, password : password},
        type:"POST",
        success:function(risposta, status){
            //var x = JSON.parse(risposta);
            if(risposta.code=="1")
            {
                $("#login").prop("disabled",true)
                $("#logout").prop("disabled",false)
                
            }
            alert(risposta.desc);
            
        },
        error: function(errore){
            alert("Errore del server");

        }
    });
}

function logout(){
    let username = $("#username").val();
    $.ajax({
        url:"http://localhost:1337/logout",
        data: {Username : username},
        type:"POST",
        success:function(risposta, status){
            if(risposta.code=="1")
            {
                $("#login").prop("disabled",false)
                $("#logout").prop("disabled",true)
            }
            
            alert(risposta.desc);
        },
        error: function(errore){
            alert("Errore del server");
        }
    });
}

function getNomeCognome() {
    let username = $("#username").val();
    $.ajax({
        url:"http://localhost:1337/getNomeCognome",
        data: {Username : username},
        type:"get",
        success:function(risposta, status){
            alert(risposta.desc);
        },
        error: function(errore){
            alert("Errore del server");
        }
    });
}

function nuovaPassword() {
    let nuovaPassword = $("#nuovaPassword").val();
    let username = $("#username").val();
    $.ajax({
        url:"http://localhost:1337/nuovaPassword",
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