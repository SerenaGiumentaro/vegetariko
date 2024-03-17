import { RecipeProvider } from "../components/RecipesContext";
import RecipesList from "../components/RecipesList";
import SearchForm from "../components/SearchForm";

const HomePage = () => {
  return (
    <RecipeProvider>
      <SearchForm />
      <RecipesList />
    </RecipeProvider>
  );
};

export default HomePage;
