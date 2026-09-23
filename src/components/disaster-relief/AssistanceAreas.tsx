import {
  Package,
  Home,
  HeartHandshake,
  Users,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import {
  Stagger,
  StaggerItem,
} from "@/components/ui/Stagger";

const areas = [
  {
    icon: Package,
    title: "Essential Assistance",
    description:
      "Responding to urgent needs with practical support based on the circumstances facing affected people.",
  },
  {
    icon: Home,
    title: "Affected Households",
    description:
      "Supporting families and households whose everyday lives have been disrupted by emergencies.",
  },
  {
    icon: Users,
    title: "Community Support",
    description:
      "Working with communities to understand shared needs and strengthen collective response.",
  },
  {
    icon: HeartHandshake,
    title: "Vulnerable People",
    description:
      "Keeping the needs and dignity of people facing difficult circumstances at the center of our response.",
  },
];

export default function AssistanceAreas() {
  return (
    <section className="relative overflow-hidden bg-[#073b29] py-24 lg:py-28">
      <div className="pointer-events-none absolute -right-48 -top-52 h-[600px] w-[600px] rounded-full border border-white/[0.06]" />

      <div className="pointer-events-none absolute -bottom-64 left-[15%] h-[500px] w-[500px] rounded-full border border-white/[0.05]" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mb-14 grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#72dda0]">
                Areas of Assistance
              </p>

              <h2 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white lg:text-5xl">
                Practical support centered on{" "}
                <span className="text-[#72dda0]">
                  people and their needs.
                </span>
              </h2>
            </div>

            <p className="max-w-lg text-lg leading-8 text-white/60 lg:justify-self-end">
              The needs created by an emergency can vary from one family or
              community to another. Our response is shaped by the circumstances
              we encounter and the resources available.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area, index) => {
            const Icon = area.icon;

            return (
              <StaggerItem key={area.title} className="h-full">
                <div className="group flex h-full min-h-[295px] flex-col rounded-[24px] border border-white/10 bg-white/[0.07] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#72dda0]/25 hover:bg-white/[0.09]">
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 transition-colors duration-300 group-hover:bg-[#1da85a]">
                      <Icon
                        size={24}
                        className="text-[#72dda0] transition-colors duration-300 group-hover:text-white"
                      />
                    </div>

                    <span className="text-xs font-bold text-white/30">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-white">
                    {area.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/55">
                    {area.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}