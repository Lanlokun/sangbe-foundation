import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  BadgeCheck,
} from "lucide-react";

export default function AboutPreview() {
  return (
    <section className="bg-[#f5f8f6] py-16 sm:py-20 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        {/* Visual */}
        <div>
          <div className="relative lg:pb-12">
            {/* Image */}
            <div className="group relative aspect-[4/4.15] overflow-hidden rounded-[24px] sm:rounded-[28px] lg:aspect-[1/1.02] lg:rounded-[32px]">
              <Image
                src="/images/awareness/outreach.png"
                alt="Sangbe Foundation community outreach"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#063b27]/45 via-transparent to-transparent" />

             <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-[#063b27]/75 px-4 py-2 backdrop-blur-md sm:left-8 sm:top-7 lg:left-10 lg:top-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#79e7aa] sm:text-xs">
                  Since 2019
                </p>
              </div>

              {/* Desktop stats */}
              <div className="absolute bottom-8 left-8 right-8 hidden grid-cols-3 gap-3 lg:grid">
                <StatCard
                  icon={<CalendarDays size={22} />}
                  value="10 April 2019"
                  label="Established"
                />

                <StatCard
                  icon={<MapPin size={22} />}
                  value="Busumbala"
                  label="West Coast Region"
                />

                <StatCard
                  icon={<BadgeCheck size={22} />}
                  value="NGO"
                  label="Registered"
                />
              </div>
            </div>

            {/* Mobile / tablet stats */}
            <div className="mt-3 grid gap-3 sm:grid-cols-3 lg:hidden">
              <MobileStatCard
                icon={<CalendarDays size={20} />}
                value="10 April 2019"
                label="Established"
              />

              <MobileStatCard
                icon={<MapPin size={20} />}
                value="Busumbala"
                label="West Coast Region"
              />

              <MobileStatCard
                icon={<BadgeCheck size={20} />}
                value="NGO"
                label="Registered"
              />
            </div>

            {/* Commitment card */}
            <div className="mt-3 rounded-[20px] bg-white px-5 py-5 shadow-[0_18px_40px_rgba(10,45,30,0.08)] sm:px-7 lg:absolute lg:bottom-0 lg:right-8 lg:mt-0 lg:px-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#178f4c] sm:text-xs">
                Our Commitment
              </p>

              <p className="mt-2 font-bold text-[#142019]">
                Community • Hope • Change
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.22em] text-[#178f4c] sm:mb-5 sm:tracking-[0.25em]">
            About Sangbe Foundation
          </p>

          <h2 className="max-w-xl text-[2.35rem] font-bold leading-[1.04] tracking-[-0.035em] text-[#142019] sm:text-4xl lg:text-5xl lg:leading-[1.08]">
            Creating healthier and stronger communities.
          </h2>

          <p className="mt-6 text-base leading-7 text-[#68766e] sm:mt-8 sm:text-lg sm:leading-8">
            Sangbe Foundation is a registered NGO established on 10 April 2019
            and based in Busumbala, West Coast Region, The Gambia.
          </p>

          <p className="mt-5 text-base leading-7 text-[#68766e] sm:mt-6 sm:text-lg sm:leading-8">
            We work to fight drug abuse and support people and communities
            facing difficult circumstances. Our work includes drug abuse
            awareness, support for vulnerable people, disaster response, and
            assistance to communities in need.
          </p>

          <div className="my-7 h-px bg-[#dce5df] sm:my-8" />

          <div className="border-l-4 border-[#1ba257] py-1 pl-5 sm:pl-6">
            <p className="text-base leading-7 text-[#34483d] sm:text-lg sm:leading-8">
              Building a future where communities have the support, knowledge,
              and opportunities they need to thrive.
            </p>
          </div>

          <Link
            href="/about"
            className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#19964f] px-6 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#148545] hover:shadow-lg sm:mt-9 sm:w-auto sm:px-7"
          >
            Learn More About Us
            <ArrowRight size={19} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------
   Desktop Stat Card
------------------------------------------------------- */

function StatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-white/10 bg-[#063b27]/85 p-5 text-white backdrop-blur-sm">
      <div className="mb-6 text-[#6be09e]">
        {icon}
      </div>

      <p className="break-words text-sm font-bold xl:text-base">
        {value}
      </p>

      <p className="mt-1 text-xs leading-5 text-white/60">
        {label}
      </p>
    </div>
  );
}

/* -------------------------------------------------------
   Mobile Stat Card
------------------------------------------------------- */

function MobileStatCard({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-[18px] bg-[#073b29] px-5 py-4 text-white">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#6be09e]">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="font-bold leading-5">
          {value}
        </p>

        <p className="mt-1 text-xs text-white/60">
          {label}
        </p>
      </div>
    </div>
  );
}