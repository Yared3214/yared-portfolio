import type { Metadata } from "next";
import Link from "next/link";
import { WritingList } from "@/components/sections/WritingList";
import { Icon } from "@/components/ui/Icon";
import { sortedPosts } from "@/content/writing";

export const metadata: Metadata = {
  title: "Writing",
  description:
    "Essays on frontend performance, interface design and the process of shipping software.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  const posts = sortedPosts();
  const categories = new Set(posts.map((post) => post.category)).size;

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="wrap">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.16em] text-faint uppercase transition-colors hover:text-fg"
        >
          <Icon
            name="arrow-left"
            size={13}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          Back home
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="eyebrow text-accent">Writing</p>
          <h1 className="mt-4 text-[clamp(2.4rem,6vw,4.2rem)] leading-[0.98] font-medium tracking-[-0.04em]">
            Notes on building{" "}
            <em className="font-display text-gradient italic">
              careful interfaces
            </em>
            .
          </h1>
          <p className="mt-5 max-w-2xl text-[0.95rem] leading-relaxed text-muted md:text-[1.02rem]">
            Things I have learned while shipping web and mobile products —
            performance, design judgement, and the small decisions that decide
            whether an interface feels finished.
          </p>
          <p className="mt-4 font-mono text-[0.62rem] tracking-[0.14em] text-faint uppercase">
            {posts.length} articles · {categories} categories
          </p>
        </header>

        <div className="mt-12">
          <WritingList variant="page" />
        </div>
      </div>
    </section>
  );
}
