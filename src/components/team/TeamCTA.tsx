import Link from "next/link";
import {
  ArrowRight,
  HeartHandshake,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";

export default function TeamCTA() {
  return (
    <section className="bg-[#eef6f1] py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-[#073b29] px-7 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="pointer-events-none absolute -right-32 -top-40 h-[440px] w-[440px] rounded-full border border-white/[0.06]" />
            <div className="pointer-events-none absolute -bottom-44 right-[30%] h-[340px] w-[340px] rounded-full border border-white/[0.05]" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.09]">
                  <HeartHandshake
                    size={23}
                    className="text-[#72dda0]"
                  />
                </div>

                <p className="mt-7 text-xs font-bold uppercase tracking-[0.25em] text-[#72dda0]">
                  Get Involved
                </p>

                <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-4xl lg:text-[46px]">
                  There are many ways to be part of our work.
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-7 text-white/65">
                  Contribute your time, skills, ideas, or resources and help
                  us strengthen the communities we serve.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/volunteer"
                  className="group inline-flex items-center gap-3 rounded-xl bg-[#1eaa5b] px-6 py-3.5 font-semibold text-white transition hover:bg-[#23b862]"
                >
                  Volunteer
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-xl border border-white/15 bg-white/[0.08] px-6 py-3.5 font-semibold text-white transition hover:bg-white/[0.14]"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}