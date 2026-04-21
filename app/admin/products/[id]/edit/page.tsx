// app/admin/products/[id]/edit/page.tsx
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductForm from "../../../ProductForm";
import { Edit } from "lucide-react";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Resolve the URL parameters
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id);

  // 2. Fetch both the existing product AND the categories
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id: productId } }),
    prisma.category.findMany({ select: { id: true, name: true } }),
  ]);

  // If someone tries to edit an ID that doesn't exist, show a 404
  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-6xl">
      <div className="flex items-center space-x-3 mb-2">
        <div className="p-2 bg-amber-100 rounded-lg">
          <Edit className="h-6 w-6 text-amber-600" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900">
          Edit Product: {product.name}
        </h1>
      </div>

      <p className="text-gray-500 mb-8 ml-14">
        Make changes to pricing, stock status, or details.
      </p>

      {/* Render the upgraded form, passing the existing data! */}
      <ProductForm categories={categories} initialData={product} />
    </div>
  );
}
