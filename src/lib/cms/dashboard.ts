
import "server-only";

import { createClient } from "@/lib/supabase/server";
import { requireCMSUser } from "@/lib/admin/auth";

export type DashboardStats = {
  articles: number | null;
  publishedArticles: number | null;
  draftArticles: number | null;
  contactMessages: number | null;
  volunteerApplications: number | null;
  assistanceRequests: number | null;
  donationIntents: number | null;
};

export async function getDashboardStats(): Promise<DashboardStats> {
  const user = await requireCMSUser();
  const supabase = await createClient();

  const count = async (
    table: string,
    filter?: { column: string; value: string }
  ): Promise<number | null> => {
    let query = supabase
      .from(table)
      .select("*", { count: "exact", head: true });

    if (filter) {
      query = query.eq(filter.column, filter.value);
    }

    const { count, error } = await query;

    if (error) {
      console.error(`Dashboard count failed for ${table}:`, error.message);
      return null;
    }

    return count;
  };

  const [
    articles,
    publishedArticles,
    draftArticles,
  ] = await Promise.all([
    count("cms_articles"),
    count("cms_articles", { column: "status", value: "published" }),
    count("cms_articles", { column: "status", value: "draft" }),
  ]);

  // Only authorized administrative staff should access submission totals.
  const canViewSubmissions = ["super_admin", "admin"].includes(user.role);

  if (!canViewSubmissions) {
    return {
      articles,
      publishedArticles,
      draftArticles,
      contactMessages: null,
      volunteerApplications: null,
      assistanceRequests: null,
      donationIntents: null,
    };
  }

  // These tables may have separate RLS policies.
  // Failed counts are represented as unavailable, never as zero.
  const [
    contactMessages,
    volunteerApplications,
    assistanceRequests,
    donationIntents,
  ] = await Promise.all([
    count("contact_submissions"),
    count("volunteer_applications"),
    count("assistance_requests"),
    count("donation_intents"),
  ]);

  return {
    articles,
    publishedArticles,
    draftArticles,
    contactMessages,
    volunteerApplications,
    assistanceRequests,
    donationIntents,
  };
}
