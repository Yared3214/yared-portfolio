/**
 * Generates public/resume.pdf — a real, valid one-page PDF built from the same
 * information as the site, with no external dependencies.
 *
 * Run with:  npm run resume
 *
 * Replace /public/resume.pdf with your own tailored PDF whenever you like, or
 * edit the CONTENT object below and regenerate.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const output = resolve(__dirname, "../public/resume.pdf");

const CONTENT = {
  name: "Yared Bitewlign",
  title: "Full-Stack · Mobile Developer",
  contact: [
    "yaredbitewlign@gmail.com",
    "+ Addis Ababa, Ethiopia",
    "github.com/yared3214",
    "linkedin.com/in/yared-bitewlign-6764ab263",
  ],
  summary:
    "Full-stack and mobile developer with computer science foundations and a year of post-graduate experience shipping end-to-end products. Strongest in React Native for cross-platform mobile and Next.js for production web, with backend work across Supabase, Firebase and PostgreSQL — role-based access, offline-first storage and secure data handling.",
  skills: [
    ["Mobile", "React Native, Expo, SQLite, Zustand, offline-first storage"],
    ["Web", "React, Next.js, TypeScript, Tailwind CSS, Shadcn UI, Framer Motion"],
    ["Backend", "Supabase, Firebase, PostgreSQL, REST APIs, authentication, role-based access, Zod"],
    ["Tooling", "Git & GitHub, Vercel, Nodemailer, responsive and accessible UI"],
  ],
  projects: [
    [
      "Skin Health Companion — patient mobile app (React Native, Firebase, Supabase)",
      "Dermatologist-approved resources, patient records and verified experts, with role-based access and secure document uploads.",
    ],
    [
      "Ethio Stock Link Lite — offline-first trading app (React Native, SQLite)",
      "Local portfolio, timestamped cached quotes, and queued buy, sell and deposit orders with explicit pending states.",
    ],
    [
      "FastX Delivery — logistics console (React, Tailwind CSS)",
      "Order board, courier dispatch and a customer-readable tracking timeline on one responsive dashboard.",
    ],
    [
      "Ethiopian Artisan Marketplace — e-commerce (Next.js, Zod, Nodemailer)",
      "Maker-led product pages, a validated cart and checkout, and real order confirmation email for global buyers.",
    ],
  ],
  education: [
    ["Computer Science Foundations", "Academic study — data structures, databases, networking"],
    ["Continuous learning", "Self-directed study in mobile and full-stack engineering"],
  ],
  links: "Portfolio and case studies: yaredbitewlign.com",
};

/* ------------------------------------------------------------------ */
/*  Minimal PDF writer                                                */
/* ------------------------------------------------------------------ */

const PAGE_W = 595.28;
const PAGE_H = 841.89;
const MARGIN = 54;
const INK = "0.07 0.06 0.10";
const MUTED = "0.36 0.35 0.42";
const ACCENT = "0.42 0.27 0.86";

const ops = [];
let y = PAGE_H - MARGIN;

const escape = (value) =>
  String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)")
    // keep the content stream inside WinAnsi-safe ASCII
    .replace(/[^\x20-\x7E]/g, "-");

function text(value, { size = 10, bold = false, color = INK, x = MARGIN, gap = 15 } = {}) {
  const font = bold ? "F1" : "F2";
  ops.push(
    `BT ${color} rg /${font} ${size} Tf 1 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)} Tm (${escape(value)}) Tj ET`,
  );
  y -= gap;
}

function rule(color = "0.85 0.84 0.87", width = 1) {
  y -= 4;
  ops.push(
    `${color} RG ${width} w ${MARGIN} ${y.toFixed(2)} m ${(PAGE_W - MARGIN).toFixed(2)} ${y.toFixed(2)} l S`,
  );
  y -= 14;
}

function spacer(height = 8) {
  y -= height;
}

const wrap = (value, maxChars) => {
  const words = String(value).split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    if ((line + " " + word).trim().length > maxChars) {
      if (line) lines.push(line.trim());
      line = word;
    } else {
      line = `${line} ${word}`;
    }
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
};

// Header
text(CONTENT.name, { size: 24, bold: true, gap: 19 });
text(CONTENT.title, { size: 11, color: ACCENT, gap: 16 });
text(CONTENT.contact.join("   ·   "), { size: 8.5, color: MUTED, gap: 12 });
rule();

// Summary
text("SUMMARY", { size: 8, bold: true, color: ACCENT, gap: 13 });
for (const line of wrap(CONTENT.summary, 108)) {
  text(line, { size: 9.5, color: INK, gap: 12.5 });
}
spacer(4);

// Skills
text("SKILLS", { size: 8, bold: true, color: ACCENT, gap: 13 });
for (const [label, value] of CONTENT.skills) {
  text(`${label}: ${value}`, { size: 9.2, color: INK, gap: 12.5 });
}
spacer(4);

// Projects
text("SELECTED PROJECTS", { size: 8, bold: true, color: ACCENT, gap: 13 });
for (const [title, detail] of CONTENT.projects) {
  text(title, { size: 9.6, bold: true, gap: 12 });
  for (const line of wrap(detail, 104)) {
    text(line, { size: 9, color: MUTED, gap: 11.8 });
  }
  spacer(3);
}

// Education
text("EDUCATION & CONTINUOUS LEARNING", {
  size: 8,
  bold: true,
  color: ACCENT,
  gap: 13,
});
for (const [title, detail] of CONTENT.education) {
  text(`${title} — ${detail}`, { size: 9.2, gap: 12.5 });
}

spacer(10);
rule("0.86 0.85 0.88", 0.6);
text(CONTENT.links, { size: 8.4, color: MUTED, gap: 11 });

const stream = ops.join("\n");
const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
  `<< /Length ${Buffer.byteLength(stream, "latin1")} >>\nstream\n${stream}\nendstream`,
];

let pdf = "%PDF-1.4\n";
const offsets = [0];
objects.forEach((object, index) => {
  offsets.push(Buffer.byteLength(pdf, "latin1"));
  pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
});
const xrefOffset = Buffer.byteLength(pdf, "latin1");
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (let i = 1; i <= objects.length; i += 1) {
  pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

mkdirSync(dirname(output), { recursive: true });
writeFileSync(output, Buffer.from(pdf, "latin1"));
console.log(`Wrote ${output} (${Buffer.byteLength(pdf, "latin1")} bytes)`);
