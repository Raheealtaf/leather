// app/components/layout/Footer.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  // IF WE ARE IN THE ADMIN PANEL, DO NOT SHOW THE FOOTER
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-[#111] text-[#FDFBF7] pt-20 pb-10 border-t border-[#222] mt-auto font-sans">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── TOP SECTION: Architectural Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12 mb-20">
          {/* Column 1: Brand & About */}
          <div className="space-y-6">
            <h2 className="text-xl font-serif tracking-[0.1em] uppercase text-white">
              RS Leather
            </h2>
            <p className="text-[11px] leading-loose text-gray-400 tracking-wide max-w-sm">
              Handcrafted, premium leather goods designed to last a lifetime.
              Uncompromising quality, ethical sourcing, and timeless style for
              the modern journey.
            </p>

            {/* Minimalist Social Icons (No background circles) */}
            <div className="flex space-x-6 pt-2">
              <a
                href="#"
                className="text-gray-500 hover:text-[#C8A96E] transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-[#C8A96E] transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="4" ry="4" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-[#C8A96E] transition-colors"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
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
            <h3 className="text-[10px] font-bold text-gray-500 mb-8 uppercase tracking-[0.25em]">
              Collection
            </h3>
            <ul className="space-y-4">
              {[
                { name: "All Products", path: "/shop" },
                { name: "Premium Jackets", path: "/categories/jackets" },
                { name: "Travel Bags", path: "/categories/bags" },
                { name: "Accessories", path: "/categories/accessories" },
                { name: "Our Heritage", path: "/about" },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.path}
                    className="text-[11px] tracking-widest uppercase text-gray-300 hover:text-[#C8A96E] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div>
            <h3 className="text-[10px] font-bold text-gray-500 mb-8 uppercase tracking-[0.25em]">
              Client Services
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-4 text-[11px] tracking-wide text-gray-300">
                <Phone className="w-4 h-4 text-gray-500 stroke-[1.5] mt-0.5" />
                <span className="flex flex-col gap-1">
                  <span className="uppercase tracking-widest">
                    +92 300 1234567
                  </span>
                  <span className="text-[9px] text-gray-500 uppercase tracking-widest">
                    Mon-Fri, 9am - 6pm
                  </span>
                </span>
              </li>
              <li className="flex items-center gap-4 text-[11px] tracking-wide text-gray-300">
                <Mail className="w-4 h-4 text-gray-500 stroke-[1.5]" />
                <a
                  href="mailto:support@rsleathers.com"
                  className="uppercase tracking-widest hover:text-[#C8A96E] transition-colors"
                >
                  support@rsleathers.com
                </a>
              </li>
              <li className="flex items-start gap-4 text-[11px] tracking-wide text-gray-300">
                <MapPin className="w-4 h-4 text-gray-500 stroke-[1.5] mt-0.5" />
                <span className="uppercase tracking-widest leading-relaxed">
                  Lahore, Punjab,
                  <br />
                  Pakistan
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="text-[10px] font-bold text-gray-500 mb-8 uppercase tracking-[0.25em]">
              The Dispatch
            </h3>
            <p className="text-[11px] text-gray-400 tracking-wide leading-relaxed mb-6">
              Subscribe to receive updates on new arrivals, special offers, and
              our heritage campaigns.
            </p>
            <form className="flex flex-col space-y-3">
              {/* Sharp, unrounded brutalist input */}
              <input
                type="email"
                placeholder="EMAIL ADDRESS"
                className="bg-transparent border border-gray-700 text-[#FDFBF7] text-[10px] uppercase tracking-[0.2em] px-4 py-4 rounded-none focus:outline-none focus:border-[#C8A96E] transition-colors w-full placeholder:text-gray-600"
                required
              />
              {/* Sharp, high-contrast button */}
              <button
                type="submit"
                className="bg-[#FDFBF7] hover:bg-[#C8A96E] text-[#111] hover:text-white text-[10px] font-bold uppercase tracking-[0.25em] px-4 py-4 rounded-none transition-colors w-full"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* ── BOTTOM SECTION: Copyright & Legal ── */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} RS Leather. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-[10px] uppercase tracking-[0.2em] text-gray-500">
            <Link
              href="/privacy-policy"
              className="hover:text-[#C8A96E] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-[#C8A96E] transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/refund-policy"
              className="hover:text-[#C8A96E] transition-colors"
            >
              Refund Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
