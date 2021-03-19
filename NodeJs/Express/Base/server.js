//MODULI
var express = require("express");
var mongo = require("mongodb");

var app = express();
var mongoClient = mongo.MongoClient;
var url = "mongodb://localhost:27017/";

//AVVIO IL SERVER
app.listen(1337, function(){
	console.log("Il server è in ascolto sulla porta 1337");
});

/************************************ QUERY *****************************************/


/*************************** FUNZIONI COMUNI ***************************************/
function cont(res, nomeDb, collezione, query, callback){
	apriConnessione(res, nomeDb, function(connessione, database){
		database.collection(collezione).countDocuments(query, function(err, risposta){
			if(err) errore(res, "ContDocuments");
			else{
				callback(risposta);
			}
			connessione.close();
		});
	});
}

function aggregate(res, nomeDb, collezione, options, callback){
	apriConnessione(res, nomeDb, function(connessione, database){
		database.collection(collezione).aggregate(options).toArray(function(err, risposta){
			if(err) errore(res, "Aggregate");
			else{
				callback(risposta);
			}
			connessione.close();
		});
	});
}

function find(res, nomeDb, collezione, query, select, callback){
	apriConnessione(res, nomeDb, function(connessione, database){
		database.collection(collezione).find(query).project(select).toArray(function(err, risposta){
			if(err) errore(res, "Find");
			else{
				callback(risposta);
			}
			connessione.close();
		});
	});
}

function insert(res, nomeDb, collezione, elems, callback){
	apriConnessione(res, nomeDb, function(connessione, database){
		database.collection(collezione).insertMany(elems, function(err, risposta){
			if(err) errore(res, "Insert");
			else{
				callback(risposta);
			}
			connessione.close();
		});
	});
}

function apriConnessione(response, nomeDb, callback){
	mongoClient.connect(url, { useUnifiedTopology: true }, function(err, connessione){
		if(err) errore(response, "Connect"); 
		else{
			let database = connessione.db(nomeDb);
			callback(connessione, database);
		}
	});
}

function errore(res, tipo){
	console.log(tipo + ": Errore di connessione a mongodb");
	res.end(tipo + ": Errore di connessione a mongodb");
}
