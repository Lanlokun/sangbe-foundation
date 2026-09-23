import Image from "next/image";
import {
  BadgeCheck,
  CalendarDays,
  MapPin,
} from "lucide-react";

import Reveal from "@/components/ui/Reveal";

export default function OurStory() {
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:gap-20 lg:px-8">
        {/* Story content */}
        <Reveal>
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
              Our Story
            </p>

            <h2 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-[#142019] lg:text-5xl">
              Rooted in community.{" "}
              <span className="text-[#19944f]">
                Driven by the desire to help.
              </span>
            </h2>

            <p className="mt-7 text-lg leading-8 text-[#68766e]">
              Sangbe Foundation was established in 2019 with a commitment to
              supporting people and communities facing social and economic
              challenges.
            </p>

            <p className="mt-5 text-lg leading-8 text-[#68766e]">
              Based in Busumbala in The Gambia&apos;s West Coast Region, the
              Foundation works in areas that directly affect the wellbeing of
              communities, including drug abuse awareness and prevention,
              assistance for vulnerable people, disaster response, and
              community support.
            </p>

            <p className="mt-5 text-lg leading-8 text-[#68766e]">
              Our approach is centered on practical action: listening to
              communities, understanding their needs, raising awareness, and
              providing support where it can make a meaningful difference.
            </p>

            {/* Foundation facts */}
            <div className="mt-9 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-[#dfe8e2] bg-[#f8faf8] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#bdd8c7] hover:shadow-[0_10px_25px_rgba(20,50,35,0.06)]">
                <CalendarDays
                  size={21}
                  className="mb-4 text-[#19944f]"
                />

                <p className="font-bold text-[#142019]">2019</p>

                <p className="mt-1 text-sm text-[#78867e]">
                  Established
                </p>
              </div>

              <div className="rounded-2xl border border-[#dfe8e2] bg-[#f8faf8] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#bdd8c7] hover:shadow-[0_10px_25px_rgba(20,50,35,0.06)]">
                <MapPin
                  size={21}
                  className="mb-4 text-[#19944f]"
                />

                <p className="font-bold text-[#142019]">
                  Busumbala
                </p>

                <p className="mt-1 text-sm text-[#78867e]">
                  West Coast Region
                </p>
              </div>

              <div className="rounded-2xl border border-[#dfe8e2] bg-[#f8faf8] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#bdd8c7] hover:shadow-[0_10px_25px_rgba(20,50,35,0.06)]">
                <BadgeCheck
                  size={21}
                  className="mb-4 text-[#19944f]"
                />

                <p className="font-bold text-[#142019]">NGO</p>

                <p className="mt-1 text-sm text-[#78867e]">
                  Registered
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Story image */}
        <Reveal delay={0.1}>
          <div className="relative pb-8">
            <div className="group relative aspect-[4/4.7] overflow-hidden rounded-[30px] bg-[#eaf1ec]">
              <Image
                src="/images/about/story.png"
                alt="Sangbe Foundation engaging with members of the community"
                fill
                className="object-cover object-[center_38%] transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                sizes="(max-width: 1024px) 100vw, 45vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#073b29]/25 via-transparent to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute bottom-0 left-6 rounded-[20px] bg-[#073b29] px-7 py-5 shadow-[0_20px_45px_rgba(7,59,41,0.20)] sm:left-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#72dda0]">
                Our Foundation
              </p>

              <p className="mt-2 font-semibold text-white">
                Community • Hope • Change
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}