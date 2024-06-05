var express = require("express");
const { loginUser, registerUser } = require("../controllers/userController");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/signIn", loginUser);
//register
router.post("/register", registerUser);

module.exports = router;
