"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  CalendarDays,
  ChevronRight,
  MapPin,
  Users,
} from "lucide-react";

export default function EventsHero() {
  return (
    <section className="relative overflow-hidden bg-[#073b29]">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -right-40 -top-52 h-[650px] w-[650px] rounded-full border border-white/[0.07]" />
      <div className="pointer-events-none absolute right-24 top-20 h-[330px] w-[330px] rounded-full border border-white/[0.06]" />
      <div className="pointer-events-none absolute -bottom-56 left-[35%] h-[520px] w-[520px] rounded-full border border-white/[0.05]" />

      <div className="absolute inset-0 bg-gradient-to-br from-[#073b29] via-[#08452f] to-[#052c1f]" />

      <div className="relative z-10 mx-auto grid min-h-[610px] max-w-7xl gap-14 px-6 pb-20 pt-40 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
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

            <span className="text-white">Events</span>
          </div>

          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#72dda0]">
            Events & Activities
          </p>

          <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-[68px]">
            Bringing people together for{" "}
            <span className="text-[#72dda0]">
              positive change.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65">
            Discover Sangbe Foundation activities, community engagements,
            awareness initiatives, and opportunities to participate.
          </p>

          <a
            href="#upcoming-events"
            className="group mt-9 inline-flex items-center gap-3 rounded-xl bg-[#1eaa5b] px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#178f4c]"
          >
            Explore Events

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </motion.div>

        {/* Visual panel */}
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
          <div className="relative ml-auto max-w-[440px] rounded-[32px] border border-white/10 bg-white/[0.07] p-8 backdrop-blur-sm">
            <div className="mb-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1da85a]">
              <CalendarDays size={29} className="text-white" />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#72dda0]">
              Connect • Participate • Serve
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.03em] text-white">
              Community begins when people come together.
            </h2>

            <div className="mt-9 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/[0.07] p-5">
                <Users size={21} className="text-[#72dda0]" />
                <p className="mt-4 text-sm font-semibold text-white">
                  Community
                </p>
              </div>

              <div className="rounded-2xl bg-white/[0.07] p-5">
                <MapPin size={21} className="text-[#72dda0]" />
                <p className="mt-4 text-sm font-semibold text-white">
                  The Gambia
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}