
import { redirect } from "next/navigation";
import {
  Inbox,
  Mail,
  Users,
  HeartHandshake,
  Wallet,
} from "lucide-react";

import { requireCMSUser } from "@/lib/admin/auth";
import {
  getSubmissions,
  type SubmissionType,
} from "@/lib/cms/submissions";

import SubmissionsTable from "@/components/admin/submissions/SubmissionsTable";

const categories: {
  type: SubmissionType;
  label: string;
  icon: typeof Mail;
}[] = [
  {
    type: "contact",
    label: "Contact Messages",
    icon: Mail,
  },
  {
    type: "volunteer",
    label: "Volunteer Applications",
    icon: Users,
  },
  {
    type: "assistance",
    label: "Assistance Requests",
    icon: HeartHandshake,
  },
  {
    type: "donation",
    label: "Donation Enquiries",
    icon: Wallet,
  },
];

export default async function AdminSubmissionsPage() {
  const user = await requireCMSUser();

  const canReview = [
    "super_admin",
    "admin",
    "editor",
  ].includes(user.role);

  if (!canReview) {
    redirect("/admin");
  }

  let submissions;

  try {
    submissions = await getSubmissions();
  } catch (error) {
    console.error("Failed to load submissions:", error);

    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-[#173b29]">
          Submissions
        </h1>

        <p role="alert" className="text-sm text-red-600">
          Unable to load submissions. Please check the
          database permissions and try again.
        </p>
      </div>
    );
  }

  const total = submissions.length;

  const newCount = submissions.filter(
    (item) => item.status === "new"
  ).length;

  const inReviewCount = submissions.filter(
    (item) => item.status === "in_review"
  ).length;

  return (
    <div className="space-y-8">
      {/* Heading */}
      <div>
        <div className="flex items-center gap-3">
          <Inbox size={28} className="text-[#178f4c]" />

          <h1 className="text-3xl font-bold text-[#173b29]">
            Submissions
          </h1>
        </div>

        <p className="mt-3 text-sm text-[#75847a]">
          Review website enquiries, volunteer applications,
          assistance requests and donation enquiries.
        </p>
      </div>

      {/* Overview */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Submissions", value: total },
          { label: "New", value: newCount },
          { label: "In Review", value: inReviewCount },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm"
          >
            <p className="text-sm text-[#75847a]">
              {stat.label}
            </p>

            <p className="mt-3 text-3xl font-bold text-[#173b29]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Category statistics */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {categories.map((category) => {
          const Icon = category.icon;

          const count = submissions.filter(
            (item) => item.type === category.type
          ).length;

          return (
            <div
              key={category.type}
              className="rounded-2xl border border-[#e3ebe5] bg-white p-5"
            >
              <Icon size={22} className="text-[#178f4c]" />

              <p className="mt-4 text-sm text-[#75847a]">
                {category.label}
              </p>

              <p className="mt-2 text-2xl font-bold text-[#173b29]">
                {count}
              </p>
            </div>
          );
        })}
      </div>

      {/* Submissions */}
      <div>
        <h2 className="mb-5 text-xl font-bold text-[#173b29]">
          All Submissions
        </h2>

        <SubmissionsTable submissions={submissions} />
      </div>
    </div>
  );
}
