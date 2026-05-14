// app/admin/categories/page.tsx
import { prisma } from "@/lib/db";
import CategoryForm from "../CategoryForm";
import DeleteCategoryButton from "../DeleteCategoryButton";
import { Tags, Image as ImageIcon } from "lucide-react"; // Imported ImageIcon for the fallback

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  // Fetch existing categories from the database
  const categories = await prisma.category.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-8">
        <div className="p-2 bg-amber-100 rounded-lg">
          <Tags className="h-6 w-6 text-amber-600" />
        </div>
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Categories Manager
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Organize your inventory into product lines.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: The Form */}
        <div className="lg:col-span-1">
          <CategoryForm />
        </div>

        {/* Right Column: The Data Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      ID
                    </th>
                    {/* NEW: Image Column Header */}
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-400">
                        #{category.id}
                      </td>

                      {/* NEW: Image Thumbnail Cell */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        {category.imageUrl ? (
                          <img
                            src={category.imageUrl}
                            alt={category.name}
                            className="h-10 w-10 rounded-full object-cover border border-slate-200"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                            <ImageIcon className="h-4 w-4 text-slate-400" />
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-slate-900">
                        {category.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">
                        {category.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <DeleteCategoryButton id={category.id} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {categories.length === 0 && (
              <div className="p-8 text-center text-slate-500">
                No categories found. Create one to get started!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
