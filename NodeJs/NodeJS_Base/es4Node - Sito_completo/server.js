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
    var info = url.parse(indirizzo, true);
    let risorsa = info.pathname;

    console.log(request.url);

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
            var parametri = info.query;
            response.writeHead(200, {"Content-Type":"text/plain"});
            if(parametri.param == "prova")
            {
                console.log("Servizio1 andato a buon fine");
                response.write("param corretto");
            }
            else
            {
                console.log("Servizio1 non andato a buon fine");
                response.write("param non corretto");
            }
            response.end();
        break;

        case "/login":
            var parametri = info.query;
            response.writeHead(200, {"Content-Type":"text/plain"});
            if(parametri.nome == "prova" && parametri.password == "password")
            {
                let trovato =false;
                let i=0;
                while(trovato == false && i != session.length)
                {
                    if(session[i].nome == parametri.nome)
                    {
                        trovato=true;
                    }
                    i++;
                    
                }
                if(trovato==false)
                {
                    session.push({"nome":parametri.nome});
                    console.log("Login andato a buon fine");
                    response.write("Login corretto");
                }
                else
                {
                    console.log("Login non andato a buon fine");
                    response.write("Login non corretto");
                }
                
            }
            else
            {
                console.log("Login non andato a buon fine");
                response.write("Login non corretto");
            }
            response.end();
        break;

        case "/logout":
            var parametri =  info.query;
            response.writeHead(200, {"Content-Type":"text/plain"});
            let trovato =false;
            let i=0;
            while(trovato == false && i != session.length)
            {
                if(session[i].nome == parametri.nome)
                {
                    trovato=true;
                }
                i++;
                
            }
            if(trovato==true)
            {
                //delete session[i-1];
                session.splice(i-1);
                console.log("logut andato a buon fine");
                response.write("logut corretto");
            }
            else
            {
                console.log("logut non andato a buon fine");
                response.write("logut non corretto");
            }
            response.end();
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

    
}

