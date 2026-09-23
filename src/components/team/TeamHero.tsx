"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ChevronRight, Users } from "lucide-react";

export default function TeamHero() {
  return (
    <section className="relative overflow-hidden bg-[#073b29]">
      {/* Background image */}
      <Image
        src="/images/team/teambg.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Image treatment */}
      <div className="absolute inset-0 bg-[#073b29]/30" />

      <div className="absolute inset-0 bg-gradient-to-r from-[#052f21]/95 via-[#073b29]/70 to-[#073b29]/10" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#052f21]/35 via-transparent to-[#052f21]/10" />

      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-44 -top-52 h-[620px] w-[620px] rounded-full border border-white/[0.06]" />

      <div className="pointer-events-none absolute right-24 top-20 h-[300px] w-[300px] rounded-full border border-white/[0.05]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[560px] max-w-7xl items-center px-6 pb-20 pt-40 lg:px-8 lg:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="max-w-[760px]"
        >
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-white/55">
            <Link
              href="/"
              className="transition-colors duration-300 hover:text-white"
            >
              Home
            </Link>

            <ChevronRight size={14} />

            <Link
              href="/about"
              className="transition-colors duration-300 hover:text-white"
            >
              About
            </Link>

            <ChevronRight size={14} />

            <span className="text-white">
              Our Team
            </span>
          </div>

          {/* Eyebrow */}
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.09] backdrop-blur-sm">
              <Users
                size={17}
                className="text-[#72dda0]"
              />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#72dda0]">
              Our Team
            </p>
          </div>

          {/* Heading */}
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-[68px]">
            Meet the people behind{" "}
            <span className="text-[#72dda0]">
              Sangbe Foundation.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-[640px] text-lg leading-8 text-white/70">
            A team united by service, collaboration, and a commitment to
            creating meaningful impact in the communities we serve.
          </p>

          {/* Small supporting line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: 0.35,
            }}
            className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/60"
          >
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#72dda0]" />
              Leadership
            </span>

            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#72dda0]" />
              Service
            </span>

            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#72dda0]" />
              Community
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}