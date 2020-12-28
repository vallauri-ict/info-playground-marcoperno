let http = require('http');
let url = require("url");
let fs = require("fs");
//
let mysql = require('mysql');
//
let server = http.createServer(gestisciRichieste);

server.listen(1337);

console.log("Il server è in attesa di richieste sulla porta 1337");

function gestisciRichieste(request, response) {
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "squola"
    });
    let info = url.parse(request.headers.host + request.url, true);
    let risorsa = info.pathname;
    switch (risorsa) {
        //Gestisco le pagine 
        case "/":
            response.writeHead(200, { "Content-Type": "text/html" });
            fs.readFile("Sito/index.html", function (err, file) {
                console.log("Ho terminato la lettura del file");
                response.write(file);
                response.end();
            });
            console.log("Il SO sta leggendo il file");
            break;
        //GESTIONE DEI SERVIZI
        case "/icona.png":
            response.writeHead(200, { "Content-Type": "text/png" });
            //Lettura sincrona di un file
            response.write(fs.readFileSync("icona.png"));
            response.end();
            break;

        case "/alunni": //POST
            let datiPacchetto = "";
            request.on('data', function (dato) {
                datiPacchetto += dato;
            });
            request.on('end', function () {
                console.log("dati finale POST: " + datiPacchetto);
                //
                con.connect(function (err) {
                    if (err)
                        console.log(err);
                    else
                        con.query("SELECT * FROM alunni", function (err, result, fields) {
                            if (err)
                                console.log(err);
                            else {
                                console.log(result);
                                console.log("Record[0]: " + JSON.stringify(result[0]));
                                console.log("Record[1].Cognome: " + result[1].Cognome);
                                //se lo faccio fuori da connect fa prima response.end ed esce
                                response.writeHead(200, { "Content-Type": "text/json" });
                                response.write(JSON.stringify(result));
                                response.end();
                            }
                        });
                });
            });
            break;
        //eventuali errori
        default:
            var estensione = path.extname(risorsa).substring(1);
            console.log("Sito/" + estensione + risorsa);
            //Composizione dinamica di un indirizzo/path del file system del server
            fs.readFile("Sito/" + estensione + risorsa, function (errore, file) {
                if (!errore) {
                    //Scrittura dinamica di una header
                    response.writeHead(200, { "Content-Type": "text/" + estensione });
                    console.log("Ho terminato la lettura del file: " + risorsa);
                    response.write(file);
                } else {
                    response.writeHead(200, { "Content-Type": "text/plain" });
                    console.log("File non esistente");
                    response.write("File non esistente");
                }
                response.end();
            });
    };
}



