

module.exports = {
    IsLoggedIn:(arrayTypes = []) => {
        return function(req, res, next) {
            if(process.env.TEST == "true")
                next();
            else {
                if (req.user) {
                    let i = 0;
                    while(arrayTypes[i] != req.user.type && i < arrayTypes.length)
                        i++;
                    if(i != arrayTypes.length || arrayTypes.length == 0) {
                        next();
                    } else {
                        res.statusCode = 403
                        res.json({message: "Non sei autorizzato ad usare a questo servizio"})
                    }
                } else {
                    res.statusCode = 401
                    res.json({message: "Unauthorized"})
                }
            }
            
        }
        
    },
    IsNotLoggedIn: (req, res, next) => {
        if (req.user == undefined) {
            next();
        } else {
            res.send("Sei già loggato brutto handicappato")
        }
    },
    ReturnError: (error) => {  
        console.log(error)
        throw error;
    },
    SendError: (msg, err, res) =>  {  
        res.json({message: msg})
    }
  };