import { Suspense } from "react";
import { Explorer } from "@/components/explorer";

export default function ExperiencesPage() {
  return (
    <Suspense fallback={<main className="mx-auto min-h-[60vh] max-w-7xl px-5 py-14 sm:px-8">Loading experiences…</main>}>
      <Explorer />
    </Suspense>
  );
}
