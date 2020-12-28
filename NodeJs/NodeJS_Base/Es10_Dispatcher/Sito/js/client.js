alert("Benvenuto!");

function inviaRichiesta(){
    $.ajax({
        url:"http://localhost:1337/servizio1",
        type:"GET",
        data:{param:"prova"},
        success:function(risposta, status){
            alert(risposta);
        },
        error: function(errore){
            alert("Errore del server");
        }
    });
}

function inviaRichiesta2(){
    $.ajax({
        url:"http://localhost:1337/servizio2",
        type:"GET",
        success:function(risposta, status){
            alert(risposta);
        },
        error: function(errore){
            alert("Errore del server");
        }
    });
}
function inviaRichiesta3(){
    $.ajax({
        url:"http://localhost:1337/servizio3",
        type:"GET",
        success:function(risposta, status){
            alert(risposta);
        },
        error: function(errore){
            alert("Errore del server");
        }
    });
}