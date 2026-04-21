// app/actions/product.ts
"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// ==========================================
// 1. CREATE PRODUCT
// ==========================================
export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const description = formData.get("description") as string;
  const images = formData.get("images") as string;
  const sizes = formData.get("sizes") as string;
  const categoryId = parseInt(formData.get("categoryId") as string);
  const inStock = formData.get("inStock") === "on";

  await prisma.product.create({
    data: { name, price, description, images, sizes, categoryId, inStock },
  });

  revalidatePath("/");
  revalidatePath("/admin/products");
  redirect("/admin/products"); // Send admin to the inventory table after creating
}

// ==========================================
// 2. UPDATE PRODUCT
// ==========================================
export async function updateProduct(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const description = formData.get("description") as string;
  const images = formData.get("images") as string;
  const sizes = formData.get("sizes") as string;
  const categoryId = parseInt(formData.get("categoryId") as string);
  const inStock = formData.get("inStock") === "on";

  await prisma.product.update({
    where: { id },
    data: { name, price, description, images, sizes, categoryId, inStock },
  });

  revalidatePath("/");
  revalidatePath(`/product/${id}`);
  revalidatePath("/admin/products");
  redirect("/admin/products"); // Send admin back to inventory table after editing
}

// ==========================================
// 3. DELETE PRODUCT
// ==========================================
export async function deleteProduct(id: number) {
  await prisma.product.delete({
    where: { id },
  });

  revalidatePath("/admin/products");
  revalidatePath("/");
}
