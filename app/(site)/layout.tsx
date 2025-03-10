// app/(site)/layout.tsx
import "../globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="border-grid flex min-h-screen flex-1 flex-col">
      <div className="hidden fixed w-full md:block z-50">
        <SiteHeader />
      </div>
      <SidebarProvider>
        <main className="flex flex-1 flex-col items-center pb-24 md:pb-0 md:mt-16 mb-auto">
          <div className="block md:hidden">
            <AppSidebar />
          </div>
          <div className="fixed top-4 right-4 z-50 block md:hidden">
            <SidebarTrigger />
          </div>
          {children}
        </main>
      </SidebarProvider>
      <SiteFooter />
    </div>
  );
}
