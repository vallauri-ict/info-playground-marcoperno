
function login(){
    $.ajax({
        type: "GET",
        url: "http://localhost:1337/login",
        data: {nome : "prova", password : "password"},
        success: function (risposta, status) {
            alert(risposta);
        },
        error: function(error)
        {
            alert("ERR");
        }
    });
}
function logout(){
    $.ajax({
        type: "GET",
        url: "http://localhost:1337/logout",
        data: {nome : "prova"},
        success: function (risposta, status) {
            alert(risposta);
        },
        error: function(error)
        {
            alert("ERR");
        }
    });
}