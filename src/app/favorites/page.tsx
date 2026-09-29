"use client";

import Link from "next/link";
import { ExperienceGrid } from "@/components/experience-grid";
import { PageContainer } from "@/components/page-container";
import { useFavoritesState } from "@/components/favorites-state";
import { experiences } from "@/data/experiences";

export default function FavoritesPage() {
  const { favoriteIds } = useFavoritesState();
  const favorites = experiences.filter((experience) => favoriteIds.includes(experience.id));

  return (
    <main>
      <PageContainer>
        <section aria-labelledby="favorites-title">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">Your saved list</p>
          <h1 className="text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl" id="favorites-title">Favorites</h1>
          <p className="mt-4 text-lg text-stone-600">A collection of the experiences you would love to remember.</p>
          {favorites.length ? (
            <div className="mt-8"><ExperienceGrid experiences={favorites} /></div>
          ) : (
            <div className="mt-8 rounded-3xl border border-stone-200 bg-white p-8 text-center sm:p-12">
              <p className="text-lg font-semibold text-stone-900">Your saved collection is ready for its first experience.</p>
              <p className="mt-2 text-stone-600">Tap the heart on any experience to keep it close.</p>
              <Link className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-900 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-emerald-700" href="/experiences">Explore experiences</Link>
            </div>
          )}
        </section>
      </PageContainer>
    </main>
  );
}
