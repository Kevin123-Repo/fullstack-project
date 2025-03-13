const express = require("express");
const { signup, login, logout, session } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/session", session)

module.exports = router;
