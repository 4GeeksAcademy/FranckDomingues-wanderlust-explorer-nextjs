import { RoutePlaceholder } from "@/components/route-placeholder";

export default function FavoritesPage() {
  return (
    <main>
      <RoutePlaceholder
        eyebrow="Your saved list"
        title="Favorites"
        description="Your saved experiences will appear here when favorites state is introduced. Favorites will live in React state and will reset on refresh unless official requirements specify otherwise."
      />
    </main>
  );
}
