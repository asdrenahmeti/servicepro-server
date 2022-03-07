const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("./../controllers/auth");
const {
  getProjectImages,
  getImageById,
  deleteImageById,
} = require("./../controllers/jobImages");

router.delete("/:id", protect, deleteImageById);
router.patch("/:id", protect);
router.get("/project/:id", protect, getProjectImages);
router.get("/:id", protect, getImageById);
router.post("/", protect);

module.exports = router;
