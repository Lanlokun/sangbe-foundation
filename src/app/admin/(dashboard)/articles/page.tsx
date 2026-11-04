
import Link from "next/link";
import {
  Plus,
  Pencil,
  BookOpen,
} from "lucide-react";

import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";
import DeleteArticleButton from "@/components/admin/articles/DeleteArticleButton";

import type { Article } from "@/types/cms";

export default async function ArticlesPage() {
  const user = await requireCMSUser();

  const canDelete = ["super_admin", "admin"].includes(
    user.role
  );

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cms_articles")
    .select(
      "id, title, slug, category, status, updated_at"
    )
    .order("updated_at", { ascending: false });

  if (error) {
    return (
      <p role="alert" className="text-red-600">
        Unable to load articles: {error.message}
      </p>
    );
  }

  const articles = (data ?? []) as Pick<
    Article,
    | "id"
    | "title"
    | "slug"
    | "category"
    | "status"
    | "updated_at"
  >[];

  return (
    <div className="space-y-7">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#173b29]">
            Articles & News
          </h1>

          <p className="mt-2 text-sm text-[#75847a]">
            Manage Foundation publications and awareness content.
          </p>
        </div>

        <Link
          href="/admin/articles/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#178f4c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10743c]"
        >
          <Plus size={18} />
          New Article
        </Link>
      </div>

      {/* Articles List */}
      <div className="overflow-hidden rounded-2xl border border-[#e3ebe5] bg-white shadow-sm">
        {articles.length === 0 ? (
          <div className="flex flex-col items-center px-6 py-20 text-center">
            <BookOpen
              size={36}
              className="text-[#91b9a0]"
            />

            <h2 className="mt-4 text-lg font-bold text-[#173b29]">
              No articles yet
            </h2>

            <p className="mt-2 text-sm text-[#75847a]">
              Create your first article to get started.
            </p>

            <Link
              href="/admin/articles/new"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#178f4c] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#10743c]"
            >
              <Plus size={17} />
              Create Article
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[#edf1ed]">
            {articles.map((article) => (
              <div
                key={article.id}
                className="flex flex-wrap items-center justify-between gap-4 p-5 transition hover:bg-[#f9fbf9]"
              >
                {/* Article Information */}
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-[#173b29]">
                    {article.title}
                  </h2>

                  <p className="mt-1 text-xs text-[#829087]">
                    {article.category} · Updated{" "}
                    {new Date(
                      article.updated_at
                    ).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* Status and Actions */}
                <div className="flex flex-wrap items-center gap-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      article.status === "published"
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {article.status === "published"
                      ? "Published"
                      : "Draft"}
                  </span>

                  <Link
                    href={`/admin/articles/${article.id}/edit`}
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#178f4c] transition hover:bg-green-50"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>

                  {/* Admin-only Delete */}
                  {canDelete && (
                    <DeleteArticleButton
                      id={article.id}
                      title={article.title}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
