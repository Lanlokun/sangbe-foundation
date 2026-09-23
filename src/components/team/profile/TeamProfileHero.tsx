import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  UserRound,
} from "lucide-react";

import type { TeamMember } from "@/data/team";

export default function TeamProfileHero({
  member,
}: {
  member: TeamMember;
}) {
  return (
    <section className="relative overflow-hidden bg-[#073b29]">
      <div className="pointer-events-none absolute -right-44 -top-52 h-[620px] w-[620px] rounded-full border border-white/[0.06]" />

      <div className="pointer-events-none absolute right-24 top-20 h-[300px] w-[300px] rounded-full border border-white/[0.05]" />

      <div className="mx-auto grid min-h-[570px] max-w-7xl gap-12 px-6 pb-20 pt-40 lg:grid-cols-[1fr_0.72fr] lg:items-center lg:px-8 lg:pt-44">
        {/* Content */}
        <div className="relative z-10">
          <div className="mb-9 flex flex-wrap items-center gap-2 text-sm text-white/50">
            <Link
              href="/"
              className="transition-colors hover:text-white"
            >
              Home
            </Link>

            <ChevronRight size={14} />

            <Link
              href="/team"
              className="transition-colors hover:text-white"
            >
              Our Team
            </Link>

            <ChevronRight size={14} />

            <span className="text-white">
              {member.name}
            </span>
          </div>

          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#72dda0]">
            Meet Our Team
          </p>

          <h1 className="mt-5 max-w-3xl text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-[64px]">
            {member.name}
          </h1>

          <p className="mt-5 text-xl font-semibold text-[#72dda0]">
            {member.role}
          </p>

          {member.chapter && (
            <p className="mt-2 text-sm text-white/55">
              {member.chapter}
            </p>
          )}

          {member.shortBio && (
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
              {member.shortBio}
            </p>
          )}
        </div>

        {/* Portrait */}
        <div className="relative z-10 hidden justify-end lg:flex">
          <div className="relative aspect-[4/4.7] w-full max-w-[390px] overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.06] shadow-2xl">
            {member.image ? (
              <Image
                src={member.image}
                alt={member.name}
                fill
                priority
                className="object-cover"
                sizes="390px"
              />
            ) : (
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#164d39]">
                <div className="absolute -right-28 -top-28 h-80 w-80 rounded-full bg-white/[0.04]" />

                <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#72dda0]/[0.05]" />

                <div className="flex h-32 w-32 items-center justify-center rounded-full border border-white/10 bg-white/[0.06]">
                  <UserRound
                    size={58}
                    strokeWidth={1.2}
                    className="text-white/45"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}