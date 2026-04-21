// src/app/cart/page.tsx
"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  // If the cart is empty, show a beautiful empty state
  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] bg-slate-50 flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center max-w-lg w-full">
          <ShoppingBag className="h-20 w-20 text-slate-200 mb-6" />
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-slate-500 mb-8">
            Looks like you haven't added any premium leather goods to your cart
            yet.
          </p>
          <Link
            href="/shop"
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl transition-colors w-full"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // If items exist, show the cart layout
  return (
    <div className="min-h-screen bg-slate-50 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-10">
          Shopping Cart
        </h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
          {/* LEFT SIDE: Cart Items */}
          <div className="lg:col-span-8 space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-6"
              >
                {/* Item Image */}
                <div
                  className={`w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-xl overflow-hidden border border-slate-100 ${item.image}`}
                ></div>

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
                    {item.category}
                  </p>
                  <h3 className="text-lg font-bold text-slate-900 truncate mb-1">
                    <Link
                      href={`/product/${item.id}`}
                      className="hover:text-amber-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </h3>
                  <p className="text-lg font-extrabold text-slate-900 mb-4">
                    Rs {item.price.toLocaleString()}
                  </p>

                  {/* Quantity Controls & Delete */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-2 text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-bold text-slate-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-2 text-slate-500 hover:text-slate-900 transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-sm font-medium text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>

                {/* Item Subtotal (Desktop only) */}
                <div className="hidden sm:block text-right">
                  <p className="text-sm text-slate-500 mb-1">Subtotal</p>
                  <p className="text-xl font-extrabold text-slate-900">
                    Rs {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE: Order Summary */}
          <div className="lg:col-span-4 mt-10 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 sticky top-28">
              <h2 className="text-xl font-extrabold text-slate-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 text-slate-600 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">
                    Rs {cartTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-amber-600 font-bold">
                    Calculated at checkout
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6 mb-8">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">
                    Total
                  </span>
                  <span className="text-3xl font-extrabold text-slate-900">
                    Rs {cartTotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-2 text-right">
                  Taxes included if applicable
                </p>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-extrabold py-4 px-8 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
              >
                Proceed to Checkout <ArrowRight size={20} />
              </Link>

              <div className="mt-6 text-center">
                <Link
                  href="/shop"
                  className="text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors"
                >
                  or Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
