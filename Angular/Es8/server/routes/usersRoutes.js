const express = require('express');
const router = express.Router();
const userController = require("../controllers/usersControllers");
const commonFunctions = require('../helpers/commonFunctions');
const User = require("../models/User")


//#region INDEX

router.get('/', commonFunctions.IsLoggedIn(), async (req, res) => {
    try {
        let users = await userController.Index(req);
        res.json(users)
    } catch (error) {
        res.statusCode = 400;
        commonFunctions.SendError("Errore nella restituzione degli user", error, res)
    }
})

//#endregion

//#region SHOW

router.get('/:userId', async (req, res) => {
    try {
            let user = await userController.Show(req);
            res.json(user)
    } catch (error) {
        res.statusCode = 404;
        commonFunctions.SendError("Errore nella restituizione dello user cercato", error, res)
    }
})

//#endregion

//#region STORE

router.post("/", async (req, res) => {
    try {
        let savedUser = await userController.Store(req);
        res.json(savedUser);
    } catch (error) {
        res.statusCode = 400;
        commonFunctions.SendError(error.messageToReturn, error, res)
    }
})

//#endregion

//#region UPDATE

router.put('/:userId',commonFunctions.IsLoggedIn(), async (req, res) => {
    try {
        let user = await userController.Update(req);
        res.json(user)
    } catch (error) {
        res.statusCode = 400;
        commonFunctions.SendError(error.messageToReturn, error, res)
    }
})

//#endregion



module.exports = router;