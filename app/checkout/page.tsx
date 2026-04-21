// src/app/checkout/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import {
  ShieldCheck,
  Truck,
  CreditCard,
  Banknote,
  ChevronLeft,
  Loader2,
  CheckCircle,
} from "lucide-react";
// 1. Import our new server action!
import { createOrder } from "@/app/actions/order";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const shippingCost = cartTotal > 10000 ? 0 : 500;
  const grandTotal = cartTotal + shippingCost;

  // 2. The upgraded Submit Function
  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);

    // Grab all the text the user typed into the form
    const formData = new FormData(e.currentTarget);

    // Map the cart to match what the server expects
    const orderItems = cart.map((item) => ({
      id: item.id,
      price: item.price,
      quantity: item.quantity,
    }));

    // Send it all to our secure MySQL database action
    const result = await createOrder(
      formData,
      orderItems,
      grandTotal,
      shippingCost,
    );

    if (result.success) {
      setIsProcessing(false);
      setIsSuccess(true);
      clearCart(); // Empty the cart from their browser

      // Wait 5 seconds, then send them home
      setTimeout(() => {
        router.push("/");
      }, 5000);
    } else {
      setIsProcessing(false);
      alert(result.error || "Something went wrong.");
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-slate-50 px-4">
        <div className="bg-white p-12 rounded-3xl shadow-xl border border-slate-100 flex flex-col items-center text-center max-w-lg w-full animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-12 h-12" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 mb-4">
            Order Confirmed!
          </h1>
          <p className="text-slate-600 mb-8 text-lg">
            Thank you for your purchase. Your premium leather goods are being
            prepared for shipment.
          </p>
          <div className="flex flex-col items-center space-y-4">
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            <p className="text-sm font-bold text-slate-400 tracking-widest uppercase">
              Redirecting to homepage...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
        <p className="text-xl font-bold text-slate-900 mb-4">
          Your cart is empty.
        </p>
        <Link href="/shop" className="text-amber-600 font-bold hover:underline">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/cart"
            className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-amber-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Return to Cart
          </Link>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
          <div className="lg:col-span-7 space-y-8">
            <form
              id="checkout-form"
              onSubmit={handlePlaceOrder}
              className="space-y-8"
            >
              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-extrabold text-slate-900 mb-6">
                  Contact Information
                </h2>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email Address
                  </label>
                  {/* Added name="email" */}
                  <input
                    required
                    name="email"
                    type="email"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-amber-500 focus:ring-amber-500 text-slate-900"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-extrabold text-slate-900 mb-6">
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      First Name
                    </label>
                    <input
                      required
                      name="firstName"
                      type="text"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-amber-500 focus:ring-amber-500 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Last Name
                    </label>
                    <input
                      required
                      name="lastName"
                      type="text"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-amber-500 focus:ring-amber-500 text-slate-900"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Complete Address
                    </label>
                    <input
                      required
                      name="address"
                      type="text"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-amber-500 focus:ring-amber-500 text-slate-900"
                      placeholder="House/Apt, Street Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      City
                    </label>
                    <input
                      required
                      name="city"
                      type="text"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-amber-500 focus:ring-amber-500 text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      required
                      name="phone"
                      type="tel"
                      className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-amber-500 focus:ring-amber-500 text-slate-900"
                      placeholder="0300 1234567"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-extrabold text-slate-900 mb-6">
                  Payment Method
                </h2>

                <div className="space-y-4">
                  <label
                    className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === "cod" ? "border-amber-500 bg-amber-50/50" : "border-slate-200 hover:border-amber-200"}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                      className="w-5 h-5 text-amber-600 focus:ring-amber-500 border-gray-300"
                    />
                    <div className="ml-4 flex items-center justify-between w-full">
                      <span className="font-bold text-slate-900">
                        Cash on Delivery (COD)
                      </span>
                      <Banknote className="text-slate-400" />
                    </div>
                  </label>

                  <label
                    className={`flex items-center p-4 border rounded-xl cursor-pointer transition-colors ${paymentMethod === "card" ? "border-amber-500 bg-amber-50/50" : "border-slate-200 hover:border-amber-200"}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                      className="w-5 h-5 text-amber-600 focus:ring-amber-500 border-gray-300"
                    />
                    <div className="ml-4 flex items-center justify-between w-full">
                      <span className="font-bold text-slate-900">
                        Credit / Debit Card
                      </span>
                      <CreditCard className="text-slate-400" />
                    </div>
                  </label>
                </div>
                {paymentMethod === "card" && (
                  <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-200 text-sm text-slate-600 text-center">
                    Card payments are currently in test mode. Please select Cash
                    on Delivery.
                  </div>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-5 mt-10 lg:mt-0">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sm:p-8 sticky top-28">
              <h2 className="text-xl font-extrabold text-slate-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div
                      className={`relative w-16 h-16 rounded-md overflow-hidden shrink-0 border border-slate-100 ${item.image}`}
                    >
                      <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white z-10">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-500">{item.category}</p>
                    </div>
                    <p className="text-sm font-bold text-slate-900">
                      Rs {(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-100 pt-6 space-y-4 text-slate-600 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">
                    Rs {cartTotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    Shipping <Truck size={16} className="text-slate-400" />
                  </span>
                  {shippingCost === 0 ? (
                    <span className="text-green-600 font-bold uppercase text-sm tracking-wide">
                      Free
                    </span>
                  ) : (
                    <span className="font-bold text-slate-900">
                      Rs {shippingCost.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6 mb-8">
                <div className="flex justify-between items-end">
                  <span className="text-lg font-bold text-slate-900">
                    Total
                  </span>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 block mb-1">
                      PKR
                    </span>
                    <span className="text-3xl font-extrabold text-slate-900">
                      Rs {grandTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                form="checkout-form"
                disabled={isProcessing}
                className={`w-full font-extrabold py-4 px-8 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2
                  ${isProcessing ? "bg-slate-400 text-white cursor-not-allowed" : "bg-slate-900 hover:bg-slate-800 text-white transform hover:-translate-y-1"}
                `}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin w-5 h-5" /> Processing...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" /> Place Order
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
