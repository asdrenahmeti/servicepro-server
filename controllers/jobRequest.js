const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");
const sequelize = require("./../db/db_connection");
const { transaction } = require("../db/db_connection");
const modJobRequest = require("./../models/Job_request");
const modUser = require("./../models/User");
const sendEmail = require("./../utils/email");

exports.requestJob = catchAsync(async (req, res, next) => {
  const user = await modUser.findOne({
    where: {
      id: req.body.userId,
    },
  });
  if (!user) {
    return next(new AppError("There is no user with this id", 400));
  }
  const newRequest = await modJobRequest.create(req.body);
  try {
    await sendEmail({
      from: req.body.email,
      to: user.email,
      subject: "New job request",
      text: `Pune e re`,
      html: `<h1>${req.body.title}</h1>
      <br>
      <p>
        ${req.body.description}
      </p>
      `,
    });
  } catch (error) {
    // return next(new AppError("There was an error sending the email", 500));
    return next(new AppError(error, 500));
  }
  res.status(200).json({
    status: "success",
    message: "Email sent successfuly!",
  });
});

exports.requestJobsByUserId = catchAsync(async (req, res, next) => {
  const userId = req.params.id;
  const userReuqest = await modJobRequest.findAll({
    where: {
      userId,
    },
  });
  res.status(200).json({
    status: "success",
    data: userReuqest,
  });
});

exports.acceptJobRequest = catchAsync(async (req, res, next) => {
  const jobRequestId = req.params.id;
  const jobRequest = await modJobRequest.findOne({
    where: {
      id: jobRequestId,
      status: "PENDING",
    },
  });
  if (!jobRequest) {
    return next(new AppError("This job request not exist", 400));
  }
  if (jobRequest.userId !== req.user.id) {
    return next(
      new AppError(
        "This job request is not yours, you can not accept / reject it",
        400
      )
    );
  }
  jobRequest.status = "DONE";
  await jobRequest.save();
  try {
    await sendEmail({
      from: req.user.email,
      to: jobRequest.email,
      subject: "New job request",
      message: `Kerkesa jote u pranu`,
    });
  } catch (error) {
    // return next(new AppError("There was an error sending the email", 500));
    return next(new AppError(error, 500));
  }

  res.status(200).json({
    status: "success",
    message: "The work has been successfully accepted",
    data: jobRequest,
  });
});

exports.declineJobRequest = catchAsync(async (req, res, next) => {
  const jobRequestId = req.params.id;
  const jobRequest = await modJobRequest.findOne({
    where: {
      id: jobRequestId,
      status: "PENDING",
    },
  });
  if (!jobRequest) {
    return next(new AppError("This job request not exist", 400));
  }
  if (jobRequest.userId !== req.user.id) {
    return next(
      new AppError(
        "This job request is not yours, you can not accept / reject it",
        400
      )
    );
  }
  jobRequest.status = "DECLINE";
  await jobRequest.save();

  try {
    await sendEmail({
      from: req.user.email,
      to: jobRequest.email,
      subject: "New job request",
      message: `Kerkesa jote u refuzua`,
    });
  } catch (error) {
    return next(new AppError("There was an error sending the email", 500));
    // return next(new AppError(error, 500));
  }
  res.status(200).json({
    status: "success",
    message: "The work has been successfully declined",
    data: jobRequest,
  });
});
