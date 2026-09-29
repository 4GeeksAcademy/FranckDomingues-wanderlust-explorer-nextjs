"use client";

import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/types/experience";

export interface ExperienceCardProps {
  experience: Experience;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

export function ExperienceCard({ experience, isFavorite, onToggleFavorite }: ExperienceCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link aria-label={`View ${experience.title}`} className="absolute inset-0 z-0 rounded-3xl focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-emerald-700" href={`/experiences/${experience.id}`}><span className="sr-only">View {experience.title} details</span></Link>
      <div className="pointer-events-none relative aspect-[4/3] overflow-hidden bg-stone-200">
        <Image alt={experience.imageAlt} className="object-cover transition duration-500 group-hover:scale-105" fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" src={experience.imageUrl} unoptimized />
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-stone-800">{experience.category}</span>
        <button
          aria-label={isFavorite ? `Remove ${experience.title} from favorites` : `Add ${experience.title} to favorites`}
          aria-pressed={isFavorite}
          className={`pointer-events-auto absolute right-4 top-4 z-10 grid size-11 place-items-center rounded-full shadow transition focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 ${isFavorite ? "bg-rose-600 text-white" : "bg-white text-stone-800 hover:bg-rose-50 hover:text-rose-700"}`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            onToggleFavorite(experience.id);
          }}
          onKeyDown={(event) => event.stopPropagation()}
          type="button"
        >
          <span aria-hidden="true" className="text-xl leading-none">{isFavorite ? "♥" : "♡"}</span>
        </button>
      </div>
      <div className="relative z-[1] flex flex-1 flex-col p-5 pointer-events-none">
        <p className="text-sm font-medium text-emerald-800">{experience.destination}</p>
        <h2 className="mt-2 text-lg font-semibold leading-snug text-stone-950">{experience.title}</h2>
        <div className="mt-auto flex items-end justify-between gap-3 pt-5 text-sm">
          <span className="font-semibold text-stone-900">${experience.price} <span className="font-normal text-stone-500">/ person</span></span>
          <span aria-label={`Rated ${experience.rating} out of 5`} className="font-medium text-stone-700"><span aria-hidden="true" className="text-amber-500">★</span> {experience.rating.toFixed(1)}</span>
        </div>
      </div>
    </article>
  );
}
