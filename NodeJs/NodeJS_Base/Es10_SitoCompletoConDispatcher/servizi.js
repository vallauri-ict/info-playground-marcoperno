let disp = require("./dispatcher");
let fs = require("fs");

function _servizio1(req, res){
    console.log("Sono servizio 1");
    //Creo un oggetto javascript contenente la risposta del server
    disp.inviaRisposta(res, 1, "Servizio 1 intercettato");
}

function _servizio2(req, res){
    console.log("Sono servizio 2");
    //Creo un oggetto javascript contenente la risposta del server
    disp.inviaRisposta(res, 1, "Servizio 2 intercettato");
}

function _servizio3(req, res){
    console.log("Sono servizio 3");
    //Creo un oggetto javascript contenente la risposta del server
    disp.inviaRisposta(res, 1, "Servizio 3 intercettato");
}

//METODO 1: Pagina html gestita come un servizio 
//La pagina viene ritornata solo quando richiamo quel servizio
//(Nel caso della pagina index la cui risorsa corrisponde ad / diventa comoda gestirla qua,
// un modo alternativo ma ritengo meno leggibile sarebbe usare una if nella funzione
// dispatch nel modulo dispatcher )
function _risorsaIndex(req, res){
    console.log("Richiesta la pagina Index");
    res.writeHead(200, {"Content-Type":"text/html"});
    res.write(leggiFile("index.html"));
    res.end();
    console.log("Risposta inviata");
}

function leggiFile(path){
    return fs.readFileSync("Sito/"+ path);
}

module.exports.servizio1 = _servizio1;
module.exports.servizio2 = _servizio2;
module.exports.servizio3 = _servizio3;

module.exports.risorsaIndex = _risorsaIndex;

