// src/app/admin/orders/[id]/page.tsx
import { prisma } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ChevronLeft,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  User,
  MapPin,
  Banknote,
} from "lucide-react";
import { updateOrderStatus } from "@/app/actions/admin";

export const dynamic = "force-dynamic";

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Get the ID from the URL
  const resolvedParams = await params;
  const orderId = parseInt(resolvedParams.id);

  // 2. Fetch the specific order, including the items and product details!
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: {
          product: true, // Pulls the product name and image
        },
      },
    },
  });

  // If someone types a random ID in the URL that doesn't exist
  if (!order) return notFound();

  // 3. Status Badge Color Logic
  let statusColor = "bg-slate-100 text-slate-700";
  if (order.status === "Pending")
    statusColor = "bg-yellow-100 text-yellow-800 border-yellow-200";
  if (order.status === "Confirmed")
    statusColor = "bg-blue-100 text-blue-800 border-blue-200";
  if (order.status === "Dispatched")
    statusColor = "bg-purple-100 text-purple-800 border-purple-200";
  if (order.status === "Delivered")
    statusColor = "bg-green-100 text-green-800 border-green-200";
  if (order.status === "Cancelled")
    statusColor = "bg-red-100 text-red-800 border-red-200";

  // 4. Server Action Bindings (Wires the buttons to the database)
  const setConfirmed = updateOrderStatus.bind(null, order.id, "Confirmed");
  const setDispatched = updateOrderStatus.bind(null, order.id, "Dispatched");
  const setDelivered = updateOrderStatus.bind(null, order.id, "Delivered");
  const setCancelled = updateOrderStatus.bind(null, order.id, "Cancelled");

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/admin/orders"
            className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-amber-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to All Orders
          </Link>
        </div>

        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Order #{order.id.toString().padStart(4, "0")}
            </h1>
            <p className="text-slate-500 mt-1">
              Placed on {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>
          <div
            className={`px-4 py-2 rounded-full border text-sm font-bold tracking-wide uppercase ${statusColor}`}
          >
            {order.status}
          </div>
        </div>

        {/* STATUS CONTROLLER (The Action Buttons) */}
        <div className="bg-slate-900 rounded-2xl shadow-sm p-6 sm:p-8 mb-8 text-white">
          <h2 className="text-lg font-bold mb-4">Update Order Status</h2>
          <div className="flex flex-wrap gap-4">
            <form action={setConfirmed}>
              <button
                disabled={order.status === "Confirmed"}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                <Package className="w-5 h-5" /> Mark Confirmed
              </button>
            </form>
            <form action={setDispatched}>
              <button
                disabled={order.status === "Dispatched"}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                <Truck className="w-5 h-5" /> Mark Dispatched
              </button>
            </form>
            <form action={setDelivered}>
              <button
                disabled={order.status === "Delivered"}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                <CheckCircle className="w-5 h-5" /> Mark Delivered
              </button>
            </form>
            <form action={setCancelled}>
              <button
                disabled={order.status === "Cancelled"}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold py-3 px-6 rounded-lg transition-colors ml-auto"
              >
                <XCircle className="w-5 h-5" /> Cancel Order
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Customer & Shipping Info */}
          <div className="lg:col-span-1 space-y-8">
            {/* Customer Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-amber-500" /> Customer
              </h3>
              <div className="space-y-3 text-slate-600">
                <p className="font-bold text-slate-900">
                  {order.firstName} {order.lastName}
                </p>
                <p>
                  <a
                    href={`mailto:${order.customerEmail}`}
                    className="text-amber-600 hover:underline"
                  >
                    {order.customerEmail}
                  </a>
                </p>
                <p>{order.phone}</p>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-amber-500" /> Shipping Address
              </h3>
              <div className="space-y-1 text-slate-600">
                <p>{order.address}</p>
                <p>{order.city}</p>
                <p>Pakistan</p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-extrabold text-slate-900 mb-4 flex items-center gap-2">
                <Banknote className="w-5 h-5 text-amber-500" /> Payment
              </h3>
              <div className="space-y-1 text-slate-600">
                <p>
                  Method:{" "}
                  <span className="font-bold uppercase text-slate-900">
                    {order.paymentMethod}
                  </span>
                </p>
                <p>
                  Amount:{" "}
                  <span className="font-bold text-green-600">
                    Rs {order.totalAmount.toLocaleString()}
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Order Items List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <h3 className="text-lg font-extrabold text-slate-900 mb-6">
                Purchased Items
              </h3>

              <div className="space-y-6">
                {order.items.map((item) => {
                  const firstImageClass = item.product.images
                    ? item.product.images.split(",")[0]
                    : "bg-slate-200";

                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 pb-6 border-b border-slate-100 last:border-0 last:pb-0"
                    >
                      <div
                        className={`w-20 h-20 rounded-lg shrink-0 border border-slate-200 ${firstImageClass}`}
                      ></div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-base font-bold text-slate-900 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-sm text-slate-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-slate-500 mb-1">
                          Rs {item.price.toLocaleString()} x {item.quantity}
                        </p>
                        <p className="text-base font-bold text-slate-900">
                          Rs {(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Totals Footer */}
              <div className="mt-8 pt-6 border-t-2 border-dashed border-slate-200">
                <div className="flex justify-between items-center text-slate-600 mb-2">
                  <span>Shipping Cost</span>
                  <span>Rs {order.shippingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-end mt-4">
                  <span className="text-lg font-bold text-slate-900">
                    Grand Total
                  </span>
                  <span className="text-3xl font-extrabold text-amber-600">
                    Rs {order.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
