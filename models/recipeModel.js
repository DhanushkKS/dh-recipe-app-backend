const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recipeSchema = new Schema({
  recipeId: { type: Number, required: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  instructions: { type: String, required: true },
  image: { type: String },
  user_id: { type: String, ref: "User" },
});
module.exports = mongoose.model("Recipe", recipeSchema);
