const express = require("express");
const router = express.Router();
const path = require("path");
const {createUser, login} = require("../controllers/userControllers");
const { check, validationResult } = require('express-validator');

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


// Validation middleware
// const loginValidation = [
//   check('email').isEmail().withMessage('Invalid email address'),
//   check('password').notEmpty().withMessage('Password is required'),
// ];

// Login a user
router.post("/login", login);



// Logout a user
router.get("/logout", (req, res) => {
  req.logout(err => {
      if (err) {
          console.error('Error during logout:', err);
          return next(err);
      }
      req.session.destroy(); // Destroy the session
      res.redirect("/");
  });
});

// router.get("/dashboard", isAuthenticated, (req, res) => {
//     res.render("dashboard", { user: req.user });
// });



module.exports = router;
