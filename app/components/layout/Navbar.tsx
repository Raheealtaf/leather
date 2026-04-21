// src/components/layout/Navbar.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Search, Menu, X } from "lucide-react"; // REMOVED: User
import SearchBar from "../SearchBar";
import { useCart } from "../../context/CartContext";
import { usePathname } from "next/navigation";
import logo from "../../assets/logo.png";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();

  // IF WE ARE IN THE ADMIN PANEL, DO NOT SHOW THE NAVBAR
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const { itemCount } = useCart();

  return (
    <nav className="fixed w-full z-50 top-0 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-20 sm:h-24">
          {/* Left: Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 hover:text-slate-900 focus:outline-none p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Center/Left: Logo (Adjusted for better premium sizing) */}
          <div className="flex-shrink-0 flex items-center justify-center lg:justify-start flex-1 lg:flex-none">
            <Link href="/" className="flex items-center">
              {/* FIXED: Added .src and increased height (h-12 on mobile, h-16 on desktop) */}
              <img
                src={logo.src}
                alt="RS Leather Logo"
                className="h-12 sm:h-16 w-auto object-contain"
              />
              Leather Products
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden lg:flex space-x-10 items-center justify-center flex-1">
            <Link
              href="/shop"
              className="text-gray-600 hover:text-amber-700 transition-colors font-bold text-sm tracking-widest uppercase"
            >
              Shop
            </Link>
            <Link
              href="/categories/jackets"
              className="text-gray-600 hover:text-amber-700 transition-colors font-bold text-sm tracking-widest uppercase"
            >
              Jackets
            </Link>
            <Link
              href="/categories/bags"
              className="text-gray-600 hover:text-amber-700 transition-colors font-bold text-sm tracking-widest uppercase"
            >
              Bags
            </Link>
            <Link
              href="/about"
              className="text-gray-600 hover:text-amber-700 transition-colors font-bold text-sm tracking-widest uppercase"
            >
              Heritage
            </Link>
          </div>

          {/* Right: Icons */}
          <div className="flex items-center space-x-5 lg:space-x-6 flex-shrink-0">
            {/* Desktop Search Toggle Button */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`hidden sm:block transition-transform hover:scale-110 ${isSearchOpen ? "text-amber-700" : "text-gray-600 hover:text-slate-900"}`}
            >
              {isSearchOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Search className="h-5 w-5" />
              )}
            </button>

            {/* DYNAMIC CART BADGE */}
            <Link
              href="/cart"
              className="text-gray-600 hover:text-slate-900 relative transition-transform hover:scale-110 flex items-center p-2"
            >
              <ShoppingBag className="h-6 w-6" />
              {/* Only show the red dot if there are items in the cart */}
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-amber-700 text-xs font-bold text-white shadow-md transform translate-x-1/4 -translate-y-1/4">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* DESKTOP SEARCH DROPDOWN */}
        {isSearchOpen && (
          <div className="hidden sm:block absolute top-[88px] left-0 w-full bg-white border-b border-gray-100 shadow-xl p-6 z-[100] animate-in slide-in-from-top-2">
            <div className="max-w-2xl mx-auto flex items-center justify-center gap-4 relative">
              <SearchBar />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`lg:hidden absolute w-full bg-white border-b border-gray-100 shadow-lg transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "max-h-[800px] opacity-100 visible overflow-visible"
            : "max-h-0 opacity-0 invisible overflow-hidden"
        }`}
      >
        <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col relative z-50">
          {/* MOBILE SEARCH BAR */}
          <div className="py-4 relative z-50">
            <SearchBar />
          </div>

          <Link
            href="/shop"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-3 text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-amber-700 rounded-md"
          >
            Shop All
          </Link>
          <Link
            href="/categories/jackets"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-3 text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-amber-700 rounded-md"
          >
            Jackets
          </Link>
          <Link
            href="/categories/bags"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-3 text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-amber-700 rounded-md"
          >
            Bags
          </Link>
          <Link
            href="/about"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-3 text-base font-medium text-gray-800 hover:bg-gray-50 hover:text-amber-700 rounded-md"
          >
            Heritage
          </Link>
          {/* REMOVED: Mobile Account Link */}
        </div>
      </div>
    </nav>
  );
}
