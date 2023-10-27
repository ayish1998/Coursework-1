const userDB = require("../models/userModel");

const getAllUsers = (req, res) => {
    userDB.find({}, (err, users) => {
        if (err) return console.log({ errors: err });

        console.log({ users });

        res.json({ users });
    });
};

const createUsers = (req, res) => {
    const signUpData = req.body;
    userDB.insert(signUpData, (err, data) => {
        if (err) {
            return console.log({ error: err });
        }
        console.log({ message: "data inserted successfully", data });
        console.log(signUpData);
        res.redirect("/auth/register");
    });
};

module.exports = {
    getAllUsers,
    createUsers,
};