
import { redirect } from "next/navigation";
import TeamEditor from "@/components/admin/team/TeamEditor";
import { requireCMSUser } from "@/lib/admin/auth";

export default async function NewTeamMemberPage() {
  const user = await requireCMSUser();

  if (!["super_admin", "admin", "editor"].includes(user.role)) {
    redirect("/admin/team");
  }

  return <TeamEditor />;
}
