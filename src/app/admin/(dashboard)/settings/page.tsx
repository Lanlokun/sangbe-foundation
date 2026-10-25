
import { redirect } from "next/navigation";
import { Settings } from "lucide-react";

import { requireCMSUser } from "@/lib/admin/auth";
import { getWebsiteSettings } from "@/lib/cms/settings";

import WebsiteSettingsForm from "@/components/admin/settings/WebsiteSettingsForm";

export default async function AdminWebsiteSettingsPage() {
  const user = await requireCMSUser();

  if (!["super_admin", "admin"].includes(user.role)) {
    redirect("/admin");
  }

  const settings = await getWebsiteSettings();

  if (!settings) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-[#173b29]">
          Website Settings
        </h1>

        <p role="alert" className="text-sm text-red-600">
          Unable to load website settings. Confirm that
          the cms_website_settings table and its initial
          record exist in Supabase.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <div className="flex items-center gap-3">
          <Settings size={28} className="text-[#178f4c]" />

          <h1 className="text-3xl font-bold text-[#173b29]">
            Website Settings
          </h1>
        </div>

        <p className="mt-3 text-sm text-[#75847a]">
          Manage the Foundation&apos;s information,
          branding, contact details, and social media links.
        </p>
      </div>

      <WebsiteSettingsForm settings={settings} />
    </div>
  );
}
