"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowRight,
  HeartHandshake,
} from "lucide-react";

const headingVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.12,
    },
  },
};

const lineVariants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function Hero() {
  return (
    <section className="relative min-h-[760px] overflow-hidden bg-[#062f20] lg:min-h-screen">
      {/* Background */}
      <Image
        src="/images/hero/herobg.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#002f20]/95 via-[#003824]/70 to-[#003824]/10" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#002c1e]/50 via-transparent to-[#002c1e]/10" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl items-center px-6 pb-16 pt-40 lg:min-h-screen lg:px-8 lg:pb-20 lg:pt-44">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.6,
              delay: 0.05,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm text-white/90 backdrop-blur-sm">
              <HeartHandshake
                size={18}
              />

              <span>
                Mental Health Advocacy
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={headingVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl text-5xl font-bold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl xl:text-[82px]"
          >
            <motion.span
              variants={lineVariants}
              className="block"
            >
              Transforming
            </motion.span>

            <motion.span
              variants={lineVariants}
              className="block"
            >
              the Nation Through
            </motion.span>

            <motion.span
              variants={lineVariants}
              className="mt-2 block text-[#69d99a]"
            >
              Psychoeducation.
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.45,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="mt-8 max-w-2xl text-lg leading-8 text-white/70 lg:text-xl"
          >
            Sangbe Foundation uses
            psycho-education to raise
            awareness about stress,
            addiction and mental health,
            while promoting healthy
            coping strategies and
            positive behavioral change.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.7,
              delay: 0.55,
              ease: [
                0.22,
                1,
                0.36,
                1,
              ],
            }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link
              href="/donate"
              className="inline-flex items-center gap-3 rounded-xl bg-[#20ad60] px-7 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#189951] hover:shadow-lg"
            >
              Donate Now

              <ArrowRight
                size={19}
              />
            </Link>

            <Link
              href="/volunteer"
              className="inline-flex items-center rounded-xl border border-white/35 bg-white/5 px-7 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10"
            >
              Get Involved
            </Link>
          </motion.div>

          {/* Metadata */}
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              duration: 0.8,
              delay: 0.7,
            }}
            className="mt-16 flex flex-wrap items-center gap-x-7 gap-y-3 text-sm text-white/55"
          >
            <span>
              Registered NGO
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:block" />

            <span>
              Established 2019
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:block" />

            <span>
              Busumbala, The Gambia
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}