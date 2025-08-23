"use server";

import Link from "next/link";
import { stackServerApp } from "@/stack";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function MainNav() {
  const user = await stackServerApp.getUser();

  if (user) {
    // Check user role to determine dashboard URL
    let dashboardUrl = "/user/dashboard";

    try {
      const userData = await prisma.registeredUsers.findUnique({
        where: { id: user.id },
      });

      if (userData && userData.role === "ADMIN") {
        dashboardUrl = "/admin/dashboard";
      }
    } catch (error) {
      console.error("Error checking user role:", error);
      // Default to user dashboard if there's an error
    }

    return (
      <div className="hidden md:flex">
        <nav className="flex gap-4 text-sm xl:gap-6">
          <Link href="/">Home</Link>
          <Link href="/team">Our Team</Link>
          <Link href="/gallery">Memories</Link>
          <Link href="/contact">Contact Us</Link>
          <Link href={dashboardUrl}>Dashboard</Link>
        </nav>
      </div>
    );
  } else {
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
}
