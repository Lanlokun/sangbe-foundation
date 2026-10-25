
import AnnouncementEditor from "@/components/admin/announcements/AnnouncementEditor";
import { requireCMSUser } from "@/lib/admin/auth";

export default async function NewAnnouncementPage() {
  const user = await requireCMSUser();

  return (
    <AnnouncementEditor
      canPublish={["super_admin", "admin", "editor"].includes(user.role)}
    />
  );
}
