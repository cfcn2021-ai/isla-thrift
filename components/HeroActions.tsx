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
        glassColor="oklch(100% 0 0 / 35%)"
        className="w-full sm:w-auto"
        contentClassName="text-white font-extrabold tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
      >
        Shop New Arrivals
      </GlassButton>
      <GlassButton
        size="lg"
        onClick={() => router.push("/about")}
        onMouseEnter={() => router.prefetch("/about")}
        glassColor="oklch(100% 0 0 / 22%)"
        className="w-full sm:w-auto"
        contentClassName="text-white font-extrabold tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]"
      >
        The story →
      </GlassButton>
    </div>
  );
}
