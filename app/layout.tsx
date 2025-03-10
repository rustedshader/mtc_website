import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Inter } from "next/font/google";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

// We are gonna use Inter font !
const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});
const interMono = Inter({
  variable: "--font-inter-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Microsoft Technical Community",
  description: "The official website of Microsoft Technical Community UPES",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${interSans.variable} ${interMono.variable} antialiased`}
      >
        {/* Using Dark Theme Only ! */}
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
