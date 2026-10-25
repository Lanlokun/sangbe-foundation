
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";

import { createClient } from "@/lib/supabase/server";

type RichMark = {
  type: string;
  attrs?: {
    href?: string;
    target?: string;
  };
};

type RichNode = {
  type?: string;
  text?: string;
  attrs?: {
    level?: number;
    start?: number;
    href?: string;
  };
  marks?: RichMark[];
  content?: RichNode[];
};

type ArticleRecord = {
  title: string;
  slug: string;
  excerpt: string | null;
  category: string;
  content: RichNode | null;
  cover_image_url: string | null;
  published_at: string | null;
};

function renderText(node: RichNode) {
  let content: React.ReactNode = node.text ?? "";

  for (const mark of node.marks ?? []) {
    switch (mark.type) {
      case "bold":
        content = <strong>{content}</strong>;
        break;

      case "italic":
        content = <em>{content}</em>;
        break;

      case "strike":
        content = <s>{content}</s>;
        break;

      case "code":
        content = (
          <code className="rounded bg-[#edf4ef] px-1.5 py-0.5 font-mono text-sm">
            {content}
          </code>
        );
        break;

      case "underline":
        content = <u>{content}</u>;
        break;

      case "link": {
        const href = mark.attrs?.href;

        if (
          href &&
          /^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(href)
        ) {
          content = (
            <a
              href={href}
              target={
                /^https?:\/\//i.test(href)
                  ? "_blank"
                  : undefined
              }
              rel={
                /^https?:\/\//i.test(href)
                  ? "noopener noreferrer"
                  : undefined
              }
              className="font-medium text-[#178f4c] underline underline-offset-4 hover:text-[#10733b]"
            >
              {content}
            </a>
          );
        }

        break;
      }
    }
  }

  return content;
}

function RichContent({ node }: { node: RichNode }) {
  const children = node.content?.map((child, index) => (
    <RichContent key={index} node={child} />
  ));

  switch (node.type) {
    case "doc":
      return <>{children}</>;

    case "heading": {
      const level = node.attrs?.level ?? 2;

      if (level === 1) {
        return (
          <h2 className="mb-5 mt-10 text-3xl font-bold leading-tight text-[#173b29]">
            {children}
          </h2>
        );
      }

      if (level === 3) {
        return (
          <h3 className="mb-3 mt-7 text-xl font-bold text-[#173b29]">
            {children}
          </h3>
        );
      }

      return (
        <h2 className="mb-4 mt-9 text-2xl font-bold text-[#173b29]">
          {children}
        </h2>
      );
    }

    case "paragraph":
      return (
        <p className="mb-5 leading-8">
          {children}
        </p>
      );

    case "bulletList":
      return (
        <ul className="mb-6 list-disc space-y-2 pl-7 marker:text-[#178f4c]">
          {children}
        </ul>
      );

    case "orderedList":
      return (
        <ol
          start={node.attrs?.start ?? 1}
          className="mb-6 list-decimal space-y-2 pl-7 marker:font-semibold marker:text-[#178f4c]"
        >
          {children}
        </ol>
      );

    case "listItem":
      return (
        <li className="pl-1 leading-8">
          {children}
        </li>
      );

    case "blockquote":
      return (
        <blockquote className="my-8 border-l-4 border-[#178f4c] bg-[#f0f8f2] px-6 py-5 italic text-[#55705e]">
          {children}
        </blockquote>
      );

    case "horizontalRule":
      return (
        <hr className="my-10 border-[#dce8df]" />
      );

    case "hardBreak":
      return <br />;

    case "codeBlock":
      return (
        <pre className="my-6 overflow-x-auto rounded-xl bg-[#173b29] p-5 text-sm leading-7 text-white">
          <code>{node.content?.map((child) => child.text ?? "").join("")}</code>
        </pre>
      );

    case "text":
      return <>{renderText(node)}</>;

    default:
      return <>{children}</>;
  }
}

async function getPublishedArticle(
  slug: string
): Promise<ArticleRecord | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cms_articles")
    .select(
      "title, slug, excerpt, category, content, cover_image_url, published_at"
    )
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) {
    return null;
  }

  return data as ArticleRecord;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);

  if (!article) {
    return {
      title: "Article Not Found | Sangbe Foundation",
    };
  }

  return {
    title: `${article.title} | Sangbe Foundation`,
    description:
      article.excerpt ||
      `Read ${article.title} on the Sangbe Foundation website.`,
    openGraph: {
      title: article.title,
      description: article.excerpt || undefined,
      type: "article",
      publishedTime: article.published_at || undefined,
      images: article.cover_image_url
        ? [
            {
              url: article.cover_image_url,
              alt: article.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getPublishedArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7faf7]">
      <article className="mx-auto max-w-4xl px-5 py-16 sm:px-6 sm:py-20">
        {/* Back navigation */}
        <Link
          href="/articles"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#178f4c] transition hover:text-[#10733b]"
        >
          <ArrowLeft size={17} />
          All Articles
        </Link>

        {/* Article header */}
        <header className="mt-10">
          <span className="inline-flex rounded-full bg-[#e2f3e7] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[#178f4c]">
            {article.category}
          </span>

          <h1 className="mt-5 text-3xl font-bold leading-tight tracking-tight text-[#173b29] sm:text-4xl md:text-5xl">
            {article.title}
          </h1>

          {article.published_at && (
            <div className="mt-6 flex items-center gap-2 text-sm text-[#829087]">
              <CalendarDays size={16} />

              <time dateTime={article.published_at}>
                Published{" "}
                {new Date(
                  article.published_at
                ).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </div>
          )}

          {article.excerpt && (
            <p className="mt-7 max-w-3xl text-lg leading-8 text-[#55705e] sm:text-xl">
              {article.excerpt}
            </p>
          )}
        </header>

        {/* Cover image */}
        {article.cover_image_url && (
          <figure className="mt-10 overflow-hidden rounded-2xl bg-[#edf4ef]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={article.cover_image_url}
              alt={article.title}
              className="max-h-[540px] w-full object-cover"
            />
          </figure>
        )}

        {/* Article content */}
        <div className="mt-12 border-t border-[#dce8df] pt-10 text-base text-[#34483b] sm:text-lg">
          {article.content ? (
            <RichContent node={article.content} />
          ) : (
            <p className="text-[#829087]">
              No article content is available.
            </p>
          )}
        </div>

        {/* Footer navigation */}
        <footer className="mt-16 border-t border-[#dce8df] pt-8">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#178f4c] transition hover:text-[#10733b]"
          >
            <ArrowLeft size={17} />
            Back to All Articles
          </Link>
        </footer>
      </article>
    </main>
  );
}
