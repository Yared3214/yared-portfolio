"use client";

import { useState } from "react";
import { skillGroups } from "@/content/skills";
import { sectionIndex } from "@/content/site";
import { Icon, type IconName } from "@/components/ui/Icon";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const groupIcon: Record<string, IconName> = {
  layout: "layout",
  server: "server",
  code: "code",
  database: "database",
  cloud: "cloud",
  tools: "tools",
  spark: "sparkle",
};

export function Skills() {
  const [activeId, setActiveId] = useState(skillGroups[0].id);
  const active = skillGroups.find((group) => group.id === activeId) ?? skillGroups[0];

  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent"
      />
      <div className="wrap">
        <SectionHead
          index={sectionIndex.skills}
          label="Skills"
          title={
            <>
              The toolkit,{" "}
              <em className="font-display text-accent italic">honestly</em> labelled.
            </>
          }
          description="No proficiency percentages, no invented bars. These are the categories I work in and a note on what each one actually means day to day."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-[19rem_1fr] lg:gap-14">
          {/* category rail */}
          <div className="min-w-0">
            <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0">
              {skillGroups.map((group) => {
                const isActive = group.id === active.id;
                return (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setActiveId(group.id)}
                    aria-pressed={isActive}
                    className={cn(
                      "group flex shrink-0 items-center gap-3 rounded-full border px-4 py-2.5 text-left transition-all duration-300 lg:w-full lg:rounded-xl lg:border-transparent lg:px-4 lg:py-3.5",
                      isActive
                        ? "border-line-strong bg-card text-fg lg:border-line"
                        : "border-line text-muted hover:border-line-strong hover:text-fg lg:border-transparent lg:hover:bg-card/60",
                    )}
                  >
                    <span
                      className={cn(
                        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors",
                        isActive
                          ? "border-accent/40 bg-accent/10 text-accent"
                          : "border-line text-faint group-hover:text-muted",
                      )}
                    >
                      <Icon name={groupIcon[group.icon]} size={14} />
                    </span>
                    <span className="text-[0.83rem] font-medium whitespace-nowrap lg:whitespace-normal">
                      {group.label}
                    </span>
                    <span className="ml-auto hidden font-mono text-[0.63rem] text-faint lg:inline">
                      {String(group.skills.length).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="mt-6 hidden border-t border-line pt-5 font-mono text-[0.62rem] leading-relaxed tracking-[0.08em] text-faint uppercase lg:block">
              Tools I can work in today.
              <br />
              Depth varies — and I say so.
            </p>
          </div>

          {/* panel */}
          <div
            key={active.id}
            className="dialog-enter card-surface min-w-0 p-5 md:p-7"
          >
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-line pb-5">
              <div className="max-w-lg">
                <h3 className="text-[1.05rem] font-medium tracking-[-0.01em]">
                  {active.label}
                </h3>
                <p className="mt-1.5 text-[0.86rem] leading-relaxed text-muted">
                  {active.blurb}
                </p>
              </div>
              <span className="chip">
                {active.skills.length} technologies
              </span>
            </div>

            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {active.skills.map((skill, index) => (
                <li
                  key={skill.name}
                  className="group flex items-start gap-3 rounded-xl border border-transparent px-3 py-3 transition-colors hover:border-line hover:bg-bg-soft/60"
                  style={{
                    animation: "fade-up-soft .5s cubic-bezier(0.22,1,0.36,1) both",
                    animationDelay: `${index * 35}ms`,
                  }}
                >
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50 transition-colors group-hover:bg-accent"
                  />
                  <span>
                    <span className="block text-[0.88rem] font-medium text-fg">
                      {skill.name}
                    </span>
                    <span className="mt-0.5 block text-[0.78rem] leading-snug text-muted">
                      {skill.note}
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
