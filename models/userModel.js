const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: String,
    date: {
        type: String,
        default: Date.now()
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);    // User is the name of the collection in the database

module.exports = User;