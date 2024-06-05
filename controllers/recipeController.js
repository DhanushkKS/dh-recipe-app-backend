const Recipe = require("../models/recipeModel");
const mongoose = require("mongoose");
const axios = require("axios");

//get recipe by category  GET  frontend eke category eka select karama eka $category ekata set karanna
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

//Add favourite recipe POST  //home eke fav button eka click karama oka trigger karanna
const addFavouriteRecipe = async (req, res) => {
  try {
    const { mealId } = req.body;
    const response = await axios.get(
      `${process.env.RECIPE_BY_ID_API}?i=${mealId}`,
    );
    const meals = response.data.meals;
    if (!response.data.meals || response.data.meals.length === 0) {
      return res.status(404).json({ message: "Recipe not found" });
    }
    const recipe = meals[0];
    // const user_id = req.user._id;

    /**Save favourite recipe in database*/
    const favouriteRecipe = await Recipe.create({
      recipeId: recipe ? recipe.idMeal : "_id",
      name: recipe ? recipe.strMeal : "dh_recipe",
      category: recipe ? recipe.strCategory : "dh_recipe",
      area: recipe ? recipe.strArea : "dh_recipe",
      instructions: recipe ? recipe.strInstructions : "dh_recipe",
      image: recipe ? recipe.strMealThumb : "dh_recipe",
      // user_id: user_id, for now
    });
    console.log("favourite recipe", favouriteRecipe);
    return res.status(200).json(favouriteRecipe);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Internal server error", error: error });
  }
};
//GET  //fav page eke oka pennana fetch karala
const getFavouriteRecipes = async (req, res) => {
  const user_id = req.user._id;
  const favouriteRecipes = await Recipe.find({ user_id }).sort({
    createdAt: -1,
  });
  res.status(200).json(favouriteRecipes);
  console.log("user id,", user_id);
};
module.exports = {
  getRecipeByCategory,
  addFavouriteRecipe,
  getFavouriteRecipes,
};
