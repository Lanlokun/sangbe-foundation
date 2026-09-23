import Link from "next/link";
import {
  ArrowRight,
  Mail,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";

export default function PartnershipCTA() {
  return (
    <section
      id="partner-with-us"
      className="scroll-mt-24 bg-[#eef6f1] py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-[#0a432f] px-7 py-14 sm:px-10 lg:px-14 lg:py-16">
            <div className="pointer-events-none absolute -right-28 -top-36 h-[420px] w-[420px] rounded-full border border-white/[0.06]" />
            <div className="pointer-events-none absolute -bottom-44 right-40 h-[350px] w-[350px] rounded-full border border-white/[0.05]" />

            <div className="relative z-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/[0.09]">
                  <Mail
                    size={22}
                    className="text-[#72dda0]"
                  />
                </div>

                <p className="mt-7 text-xs font-bold uppercase tracking-[0.25em] text-[#72dda0]">
                  Partner With Sangbe Foundation
                </p>

                <h2 className="mt-4 max-w-3xl text-3xl font-bold leading-tight tracking-[-0.03em] text-white sm:text-4xl lg:text-[46px]">
                  Have an idea for how we can create impact together?
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-7 text-white/65">
                  Tell us about your organization, initiative, or proposed
                  collaboration and our team can continue the conversation
                  with you.
                </p>
              </div>

              <Link
                href="/contact"
                className="group inline-flex w-fit items-center gap-3 rounded-xl bg-[#1eaa5b] px-7 py-4 font-semibold text-white transition hover:bg-[#23b862]"
              >
                Start a Conversation

                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}