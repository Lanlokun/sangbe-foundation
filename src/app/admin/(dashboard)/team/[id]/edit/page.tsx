
import { notFound, redirect } from "next/navigation";

import TeamEditor from "@/components/admin/team/TeamEditor";
import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";

export default async function EditTeamMemberPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireCMSUser();

  if (!["super_admin", "admin", "editor"].includes(user.role)) {
    redirect("/admin/team");
  }

  const { id } = await params;
  const supabase = await createClient();

  const { data: member, error } = await supabase
    .from("cms_team_members")
    .select(
      "id, full_name, position, biography, photo_url, email, linkedin_url, facebook_url, display_order, status"
    )
    .eq("id", id)
    .single();

  if (error || !member) notFound();

  return (
    <TeamEditor
      member={member as React.ComponentProps<typeof TeamEditor>["member"]}
    />
  );
}
