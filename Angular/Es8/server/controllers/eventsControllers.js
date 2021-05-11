const Event = require("../models/Event")
const Mongoose = require("mongoose");
const commonFunctions = require('../helpers/commonFunctions');


//#region

async function Show(req) {
    try {
        let event = await Event.findById(req.params.eventId, req.query.fields);
        return event;
    } catch (error) {
        commonFunctions.ReturnError(error);
    }
}

//#endregion

//#region STORE

async function Store(req) {
    try {

        let event = new Event({
            name: req.body.name,
            date: req.body.date,
            hourStart: req.body.hourStart,
            minuteStart: req.body.minuteStart,
            hourFinish: req.body.hourFinish,
            minuteFinish: req.body.minuteFinish,
            type: req.body.type,
            color: req.body.color,
            user_id: req.body.user_id,
        })

        let savedEvent = await event.save();
        return savedEvent;
    } catch (error) {
        error.messageToReturn = "Errore nell'inserimento del event";
        commonFunctions.ReturnError(error);
    }
}

//#endregion

//#region UPDATE

async function Update(req) {
    try {
        let event = await Event.findByIdAndUpdate({_id: req.params.eventId}, req.body, {new: true, runValidators: true});
        return event;
    } catch (error) {
        error.messageToReturn = "Errore nell'aggiornamento del event";
        commonFunctions.ReturnError(error);
    }
}

//#endregion



module.exports.Show = Show;
module.exports.Store = Store;
module.exports.Update = Update;
