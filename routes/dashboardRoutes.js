const express = require("express");
const router = express.Router();
const path = require("path");



router.get("/create-event", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "pages", "create-event.html"));
});

router.get("/alumni", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "pages", "alumni.html"));
});

router.get("/category", (req, res) => {
  // console.log("Request to /register");
  res.sendFile(path.join(__dirname, "../public", "pages", "category.html"));
});

router.get("/community", (req, res) => {
  // console.log("Request to /register");
  res.sendFile(path.join(__dirname, "../public", "pages", "community.html"));
});

router.get("/profile", (req, res) => {
  // console.log("Request to /register");
  res.sendFile(path.join(__dirname, "../public", "pages", "profile.html"));
});

router.get("/setting", (req, res) => {
  // console.log("Request to /register");
  res.sendFile(path.join(__dirname, "../public", "pages", "setting.html"));
});


module.exports = router;