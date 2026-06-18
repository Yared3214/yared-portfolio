/** Tiny class-name joiner (no dependency needed). */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** "2025-03-14" -> "Mar 2025" (stable across locales/server). */
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export function formatMonthYear(value: string): string {
  if (value.toLowerCase() === "present") return "Present";
  const [year, month] = value.split("-");
  const index = Number(month) - 1;
  if (!year || Number.isNaN(index) || !MONTHS[index]) return value;
  return `${MONTHS[index]} ${year}`;
}

export function formatDate(value: string): string {
  return formatMonthYear(value);
}

export function yearFromNow(): number {
  return new Date().getFullYear();
}

export function readingTime(paragraphs: string[]): string {
  const words = paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(2, Math.round(words / 210));
  return `${minutes} min read`;
}
