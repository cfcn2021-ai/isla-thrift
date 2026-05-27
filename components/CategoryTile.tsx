import Link from "next/link";
import { PlaceholderImage } from "./PlaceholderImage";

type Props = {
  href: string;
  label: string;
  index: number;
  // Real photo for the tile background. If omitted, falls back to the gradient placeholder.
  bgImage?: string;
  // CSS object-position for the bg image (e.g. "50% 80%" to favor the bottom — useful
  // when the photo has multiple subjects and we want to crop to one of them).
  bgPosition?: string;
  // CSS object-fit. Defaults to "cover"; pass "contain" if the photo shouldn't crop.
  bgFit?: "cover" | "contain";
  // Extra zoom on top of object-fit. 1 = native; 1.5 means render at 150% so the
  // visible crop is 1/1.5 of the photo (a tighter zoom into bgPosition).
  bgScale?: number;
};

export function CategoryTile({
  href,
  label,
  index,
  bgImage,
  bgPosition = "center",
  bgFit = "cover",
  bgScale = 1,
}: Props) {
  return (
    <Link
      href={href}
      className="group relative block aspect-square overflow-hidden rounded-xl"
    >
      <div className="absolute inset-0 transition-transform duration-500 ease-out-soft group-hover:scale-[1.04]">
        {bgImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={bgImage}
            alt=""
            aria-hidden
            style={{
              objectPosition: bgPosition,
              transform: bgScale !== 1 ? `scale(${bgScale})` : undefined,
              transformOrigin: bgPosition,
            }}
            className={`w-full h-full ${bgFit === "contain" ? "object-contain" : "object-cover"}`}
          />
        ) : (
          <PlaceholderImage kind="category" index={index} />
        )}
      </div>
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/55 to-transparent" />
      <div className="absolute inset-0 flex items-end p-5 sm:p-7">
        <div className="transition-transform duration-300 ease-out-soft group-hover:-translate-y-1">
          <p className="text-[11px] uppercase tracking-wide2 text-sand-50/80">Shop</p>
          <p className="font-display text-2xl sm:text-3xl text-sand-50">{label}</p>
        </div>
      </div>
    </Link>
  );
}
