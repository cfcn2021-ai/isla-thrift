"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem("isla:bar:dismissed") === "1") {
      setDismissed(true);
    }
  }, []);

  if (dismissed) return null;

  return (
    <div className="bg-accent text-white text-[11px] sm:text-xs tracking-wide2 uppercase">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 lg:px-10 h-9 flex items-center justify-center relative">
        <p className="text-center leading-none">{site.shipping.notice}</p>
        <button
          aria-label="Dismiss"
          onClick={() => {
            setDismissed(true);
            window.sessionStorage.setItem("isla:bar:dismissed", "1");
          }}
          className="absolute right-3 sm:right-6 text-white/80 hover:text-white sm:hidden press"
        >
          ×
        </button>
      </div>
    </div>
  );
}
