
function login(){
    $.ajax({
        url:"http://localhost:1337/login",
        data: {nome : "marco", password : "password"},
        type:"POST",
        success:function(risposta, status){
            alert(risposta);
        },
        error: function(errore){
            alert("Errore del server");
        }
    });
}

function logout(){
    $.ajax({
        url:"http://localhost:1337/logout",
        data: {nome : "marco"},
        type:"POST",
        success:function(risposta, status){
            alert(risposta);
        },
        error: function(errore){
            alert("Errore del server");
        }
    });
}