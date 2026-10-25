
import { MapPin, CalendarDays, Layers } from "lucide-react";

import { createClient } from "@/lib/supabase/server";

export default async function PublicProgramsGrid() {
  const supabase = await createClient();

  const { data: programs, error } = await supabase
    .from("cms_programs")
    .select(
      "id, title, summary, category, cover_image_url, location, start_date, end_date"
    )
    .eq("status", "published")
    .order("display_order", { ascending: true });

  if (error || !programs?.length) {
    return null;
  }

  return (
    <section className="bg-[#f7faf7] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#178f4c]">
            Our Initiatives
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#173b29]">
            Our Programs
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <article
              key={program.id}
              className="overflow-hidden rounded-2xl border border-[#e3ebe5] bg-white shadow-sm"
            >
              {program.cover_image_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={program.cover_image_url}
                  alt={program.title}
                  loading="lazy"
                  className="aspect-[16/10] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center bg-[#edf4ef]">
                  <Layers
                    size={44}
                    className="text-[#178f4c]"
                  />
                </div>
              )}

              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-wide text-[#178f4c]">
                  {program.category}
                </p>

                <h3 className="mt-3 text-xl font-bold text-[#173b29]">
                  {program.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-[#75847a]">
                  {program.summary}
                </p>

                <div className="mt-5 space-y-2 text-sm text-[#55705e]">
                  {program.location && (
                    <p className="flex items-center gap-2">
                      <MapPin size={16} />
                      {program.location}
                    </p>
                  )}

                  {program.start_date && (
                    <p className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      {program.start_date}
                      {program.end_date
                        ? ` – ${program.end_date}`
                        : ""}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
