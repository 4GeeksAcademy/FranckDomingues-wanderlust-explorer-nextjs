import Image from "next/image";
import Link from "next/link";
import { experiences } from "@/data/experiences";

export default function Home() {
  const featuredExperience = experiences[0];
  return (
    <main>
      <section className="mx-auto grid min-h-[calc(100svh-5rem)] w-full max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:gap-14 lg:py-16">
        <div className="max-w-2xl">
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-emerald-800">A little closer to everywhere</p>
          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight text-stone-950 sm:text-6xl lg:text-7xl">Find the feeling of <span className="text-emerald-800">being there.</span></h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-stone-600 sm:text-xl">Discover thoughtful local experiences—from quiet neighborhood rituals to days out in the wild. Find a story that feels like yours.</p>
          <Link className="mt-9 inline-flex min-h-14 items-center justify-center rounded-full bg-emerald-900 px-7 py-3.5 font-semibold text-white shadow-sm transition hover:bg-emerald-800 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-emerald-700" href="/experiences">Explore experiences <span aria-hidden="true" className="ml-2">→</span></Link>
          <p className="mt-5 text-sm text-stone-500">A curated collection of 100 memorable ways to explore.</p>
        </div>
        <div className="relative mx-auto aspect-[4/4.2] w-full max-w-xl overflow-hidden rounded-[2rem] bg-stone-200 shadow-xl lg:aspect-[4/4.5]">
          <Image alt={featuredExperience.imageAlt} className="object-cover" fill priority sizes="(max-width: 1024px) 100vw, 45vw" src={featuredExperience.imageUrl} unoptimized />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent p-6 pt-24 text-white sm:p-8 sm:pt-28">
            <p className="text-sm font-medium text-white/80">A glimpse of what’s out there</p>
            <p className="mt-2 text-xl font-semibold sm:text-2xl">{featuredExperience.title}</p>
            <p className="mt-1 text-sm text-white/85">{featuredExperience.destination}</p>
          </div>
          <span className="absolute right-4 top-4 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-stone-800 shadow">100 local experiences</span>
        </div>
      </section>
    </main>
  );
}
