import { RegisterForm } from "@/components/register-form";

export default async function RegistrationPage() {
  return (
    <div>
      <h1>Register</h1>
      <RegisterForm user_email={"1234568dhj@gmail.com"} />
    </div>
  );
}
