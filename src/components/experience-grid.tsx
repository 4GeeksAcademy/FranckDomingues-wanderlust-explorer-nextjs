"use client";

import { ExperienceCard } from "@/components/experience-card";
import { useFavoritesState } from "@/components/favorites-state";
import type { Experience } from "@/types/experience";

export function ExperienceGrid({ experiences }: { experiences: Experience[] }) {
  const { isFavorite, toggleFavorite } = useFavoritesState();
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {experiences.map((experience) => (
        <ExperienceCard experience={experience} isFavorite={isFavorite(experience.id)} key={experience.id} onToggleFavorite={toggleFavorite} />
      ))}
    </div>
  );
}
