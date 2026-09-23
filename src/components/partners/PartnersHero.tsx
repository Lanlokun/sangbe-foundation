"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowDown,
  ChevronRight,
  Handshake,
  Users,
} from "lucide-react";

export default function PartnersHero() {
  return (
    <section className="relative overflow-hidden bg-[#073b29]">
      <Image
        src="/images/partners/partnersbg.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-[#073b29]/42" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#052f21]/95 via-[#073b29]/72 to-[#073b29]/15" />

      <div className="pointer-events-none absolute -right-40 -top-48 h-[580px] w-[580px] rounded-full border border-white/[0.06]" />
      <div className="pointer-events-none absolute right-24 top-20 h-[280px] w-[280px] rounded-full border border-white/[0.05]" />

      <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-6 pb-20 pt-40 lg:px-8 lg:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-[750px]"
        >
          <div className="mb-8 flex items-center gap-2 text-sm text-white/55">
            <Link
              href="/"
              className="transition-colors hover:text-white"
            >
              Home
            </Link>

            <ChevronRight size={14} />

            <span className="text-white">
              Partners
            </span>
          </div>

          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#72dda0]">
            Partnerships & Collaboration
          </p>

          <h1 className="text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-[68px]">
            Stronger impact through{" "}
            <span className="text-[#72dda0]">
              collaboration.
            </span>
          </h1>

          <p className="mt-7 max-w-[650px] text-lg leading-8 text-white/70">
            We work with organizations, institutions, businesses, and
            individuals who share our commitment to stronger and healthier
            communities.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#partner-with-us"
              className="group inline-flex items-center gap-3 rounded-xl bg-[#1eaa5b] px-6 py-3.5 font-semibold text-white transition hover:bg-[#18944e]"
            >
              Partner With Us

              <ArrowDown
                size={17}
                className="transition-transform group-hover:translate-y-1"
              />
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-3 rounded-xl border border-white/20 bg-white/[0.08] px-6 py-3.5 font-semibold text-white backdrop-blur-sm transition hover:bg-white/[0.14]"
            >
              Contact Us
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <Handshake
                size={17}
                className="text-[#72dda0]"
              />
              Shared purpose
            </div>

            <div className="flex items-center gap-2">
              <Users
                size={17}
                className="text-[#72dda0]"
              />
              Community impact
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}