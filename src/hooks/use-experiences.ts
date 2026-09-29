import { useMemo } from "react";
import type { Experience, ExperienceCategory } from "@/types/experience";

export interface ExperienceFilters {
  search: string;
  category: ExperienceCategory | "";
  destination: string;
}

export interface UseExperiencesResult {
  filteredExperiences: Experience[];
  invalidSearch: boolean;
}

/** Derives the matching records from the canonical collection without mutating it. */
export function filterExperiences(experiences: readonly Experience[], filters: ExperienceFilters): UseExperiencesResult {
  let titlePattern: RegExp | null = null;
  if (filters.search) {
    try {
      titlePattern = new RegExp(filters.search, "i");
    } catch {
      return { filteredExperiences: [], invalidSearch: true };
    }
  }

  return {
    filteredExperiences: experiences.filter((experience) =>
      (!titlePattern || titlePattern.test(experience.title)) &&
      (!filters.category || experience.category === filters.category) &&
      (!filters.destination || experience.destination === filters.destination || experience.destination.endsWith(`, ${filters.destination}`)),
    ),
    invalidSearch: false,
  };
}

export function useExperiences(experiences: readonly Experience[], filters: ExperienceFilters): UseExperiencesResult {
  const { category, destination, search } = filters;
  return useMemo(
    () => filterExperiences(experiences, { category, destination, search }),
    [experiences, category, destination, search],
  );
}
