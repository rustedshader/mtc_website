// /auth/confirm/page.tsx
import { type EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ConfirmationPage({
  searchParams,
}: {
  searchParams: { token_hash: string; type: string };
}) {
  const token_hash = await searchParams.token_hash;
  const type = (await searchParams.type) as EmailOtpType | null;

  if (!token_hash || !type) {
    return (
      <div>
        <h1>Invalid Link</h1>
        <p>The confirmation link is missing required parameters.</p>
      </div>
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    type,
    token_hash,
  });

  if (!error) {
    redirect("/user/dashboard");
  }

  return (
    <div>
      <h1>Verification Failed</h1>
      <p>
        Unable to verify your token. It may have expired or been used already.
      </p>
    </div>
  );
}
