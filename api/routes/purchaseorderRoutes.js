const express = require("express");
const router = express.Router();
const purchaseOrderController = require("../controllers/purchaseOrderController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validatePurchaseOrder,
} = require("../middlewares/schemaValidations/purchaseOrderValidation");

// create a new purchaseOrder
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validatePurchaseOrder,
  purchaseOrderController.createSingleDocument
);

// get a single purchaseOrder
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  purchaseOrderController.readSingleDocument
);

// get all purchaseOrders
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  purchaseOrderController.readAllDocuments
);

// update a purchaseOrder
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validatePurchaseOrder,
  purchaseOrderController.updateSingleDocument
);

// delete a purchaseOrder
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  purchaseOrderController.deleteSingleDocument
);

module.exports = router;
