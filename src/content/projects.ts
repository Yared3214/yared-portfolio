import type { ArtSpec } from "@/lib/art";

export type ProjectCategory =
  | "Frontend"
  | "Backend"
  | "Full-Stack"
  | "AI/ML"
  | "Other";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  category: ProjectCategory;
  year: string;
  role: string;
  status: string;
  summary: string;
  problem: string;
  solution: string;
  features: { title: string; detail: string }[];
  stack: string[];
  challenges: { challenge: string; lesson: string }[];
  gallery: { label: string; caption: string; art: ArtSpec }[];
  /** Real repository and live demo URLs, taken from the existing portfolio. */
  links: { repo?: string; demo?: string };
  art: ArtSpec;
  featured?: boolean;
};

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  PROJECTS — the four shipped applications from the previous portfolio.
 *  Copy, stacks and links come from that site; nothing here is invented.
 * ─────────────────────────────────────────────────────────────────────────
 */
export const projects: Project[] = [
  {
    slug: "skin-health-companion",
    name: "Skin Health Companion",
    tagline:
      "A patient-focused skin health app with dermatologist-approved guidance.",
    category: "Full-Stack",
    year: "2025",
    role: "Mobile & full-stack development",
    status: "Shipped",
    summary:
      "A React Native app that gives patients one calm place to read dermatologist-approved resources, manage their own profile and records, and connect with verified experts — with Firebase and Supabase handling authentication, uploads and role-based access behind it.",
    problem:
      "Skin concerns are usually searched before they are seen by a clinician, and the results are inconsistent, commercial and occasionally alarming. The practical problems come after that: patients repeat their history to every new expert, and photos or documents get shared through chat apps with no real record of who can see them.",
    solution:
      "One mobile client backed by two managed services. Supabase owns the relational data — patients, experts, resources and permissions — while Firebase covers authentication and file storage. Every screen reads through a role check, so a patient, a verified expert and an administrator get genuinely different applications rather than the same one with a few buttons hidden.",
    features: [
      {
        title: "Dermatologist-approved library",
        detail:
          "Guidance is written and reviewed by verified experts, so the app has a named source instead of an open forum of guesses.",
      },
      {
        title: "Patient profiles & records",
        detail:
          "Each patient keeps one history: profile details, previous concerns and the documents attached to them, available in the same place.",
      },
      {
        title: "Verified expert access",
        detail:
          "Only clinicians whose accounts have been verified can publish guidance or appear in the directory patients browse.",
      },
      {
        title: "Role-based permissions",
        detail:
          "Access is decided on the server by role, not by which parts of the interface the client chooses to render.",
      },
    ],
    stack: ["React Native", "TypeScript", "Firebase", "Supabase"],
    challenges: [
      {
        challenge: "Modelling permissions across two backends.",
        lesson:
          "Keeping the role model in Supabase and treating the storage rules in Firebase as a mirror of it gave one source of truth. Duplicating the rules in the client was the first thing I removed.",
      },
      {
        challenge: "Handling sensitive uploads responsibly.",
        lesson:
          "Checking file type and size in the app is convenience, not security. The real check has to happen where the file lands, and access should be short-lived rather than a public URL.",
      },
    ],
    gallery: [
      {
        label: "Patient home",
        caption: "Approved guidance and the next appointment in one view.",
        art: { variant: "bloom", from: "#7C6CFF", to: "#2AD4C0" },
      },
      {
        label: "Expert directory",
        caption: "Verified specialists, with verification surfaced in the UI.",
        art: { variant: "grid", from: "#22D3C5", to: "#6366F1" },
      },
      {
        label: "Records",
        caption: "Documents and history attached to the patient, not a chat.",
        art: { variant: "wave", from: "#8B7BFF", to: "#38BDF8" },
      },
    ],
    links: {
      repo: "https://github.com/Yared3214/AI-SkinDisease-Classification-App",
    },
    art: { variant: "bloom", from: "#7C6CFF", to: "#2AD4C0" },
    featured: true,
  },
  {
    slug: "ethio-stock-link-lite",
    name: "Ethio Stock Link Lite",
    tagline: "Offline-first stock trading for the Ethiopian market.",
    category: "Full-Stack",
    year: "2026",
    role: "Mobile engineering",
    status: "Shipped",
    summary:
      "A React Native trading app where portfolios, order history and cached market data stay usable when the connection drops — built on SQLite, with an explicit pending state for anything that has not reached the server yet.",
    problem:
      "A trading app is judged in the worst conditions it allows. Mobile data is uneven, and a spinner where a portfolio should be is not a neutral failure: it pushes people to act on incomplete information, or to assume an order went through when it never left the device.",
    solution:
      "The local database is the first screen's source of truth. Market data is cached together with the moment it was fetched, orders and deposits are written locally and queued, and the interface distinguishes three states honestly — saved locally, sent, confirmed. When connectivity returns, the queue replays in order and the cached quotes refresh.",
    features: [
      {
        title: "Offline portfolio",
        detail:
          "Holdings and history render from SQLite immediately, with no empty state waiting on a request that may never arrive.",
      },
      {
        title: "Cached market data",
        detail:
          "Quotes carry the time they were fetched, so stale prices are labelled as stale instead of being presented as live.",
      },
      {
        title: "Queued orders",
        detail:
          "Buy, sell and deposit actions are accepted offline, stored with a pending marker and sent once the network allows it.",
      },
      {
        title: "Trading-grade interface",
        detail:
          "Dense numbers, unambiguous buy and sell affordances, and animation that confirms an action rather than delaying it.",
      },
    ],
    stack: ["React Native", "SQLite", "TypeScript", "React"],
    challenges: [
      {
        challenge: "Keeping cached prices honest.",
        lesson:
          "A quote without a timestamp is a lie the interface tells by omission. Showing the age next to the number changed how the entire screen was read.",
      },
      {
        challenge: "Replaying a queue without duplicating orders.",
        lesson:
          "A client-generated key per intent, checked on the server, made retries safe. A connection failing halfway through is the normal case, not the exception.",
      },
    ],
    gallery: [
      {
        label: "Portfolio",
        caption: "Holdings and performance available with no connection.",
        art: { variant: "wave", from: "#22D3C5", to: "#3B82F6" },
      },
      {
        label: "Order ticket",
        caption: "Buy and sell flow with an explicit pending state.",
        art: { variant: "grid", from: "#2AD4C0", to: "#4F46E5" },
      },
      {
        label: "Market data",
        caption: "Quotes stamped with the time they were last refreshed.",
        art: { variant: "terrain", from: "#34D399", to: "#0EA5E9" },
      },
    ],
    links: {
      repo: "https://github.com/Yared3214/EthioStockLink-Lite",
    },
    art: { variant: "wave", from: "#22D3C5", to: "#3B82F6" },
    featured: true,
  },
  {
    slug: "fastx-delivery",
    name: "FastX Delivery",
    tagline: "Logistics operations, dispatch and tracking in one console.",
    category: "Frontend",
    year: "2026",
    role: "Frontend development",
    status: "Live",
    summary:
      "A React and Tailwind operations console for a delivery business: create an order, assign it to a courier, and follow it from pickup to delivery without leaving a single screen.",
    problem:
      "Dispatch that lives in phone calls and chat messages has no shared state. Two people assign the same order, a status change is known only to the person who made it, and the customer's view is whatever someone remembers to type afterwards.",
    solution:
      "One dashboard with three linked views: a board of orders by status, a dispatch panel for assigning couriers, and a tracking timeline that both the operations team and the customer can read. State is centralised, so an assignment updates the board and the timeline at the same moment.",
    features: [
      {
        title: "Order board",
        detail:
          "New, assigned, in transit and delivered are explicit columns rather than a colour code someone has to memorise.",
      },
      {
        title: "Dispatch assignment",
        detail:
          "Couriers are assigned from the order itself, and the timeline records who changed what and when.",
      },
      {
        title: "Tracking timeline",
        detail:
          "One readable sequence of events per order, written for a customer rather than for an operator.",
      },
      {
        title: "Responsive console",
        detail:
          "Works on a dispatcher's laptop and a courier's phone without maintaining a separate mobile build.",
      },
    ],
    stack: ["React", "Tailwind CSS", "JavaScript"],
    challenges: [
      {
        challenge: "Designing statuses that survive reality.",
        lesson:
          "The first version had five states, and none of them covered 'courier arrived but the customer was out'. Explicit, slightly boring states beat clever ones.",
      },
      {
        challenge: "Making a dense console usable quickly.",
        lesson:
          "Grouping actions in the order they actually happen cut mis-clicks more than making the buttons bigger did. Density is not the same thing as clutter.",
      },
    ],
    gallery: [
      {
        label: "Dispatch board",
        caption: "Orders grouped by the state they are actually in.",
        art: { variant: "terrain", from: "#FF9A6B", to: "#FF5F7E" },
      },
      {
        label: "Tracking",
        caption: "A customer-readable timeline for every delivery.",
        art: { variant: "grid", from: "#FB923C", to: "#F472B6" },
      },
    ],
    links: {
      demo: "https://fastx-delivery-app.vercel.app/",
    },
    art: { variant: "terrain", from: "#FF9A6B", to: "#FF5F7E" },
  },
  {
    slug: "ethiopian-artisan-marketplace",
    name: "Ethiopian Artisan Marketplace",
    tagline: "A storefront connecting Ethiopian artisans with global buyers.",
    category: "Full-Stack",
    year: "2026",
    role: "Design & full-stack development",
    status: "Live",
    summary:
      "A Next.js commerce experience for handmade Ethiopian textiles, pottery, jewellery and décor — maker-led product pages, a validated checkout, and order confirmations that actually arrive by email.",
    problem:
      "Artisans who sell through social messages and informal contacts have no catalogue a buyer abroad can trust. Photographs arrive without context, prices are negotiated one conversation at a time, and nothing confirms that an order was received.",
    solution:
      "A server-rendered Next.js catalogue with product pages built around the maker and the material, a cart and checkout validated on both client and server with Zod, and Nodemailer sending a real order confirmation. Framer Motion is used sparingly, for transitions that show where an object came from.",
    features: [
      {
        title: "Maker-led product pages",
        detail:
          "Every listing pairs the object with its material, its origin and the artisan behind it, instead of a bare product tile.",
      },
      {
        title: "Validated checkout",
        detail:
          "Shared Zod schemas mean the form and the server reject exactly the same inputs, so nothing passes the UI and fails the API.",
      },
      {
        title: "Order confirmation email",
        detail:
          "Nodemailer sends a real receipt rather than leaving the buyer on a thank-you screen with no record.",
      },
      {
        title: "Motion with a job",
        detail:
          "Page and gallery transitions carry the story of the object; nothing animates purely because it can.",
      },
    ],
    stack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Zod",
      "Nodemailer",
    ],
    challenges: [
      {
        challenge: "Selling craft without flattening it.",
        lesson:
          "A grid of identical crops made handmade objects look like interchangeable parts. Varying the rhythm by object — a tall textile, a wide table — did more than any styling change.",
      },
      {
        challenge: "Validating a checkout twice.",
        lesson:
          "One schema imported by both the form and the server removed an entire class of bug where the interface accepts something the backend rejects.",
      },
    ],
    gallery: [
      {
        label: "Storefront",
        caption: "Catalogue built around makers and materials.",
        art: { variant: "prism", from: "#FFB86B", to: "#C084FC" },
      },
      {
        label: "Product story",
        caption: "The object, its origin and the artisan in one page.",
        art: { variant: "bloom", from: "#FBBF24", to: "#F472B6" },
      },
      {
        label: "Checkout",
        caption: "Validated order flow with a real confirmation email.",
        art: { variant: "wave", from: "#F59E0B", to: "#8B5CF6" },
      },
    ],
    links: {
      demo: "https://ethiopian-crafts-e-commerce.vercel.app/",
    },
    art: { variant: "prism", from: "#FFB86B", to: "#C084FC" },
    featured: true,
  },
];

export const projectCategories = [
  "All Projects",
  "Frontend",
  "Backend",
  "Full-Stack",
  "AI/ML",
  "Other",
] as const;

export type ProjectFilter = (typeof projectCategories)[number];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
