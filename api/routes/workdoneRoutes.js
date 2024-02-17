const express = require("express");
const router = express.Router();
const workDoneController = require("../controllers/workDoneController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateWorkDone,
} = require("../middlewares/schemaValidations/workDoneValidation");

// create a new workDone
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateWorkDone,
  workDoneController.createSingleDocument
);

// get a single workDone
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  workDoneController.readSingleDocument
);

// get all workDones
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  workDoneController.readAllDocuments
);

// update a workDone
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateWorkDone,
  workDoneController.updateSingleDocument
);

// delete a workDone
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  workDoneController.deleteSingleDocument
);

module.exports = router;
