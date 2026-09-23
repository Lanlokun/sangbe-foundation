import {
  HeartHandshake,
  Megaphone,
  PackageCheck,
  Users,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import {
  Stagger,
  StaggerItem,
} from "@/components/ui/Stagger";

const areas = [
  {
    icon: PackageCheck,
    title: "Essential Assistance",
    description:
      "Helping us provide practical support to people and families facing difficult circumstances.",
  },
  {
    icon: Megaphone,
    title: "Awareness",
    description:
      "Supporting awareness and prevention activities that help communities make informed choices.",
  },
  {
    icon: HeartHandshake,
    title: "Disaster Response",
    description:
      "Strengthening our ability to respond when families and communities are affected by emergencies.",
  },
  {
    icon: Users,
    title: "Community Activities",
    description:
      "Helping us organize outreach, engagement, and initiatives that bring people together.",
  },
];

export default function DonationImpact() {
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
                Why Your Support Matters
              </p>

              <h2 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
                Helping turn generosity into{" "}
                <span className="text-[#19944f]">
                  practical support.
                </span>
              </h2>
            </div>

            <p className="max-w-lg text-lg leading-8 text-[#68766e] lg:justify-self-end">
              Donations help strengthen our ability to respond to community
              needs and continue the work of Sangbe Foundation.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map((area, index) => {
            const Icon = area.icon;

            return (
              <StaggerItem key={area.title} className="h-full">
                <div className="flex h-full min-h-[280px] flex-col rounded-[24px] border border-[#dfe8e2] bg-[#f8faf8] p-7">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e5f7eb]">
                      <Icon
                        size={22}
                        className="text-[#19944f]"
                      />
                    </div>

                    <span className="text-xs font-semibold text-[#b5c0b9]">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-[#142019]">
                    {area.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#68766e]">
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