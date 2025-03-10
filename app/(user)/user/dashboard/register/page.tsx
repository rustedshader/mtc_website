import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { RegisterForm } from "@/components/register-form";

export default async function RegistrationPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  if (error || !data?.user) {
    redirect("/login");
  }

  const userEmail = data.user.email ?? redirect("/login");

  async function isUserRegistered() {
    const res = await fetch(
      `${baseUrl}/api/user/is-registered?email=${encodeURIComponent(
        userEmail
      )}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      }
    );
    const json = await res.json();
    return json.registered;
  }

  async function isUserVerified() {
    const res = await fetch(
      `${baseUrl}/api/user/is-verified?email=${encodeURIComponent(userEmail)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      }
    );
    const json = await res.json();
    return json.verified;
  }

  const registered = await isUserRegistered();
  const verified = await isUserVerified();

  if (registered && verified) {
    return <div>Registration is Done!</div>;
  } else if (registered && !verified) {
    return <div>Your registration application is in progress.</div>;
  } else {
    return (
      <div>
        <h1>Register</h1>
        <RegisterForm />
      </div>
    );
  }
}
