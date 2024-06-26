const User = require("../models/user.model");

// GET USER BY ID
async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Remove password from the user object before sending the response
    const { password, ...userWithoutPassword } = user.toObject();

    res.json(userWithoutPassword);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// EXPORT CONTROLLER
module.exports = {
  getUserById,
};
