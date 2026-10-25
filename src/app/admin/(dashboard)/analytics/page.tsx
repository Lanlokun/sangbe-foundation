
import Link from "next/link";
import {
  ChartNoAxesCombined,
  ExternalLink,
  Info,
} from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-7">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#178f4c]">
          Website Performance
        </p>

        <h1 className="mt-3 text-3xl font-bold text-[#173b29]">
          Website Analytics
        </h1>

        <p className="mt-3 text-sm text-[#75847a]">
          Monitor website traffic, visitor engagement and popular content.
        </p>
      </div>

      <div className="rounded-2xl border border-[#e3ebe5] bg-white p-8 shadow-sm">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#e5f5eb]">
          <ChartNoAxesCombined size={27} className="text-[#178f4c]" />
        </div>

        <h2 className="mt-6 text-xl font-bold text-[#173b29]">
          Vercel Web Analytics
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-[#75847a]">
          Vercel Analytics can track website visitors, page views,
          traffic sources and popular pages. Tracking must first
          be enabled and deployed before visitor data becomes available.
        </p>

        <Link
          href="https://vercel.com/dashboard"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#178f4c] px-5 py-3 text-sm font-semibold text-white hover:bg-[#10733b]"
        >
          Open Vercel Dashboard
          <ExternalLink size={17} />
        </Link>
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-[#dce8df] bg-[#f0f8f2] p-5">
        <Info size={20} className="mt-0.5 shrink-0 text-[#178f4c]" />

        <p className="text-sm leading-7 text-[#55705e]">
          Installing the analytics tracking package does not automatically
          provide a data API for this CMS. We will connect traffic
          charts only after configuring a supported data source.
        </p>
      </div>
    </div>
  );
}
