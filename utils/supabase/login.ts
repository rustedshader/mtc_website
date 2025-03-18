"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";
import { PrismaClient } from "@prisma/client";

export async function login(formData: FormData) {
  const supabase = await createClient();
  const prisma = new PrismaClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }
  const user = await prisma.registeredUsers.findFirst({
    where: {
      university_email: data.email,
    },
  });

  if (user) {
    if (user.is_admin) {
      redirect("/admin/dashboard");
    } else {
      redirect("/user/dashboard");
    }
  } else {
    revalidatePath("/", "layout");
    redirect("/user/dashboard");
  }
}
