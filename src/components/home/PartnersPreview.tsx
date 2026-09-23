import Link from "next/link";
import { ArrowRight, Building2 } from "lucide-react";

const partners = [1, 2, 3, 4];

export default function PartnersPreview() {
  return (
    <section className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-center">
          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#178f4c]">
              Partners & Supporters
            </p>

            <h2 className="max-w-sm text-3xl font-bold leading-tight tracking-tight text-[#142019]">
              Working together for stronger communities.
            </h2>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {partners.map((partner) => (
                <div
                  key={partner}
                  className="group flex h-24 items-center justify-center rounded-2xl border border-[#e2e9e4] bg-[#fbfcfb] px-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#b9d8c5] hover:bg-white hover:shadow-[0_10px_25px_rgba(20,50,35,0.06)]"
                >
                  <Building2
                    size={22}
                    strokeWidth={1.5}
                    className="text-[#a6b4ac] transition-colors duration-300 group-hover:text-[#178f4c]"
                  />
                </div>
              ))}
            </div>

            <div className="mt-7 flex justify-end">
              <Link
                href="/partners"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#178f4c] transition-all duration-300 hover:gap-3"
              >
                View Our Partners
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}