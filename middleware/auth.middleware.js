const jwt = require("jsonwebtoken");
const Product = require("../models/product.model");

const { JWT_SECRET } = process.env;

function verifyToken(req, res, next) {
  // Split the token from the header (Bearer token)
  const authHeader =
    req.headers["Authorization"] || req.headers["authorization"]; // Get the authorization header
  const token = authHeader && authHeader.split(" ")[1]; // Get the token from the header
  console.log(authHeader);
  if (!token) {
    console.log("auth.middleware, verifyToken. No token provided");
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET); // Verify token
    req.userId = decoded.userId; // Add userId to request object
    next(); // Call next middleware
  } catch (error) {
    console.log(
      "auth.middleware, verifyToken. Error while verifying token",
      error
    );
    res.status(401).json({ error: "Invalid token" });
  }
}

async function authorizeProductOwner(req, res, next) {
  const { id: productId } = req.params;
  const product = await Product.findById(productId);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (product.user.toString() !== req.userId) {
    return res.status(403).json({ message: "User not authorized" });
  }

  next();
}

module.exports = { verifyToken, authorizeProductOwner };
