
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarDays,
} from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Articles & News | Sangbe Foundation",
  description:
    "Awareness, education and updates from Sangbe Foundation.",
};

export default async function PublicArticlesPage() {
  const supabase = await createClient();

  const { data: articles, error } = await supabase
    .from("cms_articles")
    .select(
      "id, title, slug, excerpt, category, cover_image_url, published_at"
    )
    .eq("status", "published")
    .order("published_at", { ascending: false });

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f7faf7]">
        {/* Page Header */}
        <section className="bg-[#073b29] px-6 pb-24 pt-52 text-center text-white sm:pt-56">          <p className="text-sm font-semibold uppercase tracking-widest text-[#72dda0]">
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

        {/* Articles Section */}
        <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          {error ? (
            <div className="py-16 text-center">
              <p role="alert" className="text-red-600">
                Articles are temporarily unavailable.
                Please try again later.
              </p>
            </div>
          ) : !articles?.length ? (
            <div className="py-16 text-center">
              <BookOpen
                size={40}
                className="mx-auto text-[#178f4c]"
              />

              <h2 className="mt-5 text-xl font-semibold text-[#173b29]">
                Articles coming soon
              </h2>

              <p className="mt-2 text-[#75847a]">
                Check back for our latest publications.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <article
                  key={article.id}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#e3ebe5] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {/* Cover Image */}
                  <Link
                    href={`/articles/${article.slug}`}
                    className="block overflow-hidden"
                    aria-label={`Read ${article.title}`}
                  >
                    {article.cover_image_url ? (
                      <div className="aspect-[16/10] overflow-hidden bg-[#e8f3eb]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={article.cover_image_url}
                          alt={article.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                  </Link>

                  {/* Article Details */}
                  <div className="flex flex-1 flex-col p-7">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#178f4c]">
                      {article.category}
                    </span>

                    <h2 className="mt-3 text-xl font-bold leading-snug text-[#173b29] transition-colors group-hover:text-[#178f4c]">
                      <Link href={`/articles/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h2>

                    {article.excerpt && (
                      <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#75847a]">
                        {article.excerpt}
                      </p>
                    )}

                    {article.published_at && (
                      <div className="mt-5 flex items-center gap-2 text-xs text-[#829087]">
                        <CalendarDays size={15} />

                        <time dateTime={article.published_at}>
                          {new Date(
                            article.published_at
                          ).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            timeZone: "UTC",
                          })}
                        </time>
                      </div>
                    )}

                    <div className="mt-auto pt-6">
                      <Link
                        href={`/articles/${article.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#178f4c] transition-colors hover:text-[#10733b]"
                      >
                        Read Article

                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
