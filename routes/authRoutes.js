const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/login", (req, res) => {
    // console.log("Request to /login");
  res.sendFile(path.join(__dirname, "../public", "pages", "login.html"));
});

router.get("/register", (req, res) => {
    // console.log("Request to /register");
  res.sendFile(path.join(__dirname, "../public", "pages", "register.html"));
});

module.exports = router;
