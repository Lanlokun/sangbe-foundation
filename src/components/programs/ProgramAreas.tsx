import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  MapPin,
  Megaphone,
  HeartHandshake,
  LifeBuoy,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import {
  Stagger,
  StaggerItem,
} from "@/components/ui/Stagger";

const programs = [
  {
    number: "01",
    category: "Awareness & Prevention",
    title: "Drug Abuse Awareness",
    description:
      "Raising awareness about drug abuse, its risks, prevention, and the importance of making informed and healthier choices.",
    image: "/images/disaster-relief/drugabuse.png",
    href: "/awareness",
    icon: Megaphone,
  },
  {
    number: "02",
    category: "Emergency Response",
    title: "Flood Relief & Disaster Support",
    description:
      "Responding to families and communities affected by floods and other emergencies with practical assistance and essential support.",
    image: "/images/disaster-relief/flood.png",
    href: "/disaster-relief",
    icon: LifeBuoy,
  },
  {
    number: "03",
    category: "Community Support",
    title: "Community Assistance",
    description:
      "Supporting vulnerable people and responding to community needs through practical assistance and community-focused action.",
    image: "/images/disaster-relief/communitysupport.png",
    href: "/programs/community-assistance",
    icon: HeartHandshake,
  },
];

export default function ProgramAreas() {
  return (
    <section
      id="program-areas"
      className="scroll-mt-24 bg-white py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading */}
        <Reveal>
          <div className="mb-14 grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
                What We Do
              </p>

              <h2 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
                Programs built around{" "}
                <span className="text-[#19944f]">
                  real community needs.
                </span>
              </h2>
            </div>

            <p className="max-w-lg text-lg leading-8 text-[#68766e] lg:justify-self-end">
              Our work focuses on challenges that directly affect individuals,
              families, and communities, combining awareness with practical
              support and community engagement.
            </p>
          </div>
        </Reveal>

        {/* Program cards */}
        <Stagger className="grid gap-6 lg:grid-cols-3">
          {programs.map((program) => {
            const Icon = program.icon;

            return (
              <StaggerItem
                key={program.title}
                className="h-full"
              >
                <Link
                  href={program.href}
                  className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-[#dfe8e2] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#bdd8c7] hover:shadow-[0_18px_45px_rgba(20,50,35,0.09)]"
                >
                  {/* Image */}
                  <div className="relative h-[285px] overflow-hidden">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#073b29]/45 via-transparent to-transparent" />

                    <div className="absolute left-6 top-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-[#073b29]/70 backdrop-blur-sm">
                      <Icon
                        size={21}
                        className="text-[#72dda0]"
                      />
                    </div>

                    <span className="absolute right-6 top-6 text-xs font-bold text-white/60">
                      {program.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex min-h-[310px] flex-1 flex-col p-8">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#178f4c]">
                      {program.category}
                    </p>

                    <h3 className="mt-4 text-[26px] font-bold leading-[1.18] tracking-[-0.025em] text-[#142019]">
                      {program.title}
                    </h3>

                    <p className="mt-5 text-base leading-7 text-[#68766e]">
                      {program.description}
                    </p>

                    <div className="mt-auto flex items-end justify-between pt-8">
                      <div className="flex items-center gap-2 text-sm text-[#91a098]">
                        <MapPin size={16} />
                        <span>The Gambia</span>
                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eaf7ef] transition-all duration-300 group-hover:bg-[#19944f]">
                        <ArrowRight
                          size={17}
                          className="text-[#19944f] transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-white"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}