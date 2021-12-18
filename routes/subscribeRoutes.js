const express = require("express");
const { protect } = require("../controllers/auth");
const { getCheckoutSession } = require("../controllers/subscribeController");
const router = express.Router();


router.get("/checkout-session", protect, getCheckoutSession)
router.get("/success", protect, (req, res)=>{
    res.send("sukses")
})
router.get("/fail", protect, (req, res) => {
  res.send("deshtim");
});

module.exports = router;
