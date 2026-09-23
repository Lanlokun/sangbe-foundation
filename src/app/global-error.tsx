"use client";

import {
  AlertTriangle,
  RefreshCw,
} from "lucide-react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="m-0">
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#073b29] px-6 py-20">
          <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full border border-white/[0.06]" />
          <div className="pointer-events-none absolute -bottom-48 -left-40 h-[560px] w-[560px] rounded-full border border-white/[0.05]" />

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07]">
              <AlertTriangle
                size={28}
                strokeWidth={1.7}
                className="text-[#72dda0]"
              />
            </div>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.28em] text-[#72dda0]">
              Sangbe Foundation
            </p>

            <h1 className="mt-5 text-5xl font-bold tracking-[-0.045em] text-white sm:text-6xl">
              Something went wrong.
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-white/65 sm:text-lg">
              An unexpected error prevented the website from loading
              correctly. Please try again.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <button
                type="button"
                onClick={() => reset()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#72dda0] px-6 py-3.5 text-sm font-bold text-[#073b29] transition hover:bg-[#8be7ad] sm:w-auto"
              >
                <RefreshCw size={17} />
                Try Again
              </button>

              <a
                href="/"
                className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/[0.06] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-white/[0.1] sm:w-auto"
              >
                Return Home
              </a>
            </div>

            <div className="mt-14 border-t border-white/10 pt-7">
              <p className="text-sm text-white/45">
                Stronger Communities. Brighter Futures.
              </p>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}