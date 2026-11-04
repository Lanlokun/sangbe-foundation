
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function LatestArticles() {
  const supabase = await createClient();

  const { data: articles, error } = await supabase
    .from("cms_articles")
    .select(
      "id, title, slug, excerpt, category, cover_image_url, published_at"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(3);

  if (error) {
    console.error("Latest articles:", error.message);
    return null;
  }

  if (!articles?.length) return null;

  return (
    <section className="bg-[#f7faf7] px-6 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#178f4c]">
              Knowledge & Awareness
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#173b29] sm:text-4xl">
              Latest News & Stories
            </h2>

            <p className="mt-4 max-w-xl text-[#75847a]">
              Discover our latest stories, community
              initiatives, and educational resources.
            </p>
          </div>

          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#178f4c] hover:text-[#10733b]"
          >
            View All Articles
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              className="group overflow-hidden rounded-2xl border border-[#e3ebe5] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              {article.cover_image_url ? (
                <div className="aspect-[16/10] overflow-hidden bg-[#e8f3eb]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={article.cover_image_url}
                    alt={article.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center bg-[#e8f3eb]">
                  <BookOpen
                    size={42}
                    className="text-[#178f4c]/40"
                  />
                </div>
              )}

              <div className="p-7">
                <span className="text-xs font-bold uppercase tracking-wider text-[#178f4c]">
                  {article.category}
                </span>

                <h3 className="mt-3 text-xl font-bold leading-snug text-[#173b29]">
                  <Link href={`/articles/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                {article.excerpt && (
                  <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#75847a]">
                    {article.excerpt}
                  </p>
                )}

                {article.published_at && (
                  <p className="mt-4 text-xs text-[#829087]">
                    {new Date(
                      article.published_at
                    ).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      timeZone: "UTC",
                    })}
                  </p>
                )}

                <Link
                  href={`/articles/${article.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#178f4c] hover:text-[#10733b]"
                >
                  Read Article
                  <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
