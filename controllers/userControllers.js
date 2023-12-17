const User = require("../models/userModel");
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

// Create a new user
const createUser = (req, res) => {
    const { fullName, yearGroup, PhoneNumber, CurrentAddress, EmailAddress, Password } = req.body;
    console.log(req.body);
    bcrypt.hash(Password, 10, (err, hashedPassword) => {
        if (err) {

            console.error('Password hashing error');
            return res.status(500).json({ success: false, message: 'Error registering a new account; please try again.' });
        } else {
            // Set isAdmin to true for the admin user

            User.create({
                fullName,
                yearGroup,
                PhoneNumber,
                CurrentAddress,
                EmailAddress,
                Password: hashedPassword,
                isAdmin: EmailAddress === "admin@alumnKonnect.com" ? true : false
            }).then(user => {
                console.log(user);
                console.log({
                    message: 'Registered successfully',
                    user
                });
                res.redirect('/auth/login');
            }).catch(err => {
                console.error('An error occurred');
                console.error({
                    error: err
                });
                res.status(500).json({ succes: false, message: 'Error registering a new account; please try again.' });
            });
        }
    });
};

// Login a user
const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error('Authentication error:', err);
            return next(err);
        }
        if (!user) {
            console.log('User not found');
            return res.redirect('/auth/login?error=1');
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error('Error logging in user:', err);
                return next(err);
            }

            // Store user ID in session
            req.session.userId = user.id;

            console.log('User logged in:', user);

            if (user.isAdmin) {
                // Redirect to the admin dashboard if the user is an admin
                return res.redirect("/admin");
            } else {
                // Redirect to the alumni event page for non-admin users
                return res.redirect("/alumni-event");
            }
        });
    })(req, res, next);
};






// Get all users
const getAllUsers = (req, res) => {
    User.find({})
        .then((users) => {
            console.log(users);
            res.render("dashboard", {
                userData: users
            });
        }).catch((err) => {
            console.error(err);
            res.status(500).send('Error retrieving data');
        });
};

// View a user by ID
const viewUser = (req, res) => {
    const userId = req.params.id;
    User.findById(userId)
        .then((user) => {
            res.render("view-user", {
                user
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error retrieving user data');
        });
};

// Edit a user by ID
const editUser = (req, res) => {
    const userId = req.params.id;
    const { fullName, yearGroup, PhoneNumber, CurrentAddress, EmailAddress } = req.body;

    // Find the user by ID and update the fields
    User.findByIdAndUpdate(userId, {
        fullName,
        yearGroup,
        PhoneNumber,
        CurrentAddress,
        EmailAddress,
    }, { new: true, select: '-Password' }) // Exclude the Password field
        .then(updatedUser => {
            if (!updatedUser) {
                // If the user is not found, return an error
                return res.status(404).json({ success: false, message: 'User not found.' });
            }

            console.log('User updated successfully:', updatedUser);
            // Return the updated user without the Password field
            res.status(200).json({
                success: true,
                message: 'User updated successfully',
                user: {
                    _id: updatedUser._id,
                    fullName: updatedUser.fullName,
                    yearGroup: updatedUser.yearGroup,
                    PhoneNumber: updatedUser.PhoneNumber,
                    CurrentAddress: updatedUser.CurrentAddress,
                    EmailAddress: updatedUser.EmailAddress,
                    // Exclude the Password field here
                }
            });
        })
        .catch(err => {
            console.error('Error updating user:', err);
            res.status(500).json({ success: false, message: 'Error updating user.' });
        });
};


// Remove a user by ID
const removeUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'Error removing user' });
        }
        res.status(200).json({ success: true, message: 'User removed successfully' });
    } catch (error) {
        console.error(error);  // Corrected from "err"
        res.status(500).json({ success: false, message: 'Error removing user' });
    }
};




// Get user by ID
const getUserById = (req, res) => {
    const userId = req.params.userId;

    User.findById(userId)
        .then((userData) => {
            console.log(userData);
            if (!userData) {
                return res.status(404).json({
                    error: "User not found"
                });
            }

            res.json(userData);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({
                error: "Error fetching user data"
            });
        });
};

// Authorization middleware
const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({
        error: "Unauthorized"
    });
};

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user function
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

// Use local strategy for authentication
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, done) => {
    User.findOne({ EmailAddress: email })
        .then(user => {
            // Log the email of the user
            console.log('User email:', email);

            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }

            // Check if the user is an admin
            if (user.isAdmin) {
                return bcrypt.compare(password, user.Password)
                    .then(passwordMatch => {
                        if (passwordMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Incorrect password.' });
                        }
                    });
            } else {
                // For non-admin users, proceed with regular authentication
                return bcrypt.compare(password, user.Password)
                    .then(passwordMatch => {
                        if (passwordMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: 'Incorrect password.' });
                        }
                    });
            }
        })
        .catch(err => {
            return done(err);
        });
}));


module.exports = {
    createUser,
    login,
    getAllUsers,
    viewUser,
    editUser,
    removeUser,
    getUserById,
    isAuthenticated
};

