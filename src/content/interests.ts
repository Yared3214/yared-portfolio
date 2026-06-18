export type InterestGroup = {
  id: string;
  title: string;
  kind: "books" | "tech" | "hobbies" | "music" | "learning" | "life";
  intro: string;
  items: string[];
  /** Optional closing line shown in muted type. */
  footnote?: string;
};

/** ── Edit freely: this section is meant to feel personal, not corporate. ── */
export const interests: InterestGroup[] = [
  {
    id: "books",
    title: "Reading list",
    kind: "books",
    intro:
      "I read slowly and take notes, mostly about how people build things and why they fail.",
    items: [
      "The Design of Everyday Things — Don Norman",
      "Refactoring UI — Adam Wathan & Steve Schoger",
      "Shape Up — Ryan Singer",
      "Thinking in Systems — Donella Meadows",
    ],
    footnote: "Always open to recommendations.",
  },
  {
    id: "tech",
    title: "Technology I explore",
    kind: "tech",
    intro:
      "The rabbit holes I fall into once a project ships and curiosity takes over.",
    items: [
      "Offline-first storage and sync queues",
      "React Native performance on cheap Android phones",
      "Supabase versus Firebase, honestly compared",
      "Payments and checkout flows for African markets",
    ],
  },
  {
    id: "hobbies",
    title: "Away from the screen",
    kind: "hobbies",
    intro:
      "Addis is at 2,355 metres, so most of this involves walking uphill at an unreasonable pace.",
    items: [
      "Long walks around the city",
      "Photographing streets and buildings",
      "Cooking for friends",
      "Watching football with too much opinion",
    ],
  },
  {
    id: "music",
    title: "Background noise",
    kind: "music",
    intro:
      "What actually plays while I work — depends entirely on whether I am writing or debugging.",
    items: [
      "Ethio-jazz for deep work",
      "Lo-fi and ambient for debugging",
      "Afrobeats when something finally works",
      "Podcasts on long walks",
    ],
  },
  {
    id: "learning",
    title: "Currently learning",
    kind: "learning",
    intro:
      "Deliberately in progress. None of this is mastery yet, and that is the point.",
    items: [
      "Postgres row-level security patterns",
      "Advanced TypeScript types",
      "Motion design that stays out of the way",
      "Writing shorter, clearer sentences",
    ],
    footnote: "Updated whenever something sticks.",
  },
  {
    id: "life",
    title: "Off the clock",
    kind: "life",
    intro:
      "The unpolished version: coffee ceremonies that run long, football arguments that run longer.",
    items: [
      "Ethiopian coffee, taken seriously",
      "Weekend side projects that may never ship",
      "Teaching a friend one thing I just learned",
      "Family, food and the occasional long lunch",
    ],
  },
];
