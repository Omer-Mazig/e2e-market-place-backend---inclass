// controllers/productController.js
const { buildCriteria } = require("../helpers/product.helper");
const Product = require("../models/product.model");

// Get products count
async function getProductsCount(req, res) {
  const { query } = req;
  const criteria = buildCriteria(query);

  // console.log("page", page);
  // console.log("limit", limit);
  // console.log("startIndex", startIndex);

  try {
    const count = await Product.countDocuments(criteria);

    res.status(200).json({ count });
  } catch (err) {
    console.log(
      "product.controller, getProductCount. Error while getting product count",
      err
    );
    res
      .status(500)
      .json({ message: "Server error while getting product count" });
  }
}

// Get all products
async function getProducts(req, res) {
  const { query } = req;
  const criteria = buildCriteria(query);

  const page = query.page || 1;
  const limit = query.limit || 5;
  const startIndex = (page - 1) * limit || 0;

  // console.log("page", page);
  // console.log("limit", limit);
  // console.log("startIndex", startIndex);

  try {
    const products = await Product.find(criteria).skip(startIndex).limit(limit);
    res.status(200).json(products);
  } catch (err) {
    console.log(
      "product.controller, getProducts. Error while getting products",
      err
    );
    res.status(500).json({ message: "Server error while getting products" });
  }
}

// Get a single product
async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    if (err.name === "CastError") {
      console.log(
        `product.controller, getProductById. CastError! product not found with id: ${id}`
      );
      return res.status(404).json({ message: "product not found" });
    }
    console.log(
      `product.controller, getProductById. Error while getting product with id: ${id}`,
      err
    );
    res.status(500).json({ message: "Server error while getting product" });
  }
}

// Delete an product
async function deleteProduct(req, res) {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      console.log(
        `product.controller, deleteProduct. Product not found with id: ${id}`
      );
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Product deleted" });
  } catch (err) {
    console.log(
      `product.controller, deleteProduct. Error while deleting product with id: ${id}`,
      err
    );
    res.status(500).json({ message: "Server error while deleting product" });
  }
}

// Create a new product
async function createProduct(req, res) {
  const productToAdd = req.body;

  try {
    const newProduct = new Product(productToAdd);
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    if (err.name === "ValidationError") {
      // Mongoose validation error
      console.log(`product.controller, createProduct. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      // Other types of errors
      console.log(`product.controller, createProduct. ${err.message}`);
      res.status(500).json({ message: "Server error while creating product" });
    }
  }
}

// Update an product
async function updateProduct(req, res) {
  const { id } = req.params;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedProduct) {
      console.log(
        `product.controller, updateProduct. Product not found with id: ${id}`
      );
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (err) {
    if (err.name === "ValidationError") {
      // Mongoose validation error
      console.log(`product.controller, updateProduct. ${err.message}`);
      res.status(400).json({ message: err.message });
    } else {
      // Other types of errors
      console.log(`product.controller, updateProduct. ${err.message}`);
      res.status(500).json({ message: "Server error while updating product" });
    }
  }
}

module.exports = {
  getProductsCount,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
