var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var multer = require("multer");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");

const Sequelize = require("sequelize");
const sequelize = require("./db/db_connection");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorControllers");
const catchAsync = require("./utils/catchAsync");
var cors = require("cors");

// import middleweares
var app = express();
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: "To many request from this IP, please try again in an hour!",
});

const swaggerDocument = YAML.load("./utils/swagger.yaml");

// view engine setup
app.use(cors());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use("/api", limiter);
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

// import Routes
const userRoutes = require("./routes/userRoutes");
const auth = require("./routes/auth");
const subscribeRoutes = require("./routes/subscribeRoutes");
const servicesRoutes = require("./routes/servicesRoutes");

app.use("/documentation", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use("/api/user", userRoutes);
app.use("/api/subscribe", subscribeRoutes);
app.use("/api/services", servicesRoutes);
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

sequelize.sync({
  force: false,
});
module.exports = app;
