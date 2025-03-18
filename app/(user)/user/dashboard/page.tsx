import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Dashboard() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getSession();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  if (error || !data?.session?.user) {
    redirect("/login");
  }

  const userEmail = data.session.user.email ?? redirect("/login");
  const { data: sessionData, error: sessionError } =
    await supabase.auth.getSession();
  console.log(sessionData, sessionError);

  // Fetch user data from the API endpoint that returns registration and verification details.
  const res = await fetch(
    `${baseUrl}/api/user/get-user-data?email=${encodeURIComponent(userEmail)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: userEmail }),
    }
  );

  const userData = await res.json();

  // If user is not registered (e.g. no mtc_id present), ask them to register.
  if (!userData.mtc_id) {
    return (
      <div>
        <p>This is the {userEmail} Dashboard</p>
        <p>This is the user data:</p>
        <pre>{JSON.stringify(data.session.user, null, 2)}</pre>
        <p>Please go to the registration tab and register.</p>
      </div>
    );
  }

  // If user is registered but not yet verified.
  if (!userData.verified) {
    return (
      <div>
        <p>This is the {userEmail} Dashboard</p>
        <p>Your registration application is in progress.</p>
      </div>
    );
  }

  // If the user is registered and verified, show their data using shadcn Card components.
  return (
    <div>
      <p>This is the {userEmail} Dashboard</p>
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            <strong>Name:</strong> {userData.name}
          </p>
          <p>
            <strong>MTC ID:</strong> {userData.mtc_id}
          </p>
          <p>
            <strong>SAP ID:</strong> {userData.sap_id || "N/A"}
          </p>
          <p>
            <strong>Year:</strong> {userData.year}
          </p>
          <p>
            <strong>Course:</strong> {userData.course}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
