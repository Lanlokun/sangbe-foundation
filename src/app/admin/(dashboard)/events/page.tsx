
import Link from "next/link";
import { CalendarDays, Pencil, Plus } from "lucide-react";
import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";

export default async function EventsPage() {
  await requireCMSUser();

  const supabase = await createClient();

  const { data: events, error } = await supabase
    .from("cms_events")
    .select("id, title, location, start_date, status")
    .order("start_date", { ascending: false });

  return (
    <div className="space-y-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#173b29]">
            Events Management
          </h1>
          <p className="mt-2 text-sm text-[#75847a]">
            Create and manage Foundation events.
          </p>
        </div>

        <Link
          href="/admin/events/new"
          className="inline-flex items-center gap-2 rounded-xl bg-[#178f4c] px-5 py-3 text-sm font-semibold text-white"
        >
          <Plus size={18} />
          New Event
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#e3ebe5] bg-white shadow-sm">
        {error ? (
          <p role="alert" className="p-8 text-red-600">
            Unable to load events: {error.message}
          </p>
        ) : !events?.length ? (
          <div className="py-20 text-center">
            <CalendarDays
              size={36}
              className="mx-auto text-[#91b9a0]"
            />
            <h2 className="mt-4 text-lg font-bold text-[#173b29]">
              No CMS events yet
            </h2>
            <p className="mt-2 text-sm text-[#75847a]">
              Existing website events remain unchanged.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#edf1ed]">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex flex-wrap items-center justify-between gap-4 p-5"
              >
                <div>
                  <h2 className="font-semibold text-[#173b29]">
                    {event.title}
                  </h2>
                  <p className="mt-1 text-xs text-[#829087]">
                    {new Date(event.start_date).toLocaleDateString(
                      "en-GB"
                    )}
                    {event.location ? ` · ${event.location}` : ""}
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      event.status === "published"
                        ? "bg-green-50 text-green-700"
                        : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {event.status}
                  </span>

                  <Link
                    href={`/admin/events/${event.id}/edit`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#178f4c]"
                  >
                    <Pencil size={16} />
                    Edit
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
