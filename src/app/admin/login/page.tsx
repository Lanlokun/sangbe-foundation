
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";

import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { getCMSUser } from "@/lib/admin/auth";

export const metadata: Metadata = {
  title: "Admin Login | Sangbe Foundation",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLoginPage() {
  const user = await getCMSUser();

  if (user) {
    redirect("/admin");
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f8f5] px-5 py-10">

      {/* Waterfront Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/waterfront.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
      </div>

      {/* Soft Green Overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-[#073b29]/25 backdrop-blur-[2px]"
        aria-hidden="true"
      />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md rounded-[26px] border border-white/70 bg-white/95 px-7 py-9 shadow-2xl backdrop-blur-md sm:px-10 sm:py-10">

        {/* Foundation Branding */}
        <div className="mb-7 flex flex-col items-center text-center">

          {/* Foundation Logo */}
          <div className="relative mb-4 h-32 w-32 sm:h-36 sm:w-36">
            <Image
              src="/images/sangbe-logov2.png"
              alt="Sangbe Foundation Logo"
              fill
              priority
              sizes="(max-width: 640px) 128px, 144px"
              className="object-contain"
            />
          </div>

          {/* Foundation Name */}
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#178f4c]">
            Sangbe Foundation
          </p>

          {/* Welcome Heading */}
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-[#142019]">
            Welcome Back
          </h1>

          {/* Description */}
          <p className="mt-3 text-sm leading-6 text-[#68766e]">
            Sign in to manage the Foundation&apos;s website content.
          </p>
        </div>

        {/* Login Form */}
        <AdminLoginForm />

        {/* Return to Website */}
        <div className="mt-8 border-t border-[#e1e8e3] pt-6 text-center">
          <Link
            href="/"
            className="text-sm font-medium text-[#178f4c] transition hover:text-[#10743c] hover:underline"
          >
            Return to Website
          </Link>
        </div>

      </div>
    </main>
  );
}
