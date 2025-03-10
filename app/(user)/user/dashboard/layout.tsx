// app/(user)/user/dashboard/layout.tsx

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { UserDashboardSidebar } from "@/components/user-dashboard-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <UserDashboardSidebar />
        <main className="flex-1 p-4">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </div>
  );
}
