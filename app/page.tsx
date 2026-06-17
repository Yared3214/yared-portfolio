"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRight, Database, Github, Linkedin } from "lucide-react";

// ── Project thumbnail assets ─────────────────────────────────────────────────
import healthCompanion from "./assets/skin-health-companion.png";
import stock from "./assets/stock.png";
import fastX from "./assets/fastX-logo.png";
import CraftsEcommerceLogo from "./assets/CraftsEcommerceLogo.jpg";

// ── Inline SVG logos ─────────────────────────────────────────────────────────
function ReactLogo({ size = 28 }: { size?: number }) {
  return (
    <svg
      viewBox="-11.5 -10.232 23 20.463"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle r="2.05" fill="#61DAFB" />
      <g stroke="#61DAFB" strokeWidth="1" fill="none">
        <ellipse rx="11" ry="4.2" />
        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
      </g>
    </svg>
  );
}

function NextLogo({ size = 24 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 180 180"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask id="nextmask" style={{ maskType: "alpha" as const }}>
        <circle cx="90" cy="90" r="90" fill="black" />
      </mask>
      <g mask="url(#nextmask)">
        <circle cx="90" cy="90" r="90" fill="white" />
        <path
          d="M149.508 157.52L69.142 54H54V125.97H66.1097V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
          fill="black"
        />
        <rect x="115" y="54" width="12" height="72" fill="black" />
      </g>
    </svg>
  );
}

// ── Types ────────────────────────────────────────────────────────────────────
type Section = "about" | "skills" | "projects";

const SECTIONS: Section[] = ["about", "skills", "projects"];

// ── Data ─────────────────────────────────────────────────────────────────────
const frontSkills = [
  {
    title: "React Native",
    logo: <ReactLogo size={26} />,
    bgColor: "bg-[#20232a]",
    desc: "Cross-platform mobile apps for iOS & Android — smooth native experiences, performance-optimized and responsive.",
    tags: ["TypeScript", "Zustand", "Expo"],
  },
  {
    title: "Next.js & React",
    logo: <NextLogo size={24} />,
    bgColor: "bg-white",
    desc: "Performant, SEO-friendly web applications with server-side rendering, dynamic routing, and slick animations.",
    tags: ["TailwindCSS", "ShadcnUI", "Framer Motion"],
  },
  {
    title: "Backend & Database",
    logo: <Database size={20} className="text-emerald-400" />,
    bgColor: "bg-[#161b22]",
    desc: "Architecting secure data layers, serverless functions, role-based authentication, and efficient database schemas.",
    tags: ["Supabase", "Firebase", "PostgreSQL", "REST APIs"],
  },
];

// const otherSkills = [
//   { label: "Problem-solving & debugging", icon: "🐛" },
//   { label: "Responsive design", icon: "📐" },
//   { label: "Collaboration & communication", icon: "🤝" },
//   { label: "Version control (Git)", icon: "🌿" },
// ];

const otherSkills = [
  { label: "Relational DB Design (SQL)", icon: "🗄️" },
  { label: "State Management (Zustand/Redux)", icon: "🧠" },
  { label: "API Integration & Securing Routes", icon: "🔒" },
  { label: "Continuous Training & Technical Research", icon: "📚" },
];

