// src/components/layout/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Search, Menu, X } from "lucide-react";
import SearchBar from "../SearchBar";
import { useCart } from "../../context/CartContext";
import { usePathname } from "next/navigation";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  const { itemCount } = useCart();

  const navLinks = [
    { name: "Shop All", path: "/shop" },
    { name: "Jackets", path: "/categories/jackets" },
    { name: "Travel Bags", path: "/categories/bags" },
    { name: "Accessories", path: "/categories/accessories" },
    { name: "The Heritage", path: "/about" },
  ];

  return (
    <nav className="fixed w-full z-50 top-0 bg-[#FDFBF7]/95 backdrop-blur-md text-[#111] font-sans border-b border-gray-200/50 transition-all duration-300">
      {/* ── TOP ROW: ICONS & CENTERED LOGO ───────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Left: Mobile Menu & Desktop Search */}
          <div className="flex-1 flex justify-start items-center gap-4">
            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 text-gray-600 hover:text-black transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 stroke-[1.2]" />
              ) : (
                <Menu className="h-6 w-6 stroke-[1.2]" />
              )}
            </button>

            {/* Desktop Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="hidden lg:flex items-center gap-2 text-gray-500 hover:text-black transition-colors group"
            >
              <Search className="h-4 w-4 stroke-[1.5] transition-transform group-hover:scale-110" />
              <span className="text-[10px] tracking-[0.2em] uppercase font-medium">
                Search
              </span>
            </button>
          </div>

          {/* Center: Centered Logo */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <Link href="/" className="flex items-center">
              <img
                src={logo.src}
                alt="RS Leather Logo"
                className="h-10 md:h-14 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Right: Cart */}
          <div className="flex-1 flex justify-end items-center">
            <Link
              href="/cart"
              className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors group"
            >
              <span className="hidden lg:block text-[10px] tracking-[0.2em] uppercase font-medium">
                Cart
              </span>
              <div className="relative">
                <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 stroke-[1.2] transition-transform group-hover:scale-110" />
                {/* Elegant Cart Badge */}
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#111] text-[9px] font-bold text-white">
                    {itemCount}
                  </span>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* ── BOTTOM ROW: DESKTOP NAVIGATION LINKS ─────────────────── */}
      <div className="hidden lg:flex justify-center items-center h-12 border-t border-gray-200/30">
        <div className="flex space-x-12">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className="relative text-[11px] font-medium tracking-[0.2em] uppercase text-gray-600 hover:text-[#C8A96E] transition-colors group py-2"
            >
              {item.name}
              {/* Subtle underline hover effect */}
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#C8A96E] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>
      </div>

      {/* ── DESKTOP SEARCH DROPDOWN ──────────────────────────────── */}
      {isSearchOpen && (
        <div className="hidden lg:block absolute top-[128px] left-0 w-full bg-[#FDFBF7] border-b border-gray-200/50 p-8 shadow-sm z-[100] animate-in slide-in-from-top-2">
          <div className="max-w-2xl mx-auto flex items-center justify-center gap-4">
            <SearchBar />
          </div>
        </div>
      )}

      {/* ── MOBILE NAVIGATION MENU ───────────────────────────────── */}
      <div
        className={`lg:hidden absolute w-full bg-[#FDFBF7] border-b border-gray-200/50 shadow-xl transition-all duration-500 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-[800px] opacity-100 visible overflow-visible"
            : "max-h-0 opacity-0 invisible overflow-hidden"
        }`}
      >
        <div className="flex flex-col px-6 py-4">
          {/* Mobile Search */}
          <div className="py-4 border-b border-gray-200/50 mb-4">
            <SearchBar />
          </div>

          {/* Mobile Links */}
          <div className="flex flex-col space-y-6 py-4">
            {navLinks.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[12px] font-medium tracking-[0.25em] uppercase text-gray-800 hover:text-[#C8A96E] transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
