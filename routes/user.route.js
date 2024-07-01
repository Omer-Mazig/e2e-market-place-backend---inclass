const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user.controller");
const { verifyToken } = require("../middleware/auth.middleware");

// configuring the router
router.get("/:id", verifyToken, getUserById);

// export router
module.exports = router;
