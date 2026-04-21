// src/app/page.tsx
import Link from "next/link";
import { ShieldCheck, Truck, RefreshCcw, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/db";
import FeaturedJacket from "./components/shop/FeaturedJacket";

// =========================================
// 1. IMPORT ALL YOUR NEW ASSETS HERE
// =========================================

// --- Categories Assets ---
import jacketPic from "./assets/5.jpeg"; // <-- (Ref image_6.jpeg from chat)
import travelBagPic from "./assets/02.jpeg"; // <-- (Ref image_25.jpeg from chat)
import accessoriesPic from "./assets/4.jpeg"; // <-- (Ref image_26.png from this turn!)

// --- Hero Banner Assets ---
import desktopBanner from "./assets/heroo.png"; // <-- Wide desktop banner
import mobileBanner from "./assets/mobile.jpeg"; // <-- Vertical mobile banner

export const dynamic = "force-dynamic";

const PLACEHOLDER_IMG =
  "https://placehold.co/600x800/e2e8f0/64748b?text=No+Image";

const categories = [
  {
    id: 1,
    name: "Premium Jackets",
    href: "/categories/jackets",
    // VISUAL UPGRADE: A professional shot of a rich brown leather jacket with gold RS hardware details (image_6.jpeg)
    img: jacketPic.src,
  },
  {
    id: 2,
    name: "Travel Bags",
    href: "/categories/bags",
    // VISUAL UPGRADE: A classic cowhide duffel bag, perfect for travel (image_25.jpeg)
    img: travelBagPic.src,
  },
  {
    id: 3,
    name: "Leather Accessories",
    href: "/categories/accessories",
    // VISUAL UPGRADE: A curated, high-fashion display of unique cowhide keyring straps (image_26.png)
    img: accessoriesPic.src,
  },
];

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    take: 4,
    orderBy: { id: "desc" },
    include: { category: true },
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. THE NEW RESPONSIVE HERO SECTION */}
      <section className="w-full bg-[#f8f7f5] pt-4 lg:pt-8 pb-8 lg:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* ===================================== */}
          {/* MOBILE HERO LINK (Shown by default, hidden from large screens) */}
          {/* ===================================== */}
          <Link
            href="/shop"
            className="block w-full lg:hidden rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={mobileBanner.src}
              alt="Discover the RS Leather Mobile Collection"
              className="w-full h-auto object-cover"
            />
          </Link>

          {/* ===================================== */}
          {/* DESKTOP HERO LINK (Hidden by default, shown only on large screens) */}
          {/* ===================================== */}
          <Link
            href="/shop"
            className="hidden lg:block w-full rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-500"
          >
            <img
              src={desktopBanner.src}
              alt="Sophisticated Style, Masterfully Crafted - Autumn Collection"
              className="w-full h-auto object-cover"
            />
          </Link>
        </div>
      </section>

      {/* 2. VALUE PROPOSITIONS */}
      <section className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600 mb-4 transition-transform hover:scale-110">
                <Truck className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Free Shipping
              </h3>
              <p className="mt-2 text-sm text-gray-500 max-w-xs">
                On all orders over Rs 10,000 across Pakistan.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600 mb-4 transition-transform hover:scale-110">
                <ShieldCheck className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                100% Genuine Leather
              </h3>
              <p className="mt-2 text-sm text-gray-500 max-w-xs">
                Ethically sourced and meticulously handcrafted.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-600 mb-4 transition-transform hover:scale-110">
                <RefreshCcw className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Easy Returns</h3>
              <p className="mt-2 text-sm text-gray-500 max-w-xs">
                7-day hassle-free return policy if you aren't satisfied.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Shop by Category
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="group relative h-[350px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all"
              >
                <div className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-110">
                  <img
                    src={category.img}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-2xl font-extrabold text-white mb-2">
                    {category.name}
                  </h3>
                  <span className="inline-flex items-center text-amber-400 font-bold tracking-wide uppercase text-sm group-hover:translate-x-2 transition-transform">
                    Explore <ArrowRight className="ml-2 h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. FEATURED PRODUCTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10 border-b border-slate-100 pb-4">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              New Arrivals
            </h2>
            <Link
              href="/shop"
              className="text-amber-600 hover:text-amber-500 font-bold flex items-center hidden sm:flex tracking-wide uppercase text-sm"
            >
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {featuredProducts.map((product) => {
              const firstImage = product.images
                ? product.images.split(",")[0]
                : PLACEHOLDER_IMG;

              return (
                <div key={product.id} className="group flex flex-col">
                  <Link
                    href={`/product/${product.id}`}
                    className="relative h-80 mb-5 rounded-2xl overflow-hidden bg-slate-50"
                  >
                    <img
                      src={firstImage}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <button className="w-full bg-slate-900/90 backdrop-blur-sm text-white font-bold py-3 rounded-xl shadow-lg hover:bg-slate-800 transition-colors">
                        View Details
                      </button>
                    </div>
                  </Link>

                  <div className="px-1">
                    <p className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-1">
                      {product.category.name}
                    </p>
                    <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 group-hover:text-amber-600 transition-colors">
                      <Link href={`/product/${product.id}`}>
                        {product.name}
                      </Link>
                    </h3>
                    <p className="text-amber-600 font-extrabold text-lg">
                      Rs {Number(product.price).toLocaleString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FEATURED JACKET COMPONENT */}
      {/* <FeaturedJacket /> */}
    </div>
  );
}
