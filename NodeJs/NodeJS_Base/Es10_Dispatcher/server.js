let http = require("http");
let url = require("url");
let fs = require("fs");
let path = require("path");
let serv = require("servizi");
let risorse = require("risorse");
let smistatore = require("./dispatcher");

let disp = new smistatore.Dispatcher();

disp.aggiungiAssociazione("GET", "/servizio1", function(){
    console.log("servizio1");
});

disp.aggiungiAssociazione("POST", "/servizio2", function(){
    console.log("servizio2");
});

disp.stampaLista();

let server = http.createServer(gestisciRichieste);

server.listen(1337);

console.log("Il server è in attesa di richieste sulla porta 1337");

function gestisciRichieste(request, response){

    disp.dispatch(request, response);
    /*let info = url.parse(request.headers.host + request.url, true);
    console.log(request.url);

    let risorsa = info.pathname;
    switch(risorsa){
        //Gestisco le pagine 
        case "/":
            response.writeHead(200, {"Content-Type":"text/html"});
            fs.readFile("Sito/index.html", function (err, file){
                console.log("Ho terminato la lettura del file");
                response.write(file);
                response.end();
            });
            console.log("Il SO sta leggendo il file");
            break;

        //GESTIONE DEI SERVIZI
        case "/servizio1":
            //Funzione anonima
            serv(info, response);
            break;
        case "/servizio2":
            serv.servizio2(request, response, url);
            break;
       
        
            

        //Le risorse relative alle pagine (js, css) o eventuali errori
        default:
            risorse.invioCSS_JS(path, risorsa, fs, response);
    }*/
}
