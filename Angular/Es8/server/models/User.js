const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FKHelper = require("../helpers/foreign-key-helper")


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: {unique: true, dropDups: true}
    },
    pwd: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("User", UserSchema);