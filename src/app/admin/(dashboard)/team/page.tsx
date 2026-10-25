
import Link from "next/link";
import { Plus } from "lucide-react";

import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";
import TeamTable from "@/components/admin/team/TeamTable";

export default async function AdminTeamPage() {
  const user = await requireCMSUser();
  const supabase = await createClient();

  const canManage = ["super_admin", "admin", "editor"].includes(user.role);
  const canDelete = ["super_admin", "admin"].includes(user.role);

  const { data: members, error } = await supabase
    .from("cms_team_members")
    .select(
      "id, full_name, position, biography, photo_url, email, linkedin_url, facebook_url, display_order, status"
    )
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: true });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#173b29]">
            Team Members
          </h1>
          <p className="mt-2 text-sm text-[#75847a]">
            Manage Foundation leadership, staff and volunteers.
          </p>
        </div>

        {canManage && (
          <Link
            href="/admin/team/new"
            className="inline-flex items-center gap-2 rounded-xl bg-[#178f4c] px-5 py-3 font-semibold text-white"
          >
            <Plus size={18} />
            Add Team Member
          </Link>
        )}
      </div>

      {error ? (
        <p className="text-sm text-red-600">{error.message}</p>
      ) : (
        <TeamTable
          members={(members ?? []) as React.ComponentProps<typeof TeamTable>["members"]}
          canDelete={canDelete}
        />
      )}
    </div>
  );
}
