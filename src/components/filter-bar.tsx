"use client";

import { EXPERIENCE_CATEGORIES } from "@/types/experience";
import type { ExperienceCategory } from "@/types/experience";

export interface FilterBarProps {
  category: ExperienceCategory | "";
  destination: string;
  destinations: string[];
  onCategoryChange: (category: ExperienceCategory | "") => void;
  onDestinationChange: (destination: string) => void;
  onReset: () => void;
  hasFilters: boolean;
}

export function FilterBar({ category, destination, destinations, onCategoryChange, onDestinationChange, onReset, hasFilters }: FilterBarProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 sm:items-end">
      <div>
        <label className="mb-2 block text-sm font-semibold text-stone-800" htmlFor="experience-category">Category</label>
        <select className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-950 shadow-sm outline-none focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/15" id="experience-category" onChange={(event) => onCategoryChange(event.target.value as ExperienceCategory | "")} value={category}>
          <option value="">All categories</option>
          {EXPERIENCE_CATEGORIES.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-semibold text-stone-800" htmlFor="experience-destination">Destination</label>
        <select className="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-base text-stone-950 shadow-sm outline-none focus:border-emerald-700 focus:ring-4 focus:ring-emerald-700/15" id="experience-destination" onChange={(event) => onDestinationChange(event.target.value)} value={destination}>
          <option value="">Everywhere</option>
          {destinations.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </div>
      <button className="w-fit rounded-full px-4 py-2 text-sm font-semibold text-emerald-900 underline decoration-emerald-700 underline-offset-4 hover:text-emerald-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 disabled:cursor-not-allowed disabled:text-stone-400 disabled:no-underline sm:col-span-2" disabled={!hasFilters} onClick={onReset} type="button">Clear filters</button>
    </div>
  );
}
