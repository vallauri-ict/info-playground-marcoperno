document.addEventListener('deviceready', onDeviceReady, false);


function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

    document.getElementById("lblParam").innerHTML = window.localStorage.getItem("var1");
    document.getElementById("lblParam").innerHTML += " <br> Session: "+window.sessionStorage.getItem("var2");
}
