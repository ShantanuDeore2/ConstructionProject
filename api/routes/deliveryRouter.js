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

const { asyncErrorWrapper } = require("../middlewares/errorHandler");

// create a new delivery
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateDelivery,
  asyncErrorWrapper(createDelivery)
);

// get a single delivery
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findDeliveryById)
);

// get all deliverys
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findAllDeliverys)
);

// update a delivery
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateDelivery,
  asyncErrorWrapper(updateDelivery)
);

// delete a delivery
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(deleteDelivery)
);

module.exports = router;
