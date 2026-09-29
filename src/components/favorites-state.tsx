"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

export interface FavoritesState {
  favoriteIds: string[];
  favoriteCount: number;
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesState | null>(null);

/** App-level state owner; state intentionally resets on a full refresh. */
export function FavoritesStateProvider({ children }: { children: ReactNode }) {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((current) => current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id]);
  }, []);
  const isFavorite = useCallback((id: string) => favoriteIds.includes(id), [favoriteIds]);
  const value = useMemo(() => ({ favoriteIds, favoriteCount: favoriteIds.length, isFavorite, toggleFavorite }), [favoriteIds, isFavorite, toggleFavorite]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavoritesState() {
  const state = useContext(FavoritesContext);
  if (!state) throw new Error("useFavoritesState must be used within FavoritesStateProvider.");
  return state;
}
