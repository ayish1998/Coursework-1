const express = require("express");
const router = express.Router();
const path = require("path");
const {createUser, login} = require("../controllers/userControllers");

router.get("/login", (req, res) => {
    // console.log("Request to /login");
  res.sendFile(path.join(__dirname, "../public", "pages", "login.html"));
});

router.get("/register", (req, res) => {
    // console.log("Request to /register");
  res.sendFile(path.join(__dirname, "../public", "pages", "register.html"));
});


// Register a user
router.post("/register", createUser);

// Login a user
router.post("/login", login);


// Logout a user
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});

// router.get("/dashboard", isAuthenticated, (req, res) => {
//     res.render("dashboard", { user: req.user });
// });



module.exports = router;
