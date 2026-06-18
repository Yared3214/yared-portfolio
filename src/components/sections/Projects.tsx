"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  projectCategories,
  projects,
  type Project,
  type ProjectFilter,
} from "@/content/projects";
import { sectionIndex } from "@/content/site";
import { Artwork } from "@/components/ui/Artwork";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHead } from "@/components/ui/SectionHead";
import { cn } from "@/lib/utils";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const visibleStack = project.stack.slice(0, 3);
  const extra = project.stack.length - visibleStack.length;

  return (
    <Reveal delay={(index % 3) * 80}>
      <article className="group card-surface relative h-full overflow-hidden hover:-translate-y-1 hover:border-line-strong hover:bg-card-hover hover:shadow-[0_30px_70px_-50px_rgba(0,0,0,0.9)]">
        <div className="relative aspect-[16/11] overflow-hidden">
          <Artwork
            art={project.art}
            idSuffix={project.slug}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.045]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-80"
          />
          <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 font-mono text-[0.6rem] tracking-[0.12em] text-white/85 uppercase backdrop-blur">
            {project.category}
          </span>
          <span className="absolute top-3 right-3 font-mono text-[0.62rem] tracking-[0.14em] text-white/60">
            {project.year}
          </span>
          <span className="absolute right-4 bottom-4 inline-flex h-9 w-9 translate-y-2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white opacity-0 backdrop-blur transition-all duration-[400ms] group-hover:translate-y-0 group-hover:opacity-100">
            <Icon name="arrow-up-right" size={15} />
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-[1.05rem] font-medium tracking-[-0.015em]">
              {project.name}
            </h3>
            <span className="font-mono text-[0.6rem] tracking-[0.14em] text-faint uppercase">
              {project.status}
            </span>
          </div>
          <p className="mt-1.5 text-[0.85rem] leading-relaxed text-muted">
            {project.tagline}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            {visibleStack.map((tech) => (
              <span key={tech} className="chip">
                {tech}
              </span>
            ))}
            {extra > 0 ? (
              <span className="chip border-dashed">+{extra}</span>
            ) : null}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
            <span className="font-mono text-[0.63rem] tracking-[0.14em] text-muted uppercase transition-colors group-hover:text-accent">
              View case study
            </span>
            {project.links.demo ? (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-20 inline-flex items-center gap-1 font-mono text-[0.63rem] tracking-[0.1em] text-faint uppercase transition-colors hover:text-fg"
              >
                Live
                <Icon name="external" size={11} />
              </a>
            ) : (
              <span className="font-mono text-[0.6rem] tracking-[0.1em] text-faint/70 uppercase">
                Demo soon
              </span>
            )}
          </div>
        </div>

        <Link
          href={`/work/${project.slug}`}
          className="absolute inset-0 z-10 rounded-[1.25rem]"
          aria-label={`View the ${project.name} case study`}
        >
          <span className="sr-only">View {project.name}</span>
        </Link>
      </article>
    </Reveal>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectFilter>("All Projects");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const search = query.trim().toLowerCase();
    return projects.filter((project) => {
      const matchesCategory =
        filter === "All Projects" || project.category === filter;
      if (!matchesCategory) return false;
      if (!search) return true;
      const haystack = [
        project.name,
        project.tagline,
        project.category,
        ...project.stack,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(search);
    });
  }, [filter, query]);

  return (
    <section id="work" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent"
      />
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHead
            index={sectionIndex.work}
            label="Selected work"
            title={
              <>
                Things I&apos;ve built, and{" "}
                <em className="font-display text-accent italic">
                  what they taught me
                </em>
                .
              </>
            }
            description="Four shipped products across mobile and web. Each case study documents the problem, the trade-offs and the parts that were genuinely difficult."
          />
          <span className="hidden font-mono text-[0.63rem] tracking-[0.16em] text-faint uppercase md:block">
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </div>

        <div className="mt-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div
            role="group"
            aria-label="Filter projects by category"
            className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:flex-wrap lg:px-0"
          >
            {projectCategories.map((category) => {
              const isActive = filter === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  aria-pressed={isActive}
                  className={cn(
                    "shrink-0 rounded-full border px-3.5 py-2 font-mono text-[0.65rem] tracking-[0.1em] uppercase transition-all duration-300",
                    isActive
                      ? "border-accent/50 bg-accent/12 text-accent"
                      : "border-line text-muted hover:border-line-strong hover:text-fg",
                  )}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div className="relative w-full lg:w-72">
            <label htmlFor="project-search" className="sr-only">
              Search projects by name or technology
            </label>
            <Icon
              name="search"
              size={15}
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-faint"
            />
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects or tech…"
              className="w-full rounded-full border border-line bg-card py-2.5 pr-9 pl-9 text-[0.82rem] text-fg placeholder:text-faint focus:border-accent/60 focus:outline-none"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear project search"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded-full p-1 text-faint transition-colors hover:text-fg"
              >
                <Icon name="close" size={13} />
              </button>
            ) : null}
          </div>
        </div>

        <p aria-live="polite" className="mt-4 font-mono text-[0.63rem] tracking-[0.1em] text-faint uppercase">
          {visible.length} {visible.length === 1 ? "project" : "projects"}
          {filter !== "All Projects" ? ` · ${filter}` : ""}
          {query ? ` · “${query}”` : ""}
        </p>

        {visible.length > 0 ? (
          <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visible.map((project, index) => (
              <ProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="mt-6 card-surface flex flex-col items-center justify-center gap-3 px-6 py-16 text-center">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-faint">
              <Icon name="search" size={18} />
            </span>
            <h3 className="text-[1rem] font-medium">Nothing matches yet</h3>
            <p className="max-w-sm text-[0.85rem] leading-relaxed text-muted">
              No project matches that combination. Try a different category or
              clear the search.
            </p>
            <button
              type="button"
              onClick={() => {
                setFilter("All Projects");
                setQuery("");
              }}
              className="btn btn-ghost mt-2 !py-2 !text-[0.78rem]"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
