
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getPublishedPage(slug: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cms_pages")
    .select(
      "id, title, slug, excerpt, content, cover_image_url, seo_title, seo_description"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (error) {
    console.error("Failed to load CMS page:", error.message);
    return null;
  }

  return data;
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPublishedPage(slug);

  if (!page) {
    return { title: "Page Not Found | Sangbe Foundation" };
  }

  return {
    title: `${page.seo_title || page.title} | Sangbe Foundation`,
    description:
      page.seo_description || page.excerpt || undefined,
  };
}

export default async function PublicCMSPage({ params }: Props) {
  const { slug } = await params;
  const page = await getPublishedPage(slug);

  if (!page) notFound();

  return (
    <main className="min-h-screen bg-[#f7faf7]">
      <article className="mx-auto max-w-5xl px-6 py-20">
        <header className="mb-10">
          <p className="text-sm font-bold uppercase tracking-widest text-[#178f4c]">
            Sangbe Foundation
          </p>

          <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#173b29] sm:text-5xl">
            {page.title}
          </h1>

          {page.excerpt && (
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#55705e]">
              {page.excerpt}
            </p>
          )}
        </header>

        {page.cover_image_url && (
          <div className="mb-10 overflow-hidden rounded-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={page.cover_image_url}
              alt={page.title}
              className="max-h-[480px] w-full object-cover"
            />
          </div>
        )}

        <div className="rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm sm:p-10">
          <div className="whitespace-pre-wrap break-words text-base leading-9 text-[#34483b]">
            {page.content}
          </div>
        </div>
      </article>
    </main>
  );
}
