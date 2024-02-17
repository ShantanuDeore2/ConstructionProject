const express = require("express");
const router = express.Router();
const workItemController = require("../controllers/workItemController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateWorkItem,
} = require("../middlewares/schemaValidations/workItemValidation");

// create a new workItem
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateWorkItem,
  workItemController.createSingleDocument
);

// get a single workItem
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  workItemController.readSingleDocument
);

// get all workItems
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  workItemController.readAllDocuments
);

// update a workItem
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateWorkItem,
  workItemController.updateSingleDocument
);

// delete a workItem
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  workItemController.deleteSingleDocument
);

module.exports = router;
