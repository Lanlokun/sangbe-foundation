import {
  HeartHandshake,
  Users,
  ShieldCheck,
  HandHeart,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import {
  Stagger,
  StaggerItem,
} from "@/components/ui/Stagger";

const principles = [
  {
    number: "01",
    title: "Compassion",
    description:
      "Responding to people and communities with empathy, dignity, and a genuine desire to help.",
    icon: HeartHandshake,
  },
  {
    number: "02",
    title: "Community",
    description:
      "Working with communities and recognizing that lasting change is built through participation and cooperation.",
    icon: Users,
  },
  {
    number: "03",
    title: "Responsibility",
    description:
      "Approaching our work with care, accountability, and respect for the people we serve.",
    icon: ShieldCheck,
  },
  {
    number: "04",
    title: "Service",
    description:
      "Turning concern into practical action that supports people facing difficult circumstances.",
    icon: HandHeart,
  },
];

export default function Values() {
  return (
    <section className="bg-[#f5f8f6] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
              Principles That Guide Us
            </p>

            <h2 className="text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
              The principles behind{" "}
              <span className="text-[#19944f]">
                how we serve.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#68766e]">
              The way we work matters just as much as the work itself. These
              principles shape how we engage with people and communities.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((principle) => {
            const Icon = principle.icon;

            return (
              <StaggerItem
                key={principle.title}
                className="h-full"
              >
                <div className="group flex h-full min-h-[280px] flex-col rounded-[24px] border border-[#dfe8e2] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#bdd8c7] hover:shadow-[0_14px_35px_rgba(20,50,35,0.07)]">
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf7ef] transition-all duration-300 group-hover:bg-[#19944f]">
                      <Icon
                        size={24}
                        className="text-[#19944f] transition-colors duration-300 group-hover:text-white"
                      />
                    </div>

                    <span className="text-xs font-bold text-[#b2bdb6]">
                      {principle.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-[#142019]">
                    {principle.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#68766e]">
                    {principle.description}
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