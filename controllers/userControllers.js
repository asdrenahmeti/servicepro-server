const modUser = require("./../models/User");
const modService = require("./../models/Service");
const modUserService = require("./../models/User_service");
const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const sharp = require("sharp");
const { update } = require("../models/Service");
const { Op } = require("sequelize");
const fs = require("fs");
const User = require("./../models/User");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("img_url");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/img/users/${req.file.filename}`);
  next();
});

exports.getUserDetails = catchAsync(async (req, res, next) => {
  const user = await modUser.findOne({
    where: {
      id: req.user.id,
    },
    attributes: {
      exclude: ["password", "passwordResetToken", "passwordResetExpires"],
    },
  });
  res.status(200).json({
    status: "success",
    data: user,
  });
});

exports.updateUserData = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.confirmPassword) {
    return next(new AppError("This route is not for password updates.", 400));
  }
  const user = await modUser.findOne({
    where: {
      id: req.user.id,
    },
  });
  const updatedUser = await user.update({
    ...user,
    ...req.body,
  });
  if (req.file) {
    if(updatedUser.img_url !== "default.jpg"){fs.unlink(updatedUser.img_url)}
    updatedUser.img_url = req.file.filename;
    await updatedUser.save();
  }
  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

exports.deactiveUser = catchAsync(async (req, res, next) => {
  const user = await modUser.findOne({
    where: {
      id: req.user.id,
    },
  });
  user.active = false;
  await user.save();
  res.status(200).json({
    status: "success",
    message: "Your account has been deactivated!",
  });
});

exports.myServices = catchAsync(async (req, res, next) => {
  const services = await modUserService.findAll({
    where: {
      userId: req.user.id,
    },
    attributes: ["userId", "serviceId"],
    include: [{ model: modService, attributes: ["name"] }],
  });
  res.status(200).json({
    status: "success",
    data: services,
  });
});

exports.addNewService = catchAsync(async (req, res, next) => {
  const newServiceId = req.body.serviceId;
  const service = await modService.findOne({
    where: {
      id: newServiceId,
    },
  });
  if (!service) {
    return next(new AppError("this service does not exist", 400));
  }
  const newService = await modUserService.create({
    userId: req.user.id,
    serviceId: newServiceId,
  });
  res.status(201).json({
    status: "success",
    data: newService,
  });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await modUser.findAll({
    where: {
      [Op.or]: [{ role: "INDIVID" }, { role: "COMPANY" }],
      active: true,
    },
    attributes: {
      exclude: ["password", "passwordResetToken", "passwordResetExpires"],
    },
  });
  if (!users) {
    return next(new AppError("No Users found", 404));
  }
  res.status(200).json({
    status: "success",
    data: users,
  });
});

exports.getUsersByService = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const users = await modUser.findAll({
    where: {
      [Op.or]: [{ role: "INDIVID" }, { role: "COMPANY" }],
      active: true,
    },
    attributes: {
      exclude: ["password", "passwordResetToken", "passwordResetExpires"],
    },
    include: {
      model: modService,
      where: {
        id,
      },
    },
  });
  if (!users) {
    return next(new AppError("No Users found", 404));
  }
  res.status(200).json({
    status: "success",
    data: users,
  });
});

exports.profileById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user =  await User.findOne({
    where:{
      id
    }
  })
  res.status(200).json({
    status: "success",
    data: user,
  });
});