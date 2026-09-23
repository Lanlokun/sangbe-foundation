import {
  ArrowRight,
  Sprout,
  Users,
  HeartHandshake,
} from "lucide-react";
import Link from "next/link";

import Reveal from "@/components/ui/Reveal";
import {
  Stagger,
  StaggerItem,
} from "@/components/ui/Stagger";

const recoveryPoints = [
  {
    icon: HeartHandshake,
    title: "Beyond Immediate Relief",
    description:
      "Emergency assistance is important, but communities may continue facing challenges after the immediate crisis has passed.",
  },
  {
    icon: Users,
    title: "Community Participation",
    description:
      "Recovery is stronger when affected people and communities are part of identifying needs and shaping the way forward.",
  },
];

export default function RecoverySection() {
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <Reveal>
          <div>
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf7ef]">
              <Sprout size={26} className="text-[#19944f]" />
            </div>

            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
              Recovery & Resilience
            </p>

            <h2 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
              Recovery continues after the{" "}
              <span className="text-[#19944f]">
                immediate emergency.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-[#68766e]">
              Responding to an emergency is about more than the first moment of
              assistance. Communities may need time, cooperation, and continued
              support as everyday life begins to return.
            </p>

            <Link
              href="/programs"
              className="group mt-8 inline-flex items-center gap-3 font-semibold text-[#178f4c]"
            >
              Explore Our Programs

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>

        <Stagger className="space-y-5">
          {recoveryPoints.map((point, index) => {
            const Icon = point.icon;

            return (
              <StaggerItem key={point.title}>
                <div className="group flex gap-5 rounded-[24px] border border-[#dfe8e2] bg-[#f8faf8] p-7 transition-all duration-300 hover:-translate-x-1 hover:border-[#bdd8c7] hover:bg-white hover:shadow-[0_12px_30px_rgba(20,50,35,0.06)]">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#eaf7ef] transition-colors duration-300 group-hover:bg-[#19944f]">
                    <Icon
                      size={24}
                      className="text-[#19944f] transition-colors duration-300 group-hover:text-white"
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="text-xl font-bold text-[#142019]">
                        {point.title}
                      </h3>

                      <span className="text-xs font-bold text-[#b0bbb4]">
                        0{index + 1}
                      </span>
                    </div>

                    <p className="mt-3 text-sm leading-7 text-[#68766e]">
                      {point.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}