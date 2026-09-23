import Image from "next/image";
import {
  HeartHandshake,
  Home,
  Users,
  LifeBuoy,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";

export default function EmergencyResponse() {
  return (
    <section
      id="response"
      className="scroll-mt-24 bg-white py-24 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
        {/* Image */}
        <Reveal>
          <div className="relative pb-8">
            <div className="group relative aspect-[4/4.4] overflow-hidden rounded-[30px] bg-[#eaf1ec]">
              <Image
                src="/images/disaster-relief/flood.png"
                alt="Sangbe Foundation supporting a community affected by flooding"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#073b29]/40 via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-0 left-6 rounded-[20px] bg-[#073b29] px-7 py-5 shadow-[0_20px_45px_rgba(7,59,41,0.20)] sm:left-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#72dda0]">
                When Help Matters
              </p>

              <p className="mt-2 font-semibold text-white">
                Respond • Support • Recover
              </p>
            </div>
          </div>
        </Reveal>

        {/* Content */}
        <Reveal delay={0.1}>
          <div>
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf7ef]">
              <LifeBuoy size={26} className="text-[#19944f]" />
            </div>

            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
              Emergency Response
            </p>

            <h2 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
              Helping communities through{" "}
              <span className="text-[#19944f]">
                difficult moments.
              </span>
            </h2>

            <p className="mt-7 text-lg leading-8 text-[#68766e]">
              Flooding and other emergencies can place sudden pressure on
              families and communities, affecting homes, essential belongings,
              livelihoods, and everyday life.
            </p>

            <p className="mt-5 text-lg leading-8 text-[#68766e]">
              Sangbe Foundation&apos;s disaster relief work focuses on
              responding to immediate community needs and helping affected
              people access practical assistance during difficult
              circumstances.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-4 rounded-2xl border border-[#dfe8e2] bg-[#f8faf8] p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf7ef]">
                  <Home size={20} className="text-[#19944f]" />
                </div>

                <div>
                  <p className="font-bold text-[#142019]">
                    Affected Families
                  </p>
                  <p className="mt-1 text-sm text-[#78867e]">
                    Practical assistance
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-[#dfe8e2] bg-[#f8faf8] p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf7ef]">
                  <Users size={20} className="text-[#19944f]" />
                </div>

                <div>
                  <p className="font-bold text-[#142019]">
                    Communities
                  </p>
                  <p className="mt-1 text-sm text-[#78867e]">
                    Collective response
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}