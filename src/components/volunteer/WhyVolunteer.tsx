import {
  HeartHandshake,
  Lightbulb,
  Users,
  HandHeart,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import {
  Stagger,
  StaggerItem,
} from "@/components/ui/Stagger";

const opportunities = [
  {
    icon: Users,
    title: "Community Activities",
    description:
      "Support outreach, community engagements, events, and activities involving the people and communities we serve.",
  },
  {
    icon: Lightbulb,
    title: "Skills & Expertise",
    description:
      "Contribute useful skills in areas such as communication, technology, planning, education, logistics, or other relevant fields.",
  },
  {
    icon: HandHeart,
    title: "Support & Outreach",
    description:
      "Help with awareness activities, community assistance, disaster response, and other Foundation initiatives.",
  },
  {
    icon: HeartHandshake,
    title: "Teamwork",
    description:
      "Work alongside other volunteers and Foundation members toward practical and meaningful community action.",
  },
];

export default function WhyVolunteer() {
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
                Get Involved
              </p>

              <h2 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
                There are many ways to{" "}
                <span className="text-[#19944f]">
                  contribute.
                </span>
              </h2>
            </div>

            <p className="max-w-lg text-lg leading-8 text-[#68766e] lg:justify-self-end">
              Volunteering is about more than giving your time. Your skills,
              ideas, experience, and willingness to help can all contribute to
              the work we do.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {opportunities.map((item, index) => {
            const Icon = item.icon;

            return (
              <StaggerItem key={item.title} className="h-full">
                <div className="flex h-full min-h-[290px] flex-col rounded-[24px] border border-[#dfe8e2] bg-[#f8faf8] p-7">
                  <div className="flex items-start justify-between">
                    <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-[#e5f7eb] p-3">
                      <Icon size={23} className="text-[#19944f]" />
                    </div>

                    <span className="text-xs font-semibold text-[#b5c0b9]">
                      0{index + 1}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-[#142019]">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#68766e]">
                    {item.description}
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