// app/(admin)/admin/dashboard/layout.tsx

import { AdminDashboardSidebar } from "@/components/admin-dashboard-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { stackServerApp } from "@/stack";
import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

const prisma = new PrismaClient();

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if user is authenticated and is admin
  const user = await stackServerApp.getUser();
  if (!user) {
    redirect("/");
  }

  const userData = await prisma.registeredUsers.findUnique({
    where: { id: user.id },
  });

  if (!userData || userData.role !== "ADMIN") {
    redirect("/user/dashboard");
  }

  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <AdminDashboardSidebar />
        <main className="flex-1 p-4">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
