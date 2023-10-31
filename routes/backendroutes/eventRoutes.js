const express = require("express");
const router = express.Router();
const path = require("path");
const {createEvent,getAllEvents} = require("../../controllers/eventController");

router.post("/", createEvent);
router.get("/", getAllEvents);

module.exports = router;