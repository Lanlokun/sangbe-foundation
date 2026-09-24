"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

import { navigation } from "@/data/navigation";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute left-0 top-0 z-50 w-full">
      <div className="container">
        <div className="mt-5 flex h-[84px] items-center justify-between rounded-2xl bg-white/95 px-5 shadow-sm backdrop-blur-md lg:px-8">
          {/* Official Sangbe Foundation Logo */}
          <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex h-full w-[180px] shrink-0 items-center sm:w-[200px]"
              aria-label="Sangbe Foundation home"
            >
              <Image
                src="/images/sangbe-logov2.png"
                alt="Sangbe Foundation"
                width={1600}
                height={900}
                priority
                className="max-h-[68px] w-full object-contain object-left"
              />
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
            type="button"
            onClick={() => setOpen((current) => !current)}
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#e2e9e5] text-[#17201b] transition hover:bg-[#f5f8f6] lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? (
              <X size={22} />
            ) : (
              <Menu size={22} />
            )}
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
                  className="border-b border-[#edf1ee] px-2 py-4 font-medium text-[#35433b] transition hover:text-[#178a49] last:border-none"
                >
                  {item.name}
                </Link>
              ))}

              <Link
                href="/donate"
                onClick={() => setOpen(false)}
                className="mt-4 rounded-lg bg-[#178a49] px-5 py-3.5 text-center font-semibold text-white transition hover:bg-[#0f6937]"
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