"use client";

import { useTransition } from "react";
import { createClient } from "@/utils/supabase/client"; // Adjust import based on your setup
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Adjust based on your Button component

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await supabase.auth.signOut();
      router.push("/login");
    });
  };

  return (
    <Button onClick={handleLogout} disabled={isPending}>
      {isPending ? "Logging out..." : "Logout"}
    </Button>
  );
}
