let url = require("url"); 


//1) COME CREARE UN OGGETTO IN JAVASCRIPT
let oggetto = new Object();
oggetto.nome="Daniele";

//2) Crearlo mediante una funzione
//NON è un oggetto ma una classe
function Dispatcher(){
    //Semplice proprietà della classe di nome prompt
    this.prompt= "Dispatcher >> ";

    //Vettore associativo che conterrà tutte le risorse 
    //disponibili e per ognuna la callback che la gestisce.
    //this.list[metodo][risorsa]
    this.list = {"GET": [], "POST":[]};

    this.aggiungiAssociazione = function(metodo, risorsa, callback){
        // GET della risorsa '/servizio1' function(){....}
        //list["GET"]["/servizio1"] = function(){....}
        this.list[metodo.toUpperCase()][risorsa] = callback;
    }

    this.stampaLista = function(){
        console.log(this.prompt +"Stampo l'insieme dei servizi e risorse disponibili");
        for(metodo in this.list){
            console.log(this.prompt + "Il metodo: " +metodo);
            for(servizio in this.list[metodo]){
                console.log(this.prompt + "Servizio:"+ servizio);
            }
        }
    }

    this.dispatch = function(request, response){
        let parseUrl = url.parse(request.url, true);
        let metodo = request.method;
        let servizio = parseUrl.pathname;
        console.log(this.prompt + "E' arrivata una richiesta "+ metodo + " sulla risorsa " + servizio);
        
        if(typeof this.list[metodo][servizio] !== "undefined"){
            //Esiste l'associazione tra servizio e callback
            this.list[metodo][servizio](request, response);
        }else{
            //METODO 2 per la gestione delle pagine
            //Per come è scritto questo codice inizialmente pensato per i file css e js
            //è possibile gestire anche le pagine interne alla cartella html

            //Risorsa statica
            let path = require("path");
            let fs = require("fs");
            let estensione = path.extname(servizio).substring(1);
            fs.readFile("Sito/"+estensione+servizio, function(errore, file){
                if(!errore){
                    //Non c'è errore -> il file è stato letto
                    response.writeHead(200, {"Content-Type":"text/"+estensione});
                    console.log("Lettura terminata del file: " + servizio);
                    response.write(file);
                    response.end();
                }else{
                    //C'è errore
                    console.log("Errore nel servire la richiesta");
                    _inviaRisposta(response, -1, "Servizio/Risorsa non disponibile");
                }
            });
        }
    }
}

function _inviaRisposta(res, codice, desc){
    let risposta = new Object();
    risposta.code = codice;
    risposta.desc = desc;
    //Preparo e spedisco la risposta al client
    res.writeHead(200, {"Content-type":"text/json"});
    res.write(JSON.stringify(risposta));
    res.end();
}

//esportare la classe Dispatcher nel modulo
module.exports = Dispatcher;

module.exports.inviaRisposta = _inviaRisposta;