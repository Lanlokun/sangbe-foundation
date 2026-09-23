import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="bg-white px-6 pb-28 pt-10 lg:px-8 lg:pb-32 lg:pt-14">
      <div className="group relative mx-auto min-h-[440px] max-w-7xl overflow-hidden rounded-[32px]">
        <Image
          src="/images/team/together.png"
          alt="Sangbe Foundation working with communities in The Gambia"
          fill
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025]"
          sizes="(max-width: 1280px) 100vw, 1280px"
        />

        <div className="absolute inset-0 bg-[#063b27]/75" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#063b27]/60 via-[#063b27]/35 to-[#063b27]/55" />

        <div className="pointer-events-none absolute -left-24 -top-32 h-72 w-72 rounded-full border border-white/10" />

        <div className="pointer-events-none absolute -bottom-44 -right-20 h-96 w-96 rounded-full border border-white/10" />

        <div className="relative z-10 flex min-h-[440px] items-center justify-center px-6 py-16 text-center sm:px-10 lg:px-16">
          <div className="max-w-2xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#70dfa2]">
              Be Part of the Change
            </p>

            <h2 className="text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl">
              Together, we can build a{" "}
              <span className="text-[#70dfa2]">brighter future.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-white/75">
              Your support can help Sangbe Foundation continue reaching people,
              supporting communities, and creating positive change.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/donate"
                className="inline-flex min-w-[160px] items-center justify-center gap-2 rounded-xl bg-[#1eaa5b] px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#168b49]"
              >
                Donate Now
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/contact"
                className="inline-flex min-w-[160px] items-center justify-center rounded-xl border border-white/40 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}