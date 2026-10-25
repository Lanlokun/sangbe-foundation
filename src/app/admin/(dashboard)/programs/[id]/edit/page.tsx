

import { notFound, redirect } from "next/navigation";

import ProgramEditor from "@/components/admin/programs/ProgramEditor";
import type { Program } from "@/components/admin/programs/ProgramEditor";
import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";

export default async function EditProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireCMSUser();

  if (
    !["super_admin", "admin", "editor"].includes(user.role)
  ) {
    redirect("/admin");
  }

  const { id } = await params;
  const supabase = await createClient();

  const { data: program, error } = await supabase
    .from("cms_programs")
    .select(
      "id, title, slug, summary, description, category, cover_image_url, location, start_date, end_date, display_order, status"
    )
    .eq("id", id)
    .single();

  if (error || !program) {
    notFound();
  }

  return <ProgramEditor program={program as Program} />;
}
