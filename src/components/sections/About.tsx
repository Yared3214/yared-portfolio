import { site, sectionIndex } from "@/content/site";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";

const pillars = [
  {
    title: "Background",
    body: "Computer science foundations first — data structures, databases, networking — then a deliberate move into building complete products rather than isolated exercises.",
    icon: "code" as const,
  },
  {
    title: "Approach",
    body: "Understand the problem, model the smallest correct version of it, ship something real, then refine. Accessibility and performance are part of the definition of done, not a later pass.",
    icon: "compass" as const,
  },
  {
    title: "Goals",
    body: "Grow into a product-minded engineer who can own a feature from interface to database, with design judgement and the discipline to keep scope honest.",
    icon: "bulb" as const,
  },
  {
    title: "Off-screen",
    body: "Ethiopian coffee taken seriously, football watched with too much opinion, and long walks around Addis that usually end in a photograph.",
    icon: "coffee" as const,
  },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHead
            index={sectionIndex.about}
            label="About"
            title={
              <>
                A computer science foundation,{" "}
                <em className="font-display text-accent italic">rewired</em> for
                mobile and the web.
              </>
            }
            description="I build interfaces for people who do not care how they were built — which is exactly why the engineering has to be careful."
          />

          <Reveal className="mt-9" delay={80}>
            <figure className="relative overflow-hidden rounded-2xl border border-line bg-card p-6">
              <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
              />
              <Icon name="quote" size={22} className="text-accent/80" />
              <blockquote className="mt-4 font-display text-[1.35rem] leading-[1.35] text-fg italic md:text-[1.5rem]">
                “{site.quote}”
              </blockquote>
              <figcaption className="mt-4 font-mono text-[0.63rem] tracking-[0.18em] text-faint uppercase">
                {site.quoteAttribution}
              </figcaption>
            </figure>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <p className="text-[0.98rem] leading-[1.8] text-muted md:text-[1.05rem]">
              I&apos;m Yared, a full-stack and mobile developer based in{" "}
              <span className="text-fg">{site.location}</span>. My route into
              software started with computer science fundamentals and then, over
              the past year, turned into something more concrete: four shipped
              applications that people can actually open and use.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-5 text-[0.98rem] leading-[1.8] text-muted md:text-[1.05rem]">
              Most of that work happens in two places — React Native for
              cross-platform mobile apps, and Next.js for production-ready web
              products. Lately it has pushed deeper into backend architecture,
              complex state and cloud integration, using Supabase, Firebase and
              PostgreSQL for offline-first storage and secure, role-based
              workflows. I like the part of the job where a design file, an API
              and a real user&apos;s slow phone all have to agree.
            </p>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-5 text-[0.98rem] leading-[1.8] text-muted md:text-[1.05rem]">
              I care about interfaces that explain themselves, code that the next
              person can read, and the unglamorous details — loading states,
              empty states, keyboard order — that decide whether something feels
              finished.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {pillars.map((pillar, index) => (
              <Reveal key={pillar.title} delay={index * 70}>
                <div className="card-surface group h-full p-5 hover:-translate-y-0.5 hover:border-line-strong hover:bg-card-hover">
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-line text-accent transition-colors group-hover:border-accent/40">
                      <Icon name={pillar.icon} size={14} />
                    </span>
                    <h3 className="font-mono text-[0.66rem] tracking-[0.18em] text-fg uppercase">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-[0.85rem] leading-relaxed text-muted">
                    {pillar.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-line bg-bg-soft/50 px-5 py-4">
              <p className="font-mono text-[0.63rem] tracking-[0.18em] text-faint uppercase">
                Currently
              </p>
              <p className="text-[0.86rem] text-muted">
                Four apps shipped · React Native and Next.js · going deeper on
                backend architecture with Supabase, Firebase and PostgreSQL
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
