export type Skill = {
  name: string;
  /** A short, honest note — no proficiency percentages. */
  note: string;
};

export type SkillGroup = {
  id: string;
  label: string;
  /** One-line description of how this category is used. */
  blurb: string;
  icon: "layout" | "server" | "code" | "database" | "cloud" | "tools" | "spark";
  skills: Skill[];
};

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SKILLS — only tools that appear in the shipped projects.
 *  Each group is rendered as a tab; no percentages, no invented proficiency.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend Development",
    blurb:
      "Turning a design into an interface that feels fast, obvious and alive — on the web and on a phone.",
    icon: "layout",
    skills: [
      { name: "React", note: "Component architecture, hooks, state-driven UI" },
      { name: "Next.js", note: "App Router, server rendering, metadata, routes" },
      {
        name: "React Native",
        note: "Cross-platform iOS and Android apps",
      },
      { name: "TypeScript", note: "Typed props, API contracts, safer refactors" },
      { name: "Tailwind CSS", note: "Design tokens and responsive layouts" },
      { name: "Shadcn UI", note: "Accessible primitives, consistent theming" },
      {
        name: "Framer Motion",
        note: "Transitions that explain rather than decorate",
      },
      { name: "Zustand", note: "Small, predictable client state" },
      { name: "Expo", note: "Mobile builds, previews and iteration" },
    ],
  },
  {
    id: "backend",
    label: "Backend Development",
    blurb:
      "Secure data layers, serverless functions and role-based workflows behind the interface.",
    icon: "server",
    skills: [
      {
        name: "Supabase",
        note: "Postgres, auth, storage and row-level policies",
      },
      {
        name: "Firebase",
        note: "Authentication, Firestore and file storage",
      },
      { name: "REST APIs", note: "Consuming and designing resource endpoints" },
      { name: "Authentication", note: "Sign-in flows and protected routes" },
      {
        name: "Role-based access",
        note: "Separate capabilities for patient, expert and admin",
      },
      {
        name: "API integration",
        note: "Third-party services wired into a product",
      },
      { name: "Nodemailer", note: "Transactional email from order flows" },
      { name: "Zod", note: "Shared validation on forms and requests" },
    ],
  },
  {
    id: "languages",
    label: "Programming Languages",
    blurb: "The languages I actually write, week to week.",
    icon: "code",
    skills: [
      { name: "TypeScript", note: "Primary language, across web and mobile" },
      { name: "JavaScript", note: "Browser and Node runtimes" },
      { name: "SQL", note: "Queries, joins, policies and indexes" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    blurb:
      "Schemas and access rules matter as much as the screen they feed — especially offline.",
    icon: "database",
    skills: [
      { name: "PostgreSQL", note: "Relational modelling, queries, migrations" },
      { name: "Supabase", note: "Managed Postgres with row-level security" },
      { name: "Firebase", note: "Document data and file storage" },
      {
        name: "SQLite",
        note: "On-device storage for offline-first mobile apps",
      },
      {
        name: "Relational design",
        note: "Schemas, relationships and normalisation",
      },
    ],
  },
  {
    id: "devops",
    label: "DevOps & Cloud",
    blurb:
      "Enough of the hosting layer to ship, preview and debug my own work.",
    icon: "cloud",
    skills: [
      {
        name: "Vercel",
        note: "Deploying and hosting the live web apps",
      },
      { name: "Expo", note: "Mobile builds and device previews" },
      { name: "Supabase", note: "Hosted Postgres, auth and storage" },
      { name: "Firebase", note: "Hosted auth, data and file storage" },
      {
        name: "Environment config",
        note: "Secrets and per-environment settings",
      },
    ],
  },
  {
    id: "tools",
    label: "Tools & Technologies",
    blurb: "The day-to-day toolkit around the code.",
    icon: "tools",
    skills: [
      { name: "Git & GitHub", note: "Branching, history, repository hosting" },
      { name: "Expo CLI", note: "Running and previewing mobile builds" },
      { name: "npm", note: "Dependency and script management" },
      { name: "Chrome DevTools", note: "Layout, network and performance" },
      { name: "Vercel CLI", note: "Deployments and preview environments" },
    ],
  },
  {
    id: "interests",
    label: "Other Interests",
    blurb:
      "Adjacent skills that make the engineering better, even when they are not code.",
    icon: "spark",
    skills: [
      {
        name: "State management",
        note: "Zustand and Redux, chosen per problem",
      },
      {
        name: "Relational DB design",
        note: "SQL schemas that survive real data",
      },
      {
        name: "Securing routes",
        note: "API integration with access rules at the boundary",
      },
      {
        name: "Offline-first architecture",
        note: "Local storage, queues and honest sync states",
      },
      {
        name: "Continuous learning",
        note: "Technical research and training, deliberately ongoing",
      },
      {
        name: "Performance",
        note: "Mid-range Android before the newest flagship",
      },
    ],
  },
];
