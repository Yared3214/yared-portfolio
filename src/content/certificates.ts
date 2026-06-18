import type { ArtSpec } from "@/lib/art";

export type Certificate = {
  id: string;
  name: string;
  issuer: string;
  /** Display date, e.g. "Mar 2025". */
  date: string;
  /** Add a public verification URL when the credential has one. */
  credentialUrl?: string;
  summary: string;
  art: ArtSpec;
};

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  STUDY TRACKS — the previous portfolio listed no formal certificates, so
 *  nothing here claims an issuer or a credential. These are self-directed
 *  tracks tied to the work that needed them. Replace with real certificates
 *  (name, issuer, date, credentialUrl) as they are earned.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const certificates: Certificate[] = [
  {
    id: "react-native",
    name: "React Native & Expo",
    issuer: "Self-directed study",
    date: "2025",
    summary:
      "Navigation, local storage, offline behaviour and the performance work that keeps cross-platform apps responsive on mid-range Android devices.",
    art: { variant: "terrain", from: "#FB923C", to: "#F472B6" },
  },
  {
    id: "nextjs-fullstack",
    name: "Full-Stack Web with Next.js",
    issuer: "Self-directed study",
    date: "2025",
    summary:
      "App Router, server rendering, route handlers, validation and deployment — the path from a design file to a production URL that a real user can open.",
    art: { variant: "prism", from: "#8B7BFF", to: "#22D3C5" },
  },
  {
    id: "backend-data",
    name: "Backend & Data with Supabase",
    issuer: "Self-directed study",
    date: "2026",
    summary:
      "Postgres schema design, row-level security, file storage and role-based access — applied directly to the health app's patient, expert and admin permissions.",
    art: { variant: "grid", from: "#38BDF8", to: "#6366F1" },
  },
];
