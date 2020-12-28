let http = require("http");
let url = require("url");

let resp;

//Modulo che ha l'obiettivo di far interfacciare il 
//nostro server con il file system della macchina su cui gira il server
let fs = require("fs");

let server = http.createServer(gestisciRichieste);

server.listen(1337);

console.log("Il server è in attesa di richieste sulla porta 1337");

function gestisciRichieste(request, response){
    resp=response;
    /*let testoPagina = ""; 
    testoPagina += "url: " + request.url+"<br>";
    testoPagina += "indirizzo completo: " + request.headers.host + request.url+"<br>";
    testoPagina += "metodo: " + request.method + "<br>";
    var indirizzo = request.headers.host + request.url;
    var info = url.parse(indirizzo, true);
    
    testoPagina += "host: " + info.host + "<br>";
    testoPagina += "pathname: " + info.pathname + "<br>";
    testoPagina += "parametri: " + info.search + "<br>";

    var parametri = info.query;
    testoPagina += "parametro1: " + parametri.param + "<br>";
    testoPagina += "parametro2: " + parametri.param2 + "<br>";*/

    var header = {"Content-Type":"text/html"};
    response.writeHead(200, header);
    
    fs.readFile("Sito/index.html", analizzaFile);

    console.log("Il SO sta leggendo il file");
}

//Questa funzione viene richiamata solo quando la lettura è terminata
function analizzaFile(err, file){
    console.log("Ho terminato la lettura del file");
    resp.write(file);
    resp.end();
}
