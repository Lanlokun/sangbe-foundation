
"use client";

import AdminSidebar from "./AdminSidebar";

type CMSRole =
  | "super_admin"
  | "admin"
  | "editor"
  | "contributor";

type Props = {
  open: boolean;
  onClose: () => void;
  role?: CMSRole;
};

export default function AdminMobileNav({
  open,
  onClose,
  role,
}: Props) {
  return (
    <AdminSidebar
      open={open}
      onClose={onClose}
      role={role}
    />
  );
}
