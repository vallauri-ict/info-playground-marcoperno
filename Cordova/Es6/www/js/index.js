document.addEventListener('deviceready', onDeviceReady, false);
document.getElementById("linkPag2").addEventListener("click", function(){
    //Passo all'altra pagina attraverso href ma nel mentre intercetto anche il click per settare i parametri
    window.localStorage.setItem("var1", "Benvenuti");
    window.sessionStorage.setItem("var2", "Session");
});
document.getElementById("link2Pag2").addEventListener("click", function(){
    window.location="pag2.html";
});

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
}
