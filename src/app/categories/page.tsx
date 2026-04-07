"use client";

import Link from "next/link";
import Image from "next/image";
import { useFetch, fetchDetailedCategories } from "@/utils";
import { ErrorState, EmptyState } from "@/component/common/state-display";

export default function CategoriesPage() {
  const { data: categories, isLoading, error, refetch } = useFetch({
    fetcher: fetchDetailedCategories,
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 pb-24 min-h-screen bg-[#F9FAFB]">
      <header className="mb-10 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          <span className="text-[#FF6B6B]">Food</span> Categories
        </h1>
        <p className="text-[#6B7280] text-lg max-w-xl">
          Explore various cuisine types from around the world based on their primary categories.
        </p>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
            <div key={n} className="h-32 skeleton-pulse rounded-[2rem] w-full" />
          ))}
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : !categories || categories.length === 0 ? (
        <EmptyState title="No Categories Found" message="There are currently no food categories available." />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((item) => (
            <Link 
              key={item.strCategory} 
              href={`/category/${item.strCategory}`}
              className="relative aspect-video rounded-[1.5rem] overflow-hidden shadow-sm flex items-center justify-center transition-all hover:shadow-lg hover:-translate-y-1 group"
            >
              <Image 
                src={item.strCategoryThumb}
                alt={item.strCategory}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <h2 className="relative text-xl md:text-2xl font-bold text-white tracking-wide">{item.strCategory}</h2>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
