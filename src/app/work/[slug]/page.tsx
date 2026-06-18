import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { Artwork } from "@/components/ui/Artwork";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.name} — ${project.category}`,
    description: project.tagline,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      title: `${project.name} — ${project.category}`,
      description: project.tagline,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <article className="pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="wrap">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[0.74rem] text-faint">
          <Link href="/" className="transition-colors hover:text-fg">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/#work" className="transition-colors hover:text-fg">
            Work
          </Link>
          <span aria-hidden>/</span>
          <span className="text-muted">{project.name}</span>
        </nav>

        <header className="mt-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="chip !text-accent !border-accent/30 !bg-accent/10">
              {project.category}
            </span>
            <span className="font-mono text-[0.63rem] tracking-[0.16em] text-faint uppercase">
              {project.year}
            </span>
            <span aria-hidden className="h-3 w-px bg-line-strong" />
            <span className="font-mono text-[0.63rem] tracking-[0.16em] text-faint uppercase">
              {project.status}
            </span>
          </div>

          <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-[clamp(2.6rem,6.5vw,4.6rem)] leading-[0.95] font-medium tracking-[-0.04em]">
                {project.name}
              </h1>
              <p className="mt-3 max-w-xl text-[0.98rem] leading-relaxed text-muted md:text-[1.05rem]">
                {project.tagline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {project.links.demo ? (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary !py-2.5 !text-[0.8rem]"
                >
                  Live demo
                  <Icon name="external" size={14} />
                </a>
              ) : (
                <span className="chip !py-2 !text-[0.68rem]">
                  Live demo not public yet
                </span>
              )}
              {project.links.repo ? (
                <a
                  href={project.links.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost !py-2.5 !text-[0.8rem]"
                >
                  <Icon name="github" size={15} />
                  Source
                </a>
              ) : null}
            </div>
          </div>
        </header>

        <div className="mt-9 overflow-hidden rounded-2xl border border-line">
          <Artwork
            art={project.art}
            idSuffix={`${project.slug}-hero`}
            label={`${project.name} — abstract cover artwork`}
            className="aspect-[16/8] w-full object-cover"
          />
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
          {[
            { label: "Role", value: project.role },
            { label: "Year", value: project.year },
            { label: "Category", value: project.category },
            { label: "Status", value: project.status },
          ].map((item) => (
            <div key={item.label} className="bg-bg px-4 py-3.5">
              <dt className="font-mono text-[0.58rem] tracking-[0.16em] text-faint uppercase">
                {item.label}
              </dt>
              <dd className="mt-1 text-[0.85rem] text-fg">{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="wrap mt-16 md:mt-20">
        <div className="grid gap-8 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="font-mono text-[0.62rem] tracking-[0.2em] text-accent uppercase">
              Overview
            </p>
          </div>
          <div>
            <Reveal>
              <p className="text-[1.05rem] leading-[1.75] text-fg/90 md:text-[1.15rem]">
                {project.summary}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <Reveal delay={60}>
                <section className="card-surface h-full p-5 md:p-6">
                  <h2 className="flex items-center gap-2 font-mono text-[0.63rem] tracking-[0.18em] text-peach uppercase">
                    <span aria-hidden className="h-1 w-1 rounded-full bg-peach" />
                    The problem
                  </h2>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">
                    {project.problem}
                  </p>
                </section>
              </Reveal>
              <Reveal delay={120}>
                <section className="card-surface h-full p-5 md:p-6">
                  <h2 className="flex items-center gap-2 font-mono text-[0.63rem] tracking-[0.18em] text-mint uppercase">
                    <span aria-hidden className="h-1 w-1 rounded-full bg-mint" />
                    The solution
                  </h2>
                  <p className="mt-3 text-[0.9rem] leading-relaxed text-muted">
                    {project.solution}
                  </p>
                </section>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid gap-8 border-t border-line pt-12 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <div>
            <p className="font-mono text-[0.62rem] tracking-[0.2em] text-accent uppercase">
              Key features
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {project.features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 60}>
                <div className="card-surface h-full p-5">
                  <span className="font-mono text-[0.6rem] tracking-[0.14em] text-faint">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-[0.94rem] font-medium">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-[0.84rem] leading-relaxed text-muted">
                    {feature.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-16 border-t border-line pt-12">
          <div className="flex items-end justify-between gap-4">
            <p className="font-mono text-[0.62rem] tracking-[0.2em] text-accent uppercase">
              Screens
            </p>
            <p className="font-mono text-[0.6rem] tracking-[0.1em] text-faint uppercase">
              Interface studies
            </p>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {project.gallery.map((shot, index) => (
              <Reveal key={shot.label} delay={index * 70}>
                <figure className="overflow-hidden rounded-xl border border-line bg-card">
                  <Artwork
                    art={shot.art}
                    idSuffix={`${project.slug}-g${index}`}
                    label={`${project.name} — ${shot.label}`}
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <figcaption className="flex items-center justify-between gap-3 px-4 py-3">
                    <span className="text-[0.8rem] text-fg">{shot.label}</span>
                    <span className="hidden text-[0.72rem] text-faint sm:block">
                      {shot.caption}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Challenges */}
        <div className="mt-16 grid gap-8 border-t border-line pt-12 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <div>
            <p className="font-mono text-[0.62rem] tracking-[0.2em] text-accent uppercase">
              Challenges &amp; lessons
            </p>
          </div>
          <div className="space-y-4">
            {project.challenges.map((item, index) => (
              <Reveal key={item.challenge} delay={index * 60}>
                <div className="rounded-xl border border-line bg-card p-5">
                  <h3 className="text-[0.9rem] leading-snug font-medium">
                    {item.challenge}
                  </h3>
                  <p className="mt-2 flex gap-2 text-[0.85rem] leading-relaxed text-muted">
                    <Icon
                      name="bulb"
                      size={14}
                      className="mt-0.5 shrink-0 text-accent/80"
                    />
                    {item.lesson}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Stack */}
        <div className="mt-16 grid gap-8 border-t border-line pt-12 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <div>
            <p className="font-mono text-[0.62rem] tracking-[0.2em] text-accent uppercase">
              Technology
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="chip !py-1.5 !text-[0.72rem]">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* next project */}
      <div className="wrap mt-20">
        <div className="flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/#work"
            className="group inline-flex items-center gap-2 text-[0.84rem] text-muted transition-colors hover:text-fg"
          >
            <Icon
              name="arrow-left"
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            All projects
          </Link>
          <Link
            href={`/work/${next.slug}`}
            className="group inline-flex items-center gap-3 rounded-full border border-line px-4 py-2.5 transition-colors hover:border-line-strong"
          >
            <span className="font-mono text-[0.6rem] tracking-[0.14em] text-faint uppercase">
              Next
            </span>
            <span className="text-[0.9rem] text-fg">{next.name}</span>
            <Icon
              name="arrow-right"
              size={15}
              className="text-muted transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}
