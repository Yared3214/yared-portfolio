import { interests } from "@/content/interests";
import { sectionIndex } from "@/content/site";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { Icon, type IconName } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

const kindIcon: Record<string, IconName> = {
  books: "book",
  tech: "compass",
  hobbies: "camera",
  music: "music",
  learning: "bulb",
  life: "coffee",
};

const spans = [
  "md:col-span-2",
  "",
  "",
  "md:col-span-2",
  "",
  "",
];

export function Interests() {
  return (
    <section id="interests" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent"
      />
      <div className="wrap">
        <SectionHead
          index={sectionIndex.interests}
          label="Beyond code"
          title={
            <>
              The parts of me that{" "}
              <em className="font-display text-accent italic">
                do not compile
              </em>
              .
            </>
          }
          description="A portfolio that only shows the work is only half a person. Here is the rest of it."
        />

        <div className="mt-12 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {interests.map((group, index) => (
            <Reveal
              key={group.id}
              delay={(index % 3) * 70}
              className={cn("h-full", spans[index])}
            >
              <article className="card-surface group relative h-full overflow-hidden p-5 hover:-translate-y-0.5 hover:border-line-strong hover:bg-card-hover md:p-6">
                <div
                  aria-hidden
                  className="absolute -top-16 -right-12 h-32 w-32 rounded-full bg-accent/[0.07] blur-2xl transition-opacity duration-500 group-hover:opacity-100 md:opacity-0"
                />
                <div className="relative flex items-center gap-2.5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-accent">
                    <Icon name={kindIcon[group.kind]} size={14} />
                  </span>
                  <h3 className="font-mono text-[0.65rem] tracking-[0.18em] text-fg uppercase">
                    {group.title}
                  </h3>
                </div>

                <p className="relative mt-3 text-[0.82rem] leading-relaxed text-muted">
                  {group.intro}
                </p>

                <ul className="relative mt-4 space-y-1.5 border-t border-line pt-4">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-[0.83rem] leading-snug text-fg/85"
                    >
                      <span
                        aria-hidden
                        className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent/60"
                      />
                      {item}
                    </li>
                  ))}
                </ul>

                {group.footnote ? (
                  <p className="relative mt-4 font-mono text-[0.62rem] tracking-[0.06em] text-faint">
                    {group.footnote}
                  </p>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
