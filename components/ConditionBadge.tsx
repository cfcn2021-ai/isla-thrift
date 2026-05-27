import { conditionLabels, type Condition } from "@/lib/products";

const styles: Record<Condition, string> = {
  like_new: "bg-yellow-100 text-yellow-500 ring-yellow-300/60",
  good: "bg-emerald-100 text-emerald-600 ring-emerald-300/60",
  fair: "bg-sand-200 text-ink-muted ring-sand-200",
};

const icons: Record<Condition, React.ReactElement> = {
  like_new: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.6 6.6L22 9.7l-5.4 4.9L18 22l-6-3.5L6 22l1.4-7.4L2 9.7l7.4-1.1L12 2Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  ),
  good: (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
      <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  fair: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M3 13c1.6-3.2 4-3.2 6 0s4.4 3.2 6 0 4.4-3.2 6 0" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

export function ConditionBadge({
  condition,
  size = "sm",
}: {
  condition: Condition;
  size?: "xs" | "sm";
}) {
  const dim = size === "xs" ? "w-6 h-6" : "w-7 h-7";
  return (
    <span
      aria-label={conditionLabels[condition]}
      title={conditionLabels[condition]}
      className={`inline-flex items-center justify-center rounded-full ring-1 ring-inset ${dim} ${styles[condition]}`}
    >
      {icons[condition]}
    </span>
  );
}
