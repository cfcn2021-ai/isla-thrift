import Image from "next/image";
import { PlaceholderImage } from "./PlaceholderImage";
import type { ProductImage as Img } from "@/lib/products";

type Props = {
  image?: Img;
  fallbackKind:
    | "hero"
    | "product-card"
    | "product-main"
    | "product-thumb"
    | "category"
    | "featured"
    | "about";
  fallbackIndex?: number;
  sizes?: string;
  priority?: boolean;
  alt?: string;
};

export function ProductImage({
  image,
  fallbackKind,
  fallbackIndex = 0,
  sizes = "(max-width: 768px) 50vw, 33vw",
  priority = false,
  alt,
}: Props) {
  if (!image?.url) {
    return <PlaceholderImage kind={fallbackKind} index={fallbackIndex} />;
  }
  return (
    <Image
      src={image.url}
      alt={alt || image.alt || ""}
      fill
      sizes={sizes}
      placeholder={image.lqip ? "blur" : "empty"}
      blurDataURL={image.lqip}
      priority={priority}
      className="object-cover"
    />
  );
}
