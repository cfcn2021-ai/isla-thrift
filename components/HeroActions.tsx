"use client";

import { useRouter } from "next/navigation";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";

export function HeroActions() {
  const router = useRouter();
  return (
    <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 w-full max-w-xs sm:max-w-none mx-auto">
      <GlassButton
        size="lg"
        onClick={() => router.push("/collections/new-arrivals")}
        onMouseEnter={() => router.prefetch("/collections/new-arrivals")}
        glassColor="oklch(100% 0 0 / 18%)"
        className="w-full sm:w-auto text-white"
      >
        Shop New Arrivals
      </GlassButton>
      <GlassButton
        size="lg"
        onClick={() => router.push("/about")}
        onMouseEnter={() => router.prefetch("/about")}
        glassColor="oklch(100% 0 0 / 8%)"
        className="w-full sm:w-auto text-white"
      >
        The story →
      </GlassButton>
    </div>
  );
}
