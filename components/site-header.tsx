import { MainNav } from "@/components/main-nav";
import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="font-medium mx-4 text-sm">
            <div className="flex flex-row items-center font-semibold gap-1">
              <div>
                <Image
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_DB_URL}/logo.png`}
                  width={45}
                  height={45}
                  alt="MTC Logo"
                />
              </div>
              <div>Microsoft Technical Community</div>
            </div>
          </Link>
          <div className="flex">
            <MainNav />
          </div>
        </div>
      </div>
    </header>
  );
}
