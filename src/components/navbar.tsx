"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFavoritesState } from "@/components/favorites-state";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/experiences", label: "Explore" },
  { href: "/favorites", label: "Favorites" },
  { href: "/profile", label: "Profile" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const { favoriteCount } = useFavoritesState();

  return (
    <header className="border-b border-stone-200 bg-white">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-5 gap-y-3 px-5 py-4 sm:px-8">
        <Link aria-current={pathname === "/" ? "page" : undefined} className="rounded-sm text-lg font-semibold tracking-tight text-stone-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800" href="/">Wanderlust Explorer</Link>
        <ul className="flex items-center gap-3 text-sm font-medium text-stone-700 sm:gap-6">
          {navigation.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <li key={href}>
                <Link aria-current={active ? "page" : undefined} className={`rounded-sm transition-colors hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800 ${active ? "font-semibold text-emerald-900 underline decoration-2 underline-offset-8" : ""}`} href={href}>
                  {label}{href === "/favorites" ? <span className="ml-1 text-emerald-800">({favoriteCount})</span> : null}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
