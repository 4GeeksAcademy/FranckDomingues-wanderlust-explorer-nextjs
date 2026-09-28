export const EXPERIENCE_CATEGORIES = [
  "Adventure",
  "Culture",
  "Food",
  "Nature",
  "Relaxation",
] as const;

export type ExperienceCategory = (typeof EXPERIENCE_CATEGORIES)[number];

/** The single canonical contract for a locally curated travel experience. */
export interface Experience {
  /** Stable unique slug used by the detail route and favorites collection. */
  id: string;
  /** Concise, human-readable name of the activity. */
  title: string;
  /** One of the supported discovery categories. */
  category: ExperienceCategory;
  /** Display destination in `City, Country` form. */
  destination: string;
  /** Estimated per-person price in whole US dollars. */
  price: number;
  /** Editorial score on a 1–5 scale. */
  rating: number;
  /** Short, useful summary of what a traveler can expect. */
  description: string;
  /** Stable, directly usable image URL; no runtime image API is required. */
  image: string;
  /** Accessible description of the image subject. */
  imageAlt: string;
  /** Typical activity duration in hours. */
  durationHours: number;
}
