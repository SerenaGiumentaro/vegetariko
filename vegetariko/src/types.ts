export interface Recipe {
  id: number;
  image: string;
  title: string;
}

export interface RecipeInfo {
  title: string;
  image: string;
  extendedIngredients: Ingredient[];
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  summary: string;
  instructions: string;
  spoonacularScore: number;
}

export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
}
