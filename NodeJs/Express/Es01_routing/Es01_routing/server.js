const PORT = 1337;
const headerHTML = { "Content-Type": 'text/html;charset=utf-8' };
const headerTXT = { "Content-Type": 'text/plain;charset=utf-8' };
const headerJSON = { "Content-Type": 'application/json' };

const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();

app.listen(PORT, function () {
    console.log("Server in ascolto sulla porta " + PORT.toString());
});
//necessario per poter leggere parametri POST
app.use("/", bodyParser.json());
app.use("/", bodyParser.urlencoded({ "extended": true }));
//gestione risorse statiche
app.use("/", express.static("./static"));
//app.use("/img", express.static("./static/img"));
//app.use("/html", express.static("./static/html"));

//gestione richieste risorse con "/" le gestisce tutte
app.use("/", function (req, res, next) {
    //viene sempre eseguita e col next passa alla route successiva middleware
    console.log("app.use('/'...) sempre eseguita -----> "
        + req.method + " : " + req.originalUrl);
    next(); //se specificato continua la ricerca di altre route che soddisfano la richiesta in questo caso per provare anche app.get/app.put...
});
app.use("/", function (request, response, next) {
    console.log("app.use Richiesta: "
        + request.method + " - " + request.originalUrl);
    if (Object.keys(request.query).length > 0) { //GET
        console.log("app.use - Parametri QUERY: "
            + JSON.stringify(request.query));
    }
    if (Object.keys(request.body).length > 0) { //POST
        console.log("app.use - Parametri BODY: "
            + JSON.stringify(request.body));
    }
    next(); //se specificato continua la ricerca di altre route che soddisfano la richiesta in questo caso per provare anche app.get/app.put...
});


//app.get


//gestione risorse non trovate (se non la gestisco viene inviato errore in automatico)
//nel caso nessuna route sia stata eseguita 
//ATTENZIONE se ho del middleware(next) prima la esegue lo stesso provare a mettere next
//in app.get
app.use("/", function (request, response, next) {
    console.log("\nRisorsa non trovata".red);
    response.status(404);
    response.set(headerTXT);
    response.send('risorsa non trovata');
});

