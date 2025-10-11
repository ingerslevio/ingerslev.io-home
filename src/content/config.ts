import { defineCollection, z } from "astro:content";

const races = defineCollection({
  type: "data",
  schema: z.object({
    id: z.string(),
    name: z.string(),
    date: z.string(),
    distance: z.string().optional(),
    timeInHours: z.string().optional(),
    place: z.string().optional(),
    stravaUrl: z.string().optional(),
    description: z.string().optional(),
  }),
});

const mentions = defineCollection({
  type: "data",
  schema: z.object({
    id: z.string(),
    title: z.string(),
    titleEn: z.string().optional(), // English title if different
    type: z.enum(["news", "podcast"]),
    date: z.string(), // ISO date string
    description: z.string(),
    descriptionEn: z.string().optional(), // English description if different
    image: z.string().optional(), // Image URL
    // For news articles
    source: z.string().optional(), // News source name
    sourceUrl: z.string().optional(), // Link to news article
    // For podcasts
    platforms: z
      .array(
        z.object({
          name: z.string(), // "Spotify", "Apple Podcasts", "Google Podcasts", etc.
          url: z.string(),
          icon: z.string().optional(), // Icon class or URL
        })
      )
      .optional(),
    // Language support
    languages: z.array(z.enum(["da", "en"])).default(["da"]), // Which languages this mention is available in
    // Additional metadata
    tags: z.array(z.string()).optional(),
    featured: z.boolean().default(false), // Whether to feature this mention prominently
  }),
});

export const collections = {
  races,
  mentions,
};
