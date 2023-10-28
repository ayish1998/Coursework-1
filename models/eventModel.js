const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 5,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 5,
        maxlength: 255
    },
    date: {
        type: Date,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 5,
        maxlength: 255
    },
    time: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 5,
        maxlength: 255
    },
    location: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 5,
        maxlength: 255
    },
    image: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        minlength: 5,
        maxlength: 255
    }
});

const Event = mongoose.model("Event", eventSchema);