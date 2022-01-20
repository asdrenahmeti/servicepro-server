const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("./../controllers/auth");
const {
  getAllServices,
  store,
  remove,
  edit,
} = require("./../controllers/services");

router.delete("/:id", protect, remove);
router.patch("/:id", protect, edit);
router.get("/", protect, getAllServices);
router.post("/", protect, store);

module.exports = router;
