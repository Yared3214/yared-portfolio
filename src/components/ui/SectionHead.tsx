import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadProps = {
  index: string;
  label: string;
  title: ReactNode;
  description?: ReactNode;
  className?: string;
  align?: "left" | "center";
};

export function SectionHead({
  index,
  label,
  title,
  description,
  className,
  align = "left",
}: SectionHeadProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className="eyebrow text-faint">{index}</span>
        <span aria-hidden className="h-px w-8 bg-line-strong" />
        <span className="eyebrow text-accent">{label}</span>
      </div>
      <h2 className="max-w-3xl text-[clamp(2rem,4.2vw,3.35rem)] leading-[1.04] font-medium tracking-[-0.03em]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-[0.95rem] leading-relaxed text-muted md:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
