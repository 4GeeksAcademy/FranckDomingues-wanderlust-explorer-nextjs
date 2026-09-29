"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { experiences } from "@/data/experiences";
import { ExperienceCard } from "@/components/experience-card";
import { FilterBar } from "@/components/filter-bar";
import { PageContainer } from "@/components/page-container";
import { SearchBar } from "@/components/search-bar";
import { useFavoritesState } from "@/components/favorites-state";
import { useExperiences } from "@/hooks/use-experiences";
import { EXPERIENCE_CATEGORIES } from "@/types/experience";
import type { ExperienceCategory } from "@/types/experience";

interface ExplorerFilters {
  search: string;
  category: ExperienceCategory | "";
  destination: string;
}

const categoryBySlug = new Map<string, ExperienceCategory>(
  EXPERIENCE_CATEGORIES.map((category) => [category.toLowerCase(), category]),
);

function readQuery(searchParams: URLSearchParams): ExplorerFilters {
  const search = searchParams.get("search") ?? "";
  const rawCategory = searchParams.get("category")?.toLowerCase() ?? "";
  const category = categoryBySlug.get(rawCategory) ?? "";
  const requestedDestination = searchParams.get("destination") ?? "";
  const availableDestinations = new Set(experiences.flatMap((experience) => {
    const country = experience.destination.split(",").slice(1).map((part) => part.trim()).join(", ");
    return country ? [experience.destination, country] : [experience.destination];
  }));
  const destination = availableDestinations.has(requestedDestination)
    ? requestedDestination
    : "";
  return { search, category, destination };
}

export function Explorer() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const { isFavorite, toggleFavorite } = useFavoritesState();
  const destinations = useMemo(
    () => [...new Set(experiences.flatMap((experience) => {
      const parts = experience.destination.split(",").map((part) => part.trim());
      const country = parts.slice(1).join(", ");
      return country ? [experience.destination, country] : [experience.destination];
    }))].sort((a, b) => a.localeCompare(b)),
    [],
  );
  const [filters, setFilters] = useState<ExplorerFilters>(() => readQuery(new URLSearchParams(queryString)));

  useEffect(() => {
    setFilters(readQuery(new URLSearchParams(queryString)));
  }, [queryString]);

  const updateFilters = useCallback((next: ExplorerFilters) => {
    const params = new URLSearchParams();
    if (next.search) params.set("search", next.search);
    if (next.category) params.set("category", next.category.toLowerCase());
    if (next.destination) params.set("destination", next.destination);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router]);

  const changeFilter = useCallback((key: keyof typeof filters, value: string) => {
    const next: ExplorerFilters = {
      ...filters,
      [key]: key === "category" ? value as ExperienceCategory | "" : value,
    };
    setFilters(next);
    updateFilters(next);
  }, [filters, updateFilters]);

  const resetFilters = useCallback(() => {
    const next = { search: "", category: "" as const, destination: "" };
    setFilters(next);
    router.replace(pathname, { scroll: false });
  }, [pathname, router]);

  const { filteredExperiences, invalidSearch } = useExperiences(experiences, filters);

  return (
    <main>
      <PageContainer>
        <section aria-labelledby="explorer-title">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">Find your next story</p>
          <h1 className="text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl" id="explorer-title">Explore experiences</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">Thoughtfully chosen ways to discover a place, meet its people, and make the day your own.</p>
          <div className="mt-8 grid gap-6 rounded-3xl border border-stone-200 bg-white p-5 shadow-sm sm:p-7">
            <SearchBar onChange={(value) => changeFilter("search", value)} value={filters.search} />
            <FilterBar
              category={filters.category}
              destination={filters.destination}
              destinations={destinations}
              hasFilters={Boolean(filters.search || filters.category || filters.destination)}
              onCategoryChange={(value) => changeFilter("category", value)}
              onDestinationChange={(value) => changeFilter("destination", value)}
              onReset={resetFilters}
            />
          </div>
          <div aria-live="polite" className="mt-8 flex flex-wrap items-center justify-between gap-2">
            <h2 className="text-xl font-semibold text-stone-950">Your next memorable day</h2>
            <p className="text-sm text-stone-600">{filteredExperiences.length} {filteredExperiences.length === 1 ? "experience" : "experiences"}</p>
          </div>
          {invalidSearch ? <p className="mt-3 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-950" role="status">That search pattern is not valid. Check the regular expression and try again.</p> : null}
          {filteredExperiences.length === 0 ? (
            <p className="mt-8 rounded-2xl border border-stone-200 bg-white p-8 text-center text-lg font-medium text-stone-700">No se encontraron resultados</p>
          ) : (
            <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredExperiences.map((experience) => (
                <ExperienceCard experience={experience} isFavorite={isFavorite(experience.id)} key={experience.id} onToggleFavorite={toggleFavorite} />
              ))}
            </div>
          )}
        </section>
      </PageContainer>
    </main>
  );
}
