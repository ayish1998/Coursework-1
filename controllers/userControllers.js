const User = require("../models/userModel");

// Create a new user
const createUser = (req, res) => {
    const userData = req.body;
    User.create(userData)
        .then((user) => {
            console.log({ message: 'Registered successfully', user });
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
            res.render("dashboard", { userData: users });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error retrieving data');
        });
}

// View a user by ID
const viewUser = (req, res) => {
    const userId = req.params.id;
    User.findById(userId)
        .then((user) => {
            res.render("view-user", { user });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error retrieving user data');
        });
};

// Edit a user by ID
const editUser = (req, res) => {
    const userId = req.params.id;
    User.findById(userId)
        .then((user) => {
            res.render("edit-user", { user });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error retrieving user data for editing');
        });
};

// Remove a user by ID
const removeUser = (req, res) => {
    const userId = req.params.id;
    User.findByIdAndRemove(userId)
        .then((user) => {
            console.log(`User removed: ${user}`);
            res.redirect('/dashboard');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error removing user');
        });
};



const getUserById = (req, res) => {
    const userId = req.params.userId;

    User.findById(userId)
        .then((userData) => {
            if (!userData) {
                return res.status(404).json({ error: "User not found" });
            }

            res.json(userData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: "Error fetching user data" });
        });
};

module.exports = {
    createUser,
    getAllUsers,
    viewUser,
    editUser,
    removeUser, getUserById
};
