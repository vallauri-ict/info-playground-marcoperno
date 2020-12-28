
function login(){
    $.ajax({
        url:"http://localhost:1337/login",
        data: {nome : "marcos", password : "password"},
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
    $.ajax({
        url:"http://localhost:1337/logout",
        data: {nome : "marcos"},
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