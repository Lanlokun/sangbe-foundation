
import { redirect } from "next/navigation";
import {
  Users,
  ShieldCheck,
  UserPlus,
  Mail,
  Clock3,
} from "lucide-react";

import { requireCMSUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";

import UsersTable from "@/components/admin/users/UsersTable";
import type { ManagedUser } from "@/components/admin/users/UsersTable";
import InviteUserForm from "@/components/admin/users/InviteUserForm";

type PendingInvitation = {
  id: string;
  email: string;
  full_name: string;
  role: string;
  created_at: string;
};

export default async function AdminUsersPage() {
  const user = await requireCMSUser();

  // Only the Super Admin can access this page.
  if (user.role !== "super_admin" || !user.is_active) {
    redirect("/admin");
  }

  const supabase = await createClient();

  // Fetch CMS users and pending invitations.
  const [usersResult, invitationsResult] = await Promise.all([
    supabase
      .from("cms_users")
      .select("id, full_name, role, is_active")
      .order("full_name", { ascending: true }),

    supabase
      .from("cms_user_invitations")
      .select("id, email, full_name, role, created_at")
      .eq("status", "pending")
      .order("created_at", { ascending: false }),
  ]);

  if (usersResult.error) {
    return (
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-[#173b29]">
          Users &amp; Roles
        </h1>

        <p role="alert" className="text-sm text-red-600">
          Unable to load CMS users: {usersResult.error.message}
        </p>
      </div>
    );
  }

  const records = (usersResult.data ?? []) as ManagedUser[];

  const invitations = (
    invitationsResult.data ?? []
  ) as PendingInvitation[];

  const totalUsers = records.length;

  const activeUsers = records.filter(
    (item) => item.is_active
  ).length;

  const pendingInvitations = invitations.length;

  return (
    <div className="space-y-8">
      {/* Page heading */}
      <div>
        <div className="flex items-center gap-3">
          <Users size={28} className="text-[#178f4c]" />

          <h1 className="text-3xl font-bold text-[#173b29]">
            Users &amp; Roles
          </h1>
        </div>

        <p className="mt-3 text-sm text-[#75847a]">
          Invite Foundation staff, assign CMS roles, and
          manage account access.
        </p>
      </div>

      {/* Overview statistics */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#75847a]">
              Total CMS Users
            </p>
            <Users size={20} className="text-[#178f4c]" />
          </div>

          <p className="mt-3 text-3xl font-bold text-[#173b29]">
            {totalUsers}
          </p>
        </div>

        <div className="rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#75847a]">
              Active Users
            </p>
            <ShieldCheck
              size={20}
              className="text-[#178f4c]"
            />
          </div>

          <p className="mt-3 text-3xl font-bold text-[#173b29]">
            {activeUsers}
          </p>
        </div>

        <div className="rounded-2xl border border-[#e3ebe5] bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm text-[#75847a]">
              Pending Invitations
            </p>
            <Clock3 size={20} className="text-[#178f4c]" />
          </div>

          <p className="mt-3 text-3xl font-bold text-[#173b29]">
            {pendingInvitations}
          </p>
        </div>
      </div>

      {/* Invitation form */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <UserPlus size={22} className="text-[#178f4c]" />

          <div>
            <h2 className="text-xl font-bold text-[#173b29]">
              Add New User
            </h2>

            <p className="mt-1 text-sm text-[#75847a]">
              Send an invitation to a staff member and assign
              their initial CMS role.
            </p>
          </div>
        </div>

        <InviteUserForm />
      </section>

      {/* Existing CMS users */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-[#173b29]">
            CMS Users
          </h2>

          <p className="mt-1 text-sm text-[#75847a]">
            Manage roles and account status for existing users.
          </p>
        </div>

        <UsersTable users={records} />
      </section>

      {/* Pending invitations */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail size={22} className="text-[#178f4c]" />

          <div>
            <h2 className="text-xl font-bold text-[#173b29]">
              Pending Invitations
            </h2>

            <p className="mt-1 text-sm text-[#75847a]">
              Staff invitations awaiting account activation.
            </p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#e3ebe5] bg-white shadow-sm">
          {invitationsResult.error ? (
            <p role="alert" className="p-6 text-sm text-red-600">
              Unable to load invitations:{" "}
              {invitationsResult.error.message}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#f4f8f5] text-[#55705e]">
                  <tr>
                    <th className="px-5 py-4">Name</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">Role</th>
                    <th className="px-5 py-4">Invited</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {invitations.map((invitation) => (
                    <tr
                      key={invitation.id}
                      className="border-t border-[#edf1ed]"
                    >
                      <td className="px-5 py-4 font-semibold text-[#173b29]">
                        {invitation.full_name}
                      </td>

                      <td className="px-5 py-4 text-[#55705e]">
                        {invitation.email}
                      </td>

                      <td className="px-5 py-4 capitalize">
                        {invitation.role.replaceAll("_", " ")}
                      </td>

                      <td className="px-5 py-4 text-[#75847a]">
                        {new Date(
                          invitation.created_at
                        ).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          timeZone: "UTC",
                        })}
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                          Pending
                        </span>
                      </td>
                    </tr>
                  ))}

                  {!invitations.length && (
                    <tr>
                      <td
                        colSpan={5}
                        className="px-5 py-12 text-center text-[#75847a]"
                      >
                        No pending invitations.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
