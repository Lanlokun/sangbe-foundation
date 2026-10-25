
import { notFound } from "next/navigation";
import ArticleEditor from "@/components/admin/articles/ArticleEditor";
import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";
import type { Article } from "@/types/cms";

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireCMSUser();
  const { id } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cms_articles")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) notFound();

  const article = data as Article;
  const canPublish = ["super_admin", "admin", "editor"].includes(
    user.role
  );

  if (
    !canPublish &&
    (article.author_id !== user.id || article.status !== "draft")
  ) {
    notFound();
  }

  return (
    <ArticleEditor article={article} canPublish={canPublish} />
  );
}
