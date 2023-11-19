const express = require("express");
const path = require("path");
const app = express();
const dotenv = require('dotenv'); // require dotenv
const connectDB = require('./config/util'); // require connectDB
const flash = require('flash-express'); // require flash
const session = require('express-session'); // require session
require('events').EventEmitter.defaultMaxListeners = 15; // or a higher value






// Load config
dotenv.config({ path:'./config/config.env' });

// Connect to the database
connectDB();

// require mustache
const mustache = require("mustache-express");
app.engine("mustache", mustache());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));

// require routes
const landingRoutes = require("./routes/landingRoutes");
const indexRoutes = require("./routes/indexRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const authRoutes = require("./routes/authRoutes");
const eventPageRoutes = require("./routes/eventPageRoutes");
const contactRoutes = require("./routes/contactRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

// user routes
const userRoutes = require("./routes/backendroutes/userRoutes");
// event routes
const eventRoutes = require("./routes/backendroutes/eventRoutes");

// middleware
const public = path.join(__dirname, "public");
app.use(express.static(public));
// JSON format and URL-encoded data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// flash middleware
app.use(flash());

// session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));

// views routing
app.use("/", landingRoutes);
app.use("/index", indexRoutes);
app.use("/about", aboutRoutes);
app.use("/auth", authRoutes);
app.use("/eventPage", eventPageRoutes);
app.use("/contact", contactRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/admin", userRoutes); // use user routes"
app.use("/alumni-event", eventRoutes); // use event routes"

// Routes
const PORT = process.env.PORT || 3000;

// Server start
app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
