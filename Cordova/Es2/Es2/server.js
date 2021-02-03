const PORT = 3000;
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
var session = require("express-session"); //npm install express-session

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

//app.use(allowCrossDomain);

app.use(session({
    secret: "myKeyword", //chiave per crittografare il cookie
    name: "sessionId",
    
    // proprietà legate allo Store
    resave: false, //forza il salvataggio della session anche se non viene modificata da ulteriori richieste
    saveUninitialized: false, //forza il salvataggio anche di session nuove o non inizializzate 
    cookie: {
        secure: false,// true per accessi https
        maxAge: 360000, // durata in msec
        path : '/',
        sameSite : true
    }
}));

app.listen(PORT, function () {
    console.log("Server in ascolto sulla porta " + PORT.toString());
});

//risorse statiche
app.use("/",  express.static("./www"));
app.get('/', )

//necessario per poter leggere parametri POST
app.use("/", bodyParser.json());
app.use("/", bodyParser.urlencoded({ "extended": true }));

app.get("/chiamata", function(req, res) {
    console.log("Sono qui")
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.send("CIapaaa");
})