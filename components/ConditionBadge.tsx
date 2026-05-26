import { conditionLabels, type Condition } from "@/lib/products";

const styles: Record<Condition, string> = {
  like_new: "bg-emerald-50 text-emerald-800 ring-emerald-200/70",
  good: "bg-amber-50 text-amber-800 ring-amber-200/70",
  fair: "bg-stone-100 text-stone-700 ring-stone-200",
};

export function ConditionBadge({
  condition,
  size = "sm",
}: {
  condition: Condition;
  size?: "xs" | "sm";
}) {
  const dim = size === "xs" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-[11px]";
  return (
    <span
      className={`inline-flex items-center rounded-full ring-1 ring-inset font-medium tracking-wide ${dim} ${styles[condition]}`}
    >
      {conditionLabels[condition]}
    </span>
  );
}
