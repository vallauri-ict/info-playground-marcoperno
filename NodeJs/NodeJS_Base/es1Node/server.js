let http = require("http");

let server = http.createServer(function(req, response)
{
    var header = {"Content-type": "text/plain"};
    response.writeHead(200, header);
    response.write("Hello worlnd");
    response.end();
});

server.listen(1337, "192.168.1.9");
console.log("in ascolto su 1337");