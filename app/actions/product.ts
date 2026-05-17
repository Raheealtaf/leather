// app/actions/product.ts
"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// 1. CREATE PRODUCT
export async function createProduct(formData: FormData) {
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const description = formData.get("description") as string;
  const images = formData.get("images") as string;
  const sizes = formData.get("sizes") as string;
  const categoryId = parseInt(formData.get("categoryId") as string);
  const inStock = formData.get("inStock") === "on";

  // NEW: Parse the incoming JSON attributes
  const attributesString = formData.get("attributes") as string;
  const attributes = attributesString ? JSON.parse(attributesString) : {};

  await prisma.product.create({
    data: {
      name,
      price,
      description,
      images,
      sizes,
      categoryId,
      inStock,
      attributes,
    },
  });

  revalidatePath("/");
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

// 2. UPDATE PRODUCT
export async function updateProduct(id: number, formData: FormData) {
  const name = formData.get("name") as string;
  const price = parseFloat(formData.get("price") as string);
  const description = formData.get("description") as string;
  const images = formData.get("images") as string;
  const sizes = formData.get("sizes") as string;
  const categoryId = parseInt(formData.get("categoryId") as string);
  const inStock = formData.get("inStock") === "on";

  // NEW: Parse the incoming JSON attributes
  const attributesString = formData.get("attributes") as string;
  const attributes = attributesString ? JSON.parse(attributesString) : {};

  await prisma.product.update({
    where: { id },
    data: {
      name,
      price,
      description,
      images,
      sizes,
      categoryId,
      inStock,
      attributes,
    },
  });

  revalidatePath("/");
  revalidatePath(`/product/${id}`);
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

// 3. DELETE PRODUCT (Stays the same)
export async function deleteProduct(id: number) {
  await prisma.product.delete({
    where: { id },
  });
  revalidatePath("/admin/products");
  revalidatePath("/");
}
