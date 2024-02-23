const express = require("express");
const router = express.Router();
const {
  createMaterial,
  findAllMaterials,
  findMaterialById,
  updateMaterial,
  deleteMaterial,
} = require("../controllers/materialController");

const { authenticate, authorize } = require("../middlewares/authMiddleware");

const {
  validateMaterial,
} = require("../middlewares/schemaValidations/materialValidation");

const { asyncErrorWrapper } = require("../middlewares/errorHandler");

// create a new material
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateMaterial,
  asyncErrorWrapper(createMaterial)
);

// get a single material
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findMaterialById)
);

// get all materials
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findAllMaterials)
);

// update a material
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateMaterial,
  asyncErrorWrapper(updateMaterial)
);

// delete a material
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(deleteMaterial)
);

module.exports = router;
