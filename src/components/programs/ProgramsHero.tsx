"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  ChevronRight,
} from "lucide-react";

export default function ProgramsHero() {
  return (
    <section className="relative min-h-[620px] overflow-hidden bg-[#073b29]">
      {/* Background */}
      <Image
        src="/images/programs/programs.png"
        alt="Young people participating in a Sangbe Foundation community program"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-[#052f20]/45" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#052f20]/95 via-[#073b29]/65 to-[#073b29]/10" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#052f20]/45 via-transparent to-[#052f20]/10" />

      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-40 -top-48 h-[520px] w-[520px] rounded-full border border-white/10" />

      <div className="pointer-events-none absolute -right-8 -top-16 h-[300px] w-[300px] rounded-full border border-white/10" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[620px] max-w-7xl items-center px-6 pb-20 pt-40 lg:px-8 lg:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-3xl"
        >
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-white/60">
            <Link
              href="/"
              className="transition-colors duration-300 hover:text-white"
            >
              Home
            </Link>

            <ChevronRight size={14} />

            <span className="text-white">Programs</span>
          </div>

          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#72dda0]">
            Programs & Projects
          </p>

          <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-[72px]">
            Creating real change{" "}
            <span className="text-[#72dda0]">
              in our communities.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/75">
            Our programs respond to challenges affecting people and communities
            through awareness, practical support, emergency response, and
            community-focused action.
          </p>

          <div className="mt-9">
            <a
              href="#program-areas"
              className="group inline-flex items-center gap-3 rounded-xl bg-[#1eaa5b] px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#178f4c] hover:shadow-[0_12px_30px_rgba(0,0,0,0.16)]"
            >
              Explore Our Programs

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}