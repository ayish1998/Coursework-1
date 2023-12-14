const express = require("express");
const router = express.Router();
const path = require("path");



router.get("/alumniCreate-Event", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "pages", "alumniCreate-Event.html"));
});


router.get("/Eventcategory", (req, res) => {
  // console.log("Request to /register");
  res.sendFile(path.join(__dirname, "../public", "pages", "Eventcategory.html"));
});

router.get("/alumniList", (req, res) => {
  // console.log("Request to /register");
  res.sendFile(path.join(__dirname, "../public", "pages", "alumniList.html"));
});
router.get("/alumniCommunity", (req, res) => {
  // console.log("Request to /register");
  res.sendFile(path.join(__dirname, "../public", "pages", "alumniCommunity.html"));
});

router.get("/alumniProfile", (req, res) => {
  // console.log("Request to /register");
  res.sendFile(path.join(__dirname, "../public", "pages", "alumniProfile.html"));
});

router.get("/alumniSetting", (req, res) => {
  // console.log("Request to /register");
  res.sendFile(path.join(__dirname, "../public", "pages", "alumniSetting.html"));
});


module.exports = router;