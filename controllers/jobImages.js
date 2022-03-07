const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");

const modJobImage = require("./../models/Job_image");

const { Op } = require("sequelize");

exports.getImageById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const image = await modJobImage.findOne({ where: { id } });
  if (!image) {
    return next(new AppError("There is no images", 404));
  }
  return res.status(200).json({
    status: "success",
    data: image,
  });
});
exports.deleteImageById = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const image = await modJobImage.findOne({ where: { id } });
  if (!image) {
    return next(new AppError("There is no images", 404));
  }
  const deletedImage = await image.destroy()
  return res.status(200).json({
    status: "success",
    data: deletedImage.id,
  });
});
exports.getProjectImages = catchAsync(async (req, res, next) => {
  const jobId = req.params.id;
  const images = await modJobImage.findAll({ where: { jobId } });
  if (!images.length) {
    return next(new AppError("There is no images", 404));
  }
  return res.status(200).json({
    status: "success",
    data: images,
  });
});

