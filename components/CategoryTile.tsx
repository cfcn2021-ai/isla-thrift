import Link from "next/link";
import { PlaceholderImage } from "./PlaceholderImage";

type Props = {
  href: string;
  label: string;
  index: number;
};

export function CategoryTile({ href, label, index }: Props) {
  return (
    <Link
      href={href}
      className="group relative block aspect-square overflow-hidden rounded-xl"
    >
      <div className="absolute inset-0 transition-transform duration-500 ease-out-soft group-hover:scale-[1.04]">
        <PlaceholderImage kind="category" index={index} />
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
