const { response } = require("express");
let express = require("express");
let mongo = require("mongodb");

let app = express();
let mongoClient = mongo.MongoClient;

let url = "mongodb://localhost:27017/";

app.listen(1337, function(){
    console.log("Server in attesa sulla porta 1337");
});

app.get('/apertura', function(req, res, next){
    url += "classe5E";
    mongoClient.connect(url, { useUnifiedTopology: true }, function(err, db){
        if(err){
            errore();
        }else{
            console.log("Database aperto");
            res.send("Database aperto");
            db.close();
        }
    });
});

app.get("/query1", function (req, res) {  
    letturaDb("classe5E", "utenti", {}, {nome:1}, function (err, dati) {
        if(err)
            errore();
        else
            res.send(JSON.stringify(dati))
    })
})

app.get('/letturaUtenti', function(req, res){
    letturaDb("classe5E","utenti", {}, function(err, dati){
        if(err)
            errore();
        else
            res.send(dati);
    });
});

app.get('/inserisci', function(req, res){
    mongoClient.connect(url, { useUnifiedTopology: true }, function(err, connessione){
        if(err)
            errore();
        else{
            let classe5E = connessione.db("classe5E");
            let a = "Mario";
            let obj = {nome:a, cognome:"Rossi", eta:13};
            classe5E.collection("utenti").insertOne(obj, function(err, risultato){
                if(err)
                    errore();
                else
                    res.send("Documento inserito");
                connessione.close();
            });
        }
    });
});

app.get('/inserisci2', function(req, res){
    mongoClient.connect(url, { useUnifiedTopology: true }, function(err, connessione){
        if(err)
            errore();
        else{
            let classe5E = connessione.db("classe5E");
            let vetObj = [
                {nome:"Giulia", cognome:"Cerato", citta:"Fossano"},
                {nome:"Matteo", cognome:"Tible", citta:"Bra"},
                {nome:"Andrea", cognome:"Barberis", citta:"Bene Vagienna"},
                {nome: "Andrea", cognome:"Olivero", citta:"Savigliano"}
            ];
            classe5E.collection("utenti").insertMany(vetObj, function(err, risultato){
                if(err)
                    errore();
                else
                    res.send("Documenti inseriti");
                connessione.close();
            });
        }
    });
});

app.get('/readMin', function(req, res){
    letturaDb("classe5E","utenti", {eta:{$lt:18}}, function(err, dati){
        if(err)
            errore();
        else
            res.send(dati);
    });
});

app.get('/readMag', function(req, res){
    //$lt = <   $gt = >   $gte = >=   $lte = <=
    letturaDb("classe5E","utenti", {eta:{$gte:18}}, function(err, dati){
        if(err)
            errore();
        else
            res.send(dati);
    });
});

function letturaDb(db, collection, query, select, callback){
    mongoClient.connect(url,{ useUnifiedTopology: true },  function(err, connessione){
        if(err)
            errore();
        else{
            var database = connessione.db(db);
            database.collection(collection).find(query, select).toArray(function(err, dati){
                callback(err, dati);
                connessione.close();
            });
        }
    });
}

app.get('/elimina', function(req, res){
    mongoClient.connect(url, { useUnifiedTopology: true }, function(err, connessione){
        if(err)
            errore();
        else{
            var database = connessione.db("classe5E");
            database.collection("utenti")
                .remove({nome:"Andrea", cognome:"Barberis"}, function(err, risultato){
                    if(err)
                        errore();
                    else{
                        res.send("Record eliminato");
                        connessione.close();
                    }
            })
        }
    });
});

app.get('/aggiorna', function(req, res){
    mongoClient.connect(url, { useUnifiedTopology: true }, function(err, connessione){
        if(err)
            errore();
        else{
            var database = connessione.db("classe5E");
            database.collection("utenti")
                .update({nome:"Mario", cognome:"Rossi"}, {$set:{citta:"Carmagnola"}}, function(err, risultato){
                    if(err)
                        errore();
                    else{
                        res.send("Record modificato");
                        connessione.close();
                    }
            })
        }
    });
});

function errore(){
    console.log("Errore di connessione con il db");
    res.send("Errore nella connessione con il db mongo");
}