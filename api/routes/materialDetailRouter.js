const express = require("express");
const router = express.Router();
const {
  createMaterialDetail,
  findAllMaterialDetails,
  findMaterialDetailById,
  updateMaterialDetail,
  deleteMaterialDetail,
} = require("../controllers/materialDetailController");

const { authenticate, authorize } = require("../middlewares/authMiddleware");

const {
  validateMaterialDetail,
} = require("../middlewares/schemaValidations/materialDetailValidation");

const { asyncErrorWrapper } = require("../middlewares/errorHandler");

// create a new materialdetail
router.post(
  "/",
  authenticate,
  authorize(["admin"]),
  validateMaterialDetail,
  asyncErrorWrapper(createMaterialDetail)
);

// get a single materialdetail
router.get(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findMaterialDetailById)
);

// get all materialdetails
router.get(
  "/",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(findAllMaterialDetails)
);

// update a materialdetail
router.patch(
  "/:id",
  authenticate,
  authorize(["admin"]),
  validateMaterialDetail,
  asyncErrorWrapper(updateMaterialDetail)
);

// delete a materialdetail
router.delete(
  "/:id",
  authenticate,
  authorize(["admin"]),
  asyncErrorWrapper(deleteMaterialDetail)
);

module.exports = router;
