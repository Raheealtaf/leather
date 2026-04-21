// src/app/actions/admin.ts
"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function updateOrderStatus(orderId: number, newStatus: string) {
  try {
    // 1. Tell MySQL to update the status of this specific order
    await prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus },
    });

    // 2. Force Next.js to immediately refresh the pages so you see the change instantly
    revalidatePath(`/admin/orders/${orderId}`);
    revalidatePath("/admin/orders");
  } catch (error) {
    console.error("Failed to update status:", error);
    throw new Error("Could not update order status");
  }
}
