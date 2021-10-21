var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var multer = require("multer");
const bcrypt = require("bcrypt");

const Sequelize = require("sequelize");
const sequelize = require("./db/db_connection");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorControllers");
const catchAsync = require("./utils/catchAsync");
// "start": "node ./bin/www"

// import middleweares
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/public", express.static(path.join(__dirname, "public")));

// import Models
const modService = require("./models/Service");
const modUser = require("./models/User");
const modUserService = require("./models/User_service");
const modComment = require("./models/Comment");
const modRating = require("./models/Rating");
const modSubscribe = require("./models/Subscribe");
const modJob = require("./models/Job");
const modJobRequest = require("./models/Job_request");
const modJobImage = require("./models/Job_image");
// TEST MODEL
const showValidatorResult = require("./validators/showValidatorResult");
const userValidator = require("./validators/user_validator");
const auth = require("./routes/auth");
const { protect } = require("./controllers/auth");

app.post("/adduser", (req, res) => {
  console.log("REQQQQ: ", req.body);

  let validatorRes = showValidatorResult(req.body, userValidator);
  if (!validatorRes.is_valid) {
    res.send(validatorRes.errors);
    return;
  }
  res.send("mire");
});

// import Routes



app.use("/api", auth);
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

sequelize.sync({force: true});
module.exports = app;
