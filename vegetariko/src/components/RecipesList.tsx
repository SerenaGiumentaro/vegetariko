import React from "react";
import { useRecipeContext } from "./RecipesContext";
import RecipeCard from "./RecipeCard";
import Pagination from "rsuite/esm/Pagination";
import { getRecipes, getRecipesBySearch } from "../services/apiService";
import { Loader } from "rsuite";

type LayoutType = "-" | "|" | "pager" | "skip";

const RecipesList = () => {
  const {
    recipes,
    setRecipes,
    totalRecipes,
    activePage,
    setActivePage,
    query,
    offSet,
    setOffSet,
    isLoading,
    setIsLoading
  } = useRecipeContext();

  const layout: LayoutType[] = ["-", "|", "pager", "skip"];

  const onChangePage = async (page: number) => {
    if (query) {
      try {
        const recipesData = await getRecipesBySearch(query, offSet);
        if(recipesData){
          setRecipes(recipesData.results);
          setActivePage(page);
          setOffSet(page * 10);
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Errore nel caricamento dei dati", error);
      }
    } else {
      try {
        const recipesData = await getRecipes(offSet);
        setRecipes(recipesData.results);
        setActivePage(page);
        setOffSet(page * 10);
      } catch (error) {
        console.error("Errore nel caricamento dei dati", error);
      }
    }
  };

  return (
    isLoading ? 
    (<Loader backdrop content="loading..." vertical />) : 
    <div>
      <div className="flex gap-8 flex-wrap justify-center p-12">
        {recipes.length === 0 && <p>No results found for your search.</p>}
        {recipes?.map((recipe) => {
          return (
            <div key={recipe.id}>
              <RecipeCard title={recipe.title} imgUrl={recipe.image} idRecipe={recipe.id}/>
            </div>
          );
        })}
      </div>
      <Pagination
        layout={layout}
        prev
        last
        next
        first
        boundaryLinks
        maxButtons={5}
        size="xs"
        total={totalRecipes}
        limit={10}
        activePage={activePage}
        onChangePage={onChangePage}
      />
    </div>
  );
};

export default RecipesList;
