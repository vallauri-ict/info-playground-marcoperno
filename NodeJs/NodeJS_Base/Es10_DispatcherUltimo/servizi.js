let disp = require("./dispatcher");

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
    response.writeHead(200, {"Content-Type":"text/plain"});

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
        con.query("SELECT * FROM utenti", function (err, result, fields) {
            let trovato =false;
            for(let i=0;i<result.length && trovato == false;i++)
            {
                let x = result[i].Utente;
                if(parametri.nome == result[i].Utente && parametri.password == result[i].Pwd)
                {
                    
                   trovato = true;
                }
                
                
            }
            if(trovato==true)
            {
                session.push({"nome":parametri.nome});
                disp.inviaRisposta(response, 1, "Login corretto");
            }
            else
            {
                console.log("Login non andato a buon fine");
                disp.inviaRisposta(response, 1, "Login non corretto");
            }
        });
    });
}

function _logout(request, response)
{
    response.writeHead(200, {"Content-Type":"text/plain"});

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
            disp.inviaRisposta(response, 1, "logout corretto");
        }
        else
        {
            console.log("logut non andato a buon fine");
            disp.inviaRisposta(response, 1, "logout non corretto");
        }
    });


    
}


module.exports.servizio1 = _servizio1;
module.exports.servizio2 = _servizio2;
module.exports.servizio3 = _servizio3;
module.exports.login = _login;
module.exports.logout = _logout;