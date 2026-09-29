"use client";

import Link from "next/link";
import { useFavoritesState } from "@/components/favorites-state";

export function ProfileSummary() {
  const { favoriteCount } = useFavoritesState();
  return (
    <section aria-labelledby="profile-title" className="mx-auto max-w-3xl">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">Your travel space</p>
      <h1 className="text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl" id="profile-title">Your profile</h1>
      <p className="mt-4 text-lg leading-8 text-stone-600">A little home for the places and experiences that stay with you.</p>
      <div className="mt-8 rounded-3xl border border-stone-200 bg-white p-7 shadow-sm sm:p-9">
        <div className="flex size-16 items-center justify-center rounded-full bg-emerald-100 text-2xl font-semibold text-emerald-900" aria-hidden="true">W</div>
        <h2 className="mt-5 text-2xl font-semibold text-stone-950">Wanderlust Traveler</h2>
        <p className="mt-2 text-stone-600">Curious by nature · Collecting memorable days</p>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-stone-200 pt-6">
          <div><p className="text-sm text-stone-500">Saved experiences</p><p className="mt-1 text-3xl font-semibold text-stone-950">{favoriteCount}</p></div>
          <Link className="inline-flex min-h-11 items-center rounded-full bg-emerald-900 px-5 py-2 font-semibold text-white transition hover:bg-emerald-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-emerald-700" href="/favorites">View favorites</Link>
        </div>
      </div>
    </section>
  );
}
