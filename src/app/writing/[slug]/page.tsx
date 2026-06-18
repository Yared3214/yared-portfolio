import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPost, posts, sortedPosts } from "@/content/writing";
import { Artwork } from "@/components/ui/Artwork";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import { formatDate } from "@/lib/utils";
import { site } from "@/content/site";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/writing/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const ordered = sortedPosts();
  const index = ordered.findIndex((item) => item.slug === post.slug);
  const next = ordered[(index + 1) % ordered.length];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: site.name, url: site.url },
    keywords: post.tags.join(", "),
  };

  return (
    <article className="pt-32 pb-20 md:pt-40 md:pb-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="wrap">
        <Link
          href="/writing"
          className="group inline-flex items-center gap-2 font-mono text-[0.65rem] tracking-[0.16em] text-faint uppercase transition-colors hover:text-fg"
        >
          <Icon
            name="arrow-left"
            size={13}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
          All writing
        </Link>

        <header className="mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2.5 font-mono text-[0.62rem] tracking-[0.14em] text-faint uppercase">
            <span className="rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-accent">
              {post.category}
            </span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>·</span>
            <span>{post.readMinutes} min read</span>
          </div>

          <h1 className="mt-5 text-[clamp(2.1rem,5.2vw,3.6rem)] leading-[1.03] font-medium tracking-[-0.035em]">
            {post.title}
          </h1>
          <p className="mt-5 text-[1rem] leading-relaxed text-muted md:text-[1.08rem]">
            {post.excerpt}
          </p>
        </header>

        <div className="mt-10 overflow-hidden rounded-2xl border border-line">
          <Artwork
            art={post.art}
            idSuffix={`${post.slug}-cover`}
            label={`${post.title} — cover artwork`}
            className="aspect-[16/7] w-full object-cover"
          />
        </div>

        <div className="mx-auto mt-12 max-w-[42rem]">
          {post.blocks.map((block, index) => {
            if (block.type === "h2") {
              return (
                <h2
                  key={index}
                  className="mt-10 mb-4 text-[1.35rem] font-medium tracking-[-0.02em] md:text-[1.5rem]"
                >
                  {block.text}
                </h2>
              );
            }
            if (block.type === "quote") {
              return (
                <blockquote
                  key={index}
                  className="my-8 border-l-2 border-accent/60 pl-5 font-display text-[1.35rem] leading-snug text-fg italic md:text-[1.5rem]"
                >
                  {block.text}
                </blockquote>
              );
            }
            if (block.type === "list") {
              return (
                <ul key={index} className="my-5 space-y-2.5">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[0.95rem] leading-relaxed text-muted"
                    >
                      <span
                        aria-hidden
                        className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-accent"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p
                key={index}
                className="mt-5 text-[0.98rem] leading-[1.8] text-muted md:text-[1.02rem]"
              >
                {block.text}
              </p>
            );
          })}

          <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-6">
            {post.tags.map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 rounded-xl border border-line bg-card p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[0.86rem] font-medium">Written by {site.name}</p>
              <p className="mt-0.5 text-[0.76rem] text-muted">
                {site.title} · {site.location}
              </p>
            </div>
            <Link href="/#contact" className="btn btn-ghost !py-2 !text-[0.78rem]">
              Get in touch
              <Icon name="arrow-up-right" size={13} />
            </Link>
          </div>
        </div>

        <Reveal className="mx-auto mt-14 max-w-[42rem]">
          <Link
            href={`/writing/${next.slug}`}
            className="group flex items-center justify-between gap-4 rounded-xl border border-line p-5 transition-colors hover:border-line-strong hover:bg-card"
          >
            <div>
              <p className="font-mono text-[0.6rem] tracking-[0.16em] text-faint uppercase">
                Read next
              </p>
              <p className="mt-1.5 text-[0.95rem] font-medium">{next.title}</p>
            </div>
            <Icon
              name="arrow-right"
              size={17}
              className="shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </Reveal>
      </div>
    </article>
  );
}
