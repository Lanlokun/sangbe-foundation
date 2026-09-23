"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowDown,
  ChevronRight,
  HandHeart,
  HeartHandshake,
} from "lucide-react";

export default function RequestHelpHero() {
  return (
    <section className="relative overflow-hidden bg-[#073b29]">
      <Image
        src="/images/contact/helpbg.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Image treatment */}
      <div className="absolute inset-0 bg-[#073b29]/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#052f21]/95 via-[#073b29]/65 to-[#073b29]/20" />

      {/* Decorative details */}
      <div className="pointer-events-none absolute -right-40 -top-48 h-[560px] w-[560px] rounded-full border border-white/[0.06]" />
      <div className="pointer-events-none absolute right-20 top-20 h-[280px] w-[280px] rounded-full border border-white/[0.05]" />

      <div className="relative z-10 mx-auto flex min-h-[540px] max-w-7xl items-center px-6 pb-20 pt-40 lg:px-8 lg:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-[720px]"
        >
          <div className="mb-8 flex items-center gap-2 text-sm text-white/55">
            <Link
              href="/"
              className="transition-colors hover:text-white"
            >
              Home
            </Link>

            <ChevronRight size={14} />

            <span className="text-white">Request Help</span>
          </div>

          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#72dda0]">
            Request Assistance
          </p>

          <h1 className="text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-[68px]">
            You don&apos;t have to face{" "}
            <span className="text-[#72dda0]">
              difficult moments alone.
            </span>
          </h1>

          <p className="mt-7 max-w-[650px] text-lg leading-8 text-white/70">
            If you, your family, or your community is facing a difficult
            situation, you can tell us about the assistance needed through the
            form below.
          </p>

          <a
            href="#request-form"
            className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-[#1eaa5b] px-6 py-3.5 font-semibold text-white transition hover:bg-[#18944e]"
          >
            Request Assistance
            <ArrowDown
              size={17}
              className="transition-transform group-hover:translate-y-1"
            />
          </a>

          <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/55">
            <div className="flex items-center gap-2">
              <HandHeart size={17} className="text-[#72dda0]" />
              Requests reviewed with care
            </div>

            <div className="flex items-center gap-2">
              <HeartHandshake size={17} className="text-[#72dda0]" />
              Community-focused support
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}