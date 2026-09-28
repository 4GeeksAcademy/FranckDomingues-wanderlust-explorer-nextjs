import { experiences } from "./experiences";
import { EXPERIENCE_CATEGORIES } from "@/types/experience";

const expectedCount = 100;
const ids = new Set<string>();
const errors: string[] = [];

if (experiences.length !== expectedCount) {
  errors.push(`Expected ${expectedCount} records, received ${experiences.length}.`);
}

for (const [index, experience] of experiences.entries()) {
  const label = `record ${index + 1} (${experience.id || "missing id"})`;
  if (ids.has(experience.id)) errors.push(`${label}: duplicate id.`);
  ids.add(experience.id);

  for (const [field, value] of Object.entries({
    id: experience.id,
    title: experience.title,
    category: experience.category,
    destination: experience.destination,
    description: experience.description,
    imageUrl: experience.imageUrl,
    imageAlt: experience.imageAlt,
  })) {
    if (typeof value !== "string" || value.trim().length === 0) {
      errors.push(`${label}: ${field} must be a non-empty string.`);
    }
  }

  if (!EXPERIENCE_CATEGORIES.includes(experience.category)) {
    errors.push(`${label}: unsupported category "${experience.category}".`);
  }
  const destinationParts = experience.destination.split(",").map((part) => part.trim());
  if (destinationParts.length < 2 || destinationParts.some((part) => part.length === 0)) {
    errors.push(`${label}: destination must include non-empty city and country values.`);
  }
  if (!Number.isFinite(experience.price) || experience.price <= 0) {
    errors.push(`${label}: price must be a positive finite number.`);
  }
  if (!Number.isFinite(experience.rating) || experience.rating < 1 || experience.rating > 5) {
    errors.push(`${label}: rating must be between 1 and 5.`);
  }
  if (!Number.isFinite(experience.durationHours) || experience.durationHours <= 0) {
    errors.push(`${label}: durationHours must be a positive finite number.`);
  }
  if (!/^https:\/\/images\.unsplash\.com\/[\w-]+\?/.test(experience.imageUrl)) {
    errors.push(`${label}: imageUrl must be a usable HTTPS Unsplash image URL.`);
  }
}

if (errors.length > 0) {
  console.error(`Experience dataset validation failed (${errors.length} issue(s)):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`Experience dataset valid: ${experiences.length} records, unique IDs, required fields, categories, numeric values, and image URLs.`);
}
