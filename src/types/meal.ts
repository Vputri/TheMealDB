// TheMealDB API response types

export type Ingredient = {
  idIngredient: string;
  strIngredient: string;
  strDescription: string | null;
  strType: string | null;
};

export type IngredientListResponse = {
  meals: Ingredient[];
};

export type MealPreview = {
  strMeal: string;
  strMealThumb: string;
  idMeal: string;
};

export type MealFilterResponse = {
  meals: MealPreview[] | null;
};

export type MealDetail = {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string | null;
  strSource: string | null;
  // Ingredients & Measures (1-20)
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
};

export type MealDetailResponse = {
  meals: MealDetail[] | null;
};

export type ParsedIngredient = {
  ingredient: string;
  measure: string;
};
