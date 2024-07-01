// routes/products.js
const express = require("express");
const router = express.Router();
const {
  getProductsCount,
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
} = require("../controllers/product.controller");

const {
  verifyToken,
  authorizeProductOwner,
} = require("../middleware/auth.middleware");

router.get("/", getProducts);
router.get("/count", getProductsCount);
router.get("/:id", getProductById);
router.post("/", verifyToken, createProduct);
router.delete("/:id", verifyToken, authorizeProductOwner, deleteProduct);

module.exports = router;
