import React from "react";
import { Recipe } from "../types";
import { getRecipes, getRecipesBySearch } from "../services/apiService";

interface ProviderRecipesProps {
  children: React.ReactNode;
}
interface RecipesContextType {
  recipes: Recipe[];
  setRecipes: (newValue: Recipe[]) => void;
  totalRecipes: number;
  setTotalRecipes: (newValue: number) => void;
  activePage: number;
  setActivePage: (newActivePage: number) => void;
  query: string;
  setQuery: (newQuery: string) => void;
  offSet: number;
  setOffSet: (newOffset: number) => void;
  isLoading: boolean;
  setIsLoading: (newIsLoading: boolean) => void
}

const defaultValue: RecipesContextType = {
  recipes: [],
  setRecipes: () => {},
  totalRecipes: 0,
  setTotalRecipes: () => {},
  activePage: 1,
  setActivePage: () => {},
  query: "",
  setQuery: () => {},
  offSet: 10,
  setOffSet: () => {},
  isLoading: true,
  setIsLoading: () => {},
};
const RecipeContext = React.createContext<RecipesContextType>(defaultValue);

export const RecipeProvider: React.FC<ProviderRecipesProps> = ({
  children,
}) => {
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);
  const [totalRecipes, setTotalRecipes] = React.useState<number>(0);
  const [activePage, setActivePage] = React.useState<number>(1);
  const [query, setQuery] = React.useState<string>("");
  const [offSet, setOffSet] = React.useState<number>(10);
  const [isLoading, setIsLoading] = React.useState(true)


  React.useEffect(()=> {
    const fetchSearchedRecipes = async () => {
      try {
        const recipesData = await getRecipesBySearch(query, 0)
        if(recipesData){

          setRecipes(recipesData.results)
          setTotalRecipes(recipesData.totalResults)
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Errore nel caricamento dei dati", error)
      }
    }

    fetchSearchedRecipes()


  }, [query, setQuery])


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

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        setRecipes,
        totalRecipes,
        setTotalRecipes,
        activePage,
        setActivePage,
        query,
        setQuery,
        offSet,
        setOffSet,
        isLoading,
        setIsLoading
      }}
    >
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => React.useContext(RecipeContext);
