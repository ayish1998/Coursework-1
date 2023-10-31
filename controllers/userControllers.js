const User = require("../models/userModel"); // Ensure the correct path to the User model

// Create a new user
const createUser = (req, res) => {
    const userData = req.body;
    User.create(userData)
        .then((user) => {
            console.log({ message: 'registered successfully', user });
            res.redirect('/auth/register');
        })
        .catch((err) => {
            console.error('An error occurred');
            console.error({ error: err });
            res.status(500).send('Error registering a new account; please try again.');
        });
};

// Get all users
const getAllUsers = (req, res) => {
    User.find({})
        .then((users) => {
            console.log(users);
            // Render the "dashboard" template and pass the user data to it
            res.render("dashboard", { userData: users });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error retrieving data');
        });
}

module.exports = {
    createUser,
    getAllUsers
};
