
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Articles & News | Sangbe Foundation",
  description: "Awareness, education and updates from Sangbe Foundation.",
};

export default async function PublicArticlesPage() {
  const supabase = await createClient();

  const { data: articles, error } = await supabase
    .from("cms_articles")
    .select("id, title, slug, excerpt, category, published_at")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#f7faf7]">
      <section className="bg-[#073b29] px-6 py-24 text-center text-white">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#72dda0]">
          Knowledge & Awareness
        </p>
        <h1 className="mt-4 text-4xl font-bold sm:text-5xl">
          Articles & News
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-white/70">
          Stories, educational resources and updates supporting
          healthier, stronger communities.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        {error ? (
          <p role="alert" className="text-red-600">
            Articles are temporarily unavailable.
          </p>
        ) : !articles?.length ? (
          <div className="py-16 text-center">
            <BookOpen size={36} className="mx-auto text-[#178f4c]" />
            <h2 className="mt-5 text-xl font-semibold text-[#173b29]">
              Articles coming soon
            </h2>
            <p className="mt-2 text-[#75847a]">
              Check back for our latest publications.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <article
                key={article.id}
                className="rounded-2xl border border-[#e3ebe5] bg-white p-7 shadow-sm"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-[#178f4c]">
                  {article.category}
                </span>
                <h2 className="mt-4 text-xl font-bold text-[#173b29]">
                  {article.title}
                </h2>
                <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#75847a]">
                  {article.excerpt}
                </p>
                <Link
                  href={`/articles/${article.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#178f4c]"
                >
                  Read Article <ArrowRight size={16} />
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
