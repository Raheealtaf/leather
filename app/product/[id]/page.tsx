// app/product/[id]/page.tsx
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import ProductGallery from "../ProductGallery";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const productId = parseInt(resolvedParams.id);

  // 1. Fetch the main product
  const product = await prisma.product.findUnique({
    where: { id: productId },
    include: { category: true },
  });

  if (!product) {
    return notFound();
  }

  // 2. Fetch 4 "Related Products"
  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: product.id },
    },
    take: 4,
    orderBy: { createdAt: "desc" },
    include: { category: true }, // <-- Added this so we can show the category name!
  });

  // 3. Format the data to pass to the gallery (FIX: Convert Decimal to Number)
  const formattedProduct = {
    id: product.id,
    name: product.name,
    price: Number(product.price), // <-- THE FIX IS HERE
    description: product.description,
    images: product.images ? product.images.split(",") : [],
    sizes: product.sizes ? product.sizes.split(",").map((s) => s.trim()) : [],
    category: product.category.name,
  };

  // 4. Format the related products (FIX: Convert their Decimals to Numbers too!)
  const formattedRelatedProducts = relatedProducts.map((rp) => ({
    id: rp.id,
    name: rp.name,
    price: Number(rp.price), // <-- THE FIX IS HERE
    images: rp.images || "",
    category: { name: rp.category.name },
  }));

  return (
    <div className="min-h-screen bg-white">
      {/* Pass both the correctly formatted objects to the client! */}
      <ProductGallery
        product={formattedProduct}
        relatedProducts={formattedRelatedProducts}
      />
    </div>
  );
}
