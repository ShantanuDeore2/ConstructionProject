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

// Create a new inventory
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateInventory,
  createInventory
);

// Get a single inventory
router.get("/:id", authenticate, authorize(["admin"]), findInventoryById);

// Get all inventorys
router.get("/", authenticate, authorize(["admin"]), findAllInventorys);

// Update a inventory
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateInventory,
  updateInventory
);

// Delete a inventory
router.delete("/:id", authenticate, authorize(["admin"]), deleteInventory);

module.exports = router;
