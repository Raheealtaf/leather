// app/actions/category.ts
"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// 1. CREATE CATEGORY (Receives String URL from Client)
export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const imageUrl = formData.get("imageUrl") as string; // Now just grabbing the string!

  await prisma.category.create({
    data: {
      name,
      description,
      imageUrl: imageUrl || null,
    },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");
}

// 2. DELETE CATEGORY
export async function deleteCategory(id: number) {
  // Safe delete: Clear products first
  await prisma.product.deleteMany({
    where: { categoryId: id },
  });

  await prisma.category.delete({
    where: { id: id },
  });

  revalidatePath("/admin/categories");
  revalidatePath("/");
}
