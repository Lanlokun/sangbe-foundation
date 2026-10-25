
import {
  Mail,
  ExternalLink,
  Users,
} from "lucide-react";

import { createClient } from "@/lib/supabase/server";

export default async function PublicTeamGrid() {
  const supabase = await createClient();

  const { data: members, error } = await supabase
    .from("cms_team_members")
    .select(
      "id, full_name, position, biography, photo_url, email, linkedin_url, facebook_url"
    )
    .eq("status", "published")
    .order("display_order", { ascending: true });

  if (error || !members?.length) {
    return null;
  }

  return (
    <section className="bg-[#f7faf7] py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section heading */}
        <div className="mb-12 text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#178f4c]">
            The People Behind Our Work
          </p>

          <h2 className="mt-3 text-4xl font-bold text-[#173b29]">
            Our Team
          </h2>
        </div>

        {/* Team grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => (
            <article
              key={member.id}
              className="overflow-hidden rounded-2xl border border-[#e3ebe5] bg-white shadow-sm"
            >
              {/* Profile photograph */}
              {member.photo_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={member.photo_url}
                  alt={member.full_name}
                  className="aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex aspect-[4/3] items-center justify-center bg-[#edf4ef]">
                  <Users
                    size={52}
                    className="text-[#178f4c]"
                  />
                </div>
              )}

              {/* Member information */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#173b29]">
                  {member.full_name}
                </h3>

                <p className="mt-1 font-semibold text-[#178f4c]">
                  {member.position}
                </p>

                {member.biography && (
                  <p className="mt-4 whitespace-pre-line text-sm leading-7 text-[#75847a]">
                    {member.biography}
                  </p>
                )}

                {/* Contact and social media */}
                {(member.email ||
                  member.linkedin_url ||
                  member.facebook_url) && (
                  <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-[#edf1ed] pt-4">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        aria-label={`Email ${member.full_name}`}
                        title="Email"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#edf4ef] text-[#178f4c] transition hover:bg-[#178f4c] hover:text-white"
                      >
                        <Mail size={18} />
                      </a>
                    )}

                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.full_name} on LinkedIn`}
                        title="LinkedIn"
                        className="inline-flex items-center gap-2 rounded-full bg-[#edf4ef] px-3 py-2 text-xs font-semibold text-[#178f4c] transition hover:bg-[#178f4c] hover:text-white"
                      >
                        <ExternalLink size={15} />
                        LinkedIn
                      </a>
                    )}

                    {member.facebook_url && (
                      <a
                        href={member.facebook_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.full_name} on Facebook`}
                        title="Facebook"
                        className="inline-flex items-center gap-2 rounded-full bg-[#edf4ef] px-3 py-2 text-xs font-semibold text-[#178f4c] transition hover:bg-[#178f4c] hover:text-white"
                      >
                        <ExternalLink size={15} />
                        Facebook
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
