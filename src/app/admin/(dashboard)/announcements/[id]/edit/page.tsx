
import { notFound, redirect } from "next/navigation";

import AnnouncementEditor from "@/components/admin/announcements/AnnouncementEditor";
import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";

export default async function EditAnnouncementPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireCMSUser();
  const { id } = await params;

  const supabase = await createClient();

  const { data: announcement, error } = await supabase
    .from("cms_announcements")
    .select("id, title, message, priority, status, expires_at, created_by")
    .eq("id", id)
    .single();

  if (error || !announcement) notFound();

  const canPublish = ["super_admin", "admin", "editor"].includes(user.role);

  if (
    !canPublish &&
    (announcement.created_by !== user.id || announcement.status !== "draft")
  ) {
    redirect("/admin/announcements");
  }

  return (
    <AnnouncementEditor
      announcement={announcement}
      canPublish={canPublish}
    />
  );
}
