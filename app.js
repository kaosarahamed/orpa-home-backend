const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const landLordRoute = require("./routes/landlord");
const rentRoute = require("./routes/rentRoute");
const rentPaymentRoute = require("./routes/rentPaymentRoute");
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "choiceapps", // Replace with a strong and secure secret
    resave: false,
    saveUninitialized: true,
  })
);
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/landlord", landLordRoute);
app.use("/rent", rentRoute);
app.use("/", rentPaymentRoute);

// Home Route
app.get("/", (req, res) => {
  res.send("Home Route");
});

// Route Not Found Errror
app.use((req, res, next) => {
  res.send("Route not exist");
});

// Server Error
app.use((req, res, next, err) => {
  if (err) {
    res.send(err);
  } else {
    res.send("server error");
  }
});

module.exports = app;
