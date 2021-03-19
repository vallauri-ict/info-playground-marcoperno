let express = require("express")


let app = express()

app.listen(1337, function () {
    console.log("Sono in ascolta sulla porta 1337");
})

app.get("/servizio1", function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    console.log("o");
    res.send("Sono servizio1");
})