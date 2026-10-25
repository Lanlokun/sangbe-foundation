
"use client";

import { useActionState, useState } from "react";
import {
  Eye,
  Search,
  X,
  Mail,
  Users,
  HeartHandshake,
  Wallet,
} from "lucide-react";

import type {
  Submission,
  SubmissionType,
  ReviewStatus,
} from "@/lib/cms/submissions";

import {
  updateSubmissionReview,
  type SubmissionActionState,
} from "@/app/admin/(dashboard)/submissions/actions";

const initialState: SubmissionActionState = {
  error: null,
};

const typeLabels: Record<SubmissionType, string> = {
  contact: "Contact",
  volunteer: "Volunteer",
  assistance: "Assistance",
  donation: "Donation",
};

const statusLabels: Record<ReviewStatus, string> = {
  new: "New",
  in_review: "In Review",
  resolved: "Resolved",
  closed: "Closed",
};

const statusStyles: Record<ReviewStatus, string> = {
  new: "bg-blue-50 text-blue-700",
  in_review: "bg-amber-50 text-amber-700",
  resolved: "bg-green-50 text-green-700",
  closed: "bg-gray-100 text-gray-600",
};

const inputClass =
  "w-full rounded-xl border border-[#dce8df] bg-white px-4 py-3 text-sm outline-none focus:border-[#178f4c]";

function ReviewForm({
  submission,
}: {
  submission: Submission;
}) {
  const [state, action, pending] = useActionState(
    updateSubmissionReview,
    initialState
  );

  return (
    <form action={action} className="space-y-4">
      <input
        type="hidden"
        name="submission_type"
        value={submission.type}
      />
      <input
        type="hidden"
        name="submission_id"
        value={submission.id}
      />

      <div>
        <label
          htmlFor="review-status"
          className="mb-2 block text-sm font-semibold"
        >
          Review Status
        </label>
        <select
          id="review-status"
          name="status"
          defaultValue={submission.status}
          className={inputClass}
        >
          <option value="new">New</option>
          <option value="in_review">In Review</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="review-notes"
          className="mb-2 block text-sm font-semibold"
        >
          Internal Notes
        </label>
        <textarea
          id="review-notes"
          name="internal_notes"
          rows={5}
          maxLength={5000}
          defaultValue={submission.internal_notes}
          placeholder="Add internal follow-up notes..."
          className={inputClass}
        />
        <p className="mt-2 text-xs text-[#75847a]">
          Notes are for authorized CMS reviewers only.
          Avoid recording unnecessary sensitive information.
        </p>
      </div>

      {state.error && (
        <p role="alert" className="text-sm text-red-600">
          {state.error}
        </p>
      )}

      {state.success && (
        <p role="status" className="text-sm text-green-700">
          {state.success}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-[#178f4c] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50"
      >
        {pending ? "Saving..." : "Save Review"}
      </button>
    </form>
  );
}

export default function SubmissionsTable({
  submissions,
}: {
  submissions: Submission[];
}) {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<Submission | null>(
    null
  );

  const filtered = submissions.filter((item) => {
    const search = query.trim().toLowerCase();

    const matchesSearch =
      !search ||
      [
        item.name,
        item.email,
        item.subject,
        item.summary,
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(search)
        );

    return (
      matchesSearch &&
      (typeFilter === "all" || item.type === typeFilter) &&
      (statusFilter === "all" || item.status === statusFilter)
    );
  });

  return (
    <div className="space-y-5">
      {/* Filters */}
      <div className="grid gap-3 rounded-2xl border border-[#e3ebe5] bg-white p-4 md:grid-cols-[1fr_180px_180px]">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-3.5 text-[#829087]"
          />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search submissions..."
            aria-label="Search submissions"
            className={`${inputClass} pl-11`}
          />
        </div>

        <select
          value={typeFilter}
          onChange={(event) => setTypeFilter(event.target.value)}
          aria-label="Filter by submission type"
          className={inputClass}
        >
          <option value="all">All Types</option>
          <option value="contact">Contact</option>
          <option value="volunteer">Volunteer</option>
          <option value="assistance">Assistance</option>
          <option value="donation">Donation</option>
        </select>

        <select
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter by review status"
          className={inputClass}
        >
          <option value="all">All Statuses</option>
          <option value="new">New</option>
          <option value="in_review">In Review</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      <p className="text-sm text-[#75847a]">
        Showing {filtered.length} of {submissions.length} submissions
      </p>

      {/* Submission table */}
      <div className="overflow-hidden rounded-2xl border border-[#e3ebe5] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[#f4f8f5] text-[#55705e]">
              <tr>
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Type</th>
                <th className="px-5 py-4">Subject</th>
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Review Status</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr
                  key={`${item.type}-${item.id}`}
                  className="border-t border-[#edf1ed]"
                >
                  <td className="px-5 py-4 font-semibold text-[#173b29]">
                    {item.name}
                  </td>

                  <td className="px-5 py-4">
                    {typeLabels[item.type]}
                  </td>

                  <td className="max-w-56 truncate px-5 py-4">
                    {item.subject}
                  </td>

                  <td className="whitespace-nowrap px-5 py-4">
                    {new Date(item.created_at).toLocaleDateString(
                      "en-GB"
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        statusStyles[item.status]
                      }`}
                    >
                      {statusLabels[item.status]}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setSelected(item)}
                      className="inline-flex items-center gap-2 font-semibold text-[#178f4c]"
                    >
                      <Eye size={16} />
                      Review
                    </button>
                  </td>
                </tr>
              ))}

              {!filtered.length && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-[#75847a]"
                  >
                    No matching submissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review dialog */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="submission-dialog-title"
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase text-[#178f4c]">
                  {typeLabels[selected.type]} Submission
                </p>
                <h2
                  id="submission-dialog-title"
                  className="mt-2 text-2xl font-bold text-[#173b29]"
                >
                  {selected.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close submission"
                className="rounded-lg p-2 hover:bg-[#f4f8f5]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-8 space-y-4">
              {Object.entries(selected.details).map(
                ([label, value]) => {
                  if (
                    value === null ||
                    value === undefined ||
                    value === ""
                  ) {
                    return null;
                  }

                  return (
                    <div
                      key={label}
                      className="border-b border-[#edf1ed] pb-3"
                    >
                      <p className="text-xs font-bold uppercase tracking-wide text-[#829087]">
                        {label}
                      </p>
                      <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-7 text-[#34483b]">
                        {String(value)}
                      </p>
                    </div>
                  );
                }
              )}
            </div>

            <div className="border-t border-[#dce8df] pt-6">
              <h3 className="mb-4 text-lg font-bold text-[#173b29]">
                Administrative Review
              </h3>

              <ReviewForm
                key={`${selected.type}-${selected.id}`}
                submission={selected}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
