const express = require("express");
const router = express.Router();
const {
  createWorkItem,
  findAllWorkItems,
  findWorkItemById,
  updateWorkItem,
  deleteWorkItem,
} = require("../controllers/workItemController");

const { authenticate, authorize } = require("../middlewares/authMiddleware");

const {
  validateWorkItem,
} = require("../middlewares/schemaValidations/workItemValidation");

const { asyncErrorWrapper } = require("../middlewares/errorHandler");

// create a new workitem
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateWorkItem,
  asyncErrorWrapper(createWorkItem)
);

// get a single workitem
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findWorkItemById)
);

// get all workitems
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findAllWorkItems)
);

// update a workitem
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateWorkItem,
  asyncErrorWrapper(updateWorkItem)
);

// delete a workitem
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(deleteWorkItem)
);

module.exports = router;
