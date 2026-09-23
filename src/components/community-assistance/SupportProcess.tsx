import {
  Ear,
  Search,
  HandHeart,
  RefreshCw,
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
      "Begin by listening to the person, family, or community and understanding what they are experiencing.",
    icon: Ear,
  },
  {
    number: "02",
    title: "Understand the Need",
    description:
      "Consider the circumstances and identify the type of assistance that may be appropriate and possible.",
    icon: Search,
  },
  {
    number: "03",
    title: "Respond",
    description:
      "Provide practical support according to the identified need and the resources available.",
    icon: HandHeart,
  },
  {
    number: "04",
    title: "Stay Connected",
    description:
      "Maintain community relationships and continue listening as circumstances and needs develop.",
    icon: RefreshCw,
  },
];

export default function SupportProcess() {
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="mb-14 grid gap-8 lg:grid-cols-2 lg:items-end">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
                How Support Works
              </p>

              <h2 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
                Understanding first.{" "}
                <span className="text-[#19944f]">
                  Action where possible.
                </span>
              </h2>
            </div>

            <p className="max-w-lg text-lg leading-8 text-[#68766e] lg:justify-self-end">
              Effective community support begins by understanding the situation
              rather than assuming that every person or community needs the
              same response.
            </p>
          </div>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <StaggerItem key={step.title} className="h-full">
                <div className="group relative flex h-full min-h-[280px] flex-col rounded-[24px] border border-[#dfe8e2] bg-[#f8faf8] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#bdd8c7] hover:bg-white hover:shadow-[0_14px_35px_rgba(20,50,35,0.07)]">
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