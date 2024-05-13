const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  getRecipeByCategory,
  addFavouriteRecipe,
} = require("../controllers/recipeController");
const router = express.Router();

// router.use(requireAuth);
router.get("/:category", getRecipeByCategory);

router.post("/favourites", addFavouriteRecipe);
module.exports = router;
