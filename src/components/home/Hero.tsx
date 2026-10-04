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
    <section className="relative overflow-hidden bg-[#062f20] lg:min-h-screen">
      {/* Background */}
      <Image
        src="/images/hero/herobg.png"
        alt=""
        fill
        priority
        className="object-cover object-[62%_center] sm:object-center"
        sizes="100vw"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#002f20]/95 via-[#003824]/75 to-[#003824]/20" />

      <div className="absolute inset-0 bg-gradient-to-t from-[#002c1e]/60 via-transparent to-[#002c1e]/10" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl items-center px-5 pb-10 pt-36 sm:min-h-[760px] sm:px-6 sm:pb-16 sm:pt-40 lg:min-h-screen lg:px-8 lg:pb-20 lg:pt-44">
        <div className="w-full max-w-4xl">

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
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mb-6 sm:mb-8"
          >
            <div className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-2.5 text-sm text-white/90 backdrop-blur-sm sm:gap-3 sm:px-5 sm:py-3">
              <HeartHandshake size={18} />

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
            className="max-w-4xl font-bold leading-[0.96] tracking-[-0.045em] text-white"
          >
            <motion.span
              variants={lineVariants}
              className="block text-[clamp(2.75rem,12vw,3.75rem)] lg:text-7xl xl:text-[82px]"
            >
              Transforming
            </motion.span>

            <motion.span
              variants={lineVariants}
              className="block text-[clamp(2.75rem,12vw,3.75rem)] lg:text-7xl xl:text-[82px]"
            >
              the Nation Through
            </motion.span>

            <motion.span
              variants={lineVariants}
              className="mt-2 block text-[clamp(2.35rem,10.5vw,3.75rem)] text-[#69d99a] sm:text-6xl lg:text-7xl xl:text-[82px]"
            >
              Psychoeducation
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
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-6 max-w-xl text-[15px] leading-7 text-white/75 sm:mt-8 sm:max-w-2xl sm:text-lg sm:leading-8 lg:text-xl"
          >
            Sangbe Foundation uses psycho-education to raise
            awareness about stress, addiction and mental health,
            while promoting healthy coping strategies and
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
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-7 grid grid-cols-2 gap-3 sm:mt-9 sm:flex sm:flex-wrap sm:gap-4"
          >
            <Link
              href="/donate"
              className="inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-[#20ad60] px-4 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#189951] hover:shadow-lg sm:gap-3 sm:px-7 sm:py-4 sm:text-base"
            >
              Donate Now

              <ArrowRight
                size={18}
                className="shrink-0"
              />
            </Link>

            <Link
              href="/volunteer"
              className="inline-flex min-h-14 items-center justify-center rounded-xl border border-white/35 bg-white/5 px-4 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 sm:px-7 sm:py-4 sm:text-base"
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
            className="mt-9 grid grid-cols-2 gap-x-5 gap-y-2 text-xs text-white/60 sm:mt-16 sm:flex sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-3 sm:text-sm"
          >
            <span>
              Registered NGO
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:block" />

            <span>
              Established 10 April 2019
            </span>

            <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:block" />

            <span className="col-span-2 sm:col-auto">
              Busumbala, The Gambia
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}