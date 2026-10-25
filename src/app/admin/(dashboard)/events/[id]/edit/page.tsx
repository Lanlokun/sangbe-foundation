
import { notFound } from "next/navigation";
import EventEditor from "@/components/admin/events/EventEditor";
import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";

export default async function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireCMSUser();
  const { id } = await params;

  const supabase = await createClient();

  const { data: event, error } = await supabase
    .from("cms_events")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !event) notFound();

  const canPublish = ["super_admin", "admin", "editor"].includes(
    user.role
  );

  if (
    !canPublish &&
    (event.created_by !== user.id || event.status !== "draft")
  ) {
    notFound();
  }

  return (
    <EventEditor
      event={event}
      canPublish={canPublish}
    />
  );
}
