import Link from "next/link";

import {
  ArrowRight,
  HeartHandshake,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";

export default function CommunityCTA() {
  return (
    <section className="bg-white px-6 pb-24 pt-4 lg:px-8 lg:pb-28 lg:pt-6">
      <Reveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#eaf7ef] px-8 py-14 md:px-14 lg:px-20 lg:py-16">
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border border-[#19944f]/10" />

          <div className="pointer-events-none absolute -bottom-36 right-24 h-64 w-64 rounded-full border border-[#19944f]/10" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#19944f]">
                <HeartHandshake size={26} className="text-white" />
              </div>

              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
                Help Us Support Others
              </p>

              <h2 className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
                Your support can help us reach{" "}
                <span className="text-[#19944f]">
                  more people and communities.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-[#68766e]">
                Through donations, volunteering, and partnerships, you can
                contribute to our efforts to support people facing difficult
                circumstances.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/donate"
                className="group inline-flex min-w-[200px] items-center justify-center gap-3 rounded-xl bg-[#19944f] px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#168545]"
              >
                Support Our Work

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/volunteer"
                className="inline-flex min-w-[200px] items-center justify-center rounded-xl border border-[#b7d9c3] bg-white px-7 py-4 font-semibold text-[#176e3d] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#19944f]"
              >
                Become a Volunteer
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}