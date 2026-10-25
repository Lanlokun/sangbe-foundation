
import Link from "next/link";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";

import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";
import PagesTable from "@/components/admin/pages/PagesTable";
import type { CMSPage } from "@/components/admin/pages/PageEditor";

export default async function AdminPagesPage() {
  const user = await requireCMSUser();

  if (!["super_admin", "admin", "editor"].includes(user.role)) {
    redirect("/admin");
  }

  const supabase = await createClient();

  const { data: pages, error } = await supabase
    .from("cms_pages")
    .select(
      "id, title, slug, excerpt, content, cover_image_url, seo_title, seo_description, display_order, status"
    )
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#173b29]">
            Pages
          </h1>
          <p className="mt-2 text-sm text-[#75847a]">
            Create and manage informational website pages.
          </p>
        </div>

        <Link
          href="/admin/pages/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#178f4c] px-5 py-3 font-semibold text-white"
        >
          <Plus size={18} />
          New Page
        </Link>
      </div>

      {error ? (
        <p role="alert" className="text-sm text-red-600">
          {error.message}
        </p>
      ) : (
        <PagesTable
          pages={(pages ?? []) as CMSPage[]}
          canDelete={["super_admin", "admin"].includes(user.role)}
        />
      )}
    </div>
  );
}
