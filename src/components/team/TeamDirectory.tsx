import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  UserRound,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";

import {
  teamMembers,
  type TeamMember,
} from "@/data/team";

/* -------------------------------------------------------
   Team groups
------------------------------------------------------- */

const leadership = teamMembers.filter(
  (member) => member.category === "leadership"
);

const team = teamMembers.filter(
  (member) => member.category !== "leadership"
);

/* -------------------------------------------------------
   Main Directory
------------------------------------------------------- */

export default function TeamDirectory() {
  return (
    <>
      <TeamSection
        eyebrow="Leadership"
        title="Foundation Leadership"
        description="Providing direction and helping guide the Foundation's mission, priorities, and continued development."
        members={leadership}
        featured
      />

      <TeamSection
        eyebrow="Our Team"
        title="The People Behind Sangbe Foundation"
        description="Meet the people contributing their experience, skills, and commitment to the Foundation's work across its different areas and chapters."
        members={team}
        muted
      />
    </>
  );
}

/* -------------------------------------------------------
   Team Section
------------------------------------------------------- */

function TeamSection({
  eyebrow,
  title,
  description,
  members,
  featured = false,
  muted = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  members: TeamMember[];
  featured?: boolean;
  muted?: boolean;
}) {
  return (
    <section
      className={`py-20 lg:py-24 ${
        muted ? "bg-[#f4f8f5]" : "bg-white"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section heading */}
        <Reveal>
          <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
                {eyebrow}
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-[-0.03em] text-[#142019] sm:text-4xl">
                {title}
              </h2>
            </div>

            <p className="max-w-2xl text-base leading-7 text-[#68766e] lg:justify-self-end">
              {description}
            </p>
          </div>
        </Reveal>

        {/* Team grid */}
        <div
          className={`mt-12 grid gap-6 sm:grid-cols-2 ${
            featured
              ? "lg:max-w-[780px] lg:grid-cols-2"
              : "lg:grid-cols-3 xl:grid-cols-4"
          }`}
        >
          {members.map((member) => (
            <div
              key={member.slug}
              className="h-full"
            >
              <Link
                href={`/team/${member.slug}`}
                className="block h-full"
                aria-label={`View ${member.name}'s profile`}
              >
                <TeamCard
                  member={member}
                  featured={featured}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   Team Member Card
------------------------------------------------------- */

function TeamCard({
  member,
  featured = false,
}: {
  member: TeamMember;
  featured?: boolean;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#dde7e0] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#c7ddce] hover:shadow-[0_18px_45px_rgba(20,50,35,0.08)]">
      {/* Member photo */}
      <div
        className={`relative overflow-hidden bg-[#e5efe8] ${
          featured
            ? "aspect-[4/4.15]"
            : "aspect-[4/4.35]"
        }`}
      >
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover object-top transition duration-500 group-hover:scale-[1.035]"
            sizes={
              featured
                ? "(max-width: 640px) 100vw, 390px"
                : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
            }
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {/* Decorative background */}
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#d6e9dc]" />

            <div className="absolute -bottom-24 -left-20 h-60 w-60 rounded-full bg-[#eef5f0]" />

            <div className="absolute left-8 top-8 h-16 w-16 rounded-full border border-[#cfe2d5]" />

            {/* Placeholder icon */}
            <div
              className={`relative flex items-center justify-center rounded-full border border-white/70 bg-white/65 shadow-sm backdrop-blur-sm ${
                featured
                  ? "h-28 w-28"
                  : "h-24 w-24"
              }`}
            >
              <UserRound
                size={featured ? 50 : 43}
                strokeWidth={1.3}
                className="text-[#789b85]"
              />
            </div>
          </div>
        )}

        {/* Image overlay */}
        {member.image && (
          <div className="absolute inset-0 bg-gradient-to-t from-[#073b29]/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        )}
      </div>

      {/* Member information */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex-1">
          <h3
            className={`font-bold tracking-[-0.015em] text-[#142019] transition-colors duration-300 group-hover:text-[#178f4c] ${
              featured
                ? "text-xl"
                : "text-lg"
            }`}
          >
            {member.name}
          </h3>

          <p className="mt-2 text-sm font-semibold text-[#19944f]">
            {member.role}
          </p>

          {member.chapter && (
            <p className="mt-2 text-xs leading-5 text-[#849087]">
              {member.chapter}
            </p>
          )}

          {member.shortBio && (
            <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#68766e]">
              {member.shortBio}
            </p>
          )}
        </div>

        {/* Profile link */}
        <div className="mt-6 flex items-center justify-between border-t border-[#edf1ee] pt-4">
          <span className="text-xs font-bold uppercase tracking-[0.12em] text-[#7b8980] transition-colors duration-300 group-hover:text-[#178f4c]">
            View Profile
          </span>

          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#eef7f1] transition duration-300 group-hover:bg-[#19944f]">
            <ArrowUpRight
              size={15}
              className="text-[#19944f] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
            />
          </div>
        </div>
      </div>
    </article>
  );
}