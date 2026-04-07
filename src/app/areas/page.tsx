"use client";

import Link from "next/link";
import { useFetch, fetchAreas } from "@/utils";
import { ErrorState, EmptyState } from "@/component/common/state-display";
import { GlobeIcon } from "@/component/ui/Icon";

const getAreaFlag = (area: string) => {
  const flags: Record<string, string> = {
    American: "🇺🇸", British: "🇬🇧", Canadian: "🇨🇦", Chinese: "🇨🇳",
    Croatian: "🇭🇷", Dutch: "🇳🇱", Egyptian: "🇪🇬", Filipino: "🇵🇭",
    French: "🇫🇷", Greek: "🇬🇷", Indian: "🇮🇳", Irish: "🇮🇪",
    Italian: "🇮🇹", Jamaican: "🇯🇲", Japanese: "🇯🇵", Kenyan: "🇰🇪",
    Malaysian: "🇲🇾", Mexican: "🇲🇽", Moroccan: "🇲🇦", Polish: "🇵🇱",
    Portuguese: "🇵🇹", Russian: "🇷🇺", Spanish: "🇪🇸", Thai: "🇹🇭",
    Tunisian: "🇹🇳", Turkish: "🇹🇷", Vietnamese: "🇻🇳", Algerian: "🇩🇿",
    Argentinian: "🇦🇷", Australian: "🇦🇺", Norwegian: "🇳🇴", "Saudi Arabian": "🇸🇦",
    Slovakian: "🇸🇰", Syrian: "🇸🇾", Ukrainian: "🇺🇦"
  };
  return flags[area] || "🌍";
};

export default function AreasPage() {
  const { data: areas, isLoading, error, refetch } = useFetch({
    fetcher: fetchAreas,
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 pb-24 min-h-screen bg-[#F9FAFB]">
      <header className="mb-10 md:mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 flex items-center gap-4">
          <GlobeIcon className="w-10 h-10 md:w-12 md:h-12 text-[#FF6B6B]" />
          <span className="text-[#1F2937]">Local Culinary</span>
        </h1>
        <p className="text-[#6B7280] text-lg max-w-xl">
          Discover unique flavors from various regions around the globe.
        </p>
      </header>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
            <div key={n} className="h-20 skeleton-pulse rounded-[1.5rem] w-full" />
          ))}
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={refetch} />
      ) : !areas || areas.length === 0 ? (
        <EmptyState title="No Areas Found" message="There are currently no culinary areas available." />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {areas.filter(a => a.strArea !== "Unknown").map((item) => (
            <Link 
              key={item.strArea} 
              href={`/area/${item.strArea}`}
              className="bg-white p-6 rounded-[1.5rem] shadow-sm border border-[#E5E7EB] flex flex-col items-center justify-center text-center transition-all hover:shadow-md hover:-translate-y-1 hover:border-[#FF6B6B]/20 group"
            >
              <span className="text-4xl mb-3 grayscale-[0.2] transition-transform group-hover:scale-110 group-hover:grayscale-0">{getAreaFlag(item.strArea)}</span>
              <h2 className="text-lg font-bold text-[#1F2937] group-hover:text-[#FF6B6B] transition-colors">{item.strArea}</h2>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
