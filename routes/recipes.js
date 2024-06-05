const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  getRecipeByCategory,
  addFavouriteRecipe,
  getFavouriteRecipes,
} = require("../controllers/recipeController");
const router = express.Router();

//router.use(requireAuth);

router.get("/:category", getRecipeByCategory);

//get fav recipes
router.get("/favourites", getFavouriteRecipes);

router.post("/favourites", addFavouriteRecipe);
module.exports = router;
