import Link from "next/link";
import {
  ArrowLeft,
  Users,
} from "lucide-react";

export default function TeamProfileCTA() {
  return (
    <section className="bg-[#eef6f1] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-7 rounded-[28px] bg-[#073b29] p-8 sm:flex-row sm:items-center sm:justify-between lg:p-10">
          <div className="flex items-center gap-5">
            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/[0.09] sm:flex">
              <Users
                size={22}
                className="text-[#72dda0]"
              />
            </div>

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#72dda0]">
                Sangbe Foundation
              </p>

              <h2 className="mt-2 text-2xl font-bold text-white">
                Meet the rest of our team.
              </h2>
            </div>
          </div>

          <Link
            href="/team"
            className="group inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#073b29] transition hover:bg-[#f0f7f2]"
          >
            <ArrowLeft
              size={17}
              className="transition-transform group-hover:-translate-x-1"
            />

            Back to Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}