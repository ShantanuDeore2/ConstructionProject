const express = require("express");
const router = express.Router();
const { login } = require("../controllers/loginController");
const { asyncErrorWrapper } = require("../middlewares/errorHandler");
// Login
router.post("/", asyncErrorWrapper(login));
module.exports = router;
