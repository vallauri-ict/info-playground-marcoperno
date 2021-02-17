let express = require("express");
let mongo = require("mongodb");

let app = express();
let mongoClient = mongo.MongoClient;

let url = "mongodb://localhost:27017/";

app.listen(1337, function(){
    console.log("Server in attesa sulla porta 1337");
});

app.get("/query1", function(richiesta, risposta){
    letturaDb(risposta, "classe5E", "utenti", {}, {}, function(dati){
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
    letturaDb(risposta, "classe5E", "utenti", {nome:a, eta:{$gte:20}}, {}, function(dati){
        risposta.send(JSON.stringify(dati));
    });   
});

app.get("/query3", function(richiesta, risposta){
    //exists -> true (vedo solo i documenti che hanno quel campo)
    //-> false (vedo solo i documenti che NON hanno quel campo)
    letturaDb(risposta, "classe5E", "utenti", {nome:"Matteo", eta:{$exists:false}}, {nome:0}, function(dati){
        risposta.send(JSON.stringify(dati));
    });   
});

app.get("/query4", function(richiesta, risposta){
    letturaDb(risposta, "classe5E", "utenti", {nome: /tt/}, {}, function(dati){
        risposta.send(JSON.stringify(dati));
    });   
});

app.get("/query5", function(richiesta, risposta){
    mongoClient.connect(url,{ useUnifiedTopology: true },  function(err, connessione){
        if(err)
            errore(risposta);
        else{
            var database = connessione.db("classe5E");
            database.collection("utenti").distinct("nome", {}, function(err, dati){
                if(err) errore(risposta);
                else
                    risposta.send(JSON.stringify(dati));
                connessione.close();
            });
        }
    });
});

app.get("/query6", function(richiesta, risposta){
    mongoClient.connect(url,{ useUnifiedTopology: true },  function(err, connessione){
        if(err)
            errore(risposta);
        else{
            var database = connessione.db("classe5E");
            database.collection("utenti").countDocuments({nome:"Andrea"}, function(err, dati){
                if(err) errore(risposta);
                else
                    risposta.send(JSON.stringify(dati));
                connessione.close();
            });
        }
    });
});

app.get("/query7", function(richiesta, risposta){
    mongoClient.connect(url,{ useUnifiedTopology: true },  function(err, connessione){
        if(err)
            errore(risposta);
        else{
            var database = connessione.db("classe5E");
            database.collection("utenti").find({nome:"Andrea"}).limit(1).toArray(function(err, dati){
                if(err) errore(risposta);
                else
                    risposta.send(JSON.stringify(dati));
                connessione.close();
            });
        }
    });
});

app.get("/query8", function(richiesta, risposta){
    mongoClient.connect(url,{ useUnifiedTopology: true },  function(err, connessione){
        if(err)
            errore(risposta);
        else{
            var database = connessione.db("classe5E");
            database.collection("utenti").find({nome:"Andrea"}).project({cognome:0}).sort({citta:1}).toArray(function(err, dati){
                if(err) errore(risposta);
                else
                    risposta.send(JSON.stringify(dati));
                connessione.close();
            });
        }
    });
});

app.get("/query9", function(richiesta, risposta){
    mongoClient.connect(url,{ useUnifiedTopology: true },  function(err, connessione){
        if(err)
            errore(risposta);
        else{
            var database = connessione.db("classe5E");
            database.collection("utenti").find({_id:mongo.ObjectId("60000e265297212714cb8f37")}).toArray(function(err, dati){
                if(err) errore(risposta);
                else
                    risposta.send(JSON.stringify(dati));
                connessione.close();
            });
        }
    });
});

app.get("/query10", function(richiesta, risposta){
    mongoClient.connect(url,{ useUnifiedTopology: true },  function(err, connessione){
        if(err)
            errore(risposta);
        else{
            var database = connessione.db("classe5E");
            database.collection("utenti").find({datanascita:{$gt:new Date("2021-01-29")}}).toArray(function(err, dati){
                if(err) errore(risposta);
                else
                    risposta.send(JSON.stringify(dati[0].datanascita));
                connessione.close();
            });
        }
    });
});

app.get("/query11", function(richiesta, risposta){
    letturaDb(risposta, "classe5E", "utenti", {nome: /^G/}, {}, function(dati){
        risposta.send(JSON.stringify(dati));
    });   
});

app.get("/query12", function(richiesta, risposta){
    letturaDb(risposta, "classe5E", "utenti", {nome: /[At]/}, {}, function(dati){
        risposta.send(JSON.stringify(dati));
    });   
});

app.get("/query13", function(richiesta, risposta){
    letturaDb(risposta, "classe5E", "utenti", {nome: /o$/}, {}, function(dati){
        risposta.send(JSON.stringify(dati));
    });   
});

app.get("/query14", function(richiesta, risposta){
    mongoClient.connect(url,{ useUnifiedTopology: true },  function(err, connessione){
        if(err)
            errore(risposta);
        else{
            var database = connessione.db("classe5E");
            /*
                Select nome, COUNT(*) as mediaEta From Utenti Where nome LIKE 'A*' Group By nome
            */
            var opzioni = [
                {$match:{nome:/^A/}},
                {$group:{_id:"$nome", numeroUtentiAggregati:{$sum:1}}}
            ];
            database.collection("utenti").aggregate(opzioni).toArray(function(err, dati){
                if(err) errore(risposta);
                else
                    risposta.send(JSON.stringify(dati));
                connessione.close();
            });
        }
    });
});

app.get("/query15", function(richiesta, risposta){
    mongoClient.connect(url,{ useUnifiedTopology: true },  function(err, connessione){
        if(err)
            errore(risposta);
        else{
            var database = connessione.db("classe5E");
            /*
                Select nome, AVG(eta) as mediaEta From Utenti Group By nome
            */
            var opzioni = [
                {$group:{_id:"$nome", mediaEta:{$avg:"$eta"}}}
            ];
            database.collection("utenti").aggregate(opzioni).toArray(function(err, dati){
                if(err) errore(risposta);
                else
                    risposta.send(JSON.stringify(dati));
                connessione.close();
            });
        }
    });
});

app.get("/query16", function(richiesta, risposta){
    mongoClient.connect(url,{ useUnifiedTopology: true },  function(err, connessione){
        if(err)
            errore(risposta);
        else{
            var database = connessione.db("classe5E");
            /*
                Select nome, AVG(eta) as mediaEta From Utenti Group By nome
            */
            var opzioni = [
                {$match:{eta:{$exists:true}}},
                {$group:{_id:"$nome", mediaEta:{$avg:"$eta"}}}
            ];
            database.collection("utenti").aggregate(opzioni).toArray(function(err, dati){
                if(err) errore(risposta);
                else
                    risposta.send(JSON.stringify(dati));
                connessione.close();
            });
        }
    });
});

app.get("/query17", function(richiesta, risposta){
    mongoClient.connect(url,{ useUnifiedTopology: true },  function(err, connessione){
        if(err)
            errore(risposta);
        else{
            var database = connessione.db("classe5E");
            /*
                Select nome, AVG(eta) as mediaEta From Utenti Group By nome
            */
            var opzioni = [
                {$match:{eta:{$exists:true}}},
                {$group:{_id:"$nome", mediaEta:{$avg:"$eta"}}},
                {$sort:{_id:1}}
            ];
            database.collection("utenti").aggregate(opzioni).toArray(function(err, dati){
                if(err) errore(risposta);
                else
                    risposta.send(JSON.stringify(dati));
                connessione.close();
            });
        }
    });
});

/**************************FUNZIONI COMUNI ***************************/

function letturaDb(res, db, collection, query, select, callback){
    mongoClient.connect(url,{ useUnifiedTopology: true },  function(err, connessione){
        if(err)
            errore(res);
        else{
            var database = connessione.db(db);
            //Attenzione è obbligatorio usare project ora, fino agli aggiornamenti del 22 dicembre veniva 
            //fuori un warning ora invece non lo consente più. E' possibile che presto o tardi lo facciano
            // anche con update quindi abituatevi ad usare updateMany (peccato perché erano comodi).
            database.collection(collection).find(query).project(select).toArray(function(err, dati){
                if(err) errore(res);
                else
                    callback(dati);
                connessione.close();
            });
        }
    });
}

function errore(res, err){
    console.log("Errore di connessione con il db");
    res.send("Errore nella connessione con il db mongo");
}