const express = require("express");
const router = express.Router();
const path = require("path");
const { createEvent, getAllEvents, updateEvent,deleteEvent } = require("../../controllers/eventController");

router.post("/", createEvent);
router.get("/", getAllEvents);
router.post("/events/:id/update", updateEvent);
router.post("/delete/:id", deleteEvent);


module.exports = router;