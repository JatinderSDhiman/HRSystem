const express = require("express");
const auth = require("../controllers/auth-api-controller");

const router = express.Router();

router.post("/register", auth.register);
router.post("/login", auth.logIn);
router.post("/logout", auth.logOut);

module.exports = router;
