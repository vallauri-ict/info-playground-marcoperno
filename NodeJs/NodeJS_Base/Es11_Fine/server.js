let smistatore = require("./dispatcher");
let servizi = require("./servizi");
let http = require("http");
let risorse = require("./risorse");

//Istanzio la classe Dispatcher e associo servizi - callback 
let disp = new smistatore();
//Associando risorsa/servizio alla callback (funzione che gestisce il servizio/risorsa)
disp.aggiungiAssociazione("get","/servizio1", servizi.servizio1);
disp.aggiungiAssociazione("POST","/servizio2", servizi.servizio2);
disp.aggiungiAssociazione("GET","/servizio3", servizi.servizio3);
disp.aggiungiAssociazione("POST","/login", servizi.login);
disp.aggiungiAssociazione("POST","/logout", servizi.logout);
disp.aggiungiAssociazione("GET","/", risorse.invioLoginHtml);
disp.aggiungiAssociazione("GET","/getNomeCognome", servizi.getNomeCognome);
disp.aggiungiAssociazione("POST","/nuovaPassword", servizi.nuovaPassword);
disp.aggiungiAssociazione("POST","/verificaLogin", servizi.verificaLogin);

disp.stampaLista();

console.log(disp.list);

//CREO IL SERVER HTTP IN ASCOLTO
let server = http.createServer(gestioneRichieste);
server.listen(1337);
console.log("Sono in ascolto sulla porta 1337");

function gestioneRichieste(request, response){
    disp.dispatch(request, response);
}


