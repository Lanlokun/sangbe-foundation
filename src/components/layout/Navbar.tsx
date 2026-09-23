"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Heart } from "lucide-react";
import { navigation } from "@/data/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <div className="container">
        <div className="mt-5 flex h-[76px] items-center justify-between rounded-2xl bg-white/95 px-6 shadow-sm backdrop-blur-md lg:px-8">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eaf7ef]">
              <Heart
                size={23}
                strokeWidth={2.3}
                className="text-[#178a49]"
              />
            </div>

            <div className="leading-tight">
              <span className="block text-[17px] font-bold text-[#126b3b]">
                Sangbe
              </span>
              <span className="block text-[13px] font-semibold text-[#17201b]">
                Foundation
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-[#35433b] transition hover:text-[#178a49]"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Donate */}
          <div className="hidden lg:block">
            <Link
              href="/donate"
              className="rounded-lg bg-[#178a49] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0f6937]"
            >
              Donate
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#e2e9e5] lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {open && (
          <div className="mt-2 rounded-2xl bg-white p-5 shadow-xl lg:hidden">
            <nav className="flex flex-col">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-[#edf1ee] px-2 py-4 font-medium text-[#35433b] last:border-none"
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="/donate"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-lg bg-[#178a49] px-5 py-3.5 text-center font-semibold text-white"
              >
                Donate Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}