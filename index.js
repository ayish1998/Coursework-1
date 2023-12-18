const express = require("express");
const path = require("path");
const app = express();
const dotenv = require('dotenv'); // require dotenv
const connectDB = require('./config/util'); // require connectDB
const flash = require('flash-express'); // require flash
const session = require('express-session'); // require session
require('events').EventEmitter.defaultMaxListeners = 15; // or a higher value
const passport = require('passport'); // require passport
const { isAuthenticated } = require('./middleware/authenticate');

// flash middleware
app.use(flash());

// session middleware
app.use(session({
	secret: '4ce21bff94ea8ecee8add78423bdc1dbe61c20ed865ee65a145ad4eff8ea7ffbc5a8a6ea2ad6dba52f687d43a443d2e684e2c4eeeafc0cae068a485baf86fad2',
	resave: false,
	saveUninitialized: true,
}));
// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Load config
dotenv.config({
	path: './config/config.env'
});

// Connect to the database
connectDB();

// require mustache
const mustache = require("mustache-express");
app.engine("mustache", mustache());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));

// require routes
const indexRoutes = require("./routes/indexRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const routes404 = require("./routes/404Routes");
const authRoutes = require("./routes/authRoutes");
const eventPageRoutes = require("./routes/eventPageRoutes");
const contactRoutes = require("./routes/contactRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const alumniRoutes = require("./routes/alumniRoutes");

// user routes
const userRoutes = require("./routes/backendroutes/userRoutes");
// event routes
const eventRoutes = require("./routes/backendroutes/eventRoutes");



// middleware
const public = path.join(__dirname, "public");
app.use(express.static(public));
// Bodyparser
app.use(express.urlencoded({
	extended: false
}));
app.use(express.json());

// views routing
app.use("/", indexRoutes);
app.use("/about", aboutRoutes);
app.use("/404", routes404);
app.use("/auth", authRoutes);
app.use("/eventPage", eventPageRoutes);
app.use("/contact", contactRoutes);
app.use("/dashboard", isAuthenticated, dashboardRoutes);
app.use("/admin", isAuthenticated, userRoutes); // use user routes"
app.use("/alumni-event", isAuthenticated, eventRoutes); // use event routes"
app.use("/alumni", isAuthenticated, alumniRoutes);


// Routes
const PORT = process.env.PORT || 3000;

// Server start
app.listen(PORT, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
