import Link from "next/link";

import {
  ArrowRight,
  HeartHandshake,
  MessageCircleHeart,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";

export default function SupportSection() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-[#073b29] px-8 py-14 md:px-14 lg:px-16 lg:py-16">
            {/* Decoration */}
            <div className="pointer-events-none absolute -right-24 -top-40 h-[400px] w-[400px] rounded-full border border-white/[0.07]" />

            <div className="pointer-events-none absolute -bottom-52 right-[20%] h-[380px] w-[380px] rounded-full border border-white/[0.06]" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#1da85a]">
                  <MessageCircleHeart
                    size={26}
                    className="text-white"
                  />
                </div>

                <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#72dda0]">
                  Looking for Support?
                </p>

                <h2 className="max-w-2xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white lg:text-5xl">
                  Asking for help can be an{" "}
                  <span className="text-[#72dda0]">
                    important first step.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-base leading-7 text-white/65">
                  If you or someone you know is facing a difficult situation
                  and would like to reach out to Sangbe Foundation, you can
                  submit a request through our support form.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/request-help"
                  className="group inline-flex min-w-[200px] items-center justify-center gap-3 rounded-xl bg-[#1eaa5b] px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#19944f]"
                >
                  Request Help

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex min-w-[200px] items-center justify-center rounded-xl border border-white/25 bg-white/[0.05] px-7 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/10"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            <div className="relative z-10 mt-10 flex max-w-2xl items-start gap-3 border-t border-white/10 pt-6">
              <HeartHandshake
                size={18}
                className="mt-0.5 shrink-0 text-[#72dda0]"
              />

              <p className="text-xs leading-5 text-white/45">
                Sangbe Foundation&apos;s website should not be used for medical
                emergencies. Where urgent medical attention is required, seek
                appropriate emergency or healthcare assistance.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}