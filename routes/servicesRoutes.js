const express = require("express");
const { getUsersByService } = require("../controllers/userControllers");
const router = express.Router();
const { protect, restrictTo } = require("./../controllers/auth");
const {
  getAllServices,
  store,
  remove,
  edit,
  getUsersByServicesAndCities,
  getTop5
} = require("./../controllers/services");

router.get("/top5", getTop5)
router.post("/users", getUsersByServicesAndCities);
router.get("/:id/users", protect, getUsersByService);
router.delete("/:id", protect, remove);
router.patch("/:id", protect, edit);
router.get("/", getAllServices);
router.post("/", protect, store);

module.exports = router;
