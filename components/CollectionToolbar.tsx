"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  clothingTypeOptions,
  conditionOptions,
  priceBands as defaultPriceBands,
  sortOptions,
  type Facets,
  type PriceBand,
  type SortKey,
} from "@/lib/filterProducts";
import type { ClothingType, Condition } from "@/lib/products";

type Props = {
  facets: Facets;
  // Hide the brand facet on /brands/[slug] (the listing is already brand-scoped).
  showBrandFilter?: boolean;
  // Show the clothing-Type facet (only on /collections/clothing).
  showClothingTypeFilter?: boolean;
  // Override the price band set (shoes get a higher-bracket scale).
  priceBands?: PriceBand[];
  // Current values, derived server-side from searchParams. We accept them as
  // primitives so the component is trivially serializable across the boundary.
  selectedConditions: Condition[];
  selectedBrandSlugs: string[];
  selectedPriceBands: string[];
  selectedClothingTypes: ClothingType[];
  includeSold: boolean;
  sort: SortKey;
  totalShown: number;
};

export function CollectionToolbar({
  facets,
  showBrandFilter = true,
  showClothingTypeFilter = false,
  priceBands = defaultPriceBands,
  selectedConditions,
  selectedBrandSlugs,
  selectedPriceBands,
  selectedClothingTypes,
  includeSold,
  sort,
  totalShown,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  function pushParams(sp: URLSearchParams) {
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  function toggleListValue(key: string, value: string) {
    const sp = new URLSearchParams(searchParams.toString());
    const current = (sp.get(key)?.split(",") ?? []).filter(Boolean);
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    if (next.length === 0) sp.delete(key);
    else sp.set(key, next.join(","));
    pushParams(sp);
  }

  function setScalar(key: string, value: string | null) {
    const sp = new URLSearchParams(searchParams.toString());
    if (!value) sp.delete(key);
    else sp.set(key, value);
    pushParams(sp);
  }

  function resetAll() {
    router.replace(pathname, { scroll: false });
  }

  const activeCount =
    selectedConditions.length +
    selectedBrandSlugs.length +
    selectedPriceBands.length +
    selectedClothingTypes.length +
    (!includeSold ? 1 : 0);

  const filterBody = (
    <>
      {showClothingTypeFilter && facets.clothingTypes.length > 0 && (
        <FacetGroup label="Type">
          {clothingTypeOptions.map((t) => {
            const facet = facets.clothingTypes.find((f) => f.value === t.value);
            if (!facet) return null;
            return (
              <FacetCheckbox
                key={t.value}
                label={t.label}
                count={facet.count}
                checked={selectedClothingTypes.includes(t.value)}
                onChange={() => toggleListValue("type", t.value)}
              />
            );
          })}
        </FacetGroup>
      )}

      <FacetGroup label="Condition">
        {conditionOptions.map((c) => {
          const facet = facets.conditions.find((f) => f.value === c.value);
          if (!facet) return null;
          return (
            <FacetCheckbox
              key={c.value}
              label={c.label}
              count={facet.count}
              checked={selectedConditions.includes(c.value)}
              onChange={() => toggleListValue("condition", c.value)}
            />
          );
        })}
      </FacetGroup>

      {showBrandFilter && facets.brands.length > 1 && (
        <FacetGroup label="Brand">
          {facets.brands.map((b) => (
            <FacetCheckbox
              key={b.slug}
              label={b.name}
              count={b.count}
              checked={selectedBrandSlugs.includes(b.slug)}
              onChange={() => toggleListValue("brand", b.slug)}
            />
          ))}
        </FacetGroup>
      )}

      <FacetGroup label="Price">
        {priceBands.map((band) => (
          <FacetCheckbox
            key={band.value}
            label={band.label}
            checked={selectedPriceBands.includes(band.value)}
            onChange={() => toggleListValue("price", band.value)}
          />
        ))}
      </FacetGroup>

      {facets.soldCount > 0 && (
        <FacetGroup label="Availability">
          <FacetCheckbox
            label={`Hide sold items`}
            count={facets.soldCount}
            checked={!includeSold}
            onChange={() => setScalar("include-sold", includeSold ? "0" : null)}
          />
        </FacetGroup>
      )}

      {activeCount > 0 && (
        <button
          onClick={resetAll}
          className="mt-2 text-xs uppercase tracking-wide2 text-ink-muted underline press hover:text-ink"
        >
          Reset filters
        </button>
      )}
    </>
  );

  return (
    <>
      {/* Mobile bar — single row with Filters button + sort dropdown.
          Sticky-ish so it stays usable while the grid scrolls. */}
      <div className="lg:hidden flex items-center justify-between gap-3 mb-5">
        <button
          onClick={() => setMobileOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 border border-sand-200 rounded-full text-sm press hover:border-ink"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 4h10M4 7h6M5.5 10h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          Filter{activeCount > 0 && <span className="text-ink-muted">· {activeCount}</span>}
        </button>
        <SortSelect sort={sort} onChange={(v) => setScalar("sort", v === "newest" ? null : v)} />
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-[85%] max-w-sm bg-sand-50 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-5 h-16 border-b border-sand-200">
              <p className="font-display text-xl">Filter</p>
              <button
                aria-label="Close filters"
                onClick={() => setMobileOpen(false)}
                className="press p-2 -mr-2"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-6">{filterBody}</div>
            <div className="px-5 py-4 border-t border-sand-200">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-full px-6 py-3 bg-ink text-sand-50 text-sm uppercase tracking-wide2 press"
              >
                View {totalShown} {totalShown === 1 ? "item" : "items"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:block">{filterBody}</aside>

      {/* Desktop sort row — rendered next to grid via portal-free approach: the
          parent layout puts the grid in a sibling slot and we live in the sidebar
          slot. Sort dropdown for desktop lives in CollectionSortBar below. */}
    </>
  );
}

function FacetGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-8">
      <p className="text-xs uppercase tracking-wide2 text-ink-muted mb-3">{label}</p>
      <ul className="space-y-2">{children}</ul>
    </div>
  );
}

function FacetCheckbox({
  label,
  count,
  checked,
  onChange,
}: {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <li>
      <label className="flex items-center gap-2 text-sm text-ink cursor-pointer press">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="accent-accent-dark w-3.5 h-3.5"
        />
        <span className="flex-1">{label}</span>
        {typeof count === "number" && (
          <span className="text-xs text-ink-muted">{count}</span>
        )}
      </label>
    </li>
  );
}

// Desktop sort dropdown — exported separately so the parent layout can render it
// at the top of the grid column rather than inside the sidebar.
export function CollectionSortBar({
  sort,
  totalShown,
}: {
  sort: SortKey;
  totalShown: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function setSort(value: string) {
    const sp = new URLSearchParams(searchParams.toString());
    if (value === "newest") sp.delete("sort");
    else sp.set("sort", value);
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  return (
    <div className="hidden lg:flex items-center justify-between mb-6">
      <p className="text-sm text-ink-muted">
        {totalShown} {totalShown === 1 ? "item" : "items"}
      </p>
      <SortSelect sort={sort} onChange={setSort} />
    </div>
  );
}

function SortSelect({
  sort,
  onChange,
}: {
  sort: SortKey;
  onChange: (v: string) => void;
}) {
  return (
    <label className="text-sm text-ink-muted flex items-center gap-2">
      Sort
      <select
        value={sort}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent border border-sand-200 rounded-full px-3 py-1.5 text-sm focus:outline-none focus:border-ink press"
      >
        {sortOptions.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
