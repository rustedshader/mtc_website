import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "404 Page Not Found",
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-red-600 mb-4"> 404 </h1>
        <h2 className="text-3xl font-semibold text-white mb-2">
          {" "}
          Oops! Page Not Found{" "}
        </h2>
        <p className="text-white mb-8">
          {" "}
          The page you are looking for does not seem to exist.
        </p>
        <Image
          className="mx-auto rounded-xl shadow-lg"
          src="/not-found.png"
          width={400}
          height={400}
          sizes="(max-width: 768px) 300px, 400px"
          alt="Page not found"
          priority={true}
          title="Page not found"
        />
        <Link href="/" className="mt-8 block">
          <Button variant="default" size="lg">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
