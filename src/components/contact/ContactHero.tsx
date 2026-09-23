"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ChevronRight,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative overflow-hidden bg-[#073b29]">
      {/* Background image */}
      <Image
        src="/images/contact/contactbg.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Main dark overlay */}
      <div className="absolute inset-0 bg-[#073b29]/68" />

      {/* Stronger left overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#052f21]/95 via-[#073b29]/72 to-[#073b29]/30" />

      {/* Subtle decorative circles */}
      <div className="pointer-events-none absolute -right-44 -top-52 h-[620px] w-[620px] rounded-full border border-white/[0.06]" />

      <div className="pointer-events-none absolute right-24 top-20 h-[300px] w-[300px] rounded-full border border-white/[0.05]" />

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
          {/* Breadcrumb */}
          <div className="mb-8 flex items-center gap-2 text-sm text-white/55">
            <Link
              href="/"
              className="transition-colors duration-300 hover:text-white"
            >
              Home
            </Link>

            <ChevronRight size={14} />

            <span className="text-white">Contact</span>
          </div>

          <p className="mb-5 text-xs font-bold uppercase tracking-[0.28em] text-[#72dda0]">
            Contact Sangbe Foundation
          </p>

          <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-[68px]">
            We&apos;d love to{" "}
            <span className="text-[#72dda0]">
              hear from you.
            </span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">
            Whether you have a question, want to collaborate, or would like to
            learn more about our work, get in touch with Sangbe Foundation.
          </p>
        </motion.div>

        {/* Right information card */}
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
          <div className="relative ml-auto max-w-[420px] rounded-[32px] border border-white/10 bg-[#073b29]/65 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-md">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#1da85a]">
              <MessageCircle
                size={29}
                className="text-white"
              />
            </div>

            <p className="mt-9 text-xs font-bold uppercase tracking-[0.22em] text-[#72dda0]">
              Connect • Collaborate • Support
            </p>

            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-[-0.03em] text-white">
              Start a conversation with our team.
            </h2>

            <div className="mt-9 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.08] p-5">
                <MapPin
                  size={21}
                  className="text-[#72dda0]"
                />

                <p className="mt-4 text-sm font-semibold text-white">
                  Busumbala
                </p>

                <p className="mt-1 text-xs text-white/50">
                  The Gambia
                </p>
              </div>

              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.08] p-5">
                <Mail
                  size={21}
                  className="text-[#72dda0]"
                />

                <p className="mt-4 text-sm font-semibold text-white">
                  Get in Touch
                </p>

                <p className="mt-1 text-xs text-white/50">
                  Send us a message
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}