"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  Camera,
  ChevronRight,
  Heart,
  Users,
} from "lucide-react";

export default function GalleryHero() {
  return (
    <section className="relative overflow-hidden bg-[#073b29]">
      {/* Background treatment */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#073b29] via-[#08452f] to-[#052c1f]" />

      <div className="pointer-events-none absolute -right-44 -top-52 h-[620px] w-[620px] rounded-full border border-white/[0.07]" />

      <div className="pointer-events-none absolute right-24 top-20 h-[300px] w-[300px] rounded-full border border-white/[0.06]" />

      <div className="pointer-events-none absolute -bottom-64 left-[25%] h-[500px] w-[500px] rounded-full border border-white/[0.05]" />

      <div className="relative z-10 mx-auto grid min-h-[540px] max-w-7xl gap-12 px-6 pb-20 pt-40 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:pt-44">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.75,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <div className="mb-8 flex items-center gap-2 text-sm text-white/55">
            <Link
              href="/"
              className="transition-colors duration-300 hover:text-white"
            >
              Home
            </Link>

            <ChevronRight size={14} />

            <span className="text-white">Gallery</span>
          </div>

          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#72dda0]">
            Our Gallery
          </p>

          <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-[68px]">
            Moments from our work and{" "}
            <span className="text-[#72dda0]">
              communities.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65">
            A visual look at Sangbe Foundation&apos;s activities, community
            engagements, outreach, and the people at the heart of our work.
          </p>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="hidden lg:block"
        >
          <div className="relative ml-auto max-w-[420px] rounded-[32px] border border-white/10 bg-white/[0.07] p-8 backdrop-blur-sm">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1da85a]">
              <Camera size={29} className="text-white" />
            </div>

            <p className="mt-9 text-xs font-bold uppercase tracking-[0.22em] text-[#72dda0]">
              People • Community • Impact
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.03em] text-white">
              Every photograph tells part of our story.
            </h2>

            <div className="mt-9 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/[0.07] p-5">
                <Users size={21} className="text-[#72dda0]" />

                <p className="mt-4 text-sm font-semibold text-white">
                  Community
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.07] p-5">
                <Heart size={21} className="text-[#72dda0]" />

                <p className="mt-4 text-sm font-semibold text-white">
                  Impact
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}