const express = require("express");
const path = require("path");
const app = express();

const mustache = require("mustache-express");
app.engine("mustache", mustache());
app.set("view engine", "mustache");


// require backend routes
const userBackendRoutes = require("./routes/backendroutes/userRoutes");

// require routes
const landingRoutes = require("./routes/landingRoutes");
const indexRoutes = require("./routes/indexRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const connectRoutes = require("./routes/connectRoutes");
const contactRoutes = require("./routes/contactRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");


const public = path.join(__dirname, "public");
app.use(express.static(public));
//json format and ulr encoded data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//views routing
app.use("/", landingRoutes);
app.use("/index", indexRoutes);
app.use("/about", aboutRoutes);
app.use("/event", eventRoutes);
app.use("/auth", authRoutes);
app.use("/connect", connectRoutes);
app.use("/contact", contactRoutes);
app.use("/dashboard", dashboardRoutes);

//users database router/...
app.use("/users", userBackendRoutes);   



app.listen(3000, () => console.log(`server started and running on port 3000`));