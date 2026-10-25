
import { redirect } from "next/navigation";

import ProgramEditor from "@/components/admin/programs/ProgramEditor";
import { requireCMSUser } from "@/lib/admin/auth";

export default async function NewProgramPage() {
  const user = await requireCMSUser();

  if (
    !["super_admin", "admin", "editor"].includes(user.role)
  ) {
    redirect("/admin");
  }

  return <ProgramEditor />;
}
