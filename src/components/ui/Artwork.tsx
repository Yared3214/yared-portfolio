import type { ArtSpec } from "@/lib/art";

type ArtworkProps = {
  art: ArtSpec;
  className?: string;
  /** Accessible label; when omitted the artwork is decorative. */
  label?: string;
  /** Extra de-duplication for SVG gradient ids. */
  idSuffix?: string;
};

function safeId(art: ArtSpec, suffix: string): string {
  const base = `${art.variant}${art.from}${art.to}${suffix}`;
  return `a${base.replace(/[^a-z0-9]/gi, "")}`;
}

/**
 * Generated, dependency-free artwork used as project thumbnails, blog covers
 * and certificate previews. Replace with real screenshots when you have them.
 */
export function Artwork({ art, className, label, idSuffix = "0" }: ArtworkProps) {
  const id = safeId(art, idSuffix);
  const { from, to, variant } = art;

  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#08080F" />
          <stop offset="52%" stopColor="#0B0A16" />
          <stop offset="100%" stopColor="#05050A" />
        </linearGradient>
        <linearGradient id={`${id}-ink`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={from} stopOpacity="0.9" />
          <stop offset="55%" stopColor={to} stopOpacity="0.35" />
          <stop offset="100%" stopColor={to} stopOpacity="0" />
        </radialGradient>
        <pattern
          id={`${id}-grid`}
          width="44"
          height="44"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M44 0H0v44"
            fill="none"
            stroke="#ffffff"
            strokeOpacity="0.055"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="800" height="600" fill={`url(#${id}-bg)`} />
      <rect width="800" height="600" fill={`url(#${id}-grid)`} />
      <ellipse
        cx="640"
        cy="120"
        rx="320"
        ry="260"
        fill={`url(#${id}-glow)`}
        opacity="0.55"
      />

      {variant === "orbit" && (
        <g transform="translate(400 300)">
          <circle r="188" fill="none" stroke={to} strokeOpacity="0.16" />
          <circle r="140" fill="none" stroke={from} strokeOpacity="0.22" />
          <ellipse
            rx="188"
            ry="76"
            fill="none"
            stroke={to}
            strokeOpacity="0.55"
            strokeWidth="1.4"
            transform="rotate(-24)"
          />
          <ellipse
            rx="150"
            ry="112"
            fill="none"
            stroke={from}
            strokeOpacity="0.35"
            strokeWidth="1.2"
            transform="rotate(38)"
          />
          <circle r="86" fill={`url(#${id}-glow)`} opacity="0.85" />
          <circle r="42" fill={from} opacity="0.95" />
          <circle r="42" fill="none" stroke="#ffffff" strokeOpacity="0.35" />
          <circle cx="170" cy="-66" r="7" fill={to} />
          <circle cx="-150" cy="82" r="4.5" fill="#ffffff" opacity="0.7" />
          <circle cx="108" cy="128" r="3" fill={to} opacity="0.8" />
        </g>
      )}

      {variant === "grid" && (
        <g>
          <g stroke={from} strokeOpacity="0.35">
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={80 + i * 72}
                y1="0"
                x2={260 + i * 40}
                y2="600"
                strokeWidth="0.9"
              />
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1="0"
                y1={110 + i * 68}
                x2="800"
                y2={90 + i * 68}
                strokeWidth="0.9"
                strokeOpacity="0.22"
              />
            ))}
          </g>
          <circle cx="392" cy="330" r="74" fill={`url(#${id}-glow)`} />
          <circle cx="392" cy="330" r="15" fill={to} />
          <circle
            cx="392"
            cy="330"
            r="34"
            fill="none"
            stroke={to}
            strokeOpacity="0.7"
          />
          <circle
            cx="392"
            cy="330"
            r="58"
            fill="none"
            stroke={from}
            strokeOpacity="0.35"
            strokeDasharray="3 8"
          />
          <path
            d="M392 330 L620 190"
            stroke={to}
            strokeOpacity="0.55"
            strokeDasharray="4 7"
          />
          <circle cx="620" cy="190" r="5" fill={to} />
        </g>
      )}

      {variant === "wave" && (
        <g>
          {[0, 1, 2, 3, 4].map((i) => (
            <path
              key={i}
              d={`M-40 ${250 + i * 54} C 140 ${150 + i * 58}, 280 ${
                380 + i * 34
              }, 430 ${270 + i * 46} S 680 ${140 + i * 62}, 840 ${
                250 + i * 40
              }`}
              fill="none"
              stroke={i % 2 === 0 ? from : to}
              strokeOpacity={0.62 - i * 0.09}
              strokeWidth={1.7 - i * 0.16}
            />
          ))}
          <circle cx="430" cy="272" r="90" fill={`url(#${id}-glow)`} opacity="0.7" />
        </g>
      )}

      {variant === "prism" && (
        <g>
          <polygon
            points="400,110 610,470 190,470"
            fill={from}
            fillOpacity="0.2"
            stroke={from}
            strokeOpacity="0.65"
          />
          <polygon
            points="400,110 500,290 300,290"
            fill={to}
            fillOpacity="0.25"
            stroke={to}
            strokeOpacity="0.45"
          />
          <polygon
            points="400,110 700,420 470,470"
            fill="none"
            stroke={to}
            strokeOpacity="0.22"
          />
          <line x1="400" y1="110" x2="400" y2="470" stroke={to} strokeOpacity="0.4" />
          <circle cx="400" cy="290" r="120" fill={`url(#${id}-glow)`} opacity="0.55" />
        </g>
      )}

      {variant === "terrain" && (
        <g>
          <circle cx="580" cy="150" r="60" fill={to} opacity="0.85" />
          <circle cx="580" cy="150" r="110" fill={`url(#${id}-glow)`} opacity="0.5" />
          <path
            d="M-20 470 L150 300 L280 400 L400 240 L520 380 L650 280 L820 440 L820 620 L-20 620 Z"
            fill={from}
            fillOpacity="0.16"
            stroke={from}
            strokeOpacity="0.55"
          />
          <path
            d="M-20 520 L170 390 L320 480 L470 370 L640 470 L820 380 L820 620 L-20 620 Z"
            fill={to}
            fillOpacity="0.12"
            stroke={to}
            strokeOpacity="0.4"
          />
          <g stroke="#ffffff" strokeOpacity="0.18">
            <line x1="120" y1="0" x2="120" y2="600" />
            <line x1="360" y1="0" x2="360" y2="600" />
            <line x1="640" y1="0" x2="640" y2="600" />
          </g>
        </g>
      )}

      {variant === "bloom" && (
        <g transform="translate(400 310)">
          {Array.from({ length: 8 }).map((_, i) => (
            <ellipse
              key={i}
              rx="34"
              ry="150"
              cy="-150"
              fill="none"
              stroke={i % 2 ? to : from}
              strokeOpacity="0.34"
              strokeWidth="1.3"
              transform={`rotate(${i * 45})`}
            />
          ))}
          <circle r="72" fill={`url(#${id}-glow)`} />
          <circle r="30" fill={from} />
          <circle r="30" fill="none" stroke="#ffffff" strokeOpacity="0.4" />
          <circle r="9" fill={to} />
          <circle cx="360" cy="-190" r="4" fill={to} opacity="0.8" />
          <circle cx="-300" cy="150" r="5" fill={from} opacity="0.7" />
        </g>
      )}

      <rect
        width="800"
        height="600"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.07"
      />
    </svg>
  );
}
