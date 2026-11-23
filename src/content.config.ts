import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

/*
  Content collections for AmritaCTALab (Astro 6 Content Layer API).
  All content lives in Markdown files under src/content/ so updating
  team members or adding new publications is a simple git commit.
*/

const people = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/people" }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      status: z.enum(["current", "collaborator", "alumni"]),
      group: z.enum([
        "Lab Director",
        "Research Interns",
        "Collaborators",
        "Alumni",
      ]),
      role: z.string(),
      affiliation: z.string().optional(),
      title: z.string().optional(),
      headshot: image().optional(),
      links: z
        .object({
          email: z.email().optional(),
          twitter: z.url().optional(),
          scholar: z.url().optional(),
          orcid: z.url().optional(),
          linkedin: z.url().optional(),
          github: z.url().optional(),
          website: z.url().optional(),
        })
        .default({}),
      order: z.number().default(0),
      featured: z.boolean().default(false),
    }),
});

const publications = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/publications" }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    year: z.number(),
    venue: z.string(),
    venueType: z.enum(["journal", "chapter", "book", "conference"]).default("journal"),
    metrics: z.string().optional(),
    doi: z.string().optional(),
    url: z.url().optional(),
    scholarUrl: z.url().optional(),
    citations: z.number().optional(),
    piFirstOrSenior: z.boolean().default(false),
    featured: z.boolean().default(false),
    openAccess: z.boolean().default(false),
    areas: z
      .array(
        z.enum([
          "semantic-text",
          "social-nlp",
          "health-nlp",
          "legal-responsible-ai",
          "indic-nlp",
          "llm-rag",
          "vision-applied-ai",
        ]),
      )
      .default([]),
  }),
});

export const collections = { people, publications };
