const express = require("express");
const router = express.Router();
const path = require("path");
const {createUser, getAllUsers } = require("../../controllers/userControllers");


router.get("/", getAllUsers);

router.post("/", createUser);

module.exports = router;