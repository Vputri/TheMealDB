"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

export function Header() {
  const pathname = usePathname();

  const links = [
    { name: "Bahan", href: "/" },
    { name: "Kategori", href: "/categories" },
    { name: "Area", href: "/areas" },
    { name: "Favorit", href: "/favorites" },
  ];

  return (
    <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-[#1F2937] tracking-tight hover:opacity-80 transition-opacity">
          Recipe<span className="text-[#FF6B6B]">Explorer</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-semibold transition-colors hover:text-[#FF6B6B] relative py-2",
                pathname === link.href ? "text-[#FF6B6B]" : "text-[#6B7280]"
              )}
            >
              {link.name}
              {pathname === link.href && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#FF6B6B] rounded-full" />
              )}
            </Link>
          ))}
        </nav>
        {/* Mobile Navigation would go here, simplified for now */}
        <div className="flex md:hidden items-center gap-4">
          <Link href="/favorites" className="text-sm font-semibold text-[#FF6B6B]">
            Favorit
          </Link>
          <Link href="/categories" className="text-sm font-semibold text-[#6B7280]">
            Menu
          </Link>
        </div>
      </div>
    </header>
  );
}
