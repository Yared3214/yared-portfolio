import type { ArtSpec } from "@/lib/art";

export type PostBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, e.g. "2026-09-12". */
  date: string;
  category: "Engineering" | "Design" | "Process";
  readMinutes: number;
  tags: string[];
  art: ArtSpec;
  /** Optional external article (Medium, Substack, personal blog). */
  externalUrl?: string;
  blocks: PostBlock[];
};

export const posts: Post[] = [
  {
    slug: "offline-first-is-a-product-decision",
    title: "Offline-first is a product decision, not a technical one",
    excerpt:
      "Building a trading app for a market where the connection drops means deciding what it should promise before choosing a database.",
    date: "2026-10-02",
    category: "Engineering",
    readMinutes: 6,
    tags: ["React Native", "SQLite", "Offline-first"],
    art: { variant: "wave", from: "#22D3C5", to: "#3B82F6" },
    blocks: [
      {
        type: "p",
        text: "When I started Ethio Stock Link Lite, the first question was not which storage library to use. It was what the app should still do when the network disappears. That sentence decides everything else — the schema, the queue, and how much of the interface has to admit uncertainty.",
      },
      { type: "h2", text: "Three different promises" },
      {
        type: "p",
        text: "Offline support is usually treated as one feature. It is at least three, and they are not equally expensive.",
      },
      {
        type: "list",
        items: [
          "Read-only offline: the last data you saw is still visible, and nothing pretends to save.",
          "Queued writes: actions are accepted, stored and replayed later, with a visible pending state.",
          "True collaboration: several devices edit the same record and conflicts are resolved per field.",
        ],
      },
      {
        type: "p",
        text: "Each is roughly an order of magnitude more complex than the one before it. A trading app needs the second promise, because a portfolio you cannot act on is only half the product.",
      },
      { type: "h2", text: "Make the queue visible" },
      {
        type: "p",
        text: "If an order can be queued, it can fail. A pending badge that quietly disappears is worse than no offline support at all, because the user now believes something was saved. Saved locally, sent and confirmed have to be three distinct, legible states — not one spinner that eventually stops.",
      },
      {
        type: "quote",
        text: "Offline-first means never lying about what has been saved.",
      },
      { type: "h2", text: "Stale data needs a timestamp" },
      {
        type: "p",
        text: "Cached prices are useful; unlabelled cached prices are dangerous. Showing the age next to the number changed how the whole screen was read, and it cost almost nothing to build. The same applies to a cached portfolio: the data is helpful as long as the interface says when it was taken.",
      },
      { type: "h2", text: "Order matters more than speed" },
      {
        type: "p",
        text: "A queue that replays out of order corrupts state in ways that are miserable to debug. A monotonic sequence per session, plus a client-generated key for each intent, made retries safe: the network failing halfway through is the normal case, not the exception.",
      },
    ],
  },
  {
    slug: "designing-for-people-on-slow-phones",
    title: "Designing for people on slow phones",
    excerpt:
      "Perceived performance is rarely about raw speed. It is about whether the interface answers the question the user just asked.",
    date: "2026-08-14",
    category: "Design",
    readMinutes: 5,
    tags: ["Performance", "Mobile", "UX"],
    art: { variant: "terrain", from: "#FF9A6B", to: "#FF5F7E" },
    blocks: [
      {
        type: "p",
        text: "Most people do not experience my work on the machine I build it on. They open it on a mid-range Android phone, on a connection that works in one room and not the next. Designing for that device first is not a constraint on the design; it is the design.",
      },
      { type: "h2", text: "Respond before you finish" },
      {
        type: "p",
        text: "The most useful performance technique I have adopted is not a bundler setting. It is answering immediately, then doing the work. When someone taps buy, the button enters its pressed state in the same frame. The request is still in flight, but the interface has already said: I heard you, and I am on it.",
      },
      {
        type: "p",
        text: "That single change removes more perceived latency than most optimisations, because the alternative — a frozen control and no feedback — reads as a broken app rather than a busy one.",
      },
      { type: "h2", text: "Skeletons are a promise" },
      {
        type: "p",
        text: "A skeleton screen is a contract about layout. If the real content arrives and everything jumps, the skeleton lied, and the user pays for that lie with a small loss of trust. Matching the final geometry matters more than the shimmer.",
      },
      {
        type: "list",
        items: [
          "Reserve the space the content will actually occupy.",
          "Show cached data with a quiet refresh indicator instead of a full-screen spinner.",
          "Animate transform and opacity, never layout.",
          "Make the first paint useful, even if it is slightly incomplete.",
        ],
      },
      {
        type: "quote",
        text: "Speed is measured in milliseconds. Slowness is felt in uncertainty.",
      },
      { type: "h2", text: "Measure, then remove" },
      {
        type: "p",
        text: "I still open the profiler before changing anything, because intuition is a bad instrument. But the fixes I keep are the boring ones: fewer redundant re-renders, less work on the main thread, images sized for the screen that displays them, and honest loading states. None of it is exotic. It is a decision to treat the first two hundred milliseconds as part of the design.",
      },
    ],
  },
  {
    slug: "what-shipping-four-apps-taught-me-about-scope",
    title: "What shipping four apps taught me about scope",
    excerpt:
      "A healthcare app, a trading app, a logistics console and a marketplace — the lesson in all four was the same one about finishing.",
    date: "2026-06-21",
    category: "Process",
    readMinutes: 4,
    tags: ["Process", "Learning", "Career"],
    art: { variant: "prism", from: "#34D399", to: "#0EA5E9" },
    blocks: [
      {
        type: "p",
        text: "Four apps in about a year: a patient-facing health app, an offline-first trading app, a delivery operations console and an artisan marketplace. They have almost nothing in common technically, but they taught me the same lesson about scope.",
      },
      { type: "h2", text: "Done is a sentence" },
      {
        type: "p",
        text: "Every project that stalled did so because 'done' was a mood rather than a sentence. The ones that shipped had a definition I could read out loud: a patient can sign in, read an approved resource, and attach a document — and that is the release.",
      },
      {
        type: "list",
        items: [
          "Write the README before the feature list.",
          "Cut the second theme, the settings page and the onboarding tour.",
          "Ship the smallest version a stranger can use without you narrating.",
          "Fix the ugly part before adding the impressive one.",
        ],
      },
      {
        type: "quote",
        text: "Scope creep is rarely ambition. It is usually avoidance of the part that is hard to finish.",
      },
      { type: "h2", text: "The unglamorous parts are the product" },
      {
        type: "p",
        text: "None of the four felt finished because of a beautiful hero section. They felt finished when the empty states made sense, the validation matched on both sides, the confirmation email arrived, and the pending order said what it was doing. That is the work I now plan for from the beginning, instead of discovering it a week before launch.",
      },
      {
        type: "p",
        text: "The projects I am proudest of are not the most ambitious ones. They are the ones where every part works, nothing is pretending, and the whole thing can be explained in a paragraph.",
      },
    ],
  },
  {
    slug: "supabase-and-firebase-in-one-app",
    title: "Using Supabase and Firebase in the same app",
    excerpt:
      "The health app needed relational permissions and simple file storage. Splitting those jobs across two services was the right call — with a cost worth naming.",
    date: "2026-04-09",
    category: "Engineering",
    readMinutes: 5,
    tags: ["Supabase", "Firebase", "Architecture"],
    art: { variant: "grid", from: "#7C6CFF", to: "#22D3C5" },
    blocks: [
      {
        type: "p",
        text: "Skin Health Companion has patients, verified experts, approved resources and uploaded documents. That is a relational shape with access rules attached to it, and it is exactly what Postgres with row-level security is good at. It also needs authentication and file storage, which Firebase makes almost effortless.",
      },
      {
        type: "p",
        text: "So the app uses both. Supabase owns the data and the permission model; Firebase handles sign-in and file storage. It works, and I would make the same choice again — but it is not free.",
      },
      { type: "h2", text: "Start with the data shape" },
      {
        type: "p",
        text: "If the core of the product is relationships and rules — who may read which record — a relational database will save you months. If the core is documents that change shape constantly, Firebase's model fits better. Choosing per workload, rather than per vendor, is the whole argument.",
      },
      { type: "h2", text: "Two systems, two failures" },
      {
        type: "p",
        text: "The bill for using both is operational: two consoles, two sets of rules, two places where a permission can drift. Keeping the role model in Postgres and treating storage rules as a mirror of it gave one source of truth. The mistake I removed early was duplicating those rules in the mobile client, where they were merely a suggestion.",
      },
      {
        type: "quote",
        text: "A rule the client enforces is a convenience. A rule the server enforces is a permission.",
      },
      { type: "h2", text: "What I would tell someone starting" },
      {
        type: "list",
        items: [
          "Pick the database for the shape of your data, not the dashboard you like.",
          "Keep one authoritative permission model and mirror it everywhere else.",
          "Check uploads where the file lands, with short-lived access rather than public URLs.",
          "Write down why two services exist, or a future maintainer will remove one.",
        ],
      },
    ],
  },
];

export const postCategories = ["All", "Engineering", "Design", "Process"] as const;

export function getPost(slug: string): Post | undefined {
  return posts.find((post) => post.slug === slug);
}

export function sortedPosts(): Post[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}
