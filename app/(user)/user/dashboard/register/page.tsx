import { RegisterForm } from "@/components/register-form";
import { stackServerApp } from "@/stack";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function RegistrationPage() {
  const user = await stackServerApp.getUser({ or: "redirect" });

  // Check if user is already registered
  const registeredUser = await prisma.registeredUsers.findFirst({
    where: {
      id: user.id,
    },
    include: {
      payments: true,
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Register</h1>

      {registeredUser ? (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                Application Submitted
              </h3>
              <div className="mt-2 text-sm text-blue-700">
                <p>
                  Your application is under progress and you will be updated
                  soon.
                </p>
                {user.primaryEmailVerified ? (
                  <p className="mt-2 text-green-700 font-medium">
                    ✓ Your email has been verified!
                  </p>
                ) : (
                  <p className="mt-2">Status: Please verify your email</p>
                )}
                {registeredUser.payments[0]?.payment_verified ? (
                  <p className="mt-1 text-green-700 font-medium">
                    ✓ Payment verified
                  </p>
                ) : (
                  <p className="mt-1">Payment: Under review</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <RegisterForm user_email={user.primaryEmail ?? ""} />
      )}
    </div>
  );
}
