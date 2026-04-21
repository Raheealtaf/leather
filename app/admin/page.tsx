// src/app/admin/page.tsx
import { prisma } from "@/lib/db";
import {
  Package,
  Tags,
  TrendingUp,
  DollarSign,
  ArrowRight,
  ShoppingCart,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";

// Force Next.js to fetch the latest analytics every time
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // 1. Fetch real analytics from MySQL simultaneously (including orders!)
  const [totalProducts, totalCategories, orders] = await Promise.all([
    prisma.product.count(),
    prisma.category.count(),
    prisma.order.findMany({
      select: { totalAmount: true, status: true }, // We only need the price and status for the math
    }),
  ]);

  // 2. Calculate Order Metrics
  const totalOrders = orders.length;
  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((sum, order) => sum + order.totalAmount, 0);

  // 3. Define the stats array with real data
  const stats = [
    {
      name: "Total Products",
      value: totalProducts,
      icon: Package,
      color: "bg-blue-500",
    },
    {
      name: "Categories",
      value: totalCategories,
      icon: Tags,
      color: "bg-purple-500",
    },
    {
      name: "Total Orders",
      value: totalOrders,
      icon: TrendingUp,
      color: "bg-green-500",
    },
    {
      name: "Total Revenue",
      value: `Rs ${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-amber-500",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-8">
        Dashboard Overview
      </h1>

      {/* Real-time Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.name}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-4 transition-transform hover:-translate-y-1"
            >
              <div
                className={`p-4 rounded-xl ${stat.color} text-white shadow-md`}
              >
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">
                  {stat.name}
                </p>
                <p className="text-2xl font-extrabold text-slate-900">
                  {stat.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions Panel Upgrade */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-xl font-extrabold text-slate-900 mb-4">
            Quick Actions
          </h2>
          <p className="text-slate-500 mb-6 leading-relaxed">
            Welcome to your control center. Jump straight into managing your
            store using the quick links below.
          </p>
          <div className="space-y-3">
            <Link
              href="/admin/orders"
              className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-amber-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 text-amber-600 rounded-lg">
                  <ShoppingCart size={20} />
                </div>
                <span className="font-bold text-slate-700 group-hover:text-amber-600">
                  Review New Orders
                </span>
              </div>
              <ArrowRight
                size={18}
                className="text-slate-400 group-hover:text-amber-500"
              />
            </Link>
            <Link
              href="/admin/products/new"
              className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-amber-500 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <PlusCircle size={20} />
                </div>
                <span className="font-bold text-slate-700 group-hover:text-amber-600">
                  Add New Product
                </span>
              </div>
              <ArrowRight
                size={18}
                className="text-slate-400 group-hover:text-amber-500"
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
