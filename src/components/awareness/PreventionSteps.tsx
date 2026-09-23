import {
  Eye,
  ShieldCheck,
  HeartHandshake,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import {
  Stagger,
  StaggerItem,
} from "@/components/ui/Stagger";

const steps = [
  {
    number: "01",
    label: "Recognize",
    title: "Be aware of changes and warning signs.",
    description:
      "Sudden or concerning changes in behaviour, relationships, responsibilities, or wellbeing can be reasons to pay closer attention and start a supportive conversation.",
    icon: Eye,
  },
  {
    number: "02",
    label: "Prevent",
    title: "Information helps people make healthier choices.",
    description:
      "Education, supportive relationships, positive activities, and open communication can all contribute to prevention and healthier decision-making.",
    icon: ShieldCheck,
  },
  {
    number: "03",
    label: "Support",
    title: "Respond with care rather than judgment.",
    description:
      "People facing problems related to drug use may benefit from compassionate support and appropriate professional or community assistance.",
    icon: HeartHandshake,
  },
];

export default function PreventionSteps() {
  return (
    <section className="bg-[#f5f8f6] py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
              Recognize • Prevent • Support
            </p>

            <h2 className="text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
              Awareness should lead to{" "}
              <span className="text-[#19944f]">
                constructive action.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#68766e]">
              Prevention is not only about saying no to drugs. It also means
              creating informed, supportive environments where people can make
              healthier choices and seek help when needed.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid gap-6 lg:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <StaggerItem
                key={step.label}
                className="h-full"
              >
                <div className="group flex h-full min-h-[360px] flex-col rounded-[28px] border border-[#dfe8e2] bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#bdd8c7] hover:shadow-[0_16px_40px_rgba(20,50,35,0.07)]">
                  <div className="flex items-start justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf7ef] transition-colors duration-300 group-hover:bg-[#19944f]">
                      <Icon
                        size={25}
                        className="text-[#19944f] transition-colors duration-300 group-hover:text-white"
                      />
                    </div>

                    <span className="text-xs font-bold text-[#b0bbb4]">
                      {step.number}
                    </span>
                  </div>

                  <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#19944f]">
                    {step.label}
                  </p>

                  <h3 className="mt-3 text-2xl font-bold leading-tight text-[#142019]">
                    {step.title}
                  </h3>

                  <p className="mt-5 text-sm leading-7 text-[#68766e]">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-5 text-[#8a9890]">
            These are general awareness principles and are not a substitute for
            professional medical, counselling, or emergency services.
          </p>
        </Reveal>
      </div>
    </section>
  );
}