"use client";

import { useFavoritesState } from "@/components/favorites-state";
import type { Experience } from "@/types/experience";

export function DetailFavoriteButton({ experience }: { experience: Experience }) {
  const { isFavorite, toggleFavorite } = useFavoritesState();
  const favorite = isFavorite(experience.id);
  return (
    <button
      aria-pressed={favorite}
      className={`mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 font-semibold transition focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${favorite ? "bg-rose-100 text-rose-800 hover:bg-rose-200" : "bg-emerald-900 text-white hover:bg-emerald-800"}`}
      onClick={() => toggleFavorite(experience.id)}
      type="button"
    >
      <span aria-hidden="true">{favorite ? "♥" : "♡"}</span>
      {favorite ? "Saved to favorites" : "Save to favorites"}
    </button>
  );
}
