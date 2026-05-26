// PLACEHOLDER COMPONENT
// Renders a warm gradient block with a label until you swap in real <img> tags.
// Each call has a `kind` that controls the label and color tint.
// To use real photos: replace <PlaceholderImage /> with next/image <Image src="..." />
// inside the relevant component (ProductCard, CategoryTile, hero, etc.).

type Kind =
  | "hero"
  | "category"
  | "product-card"
  | "product-main"
  | "product-thumb"
  | "featured"
  | "about";

type Props = {
  kind: Kind;
  index?: number;
  className?: string;
  rounded?: boolean;
};

const labels: Record<Kind, string> = {
  hero: "[ hero · 1440×900 ]",
  category: "[ category photo · 800×800 ]",
  "product-card": "[ product · 800×1000 ]",
  "product-main": "[ main photo · 1200×1500 ]",
  "product-thumb": "[ thumb · 300×375 ]",
  featured: "[ featured · 800×600 ]",
  about: "[ brand photo · 1200×800 ]",
};

const palettes: { from: string; to: string }[] = [
  { from: "#E8DFD0", to: "#D4C9B5" },
  { from: "#D4C5AF", to: "#B9A98C" },
  { from: "#C9BAA3", to: "#A8987F" },
  { from: "#BFB097", to: "#9C8C72" },
  { from: "#DCD0BB", to: "#C0B299" },
  { from: "#CFBFA4", to: "#B0A085" },
];

export function PlaceholderImage({
  kind,
  index = 0,
  className = "",
  rounded = false,
}: Props) {
  const palette = palettes[index % palettes.length];
  return (
    <div
      className={`relative w-full h-full overflow-hidden ${
        rounded ? "rounded-xl" : ""
      } ${className}`}
      style={{
        background: `linear-gradient(135deg, ${palette.from} 0%, ${palette.to} 100%)`,
      }}
      aria-hidden
    >
      <div className="absolute inset-0 grain opacity-50 mix-blend-multiply" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.1em] text-[#8B7D6B] uppercase">
          {labels[kind]}
        </span>
      </div>
    </div>
  );
}
