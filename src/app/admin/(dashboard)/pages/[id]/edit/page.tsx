
import { notFound, redirect } from "next/navigation";

import PageEditor from "@/components/admin/pages/PageEditor";
import type { CMSPage } from "@/components/admin/pages/PageEditor";
import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";

export default async function EditCMSPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireCMSUser();

  if (!["super_admin", "admin", "editor"].includes(user.role)) {
    redirect("/admin");
  }

  const { id } = await params;
  const supabase = await createClient();

  const { data: page, error } = await supabase
    .from("cms_pages")
    .select(
      "id, title, slug, excerpt, content, cover_image_url, seo_title, seo_description, display_order, status"
    )
    .eq("id", id)
    .single();

  if (error || !page) notFound();

  return <PageEditor page={page as CMSPage} />;
}
