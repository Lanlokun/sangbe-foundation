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
    <section className="bg-[#f5f8f6] py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        {/* Image */}
        <div className="relative pb-12">
          <div className="group relative aspect-[1/1.02] overflow-hidden rounded-[32px]">
            <Image
              src="/images/awareness/outreach.png"
              alt="Sangbe Foundation community outreach"
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#063b27]/60 via-transparent to-transparent" />

            <p className="absolute left-10 top-8 text-sm font-bold uppercase tracking-[0.25em] text-[#6be09e]">
              Since 2019
            </p>

            {/* Stats */}
            <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-3">
              <div className="rounded-2xl border border-white/10 bg-[#063b27]/85 p-5 text-white backdrop-blur-sm">
                <CalendarDays className="mb-6 text-[#6be09e]" size={22} />
                <p className="font-bold">2019</p>
                <p className="mt-1 text-xs text-white/60">Established</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#063b27]/85 p-5 text-white backdrop-blur-sm">
                <MapPin className="mb-6 text-[#6be09e]" size={22} />
                <p className="font-bold">Busumbala</p>
                <p className="mt-1 text-xs text-white/60">
                  West Coast Region
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#063b27]/85 p-5 text-white backdrop-blur-sm">
                <BadgeCheck className="mb-6 text-[#6be09e]" size={22} />
                <p className="font-bold">NGO</p>
                <p className="mt-1 text-xs text-white/60">Registered</p>
              </div>
            </div>
          </div>

          {/* Floating card */}
          <div className="absolute bottom-0 right-8 rounded-2xl bg-white px-8 py-5 shadow-[0_20px_45px_rgba(10,45,30,0.12)]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#178f4c]">
              Our Commitment
            </p>

            <p className="mt-2 font-bold text-[#142019]">
              Community • Hope • Change
            </p>
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
            About Sangbe Foundation
          </p>

          <h2 className="max-w-xl text-4xl font-bold leading-[1.08] tracking-tight text-[#142019] lg:text-5xl">
            Creating healthier and stronger communities.
          </h2>

          <p className="mt-8 text-lg leading-8 text-[#68766e]">
            Sangbe Foundation is a registered NGO established in 2019 and based
            in Busumbala, West Coast Region, The Gambia.
          </p>

          <p className="mt-6 text-lg leading-8 text-[#68766e]">
            We work to fight drug abuse and support people and communities
            facing difficult circumstances. Our work includes drug abuse
            awareness, support for vulnerable people, disaster response, and
            assistance to communities in need.
          </p>

          <div className="my-8 h-px bg-[#dce5df]" />

          <div className="border-l-4 border-[#1ba257] py-1 pl-6">
            <p className="text-lg leading-8 text-[#34483d]">
              Building a future where communities have the support, knowledge,
              and opportunities they need to thrive.
            </p>
          </div>

          <Link
            href="/about"
            className="mt-9 inline-flex items-center gap-3 rounded-xl bg-[#19964f] px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#148545] hover:shadow-lg"
          >
            Learn More About Us
            <ArrowRight size={19} />
          </Link>
        </div>
      </div>
    </section>
  );
}