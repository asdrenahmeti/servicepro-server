const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const modRating = require("./../models/Rating");
const modUser = require("./../models/User");
const sequelize = require("./../db/db_connection");
const { resetPassword } = require("./auth");

// rate user
exports.rateUser = catchAsync(async (req, res, next) => {
  const master = await modUser.findOne({
    where: {
      id: req.body.masterId,
    },
  });
  if (req.body.masterId === req.user.id) {
    return next(new AppError("You can't rate yourself!", 400));
  }
  if (!master) {
    return next(new AppError("This master does not exist!", 400));
  }
  const newRate = await modRating.create({ ...req.body, guestId: req.user.id });
  res.status(201).json({
    status: "succes",
    data: newRate,
  });
});

// average rate for users
exports.getAverageRatingForUsers = catchAsync(async (req, res, next) => {
  const userRatings = await modRating.findAll({
    attributes: [
      "masterId",
      [sequelize.fn("count", sequelize.col("rating_value")), "reviews"],
      [sequelize.fn("avg", sequelize.col("rating_value")), "rating"],
    ],
    group: ["masterId"],
    include: [
      {
        model: modUser,
        as: "master",
        attributes: {
          exclude: [
            "password",
            "passwordResetToken",
            "passwordResetExpires",
            "createdAt",
            "updatedAt",
          ],
        },
      },
    ],
  });
  res.status(200).json({
    status: "success",
    data: userRatings,
  });
});

// average rate based on id
exports.getAverageByMasterId = catchAsync(async (req, res, next) => {
  const userRatings = await modRating.findAll({
    where: {
        masterId: req.params.id
    },
    attributes: [
      "masterId",
      [sequelize.fn("count", sequelize.col("rating_value")), "reviews"],
      [sequelize.fn("avg", sequelize.col("rating_value")), "rating"],
    ],
    // group: ["masterId"],
    include: [
      {
        model: modUser,
        as: "master",
        attributes: {
          exclude: [
            "password",
            "passwordResetToken",
            "passwordResetExpires",
            "createdAt",
            "updatedAt",
          ],
        },
      },
    ],
  });
  res.status(200).json({
    status: "success",
    data: userRatings,
  });
});
