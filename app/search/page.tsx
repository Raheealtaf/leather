// app/search/page.tsx
import { prisma } from "@/lib/db";
import Link from "next/link";
import { PackageX, Search, ArrowLeft } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  // 1. Await and extract the search query from the URL (e.g., ?q=jacket)
  const params = await searchParams;
  const query = params.q || "";

  // 2. Fetch matching products from MySQL
  // We use "contains" to find the word anywhere in the product name or description
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { description: { contains: query } },
        { category: { name: { contains: query } } }, // Also search by category name!
      ],
      inStock: true, // Only show items that are in stock
    },
    orderBy: { id: "desc" },
    include: { category: true },
  });

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-12 border-b border-slate-200 pb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Search Results
          </h1>
          <p className="mt-4 text-lg text-slate-500">
            {query ? (
              <>
                Showing results for:{" "}
                <span className="font-bold text-slate-900">"{query}"</span>
              </>
            ) : (
              "Please enter a search term to find products."
            )}
          </p>
        </div>

        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/shop"
            className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-amber-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
          </Link>
        </div>

        {/* Display logic */}
        {!query ? (
          // If the user hasn't typed anything yet
          <div className="bg-white rounded-2xl p-16 text-center border border-slate-100 shadow-sm flex flex-col items-center">
            <Search className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-900">
              What are you looking for?
            </h3>
            <p className="mt-2 text-slate-500">
              Use the search bar above to find your perfect leather piece.
            </p>
          </div>
        ) : products.length === 0 ? (
          // If the search found zero matches
          <div className="bg-white rounded-2xl p-16 text-center border border-slate-100 shadow-sm flex flex-col items-center">
            <PackageX className="h-16 w-16 text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-900">
              No results found
            </h3>
            <p className="mt-2 text-slate-500">
              We couldn't find anything matching "{query}". Try checking your
              spelling or using less specific words.
            </p>
            <Link
              href="/shop"
              className="mt-6 text-amber-600 font-bold hover:underline"
            >
              Browse all products
            </Link>
          </div>
        ) : (
          // The Beautiful Product Grid for matching items!
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => {
              const firstImageClass = product.images
                ? product.images.split(",")[0]
                : "bg-gray-100";

              return (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all"
                >
                  <div
                    className={`relative aspect-[4/5] w-full overflow-hidden ${firstImageClass}`}
                  >
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    <div className="absolute inset-x-4 bottom-4 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-full bg-white/95 backdrop-blur text-slate-900 text-center py-3 rounded-xl font-bold shadow-sm">
                        View Details
                      </div>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-xs font-bold text-amber-600 tracking-wider uppercase mb-2">
                      {product.category.name}
                    </p>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug mb-3">
                      {product.name}
                    </h3>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
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
      </div>
    </div>
  );
}
