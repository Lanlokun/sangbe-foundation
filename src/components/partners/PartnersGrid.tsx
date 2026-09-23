import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Handshake,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";

export default function PartnersGrid() {
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
                Our Network
              </p>

              <h2 className="max-w-lg text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
                Partners &{" "}
                <span className="text-[#19944f]">
                  supporters.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-lg leading-8 text-[#68766e]">
                Collaboration helps extend the reach and effectiveness of
                community initiatives. We value the institutions,
                organizations, businesses, and individuals who contribute to
                this work.
              </p>
            </div>

            <div className="rounded-[28px] border border-[#dce7df] bg-[#f7faf8] p-8 sm:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e1f5e8]">
                <Building2
                  size={25}
                  className="text-[#19944f]"
                />
              </div>

              <h3 className="mt-7 text-2xl font-bold tracking-[-0.02em] text-[#142019]">
                Our partner network is growing.
              </h3>

              <p className="mt-4 max-w-xl text-base leading-7 text-[#68766e]">
                Confirmed partner organizations and supporters will be
                featured here as our partnership directory is updated.
              </p>

              <div className="mt-7 border-t border-[#dde7e0] pt-7">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 font-semibold text-[#178f4c]"
                >
                  Explore collaboration with us

                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <div className="mt-14 flex flex-col gap-6 rounded-[26px] bg-[#073b29] p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10">
            <div className="flex items-start gap-5">
              <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.09] sm:flex">
                <Handshake
                  size={23}
                  className="text-[#72dda0]"
                />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#72dda0]">
                  Already Supporting Our Work?
                </p>

                <h3 className="mt-3 text-2xl font-bold text-white">
                  Help us keep our partnership information current.
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
                  Existing collaborators can contact our team regarding
                  partnership information, organizational details, and future
                  activities.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="shrink-0 rounded-xl border border-white/15 bg-white/[0.08] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.14]"
            >
              Contact Our Team
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}