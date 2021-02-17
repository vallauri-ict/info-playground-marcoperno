let express = require("express");
let mongo = require("mongodb");

let app = express();
let mongoClient = mongo.MongoClient;

let url = "mongodb://localhost:27017/";

app.listen(1337, function(){
    console.log("Server in attesa sulla porta 1337");
});

app.get("/query1", function(richiesta, risposta){
    letturaDb("classe5E", "utenti", {}, {}, function(dati){
        risposta.send(JSON.stringify(dati));
    });   
});

app.get("/query2", function(richiesta, risposta){
    let a = "Mario";
    //lt < (less than)
    //gt > (greater than)
    //lte <= 
    //gte >=
    //eq =
    //ne !=    <>
    letturaDb("classe5E", "utenti", {nome:a, eta:{$gte:20}}, {}, function(dati){
        risposta.send(JSON.stringify(dati));
    });   
});

app.get("/query3", function(richiesta, risposta){
    //exists -> true (vedo solo i documenti che hanno quel campo)
    //-> false (vedo solo i documenti che NON hanno quel campo)
    letturaDb("classe5E", "utenti", {nome:"Matteo", eta:{$exists:false}}, {nome:0}, function(dati){
        risposta.send(JSON.stringify(dati));
    });   
});

/**************************FUNZIONI COMUNI ***************************/

function letturaDb(db, collection, query, select, callback){
    mongoClient.connect(url,{ useUnifiedTopology: true },  function(err, connessione){
        if(err)
            errore();
        else{
            var database = connessione.db(db);
            //Attenzione è obbligatorio usare project ora, fino agli aggiornamenti del 22 dicembre veniva 
            //fuori un warning ora invece non lo consente più. E' possibile che presto o tardi lo facciano
            // anche con update quindi abituatevi ad usare updateMany (peccato perché erano comodi).
            database.collection(collection).find(query).project(select).toArray(function(err, dati){
                if(err) errore();
                else
                    callback(dati);
                connessione.close();
            });
        }
    });
}

function errore(){
    console.log("Errore di connessione con il db");
    res.send("Errore nella connessione con il db mongo");
}