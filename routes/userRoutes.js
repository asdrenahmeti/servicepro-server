const express = require("express");
const router = express.Router();
const {
  rateUser,
  getAverageRatingForUsers,
  getAverageByMasterId,
} = require("../controllers/userRating");

const { protect, restrictTo } = require("./../controllers/auth");


router.post("/rateUser",protect, rateUser)
router.get("/getRatingsForUsers", getAverageRatingForUsers)
router.get("/getRatingsForUser/:id", getAverageByMasterId);


module.exports = router;