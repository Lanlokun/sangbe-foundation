import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
  ShieldCheck,
  HandHeart,
  Users,
} from "lucide-react";
import { Stagger, StaggerItem } from "@/components/ui/Stagger";

const impactItems = [
  {
    number: "01",
    title: "Young People",
    description: "Education and prevention",
    icon: Users,
  },
  {
    number: "02",
    title: "Awareness",
    description: "Knowledge that protects",
    icon: ShieldCheck,
  },
  {
    number: "03",
    title: "Support",
    description: "Help when it matters",
    icon: HandHeart,
  },
];

export default function ImpactSection() {
  return (
    <section className="relative overflow-hidden bg-[#073b29] py-24 lg:py-32">
      {/* Decoration */}
      <div className="pointer-events-none absolute -right-32 -top-40 h-[480px] w-[480px] rounded-full border border-white/[0.06]" />
      <div className="pointer-events-none absolute -bottom-64 left-[35%] h-[520px] w-[520px] rounded-full border border-white/[0.06]" />

      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <div>
          <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1daa5b]">
            <HeartHandshake size={26} className="text-white" />
          </div>

          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#70dfa2]">
            Why Our Work Matters
          </p>

          <h2 className="max-w-xl text-4xl font-bold leading-[1.07] tracking-tight text-white lg:text-5xl">
            Change begins when people have{" "}
            <span className="text-[#70dfa2]">
              support and opportunity.
            </span>
          </h2>

          <p className="mt-7 max-w-xl text-lg leading-8 text-white/65">
            Our work focuses on helping people understand the risks of drug
            abuse, supporting those facing difficult circumstances, and
            strengthening communities through practical action.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link
              href="/volunteer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#20ad60] px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#19964f]"
            >
              Get Involved
              <ArrowRight size={18} />
            </Link>

            <Link
              href="/donate"
              className="inline-flex items-center rounded-xl border border-white/25 px-7 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/10"
            >
              Support Our Work
            </Link>
          </div>
        </div>

        <Stagger className="space-y-5">
          {impactItems.map((item) => {
            const Icon = item.icon;

            return (
              <StaggerItem key={item.title}>
                <div className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.07] p-5 transition-all duration-300 hover:-translate-x-1 hover:bg-white/[0.1]">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/[0.09]">
                    <Icon size={27} className="text-[#70dfa2]" />
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/55">
                      {item.description}
                    </p>
                  </div>

                  <span className="ml-auto self-start pt-1 text-xs text-white/30">
                    {item.number}
                  </span>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}