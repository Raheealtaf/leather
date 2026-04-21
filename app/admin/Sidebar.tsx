// components/admin/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  PackagePlus,
  Tags,
  Image as ImageIcon,
  Menu,
  X,
  Package,
  ShoppingCart,
  Store,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Upgraded Navigation List with Orders
  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Add Product", href: "/admin/products/new", icon: PackagePlus },
    { name: "Categories", href: "/admin/categories", icon: Tags },
    { name: "Media Library", href: "/admin/media", icon: ImageIcon },
  ];

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-slate-900 text-white rounded-md shadow-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar Navigation */}
      <div
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out flex flex-col
        md:translate-x-0 ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
      `}
      >
        {/* Brand Logo Area */}
        <div className="flex items-center justify-center h-20 border-b border-slate-800 shrink-0">
          <h1 className="text-2xl font-extrabold tracking-tight">
            RS <span className="text-amber-500">Admin</span>
          </h1>
        </div>

        {/* Main Links */}
        <div className="flex-1 overflow-y-auto p-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 ml-2">
            Store Management
          </p>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)} // Close on mobile after clicking
                  className={`
                    flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? "bg-amber-500 text-slate-900 font-bold shadow-lg shadow-amber-500/20"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white hover:translate-x-1"
                    }
                  `}
                >
                  <Icon
                    size={20}
                    className={isActive ? "text-slate-900" : "text-slate-400"}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sticky Action */}
        <div className="p-4 border-t border-slate-800 shrink-0">
          <Link
            href="/"
            className="flex items-center justify-center space-x-2 w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-semibold text-sm"
          >
            <Store size={18} className="text-amber-500" />
            <span>View Live Store</span>
          </Link>
        </div>
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
