import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import PostCover from "@/components/PostCover";
import { DispatchForm, QuoteForm } from "@/components/forms";
import { IconArrow, IconCheck } from "@/components/icons";
import { formatDate, getPost, posts } from "@/lib/posts";
import { site } from "@/lib/site";
import { breadcrumbSchema } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

// Pre-render every article at build time
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { type: "article", title: post.title, description: post.description, publishedTime: post.date },
  };
}

export default async function ArticlePage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    image: `${site.url}/images/og-share.jpg`,
    keywords: post.keyword,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@id": `${site.url}/#business` },
    mainEntityOfPage: `${site.url}/blog/${post.slug}`,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${post.slug}` }])} />

      <header className="relative overflow-hidden bg-white text-ink">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-red/10 blur-[120px]" />
        <div className="container-x relative max-w-4xl py-16 sm:py-20">
          <nav className="text-sm text-steel" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-red">Home</Link> / <Link href="/blog" className="hover:text-red">Blog</Link>
          </nav>
          <p className="eyebrow mt-6 text-red">{post.category}</p>
          <h1 className="mt-4 text-4xl font-bold uppercase leading-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-6 text-sm text-steel">{formatDate(post.date)} · {post.readMins} min read · {site.name}</p>
        </div>
        <div className="relative h-1.5 bg-red-gradient" />
      </header>

      <div className="container-x grid max-w-6xl gap-12 py-16 lg:grid-cols-3">
        <article className="lg:col-span-2">
          <div className="mb-10 aspect-[21/9] overflow-hidden rounded-2xl"><PostCover post={post} large /></div>
          <p className="text-xl leading-relaxed text-graphite">{post.intro}</p>
          {post.sections.map((s) => (
            <section key={s.heading} className="mt-10">
              <h2 className="text-3xl font-bold uppercase">{s.heading}</h2>
              {s.paragraphs.map((p, i) => (
                <p key={i} className="mt-4 text-lg leading-relaxed text-steel">{p}</p>
              ))}
              {s.list && (
                <ul className="mt-5 space-y-3">
                  {s.list.map((li) => (
                    <li key={li} className="flex gap-3 text-lg text-graphite">
                      <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-gradient text-white"><IconCheck className="h-3.5 w-3.5" /></span>
                      {li}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          <div className="mt-12 rounded-2xl bg-fog p-8">
            <p className="font-display text-2xl font-bold uppercase">{post.cta === "dispatch" ? "Want a dispatcher who drives the same lanes?" : "Have freight that needs to move?"}</p>
            <p className="mt-2 text-steel">Call dispatch 24/7 at <a href={site.phoneHref} className="font-semibold text-red">{site.phone}</a> or use the form.</p>
          </div>
        </article>

        {/* Sticky lead form beside the article */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          {post.cta === "dispatch" ? <div className="rounded-2xl bg-red-gradient p-2 shadow-xl shadow-red/20"><DispatchForm /></div> : <QuoteForm title="Get a freight quote" />}
        </aside>
      </div>

      {/* Related articles */}
      <section className="bg-fog py-16">
        <div className="container-x max-w-6xl">
          <h2 className="text-3xl font-bold uppercase">Keep reading</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {related.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="group overflow-hidden rounded-2xl border border-line bg-white transition hover:shadow-xl">
                <div className="aspect-[16/9]"><PostCover post={p} /></div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-semibold uppercase leading-snug">{p.title}</h3>
                  <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-red">Read <IconArrow className="h-4 w-4" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
