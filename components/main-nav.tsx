"use client";

import Link from "next/link";

export function MainNav() {
  return (
    <div className="hidden md:flex">
      <nav className="flex gap-4 text-sm xl:gap-6">
        <Link href="/">Home</Link>
        <Link href="/team">Our Team</Link>
        <Link href="/gallery">Memories</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/handler/sign-in">Sign In</Link>
        <Link href="/handler/sign-up">Sign Up</Link>
      </nav>
    </div>
  );
}
