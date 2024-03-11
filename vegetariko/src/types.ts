export interface Recipe {
  id: number;
  image: string;
  title: string;
}

export interface RecipeInfo {
  extendedIngredients: Ingredient[];
  readyInMinutes: number;
  servings: number;
  sourceUrl: string;
  summary: string;
  instructions: string;
  spoonacularScore: number,

}

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
}
