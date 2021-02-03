const PORT = 3000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
var session = require("express-session"); //npm install express-session
let serv = require("./node_modules_mine/servizi3");

app.set('views',  './Sito');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.listen(PORT, function () {
    console.log("Server in ascolto sulla porta " + PORT.toString());
});

//risorse statiche
app.use("/",  express.static("./Sito"));

//necessario per poter leggere parametri POST
app.use("/", bodyParser.json());
app.use("/", bodyParser.urlencoded({ "extended": true }));
app.use(cookieParser());

//richiamata solo alla prima richiesta viene creata la session
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




app.post('/login', checkNotAuthenticated, function (req, res) {
    console.log('login');
    serv.login(req, res);
});
app.get('/borsaView', function (req, res) {
    res.render("borsa.html")
});

app.get('/getTitoli', function (req, res) {
    serv.getTitoli(req, res);
});
app.get('/infoTitolo', function (req, res) {
    serv.infoTitolo(req, res);
});

app.post('/logout', checkAuthenticated, function (req, res) {
    serv.logout(req, res);
});
app.post('/compra', checkAuthenticated,  function (req, res) {
    serv.compra(req, res);
});

app.get('/login', function (req, res) {
    res.render("login.html")
});

function checkAuthenticated(req, res, next) {
    if (req.session._id) {
        next();
    }
    else
    {
        res.writeHead(401);
        res.end(); 
    }
}

function checkNotAuthenticated(req, res, next) {
    if (req.session._id) {
        res.writeHead(400)
        res.write("Già autenticato")
        res.end(); 
    }
    else
    {
        next();
    }
}


