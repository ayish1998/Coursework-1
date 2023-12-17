// middleware/authenticate.js
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.isAdmin && req.path.startsWith('/alumni')) {
            // If the user is an admin and trying to access an alumni route, redirect to admin dashboard
            return res.redirect("/admin");
        } else if (!req.user.isAdmin && req.path.startsWith('/admin')) {
            // If the user is not an admin and trying to access an admin route, redirect to alumni event page
            return res.redirect("/alumni-event");
        } else {
            // Allow access to other routes
            return next();
        }
    }
    res.redirect('/auth/login'); // Redirect to login page if not authenticated
};

module.exports = {
    isAuthenticated
};