const projects = [
  {
    title: "Skin Health Companion",
    subtitle: "Patient-focused mobile app",
    desc: "A React Native healthcare app for patients to access dermatologist-approved resources, manage profiles, and connect with verified experts. Built with Firebase and Supabase — secure auth, document uploads, and role-based access.",
    img: healthCompanion,
    link: "https://github.com/Yared3214/AI-SkinDisease-Classification-App",
    tech: ["React Native", "Firebase", "Supabase"],
  },
  {
    title: "Ethio Stock Link Lite",
    subtitle: "Mobile stock trading app",
    desc: "An offline-first trading app for the Ethiopian market. Manage portfolios, view live and cached stock data, place buy/sell orders, and deposit funds — with smooth animations and a modern trading UI.",
    img: stock,
    link: "https://github.com/Yared3214/EthioStockLink-Lite",
    tech: ["React Native", "SQLite", "React"],
  },
  {
    title: "FastX Delivery",
    subtitle: "Logistics management system",
    desc: "A high-performance delivery management platform for streamlining logistics, optimizing routes, and enhancing the delivery experience with seamless order tracking and efficient dispatching.",
    img: fastX,
    link: "https://fastx-delivery-app.vercel.app",
    tech: ["React", "Tailwind"],
  },
  {
    title: "Ethiopian Artisan Marketplace",
    subtitle: "Full-stack e-commerce platform",
    desc: "Connecting Ethiopian artisans with global buyers. Artisans showcase handmade textiles, pottery, jewelry, and décor — with secure payments, global accessibility, and cultural storytelling built in.",
    img: CraftsEcommerceLogo,
    link: "https://ethiopian-crafts-e-commerce.vercel.app/",
    tech: ["Next.js", "Framer Motion", "Zod", "Nodemailer"],
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("about");

  // Active nav tracking via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id as Section);
          }
        });
      },
      { threshold: 0.4 }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Cursor glow
  useEffect(() => {
    const glow = document.getElementById("cursor-glow");
    const move = (e: MouseEvent) => {
      if (glow) {
        glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <main className="relative min-h-screen bg-[#0d1117] text-slate-400 antialiased">
      {/* Cursor glow */}
      <div
        id="cursor-glow"
        className="pointer-events-none fixed top-0 left-0 z-0 h-[400px] w-[400px] rounded-full bg-blue-500 opacity-[0.03] blur-[80px] transition-transform duration-200"
      />

      <div className="mx-auto max-w-5xl px-6 lg:px-16">
        <div className="lg:flex lg:gap-16">

          {/* ── Sidebar ───────────────────────────────────────────────────── */}
          <aside className="hidden lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[280px] lg:shrink-0 lg:flex-col lg:justify-between lg:py-20">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-100">
                Yared Bitewlign
              </h1>
              <p className="mt-2 text-sm font-medium text-slate-300">
                Full-Stack · Mobile Developer
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Building performant mobile apps &amp; scalable web solutions
              </p>

              {/* Available badge */}
              <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-xs font-medium text-emerald-400">
                  Open to opportunities
                </span>
              </div>

              {/* Navigation */}
              <nav className="mt-10" aria-label="Page sections">
                <ul className="flex flex-col gap-1">
                  {SECTIONS.map((section) => (
                    <li key={section}>
                      <Link
                        href={`#${section}`}
                        className="group flex items-center gap-3 rounded-lg px-3 py-2 transition-colors hover:bg-white/5"
                      >
                        <span
                          className={`block h-px rounded-full transition-all duration-300 ${
                            activeSection === section
                              ? "w-8 bg-slate-300"
                              : "w-4 bg-slate-600"
                          }`}
                        />
                        <span
                          className={`text-xs font-semibold uppercase tracking-widest transition-colors ${
                            activeSection === section
                              ? "text-slate-200"
                              : "text-slate-500 group-hover:text-slate-400"
                          }`}
                        >
                          {section.charAt(0).toUpperCase() + section.slice(1)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Social links */}
            <div className="mt-10 flex gap-3">
              <a
                href="https://github.com/Yared3214"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:border-white/20 hover:bg-white/5 hover:text-slate-200"
              >
                <Github size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/yared-bitewlign-6764ab263"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:border-white/20 hover:bg-white/5 hover:text-slate-200"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </aside>

          {/* ── Main content ──────────────────────────────────────────────── */}
          <div className="flex flex-col gap-24 py-20 lg:flex-1">

            {/* Mobile header */}
            <div className="lg:hidden">
              <h1 className="text-3xl font-semibold text-slate-100">Yared Bitewlign</h1>
              <p className="mt-2 text-sm text-slate-400">Full-Stack · Mobile Developer</p>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                <span className="text-xs font-medium text-emerald-400">Open to opportunities</span>
              </div>
              <div className="mt-5 flex gap-3">
                <a
                  href="https://github.com/Yared3214"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-slate-200"
                >
                  <Github size={16} />
                </a>
                <a
                  href="https://www.linkedin.com/in/yared-bitewlign-6764ab263"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 text-slate-400 hover:text-slate-200"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>

            {/* ── About ──────────────────────────────────────────────────── */}
            {/* ── About ──────────────────────────────────────────────────── */}
<section id="about" className="scroll-mt-20">
  <SectionLabel>About me</SectionLabel>
  <p className="mt-4 text-sm leading-relaxed text-slate-400">
    I am a <span className="font-medium text-slate-200">Full-Stack and Mobile Developer</span> dedicated to engineering robust, user-centric products. Over the past year, I have transitioned from my computer science foundations into building end-to-end applications, mastering cross-platform mobile development with <span className="font-medium text-slate-200">React Native</span> and production-ready web apps using <span className="font-medium text-slate-200">Next.js</span>.
  </p>
  <p className="mt-4 text-sm leading-relaxed text-slate-400">
    Lately, my focus has expanded deeper into backend architectures, complex state management, and cloud integrations—leveraging tools like <span className="font-medium text-slate-200">Supabase, Firebase, and PostgreSQL</span> to power offline-first capabilities and secure, role-based workflows. I thrive on bridging the gap between seamless user interfaces and scalable backend logic.
  </p>

  {/* Stats */}
  <div className="mt-8 grid grid-cols-3 gap-3">
    {[
      { num: "4+", label: "Apps Shipped" },
      { num: "Full-Stack", label: "Capabilities" },
      { num: "1+ Yrs", label: "Post-Grad Exp" },
    ].map(({ num, label }) => (
      <div
        key={label}
        className="rounded-xl border border-white/5 bg-white/[0.03] p-4 text-center"
      >
        <div className="text-xl font-semibold text-slate-200">{num}</div>
        <div className="mt-1 text-xs text-slate-500">{label}</div>
      </div>
    ))}
  </div>
</section>

            {/* ── Skills ─────────────────────────────────────────────────── */}
            <section id="skills" className="scroll-mt-20">
              <SectionLabel>Skills</SectionLabel>

              <div className="mt-4 flex flex-col gap-3">
                {frontSkills.map((skill) => (
                  <div
                    key={skill.title}
                    className="group flex gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-white/10 hover:bg-white/[0.05]"
                  >
                    {/* SVG Logo */}
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 p-2 ${skill.bgColor}`}
                    >
                      {skill.logo}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-slate-200">
                        {skill.title}
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-slate-500">
                        {skill.desc}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {skill.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-slate-500"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Other skills */}
              <div className="mt-8">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-600">
                  Other skills
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {otherSkills.map(({ label, icon }) => (
                    <div
                      key={label}
                      className="flex items-center gap-2.5 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2.5 text-xs text-slate-400"
                    >
                      <span className="text-base leading-none">{icon}</span>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Projects ───────────────────────────────────────────────── */}
            <section id="projects" className="scroll-mt-20">
              <SectionLabel>Projects</SectionLabel>

              <div className="mt-4 flex flex-col gap-4">
                {projects.map((project) => (
                  <a
                    key={project.title}
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-4 transition hover:border-white/10 hover:bg-white/[0.05] sm:flex-row sm:gap-5"
                  >
                    {/* Thumbnail */}
                    <div className="h-20 w-full shrink-0 overflow-hidden rounded-lg border border-white/10 bg-white/5 sm:h-20 sm:w-28">
                      <Image
                        src={project.img}
                        alt={project.title}
                        width={200}
                        height={120}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-sm font-medium text-slate-200 transition-colors group-hover:text-white">
                            {project.title}
                          </div>
                          <div className="text-xs text-slate-500">{project.subtitle}</div>
                        </div>
                        <ArrowUpRight
                          size={15}
                          className="mt-0.5 shrink-0 text-slate-600 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-slate-300"
                        />
                      </div>
                      <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-slate-500">
                        {project.desc}
                      </p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-full bg-white/[0.05] px-2.5 py-0.5 text-[11px] text-slate-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              {/* Footer */}
              <p className="mt-16 text-xs text-slate-600">
                Built with Next.js · Designed &amp; developed by Yared Bitewlign · Addis Ababa, Ethiopia
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}

// ── Helper ────────────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-600">
      {children}
    </p>
  );
}