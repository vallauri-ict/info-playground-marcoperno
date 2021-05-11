const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const FKHelper = require("../helpers/foreign-key-helper")


const EventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    hourStart: {
        type: Number,
        required: true,
    },
    hourFinish: {
        type: Number,
        required: true,
    },
    minuteStart: {
        type: Number,
        required: true,
    },
    minuteFinish: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
        validate: {
            validator: function (color) {  
                if(color.match(/^#[a-f0-9]{6}$/i) !== null)
                    return true;
                else
                    return false;
            },
            message: 'Colore non valido'
        }
    },
    user_id: {
        type: Schema.ObjectId, ref: 'User',
        validate: {
            validator: async function(v) {
                return await FKHelper(mongoose.model("User"), v)
            },
            message: 'User does not exist'
        }
    }
})

module.exports = mongoose.model("Event", EventSchema);