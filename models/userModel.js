const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  telephone: {
    type: String,
    required: true,
  },
});

userSchema.statics.registerUser = async function (user) {
  if (
    !user.firstName ||
    !user.lastName ||
    !user.email ||
    !user.password ||
    !user.telephone
  ) {
    throw new Error("All fields must be filled.");
  }
  if (!validator.isEmail(user.email)) {
    throw new Error("Email is not valid");
  }
  const exists = await this.findOne({ email: user.email });
  if (exists) {
    throw new Error("Email already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  const newUser = await this.create({
    email: user.email,
    password: hash,
    telephone: user.telephone,
    firstName: user.firstName,
    lastName: user.lastName,
  });
};
userSchema.statics.logIn = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled.");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("User not found");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
