// src/app/page.tsx
import Link from "next/link";
import { ShieldCheck, Truck, RefreshCcw, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";

// =========================================
// 1. IMPORT ALL YOUR NEW ASSETS HERE
// =========================================
import desktopBanner from "./assets/heroo.png";
import mobileBanner from "./assets/mobile.jpeg";
import AnimateIn from "./components/AnimateIn";

export const dynamic = "force-dynamic";

const PLACEHOLDER_IMG =
  "https://placehold.co/600x800/e2e8f0/64748b?text=No+Image";

export default async function Home() {
  // FETCH FEATURED PRODUCTS
  const featuredProducts = await prisma.product.findMany({
    take: 4,
    orderBy: { id: "desc" },
    include: { category: true },
  });

  // FETCH CATEGORIES DIRECTLY FROM YOUR DATABASE
  const dbCategories = await prisma.category.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <div className="flex flex-col min-h-[100dvh] bg-[#FDFBF7] text-[#111] font-sans pb-20 md:pb-0">
      <AnimateIn>
        {/* ── 1. FULL-BLEED HERO SECTION ── */}
        <section className="w-full">
          {/* Mobile Hero */}
          <Link href="/shop" className="block w-full lg:hidden relative group">
            <img
              src={mobileBanner.src}
              alt="Discover the Collection"
              className="w-full h-[70vh] sm:h-[75vh] object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-12 sm:pb-16 bg-gradient-to-t from-black/70 via-black/20 to-transparent px-4 text-center">
              <h2 className="text-white text-3xl sm:text-4xl font-serif tracking-wide mb-4">
                Leather Collection
              </h2>
              <span className="text-white text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase border-b border-white pb-1">
                Shop Now
              </span>
            </div>
          </Link>

          {/* Desktop Hero */}
          <Link href="/shop" className="hidden lg:block w-full relative group">
            <img
              src={desktopBanner.src}
              alt="Discover the Collection"
              className="w-full h-[85vh] object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 bg-gradient-to-t from-black/50 via-black/10 to-transparent">
              <h2 className="text-white text-5xl font-serif tracking-wide mb-6">
                The Heritage Series
              </h2>
              <span className="text-white text-[11px] font-bold tracking-[0.25em] uppercase border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-colors">
                Explore the Campaign
              </span>
            </div>
          </Link>
        </section>

        {/* ── 2. DYNAMIC CIRCULAR CATEGORY NAVIGATION ── */}
        <section className="py-12 sm:py-16 md:py-24 border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-start md:justify-center gap-6 sm:gap-8 md:gap-20 overflow-x-auto no-scrollbar snap-x pb-4">
              {dbCategories.length === 0 && (
                <p className="text-xs text-gray-400 tracking-widest uppercase w-full text-center">
                  No categories found.
                </p>
              )}

              {dbCategories.map((cat) => {
                const categorySlug = cat.name
                  .toLowerCase()
                  .replace(/\s+/g, "-");
                const imageSrc =
                  cat.imageUrl ||
                  "https://placehold.co/400x400/f3f4f6/9ca3af?text=No+Image";

                return (
                  <Link
                    key={cat.id}
                    href={`/categories/${categorySlug}`}
                    className="group flex flex-col items-center gap-3 sm:gap-5 min-w-[80px] sm:min-w-[90px] snap-start md:snap-center"
                  >
                    {/* Circle Image Container */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#C8A96E] transition-all duration-300 p-1 shrink-0">
                      <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                        <img
                          src={imageSrc}
                          alt={cat.name}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                      </div>
                    </div>

                    <span className="text-[9px] sm:text-[10px] md:text-xs tracking-[0.15em] sm:tracking-[0.2em] uppercase font-semibold text-gray-900 group-hover:text-[#C8A96E] transition-colors whitespace-nowrap text-center">
                      {cat.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 3. FEATURED PRODUCTS (Minimalist Grid) ── */}
        <section className="py-16 sm:py-20 md:py-32">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#111] tracking-wide mb-3 sm:mb-4">
                Curated Additions
              </h2>
              <Link
                href="/shop"
                className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 hover:text-black transition-colors flex items-center justify-center gap-2"
              >
                View Complete Catalogue <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-3 sm:gap-x-6 md:gap-x-10 gap-y-10 sm:gap-y-12 md:gap-y-16">
              {featuredProducts.map((product) => {
                const firstImage = product.images
                  ? product.images.split(",")[0]
                  : PLACEHOLDER_IMG;

                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="group flex flex-col h-full"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 sm:mb-6 rounded-sm">
                      <img
                        src={firstImage}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>

                    <div className="flex flex-col text-center space-y-1 sm:space-y-2 flex-grow justify-between">
                      <div>
                        <p className="text-[8px] sm:text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase mb-1">
                          {product.category?.name || "Uncategorized"}
                        </p>
                        <h3 className="text-xs sm:text-sm font-semibold text-[#111] uppercase tracking-wider line-clamp-2 sm:line-clamp-1 group-hover:text-[#C8A96E] transition-colors leading-tight px-1">
                          {product.name}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium mt-2">
                        Rs {Number(product.price).toLocaleString()}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 4. SOFT VALUE PROPOSITIONS ── */}
        <section className="pt-16 pb-8 sm:py-20 border-t border-gray-200/50">
          <div className="max-w-6xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-12 text-center">
              <div className="flex flex-col items-center">
                <Truck className="h-6 w-6 sm:h-7 sm:w-7 text-gray-800 stroke-[1.5] mb-4 sm:mb-5" />
                <h3 className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase mb-2 text-[#111]">
                  Complimentary Delivery
                </h3>
                <p className="text-[10px] sm:text-[11px] text-gray-500 tracking-wide max-w-[220px]">
                  On all orders exceeding Rs 10,000 across Pakistan.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <ShieldCheck className="h-6 w-6 sm:h-7 sm:w-7 text-gray-800 stroke-[1.5] mb-4 sm:mb-5" />
                <h3 className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase mb-2 text-[#111]">
                  Heritage Craftsmanship
                </h3>
                <p className="text-[10px] sm:text-[11px] text-gray-500 tracking-wide max-w-[220px]">
                  Ethically sourced, 100% genuine full-grain leather.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <RefreshCcw className="h-6 w-6 sm:h-7 sm:w-7 text-gray-800 stroke-[1.5] mb-4 sm:mb-5" />
                <h3 className="text-[10px] sm:text-xs font-bold tracking-[0.15em] uppercase mb-2 text-[#111]">
                  Hassle-Free Returns
                </h3>
                <p className="text-[10px] sm:text-[11px] text-gray-500 tracking-wide max-w-[220px]">
                  7-day return policy for complete peace of mind.
                </p>
              </div>
            </div>
          </div>
        </section>
      </AnimateIn>
    </div>
  );
}
