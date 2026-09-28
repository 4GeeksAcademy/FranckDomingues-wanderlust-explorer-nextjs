import type { ReactNode } from "react";
import { PageContainer } from "@/components/page-container";

export function RoutePlaceholder({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <PageContainer>
      <section aria-labelledby="page-title" className="max-w-3xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-800">
          {eyebrow}
        </p>
        <h1 id="page-title" className="text-4xl font-semibold tracking-tight text-stone-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">{description}</p>
        {children}
      </section>
    </PageContainer>
  );
}
