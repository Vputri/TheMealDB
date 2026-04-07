"use client";

import Link from "next/link";
import { useFavorites } from "@/utils";
import { MealCard } from "@/component/features/meals/meal-card";
import { EmptyState } from "@/component/common/state-display";

export default function FavoritesPage() {
  const { favorites, isLoaded } = useFavorites();

  if (!isLoaded) {
    return (
      <main className="max-w-7xl mx-auto px-6 py-12 pb-24 bg-[#F9FAFB] min-h-screen">
        <div className="h-10 w-64 skeleton-pulse rounded mb-12" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map(n => (
            <div key={n} className="aspect-square skeleton-pulse rounded-2xl w-full" />
          ))}
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 pb-24 min-h-screen">
      <header className="mb-10 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Resep <span className="text-[#FF6B6B]">Favorit</span>
        </h1>
        <p className="text-[#6B7280] text-lg max-w-xl">
          Koleksi resep terbaik pilihan Anda untuk dihidangkan kapan saja.
        </p>
      </header>

      {favorites.length === 0 ? (
        <EmptyState 
          title="Belum ada favorit" 
          message="Jelajahi bahan masakan atau kategori dan simpan resep yang Anda sukai." 
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {favorites.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </main>
  );
}
