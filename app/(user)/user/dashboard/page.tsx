import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { LogoutButton } from "@/components/logout-button";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  if (error || !data?.user) {
    redirect("/login");
  }

  const userEmail = data.user.email ?? redirect("/login");

  // Call the API to check if the user is verified.

  const res = await fetch(
    `${baseUrl}/api/user/isVerified?email=${encodeURIComponent(userEmail)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail }),
    }
  );

  const verifiedResponse = await res.json();

  return (
    <div>
      <p>This is the {userEmail} Dashboard</p>
      {!verifiedResponse.verified && (
        <div>
          <p>
            Your account is not verified. Please complete the payment to verify
            your account.
          </p>
          <Link href="/payment">
            <button>Make Payment</button>
          </Link>
        </div>
      )}
      <LogoutButton />
    </div>
  );
}
