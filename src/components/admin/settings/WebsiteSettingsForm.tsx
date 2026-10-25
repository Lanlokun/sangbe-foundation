
"use client";

import { useActionState, useState } from "react";
import {
  Save,
  Building2,
  Mail,
  MapPin,
  Share2,
  Image as ImageIcon,
  FileText,
} from "lucide-react";

import ImageUploader from "@/components/admin/shared/ImageUploader";

import type { WebsiteSettings } from "@/lib/cms/settings";

import {
  updateWebsiteSettings,
  type SettingsActionState,
} from "@/app/admin/(dashboard)/settings/actions";

const initialState: SettingsActionState = {
  error: null,
  success: null,
};

const inputClass =
  "w-full rounded-xl border border-[#dce8df] bg-white px-4 py-3 text-sm outline-none focus:border-[#178f4c]";

function Field({
  label,
  name,
  value,
  type = "text",
  placeholder,
  required = false,
}: {
  label: string;
  name: string;
  value: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-[#173b29]"
      >
        {label}
      </label>

      <input
        id={name}
        name={name}
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        required={required}
        className={inputClass}
      />
    </div>
  );
}

function SectionHeading({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Building2;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <div className="rounded-xl bg-[#edf4ef] p-3 text-[#178f4c]">
        <Icon size={21} />
      </div>

      <div>
        <h2 className="text-lg font-bold text-[#173b29]">
          {title}
        </h2>

        <p className="mt-1 text-sm text-[#75847a]">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function WebsiteSettingsForm({
  settings,
}: {
  settings: WebsiteSettings;
}) {
  const [state, action, pending] = useActionState(
    updateWebsiteSettings,
    initialState
  );

  const [logoUrl, setLogoUrl] = useState(
    settings.logo_url ?? ""
  );

  const [faviconUrl, setFaviconUrl] = useState(
    settings.favicon_url ?? ""
  );

  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] =
    useState(false);

  return (
    <form action={action} className="space-y-6">
      {/* General information */}
      <section className="rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm sm:p-8">
        <SectionHeading
          icon={Building2}
          title="General Information"
          description="The Foundation's name, tagline and description."
        />

        <div className="space-y-5">
          <Field
            label="Foundation Name"
            name="foundation_name"
            value={settings.foundation_name}
            required
          />

          <Field
            label="Tagline"
            name="tagline"
            value={settings.tagline}
            placeholder="A short statement about the Foundation"
          />

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-[#173b29]"
            >
              Foundation Description
            </label>

            <textarea
              id="description"
              name="description"
              rows={5}
              defaultValue={settings.description}
              className={inputClass}
            />
          </div>
        </div>
      </section>

      {/* Branding */}
      <section className="rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm sm:p-8">
        <SectionHeading
          icon={ImageIcon}
          title="Website Branding"
          description="Upload the Foundation's logo and favicon."
        />

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <ImageUploader
              value={logoUrl}
              onChange={setLogoUrl}
              onUploadingChange={setUploadingLogo}
              folder="branding"
              label="Foundation Logo"
            />

            <input
              type="hidden"
              name="logo_url"
              value={logoUrl}
            />
          </div>

          <div>
            <ImageUploader
              value={faviconUrl}
              onChange={setFaviconUrl}
              onUploadingChange={setUploadingFavicon}
              folder="branding"
              label="Website Favicon"
            />

            <input
              type="hidden"
              name="favicon_url"
              value={faviconUrl}
            />
          </div>
        </div>
      </section>

      {/* Contact information */}
      <section className="rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm sm:p-8">
        <SectionHeading
          icon={Mail}
          title="Contact Information"
          description="Public contact details for the Foundation."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Contact Email"
            name="contact_email"
            type="email"
            value={settings.contact_email}
          />

          <Field
            label="Contact Phone"
            name="contact_phone"
            value={settings.contact_phone}
          />

          <Field
            label="WhatsApp Number"
            name="whatsapp_number"
            value={settings.whatsapp_number}
            placeholder="+220..."
          />
        </div>
      </section>

      {/* Location */}
      <section className="rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm sm:p-8">
        <SectionHeading
          icon={MapPin}
          title="Location"
          description="The Foundation's address and location."
        />

        <div className="space-y-5">
          <Field
            label="Address"
            name="address"
            value={settings.address}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="City"
              name="city"
              value={settings.city}
            />

            <Field
              label="Country"
              name="country"
              value={settings.country}
            />
          </div>
        </div>
      </section>

      {/* Social media */}
      <section className="rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm sm:p-8">
        <SectionHeading
          icon={Share2}
          title="Social Media"
          description="Links to the Foundation's official social media accounts."
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {[
            ["Facebook", "facebook_url"],
            ["Instagram", "instagram_url"],
            ["LinkedIn", "linkedin_url"],
            ["YouTube", "youtube_url"],
            ["TikTok", "tiktok_url"],
            ["X / Twitter", "x_url"],
          ].map(([label, name]) => (
            <Field
              key={name}
              label={label}
              name={name}
              type="url"
              value={
                settings[
                  name as keyof WebsiteSettings
                ] as string
              }
              placeholder="https://..."
            />
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className="rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm sm:p-8">
        <SectionHeading
          icon={FileText}
          title="Footer Settings"
          description="Text displayed in the website footer."
        />

        <div className="space-y-5">
          <div>
            <label
              htmlFor="footer_description"
              className="mb-2 block text-sm font-semibold text-[#173b29]"
            >
              Footer Description
            </label>

            <textarea
              id="footer_description"
              name="footer_description"
              rows={4}
              defaultValue={settings.footer_description}
              className={inputClass}
            />
          </div>

          <Field
            label="Copyright Text"
            name="copyright_text"
            value={settings.copyright_text}
            placeholder="Sangbe Foundation. All rights reserved."
          />
        </div>
      </section>

      {/* Save */}
      <div className="sticky bottom-4 rounded-2xl border border-[#e3ebe5] bg-white/95 p-4 shadow-lg backdrop-blur">
        {state.error && (
          <p role="alert" className="mb-3 text-sm text-red-600">
            {state.error}
          </p>
        )}

        {state.success && (
          <p role="status" className="mb-3 text-sm text-green-700">
            {state.success}
          </p>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={
              pending ||
              uploadingLogo ||
              uploadingFavicon
            }
            className="inline-flex items-center gap-2 rounded-xl bg-[#178f4c] px-6 py-3 font-semibold text-white disabled:opacity-50"
          >
            <Save size={18} />
            {pending ? "Saving..." : "Save Website Settings"}
          </button>
        </div>
      </div>
    </form>
  );
}
