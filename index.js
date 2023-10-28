const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose"); // require mongoose
const Event = require("./models/eventModel"); // require event model
const exphbs = require("express-handlebars"); // require express-handlebars


// require mustache
const mustache = require("mustache-express");
app.engine("mustache", mustache());
app.set("view engine", "mustache");

// require handlebars
app.set("views", path.join(__dirname, "/views/"));
app.engine("hbs", exphbs({ extname: "hbs", defaultLayout: "mainLayout", layoutsDir: __dirname + "/views/layouts" }));
app.set("view engine", "hbs");


// require backend routes
// const userBackendRoutes = require("./routes/backendroutes/userRoutes");

// connect to mongodb 
const dbURI = "mongodb+srv://admin:admin123@cluster0.hfjrzyh.mongodb.net/eventDB?retryWrites=true&w=majority"
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000, () => console.log(`server started and running on port 3000`)))
    .catch((err) => console.log(err));


//event controller
const eventController = require("./controllers/eventController");



// require routes
const landingRoutes = require("./routes/landingRoutes");
const indexRoutes = require("./routes/indexRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const authRoutes = require("./routes/authRoutes");
const connectRoutes = require("./routes/connectRoutes");
const contactRoutes = require("./routes/contactRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

//middleware
const public = path.join(__dirname, "public");
app.use(express.static(public));
//json format and ulr encoded data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



//views routing
app.use("/", landingRoutes);
app.use("/index", indexRoutes);
app.use("/about", aboutRoutes);
app.use("/auth", authRoutes);
app.use("/connect", connectRoutes);
app.use("/contact", contactRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/all-event", eventController);

//users database router/...
// app.use("/users", userBackendRoutes);



// app.listen(3000, () => console.log(`server started and running on port 3000`));