import { getCollection, type CollectionEntry } from "astro:content";

export type Person = CollectionEntry<"people">;
export type Publication = CollectionEntry<"publications">;

export type AreaSlug =
  | "semantic-text"
  | "social-nlp"
  | "health-nlp"
  | "legal-responsible-ai"
  | "indic-nlp"
  | "llm-rag"
  | "vision-applied-ai";

export const AREA_LABELS: Record<AreaSlug, string> = {
  "semantic-text": "Semantic Text Analytics & Kernels",
  "social-nlp": "SocialNLP & Public Discourse",
  "health-nlp": "Healthcare & Mental Health NLP",
  "legal-responsible-ai": "Legal & Responsible AI",
  "indic-nlp": "IndicNLP & Low-Resource Languages",
  "llm-rag": "LLMs & Retrieval-Augmented Generation",
  "vision-applied-ai": "Applied Deep Learning",
};

export const RESEARCH_GROUPS: {
  title: string;
  subtitle: string;
  areas: { slug: AreaSlug; blurb: string }[];
}[] = [
  {
    title: "Societal Domains",
    subtitle: "Applying language intelligence to high-impact real-world challenges.",
    areas: [
      {
        slug: "social-nlp",
        blurb:
          "Analyzing public discourse, climate sentiment, crisis signals, and online safety across social platforms to build a safer, better-informed society.",
      },
      {
        slug: "health-nlp",
        blurb:
          "Developing biomedical language models, clinical information extraction, and compassionate NLP methods for healthcare decisions and mental well-being.",
      },
      {
        slug: "legal-responsible-ai",
        blurb:
          "Domain-adapted Indian Legal AI, interpretable models, and transparent frameworks that make AI systems ethical, auditable, and equitable.",
      },
    ],
  },
  {
    title: "Core Methods & Foundations",
    subtitle: "Computational frameworks, representations, and multilingual tooling.",
    areas: [
      {
        slug: "semantic-text",
        blurb:
          "Hybrid interpretable Semantic Text Kernels, topic-weighted representations, concept lattices, and deep semantic analysis for large textual corpora.",
      },
      {
        slug: "indic-nlp",
        blurb:
          "Datasets, POS tagging, named entity recognition, and deep learning architectures tailored for Malayalam and low-resource Indian languages.",
      },
      {
        slug: "llm-rag",
        blurb:
          "Parameter-efficient fine-tuning (LoRA), voice-enabled document QA, and retrieval-augmented generation for grounded, domain-specific applications.",
      },
    ],
  },
];

export const FILTER_GROUPS: { title: string; slugs: AreaSlug[] }[] = [
  {
    title: "Domain",
    slugs: ["social-nlp", "health-nlp", "legal-responsible-ai"],
  },
  {
    title: "Method",
    slugs: ["semantic-text", "indic-nlp", "llm-rag", "vision-applied-ai"],
  },
];

export async function getResearchGroups(limit = 4) {
  const pubs = await getPublications();
  return RESEARCH_GROUPS.map((g) => ({
    title: g.title,
    subtitle: g.subtitle,
    areas: g.areas
      .map((a) => {
        const all = pubs.filter((p) => p.data.areas.includes(a.slug));
        return {
          slug: a.slug,
          label: AREA_LABELS[a.slug],
          blurb: a.blurb,
          pubs: all.slice(0, limit),
          total: all.length,
        };
      })
      .filter((a) => a.total > 0),
  })).filter((g) => g.areas.length > 0);
}

export async function getAreaCounts() {
  const pubs = await getPublications();
  const counts: Partial<Record<AreaSlug, number>> = {};
  for (const p of pubs) {
    for (const a of p.data.areas as AreaSlug[]) {
      counts[a] = (counts[a] || 0) + 1;
    }
  }
  return counts;
}

export const GROUP_ORDER = [
  "Lab Director",
  "Research Interns",
  "Collaborators",
  "Alumni",
] as const;

const byOrder = (a: Person, b: Person) =>
  a.data.order - b.data.order || a.data.name.localeCompare(b.data.name);

