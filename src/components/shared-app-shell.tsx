"use client";

import type { ReactNode } from "react";
import { FavoritesStateProvider } from "@/components/favorites-state";
import { Navbar } from "@/components/navbar";

export function SharedAppShell({ children }: { children: ReactNode }) {
  return <FavoritesStateProvider><Navbar />{children}</FavoritesStateProvider>;
}
