const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");

const modService = require("./../models/Service");
const modUser = require("./../models/User");
const modUserServices = require("./../models/User_service");

const { Op } = require("sequelize");
const sequelize = require("sequelize");

exports.getAllServices = catchAsync(async (req, res, next) => {
  const services = await modService.findAll();
  if (!services.length) {
    return next(new AppError("There is no service", 404));
  }
  res.status(200).json({
    status: "success",
    data: services,
  });
});

exports.store = catchAsync(async (req, res, next) => {
  const service = await modService.create(req.body);
  res.status(201).json({
    status: "success",
    data: service,
  });
});

exports.remove = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const service = await modService.findOne({
    where: {
      id,
    },
  });
  if (!service) {
    return next(new AppError("There is no service with this id", 404));
  }
  await service.destroy();
  res.status(200).json({
    status: "success",
    message: "Service was deleted successfully!",
  });
});
exports.edit = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const service = await modService.findOne({
    where: {
      id,
    },
  });
  if (!service) {
    return next(new AppError("There is no service with this id", 404));
  }
  await service.update(req.body);
  res.status(200).json({
    status: "success",
    message: "Service was updated successfully!",
    data: service,
  });
});

exports.getUsersByServicesAndCities = catchAsync(async (req, res, next) => {
  const services = req.body.services || [];
  const cities = req.body.cities || [];

  const users = await modUserServices.findAll({
    where: {
      serviceId: {
        [Op.or]: services,
      },
    },
    include: {
      model: modUser,
      where: {
        city: {
          [Op.or]: cities,
        },
      },
    },
  });
  res.status(200).json({
    status: "success",
    data: users,
  });
});

exports.getTop5 = catchAsync(async (req, res, next) => {
  const servicesIds = await modUserServices
    .findAll({
      attributes: [
        "serviceId",
        [sequelize.fn("COUNT", sequelize.col("serviceId")), "count_services"],
      ],
      group: "serviceId",
      order: [[sequelize.col("count_services"), "DESC"]],
      limit: 5,
    })
    .map((item) => item.serviceId);

  const services = await modService.findAll({
    where: {
      id: {
        [sequelize.Op.in]: servicesIds,
      },
    },
    include: {
      model: modUser,
      attributes: ["name", "city", "country", "phone", "img_url"],
    },
  });

  res.status(200).json({
    status: "success",
    data: services,
  });
});
