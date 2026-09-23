import {
  Building2,
  GraduationCap,
  HandCoins,
  Landmark,
  Lightbulb,
  Users,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import {
  Stagger,
  StaggerItem,
} from "@/components/ui/Stagger";

const partnershipTypes = [
  {
    icon: Building2,
    title: "Corporate Partnerships",
    description:
      "Organizations can support programs, community initiatives, events, resources, or other areas of our work.",
  },
  {
    icon: Landmark,
    title: "Institutional Collaboration",
    description:
      "We welcome collaboration with public institutions and development organizations around shared community priorities.",
  },
  {
    icon: GraduationCap,
    title: "Education & Research",
    description:
      "Universities, schools, researchers, and educators can collaborate on awareness, evidence-building, and capacity development.",
  },
  {
    icon: Users,
    title: "Community Partnerships",
    description:
      "Local organizations and community groups can work with us to identify needs, mobilize people, and deliver activities.",
  },
  {
    icon: HandCoins,
    title: "Program Sponsorship",
    description:
      "Partners can provide financial or in-kind support for specific activities, campaigns, relief efforts, and community programs.",
  },
  {
    icon: Lightbulb,
    title: "Skills & Expertise",
    description:
      "Professionals and technical partners can contribute expertise, training, technology, communications, and specialist support.",
  },
];

export default function PartnershipTypes() {
  return (
    <section className="bg-[#f4f8f5] py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
              Ways to Partner
            </p>

            <h2 className="text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
              There are many ways we can{" "}
              <span className="text-[#19944f]">
                work together.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#68766e]">
              Partnerships can take different forms depending on shared
              priorities, available resources, and the communities we aim to
              support.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {partnershipTypes.map((item, index) => {
            const Icon = item.icon;

            return (
              <StaggerItem
                key={item.title}
                className="h-full"
              >
                <div className="group flex h-full min-h-[285px] flex-col rounded-[24px] border border-[#dde7e0] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(20,50,35,0.07)]">
                  <div className="flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e5f7eb]">
                      <Icon
                        size={23}
                        className="text-[#19944f]"
                      />
                    </div>

                    <span className="text-xs font-bold text-[#bdc7c0]">
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