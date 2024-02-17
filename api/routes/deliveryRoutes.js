const express = require("express");
const router = express.Router();
const deliveryController = require("../controllers/deliveryController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateDelivery,
} = require("../middlewares/schemaValidations/deliveryValidation");

// create a new delivery
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateDelivery,
  deliveryController.createSingleDocument
);

// get a single delivery
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  deliveryController.readSingleDocument
);

// get all deliverys
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  deliveryController.readAllDocuments
);

// update a delivery
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateDelivery,
  deliveryController.updateSingleDocument
);

// delete a delivery
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  deliveryController.deleteSingleDocument
);

module.exports = router;
