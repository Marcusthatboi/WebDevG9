// backend/routes/productRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// GET all products
router.get("/", productController.getProducts);

// GET a single product by productId
router.get("/:id", productController.getProductById);

// POST a new product
router.post("/", productController.createProduct);

// PUT update a product by productId
router.put("/:id", productController.updateProduct);

// DELETE a product by productId
router.delete("/:id", productController.deleteProduct);

module.exports = router;
