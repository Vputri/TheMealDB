"use client";

import { useParams } from "next/navigation";
import { useFetch, fetchMealsByArea, useSearch } from "@/utils";
import { Breadcrumbs } from "@/component/common/breadcrumbs";
import { SearchInput } from "@/component/common/search-input";
import { MealCard } from "@/component/features/meals/meal-card";
import { ErrorState, EmptyState } from "@/component/common/state-display";
import { SkeletonCard } from "@/component/common/skeleton-card";

export default function AreaDetailPage() {
  const params = useParams();
  const areaName = decodeURIComponent(params.name as string);

  const { data, isLoading, error, refetch } = useFetch({
    fetcher: () => fetchMealsByArea(areaName),
  });

  const { query, setQuery, filteredItems } = useSearch(data || [], "strMeal");

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 md:py-12 bg-[#F9FAFB] min-h-screen">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Area", href: "/areas" },
          { label: areaName }
        ]}
      />

      <header className="mb-10 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Koleksi <br className="hidden md:block" /> 
              <span className="text-[#FF6B6B]">{areaName}</span>
            </h1>
            <p className="text-[#6B7280] text-lg max-w-xl">
              Cicipi warisan masakan asik dan autentik dari <span className="font-semibold text-[#1F2937]">{areaName}</span>.
            </p>
          </div>
          
          <div className="flex-1 max-w-md w-full">
            <div className="hidden md:block text-right mb-4">
              <span className="px-4 py-2 bg-white rounded-2xl shadow-sm border border-[#E5E7EB] text-sm font-medium text-[#6B7280]">
                {filteredItems.length} Resep Klasik
              </span>
            </div>
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder={`Cari dari ${areaName}...`}
            />
          </div>
        </div>
      </header>

      {error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <SkeletonCard count={8} />
        </div>
      ) : filteredItems.length === 0 ? (
        <EmptyState
          title="Tidak ada masakan ditemukan"
          message="Daerah ini belum memiliki list masakan pada TheMealDB."
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((meal) => (
            <MealCard key={meal.idMeal} meal={meal} />
          ))}
        </div>
      )}
    </main>
  );
}
