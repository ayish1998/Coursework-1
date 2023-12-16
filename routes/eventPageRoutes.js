const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "pages", "eventPage.html"));
});

router.get("/singleEvent", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "pages", "singleEvent.html"));
});
module.exports = router;