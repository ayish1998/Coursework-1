const express = require("express");
const router = express.Router();
// const path = require("path");
const { getAllUsers,createUsers } = require("../../controllers/userControllers");

router.get("/", getAllUsers);

router.post("/", createUsers);

module.exports = router;