"use client";

import Link from "next/link";
import { useFetch, fetchCategories } from "@/utils";
import { ErrorState, EmptyState } from "@/component/common/state-display";

export default function CategoriesPage() {
  const { data: categories, isLoading, error, refetch } = useFetch({
    fetcher: fetchCategories,
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 pb-24 min-h-screen bg-[#F9FAFB]">
      <header className="mb-10 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          <span className="text-[#FF6B6B]">Kategori</span> Makanan
        </h1>
        <p className="text-[#6B7280] text-lg max-w-xl">
          Eksplorasi berbagai jenis masakan dari seluruh dunia berdasarkan kategori utamanya.
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
        <EmptyState title="Kategori Kosong" message="Tidak ada kategori masakan yang tersedia saat ini." />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((item) => (
            <Link 
              key={item.strCategory} 
              href={`/category/${item.strCategory}`}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-[#E5E7EB] flex items-center justify-center text-center transition-all hover:shadow-md hover:-translate-y-1 hover:border-[#FF6B6B]/20 group"
            >
              <h2 className="text-xl md:text-2xl font-bold text-[#1F2937] group-hover:text-[#FF6B6B] transition-colors">{item.strCategory}</h2>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
