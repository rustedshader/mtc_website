import { MainNav } from "@/components/main-nav";
import Link from "next/link";
import Image from "next/image";

export function SiteHeader() {
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center">
        <Link href="/" className="font-medium mx-4 text-sm flex items-center">
          <div className="flex flex-row items-center font-semibold gap-1">
            <Image src={`/logo.png`} alt="mtc-logo" width={50} height={50} />
            <div>Microsoft Technical Community</div>
          </div>
        </Link>
        <div className="flex flex-1 justify-end items-center mr-4">
          <MainNav />
        </div>
      </div>
    </header>
  );
}
