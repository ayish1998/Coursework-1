const express = require("express");
const router = express.Router();
const path = require("path");
const { createEvent, getAllEvents, updateEvent } = require("../../controllers/eventController");

router.post("/", createEvent);
router.get("/", getAllEvents);
router.post("/events/:id/update", updateEvent);




module.exports = router;