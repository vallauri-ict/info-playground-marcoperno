let express = require("express")
let mongo = require("mongodb")

let app = express()
let mongoClient = mongo.MongoClient

let url = "mongodb://localhost:27017/"

app.listen(3000, function () {
    console.log("Sono in ascolta sulla porta 3000")
})

app.get("/apertura", function (req, res, next) {
    url += "classe5E"
    mongoClient.connect(url, {useUnfieldTipology:true}, function (err, db) {  
        if(err) {
            console.log(err)
            res.send("Errore nell connessione")
        }
            
        else {
            res.send("Connessione avvenuta")
            db.close()
        }
    })
})

app.get("/letturaUtenti", function (req, res, next) {  
    mongoClient.connect("mongodb://localhost:27017/", function (err, dbs) {  
        if(err) {
            errore(err)
        }
        else {
            let classe5E = dbs.db("classe5E")
            classe5E.collection("utenti").find({}).toArray(function (err, dati) {  
                if(err) {
                    errore(err)
                }
                else {
                    res.send(dati)
                }
                dbs.close()
            })
        }
    })
})

app.get("/inserisci", function (req, res, next) {  
    mongoClient.connect("mongodb://localhost:27017/", function (err, dbs) {  
        if(err) {
            errore(err)
        }
        else {
            let classe5E = dbs.db("classe5E")
            let obj = {"nome":"Luca","cognome":"Bianchi", eta: 76}
            classe5E.collection("utenti").insertOne(obj, function (err, risultato) {  
                if(err) {
                    errore(err)
                }
                else {
                    res.send(risultato)
                }
                dbs.close()
            })
        }
    })
})

app.get("/inserisci2", function (req, res, next) {  
    mongoClient.connect("mongodb://localhost:27017/", function (err, dbs) {  
        if(err) {
            errore(err)
        }
        else {
            let classe5E = dbs.db("classe5E")

            let vetObj = [
                {nome : "Giulia", cognome : "Cerato", eta: 78},
                {nome : "Luca", cognome : "Rossi", eta: 75}
            ]

            let obj = {"nome":"Luca","cognome":"Bianchi", eta: 76}
            classe5E.collection("utenti").insertMany(vetObj, function (err, risultato) {  
                if(err) {
                    errore(err)
                }
                else {
                    res.send(risultato)
                }
                dbs.close()
            })
        }
    })
})

app.get("/readEta77", function (req, res, next) {  
    letturaDb("classe5E", "utenti", {eta:"77"}, function (err, dati) {  
        if(err) {
            errore(err)
        }
        else {
            res.send(dati)
        }
    })
})

app.get("/readMag76", function (req, res, next) {  
    letturaDb("classe5E", "utenti", {eta:{$gt:76}}, function (err, dati) {  
        if(err) {
            errore(err)
        }
        else {
            res.send(dati)
        }
    })
})

function letturaDb(db, collection, query, callback) {  
    mongoClient.connect("mongodb://localhost:27017/", function (err, connessione) {  
        if(err) {
            errore(err)
        }
        else {
            let database = connessione.db(db)
            database.collection(collection).find(query).toArray(function(err, dati) {
                callback(err, dati)
                connessione.close()
            })
        }
    })
}

function errore(err) {  
    console.log(err)
    res.send("Errore nell connessione")
}
