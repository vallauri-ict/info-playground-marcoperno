$(document).ready(function () {
    checkAuthenticated();
});

function checkAuthenticated() {
    $.ajax({
        type: "GET",
        url: "http://localhost:1337/checkAuthenticated",
        data: {},
        success: function (risposta, status, xhr) {
            if(xhr.status == 200)
                if(risposta=="segreteria")
                    window.location.href="http://localhost:1337/dashboard-segreteria/";
                else
                    window.location.href="http://localhost:1337/dashboard-volontario/";
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
        url: "http://localhost:1337/login",
        data: {email : $("#email").val(), pwd : $("#pwd").val()},
        success: function (risposta, status, xhr) {
            if(xhr.status == 200)
                if(risposta=="segreteria")
                    window.location.href="http://localhost:1337/dashboard-segreteria/";
                else
                    window.location.href="http://localhost:1337/dashboard-volontario/";
        },
        error: function(error, status, xhr)
        {
            alert(error.status+" : "+ error.responseText);
        }
    });
}
