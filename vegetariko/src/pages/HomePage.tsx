import React from "react";
import { Recipe } from "../types";
import { getRecipesBySearch } from "../services/apiService";
import RecipeCard from "../components/RecipeCard";

const HomePage = () => {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);

  React.useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesData = await getRecipesBySearch("");
        setRecipes(recipesData.results);
      } catch (error) {
        console.error("Errore nel caricamento dati", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <>
     <p className="font-bold">Home</p> 
      <div className="flex">

      {recipes?.map((recipe) => {
        return (
          <div key={recipe.id}>
            <RecipeCard title={recipe.title} imgUrl={recipe.image} />
          </div>
        );
      })}
      </div>
    </>
  );
};

export default HomePage;
