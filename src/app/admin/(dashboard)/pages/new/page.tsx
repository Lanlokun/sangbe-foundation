
import { redirect } from "next/navigation";

import PageEditor from "@/components/admin/pages/PageEditor";
import { requireCMSUser } from "@/lib/admin/auth";

export default async function NewCMSPage() {
  const user = await requireCMSUser();

  if (!["super_admin", "admin", "editor"].includes(user.role)) {
    redirect("/admin");
  }

  return <PageEditor />;
}
