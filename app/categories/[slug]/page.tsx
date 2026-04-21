// app/categories/[slug]/page.tsx
import { prisma } from "@/lib/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PackageX, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // 1. Read the URL (e.g., "jackets" or "travel-bags")
  const resolvedParams = await params;

  // Clean up the URL string so we can search the database with it
  // Turns "travel-bags" into "travel bags"
  const searchTerm = resolvedParams.slug.replace(/-/g, " ");

  // 2. Find the category in the database
  const category = await prisma.category.findFirst({
    where: {
      name: {
        contains: searchTerm, // Matches "Premium Jackets" if URL is "jackets"
      },
    },
  });

  // If the category doesn't exist, show a 404 page
  if (!category) {
    notFound();
  }

  // 3. Fetch ONLY the products that belong to this specific category
  const products = await prisma.product.findMany({
    where: {
      categoryId: category.id,
      inStock: true,
    },
    orderBy: { id: "desc" },
    include: { category: true },
  });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* 1. DYNAMIC HERO SECTION */}
      <section className="bg-slate-900 text-white py-16 lg:py-24 border-b-8 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-amber-500 font-bold tracking-widest uppercase text-sm mb-4">
            Curated Collection
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 capitalize">
            {category.name}
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
            {category.description ||
              `Explore our exclusive range of high-quality ${category.name.toLowerCase()}, handcrafted for the modern lifestyle.`}
          </p>
        </div>
      </section>

      {/* 2. PRODUCT GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Back to Shop Navigation */}
        <div className="mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-amber-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to All Products
          </Link>
        </div>

        {products.length === 0 ? (
          // Empty State if no products are in this category yet
          <div className="bg-white rounded-3xl p-16 text-center border border-slate-100 shadow-sm flex flex-col items-center">
            <PackageX className="h-20 w-20 text-slate-300 mb-6" />
            <h3 className="text-2xl font-bold text-slate-900">Coming Soon</h3>
            <p className="mt-2 text-slate-500 text-lg">
              We are currently crafting new items for the {category.name}{" "}
              collection.
            </p>
            <Link
              href="/shop"
              className="mt-8 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-8 rounded-lg transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          // The Beautiful Product Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => {
              const firstImageClass = product.images
                ? product.images.split(",")[0]
                : "bg-gray-100";

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-amber-200"
                >
                  {/* Product Image Placeholder */}
                  <div
                    className={`relative aspect-[4/5] w-full overflow-hidden ${firstImageClass}`}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute inset-x-4 bottom-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-full bg-slate-900 text-white text-center py-3 rounded-xl font-bold shadow-lg">
                        View Details
                      </div>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h3>

                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                      <p className="text-xl font-extrabold text-slate-900">
                        Rs {product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
