import Link from "next/link";

import {
  ArrowRight,
  Users,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";

export default function EventsCTA() {
  return (
    <section className="bg-white px-6 pb-24 pt-8 lg:px-8 lg:pb-28 lg:pt-10">
      <Reveal>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#eaf7ef] px-8 py-14 md:px-14 lg:px-20 lg:py-16">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-20 -top-32 h-80 w-80 rounded-full border border-[#19944f]/10" />

          <div className="pointer-events-none absolute -bottom-36 right-24 h-64 w-64 rounded-full border border-[#19944f]/10" />

          <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
            {/* Content */}
            <div>
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#19944f]">
                <Users
                  size={26}
                  className="text-white"
                />
              </div>

              <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
                Get Involved
              </p>

              <h2 className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
                Be part of the activities creating{" "}
                <span className="text-[#19944f]">
                  positive change.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-[#68766e]">
                Volunteer with Sangbe Foundation, partner with us, or support
                our work as we continue engaging people and communities.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href="/volunteer"
                className="group inline-flex min-w-[200px] items-center justify-center gap-3 rounded-xl bg-[#19944f] px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#168545] hover:shadow-[0_12px_28px_rgba(25,148,79,0.20)]"
              >
                Become a Volunteer

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                href="/contact"
                className="inline-flex min-w-[200px] items-center justify-center rounded-xl border border-[#b7d9c3] bg-white px-7 py-4 font-semibold text-[#176e3d] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#19944f] hover:shadow-[0_10px_25px_rgba(20,50,35,0.06)]"
              >
                Partner With Us
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}