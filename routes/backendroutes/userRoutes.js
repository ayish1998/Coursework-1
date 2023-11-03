const express = require("express");
const router = express.Router();
const { createUser, getAllUsers, viewUser, editUser, removeUser,getUserById } = require("../../controllers/userControllers");

// List all users
router.get("/", getAllUsers);

// Create a new user
router.post("/", createUser);

// View a user
router.get("/view/:id", viewUser);

// Edit a user
router.get("/edit/:id", editUser);

// Remove a user
router.get("/remove/:id", removeUser);

router.get("/:userId", getUserById);


module.exports = router;
