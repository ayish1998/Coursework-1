const express = require("express");
const router = express.Router();
const path = require("path");

//alumni  routes
router.get("/alumniCreate-Event", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "pages", "alumniCreate-Event.html"));
});

//event routes
router.get("/Eventcategory", (req, res) => {
  // console.log("Request to /register");
  res.sendFile(path.join(__dirname, "../public", "pages", "Eventcategory.html"));
});

//alumni lsit routes
router.get("/alumniList", (req, res) => {
  // console.log("Request to /register");
  res.sendFile(path.join(__dirname, "../public", "pages", "alumniList.html"));
});
router.get("/alumniCommunity", (req, res) => {
  // console.log("Request to /register");
  res.sendFile(path.join(__dirname, "../public", "pages", "alumniCommunity.html"));
});


module.exports = router;