import { RoutePlaceholder } from "@/components/route-placeholder";

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main>
      <RoutePlaceholder
        eyebrow="Experience details"
        title="An experience to remember"
        description={`The experience “${id}” will be resolved from the canonical local dataset here in the next implementation block.`}
      />
    </main>
  );
}
