
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

function invia() {  
    $.ajax({
        url:"http://192.168.1.2:3000/chiamata",
        type:"GET",
        data:{},
        success:function(risposta, status){
            alert(risposta);
        },
        error: function(errore, status, xhr){
            alert(JSON.stringify( errore) + status+ xhr);
        }
    });
}
