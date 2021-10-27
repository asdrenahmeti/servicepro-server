const bcrypt = require("bcrypt");
const { promisify } = require("util");
const JWT = require("jsonwebtoken");
require("dotenv").config();
const catchAsync = require("./../utils/catchAsync");
const showValidatorResult = require("./../validators/showValidatorResult");
const userValidator = require("./../validators/user_validator");
const modUser = require("./../models/User");
const AppError = require("./../utils/appError");
const crypto = require("crypto");
const sendEmail = require("./../utils/email");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const createSendToken = (user, status, res) => {
  const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET);
  res.status(status).json({
    status: "success",
    token,
    user,
  });
};

exports.register = catchAsync(async (req, res, next) => {
  // let validatorRes = showValidatorResult(req.body, userValidator);
  // if (!validatorRes.is_valid) {
  //   return res.status(400).json({
  //     status: "fail",
  //     message: validatorRes.errors,
  //   });
  // }

  let { password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    return next(new AppError("Password did not match!", 400));
  }
  const hashPassword = bcrypt.hashSync(password, 12);
  let user = await modUser.create({ ...req.body, password: hashPassword });
  user.password =undefined
  user.active=undefined
  createSendToken(user, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    console.log("Exist");
    return next(new AppError("Please provide email and password!", 400));
  }
  const user = await modUser.findOne({
    where: {
      email: email,
    },
  });
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return next(new AppError("Incorrent email or password", 401));
  }
  if (!user.active) {
    return next(new AppError("Account is not active!", 401));
  }
  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }
  const decoded = await promisify(JWT.verify)(token, process.env.JWT_SECRET);
  const currentUser = await modUser.findOne({
    where: {
      id: decoded.id,
    },
  });
  if (!currentUser) {
    return next(
      new AppError("The user belonging this token does no longer exist.")
    );
  }
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this acion", 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await modUser.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    return next(new AppError("There is no user with email adress.", 404));
  }
  const resetToken = crypto.randomBytes(32).toString("hex");

  user.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  await user.save();

  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/resetPassword/${resetToken}`;
  const message = `Forgot password? Reset your password in url: ${resetUrl}`;
  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token",
      message,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();
    return next(new AppError("There was an error sending the email", 500));
  }

  res.status(200).json({
    status: "success",
    message: "Token sent to email! (Valid for 10 min)",
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await modUser.findOne({
    where: {
      passwordResetToken: hashedToken,
      passwordResetExpires: {
        [Op.gt]: Date.now(),
      },
    },
  });
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new AppError("Please confirm password!", 400));
  }
  user.password = bcrypt.hashSync(req.body.password, 12);
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  createSendToken(user, 200, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  let { oldPassword, newPassword, confirmPassword } = req.body;
  if (!oldPassword || !newPassword || !newPassword) {
    return next(
      new AppError("Please provide old password and new password!", 400)
    );
  }
  if (newPassword !== confirmPassword) {
    return next(new AppError("Passwords are not the same!", 400));
  }
  const user = await modUser.findOne({
    where: {
      id: req.user.id,
    },
  });
  if (!bcrypt.compareSync(oldPassword, user.password)) {
    return next(new AppError("Old password it's not correct!", 400));
  }
  createSendToken(user, 200, res);
});
