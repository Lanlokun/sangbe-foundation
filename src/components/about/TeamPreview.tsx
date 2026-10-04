import Image from "next/image";
import Link from "next/link";
import { ArrowRight, UserRound } from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import {
  Stagger,
  StaggerItem,
} from "@/components/ui/Stagger";

import { teamMembers } from "@/data/team";

/* -------------------------------------------------------
   Featured team members
------------------------------------------------------- */

const featuredSlugs = [
  "mohammed-abdallah-sangbe",
  "catherine-andrews",
  "henry-ofosu-kyeremeh",
  "alimatou-sankareh",
];

const team = featuredSlugs
  .map((slug) =>
    teamMembers.find((member) => member.slug === slug)
  )
  .filter(
    (member): member is (typeof teamMembers)[number] =>
      Boolean(member)
  );

/* -------------------------------------------------------
   Team Preview
------------------------------------------------------- */

export default function TeamPreview() {
  return (
    <section className="bg-[#f5f8f6] py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#178f4c] sm:mb-5 sm:tracking-[0.25em]">
                Our People
              </p>

              <h2 className="max-w-2xl text-[2.35rem] font-bold leading-[1.04] tracking-[-0.035em] text-[#142019] sm:text-4xl lg:text-5xl lg:leading-[1.08]">
                The people behind{" "}
                <span className="text-[#19944f]">
                  Sangbe Foundation.
                </span>
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-[#68766e] sm:mt-6 sm:text-lg sm:leading-8">
                Our team brings together people committed to serving
                communities, building partnerships, and advancing the
                Foundation&apos;s mission.
              </p>
            </div>

            {/* Desktop link */}
            <Link
              href="/team"
              className="group hidden items-center gap-2 font-semibold text-[#178f4c] lg:inline-flex"
            >
              Meet Our Team

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>

        <Stagger className="mt-10 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {team.map((member) => (
            <StaggerItem
              key={member.slug}
              className="h-full"
            >
              <Link
                href={`/team/${member.slug}`}
                className="block h-full"
                aria-label={`View ${member.name}'s profile`}
              >
                <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#dde7e0] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(20,50,35,0.07)]">
                  {/* Photo */}
                  <div className="relative aspect-[4/4.5] overflow-hidden bg-[#e6efe9]">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#d6e9dc]" />

                        <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-[#edf5ef]" />

                        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white/70">
                          <UserRound
                            size={44}
                            strokeWidth={1.4}
                            className="text-[#7da18a]"
                          />
                        </div>
                      </div>
                    )}

                    {member.image && (
                      <div className="absolute inset-0 bg-gradient-to-t from-[#073b29]/15 via-transparent to-transparent" />
                    )}
                  </div>

                  {/* Information */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="text-lg font-bold leading-6 text-[#142019]">
                      {member.name}
                    </h3>

                    <p className="mt-2 text-sm font-semibold text-[#19944f]">
                      {member.role}
                    </p>

                    {member.chapter && (
                      <p className="mt-1.5 text-xs leading-5 text-[#849087]">
                        {member.chapter}
                      </p>
                    )}
                  </div>
                </article>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        {/* Mobile / tablet CTA */}
        <Reveal>
          <div className="mt-8 lg:hidden">
            <Link
              href="/team"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#073b29] px-6 py-4 font-semibold text-white sm:w-auto"
            >
              View Full Team
              <ArrowRight size={17} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}