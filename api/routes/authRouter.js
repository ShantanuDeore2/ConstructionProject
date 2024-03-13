const express = require("express");
const router = express.Router();
const { login, refresh, logout } = require("../controllers/authController");
const { asyncErrorWrapper } = require("../middlewares/errorHandler");
// Login
router.post("/login", asyncErrorWrapper(login));
// Refresh token
router.get("/refresh", asyncErrorWrapper(refresh));
// Logout
router.post("/logout", asyncErrorWrapper(logout));

module.exports = router;
