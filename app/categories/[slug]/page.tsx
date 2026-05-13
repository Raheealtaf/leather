// app/categories/[slug]/page.tsx
import { prisma } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PackageX, ArrowLeft, SlidersHorizontal } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const searchTerm = resolvedParams.slug.replace(/-/g, " ");

  const category = await prisma.category.findFirst({
    where: {
      name: {
        contains: searchTerm,
      },
    },
  });

  if (!category) {
    notFound();
  }

  const products = await prisma.product.findMany({
    where: {
      categoryId: category.id,
      inStock: true,
    },
    orderBy: { id: "desc" },
    include: { category: true },
  });

  // You can replace this with a dynamic category image from your database if you have one
  const bannerImage =
    "https://images.unsplash.com/photo-1594035910387-fea47714263f?q=80&w=2000&auto=format&fit=crop";

  return (
    <div className="min-h-screen bg-white font-sans text-black">
      {/* ── FULL-WIDTH EDITORIAL BANNER ────────────────────────────── */}
      <section className="relative w-full h-[50vh] md:h-[60vh] flex items-end justify-center pb-16 md:pb-24">
        {/* Banner Background */}
        <div className="absolute inset-0 bg-black overflow-hidden">
          <img
            src={bannerImage}
            alt={`${category.name} banner`}
            className="w-full h-full object-cover opacity-70"
          />
          {/* Gradient to ensure text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        {/* Banner Content */}
        <div className="relative z-10 text-center px-4 w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out">
          <div className="inline-block mb-4 border border-white/30 px-4 py-1 backdrop-blur-sm">
            <span className="text-white text-[10px] font-bold tracking-[0.2em] uppercase">
              The Collection
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-widest mb-4">
            {category.name}
          </h1>
          <p className="text-white/80 text-sm md:text-base max-w-xl mx-auto font-light tracking-wide">
            {category.description ||
              `Discover our exclusive selection of ${category.name.toLowerCase()}, crafted for elegance and everyday luxury.`}
          </p>
        </div>
      </section>

      {/* ── MINIMALIST TOOLBAR ──────────────────────────────────────── */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            href="/shop"
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gray-900 hover:text-gray-500 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          <div className="flex items-center gap-6 text-xs font-semibold uppercase tracking-widest text-gray-900">
            <span className="text-gray-500">{products.length} Items</span>
            <div className="h-3 w-px bg-gray-300" />
            <button className="flex items-center gap-2 hover:text-gray-500 transition-colors">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>
      </div>

      {/* ── BORDERLESS PRODUCT GRID ─────────────────────────────────── */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {products.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center text-center">
            <PackageX className="w-12 h-12 text-gray-300 mb-6" />
            <h2 className="text-xl font-bold uppercase tracking-widest">
              Collection Empty
            </h2>
            <p className="text-gray-500 mt-2 max-w-sm">
              We are currently updating our inventory for this category.
            </p>
            <Link
              href="/shop"
              className="mt-8 bg-black text-white text-xs font-bold uppercase tracking-widest py-4 px-10 hover:bg-gray-800 transition-colors"
            >
              Back to Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-12 md:gap-x-8 md:gap-y-16">
            {products.map((product) => {
              const firstImageUrl = product.images
                ? product.images.split(",")[0]
                : "/placeholder.jpg";

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group flex flex-col"
                >
                  {/* Clean, borderless image container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50 mb-4">
                    <img
                      src={firstImageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />

                    {/* Minimalist Quick Add overlay */}
                    <div className="absolute inset-x-4 bottom-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex justify-center">
                      <div className="bg-white/95 backdrop-blur-sm text-black text-[10px] font-bold uppercase tracking-[0.2em] py-3 px-6 shadow-lg hover:bg-black hover:text-white transition-colors w-full text-center cursor-pointer">
                        View Item
                      </div>
                    </div>
                  </div>

                  {/* Minimalist typography */}
                  <div className="flex flex-col text-center">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-1 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">
                      Rs {product.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
