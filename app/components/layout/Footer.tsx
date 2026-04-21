// app/components/layout/Footer.tsx
"use client";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname(); // <-- 3. READ THE URL

  // 4. IF WE ARE IN THE ADMIN PANEL, DO NOT SHOW THE FOOTER
  if (pathname.startsWith("/admin")) {
    return null;
  }
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-amber-500 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* TOP SECTION: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              RS <span className="text-amber-500">Leathers</span>
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Handcrafted, premium leather goods designed to last a lifetime.
              Uncompromising quality, ethical sourcing, and timeless style for
              the modern journey.
            </p>
            <div className="flex space-x-4 pt-2">
              {/* Custom SVG Facebook Icon */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-slate-900 transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* Custom SVG Instagram Icon */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-slate-900 transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* Custom SVG Twitter Icon */}
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-amber-500 hover:text-slate-900 transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Shop
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/shop"
                  className="text-sm hover:text-amber-500 transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/jackets"
                  className="text-sm hover:text-amber-500 transition-colors"
                >
                  Premium Jackets
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/bags"
                  className="text-sm hover:text-amber-500 transition-colors"
                >
                  Travel Bags
                </Link>
              </li>
              <li>
                <Link
                  href="/categories/accessories"
                  className="text-sm hover:text-amber-500 transition-colors"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm hover:text-amber-500 transition-colors"
                >
                  Our Heritage
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Service */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Customer Care
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <Phone size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <span>
                  +92 300 1234567
                  <br />
                  <span className="text-xs text-slate-500">
                    Mon-Fri, 9am - 6pm
                  </span>
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <a
                  href="mailto:support@rsleathers.com"
                  className="hover:text-amber-500 transition-colors"
                >
                  support@rsleathers.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <span>
                  Lahore, Punjab,
                  <br />
                  Pakistan
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">
              Stay in the Loop
            </h3>
            <p className="text-sm text-slate-400 mb-4">
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>
            <form className="flex flex-col space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-slate-800 border border-slate-700 text-white px-4 py-3 rounded-md focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors w-full"
                required
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold px-4 py-3 rounded-md transition-colors w-full"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM SECTION: Copyright & Legal */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} RS Leathers. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-slate-500">
            <Link href="#" className="hover:text-amber-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-amber-500 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-amber-500 transition-colors">
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
