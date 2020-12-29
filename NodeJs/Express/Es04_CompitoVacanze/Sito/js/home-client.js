$(document).ready(function () {
    checkAuthenticated();
});

function checkAuthenticated() {
    $.ajax({
        type: "GET",
        url: "/checkAuthenticated",
        data: {},
        success: function (risposta, status, xhr) {
            if(xhr.status == 200)
                if(risposta.tipo=="segreteria")
                    window.location.href="/dashboard-segreteria/";
                else
                    window.location.href="/dashboard-volontario/";
        },
        error: function(error, status, xhr)
        {
            alert(error.status+" : "+ xhr);
        },
    });
}

function login(){
    $.ajax({
        type: "POST",
        url: "/login",
        data: {email : $("#email").val(), pwd : $("#pwd").val()},
        success: function (risposta, status, xhr) {
            if(xhr.status == 200)
                if(risposta.tipo=="segreteria")
                    window.location.href="/dashboard-segreteria/";
                else
                    window.location.href="/dashboard-volontario/";
        },
        error: function(error, status, xhr)
        {
            alert(error.status+" : "+ error.responseText);
        }
    });
}
