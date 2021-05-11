const User = require("../models/User")
const Mongoose = require("mongoose");


//#region INDEX

async function Index(req) {  
    try {
        let users = await User.find({}, req.query.fields);
        return users;
    } catch (error) {
        commonFunctions.ReturnError(error);
    }
}

//#endregion

//#region

async function Show(req) {
    try {
        let user = await User.findById(req.params.userId, req.query.fields);
        return user;
    } catch (error) {
        commonFunctions.ReturnError(error);
    }
}

//#endregion

//#region STORE

async function Store(req) {
    try {

        let user = new User({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            pwd: req.body.pwd,
        })

        let savedUser = await user.save();
        return savedUser;
    } catch (error) {
        error.messageToReturn = "Errore nell'inserimento dello user";
        commonFunctions.ReturnError(error);
    }
}

//#endregion

//#region UPDATE

async function Update(req) {
    try {
        let user = await User.findByIdAndUpdate({_id: req.params.userId}, req.body, {new: true, runValidators: true});
        return user;
    } catch (error) {
        error.messageToReturn = "Errore nell'aggiornamento dello user";
        commonFunctions.ReturnError(error);
    }
}

//#endregion



module.exports.Index = Index;
module.exports.Show = Show;
module.exports.Store = Store;
module.exports.Update = Update;
