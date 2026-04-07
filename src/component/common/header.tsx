"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

export function Header() {
  const pathname = usePathname();

  const links = [
    { 
      name: "Ingredients", 
      href: "/",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    },
    { 
      name: "Foods", 
      href: "/categories",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>
    },
    { 
      name: "Local Culinary", 
      href: "/areas",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
    },
    { 
      name: "My Favorites", 
      href: "/favorites",
      icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
    },
  ];

  return (
    <>
      <header className="bg-white border-b border-[#E5E7EB] sticky top-0 z-50 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-bold text-xl text-[#1F2937] tracking-tight hover:opacity-80 transition-opacity">
            Recipe<span className="text-[#FF6B6B]">Explorer</span>
          </Link>
          <nav className="flex items-center gap-8">
            {links.map(link => (
              <Link 
                key={link.href} 
                href={link.href}
                className={cn(
                  "text-sm font-semibold transition-colors relative py-2",
                  pathname === link.href ? "text-[#FF6B6B]" : "text-[#6B7280] hover:text-[#1F2937]"
                )}
              >
                {link.name}
                {pathname === link.href && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF6B6B] rounded-full" />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Navbar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-[#E5E7EB] px-2 py-2 z-50 flex items-center justify-between pb-safe shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {links.map(link => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 h-14 gap-1 transition-all",
                isActive ? "text-[#FF6B6B] -translate-y-1" : "text-[#9CA3AF] hover:text-[#6B7280]"
              )}
            >
              <div className={cn("transition-transform duration-300", isActive && "scale-110")}>
                {link.icon}
              </div>
              <span className="text-[10px] font-semibold whitespace-nowrap">{link.name}</span>
            </Link>
          );
        })}
      </nav>
      
      {/* Spacer object to prevent mobile nav from hiding actual page content */}
      <div className="h-16 md:hidden block" />
    </>
  );
}
