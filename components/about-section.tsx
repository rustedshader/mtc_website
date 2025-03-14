"use client";

import { siteConfig } from "@/config/site";
import { OrbitingCirclesDemo } from "./orbiting-mtc";
import { MagicCard } from "./ui/magic-card";

export default function About() {
  return (
    <MagicCard className="p-4 sm:p-6 opacity-90 transform transition-transform">
      <div className="flex flex-col sm:flex-row items-center gap-8">
        <div className="flex-1 text-left space-y-4">
          <h2 className="font-bold text-3xl sm:text-4xl md:text-6xl text-center sm:text-left">
            About Us
          </h2>
          <div className="text-muted-foreground text-sm sm:text-base leading-relaxed">
            {siteConfig.about}
          </div>
        </div>
        <div className="w-full sm:w-1/2 mt-4 sm:mt-0">
          <OrbitingCirclesDemo />
        </div>
      </div>
    </MagicCard>
  );
}
