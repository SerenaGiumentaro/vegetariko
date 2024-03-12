import React from "react";
import { Recipe } from "../types";
import { getRecipes, getRecipesBySearch } from "../services/apiService";
import RecipeCard from "../components/RecipeCard";
import Pagination from "rsuite/esm/Pagination";

const HomePage = () => {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [totalRecipes, setTotalRecipes] = React.useState<number>(0);
  const [activePage, setActivePage] = React.useState<number>(1);
  const [query, setQuery] = React.useState<string>('')
  const [offSet , setOffSet] = React.useState<number>(10)
  const layout =['-', '|', 'pager', 'skip'] as LayoutType[]
  React.useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const recipesData = await getRecipes(0);
        setRecipes(recipesData.results);
        setTotalRecipes(recipesData.totalResults);
      } catch (error) {
        console.error("Errore nel caricamento dati", error);
      }
    };

    fetchRecipes();
  }, []);

  const onChangePage = async (page:number) => {

    if (query) {
      try {
        const recipesData = await getRecipesBySearch(query, offSet);
        setRecipes(recipesData);
        setActivePage(page);
        setOffSet(page * 10)
      } catch (error) {
        console.error("Errore nel caricamento dei dati", error);
      }
    } else {
      try {
        const recipesData = await getRecipes(offSet);
        setRecipes(recipesData.results);
        setActivePage(page);
        setOffSet(page * 10)
      } catch (error) {
        console.error("Errore nel caricamento dei dati", error);
      }
    }
  };
  return (
    <>
      <div>
        <div className="flex gap-8 flex-wrap justify-center p-12">
          {recipes?.map((recipe) => {
            return (
              <div key={recipe.id}>
                <RecipeCard title={recipe.title} imgUrl={recipe.image} />
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
    </>
  );
};

export default HomePage;
