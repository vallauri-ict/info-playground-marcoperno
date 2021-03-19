document.addEventListener('deviceready', onDeviceReady, false);
document.getElementById("btnServ1").addEventListener("click", richiesta1)

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

function richiesta1() {  
    $.ajax({
        type: "GET",
        url: "http://192.168.1.3:1337/servizio1",
        data: {},
        success: function (risposta, status, xhr) {
            alert(risposta)
        },
        error: function (error, status, xhr) {
            alert(JSON.stringify( error) + " "+ JSON.stringify(status))
        },
    });
}