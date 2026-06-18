/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT — edit this file first.
 *  Everything here is safe to change without touching a component.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "globe";
  handle: string;
};

export const site = {
  name: "Yared Bitewlign",
  firstName: "Yared",
  lastName: "Bitewlign",
  monogram: "yb",
  title: "Full-Stack · Mobile Developer",
  subtitle: "Building performant mobile apps & scalable web solutions",
  location: "Addis Ababa, Ethiopia",
  timezone: "Africa/Addis_Ababa",
  availability: "Open to opportunities",
  /** Shown under the hero name. */
  intro:
    "I am a Full-Stack and Mobile Developer dedicated to engineering robust, user-centric products. Over the past year, I have transitioned from my computer science foundations into building end-to-end applications, mastering cross-platform mobile development with React Native and production-ready web apps using Next.js.",
  /** One-line positioning used in metadata + footer. */
  tagline:
    "Full-stack and mobile developer building performant React Native apps and production-ready Next.js products from Addis Ababa.",
  /** Optional profile photo in /public (e.g. "/avatar.jpg"). Empty = monogram portrait. */
  avatar: "",
  email: "yaredbitewlign@gmail.com",
  github: "https://github.com/Yared3214",
  linkedin: "https://www.linkedin.com/in/yared-bitewlign-6764ab263",
  /** Drop your PDF in /public and point here. Generate the sample with `npm run resume`. */
  resume: "/resume.pdf",
  /** Update once the site has a real domain (used for canonical + sitemap). */
  url: "https://yaredbitewlign.com",
  /** Small line under the availability pill. */
  availabilityNote: "Open to full-stack, mobile and frontend roles",
  /** Easter egg — typing this sequence anywhere unlocks a hidden note. */
  secretWord: "orbit",
  quote:
    "Good interfaces disappear. What remains is the feeling that something was easy, obvious, and a little bit beautiful.",
  quoteAttribution: "Working principle",
} as const;

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: site.github,
    icon: "github",
    handle: "@Yared3214",
  },
  {
    label: "LinkedIn",
    href: site.linkedin,
    icon: "linkedin",
    handle: "Yared Bitewlign",
  },
  {
    label: "Email",
    href: `mailto:${site.email}`,
    icon: "mail",
    handle: site.email,
  },
];

export const navItems = [
  { id: "work", label: "Work", index: "01" },
  { id: "about", label: "About", index: "02" },
  { id: "skills", label: "Skills", index: "03" },
  { id: "journey", label: "Journey", index: "04" },
  { id: "writing", label: "Writing", index: "07" },
  { id: "contact", label: "Contact", index: "09" },
] as const;

export const sectionIndex = {
  about: "02",
  work: "01",
  skills: "03",
  journey: "04",
  credentials: "05",
  interests: "06",
  writing: "07",
  contact: "08",
} as const;

export const meta = {
  title: `${site.name} — ${site.title}`,
  description:
    "Portfolio of Yared Bitewlign, a full-stack and mobile developer in Addis Ababa building React Native apps and production-ready Next.js products, with backend work in Supabase, Firebase and PostgreSQL.",
  keywords: [
    "Yared Bitewlign",
    "Full-Stack Developer",
    "Mobile Developer",
    "React Native Developer",
    "Next.js Developer",
    "Supabase",
    "Firebase",
    "Portfolio",
    "Addis Ababa",
    "Ethiopia",
  ],
};
