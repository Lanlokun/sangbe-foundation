
import type { ReactNode } from "react";
import { requireCMSUser } from "@/lib/admin/auth";
import AdminShell from "@/components/admin/layout/AdminShell";
import { Analytics } from "@vercel/analytics/next";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireCMSUser();

  return (
    <AdminShell
      name={user.full_name || "Administrator"}
      role={user.role}
    >
      {children}
    </AdminShell>
  );
}
