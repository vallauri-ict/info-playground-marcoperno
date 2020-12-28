let url = require("url"); 

function Dispatcher(){
    this.prompt= "Dispatcher >> ";

    this.list = {"GET": [], "POST":[]};

    this.aggiungiAssociazione = function(metodo, risorsa, callback){
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

module.exports = Dispatcher;

module.exports.inviaRisposta = _inviaRisposta;