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

const { asyncErrorWrapper } = require("../middlewares/errorHandler");

// create a new purchaseorder
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validatePurchaseOrder,
  asyncErrorWrapper(createPurchaseOrder)
);

// get a single purchaseorder
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findPurchaseOrderById)
);

// get all purchaseorders
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findAllPurchaseOrders)
);

// update a purchaseorder
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validatePurchaseOrder,
  asyncErrorWrapper(updatePurchaseOrder)
);

// delete a purchaseorder
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(deletePurchaseOrder)
);

module.exports = router;
