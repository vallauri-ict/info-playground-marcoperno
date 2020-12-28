let url = require("url");

function Dispatcher()
{
    this.prompt = "Dispathcer >>";

    this.list = {"GET" : [], "POST" : []};

    this.aggiungiAssociazione  = function(metodo, risorsa, callback)
    {
        this.list[metodo.toUpperCase()][risorsa] = callback;
    }

    Object.size = function(obj) {
        var size = 0, key;
        for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
        }
        return size;
    };

    this.stampaLista = function()
    {
        console.log("Stampo l'insieme dei servizi e delle risorse disponibili:\n");
        for(metodo in this.list)
        {
            console.log(this.prompt + " il metodo:"+metodo+" espone "+ Object.keys( this.list[metodo]).length );
            //console.log(this.prompt + " il metodo:"+metodo+" espone "+ Object.size( this.list[metodo]) );
            for(servizio in this.list[metodo])
            {
                console.log(this.prompt + " Servizio "+ servizio + " -> "+ this.list[metodo][servizio]);
            }
        }
    }

    this.dispatch = function(request, response)
    {
        let parseUrl = url.parse(request.url, true);
        var metodo = request.method;
        let servizio = parseUrl.pathname
        this.prompt =  "dispatcher >>> E' arrivata una richiesta "+ metodo+" sulla risorsa "+ parseUrl.pathname;
        console.log(this.prompt);
        try {
            if(this.list[metodo][servizio])
            {
                this.list[metodo][servizio](request, response);
            }
            else
            {
                console.log("Errore");
            }
        } catch (error) {
            
        }
        
    }
}

module.exports.Dispatcher = Dispatcher;