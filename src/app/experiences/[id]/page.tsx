import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailFavoriteButton } from "@/components/detail-favorite-button";
import { PageContainer } from "@/components/page-container";
import { experiences } from "@/data/experiences";

export default async function ExperienceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const experience = experiences.find((item) => item.id === id);
  if (!experience) notFound();

  return (
    <main>
      <PageContainer>
        <Link className="inline-flex min-h-11 items-center rounded-lg text-sm font-semibold text-emerald-900 underline decoration-emerald-700 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700" href="/experiences">← Back to all experiences</Link>
        <article className="mt-7 grid gap-9 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-stone-200 shadow-sm">
            <Image alt={experience.imageAlt} className="object-cover" fill priority sizes="(max-width: 1024px) 100vw, 60vw" src={experience.imageUrl} unoptimized />
          </div>
          <div className="py-2">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">{experience.category} · {experience.destination}</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">{experience.title}</h1>
            <p className="mt-6 text-lg leading-8 text-stone-600">{experience.description}</p>
            <dl className="mt-8 grid grid-cols-2 gap-4 rounded-2xl border border-stone-200 bg-white p-5">
              <div><dt className="text-sm text-stone-500">Price</dt><dd className="mt-1 font-semibold text-stone-900">${experience.price} / person</dd></div>
              <div><dt className="text-sm text-stone-500">Guest rating</dt><dd className="mt-1 font-semibold text-stone-900"><span aria-hidden="true" className="text-amber-500">★</span> {experience.rating.toFixed(1)} / 5</dd></div>
              <div><dt className="text-sm text-stone-500">Duration</dt><dd className="mt-1 font-semibold text-stone-900">{experience.durationHours} {experience.durationHours === 1 ? "hour" : "hours"}</dd></div>
              <div><dt className="text-sm text-stone-500">Category</dt><dd className="mt-1 font-semibold text-stone-900">{experience.category}</dd></div>
            </dl>
            <DetailFavoriteButton experience={experience} />
          </div>
        </article>
      </PageContainer>
    </main>
  );
}
