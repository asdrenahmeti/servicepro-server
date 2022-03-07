const AppError = require("./../utils/appError");
const catchAsync = require("../utils/catchAsync");
const multer = require("multer");
const sharp = require("sharp");
const sequelize = require("./../db/db_connection");
const { transaction } = require("../db/db_connection");
const modJob = require("./../models/Job");
const modJobImage = require("./../models/Job_image");

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

exports.uploadProjectPhotos = upload.fields([
  {
    name: "img_url",
    maxCount: 10,
  },
]);

exports.resizeProjectPhotos = catchAsync(async (req, res, next) => {
  if (!req.files.img_url) return next();
  req.body.img_url = [];
  await Promise.all(
    req.files.img_url.map(async (file, i) => {
      const filename = `project-${req.user.id}-${Date.now()}-${i + 1}.jpeg`;
      await sharp(file.buffer)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/img/work/${filename}`);

      req.body.img_url.push({img_url: filename});
    })
  );
  next();
});

exports.addNewProject = catchAsync(async (req, res, next) => {
  const t = await sequelize.transaction(); 
  if (!req.body.img_url) return next(new AppError("The project must have at least one photo", 400));
  try {
    const project = await modJob.create(
      { ...req.body, userId: req.user.id },
      { transaction: t }
    );
    
    const jobImageObj = await req.body.img_url.map((next) => {
      return { ...next, jobId: project.id };
    });
    
    const project_images = await modJobImage.bulkCreate(jobImageObj, {
      transaction: t,
    });

    t.commit();
    res.status(200).json({
      status: "success",
      data: project,
      images: req.body.img_url,
    });
  } catch (error) {
    await t.rollback();
    return next(new AppError(error, 400));
  }
});

exports.getMyProjects = catchAsync(async (req, res, next) => {
  const page = req.query.page;
  const numberOfRecords = await modJob.count();
  const totalPages = Math.ceil(numberOfRecords / 10);
  const data = await modJob.findAll({
    where: { userId: req.user.id },
    offset: (page - 1) * 10,
    limit: 10,
    // attributes: ["id", "title", "description", "price"],
    include: [
      {
        model: modJobImage,
        attributes: ["img_url"],
      },
    ],
  });

  res.status(200).json({
    status: "success",
    info: {
      totalPages,
      currentPage: parseInt(page),
      hasMore: totalPages > parseInt(page),
    },
    data,
  });
});

exports.removeProjectById = catchAsync(async (req, res, next) => {
  const project = await modJob.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!project) {
    return next(new AppError("There is no project with this Id", 400));
  }
  if (project.userId !== req.user.id) {
    return next(new AppError("You can only delete your projects", 400));
  }
  const removed = await project.destroy();
  res.status(200).json({
    status: "success",
    message: "The project was successfully deleted",
    project: removed
  });
});
