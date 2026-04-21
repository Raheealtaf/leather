// app/admin/products/new/page.tsx
import { prisma } from "@/lib/db";
// FIXED: Using the @ alias to reliably find the components folder
import ProductForm from "../../ProductForm";
import { PackagePlus } from "lucide-react";
export const dynamic = "force-dynamic";

export default async function NewProductPage() {
  // Fetch the categories from MySQL
  const categories = await prisma.category.findMany({
    select: { id: true, name: true },
  });

  return (
    // FIXED: Widen to max-w-6xl to fit our new two-column grid layout
    <div className="max-w-6xl">
      <div className="flex items-center space-x-3 mb-2">
        <div className="p-2 bg-amber-100 rounded-lg">
          <PackagePlus className="h-6 w-6 text-amber-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">
          Add New Product
        </h1>
      </div>

      <p className="text-gray-500 mb-8 ml-14">
        Create a new item for your leather inventory.
      </p>

      {/* Render the form */}
      <ProductForm categories={categories} />
    </div>
  );
}
