
import Link from "next/link";
import { Plus } from "lucide-react";
import { redirect } from "next/navigation";

import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";
import ProgramsTable from "@/components/admin/programs/ProgramsTable";
import type { Program } from "@/components/admin/programs/ProgramEditor";

export default async function AdminProgramsPage() {
  const user = await requireCMSUser();

  const canEdit = ["super_admin", "admin", "editor"].includes(
    user.role
  );

  if (!canEdit) {
    redirect("/admin");
  }

  const supabase = await createClient();

  const { data: programs, error } = await supabase
    .from("cms_programs")
    .select(
      "id, title, slug, summary, description, category, cover_image_url, location, start_date, end_date, display_order, status"
    )
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#173b29]">
            Programs
          </h1>
          <p className="mt-2 text-sm text-[#75847a]">
            Manage the Foundation&apos;s programs and initiatives.
          </p>
        </div>

        <Link
          href="/admin/programs/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#178f4c] px-5 py-3 font-semibold text-white"
        >
          <Plus size={18} />
          New Program
        </Link>
      </div>

      {error ? (
        <p role="alert" className="text-sm text-red-600">
          {error.message}
        </p>
      ) : (
        <ProgramsTable
          programs={(programs ?? []) as Program[]}
          canDelete={["super_admin", "admin"].includes(user.role)}
        />
      )}
    </div>
  );
}
