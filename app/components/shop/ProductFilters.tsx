// components/shop/ProductFilters.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Filter, X } from "lucide-react";

type Category = { id: number; name: string };

export default function ProductFilters({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Read current URL filters
  const currentCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "newest";

  // Function to update the URL when a user clicks a filter
  const updateFilter = (type: "category" | "sort", value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(type, value);
    router.push(`/shop?${params.toString()}`);
    setIsMobileOpen(false); // Close mobile menu after clicking
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Category Filter */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Categories</h3>
        <div className="space-y-3">
          <button
            onClick={() => updateFilter("category", "all")}
            className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
              currentCategory === "all"
                ? "bg-amber-100 text-amber-900 font-bold"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => updateFilter("category", cat.id.toString())}
              className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                currentCategory === cat.id.toString()
                  ? "bg-amber-100 text-amber-900 font-bold"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Sort Filter */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Sort By</h3>
        <select
          value={currentSort}
          onChange={(e) => updateFilter("sort", e.target.value)}
          className="w-full border border-slate-300 rounded-md px-4 py-2 text-slate-900 focus:ring-amber-500 focus:border-amber-500"
        >
          <option value="newest">Newest Arrivals</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Toggle Button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-lg font-bold"
        >
          <Filter size={20} />
          Filter & Sort
        </button>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 shrink-0">
        <FilterContent />
      </div>

      {/* Mobile Slide-over Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          {/* Dark Overlay */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Drawer Content */}
          <div className="relative ml-auto w-full max-w-xs bg-white h-full shadow-xl p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-900">Filters</h2>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-2 text-slate-500 hover:bg-slate-100 rounded-full"
              >
                <X size={24} />
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
}
