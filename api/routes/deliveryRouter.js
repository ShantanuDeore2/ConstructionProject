const express = require("express");
const router = express.Router();
const {
  createDelivery,
  findAllDeliverys,
  findDeliveryById,
  updateDelivery,
  deleteDelivery,
} = require("../controllers/deliveryController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateDelivery,
} = require("../middlewares/schemaValidations/deliveryValidation");

// Create a new delivery
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateDelivery,
  createDelivery
);

// Get a single delivery
router.get("/:id", authenticate, authorize(["admin"]), findDeliveryById);

// Get all deliverys
router.get("/", authenticate, authorize(["admin"]), findAllDeliverys);

// Update a delivery
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateDelivery,
  updateDelivery
);

// Delete a delivery
router.delete("/:id", authenticate, authorize(["admin"]), deleteDelivery);

module.exports = router;
