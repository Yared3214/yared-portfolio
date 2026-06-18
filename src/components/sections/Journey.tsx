import { timeline } from "@/content/journey";
import { sectionIndex } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const typeStyles: Record<string, string> = {
  Education: "text-accent border-accent/30 bg-accent/10",
  Experience: "text-mint border-mint/30 bg-mint/[0.08]",
  Milestone: "text-peach border-peach/30 bg-peach/[0.08]",
};

export function Journey() {
  return (
    <section id="journey" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent"
      />
      <div className="wrap">
        <SectionHead
          index={sectionIndex.journey}
          label="Journey"
          title={
            <>
              From fundamentals to{" "}
              <em className="font-display text-accent italic">
                shipped software
              </em>
              .
            </>
          }
          description="Education, work and the milestones in between. Every entry here is real — nothing invented to fill a timeline."
        />

        <ol className="relative mt-14 space-y-8 md:space-y-10">
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-accent/50 via-line-strong to-transparent md:left-[calc(9rem+7px)]"
          />

          {timeline.map((entry, index) => (
            <li key={entry.id} className="relative">
              <Reveal delay={index * 60}>
                <div className="grid gap-4 md:grid-cols-[9rem_1.5rem_1fr] md:gap-6">
                  <div className="flex items-center gap-3 md:justify-end md:pt-6">
                    <span className="font-mono text-[0.66rem] tracking-[0.16em] text-faint uppercase md:text-right">
                      {entry.period}
                    </span>
                  </div>

                  <div className="absolute top-2 left-0 flex h-[15px] w-[15px] items-center justify-center md:static md:mt-7 md:h-auto md:w-auto">
                    <span
                      className={cn(
                        "h-[13px] w-[13px] rounded-full border bg-bg",
                        entry.type === "Experience"
                          ? "border-mint"
                          : entry.type === "Education"
                            ? "border-accent"
                            : "border-peach",
                      )}
                    >
                      <span
                        className={cn(
                          "mx-auto mt-[3px] block h-1.5 w-1.5 rounded-full",
                          entry.type === "Experience"
                            ? "bg-mint"
                            : entry.type === "Education"
                              ? "bg-accent"
                              : "bg-peach",
                        )}
                      />
                    </span>
                  </div>

                  <div className="card-surface group ml-7 p-5 hover:border-line-strong hover:bg-card-hover md:ml-0 md:p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "rounded-full border px-2.5 py-0.5 font-mono text-[0.58rem] tracking-[0.14em] uppercase",
                          typeStyles[entry.type],
                        )}
                      >
                        {entry.type}
                      </span>
                      <span className="font-mono text-[0.62rem] tracking-[0.08em] text-faint uppercase md:hidden">
                        {entry.period}
                      </span>
                    </div>

                    <h3 className="mt-3 text-[1.05rem] font-medium tracking-[-0.015em] md:text-[1.15rem]">
                      {entry.title}
                    </h3>
                    <p className="mt-0.5 text-[0.82rem] text-muted">
                      {entry.org}
                    </p>
                    <p className="mt-3 text-[0.87rem] leading-relaxed text-muted">
                      {entry.description}
                    </p>

                    {entry.highlights?.length ? (
                      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                        {entry.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-start gap-2 text-[0.8rem] leading-snug text-muted"
                          >
                            <Icon
                              name="check"
                              size={12}
                              className="mt-1 shrink-0 text-accent/80"
                            />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
