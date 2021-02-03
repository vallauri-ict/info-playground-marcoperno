let express = require("express")
let mongo = require("mongodb")

let app = express()
let mongoClient = mongo.MongoClient

let url = "mongodb://localhost:27017/"

app.listen(3000, function () {
    console.log("Sono in ascolta sulla porta 3000")
})

app.get("/query1", function (req, res) {  
    letturaDb("Es06", "persona", {nome:"Mario", cognome:"Rossi"}, {_id:1}, function ( dati) {
        console.log(dati[0])
        letturaDb("Es06", "biglietto", {persona: dati[0]._id}, {}, function (dati) {
            console.log(dati);
        })
    })
})

app.get("/query2", function (req, res) {
    let x = new Date("2021-01-27").toISOString()
    mongoClient.connect(url, { useUnifiedTopology: true }, function(err, connessione){
        if(err)
            errore();
        else{
            var database = connessione.db("Es06");
            database.collection("biglietto").updateMany({tratta: mongo.ObjectId("6011a2bb0787616c55aa7e8f"), validato:"no", data: new Date( x)}, {$set:{validato:"si"}}, function(err, risultato){
                    if(err)
                        errore();
                    else{
                        res.send("Record modificato/i");
                        connessione.close();
                    }
            })
        }
    });
})

app.get("/query3", function (req, res) {
    letturaDb("Es06", "persona", {annoNascita: {$lte:2002}}, {_id:1},async function ( dati) {
        console.log(dati[0])
        
        for(let i=0;i<dati.length;i++) {
            let ris = await letturaDbAsync("Es06", "biglietto", {persona: dati[i]._id}, {});
            console.log(ris);
        }
    })
})

app.get("/query4",async function (req, res) { 
    let ris =  await letturaDbAsync("Es06", "tratta", {_id: mongo.ObjectId("6011a2bb0787616c55aa7e8f")}, {from:1}); 
    ris = await letturaDbAsync("Es06", "biglietto", {stazionePartenza: ris[0].from}, {});
    console.log(ris);
})

app.get("/query5", async function (req, res) {
    let ris =  await letturaDbAsync("Es06", "tratta", {costo: {$lte: 5}}, {}); 
    console.log(ris);
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