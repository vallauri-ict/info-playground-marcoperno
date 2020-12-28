
function login(){
    $.ajax({
        url:"http://localhost:1337/login",
        data: {nome : "marcos", password : "password"},
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
        data: {nome : "marcos"},
        type:"POST",
        success:function(risposta, status){
            alert(risposta);
        },
        error: function(errore){
            alert("Errore del server");
        }
    });
}