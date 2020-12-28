let http = require("http");
let url = require("url");
let fs = require("fs");
let path = require("path");
let session = [];

let server = http.createServer(gestisciRichieste);

server.listen(1337);

console.log("Il server è in attesa di richieste sulla porta 1337");

function gestisciRichieste(request, response){

    var indirizzo = request.headers.host + request.url;
    let info = url.parse(indirizzo, true);
    console.log(request.url);

    

    let risorsa = info.pathname;
    switch(risorsa)
    {
        case "/":
            response.writeHead(200, {"Content-Type":"text/html"});
            
            fs.readFile("Sito/index.html", function (err, file){
                console.log("Ho terminato la lettura del file");
                response.write(file);
                response.end();
            });

            console.log("Il SO sta leggendo il file ");
        break;
        
        case "/servizio1":
            var parametri =  info.query;
            response.writeHead(200, {"Content-Type":"text/plain"});
            let datiPacchetto=[];
            request.on('data', function(dato){
                datiPacchetto+=dato;
            })

            request.on("end", function(){
                console.log(datiPacchetto);
                console.log("contatto corretto");
                response.write("contatto corretto");
                
                response.end();
            });
           
        break;

        default:
            var estensione = path.extname(risorsa).substring(1);
            
            fs.readFile("Sito/"+ estensione + risorsa , function (err, file){
                if(!err)
                {
                    response.writeHead(200, {"Content-Type":"text/"+estensione});
                    console.log("Ho terminato la lettura del file");
                    response.write(file);
                }
                else
                {
                    response.writeHead(200, {"Content-Type":"text/plain"});
                    console.log("File non esistente");
                    response.write("Sito/"+ estensione + risorsa);
                }

             response.end();
            });
                

    }



    
}





