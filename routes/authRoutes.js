const express = require("express");
const router = express.Router();
const path = require("path");
const { createUser, login, isAuthenticated } = require("../controllers/userControllers");
const { check } = require("express-validator");

router.get("/login", (req, res) => {
  // console.log("Request to /login");
  res.sendFile(path.join(__dirname, "../public", "pages", "login.html"));
});

router.get("/register", (req, res) => {
  // console.log("Request to /register");
  res.sendFile(path.join(__dirname, "../public", "pages", "register.html"));
});

// Validation middleware
const loginValidation = [
  check('email').isEmail().withMessage('Invalid email address'),
  check('password').notEmpty().withMessage('Password is required'),
];

// Register a user
router.post("/register", createUser);

// Login a user
router.post("/login", login, loginValidation);

// Logout route
router.get('/logout', (req, res) => {
  // Destroy the session
  req.logout((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).json({ success: false, message: 'Error logging out' });
    }
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).json({ success: false, message: 'Error destroying session' });
      }
      // Redirect to the login page or any other desired destination
      res.redirect('/auth/login');
    });
  });
});



module.exports = router;





