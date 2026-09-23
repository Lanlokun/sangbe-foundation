import Link from "next/link";

import {
  ArrowRight,
  HeartHandshake,
  ShieldCheck,
  Users,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import {
  Stagger,
  StaggerItem,
} from "@/components/ui/Stagger";

const focusAreas = [
  {
    icon: ShieldCheck,
    title: "Prevention",
    description:
      "Helping people understand risks and make informed choices through awareness and education.",
  },
  {
    icon: HeartHandshake,
    title: "Support",
    description:
      "Providing practical assistance to people and families facing difficult circumstances.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Working with communities and encouraging participation in creating positive change.",
  },
];

export default function ProgramFocus() {
  return (
    <section className="relative overflow-hidden bg-[#073b29] py-24 lg:py-28">
      {/* Decoration */}
      <div className="pointer-events-none absolute -right-40 -top-48 h-[560px] w-[560px] rounded-full border border-white/[0.06]" />

      <div className="pointer-events-none absolute -bottom-56 left-[25%] h-[460px] w-[460px] rounded-full border border-white/[0.05]" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <Reveal>
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#72dda0]">
              Our Focus
            </p>

            <h2 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white lg:text-5xl">
              Support that responds to{" "}
              <span className="text-[#72dda0]">
                real circumstances.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/60">
              Every community faces different challenges. Our programs are
              designed around practical needs while keeping people, dignity,
              and community participation at the center of our work.
            </p>

            <Link
              href="/about"
              className="group mt-9 inline-flex items-center gap-3 font-semibold text-[#72dda0] transition-all duration-300 hover:text-white"
            >
              Learn more about Sangbe

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>

        <Stagger className="space-y-4">
          {focusAreas.map((area, index) => {
            const Icon = area.icon;

            return (
              <StaggerItem key={area.title}>
                <div className="group flex gap-5 rounded-[22px] border border-white/10 bg-white/[0.07] p-6 transition-all duration-300 hover:-translate-x-1 hover:border-[#72dda0]/25 hover:bg-white/[0.09]">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 transition-colors duration-300 group-hover:bg-[#1da85a]">
                    <Icon
                      size={24}
                      className="text-[#72dda0] transition-colors duration-300 group-hover:text-white"
                    />
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-white/30">
                        0{index + 1}
                      </span>

                      <h3 className="text-xl font-bold text-white">
                        {area.title}
                      </h3>
                    </div>

                    <p className="mt-2 max-w-lg text-sm leading-6 text-white/55">
                      {area.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}