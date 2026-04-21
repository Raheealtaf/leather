// app/admin/products/page.tsx
import { prisma } from "@/lib/db";
import Link from "next/link";
import { Package, Edit, Plus } from "lucide-react";
import DeleteProductButton from "../DeleteProductButton";

export const dynamic = "force-dynamic";

export default async function ProductsListPage() {
  // Fetch all products, including their category names
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
    include: { category: true },
  });

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-amber-100 rounded-lg">
            <Package className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">
              Inventory
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage your leather goods and pricing.
            </p>
          </div>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm"
        >
          <Plus size={18} />
          Add New Product
        </Link>
      </div>

      {/* Data Table Section */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {products.map((product) => {
                // Grab the first color class for the image thumbnail placeholder
                const thumbnailClass = product.images
                  ? product.images.split(",")[0]
                  : "bg-gray-100";

                return (
                  <tr
                    key={product.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    {/* Product Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div
                          className={`h-10 w-10 rounded-md shrink-0 border border-slate-200 ${thumbnailClass}`}
                        ></div>
                        <div className="font-medium text-slate-900">
                          {product.name}
                        </div>
                      </div>
                    </td>

                    {/* Category Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                      {product.category.name}
                    </td>

                    {/* Price Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">
                      Rs {product.price.toLocaleString()}
                    </td>

                    {/* Status Column */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.inStock ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          In Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-800">
                          Out of Stock
                        </span>
                      )}
                    </td>

                    {/* Actions Column */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        {/* Edit Button (Links to the Edit Page we will build next) */}
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-md transition-colors"
                          title="Edit Product"
                        >
                          <Edit size={18} />
                        </Link>

                        {/* Delete Button Component */}
                        <DeleteProductButton id={product.id} />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="h-12 w-12 text-slate-300 mb-4">
              <Package size={48} />
            </div>
            <h3 className="text-lg font-medium text-slate-900">
              No products found
            </h3>
            <p className="mt-1 text-slate-500 mb-6">
              Get started by creating your first product.
            </p>
            <Link
              href="/admin/products/new"
              className="text-amber-600 font-medium hover:text-amber-700"
            >
              + Add your first product
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
