import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RecipeInfo } from "../types";
import { getRecipeByID } from "../services/apiService";
import { ButtonGroup, IconButton, Loader } from "rsuite";
import ArowBackIcon from "@rsuite/icons/ArowBack";

const DetailRecipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = React.useState<RecipeInfo>();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const nav = useNavigate();

  React.useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const recipe = await getRecipeByID(+id!);
        setRecipe(recipe);
      } catch (err) {
        console.error("Errore nel caricamento dati", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchRecipeData();
  }, []);

  if (isLoading) {
    return <Loader backdrop content="loading..." vertical />;
  }

  if (!recipe) {
    return (
      <>
        <ButtonGroup onClick={() => nav("/")}>
          <IconButton icon={<ArowBackIcon />} />
        </ButtonGroup>
        <p>There are no data for this recipe.</p>;
      </>
    );
  }

  return (
    <div>
      <ButtonGroup onClick={() => nav("/")}>
        <IconButton icon={<ArowBackIcon />} />
      </ButtonGroup>
      <h1>{recipe.title}</h1>
      <h2>Score: {parseFloat(recipe.spoonacularScore.toFixed(2))}</h2>
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
      <p>
        Source:
        <a href={recipe.sourceUrl}>{recipe.sourceUrl}</a>{" "}
      </p>
    </div>
  );
};

export default DetailRecipe;
