// components/shop/FeaturedJacket.tsx
import Link from "next/link";
import { Star, ShoppingBag, ArrowRight, ShieldCheck } from "lucide-react";

export default function FeaturedJacket() {
  return (
    <section className="bg-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          {/* LEFT SIDE: The Visuals */}
          <div className="w-full lg:w-1/2 relative bg-slate-800 p-8 lg:p-12 flex items-center justify-center min-h-[400px] lg:min-h-[600px]">
            {/* Background decorative glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 to-transparent opacity-50"></div>

            {/* "Bestseller" Badge */}
            <div className="absolute top-8 left-8 bg-amber-500 text-slate-900 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-wider z-10">
              #1 Bestseller
            </div>

            {/* Placeholder for the Jacket Image (Replace with a real <img /> later) */}
            <div className="relative z-10 w-full max-w-md aspect-square bg-slate-700/50 rounded-2xl border border-slate-600/50 backdrop-blur-sm flex flex-col items-center justify-center text-slate-400 transform transition-transform duration-700 hover:scale-105 hover:rotate-1">
              <span className="text-2xl font-light tracking-widest text-slate-300 opacity-50">
                JACKET IMAGE
              </span>
            </div>
          </div>

          {/* RIGHT SIDE: Product Details */}
          <div className="w-full lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center bg-slate-900 text-white">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-sm text-slate-400 font-medium">
                128 Reviews
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              The Classic <span className="text-amber-500">Aviator</span>
            </h2>

            <p className="text-2xl font-bold text-white mb-6">Rs 18,500</p>

            <p className="text-slate-300 text-lg mb-8 leading-relaxed">
              Crafted from 100% full-grain sheepskin leather, this jacket ages
              beautifully. Featuring heavy-duty gunmetal hardware, a tailored
              fit, and a thermal-lined interior for uncompromising warmth and
              style.
            </p>

            {/* Quick Feature List */}
            <ul className="space-y-3 mb-10">
              <li className="flex items-center gap-3 text-slate-300">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                <span>Lifetime Hardware Warranty</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                <span>Premium YKK Zippers</span>
              </li>
              <li className="flex items-center gap-3 text-slate-300">
                <ShieldCheck className="w-5 h-5 text-amber-500" />
                <span>Hand-stitched detailing</span>
              </li>
            </ul>

            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-900 font-extrabold py-4 px-8 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1">
                <ShoppingBag className="w-5 h-5" />
                Quick Add
              </button>

              <Link
                href="/shop"
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 px-8 rounded-xl border border-slate-700 transition-all flex items-center justify-center gap-2"
              >
                View Details
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
