"use client";

import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { fetchMealDetail, parseMealIngredients, getYouTubeEmbedUrl } from "@/utils/meal-api";
import { useFetch, useFavorites } from "@/utils";
import { Breadcrumbs } from "@/component/common/breadcrumbs";
import { cn } from "@/utils/cn";
import { ErrorState } from "@/component/common/state-display";
import { ChefHatIcon, PlayIcon } from "@/component/ui/Icon";

export default function MealDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: meal, isLoading, error, refetch } = useFetch({
    fetcher: () => fetchMealDetail(id),
  });
  
  const { isFavorite, toggleFavorite, isLoaded: isFavsLoaded } = useFavorites();

  const ingredients = meal ? parseMealIngredients(meal) : [];
  const youtubeUrl = meal ? getYouTubeEmbedUrl(meal.strYoutube) : null;

  if (isLoading) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="h-8 w-64 skeleton-pulse rounded mb-12" />
        <div className="aspect-[16/9] w-full skeleton-pulse rounded-3xl mb-12" />
        <div className="space-y-6">
          <div className="h-12 w-3/4 skeleton-pulse rounded" />
          <div className="h-6 w-1/2 skeleton-pulse rounded" />
          <div className="h-40 w-full skeleton-pulse rounded" />
        </div>
      </main>
    );
  }

  if (error || !meal) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-12">
        <ErrorState message={error || "Masakan tidak ditemukan."} onRetry={refetch} />
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 md:py-12 pb-24">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: meal.strMeal }
        ]}
      />

      <article className="space-y-8 md:space-y-12">
        {/* Hero Section - True Adaptive */}
        <header className="relative aspect-[4/3] md:aspect-[21/9] w-full overflow-hidden rounded-[2.5rem] shadow-2xl">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 md:p-10 lg:p-12">
            <div className="flex items-end justify-between gap-4 w-full">
              <div className="max-w-3xl">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-xs font-semibold border border-white/30 uppercase tracking-wider">
                    {meal.strCategory}
                  </span>
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-xs font-semibold border border-white/30 uppercase tracking-wider">
                    {meal.strArea}
                  </span>
                </div>
                <h1 className="text-white text-3xl md:text-5xl lg:text-5xl font-bold tracking-tight leading-[1.1]">
                  {meal.strMeal}
                </h1>
              </div>
              
              {isFavsLoaded && (
                <button 
                  onClick={() => toggleFavorite({ idMeal: meal.idMeal, strMeal: meal.strMeal, strMealThumb: meal.strMealThumb })}
                  className={cn(
                    "flex-shrink-0 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 mb-2 md:mb-4 rounded-full border border-white/20 backdrop-blur-md transition-all shadow-xl hover:scale-110",
                    isFavorite(meal.idMeal) ? "bg-[#FF6B6B] text-white" : "bg-white/20 text-white"
                  )}
                  aria-label="Toggle Favorite"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill={isFavorite(meal.idMeal) ? "currentColor" : "none"} xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </header>

        {/* Content Section - Height Matched with Scroll */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:h-[650px]">
          
          {/* Instructions - LEFT on desktop */}
          <div className="lg:col-span-8 lg:order-1 h-full overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full pr-1 md:pr-4">
            <section className="bg-white p-6 md:p-8 lg:p-10 rounded-[2rem] shadow-sm border border-[#E5E7EB] min-h-full">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                <span className="w-6 h-1 bg-[#FF6B6B] rounded-full" />
                Instructions
              </h2>
              <div className="text-[#4B5563] text-sm md:text-base leading-[1.8] whitespace-pre-line space-y-4">
                {meal.strInstructions}
              </div>
            </section>
          </div>

          {/* Ingredients - RIGHT on desktop */}
          <aside className="lg:col-span-4 lg:order-2 h-full overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full pr-1 md:pr-4 flex flex-col gap-6">
            <section className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-[#E5E7EB] flex-1">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Main Ingredients</h2>
                <span className="text-xs font-bold text-[#FF6B6B] bg-[#FF6B6B]/10 px-2 py-1 rounded-md uppercase">
                  {ingredients.length} Items
                </span>
              </div>
              <ul className="space-y-4">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex justify-between items-start gap-4 py-1 group">
                    <span className="text-[#4B5563] text-sm font-medium group-hover:text-[#FF6B6B] transition-colors">{item.ingredient}</span>
                    <span className="flex-shrink-0 text-right text-xs font-bold text-[#1F2937] bg-[#F3F4F6] px-2 py-1 rounded-lg">
                      {item.measure}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="bg-[#FF6B6B] text-white p-8 rounded-[2rem] shadow-lg shadow-[#FF6B6B]/20 shrink-0">
              <ChefHatIcon className="w-10 h-10 mb-4" />
              <h3 className="text-lg font-bold mb-2">Wanna Try?</h3>
              <p className="text-white/90 leading-relaxed text-sm">
                Every recipe is the beginning of a flavor adventure in your kitchen.
              </p>
            </div>
          </aside>
        </div>

        {/* Video Tutorial Sub Section */}
        {youtubeUrl && (
          <section className="pt-8 md:pt-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <PlayIcon className="text-[#FF0000] w-6 h-6" />
              Video Tutorial
            </h2>
            <div className="aspect-video w-full max-w-4xl rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100">
              <iframe
                className="w-full h-full"
                src={youtubeUrl}
                title={`${meal.strMeal} tutorial`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
