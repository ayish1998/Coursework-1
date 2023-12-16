const express = require("express");
const router = express.Router();
const { createUser, getAllUsers, viewUser, editUser, removeUser, getUserById } = require("../../controllers/userControllers");


// List all users
router.get("/", getAllUsers);



// Create a new user
router.post("/create", createUser);

// View a user
router.get("/view/:id", viewUser);

// Edit a user
router.post("/edit/:id", editUser);



router.get("/:userId", getUserById);

/// Remove a user
router.delete("/delete/:id", removeUser);


module.exports = router;
