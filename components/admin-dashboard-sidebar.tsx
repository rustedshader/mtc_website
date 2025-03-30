import { Home, Notebook, NotebookPen, Users } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LogoutButton } from "./logout-button";

const items = [
  {
    title: "Home",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "All Posts",
    url: "/admin/dashboard/all-posts",
    icon: Notebook,
  },
  {
    title: "Create Posts",
    url: "/admin/dashboard/create-post",
    icon: NotebookPen,
  },
  {
    title: "Registered Users",
    url: "/admin/dashboard/registered-users",
    icon: Users,
  },
  {
    title: "Payment Pending Users",
    url: "/admin/dashboard/payment-pending-users",
    icon: Users,
  },
  {
    title: "Verify Payment",
    url: "/admin/dashboard/verify-payment",
    icon: Users,
  },
  {
    icon: LogoutButton,
  },
];

export function AdminDashboardSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
