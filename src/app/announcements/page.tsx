
import type { Metadata } from "next";
import { Megaphone, CalendarDays } from "lucide-react";

import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Announcements | Sangbe Foundation",
  description:
    "Read the latest announcements, notices and community updates from Sangbe Foundation.",
};

const priorityStyles: Record<string, string> = {
  normal: "bg-[#edf4ef] text-[#178f4c]",
  important: "bg-amber-50 text-amber-700",
  urgent: "bg-red-50 text-red-700",
};

export default async function AnnouncementsPage() {
  const supabase = await createClient();

  const { data: announcements, error } = await supabase
    .from("cms_announcements")
    .select("id, title, message, priority, published_at")
    .eq("status", "published")
    .or(`expires_at.is.null,expires_at.gt.${new Date().toISOString()}`)
    .order("published_at", { ascending: false });

  return (
    <main className="min-h-screen bg-[#f7faf7]">
      <div className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-12">
          <p className="text-sm font-bold uppercase tracking-widest text-[#178f4c]">
            Stay Informed
          </p>
          <h1 className="mt-4 text-4xl font-bold text-[#173b29]">
            Announcements
          </h1>
          <p className="mt-5 text-[#55705e]">
            Important updates, notices and information from the Foundation.
          </p>
        </div>

        {error ? (
          <p className="text-red-600">Unable to load announcements.</p>
        ) : !announcements?.length ? (
          <div className="rounded-2xl bg-white p-12 text-center">
            <Megaphone size={34} className="mx-auto text-[#178f4c]" />
            <p className="mt-4 text-[#75847a]">
              No announcements are available at the moment.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {announcements.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-[#e3ebe5] bg-white p-7 shadow-sm"
              >
                <div className="mb-4 flex flex-wrap items-center gap-3">
                  <span className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
                    priorityStyles[item.priority] ?? priorityStyles.normal
                  }`}>
                    {item.priority}
                  </span>

                  {item.published_at && (
                    <span className="inline-flex items-center gap-2 text-xs text-[#829087]">
                      <CalendarDays size={14} />
                      {new Date(item.published_at).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold text-[#173b29]">
                  {item.title}
                </h2>

                <p className="mt-4 whitespace-pre-line leading-8 text-[#55705e]">
                  {item.message}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
