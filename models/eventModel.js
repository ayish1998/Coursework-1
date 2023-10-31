const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {
        type: String,
        required: true
    }
    ,
    category: {
        type: String,
        enum: ['Campus Event', 'Professional Event', 'Networking Event'],
        required: true
    },
    type: {
        type: String,
        required: true
    },
    datetime: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Event", eventSchema);