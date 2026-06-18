import type { SVGProps } from "react";

export type IconName =
  | "github"
  | "linkedin"
  | "mail"
  | "arrow-up-right"
  | "arrow-right"
  | "arrow-left"
  | "arrow-up"
  | "download"
  | "search"
  | "sun"
  | "moon"
  | "menu"
  | "close"
  | "check"
  | "alert"
  | "sparkle"
  | "map-pin"
  | "clock"
  | "external"
  | "layout"
  | "server"
  | "code"
  | "database"
  | "cloud"
  | "tools"
  | "star"
  | "quote"
  | "send"
  | "book"
  | "compass"
  | "music"
  | "coffee"
  | "camera"
  | "bulb"
  | "menu-dots"
  | "file"
  | "globe";

const paths: Record<IconName, React.ReactNode> = {
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 .5C5.73.5.9 5.34.9 11.6c0 4.9 3.17 9.05 7.57 10.52.55.1.75-.24.75-.53v-1.9c-3.08.67-3.73-1.3-3.73-1.3-.5-1.28-1.23-1.62-1.23-1.62-1-.69.08-.68.08-.68 1.11.08 1.7 1.14 1.7 1.14.98 1.68 2.57 1.2 3.2.92.1-.71.38-1.2.7-1.47-2.46-.28-5.05-1.23-5.05-5.5 0-1.21.43-2.2 1.14-2.98-.12-.28-.5-1.4.1-2.92 0 0 .93-.3 3.05 1.14a10.6 10.6 0 0 1 5.55 0c2.12-1.44 3.04-1.14 3.04-1.14.6 1.52.22 2.64.11 2.92.71.78 1.14 1.77 1.14 2.98 0 4.28-2.6 5.21-5.06 5.49.4.35.76 1.03.76 2.08v3.08c0 .3.2.64.76.53a11.1 11.1 0 0 0 7.56-10.52C23.1 5.34 18.27.5 12 .5Z"
    />
  ),
  linkedin: (
    <path
      fill="currentColor"
      stroke="none"
      d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"
    />
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m3.6 7 7.3 5.2a2 2 0 0 0 2.2 0L20.4 7" />
    </>
  ),
  "arrow-up-right": <path d="M7 17 17 7M8.5 7H17v8.5" />,
  "arrow-right": <path d="M4 12h15M13 6l6 6-6 6" />,
  "arrow-left": <path d="M20 12H5M11 6l-6 6 6 6" />,
  "arrow-up": <path d="M12 20V5M6 11l6-6 6 6" />,
  download: <path d="M12 3v11M7.5 10l4.5 4 4.5-4M4 20h16" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />,
  menu: <path d="M4 8h16M4 16h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  alert: (
    <>
      <path d="M12 3.5 21 20H3l9-16.5Z" />
      <path d="M12 10v4.5M12 17.4v.1" />
    </>
  ),
  sparkle: (
    <>
      <path d="M12 3c.7 4.6 2.4 6.3 7 7-4.6.7-6.3 2.4-7 7-.7-4.6-2.4-6.3-7-7 4.6-.7 6.3-2.4 7-7Z" />
      <path d="M18.5 16.5c.3 1.8.9 2.4 2.6 2.7-1.7.3-2.3.9-2.6 2.6-.3-1.7-.9-2.3-2.6-2.6 1.7-.3 2.3-.9 2.6-2.7Z" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  external: <path d="M14 4h6v6M20 4l-8.5 8.5M18 14v4.5A1.5 1.5 0 0 1 16.5 20h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" />,
  layout: (
    <>
      <rect x="3.5" y="4" width="17" height="16" rx="2.5" />
      <path d="M3.5 9.5h17M9.5 9.5V20" />
    </>
  ),
  server: (
    <>
      <rect x="3.5" y="4" width="17" height="6" rx="2" />
      <rect x="3.5" y="14" width="17" height="6" rx="2" />
      <path d="M7 7h.01M7 17h.01" />
    </>
  ),
  code: <path d="m9 8-4.5 4L9 16M15 8l4.5 4L15 16" />,
  database: (
    <>
      <ellipse cx="12" cy="6" rx="8" ry="3" />
      <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </>
  ),
  cloud: <path d="M7 18a4 4 0 0 1-.4-8A5.5 5.5 0 0 1 17 9.4 4.3 4.3 0 0 1 16.6 18H7Z" />,
  tools: (
    <>
      <path d="M14.5 6.5a3.5 3.5 0 0 0 4.6 4.6L21 13l-8 8-2-2 8-8-1.9-1.9a3.5 3.5 0 0 0-4.6-4.6L14.5 6.5Z" />
      <path d="m5 5 4 4M3 8l4-4" />
    </>
  ),
  star: <path d="m12 4 2.4 5 5.6.7-4 4 1 5.6-5-2.8-5 2.8 1-5.6-4-4 5.6-.7L12 4Z" />,
  quote: (
    <path
      fill="currentColor"
      stroke="none"
      d="M9.4 5.5C6.3 7 4.6 9.6 4.6 13.1c0 3.1 1.7 5.4 4.3 5.4 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8 0-1 .2.3-1.5 1.5-2.9 3.2-3.8l-2.2-2.2Zm9.2 0C15.5 7 13.8 9.6 13.8 13.1c0 3.1 1.7 5.4 4.3 5.4 2.2 0 3.8-1.6 3.8-3.7 0-2-1.4-3.5-3.3-3.5-.4 0-.8 0-1 .2.3-1.5 1.5-2.9 3.2-3.8l-2.2-2.2Z"
    />
  ),
  send: <path d="M21 3 10.5 13.5M21 3l-6.5 18-4-7.5L3 9.5 21 3Z" />,
  book: <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5v-15ZM4 18V5.5M8 8h7" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m15.5 8.5-2.2 5-5 2.2 2.2-5 5-2.2Z" />
    </>
  ),
  music: (
    <>
      <path d="M9 18V6l10-2v12" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="16.5" cy="16" r="2.5" />
    </>
  ),
  coffee: (
    <>
      <path d="M4 8h12v5a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5V8Z" />
      <path d="M16 9h2a2.5 2.5 0 0 1 0 5h-2M7 4.5c0-1 1-1 .5-2M11 4.5c0-1 1-1 .5-2" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
      <circle cx="12" cy="13.5" r="3.5" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 17h6M10 20h4M12 3a6 6 0 0 0-3.5 10.9c.4.3.5.7.5 1.1v1h6v-1c0-.4.1-.8.5-1.1A6 6 0 0 0 12 3Z" />
    </>
  ),
  "menu-dots": (
    <>
      <circle cx="5" cy="12" r="1.4" fill="currentColor" />
      <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      <circle cx="19" cy="12" r="1.4" fill="currentColor" />
    </>
  ),
  file: (
    <>
      <path d="M6 3.5h7L19 9v11.5H6V3.5Z" />
      <path d="M13 3.5V9h5.5" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.6 12h16.8M12 3.5c2.5 2.4 3.8 5.3 3.8 8.5S14.5 18.1 12 20.5c-2.5-2.4-3.8-5.3-3.8-8.5S9.5 5.9 12 3.5Z" />
    </>
  ),
};

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 18, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
