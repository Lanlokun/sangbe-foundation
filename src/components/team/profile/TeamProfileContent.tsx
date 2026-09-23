import {
  BriefcaseBusiness,
  UserRound,
} from "lucide-react";

import type { TeamMember } from "@/data/team";

export default function TeamProfileContent({
  member,
}: {
  member: TeamMember;
}) {
  const hasBio =
    member.bio &&
    member.bio.length > 0;

  const hasExpertise =
    member.expertise &&
    member.expertise.length > 0;

  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_320px]">
          {/* Main content */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
              Profile
            </p>

            <h2 className="mt-4 text-4xl font-bold tracking-[-0.03em] text-[#142019]">
              About {member.name.split(" ")[0]}
            </h2>

            {hasBio ? (
              <div className="mt-7 max-w-3xl space-y-5">
                {member.bio?.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-base leading-8 text-[#68766e]"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <div className="mt-7 max-w-3xl rounded-[22px] border border-[#dfe8e2] bg-[#f7faf8] p-7">
                <div className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e3f4e8]">
                    <UserRound
                      size={20}
                      className="text-[#19944f]"
                    />
                  </div>

                  <div>
                    <h3 className="font-bold text-[#142019]">
                      Profile information coming soon
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#68766e]">
                      Additional information about {member.name}&apos;s
                      background and work with Sangbe Foundation will be
                      added here.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside>
            <div className="rounded-[24px] border border-[#dfe8e2] bg-[#f7faf8] p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e3f4e8]">
                <BriefcaseBusiness
                  size={20}
                  className="text-[#19944f]"
                />
              </div>

              <p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-[#89958e]">
                Role
              </p>

              <p className="mt-2 font-bold text-[#142019]">
                {member.role}
              </p>

              {member.chapter && (
                <>
                  <div className="my-6 border-t border-[#dde6e0]" />

                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#89958e]">
                    Chapter
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#142019]">
                    {member.chapter}
                  </p>
                </>
              )}

              {hasExpertise && (
                <>
                  <div className="my-6 border-t border-[#dde6e0]" />

                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#89958e]">
                    Areas of Work
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {member.expertise?.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-[#d5e7da] bg-white px-3 py-1.5 text-xs font-semibold text-[#32714d]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}