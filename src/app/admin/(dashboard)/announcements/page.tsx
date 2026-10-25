
import Link from "next/link";
import { Plus, Megaphone, Pencil } from "lucide-react";

import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";

export default async function AdminAnnouncementsPage() {
  const user = await requireCMSUser();
  const supabase = await createClient();

  const canPublish = ["super_admin", "admin", "editor"].includes(user.role);

  const { data: announcements, error } = await supabase
    .from("cms_announcements")
    .select("id, title, priority, status, created_by, expires_at, created_at")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#173b29]">
            Announcements
          </h1>
          <p className="mt-2 text-sm text-[#75847a]">
            Manage public notices and Foundation updates.
          </p>
        </div>

        <Link
          href="/admin/announcements/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#178f4c] px-5 py-3 font-semibold text-white"
        >
          <Plus size={18} />
          New Announcement
        </Link>
      </div>

      {error ? (
        <p className="text-sm text-red-600">{error.message}</p>
      ) : !announcements?.length ? (
        <div className="rounded-2xl border border-dashed border-[#dce8df] bg-white p-12 text-center">
          <Megaphone size={32} className="mx-auto text-[#178f4c]" />
          <p className="mt-4 text-sm text-[#75847a]">
            No announcements have been created yet.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-[#e3ebe5] bg-white">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f4f8f5] text-[#55705e]">
                <tr>
                  <th className="px-5 py-4">Title</th>
                  <th className="px-5 py-4">Priority</th>
                  <th className="px-5 py-4">Status</th>
                  <th className="px-5 py-4">Expiry</th>
                  <th className="px-5 py-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((item) => {
                  const canEdit =
                    canPublish ||
                    (item.created_by === user.id && item.status === "draft");

                  return (
                    <tr key={item.id} className="border-t border-[#edf1ed]">
                      <td className="px-5 py-4 font-semibold text-[#173b29]">
                        {item.title}
                      </td>
                      <td className="px-5 py-4 capitalize">{item.priority}</td>
                      <td className="px-5 py-4 capitalize">{item.status}</td>
                      <td className="px-5 py-4">
                        {item.expires_at
                          ? new Date(item.expires_at).toLocaleDateString("en-GB")
                          : "No expiry"}
                      </td>
                      <td className="px-5 py-4">
                        {canEdit && (
                          <Link
                            href={`/admin/announcements/${item.id}/edit`}
                            className="inline-flex items-center gap-2 font-semibold text-[#178f4c]"
                          >
                            <Pencil size={15} />
                            Edit
                          </Link>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
