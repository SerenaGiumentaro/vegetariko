import { RecipeProvider } from "../components/RecipesContext";
import RecipesList from "../components/RecipesList";

const HomePage = () => {
  return (
    <RecipeProvider>
      <RecipesList />
    </RecipeProvider>
  );
};

export default HomePage;
