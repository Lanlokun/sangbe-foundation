import {
  Search,
  PackageCheck,
  HandHeart,
  Sprout,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import {
  Stagger,
  StaggerItem,
} from "@/components/ui/Stagger";

const steps = [
  {
    number: "01",
    title: "Assess Needs",
    description:
      "Understand the immediate circumstances and identify the areas where support is most needed.",
    icon: Search,
  },
  {
    number: "02",
    title: "Mobilize Support",
    description:
      "Bring together available resources, volunteers, and assistance around identified community needs.",
    icon: PackageCheck,
  },
  {
    number: "03",
    title: "Deliver Assistance",
    description:
      "Provide practical support to affected people and communities as resources and circumstances allow.",
    icon: HandHeart,
  },
  {
    number: "04",
    title: "Support Recovery",
    description:
      "Continue engaging communities as they move beyond immediate needs and toward recovery.",
    icon: Sprout,
  },
];

export default function ResponseProcess() {
  return (
    <section className="bg-[#f5f8f6] py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
              How We Respond
            </p>

            <h2 className="text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
              From immediate needs to{" "}
              <span className="text-[#19944f]">
                community recovery.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#68766e]">
              Effective response begins with understanding what affected
              communities need and organizing practical support around those
              circumstances.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <StaggerItem key={step.title} className="h-full">
                <div className="group flex h-full min-h-[285px] flex-col rounded-[24px] border border-[#dfe8e2] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#bdd8c7] hover:shadow-[0_14px_35px_rgba(20,50,35,0.07)]">
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf7ef] transition-colors duration-300 group-hover:bg-[#19944f]">
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