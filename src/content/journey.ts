export type TimelineEntry = {
  id: string;
  /** Short period label, e.g. "2025 — Present". */
  period: string;
  title: string;
  org: string;
  type: "Education" | "Experience" | "Milestone";
  description: string;
  highlights?: string[];
};

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  JOURNEY — every entry is drawn from the facts on the existing portfolio:
 *  computer science foundations, one year of post-graduate experience and
 *  four shipped applications. No employers or institutions are invented.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const timeline: TimelineEntry[] = [
  {
    id: "foundations",
    period: "Foundations",
    title: "Computer Science Foundations",
    org: "Academic study",
    type: "Education",
    description:
      "Built the base I still lean on — data structures, algorithms, databases and networking — then started applying them in software people could actually open, rather than in exam answers.",
    highlights: [
      "Data structures, algorithms and complexity",
      "Relational databases and SQL",
      "Networking and the request lifecycle",
    ],
  },
  {
    id: "first-shipped-apps",
    period: "2025",
    title: "First applications shipped",
    org: "Independent projects",
    type: "Milestone",
    description:
      "Moved from exercises to complete products: a React Native health app with authentication, storage and role-based access, and production web apps deployed on Vercel with real forms, validation and email.",
    highlights: [
      "Skin Health Companion — React Native, Firebase, Supabase",
      "Production Next.js apps deployed and used in a browser",
      "Auth, file uploads and permissions handled end to end",
    ],
  },
  {
    id: "full-stack-mobile",
    period: "2025 — Present",
    title: "Full-Stack & Mobile Developer",
    org: "Independent projects & collaboration",
    type: "Experience",
    description:
      "A year of post-graduate, hands-on work building end-to-end products: four applications shipped across mobile and web, from the data model and access rules through to the interface someone actually uses.",
    highlights: [
      "Four apps shipped: health, trading, logistics and commerce",
      "React Native and Expo for cross-platform mobile",
      "Next.js and TypeScript for production web products",
      "Supabase, Firebase and PostgreSQL for data and auth",
      "Offline-first storage with SQLite and queued writes",
    ],
  },
  {
    id: "current-focus",
    period: "Now",
    title: "Going deeper on backend and cloud",
    org: "Current focus",
    type: "Milestone",
    description:
      "Widening from the interface into the whole product: backend architecture, complex state management and cloud integrations — offline-first capabilities and secure, role-based workflows built on Supabase, Firebase and PostgreSQL.",
    highlights: [
      "Deeper PostgreSQL modelling and access policies",
      "Complex client state without over-engineering it",
      "Cloud integrations that stay honest about failure",
    ],
  },
];
