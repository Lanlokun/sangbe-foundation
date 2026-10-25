
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ShieldCheck } from "lucide-react";

import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { getCMSUser } from "@/lib/admin/auth";

export const metadata: Metadata = {
  title: "Admin Login | Sangbe Foundation",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
  const user = await getCMSUser();

  if (user) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f8f5] px-5 py-12">
      <div className="w-full max-w-md rounded-[26px] border border-[#e1e8e3] bg-white p-7 shadow-sm sm:p-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#e8f6ed]">
          <ShieldCheck size={28} className="text-[#178f4c]" />
        </div>

        <p className="mt-7 text-xs font-bold uppercase tracking-[0.22em] text-[#178f4c]">
          Sangbe Foundation
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#142019]">
          Welcome Back
        </h1>

        <p className="mt-3 text-sm leading-7 text-[#68766e]">
          Sign in to manage the Foundation&apos;s website content.
        </p>

        <AdminLoginForm />

        <div className="mt-8 border-t border-[#e1e8e3] pt-6 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-[#178f4c] hover:underline"
          >
            Return to Website
          </Link>
        </div>
      </div>
    </main>
  );
}
