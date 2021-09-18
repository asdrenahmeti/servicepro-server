var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var multer = require("multer");


const Sequelize = require("sequelize");
const sequelize = require("./db/db_connection");
// "start": "node ./bin/www"

// import Models
const modService = require("./models/Service")
const modUser = require("./models/User");
const modUserService = require("./models/User_service");
const modComment = require("./models/Comment");
const modRating = require("./models/Rating");
const modSubscribe = require("./models/Subscribe");
const modJob = require("./models/Job");
const modJobRequest = require("./models/Job_request");
const modJobImage = require("./models/Job_image");
const User = require("./models/User");



// import middleweares

var app = express();





sequelize.sync({
  force:true
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.get("/user", (req, res) => {
  User.create({
    username: "bini",
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      res.send(err);
    });
});
module.exports = app;
