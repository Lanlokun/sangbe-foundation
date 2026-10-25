
"use client";

import Link from "next/link";
import { Menu, ExternalLink, LogOut, ShieldCheck } from "lucide-react";
import { logout } from "@/app/admin/actions";

type AdminHeaderProps = {
  onMenuClick: () => void;
  name: string;
  role: string;
};

export default function AdminHeader({
  onMenuClick,
  name,
  role,
}: AdminHeaderProps) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-4 border-b border-[#e5ebe7] bg-white px-5 sm:px-8">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          className="rounded-lg p-2 text-[#34483b] hover:bg-[#f1f6f2] lg:hidden"
        >
          <Menu size={23} />
        </button>

        <div>
          <p className="text-sm font-bold text-[#173b29] sm:text-base">
            Content Management
          </p>
          <p className="hidden text-xs text-[#829087] sm:block">
            Sangbe Foundation Administration
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-5">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden items-center gap-2 text-sm font-semibold text-[#178f4c] hover:underline sm:inline-flex"
        >
          View Website
          <ExternalLink size={15} />
        </Link>

        <div className="hidden h-8 w-px bg-[#e5ebe7] sm:block" />

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dff2e5] text-sm font-bold text-[#137b40]">
            {initials || "SF"}
          </div>

          <div className="hidden sm:block">
            <p className="max-w-36 truncate text-sm font-bold text-[#173b29]">
              {name}
            </p>
            <p className="flex items-center gap-1 text-xs capitalize text-[#829087]">
              <ShieldCheck size={12} />
              {role.replaceAll("_", " ")}
            </p>
          </div>
        </div>

        <form action={logout}>
          <button
            type="submit"
            aria-label="Sign out"
            title="Sign out"
            className="rounded-lg p-2 text-[#728278] hover:bg-red-50 hover:text-red-600"
          >
            <LogOut size={19} />
          </button>
        </form>
      </div>
    </header>
  );
}
