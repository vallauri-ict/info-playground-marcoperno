const PORT = 1337;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
var session = require("express-session"); //npm install express-session
let serv = require("servizi3");



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


app.get('/checkAuthenticated', checkAuthenticated, function (req, res) {
    res.writeHead(200);
    res.write(req.session.tipo);
    res.end();
});

app.put('/prenotazione/:prenotazione', checkAuthenticated, function (req, res) {
    if(req.session.tipo == 'segreteria')
    {
        //serv.prenotazioneUpdate(req, res);
        res.write("ok");
        res.end();
    }
    else
    {
        res.writeHead(401);
        res.end();
    }
});

app.post('/login', checkNotAuthenticated, function (req, res) {
    console.log('login');
    serv.login(req, res);
});

app.post('/prenotazioneIndex', checkAuthenticated, function(req, res){
    if(req.session.tipo == 'segreteria')
    {
        serv.prenotazioneIndex(req, res);
    }
    else
    {
        res.writeHead(401);
        res.end();
    }
})

app.post('/logout', checkAuthenticated, function (req, res) {
    serv.logout(req, res);
});

/*function checkAuthenticated(req, res, next) {
    if(req.user != undefined)
    {
        if(req.session.email)
        {
            next();
        }
        else
        {
            res.writeHead(401);
            res.end();
        }
    }
    else
    {
        res.writeHead(401);
        res.end(); 
    }
    
}*/


function checkAuthenticated(req, res, next) {
    if (req.session.email) {
        next();
    }
    else
    {
        res.writeHead(401);
        res.end(); 
    }
}

function checkNotAuthenticated(req, res, next) {
    if (req.session.email) {
        res.writeHead(200);
        res.end(); 
    }
    else
    {
        next();
    }
}

/*function checkResources(req, res, next) {
    if(req.url=="/dashboard/" || req.url=="/dashboard/index.html")
    {
        checkAuthenticated(req, res, next);
    }
    next();
}*/

