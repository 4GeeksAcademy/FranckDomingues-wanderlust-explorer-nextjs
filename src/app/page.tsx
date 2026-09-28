import Link from "next/link";
import { RoutePlaceholder } from "@/components/route-placeholder";

export default function Home() {
  return (
    <main>
      <RoutePlaceholder
        eyebrow="Find your next story"
        title="A world of thoughtful experiences awaits."
        description="Wanderlust Explorer is taking shape. Soon you’ll be able to browse locally curated experiences and save the places that inspire you."
      >
        <Link className="mt-8 inline-flex rounded-full bg-emerald-800 px-6 py-3 font-medium text-white transition-colors hover:bg-emerald-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-800" href="/experiences">
          Explore experiences
        </Link>
      </RoutePlaceholder>
    </main>
  );
}
