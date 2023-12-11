const User = require("../models/userModel");
const passport = require('passport');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;

// Create a new user
const createUser = (req, res) => {
    const { fullName, yearGroup, PhoneNumber, CurrentAddress, EmailAddress, Password, password_confirmation } = req.body;

    bcrypt.hash(Password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Password hashing error');
            res.status(500).send('Error registering a new account; please try again.');
        } else {
            User.create({
                fullName,
                yearGroup,
                PhoneNumber,
                CurrentAddress,
                EmailAddress,
                Password: hashedPassword,
                password_confirmation
            })
                .then(user => {
                    console.log({
                        message: 'Registered successfully',
                        user
                    });
                    res.redirect('/auth/login');
                })
                .catch(err => {
                    console.error('An error occurred');
                    console.error({
                        error: err
                    });
                    res.status(500).send('Error registering a new account; please try again.');
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
            return res.redirect('/auth/login');
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error('Error logging in user:', err);
                return next(err);
            }

            console.log('User logged in:', user);

            // Redirect based on login type
            if (req.body.loginType === 'alumni') {
                // Redirect to the alumni event page
                return res.redirect("/alumni-event");
            } else if (req.body.loginType === 'manager') {
                // Redirect to the manager page
                return res.redirect('/dashboard');
            } else {
                // Default redirection or handle differently
                return res.redirect('/auth/login');
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
        })
        .catch((err) => {
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
    User.findById(userId)
        .then((user) => {
            res.render("edit-user", {
                user
            });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error retrieving user data for editing');
        });
};

// Remove a user by ID
const removeUser = (req, res) => {
    const userId = req.params.id;
    User.findByIdAndRemove(userId)
        .then((user) => {
            console.log(`User ${userId} removed successfully`);
            res.redirect('/dashboard');
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send('Error removing user');
        });
};

// Get user by ID
const getUserById = (req, res) => {
    const userId = req.params.userId;

    User.findById(userId)
        .then((userData) => {
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
            if (!user) {
                return done(null, false, { message: 'Incorrect email.' });
            }

            // Log the found user
            console.log('User found:', user);

            return bcrypt.compare(password, user.Password)
                .then(passwordMatch => {
                    if (passwordMatch) {
                        return done(null, user); // Note: Use the found user, not User
                    } else {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                });
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