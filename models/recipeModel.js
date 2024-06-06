const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recipeSchema = new Schema(
  {
    recipeId: { type: String, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    area: { type: String, required: false },
    instructions: { type: String, required: true },
    image: { type: String },
    user_id: { type: String, ref: "User", required: true },
  },
  { timestamps: true },
);
module.exports = mongoose.model("Recipe", recipeSchema);
