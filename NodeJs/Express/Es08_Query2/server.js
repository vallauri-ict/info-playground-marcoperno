let express = require("express")
let mongo = require("mongodb")

let app = express()
let mongoClient = mongo.MongoClient

let url = "mongodb://localhost:27017/"

app.listen(3000, function () {
    console.log("Sono in ascolta sulla porta 3000")
})

app.get("/", async function(req, res, next) {
    await svuota("Es08", "transazione");
    await svuota("Es08", "utente");
    await inserisci("Es08", "transazione", [
        {mittente:4, destinatario:3, somma:54.6, data:new Date("2020-08-16")},
        {mittente:3, destinatario:5, somma:20.0, data:new Date("2020-09-18")},
        {mittente:4, destinatario:3, somma:5.60, data:new Date("2020-10-23")},
        {mittente:5, destinatario:2, somma:14.3, data:new Date("2020-12-03")},
        {mittente:2, destinatario:6, somma:12.0, data:new Date("2021-01-14")},
        {mittente:8, destinatario:5, somma:100.0, data:new Date("2021-01-20")},
        {mittente:1, destinatario:3, somma:45.0, data:new Date("2021-01-22")},
        {mittente:8, destinatario:2, somma:34.8, data:new Date("2021-01-22")},
        {mittente:3, destinatario:7, somma:200.0, data:new Date("2021-01-27")}
    ]);
    await inserisci("Es08", "utente", [
        {_id:1, nome:"Carlo", cognome:"Ferrero", residenza:"Fossano", anni:54},
        {_id:2, nome:"Leopoldo", cognome:"Marengo", residenza:"Cuneo", anni:65},
        {_id:3, nome:"Mattia", cognome:"Manzo", residenza:"Bra", anni:22},
        {_id:4, nome:"Rosanna", cognome:"Gelso", residenza:"Savigliano", anni:35},
        {_id:5, nome:"Margherita", cognome:"Pea", residenza:"Cuneo", anni:18},
        {_id:6, nome:"Leone", cognome:"Manzo", residenza:"Fossano", anni:43},
        {_id:7, nome:"Albana", cognome:"Renzi", residenza:"Bra", anni:48},
        {_id:8, nome:"Elisa", cognome:"Basso", residenza:"Savigliano", anni:31}
    ]);
})

app.get("/query1", function (req, res) {  
    letturaDb("Es08", "utente", {residenza:"Fossano"}, {}, function ( dati) {
        console.log(dati)
    })
})

app.get("/query2", function (req, res) {
    
    letturaDb("Es08", "utente", { nome: /^C|L/, anni: { $gt: 50 }}, {}, function ( dati) {
        console.log(dati)
    })
})

app.get("/query3", async function (req, res) {
    let dati = await letturaDbAsyncConLimit("Es08", "utente", { nome: /o$/}, {nome:1, cognome:1}, 2)
    console.log(dati)
})

app.get("/query4",async function (req, res) { 
    mongoClient.connect(url,{ useUnifiedTopology: true },  function(err, connessione){
        if(err)
            errore(res);
        else{
            var database = connessione.db("Es08");
            var opzioni = [
                {$match:{residenza:{$exists:true}, anni:{$exists:true}}},
                {$group:{_id:"$residenza", mediaEta:{$avg:"$anni"}}}
            ];
            database.collection("utente").aggregate(opzioni).toArray(function(err, dati){
                if(err) errore(res);
                else
                    res.send(JSON.stringify(dati));
                connessione.close();
            });
        }
    });
})

app.get("/query5", async function (req, res) {
    let ris =  await letturaDbAsync("Es08", "utente", {nome:"Rosanna", cognome:"Gelso"}, {_id:1}); 
    ris =  await letturaDbAsync("Es08", "transazione", {mittente:ris[0]._id}, {data:0}); 
    console.log(ris)
    
})

app.get("/query6", async function (req, res) {
    mongoClient.connect(url,{ useUnifiedTopology: true },  function(err, connessione){
        if(err)
            errore(res);
        else{
            var database = connessione.db("Es08");
            database.collection("transazione").countDocuments({somma:{$gt: 20}}, function(err, dati){
                if(err) errore(res);
                else
                    res.send(JSON.stringify(dati));
                connessione.close();
            });
        }
    });
})

