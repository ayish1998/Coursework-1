const express = require("express");
const router = express.Router();
const path = require("path");
const { createEvent, getAllEvents, updateEvent,deleteEvent } = require("../../controllers/eventController");

router.post("/", createEvent);
router.get("/", getAllEvents);
router.post("/events/:id/update", updateEvent);
router.post("/alumni-event/events/:id/delete", deleteEvent);


module.exports = router;