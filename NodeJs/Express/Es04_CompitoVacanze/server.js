const PORT = 3000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
var session = require("express-session"); //npm install express-session
let serv = require("./node_modules_mine/servizi3");



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
    res.writeHead(200, { "Content-Type": "application/json" });
    let vet = {};
    vet.id = req.session.persona_id,
    vet.tipo = req.session.tipo
    res.write(JSON.stringify( vet));
    res.end();
});

app.put('/prenotazioneUpdate', checkAuthenticated, function (req, res) {
    //serv.prenotazioneUpdate(req, res);
    if(req.session.tipo == 'segreteria' || req.session.tipo == 'volontario')
    {
        serv.prenotazioneUpdate(req, res);
    }
    else
    {
        res.writeHead(401);
        res.end();
    }
});

app.post('/prenotazioneStore', function (req, res) {
    //serv.prenotazioneStore(req, res);
    if(req.session.tipo == 'segreteria')
    {
        serv.prenotazioneStore(req, res);
    }
    else
    {
        res.writeHead(401);
        res.end();
    }
});

app.delete('/prenotazioneDelete', checkAuthenticated, function (req, res) {
    if(req.session.tipo == 'segreteria')
    {
        serv.prenotazioneDestroy(req, res);
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
});

app.post('/prenotazioneShow', checkAuthenticated, function(req, res){///da fare
    if(req.session.tipo == 'volontario')
    {
        serv.prenotazioneShow(req, res);
    }
    else
    {
        res.writeHead(401);
        res.end();
    }
});

app.post('/personaStore', checkAuthenticated, function(req, res){
    //serv.personaStore(req, res);
    if(req.session.tipo == 'segreteria')
    {
        serv.personaStore(req, res);
    }
    else
    {
        res.writeHead(401);
        res.end();
    }
});

app.post('/negozioStore', checkAuthenticated, function(req, res){
    //serv.negozioStore(req, res);
    if(req.session.tipo == 'segreteria')
    {
        serv.negozioStore(req, res);
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
        res.write("Sessione scaduta");
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

