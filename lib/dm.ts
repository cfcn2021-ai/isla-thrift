import { site } from "@/data/site";
import type { Product } from "@/lib/products";

function peso(n: number): string {
  return `₱${n.toLocaleString("en-PH")}`;
}

export function reserveMessage(p: Product): string {
  const lines = [
    `Hi Isla Thrifts! I'd like to reserve:`,
    ``,
    `• ${p.brand} — ${p.title}`,
    `• Size: ${p.size}`,
    `• Price: ${peso(p.price)}`,
    `• Link: ${site.url}/products/${p.slug}`,
    ``,
    `Is this still available?`,
  ];
  return lines.join("\n");
}

// Instagram does NOT honor `?text=` prefill on ig.me deep links (only Messenger
// does via m.me). So this URL just opens the chat — the UI is responsible for
// copying `reserveMessage(p)` to the clipboard so the buyer can paste.
export function instagramReserveUrl(): string {
  return `https://ig.me/m/${site.social.instagram}`;
}

export function messengerReserveUrl(p: Product): string {
  return `https://m.me/${site.social.messenger}?text=${encodeURIComponent(
    reserveMessage(p),
  )}`;
}

export function instagramProfileUrl(): string {
  return `https://instagram.com/${site.social.instagram}`;
}

export function facebookProfileUrl(): string {
  return `https://facebook.com/${site.social.facebook}`;
}

export function instagramFirstDibsUrl(): string {
  const msg = `hi Isla Thrifts! please add me to your drop list — I want first dibs on new arrivals 🛍`;
  return `https://ig.me/m/${site.social.instagram}?text=${encodeURIComponent(msg)}`;
}
