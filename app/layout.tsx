// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer"; // Imported your premium footer
import { CartProvider } from "./context/CartContext"; // Imported the Cart Context

// Standardize the font across the app
const inter = Inter({ subsets: ["latin"] });

// This handles the SEO tags for your application
export const metadata: Metadata = {
  title: "Rs Leathers | Premium Leather Goods",
  description:
    "Shop the finest quality leather jackets, bags, and accessories crafted for the modern lifestyle.",
};

// This is the root component that acts exactly like App.js in standard React
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-slate-50 min-h-screen flex flex-col antialiased text-slate-900`}
      >
        {/* WRAP EVERYTHING IN THE CART PROVIDER */}
        <CartProvider>
          {/* The Navbar will appear on every single page */}
          <Navbar />

          {/* pt-20 adds top padding to account for our fixed 80px high Navbar */}
          <main className="flex-grow pt-20">{children}</main>

          {/* The Footer will stick to the bottom of every page */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
