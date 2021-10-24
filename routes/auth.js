const express =  require("express")
const router = express.Router()
const {
  register,
  login,
  protect,
  restrictTo,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require("./../controllers/auth");

router.post("/register",register)
router.post("/login", login);
router.post("/forgotPassword", forgotPassword );
router.patch("/resetPassword/:token", resetPassword);
router.patch("/updateMyPassword",protect, updatePassword);


router.get("/protect",protect,(req, res)=>{
    res.send("OK")
})
router.get("/restrict", protect, restrictTo("ADMIN"), (req, res) => {
  res.send("OK");
});


module.exports = router


