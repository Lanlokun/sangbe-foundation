import Link from "next/link";
import { ArrowRight, UserRound } from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import {
  Stagger,
  StaggerItem,
} from "@/components/ui/Stagger";

const team = [
  {
    name: "Mohammed Abdallah Sangbe",
    role: "Founder & CEO",
    image: null,
  },
  {
    name: "Catherine Andrews",
    role: "Deputy CEO",
    image: null,
  },
  {
    name: "Henry Kyereman",
    role: "IT Manager",
    image: null,
  },
  {
    name: "Alimatou Sankareh",
    role: "General Secretary",
    image: null,
  },
];

export default function TeamPreview() {
  return (
    <section className="bg-[#f5f8f6] py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
                Our People
              </p>

              <h2 className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
                The people behind{" "}
                <span className="text-[#19944f]">
                  Sangbe Foundation.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-[#68766e]">
                Our team brings together people committed to serving
                communities, building partnerships, and advancing the
                Foundation&apos;s mission.
              </p>
            </div>

            <Link
              href="/team"
              className="group inline-flex w-fit items-center gap-2 font-semibold text-[#178f4c]"
            >
              Meet Our Team

              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <StaggerItem
              key={member.name}
              className="h-full"
            >
              <div className="group overflow-hidden rounded-[24px] border border-[#dde7e0] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(20,50,35,0.07)]">
                <div className="relative flex aspect-[4/4.5] items-center justify-center overflow-hidden bg-[#e6efe9]">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <>
                      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#d6e9dc]" />
                      <div className="absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-[#edf5ef]" />

                      <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-white/70">
                        <UserRound
                          size={44}
                          strokeWidth={1.4}
                          className="text-[#7da18a]"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-[#142019]">
                    {member.name}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-[#19944f]">
                    {member.role}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal>
          <div className="mt-10 text-center lg:hidden">
            <Link
              href="/team"
              className="inline-flex items-center gap-2 rounded-xl bg-[#073b29] px-6 py-3.5 font-semibold text-white"
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