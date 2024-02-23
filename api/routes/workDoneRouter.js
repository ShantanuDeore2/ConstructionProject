const express = require("express");
const router = express.Router();
const {
  createWorkDone,
  findAllWorkDones,
  findWorkDoneById,
  updateWorkDone,
  deleteWorkDone,
} = require("../controllers/workDoneController");

const { authenticate, authorize } = require("../middlewares/authMiddleware");

const {
  validateWorkDone,
} = require("../middlewares/schemaValidations/workDoneValidation");

const { asyncErrorWrapper } = require("../middlewares/errorHandler");

// create a new workdone
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateWorkDone,
  asyncErrorWrapper(createWorkDone)
);

// get a single workdone
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findWorkDoneById)
);

// get all workdones
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findAllWorkDones)
);

// update a workdone
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateWorkDone,
  asyncErrorWrapper(updateWorkDone)
);

// delete a workdone
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(deleteWorkDone)
);

module.exports = router;
