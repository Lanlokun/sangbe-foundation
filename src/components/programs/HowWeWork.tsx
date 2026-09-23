import {
  Ear,
  Search,
  HandHeart,
  Users,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import {
  Stagger,
  StaggerItem,
} from "@/components/ui/Stagger";

const steps = [
  {
    number: "01",
    title: "Listen",
    description:
      "We begin by listening to people and understanding the challenges affecting their communities.",
    icon: Ear,
  },
  {
    number: "02",
    title: "Understand",
    description:
      "We consider the needs, circumstances, and type of support that can make a meaningful difference.",
    icon: Search,
  },
  {
    number: "03",
    title: "Respond",
    description:
      "We turn understanding into practical action through awareness, assistance, and community support.",
    icon: HandHeart,
  },
  {
    number: "04",
    title: "Build",
    description:
      "We work with communities toward stronger participation, greater awareness, and lasting positive change.",
    icon: Users,
  },
];

export default function HowWeWork() {
  return (
    <section className="bg-[#f5f8f6] py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
              How We Work
            </p>

            <h2 className="text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
              Community needs come{" "}
              <span className="text-[#19944f]">first.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#68766e]">
              Our approach starts with understanding the people we serve and
              turning that understanding into practical action.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <StaggerItem
                key={step.title}
                className="h-full"
              >
                <div className="group relative flex h-full min-h-[290px] flex-col rounded-[24px] border border-[#dfe8e2] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#bdd8c7] hover:shadow-[0_14px_35px_rgba(20,50,35,0.07)]">
                  {/* Connector */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-[calc(100%+1px)] top-[55px] hidden w-5 border-t border-dashed border-[#bcd8c6] lg:block" />
                  )}

                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf7ef] transition-all duration-300 group-hover:bg-[#19944f]">
                      <Icon
                        size={24}
                        className="text-[#19944f] transition-colors duration-300 group-hover:text-white"
                      />
                    </div>

                    <span className="text-xs font-bold text-[#b0bbb4]">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl font-bold text-[#142019]">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-[#68766e]">
                    {step.description}
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