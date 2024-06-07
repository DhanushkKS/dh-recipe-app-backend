const express = require("express");
const requireAuth = require("../middleware/requireAuth");
const {
  getRecipeByCategory,
  addFavouriteRecipe,
  getFavouriteRecipes,
} = require("../controllers/recipeController");
const router = express.Router();

// router.use(requireAuth);

router.get("/:category", getRecipeByCategory);

//get fav recipes
router.get("/favourites/all", getFavouriteRecipes);

router.post("/favourites/create", addFavouriteRecipe);
module.exports = router;
