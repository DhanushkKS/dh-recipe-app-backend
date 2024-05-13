const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.logIn(email, password);
    const token = await createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const registerUser = async (req, res) => {
  const { user } = req.body;
  try {
    const newUser = await User.registerUser(user);
    const token = await createToken(newUser._id);
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = {
  loginUser,
  registerUser,
};
