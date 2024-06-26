const express = require("express");
const router = express.Router();

const { getUserById } = require("../controllers/user.controller");

// configuring the router
router.get("/:id", getUserById);

// export router
module.exports = router;
