const express = require("express");
const router = express.Router();
const {
  createPurchaseOrder,
  findAllPurchaseOrders,
  findPurchaseOrderById,
  updatePurchaseOrder,
  deletePurchaseOrder,
} = require("../controllers/purchaseOrderController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validatePurchaseOrder,
} = require("../middlewares/schemaValidations/purchaseOrderValidation");

// Create a new purchaseOrder
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validatePurchaseOrder,
  createPurchaseOrder
);

// Get a single purchaseOrder
router.get("/:id", authenticate, authorize(["admin"]), findPurchaseOrderById);

// Get all purchaseOrders
router.get("/", authenticate, authorize(["admin"]), findAllPurchaseOrders);

// Update a purchaseOrder
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validatePurchaseOrder,
  updatePurchaseOrder
);

// Delete a purchaseOrder
router.delete("/:id", authenticate, authorize(["admin"]), deletePurchaseOrder);

module.exports = router;
