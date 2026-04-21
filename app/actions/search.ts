// app/actions/search.ts
"use server";

import { prisma } from "@/lib/db";

export async function getSearchSuggestions(query: string) {
  // If the search is empty or less than 2 characters, return nothing
  if (!query || query.length < 2) {
    return [];
  }

  // Find up to 4 matching products
  const products = await prisma.product.findMany({
    where: {
      OR: [
        { name: { contains: query } },
        { category: { name: { contains: query } } },
      ],
      inStock: true,
    },
    take: 4, // We only want a maximum of 4 suggestions in the dropdown
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
      category: { select: { name: true } },
    },
  });

  return products;
}
