import React from "react";
import { useParams } from "react-router-dom";
import { RecipeInfo } from "../types";
import { getRecipeByID } from "../services/apiService";

const DetailRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = React.useState<RecipeInfo>();

  React.useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const recipe = await getRecipeByID(+id!);
        setRecipe(recipe);
      } catch (err) {
        console.error("Errore nel caricamento dati", err);
      }
    };
    fetchRecipeData();
  }, []);

  return recipe ? (
    <div>
      <h1>{recipe.title}</h1>
      <h2>Score: {parseFloat((recipe.spoonacularScore).toFixed(2))}</h2>
      <img src={recipe.image} alt={recipe.title} />
      <p>Ready in {recipe.readyInMinutes} minutes.</p>
      <p>Ingredients for {recipe.servings} people:</p>
      <ul>
        {recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name}: {ingredient.amount} {ingredient.unit}
          </li>
        ))}
      </ul>
      <div dangerouslySetInnerHTML={{ __html: recipe.summary }}></div>
      <div>
        <h5>Instructions:</h5>
      <div dangerouslySetInnerHTML={{ __html: recipe.instructions }}></div>
      </div>
      <p>Source:
        <a href={recipe.sourceUrl}>{recipe.sourceUrl}</a> </p>
    </div>
  ) : (
    <p>There are no recipe data</p>
  );
};

export default DetailRecipe;
