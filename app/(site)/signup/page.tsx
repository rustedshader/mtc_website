import { SignupForm } from "@/components/signup-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center py-20">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Sign Up</h1>
          <p className="text-muted-foreground">Create a new account.</p>
        </div>
        <div className="max-w-md mx-auto">
          <Card className="w-full shadow-lg">
            <CardHeader>
              <CardTitle>Sign Up</CardTitle>
              <CardDescription>
                Fill out the form to create your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignupForm />
            </CardContent>
          </Card>
          <p className="text-center mt-4">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
