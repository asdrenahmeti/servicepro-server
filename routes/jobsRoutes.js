const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("./../controllers/auth");
const { getAllJobs, store, remove, edit } = require("./../controllers/jobs");

router.delete("/:id", protect, remove);
router.patch("/:id", protect, edit);
router.get("/", protect, getAllJobs);
router.post("/", protect, store);

module.exports = router;
