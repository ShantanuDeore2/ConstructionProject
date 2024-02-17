const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateInventory,
} = require("../middlewares/schemaValidations/inventoryValidation");

// create a new inventory
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateInventory,
  inventoryController.createSingleDocument
);

// get a single inventory
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  inventoryController.readSingleDocument
);

// get all inventorys
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  inventoryController.readAllDocuments
);

// update a inventory
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateInventory,
  inventoryController.updateSingleDocument
);

// delete a inventory
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  inventoryController.deleteSingleDocument
);

module.exports = router;
