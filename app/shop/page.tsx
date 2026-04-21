// app/shop/page.tsx
import { prisma } from "@/lib/db";
import Link from "next/link";
import ProductFilters from "../components/shop/ProductFilters";
import { PackageX } from "lucide-react";

// Fallback image in case a product is missing one
const PLACEHOLDER_IMG =
  "https://placehold.co/600x800/e2e8f0/64748b?text=No+Image";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // 1. Await the parameters from the URL
  const params = await searchParams;
  const categoryId =
    typeof params.category === "string" && params.category !== "all"
      ? parseInt(params.category)
      : undefined;
  const sort = typeof params.sort === "string" ? params.sort : "newest";

  // 2. Build the database query dynamically based on the URL
  let orderBy: any = { id: "desc" }; // Default: Newest
  if (sort === "price-asc") orderBy = { price: "asc" };
  if (sort === "price-desc") orderBy = { price: "desc" };

  // 3. Fetch Products and Categories simultaneously
  const [products, categories] = await Promise.all([
    prisma.product.findMany({
      where: {
        ...(categoryId ? { categoryId } : {}),
        inStock: true,
      },
      orderBy,
      include: { category: true },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Premium Page Header */}
        <div className="mb-12 pb-8 border-b border-slate-100 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
              The Collection
            </h1>
            <p className="mt-4 text-lg text-slate-500">
              Explore our full range of premium handcrafted leather goods.
              Designed for durability and timeless style.
            </p>
          </div>
          <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">
            {products.length} {products.length === 1 ? "Product" : "Products"}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Sidebar: Filters */}
          <div className="lg:w-64 shrink-0">
            <ProductFilters categories={categories} />
          </div>

          {/* Right Area: Product Grid */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="bg-slate-50 rounded-3xl p-16 text-center border border-slate-100 flex flex-col items-center">
                <PackageX className="h-16 w-16 text-slate-300 mb-6" />
                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                  No products found
                </h3>
                <p className="text-slate-500 max-w-sm mb-8">
                  We couldn't find anything matching those filters. Try clearing
                  them to see all our items.
                </p>
                <Link
                  href="/shop"
                  className="bg-slate-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-slate-800 transition-colors"
                >
                  Clear All Filters
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12">
                {products.map((product) => {
                  // THE FIX: Grab the Cloudinary URL and use the placeholder if missing
                  const firstImage = product.images
                    ? product.images.split(",")[0]
                    : PLACEHOLDER_IMG;

                  return (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      className="group flex flex-col"
                    >
                      {/* Product Image Container */}
                      <div className="relative aspect-[4/5] w-full overflow-hidden bg-slate-50 rounded-2xl mb-5">
                        {/* THE FIX: Real Image Tag with Hover Zoom */}
                        <img
                          src={firstImage}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />

                        {/* Premium Dark Overlay on Hover */}
                        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Quick View Button */}
                        <div className="absolute inset-x-4 bottom-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                          <div className="w-full bg-slate-900/95 backdrop-blur-sm text-white text-center py-3.5 rounded-xl font-bold shadow-lg">
                            View Details
                          </div>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="px-1 flex flex-col flex-1">
                        <p className="text-xs font-bold text-slate-400 tracking-widest uppercase mb-1.5">
                          {product.category.name}
                        </p>

                        <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-amber-600 transition-colors">
                          {product.name}
                        </h3>

                        <div className="mt-auto pt-2">
                          <p className="text-lg font-extrabold text-amber-600">
                            Rs {Number(product.price).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
