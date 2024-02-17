const express = require("express");
const router = express.Router();
const workTypeController = require("../controllers/workTypeController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateWorkType,
} = require("../middlewares/schemaValidations/workTypeValidation");

// create a new workType
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateWorkType,
  workTypeController.createSingleDocument
);

// get a single workType
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  workTypeController.readSingleDocument
);

// get all workTypes
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  workTypeController.readAllDocuments
);

// update a workType
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateWorkType,
  workTypeController.updateSingleDocument
);

// delete a workType
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  workTypeController.deleteSingleDocument
);

module.exports = router;
