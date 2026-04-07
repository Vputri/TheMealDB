import { MEALDB_ENDPOINTS } from "@/constants/api";
import type {
  IngredientListResponse,
  MealFilterResponse,
  MealDetailResponse,
  MealDetail,
  ParsedIngredient,
} from "@/types/meal";

export async function fetchIngredients() {
  const res = await fetch(MEALDB_ENDPOINTS.listIngredients);
  if (!res.ok) throw new Error("Gagal memuat daftar bahan makanan.");
  const data: IngredientListResponse = await res.json();
  return data.meals ?? [];
}

export async function fetchMealsByIngredient(ingredientName: string) {
  const res = await fetch(MEALDB_ENDPOINTS.filterByIngredient(ingredientName));
  if (!res.ok) throw new Error("Gagal memuat daftar masakan.");
  const data: MealFilterResponse = await res.json();
  return data.meals ?? [];
}

export async function fetchMealDetail(mealId: string) {
  const res = await fetch(MEALDB_ENDPOINTS.lookupMeal(mealId));
  if (!res.ok) throw new Error("Gagal memuat detail masakan.");
  const data: MealDetailResponse = await res.json();
  return data.meals?.[0] ?? null;
}

export function parseMealIngredients(meal: MealDetail): ParsedIngredient[] {
  const ingredients: ParsedIngredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}` as keyof MealDetail] as string | null;
    const measure = meal[`strMeasure${i}` as keyof MealDetail] as string | null;
    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() ?? "",
      });
    }
  }
  return ingredients;
}

export function getYouTubeEmbedUrl(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
  );
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}
