
import { createClient } from "@supabase/supabase-js";
import { createInterface } from "node:readline/promises";


const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

const email = process.argv[2];

if (!email) {
  console.error("Usage: node scripts/reset-admin-password.mjs EMAIL");
  process.exit(1);
}

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

try {
  const password = await rl.question("New password: ");
  const confirmation = await rl.question("Confirm password: ");

  if (password.length < 12) {
    throw new Error("Password must contain at least 12 characters.");
  }

  if (password !== confirmation) {
    throw new Error("Passwords do not match.");
  }

  const { data, error } = await supabase.auth.admin.listUsers({
    perPage: 1000,
  });

  if (error) throw error;

  const user = data.users.find(
    (item) => item.email?.toLowerCase() === email.toLowerCase()
  );

  if (!user) {
    throw new Error("User not found in Supabase Auth.");
  }

  const result = await supabase.auth.admin.updateUserById(user.id, {
    password,
  });

  if (result.error) throw result.error;

  console.log("Password updated successfully.");
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
} finally {
  rl.close();
}
