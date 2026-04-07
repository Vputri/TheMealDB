export const MEALDB_BASE_URL = process.env.NEXT_PUBLIC_MEALDB_API_URL || "/api/mealdb";
export const MEALDB_IMAGE_URL = process.env.NEXT_PUBLIC_MEALDB_IMAGE_URL || "/images/mealdb";

export const MEALDB_ENDPOINTS = {
  listIngredients: `${MEALDB_BASE_URL}/list.php?i=list`,
  filterByIngredient: (name: string) =>
    `${MEALDB_BASE_URL}/filter.php?i=${encodeURIComponent(name)}`,
  lookupMeal: (id: string) => `${MEALDB_BASE_URL}/lookup.php?i=${id}`,
} as const;

export const INGREDIENT_THUMB_URL = (name: string) =>
  `${MEALDB_IMAGE_URL}/${encodeURIComponent(name)}.png`;

export const INGREDIENT_THUMB_SMALL_URL = (name: string) =>
  `${MEALDB_IMAGE_URL}/${encodeURIComponent(name)}-Small.png`;
