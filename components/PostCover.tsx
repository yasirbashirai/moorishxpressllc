import type { Post } from "@/lib/posts";

/**
 * Branded typographic cover for blog posts. Keeps every article visually
 * distinct without reusing the same truck photos across the site.
 */
export default function PostCover({ post, large = false }: { post: Post; large?: boolean }) {
  const dispatch = post.category === "Owner-Operators";
  return (
    <div className={`relative h-full w-full overflow-hidden ${dispatch ? "bg-gold-gradient" : "bg-ink-gradient"}`}>
      <div className={`absolute inset-0 ${dispatch ? "opacity-0" : "bg-grid opacity-50"}`} />
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-red/40 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-2 w-full bg-hazard opacity-80" />
      <div className={`relative flex h-full flex-col justify-between ${large ? "p-10" : "p-6"}`}>
        <span className={`eyebrow w-fit rounded px-2.5 py-1 ${dispatch ? "bg-ink text-gold" : "bg-red text-white"}`}>{post.category}</span>
        <p className={`font-display font-bold uppercase leading-[1.05] ${large ? "text-4xl sm:text-5xl" : "text-2xl"} ${dispatch ? "text-ink" : "text-white"}`}>
          {post.keyword}
        </p>
      </div>
    </div>
  );
}
