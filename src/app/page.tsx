"use client";

import React from "react";
import { SearchInput } from "@/component/common/search-input";
import { IngredientCard } from "@/component/features/ingredients/ingredient-card";
import { SkeletonCard } from "@/component/common/skeleton-card";
import { ErrorState, EmptyState } from "@/component/common/state-display";
import { useFetch, useSearch } from "@/utils/hooks";
import { fetchIngredients } from "@/utils/meal-api";
import { ChefHatIcon } from "@/component/ui/Icon";

export default function HomePage() {
  const { data: ingredients, isLoading, error, refetch } = useFetch({
    fetcher: fetchIngredients,
  });

  const { query, setQuery, filteredItems } = useSearch(
    ingredients || [],
    "strIngredient"
  );

  return (
    <main className="min-h-screen pb-20 bg-[#F9FAFB]">
      {/* Header / Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-[#E5E7EB] pt-12 pb-16 md:pt-24 md:pb-32 px-6">
        {/* Subtle Decorative Background */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#FF6B6B]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-[#FF6B6B]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="flex justify-center mb-6 md:mb-8">
            <div className="p-4 bg-[#FF6B6B]/10 rounded-3xl text-[#FF6B6B] shadow-inner transform transition-transform hover:rotate-12">
              <ChefHatIcon className="w-10 h-10 md:w-12 md:h-12" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight font-bold leading-[1.1]">
            Cari <span className="text-[#FF6B6B] relative inline-block">
              Bahan
              <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#FF6B6B]/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0 50 5 Q 75 10 100 5" fill="transparent" stroke="currentColor" strokeWidth="4" />
              </svg>
            </span> Masakan
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-[#6B7280] max-w-2xl mx-auto mb-10 md:mb-14 leading-relaxed px-4">
            Jelajahi berbagai bahan makanan dan temukan resep lezat untuk hidangan harian Anda. Mulai petualangan rasa hari ini!
          </p>
          
          <div className="max-w-3xl mx-auto px-2">
            <SearchInput 
              value={query} 
              onChange={setQuery} 
              placeholder="Contoh: jahe, ayam, cokelat..." 
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        {error ? (
          <ErrorState message={error} onRetry={refetch} />
        ) : isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            <SkeletonCard count={12} />
          </div>
        ) : filteredItems.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl">Semua Bahan</h2>
              <span className="text-sm font-medium text-[#6B7280]">
                {filteredItems.length} Bahan ditemukan
              </span>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8">
              {filteredItems.map((ingredient) => (
                <IngredientCard 
                  key={ingredient.idIngredient} 
                  ingredient={ingredient} 
                />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
