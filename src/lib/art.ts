export type ArtVariant =
  | "orbit"
  | "grid"
  | "wave"
  | "prism"
  | "terrain"
  | "bloom";

export type ArtSpec = {
  /** Which generated composition to draw. */
  variant: ArtVariant;
  /** Gradient start colour. */
  from: string;
  /** Gradient end colour. */
  to: string;
};
