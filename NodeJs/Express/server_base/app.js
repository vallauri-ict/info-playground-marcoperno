const express = require("express");
const app = express();
const dotenv = require('dotenv');
dotenv.config();

const commonFunctions = require('./helpers/commonFunctions');

const mongoose = require("mongoose");
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true,  useFindAndModify: false }, () => console.log("Connesso"))

const cors = require("cors")
app.use(cors({
    origin:"http://localhost:3000",
    credentials: true
}))

const session = require('express-session')
app.use(session({
    secret: process.env.SESSION_COOKIE_KEY,
    resave: false,
    saveUninitialized: true
}))

const cookieParser = require("cookie-parser");
app.use(cookieParser(process.env.SESSION_COOKIE_KEY));

const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
app.use(passport.initialize());
app.use(passport.session());
const pass = require("./passportSetup");
pass.initializeLocal(passport);
//pass.initializeGoogle(passport);

app.use((req, res, next) => {
    express.json()(req, res, (err) => {
        if (err) {
            console.log(err);
            res.sendStatus(400);
            return;
        }
        next();
    });
});

const userRoute = require('./routes/usersRoutes')

app.use("/users", userRoute);


app.post("/login", commonFunctions.IsNotLoggedIn, (req, res, next) => {
    Login(req, res, next);
});

function Login(req, res, next) {  
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) {
            res.statusCode =404
            res.json({message: "Credenziali errate"})
        } 
        else {
            req.logIn(user, (err) => {
                if (err) throw err;
                res.json({msg: "Successfully Authenticated", _id:user._id});
                console.log(req.user);
            });
        }
    })(req, res, next);
}

app.get('/logout', (req, res) => {
    req.logout();
    req.logOut();
    req.session.destroy(function (err) {
        if (!err) {
            res.status(200).clearCookie('connect.sid', { path: '/' });
            //res.render("prodotto/prodottoIndex.html");
            //res.send("Logout effettuato")
            res.send("Logout effettuato")
        } else {
            // handle error case...
        }

    });

})


app.listen(3000);

