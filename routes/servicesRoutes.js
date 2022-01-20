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
} = require("./../controllers/services");

router.post("/users", protect, getUsersByServicesAndCities);
router.get("/:id/users", protect, getUsersByService);
router.delete("/:id", protect, remove);
router.patch("/:id", protect, edit);
router.get("/", protect, getAllServices);
router.post("/", protect, store);

module.exports = router;
