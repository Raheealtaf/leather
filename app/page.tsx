// src/app/page.tsx
import Link from "next/link";
import { ShieldCheck, Truck, RefreshCcw, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";

// =========================================
// 1. IMPORT ALL YOUR NEW ASSETS HERE
// =========================================

import jacketPic from "./assets/5.jpeg";
import travelBagPic from "./assets/02.jpeg";
import accessoriesPic from "./assets/4.jpeg";

import desktopBanner from "./assets/heroo.png";
import mobileBanner from "./assets/mobile.jpeg";
import AnimateIn from "./components/AnimateIn";

export const dynamic = "force-dynamic";

const PLACEHOLDER_IMG =
  "https://placehold.co/600x800/e2e8f0/64748b?text=No+Image";

// Extended categories for the new Circular Navigation
const circleCategories = [
  { name: "Jackets", href: "/categories/jackets", img: jacketPic.src },
  { name: "Travel Bags", href: "/categories/bags", img: travelBagPic.src },
  {
    name: "Accessories",
    href: "/categories/accessories",
    img: accessoriesPic.src,
  },
  // Reusing an image for demonstration. Add your own wallet/belt images!
  { name: "Wallets", href: "/categories/wallets", img: accessoriesPic.src },
];

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    take: 4,
    orderBy: { id: "desc" },
    include: { category: true },
  });

  return (
    // bg-[#FDFBF7] is a very soft, premium warm canvas color (no harsh white)
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-[#111] font-sans pt-16 sm:pt-20">
      <AnimateIn>
        {/* ── 1. FULL-BLEED HERO SECTION (No Borders) ── */}
        <section className="w-full">
          <Link href="/shop" className="block w-full lg:hidden relative group">
            <img
              src={mobileBanner.src}
              alt="Discover the Collection"
              className="w-full h-[75vh] object-cover"
            />
            {/* Elegant text overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 bg-gradient-to-t from-black/60 to-transparent">
              <h2 className="text-white text-3xl font-serif tracking-wide mb-4">
                Autumn Collection
              </h2>
              <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase border-b border-white pb-1">
                Shop Now
              </span>
            </div>
          </Link>

          <Link href="/shop" className="hidden lg:block w-full relative group">
            <img
              src={desktopBanner.src}
              alt="Discover the Collection"
              className="w-full h-[85vh] object-cover"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 bg-gradient-to-t from-black/40 to-transparent">
              <h2 className="text-white text-5xl font-serif tracking-wide mb-6">
                The Heritage Series
              </h2>
              <span className="text-white text-[11px] font-bold tracking-[0.25em] uppercase border-b border-white pb-1 hover:text-gray-300 hover:border-gray-300 transition-colors">
                Explore the Campaign
              </span>
            </div>
          </Link>
        </section>

        {/* ── 2. CIRCULAR CATEGORY NAVIGATION ── */}
        <section className="py-16 md:py-24 border-b border-gray-200/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center gap-8 md:gap-20 overflow-x-auto no-scrollbar snap-x px-4">
              {circleCategories.map((cat, index) => (
                <Link
                  key={index}
                  href={cat.href}
                  className="group flex flex-col items-center gap-5 min-w-[90px] snap-center"
                >
                  {/* Perfect Circle Image Container */}
                  <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border-2 border-transparent group-hover:border-[#C8A96E] transition-all duration-300 p-1">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-100">
                      <img
                        src={cat.img}
                        alt={cat.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  {/* Clean, tracked-out text */}
                  <span className="text-[10px] md:text-xs tracking-[0.2em] uppercase font-semibold text-gray-900 group-hover:text-[#C8A96E] transition-colors">
                    {cat.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. FEATURED PRODUCTS (Minimalist Grid) ── */}
        <section className="py-20 md:py-32">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            {/* Elegant Centered Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif text-[#111] tracking-wide mb-4">
                Curated Additions
              </h2>
              <Link
                href="/shop"
                className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-500 hover:text-black transition-colors"
              >
                View Complete Catalogue →
              </Link>
            </div>

            {/* Borderless Product Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-10 md:gap-y-16">
              {featuredProducts.map((product) => {
                const firstImage = product.images
                  ? product.images.split(",")[0]
                  : PLACEHOLDER_IMG;

                return (
                  <Link
                    key={product.id}
                    href={`/product/${product.id}`}
                    className="group flex flex-col"
                  >
                    {/* Minimal Image Container */}
                    <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-6">
                      <img
                        src={firstImage}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                      {/* Gentle Hover Overlay */}
                      <div className="absolute inset-0 bg-black/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    </div>

                    {/* Centered Minimalist Typography */}
                    <div className="flex flex-col text-center space-y-2">
                      <p className="text-[9px] font-bold tracking-[0.2em] text-gray-400 uppercase">
                        {product.category.name}
                      </p>
                      <h3 className="text-sm font-semibold text-[#111] uppercase tracking-wider line-clamp-1 group-hover:text-[#C8A96E] transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 font-medium">
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
        <section className="py-20 border-t border-gray-200/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Open, airy grid with no vertical dividers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center">
                <Truck className="h-7 w-7 text-gray-800 stroke-[1.5] mb-5" />
                <h3 className="text-xs font-bold tracking-[0.15em] uppercase mb-2 text-[#111]">
                  Complimentary Delivery
                </h3>
                <p className="text-[11px] text-gray-500 tracking-wide max-w-[200px]">
                  On all orders exceeding Rs 10,000 across Pakistan.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <ShieldCheck className="h-7 w-7 text-gray-800 stroke-[1.5] mb-5" />
                <h3 className="text-xs font-bold tracking-[0.15em] uppercase mb-2 text-[#111]">
                  Heritage Craftsmanship
                </h3>
                <p className="text-[11px] text-gray-500 tracking-wide max-w-[200px]">
                  Ethically sourced, 100% genuine full-grain leather.
                </p>
              </div>

              <div className="flex flex-col items-center">
                <RefreshCcw className="h-7 w-7 text-gray-800 stroke-[1.5] mb-5" />
                <h3 className="text-xs font-bold tracking-[0.15em] uppercase mb-2 text-[#111]">
                  Hassle-Free Returns
                </h3>
                <p className="text-[11px] text-gray-500 tracking-wide max-w-[200px]">
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
