"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  postCategories,
  sortedPosts,
  type Post,
} from "@/content/writing";
import { formatDate } from "@/lib/utils";
import { Artwork } from "@/components/ui/Artwork";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function PostCard({ post, index = 0 }: { post: Post; index?: number }) {
  return (
    <Reveal delay={(index % 3) * 70}>
      <article className="group card-surface relative h-full overflow-hidden hover:-translate-y-1 hover:border-line-strong hover:bg-card-hover">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Artwork
            art={post.art}
            idSuffix={post.slug}
            className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-[1.04]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"
          />
          <span className="absolute top-3 left-3 rounded-full border border-white/15 bg-black/35 px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.14em] text-white/80 uppercase backdrop-blur">
            {post.category}
          </span>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-2 font-mono text-[0.6rem] tracking-[0.12em] text-faint uppercase">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readMinutes} min read</span>
          </div>

          <h3 className="mt-2.5 text-[1.02rem] leading-snug font-medium tracking-[-0.015em]">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-[0.84rem] leading-relaxed text-muted">
            {post.excerpt}
          </p>

          <div className="mt-4 flex items-center gap-1.5 text-[0.78rem] text-accent">
            Read article
            <Icon
              name="arrow-right"
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </div>
        </div>

        <Link
          href={post.externalUrl ?? `/writing/${post.slug}`}
          target={post.externalUrl ? "_blank" : undefined}
          rel={post.externalUrl ? "noopener noreferrer" : undefined}
          className="absolute inset-0 z-10 rounded-[1.25rem]"
          aria-label={
            post.externalUrl
              ? `Read ${post.title} (opens in a new tab)`
              : `Read ${post.title}`
          }
        >
          <span className="sr-only">{post.title}</span>
        </Link>
      </article>
    </Reveal>
  );
}

type WritingListProps = {
  variant?: "home" | "page";
  limit?: number;
};

export function WritingList({ variant = "home", limit }: WritingListProps) {
  const posts = useMemo(() => sortedPosts(), []);
  const [category, setCategory] = useState<(typeof postCategories)[number]>(
    "All",
  );

  const visible = posts
    .filter((post) => category === "All" || post.category === category)
    .slice(0, limit);

  return (
    <div>
      <div
        role="group"
        aria-label="Filter articles by category"
        className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:px-0"
      >
        {postCategories.map((item) => {
          const isActive = category === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={isActive}
              className={cn(
                "shrink-0 rounded-full border px-3.5 py-2 font-mono text-[0.65rem] tracking-[0.1em] uppercase transition-all duration-300",
                isActive
                  ? "border-accent/50 bg-accent/12 text-accent"
                  : "border-line text-muted hover:border-line-strong hover:text-fg",
              )}
            >
              {item}
            </button>
          );
        })}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((post, index) => (
          <PostCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="mt-6 rounded-xl border border-line bg-card px-5 py-8 text-center text-[0.85rem] text-muted">
          No articles in this category yet.
        </p>
      ) : null}

      {variant === "home" && posts.length > (limit ?? 0) ? (
        <div className="mt-8 flex justify-center">
          <Link href="/writing" className="btn btn-ghost group">
            All writing
            <Icon
              name="arrow-right"
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
