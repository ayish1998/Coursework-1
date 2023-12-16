// middleware/authenticate.js
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/auth/login'); // Redirect to login page if not authenticated
};

module.exports = {
    isAuthenticated
};
