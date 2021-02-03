//mettere path mongoDB nelle variabili ambiente
//installare con npm mongo (tasto destro su npm istalla nuovi pacchetti)
//in una shell avviare mongod
//mongod --dbpath C:\Users\Utente\Desktop\5infE\TPSI\MongoDB2020\DB
//in un'altra shell avviare mongo
//https://docs.mongodb.com/manual/reference/method
//https://www.w3schools.com/nodejs/nodejs_mongodb.asp
let mongo = require("mongodb");

let express = require("express");
let app = express();
let fs = require('fs');
const bodyParser = require("body-parser");
let mongoClient = mongo.MongoClient;

let url = "mongodb://localhost:27017/";

app.listen(1337, function () {
    console.log("Server in attesa sulla porta 1337");
});

//necessario per poter leggere parametri POST
app.use("/", bodyParser.json());
app.use("/", bodyParser.urlencoded({ "extended": true }));
//gestione risorse statiche
app.use("/", express.static("./static"));

app.post('/esportaDB', function (req, res) {
    let db = req.body.db;
    //se non esiste creo la cartella corrispondente al db
    if (!fs.existsSync("fileDB/" + db)) {
        fs.mkdirSync("fileDB/" + db);
    }
    getCollections(res, db, function (err, collections) {
        if (err)
            errore(res, err);
        else {
            var i;
            for (i = 0; i < collections.length; i++) {
                let c = collections[i].name;//altrimenti non la vede nella find
                find(res, db, collections[i].name, {}, function (err, dati) {
                    if (err)
                        errore(res, err);
                    else {
                        let s = "";
                        //s += "db." + c + ".insertMany(";
                        s += JSON.stringify(dati);
                        //s += ")";
                        fs.writeFileSync("fileDB/"+db+"/"+c+".txt",s, function (err) {
                            if (err) {
                                return console.log(err);
                            }
                            console.log('File Collection ' + c + " creato");
                            console.log(s);
                        }); 
                    }
                });
            }
        }
    });
});
app.post('/importaDB', function (req, res) {
    let dbs = req.body.dbs;
    let dbd = req.body.dbd;
    fs.readdir("fileDB/" + dbs, (err, files) => {
        files.forEach(file => {
            var collection;
            var pos;
            pos = file.indexOf(".");
            collection = file.substring(0, pos);
            var data = fs.readFileSync("fileDB/" + dbs + "/" + file, 'utf8');
            console.log(data)
            insertMany(res, dbd, collection,JSON.parse(data), function (err, risultato) {
                if (err)
                    errore(res, err);
                else
                    console.log("Collection creata");
            });
        });
    });
});
//----------------FUNZIONI-------------------------

function find(res, db, collection, query, callback) {
    mongoClient.connect(url, function (err, connessione) {
        if (err)
            errore(res, err);
        else {
            var database = connessione.db(db);
            database.collection(collection).find(query).toArray(function (err, dati) {
                callback(err, dati);
                connessione.close();
            });
        }
    });
}
function getCollections(res, db, callback) {
    mongoClient.connect(url, function (err, connessione) {
        if (err)
            errore(res, err);
        else {
            var database = connessione.db(db);
            database.listCollections().toArray(function (err, collections) {
                callback(err, collections);
                connessione.close();
            });
        }
    });
}
function insertMany(res, db, collection, dati, callback) {
    mongoClient.connect(url, function (err, connessione) {
        if (err)
            errore(res, err);
        else {
            var database = connessione.db(db);
            database.collection(collection).insertMany(dati, function (err, risultato) {
                callback(err, risultato);
                connessione.close();
            });
        }
    });
}

function errore(response, err) {
    console.log("Errore " + err);
    response.status(404);
    response.set({ "Content-Type": 'application/json' });
    response.json("Errore " + err); //converte in json e fa send
}

function inviaRisposta(response, testo) {
    console.log(testo);
    response.status(200);
    response.set({ "Content-Type": 'application/json' });
    response.json(testo); //converte in json e fa send
}