
import EventEditor from "@/components/admin/events/EventEditor";
import { requireCMSUser } from "@/lib/admin/auth";

export default async function NewEventPage() {
  const user = await requireCMSUser();

  const canPublish = ["super_admin", "admin", "editor"].includes(
    user.role
  );

  return <EventEditor canPublish={canPublish} />;
}