export async function getGroupedPeople() {
  const people = await getCollection("people");
  return GROUP_ORDER.map((group) => ({
    group,
    people: people.filter((p) => p.data.group === group).sort(byOrder),
  })).filter((g) => g.people.length > 0);
}

export async function getPublications() {
  const pubs = await getCollection("publications");
  return pubs.sort(
    (a, b) =>
      b.data.year - a.data.year ||
      Number(b.data.featured) - Number(a.data.featured) ||
      a.data.title.localeCompare(b.data.title),
  );
}

// --- Author <-> Person matching (supports Indian/academic initials like "Anoop, V. S.", "Meena, P. N.", "Asharaf, S.") ---

const normTokens = (s: string) =>
  s
    .toLowerCase()
    .replace(/^(dr\.?|prof\.?)\s+/i, "")
    .normalize("NFKD")
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

export interface PersonKey {
  slug: string;
  primaryNames: string[]; // tokens with length >= 3
  allTokens: string[];
}

export function personKey(name: string, slug = ""): PersonKey {
  const toks = normTokens(name);
  return {
    slug,
    primaryNames: toks.filter((t) => t.length >= 3),
    allTokens: toks,
  };
}

/**
 * Matches author strings such as "Anoop, V. S.", "Meena, P. N.", "Fawaz, J. M.",
 * "Denil Tom Jaison", "Ardra, K. R.", "Asharaf, S.", "Suhasini Verma" against a PersonKey.
 */
export function authorIsPerson(author: string, pk: PersonKey): boolean {
  if (pk.primaryNames.length === 0) return false;
  const aToks = normTokens(author);
  if (aToks.length === 0) return false;
  const aLong = aToks.filter((t) => t.length >= 3);

  // Exact match on all significant name words (e.g., "Suhasini Verma", "Denil Tom Jaison")
  if (
    pk.primaryNames.length >= 2 &&
    pk.primaryNames.every((t) => aLong.includes(t))
  ) {
    return true;
  }

  // Single primary name (e.g., "Dr. Anoop V. S." -> ["anoop"], "Meena P. N." -> ["meena"], "Asharaf S." -> ["asharaf"])
  if (pk.primaryNames.length === 1) {
    const target = pk.primaryNames[0];
    if (!aLong.includes(target)) return false;
    // Check initials if both have single-letter tokens
    const pInits = pk.allTokens.filter((t) => t.length === 1);
    const aInits = aToks.filter((t) => t.length === 1);
    if (pInits.length > 0 && aInits.length > 0) {
      return pInits.some((i) => aInits.includes(i));
    }
    return true;
  }

  // Multi-word person matched against abbreviated author (e.g. "Mohammed Fawaz" vs "Fawaz, J. M.", "Ajay Krishnan T. K." vs "Krishnan, T. A.")
  const matched = pk.primaryNames.filter((t) => aLong.includes(t));
  if (matched.length >= 2) return true;
  if (matched.length === 1 && matched[0].length >= 5) {
    // Check at least one remaining initial matches
    const restInits = pk.allTokens
      .filter((t) => t !== matched[0])
      .map((t) => t[0]);
    const aRestInits = aToks
      .filter((t) => t !== matched[0])
      .map((t) => t[0]);
    return restInits.some((ch) => aRestInits.includes(ch));
  }
  return false;
}

export function publicationsForPerson(person: Person, pubs: Publication[]) {
  const pk = personKey(person.data.name, person.id);
  return pubs.filter((p) => p.data.authors.some((a) => authorIsPerson(a, pk)));
}

export const NON_MENTEE_SLUGS = new Set([
  "anoop-vs",
  "jose-thekkiniath",
  "hareesh-pillai",
  "suhasini-verma",
  "arul-kumar-natarajan",
  "adarsh-sunilkumar",
  "asharaf-s",
]);

export function menteeMatcher(people: Person[]) {
  const dir = people.map((p) => ({
    slug: p.id,
    key: personKey(p.data.name, p.id),
  }));
  return (author: string) => {
    const d = dir.find((x) => authorIsPerson(author, x.key));
    return !!d && !NON_MENTEE_SLUGS.has(d.slug);
  };
}
