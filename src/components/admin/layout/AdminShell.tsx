
"use client";

import { useState, type ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import AdminMobileNav from "./AdminMobileNav";

type Props = {
  children: ReactNode;
  name: string;
  role: string;
};

export default function AdminShell({
  children,
  name,
  role,
}: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const cmsRole =
    role === "super_admin" ||
    role === "admin" ||
    role === "editor" ||
    role === "contributor"
      ? role
      : undefined;

  return (
    <div className="min-h-screen bg-[#f5f8f6]">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <AdminSidebar role={cmsRole} />
      </div>

      {/* Mobile navigation */}
      <AdminMobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        role={cmsRole}
      />

      {/* Main content */}
      <div className="min-h-screen lg:pl-[264px]">
        <AdminHeader
          name={name}
          role={role}
          onMenuClick={() => setMenuOpen(true)}
        />

        <main className="mx-auto w-full max-w-[1600px] px-5 py-8 sm:px-8 lg:py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
