const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config(); // Load config

async function main() {
  // Connect to database
  await connectDB();

  // MIDDLEWARES
  app.use(express.static("public"));

  // parse json body in request (for POST, PUT, PATCH requests)
  app.use(express.json());

  // allow CORS fir local development (for production, you should configure it properly)
  app.use(cors());

  // ROUTES
  const productRoutes = require("./routes/product.route");
  const userRoutes = require("./routes/user.route");
  const authRoutes = require("./routes/auth.route");

  app.use("/api/product", productRoutes);
  app.use("/api/user", userRoutes);
  app.use("/api/auth", authRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

main();
