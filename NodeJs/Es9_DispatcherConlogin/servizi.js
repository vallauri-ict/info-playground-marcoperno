let disp = require("./dispatcher");
let url = require("url");

function _servizio1(req, res){
    console.log("Sono servizio 1");
    //Creo un oggetto javascript contenente la risposta del server
    disp.inviaRisposta(res, 1, "Servizio 1 intercettato");
}

function _servizio2(req, res){
    console.log("Sono servizio 2");
    //Creo un oggetto javascript contenente la risposta del server
    disp.inviaRisposta(res, 1, "Servizio 2 intercettato");
}

function _servizio3(req, res){
    console.log("Sono servizio 3");
    //Creo un oggetto javascript contenente la risposta del server
    disp.inviaRisposta(res, 1, "Servizio 3 intercettato");
}

var qs = require('querystring');
let mysql = require('mysql');
let session = [];

function _login(request, response){
    //response.writeHead(200, {"Content-Type":"text/plain"});

    let datiPacchetto=[];
    request.on('data', function(dato){
        datiPacchetto+=dato;
    })
    let con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "es2login"
    });

    request.on("end", function(){
        var parametri = qs.parse(datiPacchetto);

        if(_controllaSession(parametri.Username) == false)
        {
            con.query("SELECT * FROM utenti", function (err, result, fields) {
                let trovato = false;

                for(let i=0;i<result.length && trovato == false;i++)
                {
                    let x = result[i].Username;

                    if(parametri.Username == result[i].Username && parametri.password == result[i].Pwd)
                    {
                       trovato = true;
                    }
                }

                if(trovato==true)
                {
                    session.push({"Username":parametri.Username});
                    parametri.password="";
                    disp.inviaRisposta(response, 1, "Login corretto");
                }
                else
                {
                    console.log("Login non andato a buon fine");
                    parametri.password="";
                    disp.inviaRisposta(response, 0, "Login non corretto");
                }
            });
        }
        else
        {
            console.log("Utente già loggato");
            parametri.password="";
            disp.inviaRisposta(response, 1, "Sei già loggato");
        }
        
    });
}

function _logout(request, response)
{
    //response.writeHead(200, {"Content-Type":"text/plain"});

    let datiPacchetto=[];
    request.on('data', function(dato){
        datiPacchetto+=dato;
    })

    request.on("end", function(){
        var parametri = qs.parse(datiPacchetto);

        let trovato =false;
        let i=0;
        while(trovato == false && i != session.length)
        {
            if(session[i].Username == parametri.Username)
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
            disp.inviaRisposta(response, 1, "logout corretto");
        }
        else
        {
            console.log("logut non andato a buon fine");
            disp.inviaRisposta(response, 0, "Logout non corretto. Ricaricare la pagina");
        }
    });
}

function _getNomeCognome(request, response) {

    var indirizzo = request.headers.host + request.url;
    var info = url.parse(indirizzo, true);
    var parametri = info.query;

    if(_controllaSession(parametri.Username)==true)
    {

        let con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "es2login"
        });

        con.query("SELECT Nome,Cognome FROM utenti WHERE Username like "+con.escape(parametri.Username), function (err, result, fields) {
            disp.inviaRisposta(response, 1, "Nome: "+result[0].Nome+", Cognome: "+result[0].Cognome);
        });

    }
    else
    {
        disp.inviaRisposta(response, 1, "Non sei autorizzato ad accedere a questo servizio");
    }
}

function _nuovaPassword(request, response) {

    let datiPacchetto=[];
    request.on('data', function(dato){
        datiPacchetto+=dato;
    })

    request.on("end", function(){

        var parametri = qs.parse(datiPacchetto);

        if(_controllaSession(parametri.Username)==true)
        {
            let con = mysql.createConnection({
                host: "localhost",
                user: "root",
                password: "",
                database: "es2login"
            });
    
            con.query("UPDATE utenti SET Pwd = "+con.escape(parametri.NuovaPassword)+" WHERE utenti.Username = "+con.escape(parametri.Username), function (err, result, fields) {
                disp.inviaRisposta(response, 1, "Password aggionata");
            });

            
        }
        else
        {
            disp.inviaRisposta(response, 0, "Non sei autorizzato ad accedere a questo servizio");
        }
    });

    
}

//
//_controllaSession mi serve per controllare che l'utente sia già loggato
//Infatti, può succedere che tramite una semplice riga di js(document.getElementById("").disabled = false)
//un malintenzionato possa usufruire di servizi non consnetiti o creare problemi al server(Esempio doppio login)
//
function _controllaSession(Username)
{
    let trovato = false;
    session.forEach(element => {
        if(element.Username == Username)
        {
            trovato = true;
        }
    });

    return trovato;
}
module.exports.servizio1 = _servizio1;
module.exports.servizio2 = _servizio2;
module.exports.servizio3 = _servizio3;
module.exports.login = _login;
module.exports.logout = _logout;
module.exports.getNomeCognome = _getNomeCognome;
module.exports.nuovaPassword = _nuovaPassword;