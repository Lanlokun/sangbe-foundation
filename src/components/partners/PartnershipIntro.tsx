import {
  Handshake,
  Network,
  Target,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";
import {
  Stagger,
  StaggerItem,
} from "@/components/ui/Stagger";

const principles = [
  {
    icon: Target,
    title: "Shared Purpose",
    description:
      "We seek partnerships built around clear objectives and meaningful outcomes for communities.",
  },
  {
    icon: Network,
    title: "Local Connection",
    description:
      "Our community relationships help partnerships remain grounded in real needs and local realities.",
  },
  {
    icon: Handshake,
    title: "Long-Term Value",
    description:
      "We value collaboration that strengthens capacity and creates impact beyond a single activity.",
  },
];

export default function PartnershipIntro() {
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Reveal>
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
                Working Together
              </p>

              <h2 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
                Partnership makes greater{" "}
                <span className="text-[#19944f]">
                  impact possible.
                </span>
              </h2>

              <p className="mt-7 max-w-xl text-lg leading-8 text-[#68766e]">
                Sustainable community work requires collaboration. Sangbe
                Foundation welcomes opportunities to work with organizations
                and individuals whose resources, expertise, networks, or
                ideas can strengthen the communities we serve.
              </p>

              <p className="mt-5 max-w-xl text-base leading-7 text-[#68766e]">
                From community initiatives and awareness activities to
                emergency support and institutional collaboration, we believe
                the strongest partnerships are built around shared goals and
                practical action.
              </p>
            </div>
          </Reveal>

          <Stagger className="grid gap-4">
            {principles.map((item) => {
              const Icon = item.icon;

              return (
                <StaggerItem key={item.title}>
                  <div className="group flex gap-5 rounded-[22px] border border-[#e1e9e3] bg-[#f8faf8] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#c6dfcf] hover:bg-white hover:shadow-[0_15px_40px_rgba(20,50,35,0.06)]">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e4f6ea] transition group-hover:bg-[#d8f2e1]">
                      <Icon
                        size={22}
                        className="text-[#19944f]"
                      />
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-[#142019]">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-[#68766e]">
                        {item.description}
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