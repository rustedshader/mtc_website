"use client";

import { useTransition } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();
  const [isPending, startTransition] = useTransition();

  const handleLogout = () => {
    startTransition(async () => {
      await supabase.auth.signOut();
      router.push("/");
    });
  };

  return (
    <Button onClick={handleLogout} disabled={isPending}>
      {isPending ? "Logging out... See Ya :) " : "Logout"}
    </Button>
  );
}
