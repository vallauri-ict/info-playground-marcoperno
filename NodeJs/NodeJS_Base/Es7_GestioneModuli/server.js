let http = require("http");
let url = require("url");
let fs = require("fs");
let path = require("path");
let serv = require("servizi");
let risorse = require("risorse");

let server = http.createServer(gestisciRichieste);

server.listen(1337);

console.log("Il server è in attesa di richieste sulla porta 1337");

function gestisciRichieste(request, response){

    //DATI RELATIVI ALL'INTESTAZIONE DELLA RICHIESTA
    //Divide la url in sottoparti con una certa logica (host, pathname/risorsa, parametri)
    let info = url.parse(request.headers.host + request.url, true);
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
        case "/servizio3":
            serv.servizio3(request, response, url);
            break;
        
            

        //Le risorse relative alle pagine (js, css) o eventuali errori
        default:
            risorse.invioCSS_JS(path, risorsa, fs, response);
    }
}
