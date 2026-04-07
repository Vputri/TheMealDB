"use client";

import React from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { fetchMealDetail, parseMealIngredients, getYouTubeEmbedUrl } from "@/utils/meal-api";
import { useFetch } from "@/utils/hooks";
import { Breadcrumbs } from "@/component/common/breadcrumbs";
import { ErrorState } from "@/component/common/state-display";
import { ChefHatIcon, PlayIcon } from "@/component/ui/Icon";

export default function MealDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: meal, isLoading, error, refetch } = useFetch({
    fetcher: () => fetchMealDetail(id),
  });

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
    <main className="max-w-4xl mx-auto px-6 py-12 pb-24">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: meal.strMeal }
        ]}
      />

      <article className="space-y-8 md:space-y-16">
        {/* Hero Section - True Adaptive */}
        <header className="relative aspect-[3/4] md:aspect-[21/9] w-full overflow-hidden rounded-[2.5rem] shadow-2xl">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 md:p-12 lg:p-16">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2 mb-4 md:mb-6">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-xs md:text-sm font-semibold border border-white/30 uppercase tracking-wider">
                  {meal.strCategory}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-full text-xs md:text-sm font-semibold border border-white/30 uppercase tracking-wider">
                  {meal.strArea}
                </span>
              </div>
              <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]">
                {meal.strMeal}
              </h1>
            </div>
          </div>
        </header>

        {/* Content Section - Adaptive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
          {/* Ingredients - TOP on mobile, RIGHT on desktop */}
          <aside className="lg:col-span-4 lg:order-2 space-y-6 md:space-y-8">
            <section className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-[#E5E7EB]">
              <div className="flex items-center justify-between mb-6 md:mb-8">
                <h2 className="text-xl md:text-2xl font-bold">Bahan Utama</h2>
                <span className="text-xs font-bold text-[#FF6B6B] bg-[#FF6B6B]/10 px-2 py-1 rounded-md uppercase">
                  {ingredients.length} Items
                </span>
              </div>
              <ul className="space-y-4 md:space-y-5">
                {ingredients.map((item, index) => (
                  <li key={index} className="flex justify-between items-start gap-4 py-1 group">
                    <span className="text-[#4B5563] text-sm md:text-base leading-tight font-medium group-hover:text-[#FF6B6B] transition-colors">{item.ingredient}</span>
                    <span className="flex-shrink-0 text-right text-xs md:text-sm font-bold text-[#1F2937] bg-[#F3F4F6] px-2 py-1 rounded-lg">
                      {item.measure}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="hidden lg:block bg-[#FF6B6B] text-white p-10 rounded-[2.5rem] shadow-lg shadow-[#FF6B6B]/20">
              <ChefHatIcon className="w-12 h-12 mb-6" />
              <h3 className="text-xl font-bold mb-3">Ingin Mencoba?</h3>
              <p className="text-white/80 leading-relaxed">
                Setiap resep adalah awal dari petualangan rasa baru di dapur Anda.
              </p>
            </div>
          </aside>

          {/* Instructions - BOTTOM on mobile, LEFT on desktop */}
          <div className="lg:col-span-8 lg:order-1 space-y-10 md:space-y-16">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-10 flex items-center gap-4">
                <span className="w-8 h-1 bg-[#FF6B6B] rounded-full" />
                Langkah Membuat
              </h2>
              <div className="text-[#4B5563] text-base md:text-lg lg:text-xl leading-[1.8] whitespace-pre-line space-y-4">
                {meal.strInstructions}
              </div>
            </section>

            {youtubeUrl && (
              <section className="space-y-6 md:space-y-8">
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-4">
                  <PlayIcon className="text-[#FF0000] w-8 h-8" />
                  Video Tutorial
                </h2>
                <div className="aspect-video w-full rounded-[2rem] overflow-hidden shadow-2xl">
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
          </div>
        </div>
      </article>
    </main>
  );
}
