// src/app/admin/orders/page.tsx
import { prisma } from "@/lib/db";
import { Package, Eye, Banknote, Clock } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  // 1. Fetch all orders from the database
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      items: true,
    },
  });

  // 2. CALCULATE THE METRICS (The Math)
  const totalOrders = orders.length;

  // Calculate revenue (ignoring cancelled orders)
  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((sum, order) => sum + order.totalAmount, 0);

  // Count how many orders still need attention
  const pendingOrders = orders.filter(
    (order) => order.status === "Pending",
  ).length;

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Order Management
          </h1>
          <p className="text-slate-500 mt-1">
            View and manage all customer purchases and store revenue.
          </p>
        </div>

        {/* ========================================= */}
        {/* TOP METRICS DASHBOARD (THE NEW ADDITION!)   */}
        {/* ========================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Revenue Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center shrink-0">
              <Banknote className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Total Revenue
              </p>
              <p className="text-3xl font-extrabold text-slate-900">
                Rs {totalRevenue.toLocaleString()}
              </p>
            </div>
          </div>

          {/* Total Orders Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <Package className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Total Orders
              </p>
              <p className="text-3xl font-extrabold text-slate-900">
                {totalOrders}
              </p>
            </div>
          </div>

          {/* Pending Action Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4">
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                Pending Orders
              </p>
              <p className="text-3xl font-extrabold text-slate-900">
                {pendingOrders}
              </p>
            </div>
          </div>
        </div>

        {/* ========================================= */}
        {/* The Orders Table (Same as before)         */}
        {/* ========================================= */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-sm uppercase tracking-wider text-slate-500">
                  <th className="p-4 font-bold">Order ID</th>
                  <th className="p-4 font-bold">Date</th>
                  <th className="p-4 font-bold">Customer</th>
                  <th className="p-4 font-bold">Total Amount</th>
                  <th className="p-4 font-bold">Status</th>
                  <th className="p-4 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-500">
                      No orders found yet. Time to do some marketing!
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => {
                    const orderDate = new Date(
                      order.createdAt,
                    ).toLocaleDateString("en-PK", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    });

                    let statusColor = "bg-slate-100 text-slate-700";
                    if (order.status === "Pending")
                      statusColor =
                        "bg-yellow-100 text-yellow-800 border border-yellow-200";
                    if (order.status === "Confirmed")
                      statusColor =
                        "bg-blue-100 text-blue-800 border border-blue-200";
                    if (order.status === "Dispatched")
                      statusColor =
                        "bg-purple-100 text-purple-800 border border-purple-200";
                    if (order.status === "Delivered")
                      statusColor =
                        "bg-green-100 text-green-800 border border-green-200";
                    if (order.status === "Cancelled")
                      statusColor =
                        "bg-red-100 text-red-800 border border-red-200";

                    return (
                      <tr
                        key={order.id}
                        className="hover:bg-slate-50 transition-colors"
                      >
                        <td className="p-4 font-bold text-slate-900">
                          #{order.id.toString().padStart(4, "0")}
                        </td>
                        <td className="p-4 text-sm text-slate-500">
                          {orderDate}
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-slate-900">
                            {order.firstName} {order.lastName}
                          </p>
                          <p className="text-xs text-slate-500">
                            {order.customerEmail}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="font-bold text-slate-900">
                            Rs {order.totalAmount.toLocaleString()}
                          </p>
                          <p className="text-xs font-medium text-slate-500 uppercase">
                            {order.paymentMethod}
                          </p>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${statusColor}`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <Link
                            href={`/admin/orders/${order.id}`}
                            className="inline-flex items-center gap-1 bg-white border border-slate-200 hover:border-amber-500 hover:text-amber-600 text-slate-600 font-bold px-3 py-1.5 rounded-lg transition-colors text-sm"
                          >
                            <Eye className="w-4 h-4" /> View
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
