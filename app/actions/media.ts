// app/actions/media.ts
"use server";

import { writeFile, unlink, mkdir } from "fs/promises";
import { join } from "path";
import { revalidatePath } from "next/cache";
import { existsSync } from "fs";

// ==========================================
// 1. UPLOAD IMAGE
// ==========================================
export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File;

  if (!file || file.size === 0) {
    return { error: "No file selected." };
  }

  // Convert the file into a Node.js Buffer
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Create a safe filename (removes spaces and adds a timestamp)
  const safeFilename = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

  // Define the path where the file will be saved (public/uploads)
  const uploadDir = join(process.cwd(), "public", "uploads");

  // If the 'uploads' folder doesn't exist yet, create it automatically
  if (!existsSync(uploadDir)) {
    await mkdir(uploadDir, { recursive: true });
  }

  // Write the file to the hard drive
  const filePath = join(uploadDir, safeFilename);
  await writeFile(filePath, buffer);

  // Refresh the page to show the new image
  revalidatePath("/admin/media");
  return { success: true, filename: safeFilename };
}

// ==========================================
// 2. DELETE IMAGE
// ==========================================
export async function deleteImage(filename: string) {
  try {
    const filePath = join(process.cwd(), "public", "uploads", filename);
    await unlink(filePath); // Deletes the file from the hard drive
    revalidatePath("/admin/media");
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete file." };
  }
}
