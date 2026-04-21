// prisma/seed.ts
import { PrismaClient } from "@prisma/client";

// Initialize the standard Prisma client
// This automatically uses the DATABASE_URL from your .env file
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  const jackets = await prisma.category.create({
    data: {
      name: "Jackets",
      description: "Premium handcrafted leather jackets.",
    },
  });

  const bags = await prisma.category.create({
    data: {
      name: "Bags",
      description: "Durable and stylish leather travel bags.",
    },
  });

  const product1 = await prisma.product.create({
    data: {
      name: "The Classicc Aviator Leather Jacket",
      price: 15000.0,
      description:
        "Crafted from premium full-grain sheepskin leather, the Classic Aviator offers a timeless silhouette with modern comfort.",
      images: "bg-slate-800,bg-slate-700,bg-slate-600,bg-slate-900",
      sizes: "S,M,L,XL,XXL",
      inStock: true,
      categoryId: jackets.id,
    },
  });

  const product2 = await prisma.product.create({
    data: {
      name: "Vintage Messenger Bag",
      price: 8500.0,
      description:
        "Perfect for the daily commute. Made from rich, distressed cowhide leather.",
      images: "bg-amber-900,bg-amber-800",
      sizes: "Standard",
      inStock: true,
      categoryId: bags.id,
    },
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
