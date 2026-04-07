export const MEALDB_BASE_URL = process.env.NEXT_PUBLIC_MEALDB_API_URL || "/api/mealdb";
export const MEALDB_IMAGE_URL = process.env.NEXT_PUBLIC_MEALDB_IMAGE_URL || "/images/mealdb";

export const MEALDB_ENDPOINTS = {
  listIngredients: `${MEALDB_BASE_URL}/list.php?i=list`,
  listCategories: `${MEALDB_BASE_URL}/list.php?c=list`,
  listAreas: `${MEALDB_BASE_URL}/list.php?a=list`,
  filterByIngredient: (name: string) =>
    `${MEALDB_BASE_URL}/filter.php?i=${encodeURIComponent(name)}`,
  filterByCategory: (category: string) =>
    `${MEALDB_BASE_URL}/filter.php?c=${encodeURIComponent(category)}`,
  filterByArea: (area: string) =>
    `${MEALDB_BASE_URL}/filter.php?a=${encodeURIComponent(area)}`,
  lookupMeal: (id: string) => `${MEALDB_BASE_URL}/lookup.php?i=${id}`,
} as const;

export const INGREDIENT_THUMB_URL = (name: string) =>
  `${MEALDB_IMAGE_URL}/${encodeURIComponent(name)}.png`;

export const INGREDIENT_THUMB_SMALL_URL = (name: string) =>
  `${MEALDB_IMAGE_URL}/${encodeURIComponent(name)}-Small.png`;
