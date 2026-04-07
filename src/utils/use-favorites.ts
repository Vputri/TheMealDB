"use client";
import { useState, useEffect } from "react";
import { MealPreview } from "@/types/meal";

export function useFavorites() {
  const [favorites, setFavorites] = useState<MealPreview[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("meal_favorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse favorites", e);
      }
    }
    setIsLoaded(true);
  }, []);

  const toggleFavorite = (meal: MealPreview) => {
    setFavorites(prev => {
      const exists = prev.find(m => m.idMeal === meal.idMeal);
      let newFavs;
      if (exists) {
        newFavs = prev.filter(m => m.idMeal !== meal.idMeal);
      } else {
        newFavs = [...prev, meal];
      }
      localStorage.setItem("meal_favorites", JSON.stringify(newFavs));
      return newFavs;
    });
  };

  const isFavorite = (idMeal: string) => {
    return favorites.some(m => m.idMeal === idMeal);
  };

  return { favorites, toggleFavorite, isFavorite, isLoaded };
}
