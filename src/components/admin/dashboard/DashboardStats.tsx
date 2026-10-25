
import {
  BookOpen,
  CheckCircle2,
  FilePenLine,
  Mail,
  Users,
  HeartHandshake,
  HandCoins,
} from "lucide-react";
import type { DashboardStats as Stats } from "@/lib/cms/dashboard";

type Props = {
  stats: Stats;
};

export default function DashboardStats({ stats }: Props) {
  const cards = [
    {
      label: "Total Articles",
      value: stats.articles,
      icon: BookOpen,
      color: "text-[#178f4c]",
      bg: "bg-[#e5f5eb]",
    },
    {
      label: "Published Articles",
      value: stats.publishedArticles,
      icon: CheckCircle2,
      color: "text-[#4269c7]",
      bg: "bg-[#e9efff]",
    },
    {
      label: "Draft Articles",
      value: stats.draftArticles,
      icon: FilePenLine,
      color: "text-[#b77927]",
      bg: "bg-[#fff2df]",
    },
    {
      label: "Contact Messages",
      value: stats.contactMessages,
      icon: Mail,
      color: "text-[#8254b6]",
      bg: "bg-[#f2eaff]",
    },
    {
      label: "Volunteer Applications",
      value: stats.volunteerApplications,
      icon: Users,
      color: "text-[#178f4c]",
      bg: "bg-[#e5f5eb]",
    },
    {
      label: "Assistance Requests",
      value: stats.assistanceRequests,
      icon: HeartHandshake,
      color: "text-[#b77927]",
      bg: "bg-[#fff2df]",
    },
    {
      label: "Donation Intents",
      value: stats.donationIntents,
      icon: HandCoins,
      color: "text-[#4269c7]",
      bg: "bg-[#e9efff]",
    },
  ];

  return (
    <section>
      <div className="mb-5">
        <h2 className="text-xl font-bold text-[#173b29]">
          Foundation Overview
        </h2>
        <p className="mt-1 text-sm text-[#829087]">
          Live totals from your CMS and submission records
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className="rounded-2xl border border-[#e3ebe5] bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.bg}`}
                >
                  <Icon size={21} className={card.color} />
                </div>
              </div>

              <p className="mt-5 text-3xl font-bold tabular-nums text-[#173b29]">
                {card.value === null
                  ? "—"
                  : card.value.toLocaleString()}
              </p>

              <p className="mt-2 text-sm font-medium text-[#75847a]">
                {card.label}
              </p>
            </div>
          );
        })}
      </div>

      <p className="mt-3 text-xs text-[#829087]">
        A dash means the statistic is unavailable or not accessible
        to your account. Donation intents are not confirmed donations.
      </p>
    </section>
  );
}
