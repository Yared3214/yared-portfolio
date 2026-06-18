import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Journey } from "@/components/sections/Journey";
import { Certificates } from "@/components/sections/Certificates";
import { Interests } from "@/components/sections/Interests";
import { WritingList } from "@/components/sections/WritingList";
import { Contact } from "@/components/sections/Contact";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { sectionIndex } from "@/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Journey />
      <Certificates />
      <Interests />

      <section id="writing" className="relative py-24 md:py-32">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line to-transparent"
        />
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              index={sectionIndex.writing}
              label="Writing"
              title={
                <>
                  Notes on building{" "}
                  <em className="font-display text-accent italic">
                    careful interfaces
                  </em>
                  .
                </>
              }
              description="Short, practical essays about performance, design judgement and the unglamorous parts of shipping software."
            />
          </div>
          <Reveal className="mt-10">
            <WritingList variant="home" limit={3} />
          </Reveal>
        </div>
      </section>

      <Contact />
    </>
  );
}
