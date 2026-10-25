
import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let adminClient: SupabaseClient | null = null;

/**
 * Returns a Supabase client using the service role key.
 *
 * IMPORTANT:
 * - Server-side use only.
 * - Never expose the service role key in client components.
 * - Never prefix the service role key with NEXT_PUBLIC_.
 */
export function createAdminClient(): SupabaseClient {
  if (adminClient) {
    return adminClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL environment variable."
    );
  }

  if (!serviceRoleKey) {
    throw new Error(
      "Missing SUPABASE_SERVICE_ROLE_KEY environment variable."
    );
  }

  adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });

  return adminClient;
}

/**
 * Backward-compatible export for existing API routes.
 *
 * Allows existing code such as:
 *
 *   await supabaseAdmin.from("contact_submissions").insert(...)
 *
 * to continue working without changes.
 *
 * The client is initialized lazily so missing credentials
 * produce an error when used rather than during module import.
 */
export const supabaseAdmin = new Proxy(
  {} as SupabaseClient,
  {
    get(_target, property) {
      const client = createAdminClient();

      const value = Reflect.get(client, property);

      return typeof value === "function"
        ? value.bind(client)
        : value;
    },
  }
);
