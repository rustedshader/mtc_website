"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useUser } from "@stackframe/stack";

export function LogoutButton() {
  const user = useUser();

  return user ? (
    <Button onClick={() => user.signOut({ redirectUrl: "/" })}>Sign Out</Button>
  ) : (
    "Not signed in"
  );
}
