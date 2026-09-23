import {
  UserRound,
  Users,
  HeartHandshake,
  Home,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import {
  Stagger,
  StaggerItem,
} from "@/components/ui/Stagger";

const groups = [
  {
    number: "01",
    icon: UserRound,
    title: "Individuals",
    description:
      "People facing difficult circumstances who may need practical assistance or community support.",
  },
  {
    number: "02",
    icon: Home,
    title: "Families",
    description:
      "Households experiencing challenges that affect their wellbeing and everyday circumstances.",
  },
  {
    number: "03",
    icon: HeartHandshake,
    title: "Vulnerable People",
    description:
      "People whose circumstances may leave them particularly in need of compassion, assistance, and support.",
  },
  {
    number: "04",
    icon: Users,
    title: "Communities",
    description:
      "Groups and communities working together to respond to shared needs and strengthen collective wellbeing.",
  },
];

export default function WhoWeSupport() {
  return (
    <section className="bg-[#f5f8f6] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
              Who We Support
            </p>

            <h2 className="text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
              Support centered around{" "}
              <span className="text-[#19944f]">
                people and communities.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#68766e]">
              Every situation is different. Our community assistance work
              responds to people and communities according to the needs and
              circumstances we encounter.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => {
            const Icon = group.icon;

            return (
              <StaggerItem key={group.title} className="h-full">
                <div className="group flex h-full min-h-[285px] flex-col rounded-[24px] border border-[#dfe8e2] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#bdd8c7] hover:shadow-[0_14px_35px_rgba(20,50,35,0.07)]">
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf7ef] transition-colors duration-300 group-hover:bg-[#19944f]">
                      <Icon
                        size={24}
                        className="text-[#19944f] transition-colors duration-300 group-hover:text-white"
                      />
                    </div>

                    <span className="text-xs font-bold text-[#b0bbb4]">
                      {group.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-[#142019]">
                    {group.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#68766e]">
                    {group.description}
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