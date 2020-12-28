const PORT = 1337;
const express = require("express");
const app = express();
var session = require("express-session"); //npm install express-session

app.listen(PORT, function () {
    console.log("Server in ascolto sulla porta " + PORT.toString().yellow);
});

//richiamata solo alla prima richiesta viene creata la session
app.use(session({
    secret: "myKeyword", //chiave per crittografare il cookie
    name: "sessionId",
    // propriet� legate allo Store
    resave: false, //forza il salvataggio della session anche 
                   //se non viene modificata da ulteriori richieste
    saveUninitialized: false, //forza il salvataggio anche di session 
                              //nuove o non inizializzate 
    cookie: {
        secure: false,// true per accessi https
        maxAge: 60000 // durata in msec
    }
}));

app.get('/', function (req, res) {
    if (req.session.page_views) { //page_views esiste, quindi ho gi� visitato
                                  //la pagina altre volte
        req.session.page_views++;
        res.send("You visited this page " + req.session.page_views + " times");
    } else { //� la prima volta che visito la pagina (la session � appena stata creata)
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    }
});
