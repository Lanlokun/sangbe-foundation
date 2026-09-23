import Image from "next/image";

import {
  HeartHandshake,
  HandHeart,
  Users,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";

export default function EverydaySupport() {
  return (
    <section
      id="community-support"
      className="scroll-mt-24 bg-white py-24 lg:py-28"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:px-8">
        {/* Content */}
        <Reveal>
          <div>
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf7ef]">
              <HandHeart size={26} className="text-[#19944f]" />
            </div>

            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
              Supporting Everyday Needs
            </p>

            <h2 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
              Practical help grounded in{" "}
              <span className="text-[#19944f]">
                compassion and community.
              </span>
            </h2>

            <p className="mt-7 max-w-xl text-lg leading-8 text-[#68766e]">
              Difficult circumstances can affect people in many different
              ways. Sometimes what is needed most is practical assistance,
              someone willing to listen, or a community ready to respond.
            </p>

            <p className="mt-5 max-w-xl text-lg leading-8 text-[#68766e]">
              Sangbe Foundation&apos;s community assistance work is centered on
              understanding those needs and providing support where our
              resources and capacity allow us to make a meaningful difference.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-4 rounded-2xl border border-[#dfe8e2] bg-[#f8faf8] p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf7ef]">
                  <HeartHandshake
                    size={20}
                    className="text-[#19944f]"
                  />
                </div>

                <div>
                  <p className="font-bold text-[#142019]">
                    Compassionate Support
                  </p>

                  <p className="mt-1 text-sm text-[#78867e]">
                    People come first
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl border border-[#dfe8e2] bg-[#f8faf8] p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eaf7ef]">
                  <Users size={20} className="text-[#19944f]" />
                </div>

                <div>
                  <p className="font-bold text-[#142019]">
                    Community Focus
                  </p>

                  <p className="mt-1 text-sm text-[#78867e]">
                    Working together
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Image */}
        <Reveal delay={0.1}>
          <div className="relative pb-8">
            <div className="group relative aspect-[4/4.5] overflow-hidden rounded-[30px] bg-[#eaf1ec]">
              <Image
                src="/images/disaster-relief/communitysupport.png"
                alt="Sangbe Foundation providing community assistance"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                sizes="(max-width: 1024px) 100vw, 46vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#073b29]/35 via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-0 left-6 rounded-[20px] bg-[#073b29] px-7 py-5 shadow-[0_20px_45px_rgba(7,59,41,0.20)] sm:left-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#72dda0]">
                Community First
              </p>

              <p className="mt-2 font-semibold text-white">
                Listen • Understand • Support
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}