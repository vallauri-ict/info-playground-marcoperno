const express = require('express');
const router = express.Router();
const eventController = require("../controllers/eventsControllers");
const commonFunctions = require('../helpers/commonFunctions');


//#region SHOW

router.get('/:eventId', async (req, res) => {
    try {
            let event = await eventController.Show(req);
            res.json(event)
    } catch (error) {
        res.statusCode = 404;
        commonFunctions.SendError("Errore nella restituizione dello event cercato", error, res)
    }
})

//#endregion


//#region SHOWByUserId

router.get('/show/userId', async (req, res) => {
    try {
        let event = await eventController.ShowByUserId(req);
        res.json(event)
    } catch (error) {
        res.statusCode = 404;
        commonFunctions.SendError("Errore nella restituizione degli events cercati", error, res)
    }
})

//#endregion

//#region SHOWByUserId

router.get('/show/date/:date', async (req, res) => {
    try {
        let event = await eventController.ShowByDate(req);
        res.json(event)
    } catch (error) {
        res.statusCode = 404;
        commonFunctions.SendError("Errore nella restituizione degli events cercati", error, res)
    }
})

//#endregion

//#region STORE

router.post("/", async (req, res) => {
    try {
        let savedEvent = await eventController.Store(req);
        res.json(savedEvent);
    } catch (error) {
        res.statusCode = 400;
        commonFunctions.SendError(error.messageToReturn, error, res)
    }
})

//#endregion

//#region UPDATE

router.put('/:eventId',commonFunctions.IsLoggedIn(), async (req, res) => {
    try {
        let event = await eventController.Update(req);
        res.json(event)
    } catch (error) {
        res.statusCode = 400;
        commonFunctions.SendError(error.messageToReturn, error, res)
    }
})

//#endregion

//#region SHOW

router.delete('/:eventId', async (req, res) => {
    try {
        let event = await eventController.Delete(req);
        res.json(event)
    } catch (error) {
        res.statusCode = 400;
        commonFunctions.SendError("Errore nell'eliminazione dell'event cercato", error, res)
    }
})

//#endregion



module.exports = router;