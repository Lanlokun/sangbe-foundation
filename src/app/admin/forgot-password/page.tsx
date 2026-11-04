import type { Metadata } from "next";
import ForgotPasswordForm from "@/components/admin/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Forgot Password | Sangbe Foundation",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f8f5] px-5 py-12">
      <div className="w-full max-w-md rounded-[26px] border border-[#e1e8e3] bg-white p-7 shadow-sm sm:p-10">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#178f4c]">
          Sangbe Foundation
        </p>

        <h1 className="mt-3 text-3xl font-bold text-[#142019]">
          Forgot Password?
        </h1>

        <p className="mt-3 text-sm leading-7 text-[#68766e]">
          Enter your administrator email address to receive
          a password recovery link.
        </p>

        <ForgotPasswordForm />
      </div>
    </main>
  );
}