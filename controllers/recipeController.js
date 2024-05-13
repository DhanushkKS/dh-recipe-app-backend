const Recipe = require("../models/recipeModel");
const mongoose = require("mongoose");
const axios = require("axios");

//get recipe by category
const getRecipeByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const response = await axios.get(
      `${process.env.RECIPE_BY_CATEGORY_API}?c=${category}`,
    );
    const recipes = response.data.meals;
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error: error });
  }
};

//Add favourite recipe
const addFavouriteRecipe = async (req, res) => {
  try {
    const { mealId } = req.body;
    const response = await axios.get(
      `${process.env.RECIPE_BY_ID_API}?i=${mealId}`,
    );
    const recipe = response.data.meals;
    res.status(200).json(recipe);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
const getFavouriteRecipes = async (req, res) => {
  const user_id = req.user._id;
  const favouriteRecipes = await Recipe.find({ user_id }).sort({
    createdAt: -1,
  });
};
module.exports = { getRecipeByCategory, addFavouriteRecipe };
