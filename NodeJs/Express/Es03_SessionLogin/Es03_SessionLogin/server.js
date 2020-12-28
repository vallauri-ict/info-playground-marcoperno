const PORT = 1337;
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
var session = require("express-session"); //npm install express-session

app.listen(PORT, function () {
    console.log("Server in ascolto sulla porta " + PORT.toString());
});

//risorse statiche
app.use("/", express.static("./static"));
//necessario per poter leggere parametri POST
app.use("/", bodyParser.json());
app.use("/", bodyParser.urlencoded({ "extended": true }));

//richiamata solo alla prima richiesta viene creata la session
app.use(session({
    secret: "myKeyword", //chiave per crittografare il cookie
    name: "sessionId",
    // proprietà legate allo Store
    resave: false, //forza il salvataggio della session anche se non viene modificata da ulteriori richieste
    saveUninitialized: false, //forza il salvataggio anche di session nuove o non inizializzate 
    cookie: {
        secure: false,// true per accessi https
        maxAge: 60000 // durata in msec
    }
}));

app.post('/login', function (req, res) {
    console.log(JSON.stringify(req.body));
    if (req.session.email) {
        res.json("Sei gia' autenticato " + req.session.email);
    }
    else {
        let record = req.body;//JSON.parse(req.body);
        let email = record.email;
        let pwd = record.pwd;
        req.session.email = email;
        res.json("Login Effettuato");
    }
});
app.post('/logout', function (req, res) {
    if (req.session.email) {
        req.session.destroy(function () {
            res.json('Logout eseguito');
        });
    }
    else {
        res.json("Non sei autenticato ");
    }
});
app.use('/pagRiservata', function (req, res) {
    if (req.session.email) {
        res.json("OK sei autorizzato a vedere la pagina " + req.session.email);
    }
    else {
        res.json("Non sei autorizzato a vedere la pagina");
    }
});
