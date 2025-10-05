import { defineCollection, z } from "astro:content";

const races = defineCollection({
  type: "content",
  schema: z.object({
    id: z.string(),
    name: z.object({
      en: z.string(),
      da: z.string(),
    }),
    date: z.string(),
    location: z.object({
      en: z.string(),
      da: z.string(),
    }),
    description: z.object({
      en: z.string(),
      da: z.string(),
    }),
    category: z.enum([
      "road",
      "trail",
      "track",
      "ultra",
      "marathon",
      "half-marathon",
      "10k",
      "5k",
    ]),
    distance: z.number(),
    status: z.enum(["upcoming", "completed"]),
    results: z
      .object({
        time: z.string().optional(),
        position: z.number().optional(),
        totalParticipants: z.number().optional(),
        pace: z.string().optional(),
      })
      .optional(),
    media: z
      .object({
        videos: z.array(z.string()).optional(),
        photos: z.array(z.string()).optional(),
      })
      .optional(),
    projectUrl: z.string().optional(),
    stravaUrl: z.string().optional(),
  }),
});

export const collections = {
  races,
};
