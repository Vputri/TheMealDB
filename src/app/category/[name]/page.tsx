"use client";

import { useParams } from "next/navigation";
import { useFetch, fetchMealsByCategory, useSearch } from "@/utils";
import { Breadcrumbs } from "@/component/common/breadcrumbs";
import { SearchInput } from "@/component/common/search-input";
import { MealCard } from "@/component/features/meals/meal-card";
import { ErrorState, EmptyState } from "@/component/common/state-display";
import { SkeletonCard } from "@/component/common/skeleton-card";

export default function CategoryDetailPage() {
  const params = useParams();
  const categoryName = decodeURIComponent(params.name as string);

  const { data, isLoading, error, refetch } = useFetch({
    fetcher: () => fetchMealsByCategory(categoryName),
  });

  const { query, setQuery, filteredItems } = useSearch(data || [], "strMeal");

  return (
    <main className="max-w-7xl mx-auto px-6 py-8 md:py-12 bg-[#F9FAFB] min-h-screen">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Foods", href: "/categories" },
          { label: categoryName }
        ]}
      />

      <header className="mb-10 md:mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="text-[#FF6B6B]">{categoryName}</span> <br className="hidden md:block" /> 
              Cuisine
            </h1>
            <p className="text-[#6B7280] text-lg max-w-xl">
              Explore delicious and intriguing dishes that fall into the <span className="font-semibold text-[#1F2937]">{categoryName}</span> category.
            </p>
          </div>
          
          <div className="flex-1 max-w-md w-full">
            <div className="hidden md:block text-right mb-4">
              <span className="px-4 py-2 bg-white rounded-2xl shadow-sm border border-[#E5E7EB] text-sm font-medium text-[#6B7280]">
                {filteredItems.length} Recipes Listed
              </span>
            </div>
            <SearchInput
              value={query}
              onChange={setQuery}
              placeholder={`Search ${categoryName} dishes...`}
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
          title="No dishes found"
          message="No dishes are currently listed or match your search."
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
