let fs = require("fs");

function invioIndexHtml(request, response) { 
    response.writeHead(200, {"Content-Type":"text/html"});
    fs.readFile("Sito/index.html", function (err, file){
        console.log("Ho terminato la lettura del file");
        response.write(file);
        response.end();
    });
    console.log("Il SO sta leggendo il file");
}
module.exports.invioIndexHtml = invioIndexHtml;