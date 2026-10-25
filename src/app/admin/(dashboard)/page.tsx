
import Link from "next/link";
import {
  BookOpen,
  CalendarDays,
  Images,
  Users,
  ArrowUpRight,
  Plus,
  ChartNoAxesCombined,
  Inbox,
  Megaphone,
  Clock3,
  HeartHandshake,
} from "lucide-react";

import { requireCMSUser } from "@/lib/admin/auth";
import { getDashboardStats } from "@/lib/cms/dashboard";
import DashboardStats from "@/components/admin/dashboard/DashboardStats";

const modules = [
  {
    title: "Articles",
    description: "Mental health, wellbeing and educational content",
    href: "/admin/articles",
    icon: BookOpen,
    iconBg: "bg-[#e5f5eb]",
    iconColor: "text-[#178f4c]",
  },
  {
    title: "Events",
    description: "Upcoming events and past Foundation activities",
    href: "/admin/events",
    icon: CalendarDays,
    iconBg: "bg-[#e9efff]",
    iconColor: "text-[#4269c7]",
  },
  {
    title: "Gallery",
    description: "Photographs, media and event collections",
    href: "/admin/gallery",
    icon: Images,
    iconBg: "bg-[#f2eaff]",
    iconColor: "text-[#8254b6]",
  },
  {
    title: "Team",
    description: "Foundation members and representatives",
    href: "/admin/team",
    icon: Users,
    iconBg: "bg-[#fff2df]",
    iconColor: "text-[#bd842c]",
  },
];

const quickActions = [
  {
    label: "New Article",
    href: "/admin/articles/new",
    icon: BookOpen,
  },
  {
    label: "New Event",
    href: "/admin/events/new",
    icon: CalendarDays,
  },
  {
    label: "Upload Media",
    href: "/admin/gallery",
    icon: Images,
  },
  {
    label: "Announcement",
    href: "/admin/announcements/new",
    icon: Megaphone,
  },
];

const managementLinks = [
  {
    title: "Submissions",
    description: "Review messages and incoming applications.",
    href: "/admin/submissions",
    icon: Inbox,
  },
  {
    title: "Announcements",
    description: "Share news and Foundation updates.",
    href: "/admin/announcements",
    icon: Megaphone,
  },
  {
    title: "Upcoming Events",
    description: "Manage upcoming activities and programmes.",
    href: "/admin/events",
    icon: Clock3,
  },
];

export default async function DashboardPage() {
  // Verify that the current user is authorized.
  const user = await requireCMSUser();

  // Retrieve actual CMS statistics from Supabase.
  const stats = await getDashboardStats();

  const firstName =
    user.full_name?.trim().split(/\s+/)[0] || "Administrator";

  return (
    <div className="space-y-9">
      {/* Dashboard heading */}
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#178f4c]">
            Overview
          </p>

          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#173b29] sm:text-4xl">
            Welcome back, {firstName}
          </h1>

          <p className="mt-3 text-sm leading-7 text-[#75847a]">
            Manage Sangbe Foundation&apos;s website content and
            activities.
          </p>
        </div>

        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl border border-[#dce8df] bg-white px-5 py-3 text-sm font-semibold text-[#176b3c] transition hover:bg-[#eef8f1]"
        >
          View Live Website
          <ArrowUpRight size={17} />
        </Link>
      </div>

      {/* Real dashboard statistics */}
      <DashboardStats stats={stats} />

      {/* Content management modules */}
      <section>
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#173b29]">
            Content Management
          </h2>

          <span className="text-xs text-[#829087]">
            CMS modules
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <div
                key={module.title}
                className="rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${module.iconBg}`}
                >
                  <Icon
                    size={23}
                    className={module.iconColor}
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold text-[#173b29]">
                  {module.title}
                </h3>

                <p className="mt-2 min-h-14 text-sm leading-6 text-[#75847a]">
                  {module.description}
                </p>

                <Link
                  href={module.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#178f4c] hover:underline"
                >
                  Manage
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* Quick actions and analytics */}
      <div className="grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        {/* Quick actions */}
        <section className="rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-[#173b29]">
              Quick Actions
            </h2>

            <Plus
              size={20}
              className="text-[#178f4c]"
            />
          </div>

          <p className="mt-2 text-sm text-[#829087]">
            Common publishing tasks
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {quickActions.map((action) => {
              const Icon = action.icon;

              return (
                <Link
                  key={action.href}
                  href={action.href}
                  className="flex items-center gap-3 rounded-xl border border-[#e3ebe5] bg-[#fbfdfb] p-4 transition hover:border-[#b4d9c0] hover:bg-[#f0f8f2]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e6f5eb]">
                    <Icon
                      size={19}
                      className="text-[#178f4c]"
                    />
                  </div>

                  <span className="text-sm font-semibold text-[#244633]">
                    {action.label}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl bg-[#f0f8f2] p-4">
            <div className="flex items-start gap-3">
              <HeartHandshake
                size={21}
                className="mt-0.5 shrink-0 text-[#178f4c]"
              />

              <p className="text-sm leading-6 text-[#55705e]">
                Authorized Foundation staff can manage website
                content through the CMS without modifying
                the website&apos;s source code.
              </p>
            </div>
          </div>
        </section>

        {/* Analytics overview */}
        <section className="rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm sm:p-7">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-bold text-[#173b29]">
              Website Analytics
            </h2>

            <ChartNoAxesCombined
              size={21}
              className="text-[#178f4c]"
            />
          </div>

          <p className="mt-2 text-sm text-[#829087]">
            Website traffic and visitor engagement
          </p>

          <div className="mt-6 flex min-h-44 flex-col items-center justify-center rounded-xl border border-dashed border-[#d5e6da] bg-[#fbfdfb] px-5 text-center">
            <ChartNoAxesCombined
              size={30}
              className="text-[#98b8a3]"
            />

            <p className="mt-3 text-sm font-bold text-[#315640]">
              Analytics Integration
            </p>

            <p className="mt-2 max-w-xs text-xs leading-6 text-[#829087]">
              Visitor totals, page views and traffic trends
              will appear here once a supported analytics
              data source is connected.
            </p>
          </div>

          <Link
            href="/admin/analytics"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#178f4c] hover:underline"
          >
            Open Analytics
            <ArrowUpRight size={16} />
          </Link>
        </section>
      </div>

      {/* Additional management modules */}
      <section className="grid gap-5 md:grid-cols-3">
        {managementLinks.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm transition hover:border-[#b4d9c0]"
            >
              <div className="flex items-center justify-between">
                <Icon
                  size={22}
                  className="text-[#178f4c]"
                />

                <ArrowUpRight
                  size={17}
                  className="text-[#98a69d] group-hover:text-[#178f4c]"
                />
              </div>

              <h3 className="mt-5 font-bold text-[#173b29]">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#829087]">
                {item.description}
              </p>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
