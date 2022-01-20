const express = require("express");
const multer = require("multer");
const router = express.Router();
const { protect, restrictTo } = require("./../controllers/auth");
const {
  updateUserData,
  uploadUserPhoto,
  resizeUserPhoto,
  deactiveUser,
  myServices,
  addNewService,
  getUserDetails,
  getAllUsers,
} = require("../controllers/userControllers");
const {
  rateUser,
  getAverageRatingForUsers,
  getAverageByMasterId,
  getAllUserReviews,
} = require("../controllers/userRating");
const {
  addNewProject,
  uploadProjectPhotos,
  resizeProjectPhotos,
  getMyProjects,
  removeProjectById,
} = require("../controllers/userProjects");
const {
  requestJob,
  requestJobsByUserId,
  acceptJobRequest,
  declineJobRequest,
} = require("../controllers/jobRequest");

const upload = multer({ dest: "public/img/users" });

// User Ratings
router.post("/rateUser", protect, rateUser);
router.get("/getRatingsForUsers", getAverageRatingForUsers);
router.get("/getRatingsForUser/:id", getAverageByMasterId);
router.get("/getAllReviews/:id", getAllUserReviews);

// User Profile
router.get("/", getAllUsers);
router.get("/profile", protect, getUserDetails);
router.patch(
  "/updateProfile",
  protect,
  uploadUserPhoto,
  resizeUserPhoto,
  updateUserData
);
router.delete("/deactivateProfile", protect, deactiveUser);
router.get("/myServices", protect, myServices);
router.post("/addNewUserService", protect, addNewService);


// User projects
router.post(
  "/addNewProject",
  protect,
  uploadProjectPhotos,
  resizeProjectPhotos,
  addNewProject
);
router.get("/getMyProjects", protect, getMyProjects);
router.delete("/post/:id", protect, removeProjectById);

// Job Request
router.post("/newRequest", requestJob);
router.get("/requestJobs/:id", requestJobsByUserId);
router.patch("/acceptJob/:id", protect, acceptJobRequest);
router.patch("/declineJob/:id", protect, declineJobRequest);

module.exports = router;
