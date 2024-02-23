const express = require("express");
const router = express.Router();
const {
  createInventory,
  findAllInventorys,
  findInventoryById,
  updateInventory,
  deleteInventory,
} = require("../controllers/inventoryController");

const { authenticate, authorize } = require("../middlewares/authMiddleware");

const {
  validateInventory,
} = require("../middlewares/schemaValidations/inventoryValidation");

const { asyncErrorWrapper } = require("../middlewares/errorHandler");

// create a new inventory
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateInventory,
  asyncErrorWrapper(createInventory)
);

// get a single inventory
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findInventoryById)
);

// get all inventorys
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findAllInventorys)
);

// update a inventory
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateInventory,
  asyncErrorWrapper(updateInventory)
);

// delete a inventory
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(deleteInventory)
);

module.exports = router;