app.get("/query7", async function (req, res) {
    let ris =  await letturaDbAsync("Es08", "utente", {nome:"Mattia", cognome:"Manzo"}, {_id:1}); 
    mongoClient.connect(url,{ useUnifiedTopology: true },  function(err, connessione){
        if(err)
            errore(res);
        else{
            var database = connessione.db("Es08");
            var opzioni = [{ $match: {
                $or: [
                    { mittente:ris[0]._id },
                    { destinatario:ris[0]._id }
                    ]
                } }
            ];
            database.collection("transazione").aggregate(opzioni).toArray(function(err, dati){
                let somma = 0;
                if(err) errore(res);
                else {
                    for(let i = 0;i<dati.length; i++) {
                        if ( dati[i].mittente == ris[0]._id) {
                            somma+= dati[i].somma;
                        } else {
                            somma-= dati[i].somma;
                        }
                    }
                }
                res.send(somma.toString());
                connessione.close();
            });
        }
    });
    console.log(ris)
    
})

app.get("/query8", function (req, res) {
    mongoClient.connect(url,{ useUnifiedTopology: true },  function(err, connessione){
        if(err)
            errore(res);
        else{
            var database = connessione.db("Es08");
            var opzioni = [
                {$group:{_id:"$destinatario", sommaRicevutaTot:{$sum:"$somma"}}}
            ];
            database.collection("transazione").aggregate(opzioni).toArray(function(err, dati){
                if(err) errore(res);
                else
                    res.send(JSON.stringify(dati));
                connessione.close();
            });
        }
    });
})

app.get("/query9", async function (req, res) {
    let ris =  await letturaDbAsync("Es08", "transazione", {data:{$gte: new Date("2021-01-01")}}, {}); 
    res.send(ris)
    
})

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

async function letturaDbAsync(db, collection, query, select) {
    return new Promise((resolve, reject) => {
        let vet = [];
        mongoClient.connect(url, { useUnifiedTopology: true }, function (err, connessione) {
            if (err)
                console.log(err)
            else {
                var database = connessione.db(db);
                database.collection(collection).find(query).project(select).toArray(function (err, dati) {
                    connessione.close();
                    resolve(dati);
                });
            }
        });
    });
}

async function letturaDbAsyncConLimit(db, collection, query, select, nLim) {
    return new Promise((resolve, reject) => {
        let vet = [];
        mongoClient.connect(url, { useUnifiedTopology: true }, function (err, connessione) {
            if (err)
                console.log(err)
            else {
                var database = connessione.db(db);
                database.collection(collection).find(query).project(select).limit(nLim).toArray(function (err, dati) {
                    connessione.close();
                    resolve(dati);
                });
            }
        });
    });
}

async function svuota(db, collection) {
    return new Promise((resolve, reject) => {
        mongoClient.connect(url, function (err, dbs) {  
            if(err) {
                console.log(err)
            }
            else {
                let database = dbs.db(db)
                database.collection(collection).deleteMany({}, function (err, risultato) {  
                    let ris = {};
                    if(err) {
                        console.log("errore");
                        ris.ok = 0;
                    }
                    else {
                        ris.ok = 1;
                    }
                    dbs.close()
                    resolve(ris);
                })
            }
        })
    })
}

async function inserisci(db, collection, json) {  
    return new Promise((resolve, reject) => {
        mongoClient.connect(url, function (err, dbs) {  
            if(err) {
                console.log(err)
            }
            else {
                let database = dbs.db(db)
                let array = [];
                if(json.length == undefined)
                    array[0] = json;
                else
                    array = json;
                database.collection(collection).insertMany(array, function (err, risultato) {  
                    let ris = {};
                    if(err) {
                        console.log("errore");
                        ris.ok = 0;
                    }
                    else {
                        ris.ok = 1;
                        ris.insertedIds = risultato.insertedIds;
                    }
                    dbs.close()
                    resolve(ris);
                })
            }
        })
    })
}