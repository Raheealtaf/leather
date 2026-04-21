// components/SearchBar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2 } from "lucide-react";
import { getSearchSuggestions } from "@/app/actions/search";
import Link from "next/link";

// Define the type for our suggestions
type Suggestion = {
  id: number;
  name: string;
  price: number;
  images: string | null;
  category: { name: string };
};

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLFormElement>(null);

  // Handle the standard "Enter" key press
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() !== "") {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  // The Magic: Fetch suggestions when the user types
  useEffect(() => {
    // Only search if they typed at least 2 characters
    if (query.length >= 2) {
      setIsLoading(true);
      setIsOpen(true);

      // We use a "debounce" timer (300ms) so we don't hammer the database
      const delayDebounceFn = setTimeout(async () => {
        const results = await getSearchSuggestions(query);

        // FIX 1: Convert the Prisma Decimal price to a standard number for TypeScript
        const formattedResults = results.map((item: any) => ({
          ...item,
          price: Number(item.price),
        }));

        setSuggestions(formattedResults);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    } else {
      // Hide the dropdown if they delete their text
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [query]);

  // Close the dropdown if the user clicks anywhere outside of the search bar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <form
      ref={searchRef}
      onSubmit={handleSearch}
      className="relative w-full max-w-md z-50"
    >
      {/* The Search Input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          placeholder="Search for jackets, bags..."
          className="w-full bg-slate-100 border-none text-slate-900 px-4 py-2 pl-10 pr-10 rounded-full focus:ring-2 focus:ring-amber-500 transition-all placeholder:text-slate-500"
        />

        {/* Search Icon */}
        <button
          type="submit"
          className="absolute left-0 top-0 mt-2.5 ml-3 text-slate-500 hover:text-amber-500 transition-colors"
        >
          <Search size={18} />
        </button>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute right-0 top-0 mt-2.5 mr-3 text-amber-500">
            <Loader2 size={18} className="animate-spin" />
          </div>
        )}
      </div>

      {/* The Floating Suggestions Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-100 overflow-hidden">
          {suggestions.length > 0 ? (
            <div className="py-2">
              {/* List of matching products */}
              {suggestions.map((product) => {
                // Safely grab the first image URL
                const firstImage = product.images
                  ? product.images.split(",")[0]
                  : null;

                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    onClick={() => setIsOpen(false)} // Close dropdown when clicked
                    className="flex items-center gap-4 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0"
                  >
                    {/* FIX 2: Replaced the broken div with a proper Image container */}
                    <div className="h-12 w-12 rounded-md shrink-0 border border-slate-200 bg-slate-100 overflow-hidden flex items-center justify-center">
                      {firstImage ? (
                        <img
                          src={firstImage}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-[10px] text-slate-400 font-medium">
                          No Img
                        </span>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-amber-600 uppercase mb-0.5">
                        {product.category.name}
                      </p>
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {product.name}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="text-sm font-bold text-slate-500">
                      Rs {product.price.toLocaleString()}
                    </div>
                  </Link>
                );
              })}

              {/* View All Results Button */}
              <button
                type="submit"
                className="w-full text-center py-3 text-sm font-bold text-amber-600 hover:bg-amber-50 transition-colors border-t border-slate-100"
              >
                View all results for "{query}"
              </button>
            </div>
          ) : (
            // If they typed something but nothing was found (and it's not loading)
            !isLoading && (
              <div className="p-6 text-center text-slate-500 text-sm">
                No products found matching{" "}
                <span className="font-bold text-slate-900">"{query}"</span>
              </div>
            )
          )}
        </div>
      )}
    </form>
  );
}
