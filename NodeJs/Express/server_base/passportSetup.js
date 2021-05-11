const User = require("./models/User");
const passport = require('passport');
const localStrategy = require("passport-local").Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

function initializeLocal(passport) {
    let authenticateUser = (req, email, pwd, done) => {
      User.findOne({ email: email }, (err, user) => {
        if (err) throw err;
        if (!user) return done(null, false);
        if (pwd == user.pwd) {
          return done(null, user);
        } else {
        return done(null, false);
        }
      });
    }
    passport.use(new localStrategy({usernameField: 'email', passwordField: 'pwd', passReqToCallback: true}, authenticateUser));
}

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, "-pwd", (err, user) => {
      cb(err, user);
    });
  });

module.exports.initializeLocal = initializeLocal