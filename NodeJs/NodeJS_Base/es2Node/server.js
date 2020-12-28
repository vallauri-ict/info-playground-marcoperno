let http = require("http");
let url = require("url");
let fs = require("fs");
let res;

let server = http.createServer(function(req, response)
{
    res=response;
    let testoPagina="";
    var header = {"Content-type": "text/html"};
    res.writeHead(200, header);
    fs.readFile("Sito/index.html", analizzaFile);
    console.log("sto leggendo");
});

server.listen(1337, "127.0.0.1");
console.log("in ascolto su 1337");

function analizzaFile(err, file){
    console.log("lettura completata");
    res.write(file);
    res.end();
}
