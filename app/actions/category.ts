// app/actions/category.ts
"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

// 1. CREATE CATEGORY
export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  await prisma.category.create({
    data: { name, description },
  });

  revalidatePath("/admin/categories");
}

// 2. DELETE CATEGORY
export async function deleteCategory(id: number) {
  await prisma.category.delete({
    where: { id },
  });

  revalidatePath("/admin/categories");
}
