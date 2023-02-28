const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require("passport");
const app = express();
const PORT = 4000;
const DB_NAME = "JobsPlanet"

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/users.routes");
var JobRouter = require("./routes/job.routes");
var ApplicationRouter = require("./routes/application.routes");

app.use(cors());
// Body-Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
// To localhost
mongoose.connect('mongodb+srv://Ankur:1234@nodeprojects.sv0tc.mongodb.net/Jobs?retryWrites=true&w=majority', { useNewUrlParser: true,
useUnifiedTopology: true,
useCreateIndex: true,
useFindAndModify: true, });
const connection = mongoose.connection;


connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.get("/",(req,res)=>{
res.send("Hello");
})

app.use("/api/testAPI", testAPIRouter);
app.use("/api/user", UserRouter);
app.use("/api/job", JobRouter);
app.use("/api/application", ApplicationRouter);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});