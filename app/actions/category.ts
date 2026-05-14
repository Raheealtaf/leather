"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary with your free account credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createCategory(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const file = formData.get("image") as File;

  let imageUrl = "";

  if (file && file.size > 0) {
    // 1. Convert the file to a Base64 string (Serverless friendly)
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Image = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64Image}`;

    // 2. Upload directly to Cloudinary
    const uploadResponse = await cloudinary.uploader.upload(dataURI, {
      folder: "rs_leather",
    });

    // 3. Grab the live, permanent URL
    imageUrl = uploadResponse.secure_url;
  }

  // Save the Cloudinary URL to your database
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
