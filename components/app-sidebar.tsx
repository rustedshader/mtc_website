"use server";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import Link from "next/link";
import { stackServerApp } from "@/stack";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function AppSidebar() {
  const user = await stackServerApp.getUser();

  const getNavigationItems = async () => {
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

      return [
        {
          title: "Home",
          href: "/",
        },
        {
          title: "Our Team",
          href: "/team",
        },
        {
          title: "Memories",
          href: "/gallery",
        },
        {
          title: "Contact Us",
          href: "/contact",
        },
        {
          title: "Dashboard",
          href: dashboardUrl,
        },
      ];
    } else {
      return [
        {
          title: "Home",
          href: "/",
        },
        {
          title: "Our Team",
          href: "/team",
        },
        {
          title: "Memories",
          href: "/gallery",
        },
        {
          title: "Contact Us",
          href: "/contact",
        },
        {
          title: "Sign In",
          href: "/handler/sign-in",
        },
        {
          title: "Sign Up",
          href: "/handler/sign-up",
        },
      ];
    }
  };

  const items = await getNavigationItems();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>{siteConfig.name}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {item.title}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
