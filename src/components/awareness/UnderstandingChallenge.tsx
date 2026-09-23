import {
  Brain,
  Users,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import {
  Stagger,
  StaggerItem,
} from "@/components/ui/Stagger";

const areas = [
  {
    icon: Brain,
    title: "Understanding Risk",
    description:
      "Awareness helps people better understand the risks and consequences associated with drug abuse.",
  },
  {
    icon: ShieldCheck,
    title: "Prevention",
    description:
      "Clear and accessible information can support informed decisions and healthier choices.",
  },
  {
    icon: Users,
    title: "Community Awareness",
    description:
      "Families, schools, young people, and communities all have a role to play in prevention and support.",
  },
];

export default function UnderstandingChallenge() {
  return (
    <section
      id="understanding"
      className="scroll-mt-24 bg-white py-24 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* Main copy */}
          <Reveal>
            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf7ef]">
                <HeartHandshake
                  size={26}
                  className="text-[#19944f]"
                />
              </div>

              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
                Understanding the Challenge
              </p>

              <h2 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
                Awareness is an important part of{" "}
                <span className="text-[#19944f]">
                  prevention.
                </span>
              </h2>

              <p className="mt-7 max-w-xl text-lg leading-8 text-[#68766e]">
                Drug abuse can affect individuals, families, and entire
                communities. Prevention begins with helping people understand
                risks, recognize harmful patterns, and know that support can be
                sought when it is needed.
              </p>

              <p className="mt-5 max-w-xl text-lg leading-8 text-[#68766e]">
                Sangbe Foundation uses awareness and community engagement to
                encourage informed choices and constructive conversations
                around drug abuse and prevention.
              </p>
            </div>
          </Reveal>

          {/* Cards */}
          <Stagger className="space-y-4">
            {areas.map((area, index) => {
              const Icon = area.icon;

              return (
                <StaggerItem key={area.title}>
                  <div className="group flex gap-5 rounded-[22px] border border-[#dfe8e2] bg-[#f8faf8] p-6 transition-all duration-300 hover:-translate-x-1 hover:border-[#bdd8c7] hover:bg-white hover:shadow-[0_12px_30px_rgba(20,50,35,0.06)]">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#eaf7ef] transition-colors duration-300 group-hover:bg-[#19944f]">
                      <Icon
                        size={24}
                        className="text-[#19944f] transition-colors duration-300 group-hover:text-white"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-xl font-bold text-[#142019]">
                          {area.title}
                        </h3>

                        <span className="text-xs font-bold text-[#b0bbb4]">
                          0{index + 1}
                        </span>
                      </div>

                      <p className="mt-2 text-sm leading-6 text-[#68766e]">
                        {area.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}