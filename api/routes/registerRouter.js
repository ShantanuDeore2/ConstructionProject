const express = require("express");
const router = express.Router();
const { register } = require("../controllers/registerController");
const { asyncErrorWrapper } = require("../middlewares/errorHandler");
router.post("/", asyncErrorWrapper(register));
module.exports = router;
