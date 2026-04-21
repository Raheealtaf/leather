// src/app/actions/order.ts
"use server";

import { prisma } from "@/lib/db";

// Define the type for the cart items we are receiving
type CheckoutItem = {
  id: number;
  price: number;
  quantity: number;
};

export async function createOrder(
  formData: FormData,
  cartItems: CheckoutItem[],
  totalAmount: number,
  shippingCost: number,
) {
  try {
    // 1. Extract customer details securely from the form
    const customerEmail = formData.get("email") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const phone = formData.get("phone") as string;
    const paymentMethod = formData.get("payment") as string;

    // 2. Create the Order AND the nested OrderItems in one single database command!
    const newOrder = await prisma.order.create({
      data: {
        customerEmail,
        firstName,
        lastName,
        address,
        city,
        phone,
        paymentMethod,
        totalAmount,
        shippingCost,
        // Prisma's nested write feature automatically creates the rows in the OrderItem table
        items: {
          create: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });

    return { success: true, orderId: newOrder.id };
  } catch (error) {
    console.error("Order creation failed:", error);
    return { error: "Failed to process order. Please try again." };
  }
}
