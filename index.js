const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose"); // require mongoose
const flash = require('flash-express');// require flash
 const session = require('express-session');// require session


// require mustache
const mustache = require("mustache-express");
app.engine("mustache", mustache());
app.set("view engine", "mustache");
app.set("views", path.join(__dirname, "views"));


// Connect to MongoDB
const dbURI = "mongodb+srv://admin:admin123@cluster0.hfjrzyh.mongodb.net/Alumi?retryWrites=true&w=majority";
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        console.log("Connected to the database.");
        // Add your server start code here
        app.listen(3000, () => console.log("Server started and running on port 3000"));
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
    });



// require routes
const landingRoutes = require("./routes/landingRoutes");
const indexRoutes = require("./routes/indexRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const authRoutes = require("./routes/authRoutes");
const connectRoutes = require("./routes/connectRoutes");
const contactRoutes = require("./routes/contactRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");


//user routes
const userRoutes = require("./routes/backendroutes/userRoutes");
//event routes
const eventRoutes = require("./routes/backendroutes/eventRoutes");

//middleware
const public = path.join(__dirname, "public");
app.use(express.static(public));
//json format and ulr encoded data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//flash middleware
app.use(flash());

//session middleware
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
}));




//views routing
app.use("/", landingRoutes);
app.use("/index", indexRoutes);
app.use("/about", aboutRoutes);
app.use("/auth", authRoutes);
app.use("/connect", connectRoutes);
app.use("/contact", contactRoutes);
app.use("/dashboard", dashboardRoutes);


app.use("/admin", userRoutes); // use user routes"
app.use("/alumni-event", eventRoutes); // use event routes"






