
import MediaUploader from "@/components/admin/gallery/MediaUploader";
import MediaGrid from "@/components/admin/gallery/MediaGrid";

import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";

export default async function AdminGalleryPage() {
  const user = await requireCMSUser();
  const supabase = await createClient();

  const canPublish = [
    "super_admin",
    "admin",
    "editor",
  ].includes(user.role);

  const canDelete = [
    "super_admin",
    "admin",
  ].includes(user.role);

  const { data: items, error } = await supabase
    .from("cms_media")
    .select(
      "id, title, description, category, image_url, status"
    )
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#173b29]">
          Gallery & Media
        </h1>

        <p className="mt-2 text-sm text-[#75847a]">
          Upload, edit and organize Foundation photographs.
        </p>
      </div>

      <div className="grid gap-8 xl:grid-cols-[380px_1fr]">
        <MediaUploader canPublish={canPublish} />

        <div>
          <h2 className="mb-5 text-xl font-bold text-[#173b29]">
            Media Library
          </h2>

          {error ? (
            <p className="text-sm text-red-600">
              Unable to load media: {error.message}
            </p>
          ) : (
            <MediaGrid
              items={items ?? []}
              canPublish={canPublish}
              canDelete={canDelete}
              currentUserId={user.id}
            />
          )}
        </div>
      </div>
    </div>
  );
}
