const express = require("express");
const router = express.Router();
const Event = require("../models/eventModel");

//get all events
router.get("/", (req, res) => {
    res.json("get all events");
});

module.exports = router;
