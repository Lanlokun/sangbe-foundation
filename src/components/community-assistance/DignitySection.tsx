import {
  Heart,
  ShieldCheck,
  Users,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import {
  Stagger,
  StaggerItem,
} from "@/components/ui/Stagger";

const principles = [
  {
    number: "01",
    icon: Heart,
    title: "Compassion",
    description:
      "Approaching people with empathy and recognizing the human circumstances behind every request for support.",
  },
  {
    number: "02",
    icon: ShieldCheck,
    title: "Dignity",
    description:
      "Treating people with respect and ensuring that assistance does not diminish their dignity or sense of agency.",
  },
  {
    number: "03",
    icon: Users,
    title: "Community",
    description:
      "Recognizing that meaningful support is strengthened by participation, cooperation, and community relationships.",
  },
];

export default function DignitySection() {
  return (
    <section className="relative overflow-hidden bg-[#073b29] py-24 lg:py-28">
      <div className="pointer-events-none absolute -right-48 -top-52 h-[600px] w-[600px] rounded-full border border-white/[0.06]" />

      <div className="pointer-events-none absolute -bottom-64 left-[15%] h-[500px] w-[500px] rounded-full border border-white/[0.05]" />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
        <Reveal>
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#72dda0]">
              Dignity at the Center
            </p>

            <h2 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white lg:text-5xl">
              Helping people should always begin with{" "}
              <span className="text-[#72dda0]">respect.</span>
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-white/60">
              Community assistance is about more than providing something. It
              is about listening, respecting people&apos;s circumstances, and
              responding in ways that recognize their dignity.
            </p>
          </div>
        </Reveal>

        <Stagger className="space-y-4">
          {principles.map((principle) => {
            const Icon = principle.icon;

            return (
              <StaggerItem key={principle.title}>
                <div className="group flex gap-5 rounded-[22px] border border-white/10 bg-white/[0.07] p-6 transition-all duration-300 hover:-translate-x-1 hover:border-[#72dda0]/25 hover:bg-white/[0.09]">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 transition-colors duration-300 group-hover:bg-[#1da85a]">
                    <Icon
                      size={24}
                      className="text-[#72dda0] transition-colors duration-300 group-hover:text-white"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-white/30">
                        {principle.number}
                      </span>

                      <h3 className="text-xl font-bold text-white">
                        {principle.title}
                      </h3>
                    </div>

                    <p className="mt-2 max-w-lg text-sm leading-6 text-white/55">
                      {principle.description}
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