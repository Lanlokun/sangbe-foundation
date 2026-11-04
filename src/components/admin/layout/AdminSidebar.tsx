
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  Images,
  Users,
  UsersRound,
  Megaphone,
  Inbox,
  ChartNoAxesCombined,
  Settings,
  PanelsTopLeft,
  HeartHandshake,
  ExternalLink,
  X,
} from "lucide-react";

type CMSRole =
  | "super_admin"
  | "admin"
  | "editor"
  | "contributor";

type AdminSidebarProps = {
  open?: boolean;
  onClose?: () => void;
  role?: CMSRole;
};

const navigation = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Articles", href: "/admin/articles", icon: BookOpen },
  { label: "Events", href: "/admin/events", icon: CalendarDays },
  { label: "Gallery", href: "/admin/gallery", icon: Images },
  { label: "Team Members", href: "/admin/team", icon: Users },
  { label: "Programs", href: "/admin/programs", icon: HeartHandshake },
  { label: "Announcements", href: "/admin/announcements", icon: Megaphone },
  { label: "Submissions", href: "/admin/submissions", icon: Inbox },
  { label: "Website Pages", href: "/admin/pages", icon: PanelsTopLeft },
  { label: "Analytics", href: "/admin/analytics", icon: ChartNoAxesCombined },
];

export default function AdminSidebar({
  open = false,
  onClose,
  role,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const isSuperAdmin = role === "super_admin";
  const canManageSettings =
    role === "super_admin" || role === "admin";

  function isActive(href: string) {
    return href === "/admin"
      ? pathname === href
      : pathname === href || pathname.startsWith(`${href}/`);
  }

  function navClass(href: string) {
    return `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
      isActive(href)
        ? "bg-[#178f4c] text-white"
        : "text-white/65 hover:bg-white/10 hover:text-white"
    }`;
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[264px] flex-col bg-[#073b29] text-white transition-transform duration-200 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Foundation Branding */}
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-5">
          <Link
            href="/admin"
            onClick={onClose}
            className="flex min-w-0 items-center gap-3"
          >
            {/* Foundation Logo */}
            <div className="relative h-12 w-12 shrink-0">
              <Image
                src="/images/sangbe-logov2.png"
                alt="Sangbe Foundation Logo"
                fill
                priority
                sizes="48px"
                className="object-contain"
              />
            </div>

            {/* Foundation Name */}
            <div className="min-w-0">
              <p className="text-[15px] font-bold leading-tight tracking-tight text-white">
                Sangbe Foundation
              </p>

              <p className="mt-1 text-[10px] font-medium tracking-wide text-white/55">
                Content Management
              </p>
            </div>
          </Link>

          {/* Mobile Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="ml-2 shrink-0 text-white/70 transition hover:text-white lg:hidden"
          >
            <X size={21} />
          </button>
        </div>

        {/* Main Navigation */}
        <nav
          aria-label="CMS navigation"
          className="flex-1 space-y-1 overflow-y-auto px-4 py-6"
        >
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            Management
          </p>

          {navigation.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              aria-current={isActive(href) ? "page" : undefined}
              className={navClass(href)}
            >
              <Icon
                size={19}
                strokeWidth={1.8}
                className="shrink-0"
              />
              <span>{label}</span>
            </Link>
          ))}

          {/* Super Admin Navigation */}
          {isSuperAdmin && (
            <>
              <div className="my-5 border-t border-white/10" />

              <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                Administration
              </p>

              <Link
                href="/admin/users"
                onClick={onClose}
                aria-current={
                  isActive("/admin/users") ? "page" : undefined
                }
                className={navClass("/admin/users")}
              >
                <UsersRound
                  size={19}
                  strokeWidth={1.8}
                  className="shrink-0"
                />
                <span>Users &amp; Roles</span>
              </Link>
            </>
          )}
        </nav>

        {/* Footer Navigation */}
        <div className="space-y-2 border-t border-white/10 p-4">
          {/* Settings: Admin and Super Admin */}
          {canManageSettings && (
            <Link
              href="/admin/settings"
              onClick={onClose}
              aria-current={
                isActive("/admin/settings") ? "page" : undefined
              }
              className={navClass("/admin/settings")}
            >
              <Settings
                size={19}
                strokeWidth={1.8}
                className="shrink-0"
              />
              <span>Settings</span>
            </Link>
          )}

          {/* Public Website */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-white/65 transition hover:bg-white/10 hover:text-white"
          >
            <ExternalLink
              size={19}
              strokeWidth={1.8}
              className="shrink-0"
            />
            <span>View Website</span>
          </Link>

          {/* CMS Footer */}
          <div className="px-3 pt-3">
            <p className="text-[11px] font-medium text-white/35">
              Sangbe Foundation CMS
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
